"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Achievement,
  UserBadge,
  Badge,
  getBadgeById,
  getAchievementProgress,
  isAchievementCompleted,
  badgeCategories,
} from "@/lib/badge-data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Trophy,
  Gift,
  Target,
  CircleCheck,
  Lock,
  Star,
} from "lucide-react";

interface AchievementTrackerProps {
  achievements: Achievement[];
  userBadges: UserBadge[];
  badges: Badge[];
}

export default function AchievementTracker({
  achievements,
  userBadges,
  badges,
}: AchievementTrackerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const earnedBadgeIds = new Set(userBadges.map((ub) => ub.badgeId));

  const getCategoryName = (categoryId: string): string => {
    const cat = badgeCategories.find((c) => c.id === categoryId);
    return cat?.name || categoryId;
  };

  const getCategoryIcon = (categoryId: string): string => {
    const cat = badgeCategories.find((c) => c.id === categoryId);
    return cat?.icon || "🏆";
  };

  const filteredAchievements =
    activeCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  const completedCount = achievements.filter((a) =>
    isAchievementCompleted(a, userBadges)
  ).length;

  return (
    <div className="space-y-6">
      {/* 统计概览 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Trophy className="w-6 h-6 text-gold mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{completedCount}</p>
          <p className="text-xs text-muted-foreground">已完成</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Target className="w-6 h-6 text-cinnabar mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">
            {achievements.length - completedCount}
          </p>
          <p className="text-xs text-muted-foreground">进行中</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Gift className="w-6 h-6 text-ink mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">
            {achievements.reduce(
              (sum, a) =>
                sum + (isAchievementCompleted(a, userBadges) ? a.expReward : 0),
              0
            )}
          </p>
          <p className="text-xs text-muted-foreground">已获得奖励</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Star className="w-6 h-6 text-gold mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">
            {Math.round((completedCount / achievements.length) * 100)}%
          </p>
          <p className="text-xs text-muted-foreground">总进度</p>
        </motion.div>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("all")}
          className={cn(
            activeCategory === "all" && "bg-cinnabar text-white hover:bg-cinnabar-dark"
          )}
        >
          全部成就
        </Button>
        {badgeCategories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              activeCategory === cat.id && "bg-cinnabar text-white hover:bg-cinnabar-dark"
            )}
          >
            <span className="mr-1">{cat.icon}</span>
            {cat.name}
          </Button>
        ))}
      </div>

      {/* 成就列表 */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement, index) => {
            const progress = getAchievementProgress(achievement, userBadges);
            const isCompleted = isAchievementCompleted(achievement, userBadges);
            const isExpanded = expandedId === achievement.id;

            return (
              <motion.div
                key={achievement.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "bg-card border rounded-xl overflow-hidden transition-all duration-300",
                  isCompleted
                    ? "border-gold/50 shadow-glow-gold"
                    : "border-border"
                )}
              >
                {/* 成就头部 */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : achievement.id)
                  }
                >
                  <div className="flex items-center gap-4">
                    {/* 图标 */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0",
                        isCompleted
                          ? "bg-gold/20"
                          : "bg-muted"
                      )}
                    >
                      {isCompleted ? (
                        <CircleCheck className="w-6 h-6 text-gold" />
                      ) : (
                        <span>{getCategoryIcon(achievement.category)}</span>
                      )}
                    </div>

                    {/* 信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {achievement.name}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full">
                            已完成
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {achievement.description}
                      </p>
                    </div>

                    {/* 展开按钮 */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          进度
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {progress.earned}/{progress.total}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          isCompleted ? "bg-gold" : "bg-cinnabar"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {progress.percentage}%
                    </p>
                  </div>
                </div>

                {/* 展开的详情 */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-border">
                        {/* 奖励信息 */}
                        <div className="py-3 flex items-center gap-2">
                          <Gift className="w-4 h-4 text-gold" />
                          <span className="text-sm text-foreground">
                            完成奖励：
                            <span className="font-medium text-gold">
                              {achievement.reward}
                            </span>
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            +{achievement.expReward} EXP
                          </span>
                        </div>

                        {/* 徽章列表 */}
                        {achievement.badges.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground">
                              所需徽章：
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {achievement.badges.map((badgeId) => {
                                const badge = getBadgeById(badgeId);
                                const isEarned = earnedBadgeIds.has(badgeId);

                                if (!badge) return null;

                                return (
                                  <div
                                    key={badgeId}
                                    className={cn(
                                      "flex items-center gap-3 p-2 rounded-lg border",
                                      isEarned
                                        ? "bg-gold/5 border-gold/30"
                                        : "bg-muted/50 border-border"
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                                        isEarned
                                          ? "bg-gold/20"
                                          : "bg-gray-200 grayscale"
                                      )}
                                    >
                                      {badge.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={cn(
                                          "text-sm truncate",
                                          isEarned
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                        )}
                                      >
                                        {badge.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {badge.subcategory}
                                      </p>
                                    </div>
                                    {isEarned ? (
                                      <CircleCheck className="w-4 h-4 text-gold flex-shrink-0" />
                                    ) : (
                                      <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {achievement.id === "achievement-grandmaster" && (
                          <div className="py-3 text-center">
                            <p className="text-sm text-muted-foreground">
                              收集全部 {badges.length} 个徽章即可解锁此成就
                            </p>
                            <p className="text-lg font-bold text-foreground mt-1">
                              当前进度：{userBadges.length}/{badges.length}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">暂无符合条件的成就</p>
        </div>
      )}
    </div>
  );
}
