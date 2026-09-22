
import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminProducts() {
  const emptyForm = {
    name: "",
    slug: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    featured: false,
    categoryId: "",
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // -----------------------------
  // LOAD PRODUCTS
  // -----------------------------

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");

      const productList = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];

      setProducts(productList);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load products"
      );
    }
  };

  // -----------------------------
  // LOAD CATEGORIES
  // -----------------------------

  const loadCategories = async () => {
    try {
      /*
       * If you don't have a category API yet,
       * we will use the category IDs from your
       * existing products.
       */
      const uniqueCategories = [];

      products.forEach((product) => {
        if (
          product.category &&
          !uniqueCategories.some(
            (category) =>
              category.id === product.category.id
          )
        ) {
          uniqueCategories.push(product.category);
        }
      });

      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // INITIAL LOAD
  // -----------------------------

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await loadProducts();

      setLoading(false);
    };

    loadData();
  }, []);

  // Update categories whenever products change
  useEffect(() => {
    loadCategories();
  }, [products]);

  // -----------------------------
  // FORM CHANGE
  // -----------------------------

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  // -----------------------------
  // ADD / UPDATE PRODUCT
  // -----------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const productData = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        stock: Number(form.stock),
        featured: form.featured,
        categoryId: Number(form.categoryId),
      };

      if (editingId) {
        await api.put(
          `/products/${editingId}`,
          productData
        );

        setMessage(
          "Product updated successfully."
        );
      } else {
        await api.post(
          "/products",
          productData
        );

        setMessage(
          "Product created successfully."
        );
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadProducts();
    } catch (error) {
      console.error(
        "Save product error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------
  // EDIT
  // -----------------------------

  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      slug: product.slug || "",
      description:
        product.description || "",
      price: product.price || "",
      image: product.image || "",
      stock: product.stock || "",
      featured: product.featured || false,
      categoryId:
        product.categoryId || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // -----------------------------
  // DELETE
  // -----------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await api.delete(
        `/products/${id}`
      );

      setProducts(
        products.filter(
          (product) => product.id !== id
        )
      );

      setMessage(
        "Product deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  // -----------------------------
  // CANCEL EDIT
  // -----------------------------

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setMessage("");
  };

  // -----------------------------
  // LOADING
  // -----------------------------

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          fontFamily: "Arial",
        }}
      >
        Loading products...
      </div>
    );
  }

  // -----------------------------
  // PAGE
  // -----------------------------

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1>
          Admin Product Management
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Manage your Kitchenware products.
        </p>
      </div>

      {/* MESSAGES */}

      {error && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {message && (
        <div
          style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {/* FORM */}

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          marginBottom: "35px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h2>
          {editingId
            ? "Edit Product"
            : "Add New Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {/* NAME */}

            <FormInput
              label="Product Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Smart Kitchen Scale"
              required
            />

            {/* SLUG */}

            <FormInput
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="smart-kitchen-scale"
              required
            />

            {/* PRICE */}

            <FormInput
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="2999"
              required
            />

            {/* STOCK */}

            <FormInput
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="20"
              required
            />

            {/* IMAGE */}

            <FormInput
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              required
            />

            {/* CATEGORY */}

            <div>
              <label style={labelStyle}>
                Category
              </label>

              {categories.length > 0 ? (
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  name="categoryId"
                  type="number"
                  value={form.categoryId}
                  onChange={handleChange}
                  placeholder="Category ID"
                  required
                  style={inputStyle}
                />
              )}
            </div>
          </div>

          {/* DESCRIPTION */}

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <label style={labelStyle}>
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
              rows="4"
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          {/* FEATURED */}

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />

            Featured product
          </label>

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "25px",
            }}
          >
            <button
              type="submit"
              disabled={saving}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding:
                  "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Product"
                : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                style={{
                  background: "#e5e7eb",
                  color: "#111827",
                  border: "none",
                  padding:
                    "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* PRODUCTS */}

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Products ({products.length})
      </h2>

      {products.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
          }}
        >
          No products found.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "20px",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              {/* IMAGE */}

              <div
                style={{
                  height: "180px",
                  background: "#f3f4f6",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "15px",
                }}
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              {/* NAME */}

              <h3>
                {product.name}
              </h3>

              {/* DESCRIPTION */}

              <p
                style={{
                  color: "#666",
                  minHeight: "40px",
                }}
              >
                {product.description}
              </p>

              {/* PRICE */}

              <strong
                style={{
                  color: "#2563eb",
                  fontSize: "20px",
                }}
              >
                ₹
                {Number(
                  product.price
                ).toLocaleString()}
              </strong>

              {/* STOCK */}

              <p>
                Stock: {product.stock}
              </p>

              {/* CATEGORY */}

              <p
                style={{
                  color: "#666",
                }}
              >
                Category:{" "}
                {product.category?.name ||
                  `ID ${product.categoryId}`}
              </p>

              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() =>
                    handleEdit(product)
                  }
                  style={{
                    flex: 1,
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  style={{
                    flex: 1,
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------
// FORM INPUT
// -------------------------------------

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
};

export default AdminProducts;

