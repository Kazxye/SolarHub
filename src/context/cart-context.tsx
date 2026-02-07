"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

/* ────────────────────────────────────────────── */
/*  Types                                          */
/* ────────────────────────────────────────────── */

export interface CartItem {
  id: string;
  productName: string;
  planName: string;
  period: string;
  price: string;
  priceValue: number; // numeric for totals
  accentColor: string;
  image: string | null;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  total: number;
  /* Toast state */
  toast: { message: string; visible: boolean };
}

const CartContext = createContext<CartContextType | null>(null);

/* ────────────────────────────────────────────── */
/*  Helper — parse "R$25" → 25                     */
/* ────────────────────────────────────────────── */

function parsePrice(price: string): number {
  return Number(price.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
}

/* ────────────────────────────────────────────── */
/*  Provider                                       */
/* ────────────────────────────────────────────── */

const STORAGE_KEY = "solarhub-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [hydrated, setHydrated] = useState(false);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  /* Persist to localStorage on change */
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  /* Toast helper */
  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  }, []);

  /* Actions */
  const addItem = useCallback(
    (item: CartItem) => {
      setItems((prev) => {
        // prevent duplicate (same product + plan)
        const exists = prev.find((i) => i.id === item.id);
        if (exists) {
          showToast("Este plano já está no carrinho");
          return prev;
        }
        showToast(`${item.productName} — ${item.planName} adicionado`);
        return [...prev, item];
      });
    },
    [showToast]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const itemCount = items.length;
  const total = items.reduce((sum, i) => sum + i.priceValue, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        itemCount,
        total,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ────────────────────────────────────────────── */
/*  Hook                                           */
/* ────────────────────────────────────────────── */

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/* Re-export parsePrice for use in products */
export { parsePrice };
