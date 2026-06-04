"use client";

// LIEVITA — Header (Bold Kinetic)
// Fixed, split nav L/R, centered wordmark, ALL CAPS, animated underline.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavLink, StatusPill } from "./kinetic";
import { Icon } from "./illustrations";
import { useCart, useNavigate } from "@/lib/store";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const here = (n: string) => {
    if (n === "home") return pathname === "/";
    if (n === "menu") return pathname.startsWith("/menu");
    return pathname.startsWith(`/${n}`);
  };
  const menuActive =
    pathname.startsWith("/menu") || pathname.startsWith("/checkout") || pathname.startsWith("/confirm");

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.86)",
        borderBottom: "1px solid var(--bk-border)",
        transition: "background .25s var(--ease-signature)",
      }}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-9 py-3 md:py-4 max-w-page mx-auto">
        {/* LEFT NAV */}
        <nav className="hidden md:flex items-center gap-7 justify-self-start">
          <NavLink to="home" active={here("home")}>Home</NavLink>
          <NavLink to="menu" active={menuActive}>Menù &amp; Ordina</NavLink>
          <NavLink to="reserve" active={here("reserve")}>Prenota</NavLink>
        </nav>

        {/* CENTER WORDMARK */}
        <button onClick={() => nav("home")} className="flex flex-col items-center leading-none">
          <span className="lv-wordmark text-[28px] md:text-[38px]">LIEVITA</span>
          <span className="font-display uppercase tracking-[0.2em] text-[9px] md:text-[10px] text-bk-green/75 mt-1">
            Tropea · dal 2014
          </span>
        </button>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-5 justify-self-end">
          <NavLink to="contact" active={here("contact")}>
            <span className="hidden md:inline">Contatti</span>
            <span className="md:hidden">Info</span>
          </NavLink>
          <span className="hidden lg:inline-flex">
            <StatusPill state="open">Aperto fino alle 23:30</StatusPill>
          </span>
          <button onClick={() => nav("menu")} className="lv-btn lv-btn--dark lv-btn--sm relative">
            ORDINA
            {count > 0 && (
              <span
                className="absolute -top-2 -right-2 grid place-items-center min-w-[22px] h-[22px] rounded-full bg-bk-yellow text-bk-green text-[11px] font-bold px-1.5 font-display"
                style={{ boxShadow: "0 0 0 2px var(--bk-green)" }}
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => nav("admin")}
            className="hidden md:inline-grid place-items-center w-9 h-9 rounded-full border border-bk-green text-bk-green hover:bg-bk-green hover:text-bk-yellow transition-colors"
            title="Admin"
            aria-label="Admin"
          >
            <Icon name="user" size={14} />
          </button>
        </div>
      </div>

      {/* Mobile second row */}
      <div className="md:hidden border-t border-bk-border px-3 py-1.5 flex gap-1 overflow-x-auto bg-bk-white">
        {([
          ["home", "Home"],
          ["menu", "Menù"],
          ["reserve", "Prenota"],
          ["contact", "Contatti"],
          ["admin", "Admin"],
        ] as const).map(([n, l]) => (
          <button
            key={n}
            onClick={() => nav(n)}
            className={`shrink-0 px-3 py-1.5 font-display uppercase text-[11px] tracking-[0.1em] font-semibold ${
              here(n) ? "bg-bk-green text-bk-yellow" : "text-bk-green"
            }`}
            style={{ borderRadius: 0 }}
          >
            {l}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Header;
