import { GraduationCap, Radio, Users, HeartHandshake, BookOpenCheck, LifeBuoy } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Tilt3D from "@/components/shared/Tilt3D";

const reasons = [
  {
    icon: GraduationCap,
    title: "Professional Mentors",
    description: "Learn from mentors with genuine trading floor experience, not recycled course scripts.",
  },
  {
    icon: Radio,
    title: "Live Market Analysis",
    description: "Daily walkthroughs of real, live market conditions across forex, gold and indices.",
  },
  {
    icon: Users,
    title: "Premium Community",
    description: "An active, respectful space of serious traders built around accountability and growth.",
  },
  {
    icon: BookOpenCheck,
    title: "Beginner Friendly",
    description: "No prior experience required — our curriculum starts from absolute zero.",
  },
  {
    icon: HeartHandshake,
    title: "Practical Learning",
    description: "Real charts and live examples, not just theory slides and recycled screenshots.",
  },
  {
    icon: LifeBuoy,
    title: "Long-Term Support",
    description: "Mentorship and community access continue well beyond course completion.",
  },
];

/**
 * 3D treatment: "tilt & glow" — each card pops upright as it scrolls into
 * view (works on mobile too, no hover needed) and additionally tilts toward
 * the cursor with a gold glow on desktop. See Tilt3D for the mechanics.
 */
export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              Built for traders who are <span className="gold-text">serious about the craft</span>
            </>
          }
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <Tilt3D key={r.title} delay={i * 0.07}>
              <div className="glass-card p-7 h-full border border-navy-500/25 hover:border-gold-500/40 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-5">
                  <r.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{r.title}</h3>
                <p className="text-ink/55 text-sm leading-relaxed">{r.description}</p>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
}
