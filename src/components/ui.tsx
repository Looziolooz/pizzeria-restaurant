"use client"

import type { ReactNode } from "react"

const ICONS: Record<string, string> = {
  pizza: "M12 2a10 10 0 00-10 10c0 1 .2 1.9.4 2.8L12 22l9.6-7.2c.2-.9.4-1.8.4-2.8A10 10 0 0012 2z M8 10h.01M14 8h.01M10 14h.01M14 14h.01",
  bag: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 11-8 0",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 7a4 4 0 100 8 4 4 0 000-8z",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.3-4.3",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.58 2.81.7A2 2 0 0122 16.92z",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z",
  cart: "M6 6h15l-1.5 9h-12L5 3H2 M9 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M20 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  x: "M18 6L6 18 M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  chevron_r: "M9 18l6-6-6-6",
  chevron_d: "M6 9l6 6 6-6",
  bike: "M5.5 17.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z M18.5 17.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z M5.5 14L9 7h4l2.5 7 M13 7h4l-1 4",
  store: "M3 9l1-5h16l1 5 M5 9v11h14V9 M9 14h6",
  utensils: "M3 2v7a3 3 0 003 3v10 M9 2v20 M21 15V2a5 5 0 00-5 5v8a2 2 0 002 2h3z",
  flame: "M8.5 14.5A3.5 3.5 0 0012 18a7 7 0 007-7c0-1.4-.4-2.7-1-3.8C16.5 4.5 12 2 12 2c0 4-3 4-3 9 0 1.4.5 2.6 1.5 3.5z",
  package: "M16.5 9.4L7.5 4.21 M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  layout: "M3 3h18v18H3z M3 9h18 M9 21V9",
  trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  euro: "M4 10h12 M4 14h9 M19 6.5a6.5 6.5 0 100 11",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  arrow_r: "M5 12h14 M12 5l7 7-7 7",
  arrow_l: "M19 12H5 M12 19l-7-7 7-7",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.12 2.12 0 113 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6 1.65 1.65 0 0010 3.09V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.36.13.71.31 1 .55",
  calendar: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4 M8 2v4 M3 10h18",
  log_out: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
}

export function Icon({ name, size = 18, className = "", strokeWidth = 1.6 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const d = ICONS[name] || ICONS.x
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={d} />
    </svg>
  )
}

export function PizzaThumb({ variant = "margherita", size = 200 }: { variant?: string; size?: number }) {
  const palettes: Record<string, string[]> = {
    margherita: ["#B23A22", "#F4E4C1", "#3D6B2C"],
    diavola: ["#A02817", "#F2DFB9", "#7A1E12"],
    bianca: ["#F4E4C1", "#FBF1D9", "#5C6B3F"],
    funghi: ["#7A4A2E", "#E8D7A6", "#3D6B2C"],
  }
  const p = palettes[variant] || palettes.margherita
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <circle cx="100" cy="100" r="92" fill="#D9A55C" />
      <circle cx="100" cy="100" r="78" fill={p[0]} />
      {Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2
        return <ellipse key={i} cx={100 + Math.cos(a) * 50} cy={100 + Math.sin(a) * 50} rx="10" ry="8" fill={p[1]} opacity="0.92" />
      })}
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2 + 0.4
        return <path key={i} transform={`translate(${100 + Math.cos(a) * 30} ${100 + Math.sin(a) * 30})`}
          d="M 0 -6 Q 4 -3 0 6 Q -4 -3 0 -6 Z" fill={p[2]} />
      })}
    </svg>
  )
}

export function SourdoughBadge({ size = 220, accent = "#8B7355" }: { size?: number; accent?: string }) {
  const sub = `${accent}88`
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} style={{ maxWidth: "100%", height: "auto" }}>
      <circle cx="110" cy="110" r="105" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.6" />
      <circle cx="110" cy="110" r="78" fill="none" stroke={accent} strokeWidth="0.8" strokeDasharray="2 5" opacity="0.5" />
      <g transform="translate(110 110)">
        <path d="M -52 -28 Q -64 -10 -56 18 Q -42 50 -8 56 Q 32 60 52 36 Q 70 8 58 -22 Q 42 -52 8 -54 Q -32 -54 -52 -28 Z" fill={accent} opacity="0.13" />
        <path d="M -42 -18 Q -52 -2 -44 22 Q -32 42 -2 46 Q 26 48 42 28 Q 56 6 46 -16 Q 32 -42 4 -42 Q -24 -42 -42 -18 Z" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.9" />
        <circle cx="-22" cy="-8" r="3" fill={accent} opacity="0.55" />
        <circle cx="6" cy="-14" r="4" fill={accent} opacity="0.45" />
        <circle cx="20" cy="8" r="2.5" fill={accent} opacity="0.6" />
        <circle cx="-6" cy="18" r="3.5" fill={accent} opacity="0.5" />
        <circle cx="14" cy="22" r="2" fill={accent} opacity="0.55" />
        <circle cx="-30" cy="14" r="2.2" fill={accent} opacity="0.45" />
      </g>
    </svg>
  )
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-cream rounded-xl2 border border-line p-6 md:p-7 mb-5">
      <h3 className="font-serif font-medium text-[20px] m-0 mb-5 text-ink">{title}</h3>
      {children}
    </section>
  )
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>
}

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block mb-4 last:mb-0">
      <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-ink-2 mb-2 font-semibold">{label}</div>
      {children}
      {error && <div className="text-[12px] text-tomato mt-1.5 font-sans">{error}</div>}
    </label>
  )
}

export function Input({ value, onChange, ...rest }: { value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl border border-line bg-cream font-sans text-[14px] text-ink focus:outline-none focus:border-ink transition-colors"
      {...rest} />
  )
}

export function KV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-walnut font-semibold mb-1.5">{label}</div>
      <div className="font-serif text-[18px] text-ink leading-snug">{children}</div>
    </div>
  )
}
