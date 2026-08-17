import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  Youtube,
  MessageCircle,
  Users,
  Clock,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import CopyEmailTemplate from "@/components/forms/CopyEmailTemplate";
import CTASection from "@/components/home/CTASection";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site, ibPartners, vantagePartner, octafxPartner, xmPartner } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Broker Account Assistance",
  description:
    "Tamil Trading Education is an official IB partner for Vantage, OctaFX and XM. Open your account through us for free VIP community access and a dedicated relationship manager.",
  path: "/broker-assistance",
});

const perks = [
  {
    icon: Users,
    title: "Free VIP Community Access",
    description: "Open an account with our referral code and get complimentary access to our VIP trading community.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Relationship Manager",
    description: "Every partner account gets a named contact for deposits, withdrawals and platform support.",
  },
  {
    icon: Clock,
    title: "24-Hour Resolution",
    description: "Any support issue you raise with us for a partner broker is followed up and resolved within 24 hours.",
  },
];

export default function BrokerAssistancePage() {
  return (
    <>
      <PageHero
        eyebrow="Broker Account Assistance"
        title={<>Official IB Partner for <span className="gold-text">Vantage, OctaFX & XM</span></>}
        description="Open your trading account through us using the referral code below, and you'll unlock free VIP community access plus direct, priority support — at no extra cost to you."
        image={images.brokerSupport}
        crumbLabel="Broker Assistance"
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Why Open Through Us" title={<>What you get as a partner-account holder</>} center />
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="glass-card p-7 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-5">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-ink/55 text-sm leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="flex flex-wrap items-center gap-4 rounded-xl2 border border-gold-500/25 bg-gold-500/[0.06] p-6 max-w-3xl mx-auto">
              <BadgeCheck className="w-8 h-8 text-gold-400 shrink-0" />
              <p className="text-sm text-ink/70 leading-relaxed flex-1">
                <strong className="text-gold-700">Using our referral code is mandatory</strong> for
                the VIP access and dedicated support above to apply — an account opened without it
                can&apos;t be linked to us after the fact in most cases, so double-check the code before
                you submit your application.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-navy-800/20">
        <div className="container">
          <SectionHeading
            eyebrow="Account Opening Guidance"
            title={<>Watch the walkthrough before you apply</>}
            description="Each broker has its own step-by-step account opening video on our YouTube channel — start there if it's your first time."
          />
          <Reveal>
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 sm:p-7 flex items-center gap-3 sm:gap-5 max-w-2xl min-w-0 hover:border-gold-500/40 transition-all"
            >
              <span className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-red-500/10 border border-red-400/30 flex items-center justify-center text-red-400 shrink-0">
                <Youtube className="w-5 h-5 sm:w-7 sm:h-7" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-heading font-semibold">Tamil Trading Education — YouTube</span>
                <span className="block text-sm text-ink/50">Account opening guidance for every broker we partner with</span>
              </span>
              <ExternalLink className="w-5 h-5 text-ink/40 shrink-0" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our Partner Brokers" title={<>Open or link your account</>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {/* Vantage */}
            <Reveal>
              <div className="glass-card p-4 sm:p-7 h-full flex flex-col min-w-0">
                <span className="tag-pill w-fit mb-4">{vantagePartner.name}</span>
                <h3 className="font-heading font-semibold text-xl mb-4">Vantage</h3>
                <a href={vantagePartner.accountLink} target="_blank" rel="noopener noreferrer" className="btn-gold w-full mb-4">
                  Open Vantage Account
                </a>
                <div className="rounded-xl2 border border-gold-500/40 bg-gold-500/10 p-3.5 sm:p-5 mb-5 sm:mb-6 min-w-0">
                  <p className="text-xs uppercase tracking-wide text-ink/50 mb-1.5">
                    Referral Code <span className="text-gold-700 font-bold">— Mandatory</span>
                  </p>
                  <p className="font-mono text-2xl sm:text-3xl font-extrabold text-gold-700 tracking-wide break-all min-w-0">{vantagePartner.referralCode}</p>
                  <p className="text-xs text-ink/50 mt-2 leading-relaxed">
                    Auto-applied via the link above. <strong className="text-ink/70">You must use this code</strong> to receive free VIP community access and a dedicated relationship manager.
                  </p>
                </div>

                <p className="font-heading font-semibold text-sm mb-2">Already have a Vantage account?</p>
                <p className="text-xs text-ink/50 mb-4 leading-relaxed">
                  Send this exact email to Vantage support to map your existing account under our IB code:
                </p>
                <CopyEmailTemplate
                  to={vantagePartner.transferEmail.to}
                  cc={vantagePartner.transferEmail.cc}
                  subject={vantagePartner.transferEmail.subject}
                  body={vantagePartner.transferEmail.body}
                />
              </div>
            </Reveal>

            {/* OctaFX */}
            <Reveal delay={0.08}>
              <div className="glass-card p-4 sm:p-7 h-full flex flex-col min-w-0">
                <span className="tag-pill w-fit mb-4">{octafxPartner.name}</span>
                <h3 className="font-heading font-semibold text-xl mb-4">OctaFX</h3>
                <a href={octafxPartner.accountLink} target="_blank" rel="noopener noreferrer" className="btn-gold w-full mb-4">
                  Open OctaFX Account
                </a>
                <div className="rounded-xl2 border border-gold-500/40 bg-gold-500/10 p-3.5 sm:p-5 mb-5 sm:mb-6 min-w-0">
                  <p className="text-xs uppercase tracking-wide text-ink/50 mb-1.5">
                    Referral Code <span className="text-gold-700 font-bold">— Mandatory</span>
                  </p>
                  <p className="font-mono text-2xl sm:text-3xl font-extrabold text-gold-700 tracking-wide break-all min-w-0">{octafxPartner.referralCode}</p>
                  <p className="text-xs text-ink/50 mt-2 leading-relaxed">
                    Auto-applied via the link above. <strong className="text-ink/70">You must use this code</strong> to receive free VIP community access and a dedicated relationship manager.
                  </p>
                </div>

                <p className="font-heading font-semibold text-sm mb-2">Already have an OctaFX account?</p>
                <p className="text-xs text-ink/50 mb-4 leading-relaxed">
                  Use this link to change your IB to us — it applies our code automatically:
                </p>
                <a
                  href={octafxPartner.ibChangeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-base font-extrabold"
                >
                  Change IB to Tamil Trading Education
                </a>
              </div>
            </Reveal>

            {/* XM */}
            <Reveal delay={0.16}>
              <div className="glass-card p-4 sm:p-7 h-full flex flex-col min-w-0">
                <span className="tag-pill w-fit mb-4">{xmPartner.name}</span>
                <h3 className="font-heading font-semibold text-xl mb-4">XM</h3>
                <p className="text-ink/55 text-sm mb-6 flex-grow">{xmPartner.note}</p>
                <a
                  href={`${site.whatsapp}?text=${encodeURIComponent("Hi, I'd like to open an XM account through Tamil Trading Education.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle className="w-4 h-4" /> Set Up XM on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="text-center text-sm text-ink/45 mt-10">
              Anything not working, or need help with a deposit, withdrawal, or other support
              request? Message us — we&apos;ll contact the broker directly and resolve it.
            </p>
            <div className="text-center mt-4">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="w-4 h-4" /> Message Us for Support
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight py-16">
        <div className="container">
          <Reveal>
            <div className="flex gap-4 rounded-xl2 border border-red-400/25 bg-red-500/[0.06] p-6 max-w-4xl mx-auto">
              <AlertTriangle className="w-5 h-5 text-down shrink-0 mt-0.5" />
              <p className="text-sm text-red-800/80 leading-relaxed">
                Tamil Trading Education is an Introducing Broker (IB) partner for the brokers
                listed above and earns a standard IB commission on accounts opened through our
                referral codes, at no extra cost to you. We are not a broker ourselves, do not
                hold or manage your funds, and do not guarantee trading profits. Always trade
                only with capital you can afford to lose.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to Open an Account?"
        title={<>Start with the broker that fits how you trade</>}
      />
    </>
  );
}
