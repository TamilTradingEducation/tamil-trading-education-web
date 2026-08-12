import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import AdvancedChart from "@/components/market/AdvancedChart";
import MarketOverview from "@/components/market/MarketOverview";
import EconomicCalendar from "@/components/market/EconomicCalendar";
import ForexHeatmap from "@/components/market/ForexHeatmap";
import CryptoMarket from "@/components/market/CryptoMarket";
import HotlistsWidget from "@/components/market/HotlistsWidget";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "Live Market Analysis",
  description:
    "Live TradingView chart, market overview, economic calendar, forex heat map, top gainers & losers and cryptocurrency market data — all in one place.",
  path: "/market-analysis",
});

export default function MarketAnalysisPage() {
  return (
    <>
      <PageHero
        eyebrow="Live Market Analysis"
        title={<>Real markets, <span className="gold-text">real time</span></>}
        description="Every widget on this page is powered by TradingView and updates automatically — the same data our mentors reference in live sessions."
        image={images.candlestickChart}
        crumbLabel="Market Analysis"
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Live Chart" title={<>Advanced Real-Time Chart</>} />
          <Reveal>
            <div className="glass-card p-2 md:p-3">
              <AdvancedChart symbol="OANDA:XAUUSD" height={780} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-navy-800/20">
        <div className="container grid lg:grid-cols-2 gap-6">
          <div>
            <SectionHeading eyebrow="Market Overview" title={<>Forex, Commodities, Crypto & Indices</>} />
            <Reveal>
              <div className="glass-card p-2 md:p-3">
                <MarketOverview height={440} />
              </div>
            </Reveal>
          </div>
          <div>
            <SectionHeading eyebrow="Economic Calendar" title={<>This Week's Key Events</>} />
            <Reveal delay={0.1}>
              <div className="glass-card p-2 md:p-3">
                <EconomicCalendar height={440} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Forex Heat Map" title={<>Currency Strength at a Glance</>} />
          <Reveal>
            <div className="glass-card p-2 md:p-3">
              <ForexHeatmap height={440} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-navy-800/20">
        <div className="container grid lg:grid-cols-2 gap-6">
          <div>
            <SectionHeading eyebrow="Top Gainers & Losers" title={<>Today's Biggest Movers</>} />
            <Reveal>
              <div className="glass-card p-2 md:p-3">
                <HotlistsWidget height={420} />
              </div>
            </Reveal>
          </div>
          <div>
            <SectionHeading eyebrow="Cryptocurrency Market" title={<>Live Crypto Screener</>} />
            <Reveal delay={0.1}>
              <div className="glass-card p-2 md:p-3">
                <CryptoMarket height={420} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-tight py-16">
        <div className="container">
          <Reveal>
            <div className="flex gap-4 rounded-xl2 border border-red-400/25 bg-red-500/[0.06] p-6 max-w-4xl mx-auto">
              <AlertTriangle className="w-5 h-5 text-down shrink-0 mt-0.5" />
              <p className="text-sm text-red-800/80 leading-relaxed">
                All market data and commentary on this page is for educational purposes only and
                does not constitute financial advice or a recommendation to trade. Markets are
                volatile and past performance is not indicative of future results.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
