"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

/**
 * 3D treatment: "layered stack pop" — two faint offset panels sit behind
 * each stat block via translateZ, so the number appears to pop forward out
 * of a stack of cards as it scrolls into view. A third distinct 3D language
 * from the tilt-glow and unfold treatments used above on this page.
 */
export default function StatsSection() {
  return (
    <section className="border-y border-ink/10 bg-navy-800/30 py-14">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((s, i) => (
          <div key={s.label} style={{ perspective: 900 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative text-center"
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl2 bg-gold-500/10 border border-gold-500/10"
                style={{ transform: "translateZ(-18px) translate(5px, 5px)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl2 bg-gold-500/[0.06] border border-gold-500/10"
                style={{ transform: "translateZ(-34px) translate(10px, 10px)" }}
              />
              <div
                className="relative glass-card px-4 py-6 sm:px-6 sm:py-8"
                style={{ transform: "translateZ(6px)" }}
              >
                <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-gold-700">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] sm:text-sm uppercase tracking-wider text-ink/45 mt-2">
                  {s.label}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
