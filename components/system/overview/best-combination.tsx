"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type BestCombination } from "@/lib/system-overview-data";
import { Clock, Users, Sparkles, ChevronDown } from "lucide-react";

interface BestCombinationProps {
  combinations: BestCombination[];
}

export default function BestCombination({ combinations }: BestCombinationProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
            最佳组合推荐
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            凡真子根据多年实修经验，为各阶段推荐最佳功法组合
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cinnabar/60" />
        </div>

        <div className="space-y-6">
          {combinations.map((stageCombo, stageIndex) => (
            <motion.div
              key={stageCombo.stage}
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
                    expandedStage === stageCombo.stage
                      ? null
                      : stageCombo.stage
                  )
                }
              >
                <div>
                  <h3 className="font-serif text-xl font-bold">
                    {stageCombo.stageName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stageCombo.combinations.length} 种组合方案
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                    expandedStage === stageCombo.stage ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* 组合列表 */}
              <AnimatePresence>
                {expandedStage === stageCombo.stage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t p-5">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {stageCombo.combinations.map((combo, comboIndex) => (
                          <motion.div
                            key={combo.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: comboIndex * 0.1 }}
                            className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-card-hover"
                          >
                            <div className="mb-3 flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-gold" />
                              <h4 className="font-serif text-base font-bold">
                                {combo.name}
                              </h4>
                            </div>

                            {/* 功法列表 */}
                            <div className="mb-3 space-y-2">
                              {combo.items.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between rounded-lg bg-muted/30 p-2"
                                >
                                  <span className="text-sm font-medium">
                                    {item.name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      {item.duration}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* 组合原理 */}
                            <div className="mb-3 rounded-lg bg-rice/50 p-3">
                              <p className="text-xs leading-relaxed text-muted-foreground">
                                <span className="font-medium text-foreground">
                                  原理：
                                </span>
                                {combo.principle}
                              </p>
                            </div>

                            {/* 适用人群 */}
                            <div className="mb-2 flex flex-wrap gap-1">
                              {combo.suitable.map((s, i) => (
                                <span
                                  key={i}
                                  className="rounded-full bg-cinnabar/10 px-2 py-0.5 text-xs text-cinnabar"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>

                            {/* 预期效果 */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Users className="h-3.5 w-3.5" />
                              <span>{combo.effect}</span>
                            </div>
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
