import type { Metadata } from "next";
import { Contact } from "@/components/customer-flows";

export const metadata: Metadata = { title: "Contatti" };

export default function ContactPage() {
  return <Contact />;
}
