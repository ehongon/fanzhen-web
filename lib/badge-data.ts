export interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  tier: number;
  icon: string;
  color: string;
  glowColor: string;
  condition: string;
  expReward: number;
  isSecret: boolean;
}

export interface UserBadge {
  badgeId: string;
  userId: string;
  earnedAt: Date;
  tier: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  badges: string[];
  reward: string;
  expReward: number;
}

export interface BadgeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const badgeCategories: BadgeCategory[] = [
  {
    id: "cultivation",
    name: "修炼徽章",
    description: "在修炼过程中获得的各种徽章",
    icon: "🧘",
  },
  {
    id: "stage",
    name: "阶段徽章",
    description: "按修炼阶段划分的徽章",
    icon: "⚡",
  },
  {
    id: "community",
    name: "社区徽章",
    description: "在社区互动中获得的徽章",
    icon: "💬",
  },
  {
    id: "special",
    name: "特殊徽章",
    description: "稀有且难以获得的徽章",
    icon: "🌟",
  },
];

export const tierConfig = {
  1: { name: "铜级", stars: "⭐", color: "#cd7f32", glowColor: "rgba(205, 127, 50, 0.4)" },
  2: { name: "银级", stars: "⭐⭐", color: "#c0c0c0", glowColor: "rgba(192, 192, 192, 0.4)" },
  3: { name: "金级", stars: "⭐⭐⭐", color: "#ffd700", glowColor: "rgba(255, 215, 0, 0.5)" },
  4: { name: "铂金级", stars: "⭐⭐⭐⭐", color: "#e5e4e2", glowColor: "rgba(229, 228, 226, 0.6)" },
  5: { name: "钻石级", stars: "⭐⭐⭐⭐⭐", color: "#b9f2ff", glowColor: "rgba(185, 242, 255, 0.7)" },
};

export const badges: Badge[] = [
  // ========== 修炼徽章 - 站桩大师系列 ==========
  {
    id: "zhanzhuang-beginner",
    name: "初窥门径",
    description: "累计站桩10小时，踏入站桩修炼之门",
    category: "cultivation",
    subcategory: "站桩大师",
    tier: 1,
    icon: "🧘",
    color: "#cd7f32",
    glowColor: "rgba(205, 127, 50, 0.4)",
    condition: "累计站桩10小时",
    expReward: 100,
    isSecret: false,
  },
  {
    id: "zhanzhuang-persistent",
    name: "持之以恒",
    description: "连续站桩30天，毅力可嘉",
    category: "cultivation",
    subcategory: "站桩大师",
    tier: 2,
    icon: "🧘‍♂️",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "连续站桩30天",
    expReward: 300,
    isSecret: false,
  },
  {
    id: "zhanzhuang-expert",
    name: "站桩达人",
    description: "单次站桩超过60分钟，定力非凡",
    category: "cultivation",
    subcategory: "站桩大师",
    tier: 3,
    icon: "🧘‍♀️",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "单次站桩超过60分钟",
    expReward: 500,
    isSecret: false,
  },
  {
    id: "zhanzhuang-master",
    name: "站桩宗师",
    description: "累计站桩1000小时，站桩功夫已臻化境",
    category: "cultivation",
    subcategory: "站桩大师",
    tier: 5,
    icon: "🧘",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "累计站桩1000小时",
    expReward: 2000,
    isSecret: false,
  },

  // ========== 修炼徽章 - 动功大师系列 ==========
  {
    id: "donggong-beginner",
    name: "动功新手",
    description: "完成易筋经/八段锦/五禽戏各1次",
    category: "cultivation",
    subcategory: "动功大师",
    tier: 1,
    icon: "🏃",
    color: "#cd7f32",
    glowColor: "rgba(205, 127, 50, 0.4)",
    condition: "完成易筋经/八段锦/五禽戏各1次",
    expReward: 100,
    isSecret: false,
  },
  {
    id: "donggong-skilled",
    name: "动功熟练",
    description: "累计完成动功100次，身法日渐灵活",
    category: "cultivation",
    subcategory: "动功大师",
    tier: 2,
    icon: "🏃‍♂️",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "累计完成动功100次",
    expReward: 300,
    isSecret: false,
  },
  {
    id: "donggong-expert",
    name: "动功专家",
    description: "累计完成动功1000次，动功已成本能",
    category: "cultivation",
    subcategory: "动功大师",
    tier: 3,
    icon: "🏃‍♀️",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "累计完成动功1000次",
    expReward: 800,
    isSecret: false,
  },
  {
    id: "donggong-master",
    name: "动功宗师",
    description: "掌握10种动功，武学造诣高深",
    category: "cultivation",
    subcategory: "动功大师",
    tier: 5,
    icon: "🏃",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "掌握10种动功",
    expReward: 2000,
    isSecret: false,
  },

  // ========== 修炼徽章 - 呼吸大师系列 ==========
  {
    id: "huxi-beginner",
    name: "呼吸入门",
    description: "完成100次呼吸训练，开始感知气息",
    category: "cultivation",
    subcategory: "呼吸大师",
    tier: 1,
    icon: "🌬️",
    color: "#cd7f32",
    glowColor: "rgba(205, 127, 50, 0.4)",
    condition: "完成100次呼吸训练",
    expReward: 100,
    isSecret: false,
  },
  {
    id: "huxi-skilled",
    name: "呼吸精通",
    description: "完成1000次呼吸训练，呼吸绵长深远",
    category: "cultivation",
    subcategory: "呼吸大师",
    tier: 2,
    icon: "🌬️",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "完成1000次呼吸训练",
    expReward: 400,
    isSecret: false,
  },
  {
    id: "huxi-taixi",
    name: "胎息初现",
    description: "体验胎息状态，返璞归真",
    category: "cultivation",
    subcategory: "呼吸大师",
    tier: 4,
    icon: "🌬️",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "体验胎息状态",
    expReward: 1500,
    isSecret: true,
  },
  {
    id: "huxi-master",
    name: "呼吸宗师",
    description: "掌握5种呼吸法，气息运用自如",
    category: "cultivation",
    subcategory: "呼吸大师",
    tier: 5,
    icon: "🌬️",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "掌握5种呼吸法",
    expReward: 2000,
    isSecret: false,
  },

  // ========== 阶段徽章 - 炼形化精 ==========
  {
    id: "lianxing-start",
    name: "筑基之始",
    description: "开始炼形化精修炼，踏上修行之路",
    category: "stage",
    subcategory: "炼形化精",
    tier: 1,
    icon: "💪",
    color: "#cd7f32",
    glowColor: "rgba(205, 127, 50, 0.4)",
    condition: "开始炼形化精修炼",
    expReward: 50,
    isSecret: false,
  },
  {
    id: "lianxing-sleep",
    name: "睡眠改善",
    description: "连续7天睡眠质量提升，身体开始调整",
    category: "stage",
    subcategory: "炼形化精",
    tier: 2,
    icon: "💪",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "连续7天睡眠质量提升",
    expReward: 200,
    isSecret: false,
  },
  {
    id: "lianxing-energy",
    name: "精力充沛",
    description: "连续30天精力充沛，精元充盈",
    category: "stage",
    subcategory: "炼形化精",
    tier: 3,
    icon: "💪",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "连续30天精力充沛",
    expReward: 500,
    isSecret: false,
  },
  {
    id: "lianxing-complete",
    name: "化精圆满",
    description: "完成炼形化精阶段，身体根基稳固",
    category: "stage",
    subcategory: "炼形化精",
    tier: 4,
    icon: "💪",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "完成炼形化精阶段",
    expReward: 1000,
    isSecret: false,
  },

  // ========== 阶段徽章 - 炼精化气 ==========
  {
    id: "lianjing-qigan",
    name: "气感初现",
    description: "第一次感受到气感，体内真气萌动",
    category: "stage",
    subcategory: "炼精化气",
    tier: 2,
    icon: "⚡",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "第一次感受到气感",
    expReward: 300,
    isSecret: false,
  },
  {
    id: "lianjing-xiaozhoutian",
    name: "小周天通",
    description: "完成小周天循环，任督二脉通畅",
    category: "stage",
    subcategory: "炼精化气",
    tier: 3,
    icon: "⚡",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "完成小周天循环",
    expReward: 800,
    isSecret: false,
  },
  {
    id: "lianjing-dantian",
    name: "气沉丹田",
    description: "气沉丹田稳定，内气充盈",
    category: "stage",
    subcategory: "炼精化气",
    tier: 4,
    icon: "⚡",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "气沉丹田稳定",
    expReward: 1200,
    isSecret: false,
  },
  {
    id: "lianjing-complete",
    name: "化气圆满",
    description: "完成炼精化气阶段，真气充盈全身",
    category: "stage",
    subcategory: "炼精化气",
    tier: 5,
    icon: "⚡",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "完成炼精化气阶段",
    expReward: 2000,
    isSecret: false,
  },

  // ========== 阶段徽章 - 炼气化神 ==========
  {
    id: "lianqi-juezhi",
    name: "觉知扩展",
    description: "觉知范围明显扩大，感知能力提升",
    category: "stage",
    subcategory: "炼气化神",
    tier: 2,
    icon: "🧠",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "觉知范围明显扩大",
    expReward: 400,
    isSecret: false,
  },
  {
    id: "lianqi-xinliu",
    name: "心流体验",
    description: "进入心流状态，心神合一",
    category: "stage",
    subcategory: "炼气化神",
    tier: 3,
    icon: "🧠",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "进入心流状态",
    expReward: 800,
    isSecret: false,
  },
  {
    id: "lianqi-yuanshen",
    name: "元神显现",
    description: "识神元神分明，灵性觉醒",
    category: "stage",
    subcategory: "炼气化神",
    tier: 4,
    icon: "🧠",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "识神元神分明",
    expReward: 1500,
    isSecret: true,
  },
  {
    id: "lianqi-complete",
    name: "化神圆满",
    description: "完成炼气化神阶段，神通初显",
    category: "stage",
    subcategory: "炼气化神",
    tier: 5,
    icon: "🧠",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "完成炼气化神阶段",
    expReward: 3000,
    isSecret: false,
  },

  // ========== 阶段徽章 - 炼神返虚 ==========
  {
    id: "lianshen-qu",
    name: "去身份化",
    description: "放下修行者身份，返璞归真",
    category: "stage",
    subcategory: "炼神返虚",
    tier: 3,
    icon: "🌟",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "放下修行者身份",
    expReward: 1000,
    isSecret: true,
  },
  {
    id: "lianshen-cibei",
    name: "慈悲自然",
    description: "慈悲心自然流露，心怀天下",
    category: "stage",
    subcategory: "炼神返虚",
    tier: 4,
    icon: "🌟",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "慈悲心自然流露",
    expReward: 1500,
    isSecret: true,
  },
  {
    id: "lianshen-tianren",
    name: "天人合一",
    description: "体验天人合一，与道合一",
    category: "stage",
    subcategory: "炼神返虚",
    tier: 5,
    icon: "🌟",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "体验天人合一",
    expReward: 5000,
    isSecret: true,
  },
  {
    id: "lianshen-complete",
    name: "凡真圆满",
    description: "完成炼神返虚阶段，凡真之道大成",
    category: "stage",
    subcategory: "炼神返虚",
    tier: 5,
    icon: "🌟",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.8)",
    condition: "完成炼神返虚阶段",
    expReward: 10000,
    isSecret: false,
  },

  // ========== 社区徽章 - 社交达人 ==========
  {
    id: "shejiao-first",
    name: "初出茅庐",
    description: "发表第一篇心得，开始分享修行感悟",
    category: "community",
    subcategory: "社交达人",
    tier: 1,
    icon: "💬",
    color: "#cd7f32",
    glowColor: "rgba(205, 127, 50, 0.4)",
    condition: "发表第一篇心得",
    expReward: 50,
    isSecret: false,
  },
  {
    id: "shejiao-sharer",
    name: "经验分享",
    description: "发表10篇心得，乐于分享修行经验",
    category: "community",
    subcategory: "社交达人",
    tier: 2,
    icon: "💬",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "发表10篇心得",
    expReward: 200,
    isSecret: false,
  },
  {
    id: "shejiao-mentor",
    name: "导师之路",
    description: "发表50篇心得，成为社区导师",
    category: "community",
    subcategory: "社交达人",
    tier: 3,
    icon: "💬",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "发表50篇心得",
    expReward: 500,
    isSecret: false,
  },
  {
    id: "shejiao-master",
    name: "一代宗师",
    description: "发表100篇心得，一代宗师风范",
    category: "community",
    subcategory: "社交达人",
    tier: 5,
    icon: "💬",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "发表100篇心得",
    expReward: 1500,
    isSecret: false,
  },

  // ========== 社区徽章 - 乐于助人 ==========
  {
    id: "help-first",
    name: "热心肠",
    description: "回答第一个问题，伸出援手",
    category: "community",
    subcategory: "乐于助人",
    tier: 1,
    icon: "🤝",
    color: "#cd7f32",
    glowColor: "rgba(205, 127, 50, 0.4)",
    condition: "回答第一个问题",
    expReward: 50,
    isSecret: false,
  },
  {
    id: "help-helper",
    name: "解惑者",
    description: "回答10个问题，为他人解惑",
    category: "community",
    subcategory: "乐于助人",
    tier: 2,
    icon: "🤝",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "回答10个问题",
    expReward: 200,
    isSecret: false,
  },
  {
    id: "help-wise",
    name: "智者",
    description: "回答50个问题，智慧如海",
    category: "community",
    subcategory: "乐于助人",
    tier: 3,
    icon: "🤝",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "回答50个问题",
    expReward: 600,
    isSecret: false,
  },
  {
    id: "help-bodhisattva",
    name: "活菩萨",
    description: "回答100个问题，普度众生",
    category: "community",
    subcategory: "乐于助人",
    tier: 5,
    icon: "🤝",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "回答100个问题",
    expReward: 1500,
    isSecret: false,
  },

  // ========== 社区徽章 - 人气王 ==========
  {
    id: "popularity-first",
    name: "初获认可",
    description: "获得10个点赞，开始获得认可",
    category: "community",
    subcategory: "人气王",
    tier: 1,
    icon: "❤️",
    color: "#cd7f32",
    glowColor: "rgba(205, 127, 50, 0.4)",
    condition: "获得10个点赞",
    expReward: 50,
    isSecret: false,
  },
  {
    id: "popularity-liked",
    name: "受欢迎",
    description: "获得100个点赞，深受大家喜爱",
    category: "community",
    subcategory: "人气王",
    tier: 2,
    icon: "❤️",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "获得100个点赞",
    expReward: 300,
    isSecret: false,
  },
  {
    id: "popularity-star",
    name: "人气爆棚",
    description: "获得1000个点赞，人气爆棚",
    category: "community",
    subcategory: "人气王",
    tier: 4,
    icon: "❤️",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "获得1000个点赞",
    expReward: 1000,
    isSecret: false,
  },
  {
    id: "popularity-idol",
    name: "万人迷",
    description: "获得10000个点赞，万人敬仰",
    category: "community",
    subcategory: "人气王",
    tier: 5,
    icon: "❤️",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "获得10000个点赞",
    expReward: 3000,
    isSecret: false,
  },

  // ========== 特殊徽章 - 时间类 ==========
  {
    id: "time-morning",
    name: "晨修者",
    description: "连续30天早起修炼，迎着朝阳修行",
    category: "special",
    subcategory: "时间类",
    tier: 3,
    icon: "🌅",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "连续30天早起修炼",
    expReward: 500,
    isSecret: false,
  },
  {
    id: "time-night",
    name: "夜修者",
    description: "连续30天睡前修炼，夜深人静时修行",
    category: "special",
    subcategory: "时间类",
    tier: 3,
    icon: "🌙",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "连续30天睡前修炼",
    expReward: 500,
    isSecret: false,
  },
  {
    id: "time-anniversary",
    name: "周年修者",
    description: "注册满一年且持续修炼，不忘初心",
    category: "special",
    subcategory: "时间类",
    tier: 4,
    icon: "📅",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "注册满一年且持续修炼",
    expReward: 1000,
    isSecret: false,
  },
  {
    id: "time-birthday",
    name: "生日修者",
    description: "生日当天修炼，与天地同庆",
    category: "special",
    subcategory: "时间类",
    tier: 2,
    icon: "🎂",
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.4)",
    condition: "生日当天修炼",
    expReward: 200,
    isSecret: true,
  },

  // ========== 特殊徽章 - 毅力类 ==========
  {
    id: "willpower-100",
    name: "百炼成钢",
    description: "连续修炼100天，百炼成钢",
    category: "special",
    subcategory: "毅力类",
    tier: 3,
    icon: "🔥",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "连续修炼100天",
    expReward: 800,
    isSecret: false,
  },
  {
    id: "willpower-1000",
    name: "千日之功",
    description: "连续修炼1000天，千日之功",
    category: "special",
    subcategory: "毅力类",
    tier: 4,
    icon: "🔥",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "连续修炼1000天",
    expReward: 3000,
    isSecret: false,
  },
  {
    id: "willpower-365",
    name: "风雨无阻",
    description: "连续365天不间断，风雨无阻",
    category: "special",
    subcategory: "毅力类",
    tier: 4,
    icon: "🔥",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "连续365天不间断",
    expReward: 2000,
    isSecret: false,
  },
  {
    id: "willpower-10years",
    name: "十年磨剑",
    description: "累计修炼10年，十年磨一剑",
    category: "special",
    subcategory: "毅力类",
    tier: 5,
    icon: "🔥",
    color: "#b9f2ff",
    glowColor: "rgba(185, 242, 255, 0.7)",
    condition: "累计修炼10年",
    expReward: 10000,
    isSecret: false,
  },

  // ========== 特殊徽章 - 奇遇类 ==========
  {
    id: "adventure-surprise",
    name: "意外之喜",
    description: "修炼时获得特殊体验，意外之喜",
    category: "special",
    subcategory: "奇遇类",
    tier: 3,
    icon: "🎁",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "修炼时获得特殊体验",
    expReward: 500,
    isSecret: true,
  },
  {
    id: "adventure-insight",
    name: "顿悟时刻",
    description: "突然领悟某个道理，顿悟时刻",
    category: "special",
    subcategory: "奇遇类",
    tier: 4,
    icon: "🎁",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "突然领悟某个道理",
    expReward: 1500,
    isSecret: true,
  },
  {
    id: "adventure-mentor",
    name: "贵人相助",
    description: "得到高人指点，贵人相助",
    category: "special",
    subcategory: "奇遇类",
    tier: 4,
    icon: "🎁",
    color: "#e5e4e2",
    glowColor: "rgba(229, 228, 226, 0.6)",
    condition: "得到高人指点",
    expReward: 1200,
    isSecret: true,
  },
  {
    id: "adventure-destiny",
    name: "机缘巧合",
    description: "偶然发现适合自己的功法，机缘巧合",
    category: "special",
    subcategory: "奇遇类",
    tier: 3,
    icon: "🎁",
    color: "#ffd700",
    glowColor: "rgba(255, 215, 0, 0.5)",
    condition: "偶然发现适合自己的功法",
    expReward: 600,
    isSecret: true,
  },
];

export const achievements: Achievement[] = [
  {
    id: "achievement-zhanzhuang",
    name: "站桩大师",
    description: "收集所有站桩系列徽章，成为站桩大师",
    category: "cultivation",
    badges: ["zhanzhuang-beginner", "zhanzhuang-persistent", "zhanzhuang-expert", "zhanzhuang-master"],
    reward: "解锁专属站桩功法",
    expReward: 3000,
  },
  {
    id: "achievement-donggong",
    name: "动功大师",
    description: "收集所有动功系列徽章，成为动功大师",
    category: "cultivation",
    badges: ["donggong-beginner", "donggong-skilled", "donggong-expert", "donggong-master"],
    reward: "解锁专属动功功法",
    expReward: 3000,
  },
  {
    id: "achievement-huxi",
    name: "呼吸大师",
    description: "收集所有呼吸系列徽章，成为呼吸大师",
    category: "cultivation",
    badges: ["huxi-beginner", "huxi-skilled", "huxi-taixi", "huxi-master"],
    reward: "解锁胎息修炼法",
    expReward: 3000,
  },
  {
    id: "achievement-lianxing",
    name: "炼形化精圆满",
    description: "完成炼形化精阶段的所有徽章",
    category: "stage",
    badges: ["lianxing-start", "lianxing-sleep", "lianxing-energy", "lianxing-complete"],
    reward: "解锁炼精化气阶段",
    expReward: 2000,
  },
  {
    id: "achievement-lianjing",
    name: "炼精化气圆满",
    description: "完成炼精化气阶段的所有徽章",
    category: "stage",
    badges: ["lianjing-qigan", "lianjing-xiaozhoutian", "lianjing-dantian", "lianjing-complete"],
    reward: "解锁炼气化神阶段",
    expReward: 3000,
  },
  {
    id: "achievement-lianqi",
    name: "炼气化神圆满",
    description: "完成炼气化神阶段的所有徽章",
    category: "stage",
    badges: ["lianqi-juezhi", "lianqi-xinliu", "lianqi-yuanshen", "lianqi-complete"],
    reward: "解锁炼神返虚阶段",
    expReward: 5000,
  },
  {
    id: "achievement-lianshen",
    name: "炼神返虚圆满",
    description: "完成炼神返虚阶段的所有徽章，凡真大成",
    category: "stage",
    badges: ["lianshen-qu", "lianshen-cibei", "lianshen-tianren", "lianshen-complete"],
    reward: "获得凡真真人称号",
    expReward: 10000,
  },
  {
    id: "achievement-community",
    name: "社区之星",
    description: "收集所有社区徽章，成为社区之星",
    category: "community",
    badges: [
      "shejiao-first", "shejiao-sharer", "shejiao-mentor", "shejiao-master",
      "help-first", "help-helper", "help-wise", "help-bodhisattva",
      "popularity-first", "popularity-liked", "popularity-star", "popularity-idol",
    ],
    reward: "获得社区管理员权限",
    expReward: 5000,
  },
  {
    id: "achievement-special",
    name: "奇遇之人",
    description: "收集所有特殊徽章，机缘深厚",
    category: "special",
    badges: [
      "time-morning", "time-night", "time-anniversary", "time-birthday",
      "willpower-100", "willpower-1000", "willpower-365", "willpower-10years",
      "adventure-surprise", "adventure-insight", "adventure-mentor", "adventure-destiny",
    ],
    reward: "解锁隐藏功法",
    expReward: 8000,
  },
  {
    id: "achievement-grandmaster",
    name: "凡真宗师",
    description: "收集所有徽章，成为凡真一代宗师",
    category: "special",
    badges: [],
    reward: "获得凡真宗师称号及专属头像框",
    expReward: 50000,
  },
];

export function getBadgesByCategory(category: string): Badge[] {
  return badges.filter((badge) => badge.category === category);
}

export function getBadgesBySubcategory(category: string, subcategory: string): Badge[] {
  return badges.filter(
    (badge) => badge.category === category && badge.subcategory === subcategory
  );
}

export function getBadgeById(id: string): Badge | undefined {
  return badges.find((badge) => badge.id === id);
}

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((achievement) => achievement.id === id);
}

export function getSubcategoriesByCategory(category: string): string[] {
  const subcategories = new Set<string>();
  badges
    .filter((badge) => badge.category === category)
    .forEach((badge) => subcategories.add(badge.subcategory));
  return Array.from(subcategories);
}

export function calculateTotalExp(userBadges: UserBadge[]): number {
  return userBadges.reduce((total, userBadge) => {
    const badge = getBadgeById(userBadge.badgeId);
    return total + (badge?.expReward || 0) * userBadge.tier;
  }, 0);
}

export function getEarnedBadgesCount(userBadges: UserBadge[]): number {
  return userBadges.length;
}

export function getAchievementProgress(
  achievement: Achievement,
  userBadges: UserBadge[]
): { earned: number; total: number; percentage: number } {
  const earned = achievement.badges.filter((badgeId) =>
    userBadges.some((ub) => ub.badgeId === badgeId)
  ).length;
  const total = achievement.badges.length;
  const percentage = total > 0 ? Math.round((earned / total) * 100) : 0;
  return { earned, total, percentage };
}

export function isAchievementCompleted(
  achievement: Achievement,
  userBadges: UserBadge[]
): boolean {
  if (achievement.id === "achievement-grandmaster") {
    return userBadges.length === badges.length;
  }
  return achievement.badges.every((badgeId) =>
    userBadges.some((ub) => ub.badgeId === badgeId)
  );
}

export const mockUserBadges: UserBadge[] = [
  { badgeId: "zhanzhuang-beginner", userId: "user1", earnedAt: new Date("2024-01-15"), tier: 1 },
  { badgeId: "zhanzhuang-persistent", userId: "user1", earnedAt: new Date("2024-02-20"), tier: 2 },
  { badgeId: "donggong-beginner", userId: "user1", earnedAt: new Date("2024-01-20"), tier: 1 },
  { badgeId: "huxi-beginner", userId: "user1", earnedAt: new Date("2024-01-25"), tier: 1 },
  { badgeId: "lianxing-start", userId: "user1", earnedAt: new Date("2024-01-01"), tier: 1 },
  { badgeId: "lianxing-sleep", userId: "user1", earnedAt: new Date("2024-01-15"), tier: 2 },
  { badgeId: "shejiao-first", userId: "user1", earnedAt: new Date("2024-02-01"), tier: 1 },
  { badgeId: "help-first", userId: "user1", earnedAt: new Date("2024-02-10"), tier: 1 },
  { badgeId: "popularity-first", userId: "user1", earnedAt: new Date("2024-02-15"), tier: 1 },
  { badgeId: "willpower-100", userId: "user1", earnedAt: new Date("2024-04-15"), tier: 3 },
];
