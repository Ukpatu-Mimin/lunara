import { Product, Experience, RoomDecorPackage } from './types';

export const PREMIUM_PRODUCTS: Product[] = [
  // Perfumes
  {
    id: 'perf-1',
    name: 'Maison Noire - Ambre Nuit',
    price: 135000,
    category: 'perfumes',
    description: 'An elegant, complex woody amber fragrance with warm spices, vanilla, and sweet tobacco notes. Crafted for those who appreciate rare ingredients and subtle luxury.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: [
      { id: 'r-1', author: 'Audrey K.', rating: 5, comment: 'Simply divine. The scent lingers all day, bringing endless compliments.', date: '2026-05-12' },
      { id: 'r-2', author: 'Marcus V.', rating: 4.8, comment: 'A masterful blend. Sophisticated and rich.', date: '2026-06-01' }
    ],
    featured: true
  },
  {
    id: 'perf-2',
    name: 'Aura Rose - Eau de Parfum',
    price: 95000,
    category: 'perfumes',
    description: 'A delicate fusion of hand-picked Damask roses, white musk, and sparkling citrus notes. A modern romantic scent that captures the essence of fresh blooms.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: []
  },
  // Flowers
  {
    id: 'flow-1',
    name: 'La Vie en Rose - Eternal Bouquet',
    price: 45000,
    category: 'flowers',
    description: 'A spectacular arrangement of preserved luxury red roses. Specially treated to remain flawless, vibrant, and fragrantly fresh for up to three full years.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: [
      { id: 'r-3', author: 'Elena S.', rating: 5, comment: 'Exactly as described. My partner was speechless!', date: '2026-07-04' }
    ],
    featured: true
  },
  {
    id: 'flow-2',
    name: 'Symphony of Lilies',
    price: 32000,
    category: 'flowers',
    description: 'A pristine arrangement of fresh white calla lilies and baby’s breath in a customized ceramic vase. Symbolizing purity, elegance, and new beginnings.',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: []
  },
  // Cakes
  {
    id: 'cake-1',
    name: 'Golden Truffle Decadence Cake',
    price: 28000,
    category: 'cakes',
    description: 'Layers of moist Belgian dark chocolate cake covered in luxury rich truffle cream, adorned with real 24k gold leaf flakes and fresh raspberries.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    reviews: [
      { id: 'r-4', author: 'David L.', rating: 5, comment: 'Unbelievably delicious and visually stunning. Truly a masterpiece cake.', date: '2026-07-10' }
    ],
    featured: true
  },
  {
    id: 'cake-2',
    name: 'Strawberry Champagne Chantilly',
    price: 24000,
    category: 'cakes',
    description: 'A light, airy chiffon cake infused with premium champagne syrup, layered with fresh strawberries and rich, creamy Chantilly frosting.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: []
  },
  // Chocolates
  {
    id: 'choc-1',
    name: 'Lunara Signature Artisanal Box',
    price: 18500,
    category: 'chocolates',
    description: 'A bespoke selection of 16 hand-painted chocolates, featuring unique fillings like salted butter caramel, passionfruit ganache, and Madagascar vanilla.',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: [],
    featured: true
  },
  {
    id: 'choc-2',
    name: 'Ruby Cocoa Hearts',
    price: 12000,
    category: 'chocolates',
    description: 'Heart-shaped luxury chocolates made from naturally pink ruby cocoa beans, offering a unique tart-sweet fruity flavor profile without artificial colors.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caedd5cb?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviews: []
  },
  // Jewelry
  {
    id: 'jew-1',
    name: 'Infinite Love Diamond Pendant',
    price: 245000,
    category: 'jewelry',
    description: 'An exquisitely crafted 18k white gold necklace featuring an elegant interlocking pendant set with brilliant-cut diamonds. An enduring symbol of devotion.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: [
      { id: 'r-5', author: 'Robert G.', rating: 5, comment: 'Perfect anniversary gift. The sparkle is breathtaking under lights.', date: '2026-06-18' }
    ],
    featured: true
  },
  {
    id: 'jew-2',
    name: 'Aura Pearl Earrings',
    price: 85000,
    category: 'jewelry',
    description: 'Lustrous, matching South Sea cultured pearls suspended from elegant 14k solid yellow gold hoops, perfect for both day-to-day wear and special evenings.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: []
  },
  // Fashion
  {
    id: 'fash-1',
    name: 'Cashmere Monogram Wrap',
    price: 110000,
    category: 'fashion',
    description: 'Woven from 100% fine Mongolian cashmere, this ultra-soft wrap offers unparalleled warmth and features subtle custom monogram embroidery.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: []
  },
  // Gadgets
  {
    id: 'gad-1',
    name: 'Aura Smart Photo Frame',
    price: 75000,
    category: 'gadgets',
    description: 'An elegant wood-framed HD display that lets you instantly send photos and brief voice recordings from anywhere in the world. Perfect for distant loved ones.',
    image: 'https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: []
  },
  // Plushies
  {
    id: 'plush-1',
    name: 'Aria the Velvet Teddy',
    price: 15000,
    category: 'plushies',
    description: 'A luxurious, ultra-soft plush bear made from hypoallergenic, silk-velvet fabrics. Wearing a personalized embroidered satin ribbon.',
    image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: []
  }
];

export const EXPERIENCE_PACKAGES: Experience[] = [
  // Wellness
  {
    id: 'exp-well-1',
    name: 'Couples Sanctuary Spa Ritual',
    price: 120000,
    category: 'wellness',
    description: 'A 2.5-hour deeply therapeutic retreat. Includes a relaxing hot stone full-body massage, customized facial therapy, aromatherapy, and private outdoor jacuzzi access with champagne.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    duration: '2.5 Hours',
    location: 'Port Harcourt Metro'
  },
  // Creative
  {
    id: 'exp-creat-1',
    name: 'Luxury Perfume Blending Atelier',
    price: 45000,
    category: 'creative',
    description: 'Guided by an expert master perfumer, explore over 40 rare fragrance botanical extracts. Blend, create, and name your own custom 100ml signature fragrance bottle to take home.',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600',
    duration: '2 Hours',
    location: 'Port Harcourt GRA'
  },
  {
    id: 'exp-creat-2',
    name: 'Sip and Paint - Candle Edition',
    price: 35000,
    category: 'creative',
    description: 'Express your artistic side while hand-pouring customized scented soy candles and painting lovely canvas pieces. Includes premium red wine and continuous gourmet finger foods.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    duration: '3 Hours',
    location: 'Port Harcourt GRA & Trans Amadi'
  },
  // Adventure
  {
    id: 'exp-adv-1',
    name: 'Sunset Boat Cruise & Private Chef',
    price: 350000,
    category: 'adventure',
    description: 'A 4-hour luxury yacht charter navigating coastal waters. Includes a dedicated professional captain, ambient acoustics, and a 4-course bespoke menu prepared live on deck by a private chef.',
    image: 'https://images.unsplash.com/photo-1505080856163-267d49b30c3c?auto=format&fit=crop&q=80&w=600',
    duration: '4 Hours',
    location: 'Bonny River Coastline'
  },
  // Romance
  {
    id: 'exp-rom-1',
    name: 'Acoustic Beachside Candlelit Dinner',
    price: 180000,
    category: 'romance',
    description: 'An ultra-romantic private beach dining experience. Walk down a candle-lined pathway to your beautifully decorated private teepee. Enjoy premium seafood and a live acoustic guitarist.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600',
    duration: '3 Hours',
    location: 'Port Harcourt Shoreline'
  }
];

export const ROOM_DECOR_PACKAGES: RoomDecorPackage[] = [
  {
    id: 'dec-1',
    name: 'Enchanted Rose Canopy',
    price: 95000,
    category: 'romantic',
    description: 'Turn any ordinary room into a lush, fairy-tale paradise. Features an magnificent silk canopy with overhead draping, cascading fairy lights, over 100 glowing floating tea-candles, and thousands of real aromatic red rose petals lining the bed and walkway.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600'
    ],
    includes: [
      '100+ Premium floating LED tea candles',
      'Real organic red rose petals path and bed display',
      'Elegant overhead chiffon wall draping',
      'Warming string fairy-lights canopy',
      'Customized printed romantic photo cards banner',
      'Professional setup & next-day tidy cleanup service'
    ]
  },
  {
    id: 'dec-2',
    name: 'Golden Elegance Birthday Bash',
    price: 85000,
    category: 'birthday',
    description: 'A majestic chrome-gold, cream, and jet-black celebratory design. Complete with massive personalized neon-glow signages, modern helium-floating ceiling balloons, large light-up marquee age numbers, and stylish metallic table runners.',
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600'
    ],
    includes: [
      'Massive 6ft personalized acrylic photo backdrop',
      'Custom organic balloon arch with metallic accents',
      'Light-up marquee age numbers (e.g. "30")',
      'Helium-filled ceiling balloons with curling gold ribbons',
      'Glow-in-the-dark personalized LED neon message signs',
      'On-site delivery & 2-hour professional setup'
    ]
  },
  {
    id: 'dec-3',
    name: 'Will You Marry Me? Luxury Proposal',
    price: 150000,
    category: 'proposal',
    description: 'Create an absolutely unforgettable visual for your monumental question. Incorporates standard giant 4ft glowing marquee "MARRY ME" lettering, extensive flower walls, romantic tall candle glass towers, and a premium velvet red carpet walkway.',
    images: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600'
    ],
    includes: [
      '4ft High-intensity illuminated "MARRY ME" letters',
      '20ft Premium plush velvet red carpet runner',
      'Dual 8ft artificial cherry blossom flower trees',
      '24 Tall glass luxury candle cylinders with glowing pillars',
      'Professional photography service (15-min instant mini-shoot)',
      'Complimentary chilled Moët & Chandon champagne bottle'
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Damilola A.',
    role: 'Verified Customer',
    quote: 'Lunara helped me plan a surprise proposal for my fiancé. The Room Decor team was highly professional, and the Sunset Cruise with private chef felt like a movie. Unbelievable luxury!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 't-2',
    name: 'Farooq O.',
    role: 'Aura Rose Giver',
    quote: 'The Curate A Gift Box process is outstanding. Live pricing made it easy to mix premium perfume, flowers, and custom notes within my budget. It arrived exactly on schedule in perfect state.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 't-3',
    name: 'Sophie N.',
    role: 'Creative Experience Gift',
    quote: 'My sister was thrilled to receive the Perfume Blending Atelier experience. Creating her custom fragrance bottle has become one of her fondest memories. Highly recommend!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  }
];

export const FAQS = [
  {
    question: 'How far in advance do I need to book room decoration?',
    answer: 'For complex setups (like our proposal and bridal suite decorations), we recommend booking at least 3-5 days in advance. However, for express standard setups, we can occasionally fulfill booking slots with 24-48 hours notice depending on vendor availability.'
  },
  {
    question: 'Can I fully customize the items inside a Curated Gift Box?',
    answer: 'Absolutely! Our "Curate A Gift Box" feature is designed precisely for that. You can select your box size and theme, then browse and add individual premium gifts like perfumes, candles, chocolates, and flowers. The system updates pricing in real-time.'
  },
  {
    question: 'Is the AI Gift Matcher free to use?',
    answer: 'Yes! Our AI Gift Matcher is a complimentary feature driven by Google Gemini. Simply share details about your recipient (their personality, age, interests, love language, and your budget), and the model will suggest custom gifting configurations.'
  },
  {
    question: 'Do you deliver across Nigeria?',
    answer: 'Lunara is proudly Port Harcourt-based! We deliver physical fresh gifts (such as luxury cakes, fresh flower bouquets, and curated helium balloons) within Port Harcourt, while we provide reliable nationwide express shipping for dry luxury products (such as perfumes, jewelry, customized keepsake gifts, and fashion). Localized surprise room setups and premium experiences (like private yacht dinners and wellness rituals) are also focused within Port Harcourt metro areas.'
  }
];
