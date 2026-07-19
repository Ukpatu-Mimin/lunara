import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, BrainCircuit, Heart, Sliders, Box, Camera, Compass, RefreshCw, ShoppingBag, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface AiGiftMatcherProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  setActiveTab: (tab: string) => void;
}

interface MatchResult {
  giftStrategy: string;
  recommendedProducts: { name: string; reason: string }[];
  recommendedExperiences: { name: string; reason: string }[];
  recommendedGiftBox: {
    size: 'mini' | 'standard' | 'premium' | 'luxury';
    theme: 'romantic' | 'birthday' | 'friendship' | 'self-care' | 'luxury' | 'corporate';
    items: string[];
    estimatedPrice: number;
  };
  recommendedDecor: {
    name: string;
    reason: string;
  };
}

export default function AiGiftMatcher({ addToCart, setActiveTab }: AiGiftMatcherProps) {
  // Form states
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('female');
  const [interests, setInterests] = useState('');
  const [personality, setPersonality] = useState('elegant');
  const [loveLanguage, setLoveLanguage] = useState('Receiving Gifts');
  const [budget, setBudget] = useState(150000);

  // Status states
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Pondering personality matches...');
  const [result, setResult] = useState<MatchResult | null>(null);

  const personalities = [
    { id: 'elegant', label: 'Elegant & Classic' },
    { id: 'introverted', label: 'Cozy & Home-loving' },
    { id: 'adventurous', label: 'Spontaneous & Outdoorsy' },
    { id: 'creative', label: 'Artistic & Expressive' },
    { id: 'corporate', label: 'Structured & Ambitious' }
  ];

  const loveLanguages = [
    'Receiving Gifts',
    'Acts of Service',
    'Words of Affirmation',
    'Quality Time',
    'Physical Touch'
  ];

  const triggerLoaderMessages = () => {
    const messages = [
      'Analyzing love languages...',
      'Mapping out luxury decor themes...',
      'Matching artisanal chocolate blends...',
      'Curating sensory fragrance notes...',
      'Finalizing your unforgettable strategy...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLoadingMessage(messages[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return interval;
  };

  const handleFetchMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setLoadingMessage('Consulting Lunara’s AI Matching Brain...');

    const interval = triggerLoaderMessages();

    try {
      const response = await fetch('/api/gift-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age,
          gender,
          interests,
          personality,
          loveLanguage,
          budget
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendation from server');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      alert('An error occurred while generating recommendations. Running backup simulation.');
      // Fallback
      setResult({
        giftStrategy: `Based on their love language (${loveLanguage}) and personality, we recommend prioritizing custom experiences and sensory gifts.`,
        recommendedProducts: [
          { name: "Maison Noire - Ambre Nuit", reason: "Perfect match for a premium fragrance lover seeking high-end personality matches." },
          { name: "La Vie en Rose - Eternal Bouquet", reason: "An elegant floral arrangement conveying long-term thoughtfulness." }
        ],
        recommendedExperiences: [
          { name: "Couples Sanctuary Spa Ritual", reason: "An excellent way to fulfill their love language through dedicated time together." }
        ],
        recommendedGiftBox: {
          size: "premium",
          theme: "romantic",
          items: ["perfume", "flowers", "chocolate"],
          estimatedPrice: 158500
        },
        recommendedDecor: {
          name: "Enchanted Rose Canopy",
          reason: "Bespoke setup designed to create an immersive, stunning visual impact."
        }
      });
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div id="lunara-ai-matcher" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <BrainCircuit className="h-10 w-10 text-amber-500 mx-auto animate-bounce" />
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-2">AI Gift Matcher</h1>
          <p className="text-stone-500 mt-3 text-sm leading-relaxed">
            Harness Google Gemini’s reasoning models to design bespoke surprise strategies. Answer a few lifestyle details about your recipient, and receive immediate tailored recommendations.
          </p>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="bg-stone-900 text-white rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xl border border-stone-800 my-10">
            <RefreshCw className="h-10 w-10 text-amber-500 mx-auto animate-spin mb-4" />
            <h3 className="font-serif text-xl font-light text-stone-100">Consulting Google Gemini</h3>
            <p className="text-amber-400 text-xs mt-2 font-semibold font-mono animate-pulse">{loadingMessage}</p>
          </div>
        )}

        {/* Questionnaire Form */}
        {!loading && !result && (
          <form onSubmit={handleFetchMatch} className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm max-w-3xl mx-auto space-y-6">
            <h2 className="font-serif text-xl font-medium text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-amber-500" /> Recipient Questionnaire
            </h2>

            {/* Demographics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Age of Recipient ({age} yrs)</label>
                <input
                  type="range"
                  min="16"
                  max="70"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>16 yrs</span>
                  <span>70 yrs</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Gender Identity</label>
                <div className="flex gap-2">
                  {['female', 'male', 'unspecified'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        gender === g
                          ? 'bg-stone-900 border-stone-900 text-amber-400'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      {g.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Personality Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Recipient Personality Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {personalities.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPersonality(p.id)}
                    className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                      personality === p.id
                        ? 'bg-amber-500 border-amber-500 text-stone-950 font-bold'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Love Language and Budget Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Primary Love Language</label>
                <select
                  value={loveLanguage}
                  onChange={(e) => setLoveLanguage(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-amber-500"
                >
                  {loveLanguages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Target Budget (₦{budget.toLocaleString()})</label>
                <input
                  type="range"
                  min="20000"
                  max="1000000"
                  step="20000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                  <span>₦20,000</span>
                  <span>₦1,000,000+</span>
                </div>
              </div>
            </div>

            {/* Interests free form */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Specific Interests or Hobbies (e.g. loves vanilla perfumes, flowers, photography, cakes)</label>
              <textarea
                rows={3}
                required
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Share any specific details like favorite color pink, loves candles, is celebrating a sign-out, or enjoys wellness spas..."
                className="w-full px-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              Generate Surprise Strategy
            </button>
          </form>
        )}

        {/* Recommendation Results Bento Grid */}
        {result && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            {/* Strategy Card */}
            <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 border border-stone-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <BrainCircuit className="h-32 w-32 text-amber-500" />
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full uppercase font-mono font-bold">
                Bespoke Strategy Formulation
              </span>
              <h2 className="font-serif text-2xl font-light text-white mt-3">The Gifting Blueprints</h2>
              <p className="text-stone-300 text-sm mt-3 leading-relaxed font-light">
                {result.giftStrategy}
              </p>
              <div className="mt-6 pt-4 border-t border-stone-800 flex gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block">Recipient Love Language:</span>
                  <span className="text-amber-400 font-semibold">{loveLanguage}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Target Personality Profile:</span>
                  <span className="text-amber-400 font-semibold">{personality}</span>
                </div>
              </div>
            </div>

            {/* Bento items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Recommended Gift Box */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-600">
                    <Box className="h-5 w-5" />
                    <span className="text-xs uppercase font-bold tracking-wider">Perfect Curated Box Setup</span>
                  </div>
                  <h3 className="font-serif text-xl font-light text-stone-900 mt-2">
                    Custom {result.recommendedGiftBox.size.toUpperCase()} box
                  </h3>
                  <span className="text-[10px] text-stone-400 uppercase font-bold">Aesthetic Theme: {result.recommendedGiftBox.theme}</span>
                  
                  <div className="mt-4">
                    <span className="text-xs text-stone-400 block mb-2">Recommended Items to pack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.recommendedGiftBox.items.map((item, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-stone-100 border border-stone-200/50 text-stone-700 px-2.5 py-1 rounded-full">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase">Est. Box Cost</span>
                    <span className="font-mono text-sm font-bold text-stone-950">₦{result.recommendedGiftBox.estimatedPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart({
                        id: `ai-box-${Date.now()}`,
                        type: 'curated_box',
                        name: `AI Curation: ${result.recommendedGiftBox.size.toUpperCase()} Box`,
                        price: result.recommendedGiftBox.estimatedPrice,
                        image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400',
                        details: `AI Recommended: ${result.recommendedGiftBox.theme} Theme. Packed: ${result.recommendedGiftBox.items.join(', ')}`
                      });
                      alert('AI recommended gift box added to cart!');
                    }}
                    className="px-4 py-2 bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 text-xs font-semibold rounded-full transition-all duration-300"
                  >
                    Pack Custom Box
                  </button>
                </div>
              </div>

              {/* Recommended Room Decor Setup */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-600">
                    <Camera className="h-5 w-5" />
                    <span className="text-xs uppercase font-bold tracking-wider">Recommended Room Decor Theme</span>
                  </div>
                  <h3 className="font-serif text-xl font-light text-stone-900 mt-2">
                    {result.recommendedDecor.name}
                  </h3>
                  <p className="text-stone-500 text-xs mt-3 leading-relaxed font-light">
                    {result.recommendedDecor.reason}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400 font-medium">Bespoke Installation setup</span>
                  <button
                    onClick={() => setActiveTab('decor')}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-semibold rounded-full transition-all duration-300"
                  >
                    Book Decor setups
                  </button>
                </div>
              </div>

            </div>

            {/* Recommended Products & Experiences Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product recommendations */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 text-amber-600 mb-4 border-b border-stone-100 pb-3">
                  <Gift className="h-5 w-5" />
                  <span className="text-xs uppercase font-bold tracking-wider">Perfect Product Matches</span>
                </div>
                <div className="space-y-4">
                  {result.recommendedProducts.map((prod, idx) => (
                    <div key={idx} className="bg-stone-50 p-4 rounded-2xl border border-stone-150">
                      <h4 className="text-xs font-bold text-stone-900">{prod.name}</h4>
                      <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">{prod.reason}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('gifts')}
                  className="w-full py-2.5 mt-4 bg-stone-50 border border-stone-200 hover:bg-stone-900 hover:text-white rounded-xl text-xs font-semibold text-stone-700 transition-all"
                >
                  View Gift Marketplace
                </button>
              </div>

              {/* Experiences recommendations */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 text-amber-600 mb-4 border-b border-stone-100 pb-3">
                  <Compass className="h-5 w-5" />
                  <span className="text-xs uppercase font-bold tracking-wider">Surprise Experiences Matches</span>
                </div>
                <div className="space-y-4">
                  {result.recommendedExperiences.map((exp, idx) => (
                    <div key={idx} className="bg-stone-50 p-4 rounded-2xl border border-stone-150">
                      <h4 className="text-xs font-bold text-stone-900">{exp.name}</h4>
                      <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">{exp.reason}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('experiences')}
                  className="w-full py-2.5 mt-4 bg-stone-50 border border-stone-200 hover:bg-stone-900 hover:text-white rounded-xl text-xs font-semibold text-stone-700 transition-all"
                >
                  Explore Experiences Marketplace
                </button>
              </div>
            </div>

            {/* Restart match */}
            <div className="text-center">
              <button
                onClick={() => setResult(null)}
                className="px-6 py-3 border border-stone-200 hover:border-amber-500 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-900 transition-all"
              >
                ← Plan Another Gift Match
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
