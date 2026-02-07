import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";

export default function Auth({ onComplete }) {
  const [mode, setMode] = useState("signin");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ================= EMAIL LOGIN / SIGNUP ================= */

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.email || !form.password) {
      setMessage("Email and Password required");
      return;
    }

    if (mode === "signup" && !form.name) {
      setMessage("Full Name required");
      return;
    }

    try {
      setLoading(true);

      const url =
        mode === "signin"
          ? "http://localhost:5000/api/login"
          : "http://localhost:5000/api/register";

      const body =
        mode === "signin"
          ? { email: form.email, password: form.password }
          : {
              fullName: form.name,
              email: form.email,
              password: form.password,
            };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Authentication failed");
        return;
      }

      localStorage.setItem("token", data.token);

      onComplete({
        fullName: data.fullName,
        email: data.email,
        onboarded: true,
      });

    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORGOT PASSWORD ================= */

  const handleForgotPassword = async () => {
    if (!form.email) {
      setMessage("Enter your email first");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        }
      );

      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("Error sending reset link");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-10 space-y-8">

        {/* LOGO */}
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mx-auto">
          <GraduationCap size={28} className="text-blue-600" />
        </div>

        {/* TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            {mode === "signin" ? "Sign in to EduPath" : "Create Account"}
          </h1>
          <p className="text-sm text-blue-200">
            {mode === "signin"
              ? "Continue your learning journey"
              : "Start your learning journey today"}
          </p>
        </div>

        {message && (
          <p className="text-center text-red-400 text-sm">
            {message}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={submit} className="space-y-6">

          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-black/40 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-black/40 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {mode === "signin" && (
            <div
              onClick={handleForgotPassword}
              className="text-right text-sm text-blue-200 hover:underline cursor-pointer"
            >
              Forgot password?
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:scale-[1.02] hover:shadow-lg transition"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="text-center text-sm text-blue-200">
          {mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            onClick={() =>
              setMode(mode === "signin" ? "signup" : "signin")
            }
            className="ml-2 text-white font-semibold hover:underline"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 text-blue-200 text-sm">
          <div className="flex-1 h-px bg-blue-400/40" />
          Or continue with
          <div className="flex-1 h-px bg-blue-400/40" />
        </div>

        {/* GOOGLE LOGIN ONLY */}
        <div className="flex justify-center">
          <button
            onClick={() =>
              window.location.href = "http://localhost:5000/auth/google"
            }
            className="bg-white rounded-xl px-6 py-3 shadow-md hover:shadow-lg flex justify-center items-center transition"
          >
            <svg width="22" height="22" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.9 2.43 30.32 0 24 0 14.62 0 6.48 5.48 2.69 13.44l7.98 6.2C12.54 13.37 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.75H24v9h12.44c-.54 2.9-2.19 5.36-4.66 7.02l7.17 5.58C43.94 37.24 46.1 31.43 46.1 24.55z"/>
              <path fill="#FBBC05" d="M10.67 28.64a14.48 14.48 0 010-9.28l-7.98-6.2A23.95 23.95 000 24c0 3.83.92 7.45 2.69 10.84l7.98-6.2z"/>
              <path fill="#34A853" d="M24 48c6.32 0 11.9-2.09 15.87-5.68l-7.17-5.58c-2 1.34-4.55 2.13-8.7 2.13-6.26 0-11.46-3.87-13.33-9.14l-7.98 6.2C6.48 42.52 14.62 48 24 48z"/>
            </svg>
            <span className="ml-2 text-black font-medium">
              Continue with Google
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
