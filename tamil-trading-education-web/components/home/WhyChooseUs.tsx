"use client";

import { GraduationCap, Radio, Users, HeartHandshake, BookOpenCheck, LifeBuoy } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import ResponsiveCards from "@/components/shared/ResponsiveCards";
import CandlestickField from "@/components/shared/CandlestickField";

const reasons = [
  {
    icon: GraduationCap,
    title: "Professional Mentors",
    description:
      "Learn from mentors with genuine trading floor experience — not recycled course scripts bought off the internet.",
  },
  {
    icon: Radio,
    title: "Live Market Analysis",
    description:
      "Daily walkthroughs of real, live market conditions across forex, XAUUSD gold and indices — as they happen.",
  },
  {
    icon: Users,
    title: "Premium Community",
    description:
      "An active, respectful space of serious traders built around accountability, shared ideas and steady growth.",
  },
  {
    icon: BookOpenCheck,
    title: "Beginner Friendly",
    description:
      "No prior experience required. Our curriculum starts from absolute zero and builds one skill at a time.",
  },
  {
    icon: HeartHandshake,
    title: "Practical Learning",
    description:
      "Real charts and live examples, not theory slides — you learn by reading the same charts you'll trade.",
  },
  {
    icon: LifeBuoy,
    title: "Long-Term Support",
    description:
      "Mentorship and community access continue well beyond course completion — not a one-off class and goodbye.",
  },
];

/**
 * MOBILE  → 3D coverflow carousel (neighbours fan out and rotate away).
 * DESKTOP  → clean centred 3-column grid, no carousel, no 3D rotation.
 * Handled by ResponsiveCards, which branches in JS so desktop never mounts
 * the carousel at all.
 */
export default function WhyChooseUs() {
  const cards = reasons.map((r) => (
    <div
      key={r.title}
      className="glass-card card-notch h-full p-6 sm:p-8 flex flex-col justify-center border border-navy-500/25"
    >
      <div className="w-14 h-14 rounded-xl2 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-5">
        <r.icon className="w-7 h-7" />
      </div>
      <h3 className="font-heading font-semibold text-xl sm:text-2xl mb-3">{r.title}</h3>
      <p className="text-ink/55 text-sm sm:text-base leading-relaxed">{r.description}</p>
    </div>
  ));

  return (
    <section className="section relative overflow-x-clip">
      <CandlestickField count={10} maxOpacity={0.13} />
      <div className="container relative">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              Built for traders who are <span className="gold-text">serious about the craft</span>
            </>
          }
          center
        />
        <ResponsiveCards
          items={cards}
          variant="coverflow"
          desktopCols={3}
          ariaLabel="Why choose us"
          carouselHeightClass="h-[330px]"
          carouselCardWidthClass="w-[86%] sm:w-[64%]"
        />
      </div>
    </section>
  );
}
