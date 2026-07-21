import React, { useState } from 'react';
import { Tag, Truck, Gift, Heart, Copy, Check, Sparkles, X, Sparkle, RefreshCw } from 'lucide-react';

interface DiscountMarqueeProps {
  onNavigate?: (tab: string) => void;
}

export default function DiscountMarquee({ onNavigate }: DiscountMarqueeProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [designStyle, setDesignStyle] = useState<'ribbon' | 'marquee'>('ribbon');

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isVisible) return null;

  const deals = [
    {
      id: 'discount-code',
      icon: Tag,
      text: "SPECIAL LAUNCH DEAL: Use code",
      code: "LUNARA10",
      postText: "for 10% OFF your luxury gift box!",
      tab: 'curate'
    },
    {
      id: 'nationwide',
      icon: Truck,
      text: "NATIONWIDE EXPRESS SHIPPING: Reliable 24-48hr courier delivery across Nigeria for dry luxury gifts & perfumes!",
      tab: 'gifts'
    },
    {
      id: 'ph-local',
      icon: Gift,
      text: "PORT HARCOURT SPECIAL: Free metro delivery & same-day surprise room decor setup!",
      tab: 'decor'
    },
    {
      id: 'ai-matcher',
      icon: Sparkles,
      text: "AI SURPRISE MATCHER: Get instant personalized gift recommendations tailored to love languages!",
      tab: 'matcher'
    },
    {
      id: 'experiences',
      icon: Heart,
      text: "LUXURY EXPERIENCES: Book private yacht dinners & couple spa retreats in Port Harcourt!",
      tab: 'experiences'
    }
  ];

  return (
    <div className="relative z-40 select-none shadow-md" id="lunara-discount-marquee">
      {designStyle === 'ribbon' ? (
        /* Calligraphy Silk Ribbon Design */
        <div className="relative bg-gradient-to-r from-stone-950 via-amber-950/90 to-stone-950 text-amber-200 border-b border-amber-500/40 py-2.5 px-3 sm:px-6 overflow-hidden flex items-center justify-between">
          {/* Subtle Calligraphy Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Left Calligraphic Ornament & Ribbon Tail */}
          <div className="hidden md:flex items-center gap-2 text-amber-400/80 font-serif italic text-xs shrink-0">
            <span className="text-amber-400 font-serif text-lg leading-none">꧁</span>
            <span className="tracking-widest uppercase text-[10px] text-amber-300 font-semibold font-sans">Bespoke Elegance</span>
            <span className="text-amber-400 font-serif text-lg leading-none">꧂</span>
          </div>

          {/* Center Calligraphy Ribbon Main Text */}
          <div className="flex-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center px-2 z-10">
            <span className="font-serif italic text-amber-100 text-xs sm:text-sm md:text-base tracking-wide flex items-center gap-1.5 drop-shadow">
              <Sparkle className="h-3.5 w-3.5 text-amber-400 inline shrink-0 animate-spin-slow" />
              <span className="font-serif italic text-amber-300">Complimentary Nationwide Express Shipping</span>
              <span className="hidden sm:inline font-sans text-stone-400 font-normal">|</span>
              <span className="font-sans font-light text-stone-200 text-xs sm:text-sm">Enjoy 10% Off with code</span>
            </span>

            {/* Calligraphy Voucher Pill */}
            <button
              type="button"
              onClick={(e) => handleCopyCode("LUNARA10", e)}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 px-3 py-0.5 rounded-full font-serif font-bold text-xs tracking-wider shadow-md hover:shadow-amber-500/20 transition-all border border-amber-300 active:scale-95 cursor-pointer"
              title="Click to copy promo code LUNARA10"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-stone-950" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-stone-950" />
              )}
              <span className="font-mono font-black">LUNARA10</span>
            </button>
          </div>

          {/* Right Calligraphy Flourish & Controls */}
          <div className="flex items-center gap-2 shrink-0 z-10">
            {/* Toggle to Ticker marquee */}
            <button
              type="button"
              onClick={() => setDesignStyle('marquee')}
              className="hidden lg:flex items-center gap-1 bg-stone-900/80 hover:bg-stone-800 text-amber-300 text-[10px] font-sans font-medium px-2 py-1 rounded-md border border-amber-500/30 transition-colors"
              title="Switch to Ticker Marquee view"
            >
              <RefreshCw className="h-3 w-3 text-amber-400" />
              <span>Marquee Mode</span>
            </button>

            {/* Dismiss Ribbon Button */}
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="p-1 text-stone-400 hover:text-amber-300 transition-colors rounded-full hover:bg-stone-800"
              title="Dismiss banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Standard Ticker Marquee Design */
        <div 
          className="relative bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-stone-950 font-medium text-xs py-2 px-3 border-b border-amber-500/40 flex items-center overflow-hidden"
        >
          {/* Decorative side glows */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-700 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-12 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-700 to-transparent z-10 pointer-events-none" />

          {/* Ribbon Tag Badge on Left */}
          <div className="hidden sm:flex items-center gap-1.5 bg-stone-950 text-amber-400 font-serif font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md shrink-0 shadow-sm mr-3 z-10 border border-amber-500/30">
            <Tag className="h-3 w-3 text-amber-400 animate-pulse" />
            PROMO DEALS
          </div>

          {/* Infinite scrolling marquee ticker */}
          <div className="flex-1 overflow-hidden group py-0.5">
            <div className="flex animate-marquee whitespace-nowrap gap-10 items-center group-hover:[animation-play-state:paused]">
              {deals.concat(deals).map((deal, idx) => {
                const Icon = deal.icon;
                return (
                  <div 
                    key={`${deal.id}-${idx}`} 
                    onClick={() => deal.tab && onNavigate?.(deal.tab)}
                    className={`flex items-center gap-2 transition-opacity ${deal.tab ? 'cursor-pointer hover:opacity-85' : ''}`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-stone-950" />
                    <span className="font-sans text-[11px] sm:text-xs tracking-tight">
                      {deal.text}
                    </span>
                    {deal.code && (
                      <button
                        type="button"
                        onClick={(e) => handleCopyCode(deal.code, e)}
                        className="inline-flex items-center gap-1 bg-stone-950 hover:bg-stone-900 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold text-[10px] transition-all shadow-sm cursor-pointer border border-amber-500/20 active:scale-95"
                        title="Click to copy promo code"
                      >
                        {copied ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3 text-amber-400" />
                        )}
                        <span>{deal.code}</span>
                      </button>
                    )}
                    {deal.postText && (
                      <span className="font-sans text-[11px] sm:text-xs">
                        {deal.postText}
                      </span>
                    )}
                    <span className="text-amber-900/60 font-bold ml-4">•</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toggle back to Calligraphy Ribbon mode */}
          <button
            type="button"
            onClick={() => setDesignStyle('ribbon')}
            className="hidden lg:flex items-center gap-1 bg-stone-950/80 hover:bg-stone-950 text-amber-300 text-[10px] font-sans font-medium px-2 py-1 rounded-md border border-amber-500/30 transition-colors ml-2 z-20"
            title="Switch to Calligraphy Ribbon view"
          >
            <RefreshCw className="h-3 w-3 text-amber-400" />
            <span>Calligraphy Ribbon</span>
          </button>

          {/* Dismiss Ribbon Button */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="ml-2 p-1 text-stone-950/70 hover:text-stone-950 transition-colors z-20 shrink-0 rounded-full hover:bg-amber-800/20"
            title="Dismiss promo banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Floating Toast Notification when Code is Copied */}
      {copied && (
        <div className="absolute left-1/2 -translate-x-1/2 top-2 bg-stone-950 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xl border border-amber-400/50 flex items-center gap-1.5 z-50 animate-bounce">
          <Check className="h-3.5 w-3.5 text-emerald-400" />
          <span>Code <strong>LUNARA10</strong> copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}

