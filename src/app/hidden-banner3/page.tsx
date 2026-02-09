"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Target, BookOpen, Bot, Lightbulb, Phone, Rocket, Monitor, Palette, Crown, Flame } from "lucide-react";

// Theme colors - Dynamic
const ORANGE_BG = '#ff6b35';
const PURPLE = '#8b5cf6';
const DARK_PURPLE = '#5b21b6';
const BLACK = '#000000';
const WHITE = '#ffffff';

export default function HiddenBanner3() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRed, setShowRed] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [showBlue, setShowBlue] = useState(true);
  const [showPurple, setShowPurple] = useState(false);

  // Card customization
  const [textSize, setTextSize] = useState(24);
  const [headlineSize, setHeadlineSize] = useState(80);
  const [altLayout, setAltLayout] = useState(false);

  // Bottom banner dragging
  const [bannerOffset, setBannerOffset] = useState(0);
  const [isBannerDragging, setIsBannerDragging] = useState(false);
  const bannerDragStart = useRef(0);
  const bannerOffsetStart = useRef(0);
  
  // Theme toggle
  const [currentTheme, setCurrentTheme] = useState<1 | 2 | 3>(1);
  
  // Theme definitions
  const themes = {
    1: {
      background: '#8b5cf6', // Purple
      accent: '#ff6b35',     // Orange
      darkAccent: '#e85d04', // Dark Orange
      text: '#ffffff',       // White
      name: 'Purple/Orange'
    },
    2: {
      background: '#1e293b', // Dark Blue/Gray
      accent: '#10b981',     // Green
      darkAccent: '#059669', // Dark Green
      text: '#f1f5f9',       // Light Gray
      name: 'Dark/Green'
    },
    3: {
      background: '#000000', // Black
      accent: '#fbbf24',     // Yellow
      darkAccent: '#f59e0b', // Dark Yellow
      text: '#fbbf24',       // Yellow Text
      name: 'Black/Yellow'
    }
  };
  
  const theme = themes[currentTheme];

  // Guide positioning
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [guideOffsets, setGuideOffsets] = useState({
    red: 64,
    green: 64,
    blue: 64,
    purple: 64
  });
  const [isGuideDragging, setIsGuideDragging] = useState(false);
  const guideDragStartY = useRef(0);
  const guideDragStartOffset = useRef(0);

  const handleGuideMouseDown = (e: React.MouseEvent, guide: string) => {
    e.preventDefault();
    setSelectedGuide(guide);
    setIsGuideDragging(true);
    guideDragStartY.current = e.clientY;
    guideDragStartOffset.current = guideOffsets[guide as keyof typeof guideOffsets];
  };

  useEffect(() => {
    const handleGuideMouseMove = (e: MouseEvent) => {
      if (isGuideDragging && selectedGuide) {
        const deltaY = e.clientY - guideDragStartY.current;
        const newOffset = Math.max(0, guideDragStartOffset.current + deltaY);
        setGuideOffsets(prev => ({
          ...prev,
          [selectedGuide]: newOffset
        }));
      }
    };

    const handleGuideMouseUp = () => {
      setIsGuideDragging(false);
    };

    if (isGuideDragging) {
      window.addEventListener('mousemove', handleGuideMouseMove);
      window.addEventListener('mouseup', handleGuideMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGuideMouseMove);
      window.removeEventListener('mouseup', handleGuideMouseUp);
    };
  }, [isGuideDragging, selectedGuide]);

  const handleBannerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBannerDragging(true);
    bannerDragStart.current = e.clientY;
    bannerOffsetStart.current = bannerOffset;
  };

  useEffect(() => {
    const handleBannerMouseMove = (e: MouseEvent) => {
      if (isBannerDragging) {
        const deltaY = e.clientY - bannerDragStart.current;
        setBannerOffset(bannerOffsetStart.current + deltaY);
      }
    };

    const handleBannerMouseUp = () => {
      setIsBannerDragging(false);
    };

    if (isBannerDragging) {
      window.addEventListener('mousemove', handleBannerMouseMove);
      window.addEventListener('mouseup', handleBannerMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleBannerMouseMove);
      window.removeEventListener('mouseup', handleBannerMouseUp);
    };
  }, [isBannerDragging]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const leftFeatures = [
    { icon: Target, emoji: "🎯", title: "Spiritual Path Assessment", desc: "Discover your unique spiritual business calling" },
    { icon: BookOpen, emoji: "📚", title: "Soul-Aligned Business Blueprints", desc: "Sacred frameworks that honor your gifts" },
    { icon: Bot, emoji: "🤖", title: "Conscious Technology Integration", desc: "Spiritual-tech tools that amplify your impact" },
    { icon: Lightbulb, emoji: "💡", title: "Sacred Business Models", desc: "Proven ways to monetize spiritual wisdom" },
    { icon: Phone, emoji: "📞", title: "Sacred Circle Gatherings", desc: "Weekly guidance from fellow spiritual entrepreneurs" },
  ];

  const rightFeatures = [
    { icon: Rocket, emoji: "🚀", title: "60-Day Soul Alignment System", desc: "Transform spiritual isolation into aligned income" },
    { icon: Monitor, emoji: "💻", title: "Sacred Tech Stack", desc: "Heart-centered technology for spiritual businesses" },
    { icon: Flame, emoji: "🔥", title: "Sacred Community", desc: "Connect with spiritual entrepreneurs who understand" },
    { icon: Palette, emoji: "🎨", title: "Soul-Aligned Brand Creation", desc: "Express your spiritual essence through design" },
    { icon: Crown, emoji: "👑", title: "Spiritual Leadership Training", desc: "Step into your role as a conscious leader" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background graphic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ backgroundColor: theme.accent }}
        />
        <div
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ backgroundColor: theme.darkAccent }}
        />
        {/* Diagonal stripes */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-[200%] origin-left"
              style={{
                backgroundColor: PURPLE,
                top: `${i * 120}px`,
                left: '-50%',
                transform: 'rotate(-15deg)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Crop guides */}
      {showRed && (
        <div
          className={`fixed z-[9999] ${selectedGuide === 'red' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{
            width: '1400px',
            height: '790px',
            border: `4px dashed ${selectedGuide === 'red' ? '#FF0000' : '#FF000080'}`,
            boxSizing: 'border-box',
            top: `${guideOffsets.red}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onMouseDown={(e) => selectedGuide === 'red' && handleGuideMouseDown(e, 'red')}
        />
      )}

      {showGreen && (
        <div
          className={`fixed z-[9998] ${selectedGuide === 'green' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{
            width: '1750px',
            height: '988px',
            border: `4px dashed ${selectedGuide === 'green' ? '#00FF00' : '#00FF0080'}`,
            boxSizing: 'border-box',
            top: `${guideOffsets.green}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onMouseDown={(e) => selectedGuide === 'green' && handleGuideMouseDown(e, 'green')}
        />
      )}

      {showBlue && (
        <div
          className={`fixed z-[9997] ${selectedGuide === 'blue' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{
            width: '2100px',
            height: '1185px',
            border: `4px dashed ${selectedGuide === 'blue' ? '#0088FF' : '#0088FF80'}`,
            boxSizing: 'border-box',
            top: `${guideOffsets.blue}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onMouseDown={(e) => selectedGuide === 'blue' && handleGuideMouseDown(e, 'blue')}
        />
      )}

      {showPurple && (
        <div
          className={`fixed z-[9996] ${selectedGuide === 'purple' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{
            width: '2800px',
            height: '1580px',
            border: `4px dashed ${selectedGuide === 'purple' ? '#FF00FF' : '#FF00FF80'}`,
            boxSizing: 'border-box',
            top: `${guideOffsets.purple}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onMouseDown={(e) => selectedGuide === 'purple' && handleGuideMouseDown(e, 'purple')}
        />
      )}

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm"
        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="font-bold text-white" style={{ fontSize: '1.2rem' }}>
              LHV Banner System
            </span>

            {/* Guide toggles */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => { if (!showRed) setShowRed(true); setSelectedGuide(selectedGuide === 'red' ? null : 'red'); }}
                onDoubleClick={() => setShowRed(!showRed)}
                className={`w-6 h-6 rounded border-2 ${showRed ? 'bg-red-500 border-red-500' : 'bg-transparent border-red-500'} ${selectedGuide === 'red' ? 'ring-2 ring-white' : ''}`}
              />
              <button
                onClick={() => { if (!showGreen) setShowGreen(true); setSelectedGuide(selectedGuide === 'green' ? null : 'green'); }}
                onDoubleClick={() => setShowGreen(!showGreen)}
                className={`w-6 h-6 rounded border-2 ${showGreen ? 'bg-green-500 border-green-500' : 'bg-transparent border-green-500'} ${selectedGuide === 'green' ? 'ring-2 ring-white' : ''}`}
              />
              <button
                onClick={() => { if (!showBlue) setShowBlue(true); setSelectedGuide(selectedGuide === 'blue' ? null : 'blue'); }}
                onDoubleClick={() => setShowBlue(!showBlue)}
                className={`w-6 h-6 rounded border-2 ${showBlue ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-blue-500'} ${selectedGuide === 'blue' ? 'ring-2 ring-white' : ''}`}
              />
              <button
                onClick={() => { if (!showPurple) setShowPurple(true); setSelectedGuide(selectedGuide === 'purple' ? null : 'purple'); }}
                onDoubleClick={() => setShowPurple(!showPurple)}
                className={`w-6 h-6 rounded border-2 ${showPurple ? 'bg-purple-500 border-purple-500' : 'bg-transparent border-purple-500'} ${selectedGuide === 'purple' ? 'ring-2 ring-white' : ''}`}
              />
              <button
                onClick={() => { setShowRed(false); setShowGreen(false); setShowBlue(false); setShowPurple(false); setSelectedGuide(null); }}
                className="ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded hover:bg-gray-600"
              >
                Hide All
              </button>

              {/* Text size control */}
              <div className="ml-4 flex items-center gap-1">
                <span className="text-white text-xs">Text:</span>
                <button onClick={() => setTextSize(s => Math.max(12, s - 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{textSize}</span>
                <button onClick={() => setTextSize(s => Math.min(28, s + 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              {/* Headline size control */}
              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Title:</span>
                <button onClick={() => setHeadlineSize(s => Math.max(32, s - 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{headlineSize}</span>
                <button onClick={() => setHeadlineSize(s => Math.min(120, s + 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content - custom fit for blue border (1185px height from 64px) */}
      <div className="pt-20 flex flex-col" style={{ height: '1185px' }}>
        {/* Top Content Section */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto text-center">
            {/* Headline */}
            <motion.h1
              className="font-black tracking-tight mb-16"
              style={{ fontSize: `${headlineSize}px`, color: theme.text }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Everything You Need To Go From{" "}
              <span style={{ color: theme.text }}>$0 → $5K/Month</span>
            </motion.h1>

            {/* Alt 1: Two Column Features */}
            {!altLayout && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {leftFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-start gap-4 text-left"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <span className="text-4xl flex-shrink-0">{feature.emoji}</span>
                      <div>
                        <h3 className="font-bold" style={{ fontSize: `${textSize + 2}px`, color: theme.text }}>
                          {feature.title}
                        </h3>
                        <p className="font-semibold" style={{ fontSize: `${textSize - 2}px`, color: theme.text }}>
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {rightFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-start gap-4 text-left"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <span className="text-4xl flex-shrink-0">{feature.emoji}</span>
                      <div>
                        <h3 className="font-bold" style={{ fontSize: `${textSize + 2}px`, color: theme.text }}>
                          {feature.title}
                        </h3>
                        <p className="font-semibold" style={{ fontSize: `${textSize - 2}px`, color: theme.text }}>
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Alt 2: Single Column Stacked */}
            {altLayout && (
              <div className="space-y-12">
                {[...leftFeatures, ...rightFeatures].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <span className="text-6xl block mb-4">{feature.emoji}</span>
                    <h3 className="font-black mb-3" style={{ fontSize: `${headlineSize - 20}px`, color: theme.text }}>
                      {feature.title}
                    </h3>
                    <p className="font-bold" style={{ fontSize: `${textSize}px`, color: theme.text, maxWidth: '600px', margin: '0 auto' }}>
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Black Banner - draggable */}
        <motion.div
          className={`w-full py-12 px-4 cursor-move select-none`}
          style={{ 
            backgroundColor: BLACK, 
            color: WHITE,
            position: 'absolute',
            bottom: `${-bannerOffset}px`,
            left: 0,
            right: 0,
            zIndex: 20
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onMouseDown={handleBannerMouseDown}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-4xl font-black" style={{ color: ORANGE_BG }}>
              Sacred transformation begins here.
            </p>
            <p className="text-xl mt-2" style={{ color: WHITE }}>
              Join 100+ founders building their $5K/month business
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Alt and Theme Toggles - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-[10001] flex gap-2">
        <button
          onClick={() => setAltLayout(!altLayout)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-all ${
            altLayout ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {altLayout ? 'Alt 2' : 'Alt 1'}
        </button>
        <button
          onClick={() => setCurrentTheme(1)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-all ${
            currentTheme === 1 ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Purple/Orange
        </button>
        <button
          onClick={() => setCurrentTheme(2)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-all ${
            currentTheme === 2 ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Dark/Green
        </button>
        <button
          onClick={() => setCurrentTheme(3)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-all ${
            currentTheme === 3 ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Black/Yellow
        </button>
      </div>
    </div>
  );
}