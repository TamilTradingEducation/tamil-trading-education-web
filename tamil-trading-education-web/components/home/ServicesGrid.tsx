"use client";

import * as Icons from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { services } from "@/lib/data";
import { LucideIcon } from "lucide-react";

/**
 * 3D treatment: "book-cover unfold" — each card rotates open around its top
 * edge as it scrolls into view (rotateX from -55° to 0°), with a visible
 * gold "spine" layer sitting behind it via translateZ, giving real card
 * thickness instead of a flat rectangle. Deliberately a different 3D
 * mechanic from the cursor-tilt cards above it, and it needs no hover, so
 * it reads the same on mobile as on desktop.
 */
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
          {services.map((s, i) => {
            const Icon = (Icons as unknown as Record<string, LucideIcon>)[s.icon] ?? Icons.LineChart;
            return (
              <div key={s.slug} style={{ perspective: 1100 }}>
                <motion.div
                  initial={{ opacity: 0, rotateX: -55, y: 24 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                  className="relative h-full"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-2 -bottom-2 h-full rounded-xl bg-gold-500/10 border border-gold-500/15"
                    style={{ transform: "translateZ(-16px)" }}
                  />
                  <div
                    className="relative glass-card p-6 h-full border border-navy-500/25 hover:border-gold-500/40 transition-colors duration-300"
                    style={{ transform: "translateZ(8px)" }}
                  >
                    <div className="w-11 h-11 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-semibold mb-2">{s.title}</h3>
                    <p className="text-ink/50 text-sm leading-relaxed">{s.description}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-14">
          <Link href="/contact" className="btn-outline">Discuss Your Goals With Us</Link>
        </div>
      </div>
    </section>
  );
}
