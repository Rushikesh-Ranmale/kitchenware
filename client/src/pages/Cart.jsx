
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

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
          Add some products to your cart.
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
      <h1>Shopping Cart</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 320px",
          gap: "25px",
          marginTop: "30px",
        }}
      >
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div
                style={{
                  flex: 1,
                }}
              >
                <h3>{item.name}</h3>

                <p>
                  ₹
                  {Number(
                    item.price
                  ).toLocaleString()}
                </p>

                <div>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span
                    style={{
                      margin: "0 15px",
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "9px 14px",
                  borderRadius: "7px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "25px",
            height: "fit-content",
          }}
        >
          <h2>Order Summary</h2>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginTop: "20px",
            }}
          >
            <span>Total</span>

            <strong>
              ₹
              {cartTotal.toLocaleString()}
            </strong>
          </div>

          <Link
            to="/checkout"
            style={{
              display: "block",
              textAlign: "center",
              background: "#2563eb",
              color: "#fff",
              padding: "13px",
              borderRadius: "8px",
              textDecoration: "none",
              marginTop: "25px",
            }}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;

