import React, { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import "./featured-banner.css";
import Swal from "sweetalert2";

const API_BASE = "http://localhost:4000";

// helper gambar
const getImageUrl = (p) => {
  if (!p) return "/placeholder-product.jpg";
  const img = p.image || p.foto || p.imageUrl || p.gambar;
  if (!img) return "/placeholder-product.jpg";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return `${API_BASE}${img}`;
};

const formatRp = (v) =>
  "Rp " + Number(v || 0).toLocaleString("id-ID");

const CART_KEY = "furniture_cart_items";

export default function Banner() {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // untuk popup preview
  const [previewProduct, setPreviewProduct] = useState(null);

  function handleAddToCartFromPreview() {
    if (!previewProduct) return;

    const id =
      previewProduct.id_furniture ||
      previewProduct.id ||
      previewProduct.product_id ||
      "";

    const name =
      previewProduct.nama_furniture ||
      previewProduct.nama ||
      previewProduct.title ||
      previewProduct.name ||
      "Produk";

    const price =
      previewProduct.harga != null
        ? Number(previewProduct.harga) || 0
        : previewProduct.price != null
        ? Number(previewProduct.price) || 0
        : 0;

    let arr;
    try {
      arr = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(arr)) arr = [];
    } catch {
      arr = [];
    }

    arr.push({ id, name, price });
    localStorage.setItem(CART_KEY, JSON.stringify(arr));

    window.dispatchEvent(new Event("cart-updated"));

    Swal.fire({
      toast: true,
      icon: "success",
      title: `"${name}" ditambahkan ke keranjang.`,
      position: "top",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    });
  }


  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await getProducts();
        const rows = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

        if (!cancelled) {
          setProducts(rows);
          setActiveIndex(0);
        }
      } catch (err) {
        console.error("Gagal load produk untuk banner:", err);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // auto rotate banner
  useEffect(() => {
    if (!products.length || previewProduct) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => {
        const max = Math.min(products.length, 4);
        if (!max) return 0;
        return (prev + 1) % max;
      });
    }, 3500); // setiap 3,5 detik bakal ganti slide

    return () => clearInterval(intervalId);
  }, [products, previewProduct]);

  const active = products[activeIndex] || {};

  // search home
  function handleSearchChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSearchResults([]);
      return;
    }

    const lower = value.toLowerCase();
    const filtered = products.filter((p) => {
      const nama = (p.nama_furniture || p.name || "").toLowerCase();
      const kategori = (p.kategori || p.category || "").toLowerCase();
      return nama.includes(lower) || kategori.includes(lower);
    });

    setSearchResults(filtered.slice(0, 5));
  }

  // buka popup & sync activeIndex
  function openPreview(p) {
    if (!p) return;

    const idx = products.findIndex(
      (it) => it.id_furniture === p.id_furniture || it.id === p.id
    );
    if (idx >= 0) setActiveIndex(idx);

    setPreviewProduct(p);
    setQuery("");
    setSearchResults([]);
  }

  function handleSearchItemMouseDown(p) {
    openPreview(p);
  }

  function closePreview() {
    setPreviewProduct(null);
  }

  // render
  return (
    <>
      <section className="featured-banner">
        {/* SEARCH BAR ATAS */}
        <div className="home-search-container">
          <div className="home-search-bar">
            <input
              type="text"
              placeholder="Cari nama atau kategori produk..."
              value={query}
              onChange={handleSearchChange}
            />
          </div>

          {query && searchResults.length > 0 && (
            <div className="home-search-dropdown">
              {searchResults.map((p) => (
                <button
                  key={p.id_furniture || p.id}
                  className="search-item"
                  onMouseDown={() => handleSearchItemMouseDown(p)}
                >
                  <div className="search-thumb">
                    <img
                      src={getImageUrl(p)}
                      alt={p.nama_furniture || "Produk"}
                      loading="lazy"
                    />
                  </div>
                  <div className="search-info">
                    <div className="search-name">
                      {p.nama_furniture || p.name || "Produk"}
                    </div>
                    <div className="search-meta">
                      {(p.kategori || p.category || "-") +
                        (p.harga != null
                          ? " • " + formatRp(p.harga)
                          : "")}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* HERO BANNER */}
        {products.length > 0 && (
          <div className="hero-banner-card">
            {/* kiri */}
            <div className="hero-left">
              <p className="hero-tagline">Produk Pilihan</p>
              <h1 className="hero-title hero-fade">
                {active.nama_furniture || "Koleksi Furniture"}
              </h1>
              <p
                className="hero-subtitle hero-fade"
                key={activeIndex + "-subtitle"}
              >
                {active.kategori
                  ? `${active.kategori} • ${
                      active.bahan || active.material || ""
                    }`
                  : "Temukan berbagai pilihan furniture dengan desain modern dan nyaman."}
              </p>

              <div className="hero-thumbs">
                {products.slice(0, 4).map((p, idx) => (
                  <button
                    key={p.id_furniture || p.id || idx}
                    className={
                      "hero-thumb" +
                      (idx === activeIndex ? " hero-thumb-active" : "")
                    }
                    onClick={() => openPreview(p)}
                  >
                    <div className="hero-thumb-img">
                      <img
                        src={getImageUrl(p)}
                        alt={p.nama_furniture || "Produk"}
                        loading="lazy"
                      />
                    </div>
                    <span className="hero-thumb-name">
                      {p.nama_furniture || p.name || "Produk"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* kanan */}
            <div className="hero-right">
              <button
                type="button"
                className="hero-product-card hero-product-anim"
                onClick={() => openPreview(active)}
                key={active.id_furniture || active.id || activeIndex}
              >
                <div className="hero-product-img">
                  <img
                    src={getImageUrl(active)}
                    alt={active.nama_furniture || "Produk"}
                  />
                </div>
                <div className="hero-product-info">
                  <h3>{active.nama_furniture || "Produk Pilihan"}</h3>
                  {active.harga != null && (
                    <div className="hero-price">
                      {formatRp(active.harga)}
                    </div>
                  )}
                  <p className="hero-meta-line">
                    {active.dimensi || active.dimension
                      ? `Dimensi: ${
                          active.dimensi || active.dimension
                        }`
                      : ""}
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* POPUP DETAIL PRODUK */}
      {previewProduct && (
        <div
          className="preview-overlay"
          onClick={closePreview}
        >
          <div
            className="preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="preview-image-wrap">
              <img
                src={getImageUrl(previewProduct)}
                alt={previewProduct.nama_furniture || "Produk"}
              />
            </div>

            <div className="preview-info">
              <h2 className="preview-title">
                {previewProduct.nama_furniture ||
                  previewProduct.name ||
                  "Produk"}
              </h2>
              <p className="preview-category">
                {(previewProduct.kategori ||
                  previewProduct.category ||
                  "") +
                  (previewProduct.bahan || previewProduct.material
                    ? " • " +
                      (previewProduct.bahan ||
                        previewProduct.material)
                    : "")}
              </p>

              {previewProduct.harga != null && (
                <div className="preview-price">
                  {formatRp(previewProduct.harga)}
                </div>
              )}

              <div className="preview-meta-list">
                {previewProduct.stok != null && (
                  <div className="preview-meta-row">
                    <span>Stok</span>
                    <strong>{previewProduct.stok}</strong>
                  </div>
                )}
                {(previewProduct.dimensi ||
                  previewProduct.dimension) && (
                  <div className="preview-meta-row">
                    <span>Dimensi</span>
                    <strong>
                      {previewProduct.dimensi ||
                        previewProduct.dimension}
                    </strong>
                  </div>
                )}
                {previewProduct.warna && (
                  <div className="preview-meta-row">
                    <span>Warna</span>
                    <strong>{previewProduct.warna}</strong>
                  </div>
                )}
              </div>

              <div className="preview-actions">
                <button
                  type="button"
                  className="preview-btn primary"
                  onClick={handleAddToCartFromPreview}
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  className="preview-btn ghost"
                  onClick={closePreview}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
