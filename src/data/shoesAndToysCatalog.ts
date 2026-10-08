import { Product } from '../types';

export const SHOES_AND_TOYS_CATALOG: Product[] = [
  // ==========================================
  // 👟 1. NIKE MENS COURT VISION LOW SNEAKER
  // ==========================================
  {
    id: "prod-nike-court-vision-low-sneaker-257",
    name: "Nike Mens Court Vision Low Sneaker",
    description: "In love with the classic look of '80s basketball, but have a thing for the fast-paced culture of today's game? Meet the Nike Court Vision Low. A classic remixed with at least 20% recycled materials by weight, its crisp upper and stitched overlays keep the soul of the original style. The plush, low-cut collar keeps it sleek and comfortable for your world.",
    category: "Men's Shoes",
    originalPrice: 7095,
    finalPrice: 257,
    rating: 4.7,
    reviewCount: 4200,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "Limited time deal",
    colors: [
      { name: "Triple White", hex: "#f8fafc", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80" },
      { name: "Black / White Swoosh", hex: "#1e293b", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80" },
      { name: "White / University Red", hex: "#dc2626", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "100% Authentic Nike Court Vision Low basketball silhouette",
      "Crafted with crisp synthetic leather and stitched overlays",
      "Perforations on toe and sides add breathability and cooling airflow",
      "Vulcanized construction fuses outsole to midsole for a sleek look",
      "Solid rubber cupsole adds multi-surface durability and grip",
      "Padded, low-cut collar looks streamlined and feels great all day",
      "Limited Time Deal — 90% Off M.R.P. ₹7,095"
    ],
    specs: {
      "Brand": "Nike",
      "Model": "Court Vision Low Sneaker",
      "Outer Material": "Synthetic Leather with Recycled Content Overlays",
      "Sole Material": "Durable Vulcanized Traction Rubber",
      "Closure": "Lace-Up",
      "Toe Style": "Round Perforated Toe Box",
      "Warranty": "Nike Authentic Guarantee"
    }
  },

  // ==========================================
  // 👟 2. WOMEN CASUAL SNEAKERS SHOES
  // ==========================================
  {
    id: "prod-women-casual-sneakers-shoes-108",
    name: "Women Casual Sneakers Shoes",
    description: "Step into effortless style and ultimate lightweight comfort with these Women Casual Sneakers Shoes. Featuring ultra-cushioned shock-absorbing memory foam soles, breathable mesh and supple faux-leather construction, these lightweight sneakers are perfect for college, daily walking, workouts, and casual day-outs. Over 10,000+ happy women bought this past month!",
    category: "Footwear & Slides",
    originalPrice: 999,
    finalPrice: 108,
    rating: 5.0,
    reviewCount: 4000,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "10k+ bought in past month",
    colors: [
      { name: "White & Blush Pink", hex: "#f472b6", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80" },
      { name: "Cloud White", hex: "#f1f5f9", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80" },
      { name: "Beige & Pastel Peach", hex: "#fed7aa", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "10k+ bought in past month — Top Rated Women's Sneaker",
      "5.0 ⭐ Top Customer Rated Comfort Footwear (4K reviews)",
      "Ultra-soft cloud foam insole for zero fatigue walking",
      "Breathable anti-sweat lining with flexible outer mesh",
      "Slip-resistant ridged rubber outsole for all surfaces",
      "Chic trendy aesthetic pairs easily with jeans, dresses & joggers",
      "Lightweight Feather-Feel construction (<240g)"
    ],
    specs: {
      "Type": "Women's Casual Sneakers",
      "Upper Material": "Breathable Mesh & Supple Faux Leather",
      "Insole": "Ergonomic Memory Cloud Cushion",
      "Sole": "High Traction Anti-Skid Rubber",
      "Closure": "Lace-Up",
      "Weight": "Ultra Lightweight (~240g)",
      "Occasion": "Daily Walking / College / Travel / Casual Outing"
    }
  },

  // ==========================================
  // 👚 3. WOMEN'S LYCRA RIBBED COLLARED TOP HALF ZIP
  // ==========================================
  {
    id: "prod-womens-lycra-ribbed-collared-top-halfzip-99",
    name: "Women's Lycra Ribbed Collared Top Half Zip Solid Stretchable Top | Full Sleeve Casual Wear | Soft Comfortable Fabric for Office & Daily Use",
    description: "Elevate your everyday wardrobe with this trending Women's Lycra Ribbed Collared Half Zip Top. Designed with a chic polo zip collar, flattering stretchable ribbed knit, and full sleeves. Soft, skin-friendly, and wrinkle-resistant fabric that moves with you effortlessly. Over 18,000+ orders fulfilled in the past month with a stellar 5.0-star rating!",
    category: "Women's Dresses",
    originalPrice: 899,
    finalPrice: 99,
    rating: 5.0,
    reviewCount: 19000,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "18k+ bought in past month",
    colors: [
      { name: "Dusty Mauve Pink", hex: "#e879f9", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80" },
      { name: "Sage Olive Green", hex: "#65a30d", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80" },
      { name: "Classic Onyx Black", hex: "#0f172a", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80" },
      { name: "Warm Cream Ivory", hex: "#fef3c7" }
    ],
    features: [
      "18k+ bought in past month • 5.0 ⭐ Customer Favorite (19K reviews)",
      "Premium 4-way stretchable Lycra ribbed knit fabric",
      "Metallic half-zip closure with structured fold-down polo collar",
      "Full sleeves with snug wrist cuffs for an elegant silhouette",
      "Breathable, non-see-through, soft-touch fabric",
      "Easy pairing with trousers, denims, palazzos and skirts",
      "Zero color fading & pill-resistant material"
    ],
    specs: {
      "Brand": "Lycra Ribbed Studio",
      "Material": "95% Ribbed Lycra Cotton, 5% Spandex",
      "Neck Type": "Collared Polo Neck with Half Zip",
      "Sleeve Length": "Full Sleeves",
      "Fit Type": "Regular Stretch Fit",
      "Occasion": "Office / Daily Wear / Casual / College",
      "Care Instructions": "Machine Wash Cold or Gentle Hand Wash"
    }
  },

  // ==========================================
  // ⚽ 4. JAM & HONEY LARGE FOOSBALL TABLE
  // ==========================================
  {
    id: "prod-jam-and-honey-large-foosball-table-119",
    name: "Jam & Honey Large Foosball Table for Kids & Adults 6+ Years, Indoor Table Soccer Game with 6 Rods & 18 Players, Multiplayer Family for Home & Room, BIS Certified Child Safe",
    description: "Bring thrilling stadium soccer action right into your living room! The Jam & Honey Large Foosball Table features a sturdy engineered wood chassis, 6 smooth-glide chrome steel rods with non-slip grips, and 18 realistic molded soccer players (9 vs 9). Complete with dual manual goal sliders and BIS child-safety certification for endless family and party entertainment. 20,000+ sold in past month!",
    category: "Toys & Games",
    originalPrice: 8437,
    finalPrice: 119,
    rating: 4.8,
    reviewCount: 1700,
    images: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "Sale Price Live • 20k+ bought",
    colors: [
      { name: "Classic Walnut Brown", hex: "#78350f", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80" },
      { name: "Stadium Green & Black", hex: "#15803d", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "20k+ bought in past month • Sale Price Live (97% off M.R.P: ₹8,437)",
      "BIS Certified 100% child safe with rounded safety corners",
      "6 Heavy-duty chrome plated steel rods with ergonomic anti-sweat handles",
      "18 Durable molded players in opposing team colors",
      "Dual manual sliding scorekeeper counters at both ends",
      "Internal ball return system for non-stop fast paced play",
      "Includes 2 regulation soccer foosballs & assembly guide"
    ],
    specs: {
      "Brand": "Jam & Honey",
      "Product Dimensions": "69 cm x 37 cm x 24 cm (Large Tabletop / Stand)",
      "Material": "Engineered MDF Wood & Chromium Plated Steel",
      "Player Count": "18 Players (9 vs 9 Formations)",
      "Rods": "6 Smooth Rotating Steel Rods",
      "Age Group": "6+ Years to Adults",
      "Certification": "BIS Child Safety Standard Certified"
    }
  },

  // ==========================================
  // 🏎️ 5. SUV DEFENDER REMOTE CONTROL RC CAR WITH REAL SMOKE
  // ==========================================
  {
    id: "prod-suv-defender-rc-car-real-smoke-149",
    name: "Sports Utility Vehicle SUV Defender Remote Control RC Car with Real Smoke | High Speed Racing Toy with LED Lights | Rechargeable Battery | Fully Functional RC Vehicle for Kids Boys & Girls",
    description: "Dominate every terrain with the ultimate SUV Defender Remote Control RC Off-Road Monster! Engineered with an authentic water-mist exhaust smoke generator that produces realistic smoke while accelerating. Equipped with high-intensity LED roof searchlights and headlights, 4WD independent suspension dampers, rugged anti-skid rubber off-road tires, and full-function 2.4GHz wireless control.",
    category: "Toys & Games",
    originalPrice: 3999,
    finalPrice: 149,
    rating: 4.9,
    reviewCount: 951,
    images: [
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "2.4k+ bought in past month",
    colors: [
      { name: "Defender Forest Green", hex: "#14532d", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80" },
      { name: "Matte Desert Sand", hex: "#ca8a04", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80" },
      { name: "Stealth Midnight Black", hex: "#18181b" }
    ],
    features: [
      "Real Water-Mist Smoke Effect from rear exhaust pipes (100% safe, non-toxic)",
      "High-Lumen Roof Rack LED lights and front headlights for night drives",
      "2.4GHz Full Function Remote Control (Forward, Reverse, Left, Right, Drift)",
      "Rugged 4WD independent shock-absorbing spring suspension",
      "High-grip all-terrain rubber tires for gravel, grass, tiles, and carpets",
      "High-capacity rechargeable lithium battery with USB charger cable included",
      "2.4k+ bought in past month • ⭐ 951 Verified Ratings (96% off M.R.P: ₹3,999)"
    ],
    specs: {
      "Model": "SUV Defender RC Off-Road Vehicle",
      "Special Feature": "Real Mist Smoke Generation & Working LED Searchlights",
      "Control Frequency": "2.4GHz Anti-Interference Radio Frequency",
      "Battery": "Rechargeable 3.7V Li-ion (USB Cable Included)",
      "Drive System": "High-Torque 4WD All-Terrain",
      "Scale": "1:16 Realistic Proportional Scale",
      "Age Recommendation": "4 to 14 Years & RC Enthusiasts"
    }
  },

  // ==========================================
  // 🩴 6. MEN'S BLACK FLIP FLOPS (₹39)
  // ==========================================
  {
    id: "prod-mens-black-flip-flops-cushioned-39",
    name: "Men's Black Flip Flops | Soft Cushioned Footbed | Lightweight Casual Slippers with Comfortable Thong Strap | Anti-Skid Sole for Everyday Wear, Walking & Outdoor Use",
    description: "Premium ultra-comfort Men's Black Flip Flops designed for all-day relaxation and effortless walking. Features an extra-soft ergonomic contoured footbed that cushions every step, a durable yet flexible skin-friendly thong strap that prevents chafing, and a high-traction anti-skid grooved rubber outsole engineered for wet and dry surfaces.",
    category: "Footwear & Slides",
    originalPrice: 2499,
    finalPrice: 39,
    rating: 4.2,
    reviewCount: 628,
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "20k+ bought in past month",
    colors: [
      { name: "Classic Jet Black", hex: "#18181b", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&auto=format&fit=crop&q=80" },
      { name: "Black & Charcoal Grey", hex: "#3f3f46" },
      { name: "Navy & Black", hex: "#1e293b" }
    ],
    features: [
      "Soft cushioned EVA footbed for superior all-day shock absorption",
      "Comfortable wide thong strap prevents skin bites and friction",
      "Anti-skid patterned grip outsole delivers traction on wet tiles, grass & outdoors",
      "Ultra-lightweight construction — feather-light feel on your feet",
      "Water-resistant and quick-drying, perfect for bathroom, beach, pool & daily errands",
      "20k+ bought in past month • ⭐ 4.2/5 Rating (628 Reviews)",
      "Unbelievable Deal: ₹39 Only (M.R.P: ₹2,499 - 78% off promotion)"
    ],
    specs: {
      "Type": "Men's Casual Flip Flops / Slippers / Thong Sandals",
      "Color": "Classic Jet Black",
      "Upper Material": "Soft Flexible Skin-Friendly Synthetic Strap",
      "Sole & Footbed": "Ultra-Cushioned Ergonomic EVA Foam",
      "Closure": "Slip-On Thong Style",
      "Pattern": "Textured Anti-Slip Footbed",
      "Occasion": "Daily Casual, Home Lounging, Beach, Monsoon & Travel"
    }
  }
];
