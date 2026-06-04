import type { Metadata } from "next";
import { Checkout } from "@/components/customer-flows";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <Checkout />;
}
