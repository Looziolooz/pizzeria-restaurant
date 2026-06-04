"use client";

// LIEVITA — Footer (Bold Kinetic), dark green block with social + columns.

import { useNavigate } from "@/lib/store";
import { SHOP } from "@/lib/data";

export function Footer() {
  const nav = useNavigate();
  const columns: { title: string; items: [string, string | null][] }[] = [
    {
      title: "Cosa facciamo",
      items: [
        ["Menù & Ordina", "menu"],
        ["Prenota un tavolo", "reserve"],
        ["Eventi privati", "contact"],
        ["Lavora con noi", "contact"],
      ],
    },
    {
      title: "La pizzeria",
      items: [
        ["La nostra storia", "home"],
        ["Lievito madre", "home"],
        ["Contatti", "contact"],
        ["FAQ", "contact"],
      ],
    },
    {
      title: "Legale",
      items: [
        ["Privacy", null],
        ["Cookies", null],
        ["Termini", null],
        ["Admin", "admin"],
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--bk-green)", color: "#fff" }} className="pt-16 md:pt-20 pb-7">
      <div className="max-w-page mx-auto px-5 md:px-12">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/15">
          <div>
            <div className="lv-wordmark lv-wordmark--light text-[44px]">LIEVITA</div>
            <p className="text-bk-yellow/85 text-[16px] mt-3 max-w-[340px] mb-5">
              Pizza calabrese a lievito madre. A due passi dal mare di Tropea.
            </p>
            <div className="text-[12px] text-white/55 leading-relaxed">
              {SHOP.address}
              <br />
              {SHOP.phone} · {SHOP.email}
              <br />
              {SHOP.vat}
            </div>
            <div className="flex gap-2.5 mt-5">
              {["IG", "FB", "TT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid place-items-center w-10 h-10 rounded-full border border-white/30 text-white hover:bg-bk-yellow hover:border-bk-yellow hover:text-bk-green transition-colors font-display font-bold text-[12px]"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="font-display uppercase text-bk-yellow text-[14px] tracking-[0.1em] font-semibold mb-4">
                {col.title}
              </h5>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {col.items.map(([l, r]) => (
                  <li key={l}>
                    <button
                      onClick={() => r && nav(r)}
                      className="text-white/85 hover:text-bk-yellow transition-colors text-[15px] text-left"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-7 flex justify-between flex-wrap gap-3 font-display uppercase text-[12px] tracking-[0.06em] text-white/55">
          <div>© 2026 LIEVITA SRL · TROPEA</div>
          <div className="text-bk-yellow/85">&quot;BUONA PIZZA, BRAVA GENTE.&quot;</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
