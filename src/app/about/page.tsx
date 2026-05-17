import Image from "next/image"
import { restaurantInfo, heroImages } from "@/data/restaurant"

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
    <>
      <section className="bg-gradient-to-b from-forno to-forno/95 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-eyebrow text-amber/70 mb-4">Da Lorenzo</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-3">
            Chi Siamo
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto italic font-serif">
            La nostra storia, la nostra passione
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-xl2 overflow-hidden">
            <Image
              src={heroImages[1]}
              alt="Pizza nel forno a legna"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forno/30 to-transparent" />
          </div>
          <div>
            <p className="text-eyebrow text-tomato mb-4">La Nostra Storia</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-serif font-bold text-ink leading-[1.1] mb-6">
              Calabresi di nascita,<br />
              <span className="italic font-normal text-ink-2">milanesi d'adozione.</span>
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>
                <strong className="text-ink">Da Lorenzo</strong> nasce nel 2014 quando Lorenzo
                decide di portare a Milano i sapori autentici della sua Calabria. Quello che
                inizia come una piccola pizzeria di quartiere diventa presto un punto di
                riferimento per gli amanti della vera cucina calabrese.
              </p>
              <p>
                Oggi, a distanza di oltre dieci anni, la tradizione continua con la stessa
                passione. Il nostro forno a legna sforna pizze fragranti con impasto a lunga
                lievitazione, la pasta è fatta a mano ogni mattina, e i dolci sono preparati
                secondo le ricette della nonna.
              </p>
              <p>
                Ogni ingrediente è selezionato con cura: l'olio extravergine dei fratelli Macrì,
                la 'nduja artigianale di Spilinga, il pecorino crotonese. Il tutto accompagnato
                da una selezione di vini calabresi e italiani.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-eyebrow text-tomato mb-4">I Nostri Valori</p>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-serif font-bold text-ink leading-[1.1]">
              Cosa ci rende diversi
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-xl2 p-8 border border-line hover:border-walnut-light transition-colors duration-300"
              >
                <span className="text-eyebrow text-tomato text-[10px] mb-3 block">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-serif font-bold text-ink mb-3">{v.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-cream rounded-xl2 p-8 border border-line">
            <h3 className="text-lg font-serif font-bold text-ink mb-4">
              Dove Siamo
            </h3>
            <p className="text-sm text-ink-2 mb-2">{restaurantInfo.address}</p>
            <p className="text-sm text-ink-2">
              <a href={`tel:${restaurantInfo.phone}`} className="text-tomato hover:text-tomato-deep transition-colors">
                {restaurantInfo.phone}
              </a>
            </p>
            <p className="text-sm text-ink-2">
              <a href={`mailto:${restaurantInfo.email}`} className="text-tomato hover:text-tomato-deep transition-colors">
                {restaurantInfo.email}
              </a>
            </p>
          </div>
          <div className="bg-cream rounded-xl2 p-8 border border-line">
            <h3 className="text-lg font-serif font-bold text-ink mb-4">Orari</h3>
            <ul className="space-y-3 text-sm text-ink-2">
              {restaurantInfo.hours.map((h, i) => (
                <li key={i}>
                  <span className="font-semibold text-ink">{h.days}</span>
                  <br />
                  {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
