import Link from "next/link"
import { restaurantInfo } from "@/data/restaurant"

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Chi Siamo" },
  { href: "/contact", label: "Contatti" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-forno text-white/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex flex-col leading-tight mb-4">
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Da Lorenzo
              </span>
              <span className="text-[10px] font-sans text-white/40 tracking-[0.22em] uppercase mt-0.5">
                Milano · dal 1985
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Autentica cucina calabrese a Milano. Pizze cotte nel forno a legna, pasta fatta a
              mano e ingredienti del nostro territorio.
            </p>
          </div>

          <div>
            <h4 className="text-caps text-white/40 text-[11px] mb-4">Pagine</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-caps text-white/40 text-[11px] mb-4">Orari</h4>
            <ul className="space-y-2.5">
              {restaurantInfo.hours.map((h, i) => (
                <li key={i} className="text-sm">
                  <span className="block text-white/80 font-medium">{h.days}</span>
                  <span className="text-white/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-caps text-white/40 text-[11px] mb-4">Contatti</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-white/50">{restaurantInfo.address}</li>
              <li>
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {restaurantInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {restaurantInfo.email}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {restaurantInfo.social.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-tomato hover:text-white transition-all text-xs"
                  aria-label={s.name}
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>&copy; {currentYear} {restaurantInfo.name}. Tutti i diritti riservati.</p>
          <p>P.IVA 01234567890</p>
        </div>
      </div>
    </footer>
  )
}
