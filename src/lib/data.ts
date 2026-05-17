import type { ShopInfo, Category, MenuItem, InventoryItem, Reservation, PhotoCollection, Order, OrderStatus } from "./types"

const U = "https://images.unsplash.com"

export const SHOP: ShopInfo = {
  name: "Da Lorenzo",
  tagline: "Pizza calabrese a lievito madre",
  city: "Milano",
  region: "Calabria",
  address: "Via Roma 42, 20121 Milano",
  phone: "+39 02 1234 5678",
  email: "info@dalorenzo.it",
  vat: "P.IVA 01234567890",
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
}

export const MENU_CATEGORIES: Category[] = [
  { id: "classiche", label: "Classiche", sub: "Le pizze di sempre, fatte come si deve." },
  { id: "calabresi", label: "Calabresi", sub: "Topping della nostra terra: 'nduja, cipolla di Tropea, caciocavallo." },
  { id: "stagionali", label: "Stagionali", sub: "Cambiamo con l'orto: oggi è autunno." },
  { id: "bianche", label: "Bianche", sub: "Senza pomodoro. Mozzarella, ricotta, verdure." },
  { id: "vegane", label: "Vegane", sub: "Senza prodotti animali. Sempre buona." },
  { id: "antipasti", label: "Antipasti", sub: "Per iniziare. Da condividere." },
  { id: "bibite", label: "Bibite", sub: "Birra artigianale, vini calabresi, soft drinks." },
  { id: "dolci", label: "Dolci", sub: "Tradizione calabrese." },
]

export const MENU_ITEMS: MenuItem[] = [
  { id: "p-margherita", cat: "classiche", name: "Margherita", desc: "Pomodoro San Marzano DOP, fior di latte, basilico, olio EVO.", price: 8.50, vegan: false, stock: 24, photo: `${U}/photo-1604068549290-dea0e4a305ca?w=600&q=80&auto=format&fit=crop` },
  { id: "p-marinara", cat: "classiche", name: "Marinara", desc: "Pomodoro, aglio, origano, olio EVO. Senza mozzarella.", price: 7.00, vegan: true, stock: 30, photo: `${U}/photo-1565299507177-b0ac66763828?w=600&q=80&auto=format&fit=crop` },
  { id: "p-diavola", cat: "classiche", name: "Diavola", desc: "Pomodoro, fior di latte, salame piccante calabrese, olio EVO.", price: 10.50, vegan: false, stock: 18, photo: `${U}/photo-1628840042765-356cda07504e?w=600&q=80&auto=format&fit=crop` },
  { id: "p-quattro", cat: "classiche", name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, caciocavallo silano DOP, parmigiano 24 mesi.", price: 11.50, vegan: false, stock: 14 },
  { id: "p-nduja", cat: "calabresi", name: "'Nduja di Spilinga", desc: "Pomodoro, fior di latte, 'nduja, cipolla di Tropea, miele di castagno.", price: 12.50, vegan: false, stock: 16, featured: true, photo: `${U}/photo-1604382354936-07c5d9983bd3?w=600&q=80&auto=format&fit=crop` },
  { id: "p-tropea", cat: "calabresi", name: "Tropea", desc: "Pomodoro, mozzarella di bufala, cipolla rossa di Tropea IGP, alici di Cetara, capperi.", price: 13.00, vegan: false, stock: 12, photo: `${U}/photo-1571997478779-2adcbbe9ab2f?w=600&q=80&auto=format&fit=crop` },
  { id: "p-pollino", cat: "calabresi", name: "Pollino", desc: "Crema di funghi porcini, caciocavallo silano, soppressata, rosmarino.", price: 12.00, vegan: false, stock: 10 },
  { id: "p-sila", cat: "calabresi", name: "Sila", desc: "Crema di patate della Sila, pecorino crotonese, pancetta, peperoncino.", price: 11.50, vegan: false, stock: 15 },
  { id: "p-bergamotto", cat: "calabresi", name: "Bergamotto", desc: "Bianca con stracciatella, scorza di bergamotto di Reggio, pistacchio, pepe rosa.", price: 13.50, vegan: false, stock: 8, featured: true, photo: `${U}/photo-1593504049359-74330189a345?w=600&q=80&auto=format&fit=crop` },
  { id: "p-zucca", cat: "stagionali", name: "Zucca & Salsiccia", desc: "Crema di zucca, salsiccia di Pollino, scaglie di pecorino, semi di zucca.", price: 12.00, vegan: false, stock: 14 },
  { id: "p-cavolo", cat: "stagionali", name: "Cavolo Nero", desc: "Bianca con cavolo nero, mozzarella, acciughe, briciole di pane.", price: 11.00, vegan: false, stock: 11 },
  { id: "p-funghi", cat: "stagionali", name: "Bosco d'Aspromonte", desc: "Fior di latte, mix di funghi, tartufo nero d'Aspromonte, prezzemolo.", price: 14.00, vegan: false, stock: 9, photo: `${U}/photo-1513104890138-7c749659a591?w=600&q=80&auto=format&fit=crop` },
  { id: "p-bianca", cat: "bianche", name: "Bianca Classica", desc: "Mozzarella, ricotta di pecora, olio EVO, pepe.", price: 9.50, vegan: false, stock: 20 },
  { id: "p-mortadella", cat: "bianche", name: "Mortadella & Pistacchio", desc: "Bianca, stracciatella, mortadella, pistacchio di Bronte, scorza di limone.", price: 12.50, vegan: false, stock: 10 },
  { id: "p-orto", cat: "vegane", name: "Orto di Calabria", desc: "Pomodoro, verdure di stagione grigliate, olive nere di Gerace, origano.", price: 10.00, vegan: true, stock: 16 },
  { id: "p-bufala", cat: "vegane", name: "Pomodorino Vesuvio", desc: "Pomodorini gialli e rossi, basilico, capperi, origano. Senza mozzarella.", price: 9.50, vegan: true, stock: 18 },
  { id: "a-fritti", cat: "antipasti", name: "Fritti misti", desc: "Crocché, supplì, fiori di zucca, panzerotti. Per 2 persone.", price: 9.00, vegan: false, stock: 22 },
  { id: "a-tagliere", cat: "antipasti", name: "Tagliere calabrese", desc: "Salame piccante, 'nduja, caciocavallo silano, pane di Cutro.", price: 14.00, vegan: false, stock: 12 },
  { id: "a-burrata", cat: "antipasti", name: "Burrata e alici", desc: "Burrata pugliese, alici di Cetara, pomodorini confit, pane casereccio.", price: 11.00, vegan: false, stock: 9 },
  { id: "a-olive", cat: "antipasti", name: "Olive ascolane", desc: "Olive ripiene di carne, fritte. 6 pezzi.", price: 6.50, vegan: false, stock: 30 },
  { id: "b-acqua", cat: "bibite", name: "Acqua naturale", desc: "0,75 L · Sant'Anna", price: 2.00, vegan: true, stock: 80 },
  { id: "b-frizz", cat: "bibite", name: "Acqua frizzante", desc: "0,75 L · Sant'Anna", price: 2.00, vegan: true, stock: 70 },
  { id: "b-birra-tropea", cat: "bibite", name: "Birra di Tropea", desc: "0,33 L · Birrificio Cinque Madonne, ambrata.", price: 5.50, vegan: true, stock: 24 },
  { id: "b-birra-blanche", cat: "bibite", name: "Blanche del Pollino", desc: "0,33 L · Birrificio Mantra, bianca al bergamotto.", price: 5.50, vegan: true, stock: 18 },
  { id: "b-cirò", cat: "bibite", name: "Cirò Rosso DOC", desc: "Calice · Librandi, Calabria.", price: 6.00, vegan: true, stock: 14 },
  { id: "b-greco", cat: "bibite", name: "Greco di Bianco", desc: "Calice · vino bianco, Reggio Calabria.", price: 5.50, vegan: true, stock: 12 },
  { id: "b-cola", cat: "bibite", name: "Coca-Cola", desc: "0,33 L", price: 3.00, vegan: true, stock: 36 },
  { id: "b-chinotto", cat: "bibite", name: "Chinotto", desc: "0,33 L · Galvanina BIO", price: 3.50, vegan: true, stock: 18 },
  { id: "d-tartufo", cat: "dolci", name: "Tartufo di Pizzo", desc: "Gelato artigianale, cacao, nocciola. La specialità di Pizzo.", price: 5.50, vegan: false, stock: 22, featured: true },
  { id: "d-cannolo", cat: "dolci", name: "Cannolo calabrese", desc: "Cialda croccante, ricotta di pecora, gocce di cioccolato, scorzette candite.", price: 5.00, vegan: false, stock: 16 },
  { id: "d-bergamotto", cat: "dolci", name: "Crema al bergamotto", desc: "Crema fredda al bergamotto di Reggio, biscotto sbriciolato.", price: 5.50, vegan: false, stock: 14 },
]

const _now = Date.now()
const _ago = (m: number) => new Date(_now - m * 60000).toISOString()

export const MOCK_ORDERS: Order[] = [
  { id: "L-2417", customer: "Salvatore Romeo", phone: "+39 348 7763211", mode: "delivery", addr: "Via Indipendenza 22, Milano", items: [{ id: "p-tropea", qty: 1 }, { id: "p-nduja", qty: 1 }, { id: "b-birra-tropea", qty: 2 }], subtotal: 36.50, fee: 3.50, total: 40.00, status: "received", placed_at: _ago(3), slot: "20:30", payment: "card" },
  { id: "L-2416", customer: "Giulia Mancini", phone: "+39 333 4422187", mode: "pickup", addr: null, items: [{ id: "p-margherita", qty: 2 }, { id: "p-bianca", qty: 1 }, { id: "b-acqua", qty: 1 }], subtotal: 28.50, fee: 0, total: 28.50, status: "received", placed_at: _ago(7), slot: "20:45", payment: "cash" },
  { id: "L-2415", customer: "Marco De Luca", phone: "+39 351 9988221", mode: "delivery", addr: "Via Coniugi Crigna 8, Milano", items: [{ id: "p-diavola", qty: 1 }, { id: "p-quattro", qty: 1 }, { id: "a-fritti", qty: 1 }, { id: "b-cola", qty: 2 }], subtotal: 40.00, fee: 3.50, total: 43.50, status: "preparing", placed_at: _ago(14), slot: "20:30", payment: "card" },
  { id: "L-2414", customer: "Elena Caruso", phone: "+39 320 1188204", mode: "pickup", addr: null, items: [{ id: "p-bergamotto", qty: 1 }, { id: "p-orto", qty: 1 }, { id: "b-greco", qty: 2 }], subtotal: 34.50, fee: 0, total: 34.50, status: "preparing", placed_at: _ago(18), slot: "20:15", payment: "paypal" },
  { id: "L-2413", customer: "Davide Russo", phone: "+39 347 6630918", mode: "delivery", addr: "Lungomare A. Murat 14, Milano", items: [{ id: "p-margherita", qty: 1 }, { id: "p-diavola", qty: 2 }, { id: "d-cannolo", qty: 3 }], subtotal: 44.50, fee: 3.50, total: 48.00, status: "ready", placed_at: _ago(22), slot: "20:20", payment: "card" },
  { id: "L-2412", customer: "Sofia Aiello", phone: "+39 339 7711402", mode: "pickup", addr: null, items: [{ id: "p-sila", qty: 1 }, { id: "p-pollino", qty: 1 }], subtotal: 23.50, fee: 0, total: 23.50, status: "ready", placed_at: _ago(28), slot: "20:00", payment: "card" },
  { id: "L-2411", customer: "Antonio Greco", phone: "+39 366 2241108", mode: "delivery", addr: "Via Roma 109, Milano", items: [{ id: "p-nduja", qty: 1 }, { id: "p-margherita", qty: 1 }, { id: "b-chinotto", qty: 2 }], subtotal: 28.00, fee: 3.50, total: 31.50, status: "en_route", placed_at: _ago(34), slot: "19:45", payment: "card" },
  { id: "L-2410", customer: "Francesca Iuliano", phone: "+39 348 8810229", mode: "pickup", addr: null, items: [{ id: "p-tropea", qty: 1 }, { id: "p-bianca", qty: 1 }, { id: "b-cirò", qty: 1 }], subtotal: 28.50, fee: 0, total: 28.50, status: "completed", placed_at: _ago(72), slot: "19:30", payment: "cash" },
  { id: "L-2409", customer: "Luca Vetere", phone: "+39 351 4422108", mode: "delivery", addr: "Via Vespucci 33, Milano", items: [{ id: "p-diavola", qty: 2 }, { id: "a-olive", qty: 1 }], subtotal: 27.50, fee: 3.50, total: 31.00, status: "completed", placed_at: _ago(95), slot: "19:00", payment: "card" },
  { id: "L-2408", customer: "Maria Costa", phone: "+39 333 6677110", mode: "pickup", addr: null, items: [{ id: "p-funghi", qty: 1 }, { id: "p-zucca", qty: 1 }, { id: "d-tartufo", qty: 2 }], subtotal: 37.00, fee: 0, total: 37.00, status: "completed", placed_at: _ago(140), slot: "18:30", payment: "paypal" },
]

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
]

export const MOCK_RESERVATIONS: Reservation[] = [
  { id: "R-0184", name: "Famiglia Romeo", party: 4, date: "2026-05-16", time: "20:00", phone: "+39 348 7763211", notes: "Compleanno · 1 bambino di 6 anni", status: "confirmed" },
  { id: "R-0185", name: "Sergio Mantelli", party: 2, date: "2026-05-16", time: "20:30", phone: "+39 333 4422187", notes: "Anniversario · tavolo tranquillo se possibile", status: "confirmed" },
  { id: "R-0186", name: "Aiello + 5", party: 6, date: "2026-05-16", time: "21:00", phone: "+39 351 9988221", notes: "Senza glutine per 1 ospite", status: "confirmed" },
  { id: "R-0187", name: "Costa, M.", party: 3, date: "2026-05-16", time: "21:15", phone: "+39 320 1188204", notes: "", status: "pending" },
  { id: "R-0188", name: "Greco, A.", party: 2, date: "2026-05-17", time: "19:30", phone: "+39 366 2241108", notes: "Allergia frutta secca", status: "confirmed" },
  { id: "R-0189", name: "Iuliano", party: 8, date: "2026-05-17", time: "20:30", phone: "+39 348 8810229", notes: "Cena di squadra", status: "confirmed" },
  { id: "R-0190", name: "Vetere, L.", party: 2, date: "2026-05-17", time: "21:00", phone: "+39 351 4422108", notes: "", status: "pending" },
]

export const PIZZA_PHOTOS: PhotoCollection = {
  hero: [
    `${U}/photo-1513104890138-7c749659a591?w=2000&q=85&auto=format&fit=crop`,
    `${U}/photo-1593504049359-74330189a345?w=2000&q=85&auto=format&fit=crop`,
    `${U}/photo-1571997478779-2adcbbe9ab2f?w=2000&q=85&auto=format&fit=crop`,
    `${U}/photo-1604382354936-07c5d9983bd3?w=2000&q=85&auto=format&fit=crop`,
  ],
  weekly: `${U}/photo-1565299624946-b28f40a0ae38?w=1200&q=85&auto=format&fit=crop`,
  story: `${U}/photo-1579027989536-b7b1f875659b?w=1200&q=85&auto=format&fit=crop`,
  oven: `${U}/photo-1592861956120-e524fc739696?w=1200&q=85&auto=format&fit=crop`,
}

export function findMenuItem(id: string): MenuItem | undefined {
  return MENU_ITEMS.find(i => i.id === id)
}

export function getItemsByCategory(catId: string): MenuItem[] {
  return MENU_ITEMS.filter(i => i.cat === catId)
}

export function formatEUR(n: number): string {
  return `€${n.toFixed(2).replace(".", ",")}`
}
