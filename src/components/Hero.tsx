import { motion } from 'motion/react';
import { Sparkles, Gift, Camera, Star } from 'lucide-react';

interface HeroProps {
  onStartSurprise: () => void;
  onCurateBox: () => void;
}

export default function Hero({ onStartSurprise, onCurateBox }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-stone-950 text-white py-12 md:py-20 lg:py-28" id="lunara-hero">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 self-center lg:self-start px-3 py-1.5 rounded-full border border-stone-800 bg-stone-900/80 text-amber-400 text-xs font-semibold tracking-wider uppercase"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Lunara Gifting & Surprise Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white"
            >
              Create <span className="font-serif italic text-amber-400">unforgettable</span> moments for the people you love.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light"
            >
              Lunara is proudly Port Harcourt-based, serving as Nigeria’s premier luxury gifting and surprise platform. We deliver bespoke room setups and premium experiences locally in Port Harcourt, alongside express nationwide delivery for our curated luxury gift boxes and select items.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <button
                onClick={onStartSurprise}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Start a Surprise
              </button>
              <button
                onClick={onCurateBox}
                className="px-8 py-4 bg-transparent hover:bg-stone-900 text-stone-200 hover:text-white font-medium border border-stone-700 hover:border-stone-500 rounded-full transition-all duration-300"
              >
                Curate a Gift Box
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-900 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <span className="block font-serif text-2xl font-light text-amber-400">10k+</span>
                <span className="text-xs text-stone-400 font-medium">Surprises Handled</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-light text-amber-400">4.9★</span>
                <span className="text-xs text-stone-400 font-medium">Customer Rating</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-light text-amber-400">250+</span>
                <span className="text-xs text-stone-400 font-medium">Verified Vendors</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visuals Showcase */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="relative h-[480px] w-full max-w-md mx-auto">
              
              {/* Premium Gift Box Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-4 left-6 z-20 w-72 rounded-2xl bg-stone-900 border border-stone-800 p-4 shadow-2xl overflow-hidden"
              >
                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400"
                    alt="Premium Gift Box"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-950/80 text-amber-400 text-[10px] font-bold">
                    <Gift className="h-3 w-3" /> Box Curated
                  </span>
                </div>
                <h4 className="font-serif text-base font-light text-white">The Royal Midnight Box</h4>
                <p className="text-xs text-stone-400 mt-1">Santal Cologne, luxury chocolates, and preserved lilies.</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-stone-800">
                  <span className="text-xs text-amber-400 font-mono">₦158,500</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Room Decor Card */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -3 }}
                animate={{ opacity: 1, x: 0, rotate: 4 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-2 right-4 z-10 w-72 rounded-2xl bg-stone-900 border border-stone-800 p-4 shadow-2xl overflow-hidden"
              >
                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400"
                    alt="Decorated Room Setup"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-950/80 text-amber-400 text-[10px] font-bold">
                    <Camera className="h-3 w-3" /> Setup Live
                  </span>
                </div>
                <h4 className="font-serif text-base font-light text-white">Enchanted Rose Suite</h4>
                <p className="text-xs text-stone-400 mt-1">Tealight pathways, rose petals on satin sheets, custom lighting.</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-stone-800">
                  <span className="text-xs text-amber-400 font-mono">₦95,000</span>
                  <span className="text-[10px] text-stone-400">Professional Setup</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
