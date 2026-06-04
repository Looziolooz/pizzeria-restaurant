import type { Metadata } from "next";
import { MenuScreen } from "@/components/customer-flows";

export const metadata: Metadata = { title: "Menù & Ordina" };

export default function MenuPage() {
  return <MenuScreen />;
}
