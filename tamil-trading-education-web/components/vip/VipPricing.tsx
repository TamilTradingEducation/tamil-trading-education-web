"use client";

import { PointerEvent, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Crown, Sparkles } from "lucide-react";
import ResponsiveCards from "@/components/shared/ResponsiveCards";
import { vipPlans, site } from "@/lib/data";

type Plan = (typeof vipPlans)[number];

/**
 * A single 3D pricing module.
 *
 * Depth is built from three real layers, not a drop-shadow fake:
 *   1. a back plate pushed away with translateZ(-28px)
 *   2. the glass card face
 *   3. price + CTA lifted toward the viewer with translateZ(+30px)
 *
 * Mouse users additionally get cursor-tracked rotateX/rotateY tilt with a
 * moving specular highlight. Touch users get the layered depth and the
 * entrance animation — the tilt is gated to `pointerType === "mouse"` so a
 * finger swipe never fights the carousel drag.
 */
function PricingCard({ plan }: { plan: Plan }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18 });
  const sy = useSpring(my, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-11, 11]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const shineX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const shine = useTransform([shineX, shineY], (v) => {
    const [x, y] = v as [string, string];
    return `radial-gradient(320px circle at ${x} ${y}, rgba(255,255,255,0.55), rgba(201,162,75,0.18) 35%, transparent 70%)`;
  });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const isBest = Boolean(plan.recommended);
  const isLifetime = Boolean(plan.lifetime);

  const enquiry = `${site.whatsapp}?text=${encodeURIComponent(
    `Hi, I'd like to join the VIP Community — ${plan.label} plan ($${plan.price}).`
  )}`;

  return (
    <div style={{ perspective: 1300 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="keep-3d relative h-full"
      >
        {/* Layer 1 — back plate, creates genuine card thickness */}
        <div
          aria-hidden
          className={`absolute inset-x-2 inset-y-1 rounded-xl3 ${
            isBest
              ? "bg-gold-500/25 border border-gold-500/40"
              : "bg-navy-600/15 border border-navy-500/25"
          }`}
          style={{ transform: "translateZ(-28px)" }}
        />

        {/* Animated highlight ring on the recommended plan */}
        {isBest && !reduced && (
          <motion.div
            aria-hidden
            className="absolute -inset-px rounded-xl3 pointer-events-none"
            style={{
              transform: "translateZ(-2px)",
              background:
                "linear-gradient(120deg, rgba(224,191,95,0.9), rgba(201,162,75,0.15) 40%, rgba(224,191,95,0.9))",
              backgroundSize: "220% 220%",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Layer 2 — the card face */}
        <div
          className={`keep-3d relative h-full rounded-xl3 border backdrop-blur-xl flex flex-col overflow-hidden p-5 sm:p-6 ${
            isLifetime
              ? "bg-gradient-to-br from-frame-800 via-frame-900 to-frame-950 border-gold-500/45"
              : isBest
              ? "bg-white/92 border-gold-500/50"
              : "bg-white/85 border-navy-500/25"
          }`}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-45 mix-blend-soft-light"
            style={{ background: shine }}
          />

          <div className="relative flex items-center justify-between gap-2 mb-4">
            <span
              className={`font-heading font-semibold text-base sm:text-lg ${
                isLifetime ? "text-white" : "text-ink"
              }`}
            >
              {plan.label}
            </span>
            {isBest && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold-gradient text-ink font-bold shrink-0">
                <Crown className="w-3 h-3" /> Best Value
              </span>
            )}
            {isLifetime && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border border-gold-400/60 text-gold-300 shrink-0">
                <Sparkles className="w-3 h-3" /> 50% Off
              </span>
            )}
          </div>

          {/* Layer 3 — price lifted toward the viewer */}
          <div className="relative" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-end gap-2 flex-wrap">
              {plan.listPrice && (
                <span
                  className={`font-mono line-through text-base sm:text-lg ${
                    isLifetime ? "text-white/40" : "text-ink/35"
                  }`}
                >
                  ${plan.listPrice}
                </span>
              )}
              <span
                className={`font-mono font-bold leading-none text-4xl ${
                  isLifetime ? "text-gold-300" : "gold-text"
                }`}
              >
                ${plan.price}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {plan.perMonth && (
                <span
                  className={`text-xs font-mono ${
                    isLifetime ? "text-white/50" : "text-ink/45"
                  }`}
                >
                  ≈ ${plan.perMonth.toFixed(0)}/month
                </span>
              )}
              {plan.savingAmount && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-up/15 text-up border border-up/30">
                  Save ${plan.savingAmount} · {plan.savingPct}% off
                </span>
              )}
            </div>
          </div>

          <p
            className={`relative text-sm leading-relaxed mt-4 mb-5 flex-grow ${
              isLifetime ? "text-white/60" : "text-ink/55"
            }`}
          >
            {plan.tagline}
          </p>

          <div
            className={`relative flex items-center gap-2 text-xs mb-5 ${
              isLifetime ? "text-white/55" : "text-ink/50"
            }`}
          >
            <Check className="w-3.5 h-3.5 text-up shrink-0" />
            All VIP benefits included
          </div>

          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transform: "translateZ(24px)" }}
            className={`relative w-full ${
              isBest || isLifetime ? "btn-gold" : "btn-3d"
            }`}
          >
            Get VIP Access
          </a>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * MOBILE  → 3D coverflow pricing carousel. The active plan sits centred and
 *           forward; neighbours fall back in perspective. Swipe left/right.
 * DESKTOP  → clean, centred, equal-height 4-across pricing grid. No carousel,
 *            no drag handlers, no continuous 3D animation — just the layered
 *            card depth and a one-shot entrance.
 *
 * The recommended plan is lifted slightly on desktop via `emphasisIndex`.
 */
export default function VipPricing() {
  const cards = vipPlans.map((p) => <PricingCard key={p.id} plan={p} />);
  const bestIndex = vipPlans.findIndex((p) => p.recommended);

  return (
    <ResponsiveCards
      items={cards}
      variant="coverflow"
      desktopCols={4}
      ariaLabel="VIP membership plans"
      carouselHeightClass="h-[440px]"
      carouselCardWidthClass="w-[80%] sm:w-[58%]"
      emphasisIndex={bestIndex >= 0 ? bestIndex : undefined}
    />
  );
}
