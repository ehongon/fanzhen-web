"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, ArrowLeft, TrendingUp, Users, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTeams, getTeamRankings, initializeMockData, TeamRanking } from "@/lib/team-data";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  contribution: number;
  practiceMinutes: number;
  streakDays: number;
  teamCount: number;
}

export default function FellowshipLeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"contribution" | "practice" | "streak">("contribution");

  useEffect(() => {
    initializeMockData();
    const teams = getTeams();
    const userMap = new Map<string, LeaderboardEntry>();

    teams.forEach((team) => {
      const rankings = getTeamRankings(team.id);
      rankings.forEach((ranking) => {
        const existing = userMap.get(ranking.userId);
        if (existing) {
          existing.contribution += ranking.contribution;
          existing.practiceMinutes += ranking.practiceMinutes;
          existing.streakDays = Math.max(existing.streakDays, ranking.streakDays);
          existing.teamCount += 1;
        } else {
          userMap.set(ranking.userId, {
            rank: 0,
            userId: ranking.userId,
            userName: ranking.userName,
            contribution: ranking.contribution,
            practiceMinutes: ranking.practiceMinutes,
            streakDays: ranking.streakDays,
            teamCount: 1,
          });
        }
      });
    });

    const sorted = Array.from(userMap.values()).sort((a, b) => {
      if (activeTab === "contribution") return b.contribution - a.contribution;
      if (activeTab === "practice") return b.practiceMinutes - a.practiceMinutes;
      return b.streakDays - a.streakDays;
    });

    sorted.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    setEntries(sorted);
  }, [activeTab]);

  const tabs = [
    { key: "contribution" as const, label: "贡献值", icon: Trophy },
    { key: "practice" as const, label: "修炼时长", icon: Clock },
    { key: "streak" as const, label: "连续打卡", icon: TrendingUp },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-amber-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm text-rice/50">{rank}</span>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-amber-400/10 border-amber-400/30";
    if (rank === 2) return "bg-gray-400/10 border-gray-400/30";
    if (rank === 3) return "bg-amber-600/10 border-amber-600/30";
    return "bg-ink/40 border-gold/10";
  };

  return (
    <div className="min-h-screen bg-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回同修首页 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Link
            href="/fellowship"
            className="inline-flex items-center text-rice/60 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回同修
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-rice">同修排行榜</h1>
              <p className="text-rice/60">看看谁的修炼最精进</p>
            </div>
          </div>
        </motion.div>

        {/* 标签切换 */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                  activeTab === tab.key
                    ? "bg-gold/20 text-gold border-gold/40"
                    : "bg-transparent text-rice/60 border-gold/10 hover:border-gold/30 hover:text-rice"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 排行榜 */}
        <div className="space-y-3">
          {entries.slice(0, 50).map((entry, index) => (
            <motion.div
              key={entry.userId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border",
                getRankStyle(entry.rank)
              )}
            >
              <div className="w-8 flex items-center justify-center">
                {getRankIcon(entry.rank)}
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center text-sm text-rice">
                {entry.userName.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-rice truncate">
                  {entry.userName}
                </div>
                <div className="text-xs text-rice/50">
                  {entry.teamCount} 个道场
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center hidden sm:block">
                  <div className="text-gold font-medium">{entry.contribution}</div>
                  <div className="text-xs text-rice/40">贡献</div>
                </div>
                <div className="text-center hidden sm:block">
                  <div className="text-gold font-medium">{entry.practiceMinutes}分</div>
                  <div className="text-xs text-rice/40">时长</div>
                </div>
                <div className="text-center">
                  <div className="text-gold font-medium">{entry.streakDays}天</div>
                  <div className="text-xs text-rice/40">连续</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-rice/20 mx-auto mb-4" />
            <p className="text-rice/40">暂无排行数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
