"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_10px_30px_-6px_rgba(16,185,129,0.6)]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
      <MessageCircle className="w-6 h-6 text-white relative" />
    </motion.a>
  );
}
