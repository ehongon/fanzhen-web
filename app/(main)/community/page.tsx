"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine,
  HelpCircle,
  BookOpen,
  Plus,
  Flame,
  TrendingUp,
  Clock,
  FileQuestion,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PostCard from "@/components/community/post-card";
import QACard from "@/components/community/qa-card";
import PostDetail from "@/components/community/post-detail";

type TabType = "experiences" | "qa" | "diary" | "faq";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: string;
    levelColor: string;
  };
  tags: {
    stage?: string;
    gongfa?: string;
    topic?: string;
  };
  stats: {
    likes: number;
    comments: number;
    bookmarks: number;
  };
  publishedAt: string;
  comments: Array<{
    id: string;
    author: {
      name: string;
      avatar: string;
      level: string;
    };
    content: string;
    likes: number;
    publishedAt: string;
  }>;
}

interface QAItem {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: string;
    levelColor: string;
  };
  status: "solved" | "unsolved";
  answerCount: number;
  bestAnswer?: {
    content: string;
    author: string;
    likes: number;
  };
  bounty?: number;
  tags: string[];
  publishedAt: string;
}

const tabs = [
  { id: "experiences" as TabType, label: "心得分享", icon: BookOpen },
  { id: "qa" as TabType, label: "问答讨论", icon: HelpCircle },
  { id: "diary" as TabType, label: "修炼日记", icon: PenLine },
  { id: "faq" as TabType, label: "FAQ", icon: FileQuestion },
];

const samplePosts: Post[] = [
  {
    id: "1",
    title: "三个月筑基心得：从失眠到深度睡眠的转变",
    content:
      "修炼三个月来，最大的变化就是睡眠质量。以前经常失眠，现在每晚都能进入深度睡眠。具体做法是：每晚睡前站桩30分钟，配合呼吸法，让身心完全放松。坚持一个月后，入睡时间明显缩短，从原来的1-2小时缩短到15分钟以内...",
    author: {
      name: "修行者A",
      avatar: "修",
      level: "炼精化气",
      levelColor: "bg-cinnabar/10 text-cinnabar",
    },
    tags: {
      stage: "炼精化气",
      gongfa: "站桩",
      topic: "睡眠改善",
    },
    stats: { likes: 128, comments: 32, bookmarks: 45 },
    publishedAt: "2小时前",
    comments: [
      {
        id: "c1",
        author: { name: "同修B", avatar: "同", level: "炼精化气" },
        content: "感谢分享！我也一直有失眠问题，今晚就开始试试。",
        likes: 12,
        publishedAt: "1小时前",
      },
      {
        id: "c2",
        author: { name: "道友C", avatar: "道", level: "炼气化神" },
        content: "站桩确实对睡眠有很大帮助，我已经坚持半年了，效果非常明显。建议配合冥想一起练习。",
        likes: 8,
        publishedAt: "45分钟前",
      },
    ],
  },
  {
    id: "2",
    title: "初学者的呼吸法入门指南",
    content:
      "很多同修问我呼吸法怎么入门，今天整理了一份详细的指南。首先，要找到安静的环境，坐姿要端正但不僵硬。呼吸要自然，不要刻意控制，先从观察自己的呼吸开始...",
    author: {
      name: "明心道人",
      avatar: "明",
      level: "炼气化神",
      levelColor: "bg-gold/10 text-gold-dark",
    },
    tags: {
      stage: "炼精化气",
      gongfa: "呼吸法",
      topic: "入门指南",
    },
    stats: { likes: 256, comments: 67, bookmarks: 189 },
    publishedAt: "5小时前",
    comments: [
      {
        id: "c3",
        author: { name: "新手小白", avatar: "新", level: "炼精化气" },
        content: "太及时了！正好需要这个，收藏了。",
        likes: 5,
        publishedAt: "4小时前",
      },
    ],
  },
  {
    id: "3",
    title: "百日筑基完成，分享我的修炼记录",
    content:
      "今天是我修炼的第100天，终于完成了筑基阶段。这100天里，我每天坚持早晚各修炼1小时，记录每次的感受和变化。现在明显感觉精力充沛，思维清晰...",
    author: {
      name: "静心居士",
      avatar: "静",
      level: "炼气化神",
      levelColor: "bg-gold/10 text-gold-dark",
    },
    tags: {
      stage: "炼精化气",
      gongfa: "综合",
      topic: "百日筑基",
    },
    stats: { likes: 342, comments: 89, bookmarks: 234 },
    publishedAt: "1天前",
    comments: [],
  },
  {
    id: "4",
    title: "关于小周天的个人体会",
    content:
      "小周天是炼精化气阶段的重要关卡，我想分享一下自己的体会。首先要明确，小周天不是一蹴而就的，需要循序渐进。我个人的经验是...",
    author: {
      name: "云游道人",
      avatar: "云",
      level: "炼神还虚",
      levelColor: "bg-ink/10 text-ink-light",
    },
    tags: {
      stage: "炼气化神",
      gongfa: "小周天",
      topic: "经验分享",
    },
    stats: { likes: 198, comments: 45, bookmarks: 156 },
    publishedAt: "2天前",
    comments: [],
  },
];

const sampleQA: QAItem[] = [
  {
    id: "q1",
    title: "站桩时膝盖微痛，是否需要调整姿势？",
    content:
      "最近开始练习站桩，每次站15分钟左右膝盖会有轻微的酸痛感。请问这是正常现象还是需要调整姿势？我的站姿是双脚与肩同宽，膝盖微屈...",
    author: {
      name: "初学者小李",
      avatar: "李",
      level: "炼精化气",
      levelColor: "bg-cinnabar/10 text-cinnabar",
    },
    status: "solved",
    answerCount: 5,
    bestAnswer: {
      content:
        "膝盖微痛说明姿势需要微调。建议：1. 膝盖不要超过脚尖，重心稍微后移；2. 检查膝盖是否正对脚尖方向，不要内扣或外撇；3. 初学者每次站桩时间不宜过长，建议从5分钟开始，逐渐增加到15-20分钟；4. 站完后可以做几个膝关节环绕运动放松。如果调整后仍然疼痛，建议暂停练习，咨询专业指导。",
      author: "太极老人",
      likes: 28,
    },
    bounty: 50,
    tags: ["站桩", "姿势调整", "炼精化气"],
    publishedAt: "3小时前",
  },
  {
    id: "q2",
    title: "修炼时感觉丹田发热，这是气感吗？",
    content:
      "修炼呼吸法两周了，最近感觉小腹（丹田位置）有温热感，持续约10分钟左右。这是气感的表现吗？需要注意什么？",
    author: {
      name: "求道者",
      avatar: "求",
      level: "炼精化气",
      levelColor: "bg-cinnabar/10 text-cinnabar",
    },
    status: "solved",
    answerCount: 3,
    bestAnswer: {
      content:
        "这是很好的气感表现！丹田发热是修炼初期的正常反应，说明你的呼吸法已经入门了。建议：1. 不要刻意追求这种感觉，保持自然；2. 可以适当延长修炼时间；3. 注意保暖，修炼后不要立即接触冷水；4. 配合意念轻轻守住丹田，但不要用力过猛。",
      author: "明心道人",
      likes: 15,
    },
    tags: ["呼吸法", "丹田", "气感"],
    publishedAt: "1天前",
  },
  {
    id: "q3",
    title: "如何平衡修炼与工作生活？",
    content:
      "最近工作比较忙，每天加班到很晚，修炼时间被压缩了很多。想请教各位同修，如何在繁忙的工作中保持修炼？",
    author: {
      name: "上班族修士",
      avatar: "班",
      level: "炼精化气",
      levelColor: "bg-cinnabar/10 text-cinnabar",
    },
    status: "unsolved",
    answerCount: 2,
    bounty: 30,
    tags: ["时间管理", "修炼安排", "工作生活"],
    publishedAt: "5小时前",
  },
  {
    id: "q4",
    title: "冥想时总是走神，有什么方法可以改善？",
    content:
      "每次冥想时，脑子里总是有各种杂念，很难集中注意力。已经练习一个月了，改善不明显。请问有什么好的方法吗？",
    author: {
      name: "冥想新手",
      avatar: "冥",
      level: "炼精化气",
      levelColor: "bg-cinnabar/10 text-cinnabar",
    },
    status: "unsolved",
    answerCount: 0,
    tags: ["冥想", "专注力", "入门"],
    publishedAt: "2小时前",
  },
];

const sampleDiaries: Post[] = [
  {
    id: "d1",
    title: "修炼日记 - 第30天",
    content:
      "今天修炼状态不错，站桩25分钟，呼吸平稳。感觉丹田位置有明显的温热感，持续时间比昨天长。修炼后精神很好，工作效率也有提升。",
    author: {
      name: "修行者A",
      avatar: "修",
      level: "炼精化气",
      levelColor: "bg-cinnabar/10 text-cinnabar",
    },
    tags: {
      stage: "炼精化气",
      gongfa: "站桩",
      topic: "日常记录",
    },
    stats: { likes: 23, comments: 5, bookmarks: 3 },
    publishedAt: "今天",
    comments: [],
  },
  {
    id: "d2",
    title: "修炼日记 - 第45天",
    content:
      "今天尝试了新的呼吸节奏，吸气4秒-屏息4秒-呼气6秒。感觉比之前的自然呼吸更有效果，修炼后身体轻松很多。明天继续尝试。",
    author: {
      name: "静心居士",
      avatar: "静",
      level: "炼气化神",
      levelColor: "bg-gold/10 text-gold-dark",
    },
    tags: {
      stage: "炼气化神",
      gongfa: "呼吸法",
      topic: "日常记录",
    },
    stats: { likes: 45, comments: 12, bookmarks: 8 },
    publishedAt: "昨天",
    comments: [],
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("experiences");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const getPublishButtonText = () => {
    switch (activeTab) {
      case "experiences":
        return "写心得";
      case "qa":
        return "提问";
      case "diary":
        return "记日记";
      case "faq":
        return "查看全部";
    }
  };

  const getPublishIcon = () => {
    switch (activeTab) {
      case "experiences":
        return <PenLine className="w-4 h-4" />;
      case "qa":
        return <HelpCircle className="w-4 h-4" />;
      case "diary":
        return <BookOpen className="w-4 h-4" />;
      case "faq":
        return <FileQuestion className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 */}
      <div className="bg-ink-gradient text-rice py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif-cn text-4xl md:text-5xl font-bold mb-4 text-gold">
              修行社区
            </h1>
            <p className="text-lg md:text-xl text-rice/70 max-w-2xl mx-auto">
              同修共进，智慧分享
            </p>
          </motion.div>

          {/* 统计信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center space-x-8 mt-8"
          >
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-cinnabar" />
              <span className="text-sm">今日活跃 1,234</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              <span className="text-sm">总帖子 8,567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gold/70" />
              <span className="text-sm">今日新增 56</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 标签页 + 发布按钮 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                    ${
                      activeTab === tab.id
                        ? "bg-cinnabar text-rice shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === "faq" ? (
            <Link href="/community/faq">
              <Button className="bg-cinnabar hover:bg-cinnabar-light text-rice shadow-lg shadow-cinnabar/20">
                <FileQuestion className="w-4 h-4 mr-1" />
                查看全部FAQ
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => setShowPublishModal(true)}
              className="bg-cinnabar hover:bg-cinnabar-light text-rice shadow-lg shadow-cinnabar/20"
            >
              <Plus className="w-4 h-4 mr-1" />
              {getPublishButtonText()}
            </Button>
          )}
        </div>

        {/* 内容区域 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "experiences" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {samplePosts.map((post) => (
                  <PostCard
                    key={post.id}
                    {...post}
                    onClick={() => setSelectedPost(post)}
                  />
                ))}
              </div>
            )}

            {activeTab === "qa" && (
              <div className="space-y-4">
                {sampleQA.map((qa) => (
                  <QACard key={qa.id} {...qa} />
                ))}
              </div>
            )}

            {activeTab === "diary" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleDiaries.map((diary) => (
                  <PostCard
                    key={diary.id}
                    {...diary}
                    onClick={() => setSelectedPost(diary)}
                  />
                ))}
              </div>
            )}

            {activeTab === "faq" && (
              <div className="text-center py-16">
                <FileQuestion className="w-16 h-16 text-gold/40 mx-auto mb-6" />
                <h3 className="text-2xl font-serif-cn font-bold text-ink mb-4">
                  修炼常见问题
                </h3>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  按阶段、级别、场景整理的常见问题解答，帮助同修解决修炼路上的疑惑
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="bg-gold/10 rounded-lg px-4 py-2 text-sm text-gold-dark">
                    30+ 常见问题
                  </div>
                  <div className="bg-cinnabar/10 rounded-lg px-4 py-2 text-sm text-cinnabar">
                    4 大阶段
                  </div>
                  <div className="bg-ink/10 rounded-lg px-4 py-2 text-sm text-ink-light">
                    11 个场景
                  </div>
                </div>
                <Link href="/community/faq">
                  <Button className="bg-cinnabar hover:bg-cinnabar-light text-rice shadow-lg shadow-cinnabar/20 px-8">
                    查看完整FAQ
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 帖子详情弹窗 */}
      <AnimatePresence>
        {selectedPost && (
          <PostDetail
            {...selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>

      {/* 发布弹窗 */}
      <AnimatePresence>
        {showPublishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowPublishModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-2xl shadow-2xl w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif-cn text-xl font-bold">
                  {getPublishButtonText()}
                </h2>
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  {/* <X className="w-5 h-5" /> */}
                </button>
              </div>
              <p className="text-muted-foreground text-center py-8">
                发布功能开发中，敬请期待...
              </p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowPublishModal(false)}
                >
                  关闭
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
