"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Swords,
  TrendingUp,
  Sparkles,
  Clock,
  ArrowRight,
  MessageCircle,
  Zap,
  Calendar,
  Flame,
  ChevronRight,
  Mountain,
  Target,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TeamCard from "@/components/team/team-card";
import DaoFriendCard from "@/components/team/dao-friend-card";
import PracticeTogether from "@/components/team/practice-together";
import {
  Team,
  DaoFriend,
  TeamPractice,
  getTeams,
  getDaoFriends,
  getTeamPractices,
  initializeMockData,
  joinTeam,
} from "@/lib/team-data";
import { getCurrentUser } from "@/lib/user-data";
import { cn } from "@/lib/utils";

// 颜色配置
const COLORS = {
  team: {
    primary: "text-teal-400",
    bg: "bg-teal-400",
    border: "border-teal-400/30",
    bgLight: "bg-teal-400/10",
    bgHover: "hover:bg-teal-400/20",
    gradient: "from-teal-400/20 to-teal-400/5",
    glow: "shadow-teal-400/20",
  },
  friend: {
    primary: "text-amber-400",
    bg: "bg-amber-400",
    border: "border-amber-400/30",
    bgLight: "bg-amber-400/10",
    bgHover: "hover:bg-amber-400/20",
    gradient: "from-amber-400/20 to-amber-400/5",
    glow: "shadow-amber-400/20",
  },
  practice: {
    primary: "text-red-400",
    bg: "bg-red-400",
    border: "border-red-400/30",
    bgLight: "bg-red-400/10",
    bgHover: "hover:bg-red-400/20",
    gradient: "from-red-400/20 to-red-400/5",
    glow: "shadow-red-400/20",
  },
};

function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  color,
  href,
  actionLabel,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: (typeof COLORS)["team"];
  href: string;
  actionLabel: string;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            color.bgLight,
            color.border,
            "border"
          )}
        >
          <Icon className={cn("w-5 h-5", color.primary)} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-rice">{title}</h2>
          <p className="text-sm text-rice/50">{subtitle}</p>
        </div>
      </div>
      <Link href={href}>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "border text-xs",
            color.border,
            color.primary,
            color.bgHover,
            "bg-transparent"
          )}
        >
          {actionLabel}
          <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </Link>
    </div>
  );
}

export default function FellowshipPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [recommendedTeams, setRecommendedTeams] = useState<Team[]>([]);
  const [friends, setFriends] = useState<DaoFriend[]>([]);
  const [practices, setPractices] = useState<TeamPractice[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    initializeMockData();
    const user = getCurrentUser();
    const userId = user?.id || "current_user";
    setCurrentUserId(userId);

    const allTeams = getTeams();
    setTeams(allTeams);

    const my = allTeams.filter((t) =>
      t.members.some((m) => m.userId === userId)
    );
    setMyTeams(my);

    const rec = allTeams
      .filter((t) => !t.members.some((m) => m.userId === userId))
      .slice(0, 3);
    setRecommendedTeams(rec);

    const allFriends = getDaoFriends().filter((f) => f.userId === userId);
    setFriends(allFriends);

    setPractices(getTeamPractices());
  }, []);

  const handleJoinTeam = (teamId: string) => {
    const updated = joinTeam(teamId, currentUserId);
    if (updated) {
      const allTeams = getTeams();
      setTeams(allTeams);
      setMyTeams(
        allTeams.filter((t) => t.members.some((m) => m.userId === currentUserId))
      );
      setRecommendedTeams(
        allTeams
          .filter((t) => !t.members.some((m) => m.userId === currentUserId))
          .slice(0, 3)
      );
    }
  };

  const acceptedFriends = friends.filter((f) => f.status === "accepted");
  const pendingFriends = friends.filter((f) => f.status === "pending");

  const ongoingPractices = practices.filter((p) => p.status === "ongoing");
  const upcomingPractices = practices
    .filter((p) => p.status === "scheduled")
    .sort(
      (a, b) =>
        new Date(a.scheduledTime).getTime() -
        new Date(b.scheduledTime).getTime()
    )
    .slice(0, 2);

  const totalPracticeMinutes = myTeams.reduce(
    (sum, t) => sum + t.totalPracticeMinutes,
    0
  );
  const totalPracticeCount = practices.filter((p) =>
    p.participants.includes(currentUserId)
  ).length;

  // 模拟个人修炼进度数据（后续从数据库获取）
  const myPracticeProgress = {
    currentStage: "炼形化精",
    currentLevel: 3,
    totalExp: 1250,
    nextLevelExp: 2000,
    streakDays: 7,
    totalDays: 45,
    dailyGoal: 30,
    todayProgress: 20,
  };

  // 顶部统计
  const topStats = [
    {
      label: "当前阶段",
      value: `${myPracticeProgress.currentStage} ${myPracticeProgress.currentLevel}级`,
      icon: Mountain,
      color: COLORS.team,
    },
    {
      label: "连续打卡",
      value: `${myPracticeProgress.streakDays}天`,
      icon: Target,
      color: COLORS.friend,
    },
    {
      label: "我的道友",
      value: acceptedFriends.length,
      icon: UserPlus,
      color: COLORS.practice,
    },
    {
      label: "同修总时长",
      value: `${Math.floor(totalPracticeMinutes / 60)}小时`,
      icon: Clock,
      color: COLORS.team,
    },
  ];

  return (
    <div className="min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-rice mb-2">同修</h1>
              <p className="text-rice/60">
                道场共修、道友同行、组队精进，一路相伴
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/fellowship/leaderboard">
                <Button
                  variant="outline"
                  className="border-gold/30 text-gold hover:bg-gold/10"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  排行榜
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 顶部统计栏 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {topStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-xl border p-5 bg-gradient-to-br",
                  stat.color.border,
                  stat.color.gradient
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      stat.color.bgLight
                    )}
                  >
                    <Icon className={cn("w-5 h-5", stat.color.primary)} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rice">
                      {stat.value}
                    </div>
                    <div className="text-sm text-rice/50">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 修炼之旅进度板块 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gold/20 p-6 mb-8 bg-gradient-to-br from-gold/5 to-transparent"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/30">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-rice">我的修炼之旅</h2>
                <p className="text-sm text-rice/50">记录每一步成长，见证蜕变之路</p>
              </div>
            </div>
            <Link href="/profile">
              <Button
                variant="outline"
                size="sm"
                className="border-gold/30 text-gold hover:bg-gold/10 text-xs"
              >
                查看详情
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>

          {/* 修炼进度条 */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-rice/70">
                {myPracticeProgress.currentStage} 第{myPracticeProgress.currentLevel}级
              </span>
              <span className="text-gold">
                {myPracticeProgress.totalExp} / {myPracticeProgress.nextLevelExp} XP
              </span>
            </div>
            <div className="h-3 bg-ink rounded-full overflow-hidden border border-gold/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(myPracticeProgress.totalExp / myPracticeProgress.nextLevelExp) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-gold to-gold/70 rounded-full"
              />
            </div>
          </div>

          {/* 今日修炼目标 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-gold/10 bg-gold/5">
              <Target className="w-5 h-5 text-gold/70" />
              <div>
                <div className="text-lg font-bold text-rice">
                  {myPracticeProgress.todayProgress}/{myPracticeProgress.dailyGoal}分钟
                </div>
                <div className="text-xs text-rice/50">今日修炼</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-gold/10 bg-gold/5">
              <Flame className="w-5 h-5 text-orange-400/70" />
              <div>
                <div className="text-lg font-bold text-rice">
                  {myPracticeProgress.streakDays}天
                </div>
                <div className="text-xs text-rice/50">连续打卡</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-gold/10 bg-gold/5">
              <Calendar className="w-5 h-5 text-gold/70" />
              <div>
                <div className="text-lg font-bold text-rice">
                  {myPracticeProgress.totalDays}天
                </div>
                <div className="text-xs text-rice/50">累计修炼</div>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="flex gap-3 mt-6">
            <Link href="/profile/practice" className="flex-1">
              <Button className="w-full bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30">
                <Zap className="w-4 h-4 mr-2" />
                开始修炼
              </Button>
            </Link>
            <Link href="/profile/diary" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-gold/30 text-gold hover:bg-gold/10"
              >
                记录日志
              </Button>
            </Link>
            <Link href="/assessment" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-gold/30 text-gold hover:bg-gold/10"
              >
                重新测评
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* 板块一：我的道场 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={cn(
            "rounded-2xl border p-6 mb-8",
            COLORS.team.border,
            "bg-gradient-to-br from-teal-950/30 to-transparent"
          )}
        >
          <SectionHeader
            title="我的道场"
            subtitle="加入道场，与同修共同进步"
            icon={Users}
            color={COLORS.team}
            href="/fellowship/teams"
            actionLabel="全部道场"
          />

          {myTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {myTeams.map((team) => (
                <Link key={team.id} href={`/fellowship/teams/${team.id}`}>
                  <TeamCard team={team} isJoined />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 mb-6 rounded-xl border border-dashed border-teal-400/20 bg-teal-400/5">
              <Users className="w-10 h-10 text-teal-400/30 mx-auto mb-3" />
              <p className="text-rice/40 mb-3">还没有加入任何道场</p>
              <Link href="/fellowship/teams">
                <Button
                  size="sm"
                  className="bg-teal-400/20 hover:bg-teal-400/30 text-teal-400 border border-teal-400/30"
                >
                  浏览道场
                </Button>
              </Link>
            </div>
          )}

          {/* 推荐道场 */}
          {recommendedTeams.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-rice/50 mb-3">
                推荐道场
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedTeams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    onJoin={handleJoinTeam}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Link href="/fellowship/teams/create" className="flex-1">
              <Button
                className={cn(
                  "w-full border",
                  COLORS.team.bgLight,
                  COLORS.team.primary,
                  COLORS.team.border,
                  "bg-transparent hover:bg-teal-400/20"
                )}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                创建道场
              </Button>
            </Link>
            <Link href="/fellowship/teams" className="flex-1">
              <Button
                variant="outline"
                className={cn(
                  "w-full border",
                  COLORS.team.border,
                  COLORS.team.primary,
                  "bg-transparent hover:bg-teal-400/10"
                )}
              >
                发现更多道场
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* 板块二：我的道友 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn(
            "rounded-2xl border p-6 mb-8",
            COLORS.friend.border,
            "bg-gradient-to-br from-amber-950/30 to-transparent"
          )}
        >
          <SectionHeader
            title="我的道友"
            subtitle="结交同修，互相督促，共同进步"
            icon={UserPlus}
            color={COLORS.friend}
            href="/fellowship/friends"
            actionLabel="管理道友"
          />

          {acceptedFriends.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              {acceptedFriends.slice(0, 6).map((friend) => (
                <Link
                  key={friend.id}
                  href={`/fellowship/friends`}
                  className="group"
                >
                  <div className="flex flex-col items-center p-4 rounded-xl border border-amber-400/10 bg-amber-400/5 hover:bg-amber-400/10 hover:border-amber-400/30 transition-all">
                    <div className="relative mb-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-400/5 border-2 border-amber-400/30 flex items-center justify-center text-xl text-rice group-hover:scale-110 transition-transform">
                        {friend.friendId.slice(-2)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-ink flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-200" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-rice text-center truncate w-full">
                      用户{friend.friendId.slice(-4)}
                    </span>
                    <span className="text-xs text-amber-400/70 mt-1">
                      在线
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 mb-6 rounded-xl border border-dashed border-amber-400/20 bg-amber-400/5">
              <UserPlus className="w-10 h-10 text-amber-400/30 mx-auto mb-3" />
              <p className="text-rice/40 mb-3">还没有道友，快去结交吧</p>
              <Link href="/fellowship/friends">
                <Button
                  size="sm"
                  className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-400 border border-amber-400/30"
                >
                  添加道友
                </Button>
              </Link>
            </div>
          )}

          {pendingFriends.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-rice/50 mb-3">
                待确认请求 ({pendingFriends.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pendingFriends.map((friend) => (
                  <DaoFriendCard
                    key={friend.id}
                    friend={friend}
                    onAccept={() => {
                      // 接受请求逻辑
                    }}
                    onReject={() => {
                      // 拒绝请求逻辑
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Link href="/fellowship/friends" className="flex-1">
              <Button
                className={cn(
                  "w-full border",
                  COLORS.friend.bgLight,
                  COLORS.friend.primary,
                  COLORS.friend.border,
                  "bg-transparent hover:bg-amber-400/20"
                )}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                查看全部道友
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* 板块三：组队修炼 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={cn(
            "rounded-2xl border p-6 mb-8",
            COLORS.practice.border,
            "bg-gradient-to-br from-red-950/30 to-transparent"
          )}
        >
          <SectionHeader
            title="组队修炼"
            subtitle="与道友同步修炼，获得经验加成"
            icon={Swords}
            color={COLORS.practice}
            href="/fellowship/practice"
            actionLabel="全部修炼"
          />

          {/* 修炼统计 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              {
                label: "即将开始",
                value: upcomingPractices.length,
                icon: Calendar,
              },
              {
                label: "进行中",
                value: ongoingPractices.length,
                icon: Flame,
              },
              {
                label: "已完成",
                value: practices.filter((p) => p.status === "completed")
                  .length,
                icon: Zap,
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 p-4 rounded-xl border border-red-400/10 bg-red-400/5"
                >
                  <Icon className="w-5 h-5 text-red-400/70" />
                  <div>
                    <div className="text-xl font-bold text-rice">
                      {stat.value}
                    </div>
                    <div className="text-xs text-rice/50">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 正在进行的修炼 */}
          {ongoingPractices.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-rice/50 mb-3">
                正在进行
              </h3>
              <div className="space-y-4">
                {ongoingPractices.map((practice) => (
                  <PracticeTogether
                    key={practice.id}
                    practice={practice}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 即将开始的修炼 */}
          {upcomingPractices.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-rice/50 mb-3">
                即将开始
              </h3>
              <div className="space-y-4">
                {upcomingPractices.map((practice) => (
                  <PracticeTogether
                    key={practice.id}
                    practice={practice}
                    currentUserId={currentUserId}
                    onJoin={() => {
                      // 加入修炼逻辑
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {ongoingPractices.length === 0 && upcomingPractices.length === 0 && (
            <div className="text-center py-8 mb-6 rounded-xl border border-dashed border-red-400/20 bg-red-400/5">
              <Swords className="w-10 h-10 text-red-400/30 mx-auto mb-3" />
              <p className="text-rice/40 mb-3">暂无组队修炼活动</p>
              <p className="text-sm text-rice/30 mb-3">
                发起或加入一场组队修炼吧
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Link href="/fellowship/practice" className="flex-1">
              <Button
                className={cn(
                  "w-full border",
                  COLORS.practice.bgLight,
                  COLORS.practice.primary,
                  COLORS.practice.border,
                  "bg-transparent hover:bg-red-400/20"
                )}
              >
                <Zap className="w-4 h-4 mr-2" />
                发起组队修炼
              </Button>
            </Link>
            <Link href="/fellowship/practice" className="flex-1">
              <Button
                variant="outline"
                className={cn(
                  "w-full border",
                  COLORS.practice.border,
                  COLORS.practice.primary,
                  "bg-transparent hover:bg-red-400/10"
                )}
              >
                查看修炼记录
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
