"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type ConstitutionGuide,
  type StageKey,
  CONSTITUTION_NAMES,
  CONSTITUTION_COLORS,
} from "@/lib/system-overview-data";
import {
  ChevronDown,
  Heart,
  AlertCircle,
  Utensils,
  Sun,
  CheckCircle,
} from "lucide-react";

interface ConstitutionGuideProps {
  guides: ConstitutionGuide[];
}

const stageNames: Record<StageKey, string> = {
  lianxing: "炼形化精",
  lianjing: "炼精化气",
  lianqi: "炼气化神",
  lianshen: "炼神返虚",
};

export default function ConstitutionGuide({ guides }: ConstitutionGuideProps) {
  const [selectedConstitution, setSelectedConstitution] = useState<string>(
    guides[0]?.type || "pinghe"
  );
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const currentGuide = guides.find((g) => g.type === selectedConstitution);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
            体质差异化指南
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            不同体质需要不同的修炼策略，因人制宜，方能事半功倍
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cinnabar/60" />
        </div>

        {/* 体质选择标签 */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {guides.map((guide) => (
            <button
              key={guide.type}
              onClick={() => {
                setSelectedConstitution(guide.type);
                setExpandedStage(null);
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                selectedConstitution === guide.type
                  ? "text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={
                selectedConstitution === guide.type
                  ? { backgroundColor: CONSTITUTION_COLORS[guide.type] }
                  : {}
              }
            >
              {guide.name}
            </button>
          ))}
        </div>

        {/* 当前体质信息 */}
        {currentGuide && (
          <motion.div
            key={currentGuide.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 体质描述 */}
            <div
              className="mb-6 rounded-xl border p-6"
              style={{
                borderColor: `${CONSTITUTION_COLORS[currentGuide.type]}30`,
                backgroundColor: `${CONSTITUTION_COLORS[currentGuide.type]}05`,
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                <Heart
                  className="h-5 w-5"
                  style={{ color: CONSTITUTION_COLORS[currentGuide.type] }}
                />
                <h3 className="font-serif text-lg font-bold">
                  {currentGuide.name}
                </h3>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                {currentGuide.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentGuide.characteristics.map((c, i) => (
                  <span
                    key={i}
                    className="rounded-full px-3 py-1 text-xs"
                    style={{
                      backgroundColor: `${CONSTITUTION_COLORS[currentGuide.type]}15`,
                      color: CONSTITUTION_COLORS[currentGuide.type],
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* 各阶段建议 */}
            <div className="space-y-4">
              {(Object.keys(currentGuide.stageAdvice) as StageKey[]).map(
                (stageKey, index) => {
                  const advice = currentGuide.stageAdvice[stageKey];
                  const isExpanded = expandedStage === stageKey;

                  return (
                    <motion.div
                      key={stageKey}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="overflow-hidden rounded-xl border bg-card shadow-sm"
                    >
                      <div
                        className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/20"
                        onClick={() =>
                          setExpandedStage(isExpanded ? null : stageKey)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{
                              backgroundColor:
                                CONSTITUTION_COLORS[currentGuide.type],
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-serif text-base font-bold">
                              {stageNames[stageKey]}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {advice.focus}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t p-4">
                              <div className="grid gap-4 md:grid-cols-2">
                                {/* 推荐 */}
                                <div>
                                  <h5 className="mb-2 flex items-center gap-2 text-sm font-bold text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    推荐功法
                                  </h5>
                                  <ul className="space-y-1.5">
                                    {advice.recommended.map((r, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                      >
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                                        {r}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* 避免 */}
                                <div>
                                  <h5 className="mb-2 flex items-center gap-2 text-sm font-bold text-red-500">
                                    <AlertCircle className="h-4 w-4" />
                                    注意事项
                                  </h5>
                                  <ul className="space-y-1.5">
                                    {advice.avoid.map((a, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                      >
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                                        {a}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* 饮食 */}
                                <div>
                                  <h5 className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-600">
                                    <Utensils className="h-4 w-4" />
                                    饮食建议
                                  </h5>
                                  <ul className="space-y-1.5">
                                    {advice.diet.map((d, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                      >
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                                        {d}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* 生活方式 */}
                                <div>
                                  <h5 className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-600">
                                    <Sun className="h-4 w-4" />
                                    生活方式
                                  </h5>
                                  <ul className="space-y-1.5">
                                    {advice.lifestyle.map((l, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                      >
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        {l}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
