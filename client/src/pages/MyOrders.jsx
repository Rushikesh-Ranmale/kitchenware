
import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/orders/my");

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("My orders error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "#16a34a";

      case "SHIPPED":
        return "#2563eb";

      case "PROCESSING":
        return "#9333ea";

      case "CANCELLED":
        return "#dc2626";

      default:
        return "#ea580c";
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1>My Orders</h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          View your recent LumaCart orders.
        </p>

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

        {orders.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "50px 30px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h2>No orders yet</h2>

            <p
              style={{
                color: "#666",
              }}
            >
              Your orders will appear here after
              you complete checkout.
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
                  borderRadius: "16px",
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
                    gap: "15px",
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

                  <div
                    style={{
                      padding: "8px 14px",
                      borderRadius: "20px",
                      background: `${getStatusColor(
                        order.status
                      )}15`,
                      color: getStatusColor(
                        order.status
                      ),
                      fontWeight: "600",
                    }}
                  >
                    {order.status}
                  </div>
                </div>

                {/* Products */}

                <div>
                  {order.items?.map(
                    (item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: "15px",
                          padding: "15px 0",
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
                              width: "80px",
                              height: "80px",
                              objectFit:
                                "cover",
                              borderRadius:
                                "10px",
                            }}
                          />
                        )}

                        <div
                          style={{
                            flex: 1,
                          }}
                        >
                          <h3
                            style={{
                              margin:
                                "0 0 6px",
                            }}
                          >
                            {item.product
                              ?.name ||
                              "Product"}
                          </h3>

                          <p
                            style={{
                              margin: 0,
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

                {/* Total */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    paddingTop: "10px",
                  }}
                >
                  <strong>
                    Order Total
                  </strong>

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
