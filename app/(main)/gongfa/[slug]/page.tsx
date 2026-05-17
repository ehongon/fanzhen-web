import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Clock,
  BookOpen,
  Footprints,
  Wind,
  Brain,
  AlertTriangle,
  XCircle,
  CheckCircle,
  TrendingUp,
  Layers,
  ChevronRight,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BreathingIndicator } from "@/components/gongfa/breathing-indicator";
import { PoseDiagram } from "@/components/gongfa/gongfa-pose-diagram";
import VideoGallery from "@/components/gongfa/video-gallery";
import {
  getGongfaBySlug,
  gongfaList,
  SCHOOL_COLORS,
  STAGE_COLORS,
  DIFFICULTY_LABELS,
} from "@/lib/gongfa-data";

interface GongfaDetailPageProps {
  params: {
    slug: string;
  };
}

export default function GongfaDetailPage({ params }: GongfaDetailPageProps) {
  const gongfa = getGongfaBySlug(params.slug);

  if (!gongfa) {
    notFound();
  }

  // 获取相关功法
  const relatedGongfa = gongfaList.filter(
    (g) =>
      gongfa.relatedGongfa?.includes(g.name) && g.slug !== gongfa.slug
  );

  return (
    <div className="min-h-screen">
      {/* 返回按钮 */}
      <div className="container mx-auto px-4 pt-6">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/gongfa">
            <ArrowLeft className="w-4 h-4" />
            返回功法列表
          </Link>
        </Button>
      </div>

      {/* 功法标题区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {gongfa.schools.map((school) => (
              <Badge
                key={school}
                variant="outline"
                className={`text-sm ${SCHOOL_COLORS[school]}`}
              >
                {school}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className={`text-sm ${STAGE_COLORS[gongfa.stage]}`}
            >
              {gongfa.stage}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {gongfa.type}
            </Badge>
          </div>

          {/* 标题 */}
          <h1 className="text-4xl md:text-5xl font-bold font-serif-cn mb-6">
            {gongfa.name}
          </h1>

          {/* 基本信息 */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>难度：</span>
              <span className="text-foreground font-medium">
                {gongfa.difficulty}星 ({DIFFICULTY_LABELS[gongfa.difficulty]})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>耗时：</span>
              <span className="text-foreground font-medium">
                {gongfa.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>类型：</span>
              <span className="text-foreground font-medium">
                {gongfa.type}
              </span>
            </div>
          </div>

          {/* 功效标签 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {gongfa.effects.map((effect) => (
              <span
                key={effect}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary font-medium"
              >
                {effect}
              </span>
            ))}
          </div>

          {/* 功法姿势示意图 */}
          <div className="mb-8">
            <PoseDiagram
              poseType={
                gongfa.type === "动功"
                  ? "movement"
                  : gongfa.type === "心法"
                  ? "meditation"
                  : gongfa.type === "桩功"
                  ? "standing"
                  : gongfa.type === "静功"
                  ? "sitting"
                  : "breathing"
              }
              highlight={
                gongfa.id === "hunyuan-lizhuang"
                  ? ["feet", "legs", "torso", "spine", "shoulders", "head"]
                  : gongfa.id === "yongquan-guiyuan"
                  ? ["feet", "legs", "dantian"]
                  : gongfa.id === "miman-shihai"
                  ? ["head", "spine"]
                  : gongfa.id === "an-breath"
                  ? ["head", "torso"]
                  : gongfa.id === "zhi-guan"
                  ? ["head", "spine", "dantian"]
                  : gongfa.id === "baduanjin"
                  ? ["arms", "torso", "legs"]
                  : gongfa.id === "yijinjing"
                  ? ["arms", "torso", "legs"]
                  : gongfa.id === "taijiquan"
                  ? ["arms", "torso", "legs", "feet"]
                  : gongfa.id === "xing-yi-quan"
                  ? ["arms", "torso", "legs"]
                  : gongfa.id === "surya-namaskar"
                  ? ["arms", "torso", "legs"]
                  : ["torso", "spine"]
              }
            />
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 功法简介 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-5 h-5 text-primary" />
                  功法简介
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {gongfa.description}
                </p>
              </CardContent>
            </Card>

            {/* 操作指南 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Footprints className="w-5 h-5 text-primary" />
                  操作指南
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {gongfa.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed pt-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* 呼吸配合 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Wind className="w-5 h-5 text-primary" />
                  呼吸配合
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {gongfa.breathing}
                </p>
                <BreathingIndicator />
              </CardContent>
            </Card>

            {/* 意念要点 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Brain className="w-5 h-5 text-primary" />
                  意念要点
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {gongfa.mindFocus}
                </p>
              </CardContent>
            </Card>

            {/* 注意事项 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  注意事项
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {gongfa.precautions?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold mt-0.5">
                        !
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 常见错误 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <XCircle className="w-5 h-5 text-destructive" />
                  常见错误
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gongfa.commonMistakes?.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-destructive mb-1">
                            错误做法
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.wrong}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-emerald-600 mb-1">
                            正确做法
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.correct}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 进阶路径 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  进阶路径
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {gongfa.advancedPath?.map((path, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        {index < (gongfa.advancedPath?.length ?? 0) - 1 && (
                          <div className="hidden md:block h-8 w-px bg-border" />
                        )}
                      </div>
                      <span className="text-muted-foreground font-medium">
                        {path}
                      </span>
                      {index < (gongfa.advancedPath?.length ?? 0) - 1 && (
                        <ChevronRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 修炼视频 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Video className="w-5 h-5 text-primary" />
                  修炼视频
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VideoGallery videos={gongfa.videos || []} />
              </CardContent>
            </Card>
          </div>

          {/* 右侧边栏 */}
          <div className="space-y-6">
            {/* 快速信息 */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">功法概要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">所属流派</span>
                  <span className="font-medium">{gongfa.schools.join(" / ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">修炼阶段</span>
                  <span className="font-medium">{gongfa.stage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">功法类型</span>
                  <span className="font-medium">{gongfa.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">难度等级</span>
                  <span className="font-medium flex items-center gap-1">
                    {gongfa.difficulty}星
                    <span className="text-xs text-muted-foreground">
                      ({DIFFICULTY_LABELS[gongfa.difficulty]})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">预估耗时</span>
                  <span className="font-medium">{gongfa.duration}</span>
                </div>
                <div className="pt-2 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">主要功效</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {gongfa.effects.map((effect) => (
                      <span
                        key={effect}
                        className="px-2 py-1 rounded text-xs bg-primary/10 text-primary"
                      >
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 相关功法推荐 */}
            {relatedGongfa.length > 0 && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Layers className="w-4 h-4 text-primary" />
                    相关功法推荐
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedGongfa.map((related) => (
                    <Link
                      key={related.id}
                      href={`/gongfa/${related.slug}`}
                      className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">
                            {related.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {related.stage} · {related.type}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
