"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LogOut, Search, Download, Users, RefreshCw, ChevronDown, ChevronUp, FileText } from "lucide-react";
import * as XLSX from "xlsx";

// Video 31 background for login
const VIDEO_URL = "/peace/8.mp4";

function getPosterFromVideo(videoUrl: string): string {
  // For local videos, return empty string (no poster)
  if (videoUrl.startsWith("/")) return "";
  return videoUrl
    .replace("/video/upload/q_auto,f_auto/", "/video/upload/so_0,f_jpg,q_auto/")
    .replace(".mp4", ".jpg");
}

function BackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const posterUrl = getPosterFromVideo(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const handlePlaying = () => setIsPlaying(true);
    video.addEventListener("playing", handlePlaying);
    const playVideo = () => {
      if (video.paused) video.play().catch(() => {});
    };
    video.addEventListener("loadedmetadata", playVideo);
    video.addEventListener("canplay", playVideo);
    playVideo();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && playVideo()),
      { threshold: 0.1 }
    );
    observer.observe(video);
    const handleInteraction = () => playVideo();
    document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    document.addEventListener("click", handleInteraction, { once: true });
    return () => {
      observer.disconnect();
      video.removeEventListener("playing", handlePlaying);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0"
      style={posterUrl ? { backgroundImage: `url(${posterUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : { backgroundColor: "#0A0A0A" }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0A0A0A]/80" />
    </div>
  );
}

interface AffiliatePayment {
  id: string;
  name: string;
  email: string;
  skool_username: string;
  payment_method: string;
  payment_handle: string;
  created_at: string;
}

interface QuizSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  track: string;
  archetype: string;
  archetype_name: string;
  bottleneck: string;
  recommended_tier: string;
  strike_zone: string;
  focus: string[];
  ignore_list: string;
  sixty_day_path: string;
  answers: Record<string, string>;
  created_at: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [affiliates, setAffiliates] = useState<AffiliatePayment[]>([]);
  const [affiliatesLoading, setAffiliatesLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<"affiliates" | "quiz">("affiliates");
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizSearch, setQuizSearch] = useState("");
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const sessionId = localStorage.getItem("ninja-admin-session");
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/admin/verify", {
          headers: { "x-admin-session": sessionId },
        });
        const data = await response.json();

        if (data.valid) {
          setIsAuthenticated(true);
          fetchAffiliates(sessionId);
          fetchQuizSubmissions(sessionId);
        } else {
          localStorage.removeItem("ninja-admin-session");
        }
      } catch {
        localStorage.removeItem("ninja-admin-session");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const fetchAffiliates = async (sessionId: string) => {
    setAffiliatesLoading(true);
    try {
      const response = await fetch("/api/admin/affiliate-payments", {
        headers: { "x-admin-session": sessionId },
      });
      const data = await response.json();

      if (data.success) {
        setAffiliates(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch affiliates:", error);
    } finally {
      setAffiliatesLoading(false);
    }
  };

  const fetchQuizSubmissions = async (sessionId: string) => {
    setQuizLoading(true);
    try {
      const response = await fetch("/api/quiz/submissions", {
        headers: { "x-admin-session": sessionId },
      });
      const data = await response.json();

      if (data.success) {
        setQuizSubmissions(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch quiz submissions:", error);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("ninja-admin-session", data.sessionId);
        setIsAuthenticated(true);
        fetchAffiliates(data.sessionId);
        fetchQuizSubmissions(data.sessionId);
      } else {
        setLoginError(data.error || "Invalid credentials");
      }
    } catch {
      setLoginError("Failed to login. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("ninja-admin-session");
    if (sessionId) {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { "x-admin-session": sessionId },
      });
    }
    localStorage.removeItem("ninja-admin-session");
    setIsAuthenticated(false);
    setAffiliates([]);
    setQuizSubmissions([]);
  };

  const handleRefresh = () => {
    const sessionId = localStorage.getItem("ninja-admin-session");
    if (sessionId) {
      if (activeTab === "affiliates") {
        fetchAffiliates(sessionId);
      } else {
        fetchQuizSubmissions(sessionId);
      }
    }
  };

  const handleExport = () => {
    const exportData = filteredAffiliates.map((a) => ({
      Name: a.name,
      Email: a.email,
      "Skool Username": a.skool_username,
      "Payment Method": a.payment_method,
      "Payment Handle": a.payment_handle,
      "Registered At": new Date(a.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Affiliates");
    XLSX.writeFile(workbook, `ninja-affiliates-${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const handleQuizExport = () => {
    const exportData = filteredQuizSubmissions.map((q) => ({
      Name: q.full_name,
      Email: q.email,
      Phone: q.phone,
      Track: q.track,
      Archetype: q.archetype_name,
      "Archetype Key": q.archetype,
      "Recommended Tier": q.recommended_tier,
      "Strike Zone": q.strike_zone,
      "Focus Areas": Array.isArray(q.focus) ? q.focus.join(", ") : "",
      "Ignore List": q.ignore_list,
      "60-Day Path": q.sixty_day_path,
      Bottleneck: q.bottleneck,
      Answers: JSON.stringify(q.answers),
      "Submitted At": new Date(q.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Submissions");
    XLSX.writeFile(workbook, `ninja-quiz-submissions-${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const filteredAffiliates = affiliates.filter((a) => {
    const query = searchQuery.toLowerCase();
    return (
      a.name.toLowerCase().includes(query) ||
      a.email.toLowerCase().includes(query) ||
      a.skool_username.toLowerCase().includes(query) ||
      a.payment_handle.toLowerCase().includes(query)
    );
  });

  const filteredQuizSubmissions = quizSubmissions.filter((q) => {
    const query = quizSearch.toLowerCase();
    return (
      q.full_name.toLowerCase().includes(query) ||
      q.email.toLowerCase().includes(query) ||
      q.phone.toLowerCase().includes(query) ||
      q.archetype_name.toLowerCase().includes(query) ||
      q.track.toLowerCase().includes(query)
    );
  });

  // Quiz stats helpers
  const explorerCount = quizSubmissions.filter((q) => q.track.toLowerCase() === "explorer").length;
  const practitionerCount = quizSubmissions.filter((q) => q.track.toLowerCase() === "practitioner").length;
  const masterCount = quizSubmissions.filter((q) => q.track.toLowerCase() === "master").length;

  const topArchetype = (() => {
    if (quizSubmissions.length === 0) return "N/A";
    const counts: Record<string, number> = {};
    quizSubmissions.forEach((q) => {
      counts[q.archetype_name] = (counts[q.archetype_name] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  })();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAF6E3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A853]"></div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAF6E3] flex items-center justify-center px-6 relative">
        <BackgroundVideo src={VIDEO_URL} />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="font-script text-5xl inline-block mb-4">
              Ninja AI
            </Link>
            <h1 className="font-serif text-2xl">Admin Dashboard</h1>
          </div>

          <form onSubmit={handleLogin} className="bg-[#0A0A0A]/70 backdrop-blur-md border border-[#FAF6E3]/20 rounded-2xl p-8 space-y-6">
            <div>
              <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans"
                placeholder="admin@ninja-ai.com"
              />
            </div>

            <div>
              <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans"
                placeholder="••••••••"
              />
            </div>

            {loginError && <p className="text-[#8B2332] text-sm font-sans">{loginError}</p>}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 rounded-full bg-[#D4A853] hover:bg-[#c49943] text-[#0A0A0A] font-sans font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-[#FAF6E3]/50 font-sans text-sm hover:text-[#FAF6E3] transition-colors">
              ← Back to Ninja AI
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF6E3]">
      {/* Header */}
      <header className="border-b border-[#FAF6E3]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-script text-3xl">
              Ninja AI
            </Link>
            <span className="text-[#FAF6E3]/30">|</span>
            <span className="font-sans text-[#FAF6E3]/60">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#FAF6E3]/60 hover:text-[#FAF6E3] transition-colors font-sans"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats - Affiliates */}
        {activeTab === "affiliates" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#D4A853]" />
                </div>
                <div>
                  <p className="font-sans text-[#FAF6E3]/60 text-sm">Total Affiliates</p>
                  <p className="font-serif text-3xl">{affiliates.length}</p>
                </div>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#9EB1C7]/20 flex items-center justify-center">
                  <span className="text-xl">💳</span>
                </div>
                <div>
                  <p className="font-sans text-[#FAF6E3]/60 text-sm">PayPal</p>
                  <p className="font-serif text-3xl">{affiliates.filter((a) => a.payment_method === "paypal").length}</p>
                </div>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8B2332]/20 flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <p className="font-sans text-[#FAF6E3]/60 text-sm">Venmo / Zelle</p>
                  <p className="font-serif text-3xl">
                    {affiliates.filter((a) => a.payment_method === "venmo" || a.payment_method === "zelle").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats - Quiz */}
        {activeTab === "quiz" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#D4A853]" />
                </div>
                <div>
                  <p className="font-sans text-[#FAF6E3]/60 text-sm">Total Submissions</p>
                  <p className="font-serif text-3xl">{quizSubmissions.length}</p>
                </div>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Explorer</p>
                <p className="font-serif text-3xl">{explorerCount}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Practitioner</p>
                <p className="font-serif text-3xl">{practitionerCount}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Master</p>
                <p className="font-serif text-3xl">{masterCount}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Top Archetype</p>
                <p className="font-serif text-lg mt-1">{topArchetype}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("affiliates")}
            className={`px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-colors ${
              activeTab === "affiliates"
                ? "bg-[#D4A853] text-[#0A0A0A]"
                : "bg-[#FAF6E3]/10 text-[#FAF6E3]/60 hover:bg-[#FAF6E3]/20"
            }`}
          >
            Affiliates
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-colors ${
              activeTab === "quiz"
                ? "bg-[#D4A853] text-[#0A0A0A]"
                : "bg-[#FAF6E3]/10 text-[#FAF6E3]/60 hover:bg-[#FAF6E3]/20"
            }`}
          >
            Quiz Submissions
          </button>
        </div>

        {/* Affiliates Tab Content */}
        {activeTab === "affiliates" && (
          <div className="border border-[#FAF6E3]/10 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-[#FAF6E3]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-serif text-2xl">Affiliate Registrations</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF6E3]/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search affiliates..."
                    className="pl-10 pr-4 py-2 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans text-sm w-full sm:w-64"
                  />
                </div>
                <button
                  onClick={handleRefresh}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FAF6E3]/10 hover:bg-[#FAF6E3]/20 rounded-xl font-sans text-sm transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${affiliatesLoading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0A] hover:bg-[#c49943] rounded-xl font-sans font-semibold text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export XLSX
                </button>
              </div>
            </div>

            {/* Table */}
            {affiliatesLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A853] mx-auto"></div>
              </div>
            ) : filteredAffiliates.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-[#FAF6E3]/60 font-sans">
                  {searchQuery ? "No affiliates match your search." : "No affiliate registrations yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#FAF6E3]/10">
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Name</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Email</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Skool Username</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Payment Method</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Payment Handle</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAffiliates.map((affiliate) => (
                      <tr key={affiliate.id} className="border-b border-[#FAF6E3]/5 hover:bg-[#FAF6E3]/5 transition-colors">
                        <td className="px-6 py-4 font-sans">{affiliate.name}</td>
                        <td className="px-6 py-4 font-sans text-[#FAF6E3]/70">{affiliate.email}</td>
                        <td className="px-6 py-4 font-sans text-[#FAF6E3]/70">{affiliate.skool_username}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium ${
                              affiliate.payment_method === "paypal"
                                ? "bg-blue-500/20 text-blue-400"
                                : affiliate.payment_method === "venmo"
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-purple-500/20 text-purple-400"
                            }`}
                          >
                            {affiliate.payment_method.charAt(0).toUpperCase() + affiliate.payment_method.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-[#D4A853]">{affiliate.payment_handle}</td>
                        <td className="px-6 py-4 font-sans text-[#FAF6E3]/50 text-sm">
                          {new Date(affiliate.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab Content */}
        {activeTab === "quiz" && (
          <div className="border border-[#FAF6E3]/10 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-[#FAF6E3]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-serif text-2xl">Quiz Submissions</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF6E3]/40" />
                  <input
                    type="text"
                    value={quizSearch}
                    onChange={(e) => setQuizSearch(e.target.value)}
                    placeholder="Search submissions..."
                    className="pl-10 pr-4 py-2 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans text-sm w-full sm:w-64"
                  />
                </div>
                <button
                  onClick={handleRefresh}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FAF6E3]/10 hover:bg-[#FAF6E3]/20 rounded-xl font-sans text-sm transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${quizLoading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <button
                  onClick={handleQuizExport}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0A] hover:bg-[#c49943] rounded-xl font-sans font-semibold text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export XLSX
                </button>
              </div>
            </div>

            {/* Table */}
            {quizLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A853] mx-auto"></div>
              </div>
            ) : filteredQuizSubmissions.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-[#FAF6E3]/60 font-sans">
                  {quizSearch ? "No submissions match your search." : "No quiz submissions yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#FAF6E3]/10">
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium w-8"></th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Name</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Email</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Phone</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Archetype</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Track</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Tier</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuizSubmissions.map((submission) => (
                      <>
                        <tr
                          key={submission.id}
                          onClick={() => setExpandedQuiz(expandedQuiz === submission.id ? null : submission.id)}
                          className="border-b border-[#FAF6E3]/5 hover:bg-[#FAF6E3]/5 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            {expandedQuiz === submission.id ? (
                              <ChevronUp className="w-4 h-4 text-[#FAF6E3]/40" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#FAF6E3]/40" />
                            )}
                          </td>
                          <td className="px-6 py-4 font-sans">{submission.full_name}</td>
                          <td className="px-6 py-4 font-sans text-[#FAF6E3]/70">{submission.email}</td>
                          <td className="px-6 py-4 font-sans text-[#FAF6E3]/70">{submission.phone}</td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-sans font-medium bg-[#D4A853]/20 text-[#D4A853]">
                              {submission.archetype_name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium ${
                                submission.track.toLowerCase() === "explorer"
                                  ? "bg-green-500/20 text-green-400"
                                  : submission.track.toLowerCase() === "practitioner"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-purple-500/20 text-purple-400"
                              }`}
                            >
                              {submission.track}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-sans text-[#FAF6E3]/70">{submission.recommended_tier}</td>
                          <td className="px-6 py-4 font-sans text-[#FAF6E3]/50 text-sm">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                        {expandedQuiz === submission.id && (
                          <tr key={`${submission.id}-detail`} className="border-b border-[#FAF6E3]/5">
                            <td colSpan={8} className="px-6 py-6 bg-[#FAF6E3]/[0.02]">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">Strike Zone</p>
                                    <p className="font-sans text-[#FAF6E3]/80 text-sm">{submission.strike_zone || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">Focus Areas</p>
                                    <div className="flex flex-wrap gap-2">
                                      {Array.isArray(submission.focus) && submission.focus.length > 0
                                        ? submission.focus.map((f, i) => (
                                            <span key={i} className="inline-block px-2 py-1 rounded-lg text-xs font-sans bg-[#FAF6E3]/10 text-[#FAF6E3]/70">
                                              {f}
                                            </span>
                                          ))
                                        : <span className="font-sans text-[#FAF6E3]/50 text-sm">N/A</span>}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">Ignore List</p>
                                    <p className="font-sans text-[#FAF6E3]/80 text-sm">{submission.ignore_list || "N/A"}</p>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">60-Day Path</p>
                                    <p className="font-sans text-[#FAF6E3]/80 text-sm">{submission.sixty_day_path || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">Bottleneck</p>
                                    <p className="font-sans text-[#FAF6E3]/80 text-sm">{submission.bottleneck || "N/A"}</p>
                                  </div>
                                </div>
                              </div>
                              {submission.answers && Object.keys(submission.answers).length > 0 && (
                                <div className="mt-6">
                                  <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-3">Quiz Answers</p>
                                  <div className="space-y-2">
                                    {Object.entries(submission.answers).map(([question, answer]) => (
                                      <div key={question} className="bg-[#FAF6E3]/5 rounded-xl p-3">
                                        <p className="font-sans text-xs text-[#FAF6E3]/50 mb-1">{question}</p>
                                        <p className="font-sans text-sm text-[#FAF6E3]/80">{answer}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#FAF6E3]/10 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-sans text-xs text-[#FAF6E3]/30">&copy; 2026 Ninja AI Automation. Admin Dashboard.</span>
        </div>
      </footer>
    </div>
  );
}
