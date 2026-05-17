"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/store"
import { Icon } from "./ui"
import { SHOP } from "@/lib/data"

export default function Header() {
  const pathname = usePathname()
  const { count } = useCart()

  const isAdmin = pathname.startsWith("/admin")
  if (isAdmin) return null

  const here = (p: string) => pathname === p

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`relative font-sans text-[13px] font-medium tracking-[0.02em] py-2 transition-colors duration-200 ease-gentle ${
        here(href) ? "text-tomato" : "text-ink hover:text-tomato"
      }`}
    >
      {label}
      {here(href) && <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-tomato rounded-full" />}
    </Link>
  )

  return (
    <header className="sticky top-0 z-40 bg-sand/92 backdrop-blur-xl border-b border-line">
      <div className="max-w-page mx-auto px-6 md:px-8 h-[78px] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <nav className="hidden md:flex items-center gap-7 justify-self-start">
          {link("/", "Home")}
          {link("/menu", "Menù & Ordina")}
          {link("/reserve", "Prenota un tavolo")}
        </nav>

        <Link href="/" className="flex flex-col items-center justify-center leading-none group">
          <span className="font-serif font-medium text-[28px] md:text-[30px] tracking-[0.02em] text-ink group-hover:text-tomato transition-colors">
            Da Lorenzo
          </span>
          <span className="font-sans text-[9px] tracking-[0.32em] uppercase text-ink-2 mt-1">Milano · dal 1985</span>
        </Link>

        <div className="flex items-center gap-3 md:gap-5 justify-self-end">
          <Link
            href="/contact"
            className={`hidden md:inline-flex font-sans text-[13px] font-medium py-2 transition-colors duration-200 ease-gentle ${
              here("/contact") ? "text-tomato" : "text-ink hover:text-tomato"
            }`}
          >
            Contatti
          </Link>
          <a
            href={`tel:${SHOP.phone}`}
            className="hidden md:inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.02em] text-ink-2 hover:text-tomato transition-colors"
          >
            <Icon name="phone" size={14} /> {SHOP.phone}
          </a>
          <Link
            href="/menu"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-cream font-sans text-[12px] tracking-caps uppercase font-medium hover:bg-tomato transition-colors duration-200 ease-gentle"
          >
            <Icon name="bag" size={14} />
            <span className="hidden sm:inline">Ordina</span>
            {count > 0 && (
              <span className="ml-1 grid place-items-center min-w-[20px] h-[20px] rounded-full bg-amber text-forno text-[10px] font-bold px-1.5">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/admin"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full border border-line-strong text-ink-2 hover:text-ink hover:border-ink transition-colors"
            title="Admin"
          >
            <Icon name="user" size={15} />
          </Link>
        </div>
      </div>

      <div className="md:hidden border-t border-line px-3 py-2 flex gap-1 overflow-x-auto bg-sand">
        {[
          ["/", "Home"],
          ["/menu", "Menù"],
          ["/reserve", "Prenota"],
          ["/contact", "Contatti"],
          ["/admin", "Admin"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] tracking-[0.1em] uppercase font-medium font-sans transition-colors ${
              here(href) ? "bg-ink text-cream" : "text-ink-2"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
