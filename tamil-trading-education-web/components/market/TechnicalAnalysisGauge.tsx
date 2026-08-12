"use client";

import { useEffect, useRef } from "react";

interface TechnicalAnalysisGaugeProps {
  symbol?: string;
  height?: number;
}

/**
 * TradingView Technical Analysis widget — shows a live Buy/Sell/Neutral
 * signal gauge for a single symbol, aggregated from moving averages and
 * oscillators. Locked to one symbol (no tabs), so it's a clean fit next to
 * the main chart when a site only trades one instrument.
 * Docs: https://www.tradingview.com/widget/technical-analysis/
 */
export default function TechnicalAnalysisGauge({
  symbol = "OANDA:XAUUSD",
  height = 450,
}: TechnicalAnalysisGaugeProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "1h",
      width: "100%",
      isTransparent: true,
      height,
      symbol,
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: "light",
    });
    container.current.appendChild(script);
  }, [symbol, height]);

  return <div className="tradingview-widget-container" ref={container} />;
}
