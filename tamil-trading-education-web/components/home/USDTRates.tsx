import { ArrowDownCircle, ArrowUpCircle, Clock, MessageCircle } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { usdtRates, site } from "@/lib/data";

/**
 * Manual USDT/INR rate card.
 *
 * These aren't live-fed like the TradingView widgets — Tamil Trading Education
 * updates them by hand each day. To change the rate, edit `usdtRates` in
 * lib/data.ts (two numbers: buy and sell). Everything else updates itself.
 */
export default function USDTRates() {
  return (
    <section className="section-tight py-16">
      <div className="container">
        <Reveal>
          <div className="glass-card p-8 md:p-10 max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <span className="eyebrow mb-0">USDT / INR Rate</span>
              <span className="flex items-center gap-1.5 text-xs text-ink/40 font-mono">
                <Clock className="w-3.5 h-3.5" /> Updated {usdtRates.lastUpdated}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              <div className="rounded-xl2 border border-up/30 bg-up/[0.06] p-6">
                <div className="flex items-center gap-2 mb-3 text-up">
                  <ArrowDownCircle className="w-5 h-5" />
                  <span className="font-heading font-semibold text-sm uppercase tracking-wide">
                    Buy USDT
                  </span>
                </div>
                <p className="font-mono text-3xl font-bold text-ink">
                  ₹{usdtRates.buy} <span className="text-base text-ink/40 font-body">/ USDT</span>
                </p>
              </div>

              <div className="rounded-xl2 border border-down/30 bg-down/[0.06] p-6">
                <div className="flex items-center gap-2 mb-3 text-down">
                  <ArrowUpCircle className="w-5 h-5" />
                  <span className="font-heading font-semibold text-sm uppercase tracking-wide">
                    Sell USDT
                  </span>
                </div>
                <p className="font-mono text-3xl font-bold text-ink">
                  ₹{usdtRates.sell} <span className="text-base text-ink/40 font-body">/ USDT</span>
                </p>
              </div>
            </div>

            <p className="text-ink/45 text-xs mb-6 leading-relaxed">
              Rates are updated manually and may change during the day based on market
              conditions. Message us on WhatsApp to confirm the live rate and complete a trade.
            </p>

            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(
                "Hi, I'd like to buy/sell USDT. Please confirm today's rate."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" /> Trade USDT on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
