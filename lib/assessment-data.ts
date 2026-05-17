// 修炼评估问卷数据
// 用于自我检测、阶段判定、体质评估

export interface Question {
  id: string;
  category: "body" | "experience" | "symptom" | "mind" | "time";
  question: string;
  type: "single" | "multiple" | "scale";
  options: {
    value: string | number;
    label: string;
    score?: number;
    stage?: string;
    level?: number;
    constitution?: string;
  }[];
}

export interface AssessmentResult {
  stage: string;
  level: number;
  stageName: string;
  constitution: string;
  recommendedGongfa: string[];
  dailyPractice: string;
  warnings: string[];
}

// 身体基础检测
export const bodyQuestions: Question[] = [
  {
    id: "age",
    category: "body",
    question: "您的年龄段是？",
    type: "single",
    options: [
      { value: "18-25", label: "18-25岁", score: 5 },
      { value: "26-35", label: "26-35岁", score: 4 },
      { value: "36-45", label: "36-45岁", score: 3 },
      { value: "46-55", label: "46-55岁", score: 2 },
      { value: "56+", label: "56岁以上", score: 1 },
    ],
  },
  {
    id: "exercise",
    category: "body",
    question: "您目前的运动习惯如何？",
    type: "single",
    options: [
      { value: "none", label: "几乎不运动", score: 1 },
      { value: "occasional", label: "偶尔运动（每周1-2次）", score: 2 },
      { value: "regular", label: "规律运动（每周3-4次）", score: 3 },
      { value: "daily", label: "每天运动", score: 4 },
      { value: "intensive", label: "高强度训练", score: 5 },
    ],
  },
  {
    id: "sleep",
    category: "body",
    question: "您的睡眠质量如何？",
    type: "single",
    options: [
      { value: "poor", label: "入睡困难，易醒，多梦", score: 1 },
      { value: "fair", label: "一般，有时失眠", score: 2 },
      { value: "good", label: "较好，偶尔多梦", score: 3 },
      { value: "excellent", label: "很好，一觉到天亮", score: 4 },
    ],
  },
  {
    id: "energy",
    category: "body",
    question: "您白天的精力状态如何？",
    type: "single",
    options: [
      { value: "low", label: "经常疲劳，提不起精神", score: 1 },
      { value: "medium", label: "下午容易犯困", score: 2 },
      { value: "good", label: "精力充沛，偶尔疲劳", score: 3 },
      { value: "high", label: "全天精力充沛", score: 4 },
    ],
  },
];

// 修炼经历检测
export const experienceQuestions: Question[] = [
  {
    id: "has_practice",
    category: "experience",
    question: "您之前是否有过修炼/练功经历？",
    type: "single",
    options: [
      { value: "none", label: "完全没有", score: 0, stage: "lianxing", level: 1 },
      { value: "beginner", label: "接触过，但没有系统练习（如偶尔打坐、练过八段锦等）", score: 1, stage: "lianxing", level: 3 },
      { value: "intermediate", label: "有系统练习过一段时间（半年以上）", score: 2, stage: "lianjing", level: 1 },
      { value: "advanced", label: "有多年修炼经验", score: 3, stage: "lianqi", level: 1 },
    ],
  },
  {
    id: "practice_type",
    category: "experience",
    question: "如果您有修炼经历，主要练习的是哪个体系？（可多选）",
    type: "multiple",
    options: [
      { value: "dao", label: "道家（内丹、站桩、导引等）" },
      { value: "fo", label: "佛家（禅修、止观、密宗等）" },
      { value: "yoga", label: "瑜伽（体式、呼吸、冥想等）" },
      { value: "taiji", label: "太极/武术" },
      { value: "qigong", label: "气功" },
      { value: "none", label: "没有特定体系" },
    ],
  },
  {
    id: "practice_duration",
    category: "experience",
    question: "如果有修炼经历，累计练习了多长时间？",
    type: "single",
    options: [
      { value: "none", label: "没有修炼经历", score: 0 },
      { value: "less1", label: "不到1年", score: 1 },
      { value: "1-3", label: "1-3年", score: 2 },
      { value: "3-5", label: "3-5年", score: 3 },
      { value: "5+", label: "5年以上", score: 4 },
    ],
  },
];

// 症状检测（用于判断阶段）
export const symptomQuestions: Question[] = [
  {
    id: "body_sensation",
    category: "symptom",
    question: "静坐/站桩时，您是否有以下身体感受？（可多选）",
    type: "multiple",
    options: [
      { value: "warm", label: "身体发热、手脚温暖", stage: "lianjing", level: 1 },
      { value: "tingling", label: "身体某些部位有麻、胀、痒感", stage: "lianjing", level: 3 },
      { value: "flow", label: "感觉有气在体内流动", stage: "lianqi", level: 1 },
      { value: "dantian", label: "丹田有明显的温热感或气感", stage: "lianqi", level: 3 },
      { value: "meridian", label: "能感觉到经络运行（如小周天）", stage: "lianqi", level: 5 },
      { value: "none", label: "没有特殊感受", stage: "lianxing", level: 1 },
    ],
  },
  {
    id: "mind_state",
    category: "symptom",
    question: "修炼时，您的心理状态如何？",
    type: "single",
    options: [
      { value: "distracted", label: "杂念很多，难以集中", stage: "lianxing", level: 1 },
      { value: "calm", label: "能安静下来，但偶尔走神", stage: "lianxing", level: 3 },
      { value: "focused", label: "能较长时间保持专注", stage: "lianjing", level: 1 },
      { value: "empty", label: "能进入'空'的状态，念头自然减少", stage: "lianqi", level: 1 },
      { value: "unity", label: "能体验到'天人合一'或'与道合一'的感觉", stage: "lianshen", level: 1 },
    ],
  },
  {
    id: "breath",
    category: "symptom",
    question: "您的呼吸状态如何？",
    type: "single",
    options: [
      { value: "normal", label: "正常呼吸，没有特别注意", stage: "lianxing", level: 1 },
      { value: "deep", label: "能自然地深呼吸，腹部起伏明显", stage: "lianxing", level: 3 },
      { value: "slow", label: "呼吸变得细长、均匀", stage: "lianjing", level: 1 },
      { value: "micro", label: "呼吸变得极其微细，似有似无", stage: "lianqi", level: 3 },
      { value: "stop", label: "偶尔出现'胎息'或呼吸暂停的状态", stage: "lianshen", level: 1 },
    ],
  },
  {
    id: "energy_feeling",
    category: "symptom",
    question: "您是否有过以下能量体验？（可多选）",
    type: "multiple",
    options: [
      { value: "none", label: "没有特别的能量体验" },
      { value: "heat", label: "身体某部位发热（如丹田、命门）" },
      { value: "electric", label: "有电流般的感觉" },
      { value: "magnetic", label: "身体有吸引力或排斥力感" },
      { value: "light", label: "身体发光或看到光" },
      { value: "expansion", label: "意识扩展，感觉身体变大或消失" },
    ],
  },
];

// 中医体质检测
export const constitutionQuestions: Question[] = [
  {
    id: "cold_heat",
    category: "body",
    question: "您平时怕冷还是怕热？",
    type: "single",
    options: [
      { value: "cold", label: "怕冷，手脚冰凉", constitution: "阳虚" },
      { value: "hot", label: "怕热，容易上火", constitution: "阴虚" },
      { value: "both", label: "既怕冷又怕热", constitution: "阴阳两虚" },
      { value: "normal", label: "都不怕，比较适应", constitution: "平和" },
    ],
  },
  {
    id: "digestion",
    category: "body",
    question: "您的消化情况如何？",
    type: "single",
    options: [
      { value: "poor", label: "食欲不振，容易腹胀", constitution: "气虚" },
      { value: "greasy", label: "喜食油腻，口黏腻", constitution: "痰湿" },
      { value: "dry", label: "口干口苦，便秘", constitution: "湿热" },
      { value: "good", label: "消化良好，二便正常", constitution: "平和" },
    ],
  },
  {
    id: "emotion",
    category: "mind",
    question: "您的情绪状态如何？",
    type: "single",
    options: [
      { value: "anxious", label: "容易焦虑、紧张", constitution: "气郁" },
      { value: "irritable", label: "容易烦躁、发怒", constitution: "湿热" },
      { value: "depressed", label: "容易低落、悲观", constitution: "气郁" },
      { value: "stable", label: "情绪稳定，心态平和", constitution: "平和" },
    ],
  },
  {
    id: "complexion",
    category: "body",
    question: "您的面色和唇色如何？",
    type: "single",
    options: [
      { value: "pale", label: "面色苍白或萎黄", constitution: "气虚" },
      { value: "red", label: "面色潮红或颧红", constitution: "阴虚" },
      { value: "dark", label: "面色晦暗，有色斑", constitution: "血瘀" },
      { value: "normal", label: "面色红润有光泽", constitution: "平和" },
    ],
  },
];

// 修炼时间评估
export const timeQuestions: Question[] = [
  {
    id: "daily_time",
    category: "time",
    question: "您每天能投入多长时间修炼？",
    type: "single",
    options: [
      { value: "15", label: "15分钟以内" },
      { value: "30", label: "15-30分钟" },
      { value: "60", label: "30-60分钟" },
      { value: "120", label: "1-2小时" },
      { value: "more", label: "2小时以上" },
    ],
  },
  {
    id: "practice_time",
    category: "time",
    question: "您 prefer 什么时间修炼？",
    type: "single",
    options: [
      { value: "morning", label: "早晨（5-8点）" },
      { value: "noon", label: "中午（11-13点）" },
      { value: "evening", label: "傍晚（17-19点）" },
      { value: "night", label: "晚上（21-23点）" },
      { value: "flexible", label: "时间不固定" },
    ],
  },
];

// 凡真体系阶段特征（用于判定）
export const stageCharacteristics = {
  lianxing: {
    name: "炼形化精",
    levels: 9,
    features: [
      "身体逐渐柔软，筋骨舒展",
      "睡眠质量改善",
      "精力充沛，疲劳感减少",
      "食欲改善，消化变好",
      "情绪趋于稳定",
    ],
    gongfa: ["混元立桩功", "八段锦", "五禽戏", "自我推拿"],
  },
  lianjing: {
    name: "炼精化气",
    levels: 9,
    features: [
      "丹田有温热感",
      "呼吸变得深长均匀",
      "身体某些部位有气感",
      "静坐时容易入定",
      "体内有能量流动的感觉",
    ],
    gongfa: ["涌泉归元法", "六字诀", "强壮功", "易筋经"],
  },
  lianqi: {
    name: "炼气化神",
    levels: 9,
    features: [
      "气感明显，能引导气流",
      "出现小周天或大周天",
      "识神逐渐退位，杂念减少",
      "偶有超常感知",
      "心境空明，觉知敏锐",
    ],
    gongfa: ["弥漫识海观", "止观法门", "内观禅", "太极拳"],
  },
  lianshen: {
    name: "炼神返虚",
    levels: 9,
    features: [
      "常处于无为状态",
      "与万物合一的体验",
      "超越二元对立",
      "神通自然显现",
      "常住当下，不随境转",
    ],
    gongfa: ["太虚凝神法", "禅宗坐禅", "慈悲心法", "克利亚瑜伽"],
  },
};

// 体质对应功法
export const constitutionGongfa: Record<string, string[]> = {
  "阳虚": ["混元立桩功", "八段锦", "强壮功", "五禽戏"],
  "阴虚": ["静坐", "瑜伽睡眠", "身体扫描", "内观禅"],
  "痰湿": ["八段锦", "易筋经", "自我推拿", "五禽戏"],
  "湿热": ["静坐", "呼吸工作法", "渐进放松", "正念冥想"],
  "气郁": ["太极拳", "八卦掌", "大舞", "拜日式"],
  "气虚": ["混元立桩功", "六字诀", "强壮功", "八段锦"],
  "血瘀": ["易筋经", "五禽戏", "自我推拿", "太极拳"],
  "平和": ["混元立桩功", "八段锦", "静坐", "太极拳"],
};

// 计算评估结果
export function calculateAssessment(answers: Record<string, any>): AssessmentResult {
  let totalScore = 0;
  let stage = "lianxing";
  let level = 1;
  let constitution = "平和";
  const warnings: string[] = [];

  // 计算基础分数
  Object.entries(answers).forEach(([key, value]) => {
    // 处理修炼经历
    if (key === "has_practice" && typeof value === "string") {
      const option = experienceQuestions[0].options.find(o => o.value === value);
      if (option?.stage) stage = option.stage;
      if (option?.level) level = option.level;
    }

    // 处理症状
    if (key === "body_sensation" && Array.isArray(value)) {
      value.forEach((v: string) => {
        const option = symptomQuestions[0].options.find(o => o.value === v);
        if (option?.stage) {
          // 取最高阶段
          const stageOrder = ["lianxing", "lianjing", "lianqi", "lianshen"];
          if (stageOrder.indexOf(option.stage) > stageOrder.indexOf(stage)) {
            stage = option.stage;
          }
        }
        if (option?.level && option.level > level) {
          level = option.level;
        }
      });
    }

    // 处理心理状态
    if (key === "mind_state" && typeof value === "string") {
      const option = symptomQuestions[1].options.find(o => o.value === value);
      if (option?.stage) {
        const stageOrder = ["lianxing", "lianjing", "lianqi", "lianshen"];
        if (stageOrder.indexOf(option.stage) > stageOrder.indexOf(stage)) {
          stage = option.stage;
        }
      }
    }

    // 处理呼吸状态
    if (key === "breath" && typeof value === "string") {
      const option = symptomQuestions[2].options.find(o => o.value === value);
      if (option?.stage) {
        const stageOrder = ["lianxing", "lianjing", "lianqi", "lianshen"];
        if (stageOrder.indexOf(option.stage) > stageOrder.indexOf(stage)) {
          stage = option.stage;
        }
      }
    }

    // 处理体质
    if (key === "cold_heat" && typeof value === "string") {
      const option = constitutionQuestions[0].options.find(o => o.value === value);
      if (option?.constitution) constitution = option.constitution;
    }
  });

  // 根据修炼时长调整级别
  const practiceDuration = answers.practice_duration;
  if (practiceDuration) {
    const durationMap: Record<string, number> = {
      "less1": 1,
      "1-3": 3,
      "3-5": 5,
      "5+": 7,
    };
    if (durationMap[practiceDuration]) {
      level = Math.max(level, durationMap[practiceDuration]);
    }
  }

  // 确保级别在范围内
  level = Math.min(Math.max(level, 1), 9);

  // 生成警告
  if (answers.sleep === "poor") {
    warnings.push("睡眠质量较差，建议先调理睡眠再开始深度修炼");
  }
  if (answers.energy === "low") {
    warnings.push("精力不足，建议从温和的动功开始，避免过度消耗");
  }

  const stageInfo = stageCharacteristics[stage as keyof typeof stageCharacteristics];

  return {
    stage,
    level,
    stageName: stageInfo?.name || "炼形化精",
    constitution,
    recommendedGongfa: constitutionGongfa[constitution] || constitutionGongfa["平和"],
    dailyPractice: getDailyPractice(stage, level, answers.daily_time),
    warnings,
  };
}

// 获取每日修炼建议
function getDailyPractice(stage: string, level: number, dailyTime: string): string {
  const timeMap: Record<string, string> = {
    "15": "15分钟",
    "30": "30分钟",
    "60": "1小时",
    "120": "2小时",
    "more": "2小时以上",
  };

  const time = timeMap[dailyTime] || "30分钟";

  if (stage === "lianxing") {
    return `建议每日${time}，以动功为主（八段锦/站桩），配合静坐10分钟`;
  } else if (stage === "lianjing") {
    return `建议每日${time}，动静结合（站桩30% + 呼吸法40% + 静坐30%）`;
  } else if (stage === "lianqi") {
    return `建议每日${time}，以心法为主（静坐60% + 动功40%）`;
  } else {
    return `建议每日${time}，自然修炼，不刻意追求形式`;
  }
}
