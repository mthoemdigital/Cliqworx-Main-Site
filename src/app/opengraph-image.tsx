import { ImageResponse } from "next/og";

export const alt = "CliqWorx: Strategy. Technology. Growth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: "50%",
            border: "16px solid",
            borderColor: "#6A35FF",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 88,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -2,
          }}
        >
          Cliq
          <span style={{ color: "#8E5BFF" }}>Worx</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 8,
            color: "#B7B7B7",
            textTransform: "uppercase",
          }}
        >
          Strategy. Technology. Growth.
        </div>
      </div>
    ),
    { ...size }
  );
}
