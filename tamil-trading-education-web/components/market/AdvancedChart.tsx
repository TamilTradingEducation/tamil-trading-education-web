"use client";

import { useEffect, useRef } from "react";

interface AdvancedChartProps {
  symbol?: string;
  height?: number;
}

/**
 * TradingView Advanced Real-Time Chart widget.
 * Docs: https://www.tradingview.com/widget/advanced-chart/
 */
export default function AdvancedChart({ symbol = "OANDA:XAUUSD", height = 520 }: AdvancedChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = "100%";
    widgetDiv.style.width = "100%";
    container.current.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      // 15-minute candles. Was "60" (hourly) — a new hourly candle only
      // forms once per hour, so the chart looked frozen even though the
      // TradingView feed was live the whole time. 15m shows genuine price
      // movement without being noisy. Data is real OANDA XAU/USD.
      interval: "15",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      backgroundColor: "rgba(5,7,15,1)",
      gridColor: "rgba(255,255,255,0.06)",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
      width: "100%",
      height: height,
    });
    container.current.appendChild(script);
  }, [symbol, height]);

  return (
    <div
      className="tradingview-widget-container rounded-xl2 overflow-hidden border border-ink/10"
      ref={container}
      style={{ height }}
    />
  );
}
