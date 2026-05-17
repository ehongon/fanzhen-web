"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Flame,
  TrendingUp,
  Crown,
  Shield,
  User,
  Clock,
  Award,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Team, TeamMember, getTeamLevelConfig, getTeamTypeLabel, getTeamRankings, TeamRanking } from "@/lib/team-data";
import { cn } from "@/lib/utils";
import TeamChat from "./team-chat";

interface TeamDetailProps {
  team: Team;
  currentUserId?: string;
  onJoin?: () => void;
  onLeave?: () => void;
  className?: string;
}

function MemberRoleIcon({ role }: { role: TeamMember["role"] }) {
  switch (role) {
    case "leader":
      return <Crown className="w-4 h-4 text-gold" />;
    case "admin":
      return <Shield className="w-4 h-4 text-emerald-400" />;
    default:
      return <User className="w-4 h-4 text-rice/50" />;
  }
}

function MemberRoleLabel({ role }: { role: TeamMember["role"] }) {
  switch (role) {
    case "leader":
      return "组长";
    case "admin":
      return "管理员";
    default:
      return "成员";
  }
}

function RankingItem({ ranking, index }: { ranking: TeamRanking; index: number }) {
  const medals = ["🥇", "🥈", "🥉"];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg",
        index < 3 ? "bg-gold/5 border border-gold/20" : "bg-rice/5"
      )}
    >
      <div className="w-8 h-8 flex items-center justify-center text-lg">
        {index < 3 ? medals[index] : index + 1}
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center text-sm">
        {ranking.userName.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-rice truncate">{ranking.userName}</div>
        <div className="text-xs text-rice/50">{ranking.practiceMinutes}分钟</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-gold">{ranking.contribution}</div>
        <div className="text-xs text-rice/50">{ranking.streakDays}天连修</div>
      </div>
    </motion.div>
  );
}

export default function TeamDetail({ team, currentUserId, onJoin, onLeave, className }: TeamDetailProps) {
  const [activeTab, setActiveTab] = useState<"members" | "ranking" | "chat">("members");
  const levelConfig = getTeamLevelConfig(team.level);
  const typeLabel = getTeamTypeLabel(team.type);
  const rankings = getTeamRankings(team.id);
  const isMember = currentUserId && team.members.some((m) => m.userId === currentUserId);
  const isLeader = currentUserId === team.leaderId;

  const tabs = [
    { id: "members" as const, label: "成员", icon: Users },
    { id: "ranking" as const, label: "排行", icon: Award },
    { id: "chat" as const, label: "讨论", icon: MessageSquare },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-xl border border-gold/20 bg-gradient-to-br from-ink/80 to-ink/60 p-6"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center text-4xl shrink-0">
            {levelConfig.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-rice">{team.name}</h1>
              <Badge variant="outline" className="border-gold/30 text-gold/80">
                {typeLabel}
              </Badge>
              <Badge variant="outline" className="border-gold/30 text-gold/80">
                {levelConfig.name}
              </Badge>
            </div>
            
            <p className="text-rice/60 mb-4">{team.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-rice/70">
                <Users className="w-4 h-4" />
                <span>{team.currentMembers}/{team.maxMembers}人</span>
              </div>
              <div className="flex items-center gap-1.5 text-gold">
                <Flame className="w-4 h-4" />
                <span>{team.streakDays}天连修</span>
              </div>
              <div className="flex items-center gap-1.5 text-rice/70">
                <TrendingUp className="w-4 h-4" />
                <span>{team.totalPracticeMinutes}分钟</span>
              </div>
              <div className="flex items-center gap-1.5 text-rice/70">
                <Calendar className="w-4 h-4" />
                <span>{new Date(team.createdAt).toLocaleDateString()}创建</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            {!isMember && onJoin && (
              <Button
                onClick={onJoin}
                className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
                disabled={team.currentMembers >= team.maxMembers}
              >
                {team.currentMembers >= team.maxMembers ? "已满员" : "加入道场"}
              </Button>
            )}
            {isMember && !isLeader && onLeave && (
              <Button
                onClick={onLeave}
                variant="outline"
                className="border-red-400/30 text-red-400 hover:bg-red-400/10"
              >
                离开道场
              </Button>
            )}
          </div>
        </div>

        {team.announcement && (
          <div className="mt-4 p-3 rounded-lg bg-gold/5 border border-gold/20">
            <div className="text-xs text-gold/80 mb-1">公告</div>
            <div className="text-sm text-rice/80">{team.announcement}</div>
          </div>
        )}
      </motion.div>

      <div className="flex gap-2 border-b border-gold/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2",
                activeTab === tab.id
                  ? "text-gold border-gold"
                  : "text-rice/50 border-transparent hover:text-rice/80"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "members" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {team.members.map((member, index) => (
              <motion.div
                key={member.userId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-rice/5 border border-rice/10"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center text-sm text-rice">
                  {member.userId.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-rice">
                      用户{member.userId.slice(-4)}
                    </span>
                    <MemberRoleIcon role={member.role} />
                  </div>
                  <div className="text-xs text-rice/50">
                    <MemberRoleLabel role={member.role} />
                    {" · "}
                    {new Date(member.joinedAt).toLocaleDateString()}加入
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gold">{member.contribution}</div>
                  <div className="text-xs text-rice/50">贡献值</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "ranking" && (
          <div className="space-y-2">
            {rankings.map((ranking, index) => (
              <RankingItem key={ranking.userId} ranking={ranking} index={index} />
            ))}
          </div>
        )}

        {activeTab === "chat" && (
          <TeamChat teamId={team.id} currentUserId={currentUserId} />
        )}
      </motion.div>
    </div>
  );
}
