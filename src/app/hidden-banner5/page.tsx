"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

// Theme colors - Purple/Orange
const ORANGE_BG = '#ff6b35';
const PURPLE = '#8b5cf6';
const DARK_PURPLE = '#5b21b6';
const BLACK = '#000000';

// Color combos for main headline (text color, shadow/bg color)
const COLOR_COMBOS = [
  { name: 'Purple/Orange', textColor: '#8b5cf6', shadowColor: '#ff6b35' },
  { name: 'Orange/Purple', textColor: '#ff6b35', shadowColor: '#8b5cf6' },
  { name: 'White/Purple', textColor: '#ffffff', shadowColor: '#8b5cf6' },
  { name: 'Purple/White', textColor: '#8b5cf6', shadowColor: '#ffffff' },
  { name: 'Black/Orange', textColor: '#000000', shadowColor: '#ff6b35' },
  { name: 'Orange/Black', textColor: '#ff6b35', shadowColor: '#000000' },
];

// Font options for Alt 2 titles
const FONT_OPTIONS = [
  { name: 'Default', className: 'font-black tracking-tight', family: '' },
  { name: 'Space Bold', className: 'font-bold tracking-wide', family: '' },
  { name: 'Arial Black', className: 'font-black', family: 'Arial Black, sans-serif' },
  { name: 'Impact', className: 'font-bold', family: 'Impact, sans-serif' },
  { name: 'Georgia', className: 'font-bold', family: 'Georgia, serif' },
  { name: 'Times Bold', className: 'font-bold', family: 'Times New Roman, serif' },
  { name: 'Courier', className: 'font-bold', family: 'Courier New, monospace' },
  { name: 'Verdana', className: 'font-bold', family: 'Verdana, sans-serif' },
  { name: 'Trebuchet', className: 'font-bold', family: 'Trebuchet MS, sans-serif' },
  { name: 'Palatino', className: 'font-bold', family: 'Palatino Linotype, serif' },
  { name: 'Lucida', className: 'font-bold', family: 'Lucida Console, monospace' },
  { name: 'Tahoma', className: 'font-bold', family: 'Tahoma, sans-serif' },
  { name: 'Century', className: 'font-bold', family: 'Century Gothic, sans-serif' },
  { name: 'Copperplate', className: 'font-bold', family: 'Copperplate, fantasy' },
  { name: 'Futura', className: 'font-bold', family: 'Futura, sans-serif' },
  { name: 'Optima', className: 'font-bold', family: 'Optima, sans-serif' },
  { name: 'Didot', className: 'font-bold', family: 'Didot, serif' },
  { name: 'Rockwell', className: 'font-bold', family: 'Rockwell, serif' },
  { name: 'Gill Sans', className: 'font-bold', family: 'Gill Sans, sans-serif' },
  { name: 'Baskerville', className: 'font-bold', family: 'Baskerville, serif' },
];

export default function HiddenBanner5() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRed, setShowRed] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [showBlue, setShowBlue] = useState(true);
  const [showPurple, setShowPurple] = useState(false);

  // Customization
  const [textSize, setTextSize] = useState(28);
  const [headlineSize, setHeadlineSize] = useState(104);
  const [mainTitleSize, setMainTitleSize] = useState(64);
  const [altVersion, setAltVersion] = useState<1 | 2>(1);
  const [fontIndex, setFontIndex] = useState(11);
  const [colorIndex, setColorIndex] = useState(0);
  
  // Background theme toggle
  const [backgroundTheme, setBackgroundTheme] = useState<1 | 2 | 3>(1);
  
  // Background theme definitions
  const backgroundThemes = {
    1: {
      background: '#8b5cf6', // Purple
      accent: '#ff6b35',     // Orange
      text: '#ffffff',       // White
      name: 'Purple/Orange'
    },
    2: {
      background: '#1e293b', // Dark Blue/Gray
      accent: '#10b981',     // Green
      text: '#f1f5f9',       // Light Gray
      name: 'Dark/Green'
    },
    3: {
      background: '#000000', // Black
      accent: '#fbbf24',     // Yellow
      text: '#fbbf24',       // Yellow Text
      name: 'Black/Yellow'
    }
  };
  
  const currentBgTheme = backgroundThemes[backgroundTheme];

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

  const features = [
    {
      title: "SACRED CIRCLE GATHERINGS",
      subtitle: "Weekly spiritual entrepreneur support & guidance"
    },
    {
      title: "SOUL-ALIGNMENT MODULES",
      subtitle: "Transform spiritual gifts into sustainable 60-day income"
    },
    {
      title: "CONSCIOUS TECH TEMPLATES",
      subtitle: "Spiritual-tech integration workflows that maintain authenticity"
    },
    {
      title: "60 SACRED BUSINESS MODELS",
      subtitle: "Soul-aligned income streams that honor your spiritual path"
    },
  ];

  // Left column - paired by similar title length per row
  const alt2LeftFeatures = [
    {
      title: "SPIRITUAL BRANDING TEMPLATES",
      subtitle: "Express your essence authentically across all platforms"
    },
    {
      title: "SACRED ABUNDANCE CIRCLES",
      subtitle: "Monthly manifestation & money mindset transformation sessions"
    },
    {
      title: "SACRED COMMUNITY",
      subtitle: "No more isolation — spiritual entrepreneurs who truly understand"
    },
    {
      title: "SPIRITUAL LEADERS SERIES",
      subtitle: "Learn from conscious entrepreneurs making 6-7 figures spiritually"
    },
  ];

  // Right column - paired by similar title length per row
  const alt2RightFeatures = [
    {
      title: "60 SACRED BUSINESS MODELS",
      subtitle: "Soul-aligned income streams that honor your spiritual path"
    },
    {
      title: "DIRECT SPIRITUAL GUIDANCE",
      subtitle: "Personal access to soul-aligned business mentorship"
    },
    {
      title: "TRANSFORMATION TRACKING",
      subtitle: "60-day milestones • From isolation to aligned income"
    },
    {
      title: "SOUL-ALIGNMENT MODULES",
      subtitle: "Transform spiritual gifts into sustainable 60-day income"
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: currentBgTheme.background }}>
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
                <span className="text-white text-xs">Text:</span>
                <button onClick={() => setTextSize(s => Math.max(12, s - 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{textSize}</span>
                <button onClick={() => setTextSize(s => Math.min(32, s + 1))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Title:</span>
                <button onClick={() => setHeadlineSize(s => Math.max(48, s - 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{headlineSize}</span>
                <button onClick={() => setHeadlineSize(s => Math.min(120, s + 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>

              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Main:</span>
                <button onClick={() => setMainTitleSize(s => Math.max(32, s - 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">-</button>
                <span className="text-white text-xs w-6 text-center">{mainTitleSize}</span>
                <button onClick={() => setMainTitleSize(s => Math.min(120, s + 4))} className="w-6 h-6 bg-gray-700 text-white text-xs rounded">+</button>
              </div>
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content - 4 Feature Points Stacked */}
      <div className="pt-24 flex flex-col items-center justify-center relative z-10" style={{ height: '1185px' }}>
        <div className="w-full flex flex-col items-center px-8">
          {/* Main Headline */}
          <motion.h1
            className="text-center font-black tracking-tight mb-12 whitespace-nowrap w-full"
            style={{
              fontSize: `${mainTitleSize}px`,
              color: COLOR_COMBOS[colorIndex].textColor,
              textShadow: `
                4px 4px 0px ${COLOR_COMBOS[colorIndex].shadowColor}80,
                8px 8px 0px ${COLOR_COMBOS[colorIndex].shadowColor}40,
                0 0 30px ${COLOR_COMBOS[colorIndex].shadowColor}50,
                0 0 60px ${COLOR_COMBOS[colorIndex].shadowColor}30
              `
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            What do you get for $10/month?
          </motion.h1>

          {/* Alt 1: Single column */}
          {altVersion === 1 && (
            <div className="flex flex-col gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <motion.h2
                    className="font-black tracking-tight"
                    style={{
                      fontSize: `${headlineSize}px`,
                      color: currentBgTheme.text,
                      textShadow: `
                        4px 4px 0px ${PURPLE}80,
                        8px 8px 0px ${PURPLE}40,
                        0 0 30px ${PURPLE}50,
                        0 0 60px ${PURPLE}30
                      `
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.title}
                  </motion.h2>
                  <motion.p
                    className="font-bold mt-2 uppercase"
                    style={{
                      fontSize: `${textSize}px`,
                      color: currentBgTheme.text
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    {feature.subtitle}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Alt 2: Two columns */}
          {altVersion === 2 && (
            <div className="flex gap-16 w-full justify-center">
              {/* Left Column */}
              <div className="flex flex-col gap-8 items-center">
                {alt2LeftFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="text-center flex flex-col items-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <motion.h2
                      className={`whitespace-nowrap ${FONT_OPTIONS[fontIndex].family ? '' : 'font-space-grotesk'} ${FONT_OPTIONS[fontIndex].className}`}
                      style={{
                        fontSize: `${headlineSize - 20}px`,
                        color: currentBgTheme.text,
                        fontFamily: FONT_OPTIONS[fontIndex].family || undefined,
                        textShadow: `
                          3px 3px 0px rgba(255,255,255,0.9),
                          6px 6px 0px rgba(255,255,255,0.5),
                          0 0 20px rgba(255,255,255,0.6)
                        `
                      }}
                    >
                      {feature.title}
                    </motion.h2>
                    <motion.p
                      className="font-bold mt-1 uppercase"
                      style={{
                        fontSize: `${textSize - 2}px`,
                        color: currentBgTheme.text
                      }}
                    >
                      {feature.subtitle}
                    </motion.p>
                  </motion.div>
                ))}
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8 items-center">
                {alt2RightFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="text-center flex flex-col items-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <motion.h2
                      className={`whitespace-nowrap ${FONT_OPTIONS[fontIndex].family ? '' : 'font-space-grotesk'} ${FONT_OPTIONS[fontIndex].className}`}
                      style={{
                        fontSize: `${headlineSize - 20}px`,
                        color: currentBgTheme.text,
                        fontFamily: FONT_OPTIONS[fontIndex].family || undefined,
                        textShadow: `
                          3px 3px 0px rgba(255,255,255,0.9),
                          6px 6px 0px rgba(255,255,255,0.5),
                          0 0 20px rgba(255,255,255,0.6)
                        `
                      }}
                    >
                      {feature.title}
                    </motion.h2>
                    <motion.p
                      className="font-bold mt-1 uppercase"
                      style={{
                        fontSize: `${textSize - 2}px`,
                        color: currentBgTheme.text
                      }}
                    >
                      {feature.subtitle}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alt Version Toggle - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-[10001] flex gap-2">
        <button
          onClick={() => setAltVersion(1)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-all ${
            altVersion === 1 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Alt 1
        </button>
        <button
          onClick={() => setAltVersion(2)}
          className={`px-4 py-2 rounded-lg font-bold shadow-lg transition-all ${
            altVersion === 2 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Alt 2
        </button>
        
        {/* Background Theme Toggles */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setBackgroundTheme(1)}
            className={`px-3 py-1 rounded font-bold text-xs shadow-lg transition-all ${
              backgroundTheme === 1 ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
            }`}
          >
            Purple
          </button>
          <button
            onClick={() => setBackgroundTheme(2)}
            className={`px-3 py-1 rounded font-bold text-xs shadow-lg transition-all ${
              backgroundTheme === 2 ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setBackgroundTheme(3)}
            className={`px-3 py-1 rounded font-bold text-xs shadow-lg transition-all ${
              backgroundTheme === 3 ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
            }`}
          >
            Black
          </button>
        </div>
        {altVersion === 2 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontIndex((fontIndex - 1 + FONT_OPTIONS.length) % FONT_OPTIONS.length)}
              className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              ←
            </button>
            <span className="px-3 py-2 rounded-lg bg-purple-500 text-white font-bold min-w-[100px] text-center">
              {fontIndex + 1}. {FONT_OPTIONS[fontIndex].name}
            </span>
            <button
              onClick={() => setFontIndex((fontIndex + 1) % FONT_OPTIONS.length)}
              className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              →
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => setColorIndex((colorIndex - 1 + COLOR_COMBOS.length) % COLOR_COMBOS.length)}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            ←
          </button>
          <span className="px-3 py-2 rounded-lg bg-orange-500 text-white font-bold min-w-[100px] text-center">
            {COLOR_COMBOS[colorIndex].name}
          </span>
          <button
            onClick={() => setColorIndex((colorIndex + 1) % COLOR_COMBOS.length)}
            className="w-8 h-8 rounded-lg font-bold shadow-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}