import React from "react";

export default function Header({ user }) {
  return (
    <header className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">
      <h1 className="text-lg font-bold">
        Welcome, {user.fullName || "Student"}
      </h1>
      <span className="text-sm text-slate-400">
        {user.careerGoal}
      </span>
    </header>
  );
}
