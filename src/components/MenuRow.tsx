"use client"

import Image from "next/image"
import { Icon, PizzaThumb } from "./ui"
import { useCart } from "@/lib/store"
import { formatEUR } from "@/lib/data"
import type { MenuItem } from "@/lib/types"

export default function MenuRow({ item }: { item: MenuItem }) {
  const cart = useCart()
  const inCart = cart.items.find(i => i.id === item.id)

  return (
    <div className="flex gap-4 group">
      <div className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-xl2 overflow-hidden bg-walnut/15 shrink-0 relative">
        {item.photo ? (
          <Image
            src={item.photo}
            alt=""
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-gentle"
            sizes="130px"
          />
        ) : (
          <div className="w-full h-full grid place-items-center bg-sand-deep">
            <PizzaThumb variant={item.cat === "calabresi" ? "diavola" : item.cat === "bianche" ? "bianca" : "margherita"} size={100} />
          </div>
        )}
        {item.vegan && <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-olive text-cream text-[8px] tracking-[0.22em] uppercase font-bold rounded-full">VG</div>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif font-medium text-[20px] md:text-[22px] leading-tight m-0 text-ink">{item.name}</h3>
          <div className="font-serif font-medium text-[18px] text-ink whitespace-nowrap">{formatEUR(item.price)}</div>
        </div>
        <p className="font-sans text-[12px] text-ink-2 leading-snug mt-1 mb-3">{item.desc}</p>
        {inCart ? (
          <div className="inline-flex items-center gap-2 bg-ink text-cream rounded-full pr-1 pl-1 py-1">
            <button onClick={() => cart.update(item.id, inCart.qty - 1)} className="w-7 h-7 grid place-items-center hover:bg-cream/10 rounded-full"><Icon name="minus" size={14} /></button>
            <span className="font-sans text-[13px] font-medium min-w-[16px] text-center">{inCart.qty}</span>
            <button onClick={() => cart.update(item.id, inCart.qty + 1)} className="w-7 h-7 grid place-items-center hover:bg-cream/10 rounded-full"><Icon name="plus" size={14} /></button>
          </div>
        ) : (
          <button onClick={() => cart.add(item.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink text-ink font-sans text-[11px] tracking-caps uppercase font-medium hover:bg-ink hover:text-cream transition-colors">
            <Icon name="plus" size={12} /> Aggiungi
          </button>
        )}
      </div>
    </div>
  )
}
