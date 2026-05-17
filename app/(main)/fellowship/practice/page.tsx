"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Plus, Clock, Zap, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PracticeTogether from "@/components/team/practice-together";
import {
  TeamPractice,
  Team,
  getTeamPractices,
  getTeams,
  createTeamPractice,
  initializeMockData,
} from "@/lib/team-data";
import { getCurrentUser } from "@/lib/user-data";
import { cn } from "@/lib/utils";

export default function FellowshipPracticePage() {
  const [practices, setPractices] = useState<TeamPractice[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [gongfaName, setGongfaName] = useState("");
  const [duration, setDuration] = useState(30);
  const [scheduledTime, setScheduledTime] = useState("");

  useEffect(() => {
    initializeMockData();
    const user = getCurrentUser();
    const userId = user?.id || "current_user";
    setCurrentUserId(userId);

    const allPractices = getTeamPractices();
    setPractices(allPractices);

    const allTeams = getTeams();
    const myTeams = allTeams.filter((t) =>
      t.members.some((m) => m.userId === userId)
    );
    setTeams(myTeams);
    if (myTeams.length > 0) {
      setSelectedTeamId(myTeams[0].id);
    }
  }, []);

  const handleCreatePractice = () => {
    if (!selectedTeamId || !gongfaName.trim() || !scheduledTime) return;

    const newPractice = createTeamPractice({
      teamId: selectedTeamId,
      gongfaId: gongfaName.toLowerCase().replace(/\s/g, "_"),
      gongfaName: gongfaName.trim(),
      scheduledTime: new Date(scheduledTime),
      duration,
      participants: [currentUserId],
      status: "scheduled",
      createdBy: currentUserId,
    });

    setPractices((prev) => [...prev, newPractice]);
    setShowCreateModal(false);
    setGongfaName("");
    setDuration(30);
    setScheduledTime("");
  };

  const upcomingPractices = practices
    .filter((p) => p.status === "scheduled")
    .sort(
      (a, b) =>
        new Date(a.scheduledTime).getTime() -
        new Date(b.scheduledTime).getTime()
    );

  const ongoingPractices = practices.filter((p) => p.status === "ongoing");
  const completedPractices = practices.filter((p) => p.status === "completed");

  const myPracticeIds = new Set(
    practices
      .filter((p) => p.participants.includes(currentUserId))
      .map((p) => p.id)
  );

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
            className="inline-flex items-center text-rice/60 hover:text-red-400 transition-colors"
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
              <h1 className="text-3xl font-bold text-rice mb-2">组队修炼</h1>
              <p className="text-rice/60">与道友同步修炼，获得经验加成</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-red-400/20 hover:bg-red-400/30 text-red-400 border border-red-400/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              发起修炼
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "即将开始",
              value: upcomingPractices.length,
              icon: Calendar,
              color: "text-blue-400",
            },
            {
              label: "进行中",
              value: ongoingPractices.length,
              icon: Clock,
              color: "text-red-400",
            },
            {
              label: "已完成",
              value: completedPractices.length,
              icon: Zap,
              color: "text-emerald-400",
            },
            {
              label: "我参与的",
              value: myPracticeIds.size,
              icon: Users,
              color: "text-purple-400",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-red-400/20 bg-gradient-to-br from-red-950/30 to-transparent p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-400/10 flex items-center justify-center">
                    <Icon className={cn("w-5 h-5", stat.color)} />
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

        {ongoingPractices.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-rice mb-4">正在进行</h2>
            <div className="space-y-4">
              {ongoingPractices.map((practice) => (
                <PracticeTogether
                  key={practice.id}
                  practice={practice}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          </motion.div>
        )}

        {upcomingPractices.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-rice mb-4">即将开始</h2>
            <div className="space-y-4">
              {upcomingPractices.map((practice) => (
                <PracticeTogether
                  key={practice.id}
                  practice={practice}
                  currentUserId={currentUserId}
                  onJoin={() => {
                    // Handle join
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {ongoingPractices.length === 0 && upcomingPractices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Users className="w-16 h-16 text-rice/20 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-rice mb-2">
              暂无组队修炼
            </h2>
            <p className="text-rice/40 mb-6">发起或加入一场组队修炼吧</p>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-red-400/20 hover:bg-red-400/30 text-red-400 border border-red-400/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              发起修炼
            </Button>
          </motion.div>
        )}

        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg mx-4 rounded-xl border border-red-400/20 bg-ink p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-rice mb-4">
                发起组队修炼
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-rice/60 mb-2">
                    选择道场
                  </label>
                  <select
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    className="w-full rounded-md border border-red-400/20 bg-ink/50 text-rice px-3 py-2"
                  >
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-rice/60 mb-2">
                    功法名称
                  </label>
                  <Input
                    value={gongfaName}
                    onChange={(e) => setGongfaName(e.target.value)}
                    placeholder="例如：八段锦、太极拳..."
                    className="bg-ink/50 border-red-400/20 text-rice placeholder:text-rice/40"
                  />
                </div>

                <div>
                  <label className="block text-sm text-rice/60 mb-2">
                    修炼时长（分钟）
                  </label>
                  <div className="flex gap-2">
                    {[15, 30, 45, 60].map((min) => (
                      <button
                        key={min}
                        onClick={() => setDuration(min)}
                        className={cn(
                          "flex-1 py-2 rounded-lg border text-sm transition-all",
                          duration === min
                            ? "border-red-400/40 bg-red-400/10 text-red-400"
                            : "border-red-400/10 text-rice/70 hover:border-red-400/30"
                        )}
                      >
                        {min}分钟
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-rice/60 mb-2">
                    开始时间
                  </label>
                  <Input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="bg-ink/50 border-red-400/20 text-rice"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-400/5 border border-red-400/20">
                  <Zap className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-rice/70">
                    组队修炼可获得 10%-50% 经验加成
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 border-red-400/20 text-rice hover:bg-red-400/10"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleCreatePractice}
                    disabled={!selectedTeamId || !gongfaName.trim() || !scheduledTime}
                    className="flex-1 bg-red-400/20 hover:bg-red-400/30 text-red-400 border border-red-400/30 disabled:opacity-50"
                  >
                    创建修炼
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
