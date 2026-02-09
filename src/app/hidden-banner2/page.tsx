"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Star, Users, Trophy } from "lucide-react";

// Theme colors - Dynamic
const ORANGE_BG = '#ff6b35';
const PURPLE = '#8b5cf6';
const DARK_PURPLE = '#5b21b6';
const BLACK = '#000000';
const WHITE = '#ffffff';

export default function HiddenBanner2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRed, setShowRed] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [showBlue, setShowBlue] = useState(true);
  const [showPurple, setShowPurple] = useState(false);

  // Customization
  const [headlineSize, setHeadlineSize] = useState(72);
  const [textSize, setTextSize] = useState(20);
  const [statSize, setStatSize] = useState(48);

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
    red: 64, green: 64, blue: 64, purple: 64
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
        setGuideOffsets(prev => ({ ...prev, [selectedGuide]: newOffset }));
      }
    };
    const handleGuideMouseUp = () => setIsGuideDragging(false);

    if (isGuideDragging) {
      window.addEventListener('mousemove', handleGuideMouseMove);
      window.addEventListener('mouseup', handleGuideMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGuideMouseMove);
      window.removeEventListener('mouseup', handleGuideMouseUp);
    };
  }, [isGuideDragging, selectedGuide]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const stats = [
    { icon: Users, number: "200+", label: "Spiritual Entrepreneurs" },
    { icon: Trophy, number: "$850K", label: "Soul-Aligned Revenue" },
    { icon: Star, number: "60 Days", label: "From Isolation to Community" },
  ];

  const benefits = [
    "No more building alone in spiritual isolation",
    "Heart-centered community of spiritual creators", 
    "Sacred business frameworks that honor your gifts",
    "Technology that amplifies your spiritual impact",
    "60-day pathway from isolation to aligned income"
  ];

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background graphic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ backgroundColor: theme.accent }}
        />
        <div
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ backgroundColor: theme.darkAccent }}
        />
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-purple-600" />
            ))}
          </div>
        </div>
      </div>

      {/* Crop guides */}
      {showRed && (
        <div className={`fixed z-[9999] ${selectedGuide === 'red' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{ width: '1400px', height: '790px', border: `4px dashed ${selectedGuide === 'red' ? '#FF0000' : '#FF000080'}`, top: `${guideOffsets.red}px`, left: '50%', transform: 'translateX(-50%)' }}
          onMouseDown={(e) => selectedGuide === 'red' && handleGuideMouseDown(e, 'red')} />
      )}
      {showGreen && (
        <div className={`fixed z-[9998] ${selectedGuide === 'green' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{ width: '1750px', height: '988px', border: `4px dashed ${selectedGuide === 'green' ? '#00FF00' : '#00FF0080'}`, top: `${guideOffsets.green}px`, left: '50%', transform: 'translateX(-50%)' }}
          onMouseDown={(e) => selectedGuide === 'green' && handleGuideMouseDown(e, 'green')} />
      )}
      {showBlue && (
        <div className={`fixed z-[9997] ${selectedGuide === 'blue' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{ width: '2100px', height: '1185px', border: `4px dashed ${selectedGuide === 'blue' ? '#0088FF' : '#0088FF80'}`, top: `${guideOffsets.blue}px`, left: '50%', transform: 'translateX(-50%)' }}
          onMouseDown={(e) => selectedGuide === 'blue' && handleGuideMouseDown(e, 'blue')} />
      )}
      {showPurple && (
        <div className={`fixed z-[9996] ${selectedGuide === 'purple' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{ width: '2800px', height: '1580px', border: `4px dashed ${selectedGuide === 'purple' ? '#FF00FF' : '#FF00FF80'}`, top: `${guideOffsets.purple}px`, left: '50%', transform: 'translateX(-50%)' }}
          onMouseDown={(e) => selectedGuide === 'purple' && handleGuideMouseDown(e, 'purple')} />
      )}

      {/* Navbar */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md"
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="font-bold text-white text-lg">LHV Banner System</span>

            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => { if (!showRed) setShowRed(true); setSelectedGuide(selectedGuide === 'red' ? null : 'red'); }}
                onDoubleClick={() => setShowRed(!showRed)}
                className={`w-6 h-6 rounded border-2 ${showRed ? 'bg-red-500 border-red-500' : 'bg-transparent border-red-500'} ${selectedGuide === 'red' ? 'ring-2 ring-white' : ''}`} />
              <button onClick={() => { if (!showGreen) setShowGreen(true); setSelectedGuide(selectedGuide === 'green' ? null : 'green'); }}
                onDoubleClick={() => setShowGreen(!showGreen)}
                className={`w-6 h-6 rounded border-2 ${showGreen ? 'bg-green-500 border-green-500' : 'bg-transparent border-green-500'} ${selectedGuide === 'green' ? 'ring-2 ring-white' : ''}`} />
              <button onClick={() => { if (!showBlue) setShowBlue(true); setSelectedGuide(selectedGuide === 'blue' ? null : 'blue'); }}
                onDoubleClick={() => setShowBlue(!showBlue)}
                className={`w-6 h-6 rounded border-2 ${showBlue ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-blue-500'} ${selectedGuide === 'blue' ? 'ring-2 ring-white' : ''}`} />
              <button onClick={() => { if (!showPurple) setShowPurple(true); setSelectedGuide(selectedGuide === 'purple' ? null : 'purple'); }}
                onDoubleClick={() => setShowPurple(!showPurple)}
                className={`w-6 h-6 rounded border-2 ${showPurple ? 'bg-purple-500 border-purple-500' : 'bg-transparent border-purple-500'} ${selectedGuide === 'purple' ? 'ring-2 ring-white' : ''}`} />
              <button onClick={() => { setShowRed(false); setShowGreen(false); setShowBlue(false); setShowPurple(false); setSelectedGuide(null); }}
                className="ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded">Hide All</button>

              <div className="ml-4 flex items-center gap-1">
                <span className="text-white text-xs">Title:</span>
                <button onClick={() => setHeadlineSize(s => Math.max(32, s - 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{headlineSize}</span>
                <button onClick={() => setHeadlineSize(s => Math.min(96, s + 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Text:</span>
                <button onClick={() => setTextSize(s => Math.max(14, s - 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{textSize}</span>
                <button onClick={() => setTextSize(s => Math.min(28, s + 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Stats:</span>
                <button onClick={() => setStatSize(s => Math.max(24, s - 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{statSize}</span>
                <button onClick={() => setStatSize(s => Math.min(64, s + 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Split Layout */}
      <div className="pt-20 flex flex-col" style={{ height: '1185px' }}>
        <div className="flex-1 grid md:grid-cols-2 gap-8 px-8 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <motion.h1
              className="font-black tracking-tight leading-tight"
              style={{
                fontSize: `${headlineSize}px`,
                color: BLACK,
                textShadow: `3px 3px 0px ${PURPLE}60`
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
Transform Spiritual Isolation Into Sacred Community
            </motion.h1>

            <motion.p
              className="font-semibold leading-relaxed"
              style={{ fontSize: `${textSize}px`, color: theme.text }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
Break free from the lonely spiritual entrepreneur struggle. Build your soul-aligned business within a community that understands your sacred calling.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <span style={{ fontSize: `${textSize - 2}px`, color: BLACK, fontWeight: 'bold' }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.button
              className="font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              style={{
                fontSize: `${textSize + 2}px`,
                backgroundColor: BLACK,
                color: ORANGE_BG,
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Join Sacred Community
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Right Side - Stats */}
          <div className="space-y-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-200"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div
                        className="font-black"
                        style={{ fontSize: `${statSize}px`, color: theme.accent }}
                      >
                        {stat.number}
                      </div>
                      <div
                        className="font-bold"
                        style={{ fontSize: `${textSize}px`, color: theme.text }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Theme Toggle - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-[10001] flex gap-2">
        <button
          onClick={() => setCurrentTheme(1)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-all ${
            currentTheme === 1 ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Orange/Purple
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