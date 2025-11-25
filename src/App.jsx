import React from "react";
import "./App.css";

import 'sweetalert2/dist/sweetalert2.min.css';
import DarkModeToggle from "./components/DarkModeToggle";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import AboutUs from "./components/AboutUs";
import LoginCard from "./components/LoginCard";
import Register from "./components/Register";
import ProductAdmin from "./components/ProductAdmin";
import Banner from "./components/Banner"; 

const CART_KEY = "furniture_cart_items";

export default function App() {
  const [token, setToken] = React.useState(
    localStorage.getItem("furn_token") || ""
  );

  // view: home / produk / upload / about / login / register
  const [view, setView] = React.useState(token ? "home" : "login");
  const storedName = (localStorage.getItem("furn_username") || "").trim();
  const isAdmin = storedName.toLowerCase() === "admin";
  const [cartCount, setCartCount] = React.useState(0);
  const [showCartModal, setShowCartModal] = React.useState(false);
  const [cartSummary, setCartSummary] = React.useState({
    items: 0,
    total: 0,
  });
  const [cartItems, setCartItems] = React.useState([]); 

  // ====== HELPER CART ======
  function readCartRaw() {
    try {
      const arr = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function writeCartRaw(raw) {
    localStorage.setItem(CART_KEY, JSON.stringify(raw));
  }

  function computeCartState() {
    const raw = readCartRaw();

    const map = new Map(); 
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const id = item.id;
      const name = item.name || "Item";
      const price = item.price != null ? Number(item.price) || 0 : 0;

      if (!map.has(id)) {
        map.set(id, { id, name, price, qty: 0, subtotal: 0 });
      }
      const row = map.get(id);
      row.qty += 1;
      row.subtotal = row.qty * row.price;
    }

    const grouped = Array.from(map.values());
    const total = grouped.reduce((sum, it) => sum + it.subtotal, 0);

    setCartItems(grouped);
    setCartSummary({
      items: raw.length,
      total,
    });
    setCartCount(raw.length);
  }

  // sync token ke localStorage
  React.useEffect(() => {
    if (token) localStorage.setItem("furn_token", token);
    else localStorage.removeItem("furn_token");
  }, [token]);


  React.useEffect(() => {
    const raw = readCartRaw();
    setCartCount(raw.length);
  }, []);

  function handleCartChange(newLength) {
    setCartCount(newLength);
  }

  React.useEffect(() => {
    if (!token) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [token]);

  function handleShowCart() {
    computeCartState();
    setShowCartModal(true);
  }


  function handleClearCart() {
    localStorage.removeItem(CART_KEY);
    setCartCount(0);
    setCartSummary({ items: 0, total: 0 });
    setCartItems([]);
    setShowCartModal(false);
  }

  function handleRemoveItem(productId) {
    const raw = readCartRaw().filter((it) => it.id !== productId);
    writeCartRaw(raw);

    const map = new Map();
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const id = item.id;
      const name = item.name || "Item";
      const price = item.price != null ? Number(item.price) || 0 : 0;

      if (!map.has(id)) {
        map.set(id, { id, name, price, qty: 0, subtotal: 0 });
      }
      const row = map.get(id);
      row.qty += 1;
      row.subtotal = row.qty * row.price;
    }

    const grouped = Array.from(map.values());
    const total = grouped.reduce((sum, it) => sum + it.subtotal, 0);

    setCartItems(grouped);
    setCartSummary({
      items: raw.length,
      total,
    });
    setCartCount(raw.length);

    if (raw.length === 0) {
      setShowCartModal(false);
    }
  }

  function handleCheckoutDemo() {
    alert("Checkout berhasil! Bersiap menerima barang dirumah anda! WKWK");
  }


  if (!token) {
    return (
      <div className="app">
        <main className="main">
          <section id="content-area">
            {view === "register" ? (
              <Register onSuccess={() => setView("login")} />
            ) : (
              <LoginCard
                onLogin={(t) => {
                  setToken(t);
                  setView("home");
                }}
                goRegister={() => setView("register")}
              />
            )}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      {/* SIDEBAR */}
<Sidebar
  currentView={view}
  onNavigate={setView}
  token={token}
  onLogout={() => {
    setToken("");
    setView("login");
    setCartCount(0);
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem("furn_role");      
    localStorage.removeItem("furn_username");  
  }}
  cartCount={cartCount}
  onShowCart={handleShowCart}
/>
      {/* MODAL CART */}
      {showCartModal && (
        <div
          className="cart-overlay"
          onClick={() => setShowCartModal(false)}
        >
          <div
            className="cart-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-modal-header">
              <span className="cart-pill">RINGKASAN</span>
              <h3 className="cart-modal-title">Keranjang Belanja</h3>
              <p className="cart-modal-sub">Checkout boongan</p>
            </div>

            <div className="cart-modal-body">
              {cartItems.length === 0 ? (
                <p className="cart-empty">Keranjang masih kosong.</p>
              ) : (
                <>
                  <div className="cart-items-list">
                    {cartItems.map((it) => (
                      <div key={it.id} className="cart-item-row">
                        <div className="cart-item-main">
                          <div className="cart-item-name">{it.name}</div>
                          <div className="cart-item-meta">
                            {it.qty} item × Rp{" "}
                            {Number(it.price).toLocaleString("id-ID")}
                          </div>
                        </div>
                        <div className="cart-item-right">
                          <div className="cart-item-subtotal">
                            Rp{" "}
                            {Number(it.subtotal).toLocaleString("id-ID")}
                          </div>
                          <button
                            className="cart-item-remove"
                            onClick={() => handleRemoveItem(it.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div className="cart-row">
                      <span>Jumlah barang</span>
                      <strong>{cartSummary.items} item</strong>
                    </div>
                    <div className="cart-row">
                      <span>Total harga</span>
                      <strong>
                        Rp{" "}
                        {Number(
                          cartSummary.total || 0
                        ).toLocaleString("id-ID")}
                      </strong>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="cart-modal-footer">
              <button
                className="cart-btn ghost"
                onClick={handleClearCart}
                disabled={cartSummary.items === 0}
              >
                Kosongkan Keranjang
              </button>

              <button
                className="cart-btn secondary"
                onClick={handleCheckoutDemo}
                disabled={cartSummary.items === 0}
              >
                Checkout
              </button>

              <button
                className="cart-btn primary"
                onClick={() => setShowCartModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

{/* MAIN AREA */}
      <main className="main">
        {view !== "home" && (
          <header className="hero" style={{ position: "relative" }}>
            <DarkModeToggle />
          </header>
        )}
        <section id="content-area">
          {view === "home" && <Banner />}
          {view === "produk" && (
            <ProductList token={token} onAddToCart={handleCartChange} />
          )}
          {view === "upload" && <ProductAdmin token={token} />}
          {view === "about" && <AboutUs />}
        </section>
      </main>
    </div>
  );
}
