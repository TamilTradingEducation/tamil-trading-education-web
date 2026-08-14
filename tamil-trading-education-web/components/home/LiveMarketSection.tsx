import { AlertTriangle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import AdvancedChart from "@/components/market/AdvancedChart";
import AuthorIdeasFeed from "@/components/market/AuthorIdeasFeed";
import TechnicalAnalysisGauge from "@/components/market/TechnicalAnalysisGauge";
import Link from "next/link";

/**
 * Home page live market section — two parts:
 * 1. A genuine live, auto-updating XAUUSD price chart (TradingView) plus
 *    a real-time buy/sell signal gauge.
 * 2. Our own daily chart ideas, pulled straight from Kripson's TradingView
 *    profile — updates automatically the moment a new one is published,
 *    no manual embedding needed. To change the TradingView username later,
 *    edit `username` in components/market/AuthorIdeasFeed.tsx.
 */
export default function LiveMarketSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Live Gold Market"
          title={
            <>
              Real-time XAU/USD, right on our <span className="gold-text">homepage</span>
            </>
          }
          description="Powered by TradingView — a live, auto-updating gold price chart plus a real-time buy/sell signal gauge, since gold is what we trade."
        />
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mb-6">
          <Reveal>
            <div className="glass-card p-2 md:p-3">
              <AdvancedChart symbol="OANDA:XAUUSD" height={620} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-card p-4 md:p-5 flex flex-col">
              <p className="eyebrow mb-4">XAU/USD Signal</p>
              <TechnicalAnalysisGauge symbol="OANDA:XAUUSD" height={420} />
              <div className="flex gap-3 rounded-xl2 border border-red-400/25 bg-red-500/[0.05] p-4 mt-4">
                <AlertTriangle className="w-4 h-4 text-down shrink-0 mt-0.5" />
                <p className="text-xs text-ink/60 leading-relaxed">
                  This signal is an automated technical indicator summary from TradingView, not
                  personalised financial advice — always apply your own risk management before
                  trading.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass-card p-2 md:p-3">
            <div className="px-4 pt-4">
              <span className="eyebrow mb-1">Our Daily Chart Ideas</span>
              <h3 className="font-heading font-semibold text-lg mb-3">
                Straight from our TradingView profile
              </h3>
            </div>
            <AuthorIdeasFeed height={520} />
          </div>
        </Reveal>

        <div className="text-center mt-10">
          <Link href="/market-analysis" className="btn-outline">
            View Full Market Analysis Suite
          </Link>
        </div>
      </div>
    </section>
  );
}
