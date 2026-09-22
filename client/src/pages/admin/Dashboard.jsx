
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get(
          "/dashboard/stats"
        );


        console.log(
          "Dashboard response:",
          response.data
        );
        //console.log("SALES DATA:", response.data.salesData);


        setStats(
          response.data.stats || {}
        );

        setRecentOrders(
          response.data.recentOrders || []
        );

        setTopProducts(
          response.data.topProducts || []
        );

        setSalesData(
          response.data.salesData || []
        );
      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1>Admin Dashboard</h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Overview of your Kitchenware store.
        </p>
      </div>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <StatCard
          title="Total Revenue"
          value={`₹${Number(
            stats.totalRevenue || 0
          ).toLocaleString()}`}
          color="#2563eb"
        />

        <StatCard
          title="Total Orders"
          value={stats.totalOrders || 0}
          color="#16a34a"
        />

        <StatCard
          title="Total Products"
          value={stats.totalProducts || 0}
          color="#9333ea"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers || 0}
          color="#ea580c"
        />
      </div>

      {/* Revenue Chart */}

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "30px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Revenue Overview</h2>

        <div
          style={{
            width: "100%",
            height: "350px",
            marginTop: "20px",
          }}
        >
          {salesData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={salesData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(
                      value
                    ).toLocaleString()}`
                  }
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
              }}
            >
              No revenue data available yet.
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "30px",
          overflowX: "auto",
        }}
      >
        <h2>Recent Orders</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>
                Order
              </th>

              <th style={cellStyle}>
                Customer
              </th>

              <th style={cellStyle}>
                Total
              </th>

              <th style={cellStyle}>
                Status
              </th>

              <th style={cellStyle}>
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td style={cellStyle}>
                  #{order.id}
                </td>

                <td style={cellStyle}>
                  {order.user?.name ||
                    "Customer"}
                </td>

                <td style={cellStyle}>
                  ₹
                  {Number(
                    order.total || 0
                  ).toLocaleString()}
                </td>

                <td style={cellStyle}>
                  {order.status}
                </td>

                <td style={cellStyle}>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recentOrders.length === 0 && (
          <p>No orders yet.</p>
        )}
      </div>

      {/* Top Products */}

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "25px",
        }}
      >
        <h2>Top Products</h2>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          {topProducts.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                padding: "15px 0",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <div>
                <strong>
                  {product.name}
                </strong>
              </div>

              <span>
                {product.unitsSold} sold
              </span>
            </div>
          ))}
        </div>

        {topProducts.length === 0 && (
          <p>No product sales yet.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "25px",
        borderLeft: `5px solid ${color}`,
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          color: "#666",
          marginBottom: "10px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
          color,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

const cellStyle = {
  padding: "14px",
  textAlign: "left",
  borderBottom: "1px solid #eee",
};

export default Dashboard;
