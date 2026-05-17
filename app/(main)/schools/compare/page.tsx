import { Metadata } from "next";
import Link from "next/link";
import CompareTable from "@/components/schools/compare-table";
import FusionGuide from "@/components/schools/fusion-guide";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GitMerge } from "lucide-react";

export const metadata: Metadata = {
  title: "各派对比 - 凡真",
  description:
    "对比道家、佛家、儒家、中医、武学、瑜伽等各派修炼体系的核心目标、方法、经典和层次。",
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-rice-paper">
      {/* Hero区域 */}
      <section className="relative overflow-hidden bg-ink-gradient py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cinnabar/20 blur-3xl" />
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

          <h1 className="mb-4 font-serif text-4xl font-bold text-rice md:text-5xl">
            各派对比
          </h1>
          <p className="max-w-3xl text-lg text-rice/70 md:text-xl">
            儒释道医武艺，各家之长，殊途同归
          </p>
        </div>
      </section>

      {/* 对比表格 */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 font-serif text-3xl font-bold text-charcoal">
              七大学派对比
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              从不同维度对比各派修炼体系，帮助您了解各家之长的异同
            </p>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cinnabar/60" />
          </div>

          <CompareTable />
        </div>
      </section>

      {/* 融合建议 */}
      <section className="border-t bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <GitMerge className="h-6 w-6 text-gold" />
                <h2 className="font-serif text-3xl font-bold text-charcoal">
                  融合修炼建议
                </h2>
              </div>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                凡真体系融合各家之长，以下是推荐的融合修炼方案
              </p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gold/60" />
            </div>

            <FusionGuide />
          </div>
        </div>
      </section>

      {/* 底部提示 */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-muted-foreground">
            各派修炼体系虽然方法不同，但目标相通，都是追求身心健康和意识提升
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/schools">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回各派总览
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
