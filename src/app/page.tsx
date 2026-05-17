"use client"

import Image from "next/image"
import Link from "next/link"
import ParallaxShowcase from "@/components/ParallaxShowcase"
import PizzaCard from "@/components/PizzaCard"
import { Icon } from "@/components/ui"
import { SHOP, MENU_ITEMS, PIZZA_PHOTOS, formatEUR } from "@/lib/data"
import { useCart } from "@/lib/store"

export default function Home() {
  const cart = useCart()
  const featured = MENU_ITEMS.filter(i => i.featured)
  const popular = ["p-margherita", "p-nduja", "p-tropea", "p-bergamotto", "p-diavola", "p-mortadella"]
    .map(id => MENU_ITEMS.find(i => i.id === id))
    .filter(Boolean)

  return (
    <div className="bg-sand">
      <section className="relative min-h-[640px] md:min-h-[760px] overflow-hidden bg-forno text-cream">
        <div className="absolute inset-0">
          <Image src={PIZZA_PHOTOS.hero[0]} alt="" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-forno/40 via-forno/55 to-forno/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-forno/50 via-transparent to-forno/30" />
        </div>
        <div className="relative max-w-page mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-32 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="font-sans text-[11px] tracking-[0.22em] uppercase font-medium text-cream/80">
              Milano · Calabria · dal 1985
            </div>
            <h1 className="font-serif font-medium leading-[0.95] tracking-[-0.02em] mt-5 mb-7 text-cream"
              style={{ fontSize: "clamp(44px, 9vw, 124px)", textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}>
              Pizza vera,<br />
              <em className="italic text-amber font-normal">a due passi da te.</em>
            </h1>
            <p className="font-serif italic text-[20px] md:text-[22px] leading-snug text-cream/92 max-w-[520px] mb-9">
              Lievito madre vivo. Farine biologiche. Topping della nostra terra: 'nduja di Spilinga,
              cipolla rossa di Tropea, bergamotto di Reggio.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/menu"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-tomato text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-tomato-deep hover:-translate-y-0.5 transition-all duration-200 ease-gentle">
                <Icon name="bag" size={15} /> Ordina online
              </Link>
              <Link href="/reserve"
                className="inline-flex items-center gap-2.5 px-7 py-4 border border-cream/45 text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-cream/10 hover:border-cream transition-all duration-200 ease-gentle">
                <Icon name="utensils" size={15} /> Prenota un tavolo
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-10 text-cream/75 font-sans text-[12px]">
              <div className="inline-flex items-center gap-2"><Icon name="clock" size={13} /> Pronta in 25 min</div>
              <div className="inline-flex items-center gap-2"><Icon name="bike" size={13} /> Delivery entro 8 km</div>
              <div className="inline-flex items-center gap-2"><Icon name="store" size={13} /> Asporto da {formatEUR(SHOP.pickup_min)}</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 z-10 text-cream/65 font-sans text-[11px] tracking-[0.22em] uppercase hidden md:block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>scroll</div>
      </section>

      <ParallaxShowcase />

      <section className="border-b border-line">
        <div className="max-w-page mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
          {[
            { icon: "bike", label: "Delivery", sub: `${SHOP.delivery_radius_km} km · da ${formatEUR(SHOP.delivery_min)}`, href: "/menu" },
            { icon: "store", label: "Asporto", sub: `Pronta in ${SHOP.prep_minutes} min · da ${formatEUR(SHOP.pickup_min)}`, href: "/menu" },
            { icon: "utensils", label: "Prenota tavolo", sub: "Cena al locale, 28 coperti.", href: "/reserve" },
          ].map((c, i) => (
            <Link key={i} href={c.href}
              className="group px-6 md:px-10 py-10 md:py-12 flex items-center gap-5 hover:bg-sand-deep transition-colors duration-200 ease-gentle">
              <div className="w-14 h-14 rounded-full bg-tomato/8 grid place-items-center text-tomato shrink-0">
                <Icon name={c.icon} size={24} />
              </div>
              <div className="flex-1">
                <div className="font-serif font-medium text-[26px] leading-tight text-ink group-hover:text-tomato transition-colors">{c.label}</div>
                <div className="font-sans text-[13px] text-ink-2 mt-1">{c.sub}</div>
              </div>
              <Icon name="arrow_r" size={18} className="text-ink-2 group-hover:text-tomato group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-24 max-w-page mx-auto px-6 md:px-8">
        <div className="flex items-baseline justify-between gap-6 flex-wrap mb-10">
          <div>
            <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium mb-3">Stasera al forno</div>
            <h2 className="font-serif font-medium leading-[1.02] tracking-[-0.015em] m-0" style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}>
              Le pizze del momento.
            </h2>
          </div>
          <Link href="/menu"
            className="font-sans text-[12px] tracking-caps uppercase text-walnut border-b border-walnut pb-1 hover:text-tomato hover:border-tomato transition-colors">
            Tutto il menù &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {popular.map(p => p && <PizzaCard key={p.id} item={p} />)}
        </div>
      </section>

      <section className="bg-sand-deep border-y border-line py-24 md:py-28">
        <div className="max-w-content mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          <div className="aspect-[4/5] rounded-xl2 overflow-hidden bg-walnut relative">
            <Image src={PIZZA_PHOTOS.story} alt="Lievito madre vivo" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-forno/55 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 font-serif italic text-cream/95 text-[15px] leading-snug">
              Nutriamo il nostro lievito madre ogni giorno, dal 2014.
              Acqua, farina, tempo &mdash; e una memoria che si tramanda di impasto in impasto.
            </div>
          </div>
          <div>
            <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium">La nostra storia</div>
            <h2 className="font-serif font-medium leading-[1.02] tracking-[-0.015em] mt-4 mb-6" style={{ fontSize: "clamp(40px, 5vw, 68px)" }}>
              Nati a Tropea.<br />
              <em className="italic text-walnut">Cresciuti con calma.</em>
            </h2>
            <p className="font-serif text-[19px] leading-relaxed text-ink m-0 mb-5 max-w-[520px]">
              Da Lorenzo nasce nel 2014 a Milano, da un'idea di due fratelli calabresi
              e una madre &mdash; il lievito che ancora oggi profuma le nostre cucine.
            </p>
            <p className="font-serif text-[19px] leading-relaxed text-ink m-0 mb-7 max-w-[520px]">
              Una sola pizzeria. Una sola idea: pizza vera, fatta con le materie prime
              della nostra terra. 'Nduja di Spilinga, cipolla rossa IGP, bergamotto di Reggio,
              caciocavallo silano, alici di Cetara. Tutto a chilometri zero, o quasi.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-[480px]">
              {[
                ["12", "anni di forno"],
                ["48", "ore di lievitazione"],
                ["100%", "ingredienti calabresi"],
              ].map(([k, v]) => (
                <div key={v} className="border-t border-line pt-3">
                  <div className="font-serif font-medium text-[36px] leading-none text-tomato">{k}</div>
                  <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-ink-2 mt-2">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 max-w-content mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
          <div>
            <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium mb-3">Vieni a trovarci</div>
            <h2 className="font-serif font-medium leading-[1.02] tracking-[-0.015em] m-0 mb-7" style={{ fontSize: "clamp(36px, 4.5vw, 56px)" }}>
              Via Roma 42,<br />a due passi dal centro.
            </h2>
            <ul className="font-serif text-[18px] text-ink leading-relaxed list-none p-0 m-0 space-y-2.5">
              <li className="flex gap-3 items-start"><Icon name="pin" size={18} className="text-tomato mt-1.5 shrink-0" />{SHOP.address}</li>
              <li className="flex gap-3 items-start"><Icon name="phone" size={18} className="text-tomato mt-1.5 shrink-0" />{SHOP.phone}</li>
              <li className="flex gap-3 items-start"><Icon name="clock" size={18} className="text-tomato mt-1.5 shrink-0" />
                <div className="space-y-0.5">
                  {SHOP.hours.map(h => (
                    <div key={h.day}><span className="text-ink-2 mr-2 italic">{h.day}</span>{h.time}</div>
                  ))}
                </div>
              </li>
            </ul>
            <div className="flex gap-3 mt-8">
              <Link href="/reserve"
                className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-sand font-sans font-medium text-[11px] tracking-caps uppercase rounded-full hover:bg-tomato transition-colors">
                <Icon name="utensils" size={14} /> Prenota
              </Link>
              <Link href="/menu"
                className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink font-sans font-medium text-[11px] tracking-caps uppercase rounded-full hover:bg-ink hover:text-sand transition-all">
                <Icon name="bag" size={14} /> Ordina
              </Link>
            </div>
          </div>
          <div className="aspect-[5/4] rounded-xl2 overflow-hidden relative bg-sand-deep border border-line">
            <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
              <rect width="500" height="400" fill="#EFE8DE" />
              <path d="M 0 240 Q 100 230 200 250 Q 300 270 400 250 Q 470 240 500 250 L 500 400 L 0 400 Z" fill="#A8C0CC" opacity="0.6" />
              <path d="M 0 260 Q 100 250 200 270 Q 300 290 400 270 Q 470 260 500 270 L 500 400 L 0 400 Z" fill="#7FA4B5" opacity="0.5" />
              <path d="M 0 240 Q 100 230 200 250 Q 300 270 400 250 Q 470 240 500 250" fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.5" />
              <g stroke="#D6CDBF" strokeWidth="2" fill="none">
                <path d="M 60 60 Q 180 80 240 140 Q 300 200 380 220" />
                <path d="M 80 200 L 220 200 L 220 280" />
                <path d="M 280 60 L 280 200 L 380 200" />
                <line x1="0" y1="160" x2="500" y2="160" strokeDasharray="2 6" />
                <line x1="160" y1="0" x2="160" y2="400" strokeDasharray="2 6" />
                <line x1="340" y1="0" x2="340" y2="400" strokeDasharray="2 6" />
              </g>
              <text x="50" y="50" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="14" fill="#8B7355">Centro Storico</text>
              <text x="380" y="290" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="14" fill="#5C7A8C">Zona Porta Venezia</text>
              <text x="100" y="320" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="13" fill="#5C7A8C">Parco Sempione</text>
              <g transform="translate(240 175)">
                <circle r="40" fill="#B23A22" opacity="0.12" />
                <circle r="24" fill="#B23A22" opacity="0.18" />
                <circle r="11" fill="#B23A22" stroke="#FBF5EC" strokeWidth="3" />
                <text y="-20" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="2" fill="#B23A22" fontWeight="600">DA LORENZO</text>
              </g>
            </svg>
            <div className="absolute bottom-3 right-3 bg-cream/90 backdrop-blur px-3 py-1.5 rounded-full font-sans text-[10px] tracking-caps uppercase text-ink-2">
              Via Roma 42 · Milano
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
