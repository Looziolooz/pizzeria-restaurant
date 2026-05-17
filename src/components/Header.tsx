"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Chi Siamo" },
  { href: "/contact", label: "Contatti" },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-sand/92 backdrop-blur-xl border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16 sm:h-20">
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative ${
                    isActive
                      ? "text-tomato"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-tomato rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex justify-center">
            <Link href="/" className="flex flex-col items-center leading-tight">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-ink tracking-tight">
                Da Lorenzo
              </span>
              <span className="text-[10px] sm:text-xs font-sans text-ink-2 tracking-[0.22em] uppercase mt-0.5">
                Milano · dal 1985
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-4">
            <a
              href="tel:+390212345678"
              className="hidden sm:flex items-center gap-2 text-xs font-medium text-tomato hover:text-tomato-deep transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +39 02 1234 5678
            </a>
            <Link
              href="/contact"
              className="text-xs font-semibold bg-tomato hover:bg-tomato-deep text-white px-5 py-2 rounded-full transition-all duration-300"
            >
              Prenota
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
