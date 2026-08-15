"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { motion, PanInfo, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Carousel3DVariant = "coverflow" | "deck" | "rotate" | "panel";

interface Carousel3DProps {
  items: ReactNode[];
  /** Distinct 3D personality per section — see VARIANTS below. */
  variant?: Carousel3DVariant;
  /** Height of the stage. Cards fill it. Tailwind classes. */
  heightClass?: string;
  /** Width of the active card relative to the stage. Tailwind classes. */
  cardWidthClass?: string;
  ariaLabel?: string;
  className?: string;
}

/**
 * VARIANTS — each section gets a visually distinct 3D interaction while
 * sharing one implementation (see the "systematic refactor" requirement).
 *
 *  coverflow — neighbours fan out sideways and rotate away on the Y axis.
 *  deck      — cards stack front-to-back with a slight roll; depth via Z.
 *  rotate    — cards swing around a central pivot on the Y axis.
 *  panel     — flat-ish floating panels sliding on X with a soft X-axis tilt.
 *
 * All four are pure GPU transforms (translate3d / rotateX / rotateY / scale /
 * opacity) — no width, height, top or left animation — so nothing triggers
 * layout recalculation while swiping.
 */
function transformFor(
  variant: Carousel3DVariant,
  offset: number,
  reduced: boolean
) {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);

  if (reduced) {
    return {
      x: `${offset * 100}%`,
      rotateY: 0,
      rotateX: 0,
      rotateZ: 0,
      z: 0,
      scale: 1,
      opacity: abs === 0 ? 1 : 0,
      zIndex: 10 - abs,
    };
  }

  switch (variant) {
    case "deck":
      return {
        x: `${dir * Math.min(abs, 3) * 9}%`,
        y: Math.min(abs, 3) * -12,
        rotateY: 0,
        rotateX: 0,
        rotateZ: dir * Math.min(abs, 3) * 3,
        z: -Math.min(abs, 3) * 70,
        scale: 1 - Math.min(abs, 3) * 0.06,
        opacity: abs > 2 ? 0 : 1 - abs * 0.22,
        zIndex: 10 - abs,
      };
    case "rotate":
      return {
        x: `${offset * 52}%`,
        y: abs * 8,
        rotateY: offset * -42,
        rotateX: 0,
        rotateZ: 0,
        z: -abs * 130,
        scale: abs === 0 ? 1 : 0.8,
        opacity: abs > 1 ? 0 : abs === 0 ? 1 : 0.5,
        zIndex: 10 - abs,
      };
    case "panel":
      return {
        x: `${offset * 88}%`,
        y: 0,
        rotateY: offset * -8,
        rotateX: abs * 6,
        rotateZ: 0,
        z: -abs * 60,
        scale: abs === 0 ? 1 : 0.9,
        opacity: abs > 1 ? 0 : abs === 0 ? 1 : 0.55,
        zIndex: 10 - abs,
      };
    case "coverflow":
    default:
      return {
        x: `${offset * 60}%`,
        y: 0,
        rotateY: offset * -30,
        rotateX: 0,
        rotateZ: 0,
        z: -abs * 110,
        scale: abs === 0 ? 1 : 0.82,
        opacity: abs > 1 ? 0 : abs === 0 ? 1 : 0.42,
        zIndex: 10 - abs,
      };
  }
}

export default function Carousel3D({
  items,
  variant = "coverflow",
  heightClass = "h-[420px] sm:h-[380px]",
  cardWidthClass = "w-full sm:w-[80%] md:w-[68%]",
  ariaLabel = "Carousel",
  className = "",
}: Carousel3DProps) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const count = items.length;

  const go = useCallback(
    (delta: number) => {
      setActive((i) => {
        const next = i + delta;
        if (next < 0) return 0;
        if (next > count - 1) return count - 1;
        return next;
      });
    },
    [count]
  );

  function onDragEnd(_: unknown, info: PanInfo) {
    // Velocity is factored in so a quick flick advances even on a short drag.
    const power = info.offset.x + info.velocity.x * 0.12;
    if (power < -55) go(1);
    else if (power > 55) go(-1);
  }

  // Keyboard support (accessibility requirement) — only when the stage or
  // something inside it holds focus, so arrow keys still scroll the page
  // normally everywhere else.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className={`relative ${className}`}>
      {/* overflow-x-clip contains the fanned-out neighbour cards so they can
          never create horizontal page overflow on a phone. */}
      <div className="overflow-x-clip -mx-4 px-4 sm:mx-0 sm:px-0">
        <div style={{ perspective: 1500 }}>
          <div
            ref={stageRef}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label={ariaLabel}
            className={`keep-3d relative mx-auto max-w-3xl outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 rounded-xl2 ${heightClass}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item, i) => {
              const offset = i - active;
              const isActive = offset === 0;
              const t = transformFor(variant, offset, reduced);
              return (
                <motion.div
                  key={`${uid}-${i}`}
                  drag={isActive ? "x" : false}
                  dragDirectionLock
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.55}
                  onDragEnd={onDragEnd}
                  animate={t}
                  transition={
                    reduced
                      ? { duration: 0.15 }
                      : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }
                  }
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                    pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
                  }}
                  aria-hidden={!isActive}
                  className={`keep-3d absolute inset-y-0 left-1/2 -translate-x-1/2 ${cardWidthClass} touch-pan-y ${
                    isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!isActive && Math.abs(offset) === 1) go(offset);
                  }}
                >
                  {item}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous"
          className="w-10 h-10 rounded-full border border-navy-500/25 flex items-center justify-center text-ink/60 enabled:hover:border-gold-500 enabled:hover:text-gold-700 transition-colors disabled:opacity-30 shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[55vw]">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to item ${i + 1} of ${count}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-gold-500" : "w-2.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={active === count - 1}
          aria-label="Next"
          className="w-10 h-10 rounded-full border border-navy-500/25 flex items-center justify-center text-ink/60 enabled:hover:border-gold-500 enabled:hover:text-gold-700 transition-colors disabled:opacity-30 shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-[11px] text-ink/40 mt-3 font-mono">
        {active + 1} / {count} · swipe or drag
      </p>
    </div>
  );
}
