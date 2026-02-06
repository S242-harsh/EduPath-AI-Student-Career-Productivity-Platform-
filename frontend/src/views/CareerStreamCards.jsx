import React from "react";

/* ===================== 12TH STREAM CARDS ===================== */
const STREAM_CARDS = [
  {
    id: "arts",
    title: "ARTS / HUMANITIES",
    desc: "UPSC, Teaching, Law, Media, Social Work",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "commerce",
    title: "COMMERCE",
    desc: "CA, CS, B.Com, MBA, Banking, Finance",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "science",
    title: "SCIENCE (PCM / PCB)",
    desc: "Engineering, Medical, Research, IT",
    img: "https://images.unsplash.com/photo-1581092918054-bc9f6f8a6b8a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "law",
    title: "LAW / DEFENCE / GOVT",
    desc: "LLB, Judiciary, NDA, Police, SSC",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "all",
    title: "ALL STREAMS (Any 12th)",
    desc: "Govt Exams, Private Jobs, Skill-based Careers",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  },
];

/* ===================== COMPONENT ===================== */
export default function CareerStreamCards({ setView }) {
  return (
    <div className="max-w-6xl mx-auto py-14 space-y-12">
      <h2 className="text-3xl font-bold text-emerald-500 text-center">
        Choose Your 12th Stream
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STREAM_CARDS.map((card) => (
          <div
            key={card.id}
            onClick={() => setView(card.id)}   // ✅ SAFE NOW
            className="cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden
                       hover:border-emerald-500/50 hover:shadow-lg
                       hover:shadow-emerald-500/10 transition-all duration-300"
          >
            <img
              src={card.img}
              alt={card.title}
              className="h-40 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-lg font-bold text-emerald-300 mb-2">
                {card.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {card.desc}
              </p>
              <p className="mt-4 text-emerald-400 text-sm font-semibold">
                Click to explore →
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
