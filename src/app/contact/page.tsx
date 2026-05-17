import { restaurantInfo } from "@/data/restaurant"

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-forno to-forno/95 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-eyebrow text-amber/70 mb-4">Da Lorenzo</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-3">
            Contattaci
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto italic font-serif">
            Siamo qui per te. Prenota un tavolo o chiedici qualsiasi informazione.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-eyebrow text-tomato mb-4">Prenota</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink mb-6">
              Richiedi un Tavolo
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Il tuo nome"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato text-sm transition-all placeholder:text-ink-2/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="tua@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato text-sm transition-all placeholder:text-ink-2/50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+39 123 456 7890"
                  className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato text-sm transition-all placeholder:text-ink-2/50"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-ink mb-1.5">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato text-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-ink mb-1.5">
                    Ora
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato text-sm transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-ink mb-1.5">
                  Numero di ospiti
                </label>
                <select
                  id="guests"
                  className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato text-sm transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "ospite" : "ospiti"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                  Richieste speciali
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Allergie, intolleranze, occasioni speciali..."
                  className="w-full px-4 py-2.5 rounded-xl border border-line bg-cream focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato text-sm transition-all resize-none placeholder:text-ink-2/50"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-tomato hover:bg-tomato-deep text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                Richiedi Prenotazione
              </button>
            </form>
          </div>

          <div className="lg:pt-16">
            <div className="bg-cream rounded-xl2 p-8 sm:p-10 border border-line mb-6">
              <h3 className="text-xl font-serif font-bold text-ink mb-6">
                Informazioni
              </h3>
              <div className="space-y-5">
                <div>
                  <h4 className="text-caps text-tomato text-[11px] mb-1.5">Indirizzo</h4>
                  <p className="text-sm text-ink-2">{restaurantInfo.address}</p>
                </div>
                <div>
                  <h4 className="text-caps text-tomato text-[11px] mb-1.5">Telefono</h4>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="text-sm text-ink-2 hover:text-tomato transition-colors"
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
                <div>
                  <h4 className="text-caps text-tomato text-[11px] mb-1.5">Email</h4>
                  <a
                    href={`mailto:${restaurantInfo.email}`}
                    className="text-sm text-ink-2 hover:text-tomato transition-colors"
                  >
                    {restaurantInfo.email}
                  </a>
                </div>
                <div>
                  <h4 className="text-caps text-tomato text-[11px] mb-1.5">Orari</h4>
                  <ul className="space-y-1.5 text-sm text-ink-2">
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
            </div>

            <div className="bg-cream rounded-xl2 p-8 sm:p-10 border border-line">
              <h3 className="text-lg font-serif font-bold text-ink mb-4">
                Seguici
              </h3>
              <div className="flex gap-3">
                {restaurantInfo.social.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className="w-11 h-11 rounded-full bg-sand-deep flex items-center justify-center text-walnut hover:bg-tomato hover:text-white transition-all font-semibold text-sm"
                  >
                    {s.name[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
