"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, UserPlus, Users, Coins, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/data";

/**
 * Floating action button — expands into a short menu of the most common
 * reasons someone reaches out, each opening WhatsApp with a relevant
 * pre-filled message instead of dumping every visitor into one blank chat.
 */
const options = [
  {
    label: "Open a Broker Account",
    icon: UserPlus,
    message: "Hi, I'd like to open a trading account through Tamil Trading Education. Please guide me.",
  },
  {
    label: "Join VIP Community",
    icon: Users,
    message: "Hi, I'm interested in joining the VIP Community. Could you share the details?",
  },
  {
    label: "Buy / Sell USDT",
    icon: Coins,
    message: "Hi, I'd like to buy/sell USDT. Please confirm today's rate.",
  },
  {
    label: "General Question",
    icon: HelpCircle,
    message: "Hi, I have a question about Tamil Trading Education.",
  },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-card p-2 w-64 shadow-soft"
          >
            <p className="px-3 pt-2 pb-1 text-xs font-heading font-semibold text-ink/50 uppercase tracking-wide">
              How can we help?
            </p>
            {options.map((opt) => (
              <a
                key={opt.label}
                href={`${site.whatsapp}?text=${encodeURIComponent(opt.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-200/60 transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  <opt.icon className="w-4 h-4" />
                </span>
                <span className="text-sm font-heading font-medium text-ink">{opt.label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with us on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_10px_30px_-6px_rgba(16,185,129,0.6)]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {!open && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
