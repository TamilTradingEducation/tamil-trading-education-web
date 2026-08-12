import { stats } from "@/lib/data";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Reveal from "@/components/shared/Reveal";

export default function StatsSection() {
  return (
    <section className="border-y border-ink/10 bg-navy-800/30">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 py-14">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <div className="font-mono text-3xl md:text-4xl font-bold text-gold-700">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wider text-ink/45 mt-2">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
