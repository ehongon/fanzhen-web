"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { breakthroughMethods, type BreakthroughMethod } from "@/lib/system-data-extended";
import type { StageKey } from "@/lib/system-data";
import { cn } from "@/lib/utils";

interface BreakthroughProps {
  stageKey: StageKey;
  color: string;
}

export default function BreakthroughComponent({ stageKey, color }: BreakthroughProps) {
  const methods = breakthroughMethods.filter((m) => m.stage === stageKey);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [expandedMethod, setExpandedMethod] = useState<number | null>(null);

  if (methods.length === 0) {
    return (
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="p-6">
          <p className="text-muted-foreground">此阶段暂无突破之法数据。</p>
        </CardContent>
      </Card>
    );
  }

  const method: BreakthroughMethod = methods[selectedMethod];

  return (
    <div className="space-y-6">
      {/* 关卡选择 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">选择关卡</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {methods.map((m, index) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMethod(index);
                setExpandedMethod(null);
              }}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                selectedMethod === index
                  ? "text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
              style={{
                backgroundColor: selectedMethod === index ? color : undefined,
              }}
            >
              {m.barrierName}
            </button>
          ))}
        </div>
      </div>

      {/* 关卡详情 */}
      <Card className="overflow-hidden">
        <div
          className="px-4 py-3 text-sm font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {method.barrierName}
          <span className="ml-2 text-xs opacity-80">{method.stageTitle}阶段</span>
        </div>
        <CardContent className="p-4">
          {/* 关卡描述 */}
          <div className="mb-6 rounded-lg bg-muted/20 p-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {method.barrierDesc}
            </p>
          </div>

          {/* 难点分析 */}
          <div className="mb-6">
            <h4 className="mb-3 font-serif text-base font-bold" style={{ color }}>
              难点分析
            </h4>
            <div className="space-y-2">
              {method.difficultyAnalysis.map((difficulty, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded-lg border bg-muted/20 p-2"
                >
                  <span
                    className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{difficulty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 突破方法 */}
          <div className="mb-6">
            <h4 className="mb-3 font-serif text-base font-bold" style={{ color }}>
              突破方法
            </h4>
            <div className="space-y-3">
              {method.methods.map((m, index) => (
                <div key={index} className="rounded-lg border overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedMethod(expandedMethod === index ? null : index)
                    }
                    className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                        style={{ backgroundColor: color }}
                      >
                        {m.source}
                      </span>
                      <span className="text-sm font-medium">{m.method}</span>
                    </div>
                    <svg
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedMethod === index ? "rotate-180" : ""
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {expandedMethod === index && (
                    <div className="border-t bg-muted/20 px-4 py-3">
                      <ul className="space-y-2">
                        {m.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span
                              className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 凡真子经验 */}
          <div className="mb-6 rounded-lg border-l-4 bg-muted/20 p-3" style={{ borderLeftColor: color }}>
            <div className="mb-2 flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: color }}
              >
                凡
              </div>
              <h4 className="text-sm font-bold" style={{ color }}>
                凡真子经验
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {method.fanzhenExperience}
            </p>
          </div>

          {/* 预期时间和验证标准 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-muted/20 p-3">
              <h4 className="mb-2 text-sm font-bold" style={{ color }}>
                预期突破时间
              </h4>
              <p className="text-sm text-muted-foreground">{method.expectedTime}</p>
            </div>
            <div className="rounded-lg border bg-muted/20 p-3">
              <h4 className="mb-2 text-sm font-bold" style={{ color }}>
                验证标准
              </h4>
              <ul className="space-y-1">
                {method.verificationStandard.map((standard, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs">
                    <span
                      className="mr-2 mt-1 h-1 w-1 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-muted-foreground">{standard}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
