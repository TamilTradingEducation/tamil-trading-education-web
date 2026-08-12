"use client";

import { useEffect, useRef } from "react";

/**
 * TradingView Hotlists widget — top gainers, losers and most active symbols.
 * Docs: https://www.tradingview.com/widget/hotlists/
 */
export default function HotlistsWidget({ height = 480 }: { height?: number }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "1D",
      exchange: "US",
      showChart: false,
      locale: "en",
      width: "100%",
      height,
      isTransparent: true,
    });
    container.current.appendChild(script);
  }, [height]);

  return <div className="tradingview-widget-container" ref={container} />;
}
