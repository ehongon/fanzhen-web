"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type StageOverview,
  type PeriodKey,
  SCHOOL_NAMES,
} from "@/lib/system-overview-data";
import {
  ChevronDown,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  Shield,
  Zap,
} from "lucide-react";

interface StageArchitectureProps {
  stages: StageOverview[];
}

const periodLabels: Record<PeriodKey, string> = {
  early: "初期",
  middle: "中期",
  late: "后期",
};

const goalIcons: Record<string, React.ReactNode> = {
  xing: <Shield className="h-4 w-4" />,
  qi: <Zap className="h-4 w-4" />,
  shen: <Lightbulb className="h-4 w-4" />,
  xu: <BookOpen className="h-4 w-4" />,
};

const goalLabels: Record<string, string> = {
  xing: "形",
  qi: "气",
  shen: "神",
  xu: "虚",
};

export default function StageArchitecture({ stages }: StageArchitectureProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
            四阶段九层架构
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            凡真修炼体系以四阶段九层为骨架，层层递进，步步深入
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cinnabar/60" />
        </div>

        {/* 阶段总览卡片 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() =>
                setExpandedStage(
                  expandedStage === stage.key ? null : stage.key
                )
              }
            >
              <div
                className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
                style={{ borderColor: `${stage.color}30` }}
              >
                {/* 顶部颜色条 */}
                <div
                  className="absolute left-0 right-0 top-0 h-1.5"
                  style={{ backgroundColor: stage.color }}
                />

                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: stage.color }}
                  >
                    第 {stage.order} 阶段
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                      expandedStage === stage.key ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <h3
                  className="mb-1 font-serif text-xl font-bold"
                  style={{ color: stage.color }}
                >
                  {stage.title}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {stage.subtitle}
                </p>

                <p className="mb-4 text-sm leading-relaxed text-foreground/80">
                  {stage.coreGoal}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{stage.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>{stage.verificationCount} 项验证</span>
                  </div>
                </div>

                {/* 悬停指示 */}
                <div
                  className="mt-3 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: stage.color }}
                >
                  点击查看九层详情 →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 展开的层级详情 */}
        <AnimatePresence>
          {expandedStage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              {stages
                .filter((s) => s.key === expandedStage)
                .map((stage) => (
                  <div key={stage.key} className="mt-8">
                    <div
                      className="mb-6 rounded-lg border-l-4 bg-muted/30 p-4"
                      style={{ borderLeftColor: stage.color }}
                    >
                      <h3 className="font-serif text-lg font-bold">
                        {stage.title} · 九层详解
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {stage.subLevels.map((level, levelIndex) => (
                        <div
                          key={level.key}
                          className="overflow-hidden rounded-xl border bg-card shadow-sm"
                          style={{ borderColor: `${stage.color}20` }}
                        >
                          {/* 层级头部 */}
                          <div
                            className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/30"
                            onClick={() =>
                              setExpandedLevel(
                                expandedLevel === `${stage.key}-${level.key}`
                                  ? null
                                  : `${stage.key}-${level.key}`
                              )
                            }
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                                style={{ backgroundColor: stage.color }}
                              >
                                {stage.order}-{levelIndex + 1}
                              </div>
                              <div>
                                <h4 className="font-serif text-lg font-bold">
                                  {level.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {level.positioning} · {level.duration}
                                </p>
                              </div>
                            </div>
                            <ChevronDown
                              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                                expandedLevel === `${stage.key}-${level.key}`
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </div>

                          {/* 展开的层级内容 */}
                          <AnimatePresence>
                            {expandedLevel ===
                              `${stage.key}-${level.key}` && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="border-t p-4">
                                  {/* 核心目标 */}
                                  <div className="mb-4">
                                    <h5 className="mb-2 flex items-center gap-2 text-sm font-bold">
                                      <Target className="h-4 w-4 text-cinnabar" />
                                      核心目标
                                    </h5>
                                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                      {Object.entries(level.coreGoals).map(
                                        ([key, value]) => (
                                          <div
                                            key={key}
                                            className="rounded-lg bg-muted/40 p-3"
                                          >
                                            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                              {goalIcons[key]}
                                              <span>
                                                {goalLabels[key]}的目标
                                              </span>
                                            </div>
                                            <p className="text-sm leading-relaxed">
                                              {value}
                                            </p>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>

                                  {/* 修炼方法 */}
                  <div className="mb-4">
                                    <h5 className="mb-2 flex items-center gap-2 text-sm font-bold">
                                      <BookOpen className="h-4 w-4 text-cinnabar" />
                                      各体系修炼方法
                                    </h5>
                                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                      {Object.entries(level.methods).map(
                                        ([schoolKey, methods]) => (
                                          <div
                                            key={schoolKey}
                                            className="rounded-lg border p-3"
                                            style={{
                                              borderColor: `${stage.color}15`,
                                            }}
                                          >
                                            <div
                                              className="mb-1 text-xs font-bold"
                                              style={{
                                                color: stage.color,
                                              }}
                                            >
                                              {
                                                SCHOOL_NAMES[
                                                  schoolKey as keyof typeof SCHOOL_NAMES
                                                ]
                                              }
                                            </div>
                                            <ul className="space-y-1">
                                              {methods.map((m, i) => (
                                                <li
                                                  key={i}
                                                  className="text-xs text-muted-foreground"
                                                >
                                                  • {m}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>

                                  {/* 最佳组合 */}
                                  <div className="mb-4 rounded-lg border p-4" style={{ borderColor: `${stage.color}30`, backgroundColor: `${stage.color}05` }}>
                                    <h5 className="mb-2 flex items-center gap-2 text-sm font-bold" style={{ color: stage.color }}>
                                      <Zap className="h-4 w-4" />
                                      {level.bestCombination.name}
                                    </h5>
                                    <div className="mb-2 flex flex-wrap gap-2">
                                      {level.bestCombination.items.map((item, i) => (
                                        <span key={i} className="rounded-full bg-white px-3 py-1 text-xs shadow-sm">
                                          {item}
                                        </span>
                                      ))}
                                    </div>
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                      <span className="font-medium">组合原理：</span>
                                      {level.bestCombination.principle}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                      <span className="font-medium">每日时长：</span>
                                      {level.bestCombination.duration}
                                    </p>
                                  </div>

                                  {/* 验证标准与危险信号 */}
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                      <h5 className="mb-2 flex items-center gap-2 text-sm font-bold text-green-600">
                                        <CheckCircle className="h-4 w-4" />
                                        验证标准
                                      </h5>
                                      <ul className="space-y-1">
                                        {level.verificationStandards.map((v, i) => (
                                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                                            {v}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="mb-2 flex items-center gap-2 text-sm font-bold text-red-500">
                                        <AlertTriangle className="h-4 w-4" />
                                        危险信号
                                      </h5>
                                      <ul className="space-y-1">
                                        {level.dangerSignals.map((d, i) => (
                                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                                            {d}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
