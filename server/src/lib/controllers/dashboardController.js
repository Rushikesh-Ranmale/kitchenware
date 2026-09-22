const prisma = require("../lib/prisma");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      revenueResult,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),

      // Total products
      prisma.product.count(),

      // Total orders
      prisma.order.count(),

      // Total revenue
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),

      // Recent orders
      prisma.order.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
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
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      }),

      // Products with their order quantities
      prisma.product.findMany({
        take: 5,
        include: {
          orderItems: true,
        },
      }),
    ]);

    const totalRevenue = Number(
      revenueResult._sum.total || 0
    );

    const formattedTopProducts = topProducts
      .map((product) => {
        const unitsSold = product.orderItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return {
          id: product.id,
          name: product.name,
          image: product.image,
          unitsSold,
        };
      })
      .sort((a, b) => b.unitsSold - a.unitsSold);

    res.json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },

      recentOrders,

      topProducts: formattedTopProducts,
    });
  } catch (error) {
    console.error(
      "Dashboard stats error:",
      error
    );

    res.status(500).json({
      message: "Failed to load dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};