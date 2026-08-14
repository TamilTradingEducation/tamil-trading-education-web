"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  UserPlus,
  Coins,
  GraduationCap,
  Phone,
  Send,
} from "lucide-react";
import { site } from "@/lib/data";

const actions = [
  {
    label: "Open Trading Account",
    hint: "Vantage · OctaFX · XM",
    icon: UserPlus,
    href: "/broker-assistance",
    internal: true,
    tone: "bg-gold-500/15 text-gold-700 border-gold-500/40",
  },
  {
    label: "USDT Buy / Sell",
    hint: "Fast, guided deposits & withdrawals",
    icon: Coins,
    href: `https://wa.me/918610066102?text=${encodeURIComponent(
      "Hi, I'd like help with USDT buying/selling."
    )}`,
    internal: false,
    tone: "bg-emerald-500/15 text-emerald-700 border-emerald-500/40",
  },
  {
    label: "Course Enrollment",
    hint: "Beginner to advanced Forex",
    icon: GraduationCap,
    href: "/courses",
    internal: true,
    tone: "bg-electric-500/15 text-electric-600 border-electric-500/40",
  },
  {
    label: "Chat on WhatsApp",
    hint: "Talk to a mentor now",
    icon: MessageCircle,
    href: site.whatsapp,
    internal: false,
    tone: "bg-emerald-500/15 text-emerald-700 border-emerald-500/40",
  },
  {
    label: "Join Telegram",
    hint: "Free community & signals",
    icon: Send,
    href: site.telegram,
    internal: false,
    tone: "bg-electric-500/15 text-electric-600 border-electric-500/40",
  },
  {
    label: "Call Us",
    hint: site.phone,
    icon: Phone,
    href: `tel:${site.phoneRaw}`,
    internal: false,
    tone: "bg-navy-500/15 text-ink border-navy-600/40",
  },
];

/**
 * Expandable floating action button. Each action now carries a label AND a
 * one-line hint, so visitors know what they're tapping before they tap it.
 * Items fly out with a staggered 3D rotateX so they read as physical cards
 * unfolding rather than a plain list appearing.
 */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <div
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5"
        style={{ perspective: 900 }}
      >
        <AnimatePresence>
          {open &&
            actions.map((a, i) => {
              const inner = (
                <>
                  <span
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${a.tone}`}
                  >
                    <a.icon className="w-4 h-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading font-semibold text-[13px] text-ink leading-tight truncate">
                      {a.label}
                    </span>
                    <span className="block text-[11px] text-ink/50 leading-tight truncate">
                      {a.hint}
                    </span>
                  </span>
                </>
              );

              const cls =
                "glass-card flex items-center gap-3 pl-2.5 pr-4 py-2.5 max-w-[80vw] sm:max-w-xs shadow-soft";

              return (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, x: 24, rotateX: -45, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 24, rotateX: -30, scale: 0.92 }}
                  transition={{
                    duration: 0.22,
                    delay: (actions.length - 1 - i) * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "right center" }}
                >
                  {a.internal ? (
                    <Link href={a.href} className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  ) : (
                    <a
                      href={a.href}
                      target={a.href.startsWith("tel:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className={cls}
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </a>
                  )}
                </motion.div>
              );
            })}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close quick actions" : "Open quick actions"}
          aria-expanded={open}
          className="relative w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_10px_30px_-6px_rgba(16,185,129,0.6)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 14 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          {!open && (
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
          )}
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.18 }}
            className="relative text-white"
          >
            {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.span>
        </motion.button>
      </div>
    </>
  );
}
