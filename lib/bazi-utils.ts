// 八字排盘与五行分析工具
// 基于传统子平八字理论

export interface BaziResult {
  yearPillar: string;      // 年柱
  monthPillar: string;     // 月柱
  dayPillar: string;       // 日柱
  hourPillar: string;      // 时柱
  yearStem: string;        // 年干
  yearBranch: string;      // 年支
  monthStem: string;       // 月干
  monthBranch: string;     // 月支
  dayStem: string;         // 日干（日主）
  dayBranch: string;       // 日支
  hourStem: string;        // 时干
  hourBranch: string;      // 时支
  fiveElements: Record<string, number>;  // 五行统计
  dayMaster: string;       // 日主
  dayMasterElement: string; // 日主五行
  strength: string;        // 身强身弱
  favorableElements: string[];  // 喜用神
  unfavorableElements: string[]; // 忌神
  personality: string;     // 性格特征
  constitution: string;    // 体质倾向
  cultivationAdvice: string; // 修炼建议
}

// 天干
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
// 地支
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 天干五行
const STEM_ELEMENTS: Record<string, string> = {
  "甲": "木", "乙": "木",
  "丙": "火", "丁": "火",
  "戊": "土", "己": "土",
  "庚": "金", "辛": "金",
  "壬": "水", "癸": "水",
};

// 地支五行
const BRANCH_ELEMENTS: Record<string, string> = {
  "寅": "木", "卯": "木",
  "巳": "火", "午": "火",
  "辰": "土", "戌": "土", "丑": "土", "未": "土",
  "申": "金", "酉": "金",
  "子": "水", "亥": "水",
};

// 地支藏干
const BRANCH_HIDDEN_STEMS: Record<string, string[]> = {
  "子": ["癸"],
  "丑": ["己", "癸", "辛"],
  "寅": ["甲", "丙", "戊"],
  "卯": ["乙"],
  "辰": ["戊", "乙", "癸"],
  "巳": ["丙", "庚", "戊"],
  "午": ["丁", "己"],
  "未": ["己", "丁", "乙"],
  "申": ["庚", "壬", "戊"],
  "酉": ["辛"],
  "戌": ["戊", "辛", "丁"],
  "亥": ["壬", "甲"],
};

// 五行相生相克
const ELEMENT_CYCLE = ["木", "火", "土", "金", "水"];

// 计算年柱
function getYearPillar(year: number): [string, string] {
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  return [STEMS[stemIndex], BRANCHES[branchIndex]];
}

// 计算月柱（基于节气，简化版）
function getMonthPillar(year: number, month: number): [string, string] {
  const yearStemIndex = (year - 4) % 10;
  // 年干决定月干起始
  const monthStemStart = (yearStemIndex % 5) * 2;
  const monthStemIndex = (monthStemStart + month - 1) % 10;
  // 寅月为正月
  const monthBranchIndex = (month + 1) % 12;
  return [STEMS[monthStemIndex], BRANCHES[monthBranchIndex]];
}

// 计算日柱（基于已知基准日）
function getDayPillar(year: number, month: number, day: number): [string, string] {
  // 使用已知的基准日：1900年1月31日为甲辰日
  const baseDate = new Date(1900, 0, 31);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const stemIndex = ((diffDays % 10) + 10) % 10;
  const branchIndex = ((diffDays % 12) + 12) % 12;
  
  return [STEMS[stemIndex], BRANCHES[branchIndex]];
}

// 计算时柱
function getHourPillar(dayStem: string, hour: number): [string, string] {
  const dayStemIndex = STEMS.indexOf(dayStem);
  // 日干决定时干起始
  const hourStemStart = (dayStemIndex % 5) * 2;
  // 时辰对应：23-1子, 1-3丑, 3-5寅, 5-7卯, 7-9辰, 9-11巳, 11-13午, 13-15未, 15-17申, 17-19酉, 19-21戌, 21-23亥
  const hourBranchIndex = Math.floor(((hour + 1) % 24) / 2) % 12;
  const hourStemIndex = (hourStemStart + hourBranchIndex) % 10;
  
  return [STEMS[hourStemIndex], BRANCHES[hourBranchIndex]];
}

// 统计五行
function countFiveElements(
  yearStem: string, yearBranch: string,
  monthStem: string, monthBranch: string,
  dayStem: string, dayBranch: string,
  hourStem: string, hourBranch: string
): Record<string, number> {
  const counts: Record<string, number> = { "木": 0, "火": 0, "土": 0, "金": 0, "水": 0 };
  
  // 天干五行
  const stems = [yearStem, monthStem, dayStem, hourStem];
  stems.forEach(stem => {
    const element = STEM_ELEMENTS[stem];
    if (element) counts[element] += 1;
  });
  
  // 地支五行（本气）
  const branches = [yearBranch, monthBranch, dayBranch, hourBranch];
  branches.forEach(branch => {
    const element = BRANCH_ELEMENTS[branch];
    if (element) counts[element] += 0.6; // 地支本气权重
    
    // 藏干
    const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
    if (hiddenStems) {
      hiddenStems.forEach((stem, index) => {
        const element = STEM_ELEMENTS[stem];
        if (element) {
          // 藏干权重：中气0.3，余气0.1
          const weight = index === 0 ? 0.3 : 0.1;
          counts[element] += weight;
        }
      });
    }
  });
  
  return counts;
}

// 判断身强身弱
function judgeStrength(dayMaster: string, fiveElements: Record<string, number>): string {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const dayCount = fiveElements[dayElement] || 0;
  const total = Object.values(fiveElements).reduce((a, b) => a + b, 0);
  const ratio = dayCount / total;
  
  if (ratio > 0.3) return "身强";
  if (ratio < 0.2) return "身弱";
  return "平和";
}

// 确定喜用神
function getFavorableElements(dayMaster: string, strength: string): string[] {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const elementIndex = ELEMENT_CYCLE.indexOf(dayElement);
  
  if (strength === "身强") {
    // 身强喜克泄耗
    const next1 = ELEMENT_CYCLE[(elementIndex + 1) % 5]; // 食伤
    const next2 = ELEMENT_CYCLE[(elementIndex + 2) % 5]; // 财
    const prev1 = ELEMENT_CYCLE[(elementIndex + 4) % 5]; // 官杀
    return [next1, next2, prev1];
  } else {
    // 身弱喜生扶
    const prev1 = ELEMENT_CYCLE[(elementIndex + 4) % 5]; // 印
    const same = dayElement; // 比劫
    return [prev1, same];
  }
}

// 确定忌神
function getUnfavorableElements(dayMaster: string, strength: string): string[] {
  const favorable = getFavorableElements(dayMaster, strength);
  return ELEMENT_CYCLE.filter(e => !favorable.includes(e));
}

// 性格分析
function getPersonality(dayMaster: string, fiveElements: Record<string, number>): string {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const maxElement = Object.entries(fiveElements).sort((a, b) => b[1] - a[1])[0][0];
  
  const personalities: Record<string, string> = {
    "木": "仁慈正直，有上进心，喜欢自由，但有时过于固执",
    "火": "热情开朗，思维敏捷，善于表达，但有时急躁冲动",
    "土": "稳重踏实，诚实守信，包容力强，但有时保守固执",
    "金": "刚毅果断，讲义气，有原则，但有时过于严厉",
    "水": "聪明灵活，善于变通，有洞察力，但有时优柔寡断",
  };
  
  return personalities[dayElement] || "性格平和，适应力强";
}

// 体质分析
function getConstitution(fiveElements: Record<string, number>): string {
  const sorted = Object.entries(fiveElements).sort((a, b) => b[1] - a[1]);
  const [maxElement, maxValue] = sorted[0];
  const [minElement, minValue] = sorted[sorted.length - 1];
  
  if (maxValue - minValue > 1.5) {
    const constitutions: Record<string, string> = {
      "木": "肝气偏旺，需注意疏肝理气",
      "火": "心火偏旺，需注意清心降火",
      "土": "脾胃偏强，需注意运化平衡",
      "金": "肺气偏旺，需注意润燥养肺",
      "水": "肾气偏旺，需注意温阳化气",
    };
    return constitutions[maxElement] || "体质平和";
  }
  
  return "五行较为平衡，体质平和";
}

// 修炼建议
function getCultivationAdvice(
  dayMaster: string,
  strength: string,
  favorableElements: string[],
  fiveElements: Record<string, number>
): string {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const advice: string[] = [];
  
  // 根据身强身弱给建议
  if (strength === "身强") {
    advice.push("身强宜泄不宜补，适合练习动功以疏泄能量");
  } else {
    advice.push("身弱宜补不宜泄，适合练习静功以培补元气");
  }
  
  // 根据喜用神给建议
  const elementAdvice: Record<string, string> = {
    "木": "宜练习伸展类功法，如八段锦、五禽戏之虎戏、鹿戏",
    "火": "宜练习静心类功法，如静坐、观想",
    "土": "宜练习站桩类功法，如混元立桩、太极桩",
    "金": "宜练习呼吸类功法，如六字诀、安那般那",
    "水": "宜练习导引类功法，如涌泉归元、脊柱运动",
  };
  
  favorableElements.forEach(element => {
    if (elementAdvice[element]) {
      advice.push(elementAdvice[element]);
    }
  });
  
  // 根据五行缺失给建议
  const minElement = Object.entries(fiveElements).sort((a, b) => a[1] - b[1])[0][0];
  advice.push(`五行中${minElement}偏弱，可适当补充${minElement}属性功法`);
  
  return advice.join("；");
}

// 主函数：排八字
export function calculateBazi(
  year: number,
  month: number,
  day: number,
  hour: number,
  isLunar: boolean = false
): BaziResult {
  // 如果是农历，需要转换为公历（简化处理，实际应用需要更精确的农历转换）
  let gregorianYear = year;
  let gregorianMonth = month;
  let gregorianDay = day;
  
  // 计算四柱
  const [yearStem, yearBranch] = getYearPillar(gregorianYear);
  const [monthStem, monthBranch] = getMonthPillar(gregorianYear, gregorianMonth);
  const [dayStem, dayBranch] = getDayPillar(gregorianYear, gregorianMonth, gregorianDay);
  const [hourStem, hourBranch] = getHourPillar(dayStem, hour);
  
  // 统计五行
  const fiveElements = countFiveElements(
    yearStem, yearBranch,
    monthStem, monthBranch,
    dayStem, dayBranch,
    hourStem, hourBranch
  );
  
  // 判断身强身弱
  const strength = judgeStrength(dayStem, fiveElements);
  
  // 喜用神
  const favorableElements = getFavorableElements(dayStem, strength);
  const unfavorableElements = getUnfavorableElements(dayStem, strength);
  
  return {
    yearPillar: yearStem + yearBranch,
    monthPillar: monthStem + monthBranch,
    dayPillar: dayStem + dayBranch,
    hourPillar: hourStem + hourBranch,
    yearStem,
    yearBranch,
    monthStem,
    monthBranch,
    dayStem,
    dayBranch,
    hourStem,
    hourBranch,
    fiveElements,
    dayMaster: dayStem,
    dayMasterElement: STEM_ELEMENTS[dayStem],
    strength,
    favorableElements,
    unfavorableElements,
    personality: getPersonality(dayStem, fiveElements),
    constitution: getConstitution(fiveElements),
    cultivationAdvice: getCultivationAdvice(dayStem, strength, favorableElements, fiveElements),
  };
}

// 五行颜色
export const ELEMENT_COLORS: Record<string, string> = {
  "木": "#4ade80",
  "火": "#f87171",
  "土": "#fbbf24",
  "金": "#e5e7eb",
  "水": "#60a5fa",
};

// 五行对应脏腑
export const ELEMENT_ORGANS: Record<string, string[]> = {
  "木": ["肝", "胆"],
  "火": ["心", "小肠"],
  "土": ["脾", "胃"],
  "金": ["肺", "大肠"],
  "水": ["肾", "膀胱"],
};

// 五行对应方位
export const ELEMENT_DIRECTIONS: Record<string, string> = {
  "木": "东",
  "火": "南",
  "土": "中",
  "金": "西",
  "水": "北",
};

// 五行对应季节
export const ELEMENT_SEASONS: Record<string, string> = {
  "木": "春",
  "火": "夏",
  "土": "长夏",
  "金": "秋",
  "水": "冬",
};
