"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Icon, Panel, Row, Field, Input, KV } from "@/components/ui"
import ModeToggle from "@/components/ModeToggle"
import { useCart, useOrders } from "@/lib/store"
import { SHOP, formatEUR } from "@/lib/data"

export default function CheckoutPage() {
  const router = useRouter()
  const cart = useCart()
  const orders = useOrders()
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    address: "", city: "Milano", floor: "",
    slot: "asap",
    payment: "card",
    notes: "",
    accept: true,
  })
  const [err, setErr] = useState<Record<string, string>>({})
  const fee = cart.mode === "delivery" ? SHOP.delivery_fee : 0
  const total = cart.subtotal + fee

  const slots = useMemo(() => {
    const out: string[] = []
    const now = new Date()
    const start = new Date(now.getTime() + 30 * 60000)
    start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0)
    for (let i = 0; i < 8; i++) {
      const d = new Date(start.getTime() + i * 15 * 60000)
      out.push(d.toTimeString().slice(0, 5))
    }
    return out
  }, [])

  if (cart.items.length === 0) {
    return (
      <div className="max-w-content mx-auto px-6 md:px-8 py-24 text-center">
        <h1 className="font-serif text-[48px] m-0 mb-4">Carrello vuoto</h1>
        <p className="font-serif italic text-[18px] text-ink-2 mb-7">Aggiungi qualcosa al menù per procedere.</p>
        <Link href="/menu" className="inline-flex items-center gap-2 px-6 py-3 bg-tomato text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full">
          <Icon name="arrow_l" size={14} /> Vai al menù
        </Link>
      </div>
    )
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Inserisci il tuo nome"
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8) e.phone = "Telefono non valido"
    if (cart.mode === "delivery" && !form.address.trim()) e.address = "Inserisci l'indirizzo"
    if (!form.accept) e.accept = "Devi accettare i termini"
    setErr(e)
    return Object.keys(e).length === 0
  }

  const placeOrder = () => {
    if (!validate()) return
    const orderId = "L-" + (2418 + Math.floor(Math.random() * 9999) % 99).toString().padStart(4, "0")
    orders.add({
      id: orderId,
      customer: form.name,
      phone: form.phone,
      email: form.email,
      mode: cart.mode,
      addr: cart.mode === "delivery" ? `${form.address}, ${form.city}` : null,
      items: cart.items.map(ci => ({ id: ci.id, qty: ci.qty })),
      subtotal: cart.subtotal,
      fee,
      total,
      status: "received",
      placed_at: new Date().toISOString(),
      slot: form.slot === "asap" ? "Appena pronto" : form.slot,
      payment: form.payment,
      notes: form.notes,
    })
    cart.clear()
    router.push(`/confirm/${orderId}`)
  }

  return (
    <div className="bg-sand">
      <div className="max-w-content mx-auto px-6 md:px-8 py-10 md:py-14">
        <Link href="/menu" className="inline-flex items-center gap-2 mb-7 text-ink-2 hover:text-tomato font-sans text-[12px] tracking-caps uppercase">
          <Icon name="arrow_l" size={14} /> Torna al menù
        </Link>
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-14">
          <div>
            <h1 className="font-serif font-medium leading-[1] tracking-[-0.015em] m-0 mb-8" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
              Checkout.
            </h1>
            <Panel title="1 · I tuoi dati">
              <Row>
                <Field label="Nome e cognome" error={err.name}>
                  <Input value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Mario Rossi" />
                </Field>
                <Field label="Telefono" error={err.phone}>
                  <Input value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="+39 333 1234567" />
                </Field>
              </Row>
              <Field label="Email (opzionale)">
                <Input value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="mario@example.it" type="email" />
              </Field>
            </Panel>
            <Panel title={cart.mode === "delivery" ? "2 · Indirizzo di consegna" : "2 · Modalità di ritiro"}>
              <div className="mb-4"><ModeToggle /></div>
              {cart.mode === "delivery" ? (
                <>
                  <Field label="Indirizzo" error={err.address}>
                    <Input value={form.address} onChange={v => setForm({ ...form, address: v })} placeholder="Via Indipendenza, 22" />
                  </Field>
                  <Row>
                    <Field label="Città"><Input value={form.city} onChange={v => setForm({ ...form, city: v })} /></Field>
                    <Field label="Scala / interno (opzionale)"><Input value={form.floor} onChange={v => setForm({ ...form, floor: v })} placeholder="Sc. A, piano 2" /></Field>
                  </Row>
                  <div className="text-[12px] font-sans text-ink-2 mt-2 flex items-center gap-2">
                    <Icon name="bike" size={14} className="text-walnut" />
                    Consegnamo entro {SHOP.delivery_radius_km} km. Costo {formatEUR(SHOP.delivery_fee)}.
                  </div>
                </>
              ) : (
                <div className="bg-sand-deep rounded-xl p-5 flex gap-4 items-start">
                  <Icon name="pin" size={22} className="text-tomato mt-0.5" />
                  <div>
                    <div className="font-serif text-[18px] text-ink leading-tight">{SHOP.address}</div>
                    <div className="font-sans text-[12px] text-ink-2 mt-1.5">Ritiro al banco. Avviseremo via SMS quando è pronta.</div>
                  </div>
                </div>
              )}
            </Panel>
            <Panel title="3 · Quando">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <button onClick={() => setForm({ ...form, slot: "asap" })}
                  className={`px-3 py-3 rounded-xl border font-sans text-[12px] tracking-caps uppercase font-medium transition-all ${form.slot === "asap" ? "bg-ink text-cream border-ink" : "border-line text-ink hover:border-ink"}`}>
                  Appena pronto
                </button>
                {slots.slice(0, 4).map(t => (
                  <button key={t} onClick={() => setForm({ ...form, slot: t })}
                    className={`px-3 py-3 rounded-xl border font-sans text-[13px] font-medium transition-all ${form.slot === t ? "bg-ink text-cream border-ink" : "border-line text-ink hover:border-ink"}`}>
                    {t}
                  </button>
                ))}
              </div>
              {slots.length > 4 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {slots.slice(4).map(t => (
                    <button key={t} onClick={() => setForm({ ...form, slot: t })}
                      className={`px-3 py-3 rounded-xl border font-sans text-[13px] font-medium transition-all ${form.slot === t ? "bg-ink text-cream border-ink" : "border-line text-ink hover:border-ink"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </Panel>
            <Panel title="4 · Pagamento">
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "card", label: "Carta", sub: "Visa · Mastercard · Amex" },
                  { id: "paypal", label: "PayPal", sub: "Conto PayPal" },
                  { id: "cash", label: "Contanti", sub: cart.mode === "delivery" ? "Al rider" : "Al banco" },
                ].map(p => (
                  <button key={p.id} onClick={() => setForm({ ...form, payment: p.id })}
                    className={`p-4 rounded-xl border text-left transition-all ${form.payment === p.id ? "bg-cream border-ink shadow-[0_2px_0_var(--tw-shadow-color)] shadow-ink/15" : "bg-cream/40 border-line hover:border-ink"}`}>
                    <div className="font-serif font-medium text-[18px] text-ink mb-1">{p.label}</div>
                    <div className="font-sans text-[11px] text-ink-2">{p.sub}</div>
                    {form.payment === p.id && <div className="mt-2 inline-flex items-center gap-1 text-tomato font-sans text-[10px] tracking-[0.22em] uppercase font-bold"><Icon name="check" size={11} /> Selezionato</div>}
                  </button>
                ))}
              </div>
            </Panel>
            <Panel title="5 · Note">
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                rows={3} placeholder="Citofoni rotti, allergie, intolleranze..."
                className="w-full px-4 py-3 rounded-xl border border-line bg-cream font-sans text-[14px] text-ink focus:outline-none focus:border-ink resize-none" />
              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input type="checkbox" checked={form.accept} onChange={e => setForm({ ...form, accept: e.target.checked })} className="mt-0.5 accent-tomato" />
                <span className="font-sans text-[12px] text-ink-2 leading-snug">Confermo di aver letto la <a href="#" className="underline text-ink">privacy policy</a> e i <a href="#" className="underline text-ink">termini di servizio</a>.</span>
              </label>
              {err.accept && <div className="text-[12px] text-tomato mt-2 font-sans">{err.accept}</div>}
            </Panel>
          </div>
          <aside>
            <div className="lg:sticky lg:top-28 bg-cream rounded-xl2 border border-line p-6 shadow-[0_8px_32px_rgba(31,38,135,0.06)]">
              <h3 className="font-serif font-medium text-[22px] m-0 mb-5">Riepilogo</h3>
              <ul className="list-none p-0 m-0 space-y-3 mb-5">
                {cart.items.filter(i => i.item).map(({ item, qty }) => (
                  <li key={item!.id} className="flex justify-between gap-3 font-sans text-[13px]">
                    <span className="text-ink"><span className="text-tomato font-semibold mr-1">{qty}×</span>{item!.name}</span>
                    <span className="text-ink whitespace-nowrap">{formatEUR(item!.price * qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-line pt-4 space-y-1.5 font-sans text-[13px]">
                <div className="flex justify-between"><span className="text-ink-2">Subtotale</span><span>{formatEUR(cart.subtotal)}</span></div>
                {cart.mode === "delivery" && <div className="flex justify-between"><span className="text-ink-2">Consegna</span><span>{formatEUR(fee)}</span></div>}
                <div className="flex justify-between pt-2 font-serif text-[24px] font-medium text-ink">
                  <span>Totale</span><span>{formatEUR(total)}</span>
                </div>
              </div>
              <button onClick={placeOrder}
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-5 py-4 bg-tomato text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-tomato-deep transition-colors">
                Conferma ordine · {formatEUR(total)}
              </button>
              <div className="text-center font-sans text-[11px] text-ink-2 mt-3">Pronto in ~{SHOP.prep_minutes} min</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
