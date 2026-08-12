import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import { courses } from "@/lib/data";

export default function CourseHighlights() {
  const featured = courses.filter((c) => c.featured || c.level.startsWith("Level"));

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Course Highlights"
          title={
            <>
              A learning path for <span className="gold-text">every level</span>
            </>
          }
          description="Structured, sequential courses — start where you are and build toward professional-level trading."
          center
        />
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <div
                className={`glass-card p-7 h-full flex flex-col ${
                  c.featured ? "border-gold-500/50" : ""
                }`}
              >
                <span className="tag-pill w-fit mb-4">{c.level}</span>
                <h3 className="font-heading font-semibold text-xl mb-2">{c.title}</h3>
                <p className="text-ink/55 text-sm mb-5 flex-grow">{c.description}</p>
                <ul className="space-y-2 mb-6">
                  {c.outcomes.slice(0, 2).map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-ink/60">
                      <CheckCircle2 className="w-4 h-4 text-up shrink-0 mt-0.5" />
                      {o}
                    </li>
                  ))}
                </ul>
                <Link href="/courses" className="btn-outline mt-auto w-full">
                  Learn More
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/courses" className="btn-gold">
            See Full Curriculum <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
