import React, { useState, useRef } from 'react';
import { Gift, ShoppingBag, User, Menu, X, Sparkles, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
  setIsLoginModalOpen: (open: boolean | 'user' | 'admin') => void;
  isAdmin: boolean;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  onSearch,
  isLoggedIn,
  setIsLoginModalOpen,
  isAdmin,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    setActiveTab('home');
    const next = logoClicks + 1;
    if (next === 3) {
      setIsLoginModalOpen('admin');
      setLogoClicks(0);
    } else {
      setLogoClicks(next);
    }

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setLogoClicks(0);
    }, 600); // 600ms window for triple click
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'gifts', label: 'Gifts' },
    { id: 'curate', label: 'Curate Box' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'decor', label: 'Room Decor' },
    { id: 'events', label: 'Events' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-stone-900 text-stone-100 border-b border-stone-800" id="lunara-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with secret clicks to open Admin Security Portal */}
          <div 
            className="flex items-center cursor-pointer select-none" 
            onClick={handleLogoClick}
            title="LUNARA Bespoke Curation (Triple-click for security)"
          >
            <Gift className="h-8 w-8 text-amber-500 mr-2 animate-pulse" />
            <span className="font-serif text-2xl font-semibold tracking-wider text-white">LUNARA</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative ${
                  activeTab === link.id ? 'text-amber-400' : 'text-stone-300 hover:text-white'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center space-x-6">

            {/* AI Matcher Shortcut */}
            <button
              onClick={() => setActiveTab('matcher')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-900 transition-all duration-300 shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Matcher
            </button>

            {/* Wishlist/Vault Shortcut if logged in as Admin */}
            {isLoggedIn && isAdmin && (
              <button
                onClick={() => setActiveTab('vault')}
                title="Memory Vault"
                className="text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Heart className="h-5 w-5" />
              </button>
            )}

            {/* Cart Button: Keep count strictly to 0 visually as requested */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-300 hover:text-white transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-stone-950">
                0
              </span>
            </button>

            {/* Login / Dashboard Account */}
            <button
              onClick={() => {
                if (isAdmin) {
                  setActiveTab('dashboard');
                } else {
                  setIsLoginModalOpen('user');
                }
              }}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isAdmin 
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400' 
                  : 'border-stone-700 text-stone-300 hover:border-amber-500 hover:text-amber-500 hover:bg-stone-800'
              }`}
              title={isAdmin ? "Admin Dashboard" : "Client Sign In / Sign Up"}
            >
              <User className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-300"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-stone-950">
                0
              </span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-t border-stone-800 px-4 py-4 space-y-3">

          {/* Nav Links */}
          <div className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-left text-sm font-medium rounded-md ${
                  activeTab === link.id ? 'bg-amber-500/10 text-amber-400' : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-stone-800">
            <button
              onClick={() => {
                setActiveTab('matcher');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-semibold bg-amber-500 text-stone-950"
            >
              <Sparkles className="h-4 w-4" />
              AI Gift Matcher
            </button>

            {isLoggedIn && isAdmin && (
              <button
                onClick={() => {
                  setActiveTab('vault');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-semibold bg-stone-800 text-amber-400"
              >
                <Heart className="h-4 w-4" />
                Memory Vault
              </button>
            )}

            {isAdmin ? (
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-400"
              >
                <User className="h-4 w-4" />
                Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen('user');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-stone-800 border border-stone-700 hover:border-amber-500 rounded-full text-xs font-semibold text-stone-300"
              >
                <User className="h-4 w-4 text-amber-500" />
                Client Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
