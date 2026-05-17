// 缘起板块数据
// 凡真子的真实经历与凡真体系的初心

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  phase: "struggle" | "begin" | "growth" | "breakthrough" | "integration" | "creation";
}

export interface CoreConcept {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface SystemFeature {
  id: string;
  title: string;
  description: string;
}

export interface Statistic {
  value: string;
  label: string;
  suffix?: string;
}

// 凡真子真实修炼时间线
export const timelineEvents: TimelineEvent[] = [
  {
    year: "2015",
    title: "早年筑基，断断续续",
    description: "早年练习八段锦及静坐，断断续续有十年左右，算是打了一些基础。虽未深入，但身体对修炼有了初步记忆。",
    phase: "begin",
  },
  {
    year: "2025.05",
    title: "密集修炼，初窥门径",
    description: "2025年5月开始密集修炼。睡觉醒来全身暖呼呼，手脚非常暖和，阳气生发，气血通畅。开始验证气感，确认修炼有效的积极信号。",
    phase: "begin",
  },
  {
    year: "2025.07",
    title: "深入体验，遭遇瓶颈",
    description: "全身有明显的充气感，闭眼休息十分钟即可快速充电，进入体呼吸阶段。但气行至颈椎玉枕关附近时出现剧烈胀痛，强行催动导致头部胀痛。这是典型的气冲病灶，是形滞与意重共同作用的结果。",
    phase: "breakthrough",
  },
  {
    year: "2025.08",
    title: "能量外放，理事合一",
    description: "能清晰感知两手劳宫穴气流，可揉气团。能感知身体不同部位的气环（眉间、喉咙、胸口、腹部），质感有光滑与粗糙之分。能为女儿做气场按摩，对方感觉如穿上温暖的宇航服。修炼重心从炼气转向炼神，从有为转向无为。",
    phase: "breakthrough",
  },
  {
    year: "2025.09",
    title: "红尘炼心，事上磨练",
    description: "遭遇耳鸣、脾胃虚弱、状态波动等挑战。出差归来因熬夜、应酬导致状态低迷，担心退转。识神与元神开始博弈，生活中处处是道场。从战斗转向滋养，建立觉察触发器。",
    phase: "growth",
  },
  {
    year: "2025.10",
    title: "意识飞跃，元神显象",
    description: "站桩时身体消失，意识从泥丸宫弥漫成环状，感知力极大扩展。篮球中进入心流状态，崴脚后气沉脚踝瞬间自愈。游泳时感知内外水流与体内气机同频共振，阻力消失。体验到身、气、神融为一体的动中禅状态。",
    phase: "breakthrough",
  },
  {
    year: "2025.11",
    title: "融会贯通，凡真诞生",
    description: "以道家内炼为根基，融合现代运动科学与佛家正念觉知，走性命双修、理事圆融的中道之路。没有寻得比较好的老师，过程中将各种体系方法融合起来。凡真体系由此诞生——凡夫即真佛，尘世即道场。",
    phase: "creation",
  },
  {
    year: "2026",
    title: "炼气化神，持续深化",
    description: "目前处于炼气化神阶段。元神显象，体验到弥漫觉知、心流状态、元神学习法。能清晰分辨识神与元神的切换。处于神气博弈期，动中易得，静中难守。继续以静制动，以养代练，神气归根。",
    phase: "integration",
  },
];

// 核心理念
export const coreConcepts: CoreConcept[] = [
  {
    id: "xingming",
    title: "性命双修",
    subtitle: "身体与心灵同步提升",
    description: "以道家命功为基石，以佛家性功为灯塔。命功修复身体、充盈精气，性功澄清杂念、彻见本来面目。身安心则易定，心安身则易养。",
    icon: "YinYang",
  },
  {
    id: "lishi",
    title: "理事圆融",
    subtitle: "理论与实践完美结合",
    description: "不是脱离生活去修炼，而是在生活中修行。站桩是训练场，球场是训练场，会议室是训练场，甚至争吵也是训练场。",
    icon: "CircleDot",
  },
  {
    id: "tianren",
    title: "天人合一",
    subtitle: "人与自然和谐统一",
    description: "体验到意识弥漫，与空间融合，同时感知远近声音。领悟到我只是觉醒在这个世界的投影，最终要认出自己是投影源本身。",
    icon: "CloudSun",
  },
];

// 凡真体系特点
export const systemFeatures: SystemFeature[] = [
  {
    id: "integration",
    title: "融合各家",
    description: "以道家为根基，佛家为灯塔，儒家为入世，中医为保障，武学为实践，不执一偏，博采众长",
  },
  {
    id: "progressive",
    title: "循序渐进",
    description: "四阶九层，阶梯清晰。筑基、小周天、大周天可以较快达成，炼气化神、炼神还虚需长期打磨",
  },
  {
    id: "scientific",
    title: "实证验证",
    description: "每一步修炼都有明确的身心验证标准，不尚玄虚。从追求转向认出，从做事转向是事",
  },
  {
    id: "lifestyle",
    title: "红尘修炼",
    description: "不出家、不辞职、不放弃生活。于红尘中修炼，自有为而无为。工作、家庭、社交皆是道场",
  },
];

// 统计数据
export const statistics: Statistic[] = [
  { value: "10", label: "八段锦基础", suffix: "年+" },
  { value: "9", label: "密集修炼", suffix: "月" },
  { value: "4", label: "修炼阶段", suffix: "阶" },
  { value: "1", label: "凡真体系", suffix: "套" },
];

// 凡真子简介
export const fanzhenProfile = {
  name: "凡真子",
  title: "凡真体系创始人 · 炼气化神阶段修行者",
  description:
    "一位40多岁生活在一线城市的白领，身心感知敏锐，有强烈的自省与实修精神。早年练习八段锦及静坐，断断续续有十年基础。2025年5月开始密集修炼，九个月内经历炼形化精、炼精化气，进入炼气化神阶段。没有寻得比较好的老师，过程中将道家内炼、现代运动科学、佛家正念觉知等各种体系方法融合起来。目前处于炼气化神深化期，体验到弥漫觉知、心流状态、元神显象。",
};

// 初心宣言
export const originalIntention = {
  title: "创立凡真的初心",
  content: [
    "我本是道，道本是我，凡本是真，真亦是凡。",
    "传统修炼体系博大精深，但术语繁杂、门派林立，令现代人望而却步。",
    "能否构建一套融合儒释道医武艺各家智慧、适应现代人生活方式、每一步都可验证的修炼体系？",
    "凡真体系由此诞生——凡夫即真佛，尘世即道场。",
    "不依傍宗教门派，不执取名相境界，唯以身心实证为据。",
    "让普通人也能走上修炼之路，不需要出家，不需要放弃世俗生活。",
  ],
};

// 对修炼者的寄语
export const messageToPractitioners = {
  title: "给修炼者的话",
  content:
    "修炼之路没有捷径，但也没有想象中那么难。只要你愿意开始，愿意坚持，每一天都会有收获。我从2025年5月开始密集修炼，九个月内经历了从验证气感到意识飞跃的完整过程。这说明只要方法得当，筑基、小周天、大周天也是可以较快达成的。反而是炼气化神、炼神还虚这块需要更长时间的打磨。记住：有为之处修无为，无为之处成有为。凡真之路，始于足下。",
};

// 阶段颜色映射
export const phaseColors: Record<TimelineEvent["phase"], { bg: string; border: string; text: string; glow: string }> = {
  struggle: {
    bg: "bg-stone-500/10",
    border: "border-stone-500/30",
    text: "text-stone-400",
    glow: "rgba(168, 162, 158, 0.4)",
  },
  begin: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.4)",
  },
  growth: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    text: "text-sky-400",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  breakthrough: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    glow: "rgba(251, 191, 36, 0.4)",
  },
  integration: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    glow: "rgba(167, 139, 250, 0.4)",
  },
  creation: {
    bg: "bg-cinnabar/10",
    border: "border-cinnabar/30",
    text: "text-cinnabar",
    glow: "rgba(199, 91, 57, 0.4)",
  },
};
