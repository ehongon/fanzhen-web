import { User } from "@/types";

export type TeamType = "gongfa" | "stage" | "region" | "interest";
export type DaoFriendType = "peer" | "master" | "student" | "partner";
export type DaoFriendStatus = "pending" | "accepted" | "blocked";
export type TeamPracticeStatus = "scheduled" | "ongoing" | "completed" | "cancelled";
export type TeamMemberRole = "leader" | "admin" | "member";

export interface TeamMember {
  userId: string;
  role: TeamMemberRole;
  joinedAt: Date;
  contribution: number;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  type: TeamType;
  level: number;
  maxMembers: number;
  currentMembers: number;
  leaderId: string;
  members: TeamMember[];
  createdAt: Date;
  totalPracticeMinutes: number;
  streakDays: number;
  avatar?: string;
  region?: string;
  gongfaId?: string;
  stage?: string;
  interest?: string;
  announcement?: string;
}

export interface DaoFriend {
  id: string;
  userId: string;
  friendId: string;
  type: DaoFriendType;
  status: DaoFriendStatus;
  intimacy: number;
  createdAt: Date;
  lastInteractionAt?: Date;
}

export interface TeamPractice {
  id: string;
  teamId: string;
  gongfaId: string;
  gongfaName: string;
  scheduledTime: Date;
  duration: number;
  participants: string[];
  status: TeamPracticeStatus;
  createdBy: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface TeamChatMessage {
  id: string;
  teamId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

export interface TeamRanking {
  userId: string;
  userName: string;
  userAvatar?: string;
  contribution: number;
  practiceMinutes: number;
  streakDays: number;
}

export const TEAM_TYPE_LABELS: Record<TeamType, string> = {
  gongfa: "功法小组",
  stage: "阶段小组",
  region: "地域小组",
  interest: "兴趣小组",
};

export const TEAM_TYPE_DESCRIPTIONS: Record<TeamType, string> = {
  gongfa: "同练一种功法，共同进步",
  stage: "同处一个修炼阶段，互相扶持",
  region: "同一地区的修行者，线下交流",
  interest: "特定主题修炼，如失眠调理、减压等",
};

export const TEAM_LEVEL_CONFIG = [
  { level: 1, name: "草庐", maxMembers: 5, icon: "🏠", description: "初建道场，三五同修" },
  { level: 2, name: "精舍", maxMembers: 10, icon: "🏡", description: "精修之所，志同道合" },
  { level: 3, name: "道观", maxMembers: 30, icon: "🏯", description: "道法庄严，群贤毕至" },
  { level: 4, name: "仙府", maxMembers: 100, icon: "🏰", description: "仙气缭绕，大道可期" },
  { level: 5, name: "洞天", maxMembers: 500, icon: "⛰️", description: "洞天福地，万法归宗" },
];

export const DAO_FRIEND_TYPE_LABELS: Record<DaoFriendType, string> = {
  peer: "同修",
  master: "师父",
  student: "徒弟",
  partner: "道侣",
};

export const DAO_FRIEND_TYPE_DESCRIPTIONS: Record<DaoFriendType, string> = {
  peer: "一起修炼的伙伴",
  master: "指导修炼的师父",
  student: "跟随学习的徒弟",
  partner: "深度修炼伴侣",
};

export const PRACTICE_MODE_LABELS = {
  sync: "同步修炼",
  async: "异步修炼",
  challenge: "挑战模式",
};

export const PRACTICE_MODE_DESCRIPTIONS = {
  sync: "约定时间一起修炼，实时同步",
  async: "各自修炼，互相监督打卡",
  challenge: "小组挑战目标，共同完成",
};

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

const TEAMS_KEY = "fanzhen_teams";
const DAO_FRIENDS_KEY = "fanzhen_dao_friends";
const TEAM_PRACTICES_KEY = "fanzhen_team_practices";
const TEAM_MESSAGES_KEY = "fanzhen_team_messages";

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;
  try {
    return JSON.parse(data, (k, v) => {
      if (["createdAt", "joinedAt", "scheduledTime", "completedAt", "lastInteractionAt"].includes(k) && v) {
        return new Date(v);
      }
      return v;
    });
  } catch {
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getTeams(): Team[] {
  return getStorageItem<Team[]>(TEAMS_KEY, []);
}

export function saveTeams(teams: Team[]): void {
  setStorageItem(TEAMS_KEY, teams);
}

export function createTeam(teamData: Omit<Team, "id" | "createdAt" | "currentMembers">): Team {
  const teams = getTeams();
  const newTeam: Team = {
    ...teamData,
    id: generateId("team"),
    createdAt: new Date(),
    currentMembers: 1,
  };
  teams.push(newTeam);
  saveTeams(teams);
  return newTeam;
}

export function getTeamById(id: string): Team | undefined {
  const teams = getTeams();
  return teams.find((t) => t.id === id);
}

export function updateTeam(id: string, updates: Partial<Team>): Team | null {
  const teams = getTeams();
  const index = teams.findIndex((t) => t.id === id);
  if (index === -1) return null;
  teams[index] = { ...teams[index], ...updates };
  saveTeams(teams);
  return teams[index];
}

export function deleteTeam(id: string): boolean {
  const teams = getTeams();
  const filtered = teams.filter((t) => t.id !== id);
  if (filtered.length === teams.length) return false;
  saveTeams(filtered);
  return true;
}

export function joinTeam(teamId: string, userId: string): Team | null {
  const team = getTeamById(teamId);
  if (!team) return null;
  if (team.currentMembers >= team.maxMembers) return null;
  if (team.members.some((m) => m.userId === userId)) return null;

  const newMember: TeamMember = {
    userId,
    role: "member",
    joinedAt: new Date(),
    contribution: 0,
  };

  const updatedMembers = [...team.members, newMember];
  return updateTeam(teamId, {
    members: updatedMembers,
    currentMembers: updatedMembers.length,
  });
}

export function leaveTeam(teamId: string, userId: string): Team | null {
  const team = getTeamById(teamId);
  if (!team) return null;
  if (team.leaderId === userId) return null;

  const updatedMembers = team.members.filter((m) => m.userId !== userId);
  return updateTeam(teamId, {
    members: updatedMembers,
    currentMembers: updatedMembers.length,
  });
}

export function getDaoFriends(): DaoFriend[] {
  return getStorageItem<DaoFriend[]>(DAO_FRIENDS_KEY, []);
}

export function saveDaoFriends(friends: DaoFriend[]): void {
  setStorageItem(DAO_FRIENDS_KEY, friends);
}

export function addDaoFriend(friendData: Omit<DaoFriend, "id" | "createdAt" | "intimacy">): DaoFriend {
  const friends = getDaoFriends();
  const newFriend: DaoFriend = {
    ...friendData,
    id: generateId("friend"),
    createdAt: new Date(),
    intimacy: 0,
  };
  friends.push(newFriend);
  saveDaoFriends(friends);
  return newFriend;
}

export function updateDaoFriend(id: string, updates: Partial<DaoFriend>): DaoFriend | null {
  const friends = getDaoFriends();
  const index = friends.findIndex((f) => f.id === id);
  if (index === -1) return null;
  friends[index] = { ...friends[index], ...updates };
  saveDaoFriends(friends);
  return friends[index];
}

export function removeDaoFriend(id: string): boolean {
  const friends = getDaoFriends();
  const filtered = friends.filter((f) => f.id !== id);
  if (filtered.length === friends.length) return false;
  saveDaoFriends(filtered);
  return true;
}

export function getTeamPractices(): TeamPractice[] {
  return getStorageItem<TeamPractice[]>(TEAM_PRACTICES_KEY, []);
}

export function saveTeamPractices(practices: TeamPractice[]): void {
  setStorageItem(TEAM_PRACTICES_KEY, practices);
}

export function createTeamPractice(practiceData: Omit<TeamPractice, "id" | "createdAt">): TeamPractice {
  const practices = getTeamPractices();
  const newPractice: TeamPractice = {
    ...practiceData,
    id: generateId("practice"),
    createdAt: new Date(),
  };
  practices.push(newPractice);
  saveTeamPractices(practices);
  return newPractice;
}

export function updateTeamPractice(id: string, updates: Partial<TeamPractice>): TeamPractice | null {
  const practices = getTeamPractices();
  const index = practices.findIndex((p) => p.id === id);
  if (index === -1) return null;
  practices[index] = { ...practices[index], ...updates };
  saveTeamPractices(practices);
  return practices[index];
}

export function getTeamMessages(teamId: string): TeamChatMessage[] {
  const messages = getStorageItem<TeamChatMessage[]>(TEAM_MESSAGES_KEY, []);
  return messages.filter((m) => m.teamId === teamId);
}

export function saveTeamMessage(message: Omit<TeamChatMessage, "id" | "createdAt">): TeamChatMessage {
  const messages = getStorageItem<TeamChatMessage[]>(TEAM_MESSAGES_KEY, []);
  const newMessage: TeamChatMessage = {
    ...message,
    id: generateId("msg"),
    createdAt: new Date(),
  };
  messages.push(newMessage);
  setStorageItem(TEAM_MESSAGES_KEY, messages);
  return newMessage;
}

export function getTeamRankings(teamId: string): TeamRanking[] {
  const team = getTeamById(teamId);
  if (!team) return [];

  return team.members
    .map((member) => ({
      userId: member.userId,
      userName: `用户${member.userId.slice(-4)}`,
      contribution: member.contribution,
      practiceMinutes: Math.floor(member.contribution * 10 + Math.random() * 100),
      streakDays: Math.floor(Math.random() * 30),
    }))
    .sort((a, b) => b.contribution - a.contribution);
}

export const MOCK_TEAMS: Team[] = [
  {
    id: "team_001",
    name: "八段锦同修会",
    description: "一起练习八段锦，强身健体，修身养性。每日晨练打卡，互相督促。",
    type: "gongfa",
    level: 2,
    maxMembers: 10,
    currentMembers: 6,
    leaderId: "user_001",
    members: [
      { userId: "user_001", role: "leader", joinedAt: new Date("2024-01-01"), contribution: 1200 },
      { userId: "user_002", role: "admin", joinedAt: new Date("2024-01-05"), contribution: 800 },
      { userId: "user_003", role: "member", joinedAt: new Date("2024-01-10"), contribution: 500 },
      { userId: "user_004", role: "member", joinedAt: new Date("2024-02-01"), contribution: 300 },
      { userId: "user_005", role: "member", joinedAt: new Date("2024-02-15"), contribution: 200 },
      { userId: "user_006", role: "member", joinedAt: new Date("2024-03-01"), contribution: 100 },
    ],
    createdAt: new Date("2024-01-01"),
    totalPracticeMinutes: 3100,
    streakDays: 15,
    gongfaId: "baduanjin",
    announcement: "本周目标：每日练习八段锦至少20分钟，周末进行小组分享。",
  },
  {
    id: "team_002",
    name: "炼气期互助组",
    description: "处于炼气阶段的修行者聚集地，分享修炼心得，解答疑惑。",
    type: "stage",
    level: 3,
    maxMembers: 30,
    currentMembers: 18,
    leaderId: "user_007",
    members: [
      { userId: "user_007", role: "leader", joinedAt: new Date("2024-01-01"), contribution: 2000 },
      { userId: "user_008", role: "admin", joinedAt: new Date("2024-01-03"), contribution: 1500 },
      { userId: "user_009", role: "member", joinedAt: new Date("2024-01-08"), contribution: 900 },
    ],
    createdAt: new Date("2024-01-01"),
    totalPracticeMinutes: 8000,
    streakDays: 30,
    stage: "lianqi",
  },
  {
    id: "team_003",
    name: "北京修行者联盟",
    description: "北京地区修行者线下交流，定期组织集体修炼活动。",
    type: "region",
    level: 2,
    maxMembers: 10,
    currentMembers: 8,
    leaderId: "user_010",
    members: [
      { userId: "user_010", role: "leader", joinedAt: new Date("2024-02-01"), contribution: 600 },
      { userId: "user_011", role: "member", joinedAt: new Date("2024-02-05"), contribution: 400 },
    ],
    createdAt: new Date("2024-02-01"),
    totalPracticeMinutes: 2000,
    streakDays: 7,
    region: "北京",
  },
  {
    id: "team_004",
    name: "失眠调理互助组",
    description: "通过修炼改善睡眠质量，分享调理经验和方法。",
    type: "interest",
    level: 1,
    maxMembers: 5,
    currentMembers: 4,
    leaderId: "user_012",
    members: [
      { userId: "user_012", role: "leader", joinedAt: new Date("2024-03-01"), contribution: 300 },
      { userId: "user_013", role: "member", joinedAt: new Date("2024-03-05"), contribution: 150 },
    ],
    createdAt: new Date("2024-03-01"),
    totalPracticeMinutes: 800,
    streakDays: 5,
    interest: "失眠调理",
  },
];

export const MOCK_DAO_FRIENDS: DaoFriend[] = [
  {
    id: "friend_001",
    userId: "current_user",
    friendId: "user_001",
    type: "peer",
    status: "accepted",
    intimacy: 85,
    createdAt: new Date("2024-01-01"),
    lastInteractionAt: new Date("2024-03-15"),
  },
  {
    id: "friend_002",
    userId: "current_user",
    friendId: "user_002",
    type: "master",
    status: "accepted",
    intimacy: 92,
    createdAt: new Date("2024-01-10"),
    lastInteractionAt: new Date("2024-03-14"),
  },
  {
    id: "friend_003",
    userId: "current_user",
    friendId: "user_003",
    type: "peer",
    status: "pending",
    intimacy: 10,
    createdAt: new Date("2024-03-10"),
  },
];

export const MOCK_PRACTICES: TeamPractice[] = [
  {
    id: "practice_001",
    teamId: "team_001",
    gongfaId: "baduanjin",
    gongfaName: "八段锦",
    scheduledTime: new Date(Date.now() + 3600000),
    duration: 30,
    participants: ["user_001", "user_002", "user_003"],
    status: "scheduled",
    createdBy: "user_001",
    createdAt: new Date(),
  },
  {
    id: "practice_002",
    teamId: "team_001",
    gongfaId: "baduanjin",
    gongfaName: "八段锦",
    scheduledTime: new Date(Date.now() - 86400000),
    duration: 30,
    participants: ["user_001", "user_002"],
    status: "completed",
    createdBy: "user_002",
    createdAt: new Date(Date.now() - 172800000),
    completedAt: new Date(Date.now() - 86400000),
  },
];

export function initializeMockData(): void {
  if (typeof window === "undefined") return;
  const teams = getTeams();
  if (teams.length === 0) {
    saveTeams(MOCK_TEAMS);
    saveDaoFriends(MOCK_DAO_FRIENDS);
    saveTeamPractices(MOCK_PRACTICES);
  }
}

export function getTeamLevelConfig(level: number) {
  return TEAM_LEVEL_CONFIG[level - 1] || TEAM_LEVEL_CONFIG[0];
}

export function getTeamTypeLabel(type: TeamType): string {
  return TEAM_TYPE_LABELS[type] || type;
}

export function getDaoFriendTypeLabel(type: DaoFriendType): string {
  return DAO_FRIEND_TYPE_LABELS[type] || type;
}

export function calculateTeamBonus(memberCount: number): number {
  if (memberCount >= 10) return 0.5;
  if (memberCount >= 5) return 0.3;
  if (memberCount >= 3) return 0.2;
  if (memberCount >= 2) return 0.1;
  return 0;
}

export function formatContribution(contribution: number): string {
  if (contribution >= 1000) {
    return `${(contribution / 1000).toFixed(1)}k`;
  }
  return contribution.toString();
}
