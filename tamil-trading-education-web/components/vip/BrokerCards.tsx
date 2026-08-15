"use client";

import { motion } from "framer-motion";
import { ExternalLink, BadgeCheck, MessageCircle } from "lucide-react";
import { vantagePartner, octafxPartner, xmPartner, site } from "@/lib/data";

/**
 * 3D broker/IB modules. Each card has a coloured back-plate pushed away on
 * the Z axis and a face that lifts on hover, so the three partners read as
 * physical modules rather than three flat logos in a row.
 *
 * All links and referral codes come from lib/data.ts — nothing is
 * hard-coded here, so updating a code in one place updates this section.
 */
const brokers = [
  {
    name: vantagePartner.name,
    code: vantagePartner.referralCode,
    href: vantagePartner.accountLink,
    accent: "from-[#1a4b6e] to-[#0d2a3f]",
    ring: "border-[#2f7fb0]/50",
    note: "Open a new Vantage account under our IB, or request an account transfer.",
  },
  {
    name: octafxPartner.name,
    code: octafxPartner.referralCode,
    href: octafxPartner.accountLink,
    accent: "from-[#1a1f4b] to-[#0b0e26]",
    ring: "border-[#4a54b8]/50",
    note: "Open with our IB code, or use the IB-change link if you already have an account.",
  },
  {
    name: xmPartner.name,
    code: null,
    href: site.whatsapp,
    accent: "from-[#3a1414] to-[#1a0808]",
    ring: "border-[#b03535]/50",
    note: xmPartner.note,
  },
];

export default function BrokerCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1300 }}>
      {brokers.map((b, i) => (
        <motion.div
          key={b.name}
          initial={{ opacity: 0, y: 28, rotateX: 16 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          style={{ transformStyle: "preserve-3d" }}
          className="keep-3d relative min-w-0"
        >
          <div
            aria-hidden
            className={`absolute inset-x-2 inset-y-1 rounded-xl3 bg-gradient-to-br ${b.accent} border ${b.ring}`}
            style={{ transform: "translateZ(-24px)" }}
          />
          <div
            className={`keep-3d relative rounded-xl3 p-6 bg-gradient-to-br ${b.accent} border ${b.ring} flex flex-col h-full`}
          >
            <div
              className="flex items-center justify-between gap-3 mb-4"
              style={{ transform: "translateZ(24px)" }}
            >
              <span className="font-heading font-bold text-xl text-white truncate">{b.name}</span>
              <BadgeCheck className="w-5 h-5 text-gold-300 shrink-0" />
            </div>

            {b.code && (
              <div
                className="mb-4 rounded-xl border border-gold-500/30 bg-black/25 px-3 py-2.5"
                style={{ transform: "translateZ(18px)" }}
              >
                <p className="text-[10px] font-mono uppercase tracking-wider text-gold-300/80 mb-0.5">
                  Referral code — mandatory
                </p>
                <p className="font-mono text-lg text-white break-all">{b.code}</p>
              </div>
            )}

            <p className="text-white/55 text-sm leading-relaxed flex-grow mb-5 min-w-0">{b.note}</p>

            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transform: "translateZ(22px)" }}
              className="btn-gold w-full"
            >
              {b.code ? (
                <>
                  Open {b.name} Account <ExternalLink className="w-4 h-4" />
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" /> Ask About {b.name}
                </>
              )}
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
