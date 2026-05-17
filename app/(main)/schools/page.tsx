import { Metadata } from "next";
import Link from "next/link";
import { getAllSchools } from "@/lib/schools-data";
import SchoolCard from "@/components/schools/school-card";
import { Button } from "@/components/ui/button";
import { Scale, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "各派修炼体系 - 凡真",
  description:
    "儒释道医武艺，各家之长。了解道家、佛家、儒家、中医、武学、瑜伽等各派修炼体系的完整资料。",
};

export default function SchoolsPage() {
  const schools = getAllSchools();

  return (
    <div className="min-h-screen bg-rice-paper">
      {/* Hero区域 */}
      <section className="relative overflow-hidden bg-ink-gradient py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cinnabar/20 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-rice md:text-5xl lg:text-6xl">
            各派修炼体系
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-lg text-rice/70 md:text-xl">
            儒释道医武艺，各家之长，殊途同归
          </p>
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gold/60" />

          {/* 快捷操作 */}
          <div className="mx-auto flex max-w-md flex-wrap justify-center gap-4">
            <Link href="/schools/compare">
              <Button
                variant="outline"
                className="border-rice/30 bg-rice/10 text-rice hover:bg-rice/20 hover:text-gold"
              >
                <Scale className="mr-2 h-4 w-4" />
                各派对比
              </Button>
            </Link>
            <Link href="/system">
              <Button
                variant="outline"
                className="border-rice/30 bg-rice/10 text-rice hover:bg-rice/20 hover:text-gold"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                凡真体系
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 学派卡片 */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-charcoal">
            七大学派
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            点击卡片查看各派详细资料，包括历史脉络、核心经典、修炼方法和层次体系
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cinnabar/60" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school, index) => (
            <SchoolCard key={school.id} school={school} index={index} />
          ))}
        </div>
      </section>

      {/* 底部提示 */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-muted-foreground">
            各派修炼体系虽然方法不同，但目标相通，都是追求身心健康和意识提升
          </p>
          <p className="text-sm text-muted-foreground">
            建议在专业导师指导下进行修炼，以确保安全有效
          </p>
        </div>
      </section>
    </div>
  );
}
