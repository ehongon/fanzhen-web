"use client";

import { motion } from "framer-motion";

interface PoseDiagramProps {
  poseType: "standing" | "sitting" | "lying" | "movement" | "breathing" | "meditation";
  highlight?: string[];
}

export function PoseDiagram({ poseType, highlight = [] }: PoseDiagramProps) {
  const isHighlighted = (part: string) => highlight.includes(part);

  const getHighlightColor = (part: string) => {
    if (isHighlighted(part)) return "#c75b39";
    return "#2d2d4a";
  };

  const getFillColor = (part: string) => {
    if (isHighlighted(part)) return "rgba(199, 91, 57, 0.15)";
    return "transparent";
  };

  return (
    <div className="w-full max-w-[300px] mx-auto">
      <svg viewBox="0 0 200 320" className="w-full h-auto">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 背景圆 */}
        <circle cx="100" cy="160" r="140" fill="rgba(212, 165, 116, 0.05)" stroke="rgba(212, 165, 116, 0.1)" strokeWidth="1"/>

        {/* 人体轮廓 */}
        <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* 头部 */}
          <motion.ellipse
            cx="100" cy="40" rx="22" ry="26"
            stroke={getHighlightColor("head")}
            fill={getFillColor("head")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          />
          {/* 面部中线 */}
          <line x1="100" y1="22" x2="100" y2="58" stroke={getHighlightColor("head")} strokeWidth="1" opacity="0.3"/>
          {/* 眼睛 */}
          <circle cx="92" cy="38" r="2" fill={getHighlightColor("head")} opacity="0.5"/>
          <circle cx="108" cy="38" r="2" fill={getHighlightColor("head")} opacity="0.5"/>

          {/* 颈部 */}
          <motion.line
            x1="100" y1="66" x2="100" y2="82"
            stroke={getHighlightColor("neck")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          {/* 肩膀 */}
          <motion.path
            d="M 55 90 Q 78 82 100 82 Q 122 82 145 90"
            stroke={getHighlightColor("shoulders")}
            fill={getFillColor("shoulders")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* 躯干 */}
          <motion.path
            d="M 55 90 L 48 155 L 52 210 L 100 225 L 148 210 L 152 155 L 145 90"
            stroke={getHighlightColor("torso")}
            fill={getFillColor("torso")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />

          {/* 中脉 */}
          <motion.line
            x1="100" y1="82" x2="100" y2="225"
            stroke={isHighlighted("spine") ? "#c75b39" : "rgba(91, 141, 184, 0.3)"}
            strokeWidth={isHighlighted("spine") ? 3 : 1}
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />

          {/* 丹田标记 */}
          {(isHighlighted("dantian") || isHighlighted("lower-dantian")) && (
            <motion.circle
              cx="100" cy="185"
              r="12"
              fill="rgba(199, 91, 57, 0.2)"
              stroke="#c75b39"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* 手臂 */}
          <motion.path
            d="M 55 90 Q 30 120 25 165"
            stroke={getHighlightColor("arms")}
            fill={getFillColor("arms")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.path
            d="M 145 90 Q 170 120 175 165"
            stroke={getHighlightColor("arms")}
            fill={getFillColor("arms")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          {/* 手掌 */}
          <motion.circle
            cx="25" cy="170" r="6"
            stroke={getHighlightColor("hands")}
            fill={getFillColor("hands")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />
          <motion.circle
            cx="175" cy="170" r="6"
            stroke={getHighlightColor("hands")}
            fill={getFillColor("hands")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />

          {/* 腿部 */}
          <motion.path
            d="M 52 210 Q 45 250 48 290"
            stroke={getHighlightColor("legs")}
            fill={getFillColor("legs")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          />
          <motion.path
            d="M 148 210 Q 155 250 152 290"
            stroke={getHighlightColor("legs")}
            fill={getFillColor("legs")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* 脚部 */}
          <motion.ellipse
            cx="48" cy="298" rx="14" ry="6"
            stroke={getHighlightColor("feet")}
            fill={getFillColor("feet")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.ellipse
            cx="152" cy="298" rx="14" ry="6"
            stroke={getHighlightColor("feet")}
            fill={getFillColor("feet")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          />
        </g>

        {/* 姿势类型标注 */}
        <text x="100" y="315" textAnchor="middle" fill="#d4a574" fontSize="10" fontFamily="serif" opacity="0.6">
          {poseType === "standing" && "站桩姿势"}
          {poseType === "sitting" && "静坐姿势"}
          {poseType === "lying" && "卧式姿势"}
          {poseType === "movement" && "动功姿势"}
          {poseType === "breathing" && "呼吸示意"}
          {poseType === "meditation" && "冥想姿势"}
        </text>
      </svg>
    </div>
  );
}
