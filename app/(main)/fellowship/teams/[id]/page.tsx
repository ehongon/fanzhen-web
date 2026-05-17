"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TeamDetail from "@/components/team/team-detail";
import PracticeTogether from "@/components/team/practice-together";
import {
  Team,
  TeamPractice,
  getTeamById,
  getTeamPractices,
  joinTeam,
  leaveTeam,
  initializeMockData,
} from "@/lib/team-data";
import { getCurrentUser } from "@/lib/user-data";
import { cn } from "@/lib/utils";

export default function FellowshipTeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.id as string;

  const [team, setTeam] = useState<Team | null>(null);
  const [practices, setPractices] = useState<TeamPractice[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"info" | "practice">("info");

  useEffect(() => {
    initializeMockData();
    const user = getCurrentUser();
    const userId = user?.id || "current_user";
    setCurrentUserId(userId);

    const loadedTeam = getTeamById(teamId);
    if (loadedTeam) {
      setTeam(loadedTeam);
      const allPractices = getTeamPractices();
      setPractices(allPractices.filter((p) => p.teamId === teamId));
    }
  }, [teamId]);

  const handleJoin = () => {
    const updated = joinTeam(teamId, currentUserId);
    if (updated) {
      setTeam(updated);
    }
  };

  const handleLeave = () => {
    const updated = leaveTeam(teamId, currentUserId);
    if (updated) {
      setTeam(updated);
    }
  };

  if (!team) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="text-rice/60">道场不存在</div>
      </div>
    );
  }

  const upcomingPractices = practices.filter((p) => p.status === "scheduled");
  const ongoingPractices = practices.filter((p) => p.status === "ongoing");

  return (
    <div className="min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Link
            href="/fellowship/teams"
            className="inline-flex items-center text-rice/60 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回道场广场
          </Link>
        </motion.div>

        <div className="flex gap-2 mb-6 border-b border-teal-400/10">
          <button
            onClick={() => setActiveTab("info")}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2",
              activeTab === "info"
                ? "text-teal-400 border-teal-400"
                : "text-rice/50 border-transparent hover:text-rice/80"
            )}
          >
            <Users className="w-4 h-4" />
            道场信息
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2",
              activeTab === "practice"
                ? "text-teal-400 border-teal-400"
                : "text-rice/50 border-transparent hover:text-rice/80"
            )}
          >
            <Calendar className="w-4 h-4" />
            组队修炼
            {upcomingPractices.length > 0 && (
              <Badge className="bg-teal-400/20 text-teal-400 text-xs">
                {upcomingPractices.length}
              </Badge>
            )}
          </button>
        </div>

        {activeTab === "info" && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TeamDetail
              team={team}
              currentUserId={currentUserId}
              onJoin={handleJoin}
              onLeave={handleLeave}
            />
          </motion.div>
        )}

        {activeTab === "practice" && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {ongoingPractices.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-rice mb-4">正在进行</h2>
                {ongoingPractices.map((practice) => (
                  <PracticeTogether
                    key={practice.id}
                    practice={practice}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}

            {upcomingPractices.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-rice mb-4">即将开始</h2>
                {upcomingPractices.map((practice) => (
                  <PracticeTogether
                    key={practice.id}
                    practice={practice}
                    currentUserId={currentUserId}
                    onJoin={() => {
                      // Handle join practice
                    }}
                  />
                ))}
              </div>
            )}

            {ongoingPractices.length === 0 && upcomingPractices.length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-rice/20 mx-auto mb-4" />
                <p className="text-rice/40 mb-4">暂无组队修炼活动</p>
                <Button className="bg-teal-400/20 hover:bg-teal-400/30 text-teal-400 border border-teal-400/30">
                  发起修炼
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
