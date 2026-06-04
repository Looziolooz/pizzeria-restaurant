import type { Metadata } from "next";
import { Confirmation } from "@/components/customer-flows";

export const metadata: Metadata = { title: "Ordine confermato" };

export default function ConfirmPage({ params }: { params: { orderId: string } }) {
  return <Confirmation orderId={decodeURIComponent(params.orderId)} />;
}
