import { useState } from "react";

/* =====================================================
   COMMERCE – COMPLETE CAREER GUIDE
===================================================== */

export default function CommerceDetails({ onBack }) {
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
        Commerce – Complete Career Guide
      </h1>

      {/* ================= OVERVIEW ================= */}
      <Section>
        <p className="text-slate-300 text-lg leading-relaxed">
          Commerce stream is ideal for students interested in
          <b> business, money management, finance, economics and corporate world</b>.
          <br /><br />
          This stream opens careers in <b>accounting, banking, finance,
          management, entrepreneurship and corporate leadership</b>.
        </p>
      </Section>

      {/* ================= SUBJECTS ================= */}
      <Card
        title="📚 Core Subjects in Commerce"
        open={open === "subjects"}
        onClick={() => toggle("subjects")}
      >
        <ul className="space-y-4 text-slate-300">
          <li>
            <b className="text-emerald-400">Accountancy</b>
            <p>Financial Accounting, Cost Accounting, Auditing</p>
            <p className="text-sm text-slate-400">
              Careers: CA, Accountant, Auditor
            </p>
          </li>

          <li>
            <b className="text-emerald-400">Business Studies</b>
            <p>Management, Marketing, HR, Operations</p>
            <p className="text-sm text-slate-400">
              Careers: Manager, Entrepreneur
            </p>
          </li>

          <li>
            <b className="text-emerald-400">Economics</b>
            <p>Micro, Macro, Indian & Global Economy</p>
            <p className="text-sm text-slate-400">
              Careers: Economist, Analyst, Banking
            </p>
          </li>

          <li>
            <b className="text-emerald-400">Mathematics</b>
            <p>Statistics, Financial Maths</p>
            <p className="text-sm text-slate-400">
              Careers: Finance, Data Analysis
            </p>
          </li>
        </ul>
      </Card>

      {/* ================= COURSES ================= */}
      <Card
        title="🎓 Courses After Commerce"
        open={open === "courses"}
        onClick={() => toggle("courses")}
      >
        <div className="grid md:grid-cols-2 gap-8 text-slate-300">
          <div>
            <h3 className="text-emerald-400 font-bold mb-2">Degree Courses</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>B.Com (General / Honours)</li>
              <li>BBA</li>
              <li>BMS</li>
              <li>B.Com + MBA (Integrated)</li>
              <li>B.Sc Economics</li>
            </ul>
          </div>

          <div>
            <h3 className="text-emerald-400 font-bold mb-2">Professional Courses</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>CA (Chartered Accountant)</li>
              <li>CS (Company Secretary)</li>
              <li>CMA (Cost & Management Accountant)</li>
              <li>MBA</li>
              <li>CFA</li>
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
            title="Chartered Accountant (CA)"
            salary="₹8 – 30 LPA"
            exams="CA Foundation, Inter, Final"
            pros={[
              "High income",
              "Corporate respect",
              "Global demand",
            ]}
            cons={[
              "Very tough exams",
              "Long preparation",
            ]}
            roadmap={[
              "12th Commerce",
              "CA Foundation",
              "CA Inter",
              "Articleship",
              "CA Final",
            ]}
          />

          <Career
            title="Company Secretary (CS)"
            salary="₹6 – 20 LPA"
            exams="CS Foundation, Executive, Professional"
            pros={[
              "Corporate law expertise",
              "Top management exposure",
            ]}
            cons={[
              "Strict exams",
            ]}
          />

          <Career
            title="Banker / Finance Officer"
            salary="₹5 – 15 LPA"
            exams="IBPS, SBI, RBI"
            pros={[
              "Job security",
              "Good work-life balance",
            ]}
            cons={[
              "Transfers",
            ]}
          />

          <Career
            title="Business Manager / MBA"
            salary="₹6 – 25 LPA"
            exams="CAT, XAT, MAT"
            pros={[
              "Leadership roles",
              "Fast career growth",
            ]}
            cons={[
              "High competition",
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
          <li>CA / CS / CMA Exams</li>
          <li>CAT / XAT / MAT</li>
          <li>IBPS / SBI / RBI</li>
          <li>CUET</li>
          <li>SSC CGL</li>
        </ul>
      </Card>

      {/* ================= SKILLS ================= */}
      <Card
        title="🧠 Skills Required"
        open={open === "skills"}
        onClick={() => toggle("skills")}
      >
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>Numerical ability</li>
          <li>Financial analysis</li>
          <li>Business communication</li>
          <li>Decision making</li>
          <li>Leadership & management</li>
        </ul>
      </Card>

      {/* ================= REALITY CHECK ================= */}
      <Section>
        <h3 className="text-emerald-400 text-xl font-bold mb-2">
          ⚠️ Reality Check
        </h3>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Professional courses need patience & discipline</li>
          <li>Commerce rewards consistency more than shortcuts</li>
          <li>Skills + degree = long term success</li>
        </ul>
      </Section>

      {/* ================= SUMMARY ================= */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
        <p className="text-emerald-400 font-semibold text-lg">
          👉 Commerce = Business + Money + Management + Strategy
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
