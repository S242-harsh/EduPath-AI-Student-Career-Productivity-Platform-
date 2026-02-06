import React, { useState } from "react";

export default function Auth({ onComplete }) {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = () => {
    if (!form.email || !form.password) return;

    if (mode === "signup" && !form.name) return;

    // ✅ FIX: fullName use karo
    onComplete({
      fullName: form.name,
      email: form.email,
      authenticated: true,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        {mode === "signup" && (
          <input
            placeholder="Full Name"
            className="w-full mb-3 p-3 rounded bg-slate-800"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 rounded bg-slate-800"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-slate-800"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          className="w-full bg-emerald-500 text-black py-3 rounded font-bold"
        >
          Continue
        </button>

        <p className="text-center mt-4 text-sm">
          {mode === "login" ? "No account?" : "Already have account?"}
          <button
            className="ml-2 text-emerald-400"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
