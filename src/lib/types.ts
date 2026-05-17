export interface MenuItem {
  id: string
  cat: string
  name: string
  desc: string
  price: number
  vegan: boolean
  stock: number
  featured?: boolean
  photo?: string
}

export interface Category {
  id: string
  label: string
  sub: string
}

export interface ShopInfo {
  name: string
  tagline: string
  city: string
  region: string
  address: string
  phone: string
  email: string
  vat: string
  hours: { day: string; time: string }[]
  delivery_radius_km: number
  delivery_fee: number
  delivery_min: number
  pickup_min: number
  prep_minutes: number
}

export interface CartItem {
  id: string
  qty: number
}

export interface CartState {
  mode: "delivery" | "pickup"
  items: CartItem[]
}

export interface OrderItem {
  id: string
  qty: number
}

export interface Order {
  id: string
  customer: string
  phone: string
  email?: string
  mode: "delivery" | "pickup"
  addr: string | null
  items: OrderItem[]
  subtotal: number
  fee: number
  total: number
  status: OrderStatus
  placed_at: string
  slot: string
  payment: string
  notes?: string
}

export type OrderStatus = "received" | "preparing" | "ready" | "en_route" | "completed"

export interface InventoryItem {
  id: string
  name: string
  unit: string
  qty: number
  threshold: number
  supplier: string
}

export interface Reservation {
  id: string
  name: string
  party: number
  date: string
  time: string
  phone: string
  notes: string
  status: "confirmed" | "pending"
}

export interface PhotoCollection {
  hero: string[]
  weekly: string
  story: string
  oven: string
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  received: "Ricevuto",
  preparing: "In preparazione",
  ready: "Pronto",
  en_route: "In consegna",
  completed: "Completato",
}

export const STATUS_COLORS: Record<OrderStatus, { bg: string; fg: string; dot: string }> = {
  received: { bg: "bg-amber/20", fg: "text-tomato-deep", dot: "bg-tomato" },
  preparing: { bg: "bg-walnut/15", fg: "text-walnut", dot: "bg-walnut" },
  ready: { bg: "bg-olive/15", fg: "text-olive", dot: "bg-olive" },
  en_route: { bg: "bg-tomato/15", fg: "text-tomato", dot: "bg-tomato" },
  completed: { bg: "bg-ink/10", fg: "text-ink-2", dot: "bg-ink-2" },
}
