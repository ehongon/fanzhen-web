// Vercel 无服务器环境下的内存存储
// 由于 Vercel 是 Stateless 环境，SQLite 文件无法持久化
// 使用内存存储 + 导出/导入功能来保持数据

import type { User } from "@/types";
import { UserWithPassword } from "./db-user-data";

// 内存中的用户存储
const memoryUsers: Map<string, UserWithPassword> = new Map();
const memoryUsersByEmail: Map<string, string> = new Map(); // email -> id

export function isVercelEnvironment(): boolean {
  return !!process.env.VERCEL;
}

// 创建用户（内存存储）
export function createUserInMemory(userData: Omit<UserWithPassword, "id" | "createdAt" | "updatedAt">): UserWithPassword {
  const id = "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
  const now = new Date().toISOString();

  const user: UserWithPassword = {
    id,
    email: userData.email,
    name: userData.name,
    password: userData.password,
    avatar: userData.avatar || undefined,
    role: userData.role || "user",
    status: userData.status || "active",
    currentStage: userData.currentStage || "lianxing",
    currentLevel: userData.currentLevel || 1,
    constitution: userData.constitution || undefined,
    totalExp: userData.totalExp || 0,
    streakDays: userData.streakDays || 0,
    maxStreakDays: userData.maxStreakDays || 0,
    totalPracticeDays: userData.totalPracticeDays || 0,
    totalPracticeMinutes: userData.totalPracticeMinutes || 0,
    createdAt: new Date(now),
    updatedAt: new Date(now),
  };

  memoryUsers.set(id, user);
  memoryUsersByEmail.set(userData.email.toLowerCase(), id);

  return user;
}

// 通过邮箱查找用户
export function findUserByEmailInMemory(email: string): UserWithPassword | undefined {
  const userId = memoryUsersByEmail.get(email.toLowerCase());
  if (!userId) return undefined;
  return memoryUsers.get(userId);
}

// 通过ID查找用户
export function findUserByIdInMemory(id: string): UserWithPassword | undefined {
  return memoryUsers.get(id);
}

// 更新用户
export function updateUserInMemory(id: string, updates: Partial<UserWithPassword>): UserWithPassword | undefined {
  const user = memoryUsers.get(id);
  if (!user) return undefined;

  const updated = { ...user, ...updates, updatedAt: new Date() };
  memoryUsers.set(id, updated);

  // 如果邮箱变更，更新索引
  if (updates.email && updates.email !== user.email) {
    memoryUsersByEmail.delete(user.email.toLowerCase());
    memoryUsersByEmail.set(updates.email.toLowerCase(), id);
  }

  return updated;
}

// 获取所有用户（用于导出）
export function getAllUsersInMemory(): UserWithPassword[] {
  return Array.from(memoryUsers.values());
}

// 导出用户数据为 JSON
export function exportUsersToJSON(): string {
  const users = getAllUsersInMemory();
  return JSON.stringify(users, null, 2);
}

// 从 JSON 导入用户数据
export function importUsersFromJSON(json: string): void {
  try {
    const users: UserWithPassword[] = JSON.parse(json);
    users.forEach((user) => {
      memoryUsers.set(user.id, user);
      memoryUsersByEmail.set(user.email.toLowerCase(), user.id);
    });
  } catch {
    // 忽略解析错误
  }
}

// 获取用户数量
export function getUserCountInMemory(): number {
  return memoryUsers.size;
}
