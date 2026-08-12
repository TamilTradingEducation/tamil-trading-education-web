import { GraduationCap, Radio, Users, HeartHandshake, BookOpenCheck, LifeBuoy } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";

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
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="glass-card p-7 h-full hover:border-gold-500/40 hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-5">
                  <r.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{r.title}</h3>
                <p className="text-ink/55 text-sm leading-relaxed">{r.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
