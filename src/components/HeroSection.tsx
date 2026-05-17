import Link from "next/link"
import { restaurantInfo, heroImages } from "@/data/restaurant"

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImages[0]})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
            {restaurantInfo.name}
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 italic mb-2">{restaurantInfo.tagline}</p>
          <p className="text-base sm:text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
            {restaurantInfo.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="bg-accent hover:bg-accent/90 text-dark font-semibold px-8 py-3 rounded-full transition-all text-sm sm:text-base"
            >
              Scopri il Menu
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full transition-all backdrop-blur-sm text-sm sm:text-base"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
