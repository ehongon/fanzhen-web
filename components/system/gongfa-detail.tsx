"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { GongfaDetail } from "@/lib/system-data";

interface GongfaDetailProps {
  gongfa: GongfaDetail;
  color: string;
}

export default function GongfaDetailCard({ gongfa, color }: GongfaDetailProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span
                className={cn(
                  "rounded px-2 py-0.5 text-xs font-medium text-white",
                  gongfa.status === "core" ? "bg-cinnabar" : "bg-gold"
                )}
              >
                {gongfa.status === "core" ? "核心功法" : "辅助功法"}
              </span>
            </div>
            <CardTitle className="text-xl" style={{ color }}>
              {gongfa.name}
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{gongfa.subtitle}</p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-muted"
            style={{ color }}
          >
            <svg
              className={cn(
                "h-5 w-5 transition-transform duration-300",
                expanded && "rotate-180"
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
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* 功法原理 */}
        <div className="rounded-lg bg-muted/40 p-4">
          <h4 className="mb-2 text-sm font-semibold" style={{ color }}>
            功法原理
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {gongfa.principle}
          </p>
        </div>

        {/* 操作步骤 */}
        <div>
          <h4 className="mb-3 text-sm font-semibold" style={{ color }}>
            操作步骤
          </h4>
          <div className="space-y-2">
            {gongfa.steps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/30"
              >
                <div
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {step.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 呼吸配合 */}
        <div className="rounded-lg border p-4">
          <div className="mb-2 flex items-center gap-2">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
            </svg>
            <h4 className="text-sm font-semibold" style={{ color }}>
              呼吸配合
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {gongfa.breathing}
          </p>
        </div>

        {/* 意念要点 */}
        <div className="rounded-lg border p-4">
          <div className="mb-2 flex items-center gap-2">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h4 className="text-sm font-semibold" style={{ color }}>
              意念要点
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {gongfa.mindFocus}
          </p>
        </div>

        {/* 展开更多内容 */}
        {expanded && (
          <div className="space-y-4 animate-fade-in">
            {/* 时间进阶表 */}
            <div>
              <h4 className="mb-3 text-sm font-semibold" style={{ color }}>
                时间进阶表
              </h4>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/60">
                      <th className="px-4 py-2 text-left text-xs font-medium">阶段</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">时长</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">重点</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gongfa.timeTable.map((item, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-2 text-xs font-medium">{item.period}</td>
                        <td className="px-4 py-2 text-xs text-muted-foreground">
                          {item.duration}
                        </td>
                        <td className="px-4 py-2 text-xs text-muted-foreground">
                          {item.focus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 常见反应与处理 */}
            {gongfa.reactions.length > 0 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold" style={{ color }}>
                  常见反应与处理
                </h4>
                <div className="space-y-2">
                  {gongfa.reactions.map((reaction, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-amber-200 bg-amber-50/50 p-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                          !
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-amber-800">
                            {reaction.symptom}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-amber-700/80">
                            处理：{reaction.handling}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 收功方法 */}
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h4 className="text-sm font-semibold" style={{ color }}>
                  收功方法
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {gongfa.closing}
              </p>
            </div>
          </div>
        )}

        {/* 展开/收起按钮 */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-1 rounded-lg border py-2 text-xs font-medium transition-colors hover:bg-muted"
          style={{ color }}
        >
          {expanded ? (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              收起详情
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
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
              展开详情（时间进阶、常见反应、收功方法）
            </>
          )}
        </button>
      </CardContent>
    </Card>
  );
}
