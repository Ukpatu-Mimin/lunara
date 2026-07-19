import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Sliders, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function EventsSection() {
  const [eventType, setEventType] = useState('Birthday');
  const [guestCount, setGuestCount] = useState('50');
  const [eventDate, setEventDate] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const eventCategories = [
    {
      title: 'Luxury Birthdays',
      desc: 'Bespoke milestone celebrations (30th, 40th, 50th) with custom staging, personalized visual backdrops, light-up marquee letterings, customized baker options, and continuous champagne fountains.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Satin Anniversaries',
      desc: 'Re-kindle romance with candlelit walkways, custom acoustic string quartets, shoreline teepee configurations, and private chefs handling fine French and local degustation plates.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Sign Out Celebrations',
      desc: 'Celebrate graduation milestones in ultimate grandeur! Red carpets, customized flower arches, customized photo booth configurations, continuous custom mocktail setups, and high-fidelity sound engines.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Grand Proposals',
      desc: 'Create an absolutely flawless scenario for your monumental question. Standard illuminated "MARRY ME"marquee lights, tall glass candle pillars, luxury flower walls, and on-site instant mini-shoots.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Bridal Showers',
      desc: 'Elegant, high-end bridal showers with pink floral arrangements, specialized high-tea tier sets, luxury champagne bottles, custom satin robes, and beautifully printed game planners.',
      image: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventDate || !contactName || !contactPhone) {
      alert('Please fill out all required fields to request a design consultation.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div id="lunara-events" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 font-mono">Grand Milestones</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">Dedicated Event Planning</h1>
          <p className="text-stone-500 mt-3 text-sm leading-relaxed">
            For major scale milestones requiring meticulous structural coordination, we align our verified network of decorators, bakers, florists, and private chefs under a single custom concierge contact.
          </p>
        </div>

        {/* Categories Showcase */}
        <div className="space-y-12 mb-16">
          {eventCategories.map((evt, idx) => (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 h-64 sm:h-80 rounded-2xl overflow-hidden relative shadow-md">
                <img src={evt.image} alt={evt.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-stone-900/10 hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Sparkles className="h-4.5 w-4.5" />
                  <span className="text-xs uppercase font-bold tracking-wider font-mono">Lunara Platinum Curation</span>
                </div>
                <h3 className="font-serif text-2xl font-light text-stone-900">{evt.title}</h3>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">{evt.desc}</p>
                <div className="flex gap-4 text-xs font-semibold text-stone-600 font-mono">
                  <span>✓ 100% Custom Themes</span>
                  <span>✓ Dedicated Coordinator</span>
                </div>
                <button
                  onClick={() => {
                    setEventType(evt.title.replace('Luxury ', '').replace('Satin ', '').replace('Grand ', ''));
                    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-950 text-white hover:bg-amber-500 hover:text-stone-950 transition-all duration-300"
                >
                  Schedule Curation Briefing
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation form block */}
        <div id="consultation-form" className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10 space-y-4"
            >
              <div className="h-16 w-16 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-light text-white">Consultation Request Received</h3>
              <p className="text-stone-400 text-xs max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-amber-400 font-semibold">{contactName}</span>. A senior Lunara Event Concierge will reach out to you via <span className="text-amber-400 font-semibold">{contactPhone}</span> within the next 4 hours to review your theme design brief.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-stone-800 border border-stone-700 hover:border-amber-400 rounded-full text-xs font-semibold transition-colors"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleConsultSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-mono">Planning Form</span>
                <h2 className="font-serif text-2xl font-light mt-1 text-white">Bespoke Event Briefing</h2>
                <p className="text-stone-400 text-xs mt-1">Align with Nigeria’s premium coordinators for tailored setup installations.</p>
              </div>

              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">Event Category</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-800 bg-stone-950 text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Birthday">Luxury Birthday Curation</option>
                    <option value="Anniversary">Satin Anniversary Curation</option>
                    <option value="Sign Out">Sign Out Bash</option>
                    <option value="Proposal">Grand Proposal Setup</option>
                    <option value="Bridal Shower">Bridal Shower Tea</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">Target Installation Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-800 bg-stone-950 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-800 bg-stone-950 text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">Phone Number (WhatsApp preferred)</label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g. +234 81..."
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-800 bg-stone-950 text-stone-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">Curation Vision Description & Special Request Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details like target venue (Port Harcourt or other cities), color scheme preferences, baker details, flower wall styling, acoustic strings music types..."
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-stone-800 bg-stone-950 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Submit Consultation Request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
