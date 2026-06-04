import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Cursor } from "@/components/kinetic";

export const metadata: Metadata = {
  title: {
    default: "Lievita — Pizzeria a Tropea",
    template: "%s · Lievita",
  },
  description:
    "Lievita: pizza calabrese a lievito madre. Ordina online con delivery o asporto. Prenota un tavolo a Tropea.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <StoreProvider>
          <Cursor />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
