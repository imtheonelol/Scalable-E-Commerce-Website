import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { CartItemWithProduct } from '../lib/database.types';
import { getCartItems, addToCart, updateCartItemQuantity, removeCartItem, clearCart } from '../services/cartService';
import { useAuth } from './AuthContext';

interface CartContextValue {
  items: CartItemWithProduct[];
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearAllItems: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  loading: false,
  itemCount: 0,
  subtotal: 0,
  addItem: async () => {},
  updateItem: async () => {},
  removeItem: async () => {},
  clearAllItems: async () => {},
  refresh: async () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    try {
      const data = await getCartItems(user.id);
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const addItem = async (productId: string, quantity = 1) => {
    if (!user) return;
    await addToCart(user.id, productId, quantity);
    await refresh();
  };

  const updateItem = async (itemId: string, quantity: number) => {
    await updateCartItemQuantity(itemId, quantity);
    await refresh();
  };

  const removeItem = async (itemId: string) => {
    await removeCartItem(itemId);
    await refresh();
  };

  const clearAllItems = async () => {
    if (!user) return;
    await clearCart(user.id);
    setItems([]);
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.products.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, loading, itemCount, subtotal, addItem, updateItem, removeItem, clearAllItems, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
