"use client";

import Link from "next/link";
import { Star, MessageCircle } from "lucide-react";
import { stats, testimonials, site } from "@/lib/data";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Reveal from "@/components/shared/Reveal";

const stackedTestimonials = testimonials.slice(0, 4);

/**
 * 3D treatment: "sticky stack" — each card pins slightly deeper than the one
 * before, so scrolling lays them down like a physical stack of cards.
 *
 * Mobile overflow fixes applied here (cards were being clipped off the right
 * edge of the phone screen):
 *  - `min-w-0` on every grid/flex child. CSS Grid and Flex children default
 *    to `min-width: auto`, which refuses to shrink below their content's
 *    intrinsic width — that pushed this whole column wider than the viewport,
 *    and because the page has `overflow-x: hidden`, the excess was clipped
 *    rather than scrollable.
 *  - Stats reduced to 2 columns on phones with smaller type, so long labels
 *    like "Live Sessions Delivered" can't force the row wide.
 *  - Buttons stack full-width on phones instead of sitting side by side.
 *  - Stack scroll-height cut roughly in half on mobile so this section
 *    doesn't require excessive scrolling.
 */
export default function TestimonialsSection() {
  return (
    <section className="section overflow-x-clip">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="min-w-0 flex flex-col gap-5 lg:sticky lg:top-28">
            <Reveal>
              <span className="eyebrow">Testimonials</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-3">
                What our <span className="gold-text">traders say</span>
              </h2>
              <p className="text-ink/60 text-base sm:text-lg">
                Real students, real progress.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
                {stats.slice(0, 3).map((s) => (
                  <div
                    key={s.label}
                    className="glass-card card-notch min-w-0 text-center rounded-xl px-2 py-3.5"
                  >
                    <p className="font-mono text-lg sm:text-2xl font-bold text-gold-700">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-[10px] sm:text-xs text-ink/50 mt-1 leading-tight break-words">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mt-2">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" /> Talk to a Mentor
                </a>
                <Link href="/testimonials" className="btn-3d w-full sm:w-auto">
                  Read More Stories
                </Link>
              </div>
            </Reveal>
          </div>

          <div
            className="relative min-w-0 h-[210vh] sm:h-[260vh] lg:h-[320vh]"
          >
            <div className="sticky top-24">
              {stackedTestimonials.map((t, i) => (
                <div key={t.name} className="sticky" style={{ top: `${100 + i * 22}px` }}>
                  <div
                    className="glass-card card-notch min-w-0 p-5 sm:p-7 mb-4"
                    style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gold-gradient flex items-center justify-center font-heading font-bold text-ink shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-heading font-semibold text-ink text-sm sm:text-base truncate">
                          {t.name}
                        </p>
                        <p className="text-[11px] sm:text-xs text-ink/45 truncate">
                          {t.course} · {t.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="font-mono text-xs sm:text-sm font-semibold text-ink">
                          {t.rating.toFixed(1)}
                        </span>
                        <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                      </div>
                    </div>
                    <p className="text-ink/65 text-sm leading-relaxed mt-3.5 break-words">
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
