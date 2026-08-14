"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Wraps the footer so its contents rise up into place as the visitor scrolls
 * to the bottom of the page — a "the floor opens upward" reveal rather than
 * the footer simply being there. Uses whileInView so it fires once, on every
 * device, without a scroll listener.
 */
export default function FooterReveal({ children }: { children: ReactNode }) {
  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        initial={{ opacity: 0, y: 70, rotateX: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", transformOrigin: "bottom center" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
