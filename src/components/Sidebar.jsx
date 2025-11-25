import React from "react";
import { LogOut } from "lucide-react";

export default function Sidebar({
  currentView,
  onNavigate,
  token,
  onLogout,
  cartCount = 0,
  onShowCart,
}) {
  
  const storedName = (localStorage.getItem("furn_username") || "Furniture").trim();
  const initial = storedName ? storedName[0].toUpperCase() : "F";

  function handleShowCartClick() {
    if (typeof onShowCart === "function") {
      onShowCart();
    }
  }

  return (
    <aside className="sidebar mini-sidebar">
      <div className="mini-brand">
        <div className="mini-logo">{initial}</div>
      </div>

      <nav className="mini-nav">
        <button
          className={
            "mini-nav-item" +
            (currentView === "home" ? " mini-nav-item-active" : "")
          }
          onClick={() => onNavigate("home")}
        >
          <span className="mini-icon">🏠</span>
          <span className="mini-label">Home</span>
        </button>

        <button
          className={
            "mini-nav-item" +
            (currentView === "produk" ? " mini-nav-item-active" : "")
          }
          onClick={() => onNavigate("produk")}
        >
          <span className="mini-icon">🛒</span>
          <span className="mini-label">Produk</span>
        </button>

        <button
          className={
            "mini-nav-item" +
            (currentView === "upload" ? " mini-nav-item-active" : "")
          }
          onClick={() => onNavigate("upload")}
        >
          <span className="mini-icon">⬆️</span>
          <span className="mini-label">Upload</span>
        </button>

        <button
          className={
            "mini-nav-item" +
            (currentView === "about" ? " mini-nav-item-active" : "")
          }
          onClick={() => onNavigate("about")}
        >
          <span className="mini-icon">ℹ</span>
          <span className="mini-label">About</span>
        </button>
      </nav>

      <div className="mini-bottom">
        <div className="mini-cart">
          <span className="mini-cart-label">Cart</span>
          <span className="mini-cart-count" id="cart-count">
            {cartCount}
          </span>
        </div>

        <button className="mini-cart-pill" onClick={handleShowCartClick}>
          Total
        </button>

        <button
          className={"mini-logout-btn icon-only" + (token ? "" : " hidden")}
          onClick={onLogout}
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}