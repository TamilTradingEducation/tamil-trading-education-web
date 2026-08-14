import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PartnerStrip from "@/components/home/PartnerStrip";
import USDTRates from "@/components/home/USDTRates";
import LiveMarketSection from "@/components/home/LiveMarketSection";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesGrid from "@/components/home/ServicesGrid";
import SuccessStories from "@/components/home/SuccessStories";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MarketPulseWall from "@/components/home/MarketPulseWall";
import CTASection from "@/components/home/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Master Forex Trading with Confidence",
  description:
    "Tamil Trading Education is a professional Forex Trading Education and Community offering structured courses, live market analysis, VIP mentorship and broker account support for beginner and professional traders.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerStrip />
      <USDTRates />
      <LiveMarketSection />
      <StatsSection />
      <WhyChooseUs />
      <ServicesGrid />
      <SuccessStories />
      <TestimonialsSection />
      <section className="section-tight py-16">
        <div className="container">
          <div className="text-center mb-10">
            <span className="eyebrow justify-center">Feel the Market</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
              Every candle tells a <span className="gold-text">story</span>
            </h2>
          </div>
          <MarketPulseWall />
        </div>
      </section>
      <CTASection />
    </>
  );
}
