"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { courses, site } from "@/lib/data";

export default function EnrollmentForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Best-effort background log (and, once configured, email) — not required for delivery.
    fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});

    const message = [
      "New course enrollment request — Tamil Trading Education",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Course: ${data.course}`,
      `Experience: ${data.experience || "Not provided"}`,
    ].join("\n");

    window.open(`${site.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

    setStatus("success");
    form.reset();
  }

  return (
    <div className="glass-card p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Almost done!</h3>
            <p className="text-ink/60">
              We opened WhatsApp with your enrollment details filled in — just hit send there and
              our team will confirm your seat.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" exit={{ opacity: 0 }}>
            <span className="eyebrow">Course Enrollment</span>
            <h3 className="font-heading font-bold text-2xl mb-1">Reserve your seat</h3>

            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-sm font-heading text-ink/60 mb-2">Full Name</label>
                <input name="name" required placeholder="Your name" className="w-full bg-navy-200/60 border border-navy-600/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" />
              </div>
              <div>
                <label className="block text-sm font-heading text-ink/60 mb-2">Phone Number</label>
                <input name="phone" type="tel" required placeholder="+91 00000 00000" className="w-full bg-navy-200/60 border border-navy-600/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading text-ink/60 mb-2">Email Address</label>
              <input name="email" type="email" required placeholder="you@email.com" className="w-full bg-navy-200/60 border border-navy-600/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" />
            </div>

            <div>
              <label className="block text-sm font-heading text-ink/60 mb-2">Course of Interest</label>
              <select name="course" required className="w-full bg-navy-200/60 border border-navy-600/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20">
                <option value="">Select a course</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-heading text-ink/60 mb-2">Trading Experience (optional)</label>
              <textarea name="experience" rows={3} placeholder="Tell us briefly about your trading background" className="w-full bg-navy-200/60 border border-navy-600/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 resize-y" />
            </div>

            <button type="submit" className="btn-gold w-full">
              Submit Enrollment
            </button>
            <p className="text-xs text-ink/40 text-center pt-1">
              By submitting, you agree to be contacted by our team. See our{" "}
              <a href="/risk-disclaimer" className="text-gold-700 underline">risk disclaimer</a>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
