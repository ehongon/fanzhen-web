"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Clock,
  Target,
  Heart,
  Layers,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

interface Condition {
  id: string;
  label: string;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
}

const CONDITIONS: Condition[] = [
  {
    id: "stage",
    label: "当前阶段",
    icon: <Layers className="w-5 h-5" />,
    options: [
      { value: "beginner", label: "初学入门" },
      { value: "foundation", label: "炼精化气初期" },
      { value: "intermediate", label: "炼精化气中期" },
      { value: "advanced", label: "炼气化神" },
    ],
  },
  {
    id: "time",
    label: "可用时间",
    icon: <Clock className="w-5 h-5" />,
    options: [
      { value: "15min", label: "15分钟以内" },
      { value: "30min", label: "30分钟左右" },
      { value: "1hour", label: "1小时左右" },
      { value: "2hours", label: "2小时以上" },
    ],
  },
  {
    id: "body",
    label: "身体状况",
    icon: <Heart className="w-5 h-5" />,
    options: [
      { value: "weak", label: "体质较弱" },
      { value: "normal", label: "体质一般" },
      { value: "strong", label: "体质较好" },
      { value: "excellent", label: "体质优秀" },
    ],
  },
  {
    id: "goal",
    label: "修炼目标",
    icon: <Target className="w-5 h-5" />,
    options: [
      { value: "health", label: "强身健体" },
      { value: "energy", label: "培养气感" },
      { value: "mind", label: "静心养性" },
      { value: "advance", label: "境界提升" },
    ],
  },
];

interface GongfaResult {
  id: string;
  name: string;
  category: string;
  duration: string;
  difficulty: string;
  description: string;
  reason: string;
  steps: string[];
}

const GONGFA_DATABASE: Record<string, GongfaResult[]> = {
  beginner_15min_weak_health: [
    {
      id: "1",
      name: "凡真基础桩功",
      category: "站桩",
      duration: "10-15分钟",
      difficulty: "入门",
      description:
        "双脚平行站立，膝盖微屈，双手抱球于腹前，保持自然呼吸。",
      reason:
        "体质较弱且时间有限，基础桩功可以温和地培养气感，增强体质。",
      steps: [
        "双脚平行，与肩同宽",
        "膝盖微屈，重心下沉",
        "双手抱球，置于腹前",
        "头正颈直，目视前方",
        "自然呼吸，意守丹田",
      ],
    },
    {
      id: "2",
      name: "放松导引术",
      category: "导引",
      duration: "10分钟",
      difficulty: "入门",
      description: "通过缓慢的肢体伸展配合呼吸，达到身心放松的效果。",
      reason: "适合初学者，动作简单，能有效缓解身体紧张。",
      steps: [
        "站立调息，放松全身",
        "缓慢抬臂，配合吸气",
        "轻轻下按，配合呼气",
        "左右转体，活动腰脊",
        "收式静立，感受身体",
      ],
    },
  ],
  beginner_30min_normal_health: [
    {
      id: "3",
      name: "凡真三体式",
      category: "桩功",
      duration: "20-30分钟",
      difficulty: "初级",
      description:
        "在传统桩功基础上加入意念导引，帮助气机更好地运行。",
      reason:
        "时间充裕，可以尝试稍复杂的桩功，有助于建立更好的气感。",
      steps: [
        "调整姿势，进入站桩状态",
        "意想头顶百会向上虚顶",
        "感受脚底涌泉穴与大地相连",
        "意念引导气流沿督脉上行",
        "保持姿势，静观内景",
      ],
    },
  ],
  foundation_1hour_strong_energy: [
    {
      id: "4",
      name: "小周天运行法",
      category: "内丹",
      duration: "45-60分钟",
      difficulty: "中级",
      description:
        "通过意念和呼吸的配合，引导气流沿任督二脉循环运行。",
      reason:
        "已进入炼精化气阶段，体质较好，可以尝试小周天运行。",
      steps: [
        "静坐调息，进入状态",
        "意守丹田，培养气团",
        "吸气时意想气沿督脉上行",
        "呼气时意想气沿任脉下降",
        "循环往复，勿忘勿助",
      ],
    },
  ],
};

function getRecommendations(selections: Record<string, string>): GongfaResult[] {
  const key = `${selections.stage}_${selections.time}_${selections.body}_${selections.goal}`;
  return (
    GONGFA_DATABASE[key] || [
      {
        id: "default1",
        name: "凡真基础桩功",
        category: "站桩",
        duration: "15-30分钟",
        difficulty: "入门",
        description:
          "双脚平行站立，膝盖微屈，双手抱球于腹前，保持自然呼吸。适合各阶段修炼者。",
        reason:
          "根据您的条件，建议从基础桩功开始，循序渐进地提升修炼水平。",
        steps: [
          "双脚平行，与肩同宽",
          "膝盖微屈，重心下沉",
          "双手抱球，置于腹前",
          "头正颈直，目视前方",
          "自然呼吸，意守丹田",
        ],
      },
      {
        id: "default2",
        name: "静坐调息法",
        category: "静坐",
        duration: "20分钟",
        difficulty: "入门",
        description:
          "采用七支坐法，通过观察呼吸来培养专注力和觉知力。",
        reason:
          "静坐是各阶段修炼的基础，有助于静心养性，培养定力。",
        steps: [
          "选择安静环境，铺垫而坐",
          "采用七支坐法，调整姿势",
          "轻轻闭上眼睛，放松全身",
          "观察呼吸，不刻意控制",
          "念头来时，知而不随",
        ],
      },
    ]
  );
}

export function GongfaRecommendation() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<GongfaResult[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentConditionIndex = Object.keys(selections).length;
  const currentCondition = CONDITIONS[currentConditionIndex];
  const isComplete = currentConditionIndex >= CONDITIONS.length;

  const handleSelect = (value: string) => {
    if (!currentCondition) return;
    const newSelections = { ...selections, [currentCondition.id]: value };
    setSelections(newSelections);

    if (currentConditionIndex === CONDITIONS.length - 1) {
      const recs = getRecommendations(newSelections);
      setResults(recs);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setSelections({});
    setShowResult(false);
    setResults([]);
    setExpandedId(null);
  };

  if (showResult) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">推荐功法</h3>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            重新选择
          </Button>
        </div>

        <div className="space-y-4">
          {results.map((gongfa, index) => (
            <Card
              key={gongfa.id}
              className={cn(
                "border-cinnabar/10 transition-all cursor-pointer",
                expandedId === gongfa.id && "border-cinnabar/30 shadow-card-hover"
              )}
              onClick={() =>
                setExpandedId(expandedId === gongfa.id ? null : gongfa.id)
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cinnabar/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-cinnabar font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{gongfa.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{gongfa.category}</span>
                        <span>·</span>
                        <span>{gongfa.duration}</span>
                        <span>·</span>
                        <span>{gongfa.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform",
                      expandedId === gongfa.id && "rotate-90"
                    )}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {gongfa.description}
                </p>

                {expandedId === gongfa.id && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-cinnabar/5 rounded-lg p-3">
                      <div className="text-sm font-medium text-cinnabar mb-1">
                        推荐理由
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {gongfa.reason}
                      </p>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">练习步骤</div>
                      <ul className="space-y-2">
                        {gongfa.steps.map((step, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cinnabar flex-shrink-0 mt-0.5" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            步骤 {Math.min(currentConditionIndex + 1, CONDITIONS.length)} /{" "}
            {CONDITIONS.length}
          </span>
          <span className="text-muted-foreground">
            {isComplete ? "完成" : currentCondition?.label}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-cinnabar h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(currentConditionIndex / CONDITIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {currentCondition && (
        <Card className="border-cinnabar/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              {currentCondition.icon}
              <CardTitle className="text-lg">{currentCondition.label}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {currentCondition.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "p-4 rounded-lg border text-center transition-all hover:scale-105",
                    selections[currentCondition.id] === option.value
                      ? "bg-cinnabar text-white border-cinnabar"
                      : "bg-background hover:bg-secondary border-border"
                  )}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(selections).length > 0 && (
        <Button variant="ghost" onClick={handleReset} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          重新开始
        </Button>
      )}
    </div>
  );
}
