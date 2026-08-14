"use client";

import Link from "next/link";
import { Star, MessageCircle } from "lucide-react";
import { stats, testimonials, site } from "@/lib/data";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Reveal from "@/components/shared/Reveal";

// Only the first 4 stack — enough for the sticky effect to read clearly
// without turning into an excessively long scroll section on mobile.
const stackedTestimonials = testimonials.slice(0, 4);

/**
 * 3D treatment: "sticky stack" — replaces the previous tap-driven card deck.
 * Each testimonial is pinned in place with CSS `position: sticky` at a
 * slightly deeper offset than the one before it, so as you scroll past this
 * section the cards physically stack up on screen like a deck of photos
 * being laid down one on top of another. This uses native scroll behaviour
 * (no JavaScript animation loop), so it's smooth on every device including
 * low-end phones.
 */
export default function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column — stays in view while the stack scrolls past on the right */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <Reveal>
              <span className="eyebrow">Testimonials</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4">
                What our <span className="gold-text">traders say</span>
              </h2>
              <p className="text-ink/60 text-lg mb-2">
                Real students, real progress — scroll to see their stories stack up.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-2">
                {stats.slice(0, 3).map((s) => (
                  <div key={s.label} className="glass-card text-center rounded-xl px-2 py-4">
                    <p className="font-mono text-xl sm:text-2xl font-bold text-gold-700">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-[10px] sm:text-xs text-ink/50 mt-1 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Link href="/testimonials" className="btn-outline">
                  Read More Stories
                </Link>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  <MessageCircle className="w-4 h-4" /> Talk to a Mentor
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right column — the sticky stack itself */}
          <div className="relative" style={{ height: `${stackedTestimonials.length * 100 + 60}vh` }}>
            <div className="sticky top-24 space-y-0">
              {stackedTestimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="sticky"
                  style={{ top: `${112 + i * 26}px` }}
                >
                  <div
                    className="glass-card p-6 sm:p-7 border border-navy-500/25"
                    style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center font-heading font-bold text-ink shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-heading font-semibold text-ink truncate">{t.name}</p>
                        <p className="text-xs text-ink/45 truncate">{t.course} · {t.location}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="font-mono text-sm font-semibold text-ink">{t.rating.toFixed(1)}</span>
                        <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                      </div>
                    </div>
                    <p className="text-ink/65 text-sm sm:text-base leading-relaxed mt-4">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
