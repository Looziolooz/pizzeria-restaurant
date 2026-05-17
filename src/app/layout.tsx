import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider, OrdersProvider } from "@/lib/store"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Da Lorenzo | Pizzeria & Cucina Calabrese a Milano",
  description:
    "Pizza calabrese a lievito madre a Milano. Ordina online con delivery o asporto. Prenota un tavolo.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand text-ink font-sans">
        <CartProvider>
          <OrdersProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </OrdersProvider>
        </CartProvider>
      </body>
    </html>
  )
}
