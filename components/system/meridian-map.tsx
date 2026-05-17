"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/effects/scroll-reveal";

interface MeridianInfo {
  id: string;
  name: string;
  description: string;
  stage: string;
  color: string;
  path: string;
  pathLength?: number;
}

const meridians: MeridianInfo[] = [
  {
    id: "dumai",
    name: "督脉",
    description: "总督一身之阳经，与炼形化精阶段密切相关，主司脊柱健康与阳气生发。",
    stage: "lianxing",
    color: "#d4a574",
    path: "M 100 30 Q 100 80 100 120 Q 100 160 100 200",
  },
  {
    id: "renmai",
    name: "任脉",
    description: "总任一身之阴经，贯穿胸腹正中，与炼精化气阶段的丹田修炼紧密相连。",
    stage: "lianjing",
    color: "#d4a574",
    path: "M 100 30 Q 100 80 100 120 Q 100 160 100 200",
  },
  {
    id: "chongmai",
    name: "冲脉",
    description: "十二经之海，气血汇聚之所，与炼气化神阶段的能量提升直接相关。",
    stage: "lianqi",
    color: "#8b6fae",
    path: "M 85 50 Q 90 100 85 150 Q 80 180 85 210",
  },
  {
    id: "daimai",
    name: "带脉",
    description: "环绕腰腹，约束诸经，与炼神返虚阶段的整体能量场整合有关。",
    stage: "lianshen",
    color: "#d4a574",
    path: "M 60 140 Q 100 135 140 140",
  },
];

const stageLabels: Record<string, string> = {
  lianxing: "炼形化精",
  lianjing: "炼精化气",
  lianqi: "炼气化神",
  lianshen: "炼神返虚",
};

const acupoints = [
  { cx: 100, cy: 30, name: "百会", stage: "lianqi", color: "#d4a574" },
  { cx: 100, cy: 80, name: "膻中", stage: "lianjing", color: "#c75b39" },
  { cx: 100, cy: 120, name: "丹田", stage: "lianjing", color: "#d4a574" },
  { cx: 100, cy: 200, name: "会阴", stage: "lianxing", color: "#d4a574" },
  { cx: 85, cy: 100, name: "命门", stage: "lianxing", color: "#5b8db8" },
  { cx: 115, cy: 100, name: "神阙", stage: "lianqi", color: "#8b6fae" },
];

interface MeridianMapProps {
  activeStage?: string;
  className?: string;
}

// Qi flow animation component
function QiFlowPath({
  path,
  color,
  isActive,
  delay = 0,
}: {
  path: string;
  color: string;
  isActive: boolean;
  delay?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  return (
    <>
      {/* Base path */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? 3 : 2}
        opacity={isActive ? 0.3 : 0.15}
        strokeLinecap="round"
      />
      {/* Animated qi flow */}
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? 3 : 1.5}
        strokeLinecap="round"
        strokeDasharray={`${pathLength * 0.15} ${pathLength * 0.85}`}
        initial={{ strokeDashoffset: pathLength }}
        animate={{
          strokeDashoffset: 0,
          opacity: isActive ? 0.9 : 0.5,
        }}
        transition={{
          strokeDashoffset: {
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "linear",
          },
          opacity: { duration: 0.3 },
        }}
      />
      {/* Glowing trail */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? 6 : 4}
        strokeLinecap="round"
        strokeDasharray={`${pathLength * 0.05} ${pathLength * 0.95}`}
        initial={{ strokeDashoffset: pathLength }}
        animate={{
          strokeDashoffset: 0,
          opacity: isActive ? 0.15 : 0.08,
        }}
        transition={{
          strokeDashoffset: {
            duration: 3,
            delay: delay + 0.1,
            repeat: Infinity,
            ease: "linear",
          },
          opacity: { duration: 0.3 },
        }}
        style={{ filter: `blur(2px)` }}
      />
    </>
  );
}

// Pulsing acupoint component
function AcupointPoint({
  cx,
  cy,
  color,
  name,
  isActive,
  isHovered,
  onHover,
  delay = 0,
}: {
  cx: number;
  cy: number;
  color: string;
  name: string;
  isActive: boolean;
  isHovered: boolean;
  onHover: (name: string | null) => void;
  delay?: number;
}) {
  return (
    <g
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      {/* Outer pulse ring */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={isHovered ? 12 : 8}
        fill="none"
        stroke={color}
        strokeWidth={1}
        opacity={isActive ? 0.3 : 0.1}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: isActive ? [0.3, 0, 0.3] : [0.1, 0, 0.1],
        }}
        transition={{
          duration: 2,
          delay: delay * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Middle pulse ring */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={isHovered ? 8 : 5}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        opacity={isActive ? 0.5 : 0.2}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: isActive ? [0.5, 0.1, 0.5] : [0.2, 0, 0.2],
        }}
        transition={{
          duration: 2,
          delay: delay * 0.3 + 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Core dot */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={isHovered ? 5 : 3}
        fill={color}
        opacity={isActive ? 1 : 0.7}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: isActive ? 1 : 0.7 }}
        transition={{
          delay: 1.5 + delay * 0.1,
          duration: 0.3,
          type: "spring",
          stiffness: 200,
        }}
      />
      {/* Glow effect */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={isHovered ? 6 : 4}
        fill={color}
        opacity={0.2}
        style={{ filter: `blur(3px)` }}
        animate={{
          r: isHovered ? [6, 8, 6] : [4, 5, 4],
          opacity: isHovered ? [0.3, 0.5, 0.3] : [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </g>
  );
}

export default function MeridianMap({ activeStage, className }: MeridianMapProps) {
  const [hoveredMeridian, setHoveredMeridian] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [drawProgress, setDrawProgress] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Animate path drawing on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setDrawProgress(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Stage switching animation
  useEffect(() => {
    if (activeStage) {
      setStageProgress(0);
      const timer = setTimeout(() => {
        setStageProgress(1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeStage]);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 10,
    });
  }, []);

  const filteredMeridians = activeStage
    ? meridians.filter((m) => m.stage === activeStage)
    : meridians;

  return (
    <div className={cn("relative", className)}>
      <ScrollReveal duration={800} direction="up" distance={20}>
        <svg
          ref={svgRef}
          viewBox="0 0 200 280"
          className="w-full h-auto max-w-md mx-auto"
          onMouseMove={handleMouseMove}
        >
          {/* Background */}
          <rect width="200" height="280" fill="transparent" />

          {/* 人体轮廓 - 简化版 */}
          <g className="stroke-charcoal/20" fill="none" strokeWidth="1.5">
            {/* 头部 */}
            <ellipse cx="100" cy="35" rx="18" ry="22" />
            {/* 颈部 */}
            <line x1="100" y1="57" x2="100" y2="70" />
            {/* 肩膀 */}
            <path d="M 60 75 Q 80 70 100 70 Q 120 70 140 75" />
            {/* 躯干 */}
            <path d="M 60 75 L 55 140 L 60 210 L 100 220 L 140 210 L 145 140 L 140 75" />
            {/* 手臂 - 左 */}
            <path d="M 60 75 Q 45 100 40 130 Q 38 160 42 180" />
            {/* 手臂 - 右 */}
            <path d="M 140 75 Q 155 100 160 130 Q 162 160 158 180" />
            {/* 腿 - 左 */}
            <path d="M 60 210 Q 55 240 58 270" />
            {/* 腿 - 右 */}
            <path d="M 140 210 Q 145 240 142 270" />
          </g>

          {/* 经脉路径 - 带动画 */}
          {meridians.map((meridian, index) => {
            const isHovered = hoveredMeridian === meridian.id;
            const isActive = activeStage ? meridian.stage === activeStage : true;
            const opacity = activeStage ? (isActive ? 1 : 0.15) : isHovered ? 1 : 0.6;

            return (
              <g key={meridian.id}>
                {/* Qi flow animation */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: opacity }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <QiFlowPath
                    path={meridian.path}
                    color={meridian.color}
                    isActive={isActive || isHovered}
                    delay={index * 0.5}
                  />
                </motion.g>

                {/* Highlight on hover */}
                {isHovered && (
                  <motion.path
                    d={meridian.path}
                    fill="none"
                    stroke={meridian.color}
                    strokeWidth={8}
                    opacity={0.15}
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: `blur(4px)` }}
                  />
                )}

                {/* Interactive overlay */}
                <path
                  d={meridian.path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={12}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMeridian(meridian.id)}
                  onMouseLeave={() => setHoveredMeridian(null)}
                />
              </g>
            );
          })}

          {/* 穴位点 - 带动画 */}
          {acupoints.map((point, index) => {
            const isHovered = hoveredMeridian === point.name;
            const isActive = activeStage ? point.stage === activeStage : true;

            return (
              <AcupointPoint
                key={point.name}
                cx={point.cx}
                cy={point.cy}
                color={point.color}
                name={point.name}
                isActive={isActive}
                isHovered={isHovered}
                onHover={setHoveredMeridian}
                delay={index}
              />
            );
          })}

          {/* 标签 */}
          {meridians.map((meridian) => {
            const isActive = activeStage ? meridian.stage === activeStage : true;
            if (!isActive) return null;

            return (
              <motion.text
                key={`label-${meridian.id}`}
                x={meridian.id === "daimai" ? 100 : meridian.id === "chongmai" ? 75 : 115}
                y={meridian.id === "daimai" ? 135 : meridian.id === "chongmai" ? 100 : 110}
                fill={meridian.color}
                fontSize="8"
                fontWeight="500"
                textAnchor="middle"
                className="font-sans-cn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                {meridian.name}
              </motion.text>
            );
          })}
        </svg>
      </ScrollReveal>

      {/* 悬停提示框 */}
      <AnimatePresence>
        {hoveredMeridian && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none z-10 rounded-lg border border-gold/30 bg-ink-light/95 backdrop-blur-md p-3 shadow-lg max-w-xs"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
            }}
          >
            {meridians.find((m) => m.id === hoveredMeridian) && (
              <>
                <p
                  className="text-sm font-bold mb-1"
                  style={{
                    color: meridians.find((m) => m.id === hoveredMeridian)?.color,
                  }}
                >
                  {meridians.find((m) => m.id === hoveredMeridian)?.name}
                </p>
                <p className="text-xs text-rice/60 mb-1">
                  {stageLabels[meridians.find((m) => m.id === hoveredMeridian)?.stage || ""]}
                </p>
                <p className="text-xs text-rice/50 leading-relaxed">
                  {meridians.find((m) => m.id === hoveredMeridian)?.description}
                </p>
              </>
            )}
            {acupoints.find((p) => p.name === hoveredMeridian) && (
              <>
                <p className="text-sm font-bold mb-1 text-gold">
                  {acupoints.find((p) => p.name === hoveredMeridian)?.name}
                </p>
                <p className="text-xs text-rice/60">
                  {stageLabels[acupoints.find((p) => p.name === hoveredMeridian)?.stage || ""]}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 图例 */}
      <ScrollReveal delay={200} duration={600}>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {meridians.map((meridian) => (
            <motion.div
              key={meridian.id}
              className={cn(
                "flex items-center gap-2 text-xs transition-opacity duration-300",
                activeStage && activeStage !== meridian.stage
                  ? "opacity-30"
                  : "opacity-100"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: meridian.color }}
                animate={{
                  boxShadow: activeStage === meridian.stage
                    ? `0 0 8px ${meridian.color}`
                    : `0 0 0px ${meridian.color}`,
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-muted-foreground">{meridian.name}</span>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
