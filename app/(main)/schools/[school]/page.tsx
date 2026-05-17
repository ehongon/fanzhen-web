import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSchoolById, getAllSchools } from "@/lib/schools-data";
import SchoolTimeline from "@/components/schools/school-timeline";
import SchoolClassics from "@/components/schools/school-classics";
import SchoolMethods from "@/components/schools/school-methods";
import SchoolMapping from "@/components/schools/school-mapping";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Dumbbell,
  Layers,
  Lightbulb,
  Footprints,
  Sparkles,
} from "lucide-react";

interface SchoolPageProps {
  params: {
    school: string;
  };
}

export async function generateStaticParams() {
  const schools = getAllSchools();
  return schools.map((school) => ({
    school: school.id,
  }));
}

export async function generateMetadata({ params }: SchoolPageProps): Promise<Metadata> {
  const school = getSchoolById(params.school);
  if (!school) {
    return {
      title: "未找到 - 凡真",
    };
  }
  return {
    title: `${school.name}家修炼体系 - 凡真`,
    description: school.overview.slice(0, 100),
  };
}

export default function SchoolPage({ params }: SchoolPageProps) {
  const school = getSchoolById(params.school);

  if (!school) {
    notFound();
  }

  const color = school.color;

  return (
    <div className="min-h-screen bg-rice-paper">
      {/* Hero区域 */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${school.colorDark} 0%, ${color} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4">
          <Link href="/schools">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回各派总览
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold text-white backdrop-blur-sm">
              {school.name[0]}
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
                {school.name}家
              </h1>
              <p className="mt-1 text-lg text-white/80">{school.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 概述 */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}12` }}
            >
              <Sparkles className="h-5 w-5" style={{ color }} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              学派概述
            </h2>
          </div>
          <div className="rounded-xl border bg-white/80 p-6 shadow-sm">
            <p className="leading-relaxed text-charcoal/80">
              {school.overview}
            </p>
          </div>
        </div>
      </section>

      {/* 历史脉络 */}
      <section className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${color}12` }}
              >
                <Footprints className="h-5 w-5" style={{ color }} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                历史脉络
              </h2>
            </div>
            <SchoolTimeline history={school.history} color={color} />
          </div>
        </div>
      </section>

      {/* 核心经典 */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}12` }}
            >
              <BookOpen className="h-5 w-5" style={{ color }} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              核心经典
            </h2>
          </div>
          <SchoolClassics classics={school.classics} color={color} />
        </div>
      </section>

      {/* 主要功法 */}
      <section className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${color}12` }}
              >
                <Dumbbell className="h-5 w-5" style={{ color }} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                主要功法
              </h2>
            </div>
            <SchoolMethods methods={school.methods} color={color} />
          </div>
        </div>
      </section>

      {/* 修炼层次 */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}12` }}
            >
              <Layers className="h-5 w-5" style={{ color }} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              修炼层次与凡真对应
            </h2>
          </div>
          <SchoolMapping levels={school.levels} color={color} />
        </div>
      </section>

      {/* 核心概念 */}
      <section className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${color}12` }}
              >
                <Lightbulb className="h-5 w-5" style={{ color }} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                核心概念
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {school.concepts.map((concept, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-white/80 p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h4
                    className="mb-2 font-serif text-base font-bold"
                    style={{ color }}
                  >
                    {concept.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {concept.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 入门建议 */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}12` }}
            >
              <Sparkles className="h-5 w-5" style={{ color }} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              入门建议
            </h2>
          </div>
          <div className="rounded-xl border bg-white/80 p-6 shadow-sm">
            <div className="space-y-3">
              {school.entryAdvice.map((advice, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal/80">
                    {advice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 与凡真对应总结 */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
                border: `1px solid ${color}20`,
              }}
            >
              <h3 className="mb-3 font-serif text-xl font-bold" style={{ color }}>
                与凡真修炼体系的对应
              </h3>
              <p className="leading-relaxed text-charcoal/80">
                {school.fanzhenSummary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <section className="border-t bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <Link href="/schools">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回各派总览
              </Button>
            </Link>
            <Link href="/schools/compare">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                查看各派对比
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
