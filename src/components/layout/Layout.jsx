import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useProductsStore } from "../../stores/productsStore.js";

function HeroPage() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          Operations Dashboard
        </div>

        <h1 className="hero__title">
          Welcome to<br />
          <span className="hero__title--accent">Lotus Beta</span><br />
          Analytics SPA
        </h1>

        <p className="hero__sub">
          Browse and manage your full product catalogue - filter by brand,
          category and price, drill into details, and add new products in seconds.
        </p>

        <button
          className="hero__cta"
          onClick={() => navigate("/products")}
          aria-label="Go to the product catalogue"
        >
          <span>What We Got You</span>
          <span className="hero__cta-arrow" aria-hidden="true">→</span>
        </button>

        <div className="hero__stats" aria-label="Platform stats">
          <div className="hero__stat">
            <span className="hero__stat-num">194</span>
            <span className="hero__stat-label">Products</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-num">30+</span>
            <span className="hero__stat-label">Brands</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-num">Live</span>
            <span className="hero__stat-label">Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  const productCount = useProductsStore((s) => s.products.length);
  const location     = useLocation();
  const onHome       = location.pathname === "/";
  const onDetail     = /^\/products\/\d+/.test(location.pathname);

  if (onHome) {
    return (
      <>
        <HeroPage />
        <footer className="footer footer--hero">
          <span>© {new Date().getFullYear()} Lotus Beta Analytics</span>
        </footer>
      </>
    );
  }

  return (
    <>
      <header className="header">
        <div className="header__left">
          <NavLink to="/" className="header__logo">
            ▸ LOTUS BETA
          </NavLink>
          {onDetail && (
            <span className="header__breadcrumb" aria-hidden="true">/ Detail</span>
          )}
        </div>
        <div className="header__right">
          {productCount > 0 && (
            <span className="header__count">{productCount} products</span>
          )}
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `header__nav-link${isActive && !onDetail ? " header__nav-link--active" : ""}`
            }
          >
            Catalogue
          </NavLink>
        </div>
      </header>

      <main className="main" id="main-content">
        {children}
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Lotus Beta Analytics</span>
      </footer>
    </>
  );
}