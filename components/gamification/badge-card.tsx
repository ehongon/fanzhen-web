"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge, UserBadge, tierConfig } from "@/lib/badge-data";
import { Lock, Star, Sparkles } from "lucide-react";

interface BadgeCardProps {
  badge: Badge;
  userBadge?: UserBadge;
  showSecret?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function BadgeCard({
  badge,
  userBadge,
  showSecret = false,
  onClick,
  size = "md",
}: BadgeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isEarned = !!userBadge;
  const isSecret = badge.isSecret && !isEarned && !showSecret;

  const sizeClasses = {
    sm: "w-16 h-16 text-xl",
    md: "w-24 h-24 text-3xl",
    lg: "w-32 h-32 text-4xl",
  };

  const tierInfo = tierConfig[badge.tier as keyof typeof tierConfig];

  return (
    <motion.div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full cursor-pointer transition-all duration-500",
          sizeClasses[size],
          isEarned
            ? "ring-2 ring-offset-2"
            : "grayscale opacity-60",
          isSecret && "opacity-40"
        )}
        style={{
          background: isEarned
            ? `linear-gradient(135deg, ${badge.color}20, ${badge.color}40)`
            : "linear-gradient(135deg, #e0e0e0, #c0c0c0)",
          borderColor: isEarned ? badge.color : "transparent",
          borderWidth: isEarned ? "2px" : "1px",
          borderStyle: "solid",
          boxShadow: isEarned
            ? `0 0 ${badge.tier * 8}px ${badge.glowColor}, inset 0 0 ${badge.tier * 4}px ${badge.glowColor}`
            : "none",
        }}
      >
        {isSecret ? (
          <Lock className="w-1/2 h-1/2 text-gray-400" />
        ) : (
          <span className="select-none">{badge.icon}</span>
        )}

        {isEarned && (
          <motion.div
            className="absolute -top-1 -right-1 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
              style={{
                background: badge.color,
                color: badge.tier >= 4 ? "#1a1a2e" : "#fff",
              }}
            >
              {badge.tier}
            </div>
          </motion.div>
        )}

        {isEarned && badge.tier >= 4 && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                `0 0 10px ${badge.glowColor}`,
                `0 0 25px ${badge.glowColor}`,
                `0 0 10px ${badge.glowColor}`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64"
          >
            <div className="bg-card border border-border rounded-xl shadow-xl p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{
                    background: isEarned
                      ? `linear-gradient(135deg, ${badge.color}30, ${badge.color}50)`
                      : "#e0e0e0",
                  }}
                >
                  {isSecret ? "?" : badge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground">
                    {isSecret ? "???" : badge.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3" style={{ color: badge.color }} />
                    <span className="text-xs text-muted-foreground">
                      {tierInfo?.name}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {isSecret ? "这是一个隐藏徽章，达成特定条件后解锁" : badge.description}
              </p>

              <div className="mt-2 pt-2 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span className="text-muted-foreground">获得条件：</span>
                  <span className="text-foreground">
                    {isSecret ? "???" : badge.condition}
                  </span>
                </div>
              </div>

              {isEarned && userBadge && (
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      获得于 {userBadge.earnedAt.toLocaleDateString("zh-CN")}
                    </span>
                    <span className="text-gold font-medium">
                      +{badge.expReward * userBadge.tier} EXP
                    </span>
                  </div>
                </div>
              )}

              {!isEarned && !isSecret && (
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">奖励经验</span>
                    <span className="text-gold font-medium">
                      +{badge.expReward} EXP
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="w-2 h-2 bg-card border-r border-b border-border rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-2 text-center">
        <p
          className={cn(
            "text-xs font-medium truncate",
            isEarned ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {isSecret ? "???" : badge.name}
        </p>
        {isEarned && (
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {tierInfo?.stars}
          </p>
        )}
      </div>
    </motion.div>
  );
}
