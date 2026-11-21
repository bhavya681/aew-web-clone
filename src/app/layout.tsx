import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/layout/AppProviders";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchModal from "@/components/layout/SearchModal";
import CartDrawer from "@/components/layout/CartDrawer";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display-source",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-source",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aew.example.com"),
  title: {
    default: "AEW — All Elite Wrestling | The Universe Is Watching",
    template: "%s | AEW",
  },
  description:
    "Explore AEW news, roster, championships, events, videos, match results, rankings, and the official AEW collection.",
  openGraph: {
    type: "website",
    siteName: "AEW — All Elite Wrestling",
    title: "AEW — All Elite Wrestling | The Universe Is Watching",
    description: "All Elite. All In. Your home for Dynamite, Collision, ROH, and the biggest matches in wrestling.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink text-cream">
        <AppProviders>
          <Navbar />
          <SearchModal />
          <CartDrawer />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
