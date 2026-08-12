import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tamil Trading Education — Master Forex Trading with Confidence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px 500px at 85% -10%, rgba(201,162,75,0.35), transparent 60%), radial-gradient(900px 500px at -5% 110%, rgba(0,71,171,0.35), transparent 60%), #05070f",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(145deg, #e0bf5f, #a9832f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#05070f",
            }}
          >
            T
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#ffffff" }}>
              Tamil Trading Education
            </span>
            <span
              style={{
                fontSize: 14,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#e0bf5f",
              }}
            >
              Forex Trading Education &amp; Community
            </span>
          </div>
        </div>

        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.08,
            maxWidth: 920,
            display: "flex",
          }}
        >
          Master Forex Trading with{" "}
          <span style={{ color: "#e0bf5f", marginLeft: 18 }}>Confidence</span>
        </div>

        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            marginTop: 28,
            maxWidth: 760,
            display: "flex",
          }}
        >
          Live classes · Technical analysis · Risk management · Premium community
        </div>
      </div>
    ),
    { ...size }
  );
}
