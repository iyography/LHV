"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

// Theme colors - Purple/Orange (Swapped)
const PURPLE_BG = '#8b5cf6';
const ORANGE = '#ff6b35';
const DARK_ORANGE = '#e85d04';
const BLACK = '#000000';
const WHITE = '#ffffff';

export default function HiddenBanner1() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRed, setShowRed] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [showBlue, setShowBlue] = useState(true);
  const [showPurple, setShowPurple] = useState(false);

  // Customization
  const [headlineSize, setHeadlineSize] = useState(96);
  const [subheadSize, setSubheadSize] = useState(32);
  const [ctaSize, setCtaSize] = useState(24);
  const [supportSize, setSupportSize] = useState(18);
  
  // Editable text content
  const [headlineText, setHeadlineText] = useState("Turn Your Spiritual Gifts Into Aligned Income");
  const [subheadText, setSubheadText] = useState("Bridge ancient wisdom with modern business to create sustainable impact without losing your soul");
  const [ctaText, setCtaText] = useState("Align Your Purpose with Profit");
  const [supportText, setSupportText] = useState("Join 200+ spiritual entrepreneurs who've created soul-aligned businesses that serve and sustain");
  
  // Editing states
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [tempText, setTempText] = useState("");
  
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
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-[200%] origin-left"
              style={{
                backgroundColor: theme.accent,
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
                <span className="text-white text-xs">Main:</span>
                <button onClick={() => setHeadlineSize(s => Math.max(48, s - 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{headlineSize}</span>
                <button onClick={() => setHeadlineSize(s => Math.min(120, s + 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Sub:</span>
                <button onClick={() => setSubheadSize(s => Math.max(16, s - 2))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{subheadSize}</span>
                <button onClick={() => setSubheadSize(s => Math.min(48, s + 2))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">CTA:</span>
                <button onClick={() => setCtaSize(s => Math.max(16, s - 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{ctaSize}</span>
                <button onClick={() => setCtaSize(s => Math.min(32, s + 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Support:</span>
                <button onClick={() => setSupportSize(s => Math.max(12, s - 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{supportSize}</span>
                <button onClick={() => setSupportSize(s => Math.min(28, s + 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Simple & Clean */}
      <div className="pt-24 flex flex-col items-center justify-center relative z-10" style={{ height: '1185px' }}>
        <div className="w-full flex flex-col items-center px-8 text-center">
          {/* Main Headline */}
          <motion.h1
            className="font-black tracking-tight mb-8 max-w-5xl cursor-pointer"
            style={{
              fontSize: `${headlineSize}px`,
              color: theme.text,
              textShadow: `
                4px 4px 0px ${theme.accent}80,
                8px 8px 0px ${theme.accent}40,
                0 0 30px ${theme.accent}50
              `,
              lineHeight: '1.1'
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            onDoubleClick={() => {
              setEditingElement('headline');
              setTempText(headlineText);
            }}
          >
            {editingElement === 'headline' ? (
              <input
                type="text"
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                onBlur={() => {
                  setHeadlineText(tempText);
                  setEditingElement(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setHeadlineText(tempText);
                    setEditingElement(null);
                  }
                  if (e.key === 'Escape') {
                    setEditingElement(null);
                  }
                }}
                className="bg-transparent border-2 outline-none text-center w-full"
                style={{ borderColor: theme.accent, color: theme.text }}
                autoFocus
              />
            ) : (
              headlineText
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="font-bold mb-12 max-w-3xl"
            style={{
              fontSize: `${subheadSize}px`,
              color: theme.text,
              lineHeight: '1.4'
            }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
Bridge ancient wisdom with modern business to create sustainable impact without losing your soul
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              className="font-bold px-12 py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
              style={{
                fontSize: `${ctaSize}px`,
                backgroundColor: BLACK,
                color: theme.background,
                boxShadow: `0 0 40px ${theme.accent}50`,
              }}
            >
Align Your Purpose with Profit
            </button>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            className="mt-8 font-semibold max-w-2xl cursor-pointer"
            style={{ color: `${theme.text}E6`, fontSize: `${supportSize}px` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onDoubleClick={() => {
              setEditingElement('support');
              setTempText(supportText);
            }}
          >
            {editingElement === 'support' ? (
              <input
                type="text"
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                onBlur={() => {
                  setSupportText(tempText);
                  setEditingElement(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSupportText(tempText);
                    setEditingElement(null);
                  }
                  if (e.key === 'Escape') {
                    setEditingElement(null);
                  }
                }}
                className="bg-transparent border-2 outline-none text-center w-full"
                style={{ borderColor: theme.accent, color: theme.text }}
                autoFocus
              />
            ) : (
              supportText
            )}
          </motion.p>
        </div>
      </div>
      
      {/* Theme Toggle - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-[10001] flex gap-2">
        <button
          onClick={() => setCurrentTheme(1)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-all ${
            currentTheme === 1 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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