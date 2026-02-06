import { useState } from "react";

/* =====================================================
   ARTS / HUMANITIES – COMPLETE CAREER GUIDE (MEGA FILE)
   Author: You 😎
   Level: Career Portal / Startup MVP
===================================================== */

export default function ArtsDetails({ onBack }) {
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
        Arts / Humanities – Complete Career Guide
      </h1>

      {/* ================= OVERVIEW ================= */}
      <Section>
        <p className="text-slate-300 text-lg leading-relaxed">
          Arts / Humanities stream focuses on <b>society, government, law,
          psychology, culture, economy and communication</b>.
          <br /><br />
          This stream is best suited for students interested in
          <b> Civil Services, Law, Teaching, Media, Social Work,
          Policy Making and Research</b>.
        </p>
      </Section>

      {/* ================= SUBJECTS ================= */}
      <Card
        title="📚 Subjects in Arts (Detailed)"
        open={open === "subjects"}
        onClick={() => toggle("subjects")}
      >
        <ul className="space-y-4 text-slate-300">
          <li>
            <b className="text-emerald-400">History</b>
            <p>Ancient, Medieval, Modern, World History</p>
            <p className="text-sm text-slate-400">Careers: UPSC, Teaching, Research</p>
          </li>

          <li>
            <b className="text-emerald-400">Political Science</b>
            <p>Constitution, Governance, International Relations</p>
            <p className="text-sm text-slate-400">Careers: IAS, Policy Analyst, Law</p>
          </li>

          <li>
            <b className="text-emerald-400">Geography</b>
            <p>Physical, Human & Economic Geography</p>
            <p className="text-sm text-slate-400">Careers: Planning, Teaching, UPSC</p>
          </li>

          <li>
            <b className="text-emerald-400">Psychology</b>
            <p>Human Behaviour, Counselling, Mental Health</p>
            <p className="text-sm text-slate-400">Careers: Psychologist, HR, Counsellor</p>
          </li>

          <li>
            <b className="text-emerald-400">Sociology</b>
            <p>Society, Culture, Social Issues</p>
            <p className="text-sm text-slate-400">Careers: NGOs, Research, UPSC</p>
          </li>

          <li>
            <b className="text-emerald-400">Economics</b>
            <p>Micro, Macro, Indian Economy</p>
            <p className="text-sm text-slate-400">Careers: Economist, Analyst, Banking</p>
          </li>
        </ul>
      </Card>

      {/* ================= COURSES ================= */}
      <Card
        title="🎓 Courses After Arts"
        open={open === "courses"}
        onClick={() => toggle("courses")}
      >
        <div className="grid md:grid-cols-2 gap-8 text-slate-300">
          <div>
            <h3 className="text-emerald-400 font-bold mb-2">Undergraduate</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>BA (History / Pol Sci / Sociology / Psychology)</li>
              <li>BA + LLB</li>
              <li>BJMC (Journalism & Media)</li>
              <li>BSW (Social Work)</li>
              <li>B.Ed</li>
            </ul>
          </div>

          <div>
            <h3 className="text-emerald-400 font-bold mb-2">Postgraduate</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>MA (Arts subjects)</li>
              <li>LLM</li>
              <li>MSW</li>
              <li>M.Ed</li>
              <li>MBA</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* ================= CAREERS ================= */}
      <Card
        title="💼 Career Options (Deep Dive)"
        open={open === "careers"}
        onClick={() => toggle("careers")}
      >
        <div className="space-y-6 text-slate-300">

          <Career
            title="Civil Services (IAS / IPS)"
            salary="₹56,100 – ₹2,50,000 + perks"
            exams="UPSC CSE"
            pros={["Power & authority", "Respect", "Nation service"]}
            cons={["Very tough exam", "Low success rate", "Long preparation"]}
            roadmap={[
              "12th Arts",
              "Graduation",
              "UPSC Preparation",
              "Interview",
              "Training"
            ]}
          />

          <Career
            title="Lawyer / Judiciary"
            salary="₹4 – 15 LPA"
            exams="CLAT, Judiciary Exams"
            pros={["High income potential", "Respect"]}
            cons={["Initial struggle", "Long working hours"]}
          />

          <Career
            title="Journalist / Media"
            salary="₹3 – 8 LPA"
            exams="CUET, Media Entrances"
            pros={["Creative field", "Public exposure"]}
            cons={["Low starting salary", "High pressure"]}
          />

        </div>
      </Card>

      {/* ================= EXAMS ================= */}
      <Card
        title="📝 Competitive Exams"
        open={open === "exams"}
        onClick={() => toggle("exams")}
      >
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>UPSC Civil Services</li>
          <li>State PSC</li>
          <li>SSC (CGL / CHSL)</li>
          <li>Judiciary Exams</li>
          <li>NET / SET</li>
          <li>CUET (UG / PG)</li>
        </ul>
      </Card>

      {/* ================= SKILLS ================= */}
      <Card
        title="🧠 Skills Required"
        open={open === "skills"}
        onClick={() => toggle("skills")}
      >
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>Critical thinking</li>
          <li>Reading & writing</li>
          <li>Public speaking</li>
          <li>Analytical skills</li>
          <li>Social awareness</li>
        </ul>
      </Card>

      {/* ================= REALITY CHECK ================= */}
      <Section>
        <h3 className="text-emerald-400 text-xl font-bold mb-2">
          ⚠️ Reality Check
        </h3>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>UPSC success rate is less than 1%</li>
          <li>Law requires patience in early years</li>
          <li>Journalism salary starts low</li>
        </ul>
      </Section>

      {/* ================= SUMMARY ================= */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
        <p className="text-emerald-400 font-semibold text-lg">
          👉 Arts = Thinking + Society + Governance + Law + Communication
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
          {pros.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      <div>
        <b>Cons:</b>
        <ul className="list-disc pl-6">
          {cons.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>

      {roadmap && (
        <div>
          <b>Roadmap:</b>
          <ol className="list-decimal pl-6">
            {roadmap.map((r, i) => <li key={i}>{r}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}
