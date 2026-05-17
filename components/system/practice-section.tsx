"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GongfaDetailCard from "./gongfa-detail";
import WeeklyPlanComponent from "./weekly-plan";
import GongfaFormulaComponent from "./gongfa-formula";
import type { PracticeSection as PracticeSectionType } from "@/lib/system-data";
import type { StageKey } from "@/lib/system-data";
import { cn } from "@/lib/utils";

type PracticeSubSection = "overview" | "core" | "auxiliary" | "combinations" | "weekly" | "formula" | "daily";

interface PracticeSectionProps {
  data: PracticeSectionType;
  color: string;
  stageKey: StageKey;
}

export default function PracticeSection({ data, color, stageKey }: PracticeSectionProps) {
  const [activeSubSection, setActiveSubSection] = useState<PracticeSubSection>("overview");

  const subSections: { key: PracticeSubSection; label: string }[] = [
    { key: "overview", label: "2.1 功法总览" },
    { key: "core", label: "2.2 核心功法" },
    { key: "auxiliary", label: "2.3 辅助功法" },
    { key: "combinations", label: "2.4 功法组合" },
    { key: "weekly", label: "2.5 每周计划" },
    { key: "formula", label: "2.6 功法口诀" },
    { key: "daily", label: "2.7 日常实践" },
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

      {/* 2.1 功法总览 */}
      {activeSubSection === "overview" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">功法总览</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base" style={{ color }}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    核心功法
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.coreGongfa.map((gongfa) => (
                      <li key={gongfa.id} className="flex items-center gap-2 text-sm">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-muted-foreground">{gongfa.name}</span>
                        <span className="text-xs text-muted-foreground">({gongfa.subtitle})</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base" style={{ color }}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    辅助功法
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.auxiliaryGongfa.length > 0 ? (
                    <ul className="space-y-2">
                      {data.auxiliaryGongfa.map((gongfa) => (
                        <li key={gongfa.id} className="flex items-center gap-2 text-sm">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-muted-foreground">{gongfa.name}</span>
                          <span className="text-xs text-muted-foreground">({gongfa.subtitle})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">此阶段暂无辅助功法</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* 2.2 核心功法详解 */}
      {activeSubSection === "core" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">核心功法详解</h3>
            </div>
            {data.coreGongfa.length > 0 ? (
              <div className="space-y-4">
                {data.coreGongfa.map((gongfa) => (
                  <GongfaDetailCard key={gongfa.id} gongfa={gongfa} color={color} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">此阶段暂无核心功法数据。</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* 2.3 辅助功法 */}
      {activeSubSection === "auxiliary" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">辅助功法</h3>
            </div>
            {data.auxiliaryGongfa.length > 0 ? (
              <div className="space-y-4">
                {data.auxiliaryGongfa.map((gongfa) => (
                  <GongfaDetailCard key={gongfa.id} gongfa={gongfa} color={color} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">此阶段暂无辅助功法数据。</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* 2.4 功法组合方案 */}
      {activeSubSection === "combinations" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">功法组合方案</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.combinations.map((combo, i) => (
                <Card key={i} className="overflow-hidden">
                  <div
                    className="px-4 py-3 text-sm font-medium text-white"
                    style={{ backgroundColor: color }}
                  >
                    {combo.name}
                  </div>
                  <CardContent className="p-4">
                    <ul className="mb-3 space-y-1.5">
                      {combo.items.map((item, j) => (
                        <li key={j} className="flex items-center text-sm">
                          <span
                            className="mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {combo.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2.5 每周修炼计划 */}
      {activeSubSection === "weekly" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">每周修炼计划</h3>
            </div>
            <WeeklyPlanComponent stageKey={stageKey} color={color} />
          </div>
        </div>
      )}

      {/* 2.6 功法口诀 */}
      {activeSubSection === "formula" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">功法口诀</h3>
            </div>
            <GongfaFormulaComponent stageKey={stageKey} color={color} />
          </div>
        </div>
      )}

      {/* 2.7 日常实践 */}
      {activeSubSection === "daily" && (
        <div className="space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="font-serif text-xl font-bold">日常实践</h3>
            </div>

            {/* 作息安排 */}
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  每日作息安排
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/60">
                        <th className="px-4 py-2 text-left text-xs font-medium">时间</th>
                        <th className="px-4 py-2 text-left text-xs font-medium">活动</th>
                        <th className="px-4 py-2 text-left text-xs font-medium">备注</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.dailyPractice.schedule.map((item, i) => (
                        <tr key={i} className="border-t">
                          <td className="whitespace-nowrap px-4 py-2 text-xs font-medium">
                            {item.time}
                          </td>
                          <td className="px-4 py-2 text-xs">{item.activity}</td>
                          <td className="px-4 py-2 text-xs text-muted-foreground">
                            {item.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* 饮食建议 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    饮食建议
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.dailyPractice.diet.map((item, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span
                          className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 姿势要点 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    姿势要点
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.dailyPractice.posture.map((item, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span
                          className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
