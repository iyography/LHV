"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

// Hero video URL - optimized for streaming
const HERO_VIDEO_URL = "/peace/3.mp4";

// Generate poster image URL from Cloudinary video URL
function getPosterFromVideo(videoUrl: string): string {
  if (videoUrl.startsWith("/")) return "";
  return videoUrl
    .replace("/video/upload/q_auto,f_auto/", "/video/upload/so_0,f_jpg,q_auto/")
    .replace(".mp4", ".jpg");
}

// AutoPlay Video component - shows poster immediately, then video when ready
function AutoPlayVideo({ src, className }: { src: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const posterUrl = getPosterFromVideo(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted state (required for autoplay)
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playVideo = () => {
      if (video.paused) {
        video.play().then(() => {
          setIsReady(true);
        }).catch(() => {
          video.muted = true;
          video.play().then(() => setIsReady(true)).catch(() => {});
        });
      }
    };

    // Show video once it's playing
    const handlePlaying = () => setIsReady(true);
    video.addEventListener("playing", handlePlaying);

    // Try to play on various events
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);

    // Immediate play attempt
    playVideo();

    // Retry intervals for reliability
    const retryIntervals = [50, 100, 200, 400, 800, 1200, 1600, 2000, 3000];
    const timeouts = retryIntervals.map((ms) => setTimeout(playVideo, ms));

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) playVideo();
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // User interaction fallback
    const handleInteraction = () => playVideo();
    document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { once: true, passive: true });

    return () => {
      observer.disconnect();
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      timeouts.forEach(clearTimeout);
    };
  }, [src]);

  return (
    <div className={className} style={{ backgroundImage: `url(${posterUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

// ============================================
// DESIGN 1: Dark Luxe (Current)
// ============================================
function Design1() {
  const videos = {
    hero: "/peace/1.mp4",
    about: "/peace/5.mp4",
    midStatement: "/peace/12.mp4",
    whatIsnt: "/peace/10.mp4",
  };

  return (
    <div className="bg-[#0A0A0A] text-[#FAF6E3] relative">
      {/* Hero */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src={videos.hero} type="video/mp4" />
        </video>
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-20 max-w-5xl mx-auto px-8 py-32 text-center">
          <h1 className="font-ninja text-5xl md:text-7xl lg:text-9xl leading-tight mb-8">
            Alive Again
          </h1>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#FAF6E3] max-w-3xl mx-auto mb-6 leading-relaxed">
            Calm your mind. Heal yourself. Take back your inner power.
          </p>
          <p className="font-sans text-xl md:text-2xl text-[#FAF6E3]/70 max-w-2xl mx-auto mb-12">
            Energy healing. Qigong. Reiki. Daoist wisdom. Guided by a lifetime of practice.
          </p>
          <a href="/quiz" className="inline-block font-sans font-semibold bg-[#D4A853] text-[#0A0A0A] px-12 py-4 rounded-full hover:bg-[#c49943] transition-colors">
            Take the Pulse Check
          </a>
        </div>
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <span className="font-sans text-xs tracking-widest text-[#D4A853]/60">LI HEPING</span>
          <span className="font-sans text-xs tracking-widest text-[#D4A853]/60">FEEL FULLY ALIVE AGAIN</span>
        </div>
      </section>

      {/* Behind the Curtain - Video & Text */}
      <section id="why" className="grid lg:grid-cols-2">
        <div className="aspect-square lg:aspect-auto lg:h-screen relative">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videos.about} type="video/mp4" />
          </video>
        </div>
        <div className="flex items-center justify-center p-12 lg:p-24">
          <div className="max-w-lg">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-6">My Story</span>
            <h2 className="font-ninja text-3xl lg:text-4xl leading-relaxed mb-8">
              From grief to healing. From silence to service.
            </h2>
            <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed mb-6">
              Over 30 years ago, I lost my daughter. I fell into deep depression. My health crashed. I withdrew from the world. The only emotion I felt was anger — otherwise I felt like a zombie.
            </p>
            <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed mb-6">
              Then I discovered Reiki, studied Traditional Chinese Medicine, trained under a Medical Qigong Master, and was eventually ordained as a Daoist Priest. Each step brought me closer to feeling fully alive again.
            </p>
            <p className="font-serif text-2xl text-[#D4A853] italic">
              Now I help others find that same path back to themselves.
            </p>
          </div>
        </div>
      </section>

      {/* What Happens Here */}
      <section id="features" className="py-24 px-8 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-4 text-center">What I Offer</span>
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="p-10 border border-[#FAF6E3]/10 rounded-2xl">
              <span className="text-4xl mb-4 block">&#x2728;</span>
              <h3 className="font-ninja text-2xl mb-4">Energy Sessions</h3>
              <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed">
                Over 2,000 sessions with clients. Reiki and energy healing that helps your body release what it&apos;s been holding. 170+ five-star reviews.
              </p>
            </div>
            <div className="p-10 border border-[#FAF6E3]/10 rounded-2xl">
              <span className="text-4xl mb-4 block">&#x1F331;</span>
              <h3 className="font-ninja text-2xl mb-4">Qigong Teaching</h3>
              <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed">
                Medical Qigong routines passed down from a true master. Simple, powerful practices you can use every day to restore your energy.
              </p>
            </div>
            <div className="p-10 border border-[#FAF6E3]/10 rounded-2xl">
              <span className="text-4xl mb-4 block">&#x1F9D8;</span>
              <h3 className="font-ninja text-2xl mb-4">Reiki Training</h3>
              <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed">
                From Level 1 through Reiki Master. Many of my graduates have gone on to start their own healing practices.
              </p>
            </div>
            <div className="p-10 border border-[#FAF6E3]/10 rounded-2xl">
              <span className="text-4xl mb-4 block">&#x262F;</span>
              <h3 className="font-ninja text-2xl mb-4">Coaching &amp; Guidance</h3>
              <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed">
                Rooted in Daoist wisdom and Traditional Chinese Medicine. I help people calm their mind, understand their body, and take back their power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid Statement */}
      <section className="h-[70vh] relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videos.midStatement} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <p className="font-ninja text-4xl md:text-6xl text-white text-center px-8">
            Your body knows how to heal. Let it.
          </p>
        </div>
      </section>

      {/* The Clan */}
      <section id="for-you" className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-6">For You</span>
          <p className="font-serif text-3xl lg:text-4xl leading-relaxed mb-8">
            Whether you&apos;re drained from years of carrying too much, stuck in tension you can&apos;t release, or searching for a way back to yourself — there is a path. I&apos;ve walked it. I can help you find yours.
          </p>
          <p className="font-sans text-xl text-[#FAF6E3]/70 italic">
            Take the quiz. Understand your pattern. Begin healing.
          </p>
        </div>
      </section>

      {/* What This Isn't */}
      <section className="py-24 px-8 relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videos.whatIsnt} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-8">What This Isn&apos;t</span>
          <p className="font-sans text-2xl text-[#FAF6E3]/80 mb-8">
            No quick fixes. No empty promises. No spiritual bypassing.
          </p>
          <p className="font-serif text-4xl lg:text-5xl text-[#FAF6E3] italic">
            Just honest guidance from someone who&apos;s done the work.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 text-center">
        <span className="font-sans text-sm tracking-[0.5em] uppercase text-[#D4A853] block mb-8">Your Next Step</span>
        <h2 className="font-ninja text-3xl lg:text-4xl mb-10">
          You don&apos;t have to figure this out alone.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/quiz" className="inline-block font-sans font-semibold bg-[#D4A853] text-[#0A0A0A] px-14 py-5 rounded-full hover:bg-[#c49943] transition-colors text-xl">
            Take the Pulse Check
          </a>
          <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="inline-block font-sans font-semibold border-2 border-[#D4A853] text-[#D4A853] px-14 py-5 rounded-full hover:bg-[#D4A853]/10 transition-colors text-xl">
            Read the Book
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-[#FAF6E3]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="font-ninja text-2xl">Alive Again</span>
          <span className="font-sans text-xs text-[#FAF6E3]/30">
            <a href="/admin" className="hover:text-[#FAF6E3]/50 transition-colors">&copy;</a> 2026 Feel Fully Alive Again. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  return (
    <>
      <Navbar />
      <Design1 />
    </>
  );
}
