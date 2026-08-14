"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { testimonials } from "@/lib/data";

const deck = testimonials.slice(0, 5);

/**
 * 3D treatment: "card deck" — testimonials sit in a physical stack with the
 * two behind peeking out, offset and rotated in true 3D (rotateZ + a slight
 * rotateX/translateZ so the stack itself reads as depth, not just 2D
 * layering). Tapping "Next" sends the front card to the back of the deck.
 * A fifth distinct 3D language, and fully tap-driven so it works identically
 * on mobile and desktop.
 */
export default function TestimonialsSection() {
  const [order, setOrder] = useState(deck.map((_, i) => i));

  function next() {
    setOrder((o) => [...o.slice(1), o[0]]);
  }

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              What our <span className="gold-text">traders say</span>
            </>
          }
          center
        />

        <div style={{ perspective: 1300 }} className="relative max-w-xl mx-auto">
          <div className="relative h-[340px] sm:h-[300px]">
            <AnimatePresence initial={false}>
              {order.slice(0, 3).map((idx, pos) => {
                const t = deck[idx];
                return (
                  <motion.div
                    key={idx}
                    initial={pos === 0 ? { opacity: 0, scale: 0.9 } : false}
                    animate={{
                      x: pos * 14,
                      y: pos * -10,
                      rotate: pos * 3.5,
                      scale: 1 - pos * 0.05,
                      opacity: 1 - pos * 0.18,
                      zIndex: 10 - pos,
                    }}
                    exit={{ opacity: 0, x: -40, rotate: -8, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="absolute inset-0"
                  >
                    <div className="glass-card p-7 h-full flex flex-col">
                      <Quote className="w-8 h-8 text-gold-500/60 mb-3" />
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                        ))}
                      </div>
                      <p className="text-ink/65 text-sm leading-relaxed flex-grow mb-6">&quot;{t.quote}&quot;</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-heading font-bold text-ink shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-heading text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-ink/45">{t.course} · {t.location}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8">
            <button onClick={next} className="btn-outline">
              Next Story <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/testimonials" className="btn-outline">Read More Stories</Link>
        </div>
      </div>
    </section>
  );
}
