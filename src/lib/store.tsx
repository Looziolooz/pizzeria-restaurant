"use client";

// LIEVITA — global store (cart + orders + reservations) via React Context.
// Persisted to localStorage. Time-relative mock data is initialised on the
// client (after mount) so SSR and the first client render always agree.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  findMenuItem,
  getMockOrders,
  getMockReservations,
} from "./data";
import type {
  CartLine,
  EnrichedCartLine,
  Order,
  OrderMode,
  OrderStatus,
  Reservation,
} from "./types";

interface CartState {
  mode: OrderMode;
  items: CartLine[];
}

interface StoreValue {
  // cart
  cart: CartState;
  setMode: (mode: OrderMode) => void;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  // orders
  orders: Order[];
  ordersAdd: (order: Order) => void;
  ordersUpdateStatus: (id: string, status: OrderStatus) => void;
  ordersReset: () => void;
  // reservations
  reservations: Reservation[];
  // lifecycle
  mounted: boolean;
}

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "lievita_cart";
const ORDERS_KEY = "lievita_orders";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ mode: "delivery", items: [] });
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [mounted, setMounted] = useState(false);

  // ── Hydrate from localStorage / factories (client only) ──
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "null");
      if (savedCart && Array.isArray(savedCart.items)) setCart(savedCart);
    } catch {
      /* ignore */
    }
    try {
      const savedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "null");
      setOrders(savedOrders && Array.isArray(savedOrders) ? savedOrders : getMockOrders());
    } catch {
      setOrders(getMockOrders());
    }
    setReservations(getMockReservations());
    setMounted(true);
  }, []);

  // ── Persist cart + orders after hydration ──
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      /* ignore */
    }
  }, [orders, mounted]);

  // ── Cart actions ──
  const setMode = useCallback((mode: OrderMode) => {
    setCart((c) => ({ ...c, mode }));
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    setCart((c) => {
      const items = [...c.items];
      const ex = items.find((i) => i.id === id);
      if (ex) ex.qty += qty;
      else items.push({ id, qty });
      return { ...c, items };
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart((c) => ({ ...c, items: c.items.filter((i) => i.id !== id) }));
  }, []);

  const update = useCallback((id: string, qty: number) => {
    setCart((c) => {
      if (qty <= 0) return { ...c, items: c.items.filter((i) => i.id !== id) };
      return { ...c, items: c.items.map((i) => (i.id === id ? { ...i, qty } : i)) };
    });
  }, []);

  const clear = useCallback(() => {
    setCart((c) => ({ ...c, items: [] }));
  }, []);

  // ── Orders actions ──
  const ordersAdd = useCallback((order: Order) => {
    setOrders((o) => [order, ...o]);
  }, []);

  const ordersUpdateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((o) => o.map((ord) => (ord.id === id ? { ...ord, status } : ord)));
  }, []);

  const ordersReset = useCallback(() => {
    setOrders(getMockOrders());
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      setMode,
      add,
      remove,
      update,
      clear,
      orders,
      ordersAdd,
      ordersUpdateStatus,
      ordersReset,
      reservations,
      mounted,
    }),
    [cart, orders, reservations, mounted, setMode, add, remove, update, clear, ordersAdd, ordersUpdateStatus, ordersReset]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}

// ── Derived cart hook (enriched items + totals + actions) ──
export interface CartView {
  mode: OrderMode;
  items: EnrichedCartLine[];
  subtotal: number;
  count: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  setMode: (mode: OrderMode) => void;
  clear: () => void;
}

export function useCart(): CartView {
  const { cart, add, remove, update, setMode, clear } = useStore();
  const items = cart.items
    .map((ci) => ({ ...ci, item: findMenuItem(ci.id) }))
    .filter((ci): ci is EnrichedCartLine => Boolean(ci.item));
  const subtotal = items.reduce((s, i) => s + i.item.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { mode: cart.mode, items, subtotal, count, add, remove, update, setMode, clear };
}

export function useOrders(): Order[] {
  return useStore().orders;
}

export function useReservations(): Reservation[] {
  return useStore().reservations;
}

// ── Navigation helper mapping prototype route names → App Router paths ──
export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (name: string, params?: { orderId?: string }) => {
      if (name === "confirm" && params?.orderId) {
        router.push(`/confirm/${params.orderId}`);
        return;
      }
      const map: Record<string, string> = {
        home: "/",
        menu: "/menu",
        checkout: "/checkout",
        reserve: "/reserve",
        contact: "/contact",
        admin: "/admin",
      };
      router.push(map[name] ?? "/");
    },
    [router]
  );
}
