import Link from "next/link"
import MenuCard from "@/components/MenuCard"
import { categories, getItemsByCategory } from "@/data/restaurant"

export default function MenuPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-3">
            Il Nostro Menu
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Ogni piatto è preparato con ingredienti freschi e tanto amore.
          </p>
        </div>
      </section>

      <div className="sticky top-16 sm:top-20 z-40 bg-white/90 backdrop-blur border-b border-warm overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 py-3 text-sm">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`#${cat.slug}`}
              className="whitespace-nowrap px-4 py-1.5 rounded-full bg-warm/60 hover:bg-primary hover:text-white transition-all font-medium text-dark/70 hover:no-underline"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {categories.map((cat) => {
          const items = getItemsByCategory(cat.slug)
          return (
            <section key={cat.id} id={cat.slug}>
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-dark mb-2">
                  {cat.name}
                </h2>
                <p className="text-gray-500">{cat.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
