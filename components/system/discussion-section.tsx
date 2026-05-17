"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BreakthroughComponent from "./breakthrough";
import FanzhenCombinationComponent from "./fanzhen-combination";
import type { DiscussionSection as DiscussionSectionType } from "@/lib/system-data";
import type { StageKey } from "@/lib/system-data";
import { cn } from "@/lib/utils";

type DiscussionSubSection = "insights" | "questions" | "fanzhen" | "breakthrough" | "combination" | "shares";

interface DiscussionSectionProps {
  data: DiscussionSectionType;
  color: string;
  stageKey: StageKey;
}

export default function DiscussionSection({ data, color, stageKey }: DiscussionSectionProps) {
  const [activeSubSection, setActiveSubSection] = useState<DiscussionSubSection>("insights");

  const subSections: { key: DiscussionSubSection; label: string }[] = [
    { key: "insights", label: "3.1 心得分享" },
    { key: "questions", label: "3.2 常见问题" },
    { key: "fanzhen", label: "3.3 凡真子经验" },
    { key: "breakthrough", label: "3.4 突破案例" },
    { key: "combination", label: "3.5 凡真子组合" },
    { key: "shares", label: "3.6 用户分享" },
  ];

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

      {/* 3.1 心得分享 */}
      {activeSubSection === "insights" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">修炼心得分享</h3>
            </div>
            <div className="space-y-3">
              {data.insights.map((insight, i) => (
                <Card key={i} className="transition-shadow hover:shadow-card">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-semibold" style={{ color }}>
                        {insight.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {insight.author}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {insight.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3.2 常见问题 */}
      {activeSubSection === "questions" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">常见问题与解答</h3>
            </div>
            <div className="space-y-3">
              {data.commonQuestions.map((qa, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="bg-muted/30 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <span
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        Q
                      </span>
                      <p className="text-sm font-medium">{qa.question}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                        A
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {qa.answer}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3.3 凡真子经验 */}
      {activeSubSection === "fanzhen" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">凡真子常见问题应对</h3>
            </div>
            <div className="space-y-3">
              {data.fanzhenQA.map((qa, i) => (
                <Card
                  key={i}
                  className="overflow-hidden border-l-4"
                  style={{ borderLeftColor: color }}
                >
                  <div className="bg-muted/20 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div
                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        曹
                      </div>
                      <p className="text-sm font-medium">{qa.question}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {qa.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3.4 突破案例 */}
      {activeSubSection === "breakthrough" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">突破案例</h3>
            </div>
            <BreakthroughComponent stageKey={stageKey} color={color} />
          </div>
        </div>
      )}

      {/* 3.5 凡真子组合 */}
      {activeSubSection === "combination" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">凡真子组合</h3>
            </div>
            <FanzhenCombinationComponent stageKey={stageKey} color={color} />
          </div>
        </div>
      )}

      {/* 3.6 用户分享 */}
      {activeSubSection === "shares" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">用户经验分享</h3>
            </div>
            <div className="space-y-3">
              {data.userShares.map((share, i) => (
                <Card key={i} className="transition-shadow hover:shadow-card">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-semibold" style={{ color }}>
                        {share.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">{share.date}</span>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      {share.content}
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {share.author.charAt(0)}
                      </div>
                      <span className="text-xs text-muted-foreground">{share.author}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
