import React, { useMemo } from "react";
import { Flame, Star, Trophy } from "lucide-react";

/* ===================== QUOTES ===================== */

const QUOTES = [
  "Discipline is choosing what you want most over what you want now.",
  "Success is built daily, not in a day.",
  "Small progress is still progress.",
  "Consistency beats motivation.",
  "Focus on systems, not just goals.",
];

/* ===================== COMPONENT ===================== */

export default function Progress({ tasks = [] }) {
  /* ---------- Derived values ---------- */
  const { total, completed, percent } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const percent =
      total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percent };
  }, [tasks]);

  /* ---------- Random motivation ---------- */
  const quote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    []
  );

  /* ---------- Progress feedback ---------- */
  const feedback = useMemo(() => {
    if (percent === 0) return "Let’s start strong 🚀";
    if (percent < 40) return "Good start — keep going 💪";
    if (percent < 70) return "Nice momentum 🔥";
    if (percent < 100) return "Almost there 👏";
    return "Perfect day! 🏆";
  }, [percent]);

  /* ---------- Simple streak logic ---------- */
  const streak = useMemo(() => {
    if (total === 0) return 0;
    return percent === 100 ? 1 : 0;
  }, [percent, total]);

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-10">

      {/* ================= HEADER ================= */}
      <header>
        <h2 className="text-3xl font-bold">Your Progress</h2>
        <p className="text-slate-400 mt-1">
          Small consistent steps create big results.
        </p>
      </header>

      {/* ================= MAIN PROGRESS ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-6">

        <div className="flex items-center justify-center gap-3">
          <Trophy className="text-emerald-500" />
          <span className="text-6xl font-black text-emerald-500">
            {percent}%
          </span>
        </div>

        <p className="text-slate-400">Daily task completion</p>

        {/* Progress Bar */}
        <div
          className="h-3 bg-slate-950 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="h-full bg-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-sm text-slate-500">
          {completed} of {total} tasks completed
        </p>

        <p className="text-sm font-semibold text-emerald-400">
          {feedback}
        </p>
      </div>

      {/* ================= STREAK + MOTIVATION ================= */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* STREAK */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-8 flex items-center gap-5">
          <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-slate-950">
            <Flame size={28} />
          </div>
          <div>
            <p className="text-3xl font-black text-orange-500">
              {streak} Day
            </p>
            <p className="text-slate-400">Perfect Completion Streak</p>
          </div>
        </div>

        {/* MOTIVATION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-500">
            <Star size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Motivation
            </span>
          </div>

          <p className="text-lg italic text-slate-200 leading-relaxed">
            “{quote}”
          </p>

          <p className="text-xs text-slate-500">
            — EduPath AI
          </p>
        </div>
      </div>
    </div>
  );
}
