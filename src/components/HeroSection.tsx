import Link from "next/link"
import { heroImages } from "@/data/restaurant"

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImages[0]})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forno/80 via-forno/60 to-forno/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-sand/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="max-w-3xl">
          <p className="text-eyebrow text-amber/80 mb-4 sm:mb-6 animate-fadein">
            Tropea · Calabria · dal 2014
          </p>
          <h1 className="text-[clamp(2.75rem,8vw,7.75rem)] font-serif font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fadein [animation-delay:0.15s]">
            Da Lorenzo
          </h1>
          <p className="text-lg sm:text-2xl text-white/75 italic font-serif max-w-xl mb-8 animate-fadein [animation-delay:0.3s]">
            La vera pizza calabrese. Cotta nel forno a legna, servita con amore.
          </p>
          <div className="flex flex-wrap gap-4 animate-fadein [animation-delay:0.45s]">
            <Link
              href="/menu"
              className="bg-tomato hover:bg-tomato-deep text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm sm:text-base"
            >
              Scopri il Menu
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-sm sm:text-base"
            >
              Prenota un Tavolo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
