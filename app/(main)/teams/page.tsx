"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Users, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TeamList from "@/components/team/team-list";
import TeamCard from "@/components/team/team-card";
import {
  Team,
  getTeams,
  initializeMockData,
  joinTeam,
  getTeamLevelConfig,
} from "@/lib/team-data";
import { getCurrentUser } from "@/lib/user-data";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [recommendedTeams, setRecommendedTeams] = useState<Team[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    initializeMockData();
    const user = getCurrentUser();
    const userId = user?.id || "current_user";
    setCurrentUserId(userId);

    const allTeams = getTeams();
    setTeams(allTeams);

    const my = allTeams.filter((t) => t.members.some((m) => m.userId === userId));
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
      setMyTeams(allTeams.filter((t) => t.members.some((m) => m.userId === currentUserId)));
      setRecommendedTeams(
        allTeams
          .filter((t) => !t.members.some((m) => m.userId === currentUserId))
          .slice(0, 3)
      );
    }
  };

  const stats = [
    { label: "我的道场", value: myTeams.length, icon: Users },
    { label: "总修炼时长", value: `${myTeams.reduce((sum, t) => sum + t.totalPracticeMinutes, 0)}分钟`, icon: TrendingUp },
    { label: "连续打卡", value: `${Math.max(...myTeams.map((t) => t.streakDays), 0)}天`, icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-rice mb-2">道场广场</h1>
              <p className="text-rice/60">组建或加入修炼小组，互相督促、共同进步</p>
            </div>
            <Link href="/teams/create">
              <Button className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30">
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
                className="rounded-xl border border-gold/20 bg-gradient-to-br from-ink/80 to-ink/60 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rice">{stat.value}</div>
                    <div className="text-sm text-rice/50">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                <Link key={team.id} href={`/teams/${team.id}`}>
                  <TeamCard team={team} isJoined />
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {recommendedTeams.length > 0 && (
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
          <h2 className="text-xl font-bold text-rice mb-4">全部道场</h2>
          <TeamList
            teams={teams}
            onJoinTeam={handleJoinTeam}
            joinedTeamIds={myTeams.map((t) => t.id)}
          />
        </motion.div>
      </div>
    </div>
  );
}
