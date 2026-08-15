"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Carousel3D, { Carousel3DVariant } from "@/components/shared/Carousel3D";

/** Single source of truth for the mobile/desktop split across the whole site. */
export const MOBILE_BREAKPOINT = 1024; // matches Tailwind `lg`

/**
 * Returns true below the lg breakpoint. Starts as `null` until mounted so
 * we never render the wrong layout during hydration.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return isMobile;
}

interface ResponsiveCardsProps {
  items: ReactNode[];
  /** 3D personality used on mobile only. */
  variant?: Carousel3DVariant;
  /** Desktop grid columns at lg and xl. */
  desktopCols?: 2 | 3 | 4;
  carouselHeightClass?: string;
  carouselCardWidthClass?: string;
  ariaLabel?: string;
  /** Emphasise one card on desktop (e.g. a recommended pricing plan). */
  emphasisIndex?: number;
}

const COL_CLASSES: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-2 xl:grid-cols-3",
  4: "lg:grid-cols-2 xl:grid-cols-4",
};

/**
 * THE RESPONSIVE CARD SYSTEM.
 *
 * Mobile  (< 1024px) → 3D swipe carousel, one active card centred.
 * Desktop (>= 1024px) → clean, centred, equal-height grid. No carousel, no
 *                        drag handlers, no per-frame 3D transforms.
 *
 * Why a JS breakpoint rather than CSS `hidden lg:block` on both layouts:
 * with the CSS approach BOTH trees mount, so desktop would still be running
 * the carousel's drag listeners, spring animations and re-renders invisibly.
 * Branching in JS means desktop never mounts the carousel at all — that's the
 * performance requirement, met at the architecture level rather than patched.
 *
 * Desktop entrance animation is a one-shot fade/lift (and is skipped entirely
 * under prefers-reduced-motion), so nothing keeps animating after it settles.
 */
export default function ResponsiveCards({
  items,
  variant = "coverflow",
  desktopCols = 3,
  carouselHeightClass = "h-[340px] sm:h-[320px]",
  carouselCardWidthClass = "w-[86%] sm:w-[68%]",
  ariaLabel = "Cards",
  emphasisIndex,
}: ResponsiveCardsProps) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion() ?? false;

  // Pre-hydration: render the grid markup (no JS-dependent behaviour) so
  // there's never a flash of the wrong layout or a hydration mismatch.
  if (isMobile === null) {
    return (
      <div className={`grid grid-cols-1 ${COL_CLASSES[desktopCols]} gap-6 max-w-6xl mx-auto`}>
        {items.map((item, i) => (
          <div key={i} className="min-w-0">
            {item}
          </div>
        ))}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Carousel3D
        items={items}
        variant={variant}
        ariaLabel={ariaLabel}
        heightClass={carouselHeightClass}
        cardWidthClass={carouselCardWidthClass}
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 ${COL_CLASSES[desktopCols]} gap-6 max-w-6xl mx-auto items-stretch`}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % desktopCols) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`min-w-0 h-full ${
            emphasisIndex === i ? "xl:-mt-4 xl:mb-4" : ""
          }`}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
