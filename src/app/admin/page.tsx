import type { Metadata } from "next";
import { AdminApp } from "@/components/admin";

export const metadata: Metadata = { title: "Admin · Pannello di gestione" };

export default function AdminPage() {
  return <AdminApp />;
}
