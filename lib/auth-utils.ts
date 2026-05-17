import type { User } from "@/types";
import { UserWithPassword, findUserById } from "./db-user-data";

export function userToSafeUser(user: UserWithPassword): User {
  const { password, resetToken, resetTokenExpiry, ...safeUser } = user;
  return safeUser;
}

const JWT_SECRET = "fanzhen-secret-key-2024-zhixiu";
const TOKEN_EXPIRY = "7d";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + JWT_SECRET);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === hashedPassword;
}

export function generateToken(user: User): string {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 7 * 24 * 60 * 60;
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    iat: now,
    exp,
  };
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(
    encodedHeader + "." + encodedPayload + JWT_SECRET
  );
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;
    const expectedSignature = btoa(parts[0] + "." + parts[1] + JWT_SECRET);
    if (parts[2] !== expectedSignature) return null;
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

export function generateResetToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: "密码至少需要8位字符" };
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasLetter || !hasNumber) {
    return { valid: false, message: "密码必须同时包含字母和数字" };
  }
  return { valid: true, message: "" };
}

export function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const levels = [
    { label: "太弱", color: "#dc2626" },
    { label: "弱", color: "#ea580c" },
    { label: "一般", color: "#ca8a04" },
    { label: "良好", color: "#65a30d" },
    { label: "强", color: "#16a34a" },
    { label: "极强", color: "#15803d" },
  ];

  return { score, ...levels[score] };
}

export async function authenticateUser(token: string): Promise<User | null> {
  const payload = verifyToken(token);
  if (!payload) return null;
  const user = await findUserById(payload.userId);
  if (!user) return null;
  return userToSafeUser(user);
}
