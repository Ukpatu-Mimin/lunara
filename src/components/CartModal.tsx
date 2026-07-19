import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Calendar, MapPin, Sparkles, Send, ShoppingBag, CreditCard } from 'lucide-react';
import { CartItem, Order, Booking } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  addBooking: (booking: Booking) => void;
  setActiveTab: (tab: string) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  addOrder,
  addBooking,
  setActiveTab
}: CartModalProps) {
  // Shipping Scheduler States
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('14:00');
  const [deliveryCity, setDeliveryCity] = useState('Port Harcourt GRA');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [envelopeNote, setEnvelopeNote] = useState('');

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'schedule' | 'payment' | 'success'>('cart');

  if (!isOpen) return null;

  // Calculate Subtotal cost
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 0 ? (deliveryCity.includes('Nationwide') ? 12000 : 5000) : 0;
  const grandTotal = subtotal + shippingFee;

  const handleNextStep = () => {
    if (checkoutStep === 'cart') {
      if (cart.length === 0) return;
      setCheckoutStep('schedule');
    } else if (checkoutStep === 'schedule') {
      if (!recipientName.trim() || !recipientPhone.trim() || !deliveryDate || !deliveryAddress.trim()) {
        alert('Please fill out all recipient and scheduled delivery fields to map the surprise delivery.');
        return;
      }
      setCheckoutStep('payment');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create Placed Order record
    const newOrder: Order = {
      id: `LNR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: grandTotal,
      status: 'processing',
      recipientName,
      deliveryDate,
      address: `${deliveryAddress}, ${deliveryCity}`
    };

    addOrder(newOrder);

    // Also populate booking schedule if an experience or decor booking was added to cart
    cart.forEach(item => {
      if (item.type === 'experience' || item.type === 'decor') {
        const newBk: Booking = {
          id: `bk-${Date.now()}`,
          type: item.type === 'experience' ? 'experience' : 'decor',
          name: item.name,
          date: deliveryDate,
          time: deliveryTime,
          location: `${deliveryAddress}, ${deliveryCity}`,
          price: item.price,
          status: 'confirmed'
        };
        addBooking(newBk);
      }
    });

    // Clear cart and advance step
    clearCart();
    setCheckoutStep('success');
  };

  const handleFinishedSuccess = () => {
    onClose();
    setCheckoutStep('cart');
    // Clear forms
    setRecipientName('');
    setRecipientPhone('');
    setDeliveryDate('');
    setDeliveryAddress('');
    setEnvelopeNote('');
    // Open Customer Dashboard
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      {/* Outer shadow click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Cart Container Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35 }}
        className="relative w-full max-w-lg h-screen bg-white shadow-2xl flex flex-col justify-between z-10 overflow-hidden"
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200/60 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-400" />
            <h2 className="font-serif text-lg font-light">My Curation Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Steps */}
        <div className="bg-stone-50 border-b border-stone-200/60 py-3 px-5 flex justify-between text-[11px] font-semibold text-stone-500">
          <span className={checkoutStep === 'cart' ? 'text-stone-900 font-bold border-b border-stone-900' : ''}>1. Items Review</span>
          <span className={checkoutStep === 'schedule' ? 'text-stone-900 font-bold border-b border-stone-900' : ''}>2. Delivery Scheduling</span>
          <span className={checkoutStep === 'payment' ? 'text-stone-900 font-bold border-b border-stone-900' : ''}>3. Payment</span>
        </div>

        {/* Main scrollable body area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* STEP 1: Cart items list */}
          {checkoutStep === 'cart' && (
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="h-12 w-12 text-stone-300 mx-auto mb-3" />
                  <p className="text-stone-400 text-xs">Your curated cart is currently empty.</p>
                  <button onClick={onClose} className="mt-4 px-4 py-2 bg-stone-900 text-amber-400 rounded-full text-xs font-semibold">Start Curating</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-stone-50 border border-stone-200 rounded-2xl relative">
                      <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-xl" referrerPolicy="no-referrer" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                          <span className="text-[10px] text-stone-400 block line-clamp-1">{item.details}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-mono text-xs font-bold text-stone-850">₦{(item.price * item.quantity).toLocaleString()}</span>
                          
                          {/* Qty count control */}
                          <div className="flex items-center gap-2 border border-stone-200 bg-white rounded-lg px-2 py-0.5">
                            <button
                              onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                              className="text-stone-500 font-bold text-xs"
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-stone-500 font-bold text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Trash */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-2 right-2 p-1.5 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-full"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Scheduling & Surprise Information */}
          {checkoutStep === 'schedule' && (
            <div className="space-y-4">
              <h3 className="font-serif text-base text-stone-900 flex items-center gap-1.5 border-b border-stone-100 pb-2">
                <Calendar className="h-4.5 w-4.5 text-amber-600" /> Surprise Handing Scheduler
              </h3>

              <div className="space-y-3 text-xs">
                {/* Recipient details */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-stone-700 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Sarah Chidi"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-stone-700 mb-1">Recipient Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="080 1234 5678"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Date slots */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-stone-700 mb-1">Deliver On Date</label>
                    <input
                      type="date"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-stone-700 mb-1">Preferred Slot</label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                    >
                      <option value="10:00">Morning (10 AM - 12 PM)</option>
                      <option value="14:00">Afternoon (2 PM - 4 PM)</option>
                      <option value="18:00">Evening (6 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Location Address */}
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-stone-700 mb-1">Delivery Metro Region</label>
                  <select
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                  >
                    <option value="Port Harcourt GRA">Port Harcourt GRA (₦5,000 Delivery)</option>
                    <option value="Port Harcourt Mainland">Port Harcourt Mainland & Trans Amadi (₦5,000 Delivery)</option>
                    <option value="Nationwide Express Courier">Nationwide Express Courier (Dry luxury items only - ₦12,000 Shipping)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-stone-700 mb-1">Full Physical Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter specific house address or office suite detail"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                  />
                </div>

                {/* Calligraphy Envelope */}
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-stone-700 mb-1">Handwritten Envelope Note Message</label>
                  <textarea
                    rows={2}
                    placeholder="Write a warm note to Sarah. This is beautifully scribed in cursive calligraphy on high-end parchment paper."
                    value={envelopeNote}
                    onChange={(e) => setEnvelopeNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Payment form simulation */}
          {checkoutStep === 'payment' && (
            <div className="space-y-6">
              <h3 className="font-serif text-base text-stone-900 flex items-center gap-1.5 border-b border-stone-100 pb-2">
                <CreditCard className="h-4.5 w-4.5 text-amber-600" /> Secure Premium Gateway
              </h3>

              <div className="bg-stone-900 text-white p-5 rounded-2xl space-y-3 font-mono text-xs">
                <span className="text-[9px] text-stone-500 uppercase block font-sans">Payment Mode: Simulated Naira Gateway</span>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Recipient:</span>
                  <span className="text-stone-300">{recipientName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Fulfillment date:</span>
                  <span className="text-stone-300">{deliveryDate}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>Grand total due:</span>
                  <span className="text-amber-400">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Mock credit card inputs */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Credit Card Number</label>
                  <input
                    type="text"
                    required
                    disabled
                    placeholder="•••• •••• •••• •••• (Simulated Live checkout)"
                    className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100 cursor-not-allowed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Expiry MM/YY</label>
                    <input
                      type="text"
                      required
                      disabled
                      placeholder="12/28"
                      className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">CVV Security</label>
                    <input
                      type="text"
                      required
                      disabled
                      placeholder="•••"
                      className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100 cursor-not-allowed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-amber-500 text-stone-950 hover:bg-amber-600 font-bold text-xs uppercase tracking-wider transition-colors mt-6 shadow"
                >
                  Pay ₦{grandTotal.toLocaleString()} & Transmit Surprise
                </button>
              </form>
            </div>
          )}

          {/* SUCCESS SCREEN */}
          {checkoutStep === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-5"
            >
              <div className="h-16 w-16 bg-amber-500/15 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-light text-stone-900">Your Surprise is Placed!</h3>
              <p className="text-stone-500 text-xs leading-relaxed max-w-sm mx-auto">
                Payment completed successfully. The artisans, florists, and courier coordinators have received your design brief. 
                You can now track fulfillment phases live on your dashboard timeline!
              </p>

              <button
                onClick={handleFinishedSuccess}
                className="px-6 py-3 bg-stone-950 text-white hover:bg-amber-500 hover:text-stone-950 font-bold text-xs rounded-full transition-all duration-300"
              >
                Go to Order Dashboard
              </button>
            </motion.div>
          )}

        </div>

        {/* Drawer footer containing pricing previews unless checked out successfully */}
        {checkoutStep !== 'success' && (
          <div className="p-5 border-t border-stone-200/60 bg-stone-50 space-y-4">
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between text-stone-500">
                <span>Items Subtotal:</span>
                <span className="font-mono text-stone-850">₦{subtotal.toLocaleString()}</span>
              </div>
              {checkoutStep !== 'cart' && (
                <div className="flex justify-between text-stone-500">
                  <span>Shipping & Delivery Fee ({deliveryCity}):</span>
                  <span className="font-mono text-stone-850">₦{shippingFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-stone-900 pt-2 border-t border-stone-200/60">
                <span>Estimated total:</span>
                <span className="font-mono text-amber-700 text-base">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* CTA control to proceed */}
            {checkoutStep !== 'payment' && (
              <button
                onClick={handleNextStep}
                disabled={cart.length === 0}
                className="w-full py-3.5 rounded-full bg-stone-950 hover:bg-amber-500 text-white hover:text-stone-950 text-xs font-semibold tracking-wider uppercase transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
              >
                {checkoutStep === 'cart' ? 'Proceed to Delivery Scheduling' : 'Proceed to Payment Gateway'}
              </button>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
}
