"use client";

import { useEffect, useRef } from "react";

/**
 * TradingView Cryptocurrency Market widget (screener).
 * Docs: https://www.tradingview.com/widget/cryptocurrency-market/
 */
export default function CryptoMarket({ height = 480 }: { height?: number }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height,
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "light",
      locale: "en",
      isTransparent: true,
    });
    container.current.appendChild(script);
  }, [height]);

  return <div className="tradingview-widget-container" ref={container} />;
}
