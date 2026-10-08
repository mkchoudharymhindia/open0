import { Product } from '../types';

export const SMARTPHONES_CATALOG: Product[] = [
  {
    id: "prod-samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    description: "Flagship Samsung Galaxy S25 Ultra with 200MP Quad Telephoto Camera, Snapdragon 8 Elite For Galaxy, Built-in S-Pen Stylus, Titanium Armor frame, and Galaxy AI.",
    category: "Smartphones",
    originalPrice: 134999,
    finalPrice: 4999,
    rating: 4.9,
    reviewCount: 684,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    badge: "FROM ₹4,999",
    colors: [
      { name: "Titanium Black", hex: "#1c1917", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80" },
      { name: "Titanium Gray", hex: "#6b7280" },
      { name: "Titanium Silver", hex: "#e5e7eb" }
    ],
    features: [
      "100% Genuine Physical Samsung Galaxy S25 Ultra",
      "Snapdragon 8 Elite Gen 4 For Galaxy Chipset",
      "200MP Quad Camera with 100x Space Zoom",
      "Integrated S-Pen Stylus with Bluetooth Gestures",
      "1-Year Official Samsung India Warranty",
      "Free Doorstep Express Delivery in Sealed Retail Box"
    ],
    specs: {
      "Model": "Samsung Galaxy S25 Ultra",
      "Display": "6.8-inch Dynamic AMOLED 2X 120Hz LTPO",
      "Processor": "Snapdragon 8 Elite 3nm",
      "Storage": "256GB / 512GB High-Speed UFS 4.0",
      "Camera": "200MP + 50MP + 50MP + 12MP Quad System",
      "Battery": "5000mAh with 45W Fast Charging",
      "Warranty": "1-Year Official Samsung Warranty"
    }
  },
  {
    id: "prod-iqoo-15r",
    name: "iQOO 15R",
    description: "Extreme performance monster iQOO 15R powered by Snapdragon Flagship 4nm Processor, Supercomputing Display Chip, 144Hz AMOLED screen, and 6000mAh Massive Battery.",
    category: "Smartphones",
    originalPrice: 44999,
    finalPrice: 999,
    rating: 4.8,
    reviewCount: 420,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    badge: "FROM ₹999",
    colors: [
      { name: "Legend Racing White", hex: "#f8fafc", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80" },
      { name: "Midnight Black", hex: "#111827" }
    ],
    features: [
      "100% Genuine Physical iQOO 15R 5G",
      "Flagship Processor with Dedicated Q1 Gaming Chip",
      "6000mAh Ultra-Durable Battery + 80W FlashCharge",
      "144Hz Ultra-Smooth 1.5K AMOLED Eye-Care Display",
      "1-Year Official Brand Warranty"
    ],
    specs: {
      "Model": "iQOO 15R 5G",
      "Display": "6.78-inch 1.5K 144Hz AMOLED",
      "Main Camera": "50MP Sony OIS Primary Sensor",
      "Battery": "6000mAh Li-Po",
      "Fast Charge": "80W FlashCharge Supported",
      "Warranty": "1-Year Official Brand Warranty"
    }
  },
  {
    id: "prod-oneplus-nord-6",
    name: "OnePlus Nord 6",
    description: "Sleek and blazing-fast OnePlus Nord 6 with Sony 50MP LYT-600 OIS camera, Snapdragon 7+ Gen 3 high performance, Aqua Touch display, and signature Alert Slider.",
    category: "Smartphones",
    originalPrice: 32999,
    finalPrice: 999,
    rating: 4.8,
    reviewCount: 388,
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    badge: "FROM ₹999",
    colors: [
      { name: "Nordic Blue", hex: "#38bdf8", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80" },
      { name: "Obsidian Gunmetal", hex: "#1f2937" }
    ],
    features: [
      "100% Genuine OnePlus Nord 6 5G",
      "OxygenOS Smooth Experience with 4 Years Updates",
      "50MP Sony LYT Optical Image Stabilization",
      "100W SUPERVOOC Fast Charging In Box",
      "1-Year Official OnePlus India Warranty"
    ],
    specs: {
      "Model": "OnePlus Nord 6 5G",
      "Display": "6.74-inch 120Hz Super Fluid AMOLED",
      "Camera": "50MP Sony OIS + 8MP Ultra-Wide",
      "Battery": "5500mAh with 100W Charging",
      "OS": "OxygenOS based on Android 15"
    }
  },
  {
    id: "prod-iqoo-neo-10",
    name: "iQOO Neo 10",
    description: "Speed monster iQOO Neo 10 with Snapdragon 8 Gen 3 Flagship Architecture, Dual-Chip Gaming Boost, 144Hz 8T LTPO screen, and 120W FlashCharge.",
    category: "Smartphones",
    originalPrice: 38999,
    finalPrice: 999,
    rating: 4.9,
    reviewCount: 345,
    images: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    badge: "FROM ₹999",
    colors: [
      { name: "Rally Orange / White", hex: "#f97316", image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80" },
      { name: "Shadow Shadow", hex: "#0f172a" }
    ],
    features: [
      "100% Genuine Physical iQOO Neo 10",
      "Dual Chipset: Snapdragon 8 Series + Supercomputing Q2",
      "Ultra-Fast 120W FlashCharge",
      "6043mm² VC Liquid Cooling System",
      "1-Year Official Brand Warranty"
    ],
    specs: {
      "Model": "iQOO Neo 10",
      "Screen": "6.78-inch 1.5K 144Hz 8T LTPO AMOLED",
      "Processor": "Snapdragon 8 Flagship Platform",
      "Battery": "5160mAh + 120W In-Box Charger",
      "Warranty": "1-Year Brand Warranty"
    }
  },
  {
    id: "prod-google-pixel-10",
    name: "Google Pixel 10",
    description: "Next-gen Google Pixel 10 powered by Google Tensor G5 with advanced on-device Gemini AI, pro computational photography camera bar, and 7 years of Pixel OS updates.",
    category: "Smartphones",
    originalPrice: 79999,
    finalPrice: 999,
    rating: 4.9,
    reviewCount: 462,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    badge: "FROM ₹999",
    colors: [
      { name: "Obsidian Black", hex: "#18181b", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80" },
      { name: "Porcelain White", hex: "#f1f5f9" },
      { name: "Hazel Green", hex: "#6b7280" }
    ],
    features: [
      "100% Genuine Physical Google Pixel 10",
      "Google Tensor G5 TSMC-Built Ultra-Efficient Processor",
      "Industry-Leading Computational Photography & Best Take",
      "Clean Pure Google Android 16 with 7 Years Updates",
      "1-Year Official Google India Warranty"
    ],
    specs: {
      "Model": "Google Pixel 10 5G",
      "Display": "6.3-inch Actua 120Hz OLED (2000 nits)",
      "Chip": "Google Tensor G5 + Titan M2 Security",
      "Camera": "50MP Primary + 48MP Ultrawide Macro",
      "Warranty": "1-Year Official Google Warranty"
    }
  },
  {
    id: "prod-vivo-x200t",
    name: "vivo X200T",
    description: "ZEISS Professional Imaging flagship vivo X200T with 50MP Sony IMX921 sensor, Dimensity 9400 flagship 3nm chip, Zeiss T* lens coating, and 5800mAh BlueVolt battery.",
    category: "Smartphones",
    originalPrice: 54999,
    finalPrice: 999,
    rating: 4.9,
    reviewCount: 298,
    images: [
      "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    badge: "FROM ₹999",
    colors: [
      { name: "Aurora Green", hex: "#059669", image: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=80" },
      { name: "Titanium Blue", hex: "#1e3a8a" }
    ],
    features: [
      "100% Genuine Physical vivo X200T 5G",
      "ZEISS Optics with Natural Color 2.0 Tuning",
      "Dimensity 9400 3nm Flagship Architecture",
      "IP68 / IP69 Dust and High-Pressure Water Resistance",
      "1-Year Official vivo India Warranty"
    ],
    specs: {
      "Model": "vivo X200T 5G",
      "Display": "6.67-inch Quad-Curved 1.5K 120Hz AMOLED",
      "Camera": "50MP ZEISS Main + 50MP Telephoto",
      "Battery": "5800mAh BlueVolt with 90W FlashCharge",
      "Warranty": "1-Year Official Brand Warranty"
    }
  },
  {
    id: "prod-nothing-phone-4a",
    name: "Nothing Phone (4a)",
    description: "Futuristic iconic transparent design Nothing Phone (4a) with Interactive Glyph Interface lights, Sony 50MP Dual Camera with OIS, Dimensity 7200 Pro, and Nothing OS 3.0.",
    category: "Smartphones",
    originalPrice: 31999,
    finalPrice: 1099,
    rating: 4.8,
    reviewCount: 526,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isNew: true,
    isTrending: true,
    badge: "FROM ₹1,099",
    colors: [
      { name: "Signature White", hex: "#f8fafc", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80" },
      { name: "Dark Milk Black", hex: "#18181b" }
    ],
    features: [
      "100% Genuine Physical Nothing Phone (4a)",
      "Interactive Glyph Interface with Custom LED Light Sequences",
      "50MP Sony Dual Cameras with 4K Recording",
      "Clean Bloatware-Free Nothing OS with Widget Ecosystem",
      "1-Year Official Nothing Warranty"
    ],
    specs: {
      "Model": "Nothing Phone (4a) 5G",
      "Display": "6.7-inch Flexible AMOLED 120Hz (1300 nits)",
      "Camera": "50MP Main OIS + 50MP Ultra-Wide",
      "Battery": "5000mAh with 45W Fast Charging",
      "Warranty": "1-Year Official Warranty"
    }
  }
];
