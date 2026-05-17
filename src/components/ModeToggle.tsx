"use client"

import { Icon } from "./ui"
import { useCart } from "@/lib/store"
import { SHOP, formatEUR } from "@/lib/data"

export default function ModeToggle() {
  const cart = useCart()
  return (
    <div className="inline-flex bg-ink/8 p-1 rounded-full border border-line-strong">
      {[
        { id: "delivery" as const, label: "Delivery", icon: "bike", sub: `min ${formatEUR(SHOP.delivery_min)}` },
        { id: "pickup" as const, label: "Asporto", icon: "store", sub: `min ${formatEUR(SHOP.pickup_min)}` },
      ].map(m => (
        <button key={m.id} onClick={() => cart.setMode(m.id)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-[12px] tracking-caps uppercase font-medium transition-all duration-200 ease-gentle ${
            cart.mode === m.id ? "bg-ink text-cream" : "text-ink-2 hover:text-ink"
          }`}>
          <Icon name={m.icon} size={14} />
          {m.label}
          <span className={`hidden md:inline normal-case tracking-normal text-[10px] ${cart.mode === m.id ? "opacity-70" : "opacity-60"}`}>· {m.sub}</span>
        </button>
      ))}
    </div>
  )
}
