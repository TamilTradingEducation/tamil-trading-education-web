import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import TickerTape from "@/components/market/TickerTape";
import { organizationSchema } from "@/lib/seo";
import { site } from "@/lib/data";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: "Tamil Trading Education | Master Forex Trading with Confidence",
  description:
    "Tamil Trading Education is a professional Forex Trading Education and Community offering structured courses, live market analysis, VIP mentorship and broker account support.",
  keywords: [
    "Forex trading course Tamil Nadu",
    "Forex trading education India",
    "learn forex trading",
    "technical analysis course",
    "trading community India",
    "VIP trading community",
    "risk management course",
  ],
  robots: { index: true, follow: true },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <TickerTape />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
