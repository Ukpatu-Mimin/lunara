import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Calendar, MapPin, Sparkles, X, Heart, Star, Camera, Info, ShoppingBag } from 'lucide-react';
import { RoomDecorPackage, CartItem } from '../types';
import { ROOM_DECOR_PACKAGES } from '../data';

interface RoomDecorProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  setActiveTab: (tab: string) => void;
}

export default function RoomDecor({ addToCart, setActiveTab }: RoomDecorProps) {
  const [selectedDecor, setSelectedDecor] = useState<RoomDecorPackage | null>(null);
  const [decorDate, setDecorDate] = useState('');
  const [setupTime, setSetupTime] = useState('13:00');
  const [hotelOrAddress, setHotelOrAddress] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');

  const handleBookDecor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDecor) return;

    if (!decorDate || !hotelOrAddress.trim()) {
      alert('Please fill out the installation date and venue address.');
      return;
    }

    addToCart({
      id: `dec-${Date.now()}`,
      type: 'decor',
      name: `${selectedDecor.name} Room Installation`,
      price: selectedDecor.price,
      image: selectedDecor.images[0],
      details: `Setup Date: ${decorDate} at ${setupTime}. Venue: ${hotelOrAddress}. Note: ${customInstructions || 'None'}`
    });

    alert(`Successfully scheduled room decoration for "${selectedDecor.name}"! Proceed to your checkout cart to finalize setup schedules.`);
    setSelectedDecor(null);
    setDecorDate('');
    setHotelOrAddress('');
    setCustomInstructions('');
  };

  return (
    <div id="lunara-room-decor" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 font-mono">Immersive Transformations</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">Room Decor Booking</h1>
          </div>
          <p className="text-stone-500 text-sm mt-2 md:mt-0 max-w-sm">
            Turn any ordinary hotel room or residential suite into a magical, fairy-tale landscape with red carpet rose petals, marquee letters, and balloon arches.
          </p>
        </div>

        {/* Decor Catalog Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ROOM_DECOR_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="h-64 relative overflow-hidden group">
                  <img
                    src={pkg.images[0]}
                    alt={pkg.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-stone-950/85 rounded-full text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> {pkg.category.toUpperCase()} SETUP
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-medium text-stone-900">{pkg.name}</h3>
                  <p className="text-stone-500 text-xs mt-2 leading-relaxed font-light">
                    {pkg.description}
                  </p>

                  {/* Included list items */}
                  <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                    <span className="block text-[10px] uppercase text-stone-400 font-bold tracking-wider">Package Inclusions:</span>
                    {pkg.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                        <Check className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Booking Trigger */}
              <div className="p-6 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-bold tracking-wider">Estimated Setup Surcharge</span>
                  <span className="font-mono text-base font-bold text-stone-900">₦{pkg.price.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setSelectedDecor(pkg)}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-xs font-semibold text-white rounded-full transition-all duration-300 shadow"
                >
                  Schedule Setup
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Installation Booking Form Modal */}
        {selectedDecor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedDecor(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[10px] bg-amber-500/10 text-amber-800 font-bold px-3 py-1 rounded-full uppercase">
                  Schedule Setup Installation
                </span>
                <h3 className="font-serif text-xl font-light text-stone-900 mt-2">{selectedDecor.name}</h3>
                <p className="text-xs text-stone-400 mt-1">Book professional decorators to transform your private space.</p>
              </div>

              <form onSubmit={handleBookDecor} className="space-y-4">
                
                {/* Installation Date */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Setup Installation Date</label>
                  <input
                    type="date"
                    required
                    value={decorDate}
                    onChange={(e) => setDecorDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                  />
                </div>

                {/* Installation hour and address */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">Decorator Access Time</label>
                    <select
                      value={setupTime}
                      onChange={(e) => setSetupTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                    >
                      <option value="10:00">10:00 AM</option>
                      <option value="13:00">01:00 PM (Recommended)</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">Metro Location Region</label>
                    <select className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none">
                      <option value="ph-gra">Port Harcourt GRA Metro Areas</option>
                      <option value="ph-peter-odili">Port Harcourt (Peter Odili / Trans Amadi)</option>
                      <option value="nationwide">Nationwide Courier Shipping (Selected dry items only)</option>
                    </select>
                  </div>
                </div>

                {/* Address Input */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">Specific Installation Venue Address (e.g. Hotel Presidential room 405)</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter hotel name & suite number, or residential street address"
                    value={hotelOrAddress}
                    onChange={(e) => setHotelOrAddress(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                  />
                </div>

                {/* Custom Notes */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">Custom Setup Requests (e.g. 'write Happy Birthday Sarah' or 'balloon color codes')</label>
                  <textarea
                    rows={2}
                    placeholder="E.g. Theme preference, favorite flower color, specific neon signage name..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                  />
                </div>

                {/* Surcharge reminder block */}
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-start gap-2 text-[10px] text-stone-500 leading-relaxed">
                  <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Our setup team will require access to the room for at least 2 full hours. If booking inside a hotel suite, please coordinate with the hotel desk ahead of time.
                  </span>
                </div>

                {/* Grand Pricing & Submit */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-bold">Lumpsum Installation Cost</span>
                    <span className="font-mono text-xl font-bold text-stone-900">₦{selectedDecor.price.toLocaleString()}</span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-full transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Book Setup
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
