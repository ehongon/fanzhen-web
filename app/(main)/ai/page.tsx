"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChatInterface } from "@/components/ai/chat-interface";
import { StageAssessment } from "@/components/ai/stage-assessment";
import { GongfaRecommendation } from "@/components/ai/gongfa-recommendation";
import { BiasDiagnosis } from "@/components/ai/bias-diagnosis";
import {
  MessageCircle,
  ClipboardCheck,
  BookOpen,
  Stethoscope,
  Sparkles,
} from "lucide-react";

type AIFunction = "chat" | "assessment" | "recommendation" | "diagnosis";

interface FunctionItem {
  id: AIFunction;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const FUNCTIONS: FunctionItem[] = [
  {
    id: "chat",
    label: "修炼问答",
    description: "与AI导师对话，解答修炼疑惑",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    id: "assessment",
    label: "阶段评估",
    description: "多维度评估当前修炼阶段",
    icon: <ClipboardCheck className="w-5 h-5" />,
  },
  {
    id: "recommendation",
    label: "功法推荐",
    description: "根据条件推荐适合功法",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: "diagnosis",
    label: "偏差诊断",
    description: "诊断修炼偏差，提供调整建议",
    icon: <Stethoscope className="w-5 h-5" />,
  },
];

export default function AIPage() {
  const [activeFunction, setActiveFunction] = useState<AIFunction>("chat");

  const renderContent = () => {
    switch (activeFunction) {
      case "chat":
        return <ChatInterface />;
      case "assessment":
        return <StageAssessment />;
      case "recommendation":
        return <GongfaRecommendation />;
      case "diagnosis":
        return <BiasDiagnosis />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-rice dark:to-ink-light pb-16 sm:pb-0">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-cinnabar" />
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">AI智能辅导</h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-cinnabar" />
          </div>
          <p className="text-sm sm:text-lg text-muted-foreground">您的私人修行导师</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-[calc(100vh-12rem)] sm:h-[calc(100vh-16rem)] min-h-[500px] sm:min-h-[600px]">
          {/* 移动端功能选择 - 横向滚动 */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {FUNCTIONS.map((func) => (
                <button
                  key={func.id}
                  onClick={() => setActiveFunction(func.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all flex-shrink-0 min-h-[44px]",
                    activeFunction === func.id
                      ? "bg-cinnabar/10 border border-cinnabar/20 shadow-sm"
                      : "hover:bg-secondary border border-transparent bg-card"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                      activeFunction === func.id
                        ? "bg-cinnabar text-white"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {func.icon}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium whitespace-nowrap",
                      activeFunction === func.id && "text-cinnabar"
                    )}
                  >
                    {func.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 桌面端功能选择 */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="bg-card rounded-lg border shadow-card p-4 space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                功能选择
              </h2>
              {FUNCTIONS.map((func) => (
                <button
                  key={func.id}
                  onClick={() => setActiveFunction(func.id)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all min-h-[44px]",
                    activeFunction === func.id
                      ? "bg-cinnabar/10 border border-cinnabar/20 shadow-sm"
                      : "hover:bg-secondary border border-transparent"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                      activeFunction === func.id
                        ? "bg-cinnabar text-white"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {func.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "font-medium",
                        activeFunction === func.id && "text-cinnabar"
                      )}
                    >
                      {func.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {func.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 bg-card rounded-lg border shadow-card p-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">使用提示</p>
                <p>• 修炼问答支持自然语言对话</p>
                <p>• 阶段评估需要回答15个问题</p>
                <p>• 功法推荐基于您的实际情况</p>
                <p>• 偏差诊断仅供参考，严重情况请就医</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <div className="h-full bg-card rounded-lg border shadow-card overflow-hidden">
              <div className="h-full overflow-y-auto p-3 sm:p-4 md:p-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
