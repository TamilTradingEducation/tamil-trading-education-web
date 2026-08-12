import Link from "next/link";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
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
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="glass-card p-7 h-full flex flex-col">
                <Quote className="w-8 h-8 text-gold-500/60 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-ink/65 text-sm leading-relaxed flex-grow mb-6">"{t.quote}"</p>
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
        <div className="text-center mt-12">
          <Link href="/testimonials" className="btn-outline">Read More Stories</Link>
        </div>
      </div>
    </section>
  );
}
