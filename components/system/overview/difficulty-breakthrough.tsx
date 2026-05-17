"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type DifficultyBreakthrough } from "@/lib/system-overview-data";
import {
  ChevronDown,
  AlertTriangle,
  Lightbulb,
  MessageCircle,
  Target,
} from "lucide-react";

interface DifficultyBreakthroughProps {
  difficulties: DifficultyBreakthrough[];
}

export default function DifficultyBreakthrough({
  difficulties,
}: DifficultyBreakthroughProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [expandedDifficulty, setExpandedDifficulty] = useState<string | null>(
    null
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
            难点与突破
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            修炼路上难免遇到障碍，了解难点，掌握突破之法
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cinnabar/60" />
        </div>

        <div className="space-y-6">
          {difficulties.map((stageDiff, stageIndex) => (
            <motion.div
              key={stageDiff.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stageIndex * 0.1 }}
              className="overflow-hidden rounded-xl border bg-card shadow-card"
            >
              {/* 阶段头部 */}
              <div
                className="flex cursor-pointer items-center justify-between p-5 transition-colors hover:bg-muted/20"
                onClick={() =>
                  setExpandedStage(
                    expandedStage === stageDiff.stage
                      ? null
                      : stageDiff.stage
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cinnabar/10 text-cinnabar">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold">
                      {stageDiff.stageName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {stageDiff.difficulties.length} 个常见难点
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                    expandedStage === stageDiff.stage ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* 难点列表 */}
              <AnimatePresence>
                {expandedStage === stageDiff.stage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t p-5">
                      <div className="space-y-4">
                        {stageDiff.difficulties.map((diff, diffIndex) => (
                          <motion.div
                            key={diff.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: diffIndex * 0.1 }}
                            className="overflow-hidden rounded-xl border bg-white shadow-sm"
                          >
                            {/* 难点头部 */}
                            <div
                              className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/20"
                              onClick={() =>
                                setExpandedDifficulty(
                                  expandedDifficulty === diff.title
                                    ? null
                                    : diff.title
                                )
                              }
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                  <Target className="h-4 w-4" />
                                </div>
                                <h4 className="font-serif text-base font-bold">
                                  {diff.title}
                                </h4>
                              </div>
                              <ChevronDown
                                className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                                  expandedDifficulty === diff.title
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </div>

                            {/* 难点详情 */}
                            <AnimatePresence>
                              {expandedDifficulty === diff.title && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="border-t p-4">
                                    {/* 描述 */}
                                    <div className="mb-3">
                                      <p className="text-sm leading-relaxed text-muted-foreground">
                                        {diff.description}
                                      </p>
                                    </div>

                                    {/* 原因 */}
                                    <div className="mb-3 rounded-lg bg-amber-50 p-3">
                                      <h5 className="mb-1 flex items-center gap-2 text-xs font-bold text-amber-700">
                                        <Lightbulb className="h-3.5 w-3.5" />
                                        原因分析
                                      </h5>
                                      <p className="text-sm text-amber-800">
                                        {diff.cause}
                                      </p>
                                    </div>

                                    {/* 各体系解决方案 */}
                                    <div className="mb-3">
                                      <h5 className="mb-2 text-xs font-bold text-foreground">
                                        各家突破之法
                                      </h5>
                                      <div className="grid gap-2 sm:grid-cols-2">
                                        {diff.solutions.map((sol, i) => (
                                          <div
                                            key={i}
                                            className="rounded-lg border border-cinnabar/10 bg-rice/30 p-3"
                                          >
                                            <div className="mb-1 text-xs font-bold text-cinnabar">
                                              {sol.source}
                                            </div>
                                            <p className="text-xs leading-relaxed text-muted-foreground">
                                              {sol.method}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* 凡真子提示 */}
                                    <div className="rounded-lg border border-gold/30 bg-gold/5 p-3">
                                      <h5 className="mb-1 flex items-center gap-2 text-xs font-bold text-gold-dark">
                                        <MessageCircle className="h-3.5 w-3.5" />
                                        凡真子说
                                      </h5>
                                      <p className="text-sm italic leading-relaxed text-foreground/80">
                                        {diff.fanzhenTip}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
