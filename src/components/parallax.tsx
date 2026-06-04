"use client";

// LIEVITA — Parallax pizza showcase (Bold Kinetic)
// 5 full-bleed scenes alternating green/yellow/blue with photo + huge display
// type + numbered marker. Respects reduced-motion, dampens on mobile.

import { useEffect, useRef, useState, type RefObject } from "react";
import { Btn } from "./kinetic";
import { Icon } from "./illustrations";
import { findMenuItem, formatEUR } from "@/lib/data";
import { useCart } from "@/lib/store";

function useSceneProgress(ref: RefObject<HTMLElement>) {
  const [p, setP] = useState(0.5);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(0.5);
      return;
    }
    let raf = 0;
    const compute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const vh = window.innerHeight;
        setP(Math.max(0, Math.min(1, 1 - rect.bottom / (vh + rect.height))));
      });
    };
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    compute();
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return p;
}

interface Scene {
  num: string;
  eyebrow: string;
  headline: string;
  headlineAlt: string;
  sub: string;
  ingredients: string[];
  photo: string;
  side: "left" | "right";
  palette: "green" | "yellow" | "blue";
  itemId: string;
}

function ParallaxScene({
  idx,
  total,
  num,
  photo,
  eyebrow,
  headline,
  headlineAlt,
  sub,
  ingredients,
  side,
  palette,
  itemId,
}: Scene & { idx: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const mag = mobile ? 0.35 : 1;
  const photoY = (p - 0.5) * 140 * mag;
  const textY = (p - 0.5) * -35 * mag;
  const numY = (p - 0.5) * -100 * mag;
  const visible = Math.max(0.25, 1 - Math.abs(p - 0.5) * 1.8);
  const item = findMenuItem(itemId);
  const cart = useCart();
  const inCart = item && cart.items.find((i) => i.id === item.id);

  const bg = palette === "yellow" ? "var(--bk-yellow)" : palette === "blue" ? "var(--bk-blue)" : "var(--bk-green)";
  const fg = palette === "green" ? "var(--bk-yellow)" : "var(--bk-green)";
  const ink = palette === "green" ? "rgba(255,255,255,0.92)" : "var(--bk-ink)";

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: bg, minHeight: "min(880px,100vh)" }}>
      <div className="absolute inset-0 grid md:grid-cols-2">
        {/* Photo half */}
        <div className={`relative ${side === "right" ? "md:order-2" : ""} overflow-hidden`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-[110%] h-[120%] object-cover"
            style={{ transform: `translate3d(0, ${photoY}px, 0)`, willChange: "transform" }}
          />
          {/* Color overlay tint matching palette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                palette === "green"
                  ? "linear-gradient(180deg, rgba(7,92,64,0.25) 0%, rgba(7,92,64,0.4) 100%)"
                  : "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </div>
        {/* Empty (color side) */}
        <div className={`${side === "right" ? "md:order-1" : ""}`} />
      </div>

      {/* Big roman-numeral watermark */}
      <div
        className="absolute pointer-events-none select-none font-display-xl font-bold leading-[0.85] whitespace-nowrap"
        style={{
          fontSize: "clamp(180px, 38vw, 540px)",
          color: palette === "green" ? "rgba(255,221,0,0.12)" : "rgba(7,92,64,0.10)",
          top: "50%",
          left: side === "right" ? "auto" : "44%",
          right: side === "right" ? "44%" : "auto",
          transform: `translate(${side === "right" ? "20%" : "-20%"}, calc(-50% + ${numY}px))`,
          willChange: "transform",
          letterSpacing: ".005em",
        }}
      >
        {num}
      </div>

      {/* Content */}
      <div className="relative max-w-page mx-auto px-5 md:px-12 py-16 md:py-0 md:h-[min(880px,100vh)] grid md:grid-cols-2 items-center">
        <div
          className={`${side === "right" ? "md:col-start-1" : "md:col-start-2"}`}
          style={{ transform: `translate3d(0, ${textY}px, 0)`, opacity: visible, willChange: "transform, opacity" }}
        >
          <div className="lv-eyebrow mb-4 flex items-center gap-3" style={{ color: fg }}>
            <span className="font-display font-bold text-[20px]" style={{ color: fg }}>{num}</span>
            <span className="inline-block w-8 h-px" style={{ background: fg }} />
            <span style={{ color: fg }}>{eyebrow}</span>
          </div>
          <h2 className="lv-h-xl" style={{ color: fg, fontSize: "clamp(56px, 9vw, 132px)" }}>
            {headline}
            <br />
            <span className="lv-stroke" style={{ color: "rgb(40, 109, 55)" }}>{headlineAlt}</span>
          </h2>
          <p className="text-lg md:text-xl leading-snug mt-6 max-w-[460px]" style={{ color: ink }}>
            {sub}
          </p>
          <div className="flex flex-wrap gap-2 mt-6 mb-7">
            {ingredients.map((i) => (
              <span key={i} className={`lv-tag ${palette === "green" ? "lv-tag--on-dark" : ""}`}>
                {i}
              </span>
            ))}
          </div>
          {item && (
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-display-xl font-bold text-[44px] md:text-[56px] leading-none" style={{ color: fg }}>
                {formatEUR(item.price)}
              </span>
              {inCart ? (
                <div className="inline-flex items-center gap-1">
                  <button onClick={() => cart.update(item.id, inCart.qty - 1)} className="w-10 h-10 grid place-items-center" style={{ background: fg, color: bg }}>
                    <Icon name="minus" size={16} />
                  </button>
                  <span className="font-display font-bold min-w-[32px] text-center text-[20px]" style={{ color: fg }}>
                    {inCart.qty}
                  </span>
                  <button onClick={() => cart.update(item.id, inCart.qty + 1)} className="w-10 h-10 grid place-items-center" style={{ background: fg, color: bg }}>
                    <Icon name="plus" size={16} />
                  </button>
                </div>
              ) : (
                <Btn variant={palette === "green" ? "yellow" : "dark"} onClick={() => cart.add(item.id)}>
                  <Icon name="plus" size={14} /> Aggiungi al carrello
                </Btn>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Index marker bottom */}
      <div
        className="absolute bottom-5 right-5 md:bottom-8 md:right-10 font-display uppercase text-[12px] tracking-[0.18em] font-semibold pointer-events-none"
        style={{ color: fg, opacity: 0.65 }}
      >
        <span style={{ color: fg, opacity: 1 }}>{String(idx).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        {String(total).padStart(2, "0")}
      </div>
    </section>
  );
}

export function ParallaxShowcase() {
  const scenes: Scene[] = [
    {
      num: "I",
      eyebrow: "Le classiche",
      headline: "LA",
      headlineAlt: "MARGHERITA.",
      sub: "Il punto di partenza. Pomodoro San Marzano DOP, fior di latte, basilico fresco. Senza tempo.",
      ingredients: ["Pomodoro DOP", "Fior di latte", "Basilico", "Olio EVO"],
      photo: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=2000&q=85&auto=format&fit=crop",
      side: "left",
      palette: "green",
      itemId: "p-margherita",
    },
    {
      num: "II",
      eyebrow: "Per i piccanti",
      headline: "LA",
      headlineAlt: "ROSSA FUOCO",
      sub: "Salame piccante calabrese e olio EVO. Per chi non ha paura della Calabria.",
      ingredients: ["Salame piccante", "Fior di latte", "Pomodoro", "Origano"],
      photo: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=2000&q=85&auto=format&fit=crop",
      side: "right",
      palette: "yellow",
      itemId: "p-diavola",
    },
    {
      num: "III",
      eyebrow: "I sapori di casa",
      headline: "LA",
      headlineAlt: "TROPEANA.",
      sub: "Bufala, cipolla rossa di Tropea IGP, alici di Cetara, capperi. Tutto a chilometri da qui.",
      ingredients: ["Bufala DOP", "Cipolla IGP", "Alici di Cetara", "Capperi"],
      photo: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=2000&q=85&auto=format&fit=crop",
      side: "left",
      palette: "blue",
      itemId: "p-tropea",
    },
    {
      num: "IV",
      eyebrow: "Il bianco profumato",
      headline: "IL",
      headlineAlt: "BERGAMOTTO.",
      sub: "Stracciatella, scorza di bergamotto di Reggio, pistacchio di Bronte. Sa di costa jonica.",
      ingredients: ["Stracciatella", "Bergamotto", "Pistacchio di Bronte", "Pepe rosa"],
      photo: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=2000&q=85&auto=format&fit=crop",
      side: "right",
      palette: "green",
      itemId: "p-bergamotto",
    },
    {
      num: "V",
      eyebrow: "Piccante e affumicato",
      headline: "LA",
      headlineAlt: "'NDUJA.",
      sub: "'Nduja di Spilinga IGP, cipolla rossa, miele di castagno. Dolce e fuoco insieme.",
      ingredients: ["'Nduja IGP", "Cipolla rossa", "Miele di castagno", "Fior di latte"],
      photo: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=2000&q=85&auto=format&fit=crop",
      side: "left",
      palette: "yellow",
      itemId: "p-nduja",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute top-5 md:top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="lv-pill lv-pill--neutral">5 pizze · scorri per scoprirle</span>
      </div>
      {scenes.map((s, i) => (
        <ParallaxScene key={i} idx={i + 1} total={scenes.length} {...s} />
      ))}
    </div>
  );
}

export default ParallaxShowcase;
