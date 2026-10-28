import { SITE_URL } from "@/lib/seo/site";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export function SocialCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#0E0E10",
        color: "#F4F4F5",
        fontFamily: "Outfit",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -240,
          right: -150,
          width: 620,
          height: 620,
          borderRadius: 999,
          border: "1px solid #27272A",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -50,
          bottom: -300,
          width: 540,
          height: 540,
          borderRadius: 999,
          background: "rgba(190, 242, 100, 0.05)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 58,
          left: 74,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 62,
            height: 62,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 17,
            background: "#BEF264",
            color: "#090D04",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-2px",
          }}
        >
          64
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Outfit",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "1px",
            color: "#F4F4F5",
            marginLeft: 18,
          }}
        >
          BASE64 TOOLKIT
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 166,
          left: 74,
          width: 660,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(190, 242, 100, 0.12)",
            border: "1px solid rgba(190, 242, 100, 0.28)",
            color: "#BEF264",
            fontFamily: "Outfit",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          LOCAL-FIRST / RFC 4648
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 26,
            fontSize: 68,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: "-3px",
          }}
        >
          <div style={{ display: "flex" }}>Encode. Decode.</div>
          <div style={{ display: "flex" }}>Convert.</div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            maxWidth: 590,
            color: "#A1A1AA",
            fontSize: 23,
            lineHeight: 1.35,
          }}
        >
          Fast, private tools for text, files, images, Base64URL, and Data URIs.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 116,
          right: 72,
          width: 360,
          height: 390,
          display: "flex",
          flexDirection: "column",
          padding: "24px 26px",
          borderRadius: 28,
          background: "#161618",
          border: "1px solid #27272A",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#EF4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#FACC15", marginLeft: 9 }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#22C55E", marginLeft: 9 }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 34,
            fontFamily: "Outfit",
            fontSize: 16,
            lineHeight: 1.75,
          }}
        >
          <div style={{ display: "flex", color: "#A1A1AA" }}>
            <span style={{ color: "#BEF264" }}>input</span>
            <span>&nbsp; Hello, world!</span>
          </div>
          <div style={{ display: "flex", color: "#A1A1AA" }}>
            <span style={{ color: "#BEF264" }}>output</span>
            <span>&nbsp; SGVsbG8sIHdvcmxkIQ==</span>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 1,
              margin: "22px 0",
              background: "#27272A",
            }}
          />
          <div style={{ display: "flex", color: "#71717A" }}>browser-local</div>
          <div style={{ display: "flex", color: "#71717A" }}>no upload required</div>
          <div style={{ display: "flex", marginTop: 28, color: "#BEF264", fontWeight: 700 }}>
            ready when you are_
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 76,
          bottom: 42,
          display: "flex",
          alignItems: "center",
          color: "#71717A",
          fontFamily: "Outfit",
          fontSize: 13,
          letterSpacing: "0.6px",
        }}
      >
        <span style={{ color: "#BEF264" }}>TEXT</span>
        <span style={{ marginLeft: 16 }}>/</span>
        <span style={{ marginLeft: 16 }}>FILES</span>
        <span style={{ marginLeft: 16 }}>/</span>
        <span style={{ marginLeft: 16 }}>IMAGES</span>
        <span style={{ marginLeft: 16 }}>/</span>
        <span style={{ marginLeft: 16 }}>BASE64URL</span>
        <span style={{ marginLeft: 16 }}>/</span>
        <span style={{ marginLeft: 16 }}>DATA URIS</span>
      </div>

      <div
        style={{
          position: "absolute",
          right: 76,
          bottom: 42,
          display: "flex",
          color: "#71717A",
          fontFamily: "Outfit",
          fontSize: 13,
        }}
      >
        {SITE_URL.replace(/^https?:\/\//, "")}
      </div>
    </div>
  );
}
