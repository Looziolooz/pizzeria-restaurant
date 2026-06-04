import type { Metadata } from "next";
import { Reservation } from "@/components/customer-flows";

export const metadata: Metadata = { title: "Prenota un tavolo" };

export default function ReservePage() {
  return <Reservation />;
}
