"use client";

export default function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif-title text-[36px] md:text-[48px] mb-4">Be first to try ApplyBot</h2>
        <p className="text-[#cfc4dc] mb-8 font-alt">Join the early access list and get launch perks.</p>
        <div className="mx-auto max-w-lg pill flex items-center gap-3 justify-between">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder-gray-500"
          />
          <button className="pill-button">Join Waitlist</button>
        </div>
      </div>
    </section>
  );
}


