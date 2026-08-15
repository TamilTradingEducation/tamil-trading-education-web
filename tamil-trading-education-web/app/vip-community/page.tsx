import type { Metadata } from "next";
import { MessageCircle, Send, Youtube, ShieldCheck, Clock, Users } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import CandlestickField from "@/components/shared/CandlestickField";
import VipBenefits from "@/components/vip/VipBenefits";
import VipPricing from "@/components/vip/VipPricing";
import BrokerCards from "@/components/vip/BrokerCards";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "VIP Community",
  description:
    "Join the Tamil Trading Education VIP Community — VIP trading signals, 1-to-1 mentorship, account opening and IB change support, deposit and withdrawal help, USDT buy/sell guidance, private Telegram access and 24/7 support.",
  path: "/vip-community",
});

const trustPoints = [
  { icon: Users, label: "Active daily discussion" },
  { icon: ShieldCheck, label: "Actively moderated" },
  { icon: Clock, label: "24/7 support" },
];

/**
 * Page flow (as specified):
 *   Introduction → 3D VIP Benefits → 3D Membership Pricing
 *   → Recommended Broker / IB Options → Join VIP CTA
 *
 * Each section uses a different 3D interaction so the page doesn't feel
 * repetitive: benefits use a stacked deck on mobile / tilt grid on desktop,
 * pricing uses coverflow on mobile / a lifted module grid on desktop, and
 * brokers use hover-lift depth modules.
 */
export default function VipCommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="VIP Community"
        title={
          <>
            Premium access to the <span className="gold-text">full trading desk</span>
          </>
        }
        description="Signals with the reasoning explained, one-to-one mentorship, broker and funding support, and a private community that actually shows up every day."
        image={images.vipCommunity}
        crumbLabel="VIP Community"
      />

      {/* Intro + trust strip */}
      <section className="section-tight relative overflow-x-clip">
        <CandlestickField count={9} maxOpacity={0.12} />
        <div className="container relative">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-ink/65 text-base sm:text-lg leading-relaxed">
                VIP membership bundles everything we offer into one place — the analysis, the
                mentorship, and the practical account support that most education providers leave
                you to figure out alone.
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-7">
                {trustPoints.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-2 text-sm text-ink/55"
                  >
                    <t.icon className="w-4 h-4 text-gold-600 shrink-0" />
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3D VIP Benefits */}
      <section className="section bg-navy-800/20 overflow-x-clip">
        <div className="container">
          <SectionHeading
            eyebrow="What's Included"
            title={
              <>
                Everything inside <span className="gold-text">VIP</span>
              </>
            }
            description="Seven things you get from day one — swipe through on mobile."
            center
          />
          <VipBenefits />
        </div>
      </section>

      {/* 3D Membership Pricing */}
      <section className="section relative overflow-x-clip">
        <CandlestickField count={8} maxOpacity={0.1} />
        <div className="container relative">
          <SectionHeading
            eyebrow="Membership Plans"
            title={
              <>
                Choose your <span className="gold-text">access period</span>
              </>
            }
            description="Longer plans cost less per month. Every plan includes all VIP benefits — nothing is held back for higher tiers."
            center
          />
          <VipPricing />
          <p className="text-center text-xs text-ink/40 mt-8 max-w-xl mx-auto leading-relaxed">
            Prices in USD. VIP membership is educational access only — it is not investment advice,
            and no trading profit is guaranteed.
          </p>
        </div>
      </section>

      {/* Recommended Broker / IB Options */}
      <section className="section bg-navy-800/20 overflow-x-clip">
        <div className="container">
          <SectionHeading
            eyebrow="Recommended Brokers"
            title={
              <>
                Join through our <span className="gold-text">IB partnership</span>
              </>
            }
            description="Open a new account — or move an existing one — under our IB using the referral codes below, and you get lifetime free VIP signals plus a dedicated relationship manager at no extra cost."
            center
          />
          <BrokerCards />
          <Reveal>
            <p className="text-center text-sm text-ink/50 mt-8 max-w-2xl mx-auto leading-relaxed">
              The referral code is what links your account to us. Without it we can&apos;t provide
              the relationship manager, priority deposit and withdrawal support, or the free VIP
              access that comes with a partner account.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Join VIP CTA */}
      <section className="section-tight overflow-x-clip">
        <div className="container">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl3 border border-gold-500/25 bg-gradient-to-br from-frame-800 via-frame-900 to-frame-950 px-6 py-14 sm:px-10 sm:py-16 text-center">
              <div
                aria-hidden
                className="absolute -top-16 left-1/4 w-72 h-72 rounded-full bg-gold-500/25 blur-[100px]"
              />
              <div
                aria-hidden
                className="absolute -bottom-16 right-1/4 w-72 h-72 rounded-full bg-electric-500/20 blur-[100px]"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold-300 mb-4">
                  <span className="w-5 h-px bg-gold-400 inline-block" />
                  Ready to Join?
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white max-w-2xl mx-auto mb-4">
                  Your seat in the VIP Community is one message away
                </h2>
                <p className="text-white/60 max-w-xl mx-auto mb-9">
                  Message us and we&apos;ll confirm your plan, set up your access, and walk you
                  through broker setup if you need it.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4" /> Join VIP Community
                  </a>
                  <a
                    href={site.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full sm:w-auto bg-electric-500/15 border border-electric-400/50 text-electric-400 hover:bg-electric-500/25 hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" /> Telegram Community
                  </a>
                  <a
                    href={site.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full sm:w-auto border border-white/20 text-white/80 hover:border-white/40 hover:-translate-y-0.5"
                  >
                    <Youtube className="w-4 h-4" /> Watch First
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
