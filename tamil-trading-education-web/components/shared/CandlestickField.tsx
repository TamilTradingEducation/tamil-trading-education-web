"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * A candle is [bodyTop, bodyBottom, wickTop, wickBottom, bullish]
 * measured in an arbitrary 0-100 price scale (0 = top of the box).
 */
type Candle = [number, number, number, number, boolean];

/**
 * Real, named candlestick formations — drawn geometrically rather than
 * pasted as a flat reference image, so they scale crisply and can be
 * transformed in 3D space individually.
 */
const PATTERNS: Record<string, Candle[]> = {
  Doji: [[48, 52, 20, 80, true]],
  Hammer: [[25, 38, 20, 85, true]],
  "Hanging Man": [[25, 38, 20, 85, false]],
  "Gravestone Doji": [[70, 74, 20, 78, false]],
  "Dragonfly Doji": [[26, 30, 22, 80, true]],
  "Bullish Marubozu": [[22, 78, 22, 78, true]],
  "Bearish Marubozu": [[22, 78, 22, 78, false]],
  "Bullish Engulfing": [
    [40, 60, 32, 68, false],
    [26, 76, 20, 82, true],
  ],
  "Bearish Engulfing": [
    [40, 60, 32, 68, true],
    [26, 76, 20, 82, false],
  ],
  "Piercing Line": [
    [30, 62, 24, 68, false],
    [44, 78, 38, 84, true],
  ],
  "Dark Cloud Cover": [
    [38, 70, 32, 76, true],
    [22, 56, 16, 62, false],
  ],
  "Bullish Harami": [
    [24, 74, 18, 80, false],
    [44, 58, 40, 62, true],
  ],
  "Bearish Harami": [
    [24, 74, 18, 80, true],
    [44, 58, 40, 62, false],
  ],
  "Tweezer Top": [
    [30, 62, 24, 68, true],
    [30, 64, 24, 70, false],
  ],
  "Tweezer Bottom": [
    [38, 70, 32, 76, false],
    [36, 70, 30, 76, true],
  ],
  "Morning Star": [
    [24, 56, 18, 62, false],
    [62, 70, 56, 78, true],
    [40, 74, 34, 80, true],
  ],
  "Evening Star": [
    [44, 76, 38, 82, true],
    [26, 34, 20, 42, false],
    [24, 58, 18, 64, false],
  ],
  "Three Black Crows": [
    [24, 50, 18, 56, false],
    [36, 62, 30, 68, false],
    [48, 74, 42, 80, false],
  ],
  "Three White Soldiers": [
    [50, 76, 44, 82, true],
    [38, 64, 32, 70, true],
    [26, 52, 20, 58, true],
  ],
  "Three Line Strike": [
    [46, 62, 42, 66, true],
    [36, 52, 32, 56, true],
    [26, 42, 22, 46, true],
    [22, 68, 18, 72, false],
  ],
  "Rising Window": [
    [52, 76, 46, 82, true],
    [22, 44, 16, 50, true],
  ],
  "Falling Window": [
    [22, 44, 16, 50, false],
    [52, 76, 46, 82, false],
  ],
  "Bullish Kicker": [
    [34, 58, 28, 64, false],
    [20, 46, 16, 52, true],
  ],
  "Inside Bar": [
    [22, 78, 16, 84, true],
    [40, 60, 36, 64, false],
  ],
};

const PATTERN_NAMES = Object.keys(PATTERNS);

interface Placement {
  name: string;
  leftPct: number;
  topPct: number;
  scale: number;
  depth: number; // 0 (far) .. 1 (near) — drives blur, opacity, parallax
  rotate: number;
  driftDuration: number;
  driftDelay: number;
}

/** Deterministic pseudo-random so server and client render identically. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildPlacements(count: number): Placement[] {
  const out: Placement[] = [];
  // Distributed across a loose grid then jittered, so patterns spread out
  // instead of clumping in one corner.
  const cols = 4;
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const depth = seeded(i, 3);
    out.push({
      name: PATTERN_NAMES[i % PATTERN_NAMES.length],
      leftPct: (col / cols) * 100 + seeded(i, 1) * 18,
      topPct: row * 26 + seeded(i, 2) * 16,
      scale: 0.55 + depth * 0.85,
      depth,
      rotate: (seeded(i, 4) - 0.5) * 16,
      driftDuration: 9 + seeded(i, 5) * 9,
      driftDelay: seeded(i, 6) * 6,
    });
  }
  return out;
}

function PatternGlyph({ name, bullTone }: { name: string; bullTone: string }) {
  const candles = PATTERNS[name];
  const n = candles.length;
  const slot = 100 / n;
  const bodyW = Math.min(slot * 0.52, 16);

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full overflow-visible"
      aria-hidden
      focusable="false"
    >
      {candles.map((c, i) => {
        const [bt, bb, wt, wb, bull] = c;
        const cx = slot * i + slot / 2;
        const color = bull ? bullTone : "rgb(214,57,74)";
        return (
          <g key={i}>
            <line
              x1={cx}
              x2={cx}
              y1={wt}
              y2={wb}
              stroke={color}
              strokeWidth={1.6}
              strokeLinecap="round"
            />
            <rect
              x={cx - bodyW / 2}
              y={Math.min(bt, bb)}
              width={bodyW}
              height={Math.max(Math.abs(bb - bt), 2)}
              rx={1.5}
              fill={bull ? color : color}
              fillOpacity={bull ? 0.9 : 0.9}
            />
          </g>
        );
      })}
    </svg>
  );
}

interface CandlestickFieldProps {
  /** How many pattern glyphs to scatter. Kept low on mobile for performance. */
  count?: number;
  /** Overall opacity ceiling — keep low so text stays readable. */
  maxOpacity?: number;
  /** Follow the pointer as well as scroll. */
  pointerParallax?: boolean;
  className?: string;
}

/**
 * Ambient 3D candlestick-pattern field used as a section background.
 *
 * Design decisions worth knowing:
 *  - Patterns are real formations (Doji, Hammer, Engulfing, Morning Star,
 *    Three Black Crows, ...) drawn as SVG geometry, not a pasted image.
 *  - Each glyph sits at its own simulated depth, which drives its scale,
 *    blur, opacity and parallax rate — that's the depth-of-field effect.
 *  - Motion is scroll- and pointer-driven via springs, plus a slow ambient
 *    float, so it reads as a layered 3D environment rather than wallpaper.
 *  - `pointer-events-none` throughout: it can never intercept a tap.
 *  - Honours prefers-reduced-motion by rendering a static field.
 *  - Glyph count drops on small screens; positions are seeded (deterministic)
 *    so server and client markup match and React doesn't warn about hydration.
 */
export default function CandlestickField({
  count = 12,
  maxOpacity = 0.14,
  pointerParallax = true,
  className = "",
}: CandlestickFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsSmall(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const effectiveCount = isSmall ? Math.min(count, 7) : count;
  const placements = buildPlacements(effectiveCount);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 45, damping: 22 });
  const sy = useSpring(py, { stiffness: 45, damping: 22 });

  useEffect(() => {
    if (!pointerParallax || reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerParallax, reduced, px, py]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ perspective: 1000 }}
    >
      {placements.map((p, i) => (
        <Glyph
          key={i}
          p={p}
          scrollYProgress={scrollYProgress}
          sx={sx}
          sy={sy}
          reduced={reduced}
          maxOpacity={maxOpacity}
        />
      ))}
    </div>
  );
}

function Glyph({
  p,
  scrollYProgress,
  sx,
  sy,
  reduced,
  maxOpacity,
}: {
  p: Placement;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  reduced: boolean;
  maxOpacity: number;
}) {
  // Nearer glyphs (higher depth) travel further — classic parallax.
  const range = 40 + p.depth * 120;
  const scrollY = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const mouseX = useTransform(sx, [-0.5, 0.5], [-22 * p.depth, 22 * p.depth]);
  const mouseY = useTransform(sy, [-0.5, 0.5], [-14 * p.depth, 14 * p.depth]);

  const opacity = maxOpacity * (0.45 + p.depth * 0.55);
  const blur = (1 - p.depth) * 2.4;
  const bullTone = "rgb(31,157,92)";

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${p.leftPct}%`,
        top: `${p.topPct}%`,
        width: `${52 * p.scale}px`,
        height: `${52 * p.scale}px`,
        y: reduced ? 0 : scrollY,
        x: reduced ? 0 : mouseX,
        opacity,
        filter: `blur(${blur}px)`,
        rotate: p.rotate,
        translateZ: -p.depth * 120,
        willChange: "transform",
      }}
      animate={
        reduced
          ? undefined
          : { translateY: [0, -9, 0], rotateY: [0, 14, 0] }
      }
      transition={
        reduced
          ? undefined
          : {
              duration: p.driftDuration,
              delay: p.driftDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <motion.div style={{ y: reduced ? 0 : mouseY, height: "100%" }}>
        <PatternGlyph name={p.name} bullTone={bullTone} />
      </motion.div>
    </motion.div>
  );
}
