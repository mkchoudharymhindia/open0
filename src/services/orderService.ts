import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order, PaymentStatus, OrderStatus } from '../types';

const ORDERS_COLLECTION = 'orders';
const LOCAL_STORAGE_KEY = 'ldw_persistent_orders_v2';

// Helper to get cached orders
export function getLocalCachedOrders(): Order[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading local orders cache:', e);
  }
  return [];
}

// Helper to save orders to local mirror
export function setLocalCachedOrders(orders: Order[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.warn('Error saving local orders cache:', e);
  }
}

/**
 * Permanently save an order into Firestore database and local storage.
 */
export async function saveOrderToDatabase(order: Order): Promise<Order> {
  // Ensure orderId exists and is sanitized
  const cleanOrderId = order.orderId || order.id || `LDW-${Date.now().toString().slice(-6)}`;
  const orderDoc: Order = {
    ...order,
    id: cleanOrderId,
    orderId: cleanOrderId,
    createdAt: order.createdAt || new Date().toISOString(),
    paymentStatus: order.paymentStatus || 'Payment Details Submitted',
    orderStatus: order.orderStatus || 'Processing',
    customerNotes: order.customerNotes || ''
  };

  try {
    // 1. Write to Firestore
    const docRef = doc(db, ORDERS_COLLECTION, cleanOrderId);
    await setDoc(docRef, orderDoc);
  } catch (err) {
    console.error('Failed to write order to Firestore, saving locally:', err);
  }

  // 2. Also update local cache so instant UI feedback is preserved
  try {
    const existing = getLocalCachedOrders();
    const filtered = existing.filter(o => o.id !== cleanOrderId);
    setLocalCachedOrders([orderDoc, ...filtered]);
  } catch (e) {
    console.warn(e);
  }

  return orderDoc;
}

/**
 * Fetch all orders from Firestore, with fallback to local cached orders.
 */
export async function fetchOrdersFromDatabase(): Promise<Order[]> {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const orders = snapshot.docs.map((d: any) => d.data() as Order);
      setLocalCachedOrders(orders);
      return orders;
    }
  } catch (err) {
    console.warn('Firestore fetch failed, checking local cache:', err);
  }
  return getLocalCachedOrders();
}

/**
 * Subscribe to real-time order updates from Firestore.
 */
export function subscribeToOrders(
  onOrdersUpdated: (orders: Order[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const orders = snapshot.docs.map((d: any) => d.data() as Order);
        setLocalCachedOrders(orders);
        onOrdersUpdated(orders);
      },
      (error: any) => {
        console.warn('Realtime orders listener error:', error);
        if (onError) onError(error);
        // Fallback to local cache
        onOrdersUpdated(getLocalCachedOrders());
      }
    );
    return unsubscribe;
  } catch (e) {
    console.warn('Failed to attach realtime order listener:', e);
    onOrdersUpdated(getLocalCachedOrders());
    return () => {};
  }
}

/**
 * Update payment verification status in database.
 */
export async function updateOrderPaymentStatus(orderId: string, paymentStatus: PaymentStatus): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, { paymentStatus });
  } catch (err) {
    console.error('Failed to update payment status in Firestore:', err);
  }

  // Update local cache
  const cached = getLocalCachedOrders();
  const updated = cached.map(o => (o.id === orderId ? { ...o, paymentStatus } : o));
  setLocalCachedOrders(updated);
}

/**
 * Update order fulfillment status in database.
 */
export async function updateOrderStatus(orderId: string, orderStatus: OrderStatus): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, { orderStatus });
  } catch (err) {
    console.error('Failed to update order status in Firestore:', err);
  }

  // Update local cache
  const cached = getLocalCachedOrders();
  const updated = cached.map(o => (o.id === orderId ? { ...o, orderStatus } : o));
  setLocalCachedOrders(updated);
}

/**
 * Cancel an order in database.
 */
export async function cancelOrderInDatabase(orderId: string): Promise<void> {
  await updateOrderStatus(orderId, 'Cancelled');
}

/**
 * Delete an order permanently from database.
 */
export async function deleteOrderFromDatabase(orderId: string): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Failed to delete order from Firestore:', err);
  }

  // Update local cache
  const cached = getLocalCachedOrders();
  const updated = cached.filter(o => o.id !== orderId);
  setLocalCachedOrders(updated);
}
