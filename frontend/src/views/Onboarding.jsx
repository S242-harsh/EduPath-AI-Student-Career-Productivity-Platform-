import React, { useState } from "react";

/* ===================== MAIN COMPONENT ===================== */

export default function Auth({ onComplete }) {
  const [mode, setMode] = useState("login"); // login | signup

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = () => {
    if (!form.email || !form.password) {
      alert("Email and Password required");
      return;
    }

    if (mode === "signup" && !form.name) {
      alert("Name required for Sign Up");
      return;
    }

    // ✅ Yahan backend / firebase / API later connect kar sakte ho
    onComplete({
      ...form,
      mode,
      authenticated: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#0f2519] border border-emerald-900/30 rounded-3xl shadow-xl">

        {/* HEADER */}
        <div className="px-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">
            {mode === "login" ? "Welcome Back 👋" : "Create Account ✨"}
          </h1>
          <p className="text-slate-400 mt-2">
            {mode === "login"
              ? "Login to continue your journey"
              : "Sign up to get started"}
          </p>
        </div>

        {/* FORM */}
        <div className="px-8 py-10 space-y-6">

          {mode === "signup" && (
            <Input
              label="Full Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
          )}

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
          />

          <button
            onClick={submit}
            className="w-full bg-emerald-500 hover:bg-emerald-400
              text-slate-950 py-3 rounded-xl font-bold text-lg"
          >
            {mode === "login" ? "Login →" : "Sign Up →"}
          </button>

          {/* TOGGLE */}
          <p className="text-center text-slate-400">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() =>
                setMode(mode === "login" ? "signup" : "login")
              }
              className="ml-2 text-emerald-400 font-semibold"
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===================== INPUT COMPONENT ===================== */

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-400 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 bg-[#0b1f14] border border-emerald-900/30
          rounded-xl px-4 py-3 text-slate-100 focus:outline-none"
      />
    </div>
  );
}
