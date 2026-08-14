"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  ArrowRight,
  CalendarCheck,
  Star,
  BadgeCheck,
  Youtube,
  UserCheck,
} from "lucide-react";
import { images } from "@/lib/images";
import { site, stats } from "@/lib/data";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import TiltCard from "@/components/shared/TiltCard";

const SLIDE_DURATION = 6500;

function ChartVisual() {
  return (
    <TiltCard className="p-6">
      <div className="flex items-center justify-between mb-5 font-mono text-xs text-ink/50">
        <span>XAU/USD · LIVE SESSION</span>
        <span className="flex items-center gap-1.5 text-up">
          <span className="w-1.5 h-1.5 rounded-full bg-up animate-pulseDot" /> +0.44%
        </span>
      </div>
      <div className="flex items-end gap-2 h-40" style={{ transformStyle: "preserve-3d" }}>
        {[40, 30, 60, 80, 100, 55, 120, 150, 80, 110, 170, 96, 140].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: h }}
            transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: "easeOut" }}
            style={{ z: 10 + (i % 4) * 8 }}
            className={`w-3 rounded-sm ${i % 3 === 1 ? "bg-down" : "bg-up"}`}
          />
        ))}
      </div>
    </TiltCard>
  );
}

function PartnersVisual() {
  const partners = ["Vantage", "OctaFX", "XM"];
  return (
    <TiltCard className="p-7">
      <div className="flex items-center gap-2 mb-6 text-gold-700">
        <BadgeCheck className="w-5 h-5" />
        <span className="font-heading font-semibold text-sm">Official IB Partner</span>
      </div>
      <div className="space-y-3">
        {partners.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            style={{ transform: `translateZ(${10 + i * 6}px)` }}
            className="flex items-center justify-between rounded-xl border border-navy-500/25 bg-white/70 px-4 py-3"
          >
            <span className="font-heading font-semibold text-ink">{p}</span>
            <span className="text-xs font-mono text-up flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5" /> Active
            </span>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-ink/50 mt-5 leading-relaxed">
        Open your account through us and unlock free VIP community access.
      </p>
    </TiltCard>
  );
}

function AccountStepsVisual() {
  const steps = [
    { icon: Youtube, text: "Watch the account opening video" },
    { icon: UserCheck, text: "Open with our referral code" },
    { icon: BadgeCheck, text: "Get free VIP community access" },
  ];
  return (
    <TiltCard className="p-7">
      <p className="font-heading font-semibold text-sm text-ink mb-6">Open Your Account in 3 Steps</p>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.text}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            style={{ transform: `translateZ(${10 + i * 6}px)` }}
            className="flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 shrink-0">
              <s.icon className="w-4 h-4" />
            </span>
            <span className="text-sm text-ink/70">{s.text}</span>
          </motion.div>
        ))}
      </div>
    </TiltCard>
  );
}

const slides = [
  {
    eyebrow: "Tamil Nadu's Trusted Trading Community",
    title: (
      <>
        Master Forex Trading with <span className="gold-text">Confidence</span>
      </>
    ),
    description:
      "Join Tamil Trading Education and learn professional Forex Trading through live classes, technical analysis, risk management, and our premium trading community.",
    buttons: (
      <>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <MessageCircle className="w-4 h-4" /> Join WhatsApp
        </a>
        <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-telegram">
          <Send className="w-4 h-4" /> Join Telegram
        </a>
        <Link href="/courses" className="btn-gold">
          Start Learning <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/contact" className="btn-outline">
          <CalendarCheck className="w-4 h-4" /> Book Free Consultation
        </Link>
      </>
    ),
    showStats: true,
    visual: <ChartVisual />,
  },
  {
    eyebrow: "Trusted Partnerships",
    title: (
      <>
        We&apos;re Official <span className="gold-text">IB Partners</span>
      </>
    ),
    description:
      "Vantage · OctaFX · XM — open your trading account through us and get free VIP community access plus a dedicated relationship manager.",
    buttons: (
      <>
        <Link href="/broker-assistance" className="btn-gold">
          View Broker Assistance <ArrowRight className="w-4 h-4" />
        </Link>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <MessageCircle className="w-4 h-4" /> Ask About Referral Codes
        </a>
      </>
    ),
    showStats: false,
    visual: <PartnersVisual />,
  },
  {
    eyebrow: "Get Started Today",
    title: (
      <>
        Open Your <span className="gold-text">Trading Account</span>
      </>
    ),
    description:
      "Step-by-step account opening guidance for every partner broker — watch the walkthrough on our YouTube channel, use our referral code, and start trading with support behind you.",
    buttons: (
      <>
        <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="btn-gold">
          <Youtube className="w-4 h-4" /> Watch on YouTube
        </a>
        <Link href="/broker-assistance" className="btn-outline">
          Open Account <ArrowRight className="w-4 h-4" />
        </Link>
      </>
    ),
    showStats: false,
    visual: <AccountStepsVisual />,
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = slides[active];

  return (
    <section
      ref={ref}
      className="relative min-h-0 sm:min-h-[92vh] flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-20">
        <Image
          src={images.heroTradingDesk}
          alt="Professional forex trading desk with live market charts"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/85 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/40 to-transparent" />
      </motion.div>

      <div className="absolute -z-10 top-20 right-[8%] w-96 h-96 rounded-full bg-gold-500/20 blur-[130px]" />
      <div className="absolute -z-10 bottom-0 left-[5%] w-80 h-80 rounded-full bg-electric-500/20 blur-[120px]" />

      <div className="container relative py-10 sm:py-16 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          <div style={{ perspective: 900 }} className="min-h-[420px] sm:min-h-[340px] lg:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, rotateY: 55, x: 60 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -55, x: -60 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="eyebrow">{slide.eyebrow}</span>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-heading font-bold leading-[1.05] mb-6">
                  {slide.title}
                </h1>
                <p className="text-lg text-ink/65 max-w-xl mb-9 leading-relaxed">{slide.description}</p>

                <div className="flex flex-wrap gap-4 mb-12">{slide.buttons}</div>

                <div className={`flex flex-wrap gap-x-10 gap-y-5 ${slide.showStats ? "" : "invisible pointer-events-none"}`} aria-hidden={!slide.showStats}>
                  {stats.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <div className="font-mono text-3xl font-bold text-gold-700">
                        {slide.showStats ? <AnimatedCounter value={s.value} suffix={s.suffix} /> : s.value}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-ink/45 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative hidden lg:block min-h-[420px]" style={{ perspective: 900 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, rotateY: -50, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 50, scale: 0.92 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {slide.visual}
              </motion.div>
            </AnimatePresence>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-5 glass-card px-4 py-3 flex items-center gap-2 text-xs font-heading"
            >
              <span className="w-2 h-2 rounded-full bg-up animate-pulseDot" /> Mentor Online Now
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-5 -left-6 glass-card px-4 py-3 flex items-center gap-2 text-xs font-heading"
            >
              <Star className="w-4 h-4 text-gold-600 fill-gold-600" /> Rated 4.9/5 by 1,000+ students
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="p-4 flex items-center justify-center touch-manipulation"
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-10 bg-gold-500" : "w-2.5 bg-ink/25"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
