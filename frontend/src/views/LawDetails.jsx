import { useState } from "react";

/* =====================================================
   LAW / DEFENCE / GOVERNMENT – COMPLETE CAREER GUIDE
===================================================== */

export default function LawDetails({ onBack }) {
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
        Law / Defence / Government – Complete Career Guide
      </h1>

      {/* ================= OVERVIEW ================= */}
      <Section>
        <p className="text-slate-300 text-lg leading-relaxed">
          Law, Defence and Government careers are meant for students who believe in
          <b> justice, discipline, authority, leadership and nation service</b>.
          <br /><br />
          These fields offer <b>power, respect, job security</b> and long-term growth,
          but demand <b>hard work, discipline and patience</b>.
        </p>
      </Section>

      {/* ================= COURSES ================= */}
      <Card
        title="🎓 Courses & Entry Paths"
        open={open === "courses"}
        onClick={() => toggle("courses")}
      >
        <ul className="space-y-4 text-slate-300">
          <li>
            <b className="text-emerald-400">Law Courses</b>
            <p>LLB (3 yrs), BA + LLB (5 yrs), LLM</p>
          </li>

          <li>
            <b className="text-emerald-400">Defence Academies</b>
            <p>NDA, CDS, OTA, AFCAT, INA</p>
          </li>

          <li>
            <b className="text-emerald-400">Government Exam Preparation</b>
            <p>UPSC, State PSC, SSC, Police, Judiciary</p>
          </li>
        </ul>
      </Card>

      {/* ================= CAREERS ================= */}
      <Card
        title="💼 Career Options (Detailed)"
        open={open === "careers"}
        onClick={() => toggle("careers")}
      >
        <div className="space-y-6 text-slate-300">

          <Career
            title="Lawyer (Advocate)"
            salary="₹3 – 15 LPA (depends on experience)"
            exams="CLAT, State Bar Council"
            pros={[
              "High income potential",
              "Independent profession",
              "Respect in society",
            ]}
            cons={[
              "Initial struggle",
              "Long working hours",
            ]}
            roadmap={[
              "12th (Any Stream)",
              "BA + LLB / LLB",
              "Internship",
              "Bar Council Exam",
              "Practice",
            ]}
          />

          <Career
            title="Judge (Judiciary)"
            salary="₹8 – 25 LPA"
            exams="Judiciary Exams"
            pros={[
              "High respect",
              "Authority & power",
              "Stable career",
            ]}
            cons={[
              "Very tough exams",
              "Long preparation",
            ]}
          />

          <Career
            title="Indian Armed Forces Officer"
            salary="₹56,100 – ₹2,00,000 + perks"
            exams="NDA, CDS, AFCAT"
            pros={[
              "Nation service",
              "Discipline & leadership",
              "Pride & respect",
            ]}
            cons={[
              "High physical standards",
              "Transfers & tough life",
            ]}
          />

          <Career
            title="Police / Government Officer"
            salary="₹40,000 – ₹1,50,000"
            exams="UPSC, State PSC, SSC"
            pros={[
              "Job security",
              "Authority",
              "Public service",
            ]}
            cons={[
              "Work pressure",
              "Political influence",
            ]}
          />
        </div>
      </Card>

      {/* ================= EXAMS ================= */}
      <Card
        title="📝 Important Exams"
        open={open === "exams"}
        onClick={() => toggle("exams")}
      >
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>CLAT / AILET</li>
          <li>Judiciary Exams</li>
          <li>UPSC Civil Services</li>
          <li>State Public Service Commission</li>
          <li>NDA / CDS / AFCAT</li>
          <li>SSC CGL / CHSL</li>
        </ul>
      </Card>

      {/* ================= SKILLS ================= */}
      <Card
        title="🧠 Skills Required"
        open={open === "skills"}
        onClick={() => toggle("skills")}
      >
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>Strong communication</li>
          <li>Analytical & logical thinking</li>
          <li>Discipline & leadership</li>
          <li>Decision making</li>
          <li>Mental & physical toughness</li>
        </ul>
      </Card>

      {/* ================= REALITY CHECK ================= */}
      <Section>
        <h3 className="text-emerald-400 text-xl font-bold mb-2">
          ⚠️ Reality Check
        </h3>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Law success takes time – patience is key</li>
          <li>Judiciary & Defence exams are highly competitive</li>
          <li>Discipline & consistency matter more than talent</li>
        </ul>
      </Section>

      {/* ================= SUMMARY ================= */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
        <p className="text-emerald-400 font-semibold text-lg">
          👉 Law / Defence = Justice + Discipline + Authority + Nation Service
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
