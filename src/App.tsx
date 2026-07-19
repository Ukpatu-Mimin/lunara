import React, { useState, useEffect } from 'react';
import { ShieldCheck, Key, UserCheck, X, MessageSquare, Send, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import GiftMarketplace from './components/GiftMarketplace';
import CurateBox from './components/CurateBox';
import Experiences from './components/Experiences';
import RoomDecor from './components/RoomDecor';
import EventsSection from './components/EventsSection';
import VendorPortal from './components/VendorPortal';
import AiGiftMatcher from './components/AiGiftMatcher';
import CustomerDashboard from './components/CustomerDashboard';
import MemoryVault from './components/MemoryVault';
import CartModal from './components/CartModal';

import { CartItem, Order, Booking, Recipient, Occasion, Memory, Product, RegisteredUser } from './types';
import { PREMIUM_PRODUCTS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('lunara_logged_in');
    return saved === 'true'; // Guest by default for authentic signup/login gates!
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const saved = localStorage.getItem('lunara_is_admin');
    return saved === 'true';
  });
  const [loginModalType, setLoginModalType] = useState<'user' | 'admin' | null>(null);

  const isLoginModalOpen = loginModalType !== null;
  const setIsLoginModalOpen = (open: boolean | 'user' | 'admin') => {
    if (open === false) {
      setLoginModalType(null);
    } else if (open === 'admin') {
      setLoginModalType('admin');
    } else {
      setLoginModalType('user');
    }
  };

  // Initialize Cart with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lunara_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Initialize Placed Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lunara_orders');
    if (saved) return JSON.parse(saved);
    // Authentic default order for visual appeal
    return [
      {
        id: 'LNR-849204',
        date: '2026-07-15',
        items: [
          {
            id: 'p-1',
            type: 'product',
            name: 'Maison Noire - Ambre Nuit Perfume',
            price: 68000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=200',
            details: 'Signature fragrance box'
          }
        ],
        total: 75000, // including shipping
        status: 'delivered',
        recipientName: 'Sarah Chidi',
        deliveryDate: '2026-07-16',
        address: 'Suite 402, Hotel Presidential, GRA Phase 2, Port Harcourt'
      }
    ];
  });

  // Initialize Scheduled Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('lunara_bookings');
    if (saved) return JSON.parse(saved);
    // Authentic default scheduled booking
    return [
      {
        id: 'bk-default',
        name: 'Private Shoreline Teepee Canopy Dinner',
        date: '2026-08-20',
        time: '18:00',
        location: 'Port Harcourt Shoreline, Port Harcourt',
        price: 185000,
        status: 'confirmed'
      }
    ];
  });

  // Initialize Saved Recipients
  const [recipients, setRecipients] = useState<Recipient[]>(() => {
    const saved = localStorage.getItem('lunara_recipients');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'rec-1',
        name: 'Sarah Chidi',
        relationship: 'Partner / Fiancée',
        birthday: '1998-08-20',
        favoriteColor: 'Blush Pink',
        interests: ['Perfume', 'Acoustic Soul', 'Truffles'],
        notes: 'Enjoys vanilla scent profiles. Allergic to cashew nuts.'
      }
    ];
  });

  // Initialize Saved Occasions
  const [occasions, setOccasions] = useState<Occasion[]>(() => {
    const saved = localStorage.getItem('lunara_occasions');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'occ-1',
        title: 'Sarah’s 28th Milestone Birthday',
        date: '2026-08-20',
        type: 'Birthday',
        recipientName: 'Sarah Chidi'
      }
    ];
  });

  // Initialize Wishlist Product IDs
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('lunara_wishlist');
    return saved ? JSON.parse(saved) : ['p-1', 'p-3'];
  });

  // Initialize Scrapbook Memories
  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('lunara_memories');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'mem-1',
        title: 'Our 3rd Anniversary Sunset Toast',
        date: '2025-10-14',
        recipientName: 'Sarah Chidi',
        description: 'Bespoke sunset boat cruise curated by Lunara on the Bonny River, Port Harcourt. We had custom strawberry truffles and the violin player was perfect.',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=300',
        voiceNoteUrl: 'Mock clip - 0:14'
      },
      {
        id: 'mem-2',
        title: 'Unexpected Suite Decor Surprise',
        date: '2026-02-14',
        recipientName: 'Sarah Chidi',
        description: 'Walked into our Hotel Presidential suite completely decorated with glowing glass pillars and hundreds of preserved rose petals.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=300'
      }
    ];
  });

  // Initialize Registered Users list (for Admin Tracking)
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    const saved = localStorage.getItem('lunara_registered_users');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'usr-1', name: 'Chidi Adeleke', email: 'chidi.adeleke@phbiz.com', registeredAt: '2026-07-10T14:30:00.000Z' },
      { id: 'usr-2', name: 'Tunde Alabi', email: 'tundealabi99@gmail.com', registeredAt: '2026-07-12T09:15:00.000Z' },
      { id: 'usr-3', name: 'Sarah Chidi', email: 'sarah.chidi@outlook.com', registeredAt: '2026-07-15T18:45:00.000Z' }
    ];
  });

  // Initialize Product Catalog / Inventory
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lunara_products');
    if (saved) return JSON.parse(saved);
    return PREMIUM_PRODUCTS;
  });

  // Synchronize state with localStorage
  useEffect(() => {
    localStorage.setItem('lunara_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('lunara_products', JSON.stringify(products));
  }, [products]);

  // Synchronize state with localStorage
  useEffect(() => {
    localStorage.setItem('lunara_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lunara_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lunara_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('lunara_recipients', JSON.stringify(recipients));
  }, [recipients]);

  useEffect(() => {
    localStorage.setItem('lunara_occasions', JSON.stringify(occasions));
  }, [occasions]);

  useEffect(() => {
    localStorage.setItem('lunara_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lunara_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('lunara_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('lunara_is_admin', String(isAdmin));
  }, [isAdmin]);

  // AI Concierge Chatbot states
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { role: 'model', content: "Welcome to Lunara's luxury concierge. I am Amber, your personal gifting guide. How may I assist you in crafting an unforgettable surprise today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/concierge-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: chatMessages
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [...prev, { role: 'model', content: data.reply }]);
      } else {
        throw new Error('Chat failed');
      }
    } catch (err) {
      console.error(err);
      // Premium elegant fallback replies
      setTimeout(() => {
        let fallback = "I apologize, our connection to the luxury vault is fluctuating. However, you can explore our 'Curate Box Atelier' or pick 'Premium Gifts' to surprise your loved ones today!";
        const lowerMsg = userMsg.toLowerCase();
        if (lowerMsg.includes('box') || lowerMsg.includes('curat')) {
          fallback = "Our Curated Gift Box Atelier allows you to select sizing (Mini to Diamond Box) and pack bespoke items like French Cologne Mist and organic eternal roses!";
        } else if (lowerMsg.includes('decor') || lowerMsg.includes('setup')) {
          fallback = "Our Room Decor arrangements transform suites with breathtaking rose path petals, helium birthday balloon clusters, and glowing LED candlelights.";
        } else if (lowerMsg.includes('experience') || lowerMsg.includes('date')) {
          fallback = "For couples, we plan Sunset Yacht Cruises, beachfront dinners with private live violinists, or deep couples spa relaxation treats.";
        }
        setChatMessages(prev => [...prev, { role: 'model', content: fallback }]);
      }, 600);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Cart Handlers
  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    if (!isLoggedIn) {
      const currentCount = cart.reduce((acc, it) => acc + it.quantity, 0);
      if (currentCount >= 2) {
        setLoginModalType('user');
        return;
      }
    }
    setCart((prevCart) => {
      const existing = prevCart.find((it) => it.id === item.id);
      if (existing) {
        return prevCart.map((it) =>
          it.id === item.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleInstantCheckout = (item: Omit<CartItem, 'quantity'>) => {
    if (!isLoggedIn) {
      setLoginModalType('user');
      return;
    }
    setCart([{ ...item, quantity: 1 }]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCart((prevCart) =>
      prevCart.map((it) => (it.id === id ? { ...it, quantity: qty } : it))
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((it) => it.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Profile Form Handlers
  const handleAddRecipient = (rec: Recipient) => {
    setRecipients((prev) => [rec, ...prev]);
  };

  const handleDeleteRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddOccasion = (occ: Occasion) => {
    setOccasions((prev) => [occ, ...prev]);
  };

  const handleDeleteOccasion = (id: string) => {
    setOccasions((prev) => prev.filter((o) => o.id !== id));
  };

  const handleToggleWishlist = (productId: string) => {
    if (!isLoggedIn) {
      setLoginModalType('user');
      return;
    }
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const handleSetActiveTab = (tab: string) => {
    if ((tab === 'matcher' || tab === 'ai_matcher') && !isLoggedIn) {
      setLoginModalType('user');
      return;
    }
    setActiveTab(tab);
  };

  const handleAddMemory = (mem: Memory) => {
    setMemories((prev) => [mem, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col justify-between">
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        onSearch={(query) => setSearchQuery(query)}
        isLoggedIn={isLoggedIn}
        setIsLoginModalOpen={setIsLoginModalOpen}
        isAdmin={isAdmin}
      />

      {/* Main content slot */}
      <main className="flex-grow pt-16">
        {activeTab === 'home' && (
          <LandingPage
            setActiveTab={handleSetActiveTab}
            isLoggedIn={isLoggedIn}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        )}
        {activeTab === 'gifts' && (
          <GiftMarketplace
            cart={cart}
            addToCart={handleAddToCart}
            onInstantCheckout={handleInstantCheckout}
            wishlist={wishlist}
            toggleWishlist={handleToggleWishlist}
            searchQuery={searchQuery}
            products={products}
            setProducts={setProducts}
          />
        )}
        {(activeTab === 'curate' || activeTab === 'curated_box') && (
          <CurateBox addToCart={handleAddToCart} setActiveTab={handleSetActiveTab} />
        )}
        {activeTab === 'experiences' && (
          <Experiences addToCart={handleAddToCart} setActiveTab={handleSetActiveTab} />
        )}
        {activeTab === 'decor' && (
          <RoomDecor addToCart={handleAddToCart} setActiveTab={handleSetActiveTab} />
        )}
        {activeTab === 'events' && (
          <EventsSection />
        )}
        {(activeTab === 'matcher' || activeTab === 'ai_matcher') && (
          <AiGiftMatcher addToCart={handleAddToCart} setActiveTab={handleSetActiveTab} />
        )}
        {(activeTab === 'vendors' || activeTab === 'vendor_portal') && (
          <VendorPortal />
        )}
        {activeTab === 'dashboard' && (
          isAdmin ? (
            <CustomerDashboard
              orders={orders}
              bookings={bookings}
              recipients={recipients}
              addRecipient={handleAddRecipient}
              deleteRecipient={handleDeleteRecipient}
              occasions={occasions}
              addOccasion={handleAddOccasion}
              deleteOccasion={handleDeleteOccasion}
              wishlist={wishlist}
              toggleWishlist={handleToggleWishlist}
              addToCart={handleAddToCart}
              setActiveTab={handleSetActiveTab}
              registeredUsers={registeredUsers}
              setRegisteredUsers={setRegisteredUsers}
              products={products}
              setProducts={setProducts}
              setOrders={setOrders}
              setBookings={setBookings}
            />
          ) : (
            <div className="py-24 text-center max-w-md mx-auto px-4 min-h-[60vh] flex flex-col justify-center items-center">
              <span className="text-xs font-mono tracking-wider text-amber-600 font-bold uppercase">Access Restricted</span>
              <h1 className="font-serif text-3xl font-light text-stone-900 mt-2 mb-4">Admin Credentials Required</h1>
              <p className="text-stone-500 text-sm mb-6 leading-relaxed font-light">
                The Lunara Customer Dashboard and tracking metrics are strictly reserved for administrative accounts and event coordinators.
              </p>
              <button
                onClick={() => setIsLoginModalOpen('admin')}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-amber-500 hover:text-stone-950 transition-colors"
              >
                Authenticate as Admin
              </button>
            </div>
          )
        )}
        {(activeTab === 'vault' || activeTab === 'memory_vault') && (
          isAdmin ? (
            <MemoryVault
              memories={memories}
              addMemory={handleAddMemory}
              deleteMemory={handleDeleteMemory}
            />
          ) : (
            <div className="py-24 text-center max-w-md mx-auto px-4 min-h-[60vh] flex flex-col justify-center items-center">
              <span className="text-xs font-mono tracking-wider text-amber-600 font-bold uppercase">Access Restricted</span>
              <h1 className="font-serif text-3xl font-light text-stone-900 mt-2 mb-4">Memory Vault is Private</h1>
              <p className="text-stone-500 text-sm mb-6 leading-relaxed font-light">
                Scrapbooks, custom audio logs, and milestone memories are secure admin curations. Please authenticate as an admin to view.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-amber-500 hover:text-stone-950 transition-colors"
              >
                Authenticate as Admin
              </button>
            </div>
          )
        )}
      </main>

      {/* Persistent Brand Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="font-serif text-xl font-light tracking-widest text-white">LUNARA</span>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Nigeria’s premier full-service gifting and surprise experiential engine. We specialize in curating luxury, customized milestones.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Bespoke Catalog</h4>
            <ul className="text-xs space-y-2 text-stone-400 font-light">
              <li><button onClick={() => handleSetActiveTab('gifts')} className="hover:text-amber-400 transition-colors">Gift Marketplace</button></li>
              <li><button onClick={() => handleSetActiveTab('curated_box')} className="hover:text-amber-400 transition-colors">Curated Box Atelier</button></li>
              <li><button onClick={() => handleSetActiveTab('experiences')} className="hover:text-amber-400 transition-colors">Surprise Experiences</button></li>
              <li><button onClick={() => handleSetActiveTab('decor')} className="hover:text-amber-400 transition-colors">Hotel Room Decor</button></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Contact Support</h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Have questions regarding bespoke curations? Speak with an Event Coordinator at any time.<br />
              <span className="text-amber-400 font-semibold block mt-1">concierge@lunara.co</span>
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Scan to Gift</h4>
            <div className="p-2 bg-stone-950 border border-stone-800 rounded-2xl inline-block">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=f59e0b&bgcolor=0c0a09&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}?tab=gifts` : 'https://lunara-bespoke.com/gifts')}`} 
                alt="Scan to access Gift Shop" 
                className="w-24 h-24 rounded-lg border border-stone-900"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] text-stone-500 font-light leading-relaxed">
              Scan with your mobile device to launch the Bespoke Curation and Gift Marketplace instantly.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-medium font-mono">
          <span>&copy; {new Date().getFullYear()} Lunara Gifting. All rights reserved.</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-stone-300 transition-colors">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-stone-300 transition-colors">Terms of Surprise Curation</span>
          </div>
        </div>
      </footer>

      {/* Cart Modal Drawer */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateQuantity}
        removeFromCart={handleRemoveFromCart}
        clearCart={handleClearCart}
        addOrder={(ord) => setOrders((prev) => [ord, ...prev])}
        addBooking={(bk) => setBookings((prev) => [bk, ...prev])}
        setActiveTab={handleSetActiveTab}
      />

      {/* Role Selection / Login Modal */}
      {loginModalType !== null && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-stone-100 shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setLoginModalType(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-700"
            >
              <X className="h-5 w-5" />
            </button>
            
            {loginModalType === 'user' ? (
              <ClientAuthForm 
                onSuccess={() => {
                  setIsLoggedIn(true);
                  setIsAdmin(false);
                  setLoginModalType(null);
                  handleSetActiveTab('gifts');
                }}
                isLoggedIn={isLoggedIn}
                onSignOut={() => {
                  setIsLoggedIn(false);
                  setIsAdmin(false);
                  setLoginModalType(null);
                  handleSetActiveTab('home');
                }}
                onRegister={(name, email) => {
                  setRegisteredUsers((prev) => {
                    const exists = prev.find(u => u.email.toLowerCase() === email.toLowerCase());
                    if (exists) return prev;
                    return [
                      {
                        id: `usr-${Date.now()}`,
                        name,
                        email,
                        registeredAt: new Date().toISOString()
                      },
                      ...prev
                    ];
                  });
                }}
              />
            ) : (
              <AdminAuthForm 
                onSuccess={() => {
                  setIsLoggedIn(true);
                  setIsAdmin(true);
                  setLoginModalType(null);
                  handleSetActiveTab('dashboard');
                }}
                isAdmin={isAdmin}
                onSignOut={() => {
                  setIsLoggedIn(false);
                  setIsAdmin(false);
                  setLoginModalType(null);
                  handleSetActiveTab('home');
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* AI Gifting Concierge Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
        {/* Chat Drawer */}
        {isConciergeOpen && (
          <div className="w-80 sm:w-96 h-[460px] bg-white border border-stone-200/80 shadow-2xl rounded-3xl flex flex-col overflow-hidden mb-4 animate-fade-in text-stone-900">
            {/* Header */}
            <div className="bg-stone-950 text-white p-4 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 text-sm font-serif font-bold relative">
                  A
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-stone-950 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wide flex items-center gap-1">
                    Amber
                    <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded-full font-bold uppercase font-mono tracking-tight">AI Concierge</span>
                  </h4>
                  <p className="text-[9px] text-stone-400 font-light">Senior Gifting & Surprise Strategist</p>
                </div>
              </div>
              <button
                onClick={() => setIsConciergeOpen(false)}
                className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Message History Body */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-stone-50/50 flex flex-col">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] px-4 py-2.5 text-xs rounded-2xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-stone-50 rounded-tr-none self-end'
                      : 'bg-[#faf8f4] border border-amber-500/10 text-stone-800 rounded-tl-none self-start font-serif italic'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isChatLoading && (
                <div className="bg-[#faf8f4] border border-amber-500/10 text-stone-500 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs self-start italic font-serif flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce" />
                    <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                  <span>Amber is formulating concepts...</span>
                </div>
              )}
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-stone-100 bg-white flex gap-2 items-center">
              <input
                type="text"
                placeholder="Ask about perfumes, custom decor, sunset cruises..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow px-3 py-2 text-xs rounded-xl border border-stone-250 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isChatLoading}
                className="h-8 w-8 rounded-full bg-stone-950 text-white flex items-center justify-center hover:bg-amber-500 hover:text-stone-950 transition-colors disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsConciergeOpen(!isConciergeOpen)}
          className="h-14 px-4 bg-stone-950 border border-stone-800 text-white rounded-full flex items-center gap-2.5 shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50 hover:bg-stone-900 transition-all duration-300 group"
        >
          <div className="h-7 w-7 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <span className="text-xs font-semibold tracking-wide pr-1">Amber Gifting AI</span>
        </button>
      </div>

    </div>
  );
}

function ClientAuthForm({ onSuccess, isLoggedIn, onSignOut, onRegister }: { onSuccess: () => void; isLoggedIn: boolean; onSignOut: () => void; onRegister?: (name: string, email: string) => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (isSignUp) {
        onRegister?.(name || 'Bespoke Client', email);
      } else {
        onRegister?.(email.split('@')[0], email);
      }
      onSuccess();
    }, 800);
  };

  if (isLoggedIn) {
    return (
      <div className="p-8 space-y-6 text-center">
        <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
          <UserCheck className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-light text-stone-900">Signed In as Client</h2>
          <p className="text-stone-500 text-xs font-light">You are currently logged in to your premium client account.</p>
        </div>
        <button
          onClick={onSignOut}
          className="w-full py-2.5 border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-full text-xs transition-colors"
        >
          Sign Out of Account
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-amber-600 uppercase font-bold">
          {isSignUp ? 'New Client Account' : 'Client Security Portal'}
        </span>
        <h2 className="font-serif text-2xl font-light text-stone-900">
          {isSignUp ? 'Create Client Account' : 'Sign In to Lunara'}
        </h2>
        <p className="text-stone-500 text-xs font-light leading-relaxed">
          {isSignUp 
            ? 'Register to save your curations, track surprise lists, and access our AI Matcher.' 
            : 'Access your curated gift registries, order records, and premium experiences.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Chidi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Email Address</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Security Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-amber-500 hover:text-stone-950 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="h-4 w-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <UserCheck className="h-4 w-4" />
              <span>{isSignUp ? 'Create Premium Account' : 'Authenticate Client Session'}</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'New to Lunara? Sign Up / Create Account'}
        </button>
      </div>
    </div>
  );
}

function AdminAuthForm({ onSuccess, isAdmin, onSignOut }: { onSuccess: () => void; isAdmin: boolean; onSignOut: () => void }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'admin') {
      setIsLoading(true);
      setError('');
      setTimeout(() => {
        setIsLoading(false);
        onSuccess();
      }, 800);
    } else {
      setError('Invalid administrative security key.');
    }
  };

  if (isAdmin) {
    return (
      <div className="p-8 space-y-6 text-center">
        <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-light text-stone-900">Signed In as Admin</h2>
          <p className="text-stone-500 text-xs font-light">You are currently logged in with full administrative privileges.</p>
        </div>
        <button
          onClick={onSignOut}
          className="w-full py-2.5 border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-full text-xs transition-colors"
        >
          Sign Out of Account
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-amber-600 uppercase font-bold flex items-center justify-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" /> High Clearance Area
        </span>
        <h2 className="font-serif text-2xl font-light text-stone-900">Admin Security Login</h2>
        <p className="text-stone-500 text-xs font-light">
          Authenticate using your assigned corporate administrative passphrase keys.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Security Passcode</label>
          <input
            type="password"
            required
            placeholder="Enter passcode (Hint: admin)"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        {error && (
          <p className="text-[11px] text-red-600 font-medium text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-amber-500 hover:text-stone-950 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="h-4 w-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Key className="h-4 w-4" />
              <span>Validate Security Key</span>
            </>
          )}
        </button>
      </form>

      <p className="text-[10px] text-center text-stone-400 font-light italic">
        Restricted area. Unauthorized access attempts are flagged.
      </p>
    </div>
  );
}
