
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        console.log("Products API response:", response.data);

        // Handle both:
        // response.data = [...]
        // response.data = { products: [...] }

        let productList = [];

        if (Array.isArray(response.data)) {
          productList = response.data;
        } else if (
          response.data &&
          Array.isArray(response.data.products)
        ) {
          productList = response.data.products;
        }

        setProducts(productList);
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Loading products...
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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
          }}
        >
          Smart Products for Modern Spaces
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Discover premium smart products
          for your home.
        </p>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "14px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "30px",
            fontSize: "16px",
          }}
        />

        {filteredProducts.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
            }}
          >
            <p>
              No products found.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "25px",
            }}
          >
            {filteredProducts.map(
              (product) => (
                <div
                  key={product.id}
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      padding: "20px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      {product.name}
                    </h2>

                    <p
                      style={{
                        color: "#666",
                        minHeight: "45px",
                      }}
                    >
                      {product.description}
                    </p>

                    <h3
                      style={{
                        color: "#2563eb",
                        margin: "15px 0",
                      }}
                    >
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString()}
                    </h3>

                    <Link
                      to={`/products/${product.id}`}
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: "#2563eb",
                        color: "#fff",
                        padding: "11px",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

