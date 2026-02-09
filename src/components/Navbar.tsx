"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
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
            ✨💗🦋 Light Heart Vision
          </a>

          {/* Nav Links - only show on non-quiz pages */}
          {!isQuizPage && (
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#why"
                className="font-sans text-sm text-white/70 hover:text-[#EF4444] transition-colors"
              >
                The Vision
              </a>
              <a
                href="#features"
                className="font-sans text-sm text-white/70 hover:text-[#EF4444] transition-colors"
              >
                What&apos;s Inside
              </a>
              <a
                href="#for-you"
                className="font-sans text-sm text-white/70 hover:text-[#EF4444] transition-colors"
              >
                Is This For You?
              </a>
              
              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowResourcesDropdown(true)}
                onMouseLeave={() => setShowResourcesDropdown(false)}
              >
                <button className="font-sans text-sm text-white/70 hover:text-[#EF4444] transition-colors flex items-center gap-1">
                  Spiritual Resources
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {showResourcesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                    <a
                      href="/spiritual-affirmations"
                      className="block px-4 py-3 text-sm text-white/70 hover:text-[#EF4444] hover:bg-white/5 transition-colors border-b border-white/10"
                    >
                      <div className="font-medium">Daily Affirmations</div>
                      <div className="text-xs text-white/50">25 Spiritual Business Affirmations</div>
                    </a>
                    <a
                      href="/sacred-business-models"
                      className="block px-4 py-3 text-sm text-white/70 hover:text-[#EF4444] hover:bg-white/5 transition-colors border-b border-white/10"
                    >
                      <div className="font-medium">Sacred Business Models</div>
                      <div className="text-xs text-white/50">67 Soul-Aligned Revenue Streams</div>
                    </a>
                    <a
                      href="/spiritual-tech-integration"
                      className="block px-4 py-3 text-sm text-white/70 hover:text-[#EF4444] hover:bg-white/5 transition-colors"
                    >
                      <div className="font-medium">Spiritual-Tech Integration</div>
                      <div className="text-xs text-white/50">50+ Digital Templates</div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {!isQuizPage && (
              <a
                href="/quiz"
                className="font-sans text-xs tracking-widest uppercase px-6 py-2 bg-[#EF4444] text-white hover:bg-[#DC2626] transition-all duration-300 rounded-sm"
              >
                Heart Path Assessment
              </a>
            )}
            {isQuizPage && (
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-widest uppercase px-6 py-2 bg-[#EF4444] text-white hover:bg-[#DC2626] transition-all duration-300 rounded-sm"
              >
                Book a Conversation
              </a>
            )}
            <a
              href="https://www.skool.com/lightheartvision"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs tracking-widest uppercase px-6 py-2 border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all duration-300 rounded-sm"
            >
              Join Free
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
