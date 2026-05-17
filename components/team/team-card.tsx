"use client";

import { motion } from "framer-motion";
import { Users, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Team, getTeamLevelConfig, getTeamTypeLabel } from "@/lib/team-data";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
  onJoin?: (teamId: string) => void;
  isJoined?: boolean;
  className?: string;
}

export default function TeamCard({ team, onJoin, isJoined = false, className }: TeamCardProps) {
  const levelConfig = getTeamLevelConfig(team.level);
  const typeLabel = getTeamTypeLabel(team.type);
  const memberRatio = team.currentMembers / team.maxMembers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-xl border border-gold/20 bg-gradient-to-br from-ink/80 to-ink/60 backdrop-blur-sm overflow-hidden group cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center text-2xl">
              {levelConfig.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-rice group-hover:text-gold transition-colors">
                {team.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="outline" className="text-xs border-gold/30 text-gold/80">
                  {typeLabel}
                </Badge>
                <span className="text-xs text-rice/50">
                  {levelConfig.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gold">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-medium">{team.streakDays}天</span>
          </div>
        </div>

        <p className="text-sm text-rice/60 mb-4 line-clamp-2">
          {team.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-rice/70">
              <Users className="w-4 h-4" />
              <span>{team.currentMembers}/{team.maxMembers}人</span>
            </div>
            <div className="flex items-center gap-1.5 text-rice/70">
              <TrendingUp className="w-4 h-4" />
              <span>{team.totalPracticeMinutes}分钟</span>
            </div>
          </div>

          <div className="w-full h-1.5 bg-rice/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${memberRatio * 100}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(
                "h-full rounded-full",
                memberRatio >= 0.8 ? "bg-red-400" : memberRatio >= 0.5 ? "bg-gold" : "bg-emerald-400"
              )}
            />
          </div>

          {team.announcement && (
            <div className="text-xs text-rice/40 line-clamp-1 bg-rice/5 rounded px-2 py-1">
              公告: {team.announcement}
            </div>
          )}

          {onJoin && !isJoined && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onJoin(team.id);
              }}
              className="w-full bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
              disabled={team.currentMembers >= team.maxMembers}
            >
              {team.currentMembers >= team.maxMembers ? "已满员" : "加入道场"}
            </Button>
          )}

          {isJoined && (
            <div className="w-full text-center py-2 text-sm text-emerald-400 bg-emerald-400/10 rounded-md border border-emerald-400/20">
              已加入
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
