import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingBag, Heart, Star, Filter, ArrowUpDown, X, MessageSquare, AlertCircle } from 'lucide-react';
import { Product, CartItem } from '../types';
import { PREMIUM_PRODUCTS } from '../data';

interface GiftMarketplaceProps {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onInstantCheckout?: (item: Omit<CartItem, 'quantity'>) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  searchQuery: string;
  products?: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function GiftMarketplace({
  cart,
  addToCart,
  onInstantCheckout,
  wishlist,
  toggleWishlist,
  searchQuery,
  products,
  setProducts,
}: GiftMarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchVal, setSearchVal] = useState(searchQuery || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Review states
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [productWithNewReview, setProductWithNewReview] = useState<Product[]>(products || PREMIUM_PRODUCTS);

  useEffect(() => {
    if (products) {
      setProductWithNewReview(products);
    }
  }, [products]);

  const categories = [
    { id: 'all', label: 'All Gifts' },
    { id: 'perfumes', label: 'Perfumes' },
    { id: 'flowers', label: 'Flowers' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'chocolates', label: 'Chocolates' },
    { id: 'jewelry', label: 'Jewelry' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'gadgets', label: 'Gadgets' },
    { id: 'plushies', label: 'Plushies' }
  ];

  // Sync state or search
  const currentSearch = searchVal || searchQuery;

  // Filter products
  const filteredProducts = productWithNewReview.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          prod.description.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); // default featured
  });

  const handleAddReview = (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newReview = {
      id: `r-${Date.now()}`,
      author: newReviewAuthor,
      comment: newReviewComment,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = productWithNewReview.map(prod => {
      if (prod.id === productId) {
        const updatedReviews = [newReview, ...prod.reviews];
        // recalculate rating
        const avg = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
        return {
          ...prod,
          reviews: updatedReviews,
          rating: parseFloat(avg.toFixed(1))
        };
      }
      return prod;
    });

    setProductWithNewReview(updated);
    setProducts?.(updated);
    
    // Update selected product modal context as well
    const currentProd = updated.find(p => p.id === productId);
    if (currentProd) setSelectedProduct(currentProd);

    // reset fields
    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewRating(5);
  };

  return (
    <div id="lunara-marketplace" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">The Catalog</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">Premium Gift Marketplace</h1>
          </div>
          <p className="text-stone-500 text-sm mt-2 md:mt-0 max-w-sm">
            Hand-picked, high-end sensory statements representing the pinnacle of local and imported craftsmanship.
          </p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm">
          {/* Categories Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Search Input inside Marketplace */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search gifts..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full px-4 py-2 pl-9 rounded-full text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:border-amber-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-stone-50 border border-stone-200 text-xs px-4 pr-8 py-2 rounded-full focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 p-8">
            <AlertCircle className="h-10 w-10 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-stone-700">No gifts match your query</h3>
            <p className="text-stone-400 text-xs mt-1">Try selecting a different category or clearing your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedProducts.map((prod) => (
              <motion.div
                key={prod.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image & Wishlist Overlay */}
                <div className="relative h-64 w-full bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {prod.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold text-stone-950 bg-amber-400 rounded-full">
                      FEATURED
                    </span>
                  )}
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md transition-colors"
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(prod.id) ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} />
                  </button>
                </div>

                {/* Info and Add to Cart */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-600 font-medium">
                      {prod.category}
                    </span>
                    <h3
                      onClick={() => setSelectedProduct(prod)}
                      className="font-serif text-base text-stone-950 mt-1 hover:text-amber-600 cursor-pointer line-clamp-1"
                    >
                      {prod.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-stone-700 font-semibold">{prod.rating}</span>
                      <span className="text-[10px] text-stone-400">({prod.reviews.length} reviews)</span>
                    </div>
                    <p className="text-stone-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 mt-5 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold text-stone-950">
                        ₦{prod.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart({
                          id: prod.id,
                          type: 'product',
                          name: prod.name,
                          price: prod.price,
                          image: prod.image,
                          details: `Category: ${prod.category}`
                        })}
                        className="flex-1 flex items-center justify-center gap-1 px-2.5 py-2 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          if (onInstantCheckout) {
                            onInstantCheckout({
                              id: prod.id,
                              type: 'product',
                              name: prod.name,
                              price: prod.price,
                              image: prod.image,
                              details: `Category: ${prod.category}`
                            });
                          } else {
                            addToCart({
                              id: prod.id,
                              type: 'product',
                              name: prod.name,
                              price: prod.price,
                              image: prod.image,
                              details: `Category: ${prod.category}`
                            });
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-2.5 py-2 rounded-full text-[11px] font-bold bg-amber-500 text-stone-950 hover:bg-amber-600 transition-colors"
                      >
                        ⚡ Instant Buy
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Product Details Modal Overlay */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/10 hover:bg-stone-900/20 text-stone-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Product Image Section */}
              <div className="md:w-1/2 h-64 md:h-auto relative bg-stone-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Detail Content Section */}
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[90vh] md:max-h-[600px] flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-600 font-semibold font-mono">
                    {selectedProduct.category}
                  </span>
                  <h2 className="font-serif text-2xl font-light text-stone-950 mt-1">
                    {selectedProduct.name}
                  </h2>
                  
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-stone-800 font-semibold">{selectedProduct.rating}</span>
                    <span className="text-xs text-stone-400">({selectedProduct.reviews.length} customer reviews)</span>
                  </div>

                  <p className="text-stone-500 text-xs sm:text-sm mt-4 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/50">
                    <span className="block text-[10px] uppercase text-stone-400 font-semibold">Live Pricing</span>
                    <span className="font-mono text-2xl font-semibold text-stone-900">
                      ₦{selectedProduct.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Related products trigger */}
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">Related Items</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {PREMIUM_PRODUCTS.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
                        .slice(0, 3)
                        .map(related => (
                          <div
                            key={related.id}
                            onClick={() => setSelectedProduct(related)}
                            className="bg-stone-50 rounded-xl p-2 border border-stone-100 text-center cursor-pointer hover:border-amber-400 transition-colors"
                          >
                            <img src={related.image} className="h-10 w-full object-cover rounded-md mb-1" referrerPolicy="no-referrer" />
                            <span className="block text-[9px] text-stone-700 font-medium truncate">{related.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="mt-8 border-t border-stone-100 pt-6">
                    <h3 className="font-serif text-base font-medium text-stone-900 flex items-center gap-1.5 mb-4">
                      <MessageSquare className="h-4 w-4 text-stone-400" /> Reviews ({selectedProduct.reviews.length})
                    </h3>
                    <div className="space-y-4 max-h-40 overflow-y-auto pr-2">
                      {selectedProduct.reviews.length === 0 ? (
                        <p className="text-stone-400 text-xs italic">No reviews yet. Be the first to leave one!</p>
                      ) : (
                        selectedProduct.reviews.map(rev => (
                          <div key={rev.id} className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold text-stone-800">{rev.author}</span>
                              <span className="text-stone-400 text-[10px]">{rev.date}</span>
                            </div>
                            <div className="flex gap-0.5 mb-1.5">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <p className="text-stone-600 leading-relaxed font-light">{rev.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Add Review Form */}
                  <form onSubmit={(e) => handleAddReview(e, selectedProduct.id)} className="mt-6 pt-6 border-t border-stone-100">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-3">Add Your Review</h4>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="col-span-2 sm:col-span-1 px-3 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-amber-500 bg-stone-50"
                      />
                      <div className="flex items-center gap-1 border border-stone-200 rounded-lg px-2 text-xs bg-stone-50">
                        <span className="text-stone-400">Rating:</span>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="bg-transparent focus:outline-none cursor-pointer text-amber-500 font-bold"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                    </div>
                    <textarea
                      placeholder="Share your thoughts about this premium gift..."
                      required
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-amber-500 bg-stone-50"
                    />
                    <button
                      type="submit"
                      className="mt-2.5 w-full py-2 bg-stone-100 hover:bg-stone-900 hover:text-white transition-colors duration-300 text-stone-800 font-semibold rounded-lg text-xs"
                    >
                      Submit Review
                    </button>
                  </form>

                </div>

                {/* Final Checkout Add to Cart */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-stretch gap-3">
                  <button
                    onClick={() => {
                      toggleWishlist(selectedProduct.id);
                    }}
                    className="flex-1 py-3 text-stone-700 font-medium border border-stone-200 rounded-full text-xs hover:bg-stone-50 transition-colors"
                  >
                    {wishlist.includes(selectedProduct.id) ? '♥ Saved in Wishlist' : '♡ Add to Wishlist'}
                  </button>

                  <button
                    onClick={() => {
                      addToCart({
                        id: selectedProduct.id,
                        type: 'product',
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        image: selectedProduct.image,
                        details: `Category: ${selectedProduct.category}`
                      });
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-850 font-semibold rounded-full text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add Box To Cart
                  </button>

                  <button
                    onClick={() => {
                      if (onInstantCheckout) {
                        onInstantCheckout({
                          id: selectedProduct.id,
                          type: 'product',
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          image: selectedProduct.image,
                          details: `Category: ${selectedProduct.category}`
                        });
                      } else {
                        addToCart({
                          id: selectedProduct.id,
                          type: 'product',
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          image: selectedProduct.image,
                          details: `Category: ${selectedProduct.category}`
                        });
                      }
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-full text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    ⚡ Instant Buy
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
