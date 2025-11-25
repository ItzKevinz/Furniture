import React, { useEffect, useState } from "react";
import { showSuccess, showError, showConfirm } from "../utils/swal"
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/products";

export default function ProductAdmin({ token }) {
   const username = (localStorage.getItem("furn_username") || "").toLowerCase();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    id_furniture: "",
    nama_furniture: "",
    kategori: "",
    bahan: "",
    harga: "",
    stok: "",
    dimensi: "",
    warna: "",
    image: "",
  });

  // role dari localstorage (admin atau user)
  const role = (localStorage.getItem("furn_role") || "user").toLowerCase();
  const isAdmin = role === "admin";

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function loadProducts() {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:4000/api/products");
    const j = await res.json();
    const data = j && j.data ? j.data : Array.isArray(j) ? j : [];
    setItems(data);
  } catch (err) {
    console.error("Gagal memuat produk (admin):", err);
    alert("Gagal memuat produk");
    setItems([]);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin]);

  function resetForm() {
    setEditingId(null);
    setForm({
      id_furniture: "",
      nama_furniture: "",
      kategori: "",
      bahan: "",
      harga: "",
      stok: "",
      dimensi: "",
      warna: "",
      image: "",
    });
  }

  function startEdit(p) {
    if (!isAdmin) return;
    setEditingId(p.id_furniture);
    setForm({
      id_furniture: p.id_furniture || "",
      nama_furniture: p.nama_furniture || "",
      kategori: p.kategori || "",
      bahan: p.bahan || "",
      harga: p.harga ?? "",
      stok: p.stok ?? "",
      dimensi: p.dimensi || "",
      warna: p.warna || "",
      image: p.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  if (!form.id_furniture || !form.nama_furniture) {
    showError("Form belum lengkap", "ID Produk dan Nama Produk wajib diisi.");
    return;
  }

  if (!token) {
    showError("Belum login", "Silakan login terlebih dahulu.");
    return;
  }

  const payload = {
    id_furniture: form.id_furniture,
    nama_furniture: form.nama_furniture,
    kategori: form.kategori,
    bahan: form.bahan,
    harga: form.harga ? Number(form.harga) : null,
    stok: form.stok ? Number(form.stok) : null,
    dimensi: form.dimensi,
    warna: form.warna,
    image: form.image,
  };

  try {
    if (editingId) {
      // EDIT HANYA UNTUK ADMIN
      if (!isAdmin) {
        showError("Tidak diizinkan", "Hanya admin yang dapat mengedit produk.");
        return;
      }

      await updateProduct(editingId, payload, token);
      await showSuccess("Berhasil", "Produk berhasil diperbarui.");
    } else {
      await addProduct(payload, token);
      await showSuccess("Berhasil", "Produk berhasil ditambahkan.");
    }

    if (isAdmin) {
      await loadProducts();
    }
    resetForm();
  } catch (err) {
    console.error(err);
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Gagal menyimpan produk.";
    showError("Terjadi kesalahan", msg);
  }
}

  async function handleDelete(id) {
  // Popup konfirmasi hapus
  const result = await showConfirm(
    "Hapus Produk?",
    "Produk yang dihapus tidak dapat dikembalikan."
  );

  if (!result.isConfirmed) return;

  if (!token) {
    showError("Belum login", "Silakan login terlebih dahulu.");
    return;
  }

  if (!isAdmin) {
    showError("Tidak diizinkan", "Hanya admin yang boleh menghapus produk.");
    return;
  }

  try {
    await deleteProduct(id, token);
    await showSuccess("Berhasil", "Produk berhasil dihapus.");
    await loadProducts();
  } catch (err) {
    console.error(err);
    showError("Gagal", "Gagal menghapus produk.");
  }
}

  if (!token) {
    return (
      <div className="content-card">
        <h2>Manajemen Produk</h2>
        <p>Silakan login dulu untuk Membeli Produk.</p>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <section className="content-card">
        <h2>{editingId ? "Edit Produk" : "Tambah Produk"}</h2>

        {/* role admin */}
        {!isAdmin && (
          <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 12 }}>
            Kamu login sebagai <strong>user biasa</strong>. Kamu bisa{" "}
            <strong>menambahkan produk</strong>, tapi hanya admin yang bisa
            mengedit atau menghapus data yang sudah ada.
            <p>Kalo bukan admin liat dan checkout2 aja wkkw</p>
          </p>
          
        )}

        {isAdmin && (
          <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 12 }}>
            Kamu login sebagai <strong>admin</strong>. Kamu bisa menambah,
            mengedit, dan menghapus produk.
          </p>
        )}

        <form className="product-form-grid" onSubmit={handleSubmit}>
          <input
            placeholder="ID Produk (F001)"
            value={form.id_furniture}
            onChange={(e) => setField("id_furniture", e.target.value)}
            disabled={!!editingId} 
          />
          <input
            placeholder="Nama Produk"
            value={form.nama_furniture}
            onChange={(e) => setField("nama_furniture", e.target.value)}
          />

          <input
            placeholder="Kategori"
            value={form.kategori}
            onChange={(e) => setField("kategori", e.target.value)}
          />
          <input
            placeholder="Bahan"
            value={form.bahan}
            onChange={(e) => setField("bahan", e.target.value)}
          />

          <input
            type="number"
            placeholder="Harga"
            value={form.harga}
            onChange={(e) => setField("harga", e.target.value)}
          />
          <input
            type="number"
            placeholder="Stok"
            value={form.stok}
            onChange={(e) => setField("stok", e.target.value)}
          />

          <input
            placeholder="Dimensi (120x60x75)"
            value={form.dimensi}
            onChange={(e) => setField("dimensi", e.target.value)}
          />
          <input
            placeholder="Warna"
            value={form.warna}
            onChange={(e) => setField("warna", e.target.value)}
          />

          <input
            placeholder="Path / URL Gambar (opsional)"
            value={form.image}
            onChange={(e) => setField("image", e.target.value)}
          />
        </form>

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSubmit}
          >
            {editingId ? "Simpan Perubahan" : "Tambah"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-secondary"
              onClick={resetForm}
            >
              Batal
            </button>
          )}
        </div>
      </section>

      <section className="content-card" style={{ marginTop: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <h2>Daftar Produk</h2>
          <button className="btn-secondary" onClick={loadProducts}>
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>Belum ada data produk.</p>
        ) : (
          <div className="table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Bahan</th>
                  <th>Dimensi</th>
                  <th>Warna</th>
                  {isAdmin && <th>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id_furniture}>
                    <td>{p.id_furniture}</td>
                    <td>{p.nama_furniture}</td>
                    <td>{p.kategori}</td>
                    <td>{Number(p.harga).toLocaleString("id-ID")}</td>
                    <td>{p.stok}</td>
                    <td>{p.bahan}</td>
                    <td>{p.dimensi}</td>
                    <td>{p.warna}</td>

                    {isAdmin && (
                      <td className="admin-action-cell">
                        <button
                          type="button"
                          className="btn-admin edit"
                          onClick={() => startEdit(p)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn-admin delete"
                          onClick={() =>
                            handleDelete(p.id_furniture)
                          }
                        >
                          Hapus
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
