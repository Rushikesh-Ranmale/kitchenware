
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "#fff" : "#cbd5e1",
    background: isActive
      ? "#2563eb"
      : "transparent",
    fontWeight: isActive
      ? "600"
      : "400",
  });

  return (
    <>
      {/* Mobile menu button */}

      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "none",
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1001,
          background: "#111827",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "20px",
          cursor: "pointer",
        }}
        className="admin-menu-button"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Overlay on mobile */}

      {open && (
        <div
          onClick={closeMenu}
          className="admin-sidebar-overlay"
          style={{
            display: "none",
          }}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`admin-sidebar ${
          open ? "admin-sidebar-open" : ""
        }`}
        style={{
          width: "240px",
          height: "100vh",
          flexShrink: 0,
          background: "#111827",
          color: "#fff",
          padding: "25px 15px",
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          overflow: "hidden",
          zIndex: 1000,
        }}
      >
        <h2
          style={{
            margin: "0 0 30px",
            padding: "0 10px",
          }}
        >
          LumaCart
        </h2>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            padding: "0 10px",
            marginBottom: "15px",
          }}
        >
          ADMIN PANEL
        </p>

        <nav>
          <NavLink
            to="/admin"
            end
            style={linkStyle}
            onClick={closeMenu}
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            style={linkStyle}
            onClick={closeMenu}
          >
            📦 Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            style={linkStyle}
            onClick={closeMenu}
          >
            🛒 Orders
          </NavLink>

          <NavLink
            to="/products"
            style={linkStyle}
            onClick={closeMenu}
          >
            🏪 View Store
          </NavLink>
        </nav>

        <div
          style={{
            marginTop: "40px",
            borderTop: "1px solid #374151",
            paddingTop: "20px",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#dc2626",
              color: "#fff",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Responsive CSS */}

      <style>
        {`
          @media (max-width: 768px) {

            .admin-menu-button {
              display: block !important;
            }

            .admin-sidebar {
              position: fixed !important;
              left: -260px;
              top: 0;
              transition: left 0.25s ease;
              box-shadow: 5px 0 20px rgba(0,0,0,0.2);
            }

            .admin-sidebar-open {
              left: 0 !important;
            }

            .admin-sidebar-overlay {
              display: block !important;
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.45);
              z-index: 999;
            }
          }
        `}
      </style>
    </>
  );
}

export default AdminSidebar;
