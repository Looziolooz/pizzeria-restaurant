import Image from "next/image"
import type { MenuItem } from "@/data/restaurant"

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-warm/50">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-cream">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-serif font-bold text-dark">{item.name}</h3>
          <span className="text-primary font-bold text-lg whitespace-nowrap">{item.price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.ingredients.map((ing, i) => (
            <span
              key={i}
              className="text-xs bg-warm/60 text-dark/70 px-2.5 py-1 rounded-full"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
