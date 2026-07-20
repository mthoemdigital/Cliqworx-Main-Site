import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "CliqWorx: Strategy. Technology. Growth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Embed the real brand mark so shared links show the CliqWorx logo.
const markData = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "logo-cliqworx-mark.png")
).toString("base64")}`;

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
          background: "#0A0A0F",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: "50%",
            border: "18px solid",
            borderColor: "#7B2FFF",
            opacity: 0.28,
          }}
        />
        {/* Brand mark on a white tile */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={markData}
          width={180}
          height={180}
          alt=""
          style={{ borderRadius: 40, boxShadow: "0 24px 60px rgba(123,47,255,0.35)" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 44,
            fontSize: 92,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -2,
          }}
        >
          Cliq
          <span style={{ color: "#9B5FFF" }}>Worx</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
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
