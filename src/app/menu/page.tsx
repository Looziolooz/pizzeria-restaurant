"use client"

import Link from "next/link"
import MenuCard from "@/components/MenuCard"
import { categories, getItemsByCategory } from "@/data/restaurant"

export default function MenuPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-forno to-forno/95 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-eyebrow text-amber/70 mb-4">Da Lorenzo</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-3">
            Il Nostro Menu
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto italic font-serif">
            Dalla tradizione calabrese alla vostra tavola
          </p>
        </div>
      </section>

      <div className="sticky top-16 sm:top-20 z-40 bg-sand/92 backdrop-blur-xl border-b border-line overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 py-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`#${cat.slug}`}
              className="whitespace-nowrap px-4 py-1.5 rounded-full bg-sand-deep hover:bg-tomato hover:text-white transition-all duration-300 text-sm font-medium text-ink-2 hover:no-underline"
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
                <p className="text-eyebrow text-tomato mb-2">{cat.name}</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
                  {cat.description}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <section className="bg-forno py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            Allergeni e Intolleranze
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto">
            Comunica al nostro personale qualsiasi allergia o intolleranza alimentare.
            I nostri piatti possono contenere o venire a contatto con: glutine, lattosio,
            frutta a guscio, uova, pesce, crostacei, soia e sedano.
          </p>
        </div>
      </section>
    </>
  )
}
