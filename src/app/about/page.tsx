import { restaurantInfo, testimonials } from "@/data/restaurant"

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-3">
            Chi Siamo
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            La nostra storia, la nostra passione.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-dark mb-6">
              Dal 1985 sulla tavola dei milanesi
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-primary">Da Lorenzo</strong> nasce nel 1985 quando il
                fondatore Lorenzo Rossi decide di portare a Milano i sapori autentici della sua
                Napoli. Quello che inizia come una piccola pizzeria di quartiere diventa presto un
                punto di riferimento per gli amanti della cucina italiana.
              </p>
              <p>
                Oggi, a distanza di quasi quarant'anni, la tradizione continua con la stessa
                passione. Ogni piatto racconta una storia: ingredienti selezionati, ricette
                tramandate di generazione in generazione, e un&apos;attenzione ai dettagli che fa la
                differenza.
              </p>
              <p>
                Il nostro forno a legna sforna pizze croccanti e fragranti, la pasta è fatta a
                mano ogni mattina, e i dolci sono preparati secondo le ricette della nonna. Il
                tutto accompagnato da una selezione di vini italiani che esaltano ogni
                sapore.
              </p>
            </div>
          </div>
          <div className="bg-warm rounded-3xl p-8 sm:p-12">
            <h3 className="text-xl font-serif font-bold text-dark mb-6">
              I Nostri Valori
            </h3>
            <div className="space-y-6">
              {[
                { title: "Tradizione", desc: "Ricette autentiche tramandate da generazioni." },
                { title: "Qualità", desc: "Solo ingredienti freschi e selezionati ogni giorno." },
                { title: "Passione", desc: "L'amore per la cucina italiana in ogni piatto." },
                { title: "Accoglienza", desc: "Un'atmosfera familiare e calorosa." },
              ].map((v, i) => (
                <div key={i}>
                  <h4 className="font-bold text-dark">{v.title}</h4>
                  <p className="text-sm text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-dark mb-3">
              Contatti & Orari
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm/50">
              <h3 className="text-lg font-serif font-bold text-dark mb-4">
                Dove Siamo
              </h3>
              <p className="text-gray-600 mb-2">{restaurantInfo.address}</p>
              <p className="text-gray-600">
                <a href={`tel:${restaurantInfo.phone}`} className="text-primary hover:underline">
                  {restaurantInfo.phone}
                </a>
              </p>
              <p className="text-gray-600">
                <a href={`mailto:${restaurantInfo.email}`} className="text-primary hover:underline">
                  {restaurantInfo.email}
                </a>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm/50">
              <h3 className="text-lg font-serif font-bold text-dark mb-4">Orari</h3>
              <ul className="space-y-3 text-gray-600">
                {restaurantInfo.hours.map((h, i) => (
                  <li key={i}>
                    <span className="font-semibold text-dark">{h.days}</span>
                    <br />
                    {h.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-dark mb-3">
            Cosa Dicono di Noi
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-warm/50"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 italic mb-4">&ldquo;{t.text}&rdquo;</p>
              <p className="text-sm font-semibold text-dark">{t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
