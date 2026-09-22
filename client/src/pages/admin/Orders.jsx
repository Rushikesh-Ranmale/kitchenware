
import { useEffect, useState } from "react";
import api from "../../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState("");

  const statuses = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/orders");

      setOrders(
        response.data.orders || []
      );
    } catch (error) {
      console.error(
        "Orders error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    orderId,
    status
  ) => {
    try {
      setUpdating(orderId);
      setError("");

      await api.put(
        `/orders/${orderId}/status`,
        { status }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update order"
      );
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h1>Order Management</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1>Order Management</h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Manage customer orders and
          update their status.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div
          style={{
            background: "#fee2e2",
            color: "#b91c1c",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {/* Orders */}

      {orders.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "14px",
            textAlign: "center",
          }}
        >
          <h2>No orders yet</h2>

          <p
            style={{
              color: "#666",
            }}
          >
            Customer orders will appear
            here.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "25px",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              {/* Order Header */}

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                  borderBottom:
                    "1px solid #eee",
                  paddingBottom: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: "0 0 8px",
                    }}
                  >
                    Order #{order.id}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#666",
                    }}
                  >
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <strong
                    style={{
                      fontSize: "22px",
                      color: "#2563eb",
                    }}
                  >
                    ₹
                    {Number(
                      order.total || 0
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Customer */}

              <div
                style={{
                  background: "#f8fafc",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                  }}
                >
                  Customer
                </h3>

                <p>
                  <strong>
                    Name:
                  </strong>{" "}
                  {order.user?.name ||
                    "Unknown"}
                </p>

                <p
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <strong>
                    Email:
                  </strong>{" "}
                  {order.user?.email ||
                    "Unknown"}
                </p>
              </div>

              {/* Products */}

              <h3>Products</h3>

              <div
                style={{
                  marginBottom: "25px",
                }}
              >
                {order.items?.map(
                  (item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: "15px",
                        padding:
                          "12px 0",
                        borderBottom:
                          "1px solid #eee",
                      }}
                    >
                      {item.product
                        ?.image && (
                        <img
                          src={
                            item.product
                              .image
                          }
                          alt={
                            item.product
                              .name
                          }
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit:
                              "cover",
                            borderRadius:
                              "8px",
                          }}
                        />
                      )}

                      <div
                        style={{
                          flex: 1,
                        }}
                      >
                        <strong>
                          {item.product
                            ?.name ||
                            "Product"}
                        </strong>

                        <p
                          style={{
                            margin:
                              "5px 0 0",
                            color:
                              "#666",
                          }}
                        >
                          Quantity:{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <strong>
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString()}
                      </strong>
                    </div>
                  )
                )}
              </div>

              {/* Status */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <strong>
                  Order Status:
                </strong>

                <select
                  value={order.status}
                  disabled={
                    updating ===
                    order.id
                  }
                  onChange={(event) =>
                    updateStatus(
                      order.id,
                      event.target.value
                    )
                  }
                  style={{
                    padding:
                      "10px 14px",
                    borderRadius:
                      "8px",
                    border:
                      "1px solid #d1d5db",
                    background:
                      "#fff",
                    cursor:
                      updating ===
                      order.id
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {statuses.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>

                {updating ===
                  order.id && (
                  <span
                    style={{
                      color:
                        "#2563eb",
                    }}
                  >
                    Updating...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

