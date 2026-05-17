import { getDB, generateId } from "./db";
import type { User } from "@/types";
import {
  isVercelEnvironment,
  createUserInMemory,
  findUserByEmailInMemory,
  findUserByIdInMemory,
  updateUserInMemory,
} from "./vercel-storage";

export interface UserWithPassword extends User {
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

export async function createUser(
  userData: Omit<UserWithPassword, "id" | "createdAt" | "updatedAt">
): Promise<UserWithPassword> {
  // Vercel 环境使用内存存储
  if (isVercelEnvironment()) {
    return createUserInMemory(userData);
  }

  const db = await getDB();
  const id = generateId();
  const now = new Date().toISOString();

  db.run(
    `
    INSERT INTO users (id, email, name, password, avatar, role, status, current_stage, current_level, constitution, total_exp, streak_days, max_streak_days, total_practice_days, total_practice_minutes, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      id,
      userData.email,
      userData.name,
      userData.password,
      userData.avatar || null,
      userData.role || "user",
      userData.status || "active",
      userData.currentStage || "lianxing",
      userData.currentLevel || 1,
      userData.constitution || null,
      userData.totalExp || 0,
      userData.streakDays || 0,
      userData.maxStreakDays || 0,
      userData.totalPracticeDays || 0,
      userData.totalPracticeMinutes || 0,
      now,
      now
    ]
  );

  const user = await findUserById(id);
  if (!user) throw new Error("创建用户失败");

  db.run(
    `
    INSERT INTO user_settings (id, user_id, daily_goal, reminder_time, theme, font_size, privacy_practice, privacy_diary, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [generateId(), id, 30, null, "light", "medium", 0, 0, now, now]
  );

  return user;
}

export async function findUserByEmail(email: string): Promise<UserWithPassword | undefined> {
  // Vercel 环境使用内存存储
  if (isVercelEnvironment()) {
    return findUserByEmailInMemory(email);
  }

  const db = await getDB();
  const stmt = db.prepare("SELECT * FROM users WHERE email = ? COLLATE NOCASE");
  stmt.bind([email]);
  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();

  if (!row) return undefined;
  return rowToUser(row);
}

export async function findUserById(id: string): Promise<UserWithPassword | undefined> {
  // Vercel 环境使用内存存储
  if (isVercelEnvironment()) {
    return findUserByIdInMemory(id);
  }

  const db = await getDB();
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  stmt.bind([id]);
  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();

  if (!row) return undefined;
  return rowToUser(row);
}

export async function updateUser(
  id: string,
  updates: Partial<UserWithPassword>
): Promise<UserWithPassword | undefined> {
  // Vercel 环境使用内存存储
  if (isVercelEnvironment()) {
    return updateUserInMemory(id, updates);
  }

  const db = await getDB();
  const sets: string[] = [];
  const values: any[] = [];

  Object.entries(updates).forEach(([key, value]) => {
    sets.push(`${key} = ?`);
    values.push(value);
  });

  if (sets.length === 0) return findUserById(id);

  values.push(id);
  db.run(`UPDATE users SET ${sets.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values);

  return findUserById(id);
}

function rowToUser(row: any): UserWithPassword {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    password: row.password,
    avatar: row.avatar,
    role: row.role,
    status: row.status,
    currentStage: row.current_stage,
    currentLevel: row.current_level,
    constitution: row.constitution,
    totalExp: row.total_exp,
    streakDays: row.streak_days,
    maxStreakDays: row.max_streak_days,
    totalPracticeDays: row.total_practice_days,
    totalPracticeMinutes: row.total_practice_minutes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
