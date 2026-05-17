"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearningSection as LearningSectionType } from "@/lib/system-data";
import { systemInterpretations, coreConcepts, difficultyPreviews } from "@/lib/system-data-extended";
import type { StageKey } from "@/lib/system-data";

interface LearningSectionProps {
  data: LearningSectionType;
  color: string;
  stageKey: StageKey;
}

export default function LearningSection({ data, color, stageKey }: LearningSectionProps) {
  const interpretations = systemInterpretations[stageKey] || [];
  const concepts = coreConcepts[stageKey] || [];
  const difficulties = difficultyPreviews[stageKey] || [];

  return (
    <div className="space-y-8">
      {/* 1.1 阶段总论 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">1.1 阶段总论</h3>
        </div>
        <Card className="border-l-4" style={{ borderLeftColor: color }}>
          <CardContent className="p-6">
            <p className="leading-relaxed text-muted-foreground">{data.overview}</p>
          </CardContent>
        </Card>
      </div>

      {/* 1.2 核心理论 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">1.2 核心理论</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.coreTheory.map((theory, i) => (
            <Card key={i} className="transition-shadow hover:shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base" style={{ color }}>
                  {theory.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {theory.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 1.3 身心特征 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">1.3 身心特征</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { title: "初期", items: data.bodyMindFeatures.early, icon: "🌱" },
            { title: "中期", items: data.bodyMindFeatures.middle, icon: "🌿" },
            { title: "后期", items: data.bodyMindFeatures.late, icon: "🌳" },
          ].map((phase) => (
            <Card key={phase.title}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span>{phase.icon}</span>
                  <span style={{ color }}>{phase.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
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
          ))}
        </div>
      </div>

      {/* 1.4 各体系解读 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">1.4 各体系解读</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {interpretations.map((interp, i) => (
            <Card key={i} className="transition-shadow hover:shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-lg">{interp.icon}</span>
                  <span style={{ color }}>{interp.system}体系</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {interp.interpretation}
                </p>
                {interp.keyConcepts.length > 0 && (
                  <div className="rounded-lg bg-muted/20 p-2">
                    <p className="mb-1 text-xs font-bold text-muted-foreground">关键概念</p>
                    <div className="space-y-1">
                      {interp.keyConcepts.map((concept, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs">
                          <span
                            className="flex-shrink-0 rounded px-1.5 py-0.5 font-medium text-white"
                            style={{ backgroundColor: color }}
                          >
                            {concept.term}
                          </span>
                          <span className="text-muted-foreground">{concept.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 1.5 核心概念 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">1.5 核心概念</h3>
        </div>
        <div className="space-y-3">
          {concepts.map((concept, i) => (
            <Card key={i} className="transition-shadow hover:shadow-card">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: color }}
                  >
                    {concept.term}
                  </span>
                </div>
                <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
                  {concept.definition}
                </p>
                <div className="mb-2 rounded-lg bg-muted/20 p-2">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-bold">应用：</span>
                    {concept.application}
                  </p>
                </div>
                {concept.related.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {concept.related.map((rel, j) => (
                      <span
                        key={j}
                        className="rounded-full px-2 py-0.5 text-xs"
                        style={{ backgroundColor: `${color}15`, color }}
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 1.6 难点预告 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">1.6 难点预告</h3>
        </div>
        <div className="space-y-3">
          {difficulties.map((difficulty, i) => (
            <Card key={i} className="overflow-hidden">
              <div
                className="px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: color }}
              >
                {difficulty.difficulty}
              </div>
              <CardContent className="p-4">
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {difficulty.description}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/20 p-2">
                    <p className="mb-1 text-xs font-bold" style={{ color }}>
                      预防方法
                    </p>
                    <ul className="space-y-1">
                      {difficulty.prevention.map((prev, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs">
                          <span
                            className="mr-2 mt-1 h-1 w-1 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-muted-foreground">{prev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted/20 p-2">
                    <p className="mb-1 text-xs font-bold" style={{ color }}>
                      解决方法
                    </p>
                    <ul className="space-y-1">
                      {difficulty.solution.map((sol, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs">
                          <span
                            className="mr-2 mt-1 h-1 w-1 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-muted-foreground">{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 凡真子经验 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">凡真子经验</h3>
        </div>
        <div className="space-y-3">
          {data.fanzhenExperience.map((exp, i) => (
            <Card
              key={i}
              className="border-l-4 bg-muted/20"
              style={{ borderLeftColor: color }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    曹
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {exp}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 相关典籍推荐 */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-serif text-xl font-bold">相关典籍推荐</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.recommendedTexts.map((text, i) => (
            <Card key={i} className="transition-shadow hover:shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    📖
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {text.name}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {text.author}
                      </span>
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {text.desc}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
