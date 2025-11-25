import React, { useState } from "react";
import { showSuccess, showError } from "../utils/swal";

export default function LoginCard({ onLogin, goRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false); 
async function handleLogin(e) {
  e.preventDefault();
  if (!username || !password) {
    showError("Login gagal", "Isi username dan password dulu ya.");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.ok) {
      const usernameFromServer = data.username || username;

      // simpan token + username
      localStorage.setItem("furn_token", data.token);
      localStorage.setItem("furn_username", usernameFromServer);

      // role
      const rawRole = (data.role || usernameFromServer || "").toLowerCase();
      const role = rawRole === "admin" ? "admin" : "user";
      localStorage.setItem("furn_role", role);
      await showSuccess("Berhasil login", `Selamat datang, ${usernameFromServer}!`);
      setClosing(true);
      setTimeout(() => {
        onLogin && onLogin(data.token);
      }, 450);
    } else {

      showError("Login gagal", data.message || "Username atau password salah.");
    }
  } catch (err) {
    console.error(err);
    showError("Error", "Terjadi error saat login.");
  } finally {
    setLoading(false);
  }
}



  return (
    <div className="auth-page">
      <div
        className={`auth-box ${
          closing ? "fade-out-soft" : "fade-in-soft"
        }`}
      >
        <h2 className="auth-title">Selamat Datang Kembali</h2>
        <p className="auth-subtitle">
          Masuk untuk mengelola katalog furniture dan melihat data produk.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-group">
            <label>Username</label>
            <input
              className="auth-input"
              type="text"
              placeholder="contoh: username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="auth-group">
            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || closing}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="auth-footnote">
          Belum punya akun?{" "}
          <span className="auth-link" onClick={goRegister}>
            Daftar di sini
          </span>
        </p>
      </div>
    </div>
  );
}