import React from "react";
import { Layout, Target, CheckCircle } from "lucide-react";

export default function LandingPage({ onStart }) {
  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen flex justify-center">
      <div className="w-full max-w-7xl">

        {/* ================= NAVBAR ================= */}
        <nav className="px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-emerald-500 rounded-md flex items-center justify-center font-bold text-slate-900">
              E
            </div>
            <span className="text-xl font-bold">EduPath AI</span>
          </div>

          <button
            onClick={onStart}
            className="bg-emerald-500 hover:bg-emerald-400 active:scale-95
              text-slate-950 px-6 py-2 rounded-full font-semibold transition-all"
          >
            Get Started
          </button>
        </nav>

        {/* ================= HERO ================= */}
        <section className="px-6 pt-24 pb-24 grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Plan Your Study.<br />
              <span className="text-emerald-500">Build Your Career.</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-xl">
              Unlock your academic potential with AI-driven schedules,
              career roadmaps, and habit-forming tools designed for modern students.
            </p>

            <div className="flex gap-4">
              <button
                onClick={onStart}
                className="bg-emerald-500 hover:bg-emerald-400
                  text-slate-950 px-8 py-4 rounded-xl font-bold
                  transition-all hover:scale-105"
              >
                Start for Free
              </button>

              <button
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="border border-slate-700 hover:border-emerald-500
                  px-8 py-4 rounded-xl font-semibold transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg"
              alt="Students studying"
              className="rounded-2xl shadow-2xl border border-slate-800"
            />
            <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-3xl -z-10"></div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section
          id="features"
          className="bg-slate-900/40 py-24 border-y border-slate-900"
        >
          <h2 className="text-3xl font-bold text-center mb-14">
            Features designed for your success
          </h2>

          <div className="px-6 grid md:grid-cols-3 gap-10">
            <Feature
              icon={<Layout size={28} />}
              title="Daily Timetable"
              desc="Smart schedules that adapt to your routine and academic load."
            />
            <Feature
              icon={<Target size={28} />}
              title="Career Guidance"
              desc="AI-powered insights and personalized roadmaps from day one."
            />
            <Feature
              icon={<CheckCircle size={28} />}
              title="Habit Tracking"
              desc="Build long-term consistency through visual progress tracking."
            />
          </div>
        </section>

        {/* ================= WHO IS THIS FOR ================= */}
        <section className="py-24 px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Who is this for?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <ImageCard
              title="Hostel Students"
              text="Optimized for shared living, structured routines, and collaborative planning."
              img="https://images.pexels.com/photos/8197556/pexels-photo-8197556.jpeg"
            />
            <ImageCard
              title="Home Students"
              text="Designed for deep focus, flexible schedules, and high productivity at home."
              img="https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg"
            />
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to accelerate your learning?
          </h2>
          <p className="text-slate-400 mb-8">
            Join thousands of students already using EduPath AI.
          </p>
          <button
            onClick={onStart}
            className="bg-emerald-500 hover:bg-emerald-400
              text-slate-950 px-10 py-4 rounded-xl font-bold transition"
          >
            Start for Free
          </button>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="py-12 border-t border-slate-900 text-center text-slate-500">
          © 2024 EduPath AI. All rights reserved.
        </footer>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8
      hover:border-emerald-500/40 hover:-translate-y-1 transition-all">
      <div className="text-emerald-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
}

function ImageCard({ title, text, img }) {
  return (
    <div className="group bg-slate-900/80 backdrop-blur
      border border-slate-800 rounded-3xl overflow-hidden
      hover:border-emerald-500/40 hover:scale-[1.02]
      transition-all duration-300 shadow-xl">

      <div className="relative">
        <img
          src={img}
          alt={title}
          className="w-full h-64 object-cover
            group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-emerald-400">
          {title}
        </h3>
        <p className="text-slate-400 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
