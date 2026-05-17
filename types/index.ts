export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "editor" | "admin";
  status: "active" | "inactive" | "banned";
  currentStage?: CultivationStage;
  currentLevel?: number;
  constitution?: string;
  totalExp?: number;
  streakDays?: number;
  maxStreakDays?: number;
  totalPracticeDays?: number;
  totalPracticeMinutes?: number;
  lastActiveAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type CultivationStage = "lianxing" | "lianjing" | "lianqi" | "lianshen" | "lianxu";

export const STAGE_LABELS: Record<CultivationStage, string> = {
  lianxing: "炼形",
  lianjing: "炼精",
  lianqi: "炼气",
  lianshen: "炼神",
  lianxu: "炼虚",
};

export const STAGE_DESCRIPTIONS: Record<CultivationStage, string> = {
  lianxing: "炼化身形，奠定基础",
  lianjing: "炼精化气，滋养本源",
  lianqi: "炼气化神，提升能量",
  lianshen: "炼神返虚，超越自我",
  lianxu: "返虚合道，通达真境",
};

export interface Content {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  stage?: CultivationStage;
  subtype?: string;
  excerpt?: string;
  body?: string;
  authorId: string;
  status: "draft" | "pending" | "published" | "archived";
  viewCount: number;
  likeCount: number;
  isFeatured?: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ContentType = "gongfa" | "dianji" | "article" | "case" | "qa";

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  gongfa: "功法",
  dianji: "典籍",
  article: "文章",
  case: "案例",
  qa: "问答",
};

export interface UserProgress {
  id: string;
  userId: string;
  stage: CultivationStage;
  level?: string;
  methods?: string[];
  notes?: string;
  recordDate: Date;
  durationMinutes?: number;
  feeling?: string;
  physicalState?: string;
  mentalState?: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  contentId: string;
  userId: string;
  parentId?: string;
  body: string;
  likeCount: number;
  status: "pending" | "published" | "hidden" | "deleted";
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  contentId: string;
  note?: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: {
    code: string;
    message: string;
    details?: { field: string; message: string }[];
  };
}
