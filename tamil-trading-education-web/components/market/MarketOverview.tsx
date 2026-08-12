"use client";

import { useEffect, useRef } from "react";

/**
 * TradingView Market Overview widget.
 * Docs: https://www.tradingview.com/widget/market-overview/
 */
export default function MarketOverview({ height = 480 }: { height?: number }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      width: "100%",
      height,
      plotLineColorGrowing: "rgba(201, 162, 75, 1)",
      plotLineColorFalling: "rgba(255, 92, 108, 1)",
      gridLineColor: "rgba(11, 18, 36, 0.06)",
      scaleFontColor: "rgba(11, 18, 36, 0.55)",
      belowLineFillColorGrowing: "rgba(201, 162, 75, 0.12)",
      belowLineFillColorFalling: "rgba(255, 92, 108, 0.12)",
      symbolActiveColor: "rgba(201, 162, 75, 0.25)",
      tabs: [
        {
          title: "Forex",
          symbols: [
            { s: "FX:EURUSD" },
            { s: "FX:GBPUSD" },
            { s: "FX:USDJPY" },
            { s: "FX:USDCHF" },
            { s: "FX:AUDUSD" },
            { s: "FX:NZDUSD" },
          ],
        },
        {
          title: "Commodities",
          symbols: [{ s: "OANDA:XAUUSD" }, { s: "OANDA:XAGUSD" }, { s: "TVC:USOIL" }],
        },
        {
          title: "Crypto",
          symbols: [{ s: "COINBASE:BTCUSD" }, { s: "COINBASE:ETHUSD" }, { s: "BINANCE:SOLUSDT" }],
        },
        {
          title: "Indices",
          symbols: [{ s: "FOREXCOM:US30" }, { s: "NASDAQ:NDX" }, { s: "FOREXCOM:SPXUSD" }],
        },
      ],
    });
    container.current.appendChild(script);
  }, [height]);

  return <div className="tradingview-widget-container" ref={container} />;
}
