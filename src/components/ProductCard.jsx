import React from "react";
import { showToastSuccess } from "../utils/swal";

export default function ProductCard({
  item,
  token,
  isAdmin,     
  onUpdated,
  onAddToCart,
}) {
  const id = item.id_furniture || item.id || "";
  const name = item.nama_furniture || item.name || "Untitled";
  const kategori = item.kategori || item.category || "";
  const bahan = item.bahan || item.material || "";
  const price =
    item.harga != null ? item.harga : item.price != null ? item.price : 0;
  const stok = item.stok != null ? item.stok : item.stock || 0;
  const dimensi = item.dimensi || item.dimension || "";
  const warna = item.warna || item.color || "";

  async function doDelete() {
    if (!window.confirm("Hapus produk ini?")) return;

    try {
      const res = await fetch(
        "http://localhost:4000/api/products/" + encodeURIComponent(id),
        {
          method: "DELETE",
          headers: {
            "x-auth-token": localStorage.getItem("furn_token") || "",
          },
        }
      );

      const j = await res.json().catch(() => ({}));

      if (res.ok && j.ok) {
        alert("Produk dihapus");

        if (typeof onUpdated === "function") onUpdated();
        window.dispatchEvent(new CustomEvent("refresh-list"));
      } else {
        alert("Gagal hapus: " + (j.message || res.status));
      }
    } catch (e) {
      console.error("delete error", e);
      alert("Error saat menghapus");
    }
  }


  function openEdit() {
    window.dispatchEvent(new CustomEvent("open-edit", { detail: id }));
  }


 function addToCart() {
  const key = "furniture_cart_items";
  let arr;

  try {
    arr = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(arr)) arr = [];
  } catch {
    arr = [];
  }

  arr.push({
    id,
    name,
    price,
  });

  localStorage.setItem(key, JSON.stringify(arr));

  if (typeof onAddToCart === "function") {
    onAddToCart(arr.length);
  }

  window.dispatchEvent(new Event("cart-updated"));

  // 🔔 SweetAlert Toast
  showToastSuccess("Produk ditambahkan ke cart!");
}

  return (
    <div className="card">
      <div>
        <h3>{name}</h3>
        <div className="desc">
          {kategori} • {bahan}
        </div>
        <div className="meta" style={{ marginTop: 8 }}>
          Stok: {stok} • Dimensi: {dimensi}
        </div>
      </div>

      <div>
        <div className="price">
          Rp {Number(price).toLocaleString("id-ID")}
        </div>
        <div className="controls">
          <button className="add" onClick={addToCart}>
            Add to Cart
          </button>

          {isAdmin && token && (
            <>
              <button
                className="btn"
                onClick={openEdit}
                style={{ marginLeft: 8 }}
              >
                Edit
              </button>
              <button
                className="btn ghost"
                onClick={doDelete}
                style={{ marginLeft: 8 }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
