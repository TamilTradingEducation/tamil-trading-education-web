"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PointerEvent, ReactNode, useRef } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  /** Hover-tilt strength in degrees (desktop / mouse only). */
  intensity?: number;
  /** Starting rotation (degrees) for the scroll-triggered entrance — this is
   *  what gives mobile visitors a real 3D moment even though they can't hover. */
  entryRotate?: number;
  /** How far the inner content pops toward the viewer, in px. */
  depth?: number;
  glow?: string;
  delay?: number;
}

/**
 * Reused across Why-Choose-Us cards. Two independent 3D behaviours stacked
 * on top of each other:
 *  1. Scroll entrance: every device gets a rotateX "tilt up into place" pop
 *     as the card enters the viewport — this is what mobile visitors see.
 *  2. Pointer tilt: mouse users additionally get a cursor-tracked rotateY
 *     tilt + gold glow. Gated to pointerType === "mouse" so touch scrolling
 *     never triggers jittery tilt on phones.
 */
export default function Tilt3D({
  children,
  className = "",
  intensity = 10,
  entryRotate = 16,
  depth = 22,
  glow = "rgba(201,162,75,0.16)",
  delay = 0,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const glowBg = useTransform([glowX, glowY], (v) => {
    const [gx, gy] = v as [string, string];
    return `radial-gradient(240px circle at ${gx} ${gy}, ${glow}, transparent 70%)`;
  });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div style={{ perspective: 1400 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        initial={{ opacity: 0, rotateX: entryRotate, y: 26, scale: 0.95 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full touch-pan-y ${className}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glowBg }}
        />
        <div style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }} className="relative h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
