export interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  ingredients: string[]
  image: string
  category: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface RestaurantInfo {
  name: string
  tagline: string
  description: string
  address: string
  phone: string
  email: string
  hours: { days: string; time: string }[]
  social: { name: string; url: string; icon: string }[]
}

export const restaurantInfo: RestaurantInfo = {
  name: "Da Lorenzo",
  tagline: "Pizzeria & Cucina Italiana",
  description:
    "Dal 1985 portiamo in tavola l'autentica cucina italiana. Ingredienti freschi, ricette tradizionali e la passione per la buona tavola.",
  address: "Via Roma 42, 20121 Milano",
  phone: "+39 02 1234 5678",
  email: "info@dalorenzo.it",
  hours: [
    { days: "Lunedì - Venerdì", time: "12:00 - 15:00 | 19:00 - 23:00" },
    { days: "Sabato - Domenica", time: "12:00 - 16:00 | 18:30 - 23:30" },
  ],
  social: [
    { name: "Instagram", url: "#", icon: "instagram" },
    { name: "Facebook", url: "#", icon: "facebook" },
    { name: "TripAdvisor", url: "#", icon: "tripadvisor" },
  ],
}

export const categories: Category[] = [
  { id: "antipasti", name: "Antipasti", slug: "antipasti", description: "Per iniziare con gusto" },
  { id: "insalate", name: "Insalate", slug: "insalate", description: "Fresche e leggere" },
  { id: "pizze", name: "Pizze", slug: "pizze", description: "Cotte nel forno a legna" },
  { id: "paste", name: "Pasta", slug: "paste", description: "Fatta a mano ogni giorno" },
  { id: "dolci", name: "Dolci", slug: "dolci", description: "Dolcezze artigianali" },
  { id: "bevande", name: "Bevande", slug: "bevande", description: "Vini, birre e soft drink" },
]

const U = "https://images.unsplash.com"

export const heroImages = [
  `${U}/photo-1513104890138-7c749659a591?w=1600&q=85&auto=format&fit=crop`,
  `${U}/photo-1593504049359-74330189a345?w=1600&q=85&auto=format&fit=crop`,
  `${U}/photo-1565299624946-b28f40a0ae38?w=1600&q=85&auto=format&fit=crop`,
]

export const menuItems: MenuItem[] = [
  {
    id: "ant-1",
    name: "Bruschetta al Pomodoro",
    description: "Pane tostato con pomodori freschi, basilico e olio extravergine d'oliva",
    price: "€ 8.00",
    ingredients: ["Pomodori", "Basilico", "Olio EVO", "Pane casereccio"],
    image: `${U}/photo-1572695157347-f3918b70c3b5?w=600&q=85&auto=format&fit=crop`,
    category: "antipasti",
  },
  {
    id: "ant-2",
    name: "Caprese",
    description: "Mozzarella di bufala, pomodori cuore di bue e basilico fresco",
    price: "€ 10.00",
    ingredients: ["Mozzarella di bufala", "Pomodori", "Basilico", "Olio EVO"],
    image: `${U}/photo-1608897013039-887f21d8c804?w=600&q=85&auto=format&fit=crop`,
    category: "antipasti",
  },
  {
    id: "ant-3",
    name: "Calamari Fritti",
    description: "Calamari freschi impanati e fritti, serviti con salsa marinara",
    price: "€ 11.00",
    ingredients: ["Calamari", "Farina", "Limone", "Salsa marinara"],
    image: `${U}/photo-1599487488170-d11ec9c172f0?w=600&q=85&auto=format&fit=crop`,
    category: "antipasti",
  },
  {
    id: "ant-4",
    name: "Prosciutto e Melone",
    description: "Prosciutto crudo di Parma DOP con melone freschissimo",
    price: "€ 12.00",
    ingredients: ["Prosciutto crudo DOP", "Melone", "Rucola"],
    image: `${U}/photo-1604908176997-125f25cc6f3d?w=600&q=85&auto=format&fit=crop`,
    category: "antipasti",
  },
  {
    id: "ins-1",
    name: "Insalata Capricciosa",
    description: "Lattuga, pomodorini, olive, mais, tonno e uovo sodo",
    price: "€ 9.00",
    ingredients: ["Lattuga", "Pomodorini", "Olive", "Mais", "Tonno", "Uovo"],
    image: `${U}/photo-1540420773420-3366772f4999?w=600&q=85&auto=format&fit=crop`,
    category: "insalate",
  },
  {
    id: "ins-2",
    name: "Insalata Greca",
    description: "Feta, olive kalamata, cetrioli, pomodori e cipolla rossa",
    price: "€ 9.50",
    ingredients: ["Feta", "Olive kalamata", "Cetrioli", "Pomodori", "Cipolla rossa"],
    image: `${U}/photo-1529699211955-6be5b9d7020a?w=600&q=85&auto=format&fit=crop`,
    category: "insalate",
  },
  {
    id: "ins-3",
    name: "Insalata Cesare",
    description: "Lattuga romana, croutons, scaglie di parmigiano e salsa cesare",
    price: "€ 10.00",
    ingredients: ["Lattuga romana", "Croutons", "Parmigiano", "Salsa cesare"],
    image: `${U}/photo-1550304943-4f24f54ddde9?w=600&q=85&auto=format&fit=crop`,
    category: "insalate",
  },
  {
    id: "piz-1",
    name: "Margherita",
    description: "Pomodoro, mozzarella fiordilatte e basilico fresco",
    price: "€ 8.00",
    ingredients: ["Pomodoro", "Mozzarella fiordilatte", "Basilico"],
    image: `${U}/photo-1604068549290-dea0e4a305ca?w=600&q=85&auto=format&fit=crop`,
    category: "pizze",
  },
  {
    id: "piz-2",
    name: "Diavola",
    description: "Pomodoro, mozzarella, salame piccante e origano",
    price: "€ 9.50",
    ingredients: ["Pomodoro", "Mozzarella", "Salame piccante", "Origano"],
    image: `${U}/photo-1628840042765-356cda07504e?w=600&q=85&auto=format&fit=crop`,
    category: "pizze",
  },
  {
    id: "piz-3",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmigiano e taleggio",
    price: "€ 10.50",
    ingredients: ["Mozzarella", "Gorgonzola", "Parmigiano", "Taleggio"],
    image: `${U}/photo-1513104890138-7c749659a591?w=600&q=85&auto=format&fit=crop`,
    category: "pizze",
  },
  {
    id: "piz-4",
    name: "Prosciutto e Funghi",
    description: "Pomodoro, mozzarella, prosciutto cotto e funghi champignon",
    price: "€ 10.00",
    ingredients: ["Pomodoro", "Mozzarella", "Prosciutto cotto", "Funghi"],
    image: `${U}/photo-1571997478779-2adcbbe9ab2f?w=600&q=85&auto=format&fit=crop`,
    category: "pizze",
  },
  {
    id: "piz-5",
    name: "Napoletana",
    description: "Pomodoro, mozzarella, acciughe, capperi e olive",
    price: "€ 9.50",
    ingredients: ["Pomodoro", "Mozzarella", "Acciughe", "Capperi", "Olive"],
    image: `${U}/photo-1565299507177-b0ac66763828?w=600&q=85&auto=format&fit=crop`,
    category: "pizze",
  },
  {
    id: "piz-6",
    name: "Vegetariana",
    description: "Pomodoro, mozzarella, peperoni, zucchine, melanzane e olive",
    price: "€ 10.00",
    ingredients: ["Pomodoro", "Mozzarella", "Peperoni", "Zucchine", "Melanzane", "Olive"],
    image: `${U}/photo-1593504049359-74330189a345?w=600&q=85&auto=format&fit=crop`,
    category: "pizze",
  },
  {
    id: "pas-1",
    name: "Spaghetti Carbonara",
    description: "Spaghetti con uovo, guanciale, pecorino e pepe nero",
    price: "€ 12.00",
    ingredients: ["Spaghetti", "Uovo", "Guanciale", "Pecorino", "Pepe"],
    image: `${U}/photo-1612874742237-6526221588e3?w=600&q=85&auto=format&fit=crop`,
    category: "paste",
  },
  {
    id: "pas-2",
    name: "Penne all'Arrabbiata",
    description: "Penne con pomodoro, aglio, peperoncino e prezzemolo",
    price: "€ 10.00",
    ingredients: ["Penne", "Pomodoro", "Aglio", "Peperoncino", "Prezzemolo"],
    image: `${U}/photo-1621996346565-e3dbc646d9a9?w=600&q=85&auto=format&fit=crop`,
    category: "paste",
  },
  {
    id: "pas-3",
    name: "Lasagna alla Bolognese",
    description: "Lasagna con ragù alla bolognese, besciamella e parmigiano",
    price: "€ 13.00",
    ingredients: ["Pasta all'uovo", "Ragù", "Besciamella", "Parmigiano"],
    image: `${U}/photo-1574894709920-11b28e7367e3?w=600&q=85&auto=format&fit=crop`,
    category: "paste",
  },
  {
    id: "pas-4",
    name: "Trofie al Pesto",
    description: "Trofie con pesto alla genovese, patate e fagiolini",
    price: "€ 11.00",
    ingredients: ["Trofie", "Pesto", "Patate", "Fagiolini", "Parmigiano"],
    image: `${U}/photo-1473093295043-cdd812d0e601?w=600&q=85&auto=format&fit=crop`,
    category: "paste",
  },
  {
    id: "dol-1",
    name: "Tiramisù",
    description: "Il classico dolce al cucchiaio con mascarpone, caffè e cacao",
    price: "€ 7.00",
    ingredients: ["Mascarpone", "Caffè", "Savoiardi", "Cacao", "Uova"],
    image: `${U}/photo-1571877227200-a0d98ea607e9?w=600&q=85&auto=format&fit=crop`,
    category: "dolci",
  },
  {
    id: "dol-2",
    name: "Panna Cotta",
    description: "Panna cotta alla vaniglia con coulis di frutti di bosco",
    price: "€ 6.50",
    ingredients: ["Panna", "Vaniglia", "Frutti di bosco", "Zucchero"],
    image: `${U}/photo-1551024601-bec78aea704b?w=600&q=85&auto=format&fit=crop`,
    category: "dolci",
  },
  {
    id: "dol-3",
    name: "Cannoli Siciliani",
    description: "Cannoli ripieni di ricotta dolce con gocce di cioccolato",
    price: "€ 7.50",
    ingredients: ["Ricotta", "Cioccolato", "Cannolo", "Zucchero a velo", "Pistacchi"],
    image: `${U}/photo-1623065422902-30a2d299bbe4?w=600&q=85&auto=format&fit=crop`,
    category: "dolci",
  },
  {
    id: "bev-1",
    name: "Vino della Casa (Rosso/Bianco)",
    description: "Calice di vino italiano selezionato dalla nostra cantina",
    price: "€ 5.00",
    ingredients: ["Vino rosso o bianco"],
    image: `${U}/photo-1510812431401-41d2bd2722f3?w=600&q=85&auto=format&fit=crop`,
    category: "bevande",
  },
  {
    id: "bev-2",
    name: "Birra Moretti",
    description: "Birra lager italiana, 33cl",
    price: "€ 4.00",
    ingredients: ["Birra lager"],
    image: `${U}/photo-1558211582-34b16d2630a6?w=600&q=85&auto=format&fit=crop`,
    category: "bevande",
  },
  {
    id: "bev-3",
    name: "Acqua Minerale",
    description: "Acqua naturale o frizzante, 75cl",
    price: "€ 2.50",
    ingredients: ["Acqua"],
    image: `${U}/photo-1568841111683-0fab835bb06c?w=600&q=85&auto=format&fit=crop`,
    category: "bevande",
  },
  {
    id: "bev-4",
    name: "Coca-Cola",
    description: "Coca-Cola o Coca-Cola Zero, 33cl",
    price: "€ 3.00",
    ingredients: ["Coca-Cola"],
    image: `${U}/photo-1553177810-e784b193ab0c?w=600&q=85&auto=format&fit=crop`,
    category: "bevande",
  },
]

export function getItemsByCategory(slug: string): MenuItem[] {
  return menuItems.filter((item) => item.category === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export const testimonials = [
  {
    name: "Maria Rossi",
    text: "La migliore pizza fuori Napoli! L'impasto è leggero e gli ingredienti freschissimi.",
    rating: 5,
  },
  {
    name: "Giovanni Bianchi",
    text: "Atmosfera accogliente e personale gentile. I cannoli siciliani sono spettacolari!",
    rating: 5,
  },
  {
    name: "Sophie Müller",
    text: "Wir lieben dieses Restaurant! Die Pasta ist wie in Italien. Absolut empfehlenswert.",
    rating: 5,
  },
]
