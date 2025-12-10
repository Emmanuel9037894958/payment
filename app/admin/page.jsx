"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/dashboard";
    } else {
      setError("Incorrect password!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#061224] px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 w-full max-w-sm 
                    shadow-lg shadow-blue-500/20" // Added shadow
      >
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        {/* PASSWORD FIELD + EYE */}
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          />

          {/* EYE ICON */}
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            {show ? (
              <span role="img" aria-label="Hide Password">
                🙈
              </span>
            ) : (
              <span role="img" aria-label="Show Password">
                👁️
              </span>
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white py-3 rounded-lg font-semibold transition duration-300" // Added gradient and transition
        >
          Login
        </button>
      </form>
    </div>
  );
}
