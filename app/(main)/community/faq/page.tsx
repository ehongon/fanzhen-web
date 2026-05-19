"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
  Filter,
  ThumbsUp,
  Eye,
  Tag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  faqData,
  stages,
  levels,
  scenes,
  categories,
  getFAQStats,
  searchFAQ,
} from "@/lib/faq-data";
import Link from "next/link";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedScene, setSelectedScene] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const stats = useMemo(() => getFAQStats(), []);

  const filteredFAQs = useMemo(() => {
    return searchFAQ(searchQuery, {
      stage: selectedStage,
      level: selectedLevel,
      scene: selectedScene,
      category: selectedCategory,
    });
  }, [searchQuery, selectedStage, selectedLevel, selectedScene, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const stageColors: Record<string, string> = {
    "炼形化精": "bg-green-500/10 text-green-600 border-green-500/20",
    "炼精化气": "bg-blue-500/10 text-blue-600 border-blue-500/20",
    "炼气化神": "bg-purple-500/10 text-purple-600 border-purple-500/20",
    "炼神返虚": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  };

  const categoryColors: Record<string, string> = {
    "基础入门": "bg-primary/10 text-primary",
    "技术方法": "bg-blue-500/10 text-blue-600",
    "修炼体验": "bg-purple-500/10 text-purple-600",
    "问题排解": "bg-red-500/10 text-red-600",
    "理论疑惑": "bg-amber-500/10 text-amber-600",
    "生活融合": "bg-green-500/10 text-green-600",
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-ink mb-3">修炼常见问题</h1>
          <p className="text-ink/60 max-w-2xl mx-auto">
            按阶段、级别、场景整理的修炼FAQ，帮助您解决修炼路上的疑惑
          </p>
        </motion.div>

        {/* 统计栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "常见问题", value: stats.total, icon: BookOpen },
            { label: "总浏览量", value: stats.totalViews.toLocaleString(), icon: Eye },
            { label: "觉得有用", value: stats.totalHelpful.toLocaleString(), icon: ThumbsUp },
            { label: "覆盖阶段", value: "4个", icon: Tag },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-4 text-center"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-ink">{stat.value}</div>
              <div className="text-sm text-ink/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 搜索栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <Input
              type="text"
              placeholder="搜索问题、关键词或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-card border-border"
            />
          </div>
        </motion.div>

        {/* 筛选器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="mb-4 gap-2"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "收起筛选" : "展开筛选"}
          </Button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                  {/* 阶段筛选 */}
                  <div>
                    <label className="text-sm font-medium text-ink mb-3 block">
                      修炼阶段
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {stages.map((stage) => (
                        <button
                          key={stage.id}
                          onClick={() => setSelectedStage(stage.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedStage === stage.id
                              ? "bg-primary text-white"
                              : "bg-muted text-ink/70 hover:bg-muted/80"
                          }`}
                        >
                          {stage.name}
                          {stage.id !== "all" && (
                            <span className="ml-1 text-xs opacity-70">
                              (
                              {
                                faqData.filter((f) => f.stage === stage.name)
                                  .length
                              }
                              )
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 级别筛选 */}
                  <div>
                    <label className="text-sm font-medium text-ink mb-3 block">
                      修炼级别
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setSelectedLevel(level.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedLevel === level.id
                              ? "bg-primary text-white"
                              : "bg-muted text-ink/70 hover:bg-muted/80"
                          }`}
                        >
                          {level.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 场景筛选 */}
                  <div>
                    <label className="text-sm font-medium text-ink mb-3 block">
                      适用场景
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {scenes.map((scene) => (
                        <button
                          key={scene.id}
                          onClick={() => setSelectedScene(scene.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedScene === scene.id
                              ? "bg-primary text-white"
                              : "bg-muted text-ink/70 hover:bg-muted/80"
                          }`}
                        >
                          {scene.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 分类筛选 */}
                  <div>
                    <label className="text-sm font-medium text-ink mb-3 block">
                      问题分类
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedCategory === cat.id
                              ? "bg-primary text-white"
                              : "bg-muted text-ink/70 hover:bg-muted/80"
                          }`}
                        >
                          {cat.name}
                          {cat.id !== "all" && (
                            <span className="ml-1 text-xs opacity-70">
                              (
                              {
                                faqData.filter((f) => f.category === cat.name)
                                  .length
                              }
                              )
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 重置按钮 */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedStage("all");
                        setSelectedLevel("all");
                        setSelectedScene("all");
                        setSelectedCategory("all");
                        setSearchQuery("");
                      }}
                    >
                      重置筛选
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 结果统计 */}
        <div className="mb-4 text-sm text-ink/50">
          共找到 {filteredFAQs.length} 个问题
          {(selectedStage !== "all" ||
            selectedLevel !== "all" ||
            selectedScene !== "all" ||
            selectedCategory !== "all" ||
            searchQuery) && (
            <span>
              {" "}
              (已应用筛选)
            </span>
          )}
        </div>

        {/* FAQ列表 */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-6 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${
                            stageColors[faq.stage] ||
                            "bg-muted text-ink/70 border-border"
                          }`}
                        >
                          {faq.stage}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            categoryColors[faq.category] || "bg-muted text-ink/70"
                          }`}
                        >
                          {faq.category}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-ink/60">
                          {faq.scene}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-ink">
                        {faq.question}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-ink/50">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {faq.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {faq.helpful} 有用
                        </span>
                        <div className="flex gap-1">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-muted rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 mt-1">
                      {expandedId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-ink/40" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-ink/40" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-border">
                        <div className="prose prose-sm max-w-none text-ink/80 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <div className="text-sm text-ink/50">
                            适用级别：{faq.level}
                          </div>
                          <Button variant="outline" size="sm" className="gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            有用 ({faq.helpful})
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <HelpCircle className="w-16 h-16 text-ink/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-ink mb-2">
              没有找到相关问题
            </h3>
            <p className="text-ink/50 mb-4">
              尝试调整筛选条件或搜索关键词
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedStage("all");
                setSelectedLevel("all");
                setSelectedScene("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              重置所有筛选
            </Button>
          </motion.div>
        )}

        {/* 底部提示 */}
        <div className="mt-12 text-center">
          <p className="text-ink/50 mb-4">还有其他问题？</p>
          <Link href="/community">
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              <HelpCircle className="w-4 h-4" />
              去社区提问
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
