"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartInput = Omit<CartItem, "qty">;

type AppContextValue = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: CartInput) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const AppContext = createContext<AppContextValue | null>(null);
const STORAGE_KEY = "aew-cart-v1";
const EVENT_NAME = "aew-cart-change";

const subscribe = (callback: () => void) => {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
};

const getSnapshot = () => window.localStorage.getItem(STORAGE_KEY) || "[]";
const getServerSnapshot = () => "[]";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const cart = useMemo<CartItem[]>(() => {
    try {
      const parsed = JSON.parse(snapshot);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [snapshot]);

  const write = useCallback((next: CartItem[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  const addToCart = useCallback(
    (item: CartInput) => {
      const existing = cart.find((entry) => entry.id === item.id);
      write(
        existing
          ? cart.map((entry) =>
              entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry,
            )
          : [...cart, { ...item, qty: 1 }],
      );
      setCartOpen(true);
    },
    [cart, write],
  );

  const removeFromCart = useCallback(
    (id: string) => write(cart.filter((entry) => entry.id !== id)),
    [cart, write],
  );

  const setQuantity = useCallback(
    (id: string, qty: number) =>
      write(
        qty <= 0
          ? cart.filter((entry) => entry.id !== id)
          : cart.map((entry) => (entry.id === id ? { ...entry, qty } : entry)),
      ),
    [cart, write],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      cart,
      cartCount: cart.reduce((sum, item) => sum + item.qty, 0),
      cartTotal: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart: () => write([]),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
    }),
    [cart, addToCart, removeFromCart, setQuantity, write, cartOpen, searchOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProviders");
  return context;
}
