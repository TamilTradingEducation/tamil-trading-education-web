"use client";

import { useEffect, useRef } from "react";

/**
 * TradingView Forex Cross-Rates / Heatmap widget.
 * Docs: https://www.tradingview.com/widget/forex-heat-map/
 */
export default function ForexHeatmap({ height = 480 }: { height?: number }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height,
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "INR"],
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
    });
    container.current.appendChild(script);
  }, [height]);

  return <div className="tradingview-widget-container" ref={container} />;
}
