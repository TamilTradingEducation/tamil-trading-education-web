"use client";

import * as Icons from "lucide-react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Carousel3D from "@/components/shared/Carousel3D";
import { services } from "@/lib/data";

/**
 * Section identity: 3D CARD DECK (see Carousel3D `deck`).
 * Cards sit in a physical front-to-back stack with a slight roll, so this
 * reads differently from the Why-Choose-Us coverflow directly above it,
 * while sharing the same underlying carousel engine.
 */
export default function ServicesGrid() {
  const cards = services.map((s) => {
    const Icon = (Icons as unknown as Record<string, LucideIcon>)[s.icon] ?? Icons.LineChart;
    return (
      <div
        key={s.slug}
        className="glass-card card-notch h-full p-6 sm:p-8 flex flex-col justify-center border border-navy-500/25"
      >
        <div className="w-14 h-14 rounded-xl2 bg-electric-500/10 border border-electric-500/30 flex items-center justify-center text-electric-600 mb-5">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-heading font-semibold text-xl sm:text-2xl mb-3">{s.title}</h3>
        <p className="text-ink/55 text-sm sm:text-base leading-relaxed">{s.description}</p>
      </div>
    );
  });

  return (
    <section id="services" className="section bg-navy-800/20 scroll-mt-24 overflow-x-clip">
      <div className="container">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Everything a trader needs, <span className="gold-text">under one roof</span>
            </>
          }
          description="From your first lesson to VIP-level mentorship — structured support at every stage."
          center
        />
        <Carousel3D
          items={cards}
          variant="deck"
          ariaLabel="Our services"
          heightClass="h-[330px] sm:h-[310px]"
          cardWidthClass="w-[84%] sm:w-[66%] md:w-[54%]"
        />
        <div className="text-center mt-10">
          <Link href="/contact" className="btn-3d">Discuss Your Goals With Us</Link>
        </div>
      </div>
    </section>
  );
}
