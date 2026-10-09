import { ImageResponse } from "next/og";
export const alt = "For Bhavya — Twenty-one, with love.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#F3DC82",
        color: "#A53937",
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: 8 }}>
        THE TWENTY-FIRST BIRTHDAY EDITION
      </div>
      <div style={{ fontSize: 135, fontFamily: "serif", marginTop: 30 }}>
        for Bhavya.
      </div>
      <div style={{ fontSize: 34, color: "#29271F" }}>
        Made by me. For you. With all my love.
      </div>
    </div>,
    size,
  );
}
