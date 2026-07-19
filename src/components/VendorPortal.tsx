import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, Plus, Package, Clock, DollarSign, Tag, Check, Image, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';
import { VendorListing } from '../types';

export default function VendorPortal() {
  const [vendorType, setVendorType] = useState<'decorator' | 'florist' | 'baker' | 'photographer' | 'spa' | 'restaurant'>('baker');
  const [vendorName, setVendorName] = useState('Gourmet Confectionery Ltd');
  const [listings, setListings] = useState<VendorListing[]>([
    {
      id: 'vl-1',
      vendorName: 'Gourmet Confectionery Ltd',
      vendorType: 'baker',
      title: 'Truffle Raspberry Gateau',
      price: 24000,
      description: 'Handmade double-layered chocolate sponge covered in raspberry compote.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300',
      status: 'active'
    },
    {
      id: 'vl-2',
      vendorName: 'Gourmet Confectionery Ltd',
      vendorType: 'baker',
      title: 'Velvet Birthday Cupcake Tier',
      price: 18000,
      description: 'Elegant set of 12 red velvet cupcakes with golden edible glitter.',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=300',
      status: 'active'
    }
  ]);

  // Form states for creating listing
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=300');

  // Simulated active bookings for the vendor
  const [vendorBookings, setVendorBookings] = useState([
    { id: 'vb-1', client: 'Chidi O.', item: 'Truffle Raspberry Gateau', date: '2026-07-22', total: 24000, status: 'pending' },
    { id: 'vb-2', client: 'Tunde A.', item: 'Velvet Birthday Cupcake Tier', date: '2026-07-25', total: 18000, status: 'confirmed' }
  ]);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newDesc) return;

    const newListing: VendorListing = {
      id: `vl-${Date.now()}`,
      vendorName,
      vendorType,
      title: newTitle,
      price: Number(newPrice),
      description: newDesc,
      image: newImage || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300',
      status: 'active'
    };

    setListings([newListing, ...listings]);
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
    alert('Congratulations! Your new service listing is live in Lunara’s marketplace.');
  };

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter(item => item.id !== id));
  };

  const handleUpdateBookingStatus = (id: string) => {
    setVendorBookings(vendorBookings.map(bk => {
      if (bk.id === id) {
        return { ...bk, status: bk.status === 'pending' ? 'confirmed' : 'completed' };
      }
      return bk;
    }));
  };

  return (
    <div id="lunara-vendor-portal" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 font-mono">Merchant Workshop</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">Vendor Partner Portal</h1>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <select
              value={vendorType}
              onChange={(e) => {
                const type = e.target.value as any;
                setVendorType(type);
                setVendorName(
                  type === 'baker' ? 'Gourmet Confectionery Ltd' :
                  type === 'florist' ? 'Aria Premium Florists' :
                  type === 'decorator' ? 'Velvet Suite Installations' :
                  'Elite Local Merchant Co'
                );
              }}
              className="text-xs px-3 py-2 border border-stone-200 rounded-lg bg-white font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="baker">Gourmet Baker Profile</option>
              <option value="florist">Aria Florist Profile</option>
              <option value="decorator">Velvet Decorator Profile</option>
              <option value="spa">Wellness Spa Profile</option>
            </select>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified Partner
            </div>
          </div>
        </div>

        {/* Overview Stats Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Merchant Sales Revenue', value: '₦432,000', change: '+12% this month', icon: DollarSign, color: 'text-amber-600' },
            { label: 'Active Listings', value: listings.length, change: '100% active visibility', icon: Tag, color: 'text-blue-600' },
            { label: 'Total Placed Bookings', value: vendorBookings.length, change: '1 pending verification', icon: Clock, color: 'text-purple-600' },
            { label: 'Completion Rate', value: '98.5%', change: 'Elite Merchant Standard', icon: Package, color: 'text-emerald-600' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase text-stone-400 font-bold tracking-wider">{stat.label}</span>
                  <span className="text-xl sm:text-2xl font-serif font-light text-stone-900 mt-1 block">{stat.value}</span>
                  <span className="text-[10px] text-stone-400 mt-1 block font-medium">{stat.change}</span>
                </div>
                <div className={`p-3 rounded-full bg-stone-50 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Workspace Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Create Listing Form Column */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm">
            <h3 className="font-serif text-lg font-light text-stone-900 mb-2 flex items-center gap-1.5">
              <Plus className="h-5 w-5 text-amber-600" /> Create Service Listing
            </h3>
            <p className="text-stone-400 text-xs mb-6">Instantly create and publish new listings onto the client-facing catalog.</p>

            <form onSubmit={handleCreateListing} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Listing Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Red Velvet Valentine Delight"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Price (₦)</label>
                  <input
                    type="number"
                    required
                    placeholder="25000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Image Theme Preset</label>
                  <select
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none"
                  >
                    <option value="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300">Cake Preset</option>
                    <option value="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=300">Rose Preset</option>
                    <option value="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=300">Perfume Preset</option>
                    <option value="https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=300">Chocolate Preset</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Listing Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details regarding ingredients, dimensions, delivery expectations, or scent properties..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                />
              </div>

              {/* Upload image note */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/50 flex items-center gap-2 text-[10px] text-stone-500">
                <Image className="h-4 w-4 text-amber-500" />
                <span>Image preset is applied automatically to guarantee high-fidelity marketplace styling.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 text-xs font-bold rounded-full transition-colors"
              >
                Publish Listing
              </button>
            </form>
          </div>

          {/* Active Listings & Order Tracking Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active Listings Column */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm">
              <h3 className="font-serif text-lg font-light text-stone-900 mb-4">My Active Listings ({listings.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {listings.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-stone-50 border border-stone-200/50 rounded-2xl relative group">
                    <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded-xl" referrerPolicy="no-referrer" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{item.title}</h4>
                        <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{item.description}</p>
                      </div>
                      <div className="flex justify-between items-end mt-1">
                        <span className="font-mono text-xs font-bold text-stone-850">₦{item.price.toLocaleString()}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">Active</span>
                      </div>
                    </div>
                    {/* Delete listing button */}
                    <button
                      onClick={() => handleDeleteListing(item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Bookings tracking column */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm">
              <h3 className="font-serif text-lg font-light text-stone-900 mb-4">Client Order Fulfillment</h3>
              {vendorBookings.length === 0 ? (
                <div className="text-center py-6">
                  <AlertCircle className="h-6 w-6 text-stone-300 mx-auto" />
                  <p className="text-xs text-stone-400 mt-1">No orders pending fulfillment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {vendorBookings.map((bk) => (
                    <div key={bk.id} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-stone-900">Client: {bk.client}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            bk.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            bk.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {bk.status}
                          </span>
                        </div>
                        <span className="block text-[11px] text-stone-500 mt-1">Item: {bk.item}</span>
                        <span className="block text-[10px] text-stone-400 mt-0.5">Target Delivery Date: {bk.date}</span>
                      </div>
                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <span className="font-mono text-xs font-bold text-stone-900">₦{bk.total.toLocaleString()}</span>
                        {bk.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(bk.id)}
                            className="px-3.5 py-1.5 rounded-full text-[10px] font-bold bg-stone-900 text-white hover:bg-emerald-600 hover:text-white transition-colors"
                          >
                            {bk.status === 'pending' ? 'Confirm Order' : 'Mark Fulfilled'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
