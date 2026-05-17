import { restaurantInfo } from "@/data/restaurant"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-serif font-bold text-accent mb-3">{restaurantInfo.name}</h3>
            <p className="text-sm text-gray-400 italic mb-4">{restaurantInfo.tagline}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{restaurantInfo.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Orari</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {restaurantInfo.hours.map((h, i) => (
                <li key={i}>
                  <span className="block text-white font-medium">{h.days}</span>
                  {h.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>{restaurantInfo.address}</li>
              <li>
                <a href={`tel:${restaurantInfo.phone}`} className="hover:text-accent transition-colors">
                  {restaurantInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${restaurantInfo.email}`} className="hover:text-accent transition-colors">
                  {restaurantInfo.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Seguici</h4>
            <div className="flex gap-4">
              {restaurantInfo.social.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all text-xs"
                  aria-label={s.name}
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {currentYear} {restaurantInfo.name}. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  )
}
