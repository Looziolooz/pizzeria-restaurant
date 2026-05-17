"use client"

import Link from "next/link"
import { Icon, KV } from "@/components/ui"
import { SHOP, formatEUR } from "@/lib/data"

export default function ContactPage() {
  return (
    <div className="bg-sand">
      <section className="bg-sand-deep border-b border-line py-14 md:py-18">
        <div className="max-w-content mx-auto px-6 md:px-8 text-center">
          <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium mb-3">Da Lorenzo · Milano</div>
          <h1 className="font-serif font-medium leading-[1] tracking-[-0.015em] m-0 mb-4" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>
            Contattaci.
          </h1>
          <p className="font-serif italic text-[18px] text-ink-2 max-w-[580px] mx-auto">
            Siamo qui per te. Prenota un tavolo, chiedici informazioni o passaci a trovare.
          </p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-tomato font-semibold mb-3">Prenota</div>
            <h2 className="font-serif font-medium leading-tight text-ink mb-8" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>
              Richiedi un tavolo.
            </h2>
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="r-name" className="block font-sans font-medium text-[12px] text-ink mb-1.5">Nome</label>
                  <input id="r-name" placeholder="Il tuo nome"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:border-ink text-[14px] font-sans text-ink transition-all placeholder:text-ink-2/50" />
                </div>
                <div>
                  <label htmlFor="r-email" className="block font-sans font-medium text-[12px] text-ink mb-1.5">Email</label>
                  <input id="r-email" type="email" placeholder="tua@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:border-ink text-[14px] font-sans text-ink transition-all placeholder:text-ink-2/50" />
                </div>
              </div>
              <div>
                <label htmlFor="r-phone" className="block font-sans font-medium text-[12px] text-ink mb-1.5">Telefono</label>
                <input id="r-phone" type="tel" placeholder="+39 333 1234567"
                  className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:border-ink text-[14px] font-sans text-ink transition-all placeholder:text-ink-2/50" />
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="r-date" className="block font-sans font-medium text-[12px] text-ink mb-1.5">Data</label>
                  <input id="r-date" type="date" defaultValue="2026-05-17"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:border-ink text-[14px] font-sans text-ink transition-all" />
                </div>
                <div>
                  <label htmlFor="r-time" className="block font-sans font-medium text-[12px] text-ink mb-1.5">Ora</label>
                  <input id="r-time" type="time" defaultValue="20:00"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:border-ink text-[14px] font-sans text-ink transition-all" />
                </div>
                <div>
                  <label htmlFor="r-guests" className="block font-sans font-medium text-[12px] text-ink mb-1.5">Ospiti</label>
                  <select id="r-guests" defaultValue="2"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:border-ink text-[14px] font-sans text-ink transition-all">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "ospite" : "ospiti"}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="r-msg" className="block font-sans font-medium text-[12px] text-ink mb-1.5">Richieste speciali</label>
                <textarea id="r-msg" rows={3} placeholder="Allergie, intolleranze, occasioni speciali..."
                  className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:border-ink text-[14px] font-sans text-ink transition-all resize-none placeholder:text-ink-2/50" />
              </div>
              <button type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-tomato hover:bg-tomato-deep text-cream font-sans font-medium text-[12px] tracking-caps uppercase px-8 py-3.5 rounded-full transition-all">
                Invia richiesta <Icon name="arrow_r" size={14} />
              </button>
            </form>
          </div>

          <div className="lg:pt-10 space-y-6">
            <div className="bg-cream rounded-xl2 border border-line p-6 md:p-8">
              <h3 className="font-serif font-medium text-[22px] text-ink m-0 mb-6">Informazioni</h3>
              <div className="space-y-5">
                <KV label="Indirizzo"><div className="flex items-center gap-2"><Icon name="pin" size={16} className="text-tomato shrink-0" />{SHOP.address}</div></KV>
                <KV label="Telefono"><div className="flex items-center gap-2"><Icon name="phone" size={16} className="text-tomato shrink-0" /><a href={`tel:${SHOP.phone}`} className="hover:text-tomato transition-colors">{SHOP.phone}</a></div></KV>
                <KV label="Email"><div className="flex items-center gap-2"><Icon name="bag" size={16} className="text-tomato shrink-0" /><a href={`mailto:${SHOP.email}`} className="hover:text-tomato transition-colors">{SHOP.email}</a></div></KV>
                <KV label="Orari">{SHOP.hours.map(h => `${h.day}: ${h.time}`).join(" · ")}</KV>
              </div>
            </div>

            <div className="bg-cream rounded-xl2 border border-line p-6 md:p-8">
              <h3 className="font-serif font-medium text-[22px] text-ink m-0 mb-4">Seguici</h3>
              <div className="flex gap-3">
                {[
                  { name: "Instagram", url: "#", icon: "store" },
                  { name: "Facebook", url: "#", icon: "star" },
                  { name: "TripAdvisor", url: "#", icon: "trending" },
                ].map(s => (
                  <Link key={s.name} href={s.url}
                    className="w-11 h-11 rounded-full bg-sand-deep grid place-items-center text-walnut hover:bg-tomato hover:text-cream transition-all">
                    <Icon name={s.icon} size={16} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-ink rounded-xl2 p-6 md:p-8 text-center">
              <div className="font-serif font-medium text-[24px] text-cream mb-2">{SHOP.name}</div>
              <div className="font-sans text-[13px] text-cream/70">{SHOP.address}</div>
              <Link href="/menu"
                className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-tomato text-cream font-sans font-medium text-[11px] tracking-caps uppercase rounded-full">
                Ordina online <Icon name="arrow_r" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
