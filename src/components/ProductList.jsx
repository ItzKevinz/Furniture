import React from "react";
import ProductCard from "./ProductCard";

const LAST_SEARCH_KEY = "furn_last_search";

export default function ProductList({ token, onAddToCart, isAdmin }) {
  const [items, setItems] = React.useState([]);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    load();
    window.addEventListener("refresh-list", load);
    const saved = localStorage.getItem(LAST_SEARCH_KEY) || "";
    setQuery(saved);

    return () => window.removeEventListener("refresh-list", load);
  }, []);

  async function load() {
    try {
      const res = await fetch("http://localhost:4000/api/products");
      const j = await res.json();
      const data = j && j.data ? j.data : Array.isArray(j) ? j : [];
      setItems(data);
    } catch (e) {
      console.error("load error", e);
      setItems([]);
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    localStorage.setItem(LAST_SEARCH_KEY, value);
  }

  const q = query.toLowerCase();
  const filtered = items.filter((p) => {
    const text = `${p.nama_furniture || ""} ${p.kategori || ""} ${
      p.bahan || ""
    }`.toLowerCase();
    return text.includes(q);
  });

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "white" }}>Semua Produk</h2>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Cari produk..."
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: "1px solid #d1d5db",
            minWidth: 220,
          }}
        />
      </div>

      <section className="products">
        {filtered.length === 0 && (
          <div style={{ padding: 20, color: "#fff" }}>
            Tidak ada produk yang cocok.
          </div>
        )}
        {filtered.map((it) => (
          <ProductCard
            key={it.id_furniture || it.id}
            item={it}
            token={token}
            isAdmin={isAdmin}      
            onUpdated={load}
            onAddToCart={onAddToCart}
          />
        ))}
      </section>
    </div>
  );
}
