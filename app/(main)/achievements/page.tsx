"use client";

import { motion } from "framer-motion";
import { achievements, badges, mockUserBadges } from "@/lib/badge-data";
import AchievementTracker from "@/components/gamification/achievement-tracker";
import { Trophy, Target, Zap } from "lucide-react";

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 */}
      <div className="bg-ink-gradient text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
              <Trophy className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              成就系统
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              完成特定目标，解锁成就奖励。每一个成就都是你修行路上的里程碑。
            </p>
          </motion.div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 快速统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {achievements.length}
                </p>
                <p className="text-sm text-muted-foreground">总成就数</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cinnabar/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-cinnabar" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {badges.length}
                </p>
                <p className="text-sm text-muted-foreground">总徽章数</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ink/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-ink" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {achievements.reduce((sum, a) => sum + a.expReward, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">总经验值</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 成就追踪器 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            成就进度
          </h2>
          <p className="text-sm text-muted-foreground">
            追踪你的成就进度，完成目标获得丰厚奖励
          </p>
        </div>

        <AchievementTracker
          achievements={achievements}
          userBadges={mockUserBadges}
          badges={badges}
        />
      </div>
    </div>
  );
}
