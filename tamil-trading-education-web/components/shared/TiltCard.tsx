"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps any content in a mouse-tracked 3D tilt + gold glow effect —
 * the card tilts toward the cursor like it's catching the light.
 * Reused across hero slides for a consistent premium interaction.
 */
export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(280px circle at ${gx} ${gy}, rgba(201,162,75,0.18), transparent 70%)`
  );

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div style={{ perspective: 1200 }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div
        ref={tiltRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`glass-card relative overflow-hidden ${className}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity"
          style={{ background: glowBackground }}
        />
        <div style={{ transform: "translateZ(30px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}
