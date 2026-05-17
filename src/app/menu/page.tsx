"use client"

import Link from "next/link"
import ModeToggle from "@/components/ModeToggle"
import MenuRow from "@/components/MenuRow"
import CartCard from "@/components/CartCard"
import { Icon } from "@/components/ui"
import { useCart } from "@/lib/store"
import { MENU_CATEGORIES, MENU_ITEMS, SHOP, formatEUR } from "@/lib/data"

export default function MenuPage() {
  const cart = useCart()
  const minOrder = cart.mode === "delivery" ? SHOP.delivery_min : SHOP.pickup_min
  const meetsMin = cart.subtotal >= minOrder

  return (
    <div className="bg-sand">
      <section className="bg-sand-deep border-b border-line py-12 md:py-16">
        <div className="max-w-page mx-auto px-6 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium mb-3">Ordina online</div>
              <h1 className="font-serif font-medium leading-[1] tracking-[-0.015em] m-0" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>
                Il nostro <em className="italic text-walnut">menù.</em>
              </h1>
              <p className="font-serif italic text-[18px] text-ink-2 mt-3 max-w-[560px]">
                Tagliate a spicchi. Pronte in {SHOP.prep_minutes} minuti. Delivery o asporto, scegli tu.
              </p>
            </div>
            <ModeToggle />
          </div>
        </div>
      </section>

      <nav className="sticky top-[124px] md:top-[78px] z-30 bg-sand/95 backdrop-blur-xl border-b border-line overflow-x-auto">
        <div className="max-w-page mx-auto px-6 md:px-8 flex gap-1 py-3">
          {MENU_CATEGORIES.map(cat => (
            <a key={cat.id} href={`#cat-${cat.id}`}
              className="flex-shrink-0 px-4 py-2 rounded-full font-sans text-[11px] tracking-caps uppercase font-medium transition-colors text-ink-2 hover:text-ink hover:bg-walnut/10">
              {cat.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-page mx-auto px-6 md:px-8 py-10 md:py-14 grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
        <div className="min-w-0">
          {MENU_CATEGORIES.map(cat => {
            const items = MENU_ITEMS.filter(i => i.cat === cat.id)
            if (!items.length) return null
            return (
              <section key={cat.id} id={`cat-${cat.id}`} className="mb-14 scroll-mt-44">
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-7 pb-4 border-b border-line">
                  <h2 className="font-serif font-medium leading-tight m-0 text-ink" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>{cat.label}</h2>
                  <div className="font-serif italic text-[15px] text-walnut">{cat.sub}</div>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                  {items.map(item => <MenuRow key={item.id} item={item} />)}
                </div>
              </section>
            )
          })}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-44">
            <CartCard />
          </div>
        </aside>
      </div>

      {cart.count > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink text-cream border-t border-forno px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="font-sans text-[10px] tracking-[0.22em] uppercase opacity-70">Carrello · {cart.count} {cart.count === 1 ? "articolo" : "articoli"}</div>
            <div className="font-serif font-medium text-[20px]">{formatEUR(cart.subtotal)}</div>
          </div>
          <Link href="/checkout"
            className={`px-5 py-3 bg-tomato text-cream font-sans font-medium text-[11px] tracking-caps uppercase rounded-full ${
              !meetsMin ? "pointer-events-none opacity-50" : ""
            }`}>
            {meetsMin ? "Procedi →" : `Minimo ${formatEUR(minOrder)}`}
          </Link>
        </div>
      )}
    </div>
  )
}
