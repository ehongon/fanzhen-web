"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { AssessmentSection as AssessmentSectionType } from "@/lib/system-data";
import type { StageKey } from "@/lib/system-data";
import { cn } from "@/lib/utils";

type AssessmentSubSection = "entry" | "advanced" | "complete" | "guide";

interface AssessmentSectionProps {
  data: AssessmentSectionType;
  color: string;
  stageKey: StageKey;
}

export default function AssessmentSection({ data, color, stageKey }: AssessmentSectionProps) {
  const [activeSubSection, setActiveSubSection] = useState<AssessmentSubSection>("entry");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const subSections: { key: AssessmentSubSection; label: string }[] = [
    { key: "entry", label: "4.1 入门标准" },
    { key: "advanced", label: "4.2 进阶标准" },
    { key: "complete", label: "4.3 圆满标准" },
    { key: "guide", label: "4.4 进阶指引" },
  ];

  const getProgress = (items: { item: string; description: string }[]) => {
    const checked = items.filter((_, idx) => checkedItems[`${activeSubSection}-${idx}`]).length;
    return items.length > 0 ? Math.round((checked / items.length) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* 子环节导航 */}
      <div className="flex flex-wrap gap-2">
        {subSections.map((sub) => (
          <button
            key={sub.key}
            onClick={() => setActiveSubSection(sub.key)}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200",
              activeSubSection === sub.key
                ? "text-white shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
            style={{
              backgroundColor: activeSubSection === sub.key ? color : undefined,
            }}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* 4.1 入门标准 */}
      {activeSubSection === "entry" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">入门标准检查清单</h3>
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                style={{ backgroundColor: color }}
              >
                完成度 {getProgress(data.entry)}%
              </span>
            </div>

            {/* 进度条 */}
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${getProgress(data.entry)}%`,
                  backgroundColor: color,
                }}
              />
            </div>

            <div className="space-y-2">
              {data.entry.map((item, idx) => {
                const key = `entry-${idx}`;
                return (
                  <button
                    key={key}
                    onClick={() => toggleCheck(key)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all duration-200",
                      checkedItems[key]
                        ? "border-l-4 bg-muted/20"
                        : "hover:bg-muted/10"
                    )}
                    style={{
                      borderLeftColor: checkedItems[key] ? color : undefined,
                    }}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-200",
                        checkedItems[key]
                          ? "border-transparent text-white"
                          : "border-muted-foreground/30"
                      )}
                      style={{
                        backgroundColor: checkedItems[key] ? color : undefined,
                      }}
                    >
                      {checkedItems[key] && (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm font-medium transition-all duration-200",
                          checkedItems[key] && "line-through opacity-50"
                        )}
                      >
                        {item.item}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4.2 进阶标准 */}
      {activeSubSection === "advanced" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">进阶标准检查清单</h3>
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                style={{ backgroundColor: color }}
              >
                完成度 {getProgress(data.advanced)}%
              </span>
            </div>

            {/* 进度条 */}
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${getProgress(data.advanced)}%`,
                  backgroundColor: color,
                }}
              />
            </div>

            <div className="space-y-2">
              {data.advanced.map((item, idx) => {
                const key = `advanced-${idx}`;
                return (
                  <button
                    key={key}
                    onClick={() => toggleCheck(key)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all duration-200",
                      checkedItems[key]
                        ? "border-l-4 bg-muted/20"
                        : "hover:bg-muted/10"
                    )}
                    style={{
                      borderLeftColor: checkedItems[key] ? color : undefined,
                    }}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-200",
                        checkedItems[key]
                          ? "border-transparent text-white"
                          : "border-muted-foreground/30"
                      )}
                      style={{
                        backgroundColor: checkedItems[key] ? color : undefined,
                      }}
                    >
                      {checkedItems[key] && (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm font-medium transition-all duration-200",
                          checkedItems[key] && "line-through opacity-50"
                        )}
                      >
                        {item.item}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4.3 圆满标准 */}
      {activeSubSection === "complete" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">圆满标准检查清单</h3>
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                style={{ backgroundColor: color }}
              >
                完成度 {getProgress(data.complete)}%
              </span>
            </div>

            {/* 进度条 */}
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${getProgress(data.complete)}%`,
                  backgroundColor: color,
                }}
              />
            </div>

            <div className="space-y-2">
              {data.complete.map((item, idx) => {
                const key = `complete-${idx}`;
                return (
                  <button
                    key={key}
                    onClick={() => toggleCheck(key)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all duration-200",
                      checkedItems[key]
                        ? "border-l-4 bg-muted/20"
                        : "hover:bg-muted/10"
                    )}
                    style={{
                      borderLeftColor: checkedItems[key] ? color : undefined,
                    }}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-200",
                        checkedItems[key]
                          ? "border-transparent text-white"
                          : "border-muted-foreground/30"
                      )}
                      style={{
                        backgroundColor: checkedItems[key] ? color : undefined,
                      }}
                    >
                      {checkedItems[key] && (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm font-medium transition-all duration-200",
                          checkedItems[key] && "line-through opacity-50"
                        )}
                      >
                        {item.item}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4.4 进阶指引 */}
      {activeSubSection === "guide" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">进阶指引</h3>
            </div>
            <Card className="overflow-hidden">
              <div
                className="px-4 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: color }}
              >
                下一阶段准备
              </div>
              <CardContent className="p-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {data.nextStageGuide}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
