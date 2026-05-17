"use client"

import Image from "next/image"
import Link from "next/link"
import { Icon, PizzaThumb } from "./ui"
import { useCart } from "@/lib/store"
import { formatEUR } from "@/lib/data"
import type { MenuItem } from "@/lib/types"

export default function PizzaCard({ item }: { item: MenuItem }) {
  const cart = useCart()

  return (
    <div className="group flex flex-col">
      <div className="aspect-square rounded-xl2 overflow-hidden bg-walnut/15 relative mb-4">
        {item.photo ? (
          <Image
            src={item.photo}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-gentle"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full grid place-items-center">
            <PizzaThumb variant={item.cat === "calabresi" ? "diavola" : item.cat === "bianche" ? "bianca" : "margherita"} size={180} />
          </div>
        )}
        {item.featured && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-amber text-forno font-sans text-[9px] tracking-[0.22em] uppercase font-bold rounded-full">
            <Icon name="star" size={10} /> Forno
          </div>
        )}
        {item.vegan && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 bg-olive text-cream font-sans text-[9px] tracking-[0.22em] uppercase font-bold rounded-full">VG</div>
        )}
      </div>
      <h3 className="font-serif font-medium text-[22px] leading-tight m-0 text-ink">{item.name}</h3>
      <p className="font-sans text-[12px] text-ink-2 leading-snug mt-1 mb-3 min-h-[2.5em]">{item.desc.split(",").slice(0, 3).join(",")}.</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="font-serif font-medium text-[18px] text-ink">{formatEUR(item.price)}</div>
        <Link href="/menu"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-ink text-cream font-sans text-[11px] tracking-caps uppercase font-medium hover:bg-tomato transition-colors">
          <Icon name="plus" size={12} /> Aggiungi
        </Link>
      </div>
    </div>
  )
}
