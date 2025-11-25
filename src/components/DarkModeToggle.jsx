import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  // load dark mode dari localStorage pas pertama kali
  useEffect(() => {
    const saved = localStorage.getItem("dark-mode") === "true";
    setDark(saved);
    if (saved) document.body.classList.add("dark");
  }, []);

  function toggle() {
    const newMode = !dark;
    setDark(newMode);

    // simpan ke localStorage
    localStorage.setItem("dark-mode", newMode);

    if (newMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  return (
    <button
      onClick={toggle}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        width: 46,
        height: 46,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        fontSize: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: dark ? "rgba(40,40,40,0.8)" : "rgba(255,255,255,0.85)",
        color: dark ? "#facc15" : "#000",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        transition: "0.2s ease",
      }}
    >
      {dark ? "🌙" : "☀"}
    </button>
  );
}