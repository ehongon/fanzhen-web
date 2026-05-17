import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  getAllStageOverviews,
  getSchoolMappings,
  getBestCombinations,
  getConstitutionGuides,
  getCoreConcepts,
  getDifficultyBreakthroughs,
} from "@/lib/system-overview-data";
import { Card, CardContent } from "@/components/ui/card";
import StageArchitecture from "@/components/system/overview/stage-architecture";
import SchoolMapping from "@/components/system/overview/school-mapping";
import BestCombination from "@/components/system/overview/best-combination";
import ConstitutionGuide from "@/components/system/overview/constitution-guide";
import ConceptLibrary from "@/components/system/overview/concept-library";
import DifficultyBreakthrough from "@/components/system/overview/difficulty-breakthrough";
import PracticeJourneyClient from "@/components/system/practice-journey-client";

export const metadata: Metadata = {
  title: "凡真修炼体系 - 凡真",
  description:
    "融合儒释道医武艺各家之长，形成行之有效的炼体修真体系。四阶段九层结构，性命双修、理事圆融、天人合一。",
};

// 阶段图标
const stageIcons: Record<string, React.ReactNode> = {
  lianxing: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a4 4 0 0 1 4 4c0 2.5-2 4-4 6-2-2-4-3.5-4-6a4 4 0 0 1 4-4Z" />
      <path d="M12 12v8" />
      <path d="M9 16h6" />
    </svg>
  ),
  lianjing: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2c-5.5 0-10 4.5-10 10 0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10 0-5.5-4.5-10-10-10Z" />
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  lianqi: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5V3" />
      <path d="M12 21v-2" />
      <path d="M5 12H3" />
      <path d="M21 12h-2" />
    </svg>
  ),
  lianshen: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
};

// 核心理念数据
const coreIdeas = [
  {
    title: "性命双修",
    desc: "身心同时修炼，不可偏废",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "理事圆融",
    desc: "理论与实践相结合",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "天人合一",
    desc: "个体与宇宙融为一体",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function SystemPage() {
  const stages = getAllStageOverviews();
  const schoolMappings = getSchoolMappings();
  const bestCombinations = getBestCombinations();
  const constitutionGuides = getConstitutionGuides();
  const coreConcepts = getCoreConcepts();
  const difficultyBreakthroughs = getDifficultyBreakthroughs();

  return (
    <div className="min-h-screen bg-rice-paper">
      {/* Hero区域 */}
      <section className="relative overflow-hidden bg-ink-gradient py-12 sm:py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cinnabar/20 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-3 sm:px-4 text-center">
          <h1 className="mb-3 sm:mb-4 font-serif text-2xl sm:text-4xl font-bold text-rice md:text-5xl lg:text-6xl">
            凡真修炼体系
          </h1>
          <p className="mx-auto mb-4 sm:mb-6 max-w-3xl text-sm sm:text-lg text-rice/70 md:text-xl px-2">
            融合儒释道医武艺各家之长，形成行之有效的炼体修真体系
          </p>
          <div className="mx-auto mb-6 sm:mb-8 h-1 w-20 sm:w-24 rounded-full bg-gold/60" />

          {/* 核心理念 */}
          <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 sm:gap-4">
            {coreIdeas.map((idea) => (
              <div
                key={idea.title}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-rice/20 bg-rice/10 px-3 sm:px-4 py-1.5 sm:py-2 text-rice/90"
              >
                <span className="text-gold scale-75 sm:scale-100">{idea.icon}</span>
                <span className="text-xs sm:text-sm font-medium">{idea.title}</span>
                <span className="text-[10px] sm:text-xs text-rice/60 hidden sm:inline">· {idea.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 体系简介 */}
      <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground px-2">
            凡真修炼体系以道家内丹学为根基，融合佛家禅定、儒家心性、中医养生、武学内功、瑜伽冥想、现代科学的精华，
            构建了一套循序渐进的四阶段九层修炼路径。每一阶段都有明确的目标、方法和验证标准，
            按照「学习-练习-交流-检验」四个环节形成闭环，帮助修行者在安全的前提下稳步提升。
          </p>
        </div>
      </section>

      {/* 游戏化修炼旅程 */}
      <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <PracticeJourneyClient />
      </section>

      {/* 四阶段九层架构图 */}
      <StageArchitecture stages={stages} />

      {/* 各体系对应表 */}
      <div className="border-t bg-muted/20">
        <SchoolMapping mappings={schoolMappings} />
      </div>

      {/* 最佳组合推荐 */}
      <BestCombination combinations={bestCombinations} />

      {/* 体质差异化指南 */}
      <div className="border-t bg-muted/20">
        <ConstitutionGuide guides={constitutionGuides} />
      </div>

      {/* 核心概念速查 */}
      <ConceptLibrary concepts={coreConcepts} />

      {/* 难点与突破 */}
      <div className="border-t bg-muted/20">
        <DifficultyBreakthrough difficulties={difficultyBreakthroughs} />
      </div>

      {/* 闭环说明 */}
      <section className="border-t bg-muted/30 py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="mb-2 sm:mb-3 font-serif text-xl sm:text-2xl font-bold text-foreground md:text-3xl">
              学习-练习-交流-检验 闭环
            </h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground px-2">
              每个阶段都按照四个环节组织，形成完整的修炼闭环
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[
              {
                name: "学习",
                color: "#5b8db8",
                desc: "理论总论、核心原理、身心特征、典籍推荐",
                icon: (
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                name: "练习",
                color: "#4a7c59",
                desc: "核心功法、辅助功法、组合方案、日常实践",
                icon: (
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                name: "交流",
                color: "#d4a574",
                desc: "心得分享、常见问题、凡真子答疑、用户经验",
                icon: (
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                ),
              },
              {
                name: "检验",
                color: "#c75b39",
                desc: "入门标准、进阶标准、圆满标准、进阶指引",
                icon: (
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <Card key={item.name} className="text-center transition-shadow hover:shadow-card">
                <CardContent className="p-3 sm:p-4">
                  <div
                    className="mx-auto mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="mb-0.5 sm:mb-1 font-serif text-base sm:text-lg font-bold" style={{ color: item.color }}>
                    {item.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 底部提示 */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-muted-foreground">
            每个人的修炼进度因人而异，关键在于持之以恒、循序渐进
          </p>
          <p className="text-sm text-muted-foreground">
            建议在专业导师指导下进行修炼，以确保安全有效
          </p>
        </div>
      </section>
    </div>
  );
}
