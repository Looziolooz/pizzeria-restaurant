# Lievita — Pizzeria i Tropea 🍕

**[🇮🇹 Italiano](./README.md) · 🇸🇪 Svenska · [🇬🇧 English](./README.en.md)**

En **Next.js 14 (App Router) + TypeScript + Tailwind CSS**-demo som återskapar
webbplatsen för **Lievita**, en kalabrisk surdegspizzeria, med utseendet
**Bold Kinetic** (kondenserad versaltypografi, palett vit / gul `#FFDD00` /
skogsgrön `#075C40` / himmelsblå `#74C3D5`, lutande rullande marquee-band, egen
muspekare, intro-ridå, reveal-on-scroll).

All data är **hårdkodad** (`src/lib/data.ts`); ordrar och varukorg sparas i
`localStorage`.

## Kom igång

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Sidor

| Rutt                  | Vad                                                              |
| --------------------- | --------------------------------------------------------------- |
| `/`                   | Hem: hero, parallax med 5 pizzor, varför-oss, populära, historia, karta |
| `/menu`               | Meny & beställ: 8 kategorier, klistrad varukorg, leverans/avhämtning |
| `/checkout`           | Kunduppgifter, adress/avhämtning, tidsluckor, betalning         |
| `/confirm/[orderId]`  | Orderbekräftelse med statustidslinje                            |
| `/reserve`            | Bordsbokning: 14-dagarskalender, tider, gäster                  |
| `/contact`            | Kontakt + formulär                                              |
| `/admin`              | Adminpanel — **demokod: `0000`**                                |

## Admin

`/admin` (kod `0000`) — panel med nyckeltal, en live Kanban-tavla (ordrar som
läggs på sajten dyker upp här i realtid via en delad store), orderhistorik,
produkter, lager (21 kalabriska råvaror) och bokningar. Knappen **Reset demo**
återställer mockdatan.

## Struktur

```
src/
  app/
    layout.tsx              # root: StoreProvider + muspekare + <html>/<body>
    icon.svg                # favicon ("L"-monogram i Bold Kinetic)
    globals.css             # Bold Kinetic + Lievita-overrides + Tailwind
    (site)/                 # route group med Header/Footer/IntroLoader
      layout.tsx
      page.tsx              # Hem
      menu/ checkout/ reserve/ contact/
      confirm/[orderId]/
    admin/page.tsx          # panel (utan header/footer)
  components/                # kinetic, illustrations, Header, Footer, form,
                             # parallax, customer-home, customer-flows, admin
  lib/
    data.ts                 # SHOP / MENU / INVENTORY / mock ordrar+bokningar
    store.tsx               # Context varukorg+ordrar+bokningar, hooks, navigering
    types.ts
```

Typsnitten (Knockout/Gotham) använder ersättare från Google Fonts (Bebas Neue /
Anton / Oswald / Montserrat). Bilderna är platshållare från Unsplash som kan
bytas mot riktiga foton av restaurangen.
