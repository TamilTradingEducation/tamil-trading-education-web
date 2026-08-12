"use client";

import { useEffect, useRef } from "react";

/**
 * TradingView Ticker Tape widget.
 * Docs: https://www.tradingview.com/widget/ticker-tape/
 * Renders a live, auto-scrolling strip of real-time prices — no API key required.
 */
export default function TickerTape() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || container.current.childElementCount > 0) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "OANDA:XAUUSD", title: "Gold" },
        { proName: "FX:EURUSD", title: "EUR/USD" },
        { proName: "FX:GBPUSD", title: "GBP/USD" },
        { proName: "FX:USDJPY", title: "USD/JPY" },
        { proName: "FX:USDCHF", title: "USD/CHF" },
        { proName: "FX:AUDUSD", title: "AUD/USD" },
        { proName: "FX:NZDUSD", title: "NZD/USD" },
        { proName: "COINBASE:BTCUSD", title: "Bitcoin" },
        { proName: "COINBASE:ETHUSD", title: "Ethereum" },
        { proName: "NASDAQ:NDX", title: "NASDAQ 100" },
        { proName: "FOREXCOM:US30", title: "US30" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container border-y border-white/10 bg-frame-950/85" ref={container}>
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}
