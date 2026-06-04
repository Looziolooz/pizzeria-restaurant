"use client";

// LIEVITA — Homepage (Bold Kinetic)
// Full-bleed color blocks alternating white / yellow / green / blue,
// signature tilted marquees between sections, huge condensed-caps display
// type, round popping CTAs, lots of motion.

import { Marquee, Reveal, Btn, ArrowDoodle, StarDoodle, Squiggle } from "./kinetic";
import { Icon, PizzaThumb } from "./illustrations";
import { ParallaxShowcase } from "./parallax";
import { SHOP, PIZZA_PHOTOS, findMenuItem, formatEUR } from "@/lib/data";
import { useCart, useNavigate } from "@/lib/store";
import type { MenuItem } from "@/lib/types";

// ═══════════════════════════════════════════════════════════════════
//  HOME
// ═══════════════════════════════════════════════════════════════════
export function Home() {
  const popular = ["p-margherita", "p-nduja", "p-tropea", "p-bergamotto", "p-diavola", "p-mortadella"]
    .map((id) => findMenuItem(id))
    .filter(Boolean) as MenuItem[];

  return (
    <div style={{ background: "var(--bk-white)" }}>
      <Hero />
      <Marquee words={["FORNO A LEGNA", "LIEVITO MADRE", "100% CALABRESE", "FRESCO OGNI GIORNO", "TROPEA"]} color="yellow" direction="left" tilt="down" />
      <WhyUs />
      <Marquee words={["DELIVERY", "ASPORTO", "PRENOTA", "ORDINA", "SUBITO!"]} color="green" direction="right" tilt="up" />
      <ParallaxShowcase />
      <Marquee words={["28 COPERTI", "DUE PASSI DAL MARE", "DAL 2014", "BUONA PIZZA", "BRAVA GENTE"]} color="blue" direction="left" tilt="down" />
      <PopularPizze popular={popular} />
      <Marquee words={["PRANZO A €12", "LUNEDÌ → VENERDÌ", "PIZZA + BIBITA + CAFFÈ"]} color="yellow" direction="right" tilt="up" />
      <Story />
      <Marquee words={["LARGO GALLUPPI 5", "TROPEA", "CALABRIA"]} color="green" direction="left" tilt="down" />
      <FindUs />
    </div>
  );
}

// ─── HERO (white block, huge display, photo right) ────────────────
function Hero() {
  const nav = useNavigate();
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--bk-white)", paddingTop: "120px" }}>
      <div className="max-w-page mx-auto px-5 md:px-12 pb-16 md:pb-24 grid md:grid-cols-[1.35fr_1fr] gap-10 md:gap-12 items-center">
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
                  ["clock", "Pronta in 25 min"],
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
        </div>

        {/* Right: photo + popping round CTA + doodle */}
        <div className="relative flex items-center justify-center min-h-[360px] md:min-h-[560px]">
          {/* Yellow glow halo */}
          <div className="absolute inset-[8%] rounded-full" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,221,0,0.85) 0%, transparent 60%)", filter: "blur(20px)" }} />
          {/* Pizza photo as round disc */}
          <Reveal className="relative z-[1]">
            <div className="w-[300px] h-[300px] md:w-[460px] md:h-[460px] rounded-full overflow-hidden" style={{ boxShadow: "var(--shadow-product)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=1200&q=85&auto=format&fit=crop"
                alt="Margherita"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </Reveal>
          {/* Popping CTA */}
          <button
            onClick={() => nav("menu")}
            className="lv-cta-round lv-cta-round--dark absolute"
            style={{ right: "-10px", bottom: "30px", animationDelay: "300ms" }}
          >
            ORDINA
            <br />
            SUBITO!
          </button>
          {/* Doodle arrow */}
          <ArrowDoodle className="absolute hidden md:block" style={{ width: 140, top: 30, right: -10, transform: "rotate(28deg)" }} color="var(--bk-teal)" />
          {/* Star */}
          <StarDoodle className="absolute" style={{ width: 60, top: 8, left: -10, transform: "rotate(-12deg)" }} />
        </div>
      </div>
    </section>
  );
}

// ─── WHY US (green block, 4 features) ─────────────────────────────
function WhyUs() {
  const features = [
    { num: "01", title: "Farine bio", body: "Macinate a pietra, da grani italiani selezionati." },
    { num: "02", title: "Lievito madre", body: "24 ore di lievitazione naturale. Digeribile, leggera." },
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
            <span className="lv-stroke" style={{ color: "transparent", WebkitTextStroke: "2px var(--bk-yellow)" }}>FATTA COME SI DEVE.</span>
          </h2>
        </Reveal>
        <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mt-14 md:mt-20">
          {features.map((f) => (
            <div key={f.num} className="flex flex-col gap-3">
              <div className="w-14 h-14 rounded-full grid place-items-center font-display font-bold text-[22px]" style={{ background: "var(--bk-yellow)", color: "var(--bk-green)" }}>
                {f.num}
              </div>
              <h3 className="lv-h3 text-bk-white mt-1">{f.title}</h3>
              <p className="text-[15px] leading-snug max-w-[280px]" style={{ color: "rgba(255,255,255,0.85)" }}>
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

// ─── POPULAR PIZZE (yellow block, grid) ───────────────────────────
function PopularPizze({ popular }: { popular: MenuItem[] }) {
  const nav = useNavigate();
  return (
    <section style={{ background: "var(--bk-yellow)" }} className="relative">
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
            <button onClick={() => nav("menu")} className="lv-link text-bk-green text-[15px]">
              Vai a tutto il menù →
            </button>
          </Reveal>
        </div>

        <Reveal stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
          {popular.map((p) => (
            <PizzaCard key={p.id} item={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function PizzaCard({ item }: { item: MenuItem }) {
  const cart = useCart();
  const nav = useNavigate();
  const inCart = cart.items.find((i) => i.id === item.id);
  return (
    <div className="group flex flex-col gap-3">
      <button
        onClick={() => {
          if (!inCart) cart.add(item.id);
          else nav("menu");
        }}
        className="block aspect-square overflow-hidden relative bg-bk-white text-left"
        data-cursor-hover
      >
        {item.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.photo} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-sig group-hover:scale-110" />
        ) : (
          <div className="w-full h-full grid place-items-center bg-bk-white">
            <PizzaThumb size={180} />
          </div>
        )}
        {item.featured && (
          <span className="absolute top-2 left-2 lv-tag lv-tag--hot" style={{ background: "var(--bk-green)", color: "var(--bk-yellow)", borderColor: "var(--bk-green)" }}>
            ★ Forno
          </span>
        )}
        {item.vegan && <span className="absolute top-2 right-2 lv-tag lv-tag--vg">VG</span>}
      </button>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display uppercase font-semibold leading-[0.95] text-bk-green text-[22px] m-0">{item.name}</h3>
        <div className="font-display font-bold text-bk-green text-[18px]">{formatEUR(item.price)}</div>
      </div>
      <p className="text-bk-ink text-[13px] leading-snug m-0">{item.desc.split(",").slice(0, 2).join(",")}.</p>
      {inCart ? (
        <div className="inline-flex items-center gap-1 self-start">
          <button onClick={() => cart.update(item.id, inCart.qty - 1)} className="w-8 h-8 grid place-items-center bg-bk-green text-bk-yellow">
            <Icon name="minus" size={14} />
          </button>
          <span className="font-display font-bold text-bk-green min-w-[24px] text-center">{inCart.qty}</span>
          <button onClick={() => cart.update(item.id, inCart.qty + 1)} className="w-8 h-8 grid place-items-center bg-bk-green text-bk-yellow">
            <Icon name="plus" size={14} />
          </button>
        </div>
      ) : (
        <Btn size="sm" variant="dark" onClick={() => cart.add(item.id)}>
          <Icon name="plus" size={12} /> Aggiungi
        </Btn>
      )}
    </div>
  );
}

// ─── STORY (white block, photo + copy + numbers) ──────────────────
function Story() {
  return (
    <section style={{ background: "var(--bk-white)" }} className="relative">
      <div className="max-w-page mx-auto px-5 md:px-12 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <Reveal className="relative">
          <div className="aspect-[4/5] overflow-hidden relative" style={{ boxShadow: "var(--shadow-product)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PIZZA_PHOTOS.story} alt="Lievito madre" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />
            <div className="absolute bottom-5 left-5 right-5 text-bk-white font-display uppercase text-[13px] tracking-[0.06em] font-semibold leading-snug">
              Il nostro lievito madre, vivo dal 2014.
            </div>
          </div>
          {/* Blue sticker */}
          <div className="lv-cta-round lv-cta-round--blue absolute" style={{ width: 130, height: 130, right: -20, top: -20, fontSize: 17, transform: "rotate(8deg)" }}>
            12 ANNI
            <br />
            DI FORNO!
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
              <span className="lv-stroke" style={{ color: "rgb(116, 195, 213)" }}>TROPEA.</span>
              <br />
              CRESCIUTI CON LIEVITO MADRE.
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-bk-ink text-lg leading-snug mt-7 mb-5 max-w-[520px]">
              Lievita nasce nel 2014 in uno scantinato del centro storico, da due fratelli calabresi e una madre — il
              lievito che ancora oggi profuma le nostre cucine.
            </p>
            <p className="text-bk-ink text-lg leading-snug mb-8 max-w-[520px]">
              Una sola pizzeria. Una sola idea: pizza vera, con le materie prime della nostra terra. Cipolla rossa IGP,
              &apos;nduja di Spilinga, bergamotto, caciocavallo silano, alici di Cetara. Tutto a chilometri zero, o quasi.
            </p>
          </Reveal>

          <Reveal stagger>
            <div className="grid grid-cols-3 gap-4 max-w-[520px] border-t-2 border-bk-green pt-6">
              {(
                [
                  ["12", "ANNI DI FORNO"],
                  ["48H", "DI LIEVITAZIONE"],
                  ["100%", "INGREDIENTI CALABRESI"],
                ] as const
              ).map(([k, v]) => (
                <div key={v}>
                  <div className="font-display-xl font-bold text-[44px] leading-none text-bk-green">{k}</div>
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

// ─── FIND US (blue block, info + pseudo-map) ──────────────────────
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

        {/* Pseudo-map */}
        <Reveal>
          <div className="aspect-[5/4] relative overflow-hidden bg-bk-blueTint border-2 border-bk-green" data-cursor-hover>
            <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
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
