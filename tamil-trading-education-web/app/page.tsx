import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PartnerStrip from "@/components/home/PartnerStrip";
import USDTRates from "@/components/home/USDTRates";
import LiveMarketSection from "@/components/home/LiveMarketSection";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesGrid from "@/components/home/ServicesGrid";
import MarketUpdatesSection from "@/components/home/MarketUpdatesSection";
import SuccessStories from "@/components/home/SuccessStories";
import CourseHighlights from "@/components/home/CourseHighlights";
import TestimonialsSection from "@/components/home/TestimonialsSection";
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
      <MarketUpdatesSection />
      <SuccessStories />
      <CourseHighlights />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
