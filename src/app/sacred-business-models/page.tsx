'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, Target, Users, BookOpen, DollarSign, Zap, Star, TrendingUp, X } from 'lucide-react';

interface BusinessModel {
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

const businessModels: BusinessModel[] = [
  { title: "Sacred 1:1 Spiritual Coaching", category: "Coaching Models", tags: "coaching, transformation, healing", challengeAddressed: "Monetizing spiritual gifts", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Beginner", prerequisites: "Coaching training", expectedOutcome: "$3-10k monthly", keywords: "spiritual coaching 1on1", description: "Deep transformation work with individuals" },
  { title: "Group Soul Circle Coaching", category: "Coaching Models", tags: "group coaching, circles, community", challengeAddressed: "Scaling impact", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Intermediate", prerequisites: "Group facilitation skills", expectedOutcome: "$5-15k monthly", keywords: "group coaching circles community", description: "Monthly group transformation circles" },
  { title: "Spiritual Business Mastermind", category: "Coaching Models", tags: "mastermind, business, spiritual", challengeAddressed: "Combining spirituality + business", businessStage: "Established", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Advanced", prerequisites: "Business experience", expectedOutcome: "$10-50k monthly", keywords: "mastermind business spiritual", description: "High-level spiritual entrepreneur community" },
  { title: "Sacred Ceremony Facilitation", category: "Ceremony Models", tags: "ceremonies, rituals, healing", challengeAddressed: "Creating meaningful experiences", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Ceremony training", expectedOutcome: "$500-5k per event", keywords: "ceremony ritual facilitation", description: "Weddings, life transitions, healing ceremonies" },
  { title: "Digital Course: Spiritual Awakening", category: "Course Models", tags: "courses, awakening, digital", challengeAddressed: "Passive income creation", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Intermediate", prerequisites: "Teaching ability", expectedOutcome: "$5-20k monthly", keywords: "digital course spiritual awakening", description: "Self-paced transformation journey" },
  { title: "Membership: Daily Spiritual Practice", category: "Membership Models", tags: "membership, daily practice, community", challengeAddressed: "Recurring revenue", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "2 months", difficultyLevel: "Intermediate", prerequisites: "Content creation", expectedOutcome: "$2-10k monthly", keywords: "membership daily spiritual practice", description: "Monthly spiritual practice community" },
  { title: "Retreat Planning & Hosting", category: "Event Models", tags: "retreats, immersion, transformation", challengeAddressed: "High-value offerings", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Event planning", expectedOutcome: "$10-100k per retreat", keywords: "retreat planning hosting", description: "Multi-day transformational experiences" },
  { title: "Spiritual Business Consulting", category: "Consulting Models", tags: "consulting, business, strategy", challengeAddressed: "Expertise monetization", businessStage: "Established", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Advanced", prerequisites: "Business expertise", expectedOutcome: "$5-25k monthly", keywords: "spiritual business consulting", description: "Helping others build spiritual businesses" },
  { title: "Sacred Art & Creative Services", category: "Creative Models", tags: "art, creativity, healing", challengeAddressed: "Creative expression income", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Beginner", prerequisites: "Artistic ability", expectedOutcome: "$1-5k monthly", keywords: "sacred art creative services", description: "Healing art, mandalas, spiritual design" },
  { title: "Spiritual Writing & Publishing", category: "Content Models", tags: "writing, books, publishing", challengeAddressed: "Thought leadership", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Writing skills", expectedOutcome: "$2-20k monthly", keywords: "spiritual writing publishing", description: "Books, blogs, spiritual content" },
  { title: "Intuitive Reading Services", category: "Reading Models", tags: "intuitive, psychic, guidance", challengeAddressed: "Psychic gift monetization", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Intuitive abilities", expectedOutcome: "$2-8k monthly", keywords: "intuitive psychic reading", description: "Personal guidance sessions" },
  { title: "Energy Healing Practice", category: "Healing Models", tags: "energy healing, reiki, chakras", challengeAddressed: "Healing gift monetization", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Intermediate", prerequisites: "Healing certification", expectedOutcome: "$3-12k monthly", keywords: "energy healing reiki practice", description: "Remote and in-person healing" },
  { title: "Spiritual Life Coaching", category: "Coaching Models", tags: "life coaching, spiritual, guidance", challengeAddressed: "Life transformation", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Intermediate", prerequisites: "Coaching certification", expectedOutcome: "$4-15k monthly", keywords: "spiritual life coaching", description: "Holistic life guidance" },
  { title: "Sacred Business Templates", category: "Digital Products", tags: "templates, business, sacred", challengeAddressed: "Passive product income", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Beginner", prerequisites: "Design skills", expectedOutcome: "$1-5k monthly", keywords: "business templates sacred", description: "Ready-made spiritual business tools" },
  { title: "Meditation Teacher Training", category: "Education Models", tags: "meditation, teaching, certification", challengeAddressed: "Teaching spiritual practices", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Meditation expertise", expectedOutcome: "$5-25k per cohort", keywords: "meditation teacher training", description: "Certifying new meditation teachers" },
  { title: "Spiritual Podcast Monetization", category: "Content Models", tags: "podcast, monetization, spiritual", challengeAddressed: "Content monetization", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Intermediate", prerequisites: "Podcasting skills", expectedOutcome: "$2-15k monthly", keywords: "podcast spiritual monetization", description: "Spiritual podcast with multiple revenue streams" },
  { title: "Oracle Card Creation", category: "Product Models", tags: "oracle cards, divination, creation", challengeAddressed: "Creative product income", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Artistic ability", expectedOutcome: "$5-50k per deck", keywords: "oracle cards creation divination", description: "Custom oracle card deck development" },
  { title: "Spiritual App Development", category: "Tech Models", tags: "app, technology, spiritual", challengeAddressed: "Tech integration", businessStage: "Established", resourceType: "Framework", timeInvestment: "12 months", difficultyLevel: "Advanced", prerequisites: "Tech team", expectedOutcome: "$10-100k monthly", keywords: "spiritual app technology", description: "Meditation, guidance, or practice apps" },
  { title: "Sacred Space Rental", category: "Physical Models", tags: "space rental, ceremonies, events", challengeAddressed: "Location-based income", businessStage: "Established", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Advanced", prerequisites: "Physical space", expectedOutcome: "$2-10k monthly", keywords: "sacred space rental ceremonies", description: "Renting space for spiritual events" },
  { title: "Spiritual Affiliate Marketing", category: "Marketing Models", tags: "affiliate, partnerships, spiritual", challengeAddressed: "Partnership income", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Beginner", prerequisites: "Audience", expectedOutcome: "$500-5k monthly", keywords: "affiliate marketing spiritual", description: "Promoting aligned spiritual products" },
  { title: "Donation-Based Offerings", category: "Alternative Models", tags: "donations, gifts, abundance", challengeAddressed: "Non-traditional pricing", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Beginner", prerequisites: "None", expectedOutcome: "Heart-based income", keywords: "donation based offerings gifts", description: "Gift economy spiritual services" },
  { title: "Spiritual Business Accelerator", category: "Intensive Models", tags: "accelerator, intensive, business", challengeAddressed: "High-touch transformation", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Proven results", expectedOutcome: "$25-100k per cohort", keywords: "business accelerator spiritual", description: "6-month intensive business program" },
  { title: "Moon Cycle Business Planning", category: "Planning Models", tags: "moon cycles, planning, ritual", challengeAddressed: "Spiritual business timing", businessStage: "All stages", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Intermediate", prerequisites: "Astrology knowledge", expectedOutcome: "Aligned business rhythm", keywords: "moon cycle business planning", description: "Business planning with lunar cycles" },
  { title: "Sacred Sales Conversations", category: "Sales Models", tags: "sales, sacred, conversations", challengeAddressed: "Sales without sleaze", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Intermediate", prerequisites: "Sales training", expectedOutcome: "Higher conversion", keywords: "sacred sales conversations", description: "Heart-centered sales approach" },
  { title: "Spiritual Subscription Box", category: "Product Models", tags: "subscription, box, spiritual", challengeAddressed: "Physical product income", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Advanced", prerequisites: "Product sourcing", expectedOutcome: "$5-25k monthly", keywords: "subscription box spiritual", description: "Monthly spiritual product curation" },
  { title: "Energy Clearing for Businesses", category: "Service Models", tags: "energy clearing, business, healing", challengeAddressed: "Business energy healing", businessStage: "Established", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Advanced", prerequisites: "Energy work training", expectedOutcome: "$1-5k per clearing", keywords: "energy clearing business healing", description: "Clearing stagnant business energy" },
  { title: "Spiritual Content Creation", category: "Content Models", tags: "content, creation, spiritual", challengeAddressed: "Consistent content income", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "2 months", difficultyLevel: "Intermediate", prerequisites: "Content skills", expectedOutcome: "$2-10k monthly", keywords: "spiritual content creation", description: "Blogs, videos, social media content" },
  { title: "Sacred Partnership Programs", category: "Partnership Models", tags: "partnerships, collaboration, sacred", challengeAddressed: "Collaboration income", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Intermediate", prerequisites: "Network", expectedOutcome: "$3-15k monthly", keywords: "sacred partnership collaboration", description: "Joint ventures with spiritual alignment" },
  { title: "Intuitive Business Strategy", category: "Strategy Models", tags: "intuitive, strategy, guidance", challengeAddressed: "Strategic clarity", businessStage: "All stages", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "Business experience", expectedOutcome: "Clear direction", keywords: "intuitive business strategy", description: "Using intuition for business decisions" },
  { title: "Spiritual Licensing Programs", category: "Licensing Models", tags: "licensing, certification, spiritual", challengeAddressed: "Scalable teaching", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Proven methodology", expectedOutcome: "$10-50k monthly", keywords: "licensing certification spiritual", description: "License your spiritual methodology" },
  { title: "Heart-Centered Copywriting", category: "Service Models", tags: "copywriting, heart-centered, authentic", challengeAddressed: "Authentic marketing", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Intermediate", prerequisites: "Writing skills", expectedOutcome: "$3-12k monthly", keywords: "copywriting heart-centered authentic", description: "Spiritual copy that converts" },
  { title: "Sacred Brand Photography", category: "Service Models", tags: "photography, branding, sacred", challengeAddressed: "Visual brand alignment", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Intermediate", prerequisites: "Photography skills", expectedOutcome: "$2-8k monthly", keywords: "brand photography sacred", description: "Soul-aligned visual branding" },
  { title: "Spiritual Business Audit", category: "Service Models", tags: "audit, assessment, spiritual", challengeAddressed: "Business alignment check", businessStage: "Established", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Advanced", prerequisites: "Business analysis", expectedOutcome: "$1-5k per audit", keywords: "business audit spiritual", description: "Comprehensive spiritual business review" },
  { title: "Moon Circle Membership", category: "Membership Models", tags: "moon circles, rituals, community", challengeAddressed: "Monthly recurring revenue", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "2 months", difficultyLevel: "Intermediate", prerequisites: "Moon knowledge", expectedOutcome: "$2-8k monthly", keywords: "moon circle membership community", description: "Monthly new moon ceremony community" },
  { title: "Spiritual Speaking Engagements", category: "Speaking Models", tags: "speaking, events, spiritual", challengeAddressed: "Visibility and income", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Advanced", prerequisites: "Speaking skills", expectedOutcome: "$2-15k per event", keywords: "spiritual speaking engagements", description: "Paid spiritual speaking opportunities" },
  { title: "Sacred Workspace Design", category: "Service Models", tags: "workspace, design, energy", challengeAddressed: "Environment optimization", businessStage: "Established", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Intermediate", prerequisites: "Design skills", expectedOutcome: "$3-10k per project", keywords: "workspace design sacred energy", description: "Creating soul-aligned workspaces" },
  { title: "Spiritual Business Coaching Certification", category: "Certification Models", tags: "certification, coaching, business", challengeAddressed: "Teaching others", businessStage: "Established", resourceType: "Framework", timeInvestment: "12 months", difficultyLevel: "Advanced", prerequisites: "Proven results", expectedOutcome: "$15-75k per cohort", keywords: "coaching certification spiritual business", description: "Certifying spiritual business coaches" },
  { title: "Goddess Circle Facilitation", category: "Facilitation Models", tags: "goddess, feminine, circles", challengeAddressed: "Divine feminine work", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Intermediate", prerequisites: "Feminine wisdom", expectedOutcome: "$1-5k per circle", keywords: "goddess circle feminine facilitation", description: "Women's empowerment circles" },
  { title: "Sacred Plant Medicine Integration", category: "Integration Models", tags: "plant medicine, integration, healing", challengeAddressed: "Post-ceremony support", businessStage: "Advanced", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Advanced", prerequisites: "Plant medicine experience", expectedOutcome: "$5-20k monthly", keywords: "plant medicine integration healing", description: "Supporting spiritual journeys" },
  { title: "Spiritual Business Incubator", category: "Incubator Models", tags: "incubator, startup, spiritual", challengeAddressed: "Supporting new entrepreneurs", businessStage: "Established", resourceType: "Framework", timeInvestment: "12 months", difficultyLevel: "Advanced", prerequisites: "Business success", expectedOutcome: "$20-100k per cohort", keywords: "business incubator spiritual", description: "6-month spiritual business launch program" },
  { title: "Crystal Healing Business", category: "Healing Models", tags: "crystals, healing, energy", challengeAddressed: "Crystal work monetization", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Beginner", prerequisites: "Crystal knowledge", expectedOutcome: "$1-6k monthly", keywords: "crystal healing business", description: "Crystal healing sessions and products" },
  { title: "Spiritual Travel Experiences", category: "Experience Models", tags: "travel, spiritual, journeys", challengeAddressed: "Experiential income", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Travel planning", expectedOutcome: "$5-50k per trip", keywords: "spiritual travel experiences", description: "Sacred site pilgrimages and retreats" },
  { title: "Akashic Records Reading", category: "Reading Models", tags: "akashic records, soul, guidance", challengeAddressed: "Soul-level guidance", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Advanced", prerequisites: "Akashic training", expectedOutcome: "$2-10k monthly", keywords: "akashic records reading soul", description: "Deep soul guidance sessions" },
  { title: "Spiritual Business Mastercourse", category: "Course Models", tags: "mastercourse, business, comprehensive", challengeAddressed: "Complete education", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Teaching ability", expectedOutcome: "$10-50k monthly", keywords: "mastercourse spiritual business", description: "Comprehensive spiritual business education" },
  { title: "Sacred Sexuality Coaching", category: "Coaching Models", tags: "sexuality, sacred, healing", challengeAddressed: "Sexual healing work", businessStage: "Advanced", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Advanced", prerequisites: "Sexuality training", expectedOutcome: "$5-25k monthly", keywords: "sacred sexuality coaching healing", description: "Healing relationship with sexuality" },
  { title: "Spiritual Emergency Support", category: "Support Models", tags: "crisis, emergency, spiritual", challengeAddressed: "Crisis support income", businessStage: "Advanced", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Advanced", prerequisites: "Crisis training", expectedOutcome: "$3-15k monthly", keywords: "spiritual emergency crisis support", description: "Supporting spiritual emergencies" },
  { title: "Divine Feminine Business", category: "Feminine Models", tags: "divine feminine, business, flow", challengeAddressed: "Feminine approach to business", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "2 months", difficultyLevel: "Intermediate", prerequisites: "Feminine wisdom", expectedOutcome: "Flowing business growth", keywords: "divine feminine business flow", description: "Business aligned with feminine principles" },
  { title: "Shamanic Healing Practice", category: "Healing Models", tags: "shamanic, healing, soul retrieval", challengeAddressed: "Ancient healing monetization", businessStage: "Advanced", resourceType: "Framework", timeInvestment: "2 years", difficultyLevel: "Advanced", prerequisites: "Shamanic training", expectedOutcome: "$5-30k monthly", keywords: "shamanic healing practice", description: "Traditional shamanic healing services" },
  { title: "Spiritual Tech Consulting", category: "Consulting Models", tags: "technology, spiritual, integration", challengeAddressed: "Tech-spiritual bridge", businessStage: "Established", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Advanced", prerequisites: "Tech expertise", expectedOutcome: "$10-40k monthly", keywords: "spiritual tech consulting", description: "Helping spiritual businesses with technology" },
  { title: "Sacred Sound Healing", category: "Healing Models", tags: "sound healing, bowls, vibration", challengeAddressed: "Sound healing income", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Intermediate", prerequisites: "Sound training", expectedOutcome: "$2-8k monthly", keywords: "sound healing bowls sacred", description: "Sound baths and healing sessions" },
  { title: "Spiritual Business Podcast", category: "Media Models", tags: "podcast, business, education", challengeAddressed: "Authority building", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Intermediate", prerequisites: "Podcasting skills", expectedOutcome: "$3-15k monthly", keywords: "podcast spiritual business", description: "Educational spiritual business content" },
  { title: "Angel Reading Services", category: "Reading Models", tags: "angel, guidance, messages", challengeAddressed: "Angelic guidance income", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Angel connection", expectedOutcome: "$2-10k monthly", keywords: "angel reading guidance messages", description: "Connecting clients with angelic guidance" },
  { title: "Spiritual Copywriting Agency", category: "Agency Models", tags: "copywriting, agency, spiritual", challengeAddressed: "Scaling writing services", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Team building", expectedOutcome: "$10-50k monthly", keywords: "copywriting agency spiritual", description: "Full-service spiritual marketing copy" },
  { title: "Sacred Breathwork Facilitation", category: "Facilitation Models", tags: "breathwork, healing, transformation", challengeAddressed: "Breath healing income", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "2 months", difficultyLevel: "Advanced", prerequisites: "Breathwork training", expectedOutcome: "$3-12k monthly", keywords: "breathwork facilitation sacred", description: "Transformational breathing sessions" },
  { title: "Spiritual Business Software", category: "Software Models", tags: "software, tools, spiritual", challengeAddressed: "Software development", businessStage: "Established", resourceType: "Framework", timeInvestment: "12 months", difficultyLevel: "Advanced", prerequisites: "Development team", expectedOutcome: "$20-200k monthly", keywords: "spiritual business software", description: "Apps and tools for spiritual entrepreneurs" },
  { title: "Manifestation Coaching Practice", category: "Coaching Models", tags: "manifestation, creation, abundance", challengeAddressed: "Teaching manifestation", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 month", difficultyLevel: "Intermediate", prerequisites: "Manifestation mastery", expectedOutcome: "$3-15k monthly", keywords: "manifestation coaching practice", description: "Helping others manifest their dreams" },
  { title: "Sacred Geometry Design Services", category: "Design Models", tags: "sacred geometry, design, art", challengeAddressed: "Spiritual design income", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "2 weeks", difficultyLevel: "Intermediate", prerequisites: "Design skills", expectedOutcome: "$2-8k monthly", keywords: "sacred geometry design services", description: "Spiritual art and design services" },
  { title: "Spiritual Business Retreat Center", category: "Physical Models", tags: "retreat center, hosting, space", challengeAddressed: "Location-based business", businessStage: "Established", resourceType: "Framework", timeInvestment: "2 years", difficultyLevel: "Advanced", prerequisites: "Significant capital", expectedOutcome: "$25-150k monthly", keywords: "retreat center spiritual business", description: "Operating a spiritual retreat facility" },
  { title: "Astrology Business Consulting", category: "Consulting Models", tags: "astrology, business, timing", challengeAddressed: "Astrological business guidance", businessStage: "Established", resourceType: "Framework", timeInvestment: "3 months", difficultyLevel: "Advanced", prerequisites: "Astrology expertise", expectedOutcome: "$5-25k monthly", keywords: "astrology business consulting", description: "Using astrology for business decisions" },
  { title: "Spiritual Affiliate Network", category: "Network Models", tags: "affiliate, network, spiritual", challengeAddressed: "Community monetization", businessStage: "Scaling", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Large network", expectedOutcome: "$5-30k monthly", keywords: "affiliate network spiritual", description: "Network of spiritual product affiliates" },
  { title: "Sacred Text Translation Services", category: "Service Models", tags: "translation, sacred texts, spiritual", challengeAddressed: "Language services", businessStage: "Starting out", resourceType: "Framework", timeInvestment: "1 week", difficultyLevel: "Intermediate", prerequisites: "Language skills", expectedOutcome: "$2-10k monthly", keywords: "translation sacred texts spiritual", description: "Translating spiritual content" },
  { title: "Spiritual Business Legal Services", category: "Legal Models", tags: "legal, spiritual business, protection", challengeAddressed: "Legal specialization", businessStage: "Established", resourceType: "Framework", timeInvestment: "2 years", difficultyLevel: "Advanced", prerequisites: "Legal degree", expectedOutcome: "$15-75k monthly", keywords: "legal spiritual business services", description: "Legal services for spiritual entrepreneurs" },
  { title: "Sacred Architecture Consulting", category: "Consulting Models", tags: "architecture, sacred space, design", challengeAddressed: "Space design income", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Architecture background", expectedOutcome: "$10-50k per project", keywords: "architecture sacred space consulting", description: "Designing sacred spaces and buildings" },
  { title: "Spiritual Investment Consulting", category: "Financial Models", tags: "investment, spiritual, ethical", challengeAddressed: "Ethical investing", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Financial background", expectedOutcome: "$5-25k monthly", keywords: "spiritual investment consulting", description: "Helping with ethical investment choices" },
  { title: "Energy-Based Marketing Agency", category: "Agency Models", tags: "marketing, energy, spiritual", challengeAddressed: "Spiritual marketing services", businessStage: "Established", resourceType: "Framework", timeInvestment: "6 months", difficultyLevel: "Advanced", prerequisites: "Marketing expertise", expectedOutcome: "$15-75k monthly", keywords: "energy marketing agency spiritual", description: "Full-service spiritual marketing" },
  { title: "Conscious Business Broker", category: "Brokerage Models", tags: "business broker, conscious, spiritual", challengeAddressed: "Business transactions", businessStage: "Established", resourceType: "Framework", timeInvestment: "12 months", difficultyLevel: "Advanced", prerequisites: "Business valuation", expectedOutcome: "$10-100k per deal", keywords: "conscious business broker", description: "Facilitating spiritual business sales" }
];

export default function SacredBusinessModelsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [selectedModel, setSelectedModel] = useState<BusinessModel | null>(null);
  const [viewerCount, setViewerCount] = useState(342);

  const filteredModels = useMemo(() => {
    return businessModels.filter((model) => {
      const matchesSearch = searchTerm === '' || 
        model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.challengeAddressed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.keywords.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === '' || model.category === categoryFilter;
      const matchesStage = stageFilter === '' || model.businessStage === stageFilter;
      const matchesDifficulty = difficultyFilter === '' || model.difficultyLevel === difficultyFilter;

      return matchesSearch && matchesCategory && matchesStage && matchesDifficulty;
    });
  }, [searchTerm, categoryFilter, stageFilter, difficultyFilter]);

  const categories = [...new Set(businessModels.map(m => m.category))];
  const stages = [...new Set(businessModels.map(m => m.businessStage))];
  const difficulties = [...new Set(businessModels.map(m => m.difficultyLevel))];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-500"></div>
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
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                Sacred Business Models
              </h1>
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              67 Proven spiritual income streams that honor your values. Transform your gifts into abundance with soul-aligned business models.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">{viewerCount} viewing now</span>
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
                  placeholder="Search sacred models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all appearance-none cursor-pointer"
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
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all appearance-none cursor-pointer"
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
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all appearance-none cursor-pointer"
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
              Showing <span className="text-purple-400 font-semibold">{filteredModels.length}</span> of <span className="text-purple-400 font-semibold">{businessModels.length}</span> sacred business models
            </p>
          </motion.div>

          {/* Business Models Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedModel(model)}
                className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group hover:bg-gray-800/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    model.category.includes('Coaching') ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    model.category.includes('Healing') ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    model.category.includes('Course') ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    model.category.includes('Tech') ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    'bg-gray-600/20 text-gray-300 border border-gray-600/30'
                  }`}>
                    {model.category}
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    model.difficultyLevel === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                    model.difficultyLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {model.difficultyLevel}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {model.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {model.description}
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">{model.timeInvestment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300 text-xs">{model.businessStage}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <Target className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        <span className="text-indigo-300 font-medium">Solves:</span> {model.challengeAddressed}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        <span className="text-green-300 font-medium">Income:</span> {model.expectedOutcome}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {model.tags.split(', ').slice(0, 3).map((tag, tagIndex) => (
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

          {filteredModels.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-xl">No sacred models found matching your search.</p>
              <p className="text-gray-500 text-sm mt-3">Try adjusting your filters or search term.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModel(null)}
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
                onClick={() => setSelectedModel(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedModel.category.includes('Coaching') ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    selectedModel.category.includes('Healing') ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    selectedModel.category.includes('Course') ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    selectedModel.category.includes('Tech') ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    'bg-gray-600/20 text-gray-300 border border-gray-600/30'
                  }`}>
                    {selectedModel.category}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedModel.difficultyLevel === 'Beginner' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    selectedModel.difficultyLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {selectedModel.difficultyLevel}
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">{selectedModel.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedModel.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-indigo-400" />
                    <div>
                      <p className="text-indigo-300 font-medium text-sm">Challenge Addressed</p>
                      <p className="text-white">{selectedModel.challengeAddressed}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-green-300 font-medium text-sm">Expected Income</p>
                      <p className="text-white font-semibold">{selectedModel.expectedOutcome}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-blue-300 font-medium text-sm">Time Investment</p>
                      <p className="text-white">{selectedModel.timeInvestment}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-purple-300 font-medium text-sm">Business Stage</p>
                      <p className="text-white">{selectedModel.businessStage}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-orange-400" />
                    <div>
                      <p className="text-orange-300 font-medium text-sm">Prerequisites</p>
                      <p className="text-white">{selectedModel.prerequisites}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-cyan-300 font-medium text-sm">Resource Type</p>
                      <p className="text-white">{selectedModel.resourceType}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-300 font-medium text-sm mb-3">Tags & Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {selectedModel.tags.split(', ').map((tag, index) => (
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