import { notFound } from "next/navigation";
import { AlertTriangle, BookOpen, ScrollText, Languages } from "lucide-react";
import {
  getDianjiBySlug,
  getRelatedDianji,
  categories,
} from "@/lib/dianji-data";
import Reader from "@/components/dianji/reader";
import DianjiHeader from "@/components/dianji/dianji-header";
import RelatedDianji from "@/components/dianji/related-dianji";
import { Card, CardContent } from "@/components/ui/card";

interface DianjiDetailPageProps {
  params: {
    slug: string;
  };
}

function checkContentCompleteness(dianji: ReturnType<typeof getDianjiBySlug>) {
  if (!dianji) return { isComplete: false, issues: [] as string[] };

  const issues: string[] = [];
  let totalLines = 0;
  let annotatedLines = 0;
  let translatedLines = 0;

  dianji.chapters.forEach((chapter) => {
    totalLines += chapter.content?.length || 0;
    annotatedLines += Object.keys(chapter.annotations || {}).length;
    translatedLines += chapter.vernacular?.length || 0;
  });

  if (dianji.chapters.length === 0) {
    issues.push("暂无章节内容");
  } else if (totalLines < 10) {
    issues.push("内容较少，可能显示不全");
  }

  if (annotatedLines === 0) {
    issues.push("暂无注释");
  }

  if (translatedLines === 0) {
    issues.push("暂无白话翻译");
  }

  const isComplete = issues.length === 0;
  return { isComplete, issues, totalLines, annotatedLines, translatedLines };
}

export default function DianjiDetailPage({ params }: DianjiDetailPageProps) {
  const dianji = getDianjiBySlug(params.slug);

  if (!dianji) {
    notFound();
  }

  const relatedDianji = getRelatedDianji(dianji, 4);
  const category = categories.find((c) => c.code === dianji.categoryCode);
  const completeness = checkContentCompleteness(dianji);

  return (
    <div className="min-h-screen bg-background">
      <DianjiHeader dianji={dianji} category={category} />

      {/* 内容完整性提示 */}
      {!completeness.isComplete && (
        <div className="container mx-auto px-4 pt-4">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800 mb-2">
                    内容提示
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-amber-700">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {dianji.chapters.length} 章
                    </span>
                    <span className="flex items-center gap-1">
                      <ScrollText className="w-3.5 h-3.5" />
                      {completeness.totalLines} 段原文
                    </span>
                    <span className="flex items-center gap-1">
                      <ScrollText className="w-3.5 h-3.5" />
                      {completeness.annotatedLines} 条注释
                    </span>
                    <span className="flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5" />
                      {completeness.translatedLines} 段白话
                    </span>
                  </div>
                  {completeness.issues.length > 0 && (
                    <p className="text-xs text-amber-600 mt-2">
                      {completeness.issues.join("；")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Reader dianji={dianji} />
      {relatedDianji.length > 0 && (
        <RelatedDianji dianjiList={relatedDianji} currentId={dianji.id} />
      )}
    </div>
  );
}
