import { Category, Product, QRPaymentSettings, ShippingSettings, WebsiteSettings } from '../types';
import { ALL_PRODUCTS_CATALOG } from './productsCatalog';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'mens-jackets',
    name: "Men's Jackets & Winterwear",
    iconName: 'Shirt',
    description: 'Quilted bomber jackets, winter puffer coats, zipper hoodies & sweatshirts from ₹119'
  },
  {
    id: 'toys-games',
    name: "Toys & Games",
    iconName: 'Smile',
    description: 'Large foosball tables, Defender smoke RC cars & family indoor games from ₹119'
  },
  {
    id: 'mixer-appliances',
    name: "Mixer & Appliances",
    iconName: 'Zap',
    description: 'Juicer mixer grinders, combo irons & top load washing machines from ₹90'
  },
  {
    id: 'womens-dresses',
    name: "Women's Dresses",
    iconName: 'Shirt',
    description: 'Shaberry designer dresses, printed Anarkali gowns & viscose kurti sets from ₹29'
  },
  {
    id: 'mens-jeans',
    name: "Men's Jeans",
    iconName: 'ShoppingBag',
    description: 'Lzard premium blue denim jeans in sizes 28 to 42'
  },
  {
    id: 'mens-shoes',
    name: "Men's Shoes",
    iconName: 'Footprints',
    description: 'Paragon casual, sports running & slip-on footwear'
  },
  {
    id: 'bags-accessories',
    name: "Bags & Rucksacks",
    iconName: 'ShoppingBag',
    description: 'Endeavour 55L & 75L adventure trekking & camo rucksacks'
  },
  {
    id: 'jewellery',
    name: "Jewellery",
    iconName: 'Sparkles',
    description: 'PRAGATI black beaded necklaces & matching sets'
  },
  {
    id: 'footwear',
    name: "Footwear & Slides",
    iconName: 'Footprints',
    description: 'Slovitra comfort flip flops, slides & daily slippers'
  },
  {
    id: 'smartwatches',
    name: "Smartwatches",
    iconName: 'Zap',
    description: 'Fire-Boltt Epic Plus & curved AMOLED smartwatches'
  },
  {
    id: 'electronics-audio',
    name: "Electronics & Audio",
    iconName: 'Smartphone',
    description: 'OnePlus Buds Pro 2 ANC earbuds & Bluetooth audio'
  },
  {
    id: 'smartphones',
    name: "Smartphones",
    iconName: 'Smartphone',
    description: 'Samsung S25 Ultra, iQOO, OnePlus Nord, Google Pixel & vivo from ₹999'
  },
  {
    id: 'cosmetics-beauty',
    name: "Cosmetics & Beauty",
    iconName: 'Sparkles',
    description: 'Primer, foundation, lipsticks, kajal, brushes, nail polish & beauty essentials'
  },
  {
    id: 'mobiles-laptops',
    name: "Mobiles & Laptops",
    iconName: 'Smartphone',
    description: 'Apple iPhone 17, iPhone 15 & Intel Core laptops'
  },
  {
    id: 'deals-offers',
    name: "Deals & Offers",
    iconName: 'Flame',
    description: 'Super blockbuster flash sale deals starting at ₹1'
  }
];

export const INITIAL_PRODUCTS: Product[] = ALL_PRODUCTS_CATALOG;

export const INITIAL_QR_SETTINGS: QRPaymentSettings = {
  enabled: true,
  upiId: 'anuchoudhary4m@okicici',
  merchantName: 'Anu Choudhary',
  instructions: 'Scan the QR code using Google Pay, PhonePe, Paytm, BHIM or any UPI app to pay Anu Choudhary (anuchoudhary4m@okicici) and submit your 12-digit UTR/Transaction ID.'
};

export const INITIAL_SHIPPING_SETTINGS: ShippingSettings = {
  standardDeliveryFee: 0,
  freeShippingThreshold: 0,
  estimatedDeliveryDays: '2–4 Business Days'
};

export const INITIAL_WEBSITE_SETTINGS: WebsiteSettings = {
  storeName: 'LuckyDrawWin',
  heroHeadline: 'LUCKYDRAWWIN',
  heroSubheadline: 'EXCLUSIVE FLASH MEGA DEALS',
  heroSupportingText: 'Shop authentic dresses, jeans, shoes, smartwatches, bags, jewellery and smartphones at unbeatable prices.',
  megaDealBanner: '🔥 MEGA LAUNCH SALE — SHABERRY DRESSES ₹29 • JEWELLERY ₹1 • FOOTWEAR ₹1 • iPHONES & GADGETS 🔥',
  supportEmail: 'support@luckydrawwin.com',
  supportPhone: '+91 98765 43210',
  supportHours: 'Mon - Sat: 10:00 AM – 7:00 PM IST',
  instagramHandle: '@luckydrawwin_official'
};
