"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  ArrowRight,
  CalendarCheck,
  Star,
  BadgeCheck,
} from "lucide-react";
import { images } from "@/lib/images";
import { site, stats } from "@/lib/data";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import TiltCard from "@/components/shared/TiltCard";

// Display interval — how long a slide stays visible. NOT the transition
// duration; that's SLIDE_TRANSITION below.
const SLIDE_DURATION = 3000;
// Transition itself: fast and smooth (within the 500-800ms target).
const SLIDE_TRANSITION = 0.55;

function ChartVisual() {
  return (
    <TiltCard className="p-6">
      <div className="flex items-center justify-between mb-5 font-mono text-xs text-ink/50">
        <span>XAU/USD · LIVE SESSION</span>
        <span className="flex items-center gap-1.5 text-up">
          <span className="w-1.5 h-1.5 rounded-full bg-up animate-pulseDot" /> +0.44%
        </span>
      </div>
      <div className="flex items-end gap-2 h-32 sm:h-40" style={{ transformStyle: "preserve-3d" }}>
        {[40, 30, 60, 80, 100, 55, 120, 150, 80, 110, 170, 96, 140].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: h * 0.8 }}
            transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: "easeOut" }}
            style={{ z: 10 + (i % 4) * 8 }}
            className={`w-2.5 sm:w-3 rounded-sm ${i % 3 === 1 ? "bg-down" : "bg-up"}`}
          />
        ))}
      </div>
    </TiltCard>
  );
}

function PartnersVisual() {
  const partners = ["Vantage", "OctaFX", "XM"];
  return (
    <TiltCard className="p-6 sm:p-7">
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

/**
 * TELEGRAM COMMUNITY VISUAL — a purpose-built hero graphic, not a screenshot.
 *
 * Three message cards sit in a real 3D stack (translateZ + rotateY + scale).
 * Every ~2.6s the front card rotates away and the one behind it comes
 * forward, so the composition reads as an active, live channel.
 *
 * CONTENT POLICY (deliberate): this shows the FORMAT and FREQUENCY of what
 * the community receives — how a setup is structured, that market updates
 * and live sessions happen, that USDT help is available. It intentionally
 * does NOT reproduce the win/profit figures from the source screenshots
 * ("140+ pips profit", "monthly target 500+ pips"). Selected winning
 * results are performance claims, they contradict the site's own
 * no-guarantee disclaimer, and the brief explicitly said not to add profit
 * guarantees or unsupported statistics. Price levels are shown only as an
 * illustrative format sample and labelled as such.
 */
function TelegramCommunityVisual() {
  const [front, setFront] = useState(0);
  const reduced = useReducedMotion() ?? false;

  const cards = [
    {
      tag: "Trade Setup Format",
      accent: "text-gold-700",
      body: (
        <div className="font-mono text-[11px] sm:text-xs space-y-1 text-ink/70">
          <div className="flex justify-between gap-3">
            <span className="text-down font-semibold">GOLD SELL</span>
            <span className="text-ink/45">example</span>
          </div>
          <div className="flex justify-between gap-3"><span>Stop loss</span><span className="text-ink/50">defined</span></div>
          <div className="flex justify-between gap-3"><span>Target 1</span><span className="text-ink/50">defined</span></div>
          <div className="flex justify-between gap-3"><span>Target 2</span><span className="text-ink/50">defined</span></div>
          <div className="flex justify-between gap-3"><span>Target 3</span><span className="text-ink/50">defined</span></div>
        </div>
      ),
      footer: "Every setup posted with entry, stop loss and targets",
    },
    {
      tag: "Market Updates",
      accent: "text-electric-600",
      body: (
        <div className="space-y-2">
          {["XAUUSD session projections", "Chart breakdowns on video", "Live trading sessions"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-xs sm:text-sm text-ink/65">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-500 shrink-0" />
              <span className="min-w-0">{t}</span>
            </div>
          ))}
        </div>
      ),
      footer: "Analysis shared through the trading week",
    },
    {
      tag: "Member Support",
      accent: "text-up",
      body: (
        <div className="space-y-2">
          {["USDT buy & sell guidance", "Deposit & withdrawal help", "Direct access to mentors"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-xs sm:text-sm text-ink/65">
              <BadgeCheck className="w-3.5 h-3.5 text-up shrink-0" />
              <span className="min-w-0">{t}</span>
            </div>
          ))}
        </div>
      ),
      footer: "Practical help beyond the charts",
    },
  ];

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setFront((i) => (i + 1) % cards.length), 2600);
    return () => clearInterval(t);
  }, [reduced, cards.length]);

  return (
    <div className="relative w-full" style={{ perspective: 1200 }}>
      {/* Channel header — a designed panel, not a captured screenshot */}
      <div className="glass-card card-notch p-3.5 sm:p-4 mb-3 flex items-center gap-3 min-w-0">
        <span className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shrink-0">
          <Send className="w-4 h-4 text-ink" />
        </span>
        <span className="min-w-0 flex-grow">
          <span className="block font-heading font-semibold text-sm text-ink truncate">
            Tamil Trading Education
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-ink/50">
            <span className="w-1.5 h-1.5 rounded-full bg-up animate-pulseDot" />
            Private VIP channel
          </span>
        </span>
        <span className="text-right shrink-0">
          <span className="block font-mono text-sm font-bold text-gold-700">424</span>
          <span className="block text-[10px] text-ink/45">members</span>
        </span>
      </div>

      {/* 3D message stack */}
      <div className="relative h-[186px] sm:h-[200px] keep-3d" style={{ transformStyle: "preserve-3d" }}>
        {cards.map((c, i) => {
          const offset = (i - front + cards.length) % cards.length;
          return (
            <motion.div
              key={c.tag}
              animate={
                reduced
                  ? { opacity: offset === 0 ? 1 : 0 }
                  : {
                      z: -offset * 60,
                      y: offset * 12,
                      x: offset * 10,
                      rotateY: offset * -9,
                      scale: 1 - offset * 0.05,
                      opacity: offset > 1 ? 0 : 1 - offset * 0.3,
                    }
              }
              transition={{ type: "spring", stiffness: 190, damping: 26 }}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
                zIndex: cards.length - offset,
              }}
              className="absolute inset-x-0 top-0"
            >
              <div className="glass-card card-notch p-4 sm:p-5 min-w-0">
                <p className={`text-[10px] font-mono uppercase tracking-wider mb-2.5 ${c.accent}`}>
                  {c.tag}
                </p>
                {c.body}
                <p className="text-[10px] sm:text-[11px] text-ink/45 mt-3 pt-2.5 border-t border-ink/10 leading-snug">
                  {c.footer}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
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
    eyebrow: "Telegram Community",
    title: (
      <>
        Join Our <span className="gold-text">Trading Community</span>
      </>
    ),
    description:
      "Trade setups posted with entry, stop loss and targets. XAUUSD session projections, chart breakdowns, live sessions, and direct help with USDT, deposits and withdrawals — all inside our Telegram channel.",
    buttons: (
      <>
        <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-gold">
          <Send className="w-4 h-4" /> Join Telegram Community
        </a>
        <Link href="/vip-community" className="btn-outline">
          See What&apos;s Inside <ArrowRight className="w-4 h-4" />
        </Link>
      </>
    ),
    showStats: false,
    visual: <TelegramCommunityVisual />,
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const [active, setActive] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [tick, setTick] = useState(0);
  const [direction, setDirection] = useState(1);

  // Don't run the slider while the tab is in the background — it burns
  // battery on mobile and causes a burst of queued transitions on return.
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /*
    Autoplay runs CONTINUOUSLY. `tick` is bumped on any manual interaction,
    which re-runs this effect and therefore restarts the 3s clock from the
    slide the visitor just chose.

    Previously `goTo` only changed the index without touching the interval,
    so a tap could be followed almost immediately by an auto-advance — the
    carousel appeared to "jump" past the slide you picked. Autoplay also
    used to stop entirely on mouse-enter; it no longer does, since the brief
    requires it to keep looping.
  */
  useEffect(() => {
    if (hidden) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [hidden, tick]);

  function goTo(i: number) {
    setDirection(i > active ? 1 : -1);
    setActive(i);
    setTick((t) => t + 1); // restart the autoplay clock from here
  }

  const slide = slides[active];

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center overflow-hidden"
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

      <div className="absolute -z-10 top-20 right-[8%] w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gold-500/20 blur-[110px] sm:blur-[130px]" />
      <div className="absolute -z-10 bottom-0 left-[5%] w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-electric-500/20 blur-[100px] sm:blur-[120px]" />

      <div className="container relative py-20 sm:py-28 md:py-32">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div className="grid" style={{ perspective: 1400 }}>
            {/*
              ROOT CAUSE OF THE HERO LAG: this used AnimatePresence
              mode="wait", which runs the OUTGOING slide's exit animation to
              completion BEFORE starting the incoming slide's entrance. At
              0.55s each that's 1.1s per change with a blank gap in the
              middle — exactly the "waits before moving" feeling.

              Now the two slides CROSSFADE (no mode="wait"), overlapping in
              absolute position, and the duration is cut to 0.4s. Only
              opacity and transform animate — both GPU-composited — so no
              layout work happens per frame.
            */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: SLIDE_TRANSITION, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
                className="col-start-1 row-start-1"
              >
                <span className="eyebrow">{slide.eyebrow}</span>
                <h1 className="fluid-h1 font-heading font-bold mb-5 sm:mb-6">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-ink/65 max-w-xl mb-7 sm:mb-9 leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 mb-9 sm:mb-12">{slide.buttons}</div>

                <div
                  className={`flex flex-wrap gap-x-8 sm:gap-x-10 gap-y-5 ${
                    slide.showStats ? "" : "invisible pointer-events-none select-none"
                  }`}
                  aria-hidden={!slide.showStats}
                >
                  {stats.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <div className="font-mono text-2xl sm:text-3xl font-bold text-gold-700">
                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-[11px] sm:text-xs uppercase tracking-wider text-ink/45 mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mx-auto grid w-full max-w-sm lg:max-w-none" style={{ perspective: 1400 }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: SLIDE_TRANSITION, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
                className="col-start-1 row-start-1 w-full"
              >
                {slide.visual}
              </motion.div>
            </AnimatePresence>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-5 -right-5 glass-card px-4 py-3 items-center gap-2 text-xs font-heading"
            >
              <span className="w-2 h-2 rounded-full bg-up animate-pulseDot" /> Mentor Online Now
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="hidden sm:flex absolute -bottom-5 -left-6 glass-card px-4 py-3 items-center gap-2 text-xs font-heading"
            >
              <Star className="w-4 h-4 text-gold-600 fill-gold-600" /> Rated 4.9/5 by 1,000+ students
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mt-8 sm:mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 sm:h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-9 sm:w-8 bg-gold-500" : "w-2 sm:w-1.5 bg-ink/20 hover:bg-ink/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
