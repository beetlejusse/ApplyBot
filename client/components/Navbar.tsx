"use client";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
      <div className="nav-pill flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
            style={{
              background:
                "radial-gradient(100% 100% at 30% 30%,#c4b5fd 0%,#7c3aed 50%, #1e0b36 100%)",
            }}
          />
          <span className="font-semibold tracking-tight">ApplyBot</span>
          <nav className="hidden md:flex items-center gap-6 ml-4">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#matching" className="nav-link">
              Matching
            </a>
            <a href="#resume" className="nav-link">
              Resumes
            </a>
            <a href="#letters" className="nav-link">
              Letters
            </a>
            <a href="#api" className="nav-link">
              API
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-primary">Join Waitlist</button>
        </div>
      </div>
    </div>
  );
}


