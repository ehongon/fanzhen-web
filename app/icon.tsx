import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a2e",
          borderRadius: "8px",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 外圆环 */}
          <circle
            cx="256"
            cy="256"
            r="200"
            stroke="#d4a574"
            strokeWidth="12"
            opacity="0.6"
          />
          {/* 修炼者简化形态 */}
          <path
            d="M 256,380 Q 251,300 248,200 Q 246,130 256,100"
            stroke="#c75b39"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
          />
          {/* 头部 */}
          <circle cx="256" cy="85" r="28" fill="#d4a574" />
          {/* 头顶灵光 */}
          <path
            d="M 256,40 Q 248,10 256,0 Q 264,10 256,40"
            fill="#f5e6c8"
            opacity="0.9"
          />
          {/* 双肩 */}
          <path
            d="M 221,180 Q 238,175 256,178 Q 274,175 291,180"
            stroke="#c75b39"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* 莲花座 */}
          <path
            d="M 196,400 Q 226,380 256,383 Q 286,380 316,400"
            stroke="#c75b39"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
