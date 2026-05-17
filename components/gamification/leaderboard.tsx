"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LEVELS,
  type LeaderboardEntry,
  type LeaderboardType,
} from "@/lib/gamification-data";
import {
  Trophy,
  Medal,
  Award,
  Flame,
  Crown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
  className?: string;
}

export function Leaderboard({ entries, currentUserId, className }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<LeaderboardType>("global");

  const tabs: { id: LeaderboardType; label: string }[] = [
    { id: "global", label: "全服榜" },
    { id: "weekly", label: "周榜" },
    { id: "monthly", label: "月榜" },
    { id: "friends", label: "好友榜" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-muted-foreground">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200";
      default:
        return "hover:bg-muted/50";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* 标签切换 */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 前三名展示 */}
      <div className="flex items-end justify-center gap-4 mb-6">
        {[2, 1, 3].map((rank) => {
          const entry = entries.find((e) => e.rank === rank);
          if (!entry) return null;

          const levelData = LEVELS.find((l) => l.id === entry.level) || LEVELS[0];
          const isCurrentUser = entry.userId === currentUserId;

          return (
            <motion.div
              key={rank}
              className={cn(
                "flex flex-col items-center",
                rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rank === 1 ? 0.2 : rank === 2 ? 0.1 : 0.3 }}
            >
              {/* 头像 */}
              <div
                className={cn(
                  "relative rounded-full flex items-center justify-center font-bold text-white mb-2",
                  rank === 1
                    ? "w-16 h-16 text-xl bg-gradient-to-br from-yellow-400 to-amber-500"
                    : rank === 2
                    ? "w-14 h-14 text-lg bg-gradient-to-br from-gray-300 to-gray-400"
                    : "w-14 h-14 text-lg bg-gradient-to-br from-amber-500 to-orange-600"
                )}
              >
                {entry.name.charAt(0)}
                {rank === 1 && (
                  <div className="absolute -top-2 -right-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                )}
              </div>

              {/* 名称 */}
              <span
                className={cn(
                  "font-medium text-sm",
                  isCurrentUser && "text-primary"
                )}
              >
                {entry.name}
              </span>

              {/* 等级 */}
              <span className="text-xs text-muted-foreground">
                Lv.{entry.level} {levelData.name}
              </span>

              {/* 经验值 */}
              <span className="text-xs font-medium">
                {entry.totalExp.toLocaleString()} XP
              </span>

              {/*  podium */}
              <div
                className={cn(
                  "w-full rounded-t-lg mt-2",
                  rank === 1
                    ? "h-16 bg-gradient-to-t from-yellow-100 to-yellow-50"
                    : rank === 2
                    ? "h-12 bg-gradient-to-t from-gray-100 to-gray-50"
                    : "h-10 bg-gradient-to-t from-amber-100 to-amber-50"
                )}
              />
            </motion.div>
          );
        })}
      </div>

      {/* 排行榜列表 */}
      <div className="space-y-2">
        {entries.map((entry, index) => {
          const levelData = LEVELS.find((l) => l.id === entry.level) || LEVELS[0];
          const isCurrentUser = entry.userId === currentUserId;

          return (
            <motion.div
              key={entry.userId}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border transition-all",
                getRankStyle(entry.rank),
                isCurrentUser && "ring-2 ring-primary/30"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* 排名 */}
              <div className="w-8 flex items-center justify-center">
                {getRankIcon(entry.rank)}
              </div>

              {/* 头像 */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0",
                  "bg-gradient-to-br",
                  levelData.gradient
                )}
              >
                {entry.name.charAt(0)}
              </div>

              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-medium truncate",
                      isCurrentUser && "text-primary"
                    )}
                  >
                    {entry.name}
                    {isCurrentUser && (
                      <span className="ml-1 text-xs text-muted-foreground">(你)</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Lv.{entry.level}</span>
                  <span>{levelData.name}</span>
                </div>
              </div>

              {/* 连续天数 */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Flame className="w-3 h-3 text-orange-500" />
                <span>{entry.streakDays}天</span>
              </div>

              {/* 经验值 */}
              <div className="text-right">
                <div className="text-sm font-medium">
                  {entry.totalExp.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

interface LeaderboardMiniProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
  className?: string;
}

export function LeaderboardMini({ entries, currentUserId, className }: LeaderboardMiniProps) {
  const topEntries = entries.slice(0, 5);

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-2">
        {topEntries.map((entry, index) => {
          const levelData = LEVELS.find((l) => l.id === entry.level) || LEVELS[0];
          const isCurrentUser = entry.userId === currentUserId;

          return (
            <motion.div
              key={entry.userId}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg",
                isCurrentUser && "bg-primary/5"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* 排名 */}
              <span
                className={cn(
                  "w-5 text-center text-sm font-bold",
                  entry.rank === 1
                    ? "text-yellow-500"
                    : entry.rank === 2
                    ? "text-gray-400"
                    : entry.rank === 3
                    ? "text-amber-600"
                    : "text-muted-foreground"
                )}
              >
                {entry.rank}
              </span>

              {/* 头像 */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white",
                  "bg-gradient-to-br",
                  levelData.gradient
                )}
              >
                {entry.name.charAt(0)}
              </div>

              {/* 名称 */}
              <span
                className={cn(
                  "flex-1 text-sm truncate",
                  isCurrentUser && "font-medium text-primary"
                )}
              >
                {entry.name}
              </span>

              {/* 经验值 */}
              <span className="text-xs text-muted-foreground">
                {entry.totalExp.toLocaleString()} XP
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
