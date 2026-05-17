"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fanzhenCombinations, type FanzhenCombination } from "@/lib/system-data-extended";
import type { StageKey } from "@/lib/system-data";
import { cn } from "@/lib/utils";

interface FanzhenCombinationProps {
  stageKey: StageKey;
  color: string;
}

export default function FanzhenCombinationComponent({ stageKey, color }: FanzhenCombinationProps) {
  const combination = fanzhenCombinations.find((c) => c.stage === stageKey);

  if (!combination) {
    return (
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="p-6">
          <p className="text-muted-foreground">此阶段暂无凡真子组合数据。</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 组合名称和原理 */}
      <Card className="overflow-hidden">
        <div
          className="px-4 py-3 text-sm font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {combination.combinationName}
        </div>
        <CardContent className="p-4">
          <div className="mb-4 rounded-lg bg-muted/20 p-3">
            <h4 className="mb-1 text-sm font-bold" style={{ color }}>
              组合原理
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {combination.principle}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 各体系贡献 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">各体系贡献</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {combination.contributions.map((contrib, index) => (
            <Card key={index} className="overflow-hidden">
              <div
                className="px-4 py-2 text-xs font-medium text-white"
                style={{ backgroundColor: color }}
              >
                {contrib.system}体系
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <span className="text-sm font-medium" style={{ color }}>
                    贡献：
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {contrib.contribution}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium" style={{ color }}>
                    方法：
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {contrib.method}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 练习顺序 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">练习顺序</h3>
        </div>
        <div className="space-y-3">
          {combination.practiceOrder.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3"
            >
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {step.step}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{step.gongfa}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: color }}
                  >
                    {step.duration}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{step.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 注意事项 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">注意事项</h3>
        </div>
        <div className="space-y-2">
          {combination.precautions.map((precaution, index) => (
            <div
              key={index}
              className="flex items-start gap-2 rounded-lg border bg-muted/20 p-2"
            >
              <span
                className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-muted-foreground">{precaution}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 凡真子注 */}
      <div className="rounded-lg border-l-4 bg-muted/20 p-4" style={{ borderLeftColor: color }}>
        <div className="mb-2 flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: color }}
          >
            凡
          </div>
          <h4 className="font-serif text-base font-bold" style={{ color }}>
            凡真子注
          </h4>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {combination.fanzhenNote}
        </p>
      </div>
    </div>
  );
}
