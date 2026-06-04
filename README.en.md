# Lievita — Pizzeria in Tropea 🍕

**[🇮🇹 Italiano](./README.md) · [🇸🇪 Svenska](./README.sv.md) · 🇬🇧 English**

A **Next.js 14 (App Router) + TypeScript + Tailwind CSS** demo that recreates the
website of **Lievita**, a Calabrian sourdough pizzeria, with the **Bold Kinetic**
look (condensed-uppercase type, palette white / yellow `#FFDD00` / forest green
`#075C40` / sky blue `#74C3D5`, tilted scrolling marquees, custom cursor, intro
curtain, reveal-on-scroll).

All data is **hardcoded** (`src/lib/data.ts`); orders and cart persist in
`localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route                 | What                                                              |
| --------------------- | ---------------------------------------------------------------- |
| `/`                   | Home: hero, 5-pizza parallax, why-us, popular, story, map        |
| `/menu`               | Menu & order: 8 categories, sticky cart, delivery/pickup         |
| `/checkout`           | Customer details, address/pickup, time slots, payment            |
| `/confirm/[orderId]`  | Order confirmation with status timeline                          |
| `/reserve`            | Table booking: 14-day calendar, slots, guests                    |
| `/contact`            | Contact + form                                                   |
| `/admin`              | Management dashboard — **demo code: `0000`**                     |

## Admin

`/admin` (code `0000`) — dashboard with KPIs, a live Kanban board (orders placed
on the site show up here in real time via a shared store), order history,
products, inventory (21 Calabrian ingredients) and reservations. The **Reset
demo** button restores the mock data.

## Structure

```
src/
  app/
    layout.tsx              # root: StoreProvider + cursor + <html>/<body>
    icon.svg                # favicon (Bold Kinetic "L" monogram)
    globals.css             # Bold Kinetic + Lievita overrides + Tailwind
    (site)/                 # route group with Header/Footer/IntroLoader
      layout.tsx
      page.tsx              # Home
      menu/ checkout/ reserve/ contact/
      confirm/[orderId]/
    admin/page.tsx          # dashboard (no header/footer)
  components/                # kinetic, illustrations, Header, Footer, form,
                             # parallax, customer-home, customer-flows, admin
  lib/
    data.ts                 # SHOP / MENU / INVENTORY / mock orders+reservations
    store.tsx               # Context cart+orders+reservations, hooks, navigation
    types.ts
```

The fonts (Knockout/Gotham) use Google Fonts substitutes (Bebas Neue / Anton /
Oswald / Montserrat). Photos are Unsplash placeholders, replaceable with real
photos of the venue.
