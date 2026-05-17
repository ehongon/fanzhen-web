"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Target,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Zap,
  Trophy,
  Map,
  Scroll,
  Sparkles,
  Lock,
  Play,
  Star,
  TrendingUp,
  Award,
  Swords,
} from "lucide-react";
import {
  LEVELS,
  getNextLevelExp,
  getLevelProgress,
} from "@/lib/gamification-data";
import {
  MOCK_PRACTICE_PLAN,
  MOCK_BREAKTHROUGH_GUIDES,
  MOCK_CHECKLIST_ITEMS,
  MOCK_TODAY_GONGFA,
  type PracticePlan,
  type BreakthroughGuide,
  type ChecklistItem,
  type TodayGongfa,
} from "@/lib/practice-plan-data";

// ==================== 接口定义 ====================

export interface PracticeJourneyProps {
  currentLevel: number;
  currentExp: number;
  completedTasks: string[];
  onTaskComplete: (taskId: string) => void;
  onLevelUp: () => void;
}

// ==================== 动画变体 ====================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const levelUpVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

// ==================== 子组件 ====================

/**
 * 等级进度条组件
 */
function LevelProgressBar({
  currentLevel,
  currentExp,
}: {
  currentLevel: number;
  currentExp: number;
}) {
  const levelData = LEVELS.find((l) => l.id === currentLevel) || LEVELS[0];
  const nextLevel = LEVELS.find((l) => l.id === currentLevel + 1);
  const progress = getLevelProgress(currentLevel, currentExp);
  const nextLevelExp = getNextLevelExp(currentLevel);
  const expInLevel = currentExp - levelData.requiredExp;
  const expNeeded = nextLevelExp - levelData.requiredExp;

  const stageColors: Record<string, string> = {
    lianxing: "from-green-500 to-emerald-600",
    lianjing: "from-blue-500 to-indigo-600",
    lianqi: "from-purple-500 to-fuchsia-600",
    lianshen: "from-yellow-500 to-red-500",
  };

  const stageNames: Record<string, string> = {
    lianxing: "炼形化精",
    lianjing: "炼精化气",
    lianqi: "炼气化神",
    lianshen: "炼神返虚",
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-2xl bg-ink-gradient p-6 text-white"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[hsl(30,45%,65%)] blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[hsl(14,55%,50%)] blur-3xl" />
      </div>

      <div className="relative">
        {/* 顶部信息 */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-white/10 text-[hsl(30,45%,65%)] backdrop-blur-sm"
              >
                {stageNames[levelData.stageCode]}
              </Badge>
              <span className="text-xs text-white/50">
                第 {currentLevel} / 36 级
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-gold-foil">
              {levelData.name}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              {levelData.description}
            </p>
          </div>
          <motion.div
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${levelData.color}, ${levelData.color}88)`,
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="h-8 w-8 text-white" />
          </motion.div>
        </div>

        {/* 进度条 */}
        <div className="mb-2">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-white/70">升级进度</span>
            <span className="font-medium text-[hsl(30,45%,65%)]">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
                stageColors[levelData.stageCode]
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* 微光效果 */}
            <motion.div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-white/50">
            <span>{expInLevel} / {expNeeded} 经验</span>
            {nextLevel && (
              <span>下一级: {nextLevel.name}</span>
            )}
          </div>
        </div>

        {/* 属性加成 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {levelData.benefits.map((benefit, index) => (
            <span
              key={index}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-sm"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * 修炼路径可视化组件
 */
function CultivationPath({ currentLevel }: { currentLevel: number }) {
  const stages = [
    { name: "炼形化精", levels: [1, 9], color: "#22c55e", code: "lianxing" },
    { name: "炼精化气", levels: [10, 18], color: "#3b82f6", code: "lianjing" },
    { name: "炼气化神", levels: [19, 27], color: "#a855f7", code: "lianqi" },
    { name: "炼神返虚", levels: [28, 36], color: "#eab308", code: "lianshen" },
  ];

  const getLevelStatus = (levelId: number) => {
    if (levelId < currentLevel) return "completed";
    if (levelId === currentLevel) return "current";
    return "locked";
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden border-[hsl(40,15%,85%)]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-[hsl(14,55%,50%)]" />
            <CardTitle className="font-serif text-lg">修炼路径</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {stages.map((stage, stageIndex) => (
              <div key={stage.code}>
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: stage.color }}>
                    {stage.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({stage.levels[0]}-{stage.levels[1]}级)
                  </span>
                </div>
                <div className="grid grid-cols-9 gap-1">
                  {Array.from(
                    { length: stage.levels[1] - stage.levels[0] + 1 },
                    (_, i) => stage.levels[0] + i
                  ).map((levelId) => {
                    const status = getLevelStatus(levelId);
                    const isCurrent = status === "current";
                    const isCompleted = status === "completed";

                    return (
                      <motion.div
                        key={levelId}
                        className={cn(
                          "relative flex aspect-square items-center justify-center rounded-lg text-xs font-bold transition-all",
                          isCompleted && "bg-[hsl(14,55%,50%)]/10 text-[hsl(14,55%,50%)]",
                          isCurrent && "bg-gradient-to-br text-white shadow-lg",
                          status === "locked" && "bg-muted text-muted-foreground/50"
                        )}
                        style={
                          isCurrent
                            ? {
                                background: `linear-gradient(135deg, ${stage.color}, ${stage.color}88)`,
                              }
                            : undefined
                        }
                        whileHover={{ scale: 1.1 }}
                        animate={
                          isCurrent
                            ? {
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                  `0 0 0 0 ${stage.color}00`,
                                  `0 0 20px 4px ${stage.color}44`,
                                  `0 0 0 0 ${stage.color}00`,
                                ],
                              }
                            : undefined
                        }
                        transition={
                          isCurrent
                            ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : undefined
                        }
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : status === "locked" ? (
                          <Lock className="h-3 w-3" />
                        ) : (
                          levelId
                        )}

                        {/* 当前等级指示器 */}
                        {isCurrent && (
                          <motion.div
                            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(30,45%,65%)]"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Sparkles className="h-2.5 w-2.5 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 图例 */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-[hsl(14,55%,50%)]" />
              <span>已完成</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[hsl(30,45%,65%)]" />
              <span>当前</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>未解锁</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * 本周任务面板组件
 */
function WeeklyTasksPanel({
  plan,
  completedTasks,
  onTaskComplete,
}: {
  plan: PracticePlan;
  completedTasks: string[];
  onTaskComplete: (taskId: string) => void;
}) {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const currentWeek = plan.weeklyPlans[selectedWeek];

  const isTaskCompleted = (taskId: string) => completedTasks.includes(taskId);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "gongfa":
        return <Swords className="h-4 w-4" />;
      case "study":
        return <BookOpen className="h-4 w-4" />;
      case "check":
        return <Target className="h-4 w-4" />;
      default:
        return <Flame className="h-4 w-4" />;
    }
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden border-[hsl(40,15%,85%)]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[hsl(14,55%,50%)]" />
              <CardTitle className="font-serif text-lg">本周任务</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              第 {selectedWeek + 1} / {plan.weeklyPlans.length} 周
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* 周选择器 */}
          <div className="mb-4 flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
            {plan.weeklyPlans.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedWeek(index)}
                className={cn(
                  "flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  selectedWeek === index
                    ? "bg-[hsl(14,55%,50%)] text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                第{index + 1}周
              </button>
            ))}
          </div>

          {/* 周目标 */}
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-medium text-foreground">
              周目标
            </h4>
            <div className="space-y-2">
              {currentWeek.goals.map((goal, index) => {
                const taskId = `week-${selectedWeek}-goal-${index}`;
                const completed = isTaskCompleted(taskId);

                return (
                  <motion.div
                    key={index}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border p-3 transition-all",
                      completed
                        ? "border-[hsl(14,55%,50%)]/30 bg-[hsl(14,55%,50%)]/5"
                        : "border-[hsl(40,15%,85%)] bg-card hover:bg-muted/30"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => onTaskComplete(taskId)}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {completed ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-[hsl(14,55%,50%)]" />
                        </motion.div>
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/50" />
                      )}
                    </button>
                    <div className="flex-1">
                      <span
                        className={cn(
                          "text-sm",
                          completed && "text-muted-foreground line-through"
                        )}
                      >
                        {goal}
                      </span>
                      {completed && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-[hsl(14,55%,50%)]"
                        >
                          +50 经验值
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 每日任务 */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-foreground">
              每日安排
            </h4>
            <div className="space-y-2">
              {currentWeek.dailyTasks.map((task, index) => {
                const taskId = `week-${selectedWeek}-daily-${index}`;
                const completed = isTaskCompleted(taskId);

                return (
                  <motion.div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-2.5 transition-all",
                      completed
                        ? "border-[hsl(14,55%,50%)]/30 bg-[hsl(14,55%,50%)]/5"
                        : "border-[hsl(40,15%,85%)] bg-card"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => onTaskComplete(taskId)}
                      className="flex-shrink-0"
                    >
                      {completed ? (
                        <CheckCircle2 className="h-4 w-4 text-[hsl(14,55%,50%)]" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/50" />
                      )}
                    </button>
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[hsl(14,55%,50%)]/10 text-[hsl(14,55%,50%)]">
                      {getTaskIcon(task.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-sm",
                          completed && "text-muted-foreground line-through"
                        )}
                      >
                        {task.title}
                      </span>
                    </div>
                    <Badge variant="secondary" className="flex-shrink-0 text-xs">
                      +{task.exp} EXP
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * 今日功法安排组件
 */
function TodayGongfaPanel({
  gongfaList,
  completedTasks,
  onTaskComplete,
}: {
  gongfaList: TodayGongfa[];
  completedTasks: string[];
  onTaskComplete: (taskId: string) => void;
}) {
  const [activeGongfa, setActiveGongfa] = useState<string | null>(null);

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden border-[hsl(40,15%,85%)]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-[hsl(14,55%,50%)]" />
            <CardTitle className="font-serif text-lg">今日功法</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {gongfaList.map((gongfa, index) => {
            const taskId = `gongfa-${gongfa.id}`;
            const completed = completedTasks.includes(taskId);
            const isActive = activeGongfa === gongfa.id;

            return (
              <motion.div
                key={gongfa.id}
                className={cn(
                  "relative overflow-hidden rounded-xl border transition-all",
                  completed
                    ? "border-[hsl(14,55%,50%)]/30 bg-[hsl(14,55%,50%)]/5"
                    : "border-[hsl(40,15%,85%)] bg-card hover:border-[hsl(14,55%,50%)]/30"
                )}
                layout
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                          completed
                            ? "bg-[hsl(14,55%,50%)]/20 text-[hsl(14,55%,50%)]"
                            : "bg-[hsl(30,45%,65%)]/10 text-[hsl(30,45%,65%)]"
                        )}
                      >
                        {completed ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Scroll className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4
                          className={cn(
                            "font-medium",
                            completed && "text-muted-foreground line-through"
                          )}
                        >
                          {gongfa.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {gongfa.duration} · {gongfa.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        +{gongfa.exp} EXP
                      </Badge>
                    </div>
                  </div>

                  {/* 功法要点 */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 space-y-2 border-t border-[hsl(40,15%,85%)] pt-3">
                          <p className="text-sm text-muted-foreground">
                            {gongfa.description}
                          </p>
                          <div className="space-y-1">
                            {gongfa.keyPoints.map((point, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(14,55%,50%)]" />
                                <span className="text-muted-foreground">
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 操作按钮 */}
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() =>
                        setActiveGongfa(isActive ? null : gongfa.id)
                      }
                    >
                      {isActive ? (
                        <>
                          <ChevronUp className="mr-1 h-3 w-3" />
                          收起详情
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-1 h-3 w-3" />
                          查看要点
                        </>
                      )}
                    </Button>
                    {!completed && (
                      <Button
                        size="sm"
                        className="flex-1 bg-[hsl(14,55%,50%)] text-xs hover:bg-[hsl(14,55%,45%)]"
                        onClick={() => onTaskComplete(taskId)}
                      >
                        <Play className="mr-1 h-3 w-3" />
                        开始练习
                      </Button>
                    )}
                    {completed && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs text-[hsl(14,55%,50%)]"
                        disabled
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        已完成
                      </Button>
                    )}
                  </div>
                </div>

                {/* 完成动画背景 */}
                <AnimatePresence>
                  {completed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="pointer-events-none absolute right-2 top-2"
                    >
                      <Sparkles className="h-5 w-5 text-[hsl(30,45%,65%)]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * 突破指引折叠面板组件
 */
function BreakthroughGuides({
  guides,
}: {
  guides: BreakthroughGuide[];
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden border-[hsl(40,15%,85%)]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[hsl(14,55%,50%)]" />
            <CardTitle className="font-serif text-lg">突破指引</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {guides.map((guide, index) => {
            const isExpanded = expandedId === guide.id;

            return (
              <div
                key={guide.id}
                className="overflow-hidden rounded-lg border border-[hsl(40,15%,85%)]"
              >
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : guide.id)
                  }
                  className={cn(
                    "flex w-full items-center justify-between p-3 text-left transition-colors",
                    isExpanded
                      ? "bg-[hsl(14,55%,50%)]/5"
                      : "bg-card hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[hsl(30,45%,65%)]/10 text-[hsl(30,45%,65%)]">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{guide.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {guide.difficulty} · {guide.estimatedTime}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 border-t border-[hsl(40,15%,85%)] p-3">
                        <div>
                          <h5 className="mb-1 text-xs font-medium text-[hsl(14,55%,50%)]">
                            难点分析
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {guide.difficultyPoint}
                          </p>
                        </div>
                        <div>
                          <h5 className="mb-1 text-xs font-medium text-[hsl(14,55%,50%)]">
                            突破之法
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {guide.solution}
                          </p>
                        </div>
                        {guide.tips.length > 0 && (
                          <div>
                            <h5 className="mb-1 text-xs font-medium text-[hsl(14,55%,50%)]">
                              关键要诀
                            </h5>
                            <ul className="space-y-1">
                              {guide.tips.map((tip, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[hsl(30,45%,65%)]" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * 检验打卡组件
 */
function ChecklistPanel({
  items,
  completedTasks,
  onTaskComplete,
}: {
  items: ChecklistItem[];
  completedTasks: string[];
  onTaskComplete: (taskId: string) => void;
}) {
  const [showCelebration, setShowCelebration] = useState(false);

  const completedCount = items.filter((item) =>
    completedTasks.includes(item.id)
  ).length;
  const allCompleted = completedCount === items.length && items.length > 0;

  const handleCheck = (itemId: string) => {
    onTaskComplete(itemId);
    if (completedCount + 1 === items.length) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  return (
    <motion.div variants={itemVariants} className="relative">
      <Card className="overflow-hidden border-[hsl(40,15%,85%)]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[hsl(14,55%,50%)]" />
              <CardTitle className="font-serif text-lg">检验打卡</CardTitle>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                allCompleted && "border-[hsl(14,55%,50%)] text-[hsl(14,55%,50%)]"
              )}
            >
              {completedCount} / {items.length}
            </Badge>
          </div>
          {/* 总进度条 */}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[hsl(14,55%,50%)] to-[hsl(30,45%,65%)]"
              initial={{ width: 0 }}
              animate={{
                width: `${items.length > 0 ? (completedCount / items.length) * 100 : 0}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {items.map((item, index) => {
            const completed = completedTasks.includes(item.id);

            return (
              <motion.div
                key={item.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3 transition-all",
                  completed
                    ? "border-[hsl(14,55%,50%)]/30 bg-[hsl(14,55%,50%)]/5"
                    : "border-[hsl(40,15%,85%)] bg-card hover:bg-muted/30"
                )}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleCheck(item.id)}
                  className="mt-0.5 flex-shrink-0"
                >
                  {completed ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-[hsl(14,55%,50%)]" />
                    </motion.div>
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/50" />
                  )}
                </button>
                <div className="flex-1">
                  <span
                    className={cn(
                      "text-sm",
                      completed && "text-muted-foreground line-through"
                    )}
                  >
                    {item.title}
                  </span>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                  {completed && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 flex items-center gap-1 text-xs text-[hsl(14,55%,50%)]"
                    >
                      <Zap className="h-3 w-3" />
                      +{item.expReward} 经验值
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* 全部完成提示 */}
          <AnimatePresence>
            {allCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-lg bg-gradient-to-r from-[hsl(14,55%,50%)]/10 to-[hsl(30,45%,65%)]/10 p-4 text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="mb-2 inline-block"
                >
                  <Trophy className="mx-auto h-8 w-8 text-[hsl(30,45%,65%)]" />
                </motion.div>
                <p className="font-serif text-lg font-bold text-[hsl(14,55%,50%)]">
                  今日修炼圆满！
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  所有检验项目已完成，获得额外奖励
                </p>
                <div className="mt-2 flex items-center justify-center gap-1 text-sm text-[hsl(30,45%,65%)]">
                  <Sparkles className="h-4 w-4" />
                  <span>+200 经验值 · 连续打卡加成</span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* 庆祝动画 */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-[hsl(30,45%,65%)]/20 p-8 backdrop-blur-sm"
            >
              <Trophy className="h-12 w-12 text-[hsl(30,45%,65%)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ==================== 主组件 ====================

export default function PracticeJourney({
  currentLevel,
  currentExp,
  completedTasks,
  onTaskComplete,
  onLevelUp,
}: PracticeJourneyProps) {
  const [localCompletedTasks, setLocalCompletedTasks] =
    useState<string[]>(completedTasks);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // 处理任务完成
  const handleTaskComplete = useCallback(
    (taskId: string) => {
      if (localCompletedTasks.includes(taskId)) {
        // 取消完成
        setLocalCompletedTasks((prev) =>
          prev.filter((id) => id !== taskId)
        );
      } else {
        // 标记完成
        setLocalCompletedTasks((prev) => [...prev, taskId]);
        onTaskComplete(taskId);

        // 检查是否升级
        const nextLevelExp = getNextLevelExp(currentLevel);
        const newExp = currentExp + 50; // 假设每个任务50经验
        if (newExp >= nextLevelExp && currentLevel < 36) {
          setShowLevelUp(true);
          setTimeout(() => {
            setShowLevelUp(false);
            onLevelUp();
          }, 3000);
        }
      }
    },
    [
      localCompletedTasks,
      currentExp,
      currentLevel,
      onTaskComplete,
      onLevelUp,
    ]
  );

  // 合并外部和本地的已完成任务
  const allCompletedTasks = useMemo(
    () => Array.from(new Set([...completedTasks, ...localCompletedTasks])),
    [completedTasks, localCompletedTasks]
  );

  return (
    <div className="min-h-screen bg-[hsl(40,33%,94%)]">
      {/* 升级特效 */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              variants={levelUpVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl bg-ink-gradient p-8 text-center text-white shadow-2xl"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mb-4 inline-block"
              >
                <Trophy className="h-16 w-16 text-[hsl(30,45%,65%)]" />
              </motion.div>
              <h2 className="mb-2 font-serif text-3xl font-bold text-gold-foil">
                境界突破！
              </h2>
              <p className="mb-4 text-lg text-white/80">
                恭喜达到第 {currentLevel + 1} 级
              </p>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-sm text-white/60">新境界</p>
                <p className="font-serif text-xl font-bold text-[hsl(30,45%,65%)]">
                  {LEVELS.find((l) => l.id === currentLevel + 1)?.name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-6 p-4 pb-20 md:p-6 lg:p-8"
      >
        {/* 页面标题 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              修炼之旅
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              道阻且长，行则将至。每日精进，终成正果。
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-[hsl(14,55%,50%)]/10 px-3 py-1.5 text-sm text-[hsl(14,55%,50%)]">
              <Flame className="h-4 w-4" />
              <span>{currentExp} EXP</span>
            </div>
          </div>
        </motion.div>

        {/* 等级进度条 */}
        <LevelProgressBar
          currentLevel={currentLevel}
          currentExp={currentExp}
        />

        {/* 两列布局 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 左列 */}
          <div className="space-y-6">
            {/* 修炼路径 */}
            <CultivationPath currentLevel={currentLevel} />

            {/* 突破指引 */}
            <BreakthroughGuides guides={MOCK_BREAKTHROUGH_GUIDES} />
          </div>

          {/* 右列 */}
          <div className="space-y-6">
            {/* 本周任务 */}
            <WeeklyTasksPanel
              plan={MOCK_PRACTICE_PLAN}
              completedTasks={allCompletedTasks}
              onTaskComplete={handleTaskComplete}
            />

            {/* 今日功法 */}
            <TodayGongfaPanel
              gongfaList={MOCK_TODAY_GONGFA}
              completedTasks={allCompletedTasks}
              onTaskComplete={handleTaskComplete}
            />

            {/* 检验打卡 */}
            <ChecklistPanel
              items={MOCK_CHECKLIST_ITEMS}
              completedTasks={allCompletedTasks}
              onTaskComplete={handleTaskComplete}
            />
          </div>
        </div>

        {/* 底部提示 */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-[hsl(40,15%,85%)] bg-card p-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <TrendingUp className="mr-1 inline-block h-4 w-4 text-[hsl(14,55%,50%)]" />
            完成今日任务可获得{" "}
            <span className="font-medium text-[hsl(14,55%,50%)]">
              {MOCK_TODAY_GONGFA.reduce((sum, g) => sum + g.exp, 0) +
                MOCK_CHECKLIST_ITEMS.reduce((sum, i) => sum + i.expReward, 0)}
            </span>{" "}
            经验值
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
