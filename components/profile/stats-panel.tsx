"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Flame,
  Activity,
  TrendingUp,
  BookOpen,
  BarChart3,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatsData {
  monthlyDays: number;
  monthlyHours: number;
  avgDailyMinutes: number;
  longestStreak: number;
  gongfaCount: number;
  totalDays: number;
  totalHours: number;
}

interface StatsPanelProps {
  stats: StatsData;
}

const statItems = [
  { key: "monthlyDays" as const, title: "本月修炼天数", icon: Calendar },
  { key: "monthlyHours" as const, title: "本月修炼时长", icon: Clock, suffix: "h" },
  { key: "avgDailyMinutes" as const, title: "平均每日时长", icon: Activity, suffix: "min" },
  { key: "longestStreak" as const, title: "最长连续天数", icon: Flame },
  { key: "gongfaCount" as const, title: "功法种类数", icon: BookOpen },
  { key: "totalDays" as const, title: "修炼总天数", icon: BarChart3 },
];

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        const value = stats[item.key];
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="bg-card rounded-xl border border-border/50 shadow-card p-3 sm:p-4 hover:shadow-card-hover transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">
                  {item.title}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground font-serif-cn">
                  {value}
                  {item.suffix && (
                    <span className="text-sm text-muted-foreground ml-0.5">
                      {item.suffix}
                    </span>
                  )}
                </h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gold/20 to-cinnabar/20 flex items-center justify-center flex-shrink-0 ml-2">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cinnabar" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
