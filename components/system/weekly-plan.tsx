"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyPlansData, type StageWeeklyPlan, type WeeklyPlan } from "@/lib/system-data-extended";
import type { StageKey } from "@/lib/system-data";
import { cn } from "@/lib/utils";

interface WeeklyPlanProps {
  stageKey: StageKey;
  color: string;
}

export default function WeeklyPlanComponent({ stageKey, color }: WeeklyPlanProps) {
  const planData: StageWeeklyPlan | undefined = weeklyPlansData[stageKey];
  const [selectedWeek, setSelectedWeek] = useState(0);

  if (!planData || !planData.weeklyPlans || planData.weeklyPlans.length === 0) {
    return (
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="p-6">
          <p className="text-muted-foreground">此阶段暂无详细周计划数据。</p>
        </CardContent>
      </Card>
    );
  }

  const currentWeek: WeeklyPlan = planData.weeklyPlans[selectedWeek];

  return (
    <div className="space-y-6">
      {/* 阶段总览 */}
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="p-6">
          <h3 className="mb-2 font-serif text-xl font-bold" style={{ color }}>
            {planData.stageTitle} · {planData.totalWeeks}周修炼计划
          </h3>
          <p className="leading-relaxed text-muted-foreground">{planData.overview}</p>
        </CardContent>
      </Card>

      {/* 周选择器 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">选择周次</h3>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
          {planData.weeklyPlans.map((week, index) => (
            <button
              key={week.week}
              onClick={() => setSelectedWeek(index)}
              className={cn(
                "rounded-lg px-2 py-2 text-xs font-medium transition-all duration-200",
                selectedWeek === index
                  ? "text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
              style={{
                backgroundColor: selectedWeek === index ? color : undefined,
              }}
            >
              第{week.week}周
            </button>
          ))}
        </div>
      </div>

      {/* 当前周详情 */}
      <Card className="overflow-hidden">
        <div
          className="px-4 py-3 text-sm font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {currentWeek.weekTitle}
        </div>
        <CardContent className="p-4">
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {currentWeek.weekDesc}
          </p>

          {/* 每日安排 */}
          <div className="mb-6 space-y-3">
            <h4 className="font-serif text-base font-bold" style={{ color }}>
              每日修炼安排
            </h4>
            {currentWeek.dailySchedule.map((schedule, index) => (
              <div
                key={index}
                className="rounded-lg border bg-muted/20 p-3"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: color }}
                  >
                    {schedule.time}
                  </span>
                  <span className="text-sm font-medium">{schedule.gongfa}</span>
                  <span className="text-xs text-muted-foreground">({schedule.duration})</span>
                </div>
                <ul className="space-y-1">
                  {schedule.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start text-xs">
                      <span
                        className="mr-2 mt-1 h-1 w-1 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 本周目标 */}
          <div className="mb-6">
            <h4 className="mb-2 font-serif text-base font-bold" style={{ color }}>
              本周目标
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {currentWeek.weeklyGoals.map((goal, index) => (
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
                  <span className="text-sm text-muted-foreground">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 进度检查 */}
          <div className="mb-6">
            <h4 className="mb-2 font-serif text-base font-bold" style={{ color }}>
              每周进度检查
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {currentWeek.checkItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border bg-muted/20 p-2"
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 调整建议 */}
          <div className="rounded-lg border-l-4 bg-muted/20 p-3" style={{ borderLeftColor: color }}>
            <h4 className="mb-1 text-sm font-bold" style={{ color }}>
              调整建议
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {currentWeek.adjustments}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
