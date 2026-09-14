# ASSETS

Registro degli asset in `public/`. Regola di casa: nessun asset referenziato da URL esterno
nel codice nuovo; ogni file ha sorgente, data e licenza.

## public/img/ — foto della home (segnaposto)

Aggiunte il 2026-09-11 per il redesign Bold Kinetic. Sono **segnaposto**: le stesse foto
Unsplash che `src/lib/data.ts` già usava via URL, scaricate e ricompresse in JPEG progressivo
(Pillow, qualità 78–80). Da sostituire con foto vere del locale prima del go-live.

| File | Sorgente (Unsplash photo id) | Uso | Licenza |
| --- | --- | --- | --- |
| `hero.jpg` (1600w) | `1513104890138-7c749659a591` | striscia foto | Unsplash License |
| `margherita.jpg` (1000w) | `1604068549290-dea0e4a305ca` | disco hero, tessera I, striscia | Unsplash License |
| `diavola.jpg` (1000w) | `1628840042765-356cda07504e` | tessera V, striscia | Unsplash License |
| `tropea.jpg` (1000w) | `1571997478779-2adcbbe9ab2f` | tessera III, striscia | Unsplash License |
| `bergamotto.jpg` (1000w) | `1593504049359-74330189a345` | tessera IV, striscia | Unsplash License |
| `nduja.jpg` (1000w) | `1604382354936-07c5d9983bd3` | tessera II, striscia | Unsplash License |
| `lievito.jpg` (1200w) | `1579027989536-b7b1f875659b` | storia, striscia | Unsplash License |
| `forno.jpg` (1000w) | `1592861956120-e524fc739696` | striscia | Unsplash License |
| `mortadella.jpg` (1000w) | `1574071318508-1cdbab80d002` | tessera VI, striscia | Unsplash License |
| `weekly.jpg` (1000w) | `1565299624946-b28f40a0ae38` | striscia | Unsplash License |

Licenza Unsplash: uso commerciale e non commerciale consentito, senza attribuzione
obbligatoria; vietata la rivendita delle foto come tali. Le foto del **menù** (`MENU.items[].photo`
in `data.ts`) restano per ora URL Unsplash come nel progetto originale: vanno portate qui con
lo stesso criterio quando arrivano le foto vere.

## src/app/icon.svg

Favicon, monogramma "L" Bold Kinetic. Disegnato in casa (2026-08), nessuna sorgente esterna.
