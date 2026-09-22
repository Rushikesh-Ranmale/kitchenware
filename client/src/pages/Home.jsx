
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <div
      className="home"
      style={{
        minHeight: "100vh",
        background: "#ffffff",
      }}
    >
      {/* Navbar */}

      <nav
        className="navbar"
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 50px",
          borderBottom: "1px solid #eee",
          background: "#fff",
          boxSizing: "border-box",
        }}
      >
        <div
          className="logo"
          style={{
            fontSize: "22px",
            fontWeight: "700",
            letterSpacing: "2px",
            color: "#111827",
          }}
        >
          LUMACART
        </div>

        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <Link
            to="/"
            style={navLinkStyle}
          >
            Home
          </Link>

          <Link
            to="/products"
            style={navLinkStyle}
          >
            Products
          </Link>

          {token && (
            <Link
              to="/my-orders"
              style={navLinkStyle}
            >
              My Orders
            </Link>
          )}

          <Link
            to="/cart"
            style={navLinkStyle}
          >
            Cart
          </Link>

          {!token && (
            <Link
              to="/login"
              style={navLinkStyle}
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}

      <main>
        <section
          className="hero"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            minHeight: "500px",
            padding: "60px 50px",
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "50px",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <div className="hero-content">
            <span
              className="eyebrow"
              style={{
                display: "inline-block",
                color: "#2563eb",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "2px",
                marginBottom: "18px",
              }}
            >
              SMART LIVING, REFINED
            </span>

            <h1
              style={{
                fontSize: "52px",
                lineHeight: "1.1",
                margin: "0 0 20px",
                color: "#111827",
              }}
            >
              Technology that
              <br />
              belongs in your home.
            </h1>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.7",
                color: "#6b7280",
                maxWidth: "520px",
                marginBottom: "30px",
              }}
            >
              Beautifully designed smart home
              products that make everyday life
              simpler.
            </p>

            <Link
              to="/products"
              className="primary-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#2563eb",
                color: "#fff",
                padding: "13px 22px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Hero Image */}

          <div
            className="hero-image"
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1558008258-3256797b43f3"
              alt="Smart home device"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </section>

        {/* Features */}

        <section
          className="features"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "50px",
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          <div>
            <Sparkles
              color="#2563eb"
              size={28}
            />

            <h3>
              Thoughtful Design
            </h3>

            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.6",
              }}
            >
              Technology designed to complement
              your space.
            </p>
          </div>

          <div>
            <Zap
              color="#2563eb"
              size={28}
            />

            <h3>
              Effortless Setup
            </h3>

            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.6",
              }}
            >
              Get connected in minutes, not hours.
            </p>
          </div>

          <div>
            <ShieldCheck
              color="#2563eb"
              size={28}
            />

            <h3>
              Built to Last
            </h3>

            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.6",
              }}
            >
              Reliable products made for everyday
              use.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

const navLinkStyle = {
  color: "#374151",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
};

<style>
  {`
    @media (max-width: 768px) {

      .navbar {
        height: auto !important;
        min-height: 70px;
        padding: 15px 20px !important;
        flex-direction: column;
        gap: 15px;
      }

      .nav-links {
        width: 100%;
        justify-content: center;
        gap: 15px !important;
        flex-wrap: wrap;
      }

      .nav-links a {
        font-size: 14px !important;
      }

      .hero {
        grid-template-columns: 1fr !important;
        padding: 40px 20px !important;
        gap: 30px !important;
        min-height: auto !important;
      }

      .hero-content h1 {
        font-size: 38px !important;
      }

      .hero-content p {
        font-size: 16px !important;
      }

      .hero-image {
        height: 280px !important;
        order: 2;
      }

      .features {
        grid-template-columns: 1fr !important;
        padding: 30px 20px !important;
        gap: 25px !important;
      }
    }

    @media (max-width: 480px) {

      .logo {
        font-size: 20px !important;
      }

      .nav-links {
        gap: 10px !important;
      }

      .nav-links a {
        font-size: 13px !important;
      }

      .hero {
        padding-top: 30px !important;
      }

      .hero-content h1 {
        font-size: 32px !important;
      }

      .hero-image {
        height: 230px !important;
      }
    }
  `}
</style>


export default Home;
