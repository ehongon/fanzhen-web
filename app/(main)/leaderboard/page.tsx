"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MOCK_LEADERBOARD,
  MOCK_USER_GAMIFICATION,
} from "@/lib/gamification-data";
import { Leaderboard } from "@/components/gamification/leaderboard";
import { CompactLevelBadge } from "@/components/gamification/level-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Trophy,
  TrendingUp,
  Users,
  Flame,
  Award,
} from "lucide-react";

export default function LeaderboardPage() {
  const currentUserId = MOCK_USER_GAMIFICATION.userId;

  // 获取当前用户排名
  const currentUserEntry = MOCK_LEADERBOARD.find((e) => e.isCurrentUser);

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 */}
      <div className="bg-gradient-to-b from-primary/10 to-background pb-8">
        <div className="container mx-auto px-4 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h1 className="text-2xl font-bold">修炼排行榜</h1>
              <p className="text-sm text-muted-foreground">
                与同修们一起比拼修炼成果
              </p>
            </div>
          </div>

          {/* 当前用户排名卡片 */}
          {currentUserEntry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* 排名 */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        #{currentUserEntry.rank}
                      </div>
                      <div className="text-xs text-muted-foreground">我的排名</div>
                    </div>

                    {/* 分隔线 */}
                    <div className="w-px h-12 bg-border" />

                    {/* 用户信息 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{currentUserEntry.name}</span>
                        <CompactLevelBadge level={currentUserEntry.level} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {currentUserEntry.totalExp.toLocaleString()} XP
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {currentUserEntry.streakDays} 天连续
                        </span>
                      </div>
                    </div>

                    {/* 上升/下降指示 */}
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+2</span>
                      </div>
                      <div className="text-xs text-muted-foreground">本周</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* 排行榜内容 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主排行榜 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  排行榜
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Leaderboard
                  entries={MOCK_LEADERBOARD}
                  currentUserId={currentUserId}
                />
              </CardContent>
            </Card>
          </div>

          {/* 侧边信息 */}
          <div className="space-y-6">
            {/* 排行榜说明 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">排行榜规则</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">全服榜</div>
                    <div className="text-muted-foreground text-xs">
                      根据总经验值排名
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Flame className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">周榜/月榜</div>
                    <div className="text-muted-foreground text-xs">
                      根据周期内获得的经验值排名
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">好友榜</div>
                    <div className="text-muted-foreground text-xs">
                      与好友之间的排名对比
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 奖励说明 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">排名奖励</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-yellow-500 font-bold">1</span>
                    第一名
                  </span>
                  <span className="font-medium">+2000 XP / 周</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-gray-400 font-bold">2</span>
                    第二名
                  </span>
                  <span className="font-medium">+1500 XP / 周</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">3</span>
                    第三名
                  </span>
                  <span className="font-medium">+1000 XP / 周</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-muted-foreground font-bold">4-10</span>
                    前十名
                  </span>
                  <span className="font-medium">+500 XP / 周</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-muted-foreground font-bold">10+</span>
                    参与奖
                  </span>
                  <span className="font-medium">+100 XP / 周</span>
                </div>
              </CardContent>
            </Card>

            {/* 修炼提示 */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">提升排名小贴士</span>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>· 保持每日修炼，获得连续修炼加成</li>
                  <li>· 完成每日任务，获取额外经验</li>
                  <li>· 参与社区互动，分享修炼心得</li>
                  <li>· 阅读典籍，完成功法学习</li>
                  <li>· 突破关卡，获得大量经验奖励</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
