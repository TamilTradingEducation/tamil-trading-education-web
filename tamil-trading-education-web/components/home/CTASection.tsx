"use client";

import { MessageCircle, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PointerEvent } from "react";
import Reveal from "@/components/shared/Reveal";
import { site } from "@/lib/data";

interface CTASectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
}

/**
 * 3D treatment: "parallax depth" — two glow orbs drift at different speeds
 * relative to the cursor (desktop) and gently float on their own otherwise
 * (mobile), so the panel reads as layered depth rather than a flat card.
 * No card-tilt language here on purpose — this section closes the page and
 * should feel calm, not like another interactive card.
 */
export default function CTASection({
  eyebrow = "Get Started Today",
  title = <>Ready to trade with a plan instead of guesswork?</>,
  description = "Join thousands of learners in our free community, or enroll in a structured course to fast-track your journey.",
}: CTASectionProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const orbAX = useTransform(sx, [-0.5, 0.5], [-24, 24]);
  const orbAY = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const orbBX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const orbBY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="section-tight py-16">
      <div className="container">
        <Reveal>
          <div
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="relative overflow-hidden rounded-xl3 border border-gold-500/20 bg-gradient-to-br from-frame-800 via-frame-900 to-frame-950 px-6 py-14 sm:px-8 sm:py-16 md:px-16 text-center"
          >
            <motion.div
              aria-hidden
              style={{ x: orbAX, y: orbAY }}
              animate={{ y: ["-4%", "4%", "-4%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 left-[10%] w-64 h-64 rounded-full bg-gold-500/25 blur-[90px]"
            />
            <motion.div
              aria-hidden
              style={{ x: orbBX, y: orbBY }}
              animate={{ y: ["4%", "-4%", "4%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 right-[10%] w-64 h-64 rounded-full bg-electric-500/20 blur-[90px]"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold-300 mb-4 justify-center">
                <span className="w-5 h-px bg-gold-400 inline-block" />
                {eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold max-w-2xl mx-auto mb-4 text-white">{title}</h2>
              <p className="text-white/60 max-w-xl mx-auto mb-9">{description}</p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/25 hover:-translate-y-0.5">
                  <MessageCircle className="w-4 h-4" /> Join WhatsApp
                </a>
                <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn bg-electric-500/15 border border-electric-400/50 text-electric-400 hover:bg-electric-500/25 hover:-translate-y-0.5">
                  <Send className="w-4 h-4" /> Join Telegram
                </a>
                <Link href="/contact" className="btn-gold">
                  Enroll Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
