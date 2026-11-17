import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pawan Joshi — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 72,
            right: 72,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#404040", fontSize: 14, letterSpacing: "0.1em" }}>
            PAWANJOSHI.DEV
          </span>
          <span style={{ color: "#262626", fontSize: 14 }}>
            Dehradun, India
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 500,
              color: "#e5e5e5",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Pawan Joshi
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#737373",
              maxWidth: 600,
              lineHeight: 1.4,
            }}
          >
            Software engineer specializing in autonomous AI agents and cloud infrastructure.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {["AWS", "LangGraph", "AI Agents", "Cloud"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "#111",
                  border: "1px solid #1a1a1a",
                  borderRadius: 4,
                  padding: "4px 10px",
                  color: "#525252",
                  fontSize: 13,
                  fontFamily: "monospace",
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
