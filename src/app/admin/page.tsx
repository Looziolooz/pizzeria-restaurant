"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Icon } from "@/components/ui"
import { useOrders } from "@/lib/store"
import { findMenuItem, SHOP, MENU_ITEMS, MENU_CATEGORIES, INVENTORY, MOCK_RESERVATIONS, formatEUR } from "@/lib/data"
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types"
import type { OrderStatus, Order, MenuItem, InventoryItem, Reservation } from "@/lib/types"

const ADMIN_TABS = [
  { id: "dash", label: "Dashboard", icon: "layout" },
  { id: "orders", label: "Ordini live", icon: "flame", badge: true },
  { id: "history", label: "Storico", icon: "clock" },
  { id: "products", label: "Prodotti", icon: "pizza" },
  { id: "inventory", label: "Magazzino", icon: "package" },
  { id: "reserve", label: "Prenotazioni", icon: "calendar" },
]

const KANBAN_COLS: { id: OrderStatus; label: string; next: OrderStatus; nextLabel: string }[] = [
  { id: "received", label: "Ricevuti", next: "preparing", nextLabel: "→ In preparazione" },
  { id: "preparing", label: "In preparazione", next: "ready", nextLabel: "→ Pronto" },
  { id: "ready", label: "Pronti", next: "en_route", nextLabel: "→ In consegna" },
  { id: "en_route", label: "In consegna", next: "completed", nextLabel: "→ Completato" },
]

const WEEKDAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Oggi"]

export default function AdminPage() {
  return <AdminShell onLogout={() => {}} />
}

function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState("dash")
  const { orders } = useOrders()
  const activeOrders = orders.filter(o => o.status !== "completed").length

  const todayStr = new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="min-h-screen bg-sand-deep flex">
      <aside className="hidden md:flex flex-col w-[220px] bg-forno text-cream/85 p-5 shrink-0">
        <div className="mb-8">
          <div className="font-serif font-medium text-[28px] text-cream leading-none">{SHOP.name}</div>
          <div className="font-sans text-[9px] tracking-[0.32em] uppercase text-cream/55 mt-1.5">Admin · {SHOP.city}</div>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {ADMIN_TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-sans font-medium transition-all ${
                tab === t.id ? "bg-cream/12 text-cream" : "text-cream/70 hover:text-cream hover:bg-cream/6"
              }`}>
              <Icon name={t.icon} size={16} />
              <span className="flex-1 text-left">{t.label}</span>
              {t.badge && activeOrders > 0 && (
                <span className="grid place-items-center min-w-[20px] h-[20px] rounded-full bg-tomato text-cream text-[10px] font-bold px-1.5">{activeOrders}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="border-t border-cream/12 pt-4 mt-4 space-y-1">
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-sans font-medium text-cream/60 hover:text-cream hover:bg-cream/6 transition-all no-underline">
            <Icon name="arrow_l" size={16} /> Torna al sito
          </Link>
          <button onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-sans font-medium text-cream/60 hover:text-cream hover:bg-cream/6 transition-all">
            <Icon name="log_out" size={16} /> Esci
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="bg-cream border-b border-line px-6 md:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-walnut font-semibold">{ADMIN_TABS.find(t => t.id === tab)?.label}</div>
            <div className="font-serif italic text-[15px] text-ink-2 mt-0.5">{todayStr}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-olive/15 text-olive rounded-full font-sans text-[11px] tracking-caps uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" /> Forno attivo
            </div>
            <div className="w-9 h-9 rounded-full bg-tomato text-cream grid place-items-center font-sans font-semibold text-[13px]">SR</div>
          </div>
        </div>
        <div className="md:hidden bg-forno text-cream px-2 py-2 flex gap-1 overflow-x-auto">
          {ADMIN_TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium ${tab === t.id ? "bg-cream text-forno" : "text-cream/70"}`}>
              <Icon name={t.icon} size={12} /> {t.label}
            </button>
          ))}
          <button onClick={onLogout} className="flex-shrink-0 px-3 py-1.5 text-cream/60 text-[11px]"><Icon name="log_out" size={12} /></button>
        </div>
        <div className="flex-1 overflow-auto">
          {tab === "dash" && <AdminDashboard onGo={setTab} />}
          {tab === "orders" && <AdminOrders />}
          {tab === "history" && <AdminHistory />}
          {tab === "products" && <AdminProducts />}
          {tab === "inventory" && <AdminInventory />}
          {tab === "reserve" && <AdminReservations />}
        </div>
      </main>
    </div>
  )
}

function KPI({ label, value, hint, icon, tone, trend, onGo }: {
  label: string; value: string; hint?: string; icon: string; tone?: string; trend?: number[]; onGo?: () => void
}) {
  return (
    <button onClick={onGo} className={`bg-cream rounded-xl2 border border-line p-5 text-left w-full transition-all ${onGo ? "hover:border-ink cursor-pointer" : ""}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-9 h-9 rounded-full grid place-items-center ${tone === "tomato" ? "bg-tomato/15 text-tomato" : tone === "olive" ? "bg-olive/15 text-olive" : "bg-walnut/15 text-walnut"}`}>
          <Icon name={icon} size={16} />
        </div>
        <div className="font-sans text-[10px] tracking-caps uppercase text-ink-2 font-medium flex-1">{label}</div>
        {trend && (
          <svg width="60" height="24" viewBox="0 0 60 24" className="opacity-60">
            <path d={`M0,${20 - trend[0] * 2} ${trend.slice(1).map((v, i) => `L${(i + 1) * 60 / (trend.length - 1)},${20 - v * 2}`).join(" ")}`}
              fill="none" stroke="currentColor" strokeWidth="1.5" className="text-tomato" />
            <path d={`M0,20 ${trend.map((v, i) => `L${i * 60 / (trend.length - 1)},${20 - v * 2}`).join(" ")} L${60 * (trend.length - 1) / (trend.length - 1)},20 Z`}
              fill="url(#trend)" opacity="0.1" />
          </svg>
        )}
      </div>
      <div className="font-serif text-[32px] font-medium text-ink leading-none">{value}</div>
      {hint && <div className="font-sans text-[11px] text-ink-2 mt-1">{hint}</div>}
    </button>
  )
}

function Card({ title, right, children }: { title: React.ReactNode; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="bg-cream rounded-xl2 border border-line p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-sans text-[10px] tracking-caps uppercase text-walnut font-semibold m-0">{title}</h3>
        {right}
      </div>
      {children}
    </section>
  )
}

function Pill({ status }: { status: OrderStatus }) {
  const c = STATUS_COLORS[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans text-[10px] tracking-caps uppercase font-semibold ${c.bg} ${c.fg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} /> {STATUS_LABELS[status]}
    </span>
  )
}

function RevenueChart({ data }: { data: { day: string; val: number }[] }) {
  const max = Math.max(...data.map(d => d.val), 1)
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full bg-tomato/20 rounded-t-md relative" style={{ height: `${(d.val / max) * 100}%` }}>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 font-sans text-[9px] text-ink-2 mb-1 whitespace-nowrap">{formatEUR(d.val)}</div>
          </div>
          <div className="font-sans text-[9px] tracking-caps uppercase text-ink-2">{d.day}</div>
        </div>
      ))}
    </div>
  )
}

function AdminDashboard({ onGo }: { onGo: (tab: string) => void }) {
  const { orders } = useOrders()
  const today = orders.filter(o => o.placed_at?.startsWith(new Date().toISOString().slice(0, 10)))
  const todayRevenue = today.reduce((s, o) => s + o.total, 0)
  const todayPizzas = today.reduce((s, o) => s + o.items.filter(i => i.id.startsWith("p-")).reduce((a, b) => a + b.qty, 0), 0)
  const topPizza = today.length > 0 ? (() => {
    const count: Record<string, number> = {}
    today.forEach(o => o.items.forEach(i => { if (i.id.startsWith("p-")) count[i.id] = (count[i.id] || 0) + i.qty }))
    const top = Object.entries(count).sort((a, b) => b[1] - a[1])[0]
    return top ? findMenuItem(top[0])?.name || "—" : "—"
  })() : "—"

  const weekRevenue = useMemo(() => {
    const days: { day: string; val: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000)
      const key = d.toISOString().slice(0, 10)
      const dayOrders = orders.filter(o => o.placed_at?.startsWith(key))
      days.push({ day: i === 0 ? "Oggi" : WEEKDAYS[d.getDay() === 0 ? 6 : d.getDay() - 1] || "—", val: dayOrders.reduce((s, o) => s + o.total, 0) })
    }
    return days
  }, [orders])

  const topPizzasToday = useMemo(() => {
    const count: Record<string, number> = {}
    today.forEach(o => o.items.forEach(i => { if (i.id.startsWith("p-")) count[i.id] = (count[i.id] || 0) + i.qty }))
    return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 6)
  }, [orders])

  const lowStock = INVENTORY.filter(i => i.qty < i.threshold)
  const pendingOrders = orders.filter(o => o.status === "received" || o.status === "preparing").slice(0, 5)

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Ordini oggi" value={String(today.length)} icon="bag" tone="olive" hint="Consegne + asporto" onGo={() => onGo("orders")} />
        <KPI label="Ricavi oggi" value={formatEUR(todayRevenue)} icon="euro" trend={weekRevenue.map(d => d.val / 10)} hint={todayPizzas > 0 ? `${todayPizzas} pizze sfornate` : undefined} />
        <KPI label="Pizze sfornate" value={todayPizzas > 0 ? String(todayPizzas) : "—"} icon="pizza" hint={topPizza !== "—" ? `Top: ${topPizza}` : undefined} />
        <KPI label="Prenotazioni oggi" value={String(MOCK_RESERVATIONS.filter(r => r.date === new Date().toISOString().slice(0, 10)).length)} icon="calendar" tone="olive" onGo={() => onGo("reserve")} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Ricavi ultimi 7 giorni">
          <RevenueChart data={weekRevenue} />
        </Card>
        <Card title="Top pizze oggi">
          {topPizzasToday.length === 0 ? (
            <div className="font-serif italic text-[13px] text-ink-2 py-6 text-center">Nessuna pizza ordinata oggi.</div>
          ) : (
            <div className="space-y-2">
              {topPizzasToday.map(([id, qty], i) => {
                const item = findMenuItem(id)
                return (
                  <div key={id} className="flex items-center gap-3">
                    <div className="font-sans text-[12px] font-semibold text-tomato min-w-[20px]">#{i + 1}</div>
                    <div className="flex-1 h-7 bg-sand-deep rounded-md overflow-hidden relative">
                      <div className="h-full bg-tomato/20 rounded-md flex items-center px-3 transition-all" style={{ width: `${(qty / Math.max(...topPizzasToday.map(t => t[1]), 1)) * 100}%` }}>
                        <span className="font-sans text-[12px] font-medium text-ink truncate">{item?.name || id}</span>
                      </div>
                    </div>
                    <div className="font-sans text-[12px] font-semibold text-ink min-w-[24px] text-right">{qty}</div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title={
          <span className="flex items-center gap-2">
            Scorte basse
            {lowStock.length > 0 && <span className="px-1.5 py-0.5 bg-tomato text-cream text-[9px] tracking-caps uppercase font-bold rounded-full">{lowStock.length}</span>}
          </span>
        }>
          {lowStock.length === 0 ? (
            <div className="text-center py-6 font-serif italic text-[13px] text-olive">Tutto sotto controllo.</div>
          ) : (
            <div className="space-y-2">
              {lowStock.map(i => (
                <div key={i.id} className="flex items-center gap-2 text-[12px] font-sans">
                  <Icon name="alert" size={14} className="text-tomato shrink-0" />
                  <span className="text-ink flex-1">{i.name}</span>
                  <span className="text-tomato font-semibold">{i.qty} {i.unit}</span>
                  <span className="text-ink-2">/ {i.threshold}</span>
                </div>
              ))}
              <button onClick={() => onGo("inventory")} className="text-[11px] font-sans text-walnut hover:text-tomato transition-colors mt-1 inline-flex items-center gap-1">
                Vai al magazzino <Icon name="arrow_r" size={12} />
              </button>
            </div>
          )}
        </Card>
        <Card title={
          <span className="flex items-center gap-2">
            Ordini da gestire
            {pendingOrders.length > 0 && <span className="px-1.5 py-0.5 bg-tomato text-cream text-[9px] tracking-caps uppercase font-bold rounded-full">{pendingOrders.length}</span>}
          </span>
        }>
          {pendingOrders.length === 0 ? (
            <div className="text-center py-6 font-serif italic text-[13px] text-ink-2">Nessun ordine in attesa.</div>
          ) : (
            <div className="space-y-2">
              {pendingOrders.map(o => (
                <div key={o.id} className="flex items-center gap-3 text-[12px] font-sans border-b border-line pb-2 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-walnut/10 grid place-items-center text-walnut font-semibold">{o.items.reduce((s, i) => s + i.qty, 0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-ink font-medium truncate">{o.customer}</div>
                    <div className="text-ink-2">{o.id} · {o.slot} · {formatEUR(o.total)}</div>
                  </div>
                  <Pill status={o.status as OrderStatus} />
                </div>
              ))}
              <button onClick={() => onGo("orders")} className="text-[11px] font-sans text-walnut hover:text-tomato transition-colors mt-1 inline-flex items-center gap-1">
                Vedi tutti gli ordini <Icon name="arrow_r" size={12} />
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function AdminOrders() {
  const { orders, updateStatus } = useOrders()
  const [filter, setFilter] = useState<"all" | "delivery" | "pickup">("all")

  const filtered = orders.filter(o => o.status !== "completed").filter(o => filter === "all" || o.mode === filter)

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          {(["all", "delivery", "pickup"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full font-sans text-[10px] tracking-caps uppercase font-semibold transition-all ${
                filter === f ? "bg-ink text-cream" : "bg-cream text-ink-2 border border-line hover:border-ink"
              }`}>{f === "all" ? "Tutti" : f === "delivery" ? "Delivery" : "Asporto"}</button>
          ))}
        </div>
        <div className="font-sans text-[10px] tracking-caps uppercase text-ink-2">
          Tempo medio in cucina <strong className="text-ink">22 min</strong>
        </div>
      </div>
      <div className="text-[11px] font-sans text-ink-2 mb-5 italic">Trascina o usa i bottoni per far avanzare gli ordini.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KANBAN_COLS.map(col => {
          const items = filtered.filter(o => o.status === col.id)
          return (
            <div key={col.id} className="bg-sand-deep/60 rounded-xl2 border border-line p-4">
              <div className="font-sans text-[10px] tracking-caps uppercase font-medium text-ink-2 mb-4 flex items-center justify-between">
                <span>{col.label}</span>
                <span className="w-5 h-5 rounded-full bg-cream grid place-items-center text-[10px] font-semibold text-ink">{items.length}</span>
              </div>
              <div className="space-y-3 min-h-[120px]">
                {items.map(o => (
                  <AdminOrderCard key={o.id} order={o} nextStatus={col.next} nextLabel={col.nextLabel} onAdvance={() => updateStatus(o.id, col.next)} />
                ))}
                {items.length === 0 && (
                  <div className="border-2 border-dashed border-line rounded-xl py-8 text-center font-serif italic text-[12px] text-ink-2">Nessuno</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AdminOrderCard({ order, nextStatus, nextLabel, onAdvance }: { order: Order; nextStatus: OrderStatus; nextLabel: string; onAdvance: () => void }) {
  const [open, setOpen] = useState(false)
  const items = order.items.map(it => findMenuItem(it.id)).filter(Boolean)
  const minsAgo = order.placed_at ? Math.round((Date.now() - new Date(order.placed_at).getTime()) / 60000) : 0

  return (
    <div className={`bg-cream rounded-xl border ${open ? "border-ink" : "border-line"} shadow-sm transition-all`}>
      <button onClick={() => setOpen(!open)} className="w-full text-left p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="font-sans text-[12px] font-bold text-ink">{order.id}</div>
          <div className="flex items-center gap-1.5">
            <Icon name={order.mode === "delivery" ? "bike" : "store"} size={12} className="text-ink-2" />
            <div className="font-sans text-[11px] text-ink-2">{formatEUR(order.total)}</div>
          </div>
        </div>
        <div className="font-sans text-[12px] text-ink">{order.customer}</div>
        <div className="font-sans text-[10px] text-ink-2 mt-1">
          {order.items.length} articoli{minsAgo > 0 ? ` · ${minsAgo}m fa` : ""}
        </div>
        {!open && (
          <div className="font-sans text-[10px] text-ink-2 mt-1 truncate">
            {items.slice(0, 2).map((m, i) => m?.name).join(", ")}{items.length > 2 ? ` +${items.length - 2}` : ""}
          </div>
        )}
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 space-y-2">
          <div className="border-t border-line pt-2 space-y-1">
            {items.map((m, i) => m ? (
              <div key={i} className="flex justify-between text-[11px] font-sans">
                <span className="text-ink"><span className="text-tomato font-semibold mr-1">{order.items[i].qty}×</span>{m.name}</span>
                <span className="text-ink-2">{formatEUR(m.price * order.items[i].qty)}</span>
              </div>
            ) : null)}
          </div>
          {order.mode === "delivery" && <div className="text-[10px] font-sans text-ink-2 flex items-center gap-1"><Icon name="bike" size={11} /> {order.addr}</div>}
          <div className="text-[10px] font-sans text-ink-2 flex items-center gap-1"><Icon name="phone" size={11} /> {order.phone}</div>
          {order.slot && <div className="text-[10px] font-sans text-ink-2">Slot: {order.slot}</div>}
          {order.notes && <div className="text-[10px] font-sans text-ink-2 italic">Note: {order.notes}</div>}
        </div>
      )}
      <div className="px-3.5 pb-3.5">
        <button onClick={onAdvance}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-tomato/10 text-tomato font-sans text-[10px] tracking-caps uppercase font-semibold rounded-full hover:bg-tomato/20 transition-colors">
          {nextLabel}
        </button>
      </div>
    </div>
  )
}

function AdminHistory() {
  const { orders } = useOrders()
  const completed = orders.filter(o => o.status === "completed")
  const totalRevenue = completed.reduce((s, o) => s + o.total, 0)
  const avgTicket = completed.length > 0 ? totalRevenue / completed.length : 0
  const deliveryPct = completed.length > 0 ? Math.round((completed.filter(o => o.mode === "delivery").length / completed.length) * 100) : 0

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Completati" value={String(completed.length)} icon="check" tone="olive" />
        <KPI label="Ricavi totali" value={formatEUR(totalRevenue)} icon="euro" />
        <KPI label="Scontrino medio" value={formatEUR(avgTicket)} icon="cart" />
        <KPI label="Delivery" value={`${deliveryPct}%`} icon="bike" hint="su tutti gli ordini" />
      </div>
      <div className="bg-cream rounded-xl2 border border-line overflow-hidden">
        <table className="w-full font-sans text-[13px]">
          <thead className="bg-sand-deep"><tr className="text-ink-2 text-[10px] tracking-caps uppercase">
            <th className="text-left py-3 px-5 font-medium">Ordine</th>
            <th className="text-left py-3 px-5 font-medium">Cliente</th>
            <th className="text-left py-3 px-5 font-medium">Tipo</th>
            <th className="text-left py-3 px-5 font-medium hidden md:table-cell">Articoli</th>
            <th className="text-left py-3 px-5 font-medium">Quando</th>
            <th className="text-right py-3 px-5 font-medium">Totale</th>
          </tr></thead>
          <tbody>
            {[...completed].reverse().map(o => (
              <tr key={o.id} className="border-b border-line hover:bg-sand-deep/40 transition-colors">
                <td className="py-3 px-5 font-mono text-[12px] font-semibold text-ink">{o.id}</td>
                <td className="py-3 px-5 text-ink"><span className="font-serif text-[14px]">{o.customer}</span></td>
                <td className="py-3 px-5"><Pill status={o.status} /></td>
                <td className="py-3 px-5 text-ink-2 hidden md:table-cell">
                  {o.items.map(it => findMenuItem(it.id)).filter(Boolean).slice(0, 2).map(m => m!.name).join(", ")}
                  {o.items.length > 2 ? ` +${o.items.length - 2}` : ""}
                </td>
                <td className="py-3 px-5 text-ink-2">{o.placed_at ? new Date(o.placed_at).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }) : "—"}</td>
                <td className="py-3 px-5 text-right font-semibold text-ink">{formatEUR(o.total)}</td>
              </tr>
            ))}
            {completed.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-ink-2 font-serif italic">Nessun ordine completato.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminProducts() {
  const [cat, setCat] = useState("")
  const [search, setSearch] = useState("")
  const filtered = MENU_ITEMS.filter(i => (!cat || i.cat === cat) && (!search || i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase())))

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        {[{ id: "", label: "Tutto" }, ...MENU_CATEGORIES].map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`px-3 py-1.5 rounded-full font-sans text-[10px] tracking-caps uppercase font-semibold transition-all ${cat === c.id ? "bg-ink text-cream" : "bg-cream text-ink-2 border border-line hover:border-ink"}`}>{c.label}</button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cerca nel menù..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-line bg-cream font-sans text-[13px] text-ink focus:outline-none focus:border-ink" />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-cream font-sans text-[11px] tracking-caps uppercase rounded-full">
          <Icon name="plus" size={12} /> Nuovo
        </button>
      </div>
      <div className="bg-cream rounded-xl2 border border-line overflow-hidden">
        <table className="w-full font-sans text-[13px]">
          <thead className="bg-sand-deep"><tr className="text-ink-2 text-[10px] tracking-caps uppercase">
            <th className="text-left py-3 px-5 font-medium">Prodotto</th>
            <th className="text-left py-3 px-5 font-medium">Categoria</th>
            <th className="text-right py-3 px-5 font-medium">Prezzo</th>
            <th className="text-right py-3 px-5 font-medium">Stock</th>
            <th className="text-center py-3 px-5 font-medium">Tag</th>
            <th className="text-right py-3 px-5 font-medium">Azioni</th>
          </tr></thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} className="border-b border-line hover:bg-sand-deep/40 transition-colors">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sand-deep overflow-hidden shrink-0" />
                    <div>
                      <div className="font-medium text-ink">{item.name}</div>
                      <div className="text-[11px] text-ink-2 truncate max-w-[200px]">{item.desc}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-5 text-ink-2">{MENU_CATEGORIES.find(c => c.id === item.cat)?.label || item.cat}</td>
                <td className="py-3 px-5 text-right text-ink font-semibold">{formatEUR(item.price)}</td>
                <td className="py-3 px-5 text-right">
                  <span className={`font-semibold ${item.stock > 10 ? "text-olive" : item.stock > 0 ? "text-walnut" : "text-tomato"}`}>{item.stock}</span>
                </td>
                <td className="py-3 px-5">
                  <div className="flex items-center justify-center gap-1">
                    {item.vegan && <span className="px-1.5 py-0.5 bg-olive/15 text-olive text-[8px] tracking-caps uppercase font-bold rounded-full">VG</span>}
                    {item.featured && <span className="px-1.5 py-0.5 bg-amber/15 text-amber text-[8px] tracking-caps uppercase font-bold rounded-full">Forno</span>}
                  </div>
                </td>
                <td className="py-3 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-ink-2 hover:text-tomato transition-colors"><Icon name="edit" size={14} /></button>
                    <button className="text-ink-2 hover:text-tomato transition-colors"><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-ink-2 font-serif italic">Nessun prodotto trovato.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminInventory() {
  const totalItems = INVENTORY.length
  const lowStock = INVENTORY.filter(i => i.qty < i.threshold)
  const estValue = INVENTORY.reduce((s, i) => s + i.qty * (i.id.includes("farina") ? 1.2 : i.id.includes("pomodoro") ? 3 : i.id.includes("mozzarella") ? 8 : i.id.includes("bufala") ? 12 : i.id.includes("nduja") ? 18 : i.id.includes("salame") ? 14 : i.id.includes("olio") ? 6 : i.id.includes("pistacchio") ? 35 : i.id.includes("tartufo") ? 0.5 : 2), 0)

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <KPI label="Articoli" value={String(totalItems)} icon="package" tone="olive" />
        <KPI label="Scorte basse" value={String(lowStock.length)} icon="alert" tone="tomato" />
        <KPI label="Valore stimato" value={formatEUR(Math.round(estValue))} icon="euro" />
      </div>
      {lowStock.length > 0 && (
        <section>
          <h3 className="font-sans text-[10px] tracking-caps uppercase text-tomato font-semibold mb-3 flex items-center gap-2">
            <Icon name="alert" size={14} /> Da riordinare
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStock.map(i => <InventoryCard key={i.id} item={i} alert />)}
          </div>
        </section>
      )}
      <section>
        <h3 className="font-sans text-[10px] tracking-caps uppercase text-walnut font-semibold mb-3">Tutte le materie prime</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INVENTORY.map(i => <InventoryCard key={i.id} item={i} />)}
        </div>
      </section>
    </div>
  )
}

function InventoryCard({ item, alert: isAlert }: { item: InventoryItem; alert?: boolean }) {
  const pct = Math.min(item.qty / item.threshold, 2) * 100
  const barColor = pct < 50 ? "bg-tomato" : pct < 100 ? "bg-amber" : "bg-olive"
  return (
    <div className={`bg-cream rounded-xl border p-4 ${isAlert ? "border-tomato/30" : "border-line"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="font-sans text-[13px] font-medium text-ink">{item.name}</div>
          <div className="font-sans text-[10px] text-ink-2">{item.supplier}</div>
        </div>
        {isAlert && <Icon name="alert" size={16} className="text-tomato shrink-0" />}
      </div>
      <div className="flex items-end justify-between gap-4 mt-3">
        <div className="flex-1">
          <div className="flex justify-between text-[11px] font-sans mb-1">
            <span className={isAlert ? "text-tomato font-semibold" : "text-ink"}>{item.qty} {item.unit}</span>
            <span className="text-ink-2">min {item.threshold}</span>
          </div>
          <div className="h-1.5 bg-sand-deep rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3 pt-2.5 border-t border-line">
        <button className="flex-1 px-2.5 py-1.5 bg-ink/10 text-ink font-sans text-[9px] tracking-caps uppercase font-semibold rounded-full hover:bg-ink/20 transition-colors">Carico</button>
        <button className="flex-1 px-2.5 py-1.5 bg-tomato/10 text-tomato font-sans text-[9px] tracking-caps uppercase font-semibold rounded-full hover:bg-tomato/20 transition-colors">Riordina</button>
      </div>
    </div>
  )
}

function AdminReservations() {
  const today = new Date()
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today.getTime() + i * 86400000)
    return { date: d.toISOString().slice(0, 10), day: d, count: MOCK_RESERVATIONS.filter(r => r.date === d.toISOString().slice(0, 10)).length }
  })
  const [selDate, setSelDate] = useState(days[0].date)
  const dayRes = MOCK_RESERVATIONS.filter(r => r.date === selDate).sort((a, b) => a.time.localeCompare(b.time))
  const todayRes = MOCK_RESERVATIONS.filter(r => r.date === today.toISOString().slice(0, 10))
  const totalCovers = dayRes.reduce((s, r) => s + r.party, 0)

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Prenotazioni oggi" value={String(todayRes.length)} icon="calendar" tone="olive" />
        <KPI label="Coperti totali" value={String(dayRes.reduce((s, r) => s + r.party, 0))} icon="user" hint="per il giorno selezionato" />
        <KPI label="Da confermare" value={String(dayRes.filter(r => r.status === "pending").length)} icon="clock" tone="tomato" />
        <KPI label="Occupazione" value="76%" icon="trending" hint="stima serale" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map(d => (
          <button key={d.date} onClick={() => setSelDate(d.date)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl border text-center transition-all ${selDate === d.date ? "bg-ink text-cream border-ink" : "bg-cream border-line text-ink hover:border-ink"}`}>
            <div className={`font-sans text-[9px] tracking-caps uppercase ${selDate === d.date ? "text-cream/70" : "text-ink-2"}`}>{d.day.toLocaleDateString("it-IT", { weekday: "short" }).replace(".", "")}</div>
            <div className="font-serif text-[20px] leading-none mt-1">{d.day.getDate()}</div>
            {d.count > 0 && <div className={`font-sans text-[9px] mt-1 font-semibold ${selDate === d.date ? "text-cream/70" : "text-tomato"}`}>{d.count}</div>}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {dayRes.map(r => (
          <div key={r.id} className="bg-cream rounded-xl border border-line p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="text-center min-w-[48px]">
                  <div className="font-serif font-medium text-[24px] leading-none text-ink">{r.time}</div>
                  <div className="font-sans text-[8px] tracking-caps uppercase text-ink-2 mt-1">{r.id}</div>
                </div>
                <div className="border-l border-line pl-4 flex-1 min-w-0">
                  <div className="font-serif text-[18px] text-ink leading-tight">{r.name}</div>
                  <div className="font-sans text-[12px] text-ink-2 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Icon name="phone" size={11} /> {r.phone}</span>
                    <span className="flex items-center gap-1"><Icon name="user" size={11} /> {r.party} coperti</span>
                  </div>
                  {r.notes && <div className="font-sans text-[11px] text-ink-2 italic mt-1">"{r.notes}"</div>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-1 rounded-full font-sans text-[9px] tracking-caps uppercase font-semibold ${r.status === "confirmed" ? "bg-olive/15 text-olive" : "bg-amber/15 text-walnut"}`}>
                  {r.status === "confirmed" ? "Confermata" : "Da confermare"}
                </span>
                <button className="text-ink-2 hover:text-tomato"><Icon name="edit" size={14} /></button>
                <button className="text-ink-2 hover:text-tomato"><Icon name="x" size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {dayRes.length === 0 && (
          <div className="text-center py-12 font-serif italic text-[14px] text-ink-2">Nessuna prenotazione per questo giorno.</div>
        )}
      </div>
    </div>
  )
}
