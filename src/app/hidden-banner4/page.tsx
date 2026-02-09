"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

// Theme colors - Dynamic
const ORANGE_BG = '#ff6b35';
const PURPLE = '#8b5cf6';
const DARK_PURPLE = '#5b21b6';
const BLACK = '#000000';
const WHITE = '#ffffff';

export default function HiddenBanner4() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRed, setShowRed] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [showBlue, setShowBlue] = useState(true);
  const [showPurple, setShowPurple] = useState(false);

  // Customization
  const [textSize, setTextSize] = useState(16);
  const [statSize, setStatSize] = useState(48);
  const [imageSize, setImageSize] = useState(700);
  const [logoSize, setLogoSize] = useState(380);
  const [altLayout, setAltLayout] = useState(true);
  const [skoolSize, setSkoolSize] = useState(68);

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

  // Editable Skool badge text
  const [skoolTitle, setSkoolTitle] = useState("SPIRITUAL\nTECH");
  const [skoolSubtitle, setSkoolSubtitle] = useState("INTEGRATION\nEXPERT");
  const [skoolSubtitleSize, setSkoolSubtitleSize] = useState(41);

  // Skool badge dragging
  const [skoolPosition, setSkoolPosition] = useState({ x: 0, y: 0 });
  const [isSkoolDragging, setIsSkoolDragging] = useState(false);
  const skoolDragStart = useRef({ x: 0, y: 0 });
  const skoolPosStart = useRef({ x: 0, y: 0 });

  const handleSkoolMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSkoolDragging(true);
    skoolDragStart.current = { x: e.clientX, y: e.clientY };
    skoolPosStart.current = { ...skoolPosition };
  };

  useEffect(() => {
    const handleSkoolMouseMove = (e: MouseEvent) => {
      if (isSkoolDragging) {
        const deltaX = e.clientX - skoolDragStart.current.x;
        const deltaY = e.clientY - skoolDragStart.current.y;
        setSkoolPosition({
          x: skoolPosStart.current.x + deltaX,
          y: skoolPosStart.current.y + deltaY
        });
      }
    };

    const handleSkoolMouseUp = () => {
      setIsSkoolDragging(false);
    };

    if (isSkoolDragging) {
      window.addEventListener('mousemove', handleSkoolMouseMove);
      window.addEventListener('mouseup', handleSkoolMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleSkoolMouseMove);
      window.removeEventListener('mouseup', handleSkoolMouseUp);
    };
  }, [isSkoolDragging]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: "$70M+", label: "GMV", sublabel: "(8% avg take)" },
    { value: "$850K+", label: "Generated", sublabel: "Soul-Aligned Revenue" },
    { value: "200+", label: "Spiritual", sublabel: "Entrepreneurs Served" },
    { value: "15", label: "Years", sublabel: "Spiritual-Tech Bridge" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background graphic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ backgroundColor: PURPLE }}
        />
        <div
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ backgroundColor: DARK_PURPLE }}
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="font-bold text-white" style={{ fontSize: '1.2rem' }}>
              LHV Banner System
            </span>

            {/* Controls */}
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
                className="ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded"
              >
                Hide All
              </button>

              <div className="ml-4 flex items-center gap-1">
                <span className="text-white text-xs">Text:</span>
                <button onClick={() => setTextSize(s => Math.max(12, s - 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{textSize}</span>
                <button onClick={() => setTextSize(s => Math.min(24, s + 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Stats:</span>
                <button onClick={() => setStatSize(s => Math.max(32, s - 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{statSize}</span>
                <button onClick={() => setStatSize(s => Math.min(72, s + 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content - positioned so stats bar ends at blue border (1185px from top at 64px = 1249px) */}
      <div className="pt-20 flex flex-col" style={{ height: '1185px' }}>
        {/* Top Section - Photo with Logo Placeholders */}
        <div className="flex-1 flex flex-col items-center py-8 px-4">
          {/* Photo with badge */}
          <motion.div
            className={`relative mb-12 flex gap-8 ${altLayout ? 'items-start' : 'items-center'}`}
            style={{ marginTop: '4px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Alt Layout: Skool badge on left - draggable */}
            {altLayout && (
              <div
                className="flex flex-col items-center cursor-move select-none"
                style={{
                  transform: `translate(${skoolPosition.x}px, ${skoolPosition.y}px)`,
                  zIndex: isSkoolDragging ? 100 : 1
                }}
                onMouseDown={handleSkoolMouseDown}
              >
                <div
                  className="font-black text-center uppercase whitespace-nowrap"
                  style={{ fontSize: `${skoolSize}px`, color: BLACK, lineHeight: 1 }}
                >
                  {skoolTitle}
                </div>
                {skoolSubtitle.split('\n').map((line, i) => (
                  <div
                    key={i}
                    className="font-black text-center uppercase whitespace-nowrap"
                    style={{ fontSize: `${skoolSubtitleSize}px`, color: BLACK, lineHeight: 1.2 }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}

            <div
              className="rounded-full overflow-hidden border-4 bg-gradient-to-br from-purple-600 to-orange-500 p-4"
              style={{ borderColor: PURPLE, width: `${imageSize}px`, height: `${imageSize}px` }}
            >
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-bold text-xl">Your Photo Here</span>
              </div>
            </div>

            {/* Badge to the right with Skool badge below (default layout) */}
            <div className="flex flex-col items-center gap-4">
              <div 
                className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg p-4 text-white font-bold text-center"
                style={{ height: `${logoSize}px`, width: `${logoSize}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={{ fontSize: '24px' }}>Your Logo</span>
              </div>
              {!altLayout && (
                <div className="flex flex-col items-center mt-2">
                  <div
                    className="font-black text-center uppercase whitespace-nowrap"
                    style={{ fontSize: `${skoolSize}px`, color: BLACK, lineHeight: 1 }}
                  >
                    {skoolTitle}
                  </div>
                  {skoolSubtitle.split('\n').map((line, i) => (
                    <div
                      key={i}
                      className="font-black text-center uppercase whitespace-nowrap"
                      style={{ fontSize: `${skoolSubtitleSize}px`, color: BLACK, lineHeight: 1.1 }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Logo Row */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-20 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-28 w-32 bg-gradient-to-r from-orange-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">Logo 1</div>
            <div className="h-28 w-32 bg-gradient-to-r from-purple-600 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold">Logo 2</div>
            <div className="h-24 w-32 bg-gradient-to-br from-orange-500 to-purple-700 rounded-lg flex items-center justify-center text-white font-bold">Logo 3</div>
            <div className="h-24 w-32 bg-gradient-to-bl from-purple-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">Logo 4</div>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            className="font-bold tracking-wide text-center mt-8"
            style={{ fontSize: '32px', color: BLACK }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Bridged. Aligned. Transformed. Now Guiding.
          </motion.h2>
        </div>

        {/* Bottom Stats Banner - positioned to end at blue border */}
        <motion.div
          className="w-full py-12 px-4"
          style={{ backgroundColor: BLACK, marginTop: '28px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div
                    className="font-black"
                    style={{ fontSize: `${statSize + 8}px`, color: ORANGE_BG }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-bold text-white uppercase tracking-wider"
                    style={{ fontSize: `${textSize + 4}px` }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="text-gray-400"
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Size Controls - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-[10001] flex flex-col gap-3">
        {/* Text Edit Controls */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-black/90 rounded-lg px-3 py-2">
            <span className="text-white text-sm font-bold">Title:</span>
            <input
              type="text"
              value={skoolTitle}
              onChange={(e) => setSkoolTitle(e.target.value.toUpperCase())}
              className="w-32 px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:border-purple-500"
              placeholder="TOP #25"
            />
          </div>
          <div className="flex items-center gap-2 bg-black/90 rounded-lg px-3 py-2">
            <span className="text-white text-sm font-bold">Subtitle:</span>
            <textarea
              value={skoolSubtitle}
              onChange={(e) => setSkoolSubtitle(e.target.value.toUpperCase())}
              className="w-40 h-12 px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:border-purple-500 resize-none"
              placeholder="ON SKOOL&#10;IN 25 DAYS"
            />
          </div>
        </div>

        {/* Size Controls Row */}
        <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setAltLayout(!altLayout)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-colors ${
            altLayout
              ? 'bg-purple-500 text-white'
              : 'bg-black/80 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {altLayout ? 'Alt: ON' : 'Alt: OFF'}
        </button>
        <div className="flex items-center gap-2 bg-black/80 rounded-lg px-3 py-2">
          <span className="text-white text-sm font-bold">Photo:</span>
          <button
            onClick={() => setImageSize(s => Math.max(300, s - 50))}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            -
          </button>
          <span className="text-white text-sm w-12 text-center">{imageSize}</span>
          <button
            onClick={() => setImageSize(s => Math.min(1000, s + 50))}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-2 bg-black/80 rounded-lg px-3 py-2">
          <span className="text-white text-sm font-bold">Logo:</span>
          <button
            onClick={() => setLogoSize(s => Math.max(100, s - 30))}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            -
          </button>
          <span className="text-white text-sm w-12 text-center">{logoSize}</span>
          <button
            onClick={() => setLogoSize(s => Math.min(600, s + 30))}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-2 bg-black/80 rounded-lg px-3 py-2">
          <span className="text-white text-sm font-bold">Title:</span>
          <button
            onClick={() => setSkoolSize(s => Math.max(24, s - 4))}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            -
          </button>
          <span className="text-white text-sm w-12 text-center">{skoolSize}</span>
          <button
            onClick={() => setSkoolSize(s => Math.min(120, s + 4))}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-2 bg-black/80 rounded-lg px-3 py-2">
          <span className="text-white text-sm font-bold">Subtitle:</span>
          <button
            onClick={() => setSkoolSubtitleSize(s => Math.max(16, s - 2))}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            -
          </button>
          <span className="text-white text-sm w-12 text-center">{skoolSubtitleSize}</span>
          <button
            onClick={() => setSkoolSubtitleSize(s => Math.min(80, s + 2))}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            +
          </button>
          <button
            onClick={() => setSkoolPosition({ x: 0, y: 0 })}
            className="ml-2 px-2 py-1 rounded bg-gray-600 text-white text-xs hover:bg-gray-500"
          >
            Reset Pos
          </button>
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