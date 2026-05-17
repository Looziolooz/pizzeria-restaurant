"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { CartState, CartItem, Order, OrderStatus } from "./types"
import { MOCK_ORDERS, findMenuItem } from "./data"

interface CartContextValue {
  mode: "delivery" | "pickup"
  items: { id: string; qty: number; item: NonNullable<ReturnType<typeof findMenuItem>> }[]
  subtotal: number
  count: number
  setMode: (mode: "delivery" | "pickup") => void
  add: (id: string, qty?: number) => void
  remove: (id: string) => void
  update: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function loadCart(): CartState {
  if (typeof window === "undefined") return { mode: "delivery", items: [] }
  try {
    const saved = localStorage.getItem("dalorenzo_cart")
    return saved ? JSON.parse(saved) : { mode: "delivery", items: [] }
  } catch {
    return { mode: "delivery", items: [] }
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(loadCart)

  useEffect(() => {
    try { localStorage.setItem("dalorenzo_cart", JSON.stringify(cart)) } catch {}
  }, [cart])

  const setMode = useCallback((mode: "delivery" | "pickup") => {
    setCart(prev => ({ ...prev, mode }))
  }, [])

  const add = useCallback((id: string, qty = 1) => {
    setCart(prev => {
      const items = [...prev.items]
      const ex = items.find(i => i.id === id)
      if (ex) ex.qty += qty
      else items.push({ id, qty })
      return { ...prev, items }
    })
  }, [])

  const remove = useCallback((id: string) => {
    setCart(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }))
  }, [])

  const update = useCallback((id: string, qty: number) => {
    if (qty <= 0) return remove(id)
    setCart(prev => ({ ...prev, items: prev.items.map(i => i.id === id ? { ...i, qty } : i) }))
  }, [remove])

  const clear = useCallback(() => {
    setCart(prev => ({ ...prev, items: [] }))
  }, [])

  const items = cart.items
    .map(ci => ({ ...ci, item: findMenuItem(ci.id) }))
    .filter((ci): ci is { id: string; qty: number; item: NonNullable<ReturnType<typeof findMenuItem>> } => ci.item !== undefined)

  const subtotal = items.reduce((s, i) => s + i.item.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ mode: cart.mode, items, subtotal, count, setMode, add, remove, update, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

interface OrdersContextValue {
  orders: Order[]
  add: (order: Order) => void
  updateStatus: (id: string, status: OrderStatus) => void
  reset: () => void
}

const OrdersContext = createContext<OrdersContextValue | null>(null)

function loadOrders(): Order[] {
  if (typeof window === "undefined") return [...MOCK_ORDERS]
  try {
    const saved = localStorage.getItem("dalorenzo_orders")
    return saved ? JSON.parse(saved) : [...MOCK_ORDERS]
  } catch {
    return [...MOCK_ORDERS]
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrders)

  useEffect(() => {
    try { localStorage.setItem("dalorenzo_orders", JSON.stringify(orders)) } catch {}
  }, [orders])

  const add = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev])
  }, [])

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }, [])

  const reset = useCallback(() => {
    try { localStorage.removeItem("dalorenzo_orders") } catch {}
    setOrders([...MOCK_ORDERS])
  }, [])

  return (
    <OrdersContext.Provider value={{ orders, add, updateStatus, reset }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider")
  return ctx
}
