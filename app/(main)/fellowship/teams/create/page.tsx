"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Users, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  TeamType,
  TEAM_TYPE_LABELS,
  TEAM_TYPE_DESCRIPTIONS,
  TEAM_LEVEL_CONFIG,
  createTeam,
} from "@/lib/team-data";
import { getCurrentUser } from "@/lib/user-data";
import { cn } from "@/lib/utils";

export default function FellowshipCreateTeamPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState<TeamType>("gongfa");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teamTypes: TeamType[] = ["gongfa", "stage", "region", "interest"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    setIsSubmitting(true);
    const user = getCurrentUser();
    const userId = user?.id || "current_user";

    const levelConfig = TEAM_LEVEL_CONFIG[selectedLevel - 1];

    const newTeam = createTeam({
      name: name.trim(),
      description: description.trim(),
      type: selectedType,
      level: selectedLevel,
      maxMembers: levelConfig.maxMembers,
      leaderId: userId,
      members: [
        {
          userId,
          role: "leader",
          joinedAt: new Date(),
          contribution: 0,
        },
      ],
      totalPracticeMinutes: 0,
      streakDays: 0,
    });

    setIsSubmitting(false);
    router.push(`/fellowship/teams/${newTeam.id}`);
  };

  return (
    <div className="min-h-screen bg-ink">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-teal-400/20 bg-gradient-to-br from-teal-950/30 to-transparent p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-teal-400/10 flex items-center justify-center">
              <Plus className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-rice">创建道场</h1>
              <p className="text-sm text-rice/60">
                组建你的修炼小组，邀请道友共同进步
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-rice mb-2">
                道场名称
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="给你的道场起个名字"
                className="bg-ink/50 border-teal-400/20 text-rice placeholder:text-rice/40"
                maxLength={30}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-rice mb-2">
                道场描述
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="描述一下你的道场宗旨和修炼目标..."
                className="bg-ink/50 border-teal-400/20 text-rice placeholder:text-rice/40 min-h-[100px]"
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-rice mb-3">
                道场类型
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {teamTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "p-4 rounded-lg border text-left transition-all",
                      selectedType === type
                        ? "border-teal-400/40 bg-teal-400/10"
                        : "border-teal-400/10 bg-ink/40 hover:border-teal-400/30"
                    )}
                  >
                    <div className="text-sm font-medium text-rice mb-1">
                      {TEAM_TYPE_LABELS[type]}
                    </div>
                    <div className="text-xs text-rice/50">
                      {TEAM_TYPE_DESCRIPTIONS[type]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-rice mb-3">
                道场等级
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {TEAM_LEVEL_CONFIG.map((config) => (
                  <button
                    key={config.level}
                    type="button"
                    onClick={() => setSelectedLevel(config.level)}
                    className={cn(
                      "p-4 rounded-lg border text-center transition-all",
                      selectedLevel === config.level
                        ? "border-teal-400/40 bg-teal-400/10"
                        : "border-teal-400/10 bg-ink/40 hover:border-teal-400/30"
                    )}
                  >
                    <div className="text-2xl mb-1">{config.icon}</div>
                    <div className="text-sm font-medium text-rice">
                      {config.name}
                    </div>
                    <div className="text-xs text-rice/50">
                      {config.maxMembers}人
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-rice/40 mt-2">
                {TEAM_LEVEL_CONFIG[selectedLevel - 1].description}
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-teal-400/5 border border-teal-400/20">
              <Info className="w-5 h-5 text-teal-400 shrink-0" />
              <div className="text-sm text-rice/70">
                创建道场后，你将成为组长，可以管理成员、发布公告和组织修炼活动。
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/fellowship/teams")}
                className="flex-1 border-teal-400/20 text-rice hover:bg-teal-400/10"
              >
                取消
              </Button>
              <Button
                type="submit"
                disabled={!name.trim() || !description.trim() || isSubmitting}
                className="flex-1 bg-teal-400/20 hover:bg-teal-400/30 text-teal-400 border border-teal-400/30 disabled:opacity-50"
              >
                {isSubmitting ? "创建中..." : "创建道场"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
