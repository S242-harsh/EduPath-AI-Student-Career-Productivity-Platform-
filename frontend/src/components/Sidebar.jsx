import React from "react";
import { NAV_ITEMS } from "../constants";

export default function Sidebar({ currentView, setView }) {
  return (
    <aside className="
      w-64
      bg-slate-900
      border-r border-slate-800
      hidden lg:flex
      flex-col
      min-h-full   /* ✅ FIX */
    ">
      <div className="p-6 text-xl font-bold text-emerald-500">
        EduPath AI
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition
              ${
                currentView === item.id
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-slate-400 hover:bg-slate-800"
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
