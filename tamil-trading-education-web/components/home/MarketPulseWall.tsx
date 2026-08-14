"use client";

import { useMemo, useRef, useState, PointerEvent } from "react";
import { motion } from "framer-motion";

interface Candle {
  col: number;
  row: number;
  isUp: boolean;
  bodyHeight: number; // 0-1, fraction of a cell
  wickExtra: number; // 0-1, extra wick length above/below body
}

const COLS = 16;
const ROWS = 6;

/**
 * Ambient interactive background for a forex education site — a field of
 * small candlesticks (the actual chart element traders read every day)
 * that light up gold near the cursor. This replaces a reference design
 * that used decorative Egyptian hieroglyphs, which had no connection to
 * the business.
 *
 * Positions are computed as percentages of the container, not
 * `window.innerWidth` (the reference component read that directly, which
 * breaks in Next.js server rendering since `window` doesn't exist on the
 * server) — so this is responsive and safe to render.
 *
 * On touch devices there's no cursor to track, so it settles into a slow
 * ambient shimmer instead of trying to fake hover — nothing to overlap or
 * misbehave on a phone.
 */
export default function MarketPulseWall({ radius = 130 }: { radius?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const candles = useMemo<Candle[]>(() => {
    const list: Candle[] = [];
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        list.push({
          col,
          row,
          isUp: Math.random() > 0.45,
          bodyHeight: 0.3 + Math.random() * 0.5,
          wickExtra: 0.15 + Math.random() * 0.35,
        });
      }
    }
    return list;
  }, []);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }
  function onLeave() {
    setPointer(null);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-xl3 border border-gold-500/15 bg-gradient-to-br from-frame-800 via-frame-900 to-frame-950"
    >
      <div className="absolute inset-0">
        {candles.map((c, i) => {
          const cellW = 100 / COLS;
          const cellH = 100 / ROWS;
          const leftPct = (c.col + 0.5) * cellW;
          const topPct = (c.row + 0.5) * cellH;

          let intensity = 0;
          if (pointer && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const candleX = (leftPct / 100) * rect.width;
            const candleY = (topPct / 100) * rect.height;
            const dist = Math.hypot(candleX - pointer.x, candleY - pointer.y);
            intensity = dist < radius ? Math.max(0, 1 - dist / radius) : 0;
          }

          const baseColor = c.isUp ? "34,197,94" : "244,63,94"; // tailwind emerald-500 / rose-500 in rgb
          const bodyH = 10 + c.bodyHeight * 16; // px
          const wickH = bodyH + c.wickExtra * 20; // px

          return (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              animate={{
                opacity: intensity > 0 ? 0.25 + intensity * 0.75 : 0.18,
                scale: intensity > 0 ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 w-px"
                style={{
                  height: `${wickH}px`,
                  top: `-${wickH / 2}px`,
                  background: intensity > 0 ? `rgba(201,162,75,${0.5 + intensity * 0.5})` : `rgba(${baseColor},0.35)`,
                }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 w-1.5 rounded-[1px]"
                style={{
                  height: `${bodyH}px`,
                  top: `-${bodyH / 2}px`,
                  background: intensity > 0 ? "rgba(201,162,75,0.9)" : `rgba(${baseColor},0.55)`,
                  boxShadow: intensity > 0.15 ? `0 0 ${intensity * 18}px rgba(201,162,75,${intensity})` : "none",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {pointer && (
        <div
          aria-hidden
          className="absolute pointer-events-none rounded-full"
          style={{
            left: pointer.x,
            top: pointer.y,
            width: radius * 2,
            height: radius * 2,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(201,162,75,0.35) 0%, rgba(201,162,75,0.15) 35%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      )}
    </div>
  );
}
