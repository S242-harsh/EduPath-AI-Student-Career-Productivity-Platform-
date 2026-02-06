import React from "react";
import CareerStreamCards from "./CareerStreamCards";

export default function CareerRoadmap({ goal, setView }) {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-emerald-500">
          Career Roadmap
        </h1>
        <p className="text-slate-400 mt-2">
          Explore career paths based on your stream and interests.
        </p>
      </header>

      {/* 🔥 MAIN FIX: setView PASS KIYA */}
      <CareerStreamCards setView={setView} />
    </div>
  );
}
