import Link from "next/link"
import Image from "next/image"
import HeroSection from "@/components/HeroSection"
import { menuItems, testimonials, restaurantInfo, heroImages } from "@/data/restaurant"

const pizzaItems = menuItems.filter((i) => i.category === "pizze").slice(0, 3)

const showcaseScenes = [
  {
    image: heroImages[0],
    title: "Pizza Napoletana",
    subtitle: "Morbida, fragrante, cotta a regola d'arte",
  },
  {
    image: heroImages[1],
    title: "Pizza Fritta",
    subtitle: "Crocante fuori, soffice dentro",
  },
  {
    image: heroImages[2],
    title: "Pizza al Metro",
    subtitle: "Da condividere con chi ami",
  },
]

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="relative z-10 -mt-10 sm:-mt-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Consegna a Domicilio",
              desc: "In 30 minuti o meno",
              href: "/menu",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              ),
              title: "Take Away",
              desc: "Ordina e ritira quando vuoi",
              href: "/menu",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              title: "Prenota un Tavolo",
              desc: "Inizia a prenotare",
              href: "/contact",
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group bg-cream rounded-xl2 px-6 py-7 sm:py-8 text-center shadow-gentle hover:shadow-lg transition-all duration-300 border border-line"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sand-deep flex items-center justify-center text-walnut group-hover:bg-tomato group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-ink mb-1">{item.title}</h3>
              <p className="text-sm text-ink-2">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-xl2 overflow-hidden">
            <Image
              src={heroImages[2]}
              alt="Pizza napoletana"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forno/40 to-transparent" />
          </div>
          <div className="animate-fadein">
            <p className="text-eyebrow text-tomato mb-4">La Nostra Storia</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-serif font-bold text-ink leading-[1.1] mb-6">
              Calabresi di nascita,<br />
              <span className="italic font-normal text-ink-2">milanesi d'adozione.</span>
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>
                Dal 2014 portiamo a Milano i sapori autentici della Calabria. La nostra pizza
                nasce da un impasto lungamente lievitato, con farine selezionate e ingredienti
                del nostro territorio d'origine.
              </p>
              <p>
                Ogni piatto racconta una storia: il pomodoro di chiara provenienza calabrese,
                l'olio extravergine dei fratelli Macrì, la 'nduja artigianale di Spilinga.
              </p>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 mt-6 text-sm font-semibold text-tomato hover:text-tomato-deep transition-colors"
            >
              Scopri di più
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-forno overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-16">
            <p className="text-eyebrow text-amber/70 mb-4">Le Nostre Pizze</p>
            <h2 className="text-[clamp(1.75rem,5vw,4rem)] font-serif font-bold text-white leading-[1.1]">
              I più amati
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {pizzaItems.map((item, i) => (
              <div
                key={item.id}
                className="group relative bg-white/5 rounded-xl2 overflow-hidden border border-white/10 hover:border-amber/30 transition-all duration-500"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forno via-forno/20 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-serif font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber font-semibold text-lg">{item.price}</span>
                    <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                      {item.ingredients.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:text-amber/80 transition-colors"
            >
              Vedi tutto il menu
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-12">
          <p className="text-eyebrow text-tomato mb-4">Dicono di Noi</p>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-serif font-bold text-ink leading-[1.1]">
            La voce dei nostri ospiti
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-cream rounded-xl2 p-6 sm:p-8 border border-line"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-ink-2 italic leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-sm font-semibold text-ink">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImages[1]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand/20 via-forno/85 to-forno" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 py-20 sm:py-28 text-center">
          <p className="text-eyebrow text-amber/70 mb-4">Vieni a Trovarci</p>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-serif font-bold text-white leading-[1.1] mb-6">
            Ti aspettiamo
          </h2>
          <p className="text-white/70 mb-2">{restaurantInfo.address}</p>
          <p className="text-white/70 mb-8">
            <a href={`tel:${restaurantInfo.phone}`} className="hover:text-amber transition-colors">
              {restaurantInfo.phone}
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-tomato hover:bg-tomato-deep text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
            >
              Prenota un Tavolo
            </Link>
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              Chiamaci
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
