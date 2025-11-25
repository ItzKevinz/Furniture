import React from "react";
import ProductCard from "./ProductCard";

export default function HomeProducts({ token, onAddToCart }) {
  const [items, setItems] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetch("http://localhost:4000/api/products");
      const j = await res.json();
      const data = j && j.data ? j.data : Array.isArray(j) ? j : [];
      setItems(data);
    } catch (e) {
      console.error("load home products error", e);
      setItems([]);
    }
  }

  const lowered = search.toLowerCase();

  let filtered = items;
  if (lowered) {
    filtered = items.filter((it) => {
      const name = (it.nama_furniture || it.name || "").toLowerCase();
      const cat = (it.kategori || it.category || "").toLowerCase();
      return name.includes(lowered) || cat.includes(lowered);
    });
  }

  const display = lowered ? filtered : filtered.slice(0, 6);

  return (
    <div className="home-page page-fade-in">
      <div className="home-hero-strip">
        <div className="home-hero-text">
          <h1>Koleksi Furniture Pilihan</h1>
          <p>
            Temukan kursi, meja, dan lemari favoritmu. Beberapa produk ditampilkan
            sebagai rekomendasi di sini.
          </p>
        </div>

        <div className="home-search-container">
          <input
            className="home-search-input"
            type="text"
            placeholder="Cari nama atau kategori produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <h2 className="home-section-title">
        {lowered ? "Hasil Pencarian" : "Produk Pilihan"}
      </h2>

      <section className="products home-products-grid">
        {display.length === 0 && (
          <div style={{ padding: 20, color: "#fff" }}>
            Tidak ada produk yang cocok.
          </div>
        )}

        {display.map((it) => (
          <ProductCard
            key={it.id_furniture || it.id}
            item={it}
            token={token}
            onUpdated={load}
            onAddToCart={onAddToCart}
          />
        ))}
      </section>
    </div>
  );
}