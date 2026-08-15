"use client";

import { GraduationCap, Radio, Users, HeartHandshake, BookOpenCheck, LifeBuoy } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Carousel3D from "@/components/shared/Carousel3D";
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
 * Section identity: 3D COVERFLOW carousel (see Carousel3D `coverflow`).
 * Neighbour cards fan out and rotate away on the Y axis. Replaces the old
 * 6-box vertical grid, which was a major contributor to mobile scroll length.
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
        <Carousel3D
          items={cards}
          variant="coverflow"
          ariaLabel="Why choose us"
          heightClass="h-[340px] sm:h-[320px]"
          cardWidthClass="w-[86%] sm:w-[70%] md:w-[58%]"
        />
      </div>
    </section>
  );
}
