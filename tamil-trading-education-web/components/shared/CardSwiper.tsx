"use client";

import { useRef, useState, ReactNode, Children } from "react";

interface CardSwiperProps {
  children: ReactNode;
  gridClass?: string;
}

/**
 * On mobile: a horizontal, swipeable, snap-to-card carousel with dot
 * indicators — replaces a tall single-column stack so the page doesn't
 * scroll forever.
 * On tablet/desktop (sm breakpoint and up): reverts to a normal CSS grid
 * (pass the same grid classes you'd normally use via `gridClass`).
 */
export default function CardSwiper({ children, gridClass = "sm:grid-cols-2 lg:grid-cols-3" }: CardSwiperProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / items.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActive(Math.min(items.length - 1, Math.max(0, index)));
  }

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
        className={`flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 scrollbar-none sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:snap-none sm:grid sm:gap-6 ${gridClass}`}
      >
        {items.map((child, i) => (
          <div key={i} className="shrink-0 w-[80%] snap-center sm:w-auto sm:shrink">
            {child}
          </div>
        ))}
      </div>

      {/* Dot indicators — mobile only */}
      <div className="flex sm:hidden items-center justify-center gap-1 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to card ${i + 1}`}
            className="p-2.5 -m-1 flex items-center justify-center touch-manipulation"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-gold-500" : "w-1.5 bg-ink/25"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
