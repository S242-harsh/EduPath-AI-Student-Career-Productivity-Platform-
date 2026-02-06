import { useState } from "react";

/* =====================================================
   SCIENCE (PCM / PCB) – COMPLETE CAREER GUIDE
===================================================== */

export default function ScienceDetails({ onBack }) {
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
        Science (PCM / PCB) – Complete Career Guide
      </h1>

      {/* ================= OVERVIEW ================= */}
      <Section>
        <p className="text-slate-300 text-lg leading-relaxed">
          Science stream is for students who are interested in
          <b> logic, experimentation, technology, medicine and innovation</b>.
          <br /><br />
          It opens doors to careers in <b>engineering, medicine, research,
          IT, defence technology and pure sciences</b>.
        </p>
      </Section>

      {/* ================= SUBJECTS ================= */}
      <Card
        title="📚 Core Subjects (PCM / PCB)"
        open={open === "subjects"}
        onClick={() => toggle("subjects")}
      >
        <ul className="space-y-4 text-slate-300">
          <li>
            <b className="text-emerald-400">Physics</b>
            <p>Mechanics, Electricity, Magnetism, Modern Physics</p>
            <p className="text-sm text-slate-400">
              Careers: Engineering, Research, Defence
            </p>
          </li>

          <li>
            <b className="text-emerald-400">Chemistry</b>
            <p>Organic, Inorganic, Physical Chemistry</p>
            <p className="text-sm text-slate-400">
              Careers: Pharmacy, Research, Industry
            </p>
          </li>

          <li>
            <b className="text-emerald-400">Mathematics (PCM)</b>
            <p>Algebra, Calculus, Statistics</p>
            <p className="text-sm text-slate-400">
              Careers: Engineering, Data Science, Analytics
            </p>
          </li>

          <li>
            <b className="text-emerald-400">Biology (PCB)</b>
            <p>Botany, Zoology, Human Physiology</p>
            <p className="text-sm text-slate-400">
              Careers: Doctor, Researcher, Biotechnology
            </p>
          </li>
        </ul>
      </Card>

      {/* ================= COURSES ================= */}
      <Card
        title="🎓 Courses After Science"
        open={open === "courses"}
        onClick={() => toggle("courses")}
      >
        <div className="grid md:grid-cols-2 gap-8 text-slate-300">
          <div>
            <h3 className="text-emerald-400 font-bold mb-2">PCM Based</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>B.Tech / B.E</li>
              <li>B.Sc (Physics / Maths / CS)</li>
              <li>BCA</li>
              <li>Defence Technical Courses</li>
              <li>Integrated MSc</li>
            </ul>
          </div>

          <div>
            <h3 className="text-emerald-400 font-bold mb-2">PCB Based</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>MBBS</li>
              <li>BDS</li>
              <li>BAMS / BHMS</li>
              <li>B.Sc Nursing</li>
              <li>B.Pharmacy</li>
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
            title="Engineer (IT / Core)"
            salary="₹4 – 20 LPA"
            exams="JEE, State CETs"
            pros={[
              "High demand",
              "Good salary growth",
              "Global opportunities",
            ]}
            cons={[
              "Competitive field",
              "Continuous learning required",
            ]}
            roadmap={[
              "12th PCM",
              "B.Tech / B.E",
              "Internships",
              "Job / Higher Studies",
            ]}
          />

          <Career
            title="Doctor (MBBS)"
            salary="₹6 – 25 LPA"
            exams="NEET"
            pros={[
              "High respect",
              "Stable career",
              "Service to society",
            ]}
            cons={[
              "Long study duration",
              "High pressure",
            ]}
            roadmap={[
              "12th PCB",
              "NEET",
              "MBBS",
              "Internship",
              "Practice / PG",
            ]}
          />

          <Career
            title="Scientist / Researcher"
            salary="₹6 – 18 LPA"
            exams="IIT JAM, CSIR NET"
            pros={[
              "Innovation driven",
              "Intellectual growth",
            ]}
            cons={[
              "Long academic path",
              "Limited positions",
            ]}
          />

          <Career
            title="IT / Data Professional"
            salary="₹5 – 30 LPA"
            exams="Private hiring / GATE (PSUs)"
            pros={[
              "Fast growth",
              "Remote opportunities",
            ]}
            cons={[
              "Skill obsolescence",
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
          <li>JEE (Main / Advanced)</li>
          <li>NEET</li>
          <li>IIT JAM</li>
          <li>GATE</li>
          <li>CSIR NET</li>
          <li>State CETs</li>
        </ul>
      </Card>

      {/* ================= SKILLS ================= */}
      <Card
        title="🧠 Skills Required"
        open={open === "skills"}
        onClick={() => toggle("skills")}
      >
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>Logical thinking</li>
          <li>Problem solving</li>
          <li>Analytical mindset</li>
          <li>Technical skills</li>
          <li>Curiosity & experimentation</li>
        </ul>
      </Card>

      {/* ================= REALITY CHECK ================= */}
      <Section>
        <h3 className="text-emerald-400 text-xl font-bold mb-2">
          ⚠️ Reality Check
        </h3>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Engineering & Medical exams are highly competitive</li>
          <li>Skills matter more than degree in long term</li>
          <li>Continuous learning is compulsory</li>
        </ul>
      </Section>

      {/* ================= SUMMARY ================= */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
        <p className="text-emerald-400 font-semibold text-lg">
          👉 Science = Logic + Technology + Innovation + Research
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
