// ==================== 类型定义 ====================

export interface Level {
  id: number;
  name: string;
  stage: string;
  stageCode: "lianxing" | "lianjing" | "lianqi" | "lianshen";
  requiredExp: number;
  benefits: string[];
  icon: string;
  color: string;
  gradient: string;
  description: string;
}

export interface ExpRecord {
  id: string;
  userId: string;
  amount: number;
  source: ExpSource;
  description: string;
  timestamp: Date;
}

export interface UserGamification {
  userId: string;
  currentLevel: number;
  currentExp: number;
  totalExp: number;
  streakDays: number;
  maxStreakDays: number;
  lastPracticeDate: string;
  totalPracticeDays: number;
  totalPracticeMinutes: number;
}

export type ExpSource =
  | "daily_practice"
  | "first_practice"
  | "streak_bonus"
  | "daily_goal"
  | "weekly_goal"
  | "monthly_goal"
  | "breakthrough_small"
  | "breakthrough_medium"
  | "breakthrough_large"
  | "post_insight"
  | "receive_like"
  | "answer_question"
  | "best_answer"
  | "read_classic"
  | "complete_gongfa"
  | "stage_assessment";

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  expReward: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  level: number;
  totalExp: number;
  streakDays: number;
  isCurrentUser: boolean;
}

export type LeaderboardType = "global" | "friends" | "weekly" | "monthly";

// ==================== 经验值来源配置 ====================

export const EXP_SOURCE_CONFIG: Record<ExpSource, { label: string; icon: string }> = {
  daily_practice: { label: "每日修炼", icon: "Flame" },
  first_practice: { label: "首次修炼", icon: "Sunrise" },
  streak_bonus: { label: "连续修炼", icon: "Zap" },
  daily_goal: { label: "每日目标", icon: "Target" },
  weekly_goal: { label: "每周目标", icon: "Calendar" },
  monthly_goal: { label: "每月目标", icon: "Award" },
  breakthrough_small: { label: "突破小关", icon: "ArrowUp" },
  breakthrough_medium: { label: "突破中关", icon: "TrendingUp" },
  breakthrough_large: { label: "突破大关", icon: "Crown" },
  post_insight: { label: "发表心得", icon: "PenTool" },
  receive_like: { label: "获得点赞", icon: "Heart" },
  answer_question: { label: "回答问题", icon: "MessageCircle" },
  best_answer: { label: "最佳答案", icon: "Star" },
  read_classic: { label: "阅读典籍", icon: "BookOpen" },
  complete_gongfa: { label: "完成功法", icon: "CheckCircle" },
  stage_assessment: { label: "阶段评估", icon: "ClipboardCheck" },
};

// ==================== 功法系数 ====================

export const GONGFA_COEFFICIENTS: Record<string, number> = {
  jinggong: 1.0,
  donggong: 1.2,
  dongjing: 1.5,
  xinfa: 2.0,
};

export const GONGFA_LABELS: Record<string, string> = {
  jinggong: "静功",
  donggong: "动功",
  dongjing: "动静结合",
  xinfa: "心法",
};

// ==================== 36个等级定义 ====================

export const LEVELS: Level[] = [
  // 炼形化精阶段（1-9级）- 绿色系
  {
    id: 1,
    name: "凡人之躯",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 0,
    benefits: ["开始修炼之旅", "解锁基础功法"],
    icon: "Seedling",
    color: "#4ade80",
    gradient: "from-green-400 to-emerald-500",
    description: "初始境界，凡胎肉体，尚未入门。",
  },
  {
    id: 2,
    name: "初窥门径",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 100,
    benefits: ["解锁修炼记录", "每日目标功能"],
    icon: "Eye",
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-600",
    description: "初见修炼之门，略知皮毛。",
  },
  {
    id: 3,
    name: "筋骨初开",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 300,
    benefits: ["解锁动功修炼", "气血监测功能"],
    icon: "Dumbbell",
    color: "#16a34a",
    gradient: "from-emerald-500 to-teal-600",
    description: "筋骨开始舒展，身体逐渐灵活。",
  },
  {
    id: 4,
    name: "气血方刚",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 600,
    benefits: ["解锁社区发帖", "获得专属头像框"],
    icon: "Heart",
    color: "#15803d",
    gradient: "from-emerald-600 to-teal-700",
    description: "气血充盈，精力充沛。",
  },
  {
    id: 5,
    name: "精元初聚",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 1000,
    benefits: ["解锁典籍阅读", "修炼提醒功能"],
    icon: "Droplets",
    color: "#059669",
    gradient: "from-teal-500 to-cyan-600",
    description: "精元开始凝聚，内在能量初现。",
  },
  {
    id: 6,
    name: "体魄渐强",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 1500,
    benefits: ["解锁排行榜", "周目标功能"],
    icon: "Shield",
    color: "#0d9488",
    gradient: "from-teal-600 to-cyan-700",
    description: "体魄日益强健，抵抗力提升。",
  },
  {
    id: 7,
    name: "形神合一",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 2100,
    benefits: ["解锁心法修炼", "冥想引导功能"],
    icon: "GitMerge",
    color: "#0891b2",
    gradient: "from-cyan-500 to-sky-600",
    description: "形体与精神开始协调统一。",
  },
  {
    id: 8,
    name: "精满气足",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 2800,
    benefits: ["解锁阶段评估", "修炼数据分析"],
    icon: "BatteryCharging",
    color: "#0284c7",
    gradient: "from-cyan-600 to-sky-700",
    description: "精满气足，能量充沛。",
  },
  {
    id: 9,
    name: "化精圆满",
    stage: "炼形化精",
    stageCode: "lianxing",
    requiredExp: 3600,
    benefits: ["解锁突破关卡", "专属称号"],
    icon: "CircleCheck",
    color: "#0369a1",
    gradient: "from-sky-500 to-blue-600",
    description: "炼形化精阶段圆满，准备进入下一阶段。",
  },
  // 炼精化气阶段（10-18级）- 蓝色系
  {
    id: 10,
    name: "气感初现",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 4500,
    benefits: ["解锁气感监测", "经脉图谱功能"],
    icon: "Wind",
    color: "#3b82f6",
    gradient: "from-blue-400 to-indigo-500",
    description: "气感初现，能感知体内气流。",
  },
  {
    id: 11,
    name: "气机涌动",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 5500,
    benefits: ["解锁呼吸法门", "气息调节指导"],
    icon: "Waves",
    color: "#2563eb",
    gradient: "from-blue-500 to-indigo-600",
    description: "气机开始涌动，能量流动加速。",
  },
  {
    id: 12,
    name: "气沉丹田",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 6600,
    benefits: ["解锁丹田修炼", "能量存储功能"],
    icon: "Target",
    color: "#1d4ed8",
    gradient: "from-indigo-400 to-violet-500",
    description: "气沉丹田，能量汇聚于核心。",
  },
  {
    id: 13,
    name: "小周天通",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 7800,
    benefits: ["解锁周天循环", "经脉通畅监测"],
    icon: "RefreshCw",
    color: "#4f46e5",
    gradient: "from-indigo-500 to-violet-600",
    description: "小周天打通，能量循环初步建立。",
  },
  {
    id: 14,
    name: "气行全身",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 9100,
    benefits: ["解锁全身扫描", "能量分布图"],
    icon: "Move",
    color: "#6366f1",
    gradient: "from-violet-400 to-purple-500",
    description: "气行全身，无处不达。",
  },
  {
    id: 15,
    name: "气满神安",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 10500,
    benefits: ["解锁安神法门", "睡眠质量提升"],
    icon: "Moon",
    color: "#7c3aed",
    gradient: "from-violet-500 to-purple-600",
    description: "气满神安，精神安定。",
  },
  {
    id: 16,
    name: "气神合一",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 12000,
    benefits: ["解锁神识修炼", "意念引导功能"],
    icon: "Sparkles",
    color: "#8b5cf6",
    gradient: "from-purple-400 to-fuchsia-500",
    description: "气与神合，内外协调。",
  },
  {
    id: 17,
    name: "气化自如",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 13600,
    benefits: ["解锁高级功法", "个性化修炼方案"],
    icon: "Zap",
    color: "#a855f7",
    gradient: "from-purple-500 to-fuchsia-600",
    description: "气化自如，运用随心。",
  },
  {
    id: 18,
    name: "化气圆满",
    stage: "炼精化气",
    stageCode: "lianjing",
    requiredExp: 15300,
    benefits: ["解锁炼气化神", "大师称号"],
    icon: "CircleCheck",
    color: "#9333ea",
    gradient: "from-fuchsia-400 to-pink-500",
    description: "炼精化气阶段圆满，即将化神。",
  },
  // 炼气化神阶段（19-27级）- 紫色系
  {
    id: 19,
    name: "神识初开",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 17100,
    benefits: ["解锁神识感知", "直觉训练功能"],
    icon: "Eye",
    color: "#c026d3",
    gradient: "from-fuchsia-500 to-pink-600",
    description: "神识初开，感知超越五感。",
  },
  {
    id: 20,
    name: "觉知扩展",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 19000,
    benefits: ["扩展觉知范围", "环境感知功能"],
    icon: "Scan",
    color: "#d946ef",
    gradient: "from-pink-400 to-rose-500",
    description: "觉知扩展，感知范围增大。",
  },
  {
    id: 21,
    name: "心流初现",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 21000,
    benefits: ["解锁心流状态", "专注度监测"],
    icon: "Flow",
    color: "#e879f9",
    gradient: "from-pink-500 to-rose-600",
    description: "心流初现，进入深度专注状态。",
  },
  {
    id: 22,
    name: "识神元神",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 23100,
    benefits: ["解锁元神修炼", "深层意识探索"],
    icon: "Brain",
    color: "#f0abfc",
    gradient: "from-rose-400 to-orange-500",
    description: "识神与元神开始分离认知。",
  },
  {
    id: 23,
    name: "神识弥漫",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 25300,
    benefits: ["解锁弥漫感知", "远程感知功能"],
    icon: "Cloud",
    color: "#fb7185",
    gradient: "from-rose-500 to-orange-600",
    description: "神识弥漫，无处不在。",
  },
  {
    id: 24,
    name: "元神显现",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 27600,
    benefits: ["解锁元神显现", "真我认知功能"],
    icon: "Sun",
    color: "#f97316",
    gradient: "from-orange-400 to-amber-500",
    description: "元神显现，真我呈现。",
  },
  {
    id: 25,
    name: "神气合一",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 30000,
    benefits: ["解锁神气合一", "能量与意识融合"],
    icon: "Infinity",
    color: "#fb923c",
    gradient: "from-orange-500 to-amber-600",
    description: "神与气合，浑然一体。",
  },
  {
    id: 26,
    name: "神游太虚",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 32500,
    benefits: ["解锁太虚漫游", "意识扩展功能"],
    icon: "Plane",
    color: "#fbbf24",
    gradient: "from-amber-400 to-yellow-500",
    description: "神游太虚，超越空间限制。",
  },
  {
    id: 27,
    name: "化神圆满",
    stage: "炼气化神",
    stageCode: "lianqi",
    requiredExp: 35100,
    benefits: ["解锁炼神返虚", "宗师称号"],
    icon: "Star",
    color: "#facc15",
    gradient: "from-amber-500 to-yellow-600",
    description: "炼气化神阶段圆满，准备返虚。",
  },
  // 炼神返虚阶段（28-36级）- 金色/红色系
  {
    id: 28,
    name: "虚室生白",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 37800,
    benefits: ["解锁虚室状态", "空白意识训练"],
    icon: "Lightbulb",
    color: "#eab308",
    gradient: "from-yellow-400 to-gold-500",
    description: "虚室生白，内心空明。",
  },
  {
    id: 29,
    name: "去身份化",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 40600,
    benefits: ["解锁无我状态", "去执训练功能"],
    icon: "UserX",
    color: "#ca8a04",
    gradient: "from-yellow-500 to-gold-600",
    description: "去身份化，超越自我认知。",
  },
  {
    id: 30,
    name: "无事可修",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 43500,
    benefits: ["解锁无为状态", "自然修炼模式"],
    icon: "Minus",
    color: "#a16207",
    gradient: "from-gold-400 to-orange-500",
    description: "无事可修，无修而修。",
  },
  {
    id: 31,
    name: "慈悲自然",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 46500,
    benefits: ["解锁慈悲心境", "利他行为引导"],
    icon: "HeartHandshake",
    color: "#c2410c",
    gradient: "from-orange-500 to-red-500",
    description: "慈悲自然流露，心怀众生。",
  },
  {
    id: 32,
    name: "天人合一",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 49600,
    benefits: ["解锁天人合一", "自然同步功能"],
    icon: "Globe",
    color: "#ea580c",
    gradient: "from-red-400 to-rose-500",
    description: "天人合一，与天地同频。",
  },
  {
    id: 33,
    name: "虚空粉碎",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 52800,
    benefits: ["解锁虚空状态", "粉碎执念功能"],
    icon: "Hammer",
    color: "#dc2626",
    gradient: "from-red-500 to-rose-600",
    description: "虚空粉碎，一切执着消散。",
  },
  {
    id: 34,
    name: "与道合真",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 56100,
    benefits: ["解锁合道状态", "真理认知功能"],
    icon: "Triangle",
    color: "#b91c1c",
    gradient: "from-rose-500 to-pink-600",
    description: "与道合真，通达真理。",
  },
  {
    id: 35,
    name: "真人之道",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 59500,
    benefits: ["解锁真人境界", "圆满智慧功能"],
    icon: "Crown",
    color: "#991b1b",
    gradient: "from-rose-600 to-red-700",
    description: "步入真人之道，智慧圆满。",
  },
  {
    id: 36,
    name: "凡真圆满",
    stage: "炼神返虚",
    stageCode: "lianshen",
    requiredExp: 63000,
    benefits: ["解锁凡真圆满", "无上称号", "传承资格"],
    icon: "Gem",
    color: "#7f1d1d",
    gradient: "from-red-600 via-gold-500 to-red-600",
    description: "凡真圆满，返璞归真，大道至简。",
  },
];

// ==================== 经验值计算工具函数 ====================

/**
 * 根据总经验值获取当前等级
 */
export function getLevelByExp(totalExp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalExp >= LEVELS[i].requiredExp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

/**
 * 获取下一级所需经验值
 */
export function getNextLevelExp(currentLevel: number): number {
  const nextLevel = LEVELS.find((l) => l.id === currentLevel + 1);
  return nextLevel ? nextLevel.requiredExp : LEVELS[LEVELS.length - 1].requiredExp;
}

/**
 * 获取当前等级进度（0-1）
 */
export function getLevelProgress(currentLevel: number, currentExp: number): number {
  const currentLevelData = LEVELS.find((l) => l.id === currentLevel);
  const nextLevelData = LEVELS.find((l) => l.id === currentLevel + 1);

  if (!currentLevelData || !nextLevelData) return 1;

  const levelExp = currentExp - currentLevelData.requiredExp;
  const levelTotalExp = nextLevelData.requiredExp - currentLevelData.requiredExp;

  return Math.min(Math.max(levelExp / levelTotalExp, 0), 1);
}

/**
 * 获取当前等级阶段信息
 */
export function getStageInfo(stageCode: string) {
  const stageMap: Record<string, { name: string; color: string; gradient: string }> = {
    lianxing: { name: "炼形化精", color: "#22c55e", gradient: "from-green-500 to-emerald-600" },
    lianjing: { name: "炼精化气", color: "#3b82f6", gradient: "from-blue-500 to-indigo-600" },
    lianqi: { name: "炼气化神", color: "#a855f7", gradient: "from-purple-500 to-fuchsia-600" },
    lianshen: { name: "炼神返虚", color: "#eab308", gradient: "from-yellow-500 to-gold-600" },
  };
  return stageMap[stageCode] || stageMap.lianxing;
}

/**
 * 计算修炼获得的经验值
 */
export function calculatePracticeExp(
  minutes: number,
  gongfaType: string,
  isFirstPractice: boolean,
  streakDays: number
): { baseExp: number; bonusExp: number; totalExp: number; breakdown: { label: string; amount: number }[] } {
  const coefficient = GONGFA_COEFFICIENTS[gongfaType] || 1.0;
  const baseExp = Math.round(minutes * coefficient);
  const breakdown: { label: string; amount: number }[] = [
    { label: "基础经验", amount: baseExp },
  ];

  let bonusExp = 0;

  if (isFirstPractice) {
    const firstBonus = Math.round(baseExp * 0.5);
    bonusExp += firstBonus;
    breakdown.push({ label: "首次修炼加成", amount: firstBonus });
  }

  if (streakDays > 0) {
    const streakBonus = streakDays * 10;
    bonusExp += streakBonus;
    breakdown.push({ label: `连续${streakDays}天加成`, amount: streakBonus });
  }

  return {
    baseExp,
    bonusExp,
    totalExp: baseExp + bonusExp,
    breakdown,
  };
}

/**
 * 获取等级颜色（用于UI显示）
 */
export function getLevelColor(levelId: number): string {
  if (levelId <= 9) return "text-green-500";
  if (levelId <= 18) return "text-blue-500";
  if (levelId <= 27) return "text-purple-500";
  return "text-yellow-500";
}

/**
 * 获取等级背景渐变
 */
export function getLevelGradient(levelId: number): string {
  if (levelId <= 9) return "from-green-400 to-emerald-600";
  if (levelId <= 18) return "from-blue-400 to-indigo-600";
  if (levelId <= 27) return "from-purple-400 to-fuchsia-600";
  return "from-yellow-400 via-gold-500 to-red-500";
}

// ==================== 模拟用户数据 ====================

export const MOCK_USER_GAMIFICATION: UserGamification = {
  userId: "user-001",
  currentLevel: 5,
  currentExp: 1200,
  totalExp: 1200,
  streakDays: 7,
  maxStreakDays: 15,
  lastPracticeDate: new Date().toISOString().split("T")[0],
  totalPracticeDays: 45,
  totalPracticeMinutes: 1800,
};

export const MOCK_EXP_RECORDS: ExpRecord[] = [
  {
    id: "exp-001",
    userId: "user-001",
    amount: 120,
    source: "daily_practice",
    description: "修炼静功 60 分钟",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "exp-002",
    userId: "user-001",
    amount: 60,
    source: "first_practice",
    description: "每日首次修炼加成",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "exp-003",
    userId: "user-001",
    amount: 70,
    source: "streak_bonus",
    description: "连续修炼 7 天加成",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "exp-004",
    userId: "user-001",
    amount: 100,
    source: "daily_goal",
    description: "完成每日修炼目标",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "exp-005",
    userId: "user-001",
    amount: 50,
    source: "post_insight",
    description: "发表修炼心得",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export const MOCK_DAILY_MISSIONS: DailyMission[] = [
  {
    id: "mission-001",
    title: "每日修炼",
    description: "今日修炼至少 30 分钟",
    target: 30,
    current: 45,
    unit: "分钟",
    expReward: 100,
    completed: true,
    claimed: false,
    icon: "Flame",
  },
  {
    id: "mission-002",
    title: "阅读典籍",
    description: "今日阅读至少 1 部典籍",
    target: 1,
    current: 1,
    unit: "部",
    expReward: 50,
    completed: true,
    claimed: true,
    icon: "BookOpen",
  },
  {
    id: "mission-003",
    title: "社区互动",
    description: "今日发表 1 条心得或回答 1 个问题",
    target: 1,
    current: 0,
    unit: "次",
    expReward: 30,
    completed: false,
    claimed: false,
    icon: "MessageCircle",
  },
  {
    id: "mission-004",
    title: "连续修炼",
    description: "保持连续修炼天数",
    target: 1,
    current: 1,
    unit: "天",
    expReward: 20,
    completed: true,
    claimed: false,
    icon: "Zap",
  },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, userId: "user-100", name: "清风道人", avatar: undefined, level: 28, totalExp: 42000, streakDays: 365, isCurrentUser: false },
  { rank: 2, userId: "user-101", name: "明月仙子", avatar: undefined, level: 25, totalExp: 31500, streakDays: 280, isCurrentUser: false },
  { rank: 3, userId: "user-102", name: "云游子", avatar: undefined, level: 22, totalExp: 24800, streakDays: 200, isCurrentUser: false },
  { rank: 4, userId: "user-103", name: "静虚居士", avatar: undefined, level: 19, totalExp: 19500, streakDays: 150, isCurrentUser: false },
  { rank: 5, userId: "user-104", name: "无为散人", avatar: undefined, level: 17, totalExp: 14200, streakDays: 120, isCurrentUser: false },
  { rank: 6, userId: "user-105", name: "紫霄真人", avatar: undefined, level: 15, totalExp: 11200, streakDays: 100, isCurrentUser: false },
  { rank: 7, userId: "user-106", name: "青松道长", avatar: undefined, level: 12, totalExp: 7500, streakDays: 80, isCurrentUser: false },
  { rank: 8, userId: "user-107", name: "白云居士", avatar: undefined, level: 10, totalExp: 5200, streakDays: 60, isCurrentUser: false },
  { rank: 9, userId: "user-108", name: "丹霞子", avatar: undefined, level: 8, totalExp: 3200, streakDays: 45, isCurrentUser: false },
  { rank: 10, userId: "user-001", name: "你", avatar: undefined, level: 5, totalExp: 1200, streakDays: 7, isCurrentUser: true },
];

// ==================== 经验值规则常量 ====================

export const EXP_RULES = {
  // 每日修炼基础系数
  PRACTICE_BASE_RATE: 1, // 每分钟基础经验

  // 功法系数
  GONGFA_COEFFICIENTS,

  // 首次修炼加成
  FIRST_PRACTICE_BONUS: 0.5, // +50%

  // 连续修炼加成
  STREAK_BONUS_PER_DAY: 10, // 每天10经验

  // 目标完成奖励
  DAILY_GOAL_EXP: 100,
  WEEKLY_GOAL_EXP: 500,
  MONTHLY_GOAL_EXP: 2000,

  // 突破奖励
  BREAKTHROUGH_SMALL_EXP: 1000,
  BREAKTHROUGH_MEDIUM_EXP: 3000,
  BREAKTHROUGH_LARGE_EXP: 10000,

  // 社区互动
  POST_INSIGHT_EXP: 50,
  RECEIVE_LIKE_EXP: 5,
  ANSWER_QUESTION_EXP: 30,
  BEST_ANSWER_EXP: 100,

  // 学习成就
  READ_CLASSIC_EXP: 20,
  COMPLETE_GONGFA_EXP: 100,
  STAGE_ASSESSMENT_EXP: 500,
} as const;
