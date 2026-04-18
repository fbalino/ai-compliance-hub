import { ImageResponse } from "next/og";

export const alt = "Regulome — The Global Register of AI Regulations";
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
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0e1330 0%, #1a2150 50%, #242a4a 100%)",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#3d4ee3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            Regulome
          </div>
        </div>

        <div
          style={{
            fontSize: "52px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          The Global Register of AI Regulations
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#8990ae",
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: "700px",
          }}
        >
          Search 912+ AI regulations. EU AI Act, US state laws, and more.
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              padding: "10px 24px",
              background: "#3d4ee3",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            regulome.io
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
