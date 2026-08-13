import * as Icons from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import CardSwiper from "@/components/shared/CardSwiper";
import { services } from "@/lib/data";
import { LucideIcon } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section id="services" className="section bg-navy-800/20 scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Everything a trader needs, <span className="gold-text">under one roof</span>
            </>
          }
          description="From your first lesson to VIP-level mentorship — structured support at every stage of your trading journey."
          center
        />
        <CardSwiper gridClass="sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = (Icons as unknown as Record<string, LucideIcon>)[s.icon] ?? Icons.LineChart;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 0.06}>
                <div className="glass-card p-6 h-full hover:border-gold-500/40 hover:-translate-y-1.5 transition-all duration-300">
                  <div className="w-11 h-11 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{s.title}</h3>
                  <p className="text-ink/50 text-sm leading-relaxed">{s.description}</p>
                </div>
              </Reveal>
            );
          })}
        </CardSwiper>
        <div className="text-center mt-12">
          <Link href="/contact" className="btn-outline">Discuss Your Goals With Us</Link>
        </div>
      </div>
    </section>
  );
}
