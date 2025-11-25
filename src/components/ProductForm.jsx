import React from "react";

const API_BASE = "http://localhost:4000";

export default function ProductForm() {
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);

  const [form, setForm] = React.useState({
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

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

 
  React.useEffect(() => {
    function onOpenCreate() {
      setEditId(null);
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
      setOpen(true);
    }

    async function onOpenEdit(e) {
      const id = e.detail;
      try {
        const res = await fetch(
          `${API_BASE}/api/products/${encodeURIComponent(id)}`
        );
        const j = await res.json();
        const p = j.data || j;

        setEditId(id);
        setForm({
          id_furniture: p.id_furniture || id,
          nama_furniture: p.nama_furniture || "",
          kategori: p.kategori || "",
          bahan: p.bahan || "",
          harga: p.harga ?? "",
          stok: p.stok ?? "",
          dimensi: p.dimensi || "",
          warna: p.warna || "",
          image: p.image || "",
        });
        setOpen(true);
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data produk");
      }
    }

    window.addEventListener("open-create", onOpenCreate);
    window.addEventListener("open-edit", onOpenEdit);
    return () => {
      window.removeEventListener("open-create", onOpenCreate);
      window.removeEventListener("open-edit", onOpenEdit);
    };
  }, []);

  async function save() {
    if (!form.id_furniture || !form.nama_furniture) {
      alert("ID Produk dan Nama wajib diisi");
      return;
    }

    const token = localStorage.getItem("furn_token") || "";

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

    const url = editId
      ? `${API_BASE}/api/products/${encodeURIComponent(editId)}`
      : `${API_BASE}/api/products`;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      });

      const j = await res.json().catch(() => ({}));

      if (res.ok && j.ok !== false) {
        alert(editId ? "Produk terupdate" : "Produk tersimpan");
        setOpen(false);
        window.dispatchEvent(new CustomEvent("refresh-list"));
      } else {
        alert("Gagal simpan: " + (j.message || res.status));
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat menyimpan");
    }
  }

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-card">
        <h3>{editId ? "Edit Produk" : "Tambah Produk"}</h3>

        <input
          placeholder="ID Produk (F001)"
          value={form.id_furniture}
          onChange={(e) => setField("id_furniture", e.target.value)}
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
          placeholder="Path gambar (mis. /uploads/xxx.jpg)"
          value={form.image}
          onChange={(e) => setField("image", e.target.value)}
        />

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="btn" onClick={save}>
            Simpan
          </button>
          <button className="btn ghost" onClick={() => setOpen(false)}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
