"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Icon } from "./ui"
import { findMenuItem, formatEUR } from "@/lib/data"
import { useCart } from "@/lib/store"

function useSceneProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0.5)
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) { setP(0.5); return }
    let raf: number
    const compute = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const vh = window.innerHeight
        const prog = 1 - rect.bottom / (vh + rect.height)
        setP(Math.max(0, Math.min(1, prog)))
      })
    }
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute, { passive: true })
    compute()
    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
      cancelAnimationFrame(raf)
    }
  }, [])
  return p
}

function useIsMobile() {
  const [m, setM] = useState(false)
  useEffect(() => {
    const handler = () => setM(window.innerWidth < 768)
    setM(window.innerWidth < 768)
    window.addEventListener("resize", handler, { passive: true })
    return () => window.removeEventListener("resize", handler)
  }, [])
  return m
}

interface SceneProps {
  idx: number
  total: number
  num: string
  photo: string
  eyebrow: string
  title: string
  em: string
  sub: string
  ingredients: string[]
  side: "left" | "right"
  itemId: string
}

function ParallaxPizzaScene({ idx, total, num, photo, eyebrow, title, em, sub, ingredients, side, itemId }: SceneProps) {
  const ref = useRef<HTMLElement>(null)
  const p = useSceneProgress(ref)
  const mobile = useIsMobile()
  const mag = mobile ? 0.4 : 1
  const bgY = (p - 0.5) * 140 * mag
  const fgY = (p - 0.5) * -40 * mag
  const numY = (p - 0.5) * -90 * mag
  const visible = Math.max(0.15, 1 - Math.abs(p - 0.5) * 1.8)
  const cart = useCart()
  const item = findMenuItem(itemId)
  const inCart = item && cart.items.find(i => i.id === item.id)

  const gradientFrom = side === "right" ? "from-forno/95" : "from-forno/70"
  const gradientDir = side === "right" ? "l" : "r"

  return (
    <section ref={ref} className="relative flex items-center overflow-hidden min-h-[560px] sm:min-h-[680px] md:min-h-[860px] lg:min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={photo}
          alt=""
          fill
          className="object-cover"
          style={{ transform: `translate3d(0, ${bgY}px, 0)`, willChange: "transform" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forno/35" />
        <div className={`absolute inset-0 bg-gradient-to-${gradientDir} ${gradientFrom} via-forno/55 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-b from-forno/30 via-transparent to-forno/40" />
      </div>

      <div className={`absolute top-1/2 ${side === "right" ? "left-0 md:left-8" : "right-0 md:right-8"} font-serif italic text-cream/8 leading-[0.8] pointer-events-none select-none whitespace-nowrap`}
        style={{
          fontSize: "clamp(160px, 32vw, 460px)",
          transform: `translate(${side === "right" ? "-15%" : "15%"}, calc(-50% + ${numY}px))`,
          willChange: "transform",
        }}>
        {num}
      </div>

      <div className="relative w-full max-w-page mx-auto px-6 sm:px-8 md:px-12 z-10 py-16 sm:py-20">
        <div className={`max-w-[600px] text-cream ${side === "right" ? "md:ml-auto md:text-left" : ""}`}
          style={{ transform: `translate3d(0, ${fgY}px, 0)`, opacity: visible, willChange: "transform, opacity" }}>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-serif italic text-amber text-[20px] md:text-[22px]">{num}</span>
            <span className="h-px flex-1 bg-cream/30 max-w-[40px]" />
            <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/75 font-semibold">{eyebrow}</span>
          </div>
          <h2 className="font-serif font-medium leading-[0.95] tracking-[-0.02em] m-0 mb-5 text-cream"
            style={{ fontSize: "clamp(46px, 8vw, 112px)", textShadow: "0 4px 30px rgba(0,0,0,0.45)" }}>
            {title} <em className="italic text-amber font-normal">{em}</em>
          </h2>
          <p className="font-serif italic text-[18px] sm:text-[20px] md:text-[22px] leading-snug text-cream/92 max-w-[480px] mb-6">
            {sub}
          </p>
          <div className="flex flex-wrap gap-2 mb-7">
            {ingredients.map(i => (
              <span key={i}
                className="px-3 py-1.5 bg-cream/10 backdrop-blur-md text-cream/95 font-sans text-[10px] sm:text-[11px] tracking-caps uppercase rounded-full border border-cream/15">
                {i}
              </span>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            {item && (
              <>
                <div className="font-serif font-medium text-[28px] text-cream">{formatEUR(item.price)}</div>
                {inCart ? (
                  <div className="inline-flex items-center gap-2 bg-cream text-forno rounded-full pr-1 pl-1 py-1">
                    <button onClick={() => cart.update(item.id, inCart.qty - 1)} className="w-8 h-8 grid place-items-center hover:bg-forno/10 rounded-full"><Icon name="minus" size={14} /></button>
                    <span className="font-sans text-[13px] font-medium min-w-[16px] text-center">{inCart.qty}</span>
                    <button onClick={() => cart.update(item.id, inCart.qty + 1)} className="w-8 h-8 grid place-items-center hover:bg-forno/10 rounded-full"><Icon name="plus" size={14} /></button>
                  </div>
                ) : (
                  <button onClick={() => cart.add(item.id)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-tomato text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-tomato-deep hover:-translate-y-0.5 transition-all">
                    <Icon name="plus" size={14} /> Aggiungi al carrello
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 md:bottom-10 md:right-10 font-sans text-[11px] tracking-[0.22em] uppercase text-cream/45 pointer-events-none">
        <span className="text-amber font-semibold">{String(idx).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        {String(total).padStart(2, "0")}
      </div>
    </section>
  )
}

export default function ParallaxShowcase() {
  const scenes: SceneProps[] = [
    { idx: 1, total: 5, num: "I", eyebrow: "Le classiche", title: "La", em: "Margherita.", sub: "Il punto di partenza. Pomodoro San Marzano DOP, fior di latte, basilico fresco. Senza tempo.", ingredients: ["Pomodoro DOP", "Fior di latte", "Basilico", "Olio EVO"], photo: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=2000&q=85&auto=format&fit=crop", side: "left", itemId: "p-margherita" },
    { idx: 2, total: 5, num: "II", eyebrow: "Per i piccanti", title: "La", em: "Diavola.", sub: "Salame piccante calabrese e olio EVO. Per chi non ha paura della Calabria.", ingredients: ["Salame piccante", "Fior di latte", "Pomodoro", "Origano"], photo: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=2000&q=85&auto=format&fit=crop", side: "right", itemId: "p-diavola" },
    { idx: 3, total: 5, num: "III", eyebrow: "I sapori di casa", title: "La", em: "Tropea.", sub: "Bufala, cipolla rossa di Tropea IGP, alici di Cetara, capperi. Tutto a chilometri da qui.", ingredients: ["Bufala DOP", "Cipolla IGP", "Alici di Cetara", "Capperi"], photo: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=2000&q=85&auto=format&fit=crop", side: "left", itemId: "p-tropea" },
    { idx: 4, total: 5, num: "IV", eyebrow: "Il bianco profumato", title: "Il", em: "Bergamotto.", sub: "Stracciatella, scorza di bergamotto di Reggio, pistacchio di Bronte. Sa di costa jonica.", ingredients: ["Stracciatella", "Bergamotto", "Pistacchio di Bronte", "Pepe rosa"], photo: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=2000&q=85&auto=format&fit=crop", side: "right", itemId: "p-bergamotto" },
    { idx: 5, total: 5, num: "V", eyebrow: "Il piccante affumicato", title: "La", em: "'Nduja.", sub: "'Nduja di Spilinga IGP, cipolla rossa, miele di castagno. Dolce e fuoco insieme.", ingredients: ["'Nduja IGP", "Cipolla rossa", "Miele di castagno", "Fior di latte"], photo: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=2000&q=85&auto=format&fit=crop", side: "left", itemId: "p-nduja" },
  ]

  return (
    <div className="bg-forno relative">
      <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-cream/8 backdrop-blur-md border border-cream/15 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/85 font-semibold">Cinque pizze · scorri per scoprirle</span>
        </div>
      </div>
      {scenes.map((s, i) => (
        <ParallaxPizzaScene key={i} {...s} />
      ))}
      <section className="relative bg-forno text-cream py-16 md:py-20 border-t border-cream/10">
        <div className="max-w-content mx-auto px-6 md:px-8 text-center">
          <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/65 font-semibold mb-4">E ancora 24 pizze in carta</div>
          <h3 className="font-serif font-medium leading-[1.02] tracking-[-0.015em] m-0 mb-7" style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}>
            Vedi tutto il menù. <em className="italic text-amber">Ordina la tua.</em>
          </h3>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/menu"
              className="inline-flex items-center gap-2 px-7 py-4 bg-tomato text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-tomato-deep transition-all">
              <Icon name="bag" size={14} /> Apri il menù completo
            </Link>
            <Link href="/reserve"
              className="inline-flex items-center gap-2 px-7 py-4 border border-cream/45 text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-cream/10 hover:border-cream transition-all">
              <Icon name="utensils" size={14} /> Prenota un tavolo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
