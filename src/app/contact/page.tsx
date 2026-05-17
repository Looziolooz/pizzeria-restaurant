import { restaurantInfo } from "@/data/restaurant"

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-3">
            Contattaci
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Siamo qui per te. Prenota un tavolo o chiedici qualsiasi informazione.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-dark mb-6">
              Prenota un Tavolo
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-1.5">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Il tuo nome"
                    className="w-full px-4 py-2.5 rounded-xl border border-warm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="tua@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-warm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-dark mb-1.5">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+39 123 456 7890"
                  className="w-full px-4 py-2.5 rounded-xl border border-warm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-dark mb-1.5">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-warm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-dark mb-1.5">
                    Ora
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="w-full px-4 py-2.5 rounded-xl border border-warm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-dark mb-1.5">
                  Numero di ospiti
                </label>
                <select
                  id="guests"
                  className="w-full px-4 py-2.5 rounded-xl border border-warm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "ospite" : "ospiti"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-1.5">
                  Richieste speciali
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Allergie, intolleranze, occasioni speciali..."
                  className="w-full px-4 py-2.5 rounded-xl border border-warm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold px-8 py-3 rounded-full transition-all"
              >
                Richiedi Prenotazione
              </button>
            </form>
          </div>
          <div>
            <div className="bg-warm rounded-3xl p-8 sm:p-10 mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-dark mb-6">
                Informazioni
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    Indirizzo
                  </h3>
                  <p className="text-gray-600">{restaurantInfo.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    Telefono
                  </h3>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${restaurantInfo.email}`}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {restaurantInfo.email}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    Orari
                  </h3>
                  <ul className="space-y-2 text-gray-600">
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
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-warm/50">
              <h3 className="text-lg font-serif font-bold text-dark mb-4">
                Seguici sui Social
              </h3>
              <div className="flex gap-4">
                {restaurantInfo.social.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className="w-12 h-12 rounded-full bg-warm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all font-semibold text-sm"
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
