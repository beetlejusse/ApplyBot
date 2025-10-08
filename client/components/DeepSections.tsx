"use client";

export default function DeepSections() {
  return (
    <>
      <section id="matching" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="gradient-border bg-black/25 rounded-2xl p-8 text-left">
            <h3 className="font-serif-title text-[28px] mb-3">ML Project Matching</h3>
            <p className="text-[#cfc4dc] mb-4">TF‑IDF similarity + technology alignment + keyword scoring. Cached with Redis for speed, tracked via MLflow.</p>
            <ul className="text-[#cfc4dc]/90 list-disc pl-5 space-y-2 text-sm">
              <li>Instant top‑5 project recommendations per job</li>
              <li>Confidence scores with explanations</li>
              <li>Cache hit rate 85%+ for repeated queries</li>
            </ul>
          </div>
          <div className="gradient-border bg-black/25 rounded-2xl p-8 text-left">
            <h3 className="font-serif-title text-[28px] mb-3">Job Sources</h3>
            <p className="text-[#cfc4dc] mb-4">Fetches from RemoteOK, GitHub, Reed, Adzuna with deduplication and graceful fallbacks.</p>
            <ul className="text-[#cfc4dc]/90 list-disc pl-5 space-y-2 text-sm">
              <li>~15 jobs per API call</li>
              <li>Source + external ID tracking</li>
              <li>Filters by keyword, location, company</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="resume" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="gradient-border bg-black/25 rounded-2xl p-8 text-left">
            <h3 className="font-serif-title text-[28px] mb-3">Resume Generation</h3>
            <p className="text-[#cfc4dc] mb-4">Professional PDF resumes using LaTeX with ReportLab fallback for portability.</p>
            <ul className="text-[#cfc4dc]/90 list-disc pl-5 space-y-2 text-sm">
              <li>2 seconds average generation</li>
              <li>Job‑specific customization via Jinja2</li>
              <li>Download via REST endpoint</li>
            </ul>
          </div>
          <div id="letters" className="gradient-border bg-black/25 rounded-2xl p-8 text-left">
            <h3 className="font-serif-title text-[28px] mb-3">Cover Letters</h3>
            <p className="text-[#cfc4dc] mb-4">Groq primary + OpenAI fallback with template safety. Bulk generation supported.</p>
            <ul className="text-[#cfc4dc]/90 list-disc pl-5 space-y-2 text-sm">
              <li>Personalized tone and project context</li>
              <li>Multi‑status responses with per‑job errors</li>
              <li>Zip bulk download endpoint</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}


