
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

function Checkout() {
  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const response = await api.post(
        "/orders",
        { items }
      );

      console.log(
        "Order response:",
        response.data
      );

      setOrderId(
        response.data.order?.id
      );

      clearCart();

      setSuccess(true);
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Successful order
  if (success) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fb",
          padding: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "45px",
            borderRadius: "18px",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#dcfce7",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              margin: "0 auto 20px",
            }}
          >
            ✓
          </div>

          <h1>
            Order Successful!
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "15px",
            }}
          >
            Thank you for shopping with
            LumaCart.
          </p>

          {orderId && (
            <p
              style={{
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              Order #{orderId}
            </p>
          )}

          <Link
            to="/products"
            style={{
              display: "inline-block",
              marginTop: "25px",
              background: "#2563eb",
              color: "#fff",
              padding: "13px 24px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <h1>Your Cart is Empty</h1>

        <p
          style={{
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Add products before checking out.
        </p>

        <Link
          to="/products"
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "12px 22px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Browse Products
        </Link>
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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1>Checkout</h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Review your order before placing it.
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 350px",
            gap: "25px",
          }}
        >
          {/* Order Items */}

          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "25px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h2>Order Items</h2>

            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "18px 0",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 8px",
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#666",
                    }}
                  >
                    Quantity: {item.quantity}
                  </p>
                </div>

                <strong>
                  ₹
                  {(
                    Number(item.price) *
                    item.quantity
                  ).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>

          {/* Summary */}

          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "25px",
              height: "fit-content",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h2>Order Summary</h2>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginTop: "25px",
                paddingBottom: "15px",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <span>Subtotal</span>

              <strong>
                ₹
                {cartTotal.toLocaleString()}
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginTop: "15px",
                paddingBottom: "15px",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <span>Shipping</span>

              <span
                style={{
                  color: "#16a34a",
                }}
              >
                FREE
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginTop: "20px",
                fontSize: "20px",
              }}
            >
              <strong>Total</strong>

              <strong
                style={{
                  color: "#2563eb",
                }}
              >
                ₹
                {cartTotal.toLocaleString()}
              </strong>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "14px",
                background: loading
                  ? "#93c5fd"
                  : "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

            <button
              onClick={() =>
                navigate("/cart")
              }
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                background: "#fff",
                color: "#2563eb",
                border:
                  "1px solid #2563eb",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

