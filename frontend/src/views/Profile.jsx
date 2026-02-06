import React, { useState, useEffect, useMemo } from "react";
import { Save, CheckCircle } from "lucide-react";

/* ===================== CONSTANTS ===================== */

const GOALS = ["Govt Job", "Private IT", "Higher Studies", "Business"];
const INTERESTS = ["DSA", "Web", "Java", "Aptitude", "Data Science"];

/* ===================== COMPONENT ===================== */

export default function Profile({ user, setUser }) {
  const [local, setLocal] = useState(user);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ---------- Persist from storage ---------- */
  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      setLocal(JSON.parse(stored));
      setUser(JSON.parse(stored));
    }
  }, [setUser]);

  /* ---------- Dirty check ---------- */
  const isDirty = useMemo(
    () => JSON.stringify(local) !== JSON.stringify(user),
    [local, user]
  );

  /* ---------- Validation ---------- */
  const isValid = useMemo(() => {
    if (!local.fullName?.trim()) return false;
    if (local.age && (local.age < 10 || local.age > 80)) return false;
    return true;
  }, [local]);

  /* ---------- Handlers ---------- */
  const toggleInterest = (item) => {
    setLocal((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const save = () => {
    if (!isValid) {
      setError("Please enter valid profile details.");
      return;
    }

    setError("");
    setSaving(true);

    setTimeout(() => {
      setUser(local);
      localStorage.setItem("profile", JSON.stringify(local));
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-10">

      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Profile Settings</h2>
          <p className="text-slate-400 mt-1">
            Update your personal and career preferences.
          </p>
        </div>

        {saved && (
          <span className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
            <CheckCircle size={16} /> Saved
          </span>
        )}
      </header>

      {/* ================= CARD ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 space-y-10">

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            label="Full Name"
            value={local.fullName}
            onChange={(v) => setLocal({ ...local, fullName: v })}
          />
          <Input
            label="City"
            value={local.city}
            onChange={(v) => setLocal({ ...local, city: v })}
          />
          <Input
            label="Age"
            type="number"
            value={local.age}
            onChange={(v) => setLocal({ ...local, age: v })}
          />
        </Section>

        {/* CAREER GOAL */}
        <Section title="Career Goal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GOALS.map((g) => (
              <button
                key={g}
                onClick={() => setLocal({ ...local, careerGoal: g })}
                className={`p-4 rounded-xl border transition
                  ${
                    local.careerGoal === g
                      ? "bg-emerald-500 text-slate-950 border-emerald-500"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Section>

        {/* INTERESTS */}
        <Section title="Interests">
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map((i) => (
              <button
                key={i}
                onClick={() => toggleInterest(i)}
                className={`px-5 py-2 rounded-full border transition
                  ${
                    local.interests.includes(i)
                      ? "bg-emerald-500 text-slate-950 border-emerald-500"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
              >
                {i}
              </button>
            ))}
          </div>
        </Section>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-400 font-semibold">{error}</p>
        )}

        {/* SAVE */}
        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={save}
            disabled={!isDirty || !isValid || saving}
            className={`px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition
              ${
                !isDirty || !isValid || saving
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
              }`}
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================== UI HELPERS ===================== */

function Section({ title, children }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-emerald-400">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 bg-slate-950 border border-slate-800 rounded-xl
          px-4 py-3 focus:outline-none focus:border-emerald-500"
      />
    </div>
  );
}
