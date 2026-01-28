"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = "intro" | "questions" | "open-response" | "contact" | "calculating" | "results";

type EnergyType = "drained" | "stagnated";
type EmotionType = "anger" | "sadness" | "worry" | "fear";
type InvestmentLevel = "free" | "low" | "medium" | "high";

interface QuizOption {
  text: string;
  tags?: {
    energy?: EnergyType;
    emotion?: EmotionType;
    investment?: InvestmentLevel;
  };
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

// ─── Questions (Tony's 25-Question Quiz) ─────────────────────────────────────

const QUESTIONS: QuizQuestion[] = [
  // CORE DIAGNOSTIC (1-5)
  {
    question: "Which describes you best most days?",
    options: [
      { text: "I feel exhausted and depleted", tags: { energy: "drained" } },
      { text: "I feel tense, wired, or stuck", tags: { energy: "stagnated" } },
    ],
  },
  {
    question: "What emotion do you feel MOST often?",
    options: [
      { text: "Anger / frustration", tags: { emotion: "anger" } },
      { text: "Sadness / grief", tags: { emotion: "sadness" } },
      { text: "Worry / overthinking", tags: { emotion: "worry" } },
      { text: "Fear / anxiety", tags: { emotion: "fear" } },
    ],
  },
  {
    question: "Do you tend to feel more…",
    options: [
      { text: "Cold", tags: { energy: "drained" } },
      { text: "Warm / hot", tags: { energy: "stagnated" } },
    ],
  },
  {
    question: "When you experience pain or tension, does gentle touch usually feel:",
    options: [
      { text: "Comforting and relieving", tags: { energy: "drained" } },
      { text: "Uncomfortable or irritating", tags: { energy: "stagnated" } },
    ],
  },
  {
    question: "How do you feel after resting?",
    options: [
      { text: "Slightly better, but still tired", tags: { energy: "drained" } },
      { text: "Restless or stiff", tags: { energy: "stagnated" } },
      { text: "Much better", tags: { energy: "drained" } },
    ],
  },
  // ENERGY & BODY SIGNALS (6-10)
  {
    question: "Your energy levels are:",
    options: [
      { text: "Low and flat", tags: { energy: "drained" } },
      { text: "Up and down" },
      { text: "High but tense", tags: { energy: "stagnated" } },
    ],
  },
  {
    question: "How does movement usually feel?",
    options: [
      { text: "Hard to get started, but helpful", tags: { energy: "drained" } },
      { text: "I crave movement", tags: { energy: "stagnated" } },
      { text: "I feel stiff or blocked", tags: { energy: "stagnated" } },
    ],
  },
  {
    question: "Where do you hold the most tension?",
    options: [
      { text: "Chest / breath" },
      { text: "Belly / digestion" },
      { text: "Neck / shoulders" },
      { text: "Lower back / hips" },
    ],
  },
  {
    question: "Your sleep is:",
    options: [
      { text: "Not refreshing" },
      { text: "Light or restless" },
      { text: "Generally okay" },
    ],
  },
  {
    question: "When stressed, your body tends to:",
    options: [
      { text: "Shut down", tags: { energy: "drained" } },
      { text: "Tighten up", tags: { energy: "stagnated" } },
      { text: "Race", tags: { energy: "stagnated" } },
    ],
  },
  // EMOTIONAL PATTERN CLARIFIERS (11-14)
  {
    question: "When things don't go as planned, you:",
    options: [
      { text: "Get irritated or snappy", tags: { emotion: "anger" } },
      { text: "Feel discouraged", tags: { emotion: "sadness" } },
      { text: "Start worrying", tags: { emotion: "worry" } },
      { text: "Feel anxious or unsafe", tags: { emotion: "fear" } },
    ],
  },
  {
    question: "Which statement feels truest?",
    options: [
      { text: "I feel stuck", tags: { energy: "stagnated" } },
      { text: "I feel heavy", tags: { energy: "drained" } },
      { text: "I feel scattered", tags: { emotion: "worry" } },
      { text: "I feel overwhelmed", tags: { emotion: "fear" } },
    ],
  },
  {
    question: "What drains you the fastest?",
    options: [
      { text: "Conflict", tags: { emotion: "anger" } },
      { text: "Loss or disappointment", tags: { emotion: "sadness" } },
      { text: "Uncertainty", tags: { emotion: "worry" } },
      { text: "Responsibility", tags: { emotion: "fear" } },
    ],
  },
  {
    question: "What brings the most relief?",
    options: [
      { text: "Releasing tension", tags: { emotion: "anger" } },
      { text: "Being comforted", tags: { emotion: "sadness" } },
      { text: "Reassurance", tags: { emotion: "worry" } },
      { text: "Feeling grounded", tags: { emotion: "fear" } },
    ],
  },
  // HEALING STYLE & READINESS (15-19)
  {
    question: "What kind of healing do you need most right now?",
    options: [
      { text: "Rest and nourishment", tags: { energy: "drained" } },
      { text: "Movement and flow", tags: { energy: "stagnated" } },
      { text: "Emotional release" },
      { text: "Clarity and direction" },
    ],
  },
  {
    question: "How do you usually respond to stress?",
    options: [
      { text: "Withdraw", tags: { energy: "drained" } },
      { text: "Push through", tags: { energy: "stagnated" } },
      { text: "Overthink", tags: { emotion: "worry" } },
      { text: "Freeze", tags: { emotion: "fear" } },
    ],
  },
  {
    question: "How consistent are you with self-care?",
    options: [
      { text: "I struggle to start" },
      { text: "I start but don't sustain" },
      { text: "I'm fairly consistent" },
    ],
  },
  {
    question: "How much time can you realistically commit each week?",
    options: [
      { text: "5–10 minutes" },
      { text: "15–30 minutes" },
      { text: "1+ hour" },
    ],
  },
  {
    question: "What feels hardest right now?",
    options: [
      { text: "Lack of energy", tags: { energy: "drained" } },
      { text: "Feeling stuck", tags: { energy: "stagnated" } },
      { text: "Emotional heaviness", tags: { emotion: "sadness" } },
      { text: "Constant worry", tags: { emotion: "worry" } },
    ],
  },
  // SUPPORT & INVESTMENT (20-23)
  {
    question: "What do you want help with FIRST?",
    options: [
      { text: "Restoring energy", tags: { energy: "drained" } },
      { text: "Releasing tension", tags: { energy: "stagnated" } },
      { text: "Emotional balance" },
      { text: "Feeling safe and calm", tags: { emotion: "fear" } },
    ],
  },
  {
    question: "How supported do you feel in your life right now?",
    options: [
      { text: "Not much" },
      { text: "Somewhat" },
      { text: "Very supported" },
    ],
  },
  {
    question: "When it comes to investing in feeling better, which feels most true right now?",
    options: [
      { text: "I need free or very low-cost support", tags: { investment: "free" } },
      { text: "I could invest a small amount if it helps", tags: { investment: "low" } },
      { text: "I'm open to investing in deeper support", tags: { investment: "medium" } },
      { text: "I'm ready to invest in real transformation", tags: { investment: "high" } },
    ],
  },
  {
    question: "What kind of guidance helps you most?",
    options: [
      { text: "Gentle and steady" },
      { text: "Clear and direct" },
      { text: "Supportive and reassuring" },
    ],
  },
];

// ─── Result Content ──────────────────────────────────────────────────────────

const ENERGY_RESULTS: Record<EnergyType, {
  title: string;
  subtitle: string;
  description: string[];
  helps: string[];
  doesntHelp: string[];
  startHere: string[];
  truth: string;
}> = {
  drained: {
    title: "Primarily Drained",
    subtitle: "Your system is low on reserves.",
    description: [
      "You've been running on willpower for a long time.",
      "Your body isn't asking for more effort — it's asking for support.",
      "This often happens after long-term stress, caregiving, health challenges, or emotional load. You may still function… but underneath, your energy is thin.",
      "This is not weakness. It's your system being honest.",
    ],
    helps: [
      "Gentle, nourishing practices",
      "Consistency over intensity",
      "Feeling safe in your body",
      "Being supported, not pushed",
    ],
    doesntHelp: [
      "Forcing yourself",
      "High-intensity routines",
      "\"Powering through\"",
    ],
    startHere: [
      "Gentle Qigong",
      "Calming breathwork",
      "Nervous system regulation",
      "Simple daily rituals",
    ],
    truth: "If you don't rebuild your energy intentionally, your body will eventually force rest in ways you didn't choose. You still have a say.",
  },
  stagnated: {
    title: "Primarily Stagnated",
    subtitle: "You have energy — it's just stuck.",
    description: [
      "Your system isn't empty. It's blocked.",
      "You may feel tense, restless, wired, or frustrated. Rest doesn't always help — sometimes it makes things worse.",
      "Your energy wants to move, not collapse.",
    ],
    helps: [
      "Flow and circulation",
      "Releasing tension",
      "Expressing what's held in",
      "Guided movement",
    ],
    doesntHelp: [
      "Over-resting",
      "Suppressing emotions",
      "Staying in your head",
    ],
    startHere: [
      "Releasing Qigong",
      "Breath-led movement",
      "Emotional flow practices",
      "Gentle structure",
    ],
    truth: "Stagnation doesn't clear by thinking. It clears by movement with awareness.",
  },
};

const EMOTION_OVERLAYS: Record<EmotionType, { label: string; description: string; focus: string }> = {
  anger: {
    label: "Anger / Frustration",
    description: "You're holding back expression. You need safe release and forward movement — not suppression.",
    focus: "Flow, breath, expression.",
  },
  sadness: {
    label: "Sadness / Grief",
    description: "Something in you is asking to be acknowledged and held.",
    focus: "Nourishment, breath, gentleness.",
  },
  worry: {
    label: "Worry / Overthinking",
    description: "Your mind is trying to create safety by controlling.",
    focus: "Grounding, rhythm, body trust.",
  },
  fear: {
    label: "Fear / Anxiety",
    description: "Your system doesn't feel safe yet.",
    focus: "Reassurance, slow rebuilding, consistency.",
  },
};

// ─── Animation Variants ──────────────────────────────────────────────────────

const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [step, setStep] = useState<Step>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [openResponses, setOpenResponses] = useState({ ninetyDay: "", oneThingHelp: "" });
  const [contactForm, setContactForm] = useState({ fullName: "", email: "", phone: "" });
  const [calcText, setCalcText] = useState("Reading your energy pattern...");
  const [direction, setDirection] = useState(1);

  // Computed results
  const [resultEnergy, setResultEnergy] = useState<EnergyType>("drained");
  const [resultEmotion, setResultEmotion] = useState<EmotionType>("sadness");
  const [resultInvestment, setResultInvestment] = useState<InvestmentLevel>("free");

  const totalQuestions = QUESTIONS.length;

  // ─── Navigation helpers ──────────────────────────────────────────────────

  function goTo(next: Step) {
    setDirection(1);
    setStep(next);
  }

  function goBack() {
    setDirection(-1);
    if (step === "open-response") {
      setCurrentQuestion(QUESTIONS.length - 1);
      setStep("questions");
    } else if (step === "questions") {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setAnswers(answers.slice(0, -1));
      } else {
        setStep("intro");
      }
    }
  }

  // ─── Answer selection ────────────────────────────────────────────────────

  function selectAnswer(optionIndex: number) {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => {
        setDirection(1);
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        goTo("open-response");
      }, 300);
    }
  }

  // ─── Scoring ─────────────────────────────────────────────────────────────

  function calculateResults() {
    let drainedScore = 0;
    let stagnatedScore = 0;
    const emotionCounts: Record<EmotionType, number> = { anger: 0, sadness: 0, worry: 0, fear: 0 };
    let investment: InvestmentLevel = "free";

    answers.forEach((optIdx, qIdx) => {
      const q = QUESTIONS[qIdx];
      if (!q || !q.options[optIdx]) return;
      const tags = q.options[optIdx].tags;
      if (!tags) return;

      if (tags.energy === "drained") drainedScore++;
      if (tags.energy === "stagnated") stagnatedScore++;
      if (tags.emotion) emotionCounts[tags.emotion]++;
      if (tags.investment) investment = tags.investment;
    });

    const energy: EnergyType = drainedScore >= stagnatedScore ? "drained" : "stagnated";

    const sortedEmotions = (Object.entries(emotionCounts) as [EmotionType, number][])
      .sort((a, b) => b[1] - a[1]);
    const emotion = sortedEmotions[0][0];

    setResultEnergy(energy);
    setResultEmotion(emotion);
    setResultInvestment(investment);

    return { energy, emotion, investment };
  }

  // ─── Submit ──────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { energy, emotion, investment } = calculateResults();

    goTo("calculating");

    const answersData = answers.map((optIdx, qIdx) => ({
      questionIndex: qIdx,
      question: QUESTIONS[qIdx]?.question ?? "",
      selectedOption: QUESTIONS[qIdx]?.options[optIdx]?.text ?? "",
    }));

    try {
      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: contactForm.fullName,
          email: contactForm.email,
          phone: contactForm.phone,
          energyType: energy,
          emotionType: emotion,
          investmentLevel: investment,
          ninetyDayGoal: openResponses.ninetyDay,
          oneThingHelp: openResponses.oneThingHelp,
          answers: answersData,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
    } catch {
      // Silently continue to results
    }
  }

  // ─── Calculating animation ──────────────────────────────────────────────

  useEffect(() => {
    if (step !== "calculating") return;
    const messages = [
      "Reading your energy pattern...",
      "Mapping your emotional landscape...",
      "Preparing your healing pathway...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) {
        setCalcText(messages[i]);
      } else {
        clearInterval(interval);
        goTo("results");
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ─── Result data ─────────────────────────────────────────────────────────

  const energyResult = ENERGY_RESULTS[resultEnergy];
  const emotionOverlay = EMOTION_OVERLAYS[resultEmotion];

  // ─── Progress ────────────────────────────────────────────────────────────

  const progressNumber = step === "questions" ? currentQuestion + 1 : 0;
  const progressPercent = (progressNumber / totalQuestions) * 100;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAF6E3] overflow-hidden font-sans pt-20">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ── Intro ─────────────────────────────────────────────── */}
          {step === "intro" && (
            <motion.div
              key="intro"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative"
            >
              <video
                autoPlay muted loop playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              >
                <source src="/peace/9.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#0A0A0A]/30" />

              <div className="relative z-10 max-w-2xl">
                <h1 className="font-ninja text-3xl md:text-5xl mb-6 leading-tight">
                  FEEL FULLY{" "}
                  <span className="text-emerald-400">ALIVE AGAIN</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-4 leading-relaxed">
                  Self-Healing Pathway Quiz
                </p>
                <p className="text-base text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto">
                  25 questions to understand your energy, your emotions, and
                  what your body is actually asking for. No jargon. Just clarity.
                </p>
                <button
                  onClick={() => goTo("questions")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold px-10 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                >
                  Begin Your Assessment &rarr;
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Questions ───────────────────────────────────────────── */}
          {step === "questions" && (
            <motion.div
              key="questions"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-screen flex flex-col px-6 pt-8 pb-12 relative"
            >
              <video
                autoPlay muted loop playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              >
                <source src="/peace/9.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#0A0A0A]/40" />

              <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`q-${currentQuestion}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Progress bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <button onClick={goBack} className="hover:text-white transition-colors">
                          &larr; Back
                        </button>
                        <span>
                          Question {progressNumber} of {totalQuestions}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500 rounded-full"
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-8">
                      {QUESTIONS[currentQuestion]?.question}
                    </h3>
                    <div className="space-y-3">
                      {QUESTIONS[currentQuestion]?.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectAnswer(idx)}
                          className="w-full text-left p-5 rounded-xl border border-gray-800 bg-[#111111] hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 text-lg"
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── Open Response Questions (24-25) ──────────────────── */}
          {step === "open-response" && (
            <motion.div
              key="open-response"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-screen flex flex-col items-center justify-center px-6 relative"
            >
              <video
                autoPlay muted loop playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              >
                <source src="/peace/9.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#0A0A0A]/40" />

              <div className="max-w-lg w-full relative z-10">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <button onClick={goBack} className="hover:text-white transition-colors">
                    &larr; Back
                  </button>
                  <span>Almost done</span>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      In 90 days, what would feel like real success for you?
                    </h3>
                    <textarea
                      value={openResponses.ninetyDay}
                      onChange={(e) => setOpenResponses({ ...openResponses, ninetyDay: e.target.value })}
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors min-h-[100px] resize-none"
                      placeholder="Take a moment to imagine..."
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      If I could help you with ONE thing, what would it be?
                    </h3>
                    <textarea
                      value={openResponses.oneThingHelp}
                      onChange={(e) => setOpenResponses({ ...openResponses, oneThingHelp: e.target.value })}
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors min-h-[100px] resize-none"
                      placeholder="Be honest — there's no wrong answer."
                    />
                  </div>

                  <button
                    onClick={() => goTo("contact")}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    Continue &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Contact Form ──────────────────────────────────────── */}
          {step === "contact" && (
            <motion.div
              key="contact"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-screen flex flex-col items-center justify-center px-6 relative"
            >
              <video
                autoPlay muted loop playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              >
                <source src="/peace/9.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#0A0A0A]/40" />

              <div className="max-w-md w-full relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                  Almost there
                </h2>
                <p className="text-gray-400 text-center mb-8">
                  Enter your details to see your personalized healing pathway.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.fullName}
                      onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] mt-4"
                  >
                    Reveal My Healing Pathway
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── Calculating ───────────────────────────────────────── */}
          {step === "calculating" && (
            <motion.div
              key="calculating"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl mb-8"
              >
                🌿
              </motion.div>
              <h2 className="text-2xl font-bold mb-6">Reading your responses...</h2>
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              </div>
              <motion.p
                key={calcText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-400 text-lg"
              >
                {calcText}
              </motion.p>
            </motion.div>
          )}

          {/* ── Results ───────────────────────────────────────────── */}
          {step === "results" && (
            <motion.div
              key="results"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="min-h-screen px-6 py-12"
            >
              <div className="max-w-2xl mx-auto">
                {/* Energy Type Badge */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="inline-block text-7xl mb-4"
                  >
                    {resultEnergy === "drained" ? "🌱" : "🔥"}
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-4xl font-bold mb-2"
                  >
                    <span className="text-emerald-400">{energyResult.title}</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-gray-300 italic"
                  >
                    &ldquo;{energyResult.subtitle}&rdquo;
                  </motion.p>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8 space-y-4"
                >
                  {energyResult.description.map((p, i) => (
                    <p key={i} className="text-gray-300 text-lg leading-relaxed">
                      {p}
                    </p>
                  ))}
                </motion.div>

                {/* What helps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#111111] rounded-xl p-6 mb-6"
                >
                  <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                    What helps you most right now
                  </h3>
                  <div className="space-y-3">
                    {energyResult.helps.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-emerald-500 mt-0.5">&#10003;</span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* What doesn't help */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-red-900/10 border border-red-900/30 rounded-xl p-6 mb-6"
                >
                  <h3 className="text-lg font-semibold text-red-400 mb-4">
                    What doesn&apos;t help
                  </h3>
                  <div className="space-y-2">
                    {energyResult.doesntHelp.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-red-400 mt-0.5">&#10007;</span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Start Here */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="border-2 border-emerald-600 rounded-xl p-6 mb-6 bg-emerald-900/10"
                >
                  <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                    Start here
                  </h3>
                  <div className="space-y-3">
                    {energyResult.startHere.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-emerald-400">&#10024;</span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Gentle Truth */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-[#111111] rounded-xl p-6 mb-8 border-l-4 border-emerald-500"
                >
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                    A gentle truth
                  </h3>
                  <p className="text-gray-300 text-lg italic leading-relaxed">
                    {energyResult.truth}
                  </p>
                </motion.div>

                {/* Emotional Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="bg-[#111111] rounded-xl p-6 mb-8"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Your dominant emotion: <span className="text-emerald-400">{emotionOverlay.label}</span>
                  </h3>
                  <p className="text-gray-300 mb-3">{emotionOverlay.description}</p>
                  <p className="text-emerald-400 font-medium">Focus: {emotionOverlay.focus}</p>
                </motion.div>

                {/* Coaching Invitation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="bg-[#111111] rounded-xl p-8 mb-8 border border-gray-800"
                >
                  <h3 className="text-xl font-semibold mb-4">A personal note</h3>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      If you&apos;re feeling a quiet &ldquo;yes&rdquo; as you read this, it may help to talk it through.
                    </p>
                    <p>
                      I offer coaching for people who want clear guidance, not guesswork — especially when healing feels confusing or overwhelming.
                    </p>
                    <p className="font-medium text-[#FAF6E3]">
                      This isn&apos;t a sales call. It&apos;s a conversation.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>We&apos;ll look at:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-400">
                        <li>Your energy pattern</li>
                        <li>What&apos;s actually holding you back</li>
                        <li>What would help you most right now</li>
                      </ul>
                    </div>
                    <p className="text-gray-400 text-sm">
                      If it feels aligned, we can talk about working together. If not, you&apos;ll still leave with clarity.
                    </p>
                  </div>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  >
                    Request a Clarity Conversation
                  </a>
                </motion.div>

                {/* Retake */}
                <div className="text-center pb-8">
                  <button
                    onClick={() => {
                      setStep("intro");
                      setCurrentQuestion(0);
                      setAnswers([]);
                      setOpenResponses({ ninetyDay: "", oneThingHelp: "" });
                      setContactForm({ fullName: "", email: "", phone: "" });
                    }}
                    className="text-gray-500 hover:text-white transition-colors underline underline-offset-4"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
