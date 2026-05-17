"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Users, Heart, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DaoFriendCard from "@/components/team/dao-friend-card";
import {
  DaoFriend,
  DaoFriendType,
  DaoFriendStatus,
  getDaoFriends,
  updateDaoFriend,
  removeDaoFriend,
  DAO_FRIEND_TYPE_LABELS,
  initializeMockData,
} from "@/lib/team-data";
import { getCurrentUser } from "@/lib/user-data";
import { cn } from "@/lib/utils";

export default function FellowshipFriendsPage() {
  const [friends, setFriends] = useState<DaoFriend[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<DaoFriendType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<DaoFriendStatus | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFriendId, setNewFriendId] = useState("");
  const [newFriendType, setNewFriendType] = useState<DaoFriendType>("peer");

  useEffect(() => {
    initializeMockData();
    const user = getCurrentUser();
    const userId = user?.id || "current_user";
    setCurrentUserId(userId);
    setFriends(getDaoFriends().filter((f) => f.userId === userId));
  }, []);

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch =
      !searchQuery ||
      friend.friendId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || friend.type === selectedType;
    const matchesStatus = selectedStatus === "all" || friend.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const acceptedFriends = filteredFriends.filter((f) => f.status === "accepted");
  const pendingFriends = filteredFriends.filter((f) => f.status === "pending");

  const handleAccept = (friendId: string) => {
    updateDaoFriend(friendId, { status: "accepted" });
    setFriends(getDaoFriends().filter((f) => f.userId === currentUserId));
  };

  const handleReject = (friendId: string) => {
    removeDaoFriend(friendId);
    setFriends(getDaoFriends().filter((f) => f.userId === currentUserId));
  };

  const handleAddFriend = () => {
    if (!newFriendId.trim()) return;
    setNewFriendId("");
    setShowAddModal(false);
  };

  const friendTypes: (DaoFriendType | "all")[] = ["all", "peer", "master", "student", "partner"];
  const friendStatuses: (DaoFriendStatus | "all")[] = ["all", "accepted", "pending"];

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
            className="inline-flex items-center text-rice/60 hover:text-amber-400 transition-colors"
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
              <h1 className="text-3xl font-bold text-rice mb-2">我的道友</h1>
              <p className="text-rice/60">结交同修，互相督促，共同进步</p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-400 border border-amber-400/30"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              添加道友
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "道友总数", value: friends.length, icon: Users },
            { label: "已结交", value: acceptedFriends.length, icon: Heart },
            { label: "待确认", value: pendingFriends.length, icon: Filter },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-amber-950/30 to-transparent p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-400" />
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

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rice/40" />
            <Input
              placeholder="搜索道友..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-ink/50 border-amber-400/20 text-rice placeholder:text-rice/40"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {friendTypes.map((type) => (
              <Button
                key={type}
                size="sm"
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "text-xs",
                  selectedType === type
                    ? "bg-amber-400/20 text-amber-400 border-amber-400/40"
                    : "border-amber-400/20 text-rice/70 hover:bg-amber-400/10"
                )}
              >
                {type === "all" ? "全部" : DAO_FRIEND_TYPE_LABELS[type]}
              </Button>
            ))}
          </div>
        </div>

        {pendingFriends.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold text-rice mb-4">待确认</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingFriends.map((friend) => (
                <DaoFriendCard
                  key={friend.id}
                  friend={friend}
                  onAccept={handleAccept}
                  onReject={handleReject}
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
          <h2 className="text-lg font-bold text-rice mb-4">
            {selectedStatus === "pending" ? "待确认" : "已结交"}
          </h2>
          {acceptedFriends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {acceptedFriends.map((friend) => (
                <DaoFriendCard
                  key={friend.id}
                  friend={friend}
                  onInteract={() => {
                    // Handle interact
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-rice/20 mx-auto mb-4" />
              <p className="text-rice/40">还没有道友，快去结交吧</p>
            </div>
          )}
        </motion.div>

        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md mx-4 rounded-xl border border-amber-400/20 bg-ink p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-rice mb-4">添加道友</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-rice/60 mb-2">
                    道友ID
                  </label>
                  <Input
                    value={newFriendId}
                    onChange={(e) => setNewFriendId(e.target.value)}
                    placeholder="输入道友ID..."
                    className="bg-ink/50 border-amber-400/20 text-rice placeholder:text-rice/40"
                  />
                </div>
                <div>
                  <label className="block text-sm text-rice/60 mb-2">
                    关系类型
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["peer", "master", "student", "partner"] as DaoFriendType[]).map(
                      (type) => (
                        <button
                          key={type}
                          onClick={() => setNewFriendType(type)}
                          className={cn(
                            "p-3 rounded-lg border text-sm transition-all",
                            newFriendType === type
                              ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                              : "border-amber-400/10 text-rice/70 hover:border-amber-400/30"
                          )}
                        >
                          {DAO_FRIEND_TYPE_LABELS[type]}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 border-amber-400/20 text-rice hover:bg-amber-400/10"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleAddFriend}
                    disabled={!newFriendId.trim()}
                    className="flex-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-400 border border-amber-400/30 disabled:opacity-50"
                  >
                    发送请求
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
