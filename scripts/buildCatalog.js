import fs from 'fs';

const rawCatalog = [
  // CATEGORY 1 — HOME & HOUSEHOLD
  {
    category: 'Home & Household',
    items: [
      { name: 'Plastic Bucket', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80', desc: 'Durable heavy-duty multi-purpose household plastic bucket with sturdy handle.' },
      { name: 'Mug', price: 49, orig: 99, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80', desc: 'Graduated bathroom and utility plastic bath mug with smooth grip.' },
      { name: 'Storage Box', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&auto=format&fit=crop&q=80', desc: 'Stackable organizer storage container box with snap-lock lid.' },
      { name: 'Dustbin', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=80', desc: 'Pedal-operated durable household waste dustbin with inner bucket.' },
      { name: 'Hanger Set', price: 99, orig: 199, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', desc: 'Pack of 10 heavy duty non-slip wardrobe clothes hangers.' },
      { name: 'Clothes Hanger', price: 29, orig: 59, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', desc: 'Slim ergonomic single garment clothes hanger with strap hooks.' },
      { name: 'Door Mat', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop&q=80', desc: 'Quick-absorbing anti-skid welcome entrance door mat.' },
      { name: 'Floor Mat', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=800&auto=format&fit=crop&q=80', desc: 'Thick plush microfibre anti-slip living room floor runner mat.' },
      { name: 'Laundry Basket', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&auto=format&fit=crop&q=80', desc: 'Foldable mesh breathable laundry hamper clothes storage basket.' },
      { name: 'Water Bottle', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80', desc: 'BPA-free leakproof ergonomic gym and office water bottle 1L.' },
      { name: 'Thermos Flask', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1570824104453-508955ab713e?w=800&auto=format&fit=crop&q=80', desc: 'Double wall vacuum insulated stainless steel hot & cold thermos flask.' },
      { name: 'Mosquito Net', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80', desc: 'Pop-up foldable breathable mesh double bed mosquito net tent.' },
      { name: 'Ironing Board', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&auto=format&fit=crop&q=80', desc: 'Height-adjustable folding steel ironing board with heat-resistant pad.' },
      { name: 'Clothes Clips Set', price: 59, orig: 119, img: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&auto=format&fit=crop&q=80', desc: 'Set of 24 rust-resistant stainless steel & plastic windproof clothes pegs.' },
      { name: 'Plastic Stool', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop&q=80', desc: 'Reinforced anti-slip bathroom and kitchen plastic utility stool.' }
    ]
  },

  // CATEGORY 2 — CLEANING & HOUSEHOLD
  {
    category: 'Cleaning & Household',
    items: [
      { name: 'Floor Cleaner', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80', desc: 'Disinfectant surface & marble floor cleaning liquid with citrus fragrance.' },
      { name: 'Toilet Cleaner', price: 89, orig: 149, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80', desc: 'Thick germ-kill hydrochloric formula toilet bowl descaling liquid 500ml.' },
      { name: 'Glass Cleaner', price: 99, orig: 159, img: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80', desc: 'Streak-free mirror, window and windshield shine spray with trigger pump.' },
      { name: 'Dishwash Liquid', price: 79, orig: 129, img: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&auto=format&fit=crop&q=80', desc: 'Grease cutting active lemon power concentrate dishwash liquid gel.' },
      { name: 'Dishwash Bar', price: 10, orig: 20, img: 'https://images.unsplash.com/photo-1607006314330-9118990c7414?w=800&auto=format&fit=crop&q=80', desc: 'Long lasting utensil cleansing dishwash bar with anti-grease scrubber.' },
      { name: 'Detergent Powder', price: 149, orig: 229, img: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=80', desc: 'Enzyme-rich stain remover washing machine & bucket laundry detergent powder 1kg.' },
      { name: 'Phenyl', price: 79, orig: 129, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80', desc: 'White concentrated pine disinfectant phenyl for germ protection.' },
      { name: 'Scrub Pad Set', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80', desc: 'Pack of 5 heavy nylon fiber cookware scrubbing abrasive pads.' },
      { name: 'Cleaning Brush', price: 69, orig: 119, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Ergonomic stiff-bristle tile and grout scrubbing cleaning brush.' },
      { name: 'Floor Wiper', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&auto=format&fit=crop&q=80', desc: 'Wide rubber blade floor water wiper with telescopic metal pipe.' },
      { name: 'Mop', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80', desc: '360 degree spin microfibre floor mop with heavy-duty clip lock.' },
      { name: 'Broom', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Natural grass dust-free traditional Indian sweeping broom.' },
      { name: 'Microfiber Cloth Set', price: 129, orig: 219, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80', desc: 'Pack of 4 lint-free ultra absorbent multi-surface cleaning cloths.' },
      { name: 'Garbage Bags', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=80', desc: 'Roll of 30 leak-proof biodegradable medium dustbin trash bags.' },
      { name: 'Air Freshener', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80', desc: 'Automatic room and bathroom aroma fragrance spray aerosol can.' }
    ]
  },

  // CATEGORY 3 — KITCHEN & DINING
  {
    category: 'Kitchen & Dining',
    items: [
      { name: 'Stainless Steel Plate', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&auto=format&fit=crop&q=80', desc: 'Food grade rustproof mirror finish stainless steel dinner thali plate.' },
      { name: 'Stainless Steel Glass', price: 59, orig: 99, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80', desc: 'Traditional heavy gauge stainless steel drinking water glass tumbler.' },
      { name: 'Spoon Set', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1584990347449-a29eb4c9c1b4?w=800&auto=format&fit=crop&q=80', desc: 'Pack of 6 premium polished stainless steel dessert and dinner spoons.' },
      { name: 'Bowl Set', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80', desc: 'Set of 4 stackable stainless steel serving katori curry bowls.' },
      { name: 'Lunch Box', price: 199, orig: 329, img: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?w=800&auto=format&fit=crop&q=80', desc: 'Multi-tier airtight leakproof insulated office tiffin lunch box.' },
      { name: 'Water Bottle', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80', desc: 'Stainless steel single-wall fridge water storage bottle 1000ml.' },
      { name: 'Storage Container Set', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1584990347449-a29eb4c9c1b4?w=800&auto=format&fit=crop&q=80', desc: 'Set of 6 airtight pantry food and spice storage grocery containers.' },
      { name: 'Cutting Board', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80', desc: 'Heavy bamboo and food-safe textured vegetable chopping board.' },
      { name: 'Kitchen Knife', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop&q=80', desc: 'Razor sharp stainless steel chef paring kitchen slicing knife.' },
      { name: 'Tawa', price: 399, orig: 649, img: 'https://images.unsplash.com/photo-1584990347449-a29eb4c9c1b4?w=800&auto=format&fit=crop&q=80', desc: 'Non-stick induction base flat roti and dosa tawa pan.' },
      { name: 'Kadhai', price: 499, orig: 799, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80', desc: 'Heavy gauge deep frying non-stick kadhai with glass lid.' },
      { name: 'Pressure Cooker', price: 799, orig: 1299, img: 'https://images.unsplash.com/photo-1584990347449-a29eb4c9c1b4?w=800&auto=format&fit=crop&q=80', desc: '3 Litre virgin aluminium inner lid safety valve pressure cooker.' },
      { name: 'Tea Strainer', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80', desc: 'Fine double wire mesh stainless steel chai and tea filter strainer.' },
      { name: 'Gas Lighter', price: 79, orig: 139, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Electronic stainless steel spark gas stove lighter with wall mount.' },
      { name: 'Chopping Tool', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80', desc: 'Hand pull quick vegetable and dry fruit manual chopper cutter.' },
      { name: 'Spice Box', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1584990347449-a29eb4c9c1b4?w=800&auto=format&fit=crop&q=80', desc: '7 compartment stainless steel masala dabba spice container box with spoon.' },
      { name: 'Kitchen Rack', price: 399, orig: 649, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80', desc: '3-tier stainless steel countertop dish drainer and spice organizer rack.' },
      { name: 'Mixer Grinder', price: 1499, orig: 2499, img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80', desc: '500 Watt heavy duty copper motor mixer grinder with 3 stainless steel jars.' }
    ]
  },

  // CATEGORY 4 — BATHROOM & PERSONAL CARE
  {
    category: 'Bathroom & Personal Care',
    items: [
      { name: 'Bath Soap', price: 40, orig: 70, img: 'https://images.unsplash.com/photo-1607006314330-9118990c7414?w=800&auto=format&fit=crop&q=80', desc: 'Moisturizing glycerine and neem skin cleansing bathing soap bar.' },
      { name: 'Shampoo', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80', desc: 'Anti-dandruff and nourishing scalp hair therapy shampoo 200ml.' },
      { name: 'Toothpaste', price: 79, orig: 129, img: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&auto=format&fit=crop&q=80', desc: 'Herbal fluoride cavity protection fresh mint dental toothpaste.' },
      { name: 'Toothbrush', price: 39, orig: 69, img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80', desc: 'Ultra-soft charcoal infused enamel care flexible toothbrush.' },
      { name: 'Face Wash', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80', desc: 'Oil clear deep cleansing salicylic foaming face wash 100ml.' },
      { name: 'Body Lotion', price: 199, orig: 329, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'Cocoa butter intensive 24hr deep moisture skin body lotion.' },
      { name: 'Hair Oil', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80', desc: 'Pure cold-pressed coconut and amla herbal hair nourishing oil.' },
      { name: 'Comb', price: 39, orig: 69, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'Anti-static pure neem wood wide-tooth detangling hair comb.' },
      { name: 'Shaving Cream', price: 99, orig: 159, img: 'https://images.unsplash.com/photo-1503236353914-50d60b8982f7?w=800&auto=format&fit=crop&q=80', desc: 'Menthol cooling rich lather sensitive skin shaving cream.' },
      { name: 'Razor', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1503236353914-50d60b8982f7?w=800&auto=format&fit=crop&q=80', desc: 'Triple blade pivot head precision smooth glide safety razor.' },
      { name: 'Hand Wash', price: 99, orig: 159, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80', desc: 'Anti-bacterial pump dispenser gentle moisturizing liquid hand wash.' },
      { name: 'Bath Towel', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&auto=format&fit=crop&q=80', desc: '100% Cotton 500 GSM extra soft quick dry bathroom bath towel.' },
      { name: 'Bathroom Slippers', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', desc: 'Quick-dry anti-slip waterproof indoor bathroom slippers.' },
      { name: 'Shower Cap', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80', desc: 'Reusable double layer waterproof elastic hair shower cap.' },
      { name: 'Nail Cutter', price: 59, orig: 99, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'Stainless steel curved blade nail clipper with nail filer.' }
    ]
  },

  // CATEGORY 5 — ELECTRICAL & ELECTRONICS
  {
    category: 'Electrical & Electronics',
    items: [
      { name: 'LED Bulb 9W', price: 79, orig: 139, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', desc: 'Energy saving cool daylight B22 base 9 Watt LED bulb.' },
      { name: 'LED Bulb 12W', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', desc: 'High brightness 1200 lumen 12 Watt surge protected LED lamp.' },
      { name: 'LED Bulb 15W', price: 129, orig: 219, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', desc: 'High beam 15 Watt wide angle luminescent LED lighting bulb.' },
      { name: 'LED Tube Light', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', desc: '20 Watt 4-feet glare-free slim batten LED tube light fixture.' },
      { name: 'Night Lamp', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Smart plug-in automatic dusk to dawn warm sensor night light.' },
      { name: 'Emergency Light', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80', desc: 'Rechargeable 24 LED high brightness backup emergency light lantern.' },
      { name: 'Extension Board', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', desc: '4 Socket power extension spike board with individual switches.' },
      { name: 'Multi Plug', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', desc: '3-way universal surge protector multi-plug adapter with indicator.' },
      { name: 'USB Charger', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', desc: 'Dual port 2.4A fast charging smart wall socket power brick.' },
      { name: 'Fast Charger', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', desc: '20W PD Type-C fast power adapter with heat protection chip.' },
      { name: 'Electric Kettle', price: 599, orig: 999, img: 'https://images.unsplash.com/photo-1570824104453-508955ab713e?w=800&auto=format&fit=crop&q=80', desc: '1.8L Stainless steel rapid boil electric kettle with auto shut-off.' },
      { name: 'Table Fan', price: 899, orig: 1499, img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&auto=format&fit=crop&q=80', desc: 'High speed aerodynamic oscillating 3-blade compact desk table fan.' },
      { name: 'Electric Iron', price: 499, orig: 849, img: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&auto=format&fit=crop&q=80', desc: '1000 Watt non-stick coated soleplate lightweight dry electric iron.' },
      { name: 'Room Heater', price: 999, orig: 1699, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format&fit=crop&q=80', desc: 'Instant heating dual quartz rod room heater with overheat protection.' },
      { name: 'Bluetooth Speaker', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80', desc: 'Portable wireless waterproof Bluetooth 5.0 mini bass soundbar speaker.' },
      { name: 'Smart Watch', price: 299, orig: 699, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80', desc: 'Curved HD touch display fitness smart watch with heart rate and notifications.' },
      { name: 'Power Bank', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1609592426508-4177f1ffc33c?w=800&auto=format&fit=crop&q=80', desc: '10000mAh slim dual USB output lithium polymer portable power bank.' },
      { name: 'Earbuds', price: 399, orig: 799, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', desc: 'True Wireless TWS stereo sound Bluetooth earbuds with charging case.' }
    ]
  },

  // CATEGORY 6 — MOBILE ACCESSORIES
  {
    category: 'Mobile Accessories',
    items: [
      { name: 'Type-C Cable', price: 99, orig: 199, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', desc: 'Braided nylon 3A fast charging and high-speed data sync Type-C cable.' },
      { name: 'Lightning Cable', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', desc: 'MFi certified tangle-free fast charging lightning cable for iPhone/iPad.' },
      { name: 'Mobile Charger', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', desc: 'Universal adaptive wall charging brick with short-circuit protection.' },
      { name: 'Fast Charger', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', desc: 'Quick Charge 3.0 / PD high efficiency speed charging wall socket plug.' },
      { name: 'Mobile Cover', price: 99, orig: 199, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop&q=80', desc: 'Shockproof soft liquid silicone slim protective phone back case.' },
      { name: 'Tempered Glass', price: 49, orig: 99, img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80', desc: '9H Hardness edge-to-edge scratch resistant HD tempered glass screen protector.' },
      { name: 'Mobile Stand', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80', desc: 'Foldable adjustable angle metallic desk phone and tablet holder stand.' },
      { name: 'Car Mobile Holder', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: '360 degree rotational dashboard and AC vent suction car phone mount.' },
      { name: 'Selfie Stick', price: 249, orig: 449, img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80', desc: 'Bluetooth remote wireless extendable selfie stick tripod monopod.' },
      { name: 'OTG Adapter', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80', desc: 'High-speed metal body Type-C to USB 3.0 on-the-go data transfer adapter.' },
      { name: 'Memory Card', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80', desc: 'Class 10 high-speed MicroSD memory card with SD adapter.' },
      { name: 'Wireless Earbuds', price: 399, orig: 799, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', desc: 'Noise cancellation in-ear wireless Bluetooth earphones with mic.' },
      { name: 'Neckband', price: 299, orig: 599, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', desc: 'Magnetic sports wireless Bluetooth neckband earphones with heavy bass.' },
      { name: 'Phone Ring Holder', price: 49, orig: 99, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop&q=80', desc: '360 degree rotating metal finger ring kickstand grip for all phones.' },
      { name: 'Screen Cleaning Kit', price: 79, orig: 149, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80', desc: 'Anti-static cleaning spray bottle with microfibre cloth for smartphone screens.' }
    ]
  },

  // CATEGORY 7 — STATIONERY & OFFICE
  {
    category: 'Stationery & Office',
    items: [
      { name: 'Ball Pen', price: 10, orig: 20, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', desc: 'Smooth flowing smudge-proof fine tip blue ink ballpoint writing pen.' },
      { name: 'Gel Pen', price: 15, orig: 30, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', desc: 'Waterproof waterproof Japanese gel ink precision writing pen 0.5mm.' },
      { name: 'Pencil Set', price: 30, orig: 60, img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80', desc: 'Pack of 10 break-resistant HB graphite writing pencils with erasers.' },
      { name: 'Eraser', price: 5, orig: 10, img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80', desc: 'Non-dust soft vinyl pencil eraser for clean, residue-free erasing.' },
      { name: 'Sharpener', price: 10, orig: 20, img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80', desc: 'Rustproof high-carbon blade plastic body pencil sharpener.' },
      { name: 'Notebook', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80', desc: 'Single line rule ruled soft cover exercise notebook 172 pages.' },
      { name: 'Register', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80', desc: 'Hardbound office ledger and long study register book 240 pages.' },
      { name: 'Drawing Book', price: 59, orig: 109, img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80', desc: 'Thick cartridge paper landscape orientation art drawing sketch pad.' },
      { name: 'Marker Set', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', desc: 'Set of 4 bullet tip permanent waterproof ink colored markers.' },
      { name: 'Highlighter Set', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', desc: 'Pack of 5 pastel fluorescent chisel tip textbook highlighters.' },
      { name: 'Geometry Box', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', desc: 'Tin geometry box with self-centering compass, divider, scales & protractor.' },
      { name: 'Stapler', price: 79, orig: 139, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', desc: 'Metal body office desktop document binding stapler machine.' },
      { name: 'Stapler Pins', price: 20, orig: 40, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', desc: 'Box of 1000 standard size rust-resistant steel stapler pin refills.' },
      { name: 'Scissors', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Stainless steel multipurpose craft, paper, and kitchen scissor.' },
      { name: 'Glue Stick', price: 30, orig: 55, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', desc: 'Non-toxic quick drying clear paper adhesive craft glue stick.' },
      { name: 'Calculator', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80', desc: '12 Digit electronic dual power desktop commercial accounting calculator.' },
      { name: 'File Folder', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80', desc: 'Waterproof transparent document file folder with snap button lock.' },
      { name: 'Desk Organizer', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', desc: '4-Slot mesh metal pen stand and stationery desk tidy organizer.' }
    ]
  },

  // CATEGORY 8 — FASHION & CLOTHING
  {
    category: 'Fashion & Clothing',
    items: [
      { name: "Men's T-Shirt", price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80', desc: '100% Bio-wash combed cotton round neck casual men t-shirt.' },
      { name: "Men's Shirt", price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80', desc: 'Slim fit breathable cotton formal and casual button-down shirt.' },
      { name: "Men's Jeans", price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80', desc: 'Stretchable regular fit denim jeans with durable rivets.' },
      { name: "Men's Track Pant", price: 399, orig: 649, img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80', desc: 'Quick-dry elastic waistband gym jogging track pants with zipper pockets.' },
      { name: "Women's T-Shirt", price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80', desc: 'Soft pure cotton graphic print women round-neck summer top.' },
      { name: "Women's Top", price: 349, orig: 599, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80', desc: 'Floral printed casual western stylish women tunic top.' },
      { name: "Women's Kurti", price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80', desc: 'Pure rayon embroidered ethnic straight festive women kurti.' },
      { name: "Women's Leggings", price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80', desc: '4-Way stretch cotton lycra churidar ankle-length leggings.' },
      { name: 'Saree', price: 699, orig: 1299, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80', desc: 'Traditional art silk printed party wear saree with unstitched blouse.' },
      { name: 'Kids T-Shirt', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80', desc: 'Comfortable cartoon graphic pure cotton daily wear kids tee.' },
      { name: 'Kids Dress', price: 399, orig: 649, img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop&q=80', desc: 'Festive birthday party wear flared dress for little girls.' },
      { name: 'Shorts', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=80', desc: 'Breathable lounge and sleepwear cotton bermuda shorts with drawstring.' },
      { name: 'Socks', price: 59, orig: 119, img: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=800&auto=format&fit=crop&q=80', desc: 'Pack of 3 odor-resistant cushioned cotton ankle athletic socks.' },
      { name: 'Cap', price: 99, orig: 199, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80', desc: 'Adjustable strap washed cotton baseball cap with UV sun shield.' },
      { name: 'Belt', price: 149, orig: 299, img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop&q=80', desc: 'Reversible synthetic leather formal men belt with zinc alloy buckle.' }
    ]
  },

  // CATEGORY 9 — FOOTWEAR
  {
    category: 'Footwear',
    items: [
      { name: "Men's Slippers", price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', desc: 'Comfortable lightweight cushioned rubber slide slippers for men.' },
      { name: "Women's Slippers", price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', desc: 'Soft memory foam floral print indoor bathroom & bedroom slippers.' },
      { name: "Men's Sandals", price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', desc: 'Adjustable velcro strap waterproof outdoor casual sandals.' },
      { name: "Women's Sandals", price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80', desc: 'Chic ethnic flat strap sandals with soft footbed cushioning.' },
      { name: "Men's Shoes", price: 599, orig: 999, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80', desc: 'Lace-up breathable mesh lightweight walking and casual shoes.' },
      { name: "Women's Shoes", price: 599, orig: 999, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80', desc: 'Slip-on memory foam lightweight running sneakers for women.' },
      { name: 'Sports Shoes', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', desc: 'Shock-absorbing grip sole running and gym athletic sports shoes.' },
      { name: 'School Shoes', price: 399, orig: 649, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80', desc: 'Durable black polishable PVC sole official school uniform shoes.' },
      { name: 'Kids Shoes', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&auto=format&fit=crop&q=80', desc: 'Lightweight velcro strap cartoon print non-slip shoes for kids.' },
      { name: 'Flip-Flops', price: 99, orig: 179, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', desc: 'Flexible lightweight waterproof beach and daily flip-flop thongs.' }
    ]
  },

  // CATEGORY 10 — BEAUTY & COSMETICS
  {
    category: 'Beauty & Cosmetics',
    items: [
      { name: 'Lipstick', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80', desc: '12-Hour long stay waterproof matte finish creamy bullet lipstick.' },
      { name: 'Lip Balm', price: 49, orig: 99, img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=80', desc: 'Shea butter and strawberry essence deeply nourishing moisturizing lip balm.' },
      { name: 'Kajal', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80', desc: 'Smudge-proof waterproof 24hr intense black ayurvedic eye kajal.' },
      { name: 'Eyeliner', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80', desc: 'Precision flexi-tip quick-dry jet black liquid eye liner pen.' },
      { name: 'Mascara', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80', desc: 'Volumizing clump-free waterproof lash curling dramatic mascara.' },
      { name: 'Foundation', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'Full coverage natural poreless oil-control liquid face foundation.' },
      { name: 'Compact Powder', price: 199, orig: 329, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'SPF 15 sun protection mattifying pressed powder with applicator mirror.' },
      { name: 'Nail Polish', price: 59, orig: 119, img: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&auto=format&fit=crop&q=80', desc: 'High-gloss chip-resistant rapid drying trendy salon nail enamel.' },
      { name: 'Makeup Brush Set', price: 249, orig: 449, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'Set of 7 ultra-soft synthetic bristles contour, eyeshadow and blush brushes.' },
      { name: 'Face Cream', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80', desc: 'Vitamin E brightening day face cream with non-greasy hydration.' },
      { name: 'Face Serum', price: 249, orig: 449, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80', desc: 'Niacinamide & Vitamin C glow and dark spot correcting liquid serum.' },
      { name: 'Sunscreen', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80', desc: 'SPF 50 PA+++ broad spectrum zero white cast matte gel sunscreen.' },
      { name: 'Beauty Blender', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'Teardrop soft latex-free foundation and concealer makeup blending sponge.' },
      { name: 'Perfume', price: 299, orig: 549, img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80', desc: 'Long-lasting luxury pocket eau de parfum spray with citrus and woody notes.' },
      { name: 'Makeup Kit', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'All-in-one eyeshadow palette, blusher, and highlighter cosmetic travel set.' }
    ]
  },

  // CATEGORY 11 — TOYS & KIDS
  {
    category: 'Toys & Kids',
    items: [
      { name: 'Toy Car', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80', desc: 'Pull back die-cast metal mini sports racing car for toddlers.' },
      { name: 'Toy Gun', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80', desc: 'Safe soft foam suction dart blaster gun with 6 refill bullets.' },
      { name: 'Doll', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80', desc: 'Fashion princess doll with interchangeable dresses and shoes.' },
      { name: 'Teddy Bear', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&auto=format&fit=crop&q=80', desc: 'Ultra-soft plush cuddly stuffed teddy bear toy 30cm.' },
      { name: 'Building Blocks', price: 249, orig: 449, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80', desc: 'Set of 60 creative educational interlocking plastic brick blocks with storage box.' },
      { name: 'Puzzle', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80', desc: 'Wooden alphabet and number brain booster jigsaw puzzle board.' },
      { name: 'Coloring Book', price: 59, orig: 109, img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80', desc: 'Kids creative animal and cartoon outline coloring art book 64 pages.' },
      { name: 'Kids Drawing Set', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80', desc: '48 Piece color pencils, crayons, oil pastels, and water color art kit.' },
      { name: 'Remote Control Car', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80', desc: 'High-speed wireless 4-channel RC racing sports stunt car with headlights.' },
      { name: 'Musical Toy', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80', desc: 'Electronic battery operated baby musical piano phone with blinking lights.' },
      { name: 'Baby Rattle', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80', desc: 'Set of 4 BPA-free safe teething musical hand shake baby rattle toys.' },
      { name: 'Toy Kitchen Set', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80', desc: 'Mini cookware, utensils, and pretend vegetable cooking toy kitchen set.' },
      { name: 'Water Gun', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80', desc: 'High pressure pump pressure outdoor Holi summer pool water soaker blaster.' },
      { name: 'Educational Flash Cards', price: 129, orig: 219, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Double-sided laminated alphabet, numbers, and animals learning flash cards.' }
    ]
  },

  // CATEGORY 12 — SPORTS & FITNESS
  {
    category: 'Sports & Fitness',
    items: [
      { name: 'Cricket Bat', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80', desc: 'Full size popular willow tennis ball cricket bat with rubber sleeve.' },
      { name: 'Cricket Ball', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80', desc: 'Heavy duty rubber core felt covered red cricket tennis ball.' },
      { name: 'Cricket Stumps', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80', desc: 'Plastic cricket wicket set with 3 stumps, heavy base stand and bails.' },
      { name: 'Football', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80', desc: 'Size 5 machine stitched durable all-weather TPU training football.' },
      { name: 'Volleyball', price: 249, orig: 449, img: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&auto=format&fit=crop&q=80', desc: 'Soft touch water resistant official size outdoor volleyball.' },
      { name: 'Badminton Racket', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80', desc: 'Lightweight tempered steel high tension string badminton racket with cover.' },
      { name: 'Shuttlecock', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80', desc: 'Tube of 6 durable high stability nylon feather shuttlecocks.' },
      { name: 'Skipping Rope', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', desc: 'Adjustable ball-bearing speed jump skipping rope with foam grips.' },
      { name: 'Yoga Mat', price: 299, orig: 599, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80', desc: '6mm Thick anti-skid eco-friendly workout and meditation yoga mat.' },
      { name: 'Resistance Band', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', desc: 'Set of 5 loop latex muscle toning exercise resistance stretch bands.' },
      { name: 'Hand Grip', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', desc: 'Adjustable resistance 10-40kg forearm wrist hand grip strengthener.' },
      { name: 'Dumbbell 1kg', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=800&auto=format&fit=crop&q=80', desc: 'Pair of 1kg vinyl coated ergonomic non-slip home gym hand dumbbells.' },
      { name: 'Dumbbell 2kg', price: 399, orig: 649, img: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=800&auto=format&fit=crop&q=80', desc: 'Pair of 2kg heavy cast iron PVC anti-roll bicep workout dumbbells.' },
      { name: 'Gym Gloves', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', desc: 'Breathable padded palm weight lifting fitness gym workout gloves.' },
      { name: 'Sports Water Bottle', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80', desc: '750ml Squeeze sports cycling and gym water sipper bottle.' }
    ]
  },

  // CATEGORY 13 — BAGS & ACCESSORIES
  {
    category: 'Bags & Accessories',
    items: [
      { name: 'School Bag', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', desc: 'Waterproof 3-compartment multi-pocket ergonomic student school backpack.' },
      { name: 'College Backpack', price: 499, orig: 849, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', desc: 'Trendy casual 30L spacious college daypack with side water bottle mesh.' },
      { name: 'Laptop Bag', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', desc: 'Padded 15.6 inch laptop compartment backpack with USB charging port.' },
      { name: 'Travel Bag', price: 799, orig: 1399, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', desc: 'Duffel luggage travel bag with separate shoe compartment and shoulder strap.' },
      { name: 'Sling Bag', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80', desc: 'Unisex crossbody shoulder chest sling bag with anti-theft zipper.' },
      { name: 'Hand Bag', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80', desc: 'Elegant designer faux leather tote handbag with double carry handles.' },
      { name: 'Wallet', price: 149, orig: 299, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80', desc: 'RFID blocking bifold leather men wallet with multiple card slots.' },
      { name: 'Purse', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80', desc: 'Compact stylish women clutch purse with coin zipper pocket.' },
      { name: 'Pouch', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', desc: 'Multipurpose waterproof stationery, cosmetic and cable pouch.' },
      { name: 'Luggage Cover', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', desc: 'Elastic scratch-resistant dustproof trolley suitcase protector cover.' },
      { name: 'Passport Cover', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80', desc: 'Slim waterproof passport travel wallet holder with boarding pass pocket.' },
      { name: 'Keychain', price: 49, orig: 99, img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=80', desc: 'Heavy duty metal alloy bottle opener carabiner keychain ring.' }
    ]
  },

  // CATEGORY 14 — AUTOMOBILE ACCESSORIES
  {
    category: 'Automobile Accessories',
    items: [
      { name: 'Car Mobile Holder', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: 'Gravity lock automatic clamp car AC vent smartphone mount.' },
      { name: 'Car Perfume', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80', desc: 'Solar rotating luxury dashboard aromatherapy air freshener diffuser.' },
      { name: 'Car Cleaning Cloth', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80', desc: '800 GSM thick plush super absorbent car washing drying microfibre towel.' },
      { name: 'Car Duster', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: 'Wax treated microfibre lint-free extendable handle car exterior duster.' },
      { name: 'Car Sun Shade', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: 'Magnetic mesh UV heat blocking side window car sun shade curtains.' },
      { name: 'Seat Belt Cover', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: 'Pair of soft breathable cushioned shoulder strap seat belt protector pads.' },
      { name: 'Steering Cover', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: 'Anti-slip breathable microfiber leather car steering wheel cover.' },
      { name: 'Car Charger', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', desc: 'Dual port 38W fast charging aluminum 12V car cigarette lighter charger.' },
      { name: 'Bike Phone Holder', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: 'Waterproof handlebar grip mobile mount bracket for motorcycles and scooters.' },
      { name: 'Bike Cover', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: 'All-weather 100% waterproof dust and UV resistant two-wheeler body cover.' },
      { name: 'Car Vacuum Cleaner', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', desc: 'High power 120W 12V wet & dry handheld portable car vacuum cleaner.' },
      { name: 'Tyre Inflator', price: 999, orig: 1699, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Heavy duty digital gauge portable auto 12V tire air compressor pump.' },
      { name: 'Car Cleaning Brush', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Soft bristle alloy wheel rim and interior AC vent detailing brush.' }
    ]
  },

  // CATEGORY 15 — TOOLS & HARDWARE
  {
    category: 'Tools & Hardware',
    items: [
      { name: 'Screwdriver Set', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: '31 in 1 magnetic precision chrome vanadium interchangeable screwdriver kit.' },
      { name: 'Plier', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: '8-inch Heavy duty insulated handle combination cutting and gripping plier.' },
      { name: 'Hammer', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'High carbon steel forged claw hammer with shock-absorbing rubber grip.' },
      { name: 'Measuring Tape', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: '5-Metre durable steel auto-lock measuring tape with belt clip.' },
      { name: 'Cutter', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Heavy duty retractable snap-off blade utility box cutter knife.' },
      { name: 'Drill Bit Set', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: '13-Piece high speed steel titanium coated masonry and wood drill bits.' },
      { name: 'Wrench Set', price: 399, orig: 649, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Set of 8 double open-end drop forged chrome plated spanners.' },
      { name: 'Allen Key Set', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: '9-Piece metric hex key L-shape allen wrench tool set.' },
      { name: 'Electrical Tape', price: 20, orig: 40, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Flame retardant heavy duty PVC electrical wire insulation tape roll.' },
      { name: 'Glue Gun', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: '40 Watt hot melt adhesive craft glue gun with 5 glue sticks.' },
      { name: 'Tool Box', price: 499, orig: 849, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Heavy duty plastic storage toolbox with organizer tray and padlock eye.' },
      { name: 'Hand Saw', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: '12-inch Triple cut rapid wood cutting carpenter hand saw.' },
      { name: 'Wire Cutter', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: 'Automatic cable stripper and sharp cutting electrician plier.' },
      { name: 'Adjustable Wrench', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80', desc: '10-inch Carbon steel laser engraved jaw adjustable pipe wrench.' }
    ]
  },

  // CATEGORY 16 — PET SUPPLIES
  {
    category: 'Pet Supplies',
    items: [
      { name: 'Pet Food Bowl', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Rustproof stainless steel anti-skid rubber base dog and cat food bowl.' },
      { name: 'Pet Water Bowl', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'No-spill splash-proof automatic gravity water drinking bowl for pets.' },
      { name: 'Dog Collar', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Adjustable reflective nylon padded neck collar with quick release buckle.' },
      { name: 'Dog Leash', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: '5-Metre heavy duty braided climbing rope dog walking leash with metal clasp.' },
      { name: 'Pet Toy Ball', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Indestructible non-toxic natural rubber teeth cleaning chew toy ball.' },
      { name: 'Chew Toy', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Cotton rope knotted interactive tug-of-war puppy teething chew toy.' },
      { name: 'Pet Brush', price: 129, orig: 219, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Self-cleaning slicker shed hair removal grooming comb for dogs & cats.' },
      { name: 'Pet Shampoo', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Anti-tick and flea soothing aloe vera conditioning pet shampoo 200ml.' },
      { name: 'Pet Bed', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Ultra-plush round calming donut sleeping cushion bed for small & medium pets.' },
      { name: 'Cat Toy', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Interactive feather teaser wand stick with bell for indoor cats.' },
      { name: 'Pet Feeding Bottle', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Silicone nipple nursing feeder bottle set for newborn puppies and kittens.' },
      { name: 'Pet Waste Bags', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80', desc: 'Roll of 60 leakproof lavender scented dog poop waste clean-up bags.' }
    ]
  },

  // CATEGORY 17 — GIFTS & ACCESSORIES
  {
    category: 'Gifts & Accessories',
    items: [
      { name: 'Gift Box', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Luxury cardboard printed gift presentation box with ribbon bow.' },
      { name: 'Greeting Card', price: 49, orig: 89, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Handcrafted 3D popup celebration birthday and anniversary card with envelope.' },
      { name: 'Birthday Decoration Kit', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Happy Birthday foil banner with metallic balloons and glue dots kit.' },
      { name: 'Photo Frame', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Classic wooden tabletop memory photo frame 5x7 with glass front.' },
      { name: 'Keychain Gift', price: 79, orig: 149, img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=80', desc: 'Personalized engraved metallic love heart souvenir keychain pendant.' },
      { name: 'Couple Mug', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80', desc: 'Set of 2 interlocking ceramic anniversary coffee mugs.' },
      { name: 'Coffee Mug', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80', desc: 'Glossy ceramic 350ml microwave safe printed morning coffee mug.' },
      { name: 'Gift Hamper', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Festive celebration dry fruit, chocolates, and greeting souvenir gift basket.' },
      { name: 'Artificial Flower', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Bunch of 12 realistic velvet red roses bouquet for gifting.' },
      { name: 'Soft Toy', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&auto=format&fit=crop&q=80', desc: 'Cute plush stuffed soft cuddle pillow toy for kids and loved ones.' },
      { name: 'LED Gift Light', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', desc: '3D Illusion warm ambient romantic night lamp with acrylic plate.' },
      { name: 'Decorative Candle', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80', desc: 'Aromatic soy wax scented glass jar candle with lavender fragrance.' }
    ]
  },

  // CATEGORY 18 — HOME DECOR
  {
    category: 'Home Decor',
    items: [
      { name: 'Wall Clock', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop&q=80', desc: 'Silent sweep quartz movement 12-inch modern round living room wall clock.' },
      { name: 'Photo Frame', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Sleek black frame gallery wall photo hanging frame with mount.' },
      { name: 'Artificial Plant', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80', desc: 'Realistic green bonsai potted indoor tabletop aesthetic desk plant.' },
      { name: 'Artificial Flower', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Long stem faux silk tulip and peony floral decorative stems.' },
      { name: 'Table Lamp', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', desc: 'Nordic minimalist fabric shade warm bedside table lamp with wood base.' },
      { name: 'LED String Light', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: '10-Metre copper wire warm white fairy rice lights with adapter plug.' },
      { name: 'Wall Sticker', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Removable waterproof PVC vinyl family tree and quote wall art decal.' },
      { name: 'Decorative Vase', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80', desc: 'Modern geometric ceramic flower vase for living room center table.' },
      { name: 'Candle Holder', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80', desc: 'Mosaic glass handcrafted tealight candle holder with sparkling glow.' },
      { name: 'Showpiece', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Handcrafted golden meditating Lord Buddha resin idol showpiece.' },
      { name: 'Cushion Cover', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80', desc: '16x16 inch Jacquard woven geometric sofa throw pillow cushion cover.' },
      { name: 'Curtain', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80', desc: '7-Feet eyelet ring long door blackout room darkening polyester curtain.' },
      { name: 'Decorative Mirror', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Round sunburst golden metal framed entryway decorative wall mirror.' },
      { name: 'Door Hanging', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80', desc: 'Traditional handcrafted bandhanwar toran door hanging with bells.' }
    ]
  },

  // CATEGORY 19 — BOOKS & EDUCATION
  {
    category: 'Books & Education',
    items: [
      { name: 'Story Book', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Illustrated classic moral stories and bedtime tales book for children.' },
      { name: "Children's Book", price: 79, orig: 139, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Early learning picture rhymes and alphabet board book for toddlers.' },
      { name: 'General Knowledge Book', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Comprehensive world, India, science and current affairs encyclopedia.' },
      { name: 'English Grammar Book', price: 199, orig: 329, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Practical English grammar, composition and spoken fluency workbook.' },
      { name: 'Hindi Grammar Book', price: 149, orig: 249, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Standard Hindi Vyakaran aur Rachna school educational handbook.' },
      { name: 'Math Practice Book', price: 129, orig: 219, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Speed math tables, mental arithmetic puzzles and practice worksheet book.' },
      { name: 'Drawing Book', price: 59, orig: 109, img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80', desc: 'Step-by-step cartoon and landscape sketching guide and drawing book.' },
      { name: 'Coloring Book', price: 59, orig: 109, img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80', desc: 'Stress relief mandala and nature coloring art book with thick bleed-proof sheets.' },
      { name: 'Competitive Exam Book', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Quantitative aptitude and logical reasoning competitive exam guide.' },
      { name: 'Dictionary', price: 199, orig: 349, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'English to Hindi bilingual compact student vocabulary dictionary.' },
      { name: 'Educational Cards', price: 129, orig: 219, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Set of 54 early childhood memory match and brain training flash cards.' },
      { name: 'Activity Book', price: 99, orig: 169, img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80', desc: 'Mazes, spot the difference, crosswords and dot-to-dot fun kids activity book.' }
    ]
  }
];

let productCount = 0;
const products = [];

rawCatalog.forEach((catObj) => {
  catObj.items.forEach((item, idx) => {
    productCount++;
    const slug = (item.name + '-' + catObj.category)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const id = `prod-${slug}-${idx + 1}`;
    const rating = +(4.6 + (Math.sin(productCount) * 0.3)).toFixed(1);
    const reviewCount = 80 + ((productCount * 47) % 640);

    products.push({
      id,
      name: item.name,
      description: item.desc,
      category: catObj.category,
      originalPrice: item.orig,
      finalPrice: item.price,
      rating,
      reviewCount,
      images: [item.img],
      inStock: true,
      badge: `₹${item.price} ONLY`,
      features: [
        '100% Genuine Physical Product',
        'Direct Manufacturer Wholesale Pricing',
        'Quality Verified & Safe Packaging',
        'Free Doorstep Delivery Across India'
      ],
      specs: {
        'Category': catObj.category,
        'Item Type': item.name,
        'Warranty': '7-Day Replacement Guarantee',
        'Dispatch': 'Ships within 24 Hours'
      }
    });
  });
});

console.log(`Generated ${products.length} products across ${rawCatalog.length} categories.`);

const fileContent = `import { Product } from '../types';

export const ALL_PRODUCTS_CATALOG: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/data/productsCatalog.ts', fileContent, 'utf-8');
console.log('Successfully wrote src/data/productsCatalog.ts');
