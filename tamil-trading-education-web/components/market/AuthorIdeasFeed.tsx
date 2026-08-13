"use client";

import { useEffect, useRef } from "react";

interface AuthorIdeasFeedProps {
  username?: string;
  height?: number;
}

/**
 * TradingView Timeline widget, scoped to a single author's published ideas.
 * This shows Kripson's own daily chart posts (from tradingview.com/u/kripsonfx97)
 * and updates automatically the moment a new idea is published — no manual
 * embedding or daily updates needed on our side.
 * Docs: https://www.tradingview.com/widget/timeline/
 */
export default function AuthorIdeasFeed({
  username = "kripsonfx97",
  height = 780,
}: AuthorIdeasFeedProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "author",
      username,
      colorTheme: "light",
      isTransparent: true,
      displayMode: "regular",
      width: "100%",
      height,
      locale: "en",
    });
    container.current.appendChild(script);
  }, [username, height]);

  return <div className="tradingview-widget-container" ref={container} />;
}
