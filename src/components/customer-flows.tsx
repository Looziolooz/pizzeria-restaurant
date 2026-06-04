"use client";

// LIEVITA — customer flows (Bold Kinetic)
// Menu/Order · Checkout · Confirmation · Reservation · Contact

import { useMemo, useState } from "react";
import { Marquee, Btn } from "./kinetic";
import { Icon, PizzaThumb } from "./illustrations";
import { Panel, Row, Field, Input, KV, SlotBtn } from "./form";
import { SHOP, MENU, findMenuItem, formatEUR } from "@/lib/data";
import { useCart, useOrders, useStore, useNavigate } from "@/lib/store";
import type { MenuItem } from "@/lib/types";

// ════════════════════════════════════════════════════════════════════
//  MENU / ORDER
// ════════════════════════════════════════════════════════════════════
export function MenuScreen() {
  const cart = useCart();
  const nav = useNavigate();
  const [activeCat, setActiveCat] = useState(MENU.categories[0].id);
  const minOrder = cart.mode === "delivery" ? SHOP.delivery_min : SHOP.pickup_min;
  const meetsMin = cart.subtotal >= minOrder;

  return (
    <div style={{ background: "var(--bk-white)" }}>
      {/* Header banner — yellow block */}
      <section style={{ background: "var(--bk-yellow)" }} className="pt-32 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-page mx-auto px-5 md:px-12">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="lv-eyebrow mb-4 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-bk-green" />
                Ordina online
              </div>
              <h1 className="lv-h-l text-bk-green">
                IL NOSTRO
                <br />
                <span className="lv-stroke">MENÙ.</span>
              </h1>
              <p className="text-bk-ink text-lg mt-4 max-w-[560px]">
                Tagliate a spicchi, pronte in {SHOP.prep_minutes} minuti. Delivery o asporto, scegli tu.
              </p>
            </div>
            <ModeToggle />
          </div>
        </div>
      </section>

      <Marquee words={["FORNO ACCESO", "FRESCO OGGI", "ORDINA E RITIRA", "DELIVERY 8KM"]} color="green" direction="left" tilt="down" />

      {/* Category tabs (sticky) */}
      <div className="sticky z-30 border-b-2 border-bk-green" style={{ top: "var(--menu-sticky-top)", background: "rgba(255,255,255,0.96)" }}>
        <div className="max-w-page mx-auto px-5 md:px-12 flex gap-2 overflow-x-auto py-3">
          {MENU.categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCat(c.id);
                const el = document.getElementById(`cat-${c.id}`);
                if (el) {
                  const offset = window.innerWidth < 768 ? 200 : 160;
                  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
                }
              }}
              className={`shrink-0 px-4 py-2 font-display uppercase text-[12px] tracking-[0.08em] font-semibold transition-colors ${
                activeCat === c.id ? "bg-bk-green text-bk-yellow" : "text-bk-green hover:bg-bk-yellow"
              }`}
              style={{ borderRadius: 0 }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-page mx-auto px-5 md:px-12 py-10 md:py-14 grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-14">
        <div className="min-w-0">
          {MENU.categories.map((cat) => {
            const items = MENU.items.filter((i) => i.cat === cat.id);
            if (!items.length) return null;
            return (
              <section key={cat.id} id={`cat-${cat.id}`} className="mb-14 scroll-mt-44">
                <div className="border-b-2 border-bk-green pb-4 mb-7 flex items-baseline justify-between gap-4 flex-wrap">
                  <h2 className="lv-h2 text-bk-green">{cat.label}</h2>
                  <div className="text-bk-ink text-[14px] max-w-[380px]">{cat.sub}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                  {items.map((item) => (
                    <MenuRow key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-44">
            <CartCard meetsMin={meetsMin} minOrder={minOrder} />
          </div>
        </aside>
      </div>

      {cart.count > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center gap-3" style={{ background: "var(--bk-green)" }}>
          <div className="flex-1 text-bk-yellow">
            <div className="font-display uppercase text-[10px] tracking-[0.12em] font-semibold opacity-80">Carrello · {cart.count} art.</div>
            <div className="font-display font-bold text-[22px]">{formatEUR(cart.subtotal)}</div>
          </div>
          <Btn variant="yellow" onClick={() => nav("checkout")} disabled={!meetsMin}>
            {meetsMin ? "Procedi →" : `Min ${formatEUR(minOrder)}`}
          </Btn>
        </div>
      )}
    </div>
  );
}

export function ModeToggle() {
  const cart = useCart();
  return (
    <div className="inline-flex border-2 border-bk-green bg-bk-white" style={{ borderRadius: 0 }}>
      {(
        [
          { id: "delivery", label: "Delivery", icon: "bike", sub: `min ${formatEUR(SHOP.delivery_min)}` },
          { id: "pickup", label: "Asporto", icon: "store", sub: `min ${formatEUR(SHOP.pickup_min)}` },
        ] as const
      ).map((m) => (
        <button
          key={m.id}
          onClick={() => cart.setMode(m.id)}
          className="inline-flex items-center gap-2 px-5 py-3 font-display uppercase text-[13px] tracking-[0.06em] font-semibold transition-colors"
          style={{
            background: cart.mode === m.id ? "var(--bk-green)" : "transparent",
            color: cart.mode === m.id ? "var(--bk-yellow)" : "var(--bk-green)",
          }}
        >
          <Icon name={m.icon} size={14} /> {m.label}
          <span className="hidden md:inline normal-case tracking-normal text-[11px] opacity-70 ml-1">· {m.sub}</span>
        </button>
      ))}
    </div>
  );
}

export function MenuRow({ item }: { item: MenuItem }) {
  const cart = useCart();
  const inCart = cart.items.find((i) => i.id === item.id);
  return (
    <div className="flex gap-4 group items-start">
      <div className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] overflow-hidden shrink-0 relative bg-bk-field">
        {item.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.photo} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-sig group-hover:scale-110" />
        ) : (
          <div className="w-full h-full grid place-items-center bg-bk-yellow">
            <PizzaThumb size={100} />
          </div>
        )}
        {item.vegan && <div className="absolute top-1 right-1 lv-tag lv-tag--vg" style={{ padding: "2px 6px", fontSize: 9, letterSpacing: ".08em" }}>VG</div>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display uppercase font-semibold text-[20px] md:text-[22px] leading-[0.95] text-bk-green m-0">{item.name}</h3>
          <div className="font-display font-bold text-[18px] text-bk-green whitespace-nowrap">{formatEUR(item.price)}</div>
        </div>
        <p className="text-[13px] text-bk-ink leading-snug mt-1 mb-3">{item.desc}</p>
        {inCart ? (
          <div className="inline-flex items-center gap-1">
            <button onClick={() => cart.update(item.id, inCart.qty - 1)} className="w-8 h-8 grid place-items-center bg-bk-green text-bk-yellow">
              <Icon name="minus" size={13} />
            </button>
            <span className="font-display font-bold text-bk-green min-w-[24px] text-center">{inCart.qty}</span>
            <button onClick={() => cart.update(item.id, inCart.qty + 1)} className="w-8 h-8 grid place-items-center bg-bk-green text-bk-yellow">
              <Icon name="plus" size={13} />
            </button>
          </div>
        ) : (
          <Btn size="sm" variant="ghost" onClick={() => cart.add(item.id)}>
            <Icon name="plus" size={12} /> Aggiungi
          </Btn>
        )}
      </div>
    </div>
  );
}

export function CartCard({ meetsMin, minOrder }: { meetsMin: boolean; minOrder: number }) {
  const cart = useCart();
  const nav = useNavigate();
  const fee = cart.mode === "delivery" ? SHOP.delivery_fee : 0;
  const total = cart.subtotal + fee;
  return (
    <div className="bg-bk-white border-2 border-bk-green p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="lv-h3 text-bk-green">Il tuo ordine</h3>
        <span className="font-display uppercase text-[11px] tracking-[0.08em] text-bk-green font-semibold inline-flex items-center gap-1">
          <Icon name={cart.mode === "delivery" ? "bike" : "store"} size={12} />
          {cart.mode === "delivery" ? "Delivery" : "Asporto"}
        </span>
      </div>
      {cart.items.length === 0 ? (
        <div className="text-center py-10">
          <div className="font-display uppercase text-bk-green text-[20px] mb-2 font-semibold">Carrello vuoto.</div>
          <div className="text-bk-ink text-[13px]">Aggiungi una pizza per iniziare.</div>
        </div>
      ) : (
        <>
          <ul className="list-none p-0 m-0 space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {cart.items.map(({ item, qty }) => (
              <li key={item.id} className="flex gap-3 pb-3 border-b border-bk-border last:border-0">
                <div className="font-display font-bold text-bk-yellow bg-bk-green w-7 h-7 grid place-items-center text-[12px]">{qty}×</div>
                <div className="flex-1 min-w-0">
                  <div className="font-display uppercase font-semibold text-[14px] text-bk-green truncate">{item.name}</div>
                  <div className="text-[11px] text-bk-muted mt-0.5">{formatEUR(item.price)} · {formatEUR(item.price * qty)}</div>
                </div>
                <button onClick={() => cart.remove(item.id)} className="text-bk-muted hover:text-bk-closed shrink-0">
                  <Icon name="x" size={14} />
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t-2 border-bk-green mt-5 pt-4 space-y-1.5 text-[14px]">
            <div className="flex justify-between"><span className="text-bk-muted">Subtotale</span><span>{formatEUR(cart.subtotal)}</span></div>
            {cart.mode === "delivery" && <div className="flex justify-between"><span className="text-bk-muted">Consegna</span><span>{formatEUR(fee)}</span></div>}
            <div className="flex justify-between pt-2 font-display font-bold text-[24px] text-bk-green">
              <span>Totale</span>
              <span>{formatEUR(total)}</span>
            </div>
          </div>
          {!meetsMin && <div className="mt-4 text-[12px] text-bk-closed font-semibold">Mancano {formatEUR(minOrder - cart.subtotal)} al minimo d&apos;ordine.</div>}
          <button onClick={() => nav("checkout")} disabled={!meetsMin} className="lv-btn lv-btn--dark w-full mt-5 justify-center" style={{ fontSize: 16, padding: "16px 24px" }}>
            {meetsMin ? "Procedi al checkout" : `Minimo ${formatEUR(minOrder)}`}
          </button>
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  CHECKOUT
// ════════════════════════════════════════════════════════════════════
export function Checkout() {
  const cart = useCart();
  const nav = useNavigate();
  const { ordersAdd } = useStore();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Tropea",
    floor: "",
    slot: "asap",
    payment: "card",
    notes: "",
    accept: true,
  });
  const [err, setErr] = useState<Record<string, string>>({});
  const fee = cart.mode === "delivery" ? SHOP.delivery_fee : 0;
  const total = cart.subtotal + fee;

  const slots = useMemo(() => {
    const out: string[] = [];
    const start = new Date(Date.now() + 30 * 60000);
    start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);
    for (let i = 0; i < 8; i++) out.push(new Date(start.getTime() + i * 15 * 60000).toTimeString().slice(0, 5));
    return out;
  }, []);

  if (cart.items.length === 0) {
    return (
      <div className="max-w-content mx-auto px-5 md:px-12 py-32 text-center">
        <h1 className="lv-h-l text-bk-green mb-4">CARRELLO VUOTO</h1>
        <p className="text-bk-ink text-lg mb-7">Aggiungi qualcosa al menù per procedere.</p>
        <Btn variant="dark" size="lg" onClick={() => nav("menu")}>
          <Icon name="arrow_l" size={14} /> Vai al menù
        </Btn>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Inserisci il tuo nome";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8) e.phone = "Telefono non valido";
    if (cart.mode === "delivery" && !form.address.trim()) e.address = "Inserisci l'indirizzo";
    if (!form.accept) e.accept = "Devi accettare i termini";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
    const orderId = "L-" + (2418 + (Math.floor(Math.random() * 9999) % 99)).toString().padStart(4, "0");
    ordersAdd({
      id: orderId,
      customer: form.name,
      phone: form.phone,
      email: form.email,
      mode: cart.mode,
      addr: cart.mode === "delivery" ? `${form.address}, ${form.city}` : null,
      items: cart.items.map((ci) => ({ id: ci.id, qty: ci.qty })),
      subtotal: cart.subtotal,
      fee,
      total,
      status: "received",
      placed_at: new Date().toISOString(),
      slot: form.slot === "asap" ? "Appena pronto" : form.slot,
      payment: form.payment,
      notes: form.notes,
    });
    cart.clear();
    nav("confirm", { orderId });
  };

  return (
    <div className="pt-28" style={{ background: "var(--bk-white)" }}>
      <div className="max-w-content mx-auto px-5 md:px-12 pb-16">
        <button onClick={() => nav("menu")} className="lv-link text-bk-green text-[13px] mb-6 inline-flex items-center gap-2">
          <Icon name="arrow_l" size={14} /> Torna al menù
        </button>
        <h1 className="lv-h-l text-bk-green mb-10">CHECKOUT.</h1>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10">
          <div>
            <Panel num="01" title="I tuoi dati">
              <Row>
                <Field label="Nome e cognome" error={err.name}>
                  <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Mario Rossi" />
                </Field>
                <Field label="Telefono" error={err.phone}>
                  <Input value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+39 333 1234567" />
                </Field>
              </Row>
              <Field label="Email (opzionale)">
                <Input value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="mario@example.it" type="email" />
              </Field>
            </Panel>

            <Panel num="02" title={cart.mode === "delivery" ? "Indirizzo di consegna" : "Ritiro al locale"}>
              <div className="mb-5">
                <ModeToggle />
              </div>
              {cart.mode === "delivery" ? (
                <>
                  <Field label="Indirizzo" error={err.address}>
                    <Input value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="Via Indipendenza, 22" />
                  </Field>
                  <Row>
                    <Field label="Città"><Input value={form.city} onChange={(v) => setForm({ ...form, city: v })} /></Field>
                    <Field label="Scala / interno"><Input value={form.floor} onChange={(v) => setForm({ ...form, floor: v })} placeholder="Piano 2" /></Field>
                  </Row>
                </>
              ) : (
                <div className="bg-bk-yellow p-5 flex gap-4 items-start">
                  <Icon name="pin" size={22} className="text-bk-green mt-0.5" />
                  <div>
                    <div className="font-display uppercase text-bk-green text-[16px] font-semibold leading-tight">{SHOP.address}</div>
                    <div className="text-[13px] text-bk-ink mt-1">Ritiro al banco. Ti avviseremo via SMS quando è pronta.</div>
                  </div>
                </div>
              )}
            </Panel>

            <Panel num="03" title="Quando">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <SlotBtn active={form.slot === "asap"} onClick={() => setForm({ ...form, slot: "asap" })}>Appena pronto</SlotBtn>
                {slots.map((t) => (
                  <SlotBtn key={t} active={form.slot === t} onClick={() => setForm({ ...form, slot: t })}>{t}</SlotBtn>
                ))}
              </div>
            </Panel>

            <Panel num="04" title="Pagamento">
              <div className="grid sm:grid-cols-3 gap-3">
                {(
                  [
                    { id: "card", label: "Carta", sub: "Visa · Mastercard" },
                    { id: "paypal", label: "PayPal", sub: "Conto PayPal" },
                    { id: "cash", label: "Contanti", sub: cart.mode === "delivery" ? "Al rider" : "Al banco" },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setForm({ ...form, payment: p.id })}
                    className={`p-4 text-left border-2 ${form.payment === p.id ? "border-bk-green bg-bk-yellow" : "border-bk-border bg-bk-white hover:border-bk-green"}`}
                    style={{ borderRadius: 0 }}
                  >
                    <div className="font-display uppercase font-semibold text-[18px] text-bk-green">{p.label}</div>
                    <div className="text-[11px] text-bk-ink mt-1">{p.sub}</div>
                  </button>
                ))}
              </div>
            </Panel>

            <Panel num="05" title="Note">
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                placeholder="Citofoni rotti, allergie, intolleranze..."
                className="lv-input resize-none"
              />
              <label className="flex items-start gap-3 mt-5 cursor-pointer">
                <input type="checkbox" checked={form.accept} onChange={(e) => setForm({ ...form, accept: e.target.checked })} className="mt-0.5 accent-bk-green w-4 h-4" />
                <span className="text-[12px] text-bk-ink leading-snug">
                  Confermo di aver letto la <a href="#" className="lv-link" style={{ color: "var(--bk-green)" }}>privacy policy</a> e i{" "}
                  <a href="#" className="lv-link" style={{ color: "var(--bk-green)" }}>termini di servizio</a>.
                </span>
              </label>
              {err.accept && <div className="text-[12px] text-bk-closed mt-2 font-semibold">{err.accept}</div>}
            </Panel>
          </div>

          {/* Summary */}
          <aside>
            <div className="lg:sticky lg:top-28 bg-bk-yellow border-2 border-bk-green p-6">
              <h3 className="lv-h3 text-bk-green mb-5">Riepilogo</h3>
              <ul className="list-none p-0 m-0 space-y-3 mb-5">
                {cart.items.map(({ item, qty }) => (
                  <li key={item.id} className="flex justify-between gap-3 text-[14px] pb-3 border-b border-bk-green/20 last:border-0">
                    <span>
                      <span className="text-bk-green font-display font-bold mr-1">{qty}×</span>
                      <span className="font-display uppercase font-medium">{item.name}</span>
                    </span>
                    <span className="whitespace-nowrap font-display font-semibold text-bk-green">{formatEUR(item.price * qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t-2 border-bk-green pt-4 space-y-1.5 text-[14px]">
                <div className="flex justify-between"><span>Subtotale</span><span>{formatEUR(cart.subtotal)}</span></div>
                {cart.mode === "delivery" && <div className="flex justify-between"><span>Consegna</span><span>{formatEUR(fee)}</span></div>}
                <div className="flex justify-between pt-2 font-display font-bold text-[28px] text-bk-green">
                  <span>Totale</span>
                  <span>{formatEUR(total)}</span>
                </div>
              </div>
              <button onClick={placeOrder} className="lv-btn lv-btn--dark w-full mt-6 justify-center" style={{ fontSize: 16, padding: "18px 24px" }}>
                Conferma ordine · {formatEUR(total)}
              </button>
              <div className="text-center text-[11px] text-bk-green mt-3 font-display uppercase tracking-[0.08em] font-semibold">Pronto in ~{SHOP.prep_minutes} min</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  CONFIRMATION
// ════════════════════════════════════════════════════════════════════
export function Confirmation({ orderId }: { orderId: string }) {
  const orders = useOrders();
  const nav = useNavigate();
  const { mounted } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!mounted) {
    return <div className="pt-28" style={{ minHeight: "60vh", background: "var(--bk-white)" }} />;
  }

  if (!order) {
    return (
      <div className="max-w-content mx-auto px-5 md:px-12 py-32 text-center">
        <h1 className="lv-h-l text-bk-green mb-4">ORDINE NON TROVATO</h1>
        <Btn variant="dark" onClick={() => nav("home")}>
          <Icon name="arrow_l" size={14} /> Home
        </Btn>
      </div>
    );
  }

  const steps = [
    { id: "received", label: "Ricevuto", icon: "check", skipPickup: false },
    { id: "preparing", label: "In preparazione", icon: "flame", skipPickup: false },
    { id: "ready", label: order.mode === "delivery" ? "Pronto da consegnare" : "Pronto per ritiro", icon: "package", skipPickup: false },
    { id: "en_route", label: order.mode === "delivery" ? "In consegna" : "Pronto al banco", icon: order.mode === "delivery" ? "bike" : "store", skipPickup: order.mode === "pickup" },
    { id: "completed", label: order.mode === "delivery" ? "Consegnato" : "Ritirato", icon: "check", skipPickup: false },
  ].filter((s) => !s.skipPickup);
  const currentIdx = steps.findIndex((s) => s.id === order.status);

  return (
    <div className="pt-28" style={{ background: "var(--bk-white)" }}>
      <div className="max-w-content mx-auto px-5 md:px-12 py-12">
        {/* Big shout */}
        <div className="text-center mb-12">
          <div className="lv-cta-round lv-cta-round--dark mx-auto mb-6" style={{ width: 110, height: 110 }}>
            <Icon name="check" size={48} strokeWidth={2.5} />
          </div>
          <div className="lv-eyebrow mb-3 justify-center flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-bk-green" /> Ordine confermato
          </div>
          <h1 className="lv-h-l text-bk-green mb-3">
            GRAZIE, <span className="lv-stroke">{order.customer.split(" ")[0].toUpperCase()}!</span>
          </h1>
          <p className="text-bk-ink text-lg max-w-[600px] mx-auto">
            L&apos;ordine <strong className="font-display text-bk-green">{order.id}</strong> è in cucina.{" "}
            {order.mode === "delivery" ? "Il rider partirà appena la pizza esce dal forno." : "Ti avviseremo via SMS quando è pronta."}
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-bk-yellow border-2 border-bk-green p-6 md:p-10 mb-8">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((s, i) => {
              const done = i <= currentIdx;
              const active = i === currentIdx;
              return (
                <div key={s.id} className="text-center relative">
                  {i > 0 && <div className={`absolute top-6 right-1/2 left-[-50%] h-[2px] ${i <= currentIdx ? "bg-bk-green" : "bg-bk-green/20"}`} />}
                  <div
                    className={`relative inline-grid place-items-center w-12 h-12 rounded-full mb-3 ${
                      done ? (active ? "bg-bk-green text-bk-yellow animate-pulse" : "bg-bk-green text-bk-yellow") : "bg-bk-white text-bk-green/40 border-2 border-bk-green/30"
                    }`}
                  >
                    <Icon name={s.icon} size={18} strokeWidth={2} />
                  </div>
                  <div className={`font-display uppercase text-[10px] tracking-[0.08em] font-semibold leading-tight ${active ? "text-bk-green" : done ? "text-bk-green" : "text-bk-muted"}`}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-7 pt-5 border-t-2 border-bk-green flex flex-wrap justify-between gap-4 text-[13px] font-display uppercase tracking-[0.04em]">
            <div><span className="text-bk-muted mr-2">Modalità</span><span className="font-semibold text-bk-green">{order.mode === "delivery" ? "Delivery" : "Asporto"}</span></div>
            <div><span className="text-bk-muted mr-2">Quando</span><span className="font-semibold text-bk-green">{order.slot}</span></div>
            <div><span className="text-bk-muted mr-2">Pagamento</span><span className="font-semibold text-bk-green">{({ card: "Carta", paypal: "PayPal", cash: "Contanti" } as Record<string, string>)[order.payment || ""] || "—"}</span></div>
            <div><span className="text-bk-muted mr-2">Tempo</span><span className="font-semibold text-bk-green">~{SHOP.prep_minutes} min</span></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-bk-white border-2 border-bk-green p-6">
            <h3 className="lv-h3 text-bk-green mb-4 flex items-center gap-2"><Icon name="bag" size={18} /> Cosa hai ordinato</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              {order.items.map((it, i) => {
                const m = findMenuItem(it.id);
                if (!m) return null;
                return (
                  <li key={i} className="flex justify-between gap-3 text-[14px] pb-3 border-b border-bk-border last:border-0">
                    <span><span className="font-display font-bold text-bk-green mr-2">{it.qty}×</span>{m.name}</span>
                    <span className="whitespace-nowrap font-display font-semibold text-bk-green">{formatEUR(m.price * it.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 pt-4 border-t-2 border-bk-green flex justify-between font-display font-bold text-[22px] text-bk-green">
              <span>Totale</span>
              <span>{formatEUR(order.total)}</span>
            </div>
          </div>

          <div className="bg-bk-white border-2 border-bk-green p-6">
            <h3 className="lv-h3 text-bk-green mb-4 flex items-center gap-2">
              <Icon name={order.mode === "delivery" ? "pin" : "store"} size={18} />
              {order.mode === "delivery" ? "Consegna" : "Ritiro"}
            </h3>
            {order.mode === "delivery" ? (
              <>
                <div className="font-display uppercase font-semibold text-bk-green text-[18px]">{order.customer}</div>
                <div className="text-[13px] text-bk-ink mt-1">{order.addr}</div>
                <div className="text-[13px] mt-2 flex items-center gap-2"><Icon name="phone" size={13} className="text-bk-green" />{order.phone}</div>
              </>
            ) : (
              <>
                <div className="font-display uppercase font-semibold text-bk-green text-[18px]">{SHOP.name} · {SHOP.city}</div>
                <div className="text-[13px] text-bk-ink mt-1">{SHOP.address}</div>
                <div className="text-[13px] mt-2 flex items-center gap-2"><Icon name="phone" size={13} className="text-bk-green" />{SHOP.phone}</div>
              </>
            )}
          </div>
        </div>

        <div className="text-center mt-10">
          <Btn variant="ghost" onClick={() => nav("home")}>
            <Icon name="arrow_l" size={14} /> Torna a Home
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  RESERVATION
// ════════════════════════════════════════════════════════════════════
export function Reservation() {
  const nav = useNavigate();
  const { mounted } = useStore();
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => new Date(Date.now() + i * 86400000)), []);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("20:00");
  const [party, setParty] = useState(2);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "", accept: true });
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const [ref] = useState(() => "R-" + Math.floor(Math.random() * 900 + 200));

  const slots = ["12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

  // Avoid SSR/client date drift — render after mount.
  if (!mounted) {
    return <div className="pt-28" style={{ minHeight: "60vh", background: "var(--bk-white)" }} />;
  }

  const submit = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Inserisci il tuo nome";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8) e.phone = "Telefono non valido";
    if (!form.accept) e.accept = "Devi accettare i termini";
    setErr(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-28" style={{ background: "var(--bk-yellow)" }}>
        <div className="max-w-content mx-auto px-5 md:px-12 py-16 md:py-24 text-center">
          <div className="lv-cta-round lv-cta-round--dark mx-auto mb-6" style={{ width: 110, height: 110 }}>
            <Icon name="check" size={48} strokeWidth={2.5} />
          </div>
          <div className="lv-eyebrow mb-3 justify-center flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-bk-green" /> Prenotazione confermata
          </div>
          <h1 className="lv-h-l text-bk-green mb-5">CI VEDIAMO <span className="lv-stroke">PRESTO!</span></h1>
          <p className="text-bk-ink text-lg max-w-[600px] mx-auto mb-10">
            Tavolo per {party} {party === 1 ? "persona" : "persone"} il{" "}
            <strong className="font-display text-bk-green uppercase">{new Date(date).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</strong> alle{" "}
            <strong className="font-display text-bk-green">{time}</strong>.
          </p>
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-6 text-left bg-bk-white border-2 border-bk-green p-6 max-w-[680px] mx-auto mb-8">
            <KV label="Nome">{form.name}</KV>
            <KV label="Ospiti">{party}</KV>
            <KV label="Quando">{new Date(date).toLocaleDateString("it-IT")} · {time}</KV>
            <KV label="Riferimento">{ref}</KV>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Btn variant="ghost" onClick={() => nav("home")}><Icon name="arrow_l" size={14} /> Home</Btn>
            <Btn variant="dark" onClick={() => nav("menu")}><Icon name="bag" size={14} /> Vuoi anche ordinare?</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28" style={{ background: "var(--bk-white)" }}>
      <div className="max-w-content mx-auto px-5 md:px-12 py-10 md:py-12">
        <div className="text-center mb-10">
          <div className="lv-eyebrow mb-3 justify-center flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-bk-green" /> Prenota un tavolo
          </div>
          <h1 className="lv-h-l text-bk-green">CENA <span className="lv-stroke">CON NOI.</span></h1>
          <p className="text-bk-ink text-lg max-w-[560px] mx-auto mt-4">28 coperti, un solo forno, tutto il tempo che serve.</p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
          <div>
            <Panel num="01" title="Giorno">
              <div className="grid grid-cols-7 gap-2">
                {days.map((d) => {
                  const iso = d.toISOString().slice(0, 10);
                  const active = iso === date;
                  return (
                    <button
                      key={iso}
                      onClick={() => setDate(iso)}
                      className={`p-2 border-2 text-center transition-colors ${active ? "bg-bk-green text-bk-yellow border-bk-green" : "border-bk-border bg-bk-white text-bk-green hover:border-bk-green"}`}
                      style={{ borderRadius: 0 }}
                    >
                      <div className={`font-display uppercase text-[10px] tracking-[0.08em] font-semibold ${active ? "text-bk-yellow/80" : "text-bk-muted"}`}>{d.toLocaleDateString("it-IT", { weekday: "short" }).replace(".", "")}</div>
                      <div className="font-display-xl font-bold text-[22px] leading-none mt-1">{d.getDate()}</div>
                      <div className={`font-display uppercase text-[9px] tracking-[0.08em] font-semibold ${active ? "text-bk-yellow/80" : "text-bk-muted"}`}>{d.toLocaleDateString("it-IT", { month: "short" }).replace(".", "")}</div>
                    </button>
                  );
                })}
              </div>
            </Panel>

            <Panel num="02" title="Ora">
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {slots.map((t) => (
                  <SlotBtn key={t} active={time === t} onClick={() => setTime(t)}>{t}</SlotBtn>
                ))}
              </div>
            </Panel>

            <Panel num="03" title="Quanti siete">
              <div className="flex items-center gap-3">
                <button onClick={() => setParty(Math.max(1, party - 1))} className="w-12 h-12 border-2 border-bk-green grid place-items-center text-bk-green hover:bg-bk-green hover:text-bk-yellow transition-colors"><Icon name="minus" size={16} /></button>
                <div className="flex-1 text-center">
                  <div className="font-display-xl font-bold text-[52px] leading-none text-bk-green">{party}</div>
                  <div className="font-display uppercase text-[11px] tracking-[0.12em] text-bk-green font-semibold mt-1">{party === 1 ? "persona" : "persone"}</div>
                </div>
                <button onClick={() => setParty(Math.min(12, party + 1))} className="w-12 h-12 border-2 border-bk-green grid place-items-center text-bk-green hover:bg-bk-green hover:text-bk-yellow transition-colors"><Icon name="plus" size={16} /></button>
              </div>
              {party >= 8 && (
                <div className="mt-4 text-[12px] bg-bk-yellow p-3 flex gap-2 text-bk-green font-semibold">
                  <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
                  <div>Per 8+ persone confermeremo via telefono.</div>
                </div>
              )}
            </Panel>

            <Panel num="04" title="I tuoi dati">
              <Row>
                <Field label="Nome e cognome" error={err.name}><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Maria Bianchi" /></Field>
                <Field label="Telefono" error={err.phone}><Input value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+39 333 1234567" /></Field>
              </Row>
              <Field label="Email (opzionale)"><Input value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="maria@example.it" type="email" /></Field>
              <Field label="Note">
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Compleanno, allergie, esigenze..." className="lv-input resize-none" />
              </Field>
              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input type="checkbox" checked={form.accept} onChange={(e) => setForm({ ...form, accept: e.target.checked })} className="mt-0.5 accent-bk-green w-4 h-4" />
                <span className="text-[12px] text-bk-ink leading-snug">Confermo la privacy policy. Il tavolo verrà mantenuto fino a 20 min dopo l&apos;ora prenotata.</span>
              </label>
              {err.accept && <div className="text-[12px] text-bk-closed mt-2 font-semibold">{err.accept}</div>}
            </Panel>
          </div>

          <aside>
            <div className="lg:sticky lg:top-28 bg-bk-yellow border-2 border-bk-green p-6">
              <h3 className="lv-h3 text-bk-green mb-5">Riepilogo</h3>
              <div className="space-y-4">
                <KV label="Quando">{new Date(date).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</KV>
                <KV label="Ora">{time}</KV>
                <KV label="Ospiti">{party} {party === 1 ? "persona" : "persone"}</KV>
                <KV label="Dove">{SHOP.address}</KV>
              </div>
              <button onClick={submit} className="lv-btn lv-btn--dark w-full mt-6 justify-center" style={{ fontSize: 16, padding: "16px 24px" }}>
                <Icon name="utensils" size={14} /> Conferma prenotazione
              </button>
              <div className="text-center text-[11px] text-bk-green mt-3 font-display uppercase tracking-[0.08em] font-semibold">Gratis · senza pagamento</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  CONTACT
// ════════════════════════════════════════════════════════════════════
export function Contact() {
  const contacts: { icon: string; title: string; body: React.ReactNode; action?: [string, string] }[] = [
    { icon: "pin", title: "Indirizzo", body: SHOP.address, action: ["Apri in Maps", "#"] },
    { icon: "phone", title: "Telefono", body: SHOP.phone, action: ["Chiama", `tel:${SHOP.phone.replace(/\s/g, "")}`] },
    { icon: "user", title: "Email", body: SHOP.email, action: ["Scrivi una mail", `mailto:${SHOP.email}`] },
    {
      icon: "clock",
      title: "Orari",
      body: (
        <div className="space-y-0.5">
          {SHOP.hours.map((h) => (
            <div key={h.day}>
              <span className="font-display font-semibold uppercase mr-2 text-bk-green text-[12px] tracking-[0.06em]">{h.day}</span>
              {h.time}
            </div>
          ))}
        </div>
      ),
    },
  ];
  return (
    <div className="pt-28" style={{ background: "var(--bk-white)" }}>
      <div className="max-w-content mx-auto px-5 md:px-12 py-12 md:py-20">
        <div className="text-center mb-12">
          <div className="lv-eyebrow mb-3 justify-center flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-bk-green" /> Contatti
          </div>
          <h1 className="lv-h-l text-bk-green">SCRIVICI!</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <div className="space-y-7">
            {contacts.map((c, i) => (
              <div key={i} className="flex gap-5 items-start pb-7 border-b border-bk-border last:border-0">
                <div className="w-12 h-12 rounded-full bg-bk-green grid place-items-center text-bk-yellow shrink-0"><Icon name={c.icon} size={20} /></div>
                <div className="flex-1">
                  <div className="font-display uppercase text-[11px] tracking-[0.12em] text-bk-green font-semibold mb-2">{c.title}</div>
                  <div className="text-bk-ink text-[17px]">{c.body}</div>
                  {c.action && <a href={c.action[1]} className="lv-link text-[12px] text-bk-green mt-2 inline-block">{c.action[0]} →</a>}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-bk-yellow border-2 border-bk-green p-7">
            <h3 className="lv-h3 text-bk-green mb-2">Mandaci un messaggio.</h3>
            <p className="text-[14px] text-bk-ink mb-5">Per eventi privati, segnalazioni, lavora con noi.</p>
            <Field label="Nome"><Input value="" onChange={() => {}} placeholder="Mario Rossi" /></Field>
            <Field label="Email"><Input value="" onChange={() => {}} placeholder="mario@example.it" /></Field>
            <Field label="Oggetto"><Input value="" onChange={() => {}} placeholder="Vorrei privatizzare il locale..." /></Field>
            <Field label="Messaggio">
              <textarea rows={5} className="lv-input resize-none" />
            </Field>
            <button className="lv-btn lv-btn--dark w-full mt-4 justify-center">Invia →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
