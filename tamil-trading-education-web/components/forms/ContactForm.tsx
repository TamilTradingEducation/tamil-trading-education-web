"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/lib/data";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Best-effort: also log this to the server (and, once configured, email it).
    // We don't block on this — WhatsApp below is the guaranteed delivery path.
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});

    const message = [
      "New website inquiry — Tamil Trading Education",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Topic: ${data.topic}`,
      `Message: ${data.message}`,
    ].join("\n");

    window.open(`${site.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

    setStatus("success");
    form.reset();
  }

  return (
    <div className="glass-card p-8 md:p-10 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Almost done!</h3>
            <p className="text-ink/60">
              We opened WhatsApp with your details filled in — just hit send there and our team
              will reply directly.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" exit={{ opacity: 0 }}>
            <span className="eyebrow">Send an Inquiry</span>
            <h3 className="font-heading font-bold text-2xl mb-1">We&apos;ll get back to you within 24 hours</h3>

            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <Field label="Full Name" name="name" type="text" placeholder="Your name" required />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+91 00000 00000" required />
            </div>
            <Field label="Email Address" name="email" type="email" placeholder="you@email.com" required />

            <div>
              <label className="block text-sm font-heading text-ink/60 mb-2">I&apos;m interested in</label>
              <select
                name="topic"
                required
                className="w-full bg-navy-200/60 border border-navy-600/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
              >
                <option value="">Select a topic</option>
                <option>Course Enrollment</option>
                <option>VIP Community</option>
                <option>Broker Account Assistance</option>
                <option>IB Partner Program</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-heading text-ink/60 mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="How can we help?"
                className="w-full bg-navy-200/60 border border-navy-600/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 resize-y"
              />
            </div>

            <button type="submit" className="btn-gold w-full">
              Send via WhatsApp
            </button>
            <p className="text-xs text-ink/40 text-center pt-1">
              This form is for inquiries only and does not constitute a request for investment advice.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-heading text-ink/60 mb-2">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-navy-200/60 border border-navy-600/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
      />
    </div>
  );
}
