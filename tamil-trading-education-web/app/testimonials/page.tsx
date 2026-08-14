import type { Metadata } from "next";
import { Quote, Star } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/shared/Reveal";
import CTASection from "@/components/home/CTASection";
import StatsSection from "@/components/home/StatsSection";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials",
  description:
    "Read what beginner and professional traders say about learning Forex trading with Tamil Trading Education.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title={<>Stories from our <span className="gold-text">trading community</span></>}
        description="Real feedback from beginners, working professionals and experienced traders who trained with Tamil Trading Education."
        image={images.studentsLearning}
        crumbLabel="Testimonials"
      />

      <section className="section">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.07}>
              <div className="glass-card card-notch p-7 h-full flex flex-col">
                <Quote className="w-8 h-8 text-gold-500/60 mb-3" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < t.rating ? "fill-gold-400 text-gold-400" : "text-ink/20"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="font-mono text-xs text-ink/50">{t.rating.toFixed(1)}</span>
                </div>
                <p className="text-ink/65 text-sm leading-relaxed flex-grow mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-heading font-bold text-ink">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-ink/45">{t.course} · {t.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <StatsSection />

      <CTASection
        eyebrow="Your Story Starts Here"
        title={<>Join the traders already learning with us</>}
      />
    </>
  );
}
