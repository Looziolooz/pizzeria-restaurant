"use client";

// LIEVITA — admin dashboard (login + 6 sub-screens)
//
// Sub-routes are kept in component state, not in the global router,
// because everything happens inside the admin shell.

import { useState, type ReactNode } from "react";
import { Icon, PizzaThumb } from "./illustrations";
import { Field } from "./form";
import {
  INVENTORY,
  MENU,
  findMenuItem,
  formatEUR,
  statusColors,
  statusLabels,
} from "@/lib/data";
import {
  useOrders,
  useReservations,
  useStore,
  useNavigate,
} from "@/lib/store";
import type { InventoryItem, Order, OrderStatus, Reservation } from "@/lib/types";

const ADMIN_AUTH_KEY = "lievita_admin_authed";

// ════════════════════════════════════════════════════════════════════
//  ADMIN APP (shell + login)
// ════════════════════════════════════════════════════════════════════
export function AdminApp() {
  const { mounted } = useStore();
  const nav = useNavigate();
  const [authed, setAuthed] = useState(
    () => typeof window !== "undefined" && localStorage.getItem(ADMIN_AUTH_KEY) === "1"
  );

  if (!mounted) {
    return <div className="min-h-screen bg-forno" />;
  }

  if (!authed) {
    return (
      <AdminLogin
        onAuth={() => {
          try {
            localStorage.setItem(ADMIN_AUTH_KEY, "1");
          } catch {
            /* ignore */
          }
          setAuthed(true);
        }}
      />
    );
  }
  return (
    <AdminShell
      onLogout={() => {
        try {
          localStorage.removeItem(ADMIN_AUTH_KEY);
        } catch {
          /* ignore */
        }
        setAuthed(false);
        nav("home");
      }}
    />
  );
}

function AdminLogin({ onAuth }: { onAuth: () => void }) {
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    if (code === "0000" || code === "lievita") {
      onAuth();
    } else {
      setErr("Codice non valido. Suggerimento: 0000");
    }
  };
  return (
    <div className="min-h-screen grid place-items-center bg-forno text-cream px-6">
      <div className="w-full max-w-[440px]">
        <button onClick={() => nav("home")} className="inline-flex items-center gap-2 text-cream/60 hover:text-cream text-[12px] tracking-caps uppercase font-sans mb-8">
          <Icon name="arrow_l" size={14} /> Torna al sito
        </button>
        <div className="bg-cream text-ink rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-7">
            <div className="font-serif font-medium text-[34px] text-ink leading-none">Lievita</div>
            <div className="font-sans text-[9px] tracking-[0.32em] uppercase text-walnut mt-1.5">Pannello di gestione</div>
          </div>
          <Field label="Codice di accesso">
            <input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setErr("");
              }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="w-full px-4 py-3 rounded-xl border border-line bg-sand text-ink font-sans text-[14px] focus:outline-none focus:border-ink"
              placeholder="•••••"
              autoFocus
            />
          </Field>
          {err && <div className="text-tomato text-[12px] font-sans mb-3">{err}</div>}
          <button onClick={submit} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-tomato text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-tomato-deep transition-colors">
            Entra
          </button>
          <div className="text-center font-sans text-[11px] text-ink-2 mt-5">
            Demo: usa <code className="bg-sand-deep px-1.5 py-0.5 rounded">0000</code>
          </div>
        </div>
      </div>
    </div>
  );
}

const ADMIN_TABS: { id: string; label: string; icon: string; badge?: boolean }[] = [
  { id: "dash", label: "Dashboard", icon: "layout" },
  { id: "orders", label: "Ordini live", icon: "flame", badge: true },
  { id: "history", label: "Storico", icon: "clock" },
  { id: "products", label: "Prodotti", icon: "pizza" },
  { id: "inventory", label: "Magazzino", icon: "package" },
  { id: "reserve", label: "Prenotazioni", icon: "calendar" },
];

function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState("dash");
  const orders = useOrders();
  const { ordersReset } = useStore();
  const activeOrders = orders.filter((o) => o.status !== "completed").length;

  const today = new Date();
  const todayStr = today.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-sand-deep flex">
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-[220px] bg-forno text-cream/85 p-5 shrink-0">
        <div className="mb-8">
          <div className="font-serif font-medium text-[28px] text-cream leading-none">Lievita</div>
          <div className="font-sans text-[9px] tracking-[0.32em] uppercase text-cream/55 mt-1.5">Admin · Tropea</div>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {ADMIN_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-sans font-medium transition-all ${
                tab === t.id ? "bg-cream/12 text-cream" : "text-cream/70 hover:text-cream hover:bg-cream/6"
              }`}
            >
              <Icon name={t.icon} size={16} />
              <span className="flex-1 text-left">{t.label}</span>
              {t.badge && activeOrders > 0 && (
                <span className="grid place-items-center min-w-[20px] h-[20px] rounded-full bg-tomato text-cream text-[10px] font-bold px-1.5">{activeOrders}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="border-t border-cream/12 pt-4 mt-4">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-sans font-medium text-cream/60 hover:text-cream hover:bg-cream/6 transition-all">
            <Icon name="log_out" size={16} /> Esci
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="bg-cream border-b border-line px-6 md:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-sans text-[10px] tracking-eyebrow uppercase text-walnut font-semibold">{ADMIN_TABS.find((t) => t.id === tab)?.label}</div>
            <div className="font-serif italic text-[15px] text-ink-2 mt-0.5">{todayStr}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-olive/15 text-olive rounded-full font-sans text-[11px] tracking-caps uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" /> Forno attivo
            </div>
            <button onClick={() => ordersReset()} title="Reset demo data" className="px-3 py-1.5 border border-line text-ink-2 hover:text-ink hover:border-ink rounded-full font-sans text-[11px] tracking-caps uppercase">
              Reset demo
            </button>
            <div className="w-9 h-9 rounded-full bg-tomato text-cream grid place-items-center font-sans font-semibold text-[13px]">SR</div>
          </div>
        </div>

        {/* Mobile tab bar */}
        <div className="md:hidden bg-forno text-cream px-2 py-2 flex gap-1 overflow-x-auto">
          {ADMIN_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium ${tab === t.id ? "bg-cream text-forno" : "text-cream/70"}`}
            >
              <Icon name={t.icon} size={12} /> {t.label}
            </button>
          ))}
          <button onClick={onLogout} className="flex-shrink-0 px-3 py-1.5 text-cream/60 text-[11px]"><Icon name="log_out" size={12} /></button>
        </div>

        {/* Content */}
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
  );
}

// ════════════════════════════════════════════════════════════════════
//  DASHBOARD (statistiche)
// ════════════════════════════════════════════════════════════════════
function AdminDashboard({ onGo }: { onGo: (tab: string) => void }) {
  const orders = useOrders();
  const reservations = useReservations();
  const todayOrders = orders.filter((o) => {
    const d = new Date(o.placed_at);
    const t = new Date();
    return d.toDateString() === t.toDateString();
  });
  const revenue = todayOrders.reduce(
    (s, o) => s + (o.total ?? o.items.reduce((ss, it) => { const m = findMenuItem(it.id); return ss + (m ? m.price * it.qty : 0); }, 0)),
    0
  );
  const pizzaCount: Record<string, number> = {};
  todayOrders.forEach((o) =>
    o.items.forEach((it) => {
      const m = findMenuItem(it.id);
      if (m && m.cat !== "bibite" && m.cat !== "antipasti" && m.cat !== "dolci") {
        pizzaCount[m.name] = (pizzaCount[m.name] || 0) + it.qty;
      }
    })
  );
  const topPizza = Object.entries(pizzaCount).sort((a, b) => b[1] - a[1])[0] || ["—", 0];
  const totalPizzas = Object.values(pizzaCount).reduce((s, n) => s + n, 0);

  // simple synthetic 7-day revenue trend (for sparkline)
  const trend = [820, 940, 1120, 980, 1340, 1580, Math.round(revenue) || 1100];

  const lowStock = INVENTORY.filter((i) => i.qty < i.threshold).length;
  const reservationsToday = reservations.filter((r) => r.date === new Date().toISOString().slice(0, 10)).length;

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Ordini oggi" value={todayOrders.length} hint={`${orders.filter((o) => o.status !== "completed").length} in corso`} icon="bag" tone="tomato" onGo={() => onGo("orders")} />
        <KPI label="Ricavi oggi" value={formatEUR(revenue)} hint="+18% vs ieri" icon="euro" tone="olive" />
        <KPI label="Pizze sfornate" value={totalPizzas} hint={`Top: ${topPizza[0]}`} icon="flame" tone="walnut" />
        <KPI label="Tavoli oggi" value={reservationsToday} hint="prenotazioni" icon="utensils" tone="ink" onGo={() => onGo("reserve")} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <Card title="Ricavi · ultimi 7 giorni" right={<span className="font-sans text-[11px] tracking-caps uppercase text-olive">+18%</span>}>
          <RevenueChart data={trend} />
        </Card>
        <Card title="Top pizze · oggi">
          <div className="space-y-3">
            {Object.entries(pizzaCount)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([n, c], i) => (
                <div key={n} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-walnut/12 grid place-items-center font-serif text-[14px] text-walnut">{i + 1}</div>
                  <div className="flex-1 font-serif text-[15px] text-ink truncate">{n}</div>
                  <div className="flex-shrink-0 w-24 bg-line rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-tomato" style={{ width: `${(c / (topPizza[1] as number)) * 100}%` }} />
                  </div>
                  <div className="font-sans text-[13px] font-semibold text-ink w-6 text-right">{c}</div>
                </div>
              ))}
            {Object.keys(pizzaCount).length === 0 && <div className="font-sans text-[13px] text-ink-2 py-4 text-center">Nessuna vendita ancora oggi.</div>}
          </div>
        </Card>
      </div>

      {/* Alerts row */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Scorte basse" right={<button onClick={() => onGo("inventory")} className="font-sans text-[11px] tracking-caps uppercase text-walnut hover:text-tomato">Vai →</button>}>
          {lowStock === 0 ? (
            <div className="flex items-center gap-3 text-olive font-serif text-[16px]">
              <Icon name="check" size={18} /> Tutto sotto controllo.
            </div>
          ) : (
            <ul className="list-none p-0 m-0 space-y-2">
              {INVENTORY.filter((i) => i.qty < i.threshold).map((i) => (
                <li key={i.id} className="flex items-center gap-3 py-2 border-b border-line last:border-0">
                  <Icon name="alert" size={16} className="text-tomato shrink-0" />
                  <div className="flex-1 font-serif text-[15px] text-ink truncate">{i.name}</div>
                  <div className="font-sans text-[12px] text-tomato font-semibold">
                    {i.qty} {i.unit} <span className="text-ink-2 font-normal">/ {i.threshold}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Ordini da gestire" right={<button onClick={() => onGo("orders")} className="font-sans text-[11px] tracking-caps uppercase text-walnut hover:text-tomato">Tutti →</button>}>
          <ul className="list-none p-0 m-0 space-y-2">
            {orders
              .filter((o) => o.status === "received" || o.status === "preparing")
              .slice(0, 5)
              .map((o) => (
                <li key={o.id} className="flex items-center gap-3 py-2 border-b border-line last:border-0">
                  <Pill status={o.status} />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-[15px] text-ink truncate">{o.customer}</div>
                    <div className="font-sans text-[11px] text-ink-2">{o.id} · {o.mode === "delivery" ? "delivery" : "asporto"} · {o.slot}</div>
                  </div>
                  <div className="font-sans text-[12px] font-semibold text-ink">{formatEUR(o.total ?? 0)}</div>
                </li>
              ))}
            {orders.filter((o) => o.status === "received" || o.status === "preparing").length === 0 && (
              <div className="font-sans text-[13px] text-ink-2 py-4 text-center">Nessun ordine da gestire.</div>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  hint,
  icon,
  tone = "tomato",
  onGo,
}: {
  label: string;
  value: ReactNode;
  hint: string;
  icon: string;
  tone?: "tomato" | "olive" | "walnut" | "ink";
  onGo?: () => void;
}) {
  const tones: Record<string, string> = {
    tomato: "bg-tomato/8 text-tomato",
    olive: "bg-olive/15 text-olive",
    walnut: "bg-walnut/12 text-walnut",
    ink: "bg-ink/8 text-ink",
  };
  return (
    <button
      onClick={onGo}
      disabled={!onGo}
      className={`bg-cream rounded-2xl border border-line p-5 md:p-6 text-left ${onGo ? "hover:border-ink hover:-translate-y-0.5" : ""} transition-all duration-200 ease-gentle`}
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${tones[tone]} mb-4`}>
        <Icon name={icon} size={18} />
      </div>
      <div className="font-serif font-medium text-[32px] md:text-[40px] leading-none text-ink">{value}</div>
      <div className="font-sans text-[11px] tracking-eyebrow uppercase text-walnut font-semibold mt-3">{label}</div>
      <div className="font-sans text-[12px] text-ink-2 mt-1">{hint}</div>
    </button>
  );
}

function Card({ title, right, children }: { title: ReactNode; right?: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-cream rounded-2xl border border-line p-5 md:p-6">
      <div className="flex items-baseline justify-between gap-3 mb-5">
        <h3 className="font-serif font-medium text-[18px] m-0 text-ink">{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

function RevenueChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 480,
    h = 140,
    pad = 10;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    return [x, y] as [number, number];
  });
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = path + ` L${w - pad},${h - pad} L${pad},${h - pad} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <defs>
          <linearGradient id="rev-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#B23A22" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B23A22" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#rev-grad)" />
        <path d={path} fill="none" stroke="#B23A22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 2.5} fill={i === pts.length - 1 ? "#B23A22" : "#FBF5EC"} stroke="#B23A22" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="flex justify-between font-sans text-[10px] tracking-caps uppercase text-ink-2 mt-1">
        {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Oggi"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function Pill({ status }: { status: OrderStatus }) {
  const c = statusColors[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans text-[10px] tracking-caps uppercase font-semibold ${c.bg} ${c.fg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {statusLabels[status]}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════
//  ORDINI LIVE (Kanban)
// ════════════════════════════════════════════════════════════════════
const COLUMNS: { id: OrderStatus; label: string; next: OrderStatus; nextLabel: string }[] = [
  { id: "received", label: "Ricevuti", next: "preparing", nextLabel: "→ In preparazione" },
  { id: "preparing", label: "In preparazione", next: "ready", nextLabel: "→ Pronto" },
  { id: "ready", label: "Pronti", next: "en_route", nextLabel: "→ In consegna" },
  { id: "en_route", label: "In consegna", next: "completed", nextLabel: "→ Completato" },
];

function AdminOrders() {
  const orders = useOrders();
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="font-sans text-[10px] tracking-eyebrow uppercase text-walnut font-semibold">Tempo medio in cucina · 22 min</div>
          <div className="font-serif italic text-ink-2 text-[15px]">Trascina o usa i bottoni per far avanzare gli ordini.</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[["Tutti", null], ["Delivery", "delivery"], ["Asporto", "pickup"]].map(([l]) => (
            <button key={l as string} className="px-3 py-1.5 rounded-full border border-line text-ink-2 hover:text-ink hover:border-ink font-sans text-[11px] tracking-caps uppercase">
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const list = orders.filter((o) => o.status === col.id);
          return (
            <div key={col.id} className="bg-sand rounded-2xl border border-line p-3 min-h-[420px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="font-sans text-[11px] tracking-eyebrow uppercase font-semibold text-ink">{col.label}</div>
                <div className="w-6 h-6 rounded-full bg-cream border border-line grid place-items-center font-sans text-[11px] font-semibold text-ink">{list.length}</div>
              </div>
              <div className="space-y-2.5">
                {list.map((o) => (
                  <OrderCard
                    key={o.id}
                    order={o}
                    expanded={expanded === o.id}
                    onExpand={() => setExpanded(expanded === o.id ? null : o.id)}
                    nextStatus={col.next}
                    nextLabel={col.nextLabel}
                  />
                ))}
                {list.length === 0 && <div className="border-2 border-dashed border-line rounded-xl p-5 text-center font-serif italic text-[14px] text-ink-2">Vuoto.</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  expanded,
  onExpand,
  nextStatus,
  nextLabel,
}: {
  order: Order;
  expanded: boolean;
  onExpand: () => void;
  nextStatus: OrderStatus;
  nextLabel: string;
}) {
  const { ordersUpdateStatus } = useStore();
  const minsAgo = Math.max(0, Math.round((Date.now() - new Date(order.placed_at).getTime()) / 60000));
  const items = order.items.map((it) => ({ ...it, m: findMenuItem(it.id) })).filter((it) => it.m) as { id: string; qty: number; m: NonNullable<ReturnType<typeof findMenuItem>> }[];
  return (
    <div className="bg-cream rounded-xl border border-line p-3 hover:border-ink/40 transition-colors">
      <div onClick={onExpand} className="cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-2">
            <Icon name={order.mode === "delivery" ? "bike" : "store"} size={14} className="text-walnut" />
            <div className="font-sans text-[11px] tracking-caps uppercase text-ink-2 font-semibold">{order.id}</div>
          </div>
          <div className="font-sans text-[10px] text-ink-2">{minsAgo}m fa</div>
        </div>
        <div className="font-serif font-medium text-[18px] leading-tight text-ink mb-1">{order.customer}</div>
        <div className="font-sans text-[11px] text-ink-2 mb-2">
          {items.length} {items.length === 1 ? "articolo" : "articoli"} ·{" "}
          <span className="text-ink font-semibold">{formatEUR(order.total ?? items.reduce((s, it) => s + it.m.price * it.qty, 0))}</span>
        </div>
        {!expanded && (
          <div className="font-sans text-[11px] text-ink-2 truncate">
            {items.slice(0, 2).map((it) => `${it.qty}× ${it.m.name}`).join(", ")}
            {items.length > 2 ? `, +${items.length - 2}` : ""}
          </div>
        )}
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-line">
          <ul className="list-none p-0 m-0 space-y-1.5 mb-3">
            {items.map((it, i) => (
              <li key={i} className="flex justify-between text-[12px] font-sans">
                <span><span className="text-tomato font-semibold mr-1.5">{it.qty}×</span>{it.m.name}</span>
                <span>{formatEUR(it.m.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="text-[11px] font-sans text-ink-2 space-y-0.5 mb-3">
            <div><Icon name="phone" size={11} className="inline mr-1" />{order.phone}</div>
            {order.addr && <div><Icon name="pin" size={11} className="inline mr-1" />{order.addr}</div>}
            <div><Icon name="clock" size={11} className="inline mr-1" />{order.slot}</div>
            {order.notes && <div className="italic font-serif text-[13px] text-ink-2 mt-2 pt-2 border-t border-line/50">{order.notes}</div>}
          </div>
        </div>
      )}
      {nextStatus && (
        <button
          onClick={() => ordersUpdateStatus(order.id, nextStatus)}
          className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-ink text-cream font-sans text-[11px] tracking-caps uppercase font-medium hover:bg-tomato transition-colors"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  STORICO / RICEVUTE
// ════════════════════════════════════════════════════════════════════
function AdminHistory() {
  const orders = useOrders();
  const completed = orders.filter((o) => o.status === "completed");
  const totalRevenue = completed.reduce((s, o) => s + (o.total ?? 0), 0);
  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Ordini completati" value={completed.length} hint="storico totale" icon="check" tone="olive" />
        <KPI label="Ricavi totali" value={formatEUR(totalRevenue)} hint="netto consegne" icon="euro" tone="walnut" />
        <KPI label="Scontrino medio" value={formatEUR(totalRevenue / (completed.length || 1))} hint="" icon="bag" tone="tomato" />
        <KPI label="% delivery" value={`${Math.round((completed.filter((o) => o.mode === "delivery").length / (completed.length || 1)) * 100)}%`} hint="vs asporto" icon="bike" tone="ink" />
      </div>
      <Card title="Tutti gli ordini">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] font-sans">
            <thead>
              <tr className="text-ink-2 text-[10px] tracking-caps uppercase font-semibold border-b border-line">
                <th className="py-3 pr-4">Ordine</th>
                <th className="py-3 pr-4">Cliente</th>
                <th className="py-3 pr-4">Tipo</th>
                <th className="py-3 pr-4">Articoli</th>
                <th className="py-3 pr-4">Quando</th>
                <th className="py-3 pr-4 text-right">Totale</th>
                <th className="py-3 pr-2 text-right">Azione</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const items = o.items.map((it) => findMenuItem(it.id)).filter(Boolean);
                const time = new Date(o.placed_at).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
                return (
                  <tr key={o.id} className="border-b border-line last:border-0 hover:bg-sand-deep/40">
                    <td className="py-3 pr-4 font-mono text-[12px] text-ink-2">{o.id}</td>
                    <td className="py-3 pr-4 font-serif text-[15px] text-ink">{o.customer}</td>
                    <td className="py-3 pr-4"><Pill status={o.status} /></td>
                    <td className="py-3 pr-4 text-ink-2">{o.items.reduce((s, i) => s + i.qty, 0)}× ({items[0]?.name}{items.length > 1 ? "..." : ""})</td>
                    <td className="py-3 pr-4 text-ink-2">{time}</td>
                    <td className="py-3 pr-4 text-right font-semibold text-ink">{formatEUR(o.total ?? 0)}</td>
                    <td className="py-3 pr-2 text-right">
                      <button className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-line text-ink-2"><Icon name="arrow_r" size={13} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  PRODOTTI
// ════════════════════════════════════════════════════════════════════
function AdminProducts() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const items = MENU.items.filter(
    (i) =>
      (cat === "all" || i.cat === cat) &&
      (i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-end gap-4 justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          <button onClick={() => setCat("all")} className={`px-3 py-1.5 rounded-full font-sans text-[11px] tracking-caps uppercase ${cat === "all" ? "bg-ink text-cream" : "border border-line text-ink-2 hover:text-ink hover:border-ink"}`}>
            Tutto · {MENU.items.length}
          </button>
          {MENU.categories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={`px-3 py-1.5 rounded-full font-sans text-[11px] tracking-caps uppercase ${cat === c.id ? "bg-ink text-cream" : "border border-line text-ink-2 hover:text-ink hover:border-ink"}`}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cerca..." className="pl-9 pr-3 py-1.5 bg-cream border border-line rounded-full font-sans text-[12px] focus:outline-none focus:border-ink" />
          </div>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-tomato text-cream font-sans text-[11px] tracking-caps uppercase font-medium rounded-full hover:bg-tomato-deep">
            <Icon name="plus" size={12} /> Nuovo
          </button>
        </div>
      </div>

      <Card title={`${items.length} prodotti`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] font-sans">
            <thead>
              <tr className="text-ink-2 text-[10px] tracking-caps uppercase font-semibold border-b border-line">
                <th className="py-3 pr-4">Prodotto</th>
                <th className="py-3 pr-4">Categoria</th>
                <th className="py-3 pr-4">Prezzo</th>
                <th className="py-3 pr-4">Stock</th>
                <th className="py-3 pr-4">Tag</th>
                <th className="py-3 pr-4 text-center">Stato</th>
                <th className="py-3 pr-2 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-b border-line last:border-0 hover:bg-sand-deep/40">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-walnut/15 overflow-hidden shrink-0 grid place-items-center">
                        {i.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={i.photo} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <PizzaThumb size={42} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-serif text-[15px] text-ink leading-tight truncate">{i.name}</div>
                        <div className="font-sans text-[11px] text-ink-2 truncate max-w-[280px]">{i.desc}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-ink-2 capitalize">{i.cat}</td>
                  <td className="py-3 pr-4 font-semibold text-ink">{formatEUR(i.price)}</td>
                  <td className="py-3 pr-4 text-ink-2">{i.stock}</td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-1">
                      {i.vegan && <span className="px-1.5 py-0.5 bg-olive/15 text-olive text-[9px] tracking-caps uppercase font-bold rounded">VG</span>}
                      {i.featured && <span className="px-1.5 py-0.5 bg-amber/30 text-tomato-deep text-[9px] tracking-caps uppercase font-bold rounded">Forno</span>}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-center">
                    <button className={`relative inline-flex items-center w-9 h-5 rounded-full transition-colors ${i.stock > 0 ? "bg-olive" : "bg-ink-2"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-cream transition-all ${i.stock > 0 ? "left-[18px]" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="py-3 pr-2 text-right">
                    <div className="inline-flex gap-1">
                      <button className="w-7 h-7 rounded-full grid place-items-center hover:bg-line text-ink-2"><Icon name="edit" size={13} /></button>
                      <button className="w-7 h-7 rounded-full grid place-items-center hover:bg-line text-ink-2 hover:text-tomato"><Icon name="trash" size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  MAGAZZINO
// ════════════════════════════════════════════════════════════════════
function AdminInventory() {
  const low = INVENTORY.filter((i) => i.qty < i.threshold);
  const ok = INVENTORY.filter((i) => i.qty >= i.threshold);
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KPI label="Articoli totali" value={INVENTORY.length} hint="materie prime" icon="package" tone="walnut" />
        <KPI label="Scorte basse" value={low.length} hint="sotto soglia" icon="alert" tone="tomato" />
        <KPI label="Valore stimato" value={formatEUR(INVENTORY.length * 38.5)} hint="magazzino corrente" icon="euro" tone="olive" />
      </div>

      {low.length > 0 && (
        <Card title="Da riordinare" right={<span className="font-sans text-[11px] tracking-caps uppercase text-tomato">{low.length} {low.length === 1 ? "articolo" : "articoli"}</span>}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {low.map((i) => (
              <InventoryCard key={i.id} item={i} alert />
            ))}
          </div>
        </Card>
      )}

      <Card title="Tutte le materie prime">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ok.map((i) => (
            <InventoryCard key={i.id} item={i} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function InventoryCard({ item, alert }: { item: InventoryItem; alert?: boolean }) {
  const pct = Math.min(100, (item.qty / (item.threshold * 2)) * 100);
  return (
    <div className={`rounded-xl border p-4 ${alert ? "bg-tomato/5 border-tomato/30" : "bg-cream border-line"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-serif font-medium text-[16px] text-ink leading-tight">{item.name}</div>
        {alert && <Icon name="alert" size={14} className="text-tomato shrink-0 mt-1" />}
      </div>
      <div className="font-sans text-[11px] text-ink-2 mb-3">{item.supplier}</div>
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="font-serif font-medium text-[24px] leading-none text-ink">
          {item.qty} <span className="font-sans text-[12px] text-ink-2 ml-0.5">{item.unit}</span>
        </div>
        <div className="font-sans text-[10px] tracking-caps uppercase text-ink-2">soglia {item.threshold}</div>
      </div>
      <div className="w-full bg-line rounded-full h-1.5 overflow-hidden">
        <div className={`h-full ${alert ? "bg-tomato" : item.qty < item.threshold * 1.5 ? "bg-amber" : "bg-olive"}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex gap-1 mt-3">
        <button className="flex-1 px-2 py-1.5 rounded-lg border border-line text-ink-2 hover:text-ink hover:border-ink font-sans text-[10px] tracking-caps uppercase">Carico</button>
        <button className="flex-1 px-2 py-1.5 rounded-lg bg-ink text-cream font-sans text-[10px] tracking-caps uppercase">Riordina</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
//  PRENOTAZIONI
// ════════════════════════════════════════════════════════════════════
function AdminReservations() {
  const allReservations = useReservations();
  const [day, setDay] = useState(() => new Date().toISOString().slice(0, 10));
  const days = Array.from({ length: 14 }, (_, i) => new Date(Date.now() + i * 86400000));
  const reservations = allReservations.filter((r) => r.date === day);
  const totalParty = reservations.reduce((s, r) => s + r.party, 0);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Prenotazioni oggi" value={allReservations.filter((r) => r.date === new Date().toISOString().slice(0, 10)).length} hint="" icon="calendar" tone="tomato" />
        <KPI label="Coperti totali" value={totalParty} hint={`per il ${new Date(day).toLocaleDateString("it-IT")}`} icon="utensils" tone="olive" />
        <KPI label="Da confermare" value={allReservations.filter((r) => r.status === "pending").length} hint="" icon="alert" tone="walnut" />
        <KPI label="Tasso occupazione" value="76%" hint="vs 28 coperti" icon="trending" tone="ink" />
      </div>

      <Card title="Seleziona giorno">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((d) => {
            const iso = d.toISOString().slice(0, 10);
            const active = iso === day;
            const count = allReservations.filter((r) => r.date === iso).length;
            return (
              <button key={iso} onClick={() => setDay(iso)} className={`shrink-0 px-3 py-2 rounded-xl border text-center transition-all ${active ? "bg-ink text-cream border-ink" : "border-line text-ink hover:border-ink"}`}>
                <div className={`font-sans text-[9px] tracking-caps uppercase ${active ? "text-cream/70" : "text-ink-2"}`}>{d.toLocaleDateString("it-IT", { weekday: "short" }).replace(".", "")}</div>
                <div className="font-serif text-[20px] leading-none mt-0.5">{d.getDate()}</div>
                {count > 0 && <div className={`mt-1 inline-flex items-center justify-center min-w-[16px] h-[16px] rounded-full text-[9px] font-bold ${active ? "bg-cream/20 text-cream" : "bg-tomato/15 text-tomato"}`}>{count}</div>}
              </button>
            );
          })}
        </div>
      </Card>

      <Card title={`Prenotazioni · ${new Date(day).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}`}>
        {reservations.length === 0 ? (
          <div className="text-center py-10 font-serif italic text-[16px] text-ink-2">Nessuna prenotazione per questo giorno.</div>
        ) : (
          <ul className="list-none p-0 m-0 space-y-2">
            {reservations
              .slice()
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((r: Reservation) => (
                <li key={r.id} className="bg-sand-deep/40 rounded-xl p-4 flex items-center gap-4 flex-wrap">
                  <div className="text-center w-14 shrink-0">
                    <div className="font-serif font-medium text-[24px] leading-none text-ink">{r.time}</div>
                    <div className="font-sans text-[9px] tracking-caps uppercase text-ink-2 mt-1">{r.id}</div>
                  </div>
                  <div className="w-px h-10 bg-line shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif font-medium text-[17px] text-ink truncate">{r.name}</div>
                    <div className="font-sans text-[12px] text-ink-2 mt-0.5"><Icon name="phone" size={11} className="inline mr-1" />{r.phone}{r.notes && <span className="italic"> · {r.notes}</span>}</div>
                  </div>
                  <div className="text-center px-3 shrink-0">
                    <div className="font-serif font-medium text-[20px] leading-none text-ink">{r.party}</div>
                    <div className="font-sans text-[9px] tracking-caps uppercase text-ink-2 mt-0.5">{r.party === 1 ? "persona" : "persone"}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans text-[10px] tracking-caps uppercase font-semibold ${r.status === "confirmed" ? "bg-olive/15 text-olive" : "bg-amber/30 text-walnut"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${r.status === "confirmed" ? "bg-olive" : "bg-walnut"}`} />
                    {r.status === "confirmed" ? "Confermata" : "Da confermare"}
                  </span>
                  <div className="flex gap-1 shrink-0">
                    <button className="w-8 h-8 rounded-full grid place-items-center hover:bg-line text-ink-2"><Icon name="edit" size={13} /></button>
                    <button className="w-8 h-8 rounded-full grid place-items-center hover:bg-line text-ink-2 hover:text-tomato"><Icon name="x" size={13} /></button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

export default AdminApp;
