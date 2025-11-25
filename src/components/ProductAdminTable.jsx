import React from "react";

export default function ProductAdminTable({ items, onEdit, onDelete }) {
  return (
    <div className="admin-card">
      <h2>Daftar Produk</h2>
      <table className="admin-table">
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
            <th>Aksi</th>
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
              <td>
                <button
                  className="btn small"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn small danger"
                  onClick={() => onDelete(p.id_furniture)}
                  style={{ marginLeft: 8 }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: 12 }}>
                Belum ada produk.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
