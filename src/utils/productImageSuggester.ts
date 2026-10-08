export interface AutoImageMatch {
  url: string;
  matchedKeyword: string;
  alternatives: string[];
}

// Curated high quality commercial studio photography mapping
const PRODUCT_IMAGE_DATABASE: { keywords: string[]; url: string; alternatives?: string[] }[] = [
  // iPhone 17 Pro Max
  {
    keywords: ['iphone 17 pro max', 'iphone 17 pro', '17 pro max'],
    url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80',
    alternatives: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop&q=80'
    ]
  },
  // iPhone 17
  {
    keywords: ['iphone 17'],
    url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&auto=format&fit=crop&q=80',
    alternatives: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=900&auto=format&fit=crop&q=80'
    ]
  },
  // iPhone 15 Pro
  {
    keywords: ['iphone 15 pro', '15 pro'],
    url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80',
    alternatives: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop&q=80'
    ]
  },
  // General iPhone
  {
    keywords: ['iphone', 'apple phone'],
    url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop&q=80',
    alternatives: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=900&auto=format&fit=crop&q=80'
    ]
  },
  // Smart Watch
  {
    keywords: ['smart watch', 'smartwatch', 'watch', 'fitness band'],
    url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=900&auto=format&fit=crop&q=80',
    alternatives: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&auto=format&fit=crop&q=80'
    ]
  },
  // Blue Star AC / Air Conditioner
  {
    keywords: ['blue star ac', 'ac – 5 star', 'ac 5 star', 'air conditioner', 'split ac', 'inverter ac', 'ac'],
    url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&auto=format&fit=crop&q=80',
    alternatives: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=900&auto=format&fit=crop&q=80'
    ]
  },

  // Cleaning & Household
  {
    keywords: ['floor cleaner', 'toilet cleaner', 'cleaning liquid', 'disinfectant'],
    url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['dishwash', 'detergent', 'laundry liquid', 'soap liquid'],
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['mop', 'broom', 'dustpan', 'scrub pad', 'cleaning brush'],
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['garbage bags', 'microfiber cloth', 'air freshener'],
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
  },

  // Kitchen & Dining
  {
    keywords: ['kitchen knife', 'knives', 'cutting board', 'peeler'],
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['water bottle', 'bottle', 'flask'],
    url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['cups', 'mugs', 'plates', 'spoons', 'lunch box', 'food container'],
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
  },

  // Personal Care & Bathroom
  {
    keywords: ['shampoo', 'conditioner', 'face wash', 'hair oil'],
    url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['soap', 'bath soap', 'hand wash'],
    url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['toothbrush', 'toothpaste', 'shaving razor', 'razor'],
    url: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['towel', 'bath towel', 'hand towel'],
    url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80'
  },

  // Electrical & Electronics
  {
    keywords: ['led bulb', 'bulb', 'tube light', 'panel light', 'night lamp'],
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['extension board', 'plug', 'socket', 'switch board'],
    url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['charger', 'mobile charger', 'usb charger', 'adapter'],
    url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['usb cable', 'type-c cable', 'cable', 'hdmi cable', 'aux cable'],
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['earphones', 'headphones', 'wired headphones'],
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['speaker', 'bluetooth speaker'],
    url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['power bank', 'portable battery'],
    url: 'https://images.unsplash.com/photo-1609592424368-24b52b216fb9?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['trimmer', 'shaver', 'hair dryer', 'straightener'],
    url: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80'
  },

  // Clothing & Fashion
  {
    keywords: ['t-shirt', 't shirt', 'tshirt', 'top'],
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['shirt', 'formal shirt'],
    url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['jeans', 'trousers', 'pants'],
    url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['hoodie', 'sweatshirt', 'jacket', 'coat', 'sweater'],
    url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['dress', 'saree', 'kurti', 'frock'],
    url: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800&auto=format&fit=crop&q=80'
  },

  // Footwear & Bags
  {
    keywords: ['shoes', 'sneakers', 'footwear'],
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['backpack', 'bag', 'wallet', 'purse'],
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['sunglasses', 'glasses'],
    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80'
  },

  // Stationery
  {
    keywords: ['notebook', 'journal', 'diary', 'book'],
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
  },
  {
    keywords: ['pen', 'pencil', 'marker'],
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80'
  }
];

// Fallback images per category
const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  'Home & Household': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
  'Cleaning & Household': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80',
  'Kitchen & Dining': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
  'Bathroom & Personal Care': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80',
  'Electrical & Electronics': 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80',
  'Mobile Accessories': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
  'Stationery & Office': 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
  'Fashion & Clothing': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
  'Footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
  'Beauty & Cosmetics': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
  'Toys & Kids': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80',
  'Sports & Fitness': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
  'Bags & Accessories': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
  'Automobile Accessories': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
  'Tools & Hardware': 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80',
  'Pet Supplies': 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
  'Gifts & Accessories': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
  'Home Decor': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
  'Books & Education': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
  'Deals & Offers': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80'
};

/**
 * Suggest a professional product image based on product name and category.
 */
export function suggestProductImage(name: string, category?: string): AutoImageMatch {
  const cleanName = (name || '').toLowerCase().trim();

  // 1. Direct or multi-word match
  for (const entry of PRODUCT_IMAGE_DATABASE) {
    for (const kw of entry.keywords) {
      if (cleanName.includes(kw)) {
        return {
          url: entry.url,
          matchedKeyword: kw,
          alternatives: entry.alternatives || [entry.url]
        };
      }
    }
  }

  // 2. Category match
  if (category && CATEGORY_DEFAULT_IMAGES[category]) {
    return {
      url: CATEGORY_DEFAULT_IMAGES[category],
      matchedKeyword: category,
      alternatives: [CATEGORY_DEFAULT_IMAGES[category]]
    };
  }

  // 3. Fallback generic modern product image
  const defaultUrl = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
  return {
    url: defaultUrl,
    matchedKeyword: 'general',
    alternatives: [defaultUrl]
  };
}

/**
 * Resizes and center-crops an uploaded image file into a square (800x800) data URL
 * to maintain consistent product-card format.
 */
export function cropImageToSquare(file: File, size = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Fill white backdrop
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // Center crop math
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
