'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, Target, Users, BookOpen, DollarSign, Zap, Star, TrendingUp, X, Code, Cpu } from 'lucide-react';

interface TechIntegration {
  title: string;
  category: string;
  tags: string;
  challengeAddressed: string;
  businessStage: string;
  resourceType: string;
  timeInvestment: string;
  difficultyLevel: string;
  prerequisites: string;
  expectedOutcome: string;
  keywords: string;
  description: string;
}

const techIntegrations: TechIntegration[] = [
  { title: "Meditation App Integration Framework", category: "App Templates", tags: "meditation, app, framework", challengeAddressed: "Digital meditation delivery", businessStage: "Scaling", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Basic tech knowledge", expectedOutcome: "Functional meditation app", keywords: "meditation app integration", description: "Complete meditation app structure" },
  { title: "Chakra Balancing Quiz Builder", category: "Interactive Tools", tags: "chakra, quiz, assessment", challengeAddressed: "Interactive spiritual assessment", businessStage: "Starting out", resourceType: "Template", timeInvestment: "3 days", difficultyLevel: "Beginner", prerequisites: "Basic web knowledge", expectedOutcome: "Engaging user experience", keywords: "chakra quiz builder", description: "Interactive chakra assessment tool" },
  { title: "Moon Phase Business Planner", category: "Planning Tools", tags: "moon phases, planning, calendar", challengeAddressed: "Lunar business alignment", businessStage: "All stages", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Calendar integration", expectedOutcome: "Aligned business planning", keywords: "moon phase planner business", description: "Business planning with lunar cycles" },
  { title: "Sacred Geometry Website Templates", category: "Design Templates", tags: "sacred geometry, website, design", challengeAddressed: "Spiritual web presence", businessStage: "Starting out", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Beginner", prerequisites: "Website basics", expectedOutcome: "Professional spiritual site", keywords: "sacred geometry website design", description: "Spiritually-aligned website designs" },
  { title: "Manifestation Tracker Dashboard", category: "Tracking Tools", tags: "manifestation, tracking, goals", challengeAddressed: "Goal manifestation system", businessStage: "All stages", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Spreadsheet skills", expectedOutcome: "Clear manifestation progress", keywords: "manifestation tracker dashboard", description: "Digital manifestation progress tracking" },
  { title: "Spiritual CRM Integration", category: "Business Tools", tags: "CRM, spiritual, client management", challengeAddressed: "Client relationship management", businessStage: "Scaling", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "CRM experience", expectedOutcome: "Organized client relationships", keywords: "spiritual CRM integration", description: "CRM customized for spiritual businesses" },
  { title: "Energy Reading Booking System", category: "Booking Tools", tags: "booking, readings, scheduling", challengeAddressed: "Automated scheduling", businessStage: "Starting out", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Booking platform", expectedOutcome: "Streamlined bookings", keywords: "energy reading booking system", description: "Automated spiritual service booking" },
  { title: "Spiritual Course Platform Setup", category: "Education Platforms", tags: "course platform, spiritual, learning", challengeAddressed: "Online course delivery", businessStage: "Scaling", resourceType: "Template", timeInvestment: "3 weeks", difficultyLevel: "Advanced", prerequisites: "Platform knowledge", expectedOutcome: "Professional course delivery", keywords: "spiritual course platform", description: "Complete online spiritual education setup" },
  { title: "Abundance Mindset Email Sequences", category: "Email Marketing", tags: "email, abundance, automation", challengeAddressed: "Automated nurturing", businessStage: "Scaling", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Email platform", expectedOutcome: "Consistent client nurturing", keywords: "abundance email sequences", description: "Pre-written spiritual email series" },
  { title: "Spiritual Social Media Scheduler", category: "Social Tools", tags: "social media, scheduling, spiritual", challengeAddressed: "Consistent spiritual content", businessStage: "All stages", resourceType: "Template", timeInvestment: "3 days", difficultyLevel: "Beginner", prerequisites: "Social platforms", expectedOutcome: "Regular spiritual content", keywords: "spiritual social media scheduler", description: "Automated spiritual content posting" },
  { title: "Intuitive Website Personalization", category: "Personalization Tools", tags: "intuitive, website, customization", challengeAddressed: "Personalized user experience", businessStage: "Advanced", resourceType: "Template", timeInvestment: "3 weeks", difficultyLevel: "Advanced", prerequisites: "Web development", expectedOutcome: "Tailored user journeys", keywords: "intuitive website personalization", description: "Website that adapts to user energy" },
  { title: "Crystal Healing App Framework", category: "App Templates", tags: "crystals, healing, mobile", challengeAddressed: "Crystal guidance app", businessStage: "Scaling", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "App development", expectedOutcome: "Crystal guidance tool", keywords: "crystal healing app framework", description: "Complete crystal guidance application" },
  { title: "Spiritual Analytics Dashboard", category: "Analytics Tools", tags: "analytics, spiritual, metrics", challengeAddressed: "Data-driven spiritual business", businessStage: "Established", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "Analytics knowledge", expectedOutcome: "Business insights", keywords: "spiritual analytics dashboard", description: "Spiritual business performance tracking" },
  { title: "Sacred Ceremony Live Streaming", category: "Streaming Tools", tags: "live streaming, ceremonies, virtual", challengeAddressed: "Virtual ceremony hosting", businessStage: "Scaling", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Streaming setup", expectedOutcome: "Global ceremony access", keywords: "ceremony live streaming sacred", description: "Virtual spiritual ceremony platform" },
  { title: "Spiritual Chatbot Framework", category: "AI Tools", tags: "chatbot, spiritual, guidance", challengeAddressed: "Automated spiritual support", businessStage: "Advanced", resourceType: "Template", timeInvestment: "3 weeks", difficultyLevel: "Advanced", prerequisites: "AI/ML knowledge", expectedOutcome: "24/7 spiritual guidance", keywords: "spiritual chatbot framework", description: "AI-powered spiritual guidance bot" },
  { title: "Energy Healing Session Tracker", category: "Tracking Tools", tags: "healing, sessions, progress", challengeAddressed: "Client progress tracking", businessStage: "Starting out", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Beginner", prerequisites: "Basic tech", expectedOutcome: "Clear client progress", keywords: "healing session tracker energy", description: "Digital healing session management" },
  { title: "Spiritual Podcast Platform", category: "Media Platforms", tags: "podcast, spiritual, hosting", challengeAddressed: "Professional podcast presence", businessStage: "Scaling", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Intermediate", prerequisites: "Podcast knowledge", expectedOutcome: "Professional podcast setup", keywords: "spiritual podcast platform", description: "Complete podcast hosting solution" },
  { title: "Astrology Chart Generator", category: "Calculation Tools", tags: "astrology, charts, calculation", challengeAddressed: "Automated chart creation", businessStage: "Starting out", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "Astrology knowledge", expectedOutcome: "Professional chart generation", keywords: "astrology chart generator", description: "Automated birth chart creation" },
  { title: "Spiritual Payment Processing", category: "Payment Tools", tags: "payments, spiritual, processing", challengeAddressed: "Secure spiritual transactions", businessStage: "All stages", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Payment platforms", expectedOutcome: "Smooth transactions", keywords: "spiritual payment processing", description: "Payment system for spiritual services" },
  { title: "Mindfulness Timer App", category: "App Templates", tags: "mindfulness, timer, meditation", challengeAddressed: "Digital meditation support", businessStage: "Starting out", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Beginner", prerequisites: "Basic app knowledge", expectedOutcome: "Better meditation practice", keywords: "mindfulness timer app", description: "Customizable meditation timer" },
  { title: "Spiritual Community Platform", category: "Community Tools", tags: "community, platform, engagement", challengeAddressed: "Online spiritual community", businessStage: "Scaling", resourceType: "Template", timeInvestment: "4 weeks", difficultyLevel: "Advanced", prerequisites: "Community management", expectedOutcome: "Engaged spiritual community", keywords: "spiritual community platform", description: "Complete community management system" },
  { title: "Energy Assessment Calculator", category: "Assessment Tools", tags: "energy, assessment, calculation", challengeAddressed: "Spiritual health metrics", businessStage: "All stages", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Assessment design", expectedOutcome: "Clear energy insights", keywords: "energy assessment calculator", description: "Digital energy health assessment" },
  { title: "Sacred Sound Library System", category: "Audio Tools", tags: "sound, library, healing", challengeAddressed: "Organized healing sounds", businessStage: "Starting out", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Intermediate", prerequisites: "Audio management", expectedOutcome: "Professional sound library", keywords: "sacred sound library system", description: "Healing sound organization system" },
  { title: "Spiritual Event Management", category: "Event Tools", tags: "events, management, spiritual", challengeAddressed: "Streamlined event hosting", businessStage: "Scaling", resourceType: "Template", timeInvestment: "3 weeks", difficultyLevel: "Advanced", prerequisites: "Event planning", expectedOutcome: "Professional event management", keywords: "spiritual event management", description: "Complete spiritual event platform" },
  { title: "Manifestation Journal App", category: "Journaling Tools", tags: "journaling, manifestation, digital", challengeAddressed: "Digital spiritual journaling", businessStage: "All stages", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Intermediate", prerequisites: "App development", expectedOutcome: "Consistent journaling practice", keywords: "manifestation journal app", description: "Digital manifestation tracking" },
  { title: "Spiritual SEO Optimization", category: "SEO Tools", tags: "SEO, spiritual, optimization", challengeAddressed: "Spiritual business visibility", businessStage: "Scaling", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "SEO knowledge", expectedOutcome: "Increased spiritual traffic", keywords: "spiritual SEO optimization", description: "SEO strategies for spiritual businesses" },
  { title: "Energy Clearing Appointment System", category: "Scheduling Tools", tags: "appointments, energy clearing, automation", challengeAddressed: "Automated energy work booking", businessStage: "Starting out", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Scheduling platforms", expectedOutcome: "Streamlined energy sessions", keywords: "energy clearing appointments", description: "Specialized booking for energy work" },
  { title: "Spiritual Business AI Assistant", category: "AI Tools", tags: "AI, assistant, spiritual business", challengeAddressed: "AI-powered business support", businessStage: "Advanced", resourceType: "Template", timeInvestment: "4 weeks", difficultyLevel: "Advanced", prerequisites: "AI development", expectedOutcome: "Intelligent business assistance", keywords: "spiritual AI assistant business", description: "AI helper for spiritual entrepreneurs" },
  { title: "Sacred Economics Platform", category: "Financial Tools", tags: "economics, sacred, platform", challengeAddressed: "Alternative economic models", businessStage: "Advanced", resourceType: "Template", timeInvestment: "8 weeks", difficultyLevel: "Advanced", prerequisites: "Financial systems", expectedOutcome: "Gift economy platform", keywords: "sacred economics platform", description: "Platform for gift-based economy" },
  { title: "Spiritual Video Streaming", category: "Streaming Tools", tags: "video, streaming, spiritual", challengeAddressed: "Professional video delivery", businessStage: "Scaling", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "Video streaming", expectedOutcome: "Professional video presence", keywords: "spiritual video streaming", description: "Video platform for spiritual content" },
  { title: "Intuitive Design Generator", category: "Design Tools", tags: "intuitive, design, automation", challengeAddressed: "Automated spiritual design", businessStage: "Scaling", resourceType: "Template", timeInvestment: "3 weeks", difficultyLevel: "Advanced", prerequisites: "Design + AI", expectedOutcome: "Instant spiritual branding", keywords: "intuitive design generator", description: "AI-powered spiritual design creation" },
  { title: "Spiritual Business Metrics", category: "Analytics Tools", tags: "metrics, KPIs, spiritual", challengeAddressed: "Spiritual business measurement", businessStage: "All stages", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Advanced", prerequisites: "Analytics", expectedOutcome: "Soul-aligned success metrics", keywords: "spiritual business metrics", description: "KPIs that honor spiritual values" },
  { title: "Sacred Text Generator", category: "Content Tools", tags: "text, generation, sacred", challengeAddressed: "Automated spiritual content", businessStage: "Advanced", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "AI content", expectedOutcome: "Consistent spiritual messaging", keywords: "sacred text generator", description: "AI-generated spiritual content" },
  { title: "Energy-Based Pricing Calculator", category: "Pricing Tools", tags: "pricing, energy, value", challengeAddressed: "Spiritual service pricing", businessStage: "Starting out", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Pricing strategy", expectedOutcome: "Confident pricing", keywords: "energy pricing calculator", description: "Spiritual service pricing tool" },
  { title: "Spiritual Customer Journey Automation", category: "Automation Tools", tags: "customer journey, automation, spiritual", challengeAddressed: "Automated spiritual client flow", businessStage: "Scaling", resourceType: "Template", timeInvestment: "3 weeks", difficultyLevel: "Advanced", prerequisites: "Marketing automation", expectedOutcome: "Seamless client experience", keywords: "spiritual customer journey automation", description: "Automated spiritual client nurturing" },
  { title: "Sacred Space Virtual Reality", category: "VR Tools", tags: "VR, sacred space, immersive", challengeAddressed: "Virtual spiritual experiences", businessStage: "Advanced", resourceType: "Template", timeInvestment: "8 weeks", difficultyLevel: "Advanced", prerequisites: "VR development", expectedOutcome: "Immersive spiritual experiences", keywords: "VR sacred space virtual", description: "Virtual reality spiritual environments" },
  { title: "Spiritual Business Intelligence", category: "BI Tools", tags: "business intelligence, spiritual, insights", challengeAddressed: "Data-driven spiritual decisions", businessStage: "Established", resourceType: "Template", timeInvestment: "4 weeks", difficultyLevel: "Advanced", prerequisites: "BI knowledge", expectedOutcome: "Intelligent business insights", keywords: "spiritual business intelligence", description: "Advanced analytics for spiritual businesses" },
  { title: "Healing Frequency Generator", category: "Audio Tools", tags: "frequencies, healing, generation", challengeAddressed: "Custom healing frequencies", businessStage: "Starting out", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Advanced", prerequisites: "Audio engineering", expectedOutcome: "Personalized healing sounds", keywords: "healing frequency generator", description: "Custom spiritual frequency creation" },
  { title: "Spiritual Blockchain Platform", category: "Blockchain Tools", tags: "blockchain, spiritual, decentralized", challengeAddressed: "Decentralized spiritual community", businessStage: "Advanced", resourceType: "Template", timeInvestment: "12 weeks", difficultyLevel: "Advanced", prerequisites: "Blockchain development", expectedOutcome: "Transparent spiritual economy", keywords: "spiritual blockchain platform", description: "Blockchain for spiritual communities" },
  { title: "Sacred Geometry Animation", category: "Animation Tools", tags: "sacred geometry, animation, visual", challengeAddressed: "Animated spiritual content", businessStage: "Scaling", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "Animation skills", expectedOutcome: "Engaging visual content", keywords: "sacred geometry animation", description: "Animated sacred geometry content" },
  { title: "Spiritual Business Simulator", category: "Simulation Tools", tags: "simulation, business, modeling", challengeAddressed: "Business scenario planning", businessStage: "Established", resourceType: "Template", timeInvestment: "4 weeks", difficultyLevel: "Advanced", prerequisites: "Simulation development", expectedOutcome: "Strategic insights", keywords: "spiritual business simulator", description: "Virtual spiritual business planning" },
  { title: "Energy Reading API", category: "API Tools", tags: "API, energy reading, automation", challengeAddressed: "Automated energy assessments", businessStage: "Advanced", resourceType: "Template", timeInvestment: "3 weeks", difficultyLevel: "Advanced", prerequisites: "API development", expectedOutcome: "Scalable energy readings", keywords: "energy reading API automation", description: "API for automated spiritual assessments" },
  { title: "Spiritual Learning Management", category: "LMS Tools", tags: "LMS, spiritual, education", challengeAddressed: "Spiritual education platform", businessStage: "Scaling", resourceType: "Template", timeInvestment: "6 weeks", difficultyLevel: "Advanced", prerequisites: "LMS development", expectedOutcome: "Comprehensive spiritual education", keywords: "spiritual LMS platform", description: "Learning platform for spiritual content" },
  { title: "Sacred Calendar Integration", category: "Calendar Tools", tags: "calendar, sacred, timing", challengeAddressed: "Spiritual scheduling optimization", businessStage: "All stages", resourceType: "Template", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Calendar APIs", expectedOutcome: "Spiritually-aligned scheduling", keywords: "sacred calendar integration", description: "Calendar with spiritual timing" },
  { title: "Spiritual Business Chatroom", category: "Communication Tools", tags: "chat, community, spiritual", challengeAddressed: "Real-time spiritual community", businessStage: "Scaling", resourceType: "Template", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "Chat development", expectedOutcome: "Active spiritual discussions", keywords: "spiritual business chatroom", description: "Live spiritual business community" },
  { title: "Energy Healing Marketplace", category: "Marketplace Tools", tags: "marketplace, healing, directory", challengeAddressed: "Healer discovery platform", businessStage: "Advanced", resourceType: "Template", timeInvestment: "8 weeks", difficultyLevel: "Advanced", prerequisites: "Marketplace development", expectedOutcome: "Healer-client connections", keywords: "energy healing marketplace", description: "Platform connecting healers with clients" },
  { title: "Spiritual Business Automation", category: "Automation Tools", tags: "automation, workflows, spiritual", challengeAddressed: "Complete business automation", businessStage: "Advanced", resourceType: "Template", timeInvestment: "6 weeks", difficultyLevel: "Advanced", prerequisites: "Automation platforms", expectedOutcome: "Fully automated spiritual business", keywords: "spiritual business automation", description: "Complete spiritual business workflow automation" },
  { title: "Sacred Space AR Overlay", category: "AR Tools", tags: "AR, sacred space, overlay", challengeAddressed: "Augmented spiritual reality", businessStage: "Advanced", resourceType: "Template", timeInvestment: "6 weeks", difficultyLevel: "Advanced", prerequisites: "AR development", expectedOutcome: "Enhanced spiritual spaces", keywords: "AR sacred space overlay", description: "AR enhancements for spiritual spaces" },
  { title: "Spiritual Business Operating System", category: "OS Tools", tags: "operating system, business, spiritual", challengeAddressed: "Complete business management", businessStage: "Advanced", resourceType: "Template", timeInvestment: "16 weeks", difficultyLevel: "Advanced", prerequisites: "System development", expectedOutcome: "Unified spiritual business platform", keywords: "spiritual business OS", description: "All-in-one spiritual business management" },
  { title: "Divine Timing Optimization Engine", category: "Optimization Tools", tags: "timing, optimization, divine", challengeAddressed: "Optimal spiritual business timing", businessStage: "Advanced", resourceType: "Template", timeInvestment: "4 weeks", difficultyLevel: "Advanced", prerequisites: "Algorithm development", expectedOutcome: "Perfect timing decisions", keywords: "divine timing optimization", description: "AI for optimal spiritual business timing" }
];

export default function SpiritualTechIntegrationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<TechIntegration | null>(null);
  const [viewerCount, setViewerCount] = useState(289);

  const filteredIntegrations = useMemo(() => {
    return techIntegrations.filter((integration) => {
      const matchesSearch = searchTerm === '' || 
        integration.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.challengeAddressed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.keywords.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === '' || integration.category === categoryFilter;
      const matchesStage = stageFilter === '' || integration.businessStage === stageFilter;
      const matchesDifficulty = difficultyFilter === '' || integration.difficultyLevel === difficultyFilter;

      return matchesSearch && matchesCategory && matchesStage && matchesDifficulty;
    });
  }, [searchTerm, categoryFilter, stageFilter, difficultyFilter]);

  const categories = [...new Set(techIntegrations.map(t => t.category))];
  const stages = [...new Set(techIntegrations.map(t => t.businessStage))];
  const difficulties = [...new Set(techIntegrations.map(t => t.difficultyLevel))];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Spiritual-Tech Integration
              </h1>
              <Code className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              50+ Ready-to-use tech templates that bridge spirituality and technology. Transform your spiritual practice with cutting-edge digital solutions.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">{viewerCount} developers online</span>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tech templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-all"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Stages</option>
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Levels</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-gray-300 text-lg">
              Showing <span className="text-cyan-400 font-semibold">{filteredIntegrations.length}</span> of <span className="text-cyan-400 font-semibold">{techIntegrations.length}</span> tech integration templates
            </p>
          </motion.div>

          {/* Tech Integrations Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredIntegrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedIntegration(integration)}
                className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group hover:bg-gray-800/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    integration.category.includes('App') ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    integration.category.includes('AI') ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    integration.category.includes('Analytics') ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    integration.category.includes('Tools') ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    'bg-gray-600/20 text-gray-300 border border-gray-600/30'
                  }`}>
                    {integration.category}
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    integration.difficultyLevel === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                    integration.difficultyLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {integration.difficultyLevel}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {integration.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {integration.description}
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">{integration.timeInvestment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300 text-xs">{integration.businessStage}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <Target className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        <span className="text-indigo-300 font-medium">Solves:</span> {integration.challengeAddressed}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm">
                      <Zap className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        <span className="text-orange-300 font-medium">Result:</span> {integration.expectedOutcome}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {integration.tags.split(', ').slice(0, 3).map((tag, tagIndex) => (
                        <div key={tagIndex} className="px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-lg text-xs text-gray-300">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredIntegrations.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-xl">No tech integrations found matching your search.</p>
              <p className="text-gray-500 text-sm mt-3">Try adjusting your filters or search term.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIntegration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIntegration(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedIntegration(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedIntegration.category.includes('App') ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    selectedIntegration.category.includes('AI') ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    selectedIntegration.category.includes('Analytics') ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    selectedIntegration.category.includes('Tools') ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    'bg-gray-600/20 text-gray-300 border border-gray-600/30'
                  }`}>
                    {selectedIntegration.category}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedIntegration.difficultyLevel === 'Beginner' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    selectedIntegration.difficultyLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {selectedIntegration.difficultyLevel}
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">{selectedIntegration.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedIntegration.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-indigo-400" />
                    <div>
                      <p className="text-indigo-300 font-medium text-sm">Challenge Addressed</p>
                      <p className="text-white">{selectedIntegration.challengeAddressed}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-orange-400" />
                    <div>
                      <p className="text-orange-300 font-medium text-sm">Expected Outcome</p>
                      <p className="text-white font-semibold">{selectedIntegration.expectedOutcome}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-blue-300 font-medium text-sm">Time Investment</p>
                      <p className="text-white">{selectedIntegration.timeInvestment}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-purple-300 font-medium text-sm">Business Stage</p>
                      <p className="text-white">{selectedIntegration.businessStage}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-cyan-300 font-medium text-sm">Prerequisites</p>
                      <p className="text-white">{selectedIntegration.prerequisites}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-green-300 font-medium text-sm">Resource Type</p>
                      <p className="text-white">{selectedIntegration.resourceType}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-300 font-medium text-sm mb-3">Tags & Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {selectedIntegration.tags.split(', ').map((tag, index) => (
                    <div key={index} className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-lg text-sm text-gray-300">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}