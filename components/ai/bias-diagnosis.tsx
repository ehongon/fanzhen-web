"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  Stethoscope,
  Wind,
  Flame,
  Droplets,
  Zap,
  Brain,
} from "lucide-react";

interface BiasType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  symptoms: string[];
}

const BIAS_TYPES: BiasType[] = [
  {
    id: "qi-stagnation",
    name: "气滞",
    icon: <Wind className="w-5 h-5" />,
    description: "气机运行不畅，阻滞于某处",
    symptoms: [
      "胸闷气短",
      "某部位胀痛",
      "情绪抑郁",
      "叹息频繁",
    ],
  },
  {
    id: "qi-rebellion",
    name: "气逆",
    icon: <Zap className="w-5 h-5" />,
    description: "气机上升太过或下降不及",
    symptoms: [
      "头晕目眩",
      "面红耳赤",
      "心悸不安",
      "呼吸急促",
    ],
  },
  {
    id: "fire-deviation",
    name: "火偏",
    icon: <Flame className="w-5 h-5" />,
    description: "体内阳气过盛，虚火上炎",
    symptoms: [
      "口干舌燥",
      "失眠多梦",
      "五心烦热",
      "面部潮红",
    ],
  },
  {
    id: "cold-deviation",
    name: "寒偏",
    icon: <Droplets className="w-5 h-5" />,
    description: "体内阴寒过盛，阳气不足",
    symptoms: [
      "四肢冰冷",
      "畏寒喜暖",
      "精神萎靡",
      "消化不良",
    ],
  },
  {
    id: "mind-scattered",
    name: "神散",
    icon: <Brain className="w-5 h-5" />,
    description: "精神不能内守，意识散乱",
    symptoms: [
      "注意力涣散",
      "杂念纷飞",
      "记忆力下降",
      "情绪不稳",
    ],
  },
];

interface DiagnosisResult {
  biasType: BiasType;
  severity: "轻度" | "中度" | "重度";
  analysis: string;
  adjustments: string[];
  warnings: string[];
}

function analyzeDiagnosis(
  description: string,
  selectedBiases: string[]
): DiagnosisResult {
  const selectedTypes = BIAS_TYPES.filter((b) => selectedBiases.includes(b.id));
  const primaryBias = selectedTypes[0] || BIAS_TYPES[0];

  let severity: "轻度" | "中度" | "重度" = "轻度";
  const descLen = description.length;
  const symptomCount = selectedBiases.length;

  if (descLen > 50 && symptomCount >= 3) {
    severity = "重度";
  } else if (descLen > 30 && symptomCount >= 2) {
    severity = "中度";
  }

  const analyses: Record<string, string> = {
    "qi-stagnation":
      "根据您的描述，气机在体内的运行出现了阻滞。这通常是由于情绪压抑、姿势不当或修炼方法有误导致的。气滞若不及时调理，可能影响后续修炼进展。",
    "qi-rebellion":
      "您的情况显示气机上升太过，这多因意念过重、急于求成或呼吸方法不当引起。气逆需要及时调整，否则可能导致头晕、失眠等症状加重。",
    "fire-deviation":
      "体内阳气偏盛，虚火上炎。这通常是因为意念过重、呼吸过深或修炼时间过长导致的。需要适当降火，平衡阴阳。",
    "cold-deviation":
      "体内阴寒偏盛，阳气不足。可能是因为修炼环境寒冷、体质偏寒或修炼方法不当。需要温阳散寒，增强体内阳气。",
    "mind-scattered":
      "精神状态不能内守，意识散乱。这是修炼中常见的问题，多因外界干扰过多或内心杂念未清。需要加强定力训练。",
  };

  const adjustments: Record<string, string[]> = {
    "qi-stagnation": [
      "调整呼吸，采用深长匀细的呼吸方式",
      "练习导引术，帮助气机流通",
      "保持情绪舒畅，避免抑郁恼怒",
      "适当按摩相关穴位，疏通经络",
      "减少修炼时间，以舒适为度",
    ],
    "qi-rebellion": [
      "放松意念，不可强求",
      "采用自然呼吸，勿深呼吸",
      "意守涌泉穴，引气下行",
      "暂停意念导引类功法",
      "多练习放松功，平复气机",
    ],
    "fire-deviation": [
      "减少修炼时间和强度",
      "意守清凉之处，如肾区或涌泉",
      "多饮水，饮食清淡",
      "避免辛辣燥热食物",
      "可练习涌泉归元法降火",
    ],
    "cold-deviation": [
      "注意保暖，选择温暖环境修炼",
      "意守丹田，培养阳气",
      "适当增加动功练习",
      "饮食可适当温补",
      "多晒太阳，吸收自然阳气",
    ],
    "mind-scattered": [
      "从数息法开始，培养专注力",
      "减少外界干扰，选择安静环境",
      "缩短单次修炼时间，提高质量",
      "练习觉知训练，觉察念头但不跟随",
      "保持规律作息，充足睡眠",
    ],
  };

  const warnings: Record<string, string[]> = {
    "qi-stagnation": [
      "若胀痛持续不缓解，建议暂停修炼并咨询导师",
      "避免强行导引，以免加重气滞",
    ],
    "qi-rebellion": [
      "出现严重头晕时应立即停止修炼",
      "避免倒立或头部向下的动作",
    ],
    "fire-deviation": [
      "严重上火时应暂停修炼2-3天",
      "如出现鼻衄、牙龈出血应立即就医",
    ],
    "cold-deviation": [
      "长期畏寒应检查是否有其他健康问题",
      "避免在寒冷潮湿环境修炼",
    ],
    "mind-scattered": [
      "如伴随严重焦虑或抑郁，建议寻求专业帮助",
      "不可使用强制压制念头的方法",
    ],
  };

  return {
    biasType: primaryBias,
    severity,
    analysis: analyses[primaryBias.id] || analyses["qi-stagnation"],
    adjustments: adjustments[primaryBias.id] || adjustments["qi-stagnation"],
    warnings: warnings[primaryBias.id] || warnings["qi-stagnation"],
  };
}

export function BiasDiagnosis() {
  const [description, setDescription] = useState("");
  const [selectedBiases, setSelectedBiases] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const toggleBias = (id: string) => {
    setSelectedBiases((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleDiagnose = () => {
    if (selectedBiases.length === 0 && !description.trim()) return;
    const res = analyzeDiagnosis(description, selectedBiases);
    setResult(res);
    setShowResult(true);
  };

  const handleReset = () => {
    setDescription("");
    setSelectedBiases([]);
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    const severityColor =
      result.severity === "轻度"
        ? "text-emerald-600"
        : result.severity === "中度"
        ? "text-amber-600"
        : "text-red-600";

    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="border-cinnabar/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-cinnabar/10 flex items-center justify-center mb-4">
              <Stethoscope className="w-8 h-8 text-cinnabar" />
            </div>
            <CardTitle className="text-2xl">诊断结果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-medium">偏差类型：</span>
                <span className="text-lg font-bold text-cinnabar">
                  {result.biasType.name}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-medium">严重程度：</span>
                <span className={cn("text-lg font-bold", severityColor)}>
                  {result.severity}
                </span>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">分析</div>
              <p className="text-sm text-muted-foreground">
                {result.analysis}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">调整建议</h4>
              <ul className="space-y-2">
                {result.adjustments.map((adjustment, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <ChevronRight className="w-4 h-4 text-cinnabar flex-shrink-0 mt-0.5" />
                    {adjustment}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  注意事项
                </span>
              </div>
              <ul className="space-y-1">
                {result.warnings.map((warning, index) => (
                  <li
                    key={index}
                    className="text-sm text-amber-700 dark:text-amber-300"
                  >
                    {warning}
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              重新诊断
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-cinnabar/10">
        <CardHeader>
          <CardTitle className="text-lg">症状描述</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="请详细描述您在修炼过程中遇到的不适症状..."
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      <Card className="border-cinnabar/10">
        <CardHeader>
          <CardTitle className="text-lg">常见偏差类型</CardTitle>
          <p className="text-sm text-muted-foreground">
            请选择您认为可能存在的偏差类型（可多选）
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {BIAS_TYPES.map((bias) => (
              <button
                key={bias.id}
                onClick={() => toggleBias(bias.id)}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg border text-left transition-all",
                  selectedBiases.includes(bias.id)
                    ? "bg-cinnabar/5 border-cinnabar/30"
                    : "bg-background hover:bg-secondary border-border"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    selectedBiases.includes(bias.id)
                      ? "bg-cinnabar/10 text-cinnabar"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {bias.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{bias.name}</span>
                    {selectedBiases.includes(bias.id) && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cinnabar text-white">
                        已选
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {bias.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {bias.symptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={handleDiagnose}
          disabled={selectedBiases.length === 0 && !description.trim()}
          className="flex-1"
        >
          <Stethoscope className="w-4 h-4 mr-2" />
          开始诊断
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
