"use client";

import { useRef, useState, useEffect, useCallback, ReactNode, Children } from "react";

interface CardSwiperProps {
  children: ReactNode;
  gridClass?: string;
  /** Max tilt angle in degrees for the coverflow 3D effect. Vary this per section for a distinct feel. */
  maxAngle?: number;
}

/**
 * Real 3D "coverflow" card carousel (mobile only).
 * Each card tilts in 3D (rotateY + scale + depth) based on how far it sits
 * from the center of the viewport — the centered card stands flat and
 * sharp, cards on either side rotate away in perspective. This updates
 * continuously as you swipe, so the 3D effect never drops to a flat 2D
 * scroll. Snap-to-card + dot indicators for easy navigation.
 * On tablet/desktop (sm breakpoint+) this reverts to a normal CSS grid.
 */
export default function CardSwiper({ children, gridClass = "sm:grid-cols-2 lg:grid-cols-3", maxAngle = 22 }: CardSwiperProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);
  const rafRef = useRef<number>();

  const applyTilt = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = cardCenter - containerCenter;
      // Normalize by card width so the effect scales with card size
      const normalized = Math.max(-1, Math.min(1, distance / card.offsetWidth));
      const rotateY = normalized * maxAngle * -1;
      const scale = 1 - Math.abs(normalized) * 0.12;
      const opacity = 1 - Math.abs(normalized) * 0.35;
      const translateZ = -Math.abs(normalized) * 60;
      card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
      card.style.opacity = String(Math.max(0.5, opacity));
    });
  }, [maxAngle]);

  function handleScroll() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      applyTilt();
      const el = scrollerRef.current;
      if (!el) return;
      const cardWidth = el.scrollWidth / items.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(items.length - 1, Math.max(0, index)));
    });
  }

  useEffect(() => {
    applyTilt();
    window.addEventListener("resize", applyTilt);
    return () => window.removeEventListener("resize", applyTilt);
  }, [applyTilt]);

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / items.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className={`flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-[10vw] scrollbar-none sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:snap-none sm:grid sm:gap-6 ${gridClass}`}
        style={{ perspective: 1000 }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="shrink-0 w-[78%] snap-center sm:w-auto sm:shrink sm:!transform-none sm:!opacity-100"
            style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, opacity 0.15s ease-out" }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot indicators — mobile only */}
      <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to card ${i + 1}`}
            className="p-3 flex items-center justify-center touch-manipulation"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-gold-500" : "w-2 bg-ink/25"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
