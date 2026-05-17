"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, RotateCcw, Sparkles, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateBazi, type BaziResult } from "@/lib/bazi-utils";
import {
  bodyQuestions,
  experienceQuestions,
  symptomQuestions,
  constitutionQuestions,
  timeQuestions,
  calculateAssessment,
  type AssessmentResult,
} from "@/lib/assessment-data";
import Link from "next/link";

type Step = "bazi" | "body" | "experience" | "symptom" | "constitution" | "time" | "result";

export default function AssessmentPage() {
  const [step, setStep] = useState<Step>("bazi");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [baziResult, setBaziResult] = useState<BaziResult | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleBaziSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const year = parseInt(formData.get("year") as string);
    const month = parseInt(formData.get("month") as string);
    const day = parseInt(formData.get("day") as string);
    const hour = parseInt(formData.get("hour") as string);

    if (year && month && day && hour !== undefined) {
      const result = calculateBazi(year, month, day, hour);
      setBaziResult(result);
      setStep("body");
    }
  };

  const handleNext = () => {
    const stepOrder: Step[] = ["bazi", "body", "experience", "symptom", "constitution", "time", "result"];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      const nextStep = stepOrder[currentIndex + 1];
      if (nextStep === "result") {
        const result = calculateAssessment(answers);
        setAssessmentResult(result);
      }
      setStep(nextStep);
    }
  };

  const handlePrev = () => {
    const stepOrder: Step[] = ["bazi", "body", "experience", "symptom", "constitution", "time", "result"];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleReset = () => {
    setStep("bazi");
    setAnswers({});
    setBaziResult(null);
    setAssessmentResult(null);
  };

  const isStepComplete = () => {
    switch (step) {
      case "body":
        return bodyQuestions.every((q) => answers[q.id] !== undefined);
      case "experience":
        return experienceQuestions.every((q) => answers[q.id] !== undefined);
      case "symptom":
        return symptomQuestions.every((q) => answers[q.id] !== undefined);
      case "constitution":
        return constitutionQuestions.every((q) => answers[q.id] !== undefined);
      case "time":
        return timeQuestions.every((q) => answers[q.id] !== undefined);
      default:
        return true;
    }
  };

  const renderBaziForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-ink mb-2">生辰八字</h2>
        <p className="text-ink/60">请输入您的出生信息，排出八字命盘</p>
      </div>

      <form onSubmit={handleBaziSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">出生年份</label>
            <input
              type="number"
              name="year"
              required
              min="1900"
              max="2100"
              placeholder="1990"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">出生月份</label>
            <input
              type="number"
              name="month"
              required
              min="1"
              max="12"
              placeholder="1"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">出生日期</label>
            <input
              type="number"
              name="day"
              required
              min="1"
              max="31"
              placeholder="1"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">出生时辰（24小时制）</label>
            <input
              type="number"
              name="hour"
              required
              min="0"
              max="23"
              placeholder="12"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3">
          排出八字
        </Button>
      </form>
    </motion.div>
  );

  const renderQuestions = (questions: typeof bodyQuestions) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {questions.map((q, index) => (
        <div key={q.id} className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-start gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
              {index + 1}
            </span>
            <h3 className="text-lg font-medium text-ink">{q.question}</h3>
          </div>
          <div className="space-y-2 ml-11">
            {q.type === "single" &&
              q.options.map((option) => (
                <label
                  key={String(option.value)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    answers[q.id] === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={String(option.value)}
                    checked={answers[q.id] === option.value}
                    onChange={() => handleAnswer(q.id, option.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-ink">{option.label}</span>
                </label>
              ))}
            {q.type === "multiple" &&
              q.options.map((option) => {
                const currentValues = (answers[q.id] as string[]) || [];
                const isSelected = currentValues.includes(String(option.value));
                return (
                  <label
                    key={String(option.value)}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={String(option.value)}
                      checked={isSelected}
                      onChange={(e) => {
                        const values = [...currentValues];
                        if (e.target.checked) {
                          values.push(String(option.value));
                        } else {
                          const idx = values.indexOf(String(option.value));
                          if (idx > -1) values.splice(idx, 1);
                        }
                        handleAnswer(q.id, values);
                      }}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-ink">{option.label}</span>
                  </label>
                );
              })}
          </div>
        </div>
      ))}
    </motion.div>
  );

  const renderResult = () => {
    if (!baziResult || !assessmentResult) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* 八字命盘 */}
        <div className="bg-card rounded-xl p-8 border border-border">
          <div className="text-center mb-6">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-ink">您的修炼命盘</h2>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: "年柱", value: baziResult.yearPillar },
              { label: "月柱", value: baziResult.monthPillar },
              { label: "日柱", value: baziResult.dayPillar },
              { label: "时柱", value: baziResult.hourPillar },
            ].map((pillar) => (
              <div key={pillar.label} className="text-center p-4 bg-background rounded-lg border border-border">
                <div className="text-sm text-ink/60 mb-1">{pillar.label}</div>
                <div className="text-2xl font-bold text-ink">{pillar.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-ink mb-3">五行分析</h3>
              <div className="space-y-2">
                {Object.entries(baziResult.fiveElements).map(([element, value]) => (
                  <div key={element} className="flex items-center gap-3">
                    <span className="w-8 text-ink font-medium">{element}</span>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(value / 5) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            element === "木"
                              ? "#4ade80"
                              : element === "火"
                              ? "#f87171"
                              : element === "土"
                              ? "#fbbf24"
                              : element === "金"
                              ? "#e5e7eb"
                              : "#60a5fa",
                        }}
                      />
                    </div>
                    <span className="text-sm text-ink/60 w-12 text-right">{value.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-ink mb-2">日主与身强身弱</h3>
                <p className="text-ink/80">
                  日主：<span className="font-bold text-primary">{baziResult.dayMaster}</span>（
                  {baziResult.dayMasterElement}）
                </p>
                <p className="text-ink/80">
                  身强身弱：<span className="font-bold text-primary">{baziResult.strength}</span>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-ink mb-2">喜用神</h3>
                <div className="flex gap-2">
                  {baziResult.favorableElements.map((el) => (
                    <span key={el} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 修炼评估 */}
        <div className="bg-card rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">修炼评估结果</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="text-sm text-ink/60 mb-2">当前阶段</div>
              <div className="text-3xl font-bold text-primary">{assessmentResult.stageName}</div>
              <div className="text-sm text-ink/60 mt-1">第 {assessmentResult.level} 级</div>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="text-sm text-ink/60 mb-2">体质类型</div>
              <div className="text-3xl font-bold text-primary">{assessmentResult.constitution}</div>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="text-sm text-ink/60 mb-2">每日修炼</div>
              <div className="text-lg font-bold text-primary">{assessmentResult.dailyPractice}</div>
            </div>
          </div>

          {/* 推荐功法 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-ink mb-3">推荐功法</h3>
            <div className="flex flex-wrap gap-2">
              {assessmentResult.recommendedGongfa.map((gongfa) => (
                <Link
                  key={gongfa}
                  href={`/gongfa`}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  {gongfa}
                </Link>
              ))}
            </div>
          </div>

          {/* 警告 */}
          {assessmentResult.warnings.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">注意事项</h3>
              <ul className="space-y-1">
                {assessmentResult.warnings.map((warning, index) => (
                  <li key={index} className="text-yellow-700 text-sm">
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 性格与体质 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-background rounded-lg border border-border">
              <h3 className="text-lg font-medium text-ink mb-2">性格特征</h3>
              <p className="text-ink/80">{baziResult.personality}</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border">
              <h3 className="text-lg font-medium text-ink mb-2">体质倾向</h3>
              <p className="text-ink/80">{baziResult.constitution}</p>
            </div>
          </div>

          {/* 修炼建议 */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="text-lg font-medium text-ink mb-2">修炼建议</h3>
            <p className="text-ink/80">{baziResult.cultivationAdvice}</p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center gap-4">
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            重新检测
          </Button>
          <Link href="/gongfa">
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              查看功法
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  };

  const stepTitles: Record<Step, { title: string; icon: React.ReactNode }> = {
    bazi: { title: "生辰八字", icon: <Calendar className="w-5 h-5" /> },
    body: { title: "身体基础", icon: <User className="w-5 h-5" /> },
    experience: { title: "修炼经历", icon: <Sparkles className="w-5 h-5" /> },
    symptom: { title: "阶段判定", icon: <Sparkles className="w-5 h-5" /> },
    constitution: { title: "体质检测", icon: <User className="w-5 h-5" /> },
    time: { title: "时间安排", icon: <Clock className="w-5 h-5" /> },
    result: { title: "检测结果", icon: <Sparkles className="w-5 h-5" /> },
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 步骤指示器 */}
        {step !== "result" && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {Object.entries(stepTitles)
                .filter(([key]) => key !== "result")
                .map(([key, { title, icon }], index) => {
                  const stepOrder = ["bazi", "body", "experience", "symptom", "constitution", "time"];
                  const currentIndex = stepOrder.indexOf(step);
                  const isActive = stepOrder.indexOf(key) === currentIndex;
                  const isCompleted = stepOrder.indexOf(key) < currentIndex;
                  return (
                    <div key={key} className="flex items-center">
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                          isActive
                            ? "bg-primary text-white"
                            : isCompleted
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-ink/40"
                        }`}
                      >
                        {icon}
                        <span className="hidden sm:inline">{title}</span>
                      </div>
                      {index < 4 && (
                        <ChevronRight className="w-4 h-4 text-ink/20 mx-1" />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 内容区域 */}
        <AnimatePresence mode="wait">
          {step === "bazi" && renderBaziForm()}
          {step === "body" && renderQuestions(bodyQuestions)}
          {step === "experience" && renderQuestions(experienceQuestions)}
          {step === "symptom" && renderQuestions(symptomQuestions)}
          {step === "constitution" && renderQuestions(constitutionQuestions)}
          {step === "time" && renderQuestions(timeQuestions)}
          {step === "result" && renderResult()}
        </AnimatePresence>

        {/* 导航按钮 */}
        {step !== "bazi" && step !== "result" && (
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev} variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              上一步
            </Button>
            <Button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
              disabled={!isStepComplete()}
            >
              {step === "time" ? "查看结果" : "下一步"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
