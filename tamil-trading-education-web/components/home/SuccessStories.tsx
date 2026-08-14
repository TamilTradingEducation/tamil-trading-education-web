"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { images } from "@/lib/images";

const stories = [
  {
    name: "Ramesh K.",
    image: images.studentsLearning,
    milestone: "Zero to first funded demo pass in 4 months",
    detail:
      "Started with no market knowledge in our Beginner Forex course and progressed through Intermediate Forex before passing a proprietary firm's demo evaluation.",
  },
  {
    name: "Priya S.",
    image: images.tradingClassroom,
    milestone: "Cut average drawdown by more than half",
    detail:
      "After completing our Risk Management specialisation, restructured position sizing and stop-loss discipline to trade with meaningfully less volatility.",
  },
  {
    name: "Karthik B.",
    image: images.professionalTrader,
    milestone: "Now trades part-time alongside a full-time job",
    detail:
      "A working professional who used our Swing Trading course to build a schedule-friendly strategy that doesn't require watching charts all day.",
  },
];

/**
 * 3D treatment: "coverflow" — the active story sits flat and centered, the
 * neighbours are pushed back and rotated in 3D space (rotateY + reduced
 * scale/opacity), coverflow-style. Swipeable by touch/mouse drag on every
 * device, plus arrow buttons for anyone who prefers tapping. A fourth
 * distinct 3D language from the other home-page sections.
 */
export default function SuccessStories() {
  const [active, setActive] = useState(0);

  function go(delta: number) {
    setActive((i) => (i + delta + stories.length) % stories.length);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  }

  return (
    <section className="section bg-navy-800/20 overflow-hidden">
      <div className="container">
        <SectionHeading
          eyebrow="Student Success Stories"
          title={
            <>
              Real progress from <span className="gold-text">real students</span>
            </>
          }
          center
        />

        <div style={{ perspective: 1400 }} className="relative">
          <div
            className="relative h-[420px] sm:h-[380px] md:h-[360px] max-w-3xl mx-auto touch-pan-y cursor-grab active:cursor-grabbing"
            onPointerDown={() => {}}
          >
            {stories.map((s, i) => {
              const offset = i - active;
              const isActive = offset === 0;
              return (
                <motion.div
                  key={s.name}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={onDragEnd}
                  animate={{
                    x: `${offset * 62}%`,
                    rotateY: offset * -28,
                    scale: isActive ? 1 : 0.82,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.45,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="absolute inset-0 mx-auto w-full sm:w-[85%] md:w-[75%]"
                >
                  <div className="glass-card overflow-hidden h-full flex flex-col sm:flex-row select-none">
                    <div className="relative h-40 sm:h-full sm:w-2/5 shrink-0">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        draggable={false}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-navy-950 via-navy-950/10 to-transparent" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-center">
                      <p className="font-heading font-semibold text-gold-700 mb-2">{s.milestone}</p>
                      <p className="text-ink/55 text-sm leading-relaxed">{s.detail}</p>
                      <p className="mt-4 text-sm font-heading text-ink/70">— {s.name}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="w-10 h-10 rounded-full border border-navy-500/25 flex items-center justify-center text-ink/60 hover:border-gold-500 hover:text-gold-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to story ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-7 bg-gold-500" : "w-2 bg-ink/20 hover:bg-ink/35"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next story"
              className="w-10 h-10 rounded-full border border-navy-500/25 flex items-center justify-center text-ink/60 hover:border-gold-500 hover:text-gold-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
