import { AlertTriangle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import AdvancedChart from "@/components/market/AdvancedChart";
import TechnicalAnalysisGauge from "@/components/market/TechnicalAnalysisGauge";
import Link from "next/link";

/**
 * Home page live market section — locked to XAUUSD (Gold) only, since
 * that's the sole instrument this business trades. To change the symbol
 * later, edit the `symbol` prop passed to both widgets below (e.g. to
 * "OANDA:EURUSD" for Euro/Dollar). TradingView symbol format is
 * EXCHANGE:TICKER — OANDA is used for forex/metals pairs.
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
          description="Powered by TradingView — a live, auto-updating gold chart plus a real-time buy/sell signal gauge, since gold is what we trade."
        />
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          <Reveal>
            <div className="glass-card p-2 md:p-3">
              <AdvancedChart symbol="OANDA:XAUUSD" height={780} />
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
                  personalised financial advice. It is provided for educational reference only —
                  always apply your own risk management before trading.
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
