"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gongfaFormulas, type GongfaFormula } from "@/lib/system-data-extended";
import type { StageKey } from "@/lib/system-data";
import { cn } from "@/lib/utils";

interface GongfaFormulaProps {
  stageKey: StageKey;
  color: string;
}

export default function GongfaFormulaComponent({ stageKey, color }: GongfaFormulaProps) {
  const formulas = gongfaFormulas.filter((f) => f.stage === stageKey);
  const [selectedFormula, setSelectedFormula] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState<Record<number, boolean>>({});

  if (formulas.length === 0) {
    return (
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="p-6">
          <p className="text-muted-foreground">此阶段暂无功法口诀数据。</p>
        </CardContent>
      </Card>
    );
  }

  const formula: GongfaFormula = formulas[selectedFormula];

  const toggleAnnotation = (lineIndex: number) => {
    setShowAnnotations((prev) => ({
      ...prev,
      [lineIndex]: !prev[lineIndex],
    }));
  };

  return (
    <div className="space-y-6">
      {/* 口诀选择 */}
      {formulas.length > 1 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
            <h3 className="font-serif text-xl font-bold">选择口诀</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {formulas.map((f, index) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormula(index)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  selectedFormula === index
                    ? "text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
                style={{
                  backgroundColor: selectedFormula === index ? color : undefined,
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 口诀详情 */}
      <Card className="overflow-hidden">
        <div
          className="px-4 py-3 text-sm font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {formula.name}
          <span className="ml-2 text-xs opacity-80">{formula.subtitle}</span>
        </div>
        <CardContent className="p-4">
          {/* 前言 */}
          <div className="mb-6 rounded-lg bg-muted/20 p-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {formula.preface}
            </p>
          </div>

          {/* 口诀内容 */}
          <div className="mb-6 space-y-4">
            {formula.lines.map((line, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-2">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className="font-serif text-lg font-bold leading-relaxed"
                      style={{ color }}
                    >
                      {line.original}
                    </p>
                    {line.annotations && line.annotations.length > 0 && (
                      <button
                        onClick={() => toggleAnnotation(index)}
                        className="flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium text-white transition-opacity hover:opacity-80"
                        style={{ backgroundColor: color }}
                      >
                        {showAnnotations[index] ? "隐藏注释" : "查看注释"}
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {line.explanation}
                </p>

                {/* 注释 */}
                {showAnnotations[index] && line.annotations && line.annotations.length > 0 && (
                  <div className="mt-3 rounded-lg bg-muted/30 p-3">
                    <h5 className="mb-2 text-xs font-bold text-muted-foreground">
                      词语注释
                    </h5>
                    <div className="space-y-1">
                      {line.annotations.map((annotation, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span
                            className="flex-shrink-0 rounded px-1.5 py-0.5 font-medium text-white"
                            style={{ backgroundColor: color }}
                          >
                            {annotation.term}
                          </span>
                          <span className="text-muted-foreground">
                            {annotation.meaning}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 总结 */}
          <div className="mb-4 rounded-lg border-l-4 bg-muted/20 p-3" style={{ borderLeftColor: color }}>
            <h4 className="mb-1 text-sm font-bold" style={{ color }}>
              口诀总结
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {formula.summary}
            </p>
          </div>

          {/* 凡真子注 */}
          <div className="rounded-lg border-l-4 bg-muted/20 p-3" style={{ borderLeftColor: color }}>
            <div className="mb-2 flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: color }}
              >
                凡
              </div>
              <h4 className="text-sm font-bold" style={{ color }}>
                凡真子注
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {formula.fanzhenNote}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
