import React, { useState, useEffect } from "react";
import {
  Save,
  Upload,
  Trash2,
  Moon,
  Sun,
  Shield,
} from "lucide-react";

export default function Profile({ user, setUser }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    theme: "dark",
    language: "English",
    photo: "",
  });

  const [saved, setSaved] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    const stored = localStorage.getItem("account_settings");
    if (stored) {
      setForm(JSON.parse(stored));
    } else {
      setForm({
        fullName: user?.fullName || "",
        email: "",
        password: "",
        theme: "dark",
        language: "English",
        photo: "",
      });
    }
  }, [user]);

  /* ================= SAVE ================= */
  const saveSettings = () => {
    localStorage.setItem("account_settings", JSON.stringify(form));
    setUser({ ...user, fullName: form.fullName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12">

      <h1 className="text-3xl font-bold">Account Settings</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 space-y-10">

        {/* ================= PROFILE PHOTO ================= */}
        <div className="flex items-center gap-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border border-slate-700">
            {form.photo ? (
              <img
                src={form.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                No Photo
              </div>
            )}
          </div>

          <label className="cursor-pointer flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700 transition">
            <Upload size={16} />
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        {/* ================= BASIC INFO ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={form.fullName}
            onChange={(v) => setForm({ ...form, fullName: v })}
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
        </div>

        {/* ================= PASSWORD ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="New Password"
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
          />
        </div>

        {/* ================= PREFERENCES ================= */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Preferences</h3>

          {/* Theme */}
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-5 rounded-xl">
            <span className="flex items-center gap-2">
              {form.theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              Theme
            </span>

            <button
              onClick={() =>
                setForm({
                  ...form,
                  theme: form.theme === "dark" ? "light" : "dark",
                })
              }
              className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-lg font-semibold"
            >
              {form.theme === "dark" ? "Dark" : "Light"}
            </button>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-5 rounded-xl">
            <span>Language</span>
            <select
              value={form.language}
              onChange={(e) =>
                setForm({ ...form, language: e.target.value })
              }
              className="bg-slate-800 px-4 py-2 rounded-lg"
            >
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>

        {/* ================= SAVE ================= */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-800">

          <button
            onClick={saveSettings}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-xl font-bold"
          >
            <Save size={18} />
            Save Changes
          </button>

          {saved && (
            <span className="text-emerald-500 font-semibold">
              Settings Saved ✔
            </span>
          )}
        </div>
      </div>

      {/* ================= DANGER ZONE ================= */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8">
        <h3 className="text-lg font-bold text-red-400 mb-4">
          Danger Zone
        </h3>

        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs uppercase text-slate-400 font-bold">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
      />
    </div>
  );
}
