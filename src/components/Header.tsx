"use client"

import Link from "next/link"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Chi Siamo" },
  { href: "/contact", label: "Contatti" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-primary">Da Lorenzo</span>
            <span className="hidden sm:inline text-xs text-primary-light italic">Pizzeria & Cucina</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/menu"
              className="bg-primary hover:bg-primary-light text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
            >
              Prenota Ora
            </Link>
          </nav>
          <button
            className="md:hidden p-2 text-dark"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-warm bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-dark hover:text-primary transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="block text-center bg-primary hover:bg-primary-light text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
            >
              Prenota Ora
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
