import { IntroLoader } from "@/components/kinetic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroLoader />
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bk-white)", color: "var(--bk-ink)" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
