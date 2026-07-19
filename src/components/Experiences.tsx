import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Compass, Star, ChevronRight, X, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { Experience, CartItem } from '../types';
import { EXPERIENCE_PACKAGES } from '../data';

interface ExperiencesProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  setActiveTab: (tab: string) => void;
}

export default function Experiences({ addToCart, setActiveTab }: ExperiencesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookingExp, setBookingExp] = useState<Experience | null>(null);

  // Booking states
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [guestsCount, setGuestsCount] = useState(2);
  const [locationCity, setLocationCity] = useState('Port Harcourt GRA');

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'wellness', label: 'Wellness Retreats' },
    { id: 'creative', label: 'Creative Ateliers' },
    { id: 'adventure', label: 'Outdoor Adventures' },
    { id: 'romance', label: 'Romantic Occasions' }
  ];

  const filtered = selectedCategory === 'all'
    ? EXPERIENCE_PACKAGES
    : EXPERIENCE_PACKAGES.filter(exp => exp.category === selectedCategory);

  const handleBookExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingExp) return;

    if (!bookingDate) {
      alert('Please select a valid date for your luxury experience.');
      return;
    }

    addToCart({
      id: `exp-${Date.now()}`,
      type: 'experience',
      name: `${bookingExp.name} (${guestsCount} Guests)`,
      price: bookingExp.price * (guestsCount > 2 ? 1.5 : 1), // custom simulated multiplier for extra guests
      image: bookingExp.image,
      details: `Scheduled Date: ${bookingDate} at ${bookingTime}. Location: ${locationCity}. Duration: ${bookingExp.duration}`
    });

    alert(`Successfully scheduled your booking for "${bookingExp.name}"! Proceed to your checkout cart to secure the slot.`);
    setBookingExp(null);
  };

  return (
    <div id="lunara-experiences" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 font-mono">Unforgettable Milestones</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">Experiences Marketplace</h1>
          </div>
          <p className="text-stone-500 text-sm mt-2 md:mt-0 max-w-sm">
            Fulfill love languages through action. Book luxury spa pampering, creative workshops, yacht cruises, or shoreline private dinners.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(exp => (
            <motion.div
              key={exp.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-56 w-full relative">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-stone-900/90 rounded-full text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <Compass className="h-3 w-3" /> {exp.category.toUpperCase()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-medium text-stone-900 line-clamp-1">{exp.name}</h3>
                  <p className="text-stone-500 text-xs mt-2 leading-relaxed line-clamp-3 font-light">
                    {exp.description}
                  </p>
                  
                  {/* Meta details */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-amber-600" /> {exp.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-amber-600" /> {exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Booking Trigger Footer */}
              <div className="p-6 pt-0 border-t border-stone-50 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-bold tracking-wider">Package Price</span>
                  <span className="font-mono text-base font-bold text-stone-900">₦{exp.price.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setBookingExp(exp)}
                  className="px-4 py-2 bg-stone-950 text-white hover:bg-amber-500 hover:text-stone-950 text-xs font-semibold rounded-full transition-all duration-300"
                >
                  Schedule Slot
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking scheduler drawer/modal */}
        {bookingExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative"
            >
              {/* Close */}
              <button
                onClick={() => setBookingExp(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[10px] bg-amber-500/10 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase">
                  Schedule Booking
                </span>
                <h3 className="font-serif text-xl font-light text-stone-900 mt-2">{bookingExp.name}</h3>
                <p className="text-xs text-stone-400 mt-1">Configure your reservation slots and guest details below.</p>
              </div>

              <form onSubmit={handleBookExperience} className="space-y-4">
                
                {/* Select Date */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Reservation Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]} // prevent booking past dates
                      className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                    />
                  </div>
                </div>

                {/* Time slot and location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">Preferred Time</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-amber-500"
                    >
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">Metro Location</label>
                    <select
                      value={locationCity}
                      onChange={(e) => setLocationCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                    >
                      <option value="Port Harcourt GRA">Port Harcourt GRA</option>
                      <option value="Port Harcourt Shoreline">Port Harcourt Shoreline</option>
                      <option value="Trans Amadi">Trans Amadi</option>
                      <option value="Peter Odili Road">Peter Odili Road</option>
                    </select>
                  </div>
                </div>

                {/* Guests count selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">Number of Guests</label>
                  <div className="flex gap-2">
                    {[2, 3, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestsCount(num)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          guestsCount === num
                            ? 'bg-stone-900 border-stone-900 text-amber-400'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {num === 2 ? 'Couple (2)' : `${num} Guests`}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 block mt-1">Note: Groups exceeding 2 guests are subject to 50% premium surcharge.</span>
                </div>

                {/* Live pricing summary block */}
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-200">
                    <span className="text-stone-500">Base Experience:</span>
                    <span className="font-mono text-stone-800 font-semibold">₦{bookingExp.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-stone-500">Dynamic Total ({guestsCount} Guests):</span>
                    <span className="font-mono text-sm font-bold text-stone-950">
                      ₦{(bookingExp.price * (guestsCount > 2 ? 1.5 : 1)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 mt-4"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Confirm and Add to Cart
                </button>

              </form>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
