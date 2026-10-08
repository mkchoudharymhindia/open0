export interface ImageTemplate {
  id: string;
  title: string;
  category: string;
  url: string;
  thumb: string;
  aspect: string;
}

export interface ProductTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  originalPrice: number;
  finalPrice: number;
  rating: number;
  badge: string;
  imageUrl: string;
  features: string[];
  specs: Record<string, string>;
  isTrending?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface PromoBannerTemplate {
  id: string;
  tag: string;
  headline: string;
  subheadline: string;
  priceBadge: string;
  bgGradient: string;
  accentColor: string;
  imageUrl: string;
  categoryTarget: string;
  buttonText: string;
}

export const IMAGE_TEMPLATES: ImageTemplate[] = [
  {
    id: 'img-otg-adapter',
    title: 'Type-C Metal OTG Adapter',
    category: 'Mobile Accessories',
    url: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-cable-protector',
    title: 'Spiral Silicone Cable Protectors',
    category: 'Mobile Accessories',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-microfiber-cloth',
    title: 'Microfiber Lens & Screen Cleaner',
    category: 'Daily-use Products',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-sim-ejector',
    title: 'Dual SIM Ejector Keychain Pin',
    category: 'Mobile Accessories',
    url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-tactical-carabiner',
    title: 'EDC Matte Black Alloy Carabiner',
    category: 'Fashion Accessories',
    url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-pocket-journal',
    title: 'Pocket Hardcover Lined Journal',
    category: 'Stationery',
    url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-matte-pen',
    title: 'Matte Executive Brass Ballpoint',
    category: 'Stationery',
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-phone-stand',
    title: 'Multi-Angle Folding Desk Phone Stand',
    category: 'Gadgets',
    url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-usb-lamp',
    title: 'Flexible USB Gooseneck Light',
    category: 'Gadgets',
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-tea-infuser',
    title: 'Stainless Steel Mesh Tea Strainer',
    category: 'Home & Kitchen',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-lip-balm',
    title: 'Natural Shea Herbal Lip Butter',
    category: 'Beauty & Personal Care',
    url: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-neem-comb',
    title: 'Pure Neem Wood Wide-Tooth Comb',
    category: 'Beauty & Personal Care',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-rfid-wallet',
    title: 'Ultra-Thin RFID Shield Card Holder',
    category: 'Fashion Accessories',
    url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-ring-light',
    title: 'Rechargeable Clip-on Selfie Ring Light',
    category: 'Trending Products',
    url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-candles',
    title: 'Aroma Soy Wax Tealight Candles (Pack of 4)',
    category: 'Gift Items',
    url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  },
  {
    id: 'img-cord-organizer',
    title: 'Magnetic Cable Desktop Organizer Base',
    category: 'Mobile Accessories',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
    aspect: '1:1'
  }
];

export const PRODUCT_TEMPLATES: ProductTemplate[] = [
  {
    id: 'tpl-microfiber',
    name: 'Ultra-Soft Microfiber Optics & Screen Cloth (Set of 2)',
    description: 'Lint-free, scratch-proof double-weave microfiber cloth for smartphones, cameras, and reading glasses. Easily washable and pocket-friendly.',
    category: 'Daily-use Products',
    originalPrice: 49,
    finalPrice: 9,
    rating: 4.9,
    badge: '₹9 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    features: ['Zero Scratch Fiber', 'Washable & Reusable', 'Lint-free', 'Pocket Friendly'],
    specs: {
      'Size': '15cm x 15cm',
      'Material': '80% Polyester, 20% Polyamide',
      'Pack': '2 Pieces'
    },
    isNew: true
  },
  {
    id: 'tpl-sim-pin',
    name: 'Dual SIM Ejector Tool with Keyring Silicone Sleeve',
    description: 'Precision stainless steel needle with flexible keychain protector so you always have a SIM tool when traveling or switching devices.',
    category: 'Mobile Accessories',
    originalPrice: 40,
    finalPrice: 9,
    rating: 4.8,
    badge: '₹9 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80',
    features: ['Stainless Steel Pin', 'Silicone Protective Sleeve', 'Keyring Friendly', 'Universal Fit'],
    specs: {
      'Material': '304 Stainless Steel',
      'Compatibility': 'Universal SIM Trays',
      'Weight': '3g'
    }
  },
  {
    id: 'tpl-cable-saver',
    name: 'Spiral Silicone Cable Protector Sleeve (Pack of 4)',
    description: 'Prevent expensive charging cables from splitting and tearing at junction points. Flexible, durable food-grade silicone.',
    category: 'Mobile Accessories',
    originalPrice: 99,
    finalPrice: 19,
    rating: 4.7,
    badge: '₹19 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    features: ['Flexible Silicone', 'Prevents Fraying', 'Vibrant Pastel Colors', 'Universal Cable Fit'],
    specs: {
      'Pack Size': '4 Spirals',
      'Length': '3.5cm each',
      'Material': 'Flexible Silicone'
    },
    isTrending: true
  },
  {
    id: 'tpl-otg',
    name: 'Metallic Type-C to USB 3.0 High-Speed OTG Adapter',
    description: 'Sturdy zinc-alloy OTG converter to plug flash drives, mice, and keyboards straight into modern smartphones and tablets.',
    category: 'Mobile Accessories',
    originalPrice: 149,
    finalPrice: 29,
    rating: 4.8,
    badge: '₹29 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80',
    features: ['Zinc Alloy Shell', '5 Gbps Transfer Speed', 'Universal Compatibility', 'Plug & Play'],
    specs: {
      'Connector': 'USB Type-C to USB-A 3.0',
      'Material': 'Anodized Zinc Alloy',
      'Weight': '8g'
    },
    isFeatured: true
  },
  {
    id: 'tpl-pocket-journal',
    name: 'Pocket Hardcover Notebook (80 Ruled Pages)',
    description: 'Classic pocket journal with thick 90gsm ink-proof cream sheets, elastic closure band, and rounded corner protection.',
    category: 'Stationery',
    originalPrice: 120,
    finalPrice: 39,
    rating: 4.8,
    badge: '₹39 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80',
    features: ['90 GSM Paper', 'Elastic Closure', 'Pocket Size A6', 'Vegan Leather Cover'],
    specs: {
      'Size': 'A6 (10.5cm x 14.8cm)',
      'Pages': '80 Ruled Pages',
      'Binding': 'Smyth-Sewn'
    }
  },
  {
    id: 'tpl-edc-carabiner',
    name: 'Tactical Matte Black EDC Carabiner with Bottle Opener',
    description: 'Heavy-duty zinc alloy spring hook with built-in bottle opener and dual keyrings. Resists rust and daily pocket wear.',
    category: 'Fashion Accessories',
    originalPrice: 199,
    finalPrice: 49,
    rating: 4.9,
    badge: '₹49 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=80',
    features: ['Heavy-Duty Alloy', 'Integrated Bottle Opener', 'Dual Split Rings', 'Corrosion Resistant'],
    specs: {
      'Material': 'High-Tensile Zinc Alloy',
      'Length': '8.2cm',
      'Weight': '32g'
    },
    isFeatured: true
  },
  {
    id: 'tpl-tea-strainer',
    name: 'Stainless Steel Locking Mesh Tea Infuser Ball',
    description: 'Food grade 304 stainless steel mesh sphere with twist lock and hanging chain for loose leaf green tea, masala chai spices, and herbal brews.',
    category: 'Home & Kitchen',
    originalPrice: 249,
    finalPrice: 59,
    rating: 4.9,
    badge: '₹59 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    features: ['304 Stainless Steel', 'Ultra-Fine Mesh', 'Hanging Chain Hook', 'Dishwasher Safe'],
    specs: {
      'Diameter': '4.5cm',
      'Material': 'Food Grade 304 Steel',
      'Chain Length': '11cm'
    }
  },
  {
    id: 'tpl-desk-stand',
    name: 'Foldable Multi-Angle Desk Phone & Tablet Stand',
    description: 'Ergonomic ABS folding cradle with 5-step viewing angle adjustments and non-slip rubber pads for desk setup, calls, and study.',
    category: 'Gadgets',
    originalPrice: 299,
    finalPrice: 79,
    rating: 4.8,
    badge: '₹79 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80',
    features: ['5-Step Angle Adjustment', 'Non-Slip Silicone Pads', 'Charging Cable Port', 'Folds Completely Flat'],
    specs: {
      'Device Support': '4" to 10.5" Screens',
      'Material': 'Reinforced ABS + Silicone',
      'Folded Thickness': '12mm'
    },
    isFeatured: true
  },
  {
    id: 'tpl-ring-light',
    name: 'Rechargeable 36-LED Clip-on Selfie Ring Light',
    description: 'Pocket illumination ring with 3 adjustable brightness levels. Clips securely to phone cameras or laptops for crisp video calls and selfies.',
    category: 'Trending Products',
    originalPrice: 399,
    finalPrice: 99,
    rating: 4.9,
    badge: '₹99 ONLY',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    features: ['36 LED Beads', '3 Brightness Levels', 'Rechargeable Battery', 'Protective Clamp Pads'],
    specs: {
      'Diameter': '8.5cm',
      'Battery': '150mAh Lithium (USB included)',
      'Run Time': 'Up to 2 Hours'
    },
    isTrending: true,
    isFeatured: true
  }
];

export const PROMO_BANNER_TEMPLATES: PromoBannerTemplate[] = [
  {
    id: 'banner-loot-9',
    tag: 'MEGA DEAL TEMPLATE',
    headline: 'THE ₹9 STORE',
    subheadline: 'Screen cloths, SIM keychains & cable clips at single-digit prices!',
    priceBadge: '₹9 ONLY',
    bgGradient: 'from-amber-600 via-amber-700 to-neutral-900',
    accentColor: 'text-amber-300',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    categoryTarget: 'Daily-use Products',
    buttonText: 'SHOP ₹9 ITEMS'
  },
  {
    id: 'banner-under-49',
    tag: 'BESTSELLERS TEMPLATE',
    headline: 'UNDER ₹49 CORNER',
    subheadline: 'Tactical EDC tools, executive pens, journals & zinc OTG adapters.',
    priceBadge: '₹19 – ₹49',
    bgGradient: 'from-neutral-900 via-stone-900 to-amber-950',
    accentColor: 'text-amber-400',
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80',
    categoryTarget: 'Fashion Accessories',
    buttonText: 'EXPLORE UNDER ₹49'
  },
  {
    id: 'banner-gadgets-99',
    tag: 'TECH TEMPLATE',
    headline: 'SMART GADGETS HUB',
    subheadline: 'Selfie ring lights, foldable stands & USB lights capped strictly at ₹99.',
    priceBadge: 'MAX ₹99',
    bgGradient: 'from-neutral-950 via-zinc-900 to-neutral-900',
    accentColor: 'text-amber-400',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    categoryTarget: 'Gadgets',
    buttonText: 'DISCOVER GADGETS'
  }
];
