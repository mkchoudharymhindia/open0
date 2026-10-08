import { Product } from '../types';
import { SHOES_AND_TOYS_CATALOG } from './shoesAndToysCatalog';
import { MENS_JACKETS_CATALOG } from './mensJacketsCatalog';
import { APPLIANCES_AND_ETHNIC_CATALOG } from './appliancesAndEthnicCatalog';
import { SMARTPHONES_CATALOG } from './smartphonesCatalog';
import { COSMETICS_CATALOG } from './cosmeticsCatalog';

const CORE_PRODUCTS: Product[] = [
  // ==========================================
  // 👗 WOMEN'S DRESSES (₹29)
  // ==========================================
  {
    id: "prod-shaberry-green-dress-29",
    name: "Shaberry Women — Green Dress",
    description: "Elegant green dress for women by Shaberry. Crafted from breathable, lightweight fabric with flattering tailored silhouette, perfect for casual outings and parties.",
    category: "Women's Dresses",
    originalPrice: 1999,
    finalPrice: 29,
    rating: 4.9,
    reviewCount: 342,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹29 ONLY",
    colors: [
      { name: "Emerald Green", hex: "#065f46", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80" },
      { name: "Sage Green", hex: "#84cc16" }
    ],
    features: [
      "100% Genuine Shaberry Women Collection",
      "Premium breathable poly-cotton blend",
      "Flattering fit with comfort waist",
      "Machine washable, color fast guaranteed",
      "Fast Doorstep Delivery"
    ],
    specs: {
      "Brand": "Shaberry",
      "Category": "Women's Dress",
      "Color": "Green",
      "Pattern": "Solid A-Line",
      "Occasion": "Casual / Party",
      "Fabric": "Poly-Crepe Blend"
    }
  },
  {
    id: "prod-shaberry-black-brown-dress-29",
    name: "Shaberry Women — Black/Brown Dress",
    description: "Contemporary two-tone Black and Brown dress by Shaberry. Features modern contrast panels, comfortable round neckline, and stylish midi cut.",
    category: "Women's Dresses",
    originalPrice: 2199,
    finalPrice: 29,
    rating: 4.8,
    reviewCount: 289,
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹29 ONLY",
    colors: [
      { name: "Black / Earth Brown", hex: "#1c1917", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Original Shaberry Designer Cut",
      "Chic contrast black & earth brown detailing",
      "Soft skin-friendly smooth fabric",
      "Wrinkle-resistant durable finish"
    ],
    specs: {
      "Brand": "Shaberry",
      "Category": "Women's Dress",
      "Color": "Black / Brown",
      "Style": "Modern Contrast Midi",
      "Fabric": "Soft Stretch Rayon"
    }
  },
  {
    id: "prod-shaberry-beige-bodycon-dress-29",
    name: "Shaberry Women — Beige Bodycon Dress",
    description: "Stunning figure-sculpting Beige Bodycon Dress by Shaberry. Premium ribbed stretch knit that hugs curves comfortably with high neckline and sleeveless cut.",
    category: "Women's Dresses",
    originalPrice: 2499,
    finalPrice: 29,
    rating: 4.9,
    reviewCount: 415,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹29 ONLY",
    colors: [
      { name: "Neutral Beige", hex: "#d6c7b2", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80" },
      { name: "Warm Nude", hex: "#e5d5c5" }
    ],
    features: [
      "Signature Shaberry Bodycon Silhouette",
      "Premium 4-way stretch ribbed knit",
      "Flattering figure-hugging profile",
      "All-day shape retention"
    ],
    specs: {
      "Brand": "Shaberry",
      "Category": "Women's Dress",
      "Color": "Beige",
      "Fit": "Bodycon Fit",
      "Length": "Knee Length Midi"
    }
  },
  {
    id: "prod-shaberry-light-blue-dress-29",
    name: "Shaberry Women — Light Blue Dress",
    description: "Fresh and breezy Light Blue summer dress by Shaberry. Features gentle pleated skirt, soft pastel shade, and breathable fabric suited for warm sunny days.",
    category: "Women's Dresses",
    originalPrice: 1899,
    finalPrice: 29,
    rating: 4.8,
    reviewCount: 220,
    images: [
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹29 ONLY",
    colors: [
      { name: "Sky Blue", hex: "#7dd3fc", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Pastel summer glow tone",
      "Ultra-breathable lightweight cotton-blend",
      "Flared hemline with comfort waist"
    ],
    specs: {
      "Brand": "Shaberry",
      "Category": "Women's Dress",
      "Color": "Light Blue",
      "Sleeve": "Short Sleeves",
      "Length": "Above Knee"
    }
  },
  {
    id: "prod-shaberry-beige-dress-29",
    name: "Shaberry Women — Beige Dress",
    description: "Understated elegance in clean Beige by Shaberry. Relaxed A-line cut with tasteful minimalist detailing, perfect for college, work, or casual brunch.",
    category: "Women's Dresses",
    originalPrice: 1799,
    finalPrice: 29,
    rating: 4.7,
    reviewCount: 198,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹29 ONLY",
    colors: [
      { name: "Classic Beige", hex: "#e7d8c9", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Timeless minimalist beige tone",
      "Breathable woven drape fabric",
      "Concealed side zip closure"
    ],
    specs: {
      "Brand": "Shaberry",
      "Category": "Women's Dress",
      "Color": "Beige",
      "Style": "A-Line Relaxed",
      "Care": "Gentle Machine Wash"
    }
  },
  {
    id: "prod-shaberry-bodycon-red-dress-29",
    name: "Shaberry Women Bodycon — Red Dress",
    description: "Showstopper Scarlet Red Bodycon dress by Shaberry. Vibrant deep red stretch fabric with premium sculpted contour seams designed to stand out.",
    category: "Women's Dresses",
    originalPrice: 2599,
    finalPrice: 29,
    rating: 5.0,
    reviewCount: 520,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹29 ONLY",
    colors: [
      { name: "Vibrant Scarlet Red", hex: "#dc2626", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Striking vibrant red party look",
      "Premium contour bodycon stretch",
      "Breathable double-lined inner chest",
      "High durability color lock"
    ],
    specs: {
      "Brand": "Shaberry",
      "Category": "Women's Dress",
      "Color": "Red",
      "Fit": "Bodycon Party Fit",
      "Neckline": "Sweetheart / Square Neck"
    }
  },
  {
    id: "prod-shaberry-printed-dress-29",
    name: "Shaberry Women — Printed Dress",
    description: "Charming floral/botanical printed dress by Shaberry. Crafted with flowy georgette fabric, ruffled hemline, and delicate waist tie-up sash.",
    category: "Women's Dresses",
    originalPrice: 2099,
    finalPrice: 29,
    rating: 4.8,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹29 ONLY",
    colors: [
      { name: "Floral Print Multi", hex: "#f472b6", image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Artistic floral botanical print",
      "Lightweight flowing georgette drape",
      "Adjustable tie-up waist belt"
    ],
    specs: {
      "Brand": "Shaberry",
      "Category": "Women's Dress",
      "Pattern": "Allover Floral Print",
      "Hemline": "Ruffled Flared",
      "Lining": "Full Inner Lining"
    }
  },
  {
    id: "prod-miya-by-shaberry-printed-dress-29",
    name: "Miya By Shaberry Women — Printed Dress",
    description: "Exclusive designer edition Miya By Shaberry printed dress. Fusion geometric & ethnic print motif on soft viscose silk with contrast border details.",
    category: "Women's Dresses",
    originalPrice: 2799,
    finalPrice: 29,
    rating: 4.9,
    reviewCount: 388,
    images: [
      "https://images.unsplash.com/photo-1617059063772-34532796cdb5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹29 ONLY",
    colors: [
      { name: "Designer Multi Print", hex: "#9333ea", image: "https://images.unsplash.com/photo-1617059063772-34532796cdb5?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Miya Signature Capsule Collection",
      "Premium silky soft drape feel",
      "Contemporary Bohemian fusion cut",
      "Deep vibrant colorfast dyes"
    ],
    specs: {
      "Brand": "Miya By Shaberry",
      "Category": "Women's Dress",
      "Style": "Designer Printed Midi",
      "Fabric": "Viscose Rayon Silk",
      "Fit": "Regular Comfort Fit"
    }
  },

  // ==========================================
  // 👖 MEN'S JEANS (₹99)
  // ==========================================
  {
    id: "prod-lzard-blue-jeans-32-34-99",
    name: "Lzard Men — Blue Jeans — Size 32, 34",
    description: "Premium heavy-duty authentic denim jeans by Lzard Men. Classic indigo wash with reinforced dual-stitching, copper brass rivets, and comfortable mid-rise waist.",
    category: "Men's Jeans",
    originalPrice: 2499,
    finalPrice: 99,
    rating: 4.9,
    reviewCount: 612,
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹99 ONLY",
    variant: "Size 32, 34",
    colors: [
      { name: "Classic Indigo Blue", hex: "#1e3a8a", image: "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "100% Genuine Lzard Heavyweight Denim",
      "Available in Sizes: 32 and 34",
      "Stretch comfort with 2% elastane",
      "Heavy duty brass YKK zipper fly",
      "5-pocket western utility design"
    ],
    specs: {
      "Brand": "Lzard",
      "Sizes Available": "32, 34",
      "Fit": "Regular Straight Leg",
      "Color": "Indigo Blue",
      "Fabric": "98% Cotton, 2% Elastane"
    }
  },
  {
    id: "prod-lzard-blue-jeans-regular-99",
    name: "Lzard Men — Blue Jeans",
    description: "Authentic regular wash blue denim by Lzard Men. Everyday wear staple featuring whiskered thighs, durable bartack reinforcements, and all-day stretch comfort.",
    category: "Men's Jeans",
    originalPrice: 2299,
    finalPrice: 99,
    rating: 4.8,
    reviewCount: 440,
    images: [
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹99 ONLY",
    colors: [
      { name: "Medium Stonewash Blue", hex: "#2563eb", image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Medium stonewashed premium denim",
      "Pre-shrunk ring-spun cotton fabric",
      "Breathable and durable weave",
      "Deep front coin and phone pockets"
    ],
    specs: {
      "Brand": "Lzard",
      "Category": "Men's Jeans",
      "Color": "Medium Blue",
      "Rise": "Mid Rise",
      "Wash": "Stonewash"
    }
  },
  {
    id: "prod-lzard-blue-jeans-multi-size-99",
    name: "Lzard Men — Blue Jeans — Size 28, 30, 32, 34, 42",
    description: "Versatile dark blue denim by Lzard Men offered across wide size ranges: 28, 30, 32, 34, and 42. Clean dark rinse look suitable for smart casual and office wear.",
    category: "Men's Jeans",
    originalPrice: 2699,
    finalPrice: 99,
    rating: 4.9,
    reviewCount: 524,
    images: [
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹99 ONLY",
    variant: "Size 28, 30, 32, 34, 42",
    colors: [
      { name: "Dark Navy Blue Rinse", hex: "#172554", image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Sizes Available: 28, 30, 32, 34, 42",
      "Dark navy indigo clean wash",
      "Strong reinforced belt loops",
      "Flexible spandex blend for active ease"
    ],
    specs: {
      "Brand": "Lzard",
      "Sizes": "28, 30, 32, 34, 42",
      "Fit": "Clean Straight Fit",
      "Closure": "Button & Zip Fly"
    }
  },
  {
    id: "prod-lzard-blue-jeans-slim-99",
    name: "Lzard Men — Blue Jeans",
    description: "Slim-tapered blue denim jeans by Lzard Men. Contemporary tailored fit narrowing gently towards ankle with faded wash highlights.",
    category: "Men's Jeans",
    originalPrice: 2399,
    finalPrice: 99,
    rating: 4.7,
    reviewCount: 380,
    images: [
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹99 ONLY",
    colors: [
      { name: "Light Vintage Blue", hex: "#3b82f6", image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Modern slim taper cut",
      "Vintage subtle whiskering effect",
      "Comfort stretch waistband",
      "Machine washable"
    ],
    specs: {
      "Brand": "Lzard",
      "Category": "Men's Jeans",
      "Color": "Light Blue",
      "Fit": "Slim Tapered",
      "Pockets": "5 Pockets"
    }
  },

  // ==========================================
  // 👟 MEN'S SHOES (₹99)
  // ==========================================
  {
    id: "prod-paragon-black-brown-casual-99",
    name: "Paragon — Black/Brown Casual Shoes",
    description: "Durable Black/Brown casual lifestyle shoes by Paragon. Built with high-grade synthetic leather upper, cushioned memory insole, and slip-resistant grip sole.",
    category: "Men's Shoes",
    originalPrice: 1699,
    finalPrice: 99,
    rating: 4.8,
    reviewCount: 472,
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹99 ONLY",
    colors: [
      { name: "Black / Brown Dual Tone", hex: "#292524", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "100% Genuine Paragon Footwear",
      "Dual tone Black and Brown styling",
      "Cushioned shock-absorbing footbed",
      "Non-slip traction rubber outsole"
    ],
    specs: {
      "Brand": "Paragon",
      "Category": "Casual Shoes",
      "Upper Material": "Faux Leather / Synthetic",
      "Sole Material": "TPR Rubber",
      "Closure": "Lace-Up"
    }
  },
  {
    id: "prod-paragon-white-grey-sports-99",
    name: "Paragon — White/Grey Sports Shoes",
    description: "Ultra-lightweight White/Grey athletic running shoes by Paragon. High-ventilation air mesh upper with responsive EVA midsole for gym, jogging, and daily walking.",
    category: "Men's Shoes",
    originalPrice: 1899,
    finalPrice: 99,
    rating: 4.9,
    reviewCount: 650,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹99 ONLY",
    colors: [
      { name: "White / Slate Grey", hex: "#e2e8f0", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Breathable honeycomb air mesh",
      "Featherlight EVA bounce midsole",
      "Padded ankle collar for zero chafe",
      "Ideal for running, walking & fitness"
    ],
    specs: {
      "Brand": "Paragon",
      "Category": "Sports Shoes",
      "Color": "White / Grey",
      "Sole": "High-bounce EVA",
      "Fastening": "Lace-Up"
    }
  },
  {
    id: "prod-paragon-black-slipon-sports-99",
    name: "Paragon — Black Slip-On/Sports Shoes",
    description: "Convenient slip-on athletic sneakers by Paragon. Elastic sock-fit collar for effortless slide-on wear without tying laces, paired with flexible ribbed outer sole.",
    category: "Men's Shoes",
    originalPrice: 1799,
    finalPrice: 99,
    rating: 4.8,
    reviewCount: 395,
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹99 ONLY",
    colors: [
      { name: "All Black", hex: "#0a0a0a", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Easy hands-free slip-on entry",
      "Flexible stretch knit fabric upper",
      "Impact absorbing heel cushion",
      "Anti-skid grooved sole"
    ],
    specs: {
      "Brand": "Paragon",
      "Category": "Slip-On Sports Shoes",
      "Color": "Jet Black",
      "Closure": "Slip-On / Sock Fit",
      "Weight": "Super Lightweight"
    }
  },
  {
    id: "prod-paragon-black-sports-shoes-99",
    name: "Paragon — Black Sports Shoes",
    description: "High-performance all-black sports shoes by Paragon. Engineered for durability with reinforced toe guard, breathable upper, and heavy-tread sole.",
    category: "Men's Shoes",
    originalPrice: 1999,
    finalPrice: 99,
    rating: 4.9,
    reviewCount: 510,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹99 ONLY",
    colors: [
      { name: "Matte Black", hex: "#18181b", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Rugged all-weather sports sneaker",
      "Sturdy lace lock eyelets",
      "Thick padded insole support",
      "Official Paragon quality warranty"
    ],
    specs: {
      "Brand": "Paragon",
      "Category": "Sports Shoes",
      "Color": "Black",
      "Activity": "Training / Outdoor",
      "Sole": "Dual Density Rubber"
    }
  },

  // ==========================================
  // 🎒 BAGS (₹550, ₹4,000)
  // ==========================================
  {
    id: "prod-endeavour-rucksack-blue-black-550",
    name: "Endeavour — Rucksack — Blue/Black",
    description: "High-capacity 55L adventure trekking and travel rucksack by Endeavour. Waterproof polyester ripstop fabric with padded ergonomic shoulder straps and metal back frame.",
    category: "Bags & Rucksacks",
    originalPrice: 3999,
    finalPrice: 550,
    rating: 4.9,
    reviewCount: 412,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹550 ONLY",
    colors: [
      { name: "Royal Blue / Black", hex: "#1d4ed8", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Original Endeavour Outdoor Rucksack",
      "Large 55-Litre capacity with shoe compartment",
      "Water-resistant rainproof nylon coating",
      "Ergonomic padded lumbar and hip belt",
      "External buckle loops for trekking gear"
    ],
    specs: {
      "Brand": "Endeavour",
      "Category": "Rucksack / Backpack",
      "Capacity": "55 Litres",
      "Color": "Blue / Black",
      "Material": "Waterproof Ripstop Nylon",
      "Warranty": "1-Year Brand Warranty"
    }
  },
  {
    id: "prod-endeavour-rucksack-blue-camo-4000",
    name: "Endeavour — Rucksack — Blue Camouflage",
    description: "Pro-grade expedition tactical 75L Blue Camouflage rucksack by Endeavour. Built with military-spec Cordura fabric, integrated rain fly cover, and internal aluminum stay spine.",
    category: "Bags & Rucksacks",
    originalPrice: 12999,
    finalPrice: 4000,
    rating: 5.0,
    reviewCount: 285,
    images: [
      "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isFeatured: true,
    badge: "₹4,000 ONLY",
    colors: [
      { name: "Tactical Blue Camouflage", hex: "#0284c7", image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Military-grade heavy duty Blue Camouflage",
      "Massive 75-Litre expedition load capacity",
      "Integrated emergency rain cover included",
      "Ergonomic load lifter straps with sternum whistle",
      "Hydration bladder port and ice-axe loops"
    ],
    specs: {
      "Brand": "Endeavour",
      "Category": "Pro Expedition Rucksack",
      "Capacity": "75 Litres",
      "Pattern": "Blue Camouflage",
      "Material": "Ballistic 1000D Nylon",
      "Frame": "Internal Aluminum Alloy"
    }
  },

  // ==========================================
  // 📿 JEWELLERY (₹1)
  // ==========================================
  {
    id: "prod-pragati-black-beaded-necklace-1",
    name: "PRAGATI — Alloy — Black Beaded Necklace",
    description: "Traditional yet contemporary black beaded alloy necklace (Mangalsutra chain) by PRAGATI. Featuring high-lustre black micro-beads with durable gold-tone alloy link chain.",
    category: "Jewellery",
    originalPrice: 499,
    finalPrice: 1,
    rating: 4.9,
    reviewCount: 890,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹1 ONLY",
    colors: [
      { name: "Black / Gold Tone", hex: "#18181b", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Original PRAGATI Jewellery Craftsmanship",
      "Unbelievable Launch Price: Only ₹1",
      "Skin-safe hypoallergenic alloy metal",
      "Glossy black faceted mini beads",
      "Secure lobster claw clasp with extension chain"
    ],
    specs: {
      "Brand": "PRAGATI",
      "Category": "Jewellery Necklace",
      "Material": "Alloy Base & Glossy Beads",
      "Color": "Black / Gold Accent",
      "Length": "18 Inches Adjustable"
    }
  },
  {
    id: "prod-pragati-black-necklace-set-1",
    name: "PRAGATI — Alloy — Black Necklace Set",
    description: "Complete designer jewellery set by PRAGATI. Includes statement black stone & bead studded alloy choker necklace with matching pair of dangling earrings.",
    category: "Jewellery",
    originalPrice: 899,
    finalPrice: 1,
    rating: 4.9,
    reviewCount: 975,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹1 ONLY",
    colors: [
      { name: "Black Onyx Finish", hex: "#09090b", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Complete set: 1 Necklace + 2 Matching Earrings",
      "Super Blockbuster Launch Price: ₹1",
      "Intricate vintage alloy filigree work",
      "Sparkling black faceted gemstone accents",
      "Packaged in secure gift pouch"
    ],
    specs: {
      "Brand": "PRAGATI",
      "Category": "Jewellery Set",
      "Contents": "1 Necklace + 1 Pair Earrings",
      "Material": "Alloy & Crystals",
      "Plating": "Anti-Tarnish Polish"
    }
  },

  // ==========================================
  // 🩴 FOOTWEAR (₹1)
  // ==========================================
  {
    id: "prod-slovitra-flipflops-black-white-stripes-1",
    name: "Slovitra — Flip Flops — Black/White Stripes",
    description: "Casual comfort thong flip flops by Slovitra featuring trendy black and white striped footbed. Made from high-density EVA rubber for soft cushioning at home and beach.",
    category: "Footwear & Slides",
    originalPrice: 399,
    finalPrice: 1,
    rating: 4.8,
    reviewCount: 780,
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹1 ONLY",
    colors: [
      { name: "Black / White Stripes", hex: "#262626", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Original Slovitra Comfort Footwear",
      "Unbelievable Flash Price: ₹1 Only",
      "Soft silicone thong strap with zero blisters",
      "Quick-dry water resistant footbed",
      "Anti-skid ribbed base"
    ],
    specs: {
      "Brand": "Slovitra",
      "Category": "Flip Flops",
      "Pattern": "Black & White Stripes",
      "Sole Material": "EVA Cushion",
      "Weight": "Under 120 grams"
    }
  },
  {
    id: "prod-slovitra-slides-white-black-1",
    name: "Slovitra — Slides — White/Black",
    description: "Modern minimalist slip-on slide sandals by Slovitra. Wide supportive band in White with contrasting Black sole, designed for poolside, bathroom, and indoor lounging.",
    category: "Footwear & Slides",
    originalPrice: 499,
    finalPrice: 1,
    rating: 4.9,
    reviewCount: 820,
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹1 ONLY",
    colors: [
      { name: "White Strap / Black Sole", hex: "#f8fafc", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Comfort contoured footbed slides",
      "Easy slip-on and kick-off wear",
      "Durable non-slip textured outsole",
      "Waterproof and washable"
    ],
    specs: {
      "Brand": "Slovitra",
      "Category": "Slides / Slippers",
      "Color": "White / Black",
      "Material": "Soft Molded EVA",
      "Usage": "Daily / Casual / Lounging"
    }
  },
  {
    id: "prod-slovitra-flipflops-red-black-1",
    name: "Slovitra — Flip Flops — Red/Black",
    description: "Sporty Red and Black flip flop slippers by Slovitra. Bold red strap with contrasting black footbed and cushioned shock absorbent heel.",
    category: "Footwear & Slides",
    originalPrice: 399,
    finalPrice: 1,
    rating: 4.8,
    reviewCount: 650,
    images: [
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹1 ONLY",
    colors: [
      { name: "Red / Black", hex: "#ef4444", image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Vibrant sporty red and black style",
      "Ergonomic arch support contour",
      "Flexible ultra-tough rubber strap",
      "All-weather durability"
    ],
    specs: {
      "Brand": "Slovitra",
      "Category": "Flip Flops",
      "Color": "Red / Black",
      "Strap": "Rubber",
      "Sole": "High-Density EVA"
    }
  },
  {
    id: "prod-slovitra-flipflops-black-red-1",
    name: "Slovitra — Flip Flops — Black/Red",
    description: "Classic Black flip flops with energetic Red accent trim by Slovitra. Durable non-slip grip pattern suitable for all surfaces.",
    category: "Footwear & Slides",
    originalPrice: 399,
    finalPrice: 1,
    rating: 4.7,
    reviewCount: 590,
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹1 ONLY",
    colors: [
      { name: "Black / Red Accent", hex: "#171717", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "Durable black sole with red highlight border",
      "Waterproof and easy to wash",
      "Soft toe-separator peg",
      "Long-lasting everyday wear"
    ],
    specs: {
      "Brand": "Slovitra",
      "Category": "Flip Flops",
      "Color": "Black / Red",
      "Material": "EVA Foam & Rubber",
      "Type": "Thong Slippers"
    }
  },

  // ==========================================
  // ⌚ SMARTWATCH (₹99)
  // ==========================================
  {
    id: "prod-fire-boltt-epic-plus-smartwatch-99",
    name: "Fire-Boltt Epic Plus — 1.83\" 2.5D Curved Display Smartwatch — Black Strap, Free Size",
    description: "Official Fire-Boltt Epic Plus smartwatch with massive 1.83\" 2.5D curved HD display, 120+ Sports Modes, SpO2 & 24/7 Heart Rate monitoring, IP68 water resistance, and sleek Black silicone strap.",
    category: "Smartwatches",
    originalPrice: 4999,
    finalPrice: 99,
    rating: 4.9,
    reviewCount: 1420,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹99 ONLY",
    variant: "Black Strap, Free Size",
    colors: [
      { name: "Pitch Black Strap", hex: "#09090b", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "100% Genuine Fire-Boltt Epic Plus Smartwatch",
      "1.83-inch 2.5D Curved HD Vibrant Touch Display",
      "120+ Active Sports & Fitness Modes",
      "SpO2 Blood Oxygen, Heart Rate & Sleep Tracking",
      "Camera & Music Control with Smart Notifications",
      "Up to 8 Days Battery Life on Single Charge"
    ],
    specs: {
      "Brand": "Fire-Boltt",
      "Model": "Epic Plus (BSW058)",
      "Display": "1.83\" 2.5D Curved HD",
      "Strap": "Black Silicone, Free Size",
      "Water Resistance": "IP68 Dust & Water Proof",
      "Battery": "Up to 8 Days Backup",
      "Warranty": "1-Year Official Brand Warranty"
    }
  },
  {
    id: "prod-smart-watch-flagship-99",
    name: "Smart Watch",
    description: "Ultra HD 3D Curved AMOLED touch display Smart Watch with Bluetooth Calling, 120+ Sports Modes, 24/7 SpO2 & Heart Rate Tracker, and 10-day battery backup.",
    category: "Smartwatches",
    originalPrice: 3499,
    finalPrice: 99,
    rating: 4.8,
    reviewCount: 894,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹99 ONLY",
    colors: [
      { name: "Midnight Black", hex: "#09090b", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80" },
      { name: "Metallic Silver", hex: "#cbd5e1" }
    ],
    features: [
      "100% Genuine Physical Smart Watch",
      "1.96-inch HD 3D Curved AMOLED Display",
      "AI Bluetooth Calling with Built-in Speaker & Mic",
      "Real-time Heart Rate, SpO2 & Sleep Monitor",
      "IP68 Waterproof & Dustproof Rating"
    ],
    specs: {
      "Model": "Smart Watch Pro Series",
      "Display": "1.96-inch HD Curved Touch Screen",
      "Calling": "Bluetooth HD Calling with Dialpad",
      "Sensors": "Heart Rate, SpO2, Step Counter",
      "Battery": "Up to 10 Days Standby Battery"
    }
  },

  // ==========================================
  // 🎧 ELECTRONICS (₹99)
  // ==========================================
  {
    id: "prod-oneplus-buds-pro-2-obsidian-black-99",
    name: "OnePlus Buds Pro 2 — Bluetooth Headset — Obsidian Black",
    description: "Flagship OnePlus Buds Pro 2 True Wireless Bluetooth Headset in Obsidian Black. Co-created with Dynaudio, featuring 48dB Smart Adaptive Noise Cancellation, Spatial Audio, dual drivers, and 39 hours total playtime.",
    category: "Electronics & Audio",
    originalPrice: 11999,
    finalPrice: 99,
    rating: 5.0,
    reviewCount: 1840,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹99 ONLY",
    variant: "Obsidian Black",
    colors: [
      { name: "Obsidian Black", hex: "#111827", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80" }
    ],
    features: [
      "100% Genuine OnePlus Buds Pro 2",
      "48dB Smart Adaptive Active Noise Cancellation",
      "MelodyBoost Dual Drivers Co-created with Dynaudio",
      "Spatial Audio with Dynamic Head Tracking",
      "Up to 39 Hours Total Playback with Warp Charge",
      "Low Latency 54ms Gaming Mode & Bluetooth 5.3"
    ],
    specs: {
      "Brand": "OnePlus",
      "Model": "Buds Pro 2",
      "Color": "Obsidian Black",
      "Noise Cancellation": "Up to 48dB Smart ANC",
      "Battery Life": "39 Hours with Case",
      "Charging": "Warp Fast Charge + Qi Wireless",
      "Warranty": "1-Year Official OnePlus Warranty"
    }
  },

  // ==========================================
  // 📱 SMARTPHONES & LAPTOPS (₹2,700, ₹1,100, ₹3,300)
  // ==========================================
  {
    id: "prod-iphone-17-256gb-flagship",
    name: "iPhone 17",
    variant: "256GB",
    storage: "256GB",
    description: "Next-generation Apple iPhone 17 (256GB Storage) featuring aerospace Titanium design, A19 Pro Bionic chip, Super Retina XDR ProMotion 120Hz display, and upgraded 48MP Triple Fusion Camera.",
    category: "Mobiles & Laptops",
    originalPrice: 129900,
    finalPrice: 1900,
    rating: 5.0,
    reviewCount: 384,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "FROM ₹1,900",
    colors: [
      { name: "Natural Titanium", hex: "#a49d96", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80" },
      { name: "Deep Blue", hex: "#1e293b", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80" },
      { name: "Space Black", hex: "#18181b" },
      { name: "Desert Titanium", hex: "#d4b996" }
    ],
    features: [
      "100% Genuine Physical iPhone 17 (256GB)",
      "Next-Gen Apple A19 Pro Bionic Superfast Processor",
      "6.3-inch Super Retina XDR OLED 120Hz Display",
      "48MP Fusion Triple Camera System with 5x Telephoto",
      "Official Apple 1-Year India Warranty with Brand Box",
      "Free Doorstep Express Delivery Across India"
    ],
    specs: {
      "Model": "Apple iPhone 17",
      "Variant / Storage": "256GB",
      "Display": "6.3-inch Super Retina XDR 120Hz ProMotion",
      "Processor": "Apple A19 Bionic 3nm Chip",
      "Camera": "48MP Fusion Triple Lens System",
      "Battery": "All-Day Battery with Fast MagSafe & USB-C",
      "Warranty": "1-Year Official Apple Warranty",
      "Dispatch": "Ships within 24 Hours in Sealed Box"
    }
  },
  {
    id: "prod-iphone-15-flagship",
    name: "iPhone 15",
    description: "Genuine Apple iPhone 15 with Dynamic Island, 48MP main camera with 2x Telephoto, A16 Bionic chip, durable color-infused glass and aluminum design.",
    category: "Mobiles & Laptops",
    originalPrice: 79900,
    finalPrice: 1100,
    rating: 4.9,
    reviewCount: 512,
    images: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹1,100 ONLY",
    colors: [
      { name: "Midnight Black", hex: "#1c1917", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80" },
      { name: "Pastel Blue", hex: "#93c5fd", image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80" },
      { name: "Light Green", hex: "#86efac" },
      { name: "Soft Pink", hex: "#f472b6" }
    ],
    features: [
      "100% Genuine Physical iPhone 15",
      "Interactive Dynamic Island Notification Hub",
      "48MP High-Resolution Main Camera with 2x Telephoto",
      "Superfast Apple A16 Bionic Processor",
      "Official Apple 1-Year India Warranty",
      "Free Doorstep Express Delivery Across India"
    ],
    specs: {
      "Model": "Apple iPhone 15",
      "Display": "6.1-inch Super Retina XDR OLED",
      "Processor": "Apple A16 Bionic Chip",
      "Camera": "48MP Dual Camera System",
      "Connectivity": "5G, USB-C Fast Charging",
      "Warranty": "1-Year Official Apple Warranty",
      "Dispatch": "Ships within 24 Hours in Sealed Box"
    }
  },
  {
    id: "prod-laptop-flagship-3300",
    name: "Laptop",
    description: "Ultra-Slim Premium Metal Laptop with 15.6-inch Full HD Anti-Glare IPS display, Intel Core High-Speed Processor, 16GB RAM, 512GB Fast SSD, and Backlit Keyboard.",
    category: "Mobiles & Laptops",
    originalPrice: 64900,
    finalPrice: 3300,
    rating: 4.9,
    reviewCount: 418,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "₹3,300 ONLY",
    colors: [
      { name: "Space Grey", hex: "#4b5563", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80" },
      { name: "Lunar Silver", hex: "#e2e8f0", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80" },
      { name: "Matte Obsidian", hex: "#18181b" }
    ],
    features: [
      "100% Genuine Physical Core Laptop",
      "15.6-inch Full HD Micro-Edge Anti-Glare IPS Display",
      "16GB DDR4 High-Speed RAM + 512GB NVMe SSD",
      "Preloaded Windows 11 Home & Office Suite",
      "Precision Backlit Keyboard & Fast Charging",
      "Free Doorstep Express Delivery Across India"
    ],
    specs: {
      "Model": "Ultra-Slim Performance Laptop",
      "Display": "15.6-inch FHD (1920x1080) IPS",
      "Memory": "16GB High-Speed RAM",
      "Storage": "512GB PCIe M.2 SSD",
      "OS": "Windows 11 Home Pre-Activated",
      "Warranty": "1-Year On-Site Brand Warranty",
      "Dispatch": "Ships within 24 Hours in Reinforced Packaging"
    }
  }
];

export const ALL_PRODUCTS_CATALOG: Product[] = [
  ...SHOES_AND_TOYS_CATALOG,
  ...MENS_JACKETS_CATALOG,
  ...APPLIANCES_AND_ETHNIC_CATALOG,
  ...CORE_PRODUCTS,
  ...SMARTPHONES_CATALOG,
  ...COSMETICS_CATALOG
];
