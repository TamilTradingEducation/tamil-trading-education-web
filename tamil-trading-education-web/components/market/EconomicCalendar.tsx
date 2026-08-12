"use client";

import { useEffect, useRef } from "react";

/**
 * TradingView Economic Calendar (Events) widget.
 * Docs: https://www.tradingview.com/widget/events/
 */
export default function EconomicCalendar({ height = 480 }: { height?: number }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      isTransparent: true,
      width: "100%",
      height,
      locale: "en",
      importanceFilter: "-1,0,1",
      countryFilter: "us,eu,gb,jp,in,au,ch,nz,ca",
    });
    container.current.appendChild(script);
  }, [height]);

  return <div className="tradingview-widget-container" ref={container} />;
}
