"use client";

export default function Hero() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl w-full text-center">
        <h1 className="font-serif-title text-[42px] md:text-[64px] leading-[1.1] tracking-tight mb-4">
          Good things come to those who <span className="italic gradient-text">apply.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#cfc4dc] max-w-3xl mx-auto mb-10 font-alt">
          AI that crafts resumes and cover letters, matches your projects to roles, and lets you apply with style.
        </p>

        <div className="mx-auto max-w-xl pill flex items-center gap-3 justify-between">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder-gray-500"
          />
          <button className="pill-button">Get Notified</button>
        </div>
      </div>
    </main>
  );
}


