import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2a2a2e, #0a0a0c)",
          color: "#f5f5f7",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        PJ
      </div>
    ),
    { ...size }
  );
}
