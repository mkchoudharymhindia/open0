import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const ORDERS_FILE = path.resolve(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read orders safely from database file
function readOrdersFromDb(): any[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      // Seed with initial realistic demo order if file does not exist
      const initialOrders = [
        {
          id: 'LDW-ORD-849201',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          customer: {
            name: 'Rahul Sharma',
            phone: '9876543210',
            email: 'rahul.sharma@example.com',
            address: 'Flat 402, Sunshine Heights, Sector 18',
            city: 'Noida',
            state: 'Uttar Pradesh',
            pincode: '201301',
            instagramId: '@rahul_s',
            termsAccepted: true,
            notes: 'Please call before delivery'
          },
          items: [
            {
              product: {
                id: 'prod-iphone-15-pro-mobile-accessories',
                name: 'iPhone 15 Pro',
                finalPrice: 1100,
                originalPrice: 134900,
                category: 'Mobile Accessories',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80']
              },
              quantity: 1,
              selectedColor: 'Natural Titanium'
            }
          ],
          subtotal: 1100,
          discount: 0,
          deliveryCharges: 0,
          totalAmount: 1100,
          paymentMethod: 'UPI / QR Code Scan',
          utrNumber: '328104829105',
          paymentStatus: 'Payment Details Submitted',
          orderStatus: 'Pending Verification',
          customerNotes: 'Please ring doorbell or call.'
        }
      ];
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), 'utf-8');
      return initialOrders;
    }
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading orders file:', err);
    return [];
  }
}

// Helper to write orders atomically to database file
function writeOrdersToDb(orders: any[]): void {
  try {
    const tempFile = `${ORDERS_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(orders, null, 2), 'utf-8');
    fs.renameSync(tempFile, ORDERS_FILE);
  } catch (err) {
    console.error('Error writing orders file:', err);
    throw new Error('Failed to persist order in database.');
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Admin login authentication
  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { passcode } = req.body;
    const validPasscodes = ['anuluckydrawwin', 'admin123', 'admin'];
    if (validPasscodes.includes(passcode)) {
      return res.json({
        success: true,
        token: `ldw_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        message: 'Admin authentication successful.'
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Invalid admin passcode. Please enter valid credentials.'
    });
  });

  // Get all orders
  app.get('/api/orders', (_req: Request, res: Response) => {
    try {
      const orders = readOrdersFromDb();
      // Sort newest first
      orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json({ success: true, count: orders.length, orders });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message || 'Failed to fetch orders.' });
    }
  });

  // Get single order by ID
  app.get('/api/orders/:id', (req: Request, res: Response) => {
    try {
      const orders = readOrdersFromDb();
      const order = orders.find(o => o.id === req.params.id);
      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found.' });
      }
      res.json({ success: true, order });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Create new order (Customer checkout)
  app.post('/api/orders', (req: Request, res: Response) => {
    try {
      const { items, customer, utrNumber, customerNotes, discount = 0, deliveryCharges = 0 } = req.body;

      // Validation
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, error: 'Order must contain at least one product.' });
      }

      if (!customer || !customer.name || !customer.phone || !customer.email || !customer.address || !customer.city || !customer.pincode) {
        return res.status(400).json({ success: false, error: 'Incomplete customer delivery information.' });
      }

      const cleanUtr = (utrNumber || '').toString().trim();
      if (!cleanUtr || cleanUtr.length < 5) {
        return res.status(400).json({ success: false, error: 'Valid UTR/Transaction ID is required.' });
      }

      // Calculate totals
      const subtotal = items.reduce((sum: number, it: any) => {
        const price = it.product?.finalPrice || 0;
        const qty = it.quantity || 1;
        return sum + price * qty;
      }, 0);

      const delCharges = typeof deliveryCharges === 'number' ? deliveryCharges : 0;
      const disc = typeof discount === 'number' ? discount : 0;
      const totalAmount = Math.max(0, subtotal - disc + delCharges);

      // Generate unique Order ID
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderId = `LDW-ORD-${dateStr}-${randomSuffix}`;

      const newOrder = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          email: customer.email.trim(),
          address: customer.address.trim(),
          city: customer.city.trim(),
          state: (customer.state || 'Maharashtra').trim(),
          pincode: customer.pincode.trim(),
          instagramId: customer.instagramId ? customer.instagramId.trim() : undefined,
          termsAccepted: true,
          notes: customerNotes || customer.notes || ''
        },
        items: items.map((it: any) => ({
          product: {
            id: it.product.id,
            name: it.product.name,
            description: it.product.description || '',
            category: it.product.category || 'General',
            originalPrice: it.product.originalPrice || it.product.finalPrice,
            finalPrice: it.product.finalPrice,
            rating: it.product.rating || 4.9,
            reviewCount: it.product.reviewCount || 100,
            images: Array.isArray(it.product.images) && it.product.images.length > 0
              ? it.product.images
              : ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'],
            badge: it.product.badge
          },
          quantity: it.quantity || 1,
          selectedColor: it.selectedColor || undefined
        })),
        subtotal,
        discount: disc,
        deliveryCharges: delCharges,
        totalAmount,
        paymentMethod: 'UPI / QR Code Scan',
        utrNumber: cleanUtr,
        paymentStatus: 'Payment Details Submitted',
        orderStatus: 'Pending Verification',
        customerNotes: customerNotes || customer.notes || ''
      };

      // Save to database
      const orders = readOrdersFromDb();
      orders.unshift(newOrder);
      writeOrdersToDb(orders);

      console.log(`[Order Created] ID: ${newOrder.id}, Amount: ₹${newOrder.totalAmount}, UTR: ${newOrder.utrNumber}`);
      return res.status(201).json({ success: true, order: newOrder });
    } catch (err: any) {
      console.error('Error creating order:', err);
      return res.status(500).json({ success: false, error: err.message || 'Failed to process order.' });
    }
  });

  // Update order (Payment Status / Order Status / Notes)
  app.patch('/api/orders/:id', (req: Request, res: Response) => {
    try {
      const { paymentStatus, orderStatus, customerNotes, adminNotes } = req.body;
      const orders = readOrdersFromDb();
      const index = orders.findIndex(o => o.id === req.params.id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Order not found.' });
      }

      const existingOrder = orders[index];

      // Validate payment status if provided
      const validPaymentStatuses = [
        'Payment Details Submitted',
        'Payment Verified',
        'Payment Failed',
        'Refund Initiated',
        'Refunded'
      ];

      const validOrderStatuses = [
        'Payment Details Submitted',
        'Pending Verification',
        'Confirmed',
        'Processing',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled'
      ];

      if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({ success: false, error: `Invalid payment status: ${paymentStatus}` });
      }

      if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
        return res.status(400).json({ success: false, error: `Invalid order status: ${orderStatus}` });
      }

      const updatedOrder = {
        ...existingOrder,
        ...(paymentStatus ? { paymentStatus } : {}),
        ...(orderStatus ? { orderStatus } : {}),
        ...(customerNotes !== undefined ? { customerNotes } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
        updatedAt: new Date().toISOString()
      };

      orders[index] = updatedOrder;
      writeOrdersToDb(orders);

      return res.json({ success: true, order: updatedOrder });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Delete an order
  app.delete('/api/orders/:id', (req: Request, res: Response) => {
    try {
      const orders = readOrdersFromDb();
      const filtered = orders.filter(o => o.id !== req.params.id);

      if (filtered.length === orders.length) {
        return res.status(404).json({ success: false, error: 'Order not found.' });
      }

      writeOrdersToDb(filtered);
      return res.json({ success: true, message: `Order ${req.params.id} permanently deleted.` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // --- VITE MIDDLEWARE / STATIC ASSETS ---
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'))) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 LuckyDrawWin Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
