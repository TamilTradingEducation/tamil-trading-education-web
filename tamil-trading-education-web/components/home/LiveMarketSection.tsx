import { AlertTriangle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import AuthorIdeasFeed from "@/components/market/AuthorIdeasFeed";
import TechnicalAnalysisGauge from "@/components/market/TechnicalAnalysisGauge";
import Link from "next/link";

/**
 * Home page live market section — shows Kripson's own daily gold chart
 * ideas (posted on TradingView) instead of a generic chart, plus a live
 * XAUUSD buy/sell signal gauge. The ideas feed updates automatically
 * whenever a new chart is published — no manual embedding needed.
 * To change the TradingView username later, edit `username` in
 * components/market/AuthorIdeasFeed.tsx.
 */
export default function LiveMarketSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Live Gold Market"
          title={
            <>
              Our own daily XAU/USD chart ideas, right on our <span className="gold-text">homepage</span>
            </>
          }
          description="Straight from our TradingView profile — the same chart we draw and publish with our own strategy, every trading day, plus a real-time buy/sell signal gauge."
        />
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          <Reveal>
            <div className="glass-card p-2 md:p-3">
              <AuthorIdeasFeed height={780} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-card p-4 md:p-5 flex flex-col">
              <p className="eyebrow mb-4">XAU/USD Signal</p>
              <TechnicalAnalysisGauge symbol="OANDA:XAUUSD" height={480} />
              <div className="flex gap-3 rounded-xl2 border border-red-400/25 bg-red-500/[0.05] p-4 mt-4">
                <AlertTriangle className="w-4 h-4 text-down shrink-0 mt-0.5" />
                <p className="text-xs text-ink/60 leading-relaxed">
                  This signal is an automated technical indicator summary from TradingView, not
                  personalised financial advice. Chart ideas above are our own trading analysis
                  for educational reference only — always apply your own risk management before
                  trading.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="text-center mt-10">
          <Link href="/market-analysis" className="btn-outline">
            View Full Market Analysis Suite
          </Link>
        </div>
      </div>
    </section>
  );
}
