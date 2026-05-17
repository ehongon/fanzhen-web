"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Users, TrendingUp, Sparkles, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TeamList from "@/components/team/team-list";
import TeamCard from "@/components/team/team-card";
import {
  Team,
  getTeams,
  initializeMockData,
  joinTeam,
} from "@/lib/team-data";
import { getCurrentUser } from "@/lib/user-data";
import { cn } from "@/lib/utils";

export default function FellowshipTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [recommendedTeams, setRecommendedTeams] = useState<Team[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "我的道场", value: myTeams.length, icon: Users },
    {
      label: "总修炼时长",
      value: `${myTeams.reduce((sum, t) => sum + t.totalPracticeMinutes, 0)}分钟`,
      icon: TrendingUp,
    },
    {
      label: "连续打卡",
      value: `${Math.max(...myTeams.map((t) => t.streakDays), 0)}天`,
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回同修首页 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Link
            href="/fellowship"
            className="inline-flex items-center text-rice/60 hover:text-teal-400 transition-colors"
          >
            <span className="mr-2">←</span>
            返回同修
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-rice mb-2">道场广场</h1>
              <p className="text-rice/60">
                组建或加入修炼小组，互相督促、共同进步
              </p>
            </div>
            <Link href="/fellowship/teams/create">
              <Button className="bg-teal-400/20 hover:bg-teal-400/30 text-teal-400 border border-teal-400/30">
                <Plus className="w-4 h-4 mr-2" />
                创建道场
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-teal-400/20 bg-gradient-to-br from-teal-950/30 to-transparent p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-400/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-teal-400" />
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

        {/* 搜索 */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rice/40" />
          <Input
            placeholder="搜索道场..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-ink/50 border-teal-400/20 text-rice placeholder:text-rice/40"
          />
        </div>

        {myTeams.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-rice mb-4">我的道场</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myTeams.map((team) => (
                <Link key={team.id} href={`/fellowship/teams/${team.id}`}>
                  <TeamCard team={team} isJoined />
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {recommendedTeams.length > 0 && !searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-rice mb-4">推荐道场</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedTeams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onJoin={handleJoinTeam}
                />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-rice mb-4">
            {searchQuery ? "搜索结果" : "全部道场"}
          </h2>
          <TeamList
            teams={filteredTeams}
            onJoinTeam={handleJoinTeam}
            joinedTeamIds={myTeams.map((t) => t.id)}
          />
        </motion.div>
      </div>
    </div>
  );
}
