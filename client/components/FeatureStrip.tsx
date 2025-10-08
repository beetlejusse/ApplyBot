"use client";

export default function FeatureStrip() {
  const features = [
    {
      t: "Project Matching",
      d: "TF‑IDF + keyword alignment to surface your most relevant work.",
    },
    { t: "Resume Engine", d: "Elegant LaTeX/PDF resumes tailored per role in seconds." },
    { t: "Cover Letters", d: "Personalized letters that actually sound like you—powered by AI." },
  ];

  return (
    <section id="features" className="px-6 pb-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="gradient-border bg-black/20 rounded-2xl p-6 text-left">
            <h3 className="font-alt text-xl mb-2">{f.t}</h3>
            <p className="text-sm text-[#cfc4dc] leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


