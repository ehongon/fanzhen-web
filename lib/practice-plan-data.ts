// ==================== 类型定义 ====================

export interface WeeklyPlan {
  week: number;
  weekTitle: string;
  weekDesc: string;
  goals: string[];
  dailyTasks: DailyTask[];
}

export interface DailyTask {
  id: string;
  title: string;
  type: "gongfa" | "study" | "check" | "rest";
  exp: number;
  duration?: string;
}

export interface PracticePlan {
  stage: string;
  stageCode: string;
  totalWeeks: number;
  weeklyPlans: WeeklyPlan[];
}

export interface BreakthroughGuide {
  id: string;
  title: string;
  difficulty: "入门" | "进阶" | "困难" | "宗师";
  estimatedTime: string;
  difficultyPoint: string;
  solution: string;
  tips: string[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  expReward: number;
  category: "body" | "mind" | "practice" | "daily";
}

export interface TodayGongfa {
  id: string;
  name: string;
  type: string;
  duration: string;
  exp: number;
  description: string;
  keyPoints: string[];
}

// ==================== 模拟数据 ====================

export const MOCK_PRACTICE_PLAN: PracticePlan = {
  stage: "炼形化精",
  stageCode: "lianxing",
  totalWeeks: 12,
  weeklyPlans: [
    {
      week: 1,
      weekTitle: "筑基之始 · 调身调息",
      weekDesc: "第一周以熟悉基础姿势和自然呼吸为主，不求深入，但求正确。",
      goals: [
        "每日站桩10分钟，连续7天不间断",
        "掌握混元立桩功的基本姿势要点",
        "学会自然腹式呼吸，不刻意强求",
        "记录每日身体感受，建立修炼日志",
      ],
      dailyTasks: [
        { id: "w1-d1", title: "晨起站桩 10分钟", type: "gongfa", exp: 30, duration: "10分钟" },
        { id: "w1-d2", title: "八段锦全套练习", type: "gongfa", exp: 40, duration: "15分钟" },
        { id: "w1-d3", title: "阅读《道德经》第一章", type: "study", exp: 20 },
        { id: "w1-d4", title: "揉腹功 36圈", type: "gongfa", exp: 15, duration: "5分钟" },
        { id: "w1-d5", title: "记录今日修炼心得", type: "check", exp: 20 },
        { id: "w1-d6", title: "叩齿吞津 36次", type: "gongfa", exp: 10, duration: "3分钟" },
        { id: "w1-d7", title: "休息日 · 散步调息", type: "rest", exp: 10, duration: "20分钟" },
      ],
    },
    {
      week: 2,
      weekTitle: "渐入佳境 · 延长时长",
      weekDesc: "第二周逐步延长站桩时间至15分钟，开始体会身体放松的感觉。",
      goals: [
        "每日站桩15分钟，保持姿势稳定",
        "八段锦动作更加流畅自然",
        "开始出现身体温热感或轻微气感",
        "建立固定的修炼时间表",
      ],
      dailyTasks: [
        { id: "w2-d1", title: "晨起站桩 15分钟", type: "gongfa", exp: 40, duration: "15分钟" },
        { id: "w2-d2", title: "易筋经八式练习", type: "gongfa", exp: 45, duration: "20分钟" },
        { id: "w2-d3", title: "阅读修炼基础理论", type: "study", exp: 20 },
        { id: "w2-d4", title: "鸣天鼓 36次", type: "gongfa", exp: 15, duration: "5分钟" },
        { id: "w2-d5", title: "踮脚功 36次", type: "gongfa", exp: 15, duration: "5分钟" },
        { id: "w2-d6", title: "自检姿势是否正确", type: "check", exp: 15 },
        { id: "w2-d7", title: "休息日 · 静坐调息", type: "rest", exp: 15, duration: "15分钟" },
      ],
    },
    {
      week: 3,
      weekTitle: "气感初现 · 意念引导",
      weekDesc: "第三周开始轻守丹田，体会气感，但不可刻意追求。",
      goals: [
        "站桩时轻守丹田，如鸡孵卵",
        "体会丹田温热感或跳动感",
        "呼吸自然深化，细匀深长",
        "睡眠质量开始改善",
      ],
      dailyTasks: [
        { id: "w3-d1", title: "站桩 20分钟 + 意守丹田", type: "gongfa", exp: 50, duration: "20分钟" },
        { id: "w3-d2", title: "八段锦 + 呼吸配合", type: "gongfa", exp: 45, duration: "20分钟" },
        { id: "w3-d3", title: "研读《黄帝内经》养生篇", type: "study", exp: 25 },
        { id: "w3-d4", title: "全身放松扫描练习", type: "gongfa", exp: 30, duration: "10分钟" },
        { id: "w3-d5", title: "记录气感体验", type: "check", exp: 20 },
        { id: "w3-d6", title: "辅助功法组合练习", type: "gongfa", exp: 30, duration: "15分钟" },
        { id: "w3-d7", title: "休息日 · 自由活动", type: "rest", exp: 10 },
      ],
    },
    {
      week: 4,
      weekTitle: "巩固基础 · 动静结合",
      weekDesc: "第四周巩固前三周成果，增加动功练习时间，动静结合。",
      goals: [
        "站桩20分钟轻松完成，无明显疲劳",
        "动功与静功配合熟练",
        "身体僵硬感明显减轻",
        "精力充沛，下午不犯困",
      ],
      dailyTasks: [
        { id: "w4-d1", title: "站桩 25分钟", type: "gongfa", exp: 55, duration: "25分钟" },
        { id: "w4-d2", title: "易筋经 + 八段锦组合", type: "gongfa", exp: 50, duration: "30分钟" },
        { id: "w4-d3", title: "学习经络基础知识", type: "study", exp: 25 },
        { id: "w4-d4", title: "站桩后收功练习", type: "gongfa", exp: 20, duration: "5分钟" },
        { id: "w4-d5", title: "本周修炼复盘", type: "check", exp: 25 },
        { id: "w4-d6", title: "睡前辅助功法", type: "gongfa", exp: 20, duration: "10分钟" },
        { id: "w4-d7", title: "休息日 · 户外散步", type: "rest", exp: 15, duration: "30分钟" },
      ],
    },
  ],
};

export const MOCK_BREAKTHROUGH_GUIDES: BreakthroughGuide[] = [
  {
    id: "bt-1",
    title: "站桩时身体颤抖怎么办",
    difficulty: "入门",
    estimatedTime: "1-2周",
    difficultyPoint:
      "初学者站桩时常见身体不自主颤抖，特别是腿部和手臂。这是因为平时缺乏静态锻炼，肌肉在重新调整平衡。很多人因此感到焦虑，怀疑自己姿势错误。",
    solution:
      "颤抖是正常现象，说明肌肉在学习和适应新的平衡状态。可适当降低桩架高度（膝盖弯曲幅度减小），或缩短站桩时间。随着练习深入，颤抖会自然消失。",
    tips: [
      "不要对抗颤抖，保持放松",
      "检查重心是否在前脚掌",
      "微屈膝，不要深蹲",
      "意念放在丹田，而非关注颤抖",
    ],
  },
  {
    id: "bt-2",
    title: "如何正确意守丹田",
    difficulty: "入门",
    estimatedTime: "2-4周",
    difficultyPoint:
      "意守丹田是内丹修炼的核心，但初学者常犯意念过重或过轻的错误。过重则气乱，过轻则散乱。如何把握「如鸡孵卵，似守非守」的分寸，是此关的难点。",
    solution:
      "将意念轻轻放在脐下三寸处，如同母鸡孵卵般温养，不可过于执着。初学者可将注意力放在呼吸上，呼吸自然出入丹田区域，不刻意死守。",
    tips: [
      "意念如丝如缕，不可用力",
      "守的是区域，不是点",
      "走神时轻轻拉回，不懊恼",
      "配合呼吸，吸时意想气入丹田",
    ],
  },
  {
    id: "bt-3",
    title: "气冲病灶的应对之法",
    difficulty: "进阶",
    estimatedTime: "1-3个月",
    difficultyPoint:
      "当气行至身体旧伤或病灶处时，会出现疼痛、酸胀等不适反应。很多人因此恐慌，怀疑练出偏差，甚至停止修炼。",
    solution:
      "气冲病灶是气血疏通经络的正常现象，说明气在修复身体。应在可忍受范围内坚持，气足自通。如反应过于强烈，可减少修炼时间或意念放轻。",
    tips: [
      "区分「气冲」与「练偏」",
      "旧伤处会有明显反应",
      "保持平和心态，不惊不恐",
      "必要时咨询导师",
    ],
  },
  {
    id: "bt-4",
    title: "突破站桩30分钟大关",
    difficulty: "进阶",
    estimatedTime: "1-2个月",
    difficultyPoint:
      "从15分钟突破到30分钟是一个重要的门槛。很多修行者在此停滞，感觉时间漫长，身体酸痛难忍，心理上产生抗拒。",
    solution:
      "采用渐进式延长法：每次增加2-3分钟，不要急于求成。关键是找到「舒适点」——姿势正确、呼吸自然、意念轻守的状态下，时间会过得更快。",
    tips: [
      "每次只增加2-3分钟",
      "找到舒适姿势是关键",
      "可配合轻音乐辅助入静",
      "记录每次时长，看到进步",
    ],
  },
  {
    id: "bt-5",
    title: "杂念纷飞如何入静",
    difficulty: "进阶",
    estimatedTime: "长期",
    difficultyPoint:
      "初学者最常见的问题是杂念纷飞，越是想静，念头越多。很多人因此沮丧，认为自己不适合修炼。",
    solution:
      "「来者不拒，去者不留」。杂念来了让它来，走了让它走，不要抗拒，也不要跟随。把注意力轻轻拉回到呼吸或丹田即可。坚持三个月，杂念会明显减少。",
    tips: [
      "不抗拒杂念，越抗越多",
      "像看云一样看念头",
      "每天固定时间练习",
      "从5分钟开始，逐步延长",
    ],
  },
  {
    id: "bt-6",
    title: "从炼形到炼精的转化",
    difficulty: "困难",
    estimatedTime: "3-6个月",
    difficultyPoint:
      "炼形化精阶段圆满后，需要突破到炼精化气阶段。这个转化不仅是功法的变化，更是修炼重心从「形」到「气」的根本转变。",
    solution:
      "当五大基线（睡眠、消化、精力、疼痛、情绪）全部达标，且能轻松站桩30分钟以上时，可逐步引入炼精化气的功法。先以涌泉归元法为主，逐步培养气感。",
    tips: [
      "确保身体基础稳固",
      "逐步引入新功法",
      "不要急于追求气感",
      "巩固当前成果1-2个月",
    ],
  },
];

export const MOCK_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "check-1",
    title: "今日站桩完成",
    description: "完成至少20分钟站桩，姿势正确",
    expReward: 50,
    category: "practice",
  },
  {
    id: "check-2",
    title: "动功练习完成",
    description: "完成八段锦或易筋经全套",
    expReward: 40,
    category: "practice",
  },
  {
    id: "check-3",
    title: "辅助功法完成",
    description: "揉腹、鸣天鼓、叩齿等辅助功法",
    expReward: 20,
    category: "practice",
  },
  {
    id: "check-4",
    title: "身体状态良好",
    description: "今日无过度疲劳，精神饱满",
    expReward: 15,
    category: "body",
  },
  {
    id: "check-5",
    title: "饮食规律清淡",
    description: "三餐规律，少食油腻辛辣",
    expReward: 15,
    category: "daily",
  },
  {
    id: "check-6",
    title: "情绪平和稳定",
    description: "今日心态平和，无大情绪波动",
    expReward: 20,
    category: "mind",
  },
  {
    id: "check-7",
    title: "早睡早起",
    description: "22:30前入睡，6:00前起床",
    expReward: 25,
    category: "daily",
  },
  {
    id: "check-8",
    title: "记录修炼心得",
    description: "记录今日修炼感受与体会",
    expReward: 20,
    category: "mind",
  },
];

export const MOCK_TODAY_GONGFA: TodayGongfa[] = [
  {
    id: "tg-1",
    name: "混元立桩功",
    type: "静功",
    duration: "25分钟",
    exp: 60,
    description:
      "混元立桩功是炼形化精阶段最核心的基础功法，通过特定的站桩姿势，使身体达到「形正气顺」的状态。",
    keyPoints: [
      "双脚平行，与肩同宽，脚尖微内扣",
      "含胸拔背，虚领顶劲，下颌微收",
      "双手抱圆于胸前，如抱混元球",
      "双目微闭，舌抵上颚，意守丹田",
      "呼吸自然，逐步过渡到腹式呼吸",
    ],
  },
  {
    id: "tg-2",
    name: "八段锦",
    type: "动功",
    duration: "20分钟",
    exp: 50,
    description:
      "八段锦是流传最广的健身气功之一，整套功法由八个动作组成，每个动作如锦缎般优美舒展。",
    keyPoints: [
      "双手托天理三焦：调理上中下三焦",
      "左右开弓似射雕：宣肺理气",
      "调理脾胃须单举：促进消化",
      "五劳七伤往后瞧：舒缓颈椎",
      "摇头摆尾去心火：降心火安神志",
    ],
  },
  {
    id: "tg-3",
    name: "揉腹功 + 鸣天鼓",
    type: "辅助功法",
    duration: "10分钟",
    exp: 25,
    description:
      "揉腹功调理脾胃，促进消化；鸣天鼓聪耳明目，醒脑安神。两者结合，是睡前的理想辅助功法。",
    keyPoints: [
      "揉腹：以肚脐为中心，顺时针36圈",
      "再逆时针36圈，圈由大到小",
      "鸣天鼓：双手掩耳，食指敲击后脑36次",
      "力度适中，发出咚咚声",
      "最后摩耳前后36次",
    ],
  },
];

// ==================== 工具函数 ====================

/**
 * 根据阶段获取对应的修炼计划
 */
export function getPracticePlanByStage(stageCode: string): PracticePlan {
  // 实际应用中根据 stageCode 返回不同阶段的计划
  // 这里返回模拟数据
  return MOCK_PRACTICE_PLAN;
}

/**
 * 获取当前周的任务完成进度
 */
export function getWeeklyProgress(
  weeklyPlan: WeeklyPlan,
  completedTasks: string[]
): { completed: number; total: number; percentage: number } {
  const allTaskIds = [
    ...weeklyPlan.goals.map((_, i) => `week-${weeklyPlan.week}-goal-${i}`),
    ...weeklyPlan.dailyTasks.map((_, i) => `week-${weeklyPlan.week}-daily-${i}`),
  ];

  const completed = allTaskIds.filter((id) => completedTasks.includes(id))
    .length;

  return {
    completed,
    total: allTaskIds.length,
    percentage: allTaskIds.length > 0 ? (completed / allTaskIds.length) * 100 : 0,
  };
}

/**
 * 获取今日可获经验值总数
 */
export function getTodayTotalExp(gongfaList: TodayGongfa[]): number {
  return gongfaList.reduce((sum, g) => sum + g.exp, 0);
}

/**
 * 获取检验清单完成奖励
 */
export function getChecklistBonusExp(
  items: ChecklistItem[],
  completedTasks: string[]
): { baseExp: number; bonusExp: number; totalExp: number } {
  const completedItems = items.filter((item) =>
    completedTasks.includes(item.id)
  );
  const baseExp = completedItems.reduce((sum, item) => sum + item.expReward, 0);
  const allCompleted = completedItems.length === items.length;
  const bonusExp = allCompleted ? 200 : 0;

  return {
    baseExp,
    bonusExp,
    totalExp: baseExp + bonusExp,
  };
}
