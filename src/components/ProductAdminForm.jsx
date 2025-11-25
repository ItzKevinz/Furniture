import React from "react";

export default function ProductAdminForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  editMode,
}) {
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();      
    onSubmit();               
  }

  return (
    <form className="admin-card" onSubmit={handleSubmit}>
      <h2>{editMode ? "Edit Produk" : "Tambah Produk"}</h2>
      <div className="admin-grid">
        <div className="admin-col">
          <input
            name="id_furniture"
            value={form.id_furniture}
            onChange={handleChange}
            placeholder="ID Produk (F001)"
            disabled={editMode}     
          />

          <input
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            placeholder="Kategori"
          />

          <input
            name="harga"
            value={form.harga}
            onChange={handleChange}
            placeholder="Harga"
            type="number"
          />

          <input
            name="dimensi"
            value={form.dimensi}
            onChange={handleChange}
            placeholder="Dimensi (120x60x75)"
          />
        </div>

        <div className="admin-col">
          <input
            name="nama_furniture"
            value={form.nama_furniture}
            onChange={handleChange}
            placeholder="Nama Produk"
          />

          <input
            name="bahan"
            value={form.bahan}
            onChange={handleChange}
            placeholder="Bahan"
          />

          <input
            name="stok"
            value={form.stok}
            onChange={handleChange}
            placeholder="Stok"
            type="number"
          />

          <input
            name="warna"
            value={form.warna}
            onChange={handleChange}
            placeholder="Warna"
          />
        </div>
      </div>

      <div className="admin-actions">
        <button type="submit" className="btn">
          {editMode ? "Simpan Perubahan" : "Tambah"}
        </button>
        {editMode && (
          <button
            type="button"
            className="btn ghost"
            onClick={onCancel}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
