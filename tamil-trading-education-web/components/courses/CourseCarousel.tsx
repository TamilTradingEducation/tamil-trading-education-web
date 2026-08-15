"use client";

import { CheckCircle2 } from "lucide-react";
import ResponsiveCards from "@/components/shared/ResponsiveCards";
import CandlestickField from "@/components/shared/CandlestickField";
import type { Course } from "@/types";

/**
 * MOBILE  → 3D perspective rotator; courses swing around a central pivot.
 *            Replaces a 9-card vertical grid that was ~9 screens of scrolling.
 * DESKTOP  → clean centred 3-column grid, which is the right shape for
 *            comparing courses side by side.
 * No content removed either way — all nine courses, all outcome bullets.
 */
export default function CourseCarousel({ courses }: { courses: Course[] }) {
  const cards = courses.map((c) => (
    <div
      key={c.slug}
      className={`glass-card card-notch h-full p-5 sm:p-7 flex flex-col overflow-y-auto ${
        c.featured ? "border-gold-500/50" : ""
      }`}
    >
      <span className="tag-pill w-fit mb-3 shrink-0">
        {c.level}
        {c.featured ? " · Popular" : ""}
      </span>
      <h3 className="font-heading font-semibold text-lg sm:text-xl mb-2">{c.title}</h3>
      <p className="text-ink/55 text-sm mb-4">{c.description}</p>
      <ul className="space-y-2 mb-4">
        {c.outcomes.map((o) => (
          <li key={o} className="flex gap-2 text-sm text-ink/60">
            <CheckCircle2 className="w-4 h-4 text-up shrink-0 mt-0.5" />
            <span className="min-w-0">{o}</span>
          </li>
        ))}
      </ul>
      <a
        href="#enroll"
        className={`${c.featured ? "btn-gold" : "btn-3d"} w-full mt-auto shrink-0`}
      >
        Enroll Now
      </a>
    </div>
  ));

  return (
    <div className="relative mb-12">
      <CandlestickField count={8} maxOpacity={0.1} />
      <div className="relative">
        <ResponsiveCards
          items={cards}
          variant="rotate"
          desktopCols={3}
          ariaLabel="Forex courses"
          carouselHeightClass="h-[490px] sm:h-[450px]"
          carouselCardWidthClass="w-[88%] sm:w-[68%]"
        />
      </div>
    </div>
  );
}
