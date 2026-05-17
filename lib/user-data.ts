import { User } from "@/types";

export interface UserWithPassword extends User {
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const USERS_KEY = "fanzhen_users";
const CURRENT_USER_KEY = "fanzhen_current_user";

function getUsers(): UserWithPassword[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USERS_KEY);
  if (!data) return [];
  try {
    const users = JSON.parse(data);
    return users.map((u: any) => ({
      ...u,
      createdAt: new Date(u.createdAt),
      updatedAt: new Date(u.updatedAt),
      resetTokenExpiry: u.resetTokenExpiry ? new Date(u.resetTokenExpiry) : undefined,
    }));
  } catch {
    return [];
  }
}

function saveUsers(users: UserWithPassword[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function createUser(userData: Omit<UserWithPassword, "id" | "createdAt" | "updatedAt">): UserWithPassword {
  const users = getUsers();
  const now = new Date();
  const newUser: UserWithPassword = {
    ...userData,
    id: generateUserId(),
    createdAt: now,
    updatedAt: now,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function findUserByEmail(email: string): UserWithPassword | undefined {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): UserWithPassword | undefined {
  const users = getUsers();
  return users.find((u) => u.id === id);
}

export function updateUser(id: string, updates: Partial<UserWithPassword>): UserWithPassword | null {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates, updatedAt: new Date() };
  saveUsers(users);
  return users[index];
}

export function setResetToken(email: string, token: string, expiry: Date): boolean {
  const users = getUsers();
  const index = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (index === -1) return false;
  users[index].resetToken = token;
  users[index].resetTokenExpiry = expiry;
  users[index].updatedAt = new Date();
  saveUsers(users);
  return true;
}

export function findUserByResetToken(token: string): UserWithPassword | undefined {
  const users = getUsers();
  return users.find((u) => u.resetToken === token && u.resetTokenExpiry && u.resetTokenExpiry > new Date());
}

export function clearResetToken(id: string): void {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    delete users[index].resetToken;
    delete users[index].resetTokenExpiry;
    users[index].updatedAt = new Date();
    saveUsers(users);
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(CURRENT_USER_KEY);
  if (!data) return null;
  try {
    const user = JSON.parse(data);
    return {
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function generateUserId(): string {
  return "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
}

export function userToSafeUser(user: UserWithPassword): User {
  const { password, resetToken, resetTokenExpiry, ...safeUser } = user;
  return safeUser;
}
