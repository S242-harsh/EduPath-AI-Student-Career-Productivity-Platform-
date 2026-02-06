import { useState } from "react";

/* =====================================================
   ALL STREAMS (ANY 12TH) – COMPLETE CAREER GUIDE
===================================================== */

export default function AllStreamsDetails({ onBack }) {
  const [open, setOpen] = useState(null);

  const toggle = (key) => {
    setOpen(open === key ? null : key);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">

      {/* ================= BACK ================= */}
      <button
        onClick={onBack}
        className="text-emerald-400 font-semibold hover:underline"
      >
        ← Back
      </button>

      {/* ================= TITLE ================= */}
      <h1 className="text-4xl md:text-5xl font-bold text-emerald-500">
        All Streams (Any 12th) – Complete Career Guide
      </h1>

      {/* ================= OVERVIEW ================= */}
      <Section>
        <p className="text-slate-300 text-lg leading-relaxed">
          This section is for students who want to know:
          <br />
          <b>“Stream ke bina bhi career ban sakta hai?”</b>
          <br /><br />
          The answer is <b>YES</b>.  
          In today’s world, <b>skills, consistency and smart preparation</b>
          matter more than your 12th stream.
        </p>
      </Section>

      {/* ================= OPTIONS ================= */}
      <Card
        title="🎓 Career Paths Open for All Streams"
        open={open === "paths"}
        onClick={() => toggle("paths")}
      >
        <ul className="space-y-4 text-slate-300">
          <li>
            <b className="text-emerald-400">Government Exams</b>
            <p>SSC, Banking, Railways, Defence, State Govt Jobs</p>
          </li>

          <li>
            <b className="text-emerald-400">Private Sector Jobs</b>
            <p>IT, Sales, Operations, BPO, Corporate Roles</p>
          </li>

          <li>
            <b className="text-emerald-400">Skill-Based Careers</b>
            <p>IT Skills, Design, Digital Marketing, Data</p>
          </li>

          <li>
            <b className="text-emerald-400">Self-Employment</b>
            <p>Freelancing, Startups, Online Business</p>
          </li>
        </ul>
      </Card>

      {/* ================= CAREERS ================= */}
      <Card
        title="💼 Career Options (Deep Dive)"
        open={open === "careers"}
        onClick={() => toggle("careers")}
      >
        <div className="space-y-6 text-slate-300">

          <Career
            title="Government Jobs (SSC / Banking / Railways)"
            salary="₹30,000 – ₹1,20,000"
            exams="SSC CGL, CHSL, IBPS, SBI, RRB"
            pros={[
              "Job security",
              "Fixed salary",
              "Social respect",
            ]}
            cons={[
              "Limited growth speed",
              "Transfers",
            ]}
            roadmap={[
              "12th Any Stream",
              "Aptitude + Reasoning Prep",
              "Exam",
              "Interview / Joining",
            ]}
          />

          <Career
            title="IT & Tech Skills (Non-Technical Background)"
            salary="₹4 – 20 LPA"
            exams="No compulsory exam"
            pros={[
              "High growth",
              "Skill-based entry",
              "Remote jobs",
            ]}
            cons={[
              "Continuous upskilling required",
            ]}
            roadmap={[
              "Choose Skill (Web / Data / QA)",
              "Practice Projects",
              "Internship / Freelance",
              "Job",
            ]}
          />

          <Career
            title="Freelancing / Digital Work"
            salary="₹30k – Unlimited"
            exams="None"
            pros={[
              "Freedom",
              "Multiple income sources",
            ]}
            cons={[
              "Income instability",
              "Self-discipline needed",
            ]}
          />

          <Career
            title="Entrepreneur / Startup"
            salary="No limit"
            exams="None"
            pros={[
              "Full control",
              "High risk-high reward",
            ]}
            cons={[
              "Failure risk",
              "No fixed income",
            ]}
          />
        </div>
      </Card>

      {/* ================= EXAMS ================= */}
      <Card
        title="📝 Exams Open for Any Stream"
        open={open === "exams"}
        onClick={() => toggle("exams")}
      >
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>SSC CGL / CHSL / GD</li>
          <li>IBPS / SBI Banking Exams</li>
          <li>Railway (RRB)</li>
          <li>Defence (GD, Clerk, Trades)</li>
          <li>CUET</li>
        </ul>
      </Card>

      {/* ================= SKILLS ================= */}
      <Card
        title="🧠 High-Value Skills (Stream Independent)"
        open={open === "skills"}
        onClick={() => toggle("skills")}
      >
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>Communication skills</li>
          <li>Problem solving</li>
          <li>Computer literacy</li>
          <li>English & aptitude</li>
          <li>Digital & tech skills</li>
        </ul>
      </Card>

      {/* ================= REALITY CHECK ================= */}
      <Section>
        <h3 className="text-emerald-400 text-xl font-bold mb-2">
          ⚠️ Reality Check
        </h3>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Degree alone is not enough</li>
          <li>Skills + consistency create opportunities</li>
          <li>Stream matters less after first job</li>
        </ul>
      </Section>

      {/* ================= SUMMARY ================= */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
        <p className="text-emerald-400 font-semibold text-lg">
          👉 Any Stream = Skills + Smart Preparation + Discipline
        </p>
      </div>

    </div>
  );
}

/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function Card({ title, children, open, onClick }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl">
      <button
        onClick={onClick}
        className="w-full px-8 py-6 text-left text-xl font-bold
        text-emerald-300 hover:bg-slate-800/40 transition"
      >
        {title}
      </button>

      {open && (
        <div className="px-8 pb-8 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

function Section({ children }) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8">
      {children}
    </div>
  );
}

function Career({ title, salary, exams, pros, cons, roadmap }) {
  return (
    <div className="border border-slate-700 rounded-xl p-6 space-y-2">
      <h4 className="text-xl font-bold text-emerald-400">{title}</h4>
      <p><b>Salary:</b> {salary}</p>
      <p><b>Exams:</b> {exams}</p>

      <div>
        <b>Pros:</b>
        <ul className="list-disc pl-6">
          {pros.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      <div>
        <b>Cons:</b>
        <ul className="list-disc pl-6">
          {cons.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      {roadmap && (
        <div>
          <b>Roadmap:</b>
          <ol className="list-decimal pl-6">
            {roadmap.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
