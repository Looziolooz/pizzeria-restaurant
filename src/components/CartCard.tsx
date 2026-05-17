"use client"

import Link from "next/link"
import { Icon } from "./ui"
import { useCart } from "@/lib/store"
import { SHOP, formatEUR } from "@/lib/data"

export default function CartCard() {
  const cart = useCart()
  const minOrder = cart.mode === "delivery" ? SHOP.delivery_min : SHOP.pickup_min
  const meetsMin = cart.subtotal >= minOrder
  const fee = cart.mode === "delivery" ? SHOP.delivery_fee : 0
  const total = cart.subtotal + fee

  return (
    <div className="bg-cream rounded-xl2 border border-line p-6 shadow-[0_8px_32px_rgba(31,38,135,0.06)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif font-medium text-[22px] leading-none m-0">Il tuo ordine</h3>
        <div className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.22em] uppercase text-walnut">
          <Icon name={cart.mode === "delivery" ? "bike" : "store"} size={12} />
          {cart.mode === "delivery" ? "Delivery" : "Asporto"}
        </div>
      </div>
      {cart.items.length === 0 ? (
        <div className="text-center py-10 px-2">
          <div className="font-serif italic text-[17px] text-ink-2 mb-2">Carrello vuoto.</div>
          <div className="font-sans text-[12px] text-ink-2">Aggiungi una pizza per iniziare.</div>
        </div>
      ) : (
        <>
          <ul className="list-none p-0 m-0 space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {cart.items.map(({ item, qty }) => (
              <li key={item.id} className="flex gap-3 pb-3 border-b border-line last:border-0">
                <div className="font-sans text-[12px] font-semibold text-tomato min-w-[24px]">{qty}×</div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-[16px] leading-tight text-ink truncate">{item.name}</div>
                  <div className="font-sans text-[11px] text-ink-2 mt-0.5">{formatEUR(item.price)} · {formatEUR(item.price * qty)}</div>
                </div>
                <button onClick={() => cart.remove(item.id)} className="text-ink-2 hover:text-tomato shrink-0 self-start"><Icon name="x" size={14} /></button>
              </li>
            ))}
          </ul>
          <div className="border-t border-line mt-5 pt-4 space-y-1.5 font-sans text-[13px]">
            <div className="flex justify-between"><span className="text-ink-2">Subtotale</span><span>{formatEUR(cart.subtotal)}</span></div>
            {cart.mode === "delivery" && (
              <div className="flex justify-between"><span className="text-ink-2">Consegna</span><span>{formatEUR(fee)}</span></div>
            )}
            <div className="flex justify-between pt-2 font-serif text-[20px] font-medium text-ink">
              <span>Totale</span><span>{formatEUR(total)}</span>
            </div>
          </div>
          {!meetsMin && (
            <div className="mt-4 text-[12px] text-tomato font-sans">
              Aggiungi {formatEUR(minOrder - cart.subtotal)} per arrivare al minimo.
            </div>
          )}
          <Link href="/checkout"
            className={`w-full mt-5 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-tomato text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-tomato-deep transition-colors ${
              !meetsMin ? "pointer-events-none opacity-50" : ""
            }`}>
            {meetsMin ? "Procedi al checkout" : `Minimo ${formatEUR(minOrder)}`}
            {meetsMin && <Icon name="arrow_r" size={14} />}
          </Link>
        </>
      )}
    </div>
  )
}
