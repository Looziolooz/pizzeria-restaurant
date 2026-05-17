import Image from "next/image"
import Link from "next/link"
import { Icon } from "@/components/ui"
import { SHOP, PIZZA_PHOTOS } from "@/lib/data"

const values = [
  {
    title: "Tradizione Calabrese",
    desc: "Ricette autentiche tramandate da generazioni, con ingredienti del nostro territorio d'origine.",
  },
  {
    title: "Qualità Artigianale",
    desc: "Impasto a lunga lievitazione, farine selezionate, pomodori di chiara provenienza calabrese.",
  },
  {
    title: "Passione e Accoglienza",
    desc: "Un'atmosfera familiare dove ogni ospite è trattato come a casa nostra.",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-sand">
      <section className="bg-sand-deep border-b border-line py-14 md:py-18">
        <div className="max-w-content mx-auto px-6 md:px-8 text-center">
          <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium mb-3">Da Lorenzo · Milano</div>
          <h1 className="font-serif font-medium leading-[1] tracking-[-0.015em] m-0 mb-4" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>
            Chi <em className="italic text-tomato">siamo.</em>
          </h1>
          <p className="font-serif italic text-[18px] text-ink-2 max-w-[580px] mx-auto">La nostra storia, la nostra passione.</p>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-xl2 overflow-hidden">
            <Image src={PIZZA_PHOTOS.story} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-sand/30 to-transparent" />
          </div>
          <div>
            <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-tomato font-semibold mb-3">La Nostra Storia</div>
            <h2 className="font-serif font-medium leading-tight text-ink mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Calabresi di nascita,<br />
              <span className="italic font-normal text-ink-2">milanesi d&apos;adozione.</span>
            </h2>
            <div className="space-y-4 font-sans text-[14px] text-ink-2 leading-relaxed">
              <p><strong className="font-semibold text-ink">Da Lorenzo</strong> nasce nel 2014 quando Lorenzo decide di portare a Milano i sapori autentici della sua Calabria. Quello che inizia come una piccola pizzeria di quartiere diventa presto un punto di riferimento per gli amanti della vera cucina calabrese.</p>
              <p>Oggi, a distanza di oltre dieci anni, la tradizione continua con la stessa passione. Il nostro forno a legna sforna pizze fragranti con impasto a lunga lievitazione, la pasta è fatta a mano ogni mattina, e i dolci sono preparati secondo le ricette della nonna.</p>
              <p>Ogni ingrediente è selezionato con cura: l&rsquo;olio extravergine dei fratelli Macrì, la &rsquo;nduja artigianale di Spilinga, il pecorino crotonese. Il tutto accompagnato da una selezione di vini calabresi e italiani.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream border-y border-line py-14 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-tomato font-semibold mb-3">I Nostri Valori</div>
            <h2 className="font-serif font-medium leading-tight text-ink" style={{ fontSize: "clamp(24px, 3.5vw, 42px)" }}>Cosa ci rende diversi</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-sand rounded-xl2 p-8 border border-line hover:border-walnut/30 transition-colors">
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-tomato font-semibold mb-4">0{i + 1}</div>
                <h3 className="font-serif font-medium text-[22px] text-ink m-0 mb-3">{v.title}</h3>
                <p className="font-sans text-[13px] text-ink-2 leading-relaxed m-0">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-cream rounded-xl2 p-6 md:p-8 border border-line">
            <h3 className="font-serif font-medium text-[20px] text-ink m-0 mb-4">Dove Siamo</h3>
            <div className="space-y-3 font-sans text-[13px] text-ink-2">
              <div className="flex items-center gap-2"><Icon name="pin" size={15} className="text-tomato shrink-0" />{SHOP.address}</div>
              <div className="flex items-center gap-2"><Icon name="phone" size={15} className="text-tomato shrink-0" /><a href={`tel:${SHOP.phone}`} className="hover:text-tomato transition-colors">{SHOP.phone}</a></div>
              <div className="flex items-center gap-2"><Icon name="bag" size={15} className="text-tomato shrink-0" /><a href={`mailto:${SHOP.email}`} className="hover:text-tomato transition-colors">{SHOP.email}</a></div>
            </div>
          </div>
          <div className="bg-cream rounded-xl2 p-6 md:p-8 border border-line">
            <h3 className="font-serif font-medium text-[20px] text-ink m-0 mb-4">Orari</h3>
            <ul className="list-none p-0 m-0 space-y-3 font-sans text-[13px]">
              {SHOP.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-4">
                  <span className="font-semibold text-ink">{h.day}</span>
                  <span className="text-ink-2 text-right">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
