import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, Clock, Users, Calendar, Heart, Plus, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Sparkles, TrendingUp, RefreshCw, Download, Bell, FileText, Upload } from 'lucide-react';
import { Order, Booking, Recipient, Occasion, Product, CartItem, RegisteredUser, Vendor } from '../types';
import { PREMIUM_PRODUCTS } from '../data';

interface CustomerDashboardProps {
  orders: Order[];
  bookings: Booking[];
  recipients: Recipient[];
  addRecipient: (rec: Recipient) => void;
  deleteRecipient: (id: string) => void;
  occasions: Occasion[];
  addOccasion: (occ: Occasion) => void;
  deleteOccasion: (id: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  setActiveTab: (tab: string) => void;
  registeredUsers: RegisteredUser[];
  setRegisteredUsers: React.Dispatch<React.SetStateAction<RegisteredUser[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders?: React.Dispatch<React.SetStateAction<Order[]>>;
  setBookings?: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export default function CustomerDashboard({
  orders,
  bookings,
  recipients,
  addRecipient,
  deleteRecipient,
  occasions,
  addOccasion,
  deleteOccasion,
  wishlist,
  toggleWishlist,
  addToCart,
  setActiveTab,
  registeredUsers,
  setRegisteredUsers,
  products,
  setProducts,
  setOrders,
  setBookings,
}: CustomerDashboardProps) {
  const [activeTab, setActiveSubTab] = useState<'orders' | 'bookings' | 'recipients' | 'occasions' | 'wishlist' | 'itinerary' | 'crm' | 'users' | 'inventory' | 'vendors_list' | 'qr_code'>('orders');

  // Surprise Itinerary Planner States
  const [planRecipientName, setPlanRecipientName] = useState('');
  const [planRelationship, setPlanRelationship] = useState('');
  const [planOccasion, setPlanOccasion] = useState('Wedding Proposal');
  const [planPersonality, setPlanPersonality] = useState('Introverted luxury lover, deeply romantic, loves acoustic soft music');
  const [planBudgetTier, setPlanBudgetTier] = useState<'premium' | 'diamond' | 'royal'>('diamond');
  const [planPreferences, setPlanPreferences] = useState('Wants gold candle path and a private violinist');
  const [isPlanningLoading, setIsPlanningLoading] = useState(false);
  const [plannedItinerary, setPlannedItinerary] = useState<{
    themeName: string;
    totalPrice: number;
    plannerAdvice: string;
    steps: { time: string; title: string; description: string; estimatedCost: number; }[];
  } | null>(null);

  // Relationship CRM & Forecasts States
  const [isCrmLoading, setIsCrmLoading] = useState(false);
  const [crmForecasts, setCrmForecasts] = useState<any[]>([]);

  // Editable Itinerary States
  const [editableSteps, setEditableSteps] = useState<{ time: string; title: string; description: string; estimatedCost: number; }[]>([]);
  const [editableThemeName, setEditableThemeName] = useState('');
  const [editablePlannerAdvice, setEditablePlannerAdvice] = useState('');

  useEffect(() => {
    if (plannedItinerary) {
      setEditableSteps(plannedItinerary.steps);
      setEditableThemeName(plannedItinerary.themeName);
      setEditablePlannerAdvice(plannedItinerary.plannerAdvice);
    }
  }, [plannedItinerary]);

  // Recipient form states
  const [recName, setRecName] = useState('');
  const [recRel, setRecRel] = useState('');
  const [recBday, setRecBday] = useState('');
  const [recColor, setRecColor] = useState('Pink');
  const [recNotes, setRecNotes] = useState('');
  const [recInterests, setRecInterests] = useState('');

  // Occasion form states
  const [occTitle, setOccTitle] = useState('');
  const [occDate, setOccDate] = useState('');
  const [occType, setOccType] = useState('Birthday');
  const [occRec, setOccRec] = useState('');

  // Vendors list State
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('lunara_vendors');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'v-1', businessName: 'Elite Blooms Atelier', ceoName: 'Amina Bello', phone: '+234 803 111 2222', address: '12 Oyster Close, GRA Phase 2, Port Harcourt', category: 'florist', status: 'active' },
      { id: 'v-2', businessName: 'Velvet Frosting & Cakes', ceoName: 'Chisom Okafor', phone: '+234 812 333 4444', address: '45 Ken Saro-Wiwa Road, Port Harcourt', category: 'baker', status: 'active' },
      { id: 'v-3', businessName: 'Majestic Room Transformers', ceoName: 'Olumide Johnson', phone: '+234 905 555 6666', address: '88 Peter Odili Road, Port Harcourt', category: 'decorator', status: 'active' },
      { id: 'v-4', businessName: 'Capture Gold Studios', ceoName: 'Tunde Shonibare', phone: '+234 708 777 8888', address: '15 Tombia Street, GRA Phase 1, Port Harcourt', category: 'photographer', status: 'active' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('lunara_vendors', JSON.stringify(vendors));
  }, [vendors]);

  // Inventory manager state variables
  const [invId, setInvId] = useState('');
  const [invName, setInvName] = useState('');
  const [invPrice, setInvPrice] = useState<number>(0);
  const [invCategory, setInvCategory] = useState<'perfumes' | 'flowers' | 'cakes' | 'chocolates' | 'jewelry' | 'fashion' | 'gadgets' | 'plushies'>('perfumes');
  const [invDescription, setInvDescription] = useState('');
  const [invImage, setInvImage] = useState('');
  const [uploadingImageName, setUploadingImageName] = useState('');
  const [isInvModalOpen, setIsInvModalOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setInvImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Vendor manager state variables
  const [vendId, setVendId] = useState('');
  const [vendBusinessName, setVendBusinessName] = useState('');
  const [vendCeoName, setVendCeoName] = useState('');
  const [vendPhone, setVendPhone] = useState('');
  const [vendAddress, setVendAddress] = useState('');
  const [vendCategory, setVendCategory] = useState<'decorator' | 'florist' | 'baker' | 'photographer' | 'spa' | 'restaurant'>('florist');
  const [isVendModalOpen, setIsVendModalOpen] = useState(false);

  const handleCreateRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recName.trim() || !recRel.trim()) return;

    const newRec: Recipient = {
      id: `rec-${Date.now()}`,
      name: recName,
      relationship: recRel,
      birthday: recBday || 'None specified',
      favoriteColor: recColor,
      interests: recInterests.split(',').map(i => i.trim()).filter(Boolean),
      notes: recNotes
    };

    addRecipient(newRec);

    // reset fields
    setRecName('');
    setRecRel('');
    setRecBday('');
    setRecColor('Pink');
    setRecNotes('');
    setRecInterests('');
    alert('Recipient saved! You can now easily plan customized surprises for them.');
  };

  const handleCreateOccasion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!occTitle.trim() || !occDate) return;

    const newOcc: Occasion = {
      id: `occ-${Date.now()}`,
      title: occTitle,
      date: occDate,
      type: occType,
      recipientName: occRec || 'Any'
    };

    addOccasion(newOcc);
    setOccTitle('');
    setOccDate('');
    setOccType('Birthday');
    setOccRec('');
    alert('Surprise occasion saved and tracked on your Lunara timeline!');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invName.trim() || invPrice <= 0 || !invDescription.trim()) {
      alert('Please fill out all product details with valid pricing.');
      return;
    }

    const defaultImage = invImage.trim() || 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600';

    if (invId) {
      // Editing
      const updated = products.map(p => p.id === invId ? {
        ...p,
        name: invName,
        price: Number(invPrice),
        category: invCategory,
        description: invDescription,
        image: defaultImage
      } : p);
      setProducts(updated);
      alert('Inventory item updated successfully!');
    } else {
      // Creating
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: invName,
        price: Number(invPrice),
        category: invCategory,
        description: invDescription,
        image: defaultImage,
        rating: 5.0,
        reviews: []
      };
      setProducts([newProd, ...products]);
      alert('New luxury item added to Gift Marketplace!');
    }

    // Reset fields
    setInvId('');
    setInvName('');
    setInvPrice(0);
    setInvCategory('perfumes');
    setInvDescription('');
    setInvImage('');
    setUploadingImageName('');
    setIsInvModalOpen(false);
  };

  const handleEditProductClick = (p: Product) => {
    setInvId(p.id);
    setInvName(p.name);
    setInvPrice(p.price);
    setInvCategory(p.category);
    setInvDescription(p.description);
    setInvImage(p.image);
    setIsInvModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this item from the inventory?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
    }
  };

  const handleSaveVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendBusinessName.trim() || !vendCeoName.trim() || !vendPhone.trim() || !vendAddress.trim()) {
      alert('Please fill out all vendor details.');
      return;
    }

    if (vendId) {
      // Editing
      const updated = vendors.map(v => v.id === vendId ? {
        ...v,
        businessName: vendBusinessName,
        ceoName: vendCeoName,
        phone: vendPhone,
        address: vendAddress,
        category: vendCategory
      } : v);
      setVendors(updated);
      alert('Vendor details updated successfully!');
    } else {
      // Creating
      const newVend: Vendor = {
        id: `v-${Date.now()}`,
        businessName: vendBusinessName,
        ceoName: vendCeoName,
        phone: vendPhone,
        address: vendAddress,
        category: vendCategory,
        status: 'active'
      };
      setVendors([newVend, ...vendors]);
      alert('New vendor partner registered successfully!');
    }

    // Reset fields
    setVendId('');
    setVendBusinessName('');
    setVendCeoName('');
    setVendPhone('');
    setVendAddress('');
    setVendCategory('florist');
    setIsVendModalOpen(false);
  };

  const handleEditVendorClick = (v: Vendor) => {
    setVendId(v.id);
    setVendBusinessName(v.businessName);
    setVendCeoName(v.ceoName);
    setVendPhone(v.phone);
    setVendAddress(v.address);
    setVendCategory(v.category);
    setIsVendModalOpen(true);
  };

  const handleDeleteVendor = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      const updated = vendors.filter(v => v.id !== id);
      setVendors(updated);
    }
  };

  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanningLoading(true);
    setPlannedItinerary(null);
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: planRecipientName,
          relationship: planRelationship,
          occasion: planOccasion,
          personality: planPersonality,
          budgetTier: planBudgetTier,
          preferences: planPreferences
        })
      });
      if (response.ok) {
        const data = await response.json();
        setPlannedItinerary(data);
      } else {
        throw new Error('Itinerary generation failed');
      }
    } catch (err) {
      console.error(err);
      // Offline fallback:
      const budgetVal = planBudgetTier === 'royal' ? 1200000 : planBudgetTier === 'diamond' ? 500000 : 180000;
      setPlannedItinerary({
        themeName: `The Bespoke ${planOccasion} Sanctuary`,
        totalPrice: budgetVal,
        plannerAdvice: `Our senior concierge recommends soft lighting and an acoustic soundtrack tailored for ${planRecipientName || 'your recipient'}.`,
        steps: [
          { time: "18:00", title: "Handmade Wax-Sealed Note Delivery", description: `Our delivery partner presents a custom luxury calligraphy note to ${planRecipientName || 'them'} in gold ink.`, estimatedCost: Math.round(budgetVal * 0.15) },
          { time: "19:15", title: "Arrival & Sweet Serenade", description: "Doors open to a private violin solo and beautiful rose path walkways.", estimatedCost: Math.round(budgetVal * 0.5) },
          { time: "20:30", title: "Bespoke Gift Box Unveiling", description: "Presenting the curated premium chocolates and French perfumes.", estimatedCost: Math.round(budgetVal * 0.35) }
        ]
      });
    } finally {
      setIsPlanningLoading(false);
    }
  };

  const fetchCrmForecasts = async () => {
    setIsCrmLoading(true);
    try {
      const response = await fetch('/api/crm-forecasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: recipients,
          occasions: occasions
        })
      });
      if (response.ok) {
        const data = await response.json();
        setCrmForecasts(data.forecasts || []);
      } else {
        throw new Error('CRM forecasts fetch failed');
      }
    } catch (err) {
      console.error(err);
      // Hardcoded fallback that includes user's custom recipients if available!
      const mainRec = recipients[0] || { name: "Sarah", relationship: "Spouse" };
      setCrmForecasts([
        {
          recipientName: mainRec.name,
          relationship: mainRec.relationship,
          occasion: occasions[0]?.title || "Upcoming Anniversary Milestone",
          daysAway: 18,
          forecastDate: "In 18 Days",
          description: `Based on your luxury profiling, last year you surprise-gifted a curated chocolate and rose collection to ${mainRec.name}. For this upcoming milestone, we predict she would be deeply moved by our Diamond-tier Room Decor setup with fresh flower petal pathways and LED soft candle arrangements, customized in her favorite theme.`,
          recommendedProducts: [
            { name: "Enchanted Room Decor Installation", reason: "Features over 200 fresh roses, custom balloon archways, and ambient candlepaths.", price: 185000 },
            { name: "Ambre Impérial Oud Perfume", reason: "Exquisite fragrance that perfectly complements her favorite theme.", price: 45000 }
          ]
        }
      ]);
    } finally {
      setIsCrmLoading(false);
    }
  };

  // Auto trigger CRM calculation on component mount or whenever recipients/occasions are modified
  useEffect(() => {
    fetchCrmForecasts();
  }, [recipients, occasions]);

  return (
    <div id="lunara-customer-dashboard" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Profile */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 sm:p-8 border border-stone-850 shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-serif text-2xl font-bold text-stone-950 shadow-md">
              PU
            </div>
            <div>
              <h2 className="font-serif text-2xl font-light text-white">Welcome back, Precious!</h2>
              <span className="text-xs text-stone-400 mt-0.5 block">Premium Concierge Member</span>
            </div>
          </div>
          <div className="flex gap-4 text-center">
            <div className="bg-stone-950/40 px-4 py-2.5 rounded-2xl border border-stone-800">
              <span className="block text-[10px] text-stone-500 uppercase font-semibold">Active Orders</span>
              <span className="text-lg font-serif font-bold text-amber-400">{orders.length}</span>
            </div>
            <div className="bg-stone-950/40 px-4 py-2.5 rounded-2xl border border-stone-800">
              <span className="block text-[10px] text-stone-500 uppercase font-semibold">Bookings</span>
              <span className="text-lg font-serif font-bold text-amber-400">{bookings.length}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Row */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 border-b border-stone-200 scrollbar-none">
          {[
            { id: 'orders', label: 'All Orders', icon: Package },
            { id: 'bookings', label: 'All Bookings', icon: Clock },
            { id: 'users', label: 'User Registry', icon: ShieldCheck },
            { id: 'inventory', label: 'Manage Inventory', icon: ShoppingBag },
            { id: 'vendors_list', label: 'Vendor Directory', icon: FileText },
            { id: 'qr_code', label: 'QR Code Portal', icon: Download },
            { id: 'itinerary', label: 'Surprise Planner (AI)', icon: Sparkles },
            { id: 'crm', label: 'Relationship CRM & Forecasts', icon: TrendingUp },
            { id: 'recipients', label: 'Saved Recipients', icon: Users },
            { id: 'occasions', label: 'Saved Occasions', icon: Calendar },
            { id: 'wishlist', label: 'My Wishlist', icon: Heart }
          ].map((subTab) => {
            const Icon = subTab.icon;
            return (
              <button
                key={subTab.id}
                onClick={() => setActiveSubTab(subTab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === subTab.id
                    ? 'bg-stone-900 text-amber-400 shadow-md border-transparent'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {subTab.label}
              </button>
            );
          })}
        </div>

        {/* Workspace Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main List Display Column */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm min-h-[400px]">
            
            {/* Tab 1: Track Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-light text-stone-900 border-b border-stone-100 pb-3">My Orders History</h3>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                    <p className="text-stone-400 text-xs">No active orders yet. Choose a gift to get started!</p>
                    <button onClick={() => setActiveTab('gifts')} className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-stone-900 text-amber-400">Shop Marketplace</button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div key={ord.id} className="border border-stone-200 rounded-2xl p-5 bg-stone-50 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-3">
                          <div>
                            <span className="text-[10px] uppercase text-stone-400 font-bold">Order ID: {ord.id}</span>
                            <span className="block text-xs text-stone-600 mt-0.5">Placed on: {ord.date}</span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                            ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                          }`}>
                            {ord.status.toUpperCase()}
                          </span>
                        </div>

                        {/* Items in this order */}
                        <div className="space-y-3">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex gap-4 text-xs">
                              <img src={it.image} alt={it.name} className="h-12 w-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                              <div>
                                <h4 className="font-bold text-stone-900">{it.name} <span className="text-stone-400 text-[10px]">x{it.quantity}</span></h4>
                                <span className="text-[10px] text-stone-400 block truncate max-w-xs">{it.details}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Ship details */}
                        <div className="pt-3 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-[10px] uppercase text-stone-400 font-bold block">Recipient</span>
                            <span className="font-semibold text-stone-800 mt-0.5 block">{ord.recipientName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-stone-400 font-bold block">Delivery Target</span>
                            <span className="font-semibold text-stone-800 mt-0.5 block">{ord.deliveryDate} ({ord.address})</span>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-between items-center">
                          <span className="text-[10px] text-stone-400 uppercase font-semibold">Total Invoice Paid</span>
                          <span className="font-mono text-sm font-bold text-stone-900">₦{ord.total.toLocaleString()}</span>
                        </div>

                        {setOrders && (
                          <div className="pt-3 border-t border-stone-150 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-stone-500 font-bold uppercase font-sans">Modify Status:</span>
                              <select
                                value={ord.status}
                                onChange={(e) => {
                                  const nextStatus = e.target.value as any;
                                  setOrders(prev => prev.map(o => o.id === ord.id ? { ...o, status: nextStatus } : o));
                                }}
                                className="text-[11px] bg-white border border-stone-200 rounded px-2 py-1 text-stone-700 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </div>
                            <button
                              onClick={() => {
                                if (confirm('Remove order record?')) {
                                  setOrders(prev => prev.filter(o => o.id !== ord.id));
                                }
                              }}
                              className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                              title="Delete Order"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: My Bookings */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-light text-stone-900 border-b border-stone-100 pb-3">My Bookings Timeline</h3>
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                    <p className="text-stone-400 text-xs">No active decor installations or experiences booked.</p>
                    <button onClick={() => setActiveTab('decor')} className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-stone-900 text-amber-400">Book Room Decor</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((bk) => (
                      <div key={bk.id} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-stone-900">{bk.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-blue-100 text-blue-800">
                              {bk.status}
                            </span>
                          </div>
                          <span className="block text-[10px] text-stone-500 mt-1">Installation Target: {bk.date} at {bk.time}</span>
                          <span className="block text-[10px] text-stone-400 mt-0.5">Venue Location: {bk.location}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                          <span className="font-mono text-xs font-bold text-stone-900">₦{bk.price.toLocaleString()}</span>
                          {setBookings && (
                            <div className="flex items-center gap-2">
                              <select
                                value={bk.status}
                                onChange={(e) => {
                                  const nextStatus = e.target.value as any;
                                  setBookings(prev => prev.map(b => b.id === bk.id ? { ...b, status: nextStatus } : b));
                                }}
                                className="text-[11px] bg-white border border-stone-200 rounded px-2 py-0.5 text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                              </select>
                              <button
                                onClick={() => {
                                  if (confirm('Cancel and delete booking?')) {
                                    setBookings(prev => prev.filter(b => b.id !== bk.id));
                                  }
                                }}
                                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                                title="Cancel Booking"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: User Registry */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-lg font-light text-stone-900">Registered Client Registry</h3>
                    <p className="text-stone-400 text-xs">Track all luxury clients registered on the Lunara platform.</p>
                  </div>
                  <div className="bg-amber-500/10 text-amber-900 border border-amber-500/20 px-3 py-1.5 rounded-full text-xs font-mono font-bold">
                    Total Clients: {registeredUsers.length}
                  </div>
                </div>

                <div className="space-y-4">
                  {registeredUsers.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                      <p className="text-stone-400 text-xs">No registered clients found in system storage.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-3 px-2">Client ID</th>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Email</th>
                            <th className="py-3 px-2">Join Date</th>
                            <th className="py-3 px-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {registeredUsers.map((usr) => (
                            <tr key={usr.id} className="hover:bg-stone-50 text-stone-700">
                              <td className="py-3 px-2 font-mono text-stone-400">{usr.id}</td>
                              <td className="py-3 px-2 font-semibold text-stone-900">{usr.name}</td>
                              <td className="py-3 px-2 font-mono">{usr.email}</td>
                              <td className="py-3 px-2">{new Date(usr.registeredAt).toLocaleDateString()}</td>
                              <td className="py-3 px-2 text-right">
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to remove ${usr.name}?`)) {
                                      setRegisteredUsers(prev => prev.filter(u => u.id !== usr.id));
                                    }
                                  }}
                                  className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Manage Inventory */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-lg font-light text-stone-900">Manage Marketplace Inventory</h3>
                    <p className="text-stone-400 text-xs">Add, edit, and delete items from your premium catalog.</p>
                  </div>
                  <button
                    onClick={() => {
                      setInvId('');
                      setInvName('');
                      setInvPrice(0);
                      setInvCategory('perfumes');
                      setInvDescription('');
                      setInvImage('');
                      setIsInvModalOpen(true);
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-stone-900 text-amber-400 rounded-full text-xs font-semibold hover:bg-stone-800 transition-all shadow-md"
                  >
                    <Plus className="h-4 w-4" /> Add Item
                  </button>
                </div>

                {isInvModalOpen && (
                  <form onSubmit={handleSaveProduct} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 animate-fade-in">
                    <h4 className="font-serif text-sm font-semibold text-stone-900">
                      {invId ? 'Edit Luxury Item' : 'Add New Luxury Item'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Item Title / Name</label>
                        <input
                          type="text"
                          value={invName}
                          onChange={(e) => setInvName(e.target.value)}
                          className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                          placeholder="e.g. Maison Noire - Black Amber"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Price (₦ Naira)</label>
                        <input
                          type="number"
                          value={invPrice || ''}
                          onChange={(e) => setInvPrice(Number(e.target.value))}
                          className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                          placeholder="e.g. 135000"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Category</label>
                        <select
                          value={invCategory}
                          onChange={(e) => setInvCategory(e.target.value as any)}
                          className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="perfumes">Perfumes</option>
                          <option value="flowers">Flowers</option>
                          <option value="cakes">Cakes</option>
                          <option value="chocolates">Chocolates</option>
                          <option value="jewelry">Jewelry</option>
                          <option value="fashion">Fashion</option>
                          <option value="gadgets">Gadgets</option>
                          <option value="plushies">Plushies</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2 text-stone-900">
                        <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Product Image</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-stone-400 block mb-1">Option A: Paste Image URL</span>
                            <input
                              type="text"
                              value={invImage.startsWith('data:') ? '' : invImage}
                              onChange={(e) => {
                                setInvImage(e.target.value);
                                setUploadingImageName('');
                              }}
                              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                              placeholder="Unsplash URL, etc."
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-400 block mb-1">Option B: Upload Image File</span>
                            <div className="relative border border-dashed border-stone-300 hover:border-amber-500 transition-colors rounded-xl p-2 flex flex-col items-center justify-center bg-white cursor-pointer h-9">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <div className="flex items-center gap-1 text-stone-500 hover:text-amber-500 transition-colors">
                                <Upload className="h-4 w-4" />
                                <span className="text-[10px] font-semibold truncate max-w-[150px]">
                                  {uploadingImageName ? uploadingImageName : 'Choose image file'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {invImage && (
                          <div className="mt-2 flex items-center gap-3 bg-white p-2 border border-stone-150 rounded-xl animate-fade-in">
                            <img src={invImage} alt="Preview" className="h-10 w-10 object-cover rounded-lg border" referrerPolicy="no-referrer" />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-mono text-stone-400 block truncate">{invImage}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setInvImage('');
                                setUploadingImageName('');
                              }}
                              className="text-stone-400 hover:text-rose-500 p-1 text-[10px] font-semibold"
                            >
                              Clear
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Description</label>
                      <textarea
                        value={invDescription}
                        onChange={(e) => setInvDescription(e.target.value)}
                        rows={3}
                        className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                        placeholder="Describe the luxury details of this product..."
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsInvModalOpen(false)}
                        className="px-4 py-1.5 border border-stone-200 text-stone-500 hover:bg-stone-100 rounded-full text-xs transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-1.5 bg-stone-900 text-amber-400 hover:bg-stone-850 rounded-full text-xs font-semibold transition-all"
                      >
                        {invId ? 'Save Changes' : 'Publish Item'}
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="border border-stone-200 rounded-2xl p-4 flex gap-4 bg-stone-50 relative group">
                      <img src={p.image} alt={p.name} className="h-20 w-20 object-cover rounded-xl border border-stone-200/60" referrerPolicy="no-referrer" />
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-amber-600 font-mono font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                            {p.category}
                          </span>
                          <h4 className="text-xs font-bold text-stone-900 mt-1">{p.name}</h4>
                          <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{p.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-stone-150">
                          <span className="font-mono text-xs font-semibold text-stone-900">₦{p.price.toLocaleString()}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProductClick(p)}
                              className="text-[10px] bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 px-2 py-1 rounded-full transition-all font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="text-[10px] bg-rose-50 text-rose-600 hover:bg-rose-100 px-2 py-1 rounded-full transition-all font-semibold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Vendor Directory */}
            {activeTab === 'vendors_list' && (
              <div className="space-y-6">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-lg font-light text-stone-900">Partner Vendor Directory</h3>
                    <p className="text-stone-400 text-xs">Manage your registered florists, bakers, decorators, and spa specialists.</p>
                  </div>
                  <button
                    onClick={() => {
                      setVendId('');
                      setVendBusinessName('');
                      setVendCeoName('');
                      setVendPhone('');
                      setVendAddress('');
                      setVendCategory('florist');
                      setIsVendModalOpen(true);
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-stone-900 text-amber-400 rounded-full text-xs font-semibold hover:bg-stone-800 transition-all shadow-md"
                  >
                    <Plus className="h-4 w-4" /> Add Vendor
                  </button>
                </div>

                {isVendModalOpen && (
                  <form onSubmit={handleSaveVendor} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 animate-fade-in">
                    <h4 className="font-serif text-sm font-semibold text-stone-900">
                      {vendId ? 'Edit Vendor Details' : 'Register New Vendor Partner'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Business Name</label>
                        <input
                          type="text"
                          value={vendBusinessName}
                          onChange={(e) => setVendBusinessName(e.target.value)}
                          className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                          placeholder="e.g. Royal Sprinkles Bakery"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">CEO Name</label>
                        <input
                          type="text"
                          value={vendCeoName}
                          onChange={(e) => setVendCeoName(e.target.value)}
                          className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                          placeholder="e.g. Chisom Okafor"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={vendPhone}
                          onChange={(e) => setVendPhone(e.target.value)}
                          className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                          placeholder="e.g. +234 812 345 6789"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Service Category</label>
                        <select
                          value={vendCategory}
                          onChange={(e) => setVendCategory(e.target.value as any)}
                          className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="decorator">Room Decorator</option>
                          <option value="florist">Florist</option>
                          <option value="baker">Baker / Cake Artist</option>
                          <option value="photographer">Photographer</option>
                          <option value="spa">Spa & Wellness Center</option>
                          <option value="restaurant">Private Dining / Chef</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 font-bold mb-1">Business Address</label>
                      <input
                        type="text"
                        value={vendAddress}
                        onChange={(e) => setVendAddress(e.target.value)}
                        className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                        placeholder="Physical workshop or store location..."
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsVendModalOpen(false)}
                        className="px-4 py-1.5 border border-stone-200 text-stone-500 hover:bg-stone-100 rounded-full text-xs transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-1.5 bg-stone-900 text-amber-400 hover:bg-stone-850 rounded-full text-xs font-semibold transition-all"
                      >
                        {vendId ? 'Save Changes' : 'Register Vendor'}
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {vendors.map((v) => (
                    <div key={v.id} className="border border-stone-200 rounded-2xl p-5 bg-stone-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-sm transition-all">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-stone-950">{v.businessName}</h4>
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 tracking-wider">
                            {v.category}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-[11px] text-stone-600 font-sans">
                          <div><span className="text-stone-400 font-semibold">CEO:</span> {v.ceoName}</div>
                          <div><span className="text-stone-400 font-semibold">Phone:</span> {v.phone}</div>
                          <div className="sm:col-span-2 mt-0.5"><span className="text-stone-400 font-semibold">Address:</span> {v.address}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                        <button
                          onClick={() => handleEditVendorClick(v)}
                          className="text-[10px] bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 px-3 py-1 rounded-full transition-all font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteVendor(v.id)}
                          className="text-[10px] bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1 rounded-full transition-all font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: QR Code Portal */}
            {activeTab === 'qr_code' && (() => {
              const qrData = typeof window !== 'undefined' ? `${window.location.origin}?tab=gifts` : 'https://lunara-bespoke.com/gifts';
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&color=f59e0b&bgcolor=0c0a09&data=${encodeURIComponent(qrData)}`;

              const handleDownloadQR = async () => {
                try {
                  const response = await fetch(qrUrl);
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `lunara-marketplace-qr.png`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                } catch (err) {
                  window.open(qrUrl, '_blank');
                }
              };

              const handlePrintQR = () => {
                const printWindow = window.open('', '_blank', 'width=600,height=600');
                if (printWindow) {
                  printWindow.document.write(`
                    <html>
                      <head>
                        <title>Print QR Code - Lunara Gifting</title>
                        <style>
                          body {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            font-family: 'Inter', sans-serif;
                            margin: 0;
                            height: 100vh;
                            background-color: #ffffff;
                          }
                          .container {
                            text-align: center;
                            border: 2px solid #1c1917;
                            padding: 40px;
                            border-radius: 24px;
                            max-width: 400px;
                          }
                          img {
                            width: 300px;
                            height: 300px;
                            margin-bottom: 20px;
                            border-radius: 12px;
                          }
                          h1 {
                            font-size: 26px;
                            font-weight: 300;
                            letter-spacing: 0.1em;
                            margin: 0 0 5px 0;
                            color: #0c0a09;
                            text-transform: uppercase;
                          }
                          p {
                            font-size: 13px;
                            color: #57534e;
                            margin: 0;
                          }
                          .url {
                            font-family: monospace;
                            background: #f5f5f4;
                            padding: 6px 12px;
                            border-radius: 8px;
                            font-size: 11px;
                            margin-top: 15px;
                            color: #1c1917;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <h1>LUNARA</h1>
                          <p style="margin-bottom: 25px; text-transform: uppercase; letter-spacing: 0.05em; font-size: 11px; color: #78716c;">Nigeria's Premier Experiential Gifting Suite</p>
                          <img src="${qrUrl}" alt="QR Code" />
                          <p style="font-weight: 500; font-size: 12px;">Scan with any phone camera to access the marketplace</p>
                          <div class="url">${qrData}</div>
                        </div>
                        <script>
                          window.onload = function() {
                            setTimeout(function() {
                              window.print();
                              window.close();
                            }, 800);
                          }
                        </script>
                      </body>
                    </html>
                  `);
                  printWindow.document.close();
                }
              };

              return (
                <div className="space-y-6">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="font-serif text-lg font-light text-stone-900">Bespoke Marketing QR Generator</h3>
                    <p className="text-stone-400 text-xs">Generate, print, and download premium QR codes to guide clients instantly to the Gifting Suite.</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-6 bg-stone-950 p-8 rounded-3xl border border-stone-800">
                    <div className="p-4 bg-stone-900 border border-stone-800 rounded-3xl flex items-center justify-center">
                      <div className="p-3 bg-stone-950 border border-stone-800 rounded-2xl">
                        <img
                          src={qrUrl}
                          alt="Bespoke Lunara QR Code"
                          className="w-48 h-48 sm:w-60 sm:h-60 rounded-xl border border-stone-900"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="text-center md:text-left space-y-4 max-w-sm">
                      <span className="text-[9px] uppercase tracking-wider text-amber-500 font-mono font-bold bg-amber-500/10 px-2 py-1 rounded">
                        Interactive Marketing Tool
                      </span>
                      <h4 className="font-serif text-lg text-white font-light">Bring physical visitors to the digital atelier</h4>
                      <p className="text-xs text-stone-400 leading-relaxed font-light">
                        Print this QR code to place on gift tags, hotel lobby cards, concierge pamphlets, or bakery boxes, directing your clients directly to the Lunara Gifting Marketplace.
                      </p>

                      <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-850">
                        <span className="text-[10px] font-mono text-stone-500 uppercase block">Configured Endpoint URL</span>
                        <span className="text-xs font-mono text-amber-400 block truncate mt-1">{qrData}</span>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
                        <button
                          onClick={handlePrintQR}
                          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-full text-xs font-bold transition-all shadow-md"
                        >
                          <FileText className="h-4 w-4" /> Print QR Code
                        </button>
                        <button
                          onClick={handleDownloadQR}
                          className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-850 border border-stone-750 text-stone-300 hover:text-white rounded-full text-xs font-semibold transition-all"
                        >
                          <Download className="h-4 w-4" /> Download PNG
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Tab: Surprise Planner (AI) */}
            {activeTab === 'itinerary' && (
              <div className="space-y-8 font-sans text-stone-900">
                <div className="border-b border-stone-100 pb-4">
                  <span className="text-[10px] bg-amber-500/10 text-amber-800 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">Milestone surprise planner</span>
                  <h3 className="font-serif text-2xl font-light text-stone-950 mt-2">Bespoke Scenario Generator</h3>
                  <p className="text-stone-500 text-xs mt-1">
                    Design a premium, theatrical, step-by-step surprise timeline for your recipient. Customize, price, and print or save the final itinerary.
                  </p>
                </div>

                {/* Setup workspace */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Setup Form */}
                  <form onSubmit={handleGenerateItinerary} className="md:col-span-5 bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-4">
                    <h4 className="font-serif text-sm font-semibold text-stone-900 flex items-center gap-1.5 border-b border-stone-200/60 pb-2">
                      <Sparkles className="h-4 w-4 text-amber-500" /> Setup Surprise Profile
                    </h4>

                    {/* Pre-fill from Saved Recipients if available */}
                    {recipients.length > 0 && (
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block">Link Saved Recipient</label>
                        <select
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                              const r = recipients.find(x => x.id === val);
                              if (r) {
                                setPlanRecipientName(r.name);
                                setPlanRelationship(r.relationship);
                                if (r.interests && r.interests.length > 0) {
                                  setPlanPersonality(`Likes ${r.interests.join(', ')}. Colors: ${r.favoriteColor || 'Pink'}. Notes: ${r.notes || ''}`);
                                } else {
                                  setPlanPersonality(`Thoughtful individual who likes ${r.favoriteColor || 'elegant surprises'}. Notes: ${r.notes || ''}`);
                                }
                              }
                            }
                          }}
                          className="w-full px-2 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
                        >
                          <option value="">-- Choose to auto-fill details --</option>
                          {recipients.map(r => (
                            <option key={r.id} value={r.id}>{r.name} ({r.relationship})</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block">Recipient Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Sarah, Chief Adeleke..."
                          value={planRecipientName}
                          onChange={(e) => setPlanRecipientName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block">Relationship</label>
                        <input
                          type="text"
                          required
                          placeholder="Spouse, Client..."
                          value={planRelationship}
                          onChange={(e) => setPlanRelationship(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block">Occasion</label>
                      <select
                        value={planOccasion}
                        onChange={(e) => setPlanOccasion(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
                      >
                        <option value="Wedding Proposal">Wedding Proposal</option>
                        <option value="1st Anniversary">1st Anniversary</option>
                        <option value="5th Anniversary">5th Anniversary</option>
                        <option value="Birthday Extravaganza">Birthday Extravaganza</option>
                        <option value="Corporate Appreciation">Corporate Appreciation</option>
                        <option value="Apology/Reconciliation">Apology & Reconciliation</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block">Personality Profile</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="e.g. Loves sensory experiences, deeply artistic, private but likes grand gestures."
                        value={planPersonality}
                        onChange={(e) => setPlanPersonality(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block">Budget Tier Allocation</label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: 'premium', label: '₦180k+', desc: 'Premium Curation' },
                          { id: 'diamond', label: '₦500k+', desc: 'Diamond Elite' },
                          { id: 'royal', label: '₦1.2M+', desc: 'Royal Prestige' }
                        ].map(tier => (
                          <button
                            type="button"
                            key={tier.id}
                            onClick={() => setPlanBudgetTier(tier.id as any)}
                            className={`p-2 rounded-xl border text-center transition-all ${
                              planBudgetTier === tier.id
                                ? 'bg-stone-900 border-transparent text-amber-400 font-bold'
                                : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            <span className="block text-xs">{tier.label}</span>
                            <span className="text-[7px] text-stone-400 block leading-tight">{tier.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block">Bespoke Preferences</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Include private violin solo, a sunset cruise, or customized perfume box."
                        value={planPreferences}
                        onChange={(e) => setPlanPreferences(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPlanningLoading}
                      className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                    >
                      {isPlanningLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Architecting bespoke scenario...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Generate Surprise Itinerary</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Planned Itinerary Workspace Screen */}
                  <div className="md:col-span-7 space-y-4">
                    {!plannedItinerary && !isPlanningLoading && (
                      <div className="border border-dashed border-stone-300 rounded-3xl p-12 text-center text-stone-400 space-y-3 bg-white">
                        <FileText className="h-10 w-10 mx-auto text-stone-300 animate-pulse" />
                        <p className="text-xs">No active surprise timeline compiled.</p>
                        <p className="text-[10px] text-stone-500 max-w-sm mx-auto">
                          Provide your recipient's profile and budget tier, then click Generate to construct an exquisite, hourly theatrical surprise plan.
                        </p>
                      </div>
                    )}

                    {isPlanningLoading && (
                      <div className="border border-stone-100 rounded-3xl p-16 text-center text-stone-400 space-y-4 bg-stone-50/50">
                        <div className="h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <span className="text-xs font-mono tracking-widest uppercase text-stone-500 block">Gemini is sketching theatrical sequences...</span>
                      </div>
                    )}

                    {plannedItinerary && (
                      <div className="space-y-4">
                        
                        {/* Interactive Edit and Pricing parchment board */}
                        <div id="print-itinerary-area" className="bg-[#fcfaf5] border-4 border-[#e6d9b8] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden font-serif text-[#4a3f2d]">
                          <div className="absolute inset-2 border border-[#e6d9b8]/50 rounded-2xl pointer-events-none" />
                          
                          {/* Top Heading details */}
                          <div className="text-center space-y-2 border-b border-[#e6d9b8]/80 pb-4 relative z-10">
                            <span className="text-[10px] font-mono tracking-widest text-amber-600 uppercase font-semibold">
                              LUNARA SURPRISE HOUSE TIMELINE
                            </span>
                            <div className="px-4">
                              <input
                                type="text"
                                value={editableThemeName}
                                onChange={(e) => setEditableThemeName(e.target.value)}
                                className="w-full bg-transparent text-center text-xl sm:text-2xl font-light tracking-wide text-stone-850 focus:outline-none border-b border-transparent hover:border-[#e6d9b8] focus:border-amber-500 py-1 font-serif italic"
                              />
                            </div>
                            <p className="text-[10px] text-stone-400 font-mono">
                              Specially crafted for {planRecipientName || 'Beloved'} &bull; Occasion: {planOccasion}
                            </p>
                          </div>

                          {/* Planner expert advice */}
                          <div className="mt-4 p-3 bg-[#f6f2e6] border border-[#e6d9b8]/60 rounded-xl text-xs italic text-[#5c4e36] font-light leading-relaxed">
                            <span className="font-bold not-italic font-mono text-[9px] uppercase text-amber-700 block mb-1">Surprise Architect's Tip:</span>
                            <textarea
                              rows={2}
                              value={editablePlannerAdvice}
                              onChange={(e) => setEditablePlannerAdvice(e.target.value)}
                              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-[#5c4e36] italic text-xs leading-relaxed resize-none p-0"
                            />
                          </div>

                          {/* Step list - editable */}
                          <div className="mt-6 space-y-6 relative border-l-2 border-[#e6d9b8] pl-5 ml-2.5">
                            {editableSteps.map((step, idx) => (
                              <div key={idx} className="relative space-y-2 group">
                                {/* Dot indicator */}
                                <div className="absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full bg-amber-500 border-2 border-[#fcfaf5] shadow-sm" />
                                
                                <div className="flex gap-2 items-center justify-between">
                                  {/* Time field */}
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={step.time}
                                      onChange={(e) => {
                                        const updated = [...editableSteps];
                                        updated[idx].time = e.target.value;
                                        setEditableSteps(updated);
                                      }}
                                      className="w-14 bg-[#f6f2e6] border border-[#e6d9b8] text-center text-xs rounded px-1 py-0.5 font-mono text-amber-800 focus:outline-none"
                                    />
                                    {/* Title field */}
                                    <input
                                      type="text"
                                      value={step.title}
                                      onChange={(e) => {
                                        const updated = [...editableSteps];
                                        updated[idx].title = e.target.value;
                                        setEditableSteps(updated);
                                      }}
                                      className="font-bold text-xs text-stone-850 bg-transparent border-b border-transparent hover:border-[#e6d9b8] focus:border-amber-500 focus:outline-none py-0.5 font-sans max-w-[180px] sm:max-w-xs"
                                    />
                                  </div>

                                  {/* Price Input & Delete button */}
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-mono">₦</span>
                                    <input
                                      type="number"
                                      value={step.estimatedCost}
                                      onChange={(e) => {
                                        const updated = [...editableSteps];
                                        updated[idx].estimatedCost = Number(e.target.value) || 0;
                                        setEditableSteps(updated);
                                      }}
                                      className="w-20 bg-[#f6f2e6] border border-[#e6d9b8] text-right text-xs rounded px-1.5 py-0.5 font-mono focus:outline-none font-semibold text-stone-800"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setEditableSteps(prev => prev.filter((_, i) => i !== idx))}
                                      className="p-1 rounded text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>

                                {/* Step Description textarea */}
                                <textarea
                                  rows={2}
                                  value={step.description}
                                  onChange={(e) => {
                                    const updated = [...editableSteps];
                                    updated[idx].description = e.target.value;
                                    setEditableSteps(updated);
                                  }}
                                  className="w-full bg-transparent text-[11px] leading-relaxed text-[#5c4e36] font-light font-serif focus:outline-none border border-transparent hover:border-[#e6d9b8] focus:border-amber-500 p-1 rounded resize-none"
                                />
                              </div>
                            ))}
                          </div>

                          {/* Controls to add custom step */}
                          <div className="mt-6 pt-4 border-t border-[#e6d9b8]/60 flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => {
                                setEditableSteps(prev => [...prev, {
                                  time: "20:30",
                                  title: "Bespoke Grand Unveiling",
                                  description: "Write custom details of your surprise interaction here...",
                                  estimatedCost: 25000
                                }]);
                              }}
                              className="text-[10px] font-mono font-semibold uppercase text-amber-700 hover:text-amber-800 flex items-center gap-1"
                            >
                              <Plus className="h-3.5 w-3.5" /> Add Surprise Event
                            </button>

                            <div className="text-right">
                              <span className="text-[10px] font-mono uppercase text-stone-400 block">Dynamic Grand Total:</span>
                              <span className="font-mono text-sm font-bold text-stone-900">
                                ₦{editableSteps.reduce((sum, s) => sum + (Number(s.estimatedCost) || 0), 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Outer Action buttons */}
                        <div className="flex gap-3 justify-end">
                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="px-4 py-2 bg-stone-900 text-amber-400 hover:bg-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                          >
                            <Download className="h-4 w-4" /> Download PDF Itinerary
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Surprise Scenario "${editableThemeName}" linked to your active reservation! Our local Nigerian coordinator has been briefed with your customized schedule.`);
                            }}
                            className="px-4 py-2 bg-gradient-to-tr from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-bold rounded-xl transition-colors shadow-sm"
                          >
                            Confirm Scenario Itinerary
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Relationship CRM & Forecasts */}
            {activeTab === 'crm' && (
              <div className="space-y-8 font-sans text-stone-900">
                <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
                      AI CRM Gifting forecasting ACTIVE
                    </span>
                    <h3 className="font-serif text-2xl font-light text-stone-950 mt-2">Predictive Milestone Alerts</h3>
                    <p className="text-stone-500 text-xs mt-1">
                      Our system analyzes logged recipient profiles to predict upcoming events and deliver targeted luxury proposals.
                    </p>
                  </div>
                  <button
                    onClick={fetchCrmForecasts}
                    className="self-start sm:self-auto px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded-xl flex items-center gap-1.5 border border-stone-200 transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Recalculate Alerts
                  </button>
                </div>

                {isCrmLoading ? (
                  <div className="py-20 text-center space-y-4 bg-stone-50/50 rounded-3xl border border-stone-100">
                    <div className="h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <span className="text-xs font-mono tracking-widest text-stone-500 uppercase block">Running predictive analysis algorithms...</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {crmForecasts.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-stone-200 rounded-2xl bg-white space-y-2">
                        <Bell className="h-10 w-10 text-stone-300 mx-auto" />
                        <p className="text-stone-500 text-xs">No CRM alerts computed.</p>
                        <p className="text-[10px] text-stone-400">Add saved recipients or save surprise occasions on the side to generate predictive notifications!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {crmForecasts.map((f, idx) => (
                          <div key={idx} className="bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row gap-6 relative overflow-hidden">
                            {/* Color bar indicator */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                              f.daysAway <= 20 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />

                            {/* Alert main body */}
                            <div className="flex-1 space-y-3.5 pl-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                  f.daysAway <= 20 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {f.forecastDate} ({f.daysAway} days away)
                                </span>
                                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-tight">
                                  {f.recipientName} ({f.relationship}) &bull; {f.occasion}
                                </h4>
                              </div>

                              <p className="text-stone-700 text-xs sm:text-sm font-light leading-relaxed">
                                {f.description}
                              </p>

                              {/* Interactive Action pathways */}
                              <div className="pt-2 flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Set states on scenario planner
                                    setPlanRecipientName(f.recipientName);
                                    setPlanRelationship(f.relationship);
                                    setPlanOccasion(f.occasion);
                                    setPlanPersonality(`Target recipient is ${f.recipientName}, relationship is ${f.relationship}.`);
                                    setPlanPreferences(`Recommends: ${f.recommendedProducts[0]?.name || ''}`);
                                    // Change subtab
                                    setActiveSubTab('itinerary');
                                    // Smooth scroll to top of customer dashboard workspace
                                    const element = document.getElementById('lunara-customer-dashboard');
                                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold rounded-lg flex items-center gap-1 transition-colors"
                                >
                                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                  <span>Launch Custom Scenario Planner</span>
                                </button>
                              </div>
                            </div>

                            {/* Targeted Pairings Display Box */}
                            <div className="lg:w-80 bg-stone-50 border border-stone-200/60 rounded-xl p-4 flex flex-col justify-between gap-4">
                              <div>
                                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block mb-2">Curated Pairing Recommendations</span>
                                <div className="space-y-3">
                                  {f.recommendedProducts.map((p: any, pIdx: number) => (
                                    <div key={pIdx} className="space-y-0.5 text-xs">
                                      <div className="flex justify-between items-start gap-2">
                                        <h5 className="font-bold text-stone-900 truncate max-w-[150px]">{p.name}</h5>
                                        <span className="font-mono text-[10px] text-stone-500 font-bold">₦{p.price.toLocaleString()}</span>
                                      </div>
                                      <p className="text-[10px] text-stone-500 leading-normal italic font-light">{p.reason}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  // Add both curated products to cart
                                  f.recommendedProducts.forEach((p: any) => {
                                    addToCart({
                                      id: `crm-curation-${Date.now()}-${p.name}`,
                                      type: 'product',
                                      name: p.name,
                                      price: p.price,
                                      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=200',
                                      details: `CRM curating for ${f.recipientName}'s ${f.occasion}`
                                    });
                                  });
                                  alert(`Successfully added both recommended pairings to your Curated Curation Box!`);
                                }}
                                className="w-full py-1.5 border border-amber-500 text-amber-900 hover:bg-amber-500/10 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                              >
                                <ShoppingBag className="h-3.5 w-3.5" />
                                <span>Add All to Curated Box</span>
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Saved Recipients */}
            {activeTab === 'recipients' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-light text-stone-900 border-b border-stone-100 pb-3">Saved Recipients Profiling</h3>
                {recipients.length === 0 ? (
                  <p className="text-stone-400 text-xs italic text-center py-6">No saved recipients yet. Fill out the form on the side to create one!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recipients.map((rec) => (
                      <div key={rec.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 relative group">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-sm font-bold text-stone-950">{rec.name}</h4>
                            <span className="text-[10px] text-stone-400 uppercase font-bold">{rec.relationship}</span>
                          </div>
                          <button
                            onClick={() => deleteRecipient(rec.id)}
                            className="p-1.5 rounded-full hover:bg-red-50 text-red-600 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1.5 text-xs text-stone-600 font-light mt-3">
                          <div><span className="text-stone-400 text-[10px] uppercase font-bold block">Birthday Date:</span> {rec.birthday}</div>
                          <div><span className="text-stone-400 text-[10px] uppercase font-bold block">Favorite Color:</span> {rec.favoriteColor}</div>
                          {rec.interests.length > 0 && (
                            <div>
                              <span className="text-stone-400 text-[10px] uppercase font-bold block mb-1">Interests:</span>
                              <div className="flex flex-wrap gap-1">
                                {rec.interests.map((it, idx) => (
                                  <span key={idx} className="text-[9px] bg-white border border-stone-200 px-2 py-0.5 rounded-full text-stone-700">
                                    {it}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {rec.notes && (
                            <div><span className="text-stone-400 text-[10px] uppercase font-bold block">Custom Gifting Notes:</span> "{rec.notes}"</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Saved Occasions */}
            {activeTab === 'occasions' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-light text-stone-900 border-b border-stone-100 pb-3">Saved Surprises Timeline</h3>
                {occasions.length === 0 ? (
                  <p className="text-stone-400 text-xs italic text-center py-6">No saved milestone dates yet. Use the side form to add upcoming events.</p>
                ) : (
                  <div className="space-y-3">
                    {occasions.map((occ) => (
                      <div key={occ.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex justify-between items-center gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">{occ.title} <span className="text-[9px] bg-amber-500/10 text-amber-800 px-2 py-0.5 rounded-full font-bold uppercase">{occ.type}</span></h4>
                          <span className="block text-[10px] text-stone-400 mt-1">Recipient Name: {occ.recipientName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-semibold text-stone-700">{occ.date}</span>
                          <button
                            onClick={() => deleteOccasion(occ.id)}
                            className="p-1 rounded-full hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 5: My Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-light text-stone-900 border-b border-stone-100 pb-3">My Saved Wishlist</h3>
                {wishlist.length === 0 ? (
                  <p className="text-stone-400 text-xs italic text-center py-6">Your wishlist is empty. Browse gifts in the marketplace and save them!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((prodId) => {
                      const prod = PREMIUM_PRODUCTS.find(p => p.id === prodId);
                      if (!prod) return null;
                      return (
                        <div key={prod.id} className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex gap-3 relative">
                          <img src={prod.image} alt={prod.name} className="h-16 w-16 object-cover rounded-xl" referrerPolicy="no-referrer" />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-stone-900 truncate max-w-[120px]">{prod.name}</h4>
                              <span className="font-mono text-xs font-bold block text-stone-700 mt-1">₦{prod.price.toLocaleString()}</span>
                            </div>
                            <button
                              onClick={() => addToCart({
                                id: prod.id,
                                type: 'product',
                                name: prod.name,
                                price: prod.price,
                                image: prod.image,
                                details: `Wishlisted Item`
                              })}
                              className="text-[10px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" /> Add Box
                            </button>
                          </div>
                          <button
                            onClick={() => toggleWishlist(prod.id)}
                            className="absolute top-2 right-2 text-stone-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Form inputs column on the right side */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Mobile Access QR Code Card */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-950 p-6 rounded-3xl border border-stone-850 text-white shadow-lg space-y-4">
              <h3 className="font-serif text-base font-medium text-amber-400 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-500" /> Lunara Access QR Code
              </h3>
              <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                Provide quick access to clients or scan from your admin dashboard device to view the Gift Marketplace and Live Curation flow instantly.
              </p>
              <div className="flex justify-center py-2">
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-2xl flex flex-col items-center gap-1.5">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=f59e0b&bgcolor=0c0a09&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}?tab=gifts` : 'https://lunara-bespoke.com/gifts')}`} 
                    alt="Lunara Curation QR Link" 
                    className="w-32 h-32 rounded-lg border border-stone-900"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[9px] font-mono tracking-widest text-amber-500 font-semibold mt-1">LUNARA ESCORT</span>
                </div>
              </div>
              <div className="text-[10px] text-center text-stone-500 font-mono">
                Scan with standard Camera app
              </div>
            </div>

            {/* Form 1: Save Recipient profiling */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm">
              <h3 className="font-serif text-base font-medium text-stone-900 mb-2 flex items-center gap-1.5">
                <Users className="h-4 w-4 text-amber-600" /> Profiling New Recipient
              </h3>
              <p className="text-stone-400 text-[10px] mb-4">Profile details of family, partners, or corporate associates.</p>

              <form onSubmit={handleCreateRecipient} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Recipient Name (e.g. Sarah)"
                  value={recName}
                  onChange={(e) => setRecName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Relationship (e.g. Spouse, Sister)"
                  value={recRel}
                  onChange={(e) => setRecRel(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    placeholder="Birthday"
                    value={recBday}
                    onChange={(e) => setRecBday(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Favorite Color"
                    value={recColor}
                    onChange={(e) => setRecColor(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Interests (comma separated e.g. perfume, chocolate)"
                  value={recInterests}
                  onChange={(e) => setRecInterests(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50"
                />
                <textarea
                  rows={2}
                  placeholder="Special reminders (e.g. allergic to nuts, loves pink boxes)"
                  value={recNotes}
                  onChange={(e) => setRecNotes(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 text-xs font-semibold rounded-xl transition-colors"
                >
                  Save Recipient
                </button>
              </form>
            </div>

            {/* Form 2: Save Milestones occasions */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm">
              <h3 className="font-serif text-base font-medium text-stone-900 mb-2 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-600" /> Save Upcoming Occasion
              </h3>
              <p className="text-stone-400 text-[10px] mb-4">Set milestones to get active notification tracking indicators.</p>

              <form onSubmit={handleCreateOccasion} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Occasion Title (e.g. 5th Anniversary)"
                  value={occTitle}
                  onChange={(e) => setOccTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    required
                    value={occDate}
                    onChange={(e) => setOccDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50"
                  />
                  <select
                    value={occType}
                    onChange={(e) => setOccType(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Sign Out">Sign Out</option>
                  </select>
                </div>
                <select
                  value={occRec}
                  onChange={(e) => setOccRec(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                >
                  <option value="">Link to Saved Recipient...</option>
                  {recipients.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full py-2 bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 text-xs font-semibold rounded-xl transition-colors"
                >
                  Save Occasion
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
