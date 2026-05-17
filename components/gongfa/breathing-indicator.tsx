"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Wind, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type BreathPhase = "inhale" | "hold" | "exhale" | "rest";

interface PhaseConfig {
  label: string;
  subLabel: string;
  duration: number;
  color: string;
  bgColor: string;
  ringColor: string;
  scale: number;
}

const PHASE_CONFIG: Record<BreathPhase, PhaseConfig> = {
  inhale: {
    label: "吸气",
    subLabel: "吸气...",
    duration: 4000,
    color: "#d4a574",
    bgColor: "bg-gold/20",
    ringColor: "#d4a574",
    scale: 1.5,
  },
  hold: {
    label: "屏息",
    subLabel: "屏息...",
    duration: 2000,
    color: "#c75b39",
    bgColor: "bg-cinnabar/20",
    ringColor: "#c75b39",
    scale: 1.5,
  },
  exhale: {
    label: "呼气",
    subLabel: "呼气...",
    duration: 4000,
    color: "#1a1a2e",
    bgColor: "bg-ink/40",
    ringColor: "#4a4a6a",
    scale: 1,
  },
  rest: {
    label: "准备",
    subLabel: "准备开始...",
    duration: 1000,
    color: "#8a8a8a",
    bgColor: "bg-muted/20",
    ringColor: "#8a8a8a",
    scale: 1,
  },
};

const PHASES: BreathPhase[] = ["inhale", "hold", "exhale", "rest"];

export function BreathingIndicator() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>("rest");
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [displayText, setDisplayText] = useState("准备开始");
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const phaseStartTimeRef = useRef<number>(0);
  const currentPhaseIndexRef = useRef(0);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      phaseStartTimeRef.current = timestamp;
    }

    const phase = PHASES[currentPhaseIndexRef.current];
    const config = PHASE_CONFIG[phase];
    const elapsed = timestamp - phaseStartTimeRef.current;
    const phaseProgress = Math.min(elapsed / config.duration, 1);

    setCurrentPhase(phase);
    setProgress(phaseProgress);
    setDisplayText(config.subLabel);

    if (phaseProgress >= 1) {
      currentPhaseIndexRef.current = (currentPhaseIndexRef.current + 1) % PHASES.length;
      phaseStartTimeRef.current = timestamp;
      if (currentPhaseIndexRef.current === 0) {
        setCycleCount((prev) => prev + 1);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setCurrentPhase("rest");
      setProgress(0);
      setDisplayText("准备开始");
      startTimeRef.current = 0;
      phaseStartTimeRef.current = 0;
      currentPhaseIndexRef.current = 0;
      return;
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isActive, animate]);

  const config = PHASE_CONFIG[currentPhase];
  const currentScale =
    currentPhase === "inhale"
      ? 1 + progress * 0.5
      : currentPhase === "exhale"
      ? 1.5 - progress * 0.5
      : config.scale;

  const ringRadius = 76;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringProgress = ringCircumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-ink-light/50 border border-gold/20 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm text-rice/60">
        <Wind className="w-4 h-4 text-gold" />
        <span>呼吸配合演示</span>
        <span className="text-xs text-rice/40">(4秒吸气 - 2秒屏息 - 4秒呼气)</span>
      </div>

      {/* 呼吸圆圈 */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* 外圈光晕 */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${config.color}20 0%, transparent 70%)`,
          }}
          animate={{
            scale: currentScale * 1.3,
            opacity: isActive ? 0.3 + progress * 0.3 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* 主圆圈 */}
        <motion.div
          className="relative w-36 h-36 rounded-full flex items-center justify-center border-2"
          style={{
            borderColor: `${config.color}40`,
            background: `radial-gradient(circle, ${config.color}15 0%, transparent 70%)`,
          }}
          animate={{
            scale: currentScale,
            borderColor: `${config.color}${isActive ? "60" : "30"}`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* 内圈 */}
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${config.color}20 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* 中心文字 */}
            <div className="flex flex-col items-center justify-center">
              <motion.span
                className="text-white font-bold text-xl drop-shadow-sm"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {config.label}
              </motion.span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={displayText}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-rice/60 mt-1"
                >
                  {displayText}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* 进度环 SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 192 192"
        >
          {/* 背景环 */}
          <circle
            cx="96"
            cy="96"
            r={ringRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-gold/10"
          />
          {/* 进度环 */}
          <motion.circle
            cx="96"
            cy="96"
            r={ringRadius}
            fill="none"
            stroke={config.ringColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={ringCircumference}
            animate={{ strokeDashoffset: ringProgress }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{
              filter: `drop-shadow(0 0 4px ${config.ringColor}60)`,
            }}
          />
          {/* 发光点 */}
          {isActive && (
            <motion.circle
              cx={96 + ringRadius * Math.cos((progress * 2 * Math.PI) - Math.PI / 2)}
              cy={96 + ringRadius * Math.sin((progress * 2 * Math.PI) - Math.PI / 2)}
              r="4"
              fill={config.ringColor}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                filter: `blur(1px) drop-shadow(0 0 6px ${config.ringColor})`,
              }}
            />
          )}
        </svg>
      </div>

      {/* 控制按钮和计数 */}
      <div className="flex items-center gap-4">
        <Button
          variant={isActive ? "outline" : "default"}
          size="sm"
          onClick={() => setIsActive(!isActive)}
          className="gap-2 border-gold/30 text-gold hover:bg-gold/10"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              暂停
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              开始
            </>
          )}
        </Button>
        {cycleCount > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-rice/50"
          >
            已完成 {cycleCount} 个周期
          </motion.span>
        )}
      </div>

      {/* 阶段指示器 */}
      <div className="flex items-center gap-3">
        {PHASES.map((phase, index) => {
          const phaseConfig = PHASE_CONFIG[phase];
          const isCurrentPhase = phase === currentPhase;
          const isPastPhase =
            isActive &&
            PHASES.indexOf(currentPhase) > index &&
            currentPhase !== "rest";

          return (
            <div key={phase} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: isCurrentPhase
                      ? phaseConfig.color
                      : isPastPhase
                      ? `${phaseConfig.color}60`
                      : "#4a4a6a40",
                  }}
                  animate={
                    isCurrentPhase
                      ? {
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            `0 0 0px ${phaseConfig.color}`,
                            `0 0 8px ${phaseConfig.color}`,
                            `0 0 0px ${phaseConfig.color}`,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span
                  className="text-[10px]"
                  style={{
                    color: isCurrentPhase
                      ? phaseConfig.color
                      : "#8a8a8a60",
                  }}
                >
                  {phaseConfig.label}
                </span>
              </div>
              {index < PHASES.length - 1 && (
                <div
                  className="w-6 h-px"
                  style={{
                    background: isPastPhase
                      ? `linear-gradient(to right, ${phaseConfig.color}60, ${PHASE_CONFIG[PHASES[index + 1]].color}60)`
                      : "#4a4a6a20",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
