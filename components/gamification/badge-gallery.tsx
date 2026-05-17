"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Badge,
  UserBadge,
  badgeCategories,
  getBadgesByCategory,
  getSubcategoriesByCategory,
  getEarnedBadgesCount,
  calculateTotalExp,
} from "@/lib/badge-data";
import BadgeCard from "./badge-card";
import { Filter, Grid3X3, List, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type FilterType = "all" | "earned" | "unearned";
type ViewType = "grid" | "category";

interface BadgeGalleryProps {
  badges: Badge[];
  userBadges: UserBadge[];
  showSecret?: boolean;
}

export default function BadgeGallery({
  badges,
  userBadges,
  showSecret = false,
}: BadgeGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filter, setFilter] = useState<FilterType>("all");
  const [viewType, setViewType] = useState<ViewType>("category");

  const earnedCount = getEarnedBadgesCount(userBadges);
  const totalExp = calculateTotalExp(userBadges);
  const totalBadges = badges.length;

  const earnedBadgeIds = useMemo(
    () => new Set(userBadges.map((ub) => ub.badgeId)),
    [userBadges]
  );

  const getUserBadge = (badgeId: string): UserBadge | undefined => {
    return userBadges.find((ub) => ub.badgeId === badgeId);
  };

  const filterBadges = (badgeList: Badge[]): Badge[] => {
    return badgeList.filter((badge) => {
      const isEarned = earnedBadgeIds.has(badge.id);
      if (filter === "earned") return isEarned;
      if (filter === "unearned") return !isEarned;
      return true;
    });
  };

  const getFilteredBadges = (): Badge[] => {
    let filtered = activeCategory === "all"
      ? badges
      : getBadgesByCategory(activeCategory);
    return filterBadges(filtered);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="space-y-6">
      {/* 统计栏 */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Trophy className="w-6 h-6 text-gold mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{earnedCount}</p>
          <p className="text-xs text-muted-foreground">已获徽章</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Sparkles className="w-6 h-6 text-cinnabar mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{totalExp}</p>
          <p className="text-xs text-muted-foreground">总经验值</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Grid3X3 className="w-6 h-6 text-ink mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">
            {Math.round((earnedCount / totalBadges) * 100)}%
          </p>
          <p className="text-xs text-muted-foreground">收集进度</p>
        </motion.div>
      </div>

      {/* 筛选和视图控制 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-1">
            {(["all", "earned", "unearned"] as FilterType[]).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={cn(
                  "text-xs",
                  filter === f && "bg-cinnabar text-white hover:bg-cinnabar-dark"
                )}
              >
                {f === "all" ? "全部" : f === "earned" ? "已获得" : "未获得"}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant={viewType === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType("grid")}
            className={cn(
              viewType === "grid" && "bg-cinnabar text-white hover:bg-cinnabar-dark"
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewType === "category" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType("category")}
            className={cn(
              viewType === "category" && "bg-cinnabar text-white hover:bg-cinnabar-dark"
            )}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("all")}
          className={cn(
            activeCategory === "all" && "bg-cinnabar text-white hover:bg-cinnabar-dark"
          )}
        >
          全部
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

      {/* 徽章展示 */}
      {viewType === "grid" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6"
        >
          {getFilteredBadges().map((badge) => (
            <motion.div
              key={badge.id}
              variants={itemVariants}
              className="flex justify-center"
            >
              <BadgeCard
                badge={badge}
                userBadge={getUserBadge(badge.id)}
                showSecret={showSecret}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="space-y-8">
          {(activeCategory === "all"
            ? badgeCategories
            : badgeCategories.filter((c) => c.id === activeCategory)
          ).map((category) => {
            const categoryBadges = filterBadges(
              getBadgesByCategory(category.id)
            );
            if (categoryBadges.length === 0) return null;

            const subcategories = getSubcategoriesByCategory(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                {subcategories.map((sub) => {
                  const subBadges = categoryBadges.filter(
                    (b) => b.subcategory === sub
                  );
                  if (subBadges.length === 0) return null;

                  return (
                    <div key={sub} className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground pl-2">
                        {sub}
                      </h4>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6"
                      >
                        {subBadges.map((badge) => (
                          <motion.div
                            key={badge.id}
                            variants={itemVariants}
                            className="flex justify-center"
                          >
                            <BadgeCard
                              badge={badge}
                              userBadge={getUserBadge(badge.id)}
                              showSecret={showSecret}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
      )}

      {getFilteredBadges().length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">暂无符合条件的徽章</p>
        </div>
      )}
    </div>
  );
}
