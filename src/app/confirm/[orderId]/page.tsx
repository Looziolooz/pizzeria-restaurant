"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Icon } from "@/components/ui"
import { useOrders } from "@/lib/store"
import { findMenuItem, SHOP, formatEUR } from "@/lib/data"
import type { OrderStatus } from "@/lib/types"

export default function ConfirmPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const { orders } = useOrders()
  const order = orders.find(o => o.id === orderId)

  if (!order) {
    return (
      <div className="max-w-content mx-auto px-6 md:px-8 py-24 text-center">
        <h1 className="font-serif text-[42px] m-0 mb-4">Ordine non trovato</h1>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full">
          <Icon name="arrow_l" size={14} /> Home
        </Link>
      </div>
    )
  }

  const steps = [
    { id: "received" as OrderStatus, label: "Ricevuto", icon: "check" },
    { id: "preparing" as OrderStatus, label: "In preparazione", icon: "flame" },
    { id: "ready" as OrderStatus, label: order.mode === "delivery" ? "Pronto da consegnare" : "Pronto per ritiro", icon: "package" },
    { id: "en_route" as OrderStatus, label: order.mode === "delivery" ? "In consegna" : "Pronto al banco", icon: order.mode === "delivery" ? "bike" : "store" },
    { id: "completed" as OrderStatus, label: order.mode === "delivery" ? "Consegnato" : "Ritirato", icon: "check" },
  ]
  const currentIdx = steps.findIndex(s => s.id === order.status)

  return (
    <div className="bg-sand">
      <div className="max-w-content mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-grid place-items-center w-20 h-20 rounded-full bg-olive/15 text-olive mb-6">
            <Icon name="check" size={36} strokeWidth={2} />
          </div>
          <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium mb-3">Ordine confermato</div>
          <h1 className="font-serif font-medium leading-[1] tracking-[-0.015em] m-0 mb-3" style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
            Grazie, <em className="italic text-tomato">{order.customer.split(" ")[0]}</em>.
          </h1>
          <p className="font-serif italic text-[19px] text-ink-2 max-w-[560px] mx-auto">
            Il tuo ordine <strong className="font-medium not-italic text-ink">{order.id}</strong> è in cucina.
            {order.mode === "delivery"
              ? " Il rider partirà appena la pizza esce dal forno."
              : " Ti avviseremo via SMS quando è pronta da ritirare."}
          </p>
        </div>

        <div className="bg-cream rounded-xl2 border border-line p-6 md:p-10 mb-8">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((s, i) => {
              const done = i <= currentIdx
              const active = i === currentIdx
              return (
                <div key={s.id} className="text-center relative">
                  {i > 0 && (
                    <div className={`absolute top-6 right-1/2 left-[-50%] h-px ${i <= currentIdx ? "bg-tomato" : "bg-line"}`} />
                  )}
                  <div className={`relative inline-grid place-items-center w-12 h-12 rounded-full mb-3 transition-all ${
                    done ? (active ? "bg-tomato text-cream animate-pulse" : "bg-tomato text-cream") : "bg-sand-deep text-ink-2 border border-line"
                  }`}>
                    <Icon name={s.icon} size={18} strokeWidth={1.8} />
                  </div>
                  <div className={`font-sans text-[11px] tracking-caps uppercase font-medium ${active ? "text-tomato" : done ? "text-ink" : "text-ink-2"}`}>
                    {s.label}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-7 pt-5 border-t border-line flex flex-wrap justify-between gap-4 text-[13px] font-sans">
            <div><span className="text-ink-2 mr-2">Modalità</span>{order.mode === "delivery" ? "Consegna a domicilio" : "Asporto al locale"}</div>
            <div><span className="text-ink-2 mr-2">Quando</span>{order.slot}</div>
            <div><span className="text-ink-2 mr-2">Pagamento</span>{({ card: "Carta", paypal: "PayPal", cash: "Contanti" })[order.payment] || "—"}</div>
            <div><span className="text-ink-2 mr-2">Tempo stimato</span>~{SHOP.prep_minutes} min</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-cream rounded-xl2 border border-line p-6">
            <h3 className="font-serif font-medium text-[20px] m-0 mb-4 flex items-center gap-2">
              <Icon name="bag" size={18} /> Cosa hai ordinato
            </h3>
            <ul className="list-none p-0 m-0 space-y-3">
              {order.items.map((it, i) => {
                const m = findMenuItem(it.id)
                if (!m) return null
                return (
                  <li key={i} className="flex justify-between gap-3 font-sans text-[14px] pb-3 border-b border-line last:border-0">
                    <span className="text-ink"><span className="text-tomato font-semibold mr-2">{it.qty}×</span>{m.name}</span>
                    <span className="text-ink whitespace-nowrap">{formatEUR(m.price * it.qty)}</span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-5 pt-4 border-t border-line space-y-1.5 font-sans text-[13px]">
              {order.fee > 0 && <div className="flex justify-between"><span className="text-ink-2">Consegna</span><span>{formatEUR(order.fee)}</span></div>}
              <div className="flex justify-between pt-2 font-serif text-[22px] font-medium text-ink">
                <span>Totale</span><span>{formatEUR(order.total)}</span>
              </div>
            </div>
          </div>
          <div className="bg-cream rounded-xl2 border border-line p-6">
            <h3 className="font-serif font-medium text-[20px] m-0 mb-4 flex items-center gap-2">
              <Icon name={order.mode === "delivery" ? "pin" : "store"} size={18} /> {order.mode === "delivery" ? "Consegna" : "Ritiro"}
            </h3>
            {order.mode === "delivery" ? (
              <>
                <div className="font-serif text-[18px] text-ink leading-snug">{order.customer}</div>
                <div className="font-sans text-[13px] text-ink-2 mt-1">{order.addr}</div>
                <div className="font-sans text-[13px] text-ink mt-2 flex items-center gap-2"><Icon name="phone" size={13} className="text-tomato" />{order.phone}</div>
              </>
            ) : (
              <>
                <div className="font-serif text-[18px] text-ink leading-snug">{SHOP.name} · {SHOP.city}</div>
                <div className="font-sans text-[13px] text-ink-2 mt-1">{SHOP.address}</div>
                <div className="font-sans text-[13px] text-ink mt-2 flex items-center gap-2"><Icon name="phone" size={13} className="text-tomato" />{SHOP.phone}</div>
              </>
            )}
            {order.notes && (
              <div className="mt-4 pt-4 border-t border-line">
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-walnut font-semibold mb-2">Note</div>
                <div className="font-serif italic text-[15px] text-ink-2">{order.notes}</div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-10">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-ink hover:text-cream transition-all">
            <Icon name="arrow_l" size={14} /> Torna a Home
          </Link>
        </div>
      </div>
    </div>
  )
}
