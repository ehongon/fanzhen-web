"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import LearningSection from "@/components/system/learning-section";
import PracticeSection from "@/components/system/practice-section";
import DiscussionSection from "@/components/system/discussion-section";
import AssessmentSection from "@/components/system/assessment-section";
import type { StageData, StageKey } from "@/lib/system-data";

type Section = "learning" | "practice" | "discussion" | "assessment";

interface StageDetailClientProps {
  stage: StageData;
  stageKey: StageKey;
}

export default function StageDetailClient({ stage, stageKey }: StageDetailClientProps) {
  const [activeSection, setActiveSection] = useState<Section>("learning");

  const color = stage.overview.color;

  const sections: { key: Section; label: string; icon: string }[] = [
    { key: "learning", label: "学习（理论）", icon: "📚" },
    { key: "practice", label: "练习（功法）", icon: "🧘" },
    { key: "discussion", label: "交流（社区）", icon: "💬" },
    { key: "assessment", label: "检验（验证）", icon: "✓" },
  ];

  return (
    <div className="space-y-8">
      {/* 阶段标题 */}
      <div className="rounded-2xl bg-gradient-to-r from-[#4a6741] to-[#6b8f5e] p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🎯</span>
          <div>
            <h1 className="font-serif text-3xl font-bold">{stage.overview.title}</h1>
            <p className="text-white/80">{stage.overview.subtitle}</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed max-w-3xl">{stage.overview.coreGoal}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
            预计时间：{stage.overview.estimatedTime}
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
            验证项：{stage.overview.verificationCount}项
          </span>
        </div>
      </div>

      {/* 四个环节导航 */}
      <div className="rounded-xl border bg-card p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                activeSection === section.key
                  ? "bg-[#4a6741] text-white shadow-md"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 环节内容 */}
      <div className="min-h-[400px]">
        {activeSection === "learning" && (
          <LearningSection
            data={stage.learning}
            color={color}
            stageKey={stageKey}
          />
        )}
        {activeSection === "practice" && (
          <PracticeSection
            data={stage.practice}
            color={color}
            stageKey={stageKey}
          />
        )}
        {activeSection === "discussion" && (
          <DiscussionSection
            data={stage.discussion}
            color={color}
            stageKey={stageKey}
          />
        )}
        {activeSection === "assessment" && (
          <AssessmentSection
            data={stage.assessment}
            color={color}
            stageKey={stageKey}
          />
        )}
      </div>
    </div>
  );
}
