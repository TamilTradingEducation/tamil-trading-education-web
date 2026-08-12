import { MessageCircle, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import { site } from "@/lib/data";

interface CTASectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
}

export default function CTASection({
  eyebrow = "Get Started Today",
  title = (
    <>Ready to trade with a plan instead of guesswork?</>
  ),
  description = "Join thousands of learners in our free community, or enroll in a structured course to fast-track your journey.",
}: CTASectionProps) {
  return (
    <section className="section-tight py-16">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl3 border border-gold-500/20 bg-gradient-to-br from-frame-800 via-frame-900 to-frame-950 px-8 py-16 md:px-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(500px_260px_at_20%_0%,rgba(201,162,75,0.28),transparent_70%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold-300 mb-4 justify-center">
                <span className="w-5 h-px bg-gold-400 inline-block" />
                {eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold max-w-2xl mx-auto mb-4 text-white">{title}</h2>
              <p className="text-white/60 max-w-xl mx-auto mb-9">{description}</p>
              <div className="flex flex-wrap justify-center gap-4">
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
