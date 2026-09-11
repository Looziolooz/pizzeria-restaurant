"use client";

// LIEVITA — Homepage (per mockup approvato Main.dc.html / HomeMobile.dc.html)
// Full-bleed color blocks alternating white / yellow / green / blue,
// signature tilted marquees between sections, huge condensed-caps display
// type, round popping CTAs, photo strips, lots of motion.

import { useEffect, useRef } from "react";
import { Marquee, Reveal, Btn, ArrowDoodle, StarDoodle, Squiggle } from "./kinetic";
import { Icon, PizzaThumb } from "./illustrations";
import {
  SHOP,
  PIZZA_PHOTOS,
  HOME_TILES,
  LUNCH_DEAL,
  findMenuItem,
  formatEUR,
} from "@/lib/data";
import { useCart, useNavigate } from "@/lib/store";
import type { MenuItem } from "@/lib/types";

// ═══════════════════════════════════════════════════════════════════
//  HOME
// ═══════════════════════════════════════════════════════════════════
export function Home() {
  const tiles = HOME_TILES.map((t) => findMenuItem(t.id)).filter(
    (m): m is MenuItem => Boolean(m)
  );

  return (
    <div style={{ background: "var(--bk-white)" }}>
      <Hero />
      <Marquee
        words={["FORNO A LEGNA", "LIEVITO MADRE", "100% CALABRESE", "FRESCO OGNI GIORNO", "TROPEA"]}
        color="yellow"
        direction="left"
        tilt="down"
      />
      <WhyUs />
      <PopularPizze tiles={tiles} />
      <Marquee
        words={["28 COPERTI", "DUE PASSI DAL MARE", "DAL 2014", "BUONA PIZZA", "BRAVA GENTE"]}
        color="blue"
        direction="right"
        tilt="up"
      />
      <PhotoStrip />
      <Story />
      <Marquee
        thin
        color="green"
        direction="left"
        words={[`Pranzo a €${LUNCH_DEAL.price}`, LUNCH_DEAL.days, LUNCH_DEAL.includes]}
      />
      <FindUs />
    </div>
  );
}

// ─── HERO (white block, huge display, photo disc right) ────────────
function Hero() {
  const nav = useNavigate();
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--bk-white)", paddingTop: "120px" }}>
      <div className="max-w-page mx-auto px-5 md:px-12 pb-16 md:pb-24 grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-12 items-center">
        <div className="relative">
          <Reveal>
            <div className="lv-eyebrow mb-4 md:mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-bk-green" />
              Pizzeria a lievito madre · dal 2014
            </div>
          </Reveal>

          <Reveal>
            <h1 className="lv-h-xl text-bk-green">
              PIZZA
              <br />
              <span style={{ color: "var(--bk-yellow)", WebkitTextStroke: "2px var(--bk-green)" }}>VERA.</span>
              <br />
              A TROPEA.
            </h1>
          </Reveal>

          <Reveal>
            <p className="text-bk-ink text-lg md:text-xl leading-snug mt-7 md:mt-9 max-w-[480px] font-support">
              Lievito madre vivo, farine bio macinate a pietra, topping della nostra terra: &apos;nduja di Spilinga,
              cipolla rossa di Tropea, bergamotto di Reggio. Niente scorciatoie.
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-10">
              <Btn variant="dark" size="lg" onClick={() => nav("menu")}>
                <Icon name="bag" size={16} /> Ordina online
              </Btn>
              <Btn variant="ghost" size="lg" onClick={() => nav("reserve")}>
                <Icon name="utensils" size={16} /> Prenota un tavolo
              </Btn>
            </div>
          </Reveal>

          {/* Quick info chips */}
          <Reveal stagger>
            <div className="flex flex-wrap gap-x-7 gap-y-3 mt-9 md:mt-11">
              {(
                [
                  ["clock", `Pronta in ${SHOP.prep_minutes} min`],
                  ["bike", `Delivery ${SHOP.delivery_radius_km} km`],
                  ["store", `Asporto da ${formatEUR(SHOP.pickup_min)}`],
                ] as const
              ).map(([i, t]) => (
                <div key={t} className="inline-flex items-center gap-2 text-bk-green font-display uppercase tracking-[0.06em] text-[12px] font-semibold">
                  <Icon name={i} size={14} /> {t}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Star doodle (desktop, come nel mockup) */}
          <StarDoodle className="absolute hidden md:block" style={{ width: 60, top: -8, right: 120, transform: "rotate(-12deg)" }} />
        </div>

        {/* Right: photo disc on flat yellow halo + popping round CTA + doodles */}
        <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[640px]">
          <Reveal>
            <div className="relative w-[300px] h-[300px] md:w-[520px] md:h-[520px] md:translate-x-12">
              {/* Flat yellow circle, offset +32 x / y (no gradient, no blur) */}
              <div
                className="absolute w-[300px] h-[300px] md:w-[520px] md:h-[520px] rounded-full"
                style={{ background: "var(--bk-yellow)", left: 32, top: 32 }}
              />
              {/* Pizza photo as round disc */}
              <div className="absolute left-0 top-0 w-[300px] h-[300px] md:w-[520px] md:h-[520px] rounded-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PIZZA_PHOTOS.hero}
                  alt="Margherita"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </Reveal>
          {/* Popping CTA */}
          <button
            onClick={() => nav("menu")}
            className="lv-cta-round lv-cta-round--dark absolute left-0 md:left-6 bottom-0 md:bottom-8 z-[1]"
            style={{
              width: "clamp(120px, 10.5vw, 152px)",
              height: "clamp(120px, 10.5vw, 152px)",
              fontSize: "clamp(17px, 1.5vw, 21px)",
              animationDelay: "300ms",
            }}
          >
            ORDINA
            <br />
            SUBITO!
          </button>
          {/* Doodle arrow (desktop only) */}
          <ArrowDoodle className="absolute hidden md:block" style={{ width: 140, top: 0, left: 12, transform: "rotate(28deg)" }} color="var(--bk-teal)" />
          {/* Star doodle (mobile) */}
          <StarDoodle className="absolute md:hidden" style={{ width: 48, top: 0, left: 8, transform: "rotate(-12deg)" }} />
        </div>
      </div>
    </section>
  );
}

// ─── WHY US (green block, 4 big numbered features) ────────────────
function WhyUs() {
  const features = [
    { num: "01", title: "Farine bio", body: "Macinate a pietra, da grani italiani selezionati." },
    { num: "02", title: "Lievito madre", body: `${SHOP.leavening_hours} ore di lievitazione naturale. Digeribile, leggera.` },
    { num: "03", title: "Topping calabrese", body: "Filiere corte, biologico, di stagione." },
    { num: "04", title: "Tagliata a tavola", body: "Arriva già a spicchi. Si assaggia, si scambia." },
  ];
  return (
    <section style={{ background: "var(--bk-green)" }} className="relative">
      <div className="max-w-page mx-auto px-5 md:px-12 py-20 md:py-28">
        <Reveal>
          <div className="lv-eyebrow text-bk-yellow mb-5 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-bk-yellow" /> Perché siamo migliori
          </div>
        </Reveal>
        <Reveal>
          <h2 className="lv-h-l text-bk-yellow max-w-[1100px]">
            PIZZA VERA.
            <br />
            <span className="lv-stroke lv-stroke--yellow">FATTA COME SI DEVE.</span>
          </h2>
        </Reveal>
        <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mt-14 md:mt-20">
          {features.map((f) => (
            <div key={f.num} className="flex flex-col gap-3">
              <div className="font-display-xl text-bk-yellow text-[64px] md:text-[96px] leading-[0.85]">{f.num}</div>
              <h3 className="lv-h3 text-bk-white mt-1">{f.title}</h3>
              <p className="text-[15px] leading-snug max-w-[280px] font-support" style={{ color: "rgba(255,255,255,0.85)" }}>
                {f.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
      {/* Squiggle decoration */}
      <Squiggle className="absolute hidden md:block" style={{ width: 200, top: 60, right: 60, opacity: 0.5 }} color="var(--bk-yellow)" />
    </section>
  );
}

// ─── LE PIZZE DEL MOMENTO (white block, 6 tiles) ───────────────────
function PopularPizze({ tiles }: { tiles: MenuItem[] }) {
  const nav = useNavigate();
  return (
    <section style={{ background: "var(--bk-white)" }} className="relative">
      <div className="max-w-page mx-auto px-5 md:px-12 py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-5 mb-12 md:mb-16">
          <Reveal>
            <div className="lv-eyebrow mb-4 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-bk-green" /> Stasera al forno
            </div>
            <h2 className="lv-h-l text-bk-green">
              LE PIZZE
              <br />
              DEL MOMENTO.
            </h2>
          </Reveal>
          <Reveal>
            <button
              onClick={() => nav("menu")}
              className="lv-link text-bk-green text-[15px] inline-flex items-center min-h-[44px]"
            >
              Vai a tutto il menù →
            </button>
          </Reveal>
        </div>

        <Reveal stagger className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
          {tiles.map((p) => (
            <PizzaCard key={p.id} item={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function PizzaCard({ item }: { item: MenuItem }) {
  const cart = useCart();
  const inCart = cart.items.find((i) => i.id === item.id);
  const tile = HOME_TILES.find((t) => t.id === item.id);
  const palette = tile?.palette ?? "yellow";
  const bg = palette === "green" ? "var(--bk-green)" : palette === "blue" ? "var(--bk-blue)" : "var(--bk-yellow)";
  const numColor = palette === "green" ? "var(--bk-yellow)" : "var(--bk-green)";
  const stickerBg = palette === "green" ? "var(--bk-yellow)" : "var(--bk-green)";
  const stickerColor = palette === "green" ? "var(--bk-green)" : "var(--bk-yellow)";
  const photo = tile?.photo ?? item.photo;

  return (
    <article className="group flex flex-col gap-3">
      <div className="lv-tile" style={{ background: bg }}>
        {tile && (
          <div
            className="absolute top-2 left-3 md:top-4 md:left-5 font-display-xl leading-none text-[24px] md:text-[40px]"
            style={{ color: numColor }}
          >
            {tile.num}
          </div>
        )}
        {/* Tags top-right */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col items-end gap-2 z-[1]">
          {item.featured && (
            <span className={`lv-tag ${palette === "green" ? "lv-tag--hot" : "lv-tag--solid"}`}>★ Forno</span>
          )}
          {item.vegan && <span className="lv-tag lv-tag--vg">VG</span>}
        </div>
        {photo ? (
          <div className="lv-tile-disc">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="lv-tile-disc">
            <PizzaThumb size={200} />
          </div>
        )}
        <div className="lv-price-sticker absolute right-2 bottom-2 md:right-[18px] md:bottom-[18px]" style={{ background: stickerBg, color: stickerColor }}>
          {formatEUR(item.price)}
        </div>
      </div>
      <h3 className="font-display uppercase font-semibold leading-[0.95] text-bk-green text-[18px] md:text-[28px] m-0">{item.name}</h3>
      <p className="text-bk-ink text-[13px] md:text-[14px] leading-snug m-0 font-support">{item.desc.split(",").slice(0, 2).join(",")}.</p>
      {inCart ? (
        <div className="inline-flex items-center gap-1 self-start">
          <button
            onClick={() => cart.update(item.id, inCart.qty - 1)}
            aria-label="Togli una"
            className="w-11 h-11 md:w-8 md:h-8 grid place-items-center bg-bk-green text-bk-yellow"
          >
            <Icon name="minus" size={14} />
          </button>
          <span className="font-display font-bold text-bk-green min-w-[24px] text-center">{inCart.qty}</span>
          <button
            onClick={() => cart.update(item.id, inCart.qty + 1)}
            aria-label="Aggiungi una"
            className="w-11 h-11 md:w-8 md:h-8 grid place-items-center bg-bk-green text-bk-yellow"
          >
            <Icon name="plus" size={14} />
          </button>
        </div>
      ) : (
        <Btn size="sm" variant="dark" className="min-h-[44px]" onClick={() => cart.add(item.id)}>
          <Icon name="plus" size={12} /> Aggiungi
        </Btn>
      )}
    </article>
  );
}

// ─── PHOTO STRIP (two tilted rows, light parallax, center sticker) ─
function PhotoStrip() {
  const rowTop = useRef<HTMLDivElement>(null);
  const rowBottom = useRef<HTMLDivElement>(null);
  const photos = [...PIZZA_PHOTOS.strip, ...PIZZA_PHOTOS.strip];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const base = window.innerWidth < 768 ? { a: -80, b: -20 } : { a: -140, b: -40 };
        if (rowTop.current) rowTop.current.style.transform = `translateX(${base.a + y * 0.15}px)`;
        if (rowBottom.current) rowBottom.current.style.transform = `translateX(${base.b - y * 0.15}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="lv-strip">
      <div className="lv-strip-inner">
        <div ref={rowTop} className="lv-strip-row" style={{ transform: "translateX(-140px)" }}>
          {photos.map((photo, i) => (
            <div key={`a${i}`} className="lv-strip-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div ref={rowBottom} className="lv-strip-row" style={{ transform: "translateX(-40px)" }}>
          {photos.map((photo, i) => (
            <div key={`b${i}`} className="lv-strip-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      {/* Center sticker (div, not cliccabile) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
        <div className="lv-cta-round">
          DAL FORNO
          <br />
          OGNI SERA
        </div>
      </div>
    </section>
  );
}

// ─── STORY (yellow block, photo + copy + numbers) ──────────────────
function Story() {
  return (
    <section style={{ background: "var(--bk-yellow)" }} className="relative">
      <div className="max-w-page mx-auto px-5 md:px-12 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <Reveal className="relative">
          <div className="relative w-full max-w-[520px]">
            {/* Solid green rectangle behind, offset 24px (no shadow) */}
            <div className="absolute inset-0 translate-x-6 translate-y-6" style={{ background: "var(--bk-green)" }} />
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PIZZA_PHOTOS.story} alt="Lievito madre" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />
              <div className="absolute bottom-5 left-5 right-5 text-bk-white font-display uppercase text-[13px] tracking-[0.06em] font-semibold leading-snug">
                Il nostro lievito madre, vivo dal 2014.
              </div>
            </div>
            {/* Blue sticker, rotated 8° */}
            <div className="absolute -top-5 -right-5 md:-top-7 md:-right-9" style={{ transform: "rotate(8deg)" }}>
              <div className="lv-cta-round lv-cta-round--blue lv-cta-round--md">
                12 ANNI
                <br />
                DI FORNO!
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="lv-eyebrow mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-bk-green" /> La nostra storia
            </div>
            <h2 className="lv-h-l text-bk-green">
              NATI A
              <br />
              <span className="lv-stroke">TROPEA.</span>
              <br />
              CRESCIUTI CON
              <br />
              LIEVITO MADRE.
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-bk-ink text-lg leading-snug mt-7 mb-5 max-w-[520px] font-support">
              Lievita nasce nel 2014 in uno scantinato del centro storico, da due fratelli calabresi e una madre — il
              lievito che ancora oggi profuma le nostre cucine.
            </p>
            <p className="text-bk-ink text-lg leading-snug mb-8 max-w-[520px] font-support">
              Una sola pizzeria. Una sola idea: pizza vera, con le materie prime della nostra terra. Cipolla rossa IGP,
              &apos;nduja di Spilinga, bergamotto, caciocavallo silano, alici di Cetara. Tutto a chilometri zero, o quasi.
            </p>
          </Reveal>

          <Reveal stagger>
            <div className="grid grid-cols-3 gap-4 max-w-[520px] border-t-2 border-bk-green pt-6">
              {(
                [
                  ["12", "ANNI DI FORNO"],
                  [`${SHOP.leavening_hours}H`, "DI LIEVITAZIONE"],
                  ["100%", "INGREDIENTI CALABRESI"],
                ] as const
              ).map(([k, v]) => (
                <div key={v}>
                  <div className="font-display font-bold text-[40px] md:text-[56px] leading-none text-bk-green">{k}</div>
                  <div className="font-display uppercase text-[10px] tracking-[0.12em] text-bk-ink mt-2 font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── FIND US (blue block, info + SVG pseudo-map) ───────────────────
function FindUs() {
  const nav = useNavigate();
  return (
    <section style={{ background: "var(--bk-blue)" }} className="relative">
      <div className="max-w-page mx-auto px-5 md:px-12 py-20 md:py-28 grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
        <div>
          <Reveal>
            <div className="lv-eyebrow mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-bk-green" /> Trovaci qui
            </div>
            <h2 className="lv-h-l text-bk-green">
              LARGO
              <br />
              GALLUPPI 5.
              <br />
              <span className="lv-stroke">CENTRO STORICO.</span>
            </h2>
          </Reveal>

          <Reveal stagger>
            <ul className="list-none p-0 mt-10 space-y-4 max-w-[460px]">
              <li className="flex gap-3 items-start">
                <Icon name="pin" size={20} className="mt-1 text-bk-green shrink-0" />
                <div>
                  <div className="font-display uppercase text-[11px] tracking-[0.12em] text-bk-green font-semibold">Indirizzo</div>
                  <div className="text-bk-ink text-[17px] mt-1">{SHOP.address}</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Icon name="phone" size={20} className="mt-1 text-bk-green shrink-0" />
                <div>
                  <div className="font-display uppercase text-[11px] tracking-[0.12em] text-bk-green font-semibold">Telefono</div>
                  <div className="text-bk-ink text-[17px] mt-1">{SHOP.phone}</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Icon name="clock" size={20} className="mt-1 text-bk-green shrink-0" />
                <div>
                  <div className="font-display uppercase text-[11px] tracking-[0.12em] text-bk-green font-semibold">Orari</div>
                  <div className="text-bk-ink text-[15px] mt-1 space-y-0.5">
                    {SHOP.hours.map((h) => (
                      <div key={h.day}>
                        <span className="font-display font-semibold uppercase text-[12px] tracking-[0.08em] mr-2 text-bk-green">{h.day}</span>
                        {h.time}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal>
            <div className="flex gap-3 mt-8 flex-wrap">
              <Btn variant="dark" onClick={() => nav("reserve")}>
                <Icon name="utensils" size={14} /> Prenota
              </Btn>
              <Btn variant="white" onClick={() => nav("menu")}>
                <Icon name="bag" size={14} /> Ordina
              </Btn>
            </div>
          </Reveal>
        </div>

        {/* Pseudo-map — copiata da design/Main.dc.html */}
        <Reveal>
          <div className="aspect-[5/4] relative overflow-hidden bg-bk-blueTint border-2 border-bk-green">
            <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect width="500" height="400" fill="#CFE8EF" />
              {/* Sea */}
              <path d="M 0 240 Q 100 230 200 250 Q 300 270 400 250 Q 470 240 500 250 L 500 400 L 0 400 Z" fill="#74C3D5" />
              <path d="M 0 260 Q 100 250 200 270 Q 300 290 400 270 Q 470 260 500 270 L 500 400 L 0 400 Z" fill="#54a3b5" />
              {/* Coastline */}
              <path d="M 0 240 Q 100 230 200 250 Q 300 270 400 250 Q 470 240 500 250" fill="none" stroke="#075C40" strokeWidth="1.5" />
              {/* Roads */}
              <g stroke="#075C40" strokeWidth="1.5" fill="none" opacity="0.35">
                <path d="M 60 60 Q 180 80 240 140 Q 300 200 380 220" />
                <path d="M 80 200 L 220 200 L 220 280" />
                <path d="M 280 60 L 280 200 L 380 200" />
                <line x1="0" y1="160" x2="500" y2="160" strokeDasharray="3 8" />
                <line x1="160" y1="0" x2="160" y2="400" strokeDasharray="3 8" />
                <line x1="340" y1="0" x2="340" y2="400" strokeDasharray="3 8" />
              </g>
              <text x="50" y="50" fontFamily="Bebas Neue,Anton,sans-serif" fontSize="18" fill="#075C40" letterSpacing="1">CENTRO STORICO</text>
              <text x="370" y="295" fontFamily="Bebas Neue,Anton,sans-serif" fontSize="16" fill="#075C40" letterSpacing="1">MARINA DELL&apos;ISOLA</text>
              <text x="100" y="330" fontFamily="Bebas Neue,Anton,sans-serif" fontSize="14" fill="#075C40" letterSpacing="1">MAR TIRRENO</text>
              {/* Pin */}
              <g transform="translate(240 175)">
                <circle r="50" fill="#FFDD00" opacity="0.5" />
                <circle r="30" fill="#FFDD00" />
                <circle r="14" fill="#075C40" />
                <text y="-50" textAnchor="middle" fontFamily="Bebas Neue,Anton,sans-serif" fontSize="14" letterSpacing="3" fill="#075C40" fontWeight="900">LIEVITA</text>
              </g>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Home;