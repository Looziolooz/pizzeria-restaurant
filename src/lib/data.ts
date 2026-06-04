// LIEVITA Tropea — central hardcoded data
// Static catalog + helpers. Time-relative mock data (orders / reservations)
// is produced by factory functions so it is computed on the client only,
// keeping it "today" for the demo and avoiding SSR hydration drift.

import type {
  InventoryItem,
  MenuCategory,
  MenuItem,
  Order,
  OrderStatus,
  Reservation,
  Shop,
} from "./types";

// ─── The pizzeria ──────────────────────────────────────────────────
export const SHOP: Shop = {
  name: "Lievita",
  tagline: "Pizza calabrese a lievito madre",
  city: "Tropea",
  region: "Calabria",
  address: "Largo Galluppi, 5 · 89861 Tropea (VV)",
  phone: "0963 666842",
  email: "ciao@lievita.it",
  vat: "P.IVA 03088161202",
  hours: [
    { day: "Lun—Gio", time: "18:30 — 23:30" },
    { day: "Ven—Sab", time: "12:30 — 15:00 · 18:30 — 00:00" },
    { day: "Domenica", time: "12:30 — 15:00 · 18:30 — 23:30" },
  ],
  delivery_radius_km: 8,
  delivery_fee: 3.5,
  delivery_min: 18,
  pickup_min: 12,
  prep_minutes: 25,
};

// ─── Menu ──────────────────────────────────────────────────────────
export const MENU: { categories: MenuCategory[]; items: MenuItem[] } = {
  categories: [
    { id: "classiche", label: "Classiche", sub: "Le pizze di sempre, fatte come si deve." },
    { id: "calabresi", label: "Calabresi", sub: "Topping della nostra terra: 'nduja, cipolla di Tropea, caciocavallo." },
    { id: "stagionali", label: "Stagionali", sub: "Cambiamo con l'orto: oggi è autunno." },
    { id: "bianche", label: "Bianche", sub: "Senza pomodoro. Mozzarella, ricotta, verdure." },
    { id: "vegane", label: "Vegane", sub: "Senza prodotti animali. Sempre buona." },
    { id: "antipasti", label: "Antipasti", sub: "Per iniziare. Da condividere." },
    { id: "bibite", label: "Bibite", sub: "Birra artigianale, vini calabresi, soft drinks." },
    { id: "dolci", label: "Dolci", sub: "Tradizione calabrese." },
  ],
  items: [
    // ── Classiche ──
    { id: "p-margherita", cat: "classiche", name: "Margherita", desc: "Pomodoro San Marzano DOP, fior di latte, basilico, olio EVO.", price: 8.5, vegan: false, stock: 24, photo: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80&auto=format&fit=crop" },
    { id: "p-marinara", cat: "classiche", name: "Marinara", desc: "Pomodoro, aglio, origano, olio EVO. Senza mozzarella.", price: 7.0, vegan: true, stock: 30, photo: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80&auto=format&fit=crop" },
    { id: "p-diavola", cat: "classiche", name: "Diavola", desc: "Pomodoro, fior di latte, salame piccante calabrese, olio EVO.", price: 10.5, vegan: false, stock: 18, photo: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80&auto=format&fit=crop" },
    { id: "p-quattro", cat: "classiche", name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, caciocavallo silano DOP, parmigiano 24 mesi.", price: 11.5, vegan: false, stock: 14, photo: "https://images.unsplash.com/photo-1548369937-47519962c11a?w=600&q=80&auto=format&fit=crop" },

    // ── Calabresi ──
    { id: "p-nduja", cat: "calabresi", name: "'Nduja di Spilinga", desc: "Pomodoro, fior di latte, 'nduja, cipolla di Tropea, miele di castagno.", price: 12.5, vegan: false, stock: 16, featured: true, photo: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&q=80&auto=format&fit=crop" },
    { id: "p-tropea", cat: "calabresi", name: "Tropea", desc: "Pomodoro, mozzarella di bufala, cipolla rossa di Tropea IGP, alici di Cetara, capperi.", price: 13.0, vegan: false, stock: 12, photo: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80&auto=format&fit=crop" },
    { id: "p-pollino", cat: "calabresi", name: "Pollino", desc: "Crema di funghi porcini, caciocavallo silano, soppressata, rosmarino.", price: 12.0, vegan: false, stock: 10, photo: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&q=80&auto=format&fit=crop" },
    { id: "p-sila", cat: "calabresi", name: "Sila", desc: "Crema di patate della Sila, pecorino crotonese, pancetta, peperoncino.", price: 11.5, vegan: false, stock: 15, photo: "https://images.unsplash.com/photo-1620374645498-af6bd681a0bd?w=600&q=80&auto=format&fit=crop" },
    { id: "p-bergamotto", cat: "calabresi", name: "Bergamotto", desc: "Bianca con stracciatella, scorza di bergamotto di Reggio, pistacchio, pepe rosa.", price: 13.5, vegan: false, stock: 8, featured: true, photo: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&q=80&auto=format&fit=crop" },

    // ── Stagionali ──
    { id: "p-zucca", cat: "stagionali", name: "Zucca & Salsiccia", desc: "Crema di zucca, salsiccia di Pollino, scaglie di pecorino, semi di zucca.", price: 12.0, vegan: false, stock: 14, photo: "https://images.unsplash.com/photo-1589187151053-5ec8818e661b?w=600&q=80&auto=format&fit=crop" },
    { id: "p-cavolo", cat: "stagionali", name: "Cavolo Nero", desc: "Bianca con cavolo nero, mozzarella, acciughe, briciole di pane.", price: 11.0, vegan: false, stock: 11, photo: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80&auto=format&fit=crop" },
    { id: "p-funghi", cat: "stagionali", name: "Bosco d'Aspromonte", desc: "Fior di latte, mix di funghi, tartufo nero d'Aspromonte, prezzemolo.", price: 14.0, vegan: false, stock: 9, photo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&auto=format&fit=crop" },

    // ── Bianche ──
    { id: "p-bianca", cat: "bianche", name: "Bianca Classica", desc: "Mozzarella, ricotta di pecora, olio EVO, pepe.", price: 9.5, vegan: false, stock: 20, photo: "https://images.unsplash.com/photo-1572552635104-daf938e0aa1f?w=600&q=80&auto=format&fit=crop" },
    { id: "p-mortadella", cat: "bianche", name: "Mortadella & Pistacchio", desc: "Bianca, stracciatella, mortadella, pistacchio di Bronte, scorza di limone.", price: 12.5, vegan: false, stock: 10, photo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&auto=format&fit=crop" },

    // ── Vegane ──
    { id: "p-orto", cat: "vegane", name: "Orto di Calabria", desc: "Pomodoro, verdure di stagione grigliate, olive nere di Gerace, origano.", price: 10.0, vegan: true, stock: 16, photo: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&q=80&auto=format&fit=crop" },
    { id: "p-bufala", cat: "vegane", name: "Pomodorino Vesuvio", desc: "Pomodorini gialli e rossi, basilico, capperi, origano. Senza mozzarella.", price: 9.5, vegan: true, stock: 18, photo: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=600&q=80&auto=format&fit=crop" },

    // ── Antipasti ──
    { id: "a-fritti", cat: "antipasti", name: "Fritti misti", desc: "Crocché, supplì, fiori di zucca, panzerotti. Per 2 persone.", price: 9.0, vegan: false, stock: 22, photo: "https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=600&q=80&auto=format&fit=crop" },
    { id: "a-tagliere", cat: "antipasti", name: "Tagliere calabrese", desc: "Salame piccante, 'nduja, caciocavallo silano, pane di Cutro.", price: 14.0, vegan: false, stock: 12, photo: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&q=80&auto=format&fit=crop" },
    { id: "a-burrata", cat: "antipasti", name: "Burrata e alici", desc: "Burrata pugliese, alici di Cetara, pomodorini confit, pane casereccio.", price: 11.0, vegan: false, stock: 9, photo: "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=600&q=80&auto=format&fit=crop" },
    { id: "a-olive", cat: "antipasti", name: "Olive ascolane", desc: "Olive ripiene di carne, fritte. 6 pezzi.", price: 6.5, vegan: false, stock: 30, photo: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80&auto=format&fit=crop" },

    // ── Bibite ──
    { id: "b-acqua", cat: "bibite", name: "Acqua naturale", desc: "0,75 L · Sant'Anna", price: 2.0, vegan: true, stock: 80, photo: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80&auto=format&fit=crop" },
    { id: "b-frizz", cat: "bibite", name: "Acqua frizzante", desc: "0,75 L · Sant'Anna", price: 2.0, vegan: true, stock: 70, photo: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80&auto=format&fit=crop" },
    { id: "b-birra-tropea", cat: "bibite", name: "Birra di Tropea", desc: "0,33 L · Birrificio Cinque Madonne, ambrata.", price: 5.5, vegan: true, stock: 24, photo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80&auto=format&fit=crop" },
    { id: "b-birra-blanche", cat: "bibite", name: "Blanche del Pollino", desc: "0,33 L · Birrificio Mantra, bianca al bergamotto.", price: 5.5, vegan: true, stock: 18, photo: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=600&q=80&auto=format&fit=crop" },
    { id: "b-ciro", cat: "bibite", name: "Cirò Rosso DOC", desc: "Calice · Librandi, Calabria.", price: 6.0, vegan: true, stock: 14, photo: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80&auto=format&fit=crop" },
    { id: "b-greco", cat: "bibite", name: "Greco di Bianco", desc: "Calice · vino bianco, Reggio Calabria.", price: 5.5, vegan: true, stock: 12, photo: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&q=80&auto=format&fit=crop" },
    { id: "b-cola", cat: "bibite", name: "Coca-Cola", desc: "0,33 L", price: 3.0, vegan: true, stock: 36, photo: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80&auto=format&fit=crop" },
    { id: "b-chinotto", cat: "bibite", name: "Chinotto", desc: "0,33 L · Galvanina BIO", price: 3.5, vegan: true, stock: 18, photo: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=600&q=80&auto=format&fit=crop" },

    // ── Dolci ──
    { id: "d-tartufo", cat: "dolci", name: "Tartufo di Pizzo", desc: "Gelato artigianale, cacao, nocciola. La specialità di Pizzo.", price: 5.5, vegan: false, stock: 22, featured: true, photo: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=600&q=80&auto=format&fit=crop" },
    { id: "d-cannolo", cat: "dolci", name: "Cannolo calabrese", desc: "Cialda croccante, ricotta di pecora, gocce di cioccolato, scorzette candite.", price: 5.0, vegan: false, stock: 16, photo: "https://images.unsplash.com/photo-1542124948-dc391252a940?w=600&q=80&auto=format&fit=crop" },
    { id: "d-bergamotto", cat: "dolci", name: "Crema al bergamotto", desc: "Crema fredda al bergamotto di Reggio, biscotto sbriciolato.", price: 5.5, vegan: false, stock: 14, photo: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&auto=format&fit=crop" },
  ],
};

// ─── Mock orders (factory — relative timestamps, client-computed) ────
export function getMockOrders(): Order[] {
  const now = Date.now();
  const ago = (m: number) => new Date(now - m * 60000).toISOString();
  return [
    { id: "L-2417", customer: "Salvatore Romeo", phone: "+39 348 7763211", mode: "delivery", addr: "Via Indipendenza 22, Tropea", items: [{ id: "p-tropea", qty: 1 }, { id: "p-nduja", qty: 1 }, { id: "b-birra-tropea", qty: 2 }], total: 36.5, fee: 3.5, status: "received", placed_at: ago(3), slot: "20:30" },
    { id: "L-2416", customer: "Giulia Mancini", phone: "+39 333 4422187", mode: "pickup", addr: null, items: [{ id: "p-margherita", qty: 2 }, { id: "p-bianca", qty: 1 }, { id: "b-acqua", qty: 1 }], total: 28.5, fee: 0, status: "received", placed_at: ago(7), slot: "20:45" },
    { id: "L-2415", customer: "Marco De Luca", phone: "+39 351 9988221", mode: "delivery", addr: "Via Coniugi Crigna 8, Tropea", items: [{ id: "p-diavola", qty: 1 }, { id: "p-quattro", qty: 1 }, { id: "a-fritti", qty: 1 }, { id: "b-cola", qty: 2 }], total: 40.0, fee: 3.5, status: "preparing", placed_at: ago(14), slot: "20:30" },
    { id: "L-2414", customer: "Elena Caruso", phone: "+39 320 1188204", mode: "pickup", addr: null, items: [{ id: "p-bergamotto", qty: 1 }, { id: "p-orto", qty: 1 }, { id: "b-greco", qty: 2 }], total: 34.5, fee: 0, status: "preparing", placed_at: ago(18), slot: "20:15" },
    { id: "L-2413", customer: "Davide Russo", phone: "+39 347 6630918", mode: "delivery", addr: "Lungomare A. Murat 14, Tropea", items: [{ id: "p-margherita", qty: 1 }, { id: "p-diavola", qty: 2 }, { id: "d-cannolo", qty: 3 }], total: 44.5, fee: 3.5, status: "ready", placed_at: ago(22), slot: "20:20" },
    { id: "L-2412", customer: "Sofia Aiello", phone: "+39 339 7711402", mode: "pickup", addr: null, items: [{ id: "p-sila", qty: 1 }, { id: "p-pollino", qty: 1 }], total: 23.5, fee: 0, status: "ready", placed_at: ago(28), slot: "20:00" },
    { id: "L-2411", customer: "Antonio Greco", phone: "+39 366 2241108", mode: "delivery", addr: "Via Roma 109, Tropea", items: [{ id: "p-nduja", qty: 1 }, { id: "p-margherita", qty: 1 }, { id: "b-chinotto", qty: 2 }], total: 28.0, fee: 3.5, status: "en_route", placed_at: ago(34), slot: "19:45" },
    // Completed (today)
    { id: "L-2410", customer: "Francesca Iuliano", phone: "+39 348 8810229", mode: "pickup", addr: null, items: [{ id: "p-tropea", qty: 1 }, { id: "p-bianca", qty: 1 }, { id: "b-ciro", qty: 1 }], total: 28.5, fee: 0, status: "completed", placed_at: ago(72), slot: "19:30" },
    { id: "L-2409", customer: "Luca Vetere", phone: "+39 351 4422108", mode: "delivery", addr: "Via Vespucci 33, Tropea", items: [{ id: "p-diavola", qty: 2 }, { id: "a-olive", qty: 1 }], total: 27.5, fee: 3.5, status: "completed", placed_at: ago(95), slot: "19:00" },
    { id: "L-2408", customer: "Maria Costa", phone: "+39 333 6677110", mode: "pickup", addr: null, items: [{ id: "p-funghi", qty: 1 }, { id: "p-zucca", qty: 1 }, { id: "d-tartufo", qty: 2 }], total: 37.0, fee: 0, status: "completed", placed_at: ago(140), slot: "18:30" },
  ];
}

// ─── Inventory ──────────────────────────────────────────────────────
export const INVENTORY: InventoryItem[] = [
  { id: "i-farina-0", name: "Farina tipo 0 BIO", unit: "kg", qty: 84, threshold: 30, supplier: "Mulino Coletta · Castrovillari" },
  { id: "i-farina-int", name: "Farina integrale", unit: "kg", qty: 22, threshold: 25, supplier: "Mulino Coletta · Castrovillari" },
  { id: "i-farina-semola", name: "Semola di grano duro", unit: "kg", qty: 18, threshold: 15, supplier: "Molini Riggi · Sicilia" },
  { id: "i-lievito", name: "Lievito madre", unit: "g", qty: 1240, threshold: 800, supplier: "Casa · vivo dal 2014" },
  { id: "i-pomodoro", name: "Pomodoro San Marzano DOP", unit: "kg", qty: 38, threshold: 20, supplier: "Casa Marrazzo · Nocera" },
  { id: "i-mozzarella", name: "Fior di latte", unit: "kg", qty: 16, threshold: 15, supplier: "Caseificio Artigiana · Lamezia" },
  { id: "i-bufala", name: "Mozzarella di bufala DOP", unit: "kg", qty: 8, threshold: 10, supplier: "Caseificio Vannulo · Capaccio" },
  { id: "i-stracciatella", name: "Stracciatella", unit: "kg", qty: 5, threshold: 6, supplier: "Caseificio Artigiana · Lamezia" },
  { id: "i-caciocavallo", name: "Caciocavallo silano DOP", unit: "kg", qty: 11, threshold: 8, supplier: "Az. Marrelli · Sila" },
  { id: "i-pecorino", name: "Pecorino crotonese", unit: "kg", qty: 7, threshold: 5, supplier: "Az. Tassone · Crotone" },
  { id: "i-nduja", name: "'Nduja di Spilinga IGP", unit: "kg", qty: 4.2, threshold: 4, supplier: "La Tradizione · Spilinga" },
  { id: "i-salame", name: "Salame piccante calabrese", unit: "kg", qty: 6, threshold: 5, supplier: "Salumificio Sila · Acri" },
  { id: "i-soppressata", name: "Soppressata di Calabria DOP", unit: "kg", qty: 3.5, threshold: 4, supplier: "Salumificio Sila · Acri" },
  { id: "i-cipolla", name: "Cipolla rossa di Tropea IGP", unit: "kg", qty: 14, threshold: 10, supplier: "Orto · 12 km" },
  { id: "i-bergamotto", name: "Bergamotto di Reggio", unit: "kg", qty: 5, threshold: 4, supplier: "Az. Romeo · Reggio C." },
  { id: "i-pistacchio", name: "Pistacchio di Bronte DOP", unit: "kg", qty: 2.1, threshold: 2, supplier: "Az. Granvero · Bronte" },
  { id: "i-acciughe", name: "Alici di Cetara", unit: "kg", qty: 3, threshold: 3, supplier: "Nettuno · Cetara" },
  { id: "i-funghi", name: "Funghi porcini", unit: "kg", qty: 4, threshold: 5, supplier: "Boschi · Sila" },
  { id: "i-tartufo", name: "Tartufo nero d'Aspromonte", unit: "g", qty: 180, threshold: 200, supplier: "Az. Larussa · Cittanova" },
  { id: "i-basilico", name: "Basilico fresco", unit: "mazzi", qty: 18, threshold: 12, supplier: "Orto · 12 km" },
  { id: "i-olio", name: "Olio EVO Tonda di Strongoli", unit: "L", qty: 28, threshold: 20, supplier: "Frantoio Geraci · Crotone" },
];

// ─── Mock reservations (factory — dated relative to today) ───────────
export function getMockReservations(): Reservation[] {
  const iso = (offsetDays: number) =>
    new Date(Date.now() + offsetDays * 86400000).toISOString().slice(0, 10);
  const today = iso(0);
  const tomorrow = iso(1);
  return [
    { id: "R-0184", name: "Famiglia Romeo", party: 4, date: today, time: "20:00", phone: "+39 348 7763211", notes: "Compleanno · 1 bambino di 6 anni", status: "confirmed" },
    { id: "R-0185", name: "Sergio Mantelli", party: 2, date: today, time: "20:30", phone: "+39 333 4422187", notes: "Anniversario · tavolo tranquillo se possibile", status: "confirmed" },
    { id: "R-0186", name: "Aiello + 5", party: 6, date: today, time: "21:00", phone: "+39 351 9988221", notes: "Senza glutine per 1 ospite", status: "confirmed" },
    { id: "R-0187", name: "Costa, M.", party: 3, date: today, time: "21:15", phone: "+39 320 1188204", notes: "", status: "pending" },
    { id: "R-0188", name: "Greco, A.", party: 2, date: tomorrow, time: "19:30", phone: "+39 366 2241108", notes: "Allergia frutta secca", status: "confirmed" },
    { id: "R-0189", name: "Iuliano", party: 8, date: tomorrow, time: "20:30", phone: "+39 348 8810229", notes: "Cena di squadra", status: "confirmed" },
    { id: "R-0190", name: "Vetere, L.", party: 2, date: tomorrow, time: "21:00", phone: "+39 351 4422108", notes: "", status: "pending" },
  ];
}

// ─── Photos used by hero / story / weekly sections ──────────────────
export const PIZZA_PHOTOS = {
  hero: [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=2000&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593504049359-74330189a345?w=2000&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=2000&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=2000&q=85&auto=format&fit=crop",
  ],
  weekly: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85&auto=format&fit=crop",
  story: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=1200&q=85&auto=format&fit=crop",
  oven: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1200&q=85&auto=format&fit=crop",
};

// ─── Helpers ────────────────────────────────────────────────────────
export const findMenuItem = (id: string): MenuItem | undefined =>
  MENU.items.find((i) => i.id === id);

export const formatEUR = (n: number): string =>
  `€${n.toFixed(2).replace(".", ",")}`;

export const statusLabels: Record<OrderStatus, string> = {
  received: "Ricevuto",
  preparing: "In preparazione",
  ready: "Pronto",
  en_route: "In consegna",
  completed: "Completato",
};

export const statusColors: Record<OrderStatus, { bg: string; fg: string; dot: string }> = {
  received: { bg: "bg-amber/20", fg: "text-tomato-deep", dot: "bg-tomato" },
  preparing: { bg: "bg-walnut/15", fg: "text-walnut", dot: "bg-walnut" },
  ready: { bg: "bg-olive/15", fg: "text-olive", dot: "bg-olive" },
  en_route: { bg: "bg-tomato/15", fg: "text-tomato", dot: "bg-tomato" },
  completed: { bg: "bg-ink/10", fg: "text-ink-2", dot: "bg-ink-2" },
};
