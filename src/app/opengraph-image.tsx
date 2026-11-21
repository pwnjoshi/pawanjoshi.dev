import { ImageResponse } from "next/og";

export const alt = "Pawan Joshi — AI and Cloud Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#000000",
          fontFamily: "system-ui, sans-serif",
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#f5f5f7",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              PJ
            </div>
            <span style={{ fontSize: 24, color: "#d2d2d7" }}>pawanjoshi.dev</span>
          </div>
          <span style={{ fontSize: 22, color: "#a1a1a6" }}>Dehradun, India</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            Pawan Joshi
          </div>
          <div style={{ fontSize: 38, color: "#a1a1a6", lineHeight: 1.25, maxWidth: 900 }}>
            I build AI agents and the cloud systems they run on.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {["AWS", "LangGraph", "AI Agents", "Full-Stack"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid #424245",
                  background: "#1d1d1f",
                  color: "#d2d2d7",
                  fontSize: 22,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
