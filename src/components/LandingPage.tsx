import { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, Sliders, Volume2, Star, Calendar, ChevronDown, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import Hero from './Hero';
import { TESTIMONIALS, FAQS } from '../data';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

export default function LandingPage({ setActiveTab, isLoggedIn, setIsLoginModalOpen }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      title: 'Premium Gifts',
      desc: 'Browse exquisite perfumes, fresh cakes, luxury chocolates, premium jewelry, and long-lasting flowers.',
      icon: Gift,
      tab: 'gifts',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Curated Gift Boxes',
      desc: 'Pick your size, select an aesthetic theme, and pack your box live with customized pricing.',
      icon: Sliders,
      tab: 'curate',
      image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Luxury Room Decor',
      desc: 'Transform hotel suites or bedrooms with romantic rose path setups, birthday backdrops, and balloon canopies.',
      icon: Sparkles,
      tab: 'decor',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Surprise Experiences',
      desc: 'Book couple spa dates, beach dinners with live acoustic guitar, sunset boat cruises, and blending workshops.',
      icon: Compass,
      tab: 'experiences',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'AI-Powered Gift Matching',
      desc: 'Input age, interests, love language, and budget. Our Gemini AI designs the perfect surprise formula.',
      icon: Sparkles,
      tab: 'matcher',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    }
  ];

  return (
    <div id="lunara-landing-page" className="bg-stone-50">
      
      {/* Hero */}
      <Hero
        onStartSurprise={() => setActiveTab('matcher')}
        onCurateBox={() => setActiveTab('curate')}
      />

      {/* How It Works Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-amber-600 uppercase">Seamless Sophistication</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-2">How Lunara Works</h2>
          <p className="text-stone-500 mt-4 text-sm sm:text-base">We handle everything from luxury sourcing to onsite setup so you can relax and share the joy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: '01',
              title: 'Choose Occasion & Theme',
              desc: 'Select from our luxury catalog, customize a premium gift box, or schedule a customized room decoration setup.',
              color: 'border-amber-200'
            },
            {
              step: '02',
              title: 'Personalize the Experience',
              desc: 'Add personalized cards, select specific perfumes/flowers, or let our AI Matcher design custom suggestions.',
              color: 'border-stone-200'
            },
            {
              step: '03',
              title: 'We Handle the Magic',
              desc: 'Our verified decorators and florists deliver, arrange, and handle the magic flawlessly right on schedule.',
              color: 'border-stone-200'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-2xl p-8 border border-stone-100 shadow-sm relative overflow-hidden`}
            >
              <div className="text-5xl font-serif font-light text-amber-500/10 absolute -top-2 right-4">
                {item.step}
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700 font-bold mb-5">
                {index + 1}
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-stone-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-wider text-amber-600 uppercase font-mono">Bespoke Catalog</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-2">Discover Our Services</h2>
            <p className="text-stone-500 mt-4 text-sm">Everything you need to craft high-fidelity, premium memories, all under one roof.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 w-full overflow-hidden relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 p-2 bg-stone-900/80 rounded-full text-amber-400">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">{service.title}</h3>
                      <p className="text-stone-500 text-xs leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setActiveTab(service.tab)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                    >
                      <span>Explore {service.title}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-amber-600 uppercase">Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-2">Shared Joy & Stories</h2>
          <p className="text-stone-500 mt-4 text-sm">Read the accounts of thousands who trusted Lunara with their special milestones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm italic font-light leading-relaxed">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-50">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-semibold text-sm text-stone-900">{t.name}</h4>
                  <span className="text-[11px] text-stone-400">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase font-mono">FAQ</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light mt-2 text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border-b border-stone-800 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full text-left py-3 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-light text-stone-100 hover:text-amber-300 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown className={`h-5 w-5 text-stone-400 transform transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {openFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-stone-400 text-xs sm:text-sm mt-2 pl-2 border-l border-amber-500/30 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
