import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Risk Disclaimer",
  description: "Risk Disclaimer for Tamil Trading Education — Forex trading involves significant risk and is not suitable for every investor.",
  path: "/risk-disclaimer",
});

export default function RiskDisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Risk <span className="gold-text">Disclaimer</span></>}
        description={`Last updated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
        crumbLabel="Risk Disclaimer"
      />
      <section className="section">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="flex gap-4 rounded-xl2 border border-red-400/25 bg-red-500/[0.06] p-6 mb-10">
              <AlertTriangle className="w-6 h-6 text-down shrink-0 mt-0.5" />
              <p className="text-red-800/85 leading-relaxed">
                Forex trading involves significant risk and may not be suitable for every
                investor. {site.name} provides educational content only and does not offer
                investment or financial advice. Past performance is not indicative of future
                results.
              </p>
            </div>
          </Reveal>

          <div className="space-y-10 text-ink/65 leading-relaxed">
            <Reveal delay={0.05}>
              <h2 className="text-xl font-heading font-bold text-ink mb-3">Educational Content Only</h2>
              <p>
                All content on this website — including courses, live sessions, market analysis,
                blog articles and community discussion — is intended strictly for educational
                purposes. Nothing on this website, in our courses, or in our community channels
                should be interpreted as a recommendation to buy, sell, or hold any financial
                instrument.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-xl font-heading font-bold text-ink mb-3">Trading Risk</h2>
              <p>
                Foreign exchange, commodities, cryptocurrency and index trading carry a high
                level of risk to your capital and can result in losses that exceed your initial
                deposit, depending on the instrument and leverage used. You should not trade with
                money you cannot afford to lose.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="text-xl font-heading font-bold text-ink mb-3">No Guaranteed Outcomes</h2>
              <p>
                {site.name} does not guarantee profits, specific win rates, or any particular
                financial outcome from following our education, mentorship, or community
                discussion. Past performance shared in testimonials or case studies is not
                indicative of future results and is not representative of typical outcomes.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-xl font-heading font-bold text-ink mb-3">Independent Decision-Making</h2>
              <p>
                Trading decisions and their outcomes remain the sole responsibility of the
                individual trader. We strongly encourage learners to trade only with risk capital
                they can afford to lose, and to seek independent, qualified financial advice
                where appropriate before making any investment decision.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <h2 className="text-xl font-heading font-bold text-ink mb-3">Third-Party Market Data</h2>
              <p>
                Live charts and market data displayed on this website are provided via
                third-party TradingView widgets for informational purposes and may be delayed or
                inaccurate. {site.name} does not warrant the accuracy, completeness, or
                timeliness of this data.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
