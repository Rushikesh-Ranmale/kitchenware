
const prisma = require("../lib/prisma");
console.log("🔥 CORRECT DASHBOARD CONTROLLER LOADED");

const getDashboardStats = async (req, res) => {
  try {
console.log("🔥 DASHBOARD STATS CALLED");
    // Total users
    const totalUsers = await prisma.user.count();

    // Total products
    const totalProducts =
      await prisma.product.count();

    // Total orders
    const totalOrders =
      await prisma.order.count();

    // Total revenue
    const revenueResult =
      await prisma.order.aggregate({
        _sum: {
          total: true,
        },
        where: {
          status: {
            not: "CANCELLED",
          },
        },
      });

    const totalRevenue =
      Number(revenueResult._sum.total || 0);

    // Recent orders
    const recentOrders =
      await prisma.order.findMany({
        take: 5,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    // Get all order items
    const orderItems =
      await prisma.orderItem.findMany({
        include: {
          product: true,
          order: true,
        },
      });

    // Calculate top products
    const productSales = {};

    orderItems.forEach((item) => {
      if (
        item.order.status ===
        "CANCELLED"
      ) {
        return;
      }

      const productId = item.productId;

      if (!productSales[productId]) {
        productSales[productId] = {
          id: productId,
          name: item.product.name,
          unitsSold: 0,
        };
      }

      productSales[productId].unitsSold +=
        item.quantity;
    });

    const topProducts = Object.values(
      productSales
    )
      .sort(
        (a, b) =>
          b.unitsSold - a.unitsSold
      )
      .slice(0, 5);

    // Revenue by month
    const monthlyRevenue = {};

    const orders =
      await prisma.order.findMany({
        where: {
          status: {
            not: "CANCELLED",
          },
        },
        select: {
          total: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    orders.forEach((order) => {
      const month = order.createdAt.toLocaleString(
        "en-US",
        {
          month: "short",
        }
      );

      if (!monthlyRevenue[month]) {
        monthlyRevenue[month] = 0;
      }

      monthlyRevenue[month] += Number(
        order.total
      );
    });

    const salesData = Object.entries(
      monthlyRevenue
    ).map(([month, revenue]) => ({
      month,
      revenue,
    }));

    console.log("🔥 MONTHLY REVENUE:", monthlyRevenue);
console.log("🔥 SALES DATA:", salesData);

    res.json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },

      recentOrders,

      topProducts,

      salesData,
    });
  } catch (error) {
    console.error(
      "Dashboard error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};
