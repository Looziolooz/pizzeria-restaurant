# Lievita — Pizzeria a Tropea 🍕

<!-- looz-design-credit -->
> Progettato e sviluppato da **[LOoz.design](https://looz.design/?utm_source=github&utm_medium=referral&utm_campaign=readme)**: siti web, gestionali e agenti AI per piccole attività.
> *Designed and built by LOoz.design: websites, management tools and AI agents for small businesses.*
>
> **Demo online:** https://pizzeria-restaurant.vercel.app/ · **Scheda del progetto · Case study:** https://looz.design/work/pizzeria-restaurant
<!-- /looz-design-credit -->

**🇮🇹 Italiano · [🇸🇪 Svenska](./README.sv.md) · [🇬🇧 English](./README.en.md)**

Demo **Next.js 14 (App Router) + TypeScript + Tailwind CSS** che ricrea il sito
della pizzeria calabrese a lievito madre **Lievita**, con estetica **Bold Kinetic**
(tipografia condensed-uppercase, palette bianco / giallo `#FFDD00` / verde foresta
`#075C40` / azzurro `#74C3D5`, marquee inclinati scorrevoli, cursore custom,
intro curtain, reveal-on-scroll).

Tutti i dati sono **hardcoded** (`src/lib/data.ts`); ordini e carrello sono
persistiti in `localStorage`.

## Avvio

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Pagine

| Percorso              | Cosa                                                            |
| --------------------- | -------------------------------------------------------------- |
| `/`                   | Home: hero, parallax 5 pizze, why-us, popolari, storia, mappa  |
| `/menu`               | Menù & ordina: 8 categorie, carrello sticky, delivery/asporto  |
| `/checkout`           | Dati cliente, indirizzo/ritiro, slot orari, pagamento          |
| `/confirm/[orderId]`  | Conferma ordine con timeline di stato                          |
| `/reserve`            | Prenotazione tavolo: calendario 14 giorni, slot, ospiti        |
| `/contact`            | Contatti + form                                                |
| `/admin`              | Dashboard gestione — **codice demo: `0000`**                   |

## Admin

`/admin` (codice `0000`) — dashboard con KPI, ordini live in Kanban (gli ordini
fatti dal sito compaiono qui in tempo reale via store condiviso), storico,
prodotti, magazzino (21 materie prime calabresi) e prenotazioni. Il pulsante
**Reset demo** ripristina i dati mock.

## Struttura

```
src/
  app/
    layout.tsx              # root: StoreProvider + cursore + <html>/<body>
    icon.svg                # favicon (monogramma "L" Bold Kinetic)
    globals.css             # Bold Kinetic + override Lievita + Tailwind
    (site)/                 # route group con Header/Footer/IntroLoader
      layout.tsx
      page.tsx              # Home
      menu/ checkout/ reserve/ contact/
      confirm/[orderId]/
    admin/page.tsx          # dashboard (no header/footer)
  components/                # kinetic, illustrations, Header, Footer, form,
                             # parallax, customer-home, customer-flows, admin
  lib/
    data.ts                 # SHOP / MENU / INVENTORY / mock ordini+prenotazioni
    store.tsx               # Context carrello+ordini+prenotazioni, hooks, navigazione
    types.ts
```

I font (Knockout/Gotham) usano sostituti Google Fonts (Bebas Neue / Anton /
Oswald / Montserrat). Le foto sono placeholder Unsplash, sostituibili con foto
reali del locale.
