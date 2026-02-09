'use client';

import { motion } from "framer-motion";
import { useState, useMemo, useEffect, memo } from "react";
import { Search, Filter, Eye, Heart, Sparkles } from "lucide-react";

// CSS-based pulsing dot - zero JS overhead
const PulsingDot = memo(() => (
  <div 
    className="w-2 h-2 rounded-full bg-purple-500"
    style={{
      animation: 'pulse-dot 2s ease-in-out infinite',
    }}
  />
));
PulsingDot.displayName = 'PulsingDot';

// Isolated viewer count component
const ViewerCount = memo(({ count }: { count: number }) => (
  <span className="text-sm text-gray-300 font-mono">
    {count} people viewing
  </span>
));
ViewerCount.displayName = 'ViewerCount';

const ViewerCountMobile = memo(({ count }: { count: number }) => (
  <span className="text-xs text-gray-300 font-mono">{count} viewing</span>
));
ViewerCountMobile.displayName = 'ViewerCountMobile';

interface Affirmation {
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

const affirmations: Affirmation[] = [
  {
    title: "I align my business with my highest spiritual purpose",
    category: "Daily Affirmations",
    tags: "purpose, alignment, spiritual",
    challengeAddressed: "Lack of clarity",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Clear direction",
    keywords: "purpose alignment spiritual",
    description: "Morning affirmation for business clarity"
  },
  {
    title: "My spiritual gifts are valuable and worthy of compensation",
    category: "Daily Affirmations",
    tags: "self-worth, monetization, gifts",
    challengeAddressed: "Money blocks",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Confidence in pricing",
    keywords: "self-worth money spiritual gifts",
    description: "Affirmation for overcoming money blocks"
  },
  {
    title: "I attract soul-aligned clients who appreciate my authentic work",
    category: "Daily Affirmations",
    tags: "clients, attraction, authenticity",
    challengeAddressed: "Finding right clients",
    businessStage: "Scaling",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Better client attraction",
    keywords: "soul clients authentic attraction",
    description: "Client magnetism affirmation"
  },
  {
    title: "My business grows in divine timing and perfect order",
    category: "Daily Affirmations",
    tags: "patience, timing, growth",
    challengeAddressed: "Impatience with results",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Inner peace with growth",
    keywords: "divine timing patience growth",
    description: "Patience and trust affirmation"
  },
  {
    title: "I trust my intuition to guide my business decisions",
    category: "Daily Affirmations",
    tags: "intuition, decisions, trust",
    challengeAddressed: "Overthinking",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Better decision making",
    keywords: "intuition trust decisions",
    description: "Decision-making confidence"
  },
  {
    title: "My authentic message resonates with those meant to hear it",
    category: "Daily Affirmations",
    tags: "authenticity, message, resonance",
    challengeAddressed: "Fear of judgment",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Confidence in sharing",
    keywords: "authentic message resonance",
    description: "Message clarity affirmation"
  },
  {
    title: "I am a vessel for transformation and healing in the world",
    category: "Daily Affirmations",
    tags: "service, transformation, healing",
    challengeAddressed: "Doubt about impact",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Sense of purpose",
    keywords: "service transformation healing",
    description: "Purpose and impact affirmation"
  },
  {
    title: "My business flows with ease and grace",
    category: "Daily Affirmations",
    tags: "ease, flow, grace",
    challengeAddressed: "Struggle and force",
    businessStage: "Scaling",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Effortless growth",
    keywords: "ease flow grace business",
    description: "Flow state affirmation"
  },
  {
    title: "I charge what I'm worth with confidence and love",
    category: "Daily Affirmations",
    tags: "pricing, worth, confidence",
    challengeAddressed: "Undercharging",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Better pricing confidence",
    keywords: "pricing worth confidence",
    description: "Pricing confidence affirmation"
  },
  {
    title: "My spiritual practice enhances my business success",
    category: "Daily Affirmations",
    tags: "practice, integration, success",
    challengeAddressed: "Separation of spiritual/business",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Integrated approach",
    keywords: "spiritual practice business success",
    description: "Integration affirmation"
  },
  {
    title: "I am supported by the universe in my business journey",
    category: "Daily Affirmations",
    tags: "support, universe, journey",
    challengeAddressed: "Feeling alone",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Sense of support",
    keywords: "universe support journey",
    description: "Universal support affirmation"
  },
  {
    title: "My vulnerability is a superpower in business",
    category: "Daily Affirmations",
    tags: "vulnerability, strength, power",
    challengeAddressed: "Fear of being vulnerable",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Authentic connection",
    keywords: "vulnerability superpower strength",
    description: "Vulnerability as strength"
  },
  {
    title: "I create sacred space in everything I do",
    category: "Daily Affirmations",
    tags: "sacred space, intention, presence",
    challengeAddressed: "Lack of intentionality",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Intentional business",
    keywords: "sacred space intention presence",
    description: "Sacred business practice"
  },
  {
    title: "My business is a form of prayer in action",
    category: "Daily Affirmations",
    tags: "prayer, service, devotion",
    challengeAddressed: "Seeing business as unspiritual",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Sacred view of business",
    keywords: "prayer service devotion business",
    description: "Business as spiritual practice"
  },
  {
    title: "I trust the process even when I can't see the outcome",
    category: "Daily Affirmations",
    tags: "trust, process, faith",
    challengeAddressed: "Need for control",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Surrender and trust",
    keywords: "trust process faith outcome",
    description: "Trust in the journey"
  },
  {
    title: "My heart-centered approach attracts abundance",
    category: "Daily Affirmations",
    tags: "heart-centered, abundance, attraction",
    challengeAddressed: "Scarcity mindset",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Abundance mindset",
    keywords: "heart-centered abundance attraction",
    description: "Heart-centered abundance"
  },
  {
    title: "I speak my truth with love and compassion",
    category: "Daily Affirmations",
    tags: "truth, love, compassion",
    challengeAddressed: "Fear of speaking up",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Authentic communication",
    keywords: "truth love compassion speak",
    description: "Authentic expression"
  },
  {
    title: "My business serves the highest good of all",
    category: "Daily Affirmations",
    tags: "service, highest good, purpose",
    challengeAddressed: "Selfish motivations",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Service orientation",
    keywords: "service highest good purpose",
    description: "Service-centered business"
  },
  {
    title: "I release the need to be perfect and embrace my humanity",
    category: "Daily Affirmations",
    tags: "perfectionism, humanity, acceptance",
    challengeAddressed: "Perfectionism",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Self-acceptance",
    keywords: "perfectionism humanity acceptance",
    description: "Embracing imperfection"
  },
  {
    title: "My business grows in alignment with my values",
    category: "Daily Affirmations",
    tags: "alignment, values, growth",
    challengeAddressed: "Compromising values",
    businessStage: "Scaling",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Value-aligned growth",
    keywords: "alignment values growth",
    description: "Values-based business"
  },
  {
    title: "I am worthy of success and abundance",
    category: "Daily Affirmations",
    tags: "worthiness, success, abundance",
    challengeAddressed: "Unworthiness",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Self-worth",
    keywords: "worthiness success abundance",
    description: "Core worthiness affirmation"
  },
  {
    title: "My sensitivity is a gift that serves my clients",
    category: "Daily Affirmations",
    tags: "sensitivity, gift, service",
    challengeAddressed: "Seeing sensitivity as weakness",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Strength in sensitivity",
    keywords: "sensitivity gift service",
    description: "Sensitivity as strength"
  },
  {
    title: "I create boundaries that honor my energy",
    category: "Daily Affirmations",
    tags: "boundaries, energy, honor",
    challengeAddressed: "Poor boundaries",
    businessStage: "All stages",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Healthy boundaries",
    keywords: "boundaries energy honor",
    description: "Energy management"
  },
  {
    title: "My business reflects my soul's deepest calling",
    category: "Daily Affirmations",
    tags: "soul calling, reflection, purpose",
    challengeAddressed: "Misalignment",
    businessStage: "Starting out",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Soul alignment",
    keywords: "soul calling reflection purpose",
    description: "Soul purpose in business"
  },
  {
    title: "I trust divine timing in my business expansion",
    category: "Daily Affirmations",
    tags: "divine timing, expansion, trust",
    challengeAddressed: "Impatience with growth",
    businessStage: "Scaling",
    resourceType: "Affirmation",
    timeInvestment: "2 min",
    difficultyLevel: "Beginner",
    prerequisites: "None",
    expectedOutcome: "Patient expansion",
    keywords: "divine timing expansion trust",
    description: "Trusting growth timing"
  }
];

export default function SpiritualAffirmationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    businessStage: '',
    challengeAddressed: '',
    expectedOutcome: ''
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedAffirmation, setSelectedAffirmation] = useState<Affirmation | null>(null);
  const [viewerCount] = useState(47);

  // CSS animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-dot {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const filteredAffirmations = useMemo(() => {
    return affirmations.filter((affirmation) => {
      const matchesSearch = searchTerm === '' || 
        affirmation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affirmation.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affirmation.challengeAddressed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affirmation.keywords.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affirmation.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStage = !selectedFilters.businessStage || affirmation.businessStage === selectedFilters.businessStage;
      const matchesChallenge = !selectedFilters.challengeAddressed || affirmation.challengeAddressed === selectedFilters.challengeAddressed;
      const matchesOutcome = !selectedFilters.expectedOutcome || affirmation.expectedOutcome === selectedFilters.expectedOutcome;

      return matchesSearch && matchesStage && matchesChallenge && matchesOutcome;
    });
  }, [searchTerm, selectedFilters]);

  const uniqueBusinessStages = [...new Set(affirmations.map(a => a.businessStage))];
  const uniqueChallenges = [...new Set(affirmations.map(a => a.challengeAddressed))];
  const uniqueOutcomes = [...new Set(affirmations.map(a => a.expectedOutcome))];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="flex justify-center items-start min-h-screen p-4">
        <div className="bg-gray-900 border border-purple-500/30 rounded-xl md:rounded-2xl max-w-6xl w-full shadow-2xl shadow-purple-500/10">
          
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 md:p-6 rounded-t-xl md:rounded-t-2xl flex items-start justify-between z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-purple-500" />
                <h1 className="text-xl md:text-2xl font-bold text-white">365 Daily Spiritual Business Affirmations</h1>
              </div>
              <p className="text-purple-400 text-sm">Soul-aligned affirmations for spiritual entrepreneurs</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/80 rounded-lg border border-gray-700">
                <PulsingDot />
                <Eye className="w-4 h-4 text-gray-400" />
                <ViewerCount count={viewerCount} />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-4 md:p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search affirmations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
              <motion.button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>
            </div>

            {/* Filters Panel */}
            {isFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Business Stage</label>
                    <select
                      value={selectedFilters.businessStage}
                      onChange={(e) => setSelectedFilters({...selectedFilters, businessStage: e.target.value})}
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
                    >
                      <option value="">All Stages</option>
                      {uniqueBusinessStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Challenge</label>
                    <select
                      value={selectedFilters.challengeAddressed}
                      onChange={(e) => setSelectedFilters({...selectedFilters, challengeAddressed: e.target.value})}
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
                    >
                      <option value="">All Challenges</option>
                      {uniqueChallenges.map(challenge => (
                        <option key={challenge} value={challenge}>{challenge}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Expected Outcome</label>
                    <select
                      value={selectedFilters.expectedOutcome}
                      onChange={(e) => setSelectedFilters({...selectedFilters, expectedOutcome: e.target.value})}
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
                    >
                      <option value="">All Outcomes</option>
                      {uniqueOutcomes.map(outcome => (
                        <option key={outcome} value={outcome}>{outcome}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results */}
          <div className="px-4 md:px-6 pb-2">
            <p className="text-sm text-gray-400">
              Showing {filteredAffirmations.length} of {affirmations.length} affirmations
            </p>
          </div>

          {/* Affirmations List */}
          <div className="p-4 md:p-6 pt-2">
            <div className="space-y-3">
              {filteredAffirmations.map((affirmation, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedAffirmation(affirmation)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-2 leading-relaxed">
                        "{affirmation.title}"
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{affirmation.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-purple-400 font-medium">{affirmation.timeInvestment}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-gray-400 mb-1">Stage</div>
                      <div className="text-white">{affirmation.businessStage}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-gray-400 mb-1">Challenge</div>
                      <div className="text-white">{affirmation.challengeAddressed}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-gray-400 mb-1">Outcome</div>
                      <div className="text-white">{affirmation.expectedOutcome}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-gray-400 mb-1">Level</div>
                      <div className="text-white">{affirmation.difficultyLevel}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredAffirmations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-2">No affirmations found</div>
                <div className="text-gray-600 text-sm">Try adjusting your search or filters</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Affirmation Detail Modal */}
      {selectedAffirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-purple-500/50 rounded-2xl max-w-2xl w-full p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white pr-4">Affirmation Details</h2>
              <button
                onClick={() => setSelectedAffirmation(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-purple-300 font-medium mb-2">Affirmation</h3>
                <p className="text-white text-lg leading-relaxed">"{selectedAffirmation.title}"</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Challenge Addressed</div>
                    <div className="text-white">{selectedAffirmation.challengeAddressed}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Business Stage</div>
                    <div className="text-white">{selectedAffirmation.businessStage}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Time Investment</div>
                    <div className="text-white">{selectedAffirmation.timeInvestment}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Expected Outcome</div>
                    <div className="text-white">{selectedAffirmation.expectedOutcome}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Prerequisites</div>
                    <div className="text-white">{selectedAffirmation.prerequisites}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedAffirmation.tags.split(', ').map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs text-purple-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}