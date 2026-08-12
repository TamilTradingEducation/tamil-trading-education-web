import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
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

export default function SuccessStories() {
  return (
    <section className="section bg-navy-800/20">
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
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <div className="glass-card overflow-hidden h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={s.image} alt={s.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <p className="font-heading font-semibold text-gold-700 mb-2">{s.milestone}</p>
                  <p className="text-ink/55 text-sm leading-relaxed flex-grow">{s.detail}</p>
                  <p className="mt-4 text-sm font-heading text-ink/70">— {s.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
