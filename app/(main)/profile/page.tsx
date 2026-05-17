"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Layers,
  TrendingUp,
  Clock,
  Award,
  Target,
} from "lucide-react";
import ProfileCard, { UserProfile } from "@/components/profile/profile-card";
import StatsPanel, { StatsData } from "@/components/profile/stats-panel";
import TrendChart from "@/components/profile/trend-chart";
import QuickLinks from "@/components/profile/quick-links";
import CultivationLog, { CultivationRecord } from "@/components/profile/cultivation-log";

// 示例用户数据
const userData: UserProfile = {
  name: "修行者",
  avatar: "修",
  level: "炼精化气",
  levelColor: "bg-cinnabar/10 text-cinnabar",
  registerDate: "2024-01-15",
  streakDays: 45,
  constitution: "平和质",
  mainGongfa: "站桩",
};

// 修炼档案数据
const cultivationProfile = {
  currentStage: "炼精化气",
  currentLevel: "中期",
  constitution: "平和质",
  mainGongfa: "站桩",
  totalDays: 120,
  totalHours: 360,
};

// 统计数据
const statsData: StatsData = {
  monthlyDays: 28,
  monthlyHours: 45,
  avgDailyMinutes: 52,
  longestStreak: 45,
  gongfaCount: 5,
  totalDays: 120,
  totalHours: 360,
};

// 近30天修炼时长数据
const dailyPracticeData = [
  { label: "1日", value: 45 },
  { label: "3日", value: 60 },
  { label: "5日", value: 30 },
  { label: "7日", value: 90 },
  { label: "9日", value: 45 },
  { label: "11日", value: 60 },
  { label: "13日", value: 75 },
  { label: "15日", value: 50 },
  { label: "17日", value: 80 },
  { label: "19日", value: 45 },
  { label: "21日", value: 60 },
  { label: "23日", value: 90 },
  { label: "25日", value: 70 },
  { label: "27日", value: 55 },
  { label: "29日", value: 85 },
];

// 功法修炼时长占比
const gongfaDistribution = [
  { label: "站桩", value: 120, color: "#c75b39" },
  { label: "呼吸法", value: 80, color: "#d4a574" },
  { label: "冥想", value: 60, color: "#1a1a2e" },
  { label: "小周天", value: 40, color: "#8b5cf6" },
  { label: "太极拳", value: 60, color: "#3b82f6" },
];

// 阶段修炼时长占比
const stageDistribution = [
  { label: "炼精化气", value: 280, color: "#c75b39" },
  { label: "炼气化神", value: 50, color: "#d4a574" },
  { label: "炼神还虚", value: 20, color: "#1a1a2e" },
  { label: "炼虚合道", value: 10, color: "#8b5cf6" },
];

// 身心状态趋势数据
const wellnessTrendData = [
  // 睡眠
  [
    { label: "1日", value: 7.5 },
    { label: "5日", value: 8.0 },
    { label: "10日", value: 6.5 },
    { label: "15日", value: 7.0 },
    { label: "20日", value: 8.5 },
    { label: "25日", value: 7.5 },
    { label: "30日", value: 8.0 },
  ],
  // 精力
  [
    { label: "1日", value: 75 },
    { label: "5日", value: 80 },
    { label: "10日", value: 65 },
    { label: "15日", value: 70 },
    { label: "20日", value: 85 },
    { label: "25日", value: 78 },
    { label: "30日", value: 82 },
  ],
  // 心情
  [
    { label: "1日", value: 70 },
    { label: "5日", value: 75 },
    { label: "10日", value: 60 },
    { label: "15日", value: 72 },
    { label: "20日", value: 80 },
    { label: "25日", value: 76 },
    { label: "30日", value: 85 },
  ],
];

// 修炼记录示例数据
const sampleRecords: CultivationRecord[] = [
  {
    id: "1",
    date: "2024-05-15",
    gongfa: "站桩",
    duration: 30,
    feeling: "good",
    note: "今天状态很好，站了30分钟没有疲劳感",
  },
  {
    id: "2",
    date: "2024-05-15",
    gongfa: "呼吸法",
    duration: 20,
    feeling: "normal",
    note: "呼吸节奏还需要调整",
  },
  {
    id: "3",
    date: "2024-05-14",
    gongfa: "站桩",
    duration: 25,
    feeling: "good",
    note: "",
  },
  {
    id: "4",
    date: "2024-05-14",
    gongfa: "冥想",
    duration: 15,
    feeling: "good",
    note: "冥想时感觉丹田温热",
  },
  {
    id: "5",
    date: "2024-05-13",
    gongfa: "太极拳",
    duration: 45,
    feeling: "normal",
    note: "动作还需要更柔和",
  },
  {
    id: "6",
    date: "2024-05-12",
    gongfa: "小周天",
    duration: 30,
    feeling: "bad",
    note: "今天状态不佳，气感不明显",
  },
  {
    id: "7",
    date: "2024-05-11",
    gongfa: "站桩",
    duration: 35,
    feeling: "good",
    note: "站得很稳，气感明显",
  },
  {
    id: "8",
    date: "2024-05-10",
    gongfa: "呼吸法",
    duration: 25,
    feeling: "good",
    note: "",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    router.push("/profile/settings");
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-8">
      {/* 页面头部背景 */}
      <div className="bg-ink-gradient text-rice py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif-cn text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gold">
              个人中心
            </h1>
            <p className="text-rice/70 text-sm sm:text-base">
              记录修行点滴，见证成长之路
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* 用户信息卡片 */}
        <ProfileCard
          user={userData}
          onEdit={handleEdit}
          onAvatarUpload={() => console.log("上传头像")}
        />

        {/* 修炼档案 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border/50 shadow-card p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-cinnabar" />
            <h3 className="font-serif-cn font-semibold text-base sm:text-lg text-foreground">
              修炼档案
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">当前阶段</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{cultivationProfile.currentStage}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">当前层级</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{cultivationProfile.currentLevel}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">体质类型</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{cultivationProfile.constitution}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">主修功法</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{cultivationProfile.mainGongfa}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">修炼总天数</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{cultivationProfile.totalDays} 天</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">修炼总时长</p>
              <p className="text-sm sm:text-base font-semibold text-foreground">{cultivationProfile.totalHours} 小时</p>
            </div>
          </div>
        </motion.div>

        {/* 数据统计面板 */}
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <TrendingUp className="w-5 h-5 text-cinnabar" />
            <h3 className="font-serif-cn font-semibold text-base sm:text-lg text-foreground">
              数据统计
            </h3>
          </div>
          <StatsPanel stats={statsData} />
        </div>

        {/* 修炼趋势图表 */}
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Layers className="w-5 h-5 text-cinnabar" />
            <h3 className="font-serif-cn font-semibold text-base sm:text-lg text-foreground">
              修炼趋势
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* 近30天修炼时长折线图 */}
            <TrendChart
              type="line"
              title="近30天修炼时长（分钟）"
              data={dailyPracticeData}
              delay={0.1}
            />
            {/* 各功法时长占比饼图 */}
            <TrendChart
              type="pie"
              title="各功法修炼时长占比"
              data={gongfaDistribution}
              delay={0.2}
            />
            {/* 各阶段修炼时长占比 */}
            <TrendChart
              type="bar"
              title="各阶段修炼时长占比"
              data={stageDistribution}
              delay={0.3}
            />
            {/* 身心状态趋势 */}
            <TrendChart
              type="multiLine"
              title="身心状态趋势"
              data={wellnessTrendData}
              delay={0.4}
            />
          </div>
        </div>

        {/* 修炼记录 */}
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Clock className="w-5 h-5 text-cinnabar" />
            <h3 className="font-serif-cn font-semibold text-base sm:text-lg text-foreground">
              修炼记录
            </h3>
          </div>
          <CultivationLog records={sampleRecords} />
        </div>

        {/* 快捷入口 */}
        <QuickLinks />
      </div>
    </div>
  );
}
