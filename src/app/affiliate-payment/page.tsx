"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign, Check } from "lucide-react";

// Video background (same as affiliates page)
const VIDEO_URL = "/peace/2.mp4";

function getPosterFromVideo(videoUrl: string): string {
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
      style={{ backgroundImage: `url(${posterUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
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

export default function AffiliatePayment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skoolUsername: '',
    paymentMethod: 'paypal' as 'paypal' | 'venmo' | 'zelle',
    paymentHandle: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/affiliate/payment-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF6E3] relative">
      <BackgroundVideo src={VIDEO_URL} />

      {/* Header */}
      <div className="relative z-10 border-b border-[#FAF6E3]/10 bg-[#0A0A0A]/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/affiliates" className="inline-flex items-center gap-2 text-[#FAF6E3]/60 hover:text-[#FAF6E3] transition-colors font-sans">
            <ArrowLeft className="w-4 h-4" />
            Back to Affiliates
          </Link>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D4A853]/20 text-[#D4A853] px-4 py-2 rounded-full mb-6 font-sans text-sm font-medium">
            <DollarSign className="w-4 h-4" />
            100% Commission Registration
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Register for 100% Payouts
          </h1>
          <p className="font-sans text-[#FAF6E3]/60 max-w-lg mx-auto">
            <span className="font-semibold text-[#FAF6E3]">Skool caps commissions at 50%.</span> Fill out this form so I can send you the other 50% every other Monday.
          </p>
        </div>

        {/* How 100% works breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="p-6 border border-[#9EB1C7]/30 rounded-2xl">
            <span className="text-3xl mb-3 block">🤖</span>
            <h3 className="font-serif text-xl text-[#9EB1C7] mb-2">Automatic (50%)</h3>
            <p className="font-sans text-[#FAF6E3]/60 text-sm">
              Skool pays you instantly
            </p>
          </div>
          <div className="p-6 border border-[#D4A853]/30 rounded-2xl">
            <span className="text-3xl mb-3 block">💸</span>
            <h3 className="font-serif text-xl text-[#D4A853] mb-2">Manual (50%)</h3>
            <p className="font-sans text-[#FAF6E3]/60 text-sm">
              I pay you every other Monday
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#0A0A0A]/70 backdrop-blur-md border border-[#FAF6E3]/20 rounded-2xl p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-12">
              {/* Success Icon */}
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-[#D4A853]/20 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4A853] to-[#c49943] flex items-center justify-center">
                  <Check className="w-12 h-12 text-[#0A0A0A]" />
                </div>
              </div>

              <h3 className="font-serif text-3xl text-[#D4A853] mb-4">
                You&apos;re All Set!
              </h3>
              <p className="font-sans text-[#FAF6E3]/60 mb-10 max-w-md mx-auto">
                Your payment information has been saved. Check your {formData.paymentMethod.charAt(0).toUpperCase() + formData.paymentMethod.slice(1)} every other Monday for payouts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/affiliates"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4A853] text-[#0A0A0A] font-sans font-semibold rounded-full hover:bg-[#c49943] transition-colors"
                >
                  Get Your Affiliate Link
                </Link>
                <a
                  href="https://www.skool.com/ninjas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#FAF6E3]/20 text-[#FAF6E3] font-sans font-semibold rounded-full hover:bg-[#FAF6E3]/10 transition-colors"
                >
                  Return to Ninja AI
                </a>
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">Skool Username *</label>
                <input
                  type="text"
                  required
                  value={formData.skoolUsername}
                  onChange={(e) => setFormData({ ...formData, skoolUsername: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans"
                  placeholder="Your Skool username"
                />
              </div>

              <div>
                <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">Payment Method *</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['paypal', 'venmo', 'zelle'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      className={`py-3 px-4 rounded-xl font-sans font-semibold transition-all ${
                        formData.paymentMethod === method
                          ? 'bg-[#D4A853] text-[#0A0A0A]'
                          : 'bg-[#FAF6E3]/10 text-[#FAF6E3] hover:bg-[#FAF6E3]/20'
                      }`}
                    >
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">
                  {formData.paymentMethod === 'paypal' ? 'PayPal Email' :
                   formData.paymentMethod === 'venmo' ? 'Venmo Username' :
                   'Zelle Phone or Email'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.paymentHandle}
                  onChange={(e) => setFormData({ ...formData, paymentHandle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans"
                  placeholder={
                    formData.paymentMethod === 'paypal' ? 'your@paypal.com' :
                    formData.paymentMethod === 'venmo' ? '@YourVenmo' :
                    'Phone or email for Zelle'
                  }
                />
              </div>

              {error && (
                <p className="text-[#8B2332] text-sm font-sans">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#D4A853] hover:bg-[#c49943] text-[#0A0A0A] font-sans font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Register for Payouts'}
              </button>

              <p className="text-[#FAF6E3]/50 text-xs text-center font-sans">
                Payouts go out every other Monday. You&apos;ll receive 50% via Skool automatically, and 50% from me via your chosen method.
              </p>
            </>
          )}
        </form>

        {/* Bottom link */}
        {!submitted && (
          <div className="text-center mt-8">
            <p className="text-[#FAF6E3]/50 font-sans text-sm">
              Need your affiliate link? <Link href="/affiliates" className="text-[#D4A853] hover:underline">Go to the affiliates page</Link>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-8 border-t border-[#FAF6E3]/10 mt-auto bg-[#0A0A0A]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="font-script text-2xl">
            Ninja AI
          </Link>
          <span className="font-sans text-xs text-[#FAF6E3]/30"><a href="/admin" className="hover:text-[#FAF6E3]/50 transition-colors">&copy;</a> 2026 Ninja AI Automation. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
