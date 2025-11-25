import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4000";

export default function Register({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Isi semua field dulu ya");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/register`, {
        username,
        email,
        password,
      });

      if (res.data?.ok) {
        alert("Registrasi berhasil!");
        onSuccess && onSuccess(); // balik ke login
      } else {
        alert(res.data?.message || "Registrasi gagal");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Terjadi error saat daftar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box fade-in-soft">
        <h2 className="auth-title">Buat Akun Baru</h2>
        <p className="auth-subtitle">
          Daftar untuk mengakses panel furniture dan mengelola data produk.
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="auth-group">
            <label>Username</label>
            <input
              className="auth-input"
              type="text"
              placeholder="username unik kamu"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="auth-group">
            <label>Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="contoh: kamu@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-group">
            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="auth-footnote">
          Sudah punya akun?{" "}
          <span className="auth-link" onClick={() => onSuccess && onSuccess()}>
            Masuk di sini
          </span>
        </p>
      </div>
    </div>
  );
}