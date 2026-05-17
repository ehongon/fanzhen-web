"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Activity,
  Brain,
  Users,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  category: "body" | "mind" | "life";
}

interface Answer {
  questionId: string;
  score: number;
}

const QUESTIONS: Question[] = [
  // 身体层面
  { id: "b1", text: "您能感受到体内气的流动吗？", category: "body" },
  { id: "b2", text: "修炼后身体是否感到轻松舒适？", category: "body" },
  { id: "b3", text: "睡眠质量是否有所改善？", category: "body" },
  { id: "b4", text: "日常精力是否充沛？", category: "body" },
  { id: "b5", text: "身体柔韧性和协调性如何？", category: "body" },
  // 心理层面
  { id: "m1", text: "情绪是否趋于稳定平和？", category: "mind" },
  { id: "m2", text: "专注力是否有所提升？", category: "mind" },
  { id: "m3", text: "能否觉察到自己的念头起伏？", category: "mind" },
  { id: "m4", text: "面对压力时是否更加从容？", category: "mind" },
  { id: "m5", text: "内心是否常有宁静感？", category: "mind" },
  // 生活层面
  { id: "l1", text: "日常生活是否更有规律？", category: "life" },
  { id: "l2", text: "人际关系是否更加和谐？", category: "life" },
  { id: "l3", text: "对事物的洞察力是否增强？", category: "life" },
  { id: "l4", text: "是否有持续修炼的习惯？", category: "life" },
  { id: "l5", text: "对修行道路是否更加明确？", category: "life" },
];

const SCORE_OPTIONS = [
  { value: 1, label: "很少" },
  { value: 2, label: "偶尔" },
  { value: 3, label: "有时" },
  { value: 4, label: "经常" },
  { value: 5, label: "总是" },
];

const CATEGORIES = {
  body: { label: "身体层面", icon: Activity, color: "text-emerald-600" },
  mind: { label: "心理层面", icon: Brain, color: "text-blue-600" },
  life: { label: "生活层面", icon: Users, color: "text-amber-600" },
};

interface AssessmentResult {
  stage: string;
  stageDesc: string;
  totalScore: number;
  maxScore: number;
  categoryScores: Record<string, { score: number; max: number }>;
  suggestions: string[];
}

function calculateResult(answers: Answer[]): AssessmentResult {
  const categoryScores: Record<string, { score: number; max: number }> = {
    body: { score: 0, max: 0 },
    mind: { score: 0, max: 0 },
    life: { score: 0, max: 0 },
  };

  answers.forEach((answer) => {
    const question = QUESTIONS.find((q) => q.id === answer.questionId);
    if (question) {
      categoryScores[question.category].score += answer.score;
      categoryScores[question.category].max += 5;
    }
  });

  const totalScore = Object.values(categoryScores).reduce(
    (sum, cat) => sum + cat.score,
    0
  );
  const maxScore = Object.values(categoryScores).reduce(
    (sum, cat) => sum + cat.max,
    0
  );

  let stage: string;
  let stageDesc: string;
  let suggestions: string[];

  const percentage = (totalScore / maxScore) * 100;

  if (percentage < 30) {
    stage = "初识门径";
    stageDesc =
      "您正处于修炼的起步阶段。建议从基础功法开始，培养每日修炼的习惯，注重身体放松和呼吸调节。";
    suggestions = [
      "每日坚持站桩或打坐15-30分钟",
      "学习基础呼吸法，培养气感",
      "阅读《凡真入门指南》了解修炼基础",
      "保持规律作息，早睡早起",
    ];
  } else if (percentage < 50) {
    stage = "炼精化气初期";
    stageDesc =
      "您已开始感受到修炼的效果，气感初步形成。建议继续巩固基础，逐步增加修炼时间和深度。";
    suggestions = [
      "增加站桩时间，尝试动功练习",
      "注重丹田培养，配合导引术",
      "学习《炼精化气功法集》",
      "注意饮食调理，清淡为主",
    ];
  } else if (percentage < 70) {
    stage = "炼精化气中期";
    stageDesc =
      "您的修炼已有一定基础，气感明显，身心状态良好。可以开始尝试更深入的功法练习。";
    suggestions = [
      "尝试小周天运行练习",
      "加强心性修养，培养定力",
      "学习《内丹修炼要诀》",
      "适当进行辟谷或轻食练习",
    ];
  } else if (percentage < 85) {
    stage = "炼气化神初期";
    stageDesc =
      "您已进入较高阶段，气息绵长，意识清明。建议注重神意修炼，提升觉知能力。";
    suggestions = [
      "练习凝神入气穴",
      "培养日常觉知，行住坐卧皆修行",
      "研读《炼气化神心法》",
      "减少外界干扰，多独处静修",
    ];
  } else {
    stage = "炼气化神中期";
    stageDesc =
      "您的修炼境界已相当深厚，身心合一，觉知敏锐。建议继续深化，为更高阶段做准备。";
    suggestions = [
      "深入大周天修炼",
      "培养慈悲心与智慧",
      "研读《凡真高级心法》",
      "可考虑闭关专修",
    ];
  }

  return { stage, stageDesc, totalScore, maxScore, categoryScores, suggestions };
}

export function StageAssessment() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const currentQ = QUESTIONS[currentQuestion];
  const currentAnswer = answers.find((a) => a.questionId === currentQ?.id);

  const handleAnswer = (score: number) => {
    const newAnswers = answers.filter((a) => a.questionId !== currentQ.id);
    newAnswers.push({ questionId: currentQ.id, score });
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const res = calculateResult(newAnswers);
      setResult(res);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  if (showResult && result) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="border-cinnabar/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-cinnabar/10 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-cinnabar" />
            </div>
            <CardTitle className="text-2xl">评估结果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cinnabar mb-2">
                {result.stage}
              </div>
              <p className="text-muted-foreground">{result.stageDesc}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>总分</span>
                <span className="font-semibold">
                  {result.totalScore} / {result.maxScore}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-cinnabar h-2.5 rounded-full transition-all"
                  style={{
                    width: `${(result.totalScore / result.maxScore) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {Object.entries(result.categoryScores).map(([key, data]) => {
                const cat = CATEGORIES[key as keyof typeof CATEGORIES];
                const Icon = cat.icon;
                return (
                  <Card key={key} className="border-0 bg-secondary/50">
                    <CardContent className="p-4 text-center">
                      <Icon className={cn("w-6 h-6 mx-auto mb-2", cat.color)} />
                      <div className="text-sm font-medium">{cat.label}</div>
                      <div className="text-lg font-bold mt-1">
                        {data.score}/{data.max}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">个性化建议</h4>
              <ul className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <ChevronRight className="w-4 h-4 text-cinnabar flex-shrink-0 mt-0.5" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              重新评估
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            问题 {currentQuestion + 1} / {QUESTIONS.length}
          </span>
          <span className="text-muted-foreground">
            {CATEGORIES[currentQ.category].label}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-cinnabar h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="border-cinnabar/10">
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {currentQ.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {SCORE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={cn(
                  "p-3 rounded-lg border text-center transition-all hover:scale-105",
                  currentAnswer?.score === option.value
                    ? "bg-cinnabar text-white border-cinnabar"
                    : "bg-background hover:bg-secondary border-border"
                )}
              >
                <div className="text-lg font-bold">{option.value}</div>
                <div className="text-xs mt-1">{option.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          上一题
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          重新开始
        </Button>
      </div>
    </div>
  );
}
