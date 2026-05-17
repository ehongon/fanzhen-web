"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TeamCard from "./team-card";
import { Team, TeamType, TEAM_TYPE_LABELS, TEAM_LEVEL_CONFIG } from "@/lib/team-data";
import { cn } from "@/lib/utils";

interface TeamListProps {
  teams: Team[];
  onJoinTeam?: (teamId: string) => void;
  joinedTeamIds?: string[];
  className?: string;
}

export default function TeamList({ teams, onJoinTeam, joinedTeamIds = [], className }: TeamListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<TeamType | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<number | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesSearch =
        !searchQuery ||
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === "all" || team.type === selectedType;
      const matchesLevel = selectedLevel === "all" || team.level === selectedLevel;

      return matchesSearch && matchesType && matchesLevel;
    });
  }, [teams, searchQuery, selectedType, selectedLevel]);

  const teamTypes: (TeamType | "all")[] = ["all", "gongfa", "stage", "region", "interest"];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rice/40" />
          <Input
            placeholder="搜索道场..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-ink/50 border-gold/20 text-rice placeholder:text-rice/40"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "border-gold/20 text-rice hover:bg-gold/10",
            showFilters && "bg-gold/10 border-gold/40"
          )}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          筛选
        </Button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 p-4 rounded-lg bg-ink/40 border border-gold/10"
        >
          <div>
            <label className="text-sm text-rice/60 mb-2 block">道场类型</label>
            <div className="flex flex-wrap gap-2">
              {teamTypes.map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "text-xs",
                    selectedType === type
                      ? "bg-gold/20 text-gold border-gold/40"
                      : "border-gold/20 text-rice/70 hover:bg-gold/10"
                  )}
                >
                  {type === "all" ? "全部" : TEAM_TYPE_LABELS[type]}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-rice/60 mb-2 block">道场等级</label>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedLevel === "all" ? "default" : "outline"}
                onClick={() => setSelectedLevel("all")}
                className={cn(
                  "text-xs",
                  selectedLevel === "all"
                    ? "bg-gold/20 text-gold border-gold/40"
                    : "border-gold/20 text-rice/70 hover:bg-gold/10"
                )}
              >
                全部
              </Button>
              {TEAM_LEVEL_CONFIG.map((config) => (
                <Button
                  key={config.level}
                  size="sm"
                  variant={selectedLevel === config.level ? "default" : "outline"}
                  onClick={() => setSelectedLevel(config.level)}
                  className={cn(
                    "text-xs",
                    selectedLevel === config.level
                      ? "bg-gold/20 text-gold border-gold/40"
                      : "border-gold/20 text-rice/70 hover:bg-gold/10"
                  )}
                >
                  {config.icon} {config.name}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="text-sm text-rice/50">
        共 {filteredTeams.length} 个道场
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <TeamCard
              team={team}
              onJoin={onJoinTeam}
              isJoined={joinedTeamIds.includes(team.id)}
            />
          </motion.div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-rice/20 mx-auto mb-4" />
          <p className="text-rice/40">没有找到符合条件的道场</p>
        </div>
      )}
    </div>
  );
}
