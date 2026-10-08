import { Product } from '../types';

export const COSMETICS_CATALOG: Product[] = [
  {
    id: "prod-cosmetic-01-makeup-primer",
    name: "Makeup Primer",
    description: "Silky pore-minimizing oil-free makeup primer base. Creates an ultra-smooth velvety canvas, blurs blemishes, controls shine, and locks makeup in place for up to 16 hours.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 320,
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹49 ONLY",
    features: ["Pore-blurring oil-control formula", "16-hour long-wear hold", "Lightweight non-comedogenic gel"],
    specs: { "Type": "Face Primer", "Finish": "Matte Velvet", "Volume": "30ml" }
  },
  {
    id: "prod-cosmetic-02-foundation",
    name: "Foundation",
    description: "Full-coverage liquid foundation with breathable skin-like radiant finish. Water-resistant formula that blends effortlessly to even skin tone and conceal imperfections.",
    category: "Cosmetics & Beauty",
    originalPrice: 149,
    finalPrice: 75,
    rating: 4.9,
    reviewCount: 410,
    images: [
      "https://images.unsplash.com/photo-1631730486784-5456119f69ae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹75 ONLY",
    features: ["Buildable medium to full coverage", "Hydrating hyaluronic acid infusion", "Sweat & transfer resistant"],
    specs: { "Type": "Liquid Foundation", "Finish": "Natural Satin", "Volume": "35ml" }
  },
  {
    id: "prod-cosmetic-03-concealer",
    name: "Concealer",
    description: "High-pigment crease-proof liquid concealer. Instantly camouflages dark circles, blemishes, redness, and dark spots with precision cushion wand applicator.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 280,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Instant dark circle brightening", "Crease-resistant 12hr formula", "Wand applicator for precision spot coverage"],
    specs: { "Type": "Liquid Concealer", "Finish": "Radiant Matte", "Volume": "10ml" }
  },
  {
    id: "prod-cosmetic-04-bb-cream",
    name: "BB Cream",
    description: "All-in-one beauty balm BB cream combining lightweight natural tint, SPF sun protection, and all-day hydration for an effortless everyday fresh look.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.7,
    reviewCount: 195,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Moisturizer + Primer + Foundation tint", "Natural dewy healthy glow", "Non-greasy lightweight texture"],
    specs: { "Type": "Beauty Balm Cream", "SPF": "SPF 30 PA++", "Volume": "30g" }
  },
  {
    id: "prod-cosmetic-05-compact-powder",
    name: "Compact Powder",
    description: "Pressed compact powder with mirror and applicator puff. Delivers instant shine control, smooth matte coverage, and sets makeup for an all-day shine-free complexion.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 350,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Micro-milled ultra-fine powder", "Instant oil & sebum absorption", "Includes mirror and soft puff"],
    specs: { "Type": "Pressed Compact", "Finish": "Matte", "Weight": "9g" }
  },
  {
    id: "prod-cosmetic-06-loose-setting-powder",
    name: "Loose Setting Powder",
    description: "Translucent loose setting powder designed to bake and lock foundation in place without flashback or caking. Leaves skin looking airbrushed and velvety.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 260,
    images: [
      "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Zero photo flashback", "Baking & setting formula", "Blurs fine lines and pores"],
    specs: { "Type": "Loose Powder", "Shade": "Translucent", "Weight": "15g" }
  },
  {
    id: "prod-cosmetic-07-blush",
    name: "Blush",
    description: "Silky powder blush providing a naturally flushed, youthful pop of color to cheeks with blendable pigmentation and long-lasting adherence.",
    category: "Cosmetics & Beauty",
    originalPrice: 79,
    finalPrice: 40,
    rating: 4.8,
    reviewCount: 220,
    images: [
      "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹40 ONLY",
    features: ["Buildable natural rosy pigment", "Silky velvet feel", "Complements all Indian skin tones"],
    specs: { "Type": "Powder Blush", "Finish": "Soft Matte", "Weight": "6g" }
  },
  {
    id: "prod-cosmetic-08-highlighter",
    name: "Highlighter",
    description: "Luminous pressed powder highlighter delivering an ethereal multidimensional champagne glow on cheekbones, brow bones, and the bridge of the nose.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.9,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Luminous glass-skin shine", "Finely milled shimmer without chunky glitter", "Long-lasting radiant sheen"],
    specs: { "Type": "Shimmer Highlighter", "Finish": "Glow Luminous", "Weight": "7g" }
  },
  {
    id: "prod-cosmetic-09-contour",
    name: "Contour",
    description: "Sculpting contour stick and powder that defines cheekbones, jawline, and nose with cool-toned natural shadow effect that blends effortlessly.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.7,
    reviewCount: 180,
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Cool-toned natural shadow definition", "Easy glide-on blending", "Non-muddy matte formula"],
    specs: { "Type": "Face Contour Stick", "Finish": "Sculpted Matte", "Weight": "8g" }
  },
  {
    id: "prod-cosmetic-10-makeup-fixer",
    name: "Makeup Fixer / Setting Spray",
    description: "Fine-mist hydrating makeup setting spray that locks makeup in place for 24 hours, prevents melting, creasing, and fading even in hot and humid weather.",
    category: "Cosmetics & Beauty",
    originalPrice: 129,
    finalPrice: 65,
    rating: 4.9,
    reviewCount: 390,
    images: [
      "https://images.unsplash.com/photo-1608248597359-59749fb72588?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹65 ONLY",
    features: ["24-Hour long-lasting makeup seal", "Infused with aloe vera & vitamin E", "Ultra-fine continuous mist nozzle"],
    specs: { "Type": "Setting Spray Mist", "Volume": "100ml", "Finish": "Natural Matte Lock" }
  },
  {
    id: "prod-cosmetic-11-eyeshadow-palette",
    name: "Eyeshadow Palette",
    description: "Versatile eyeshadow palette with 12 highly pigmented matte, shimmer, and metallic neutral and festive shades for versatile day-to-night eye looks.",
    category: "Cosmetics & Beauty",
    originalPrice: 149,
    finalPrice: 75,
    rating: 4.9,
    reviewCount: 440,
    images: [
      "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹75 ONLY",
    features: ["12 Blendable vibrant shades", "Buttery smooth formula with zero fallout", "Mix of everyday neutrals and glam tones"],
    specs: { "Type": "Eyeshadow Palette", "Shades Count": "12 Shades", "Finish": "Matte & Shimmer" }
  },
  {
    id: "prod-cosmetic-12-eyeliner",
    name: "Eyeliner",
    description: "Precision pen-tip liquid eyeliner with waterproof, smudge-proof deep jet black formula for sharp winged cat-eyes and clean lines with 24hr stay.",
    category: "Cosmetics & Beauty",
    originalPrice: 59,
    finalPrice: 30,
    rating: 4.8,
    reviewCount: 510,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹30 ONLY",
    features: ["Waterproof & smudge-proof quick dry", "Felt tip for precision 0.1mm lines", "Intense carbon black pigment"],
    specs: { "Type": "Liquid Pen Eyeliner", "Color": "Jet Black", "Duration": "24hr Wear" }
  },
  {
    id: "prod-cosmetic-13-kajal",
    name: "Kajal",
    description: "Traditional herbal-enriched intense black kajal kohl pencil. Ophthalmologically tested, smudge-proof, and enriched with camphor and almond oil for soothing eyes.",
    category: "Cosmetics & Beauty",
    originalPrice: 49,
    finalPrice: 25,
    rating: 4.9,
    reviewCount: 650,
    images: [
      "https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹25 ONLY",
    features: ["Intense dark black in a single stroke", "16-hour smudge-proof & waterproof", "Safe for waterline & sensitive eyes"],
    specs: { "Type": "Twist-Up Kajal Kohl", "Color": "Deep Matte Black", "Weight": "0.35g" }
  },
  {
    id: "prod-cosmetic-14-mascara",
    name: "Mascara",
    description: "Volumizing and lengthening waterproof mascara with curved silicone wand that coats every lash from root to tip for false-lash volume without clumping.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 380,
    images: [
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Instant dramatic lash lift & curl", "Clump-free separated lashes", "Waterproof smudge-free formula"],
    specs: { "Type": "Lash Volume Mascara", "Wand": "Curved Silicone", "Volume": "10ml" }
  },
  {
    id: "prod-cosmetic-15-eyebrow-pencil",
    name: "Eyebrow Pencil",
    description: "Dual-ended eyebrow pencil with triangle precision tip on one side and spoolie blending brush on the other for natural, hair-like brow filling.",
    category: "Cosmetics & Beauty",
    originalPrice: 49,
    finalPrice: 25,
    rating: 4.7,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹25 ONLY",
    features: ["Hair-like stroke definition", "Built-in soft spoolie brush", "Natural dark brown finish"],
    specs: { "Type": "Retractable Brow Pencil", "Color": "Natural Dark Brown" }
  },
  {
    id: "prod-cosmetic-16-false-eyelashes",
    name: "False Eyelashes",
    description: "Handcrafted 3D faux mink false eyelashes with flexible cotton band. Lightweight, reusable up to 15 times, giving eyes glamorous volume and dimension.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 175,
    images: [
      "https://images.unsplash.com/photo-1583001809873-a128495da465?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["3D Wispy faux mink texture", "Comfortable lightweight band", "Reusable up to 15 times"],
    specs: { "Type": "Faux Mink Lashes", "Style": "Wispy Volume", "Includes": "1 Pair" }
  },
  {
    id: "prod-cosmetic-17-eyelash-curler",
    name: "Eyelash Curler",
    description: "Premium stainless steel ergonomic eyelash curler with soft silicone cushion pad that curls lashes evenly without pinching or pulling eyelids.",
    category: "Cosmetics & Beauty",
    originalPrice: 79,
    finalPrice: 40,
    rating: 4.8,
    reviewCount: 230,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹40 ONLY",
    features: ["Ergonomic grip handles", "Protective silicone refill pads", "Long-lasting dramatic curl"],
    specs: { "Material": "Stainless Steel", "Color": "Rose Gold / Silver" }
  },
  {
    id: "prod-cosmetic-18-lipstick",
    name: "Lipstick",
    description: "Creamy satin bullet lipstick packed with rich moisture and vibrant pigment. Delivers bold, smooth color with comfortable all-day wear.",
    category: "Cosmetics & Beauty",
    originalPrice: 79,
    finalPrice: 40,
    rating: 4.9,
    reviewCount: 490,
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹40 ONLY",
    features: ["Vibrant one-swipe color payoff", "Infused with jojoba oil and shea butter", "Non-drying creamy finish"],
    specs: { "Type": "Bullet Lipstick", "Finish": "Creamy Satin", "Weight": "3.8g" }
  },
  {
    id: "prod-cosmetic-19-liquid-lipstick",
    name: "Liquid Lipstick",
    description: "Ultra-matte liquid lipstick that glides on silky smooth and sets into a transfer-proof, waterproof bold matte finish that lasts up to 18 hours.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.9,
    reviewCount: 520,
    images: [
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹49 ONLY",
    features: ["18-Hour transfer-proof hold", "Zero smudge, zero feathering", "Precision applicator wand"],
    specs: { "Type": "Liquid Matte Lipstick", "Finish": "Transfer-Proof Matte", "Volume": "5ml" }
  },
  {
    id: "prod-cosmetic-20-lip-gloss",
    name: "Lip Gloss",
    description: "High-shine non-sticky lip gloss with plumping peptide complex that gives lips a juicy, glass-like reflective shine and instant hydration.",
    category: "Cosmetics & Beauty",
    originalPrice: 79,
    finalPrice: 40,
    rating: 4.8,
    reviewCount: 290,
    images: [
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹40 ONLY",
    features: ["High-gloss mirror finish", "Non-sticky, lightweight comfort", "Vitamin E nourishing formula"],
    specs: { "Type": "Shine Lip Gloss", "Finish": "Glass Sheen", "Volume": "6ml" }
  },
  {
    id: "prod-cosmetic-21-lip-balm",
    name: "Lip Balm",
    description: "Deeply moisturizing tinted lip balm with SPF 15 and natural fruit extracts. Heals chapped lips, locks in moisture, and adds a soft natural rosy tint.",
    category: "Cosmetics & Beauty",
    originalPrice: 49,
    finalPrice: 25,
    rating: 4.8,
    reviewCount: 340,
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹25 ONLY",
    features: ["Instant dry lip relief", "SPF 15 UV protection", "Natural rosy tint & fruity scent"],
    specs: { "Type": "Nourishing Lip Balm", "Weight": "4.5g" }
  },
  {
    id: "prod-cosmetic-22-lip-liner",
    name: "Lip Liner",
    description: "Velvety smooth lip pencil that defines and shapes lip contours, prevents lipstick from bleeding, and provides long-lasting definition.",
    category: "Cosmetics & Beauty",
    originalPrice: 49,
    finalPrice: 25,
    rating: 4.7,
    reviewCount: 215,
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹25 ONLY",
    features: ["Glide-on precision pencil", "Prevents lip feathering", "Matte all-day adherence"],
    specs: { "Type": "Lip Defining Pencil", "Finish": "Matte" }
  },
  {
    id: "prod-cosmetic-23-beauty-blender",
    name: "Beauty Blender",
    description: "Ultra-soft teardrop makeup blending sponge. Expands when wet to effortlessly blend foundation, concealer, and contour without absorbing excess product.",
    category: "Cosmetics & Beauty",
    originalPrice: 49,
    finalPrice: 25,
    rating: 4.9,
    reviewCount: 460,
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹25 ONLY",
    features: ["Latex-free antimicrobial foam", "Expands in water for streak-free finish", "Precision pointed tip for under-eyes"],
    specs: { "Type": "Teardrop Blending Sponge", "Material": "Hydrophilic Non-Latex" }
  },
  {
    id: "prod-cosmetic-24-makeup-brush-set-5pcs",
    name: "Makeup Brush Set – 5 pcs",
    description: "Essential 5-piece travel makeup brush kit including powder brush, foundation brush, eyeshadow brush, blending brush, and angled brow brush with ultra-soft synthetic bristles.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["5 Must-have daily brushes", "Cruelty-free soft synthetic hair", "Durable wooden handles with metal ferrule"],
    specs: { "Count": "5 Pieces", "Bristles": "Soft Synthetic", "Includes": "Face & Eye Set" }
  },
  {
    id: "prod-cosmetic-25-makeup-brush-set-10pcs",
    name: "Makeup Brush Set – 10 pcs",
    description: "Complete 10-piece professional makeup brush master collection with premium brushes for base, contour, blush, highlighting, and intricate eye makeup.",
    category: "Cosmetics & Beauty",
    originalPrice: 199,
    finalPrice: 99,
    rating: 4.9,
    reviewCount: 520,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    isTrending: true,
    badge: "₹99 ONLY",
    features: ["10 Professional salon-grade brushes", "Velvety dense fibers for high pickup", "Ideal for creams, powders, and liquids"],
    specs: { "Count": "10 Pieces", "Use": "Complete Full Face & Eye Kit" }
  },
  {
    id: "prod-cosmetic-26-face-powder-puff",
    name: "Face Powder Puff",
    description: "Velvety triangular face powder puff with finger ribbon strap for precise under-eye setting, baking, and instant T-zone shine touch-ups.",
    category: "Cosmetics & Beauty",
    originalPrice: 39,
    finalPrice: 20,
    rating: 4.8,
    reviewCount: 190,
    images: [
      "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹20 ONLY",
    features: ["Ergonomic triangular shape fits eye contours", "Soft velour material", "Washable & reusable"],
    specs: { "Type": "Triangle Powder Puff", "Material": "Soft Velour Fabric" }
  },
  {
    id: "prod-cosmetic-27-nail-polish",
    name: "Nail Polish",
    description: "Salon-shine quick-drying glossy nail lacquer with chip-resistant formula and wide fan brush for smooth, streak-free salon nails in minutes.",
    category: "Cosmetics & Beauty",
    originalPrice: 49,
    finalPrice: 25,
    rating: 4.8,
    reviewCount: 410,
    images: [
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹25 ONLY",
    features: ["Quick-dry formula in 60 seconds", "Gel-like high gloss shine", "Chip-resistant up to 7 days"],
    specs: { "Type": "Nail Enamel", "Finish": "High Gloss", "Volume": "9ml" }
  },
  {
    id: "prod-cosmetic-28-makeup-remover",
    name: "Makeup Remover",
    description: "Soothing micellar cleansing water that gently lifts away waterproof mascara, long-wear foundation, and lipstick without harsh rubbing or greasy residue.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 270,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Gently dissolves waterproof makeup", "No-rinse hydrating formula", "Suitable for sensitive skin"],
    specs: { "Type": "Micellar Cleansing Water", "Volume": "100ml" }
  },
  {
    id: "prod-cosmetic-29-cleansing-face-wash",
    name: "Cleansing Face Wash",
    description: "Gentle foaming face wash with purifying tea tree and neem extracts that washes away dirt, excess oil, and impurities while keeping skin hydrated and fresh.",
    category: "Cosmetics & Beauty",
    originalPrice: 99,
    finalPrice: 49,
    rating: 4.8,
    reviewCount: 330,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹49 ONLY",
    features: ["Deep pore cleansing", "Sulfate-free mild foam", "Refreshes and brightens skin"],
    specs: { "Type": "Foaming Face Cleanser", "Volume": "100ml" }
  },
  {
    id: "prod-cosmetic-30-cosmetic-makeup-pouch",
    name: "Cosmetic Makeup Pouch",
    description: "Spacious waterproof travel zipper cosmetic pouch with reinforced stitching, stylish gold zipper, and multiple compartments to organize all beauty essentials.",
    category: "Cosmetics & Beauty",
    originalPrice: 149,
    finalPrice: 75,
    rating: 4.9,
    reviewCount: 280,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹75 ONLY",
    features: ["Waterproof PU leather material", "Smooth durable gold zipper", "Large capacity for full makeup kit"],
    specs: { "Type": "Travel Toiletry Bag", "Material": "Waterproof PU", "Closure": "Zipper" }
  },
  {
    id: "prod-cosmetic-31-hair-clips",
    name: "Hair Clips",
    description: "Pack of trendy Korean pastel matte claw clips and snap pins. Strong internal spring with non-slip interlocking teeth for thick and thin hair.",
    category: "Cosmetics & Beauty",
    originalPrice: 39,
    finalPrice: 20,
    rating: 4.7,
    reviewCount: 190,
    images: [
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹20 ONLY",
    features: ["Non-slip interlocking teeth grip", "Durable acrylic with strong spring", "Assorted modern pastel shades"],
    specs: { "Type": "Claw Clips & Pins Set", "Quantity": "Pack of 4" }
  },
  {
    id: "prod-cosmetic-32-hair-bands",
    name: "Hair Bands",
    description: "Set of premium soft satin scrunchies and seamless elastic hair ties that hold ponytails securely without snagging, pulling, or creasing hair.",
    category: "Cosmetics & Beauty",
    originalPrice: 39,
    finalPrice: 20,
    rating: 4.8,
    reviewCount: 240,
    images: [
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹20 ONLY",
    features: ["Gentle on hair, zero breakage", "Strong stretch elasticity", "Includes assorted satin scrunchies"],
    specs: { "Type": "Hair Ties & Scrunchies", "Quantity": "Pack of 6" }
  },
  {
    id: "prod-cosmetic-33-sindoor",
    name: "Sindoor",
    description: "Traditional herbal liquid and powder red sindoor crafted with natural ingredients, safe for skin, water-resistant, and smudge-free with deep vermilion tone.",
    category: "Cosmetics & Beauty",
    originalPrice: 29,
    finalPrice: 15,
    rating: 4.9,
    reviewCount: 420,
    images: [
      "https://images.unsplash.com/photo-1601055283742-8b27e81b5553?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹15 ONLY",
    features: ["Herbal skin-safe formula without harmful chemicals", "Waterproof and sweat-resistant", "Includes sponge tip applicator"],
    specs: { "Type": "Liquid Herbal Sindoor", "Color": "Rich Scarlet Red", "Volume": "8ml" }
  },
  {
    id: "prod-cosmetic-34-bindi-pack",
    name: "Bindi Pack",
    description: "Designer velvet bindi collection booklet featuring multi-sized sparkling crystal and traditional maroon bindis with long-lasting hypoallergenic adhesive.",
    category: "Cosmetics & Beauty",
    originalPrice: 29,
    finalPrice: 15,
    rating: 4.9,
    reviewCount: 390,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹15 ONLY",
    features: ["Hypoallergenic skin-friendly gum", "Assorted small, medium, and designer stones", "Reusable velvet bindis"],
    specs: { "Type": "Velvet Stone Bindi Book", "Quantity": "60+ Bindis" }
  },
  {
    id: "prod-cosmetic-35-nail-cutter",
    name: "Nail Cutter",
    description: "Heavy-duty stainless steel nail clipper with curved precision cutting edge, integrated nail file, and ergonomic non-slip lever for smooth trimming.",
    category: "Cosmetics & Beauty",
    originalPrice: 39,
    finalPrice: 20,
    rating: 4.8,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    badge: "₹20 ONLY",
    features: ["Surgical-grade stainless steel blades", "Integrated swing-out nail cleaner and file", "Clean cut without splintering nails"],
    specs: { "Type": "Nail Clipper", "Material": "Stainless Steel" }
  }
];
