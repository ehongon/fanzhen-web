"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  description?: string;
  className?: string;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  description,
  className,
  delay = 0,
}: StatsCardProps) {
  const trendConfig = {
    up: {
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    down: {
      icon: TrendingDown,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    neutral: {
      icon: Minus,
      color: "text-gray-500",
      bg: "bg-gray-50",
    },
  };

  const TrendIcon = trend ? trendConfig[trend].icon : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-card rounded-xl border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 p-5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground font-serif-cn">
            {value}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          {trend && TrendIcon && trendValue && (
            <div className="flex items-center space-x-1 mt-2">
              <div
                className={cn(
                  "flex items-center space-x-1 px-1.5 py-0.5 rounded-full",
                  trendConfig[trend].bg
                )}
              >
                <TrendIcon className={cn("w-3 h-3", trendConfig[trend].color)} />
                <span className={cn("text-xs font-medium", trendConfig[trend].color)}>
                  {trendValue}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-cinnabar/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-cinnabar" />
        </div>
      </div>
    </motion.div>
  );
}
