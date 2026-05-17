"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getLevelProgress,
  getNextLevelExp,
  LEVELS,
  type UserGamification,
} from "@/lib/gamification-data";

interface ExpBarProps {
  userData: UserGamification;
  showDetails?: boolean;
  animated?: boolean;
  className?: string;
}

export function ExpBar({
  userData,
  showDetails = true,
  animated = true,
  className,
}: ExpBarProps) {
  const [displayExp, setDisplayExp] = useState(0);
  const controls = useAnimation();

  const currentLevel = LEVELS.find((l) => l.id === userData.currentLevel) || LEVELS[0];
  const progress = getLevelProgress(userData.currentLevel, userData.currentExp);
  const nextLevelExp = getNextLevelExp(userData.currentLevel);
  const currentLevelExp = currentLevel.requiredExp;
  const expInLevel = userData.currentExp - currentLevelExp;
  const expNeeded = nextLevelExp - currentLevelExp;

  useEffect(() => {
    if (animated) {
      const duration = 1500;
      const steps = 60;
      const increment = userData.currentExp / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= userData.currentExp) {
          setDisplayExp(userData.currentExp);
          clearInterval(timer);
        } else {
          setDisplayExp(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    } else {
      setDisplayExp(userData.currentExp);
    }
  }, [userData.currentExp, animated]);

  useEffect(() => {
    controls.start({
      width: `${progress * 100}%`,
      transition: { duration: 1.5, ease: "easeOut" },
    });
  }, [progress, controls]);

  return (
    <div className={cn("w-full", className)}>
      {/* 等级信息 */}
      {showDetails && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-sm font-bold",
                currentLevel.id <= 9
                  ? "text-green-600"
                  : currentLevel.id <= 18
                  ? "text-blue-600"
                  : currentLevel.id <= 27
                  ? "text-purple-600"
                  : "text-yellow-600"
              )}
            >
              Lv.{currentLevel.id}
            </span>
            <span className="text-sm font-medium">{currentLevel.name}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {displayExp.toLocaleString()} / {nextLevelExp.toLocaleString()} XP
          </div>
        </div>
      )}

      {/* 经验条 */}
      <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
        {/* 背景发光效果 */}
        <div
          className={cn(
            "absolute inset-0 opacity-20 rounded-full blur-sm",
            "bg-gradient-to-r",
            currentLevel.gradient
          )}
        />

        {/* 进度条 */}
        <motion.div
          className={cn(
            "relative h-full rounded-full",
            "bg-gradient-to-r",
            currentLevel.gradient
          )}
          initial={{ width: 0 }}
          animate={controls}
        >
          {/* 发光效果 */}
          <div
            className="absolute right-0 top-0 bottom-0 w-4 rounded-full blur-md"
            style={{
              background: `linear-gradient(to right, transparent, ${currentLevel.color})`,
            }}
          />

          {/* 闪光效果 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* 刻度标记 */}
        <div className="absolute inset-0 flex justify-between px-1">
          {[0, 25, 50, 75, 100].map((tick) => (
            <div
              key={tick}
              className="w-px h-full bg-background/30"
              style={{ marginLeft: `${tick}%` }}
            />
          ))}
        </div>
      </div>

      {/* 详细信息 */}
      {showDetails && (
        <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
          <span>本阶段: {expInLevel} / {expNeeded} XP</span>
          <span>还需 {expNeeded - expInLevel} XP 升级</span>
        </div>
      )}
    </div>
  );
}

interface ExpGainAnimationProps {
  amount: number;
  onComplete?: () => void;
  className?: string;
}

export function ExpGainAnimation({ amount, onComplete, className }: ExpGainAnimationProps) {
  return (
    <motion.div
      className={cn("pointer-events-none", className)}
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -60, scale: 1.2 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      <div className="flex items-center gap-1 text-lg font-bold text-yellow-500">
        <span>+</span>
        <span>{amount}</span>
        <span className="text-sm">XP</span>
      </div>
    </motion.div>
  );
}
