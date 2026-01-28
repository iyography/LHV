"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isQuizPage = pathname === "/quiz";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/80 backdrop-blur-md ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="font-ninja text-xl md:text-2xl text-white hover:opacity-80 transition-all duration-300"
          >
            Alive Again
          </a>

          {/* Nav Links - only show on non-quiz pages */}
          {!isQuizPage && (
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#why"
                className="font-sans text-sm text-white/70 hover:text-white transition-colors"
              >
                My Story
              </a>
              <a
                href="#features"
                className="font-sans text-sm text-white/70 hover:text-white transition-colors"
              >
                What I Offer
              </a>
              <a
                href="#for-you"
                className="font-sans text-sm text-white/70 hover:text-white transition-colors"
              >
                For You
              </a>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {!isQuizPage && (
              <a
                href="/quiz"
                className="font-sans text-xs tracking-widest uppercase px-6 py-2 bg-[#9EB1C7] text-[#0A0A0A] hover:bg-[#b8c9d9] transition-all duration-300 rounded-sm"
              >
                Take the Pulse Check
              </a>
            )}
            {isQuizPage && (
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-widest uppercase px-6 py-2 bg-[#9EB1C7] text-[#0A0A0A] hover:bg-[#b8c9d9] transition-all duration-300 rounded-sm"
              >
                Book a Conversation
              </a>
            )}
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs tracking-widest uppercase px-6 py-2 bg-[#D4A853] text-[#0A0A0A] hover:bg-[#c49943] transition-all duration-300 rounded-sm"
            >
              Join Our Space
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
