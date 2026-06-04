// LIEVITA — shared domain types

export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "en_route"
  | "completed";

export type OrderMode = "delivery" | "pickup";

export interface MenuItem {
  id: string;
  cat: string;
  name: string;
  desc: string;
  price: number;
  vegan: boolean;
  stock: number;
  featured?: boolean;
  photo?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  sub: string;
}

export interface OrderItem {
  id: string;
  qty: number;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  email?: string;
  mode: OrderMode;
  addr: string | null;
  items: OrderItem[];
  total: number;
  subtotal?: number;
  fee: number;
  status: OrderStatus;
  placed_at: string;
  slot: string;
  payment?: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  qty: number;
  threshold: number;
  supplier: string;
}

export interface Reservation {
  id: string;
  name: string;
  party: number;
  date: string;
  time: string;
  phone: string;
  notes: string;
  status: "confirmed" | "pending";
}

export interface Shop {
  name: string;
  tagline: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  vat: string;
  hours: { day: string; time: string }[];
  delivery_radius_km: number;
  delivery_fee: number;
  delivery_min: number;
  pickup_min: number;
  prep_minutes: number;
}

/** A cart line as persisted (id + qty only). */
export interface CartLine {
  id: string;
  qty: number;
}

/** A cart line enriched with the resolved menu item, for rendering. */
export interface EnrichedCartLine extends CartLine {
  item: MenuItem;
}
