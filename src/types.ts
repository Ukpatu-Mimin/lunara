export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'perfumes' | 'flowers' | 'cakes' | 'chocolates' | 'jewelry' | 'fashion' | 'gadgets' | 'plushies';
  description: string;
  image: string;
  rating: number;
  reviews: Review[];
  featured?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Experience {
  id: string;
  name: string;
  price: number;
  category: 'wellness' | 'creative' | 'adventure' | 'romance';
  description: string;
  image: string;
  duration: string;
  location: string;
}

export interface RoomDecorPackage {
  id: string;
  name: string;
  price: number;
  category: 'romantic' | 'birthday' | 'proposal' | 'hotel' | 'bridal';
  description: string;
  images: string[];
  includes: string[];
}

export interface CartItem {
  id: string;
  type: 'product' | 'experience' | 'decor' | 'curated_box' | 'surprise';
  name: string;
  price: number;
  image: string;
  quantity: number;
  details?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  recipientName: string;
  address: string;
  deliveryDate: string;
}

export interface Booking {
  id: string;
  type: 'experience' | 'decor';
  name: string;
  date: string;
  time: string;
  price: number;
  location: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface Recipient {
  id: string;
  name: string;
  relationship: string;
  birthday: string;
  favoriteColor: string;
  interests: string[];
  notes: string;
}

export interface Occasion {
  id: string;
  title: string;
  date: string;
  type: string;
  recipientName: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  recipientName: string;
  description: string;
  image?: string;
  voiceNoteUrl?: string;
}

export interface CuratedBox {
  size: 'mini' | 'standard' | 'premium' | 'luxury';
  theme: 'romantic' | 'birthday' | 'friendship' | 'self-care' | 'luxury' | 'corporate';
  items: string[];
  price: number;
}

export interface SurprisePlan {
  id: string;
  occasion: string;
  budget: number;
  recipientName: string;
  date: string;
  timeline: {
    time: string;
    activity: string;
    cost: number;
    type: 'gift' | 'decor' | 'experience';
  }[];
  totalCost: number;
}

export interface VendorListing {
  id: string;
  vendorName: string;
  vendorType: 'decorator' | 'florist' | 'baker' | 'photographer' | 'spa' | 'restaurant';
  title: string;
  price: number;
  description: string;
  image: string;
  status: 'active' | 'pending';
}

export interface Vendor {
  id: string;
  businessName: string;
  ceoName: string;
  phone: string;
  address: string;
  category: 'decorator' | 'florist' | 'baker' | 'photographer' | 'spa' | 'restaurant';
  status: 'active' | 'pending';
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
}

