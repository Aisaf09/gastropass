import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0c0b",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 15% 0%, rgba(249,115,22,0.35), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(139,92,246,0.25), transparent 60%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 18,
              background: "linear-gradient(135deg, #f97316, #e11d48)",
              color: "white",
              fontSize: 40,
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            G
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              fontFamily: "sans-serif",
            }}
          >
            GastroPass
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 60,
            fontWeight: 700,
            color: "white",
            fontFamily: "sans-serif",
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
          Tarjetas de fidelización sin apps para tu restaurante
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#a3a3a3",
            fontFamily: "sans-serif",
            maxWidth: 820,
          }}
        >
          Apple Wallet &amp; Google Wallet · Sin apps que instalar · Alta en 10 segundos
        </div>
      </div>
    ),
    { ...size },
  );
}
