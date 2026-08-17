"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import CandlestickField from "@/components/shared/CandlestickField";
import { useIsMobile } from "@/components/shared/ResponsiveCards";
import type { Course } from "@/types";

/**
 * MOBILE  → tap-to-expand 3D course list. NO horizontal swiping.
 * DESKTOP → clean centred 3-column grid, all details visible.
 *
 * Why the mobile carousel was replaced:
 * course cards are tall, so they carried `overflow-y-auto` for their outcome
 * bullets. That inner vertical scroll sat inside a horizontally-draggable
 * carousel, so a vertical finger drag was ambiguous — the browser had to
 * choose between scrolling the card and dragging the carousel, which is what
 * made scrolling feel stuck. Nesting a scroll container inside a drag
 * container is the bug; removing the horizontal drag removes it at the root
 * rather than tuning thresholds and hoping.
 *
 * The 3D quality is kept through depth instead of rotation: each row has a
 * real back-plate on the Z axis, the active row lifts toward the viewer, and
 * the detail panel unfolds around its top edge (rotateX).
 */
function CourseRow({
  course,
  isOpen,
  onToggle,
  reduced,
}: {
  course: Course;
  isOpen: boolean;
  onToggle: () => void;
  reduced: boolean;
}) {
  return (
    <div style={{ perspective: 1200 }} className="min-w-0">
      <motion.div
        animate={reduced ? undefined : { z: isOpen ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        style={{ transformStyle: "preserve-3d" }}
        className="keep-3d relative min-w-0"
      >
        <div
          aria-hidden
          className={`absolute inset-x-2 inset-y-1 rounded-xl2 border transition-colors ${
            isOpen
              ? "bg-gold-500/20 border-gold-500/40"
              : "bg-navy-600/10 border-navy-500/20"
          }`}
          style={{ transform: "translateZ(-20px)" }}
        />

        <div
          className={`keep-3d relative glass-card card-notch min-w-0 overflow-hidden ${
            course.featured ? "border-gold-500/50" : ""
          }`}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="w-full text-left p-4 flex items-start gap-3 min-w-0"
          >
            <span className="flex-grow min-w-0">
              <span className="tag-pill inline-block mb-2 text-[10px]">
                {course.level}
                {course.featured ? " · Popular" : ""}
              </span>
              <span className="block font-heading font-semibold text-base leading-snug">
                {course.title}
              </span>
            </span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 rounded-lg border border-navy-500/25 flex items-center justify-center text-ink/50 shrink-0 mt-1"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, rotateX: reduced ? 0 : -12 }}
                animate={{ height: "auto", opacity: 1, rotateX: 0 }}
                exit={{ height: 0, opacity: 0, rotateX: reduced ? 0 : -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top center", overflow: "hidden" }}
              >
                <div className="px-4 pb-4 min-w-0">
                  <p className="text-ink/55 text-sm mb-3">{course.description}</p>
                  <ul className="space-y-2 mb-4">
                    {course.outcomes.map((o) => (
                      <li key={o} className="flex gap-2 text-sm text-ink/60">
                        <CheckCircle2 className="w-4 h-4 text-up shrink-0 mt-0.5" />
                        <span className="min-w-0">{o}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#enroll"
                    className={`${course.featured ? "btn-gold" : "btn-3d"} w-full`}
                  >
                    Enroll Now
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function DesktopCard({ course }: { course: Course }) {
  return (
    <div
      className={`glass-card card-notch h-full p-6 flex flex-col min-w-0 ${
        course.featured ? "border-gold-500/50" : ""
      }`}
    >
      <span className="tag-pill w-fit mb-3">
        {course.level}
        {course.featured ? " · Popular" : ""}
      </span>
      <h3 className="font-heading font-semibold text-xl mb-2">{course.title}</h3>
      <p className="text-ink/55 text-sm mb-4">{course.description}</p>
      <ul className="space-y-2 mb-5">
        {course.outcomes.map((o) => (
          <li key={o} className="flex gap-2 text-sm text-ink/60">
            <CheckCircle2 className="w-4 h-4 text-up shrink-0 mt-0.5" />
            <span className="min-w-0">{o}</span>
          </li>
        ))}
      </ul>
      <a
        href="#enroll"
        className={`${course.featured ? "btn-gold" : "btn-3d"} w-full mt-auto`}
      >
        Enroll Now
      </a>
    </div>
  );
}

export default function CourseCarousel({ courses }: { courses: Course[] }) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion() ?? false;
  // First course open by default so the page never looks like a bare list.
  const [openSlug, setOpenSlug] = useState<string | null>(courses[0]?.slug ?? null);

  const grid = (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
      {courses.map((c) => (
        <DesktopCard key={c.slug} course={c} />
      ))}
    </div>
  );

  return (
    <div className="relative mb-12">
      <CandlestickField count={8} maxOpacity={0.1} />
      <div className="relative">
        {isMobile === null ? (
          grid
        ) : isMobile ? (
          <div className="flex flex-col gap-3 max-w-xl mx-auto">
            {courses.map((c) => (
              <CourseRow
                key={c.slug}
                course={c}
                reduced={reduced}
                isOpen={openSlug === c.slug}
                onToggle={() => setOpenSlug((cur) => (cur === c.slug ? null : c.slug))}
              />
            ))}
          </div>
        ) : (
          grid
        )}
      </div>
    </div>
  );
}
