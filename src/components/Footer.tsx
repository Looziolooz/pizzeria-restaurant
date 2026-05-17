"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icon } from "./ui"
import { SHOP } from "@/lib/data"

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h5 className="font-sans text-[11px] tracking-[0.22em] uppercase text-cream/55 font-medium m-0 mb-4">{title}</h5>
      <ul className="list-none p-0 m-0 flex flex-col gap-2">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="font-serif text-[16px] text-cream hover:text-amber transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forno text-cream/80 pt-16 md:pt-20 pb-8 mt-16 lg:pb-8">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-14 pb-12 border-b border-cream/12">
          <div>
            <div className="font-serif font-medium text-[36px] text-cream leading-none">Da Lorenzo</div>
            <p className="font-serif italic text-[17px] leading-snug text-cream/85 max-w-[340px] mt-3 mb-5">
              Pizza calabrese a lievito madre. Nel cuore di Milano.
            </p>
            <div className="font-sans text-[12px] leading-relaxed text-cream/55">
              {SHOP.address}<br />
              {SHOP.phone} · {SHOP.email}<br />
              {SHOP.vat}
            </div>
            <div className="flex gap-2.5 mt-5">
              {["Instagram", "Facebook", "TikTok"].map(s => (
                <a key={s} href="#" aria-label={s}
                  className="grid place-items-center w-9 h-9 rounded-full border border-cream/20 text-cream hover:bg-tomato hover:border-tomato transition-all">
                  <span className="font-sans text-[10px] font-bold tracking-wider">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Cosa facciamo" items={[
            ["Menù & Ordina", "/menu"],
            ["Prenota un tavolo", "/reserve"],
            ["Eventi privati", "/contact"],
            ["Lavora con noi", "/contact"],
          ]} />
          <FooterCol title="La pizzeria" items={[
            ["La nostra storia", "/about"],
            ["Contatti", "/contact"],
            ["FAQ", "/contact"],
          ]} />
          <FooterCol title="Legale" items={[
            ["Privacy", "#"],
            ["Cookies", "#"],
            ["Termini di servizio", "#"],
            ["Admin", "/admin"],
          ]} />
        </div>
        <div className="pt-8 flex justify-between flex-wrap gap-4 font-sans text-[12px] text-cream/50">
          <div>&copy; {year} Da Lorenzo Srl · Milano · {SHOP.vat}</div>
          <div className="font-serif italic text-cream/70">&ldquo;Buona pizza, brava gente.&rdquo;</div>
        </div>
      </div>
    </footer>
  )
}
