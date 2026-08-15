"use client";

import { CheckCircle2 } from "lucide-react";
import Carousel3D from "@/components/shared/Carousel3D";
import CandlestickField from "@/components/shared/CandlestickField";
import type { Course } from "@/types";

/**
 * Section identity: 3D PERSPECTIVE ROTATOR (see Carousel3D `rotate`).
 * Courses swing around a central pivot rather than fanning sideways, so the
 * Courses page reads differently from the home page sections.
 *
 * This replaces a 9-card vertical grid — on a phone that was roughly nine
 * screens of scrolling before reaching the enrollment form. All nine courses
 * and all their outcome bullets are still here; they're now browsed
 * horizontally instead of stacked.
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
        <Carousel3D
          items={cards}
          variant="rotate"
          ariaLabel="Forex courses"
          heightClass="h-[500px] sm:h-[460px]"
          cardWidthClass="w-[88%] sm:w-[70%] md:w-[56%]"
        />
      </div>
    </div>
  );
}
