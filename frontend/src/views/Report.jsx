import React, { useMemo } from "react";
import {
  Download,
  FileText,
  CheckCircle2,
  Clock,
  Share2,
} from "lucide-react";

/* ===================== COMPONENT ===================== */

export default function Report({ user, tasks = [] }) {
  /* ---------- Derived data ---------- */
  const {
    completed,
    total,
    rate,
    focusTime,
    streak,
    insight,
  } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed);
    const rate =
      total === 0 ? 0 : Math.round((completed.length / total) * 100);

    // Approx focus time: 25 min per completed task
    const focusTime = `${(completed.length * 0.42).toFixed(1)}h`;

    // Simple streak logic
    const streak = rate === 100 && total > 0 ? "1 Day" : "—";

    let insight = "Let’s plan tomorrow better.";
    if (rate === 100) insight = "Perfect execution. Keep this rhythm!";
    else if (rate >= 70) insight = "Strong day with good focus.";
    else if (rate >= 40) insight = "Decent progress — consistency matters.";
    else if (total === 0) insight = "No tasks today. Planning is power.";

    return {
      completed,
      total,
      rate,
      focusTime,
      streak,
      insight,
    };
  }, [tasks]);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    []
  );

  /* ---------- Actions ---------- */
  const exportPDF = () => window.print();

  const shareReport = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Daily Productivity Report",
        text: `I completed ${completed.length}/${total} tasks today (${rate}%).`,
      });
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  const firstName = user?.fullName?.split(" ")[0] || "Student";

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-10">

      {/* ================= HEADER ================= */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest
            bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg mb-2">
            Daily Summary
          </span>
          <h2 className="text-3xl font-bold">Productivity Report</h2>
          <p className="text-slate-400 mt-1">{today}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800
              px-4 py-3 rounded-xl text-sm font-bold hover:border-slate-700 transition"
          >
            <Download size={16} />
            Export PDF
          </button>

          <button
            onClick={shareReport}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400
              text-slate-950 px-4 py-3 rounded-xl text-sm font-bold transition"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </header>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat label="Tasks Completed" value={`${completed.length}/${total}`} accent="text-emerald-500" />
        <Stat label="Completion Rate" value={`${rate}%`} accent="text-blue-500" />
        <Stat label="Focus Time" value={focusTime} accent="text-orange-500" />
        <Stat label="Streak" value={streak} accent="text-amber-500" />
      </div>

      {/* ================= ACTIVITY ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 space-y-8
        print:bg-white print:text-black">

        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h3 className="text-xl font-bold">Today’s Activity</h3>
            <p className="text-slate-500 text-sm mt-1">
              Breakdown of tasks and status
            </p>
          </div>
          <Clock className="text-slate-600" />
        </div>

        <div className="space-y-4">
          {tasks.length === 0 && (
            <p className="text-slate-500 text-sm">No tasks for today.</p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center p-4 rounded-2xl
                bg-slate-950 border border-slate-800/60"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${task.completed
                      ? "bg-emerald-500/15 text-emerald-500"
                      : "bg-slate-800 text-slate-500"}`}
                >
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="font-semibold">{task.text}</p>
                  <p className="text-xs text-slate-500">
                    {task.time || "Today"}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-black uppercase tracking-widest
                ${task.completed ? "text-emerald-500" : "text-slate-500"}`}
              >
                {task.completed ? "Done" : "Pending"}
              </span>
            </div>
          ))}
        </div>

        {/* ================= COACH NOTE ================= */}
        <div className="pt-8 space-y-4">
          <h4 className="text-lg font-bold">Coach’s Note</h4>
          <div className="p-6 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl">
            <p className="italic text-slate-300">
              “Well done, {firstName}. {insight}
              Tomorrow, try finishing one important task early to build momentum.”
            </p>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="pt-8 border-t border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center
              text-slate-950 font-black">
              E
            </div>
            <span className="text-sm font-bold text-slate-500">
              EduPath AI Report
            </span>
          </div>
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-600">
            Confidential
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===================== STAT ===================== */

function Stat({ label, value, accent }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
        {label}
      </p>
      <p className={`text-2xl font-black ${accent}`}>{value}</p>
    </div>
  );
}
