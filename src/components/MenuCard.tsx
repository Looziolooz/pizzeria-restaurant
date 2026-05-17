import Image from "next/image"
import type { MenuItem } from "@/data/restaurant"

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group bg-cream rounded-xl2 overflow-hidden border border-line hover:border-walnut-light transition-all duration-500">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-serif font-bold text-ink">{item.name}</h3>
          <span className="text-tomato font-bold text-lg whitespace-nowrap">{item.price}</span>
        </div>
        <p className="text-sm text-ink-2 mb-4 leading-relaxed">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.ingredients.map((ing, i) => (
            <span
              key={i}
              className="text-[11px] font-medium bg-sand-deep text-ink-2 px-3 py-1 rounded-full"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
