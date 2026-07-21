import { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Check, Sparkles, Box, Sliders, Info, ShoppingBag, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';

interface CurateBoxProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  setActiveTab: (tab: string) => void;
}

export default function CurateBox({ addToCart, setActiveTab }: CurateBoxProps) {
  const [step, setStep] = useState(1);
  const [boxSize, setBoxSize] = useState<'mini' | 'standard' | 'premium' | 'luxury'>('standard');
  const [theme, setTheme] = useState<'romantic' | 'birthday' | 'friendship' | 'self-care' | 'luxury' | 'corporate'>('romantic');
  const [selectedItems, setSelectedItems] = useState<string[]>(['chocolate', 'notes']);

  // AI Greeting Card states
  const [customCardMessage, setCustomCardMessage] = useState('');
  const [cardRecipient, setCardRecipient] = useState('');
  const [cardOccasion, setCardOccasion] = useState('Birthday Celebration');
  const [cardTone, setCardTone] = useState('heartfelt');
  const [aiCardLoading, setAiCardLoading] = useState(false);
  const [aiCardDrafts, setAiCardDrafts] = useState<string[]>([]);
  const [showAiCardWriter, setShowAiCardWriter] = useState(false);

  const sizes = [
    { id: 'mini', label: 'Mini Box', price: 15000, desc: 'Compact & sweet. Holds up to 3 small items.', sizeStr: 'Petite Reserve Volume' },
    { id: 'standard', label: 'Standard Box', price: 25000, desc: 'Our most popular choice. Holds up to 5 items.', sizeStr: 'Classic Luxe Volume' },
    { id: 'premium', label: 'Premium Box', price: 40000, desc: 'Grand scale luxury. Holds up to 8 items.', sizeStr: 'Grand Royal Volume' },
    { id: 'luxury', label: 'Diamond Box', price: 60000, desc: 'Bespoke hand-carved mahogany. Holds unlimited items.', sizeStr: 'Infinite Diamond Reserve' }
  ];

  const themes = [
    { id: 'romantic', label: 'Romantic Velvet', desc: 'Scented rose petals, deep red velvet lining, satin ribbons.', color: 'bg-red-500' },
    { id: 'birthday', label: 'Birthday Celebration', desc: 'Golden confetti, party sparkler, custom birthday topper.', color: 'bg-amber-400' },
    { id: 'friendship', label: 'Friendship Warmth', desc: 'Craft-paper weave, yellow florals, warm polaroid holder.', color: 'bg-yellow-400' },
    { id: 'self-care', label: 'Serene Self-Care', desc: 'Eucalyptus leaves, relaxing white sand base, linen ribbons.', color: 'bg-teal-400' },
    { id: 'luxury', label: 'Royal Gold Luxury', desc: 'Metallic gold shredded fill, luxury leather cord, gold seal.', color: 'bg-amber-600' },
    { id: 'corporate', label: 'Corporate Noir', desc: 'Minimalist carbon-black shredding, silver metallic seal.', color: 'bg-stone-800' }
  ];

  const itemsList = [
    { id: 'perfume', label: 'French Cologne Mist', price: 35000, icon: '🧴', desc: 'Bespoke woody amber fragrance.' },
    { id: 'flowers', label: 'Preserved Red Rose', price: 18000, icon: '🌹', desc: 'Organic rose that lasts 3 years.' },
    { id: 'chocolate', label: 'Artisanal Truffles', price: 12000, icon: '🍫', desc: 'Bespoke box of 8 hand-painted truffles.' },
    { id: 'notes', label: 'Calligraphy Parchment Note', price: 3000, icon: '✉️', desc: 'Handwritten message sealed in wax.' },
    { id: 'candles', label: 'Luxury Soy Scented Candle', price: 8000, icon: '🕯️', desc: 'Relaxing amber and sandalwood scent.' },
    { id: 'plushies', label: 'Velvet Soft Teddy Bear', price: 10000, icon: '🧸', desc: 'Hypoallergenic silk plush.' }
  ];

  const currentSizeObj = sizes.find(s => s.id === boxSize)!;
  const currentThemeObj = themes.find(t => t.id === theme)!;

  // Calculate live pricing
  const boxCost = currentSizeObj.price;
  const itemsCost = selectedItems.reduce((acc, itemId) => {
    const item = itemsList.find(i => i.id === itemId);
    return acc + (item ? item.price : 0);
  }, 0);
  const totalCost = boxCost + itemsCost;

  const toggleItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleCuratedAddToCart = () => {
    const itemNames = selectedItems.map(id => itemsList.find(i => i.id === id)?.label || id).join(', ');
    addToCart({
      id: `box-${Date.now()}`,
      type: 'curated_box',
      name: `Custom ${currentSizeObj.label} (${currentThemeObj.label} Theme)`,
      price: totalCost,
      image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400',
      details: `Theme: ${currentThemeObj.label}. Size: ${currentSizeObj.sizeStr}. Packed items: ${itemNames || 'None'}${customCardMessage ? ' | Card Message: "' + customCardMessage + '"' : ''}`
    });
    // Redirect to home or show alert
    alert('Your beautiful bespoke gift box has been added to the cart! Proceed to checkout to finalize your magical surprise.');
    setActiveTab('home');
  };

  const handleGenerateAiCard = async () => {
    if (!cardRecipient.trim()) {
      alert('Please enter a recipient name first to personalize your message.');
      return;
    }
    setAiCardLoading(true);
    setAiCardDrafts([]);
    try {
      const response = await fetch('/api/generate-card-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: cardRecipient,
          occasion: cardOccasion,
          tone: cardTone
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAiCardDrafts(data.messages || []);
      } else {
        throw new Error('Failed to generate card');
      }
    } catch (err) {
      console.error(err);
      setAiCardDrafts([
        `Dearest ${cardRecipient}, you make every single day a beautiful adventure. Happy ${cardOccasion}!`,
        `Wishing the absolute sweetest ${cardOccasion} to the one who holds my heart forever.`
      ]);
    } finally {
      setAiCardLoading(false);
    }
  };

  return (
    <div id="lunara-curate-box" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 font-mono">Bespoke Workshop</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">Curate A Bespoke Gift Box</h1>
          <p className="text-stone-500 mt-3 text-sm">
            Hand-curate an exceptionally premium, customized gift box block-by-block. Choose a custom box casing size, apply an aesthetic interior theme, pack luxury items, and view live calculations.
          </p>
        </div>

        {/* Wizard Steps indicator */}
        <div className="flex justify-center mb-10 max-w-lg mx-auto">
          {[
            { step: 1, label: 'Casing Size' },
            { step: 2, label: 'Interior Theme' },
            { step: 3, label: 'Add Luxury Items' },
            { step: 4, label: 'Final Review' }
          ].map((s) => (
            <div key={s.step} className="flex-1 flex items-center relative">
              <div className="flex flex-col items-center mx-auto z-10">
                <button
                  onClick={() => s.step < step && setStep(s.step)}
                  className={`h-8 w-8 rounded-full text-xs font-bold flex items-center justify-center border-2 transition-all duration-300 ${
                    step >= s.step
                      ? 'bg-stone-900 border-stone-900 text-amber-400'
                      : 'bg-stone-100 border-stone-300 text-stone-400'
                  }`}
                >
                  {step > s.step ? <Check className="h-4 w-4" /> : s.step}
                </button>
                <span className="text-[10px] text-stone-500 font-medium mt-1">{s.label}</span>
              </div>
              {s.step < 4 && (
                <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 ${step > s.step ? 'bg-stone-900' : 'bg-stone-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Work Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Options Side */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm min-h-[400px]">
            
            {/* Step 1: Box Size */}
            {step === 1 && (
              <div>
                <h3 className="font-serif text-xl font-light text-stone-900 mb-2 flex items-center gap-1.5">
                  <Box className="h-5 w-5 text-amber-600" /> Choose Casing Size
                </h3>
                <p className="text-stone-400 text-xs mb-6">Select the perfect container volume capacity for your luxury gifting setup.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sizes.map((sz) => (
                    <div
                      key={sz.id}
                      onClick={() => setBoxSize(sz.id as any)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        boxSize === sz.id
                          ? 'border-amber-500 bg-amber-50/20 shadow-md'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-lg font-medium text-stone-900">{sz.label}</h4>
                          {boxSize === sz.id && <span className="p-1 rounded-full bg-amber-500 text-stone-950"><Check className="h-3.5 w-3.5" /></span>}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono block mt-1">Volume Capacity: {sz.sizeStr}</span>
                        <p className="text-stone-500 text-xs mt-3 leading-relaxed">{sz.desc}</p>
                      </div>
                      <div className="mt-6 pt-3 border-t border-stone-100 flex justify-between items-center">
                        <span className="text-stone-400 text-[10px] font-semibold">Casing Cost</span>
                        <span className="font-mono text-sm font-bold text-stone-950">₦{sz.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Interior Theme */}
            {step === 2 && (
              <div>
                <h3 className="font-serif text-xl font-light text-stone-900 mb-2 flex items-center gap-1.5">
                  <Sliders className="h-5 w-5 text-amber-600" /> Apply Interior Theme
                </h3>
                <p className="text-stone-400 text-xs mb-6">Decorate the interior padding, color wrap, and ribbon accents.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {themes.map((th) => (
                    <div
                      key={th.id}
                      onClick={() => setTheme(th.id as any)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex gap-4 ${
                        theme === th.id
                          ? 'border-amber-500 bg-amber-50/20 shadow-md'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className={`h-12 w-3 rounded-full shrink-0 ${th.color}`} />
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-base font-semibold text-stone-900">{th.label}</h4>
                          {theme === th.id && <span className="p-0.5 rounded-full bg-amber-500 text-stone-950"><Check className="h-3 w-3" /></span>}
                        </div>
                        <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">{th.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Add Items */}
            {step === 3 && (
              <div>
                <h3 className="font-serif text-xl font-light text-stone-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-amber-600" /> Pack Luxury Items
                </h3>
                <p className="text-stone-400 text-xs mb-6">Select premium add-on contents to be beautifully packed inside your themed box.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {itemsList.map((item) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/10'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="text-xs font-semibold text-stone-900">{item.label}</h4>
                            <p className="text-[10px] text-stone-400">{item.desc}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block font-mono text-xs font-bold text-stone-900">₦{item.price.toLocaleString()}</span>
                          <span className={`inline-block text-[9px] px-2 py-0.5 mt-1 rounded-full ${isSelected ? 'bg-amber-500/10 text-amber-700' : 'bg-stone-100 text-stone-500'}`}>
                            {isSelected ? 'Selected' : 'Add Item'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Final Review */}
            {step === 4 && (
              <div className="text-center py-6 max-w-lg mx-auto">
                <div className="h-16 w-16 bg-amber-500/10 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-light text-stone-900">Your Curation is Complete!</h3>
                <p className="text-stone-400 text-xs mt-1">Review your setup below, then add this masterpiece to your cart.</p>

                <div className="bg-stone-50 border border-stone-200 p-6 rounded-2xl text-left space-y-4 mt-8">
                  <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                    <span className="text-xs text-stone-500">Curation Volume Casing:</span>
                    <span className="text-xs font-semibold text-stone-900">{currentSizeObj.label} &mdash; {currentSizeObj.sizeStr}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                    <span className="text-xs text-stone-500">Decor Theme Layout:</span>
                    <span className="text-xs font-semibold text-stone-900">{currentThemeObj.label} Theme</span>
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block mb-2">Packed Contents:</span>
                    {selectedItems.length === 0 ? (
                      <span className="text-xs italic text-stone-400">No items packed. (Box is empty)</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedItems.map(itemId => {
                          const item = itemsList.find(i => i.id === itemId);
                          return (
                            <span key={itemId} className="text-[10px] font-semibold bg-white border border-stone-200 text-stone-800 px-2.5 py-1 rounded-full">
                              {item?.icon} {item?.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* AI-Powered Gifting Calligraphy Card */}
                <div className="mt-8 border-t border-stone-200/60 pt-6 text-left space-y-4">
                  <h4 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-1.5">
                    ✉️ Calligraphy Parchment Card (Optional)
                  </h4>
                  <p className="text-stone-400 text-xs">
                    We will write this note in custom gold-ink calligraphy and seal it in wax inside the gift box.
                  </p>
                  <textarea
                    rows={3}
                    placeholder="E.g. Dearest Sarah, happy birthday! You deserve all the stars..."
                    value={customCardMessage}
                    onChange={(e) => setCustomCardMessage(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                  />

                  {/* AI trigger block */}
                  <div className="bg-gradient-to-br from-amber-500/5 to-stone-50 border border-amber-500/10 rounded-2xl p-4">
                    <button
                      type="button"
                      onClick={() => setShowAiCardWriter(!showAiCardWriter)}
                      className="flex items-center justify-between w-full text-xs font-bold text-amber-850 hover:text-amber-900"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                        {showAiCardWriter ? "Hide AI Card Assistant" : "Draft Exquisite Message with Lunara AI"}
                      </span>
                      <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 rounded-full uppercase">AI Provider</span>
                    </button>

                    {showAiCardWriter && (
                      <div className="mt-4 pt-4 border-t border-amber-500/15 space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-semibold text-stone-600 uppercase mb-1">Recipient Name</label>
                            <input
                              type="text"
                              placeholder="e.g. Sarah"
                              value={cardRecipient}
                              onChange={(e) => setCardRecipient(e.target.value)}
                              className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-stone-200 bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-stone-600 uppercase mb-1">Occasion</label>
                            <select
                              value={cardOccasion}
                              onChange={(e) => setCardOccasion(e.target.value)}
                              className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-stone-200 bg-white"
                            >
                              <option value="Birthday Celebration">Birthday</option>
                              <option value="Romantic Anniversary">Anniversary</option>
                              <option value="Apology & Reconciliation">Apology</option>
                              <option value="Job Promotion or Graduation">Success/Congrats</option>
                              <option value="Just Because Surprise">Just Because</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-stone-600 uppercase mb-1">Aesthetic Tone</label>
                            <select
                              value={cardTone}
                              onChange={(e) => setCardTone(e.target.value)}
                              className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-stone-200 bg-white"
                            >
                              <option value="romantic">Passionate & Romantic</option>
                              <option value="witty">Playful & Witty</option>
                              <option value="poetic">Poetic & Deep</option>
                              <option value="apologetic">Soft & Apologetic</option>
                              <option value="heartfelt">Warm & Heartfelt</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleGenerateAiCard}
                          disabled={aiCardLoading}
                          className="w-full py-2 bg-stone-900 hover:bg-stone-850 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5"
                        >
                          {aiCardLoading ? (
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                          )}
                          <span>Draft Calligraphy Suggestions</span>
                        </button>

                        {/* Generated Drafts */}
                        {aiCardDrafts.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <span className="text-[10px] font-mono font-bold text-amber-800 uppercase block">AI Draft Recommendations:</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {aiCardDrafts.map((draft, i) => (
                                <div
                                  key={i}
                                  onClick={() => {
                                    setCustomCardMessage(draft);
                                    alert('Draft applied to your calligraphy note!');
                                  }}
                                  className="p-3 bg-white border border-amber-500/20 hover:border-amber-500 rounded-xl cursor-pointer transition-all hover:shadow-sm"
                                >
                                  <p className="font-serif italic text-[11px] text-stone-800 leading-relaxed">
                                    "{draft}"
                                  </p>
                                  <span className="text-[9px] text-amber-600 font-bold mt-2 block text-right">Click to Apply &rarr;</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-stone-100">
              <button
                onClick={() => step > 1 && setStep(step - 1)}
                disabled={step === 1}
                className="px-5 py-2.5 rounded-full text-xs font-semibold border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                Back
              </button>

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-stone-950 text-white hover:bg-amber-500 hover:text-stone-950 transition-all duration-300"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleCuratedAddToCart}
                  className="px-6 py-3 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-stone-950 transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add Box To Cart
                </button>
              )}
            </div>

          </div>

          {/* Pricing Preview Summary Side Card */}
          <div className="lg:col-span-4 bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 shadow-xl space-y-6">
            <h3 className="font-serif text-lg font-light border-b border-stone-800 pb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" /> Curation Summary
            </h3>

            {/* Live Pricing Section */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Box Casing ({currentSizeObj.label})</span>
                <span className="font-mono">₦{currentSizeObj.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Theme Decor ({currentThemeObj.label})</span>
                <span className="font-mono text-emerald-400">Included</span>
              </div>
              
              {/* Packed Items summation list */}
              {selectedItems.length > 0 && (
                <div className="pt-2 border-t border-stone-800 space-y-2">
                  <span className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">Packed Contents ({selectedItems.length})</span>
                  {selectedItems.map(itemId => {
                    const item = itemsList.find(i => i.id === itemId);
                    if (!item) return null;
                    return (
                      <div key={itemId} className="flex justify-between text-stone-300">
                        <span>{item.icon} {item.label}</span>
                        <span className="font-mono">₦{item.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Grand Total Cost */}
            <div className="pt-4 border-t border-stone-800">
              <div className="flex justify-between items-end">
                <div>
                  <span className="block text-[10px] uppercase text-stone-400 font-semibold">Live Calculated Total</span>
                  <span className="text-xl font-serif font-semibold text-amber-400 mt-1">₦{totalCost.toLocaleString()}</span>
                </div>
                <div className="text-right text-[10px] text-stone-400 flex items-center gap-1">
                  <Info className="h-3 w-3 text-amber-500" /> Includes luxury tags
                </div>
              </div>
            </div>

            {/* Visual Box State Preview */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80">
              <span className="text-[10px] uppercase text-stone-500 font-bold tracking-wider block mb-2">Virtual Layout Blueprint</span>
              <div className="h-28 rounded-lg bg-stone-900 border border-stone-800 relative flex items-center justify-center overflow-hidden">
                {/* Simulated Box Visualizer */}
                <div className="h-16 w-24 bg-amber-900/10 border-2 border-amber-600/30 rounded-md flex flex-col justify-center items-center relative animate-pulse">
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent`} />
                  <span className="text-[9px] text-amber-400 font-mono text-center font-bold">LUNARA</span>
                  <span className="text-[7px] text-stone-500 text-center uppercase">{boxSize} size</span>
                </div>
                <div className="absolute bottom-2 right-2 text-[9px] text-stone-500 font-mono">
                  Theme: {theme}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
