"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LEVELS,
  getStageInfo,
  MOCK_USER_GAMIFICATION,
} from "@/lib/gamification-data";
import { LevelBadge } from "@/components/gamification/level-badge";
import { ExpBar } from "@/components/gamification/exp-bar";
import { LevelUpModal } from "@/components/gamification/level-up-modal";
import {
  Lock,
  Unlock,
  Sparkles,
  TrendingUp,
  Award,
  Flame,
  Clock,
  Calendar,
} from "lucide-react";

export default function LevelPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const userData = MOCK_USER_GAMIFICATION;
  const currentLevelData = LEVELS.find((l) => l.id === userData.currentLevel) || LEVELS[0];

  // 按阶段分组
  const stages = [
    { code: "lianxing", name: "炼形化精", range: "1-9级", levels: LEVELS.filter((l) => l.id >= 1 && l.id <= 9) },
    { code: "lianjing", name: "炼精化气", range: "10-18级", levels: LEVELS.filter((l) => l.id >= 10 && l.id <= 18) },
    { code: "lianqi", name: "炼气化神", range: "19-27级", levels: LEVELS.filter((l) => l.id >= 19 && l.id <= 27) },
    { code: "lianshen", name: "炼神返虚", range: "28-36级", levels: LEVELS.filter((l) => l.id >= 28 && l.id <= 36) },
  ];

  const selectedLevelData = selectedLevel
    ? LEVELS.find((l) => l.id === selectedLevel)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 - 当前等级信息 */}
      <div className="bg-gradient-to-b from-primary/10 to-background pb-8">
        <div className="container mx-auto px-4 pt-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* 等级徽章 */}
            <LevelBadge
              userData={userData}
              size="lg"
              showProgress={false}
            />

            {/* 等级详情 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-1">
                {currentLevelData.name}
                <span className="text-muted-foreground text-lg ml-2">
                  Lv.{userData.currentLevel}
                </span>
              </h1>
              <p className="text-muted-foreground text-sm mb-4">
                {currentLevelData.stage} · {currentLevelData.description}
              </p>

              {/* 经验条 */}
              <ExpBar userData={userData} className="max-w-md mx-auto md:mx-0" />
            </div>

            {/* 统计信息 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-card rounded-xl border">
                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{userData.streakDays}</div>
                <div className="text-xs text-muted-foreground">连续修炼</div>
              </div>
              <div className="text-center p-3 bg-card rounded-xl border">
                <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{userData.totalPracticeMinutes}</div>
                <div className="text-xs text-muted-foreground">总分钟</div>
              </div>
              <div className="text-center p-3 bg-card rounded-xl border">
                <Calendar className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{userData.totalPracticeDays}</div>
                <div className="text-xs text-muted-foreground">修炼天数</div>
              </div>
              <div className="text-center p-3 bg-card rounded-xl border">
                <Award className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{userData.maxStreakDays}</div>
                <div className="text-xs text-muted-foreground">最高连续</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 等级列表 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">修炼境界</h2>
        </div>

        <div className="space-y-8">
          {stages.map((stage) => {
            const stageInfo = getStageInfo(stage.code);
            return (
              <div key={stage.code}>
                {/* 阶段标题 */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "w-1 h-8 rounded-full bg-gradient-to-b",
                      stageInfo.gradient
                    )}
                  />
                  <div>
                    <h3 className="font-bold">{stage.name}</h3>
                    <p className="text-xs text-muted-foreground">{stage.range}</p>
                  </div>
                </div>

                {/* 等级卡片网格 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {stage.levels.map((level) => {
                    const isCurrentLevel = level.id === userData.currentLevel;
                    const isUnlocked = level.id <= userData.currentLevel;
                    const isSelected = selectedLevel === level.id;

                    return (
                      <motion.button
                        key={level.id}
                        className={cn(
                          "relative p-4 rounded-xl border transition-all text-left",
                          isCurrentLevel
                            ? "ring-2 ring-primary shadow-lg scale-105"
                            : isUnlocked
                            ? "hover:shadow-md hover:scale-102"
                            : "opacity-50 cursor-not-allowed",
                          isSelected && "ring-2 ring-ring"
                        )}
                        style={{
                          background: isUnlocked
                            ? `linear-gradient(135deg, ${level.color}10, ${level.color}05)`
                            : undefined,
                          borderColor: isCurrentLevel
                            ? level.color
                            : isUnlocked
                            ? `${level.color}30`
                            : undefined,
                        }}
                        onClick={() => isUnlocked && setSelectedLevel(level.id)}
                        whileHover={isUnlocked ? { scale: 1.02 } : undefined}
                        whileTap={isUnlocked ? { scale: 0.98 } : undefined}
                      >
                        {/* 等级状态图标 */}
                        <div className="absolute top-2 right-2">
                          {isCurrentLevel ? (
                            <Sparkles className="w-4 h-4 text-primary" />
                          ) : isUnlocked ? (
                            <Unlock className="w-4 h-4 text-green-500" />
                          ) : (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>

                        {/* 等级图标 */}
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                            isUnlocked
                              ? "bg-gradient-to-br text-white"
                              : "bg-muted text-muted-foreground",
                            level.gradient
                          )}
                        >
                          <span className="text-sm font-bold">{level.id}</span>
                        </div>

                        {/* 等级名称 */}
                        <div
                          className={cn(
                            "font-medium text-sm",
                            !isUnlocked && "text-muted-foreground"
                          )}
                        >
                          {level.name}
                        </div>

                        {/* 所需经验 */}
                        <div className="text-xs text-muted-foreground mt-1">
                          {level.requiredExp.toLocaleString()} XP
                        </div>

                        {/* 当前等级标记 */}
                        {isCurrentLevel && (
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                            当前
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 等级详情侧边栏/弹窗 */}
      <AnimatePresence>
        {selectedLevelData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLevel(null)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              className="relative bg-card border rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 头部 */}
              <div
                className={cn(
                  "h-24 bg-gradient-to-b flex items-center justify-center relative",
                  selectedLevelData.gradient
                )}
              >
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">Lv.{selectedLevelData.id}</div>
                  <div className="text-sm opacity-90">{selectedLevelData.stage}</div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedLevelData.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {selectedLevelData.description}
                </p>

                {/* 所需经验 */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-4">
                  <span className="text-sm">所需经验</span>
                  <span className="font-medium">
                    {selectedLevelData.requiredExp.toLocaleString()} XP
                  </span>
                </div>

                {/* 解锁特权 */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Unlock className="w-4 h-4 text-primary" />
                    解锁特权
                  </h4>
                  <ul className="space-y-2">
                    {selectedLevelData.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 关闭按钮 */}
                <button
                  className="w-full py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
                  onClick={() => setSelectedLevel(null)}
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 升级弹窗演示 */}
      <div className="container mx-auto px-4 py-8">
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
          onClick={() => setShowLevelUp(true)}
        >
          演示升级弹窗
        </button>
      </div>

      <LevelUpModal
        isOpen={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        newLevel={userData.currentLevel + 1}
        previousLevel={userData.currentLevel}
      />
    </div>
  );
}
