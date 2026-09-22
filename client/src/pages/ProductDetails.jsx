
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/products/${id}`
        );

        console.log(
          "Product details:",
          response.data
        );

        //setProduct(response.data.product);
        setProduct(response.data)
      } catch (error) {
        console.error(
          "Product details error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>{error}</h2>

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Product not found</h2>

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "50px 30px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/products"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "25px",
          }}
        >
          ← Back to Products
        </Link>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "30px",
            display: "grid",
            gridTemplateColumns:
              "minmax(300px, 1fr) minmax(300px, 1fr)",
            gap: "40px",
            boxShadow:
              "0 5px 25px rgba(0,0,0,0.06)",
          }}
        >
          {/* Product Image */}

          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "450px",
                objectFit: "cover",
                borderRadius: "14px",
                display: "block",
                background: "#eee",
              }}
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          </div>

          {/* Product Information */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "#777",
                textTransform: "uppercase",
                fontSize: "13px",
                letterSpacing: "1px",
              }}
            >
              {product.category?.name ||
                "Smart Home"}
            </p>

            <h1
              style={{
                fontSize: "38px",
                margin: "10px 0",
              }}
            >
              {product.name}
            </h1>

            <h2
              style={{
                color: "#2563eb",
                fontSize: "30px",
                margin: "15px 0",
              }}
            >
              ₹
              {Number(
                product.price
              ).toLocaleString()}
            </h2>

            <p
              style={{
                color: "#555",
                lineHeight: "1.7",
                fontSize: "16px",
              }}
            >
              {product.description}
            </p>

            <p
              style={{
                marginTop: "15px",
                color:
                  product.stock > 0
                    ? "#16a34a"
                    : "#dc2626",
                fontWeight: "600",
              }}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </p>

            <button
              disabled={product.stock <= 0}
              onClick={() => {
                addToCart(product);
                alert(
                  "Product added to cart!"
                );
              }}
              style={{
                marginTop: "25px",
                background:
                  product.stock > 0
                    ? "#2563eb"
                    : "#999",
                color: "#fff",
                border: "none",
                padding: "15px 25px",
                borderRadius: "9px",
                cursor:
                  product.stock > 0
                    ? "pointer"
                    : "not-allowed",
                fontSize: "17px",
                fontWeight: "600",
              }}
            >
              {product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}
            </button>

            <Link
              to="/cart"
              style={{
                marginTop: "12px",
                textAlign: "center",
                border:
                  "1px solid #2563eb",
                color: "#2563eb",
                padding: "13px",
                borderRadius: "9px",
                textDecoration: "none",
              }}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

