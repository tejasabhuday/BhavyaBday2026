import { ImageResponse } from "next/og";
export const alt = "Bhavya — The Main Character";
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
        background: "#17161B",
        color: "#F7DC77",
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: 8 }}>
        A VERY SPECIAL PREMIERE
      </div>
      <div style={{ fontSize: 150, fontFamily: "serif", marginTop: 30 }}>
        BHAVYA
      </div>
      <div style={{ fontSize: 34, color: "#FFF8ED" }}>
        the main character, obviously.
      </div>
    </div>,
    size,
  );
}
