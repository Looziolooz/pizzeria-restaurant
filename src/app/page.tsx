import Link from "next/link"
import HeroSection from "@/components/HeroSection"
import MenuCard from "@/components/MenuCard"
import { menuItems, categories, testimonials, restaurantInfo } from "@/data/restaurant"

export default function Home() {
  const featuredCategories = categories.slice(0, 3)
  const featuredItems = menuItems.filter((item) =>
    ["pizze", "paste", "dolci"].includes(item.category)
  )

  return (
    <>
      <HeroSection />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-dark mb-3">
            Il Nostro Menu
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Dalla tradizione italiana alla vostra tavola. Ogni piatto racconta una storia di
            passione e ingredienti selezionati.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredItems.slice(0, 6).map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-block bg-primary hover:bg-primary-light text-white font-semibold px-8 py-3 rounded-full transition-all"
          >
            Vedi Menu Completo
          </Link>
        </div>
      </section>

      <section className="bg-warm py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-dark mb-3">
              Categorie
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Esplora le nostre specialità, dagli antipasti ai dolci.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/menu#${cat.slug}`}
                className="group bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all border border-warm/50"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">
                    {cat.id === "antipasti" && "🍤"}
                    {cat.id === "insalate" && "🥗"}
                    {cat.id === "pizze" && "🍕"}
                    {cat.id === "paste" && "🍝"}
                    {cat.id === "dolci" && "🍰"}
                    {cat.id === "bevande" && "🍷"}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-dark mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.description}</p>
              </Link>
            ))}
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

      <section className="bg-gradient-to-r from-primary to-primary-light py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Vieni a Trovarci
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            {restaurantInfo.address}
            <br />
            {restaurantInfo.phone}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="bg-accent hover:bg-accent/90 text-dark font-semibold px-8 py-3 rounded-full transition-all"
            >
              Prenota un Tavolo
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full transition-all backdrop-blur-sm"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
