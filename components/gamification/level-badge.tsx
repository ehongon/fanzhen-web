"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LEVELS,
  getLevelProgress,
  getNextLevelExp,
  type UserGamification,
} from "@/lib/gamification-data";
import {
  Sprout,
  Eye,
  Dumbbell,
  Heart,
  Droplets,
  Shield,
  GitMerge,
  BatteryCharging,
  CircleCheck,
  Wind,
  Waves,
  Target,
  RefreshCw,
  Move,
  Moon,
  Sparkles,
  Zap,
  Scan,
  Brain,
  Cloud,
  Sun,
  Infinity,
  Plane,
  Star,
  Lightbulb,
  UserX,
  Minus,
  HeartHandshake,
  Globe,
  Hammer,
  Triangle,
  Crown,
  Gem,
  Activity,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  Eye,
  Dumbbell,
  Heart,
  Droplets,
  Shield,
  GitMerge,
  BatteryCharging,
  CircleCheck,
  Wind,
  Waves,
  Target,
  RefreshCw,
  Move,
  Moon,
  Sparkles,
  Zap,
  Scan,
  Brain,
  Cloud,
  Sun,
  Infinity,
  Plane,
  Star,
  Lightbulb,
  UserX,
  Minus,
  HeartHandshake,
  Globe,
  Hammer,
  Triangle,
  Crown,
  Gem,
  Activity,
};

interface LevelBadgeProps {
  userData: UserGamification;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
  className?: string;
}

export function LevelBadge({
  userData,
  size = "md",
  showProgress = true,
  className,
}: LevelBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const currentLevel = LEVELS.find((l) => l.id === userData.currentLevel) || LEVELS[0];
  const progress = getLevelProgress(userData.currentLevel, userData.currentExp);
  const nextLevelExp = getNextLevelExp(userData.currentLevel);
  const currentLevelExp = currentLevel.requiredExp;
  const expInLevel = userData.currentExp - currentLevelExp;
  const expNeeded = nextLevelExp - currentLevelExp;

  const IconComponent = iconMap[currentLevel.icon] || Sprout;

  const sizeClasses = {
    sm: {
      container: "w-10 h-10",
      icon: "w-4 h-4",
      text: "text-xs",
      levelText: "text-[10px]",
    },
    md: {
      container: "w-14 h-14",
      icon: "w-6 h-6",
      text: "text-sm",
      levelText: "text-xs",
    },
    lg: {
      container: "w-20 h-20",
      icon: "w-8 h-8",
      text: "text-base",
      levelText: "text-sm",
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div
      className={cn("relative inline-flex flex-col items-center", className)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* 等级徽章 */}
      <motion.div
        className={cn(
          "relative rounded-full flex items-center justify-center cursor-pointer",
          sizes.container,
          "bg-gradient-to-br",
          currentLevel.gradient
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: `0 0 20px ${currentLevel.color}40`,
        }}
      >
        <IconComponent className={cn(sizes.icon, "text-white")} />
        {/* 等级数字 */}
        <div
          className={cn(
            "absolute -bottom-1 -right-1 bg-background border-2 rounded-full flex items-center justify-center font-bold",
            currentLevel.id <= 9
              ? "border-green-500 text-green-600"
              : currentLevel.id <= 18
              ? "border-blue-500 text-blue-600"
              : currentLevel.id <= 27
              ? "border-purple-500 text-purple-600"
              : "border-yellow-500 text-yellow-600",
            size === "sm" ? "w-5 h-5 text-[8px]" : size === "md" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs"
          )}
        >
          {currentLevel.id}
        </div>
      </motion.div>

      {/* 等级名称 */}
      <span className={cn("mt-2 font-medium text-foreground", sizes.text)}>
        {currentLevel.name}
      </span>

      {/* 进度条 */}
      {showProgress && (
        <div className="w-full mt-1">
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full bg-gradient-to-r", currentLevel.gradient)}
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className={cn("text-center text-muted-foreground mt-0.5", sizes.levelText)}>
            {expInLevel}/{expNeeded} XP
          </div>
        </div>
      )}

      {/* 悬停提示 */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-popover border rounded-lg shadow-lg p-3 whitespace-nowrap">
              <div className="text-sm font-medium">{currentLevel.stage}</div>
              <div className="text-xs text-muted-foreground mt-1">
                下一级还需 {expNeeded - expInLevel} 经验
              </div>
              <div className="text-xs text-muted-foreground">
                连续修炼 {userData.streakDays} 天
              </div>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="border-4 border-transparent border-t-popover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CompactLevelBadgeProps {
  level: number;
  className?: string;
}

export function CompactLevelBadge({ level, className }: CompactLevelBadgeProps) {
  const levelData = LEVELS.find((l) => l.id === level) || LEVELS[0];
  const IconComponent = iconMap[levelData.icon] || Sprout;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
        "bg-gradient-to-r",
        levelData.gradient,
        "text-white",
        className
      )}
    >
      <IconComponent className="w-3 h-3" />
      <span>Lv.{level}</span>
      <span className="opacity-90">{levelData.name}</span>
    </div>
  );
}
