// 凡真修炼体系扩展数据
// 包含每周计划、功法口诀、突破之法、凡真子组合等详细内容

import { StageKey } from "./system-data";

// ==================== 每周修炼计划数据 ====================

export interface DailySchedule {
  time: string;
  gongfa: string;
  duration: string;
  keyPoints: string[];
}

export interface WeeklyPlan {
  week: number;
  weekTitle: string;
  weekDesc: string;
  dailySchedule: DailySchedule[];
  weeklyGoals: string[];
  checkItems: string[];
  adjustments: string;
}

export interface StageWeeklyPlan {
  stage: StageKey;
  stageTitle: string;
  totalWeeks: number;
  overview: string;
  weeklyPlans: WeeklyPlan[];
}

export const weeklyPlansData: Record<StageKey, StageWeeklyPlan> = {
  lianxing: {
    stage: "lianxing",
    stageTitle: "炼形化精",
    totalWeeks: 12,
    overview: "炼形化精阶段为期12周，分为四个阶段逐步深入。从建立习惯开始，逐步增加练功时间和复杂度，最终形成稳定的修炼基础。",
    weeklyPlans: [
      {
        week: 1,
        weekTitle: "建立习惯 · 第一周",
        weekDesc: "重点是养成每天固定时间练功的习惯，不求效果，只求坚持。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:15)",
            gongfa: "混元立桩功",
            duration: "5分钟",
            keyPoints: ["面向东方，双脚平行与肩同宽", "姿势不要求完美，先站住", "自然呼吸，不刻意", "站完后轻轻活动四肢"]
          },
          {
            time: "上午 (9:00-9:10)",
            gongfa: "八段锦前两式",
            duration: "5分钟",
            keyPoints: ["双手托天理三焦", "左右开弓似射雕", "动作缓慢，配合呼吸", "感受身体拉伸"]
          },
          {
            time: "下午 (15:00-15:10)",
            gongfa: "揉腹功",
            duration: "5分钟",
            keyPoints: ["顺时针36圈", "逆时针36圈", "力度轻柔，意随手转", "饭后一小时进行"]
          },
          {
            time: "睡前 (21:30-21:40)",
            gongfa: "鸣天鼓 + 叩齿吞津",
            duration: "5分钟",
            keyPoints: ["掩耳敲击36次", "叩齿36次", "搅舌生津，分三口咽下", "意念引至丹田"]
          }
        ],
        weeklyGoals: ["每天完成至少2次练功", "总练功时间达到60分钟以上", "记录练功感受"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "如果某天实在没时间，至少完成晨起站桩5分钟。不要追求完美，先建立习惯。"
      },
      {
        week: 2,
        weekTitle: "建立习惯 · 第二周",
        weekDesc: "在上周基础上，逐步增加站桩时间，开始体会身体放松的感觉。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:15)",
            gongfa: "混元立桩功",
            duration: "8-10分钟",
            keyPoints: ["检查姿势：脚平、膝微屈、胯收", "脊柱自然正直", "双肩放松下沉", "意念轻轻放在丹田"]
          },
          {
            time: "上午 (9:00-9:15)",
            gongfa: "八段锦前四式",
            duration: "8分钟",
            keyPoints: ["增加：调理脾胃须单举", "增加：五劳七伤往后瞧", "动作与呼吸配合", "体会每个动作的拉伸感"]
          },
          {
            time: "下午 (15:00-15:10)",
            gongfa: "揉腹功 + 踮脚功",
            duration: "8分钟",
            keyPoints: ["揉腹后增加踮脚36次", "踮脚吸气，落下呼气", "体会脚底涌泉穴", "引气下行"]
          },
          {
            time: "睡前 (21:30-21:45)",
            gongfa: "鸣天鼓 + 叩齿吞津 + 放松",
            duration: "8分钟",
            keyPoints: ["完成后静坐2分钟", "感受身体放松", "准备入睡", "保持心情平和"]
          }
        ],
        weeklyGoals: ["每天完成至少3次练功", "总练功时间达到90分钟以上", "体会身体放松的感觉"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "如果身体某部位酸痛明显，适当减少该部位相关动作，但不停止练功。"
      },
      {
        week: 3,
        weekTitle: "逐步深入 · 第三周",
        weekDesc: "站桩时间增加到10-15分钟，加入易筋经练习，感受气血运行。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:20)",
            gongfa: "混元立桩功",
            duration: "12-15分钟",
            keyPoints: ["姿势逐步标准化", "体会丹田温热感", "呼吸自然深化", "保持身体放松不紧张"]
          },
          {
            time: "上午 (9:30-9:50)",
            gongfa: "易筋经前四式",
            duration: "15分钟",
            keyPoints: ["韦驮献杵", "横担降魔杵", "掌托天门", "摘星换斗", "每式3-5次", "体会筋膜拉伸"]
          },
          {
            time: "下午 (15:00-15:15)",
            gongfa: "八段锦 + 揉腹",
            duration: "12分钟",
            keyPoints: ["八段锦全套6式", "配合呼吸", "完成后揉腹5分钟", "动作连贯流畅"]
          },
          {
            time: "睡前 (21:30-21:50)",
            gongfa: "辅助功法组合",
            duration: "15分钟",
            keyPoints: ["鸣天鼓", "叩齿吞津", "踮脚功", "静坐调息3分钟", "收功入睡"]
          }
        ],
        weeklyGoals: ["每天完成全部4次练功", "总练功时间达到120分钟以上", "体会丹田温热感", "记录身体反应"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "站桩时如果出现颤抖，适当降低桩架高度。易筋经动作不要求到位，循序渐进。"
      },
      {
        week: 4,
        weekTitle: "逐步深入 · 第四周",
        weekDesc: "稳定上周的练习量，提高动作质量，开始体会气感。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:20)",
            gongfa: "混元立桩功",
            duration: "15分钟",
            keyPoints: ["姿势标准稳定", "体会丹田气感", "呼吸细匀深长", "意念轻守丹田"]
          },
          {
            time: "上午 (9:30-9:55)",
            gongfa: "易筋经全套八式",
            duration: "20分钟",
            keyPoints: ["八式全部练习", "每式5次", "动作与呼吸配合", "意念引导气血"]
          },
          {
            time: "下午 (15:00-15:20)",
            gongfa: "八段锦全套 + 揉腹",
            duration: "18分钟",
            keyPoints: ["八段锦全套8式", "每式6次", "完成后揉腹", "体会全身气感"]
          },
          {
            time: "睡前 (21:30-21:50)",
            gongfa: "辅助功法 + 静坐",
            duration: "15分钟",
            keyPoints: ["辅助功法组合", "静坐调息5分钟", "体会身心宁静", "安然入睡"]
          }
        ],
        weeklyGoals: ["每天完成全部4次练功", "总练功时间达到150分钟以上", "动作质量提高", "初步体会气感"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "如果某天感觉疲劳，减少动功次数，但保持站桩。疲劳是身体调整的信号。"
      },
      {
        week: 5,
        weekTitle: "稳定练习 · 第五周",
        weekDesc: "站桩时间稳定在15-20分钟，动功质量提升，形成稳定的修炼节奏。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:25)",
            gongfa: "混元立桩功",
            duration: "18-20分钟",
            keyPoints: ["姿势稳定不动", "丹田温热感明显", "呼吸深细长匀", "全身放松"]
          },
          {
            time: "上午 (9:30-9:55)",
            gongfa: "易筋经全套",
            duration: "20分钟",
            keyPoints: ["每式6次", "动作标准到位", "呼吸与动作协调", "体会气随动作运行"]
          },
          {
            time: "下午 (15:00-15:25)",
            gongfa: "八段锦全套 + 揉腹",
            duration: "20分钟",
            keyPoints: ["每式8次", "动作连贯流畅", "呼吸深长", "意念引导"]
          },
          {
            time: "睡前 (21:30-21:55)",
            gongfa: "辅助功法 + 静坐",
            duration: "20分钟",
            keyPoints: ["辅助功法", "静坐调息8分钟", "体会宁静", "收功"]
          }
        ],
        weeklyGoals: ["每天总练功时间达到180分钟", "站桩稳定在20分钟", "动作质量显著提升", "气感明显"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "本周是关键的稳定期，保持练习量不变，重点提高质量。"
      },
      {
        week: 6,
        weekTitle: "稳定练习 · 第六周",
        weekDesc: "巩固练习成果，开始尝试功法组合，体会不同功法的协同效果。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:25)",
            gongfa: "混元立桩功",
            duration: "20分钟",
            keyPoints: ["姿势稳定", "丹田气感充实", "呼吸胎息初现", "身心合一"]
          },
          {
            time: "上午 (9:30-10:00)",
            gongfa: "易筋经 + 八段锦组合",
            duration: "25分钟",
            keyPoints: ["先练易筋经", "再练八段锦", "体会两种功法的不同", "组合效果更好"]
          },
          {
            time: "下午 (15:00-15:25)",
            gongfa: "动功 + 揉腹",
            duration: "20分钟",
            keyPoints: ["选择一种动功深入", "配合揉腹", "体会气血运行", "放松身心"]
          },
          {
            time: "睡前 (21:30-22:00)",
            gongfa: "辅助功法 + 静坐",
            duration: "25分钟",
            keyPoints: ["辅助功法", "静坐调息10分钟", "深入宁静", "收功入睡"]
          }
        ],
        weeklyGoals: ["每天总练功时间达到200分钟", "功法组合流畅", "气感稳定", "睡眠质量明显改善"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "如果感觉精力充沛，可以适当增加站桩时间。如果感觉疲劳，保持现有量。"
      },
      {
        week: 7,
        weekTitle: "稳定练习 · 第七周",
        weekDesc: "深化练习，站桩时间逐步增加到25分钟，动功更加流畅自然。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:30)",
            gongfa: "混元立桩功",
            duration: "22-25分钟",
            keyPoints: ["姿势如如不动", "丹田充实温热", "呼吸微细", "意念若有若无"]
          },
          {
            time: "上午 (9:30-10:00)",
            gongfa: "易筋经全套",
            duration: "25分钟",
            keyPoints: ["每式8次", "动作如行云流水", "呼吸深长", "气感明显"]
          },
          {
            time: "下午 (15:00-15:30)",
            gongfa: "八段锦全套 + 揉腹",
            duration: "25分钟",
            keyPoints: ["每式8-10次", "动作与呼吸完美配合", "意念引导", "体会全身气感"]
          },
          {
            time: "睡前 (21:30-22:00)",
            gongfa: "辅助功法 + 静坐",
            duration: "25分钟",
            keyPoints: ["辅助功法", "静坐调息10分钟", "深入静定", "收功"]
          }
        ],
        weeklyGoals: ["每天总练功时间达到220分钟", "站桩稳定在25分钟", "动功流畅自然", "精力充沛"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "本周重点是深化，不要急于求成。保持耐心，水到渠成。"
      },
      {
        week: 8,
        weekTitle: "稳定练习 · 第八周",
        weekDesc: "巩固深化成果，准备进入最后阶段的提升期。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:30)",
            gongfa: "混元立桩功",
            duration: "25分钟",
            keyPoints: ["姿势稳定", "丹田气感充盈", "呼吸胎息", "身心宁静"]
          },
          {
            time: "上午 (9:30-10:00)",
            gongfa: "易筋经 + 八段锦",
            duration: "25分钟",
            keyPoints: ["两套动功连贯练习", "中间不休息", "体会气血持续运行", "动作与呼吸合一"]
          },
          {
            time: "下午 (15:00-15:30)",
            gongfa: "动功 + 揉腹 + 踮脚",
            duration: "25分钟",
            keyPoints: ["选择一种动功", "配合揉腹和踮脚", "全面调理", "引气归元"]
          },
          {
            time: "睡前 (21:30-22:00)",
            gongfa: "辅助功法 + 静坐",
            duration: "25分钟",
            keyPoints: ["辅助功法", "静坐调息10分钟", "深入静定", "收功入睡"]
          }
        ],
        weeklyGoals: ["每天总练功时间达到240分钟", "站桩稳定在25分钟", "两套动功连贯", "身体状态良好"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "本周是稳定期的最后一周，为深化提升做准备。"
      },
      {
        week: 9,
        weekTitle: "深化提升 · 第九周",
        weekDesc: "站桩时间增加到25-30分钟，功法组合更加熟练，开始体会深层气感。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:35)",
            gongfa: "混元立桩功",
            duration: "25-30分钟",
            keyPoints: ["姿势如如不动", "丹田气感充盈", "呼吸微细若有若无", "意念若有若无"]
          },
          {
            time: "上午 (9:30-10:05)",
            gongfa: "易筋经 + 八段锦组合",
            duration: "30分钟",
            keyPoints: ["两套动功连贯", "每式8-10次", "动作与呼吸合一", "气感遍布全身"]
          },
          {
            time: "下午 (15:00-15:35)",
            gongfa: "组合功法",
            duration: "30分钟",
            keyPoints: ["动功 + 揉腹 + 踮脚 + 鸣天鼓", "全面调理", "引气归元", "体会深层气感"]
          },
          {
            time: "睡前 (21:30-22:05)",
            gongfa: "辅助功法 + 静坐",
            duration: "30分钟",
            keyPoints: ["辅助功法", "静坐调息15分钟", "深入静定", "收功入睡"]
          }
        ],
        weeklyGoals: ["每天总练功时间达到280分钟", "站桩稳定在30分钟", "功法组合熟练", "深层气感明显"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "本周进入深化期，适当增加练功时间，但不要过度疲劳。"
      },
      {
        week: 10,
        weekTitle: "深化提升 · 第十周",
        weekDesc: "深化功法练习，体会全身气感，准备进入炼精化气阶段。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:35)",
            gongfa: "混元立桩功",
            duration: "30分钟",
            keyPoints: ["姿势稳定", "丹田气感充盈", "呼吸胎息", "全身温热"]
          },
          {
            time: "上午 (9:30-10:05)",
            gongfa: "易筋经 + 八段锦",
            duration: "30分钟",
            keyPoints: ["两套动功连贯", "动作与呼吸合一", "气感遍布", "意念引导"]
          },
          {
            time: "下午 (15:00-15:35)",
            gongfa: "组合功法",
            duration: "30分钟",
            keyPoints: ["全面调理", "引气归元", "体会气行全身", "放松自然"]
          },
          {
            time: "睡前 (21:30-22:05)",
            gongfa: "辅助功法 + 静坐",
            duration: "30分钟",
            keyPoints: ["辅助功法", "静坐调息15分钟", "深入静定", "收功"]
          }
        ],
        weeklyGoals: ["每天总练功时间达到300分钟", "站桩稳定在30分钟", "全身气感明显", "精力充沛"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "如果气感强烈，不要刻意追求。保持自然，为炼精化气做准备。"
      },
      {
        week: 11,
        weekTitle: "深化提升 · 第十一周",
        weekDesc: "巩固深化成果，全面检查身体状态，为进阶做准备。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:35)",
            gongfa: "混元立桩功",
            duration: "30分钟",
            keyPoints: ["姿势如如不动", "丹田充实", "呼吸微细", "身心合一"]
          },
          {
            time: "上午 (9:30-10:05)",
            gongfa: "易筋经 + 八段锦",
            duration: "30分钟",
            keyPoints: ["两套动功", "动作流畅", "气感明显", "意念轻守"]
          },
          {
            time: "下午 (15:00-15:35)",
            gongfa: "组合功法",
            duration: "30分钟",
            keyPoints: ["全面调理", "引气归元", "体会深层气感", "放松"]
          },
          {
            time: "睡前 (21:30-22:05)",
            gongfa: "辅助功法 + 静坐",
            duration: "30分钟",
            keyPoints: ["辅助功法", "静坐调息15分钟", "深入静定", "收功入睡"]
          }
        ],
        weeklyGoals: ["每天总练功时间达到300分钟", "站桩30分钟轻松", "全身气感稳定", "身体状态良好"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "下周调整建议"],
        adjustments: "本周重点检查身体状态，确认是否达到进阶标准。"
      },
      {
        week: 12,
        weekTitle: "圆满总结 · 第十二周",
        weekDesc: "总结12周修炼成果，检查是否达到进阶标准，准备进入炼精化气阶段。",
        dailySchedule: [
          {
            time: "晨起 (6:00-6:35)",
            gongfa: "混元立桩功",
            duration: "30分钟",
            keyPoints: ["姿势稳定", "丹田充实", "呼吸胎息", "身心合一"]
          },
          {
            time: "上午 (9:30-10:05)",
            gongfa: "易筋经 + 八段锦",
            duration: "30分钟",
            keyPoints: ["两套动功", "动作流畅", "气感明显", "意念轻守"]
          },
          {
            time: "下午 (15:00-15:35)",
            gongfa: "组合功法",
            duration: "30分钟",
            keyPoints: ["全面调理", "引气归元", "体会深层气感", "放松"]
          },
          {
            time: "睡前 (21:30-22:05)",
            gongfa: "辅助功法 + 静坐",
            duration: "30分钟",
            keyPoints: ["辅助功法", "静坐调息15分钟", "深入静定", "收功入睡"]
          }
        ],
        weeklyGoals: ["完成12周修炼总结", "检查进阶标准", "确认身体状态", "准备进入下一阶段"],
        checkItems: ["本周练功天数", "本周总时长", "身体状态变化", "是否达到进阶标准"],
        adjustments: "本周是总结周，回顾12周的修炼历程，记录成果和不足，为下一阶段做准备。"
      }
    ]
  },
  lianjing: {
    stage: "lianjing",
    stageTitle: "炼精化气",
    totalWeeks: 24,
    overview: "炼精化气阶段为期24周（6个月），分为三个阶段逐步深入。从培养气感开始，逐步打通小周天，最终达到气机稳定运行。",
    weeklyPlans: [
      {
        week: 1,
        weekTitle: "气感培养 · 第一周",
        weekDesc: "重点是培养丹田气感，学习涌泉归元法的基本要领。",
        dailySchedule: [
          {
            time: "晨起 (5:30-5:55)",
            gongfa: "涌泉归元法",
            duration: "20分钟",
            keyPoints: ["静坐调身", "意守丹田", "呼吸自然", "体会丹田温热"]
          },
          {
            time: "上午 (11:00-11:20)",
            gongfa: "混元立桩功",
            duration: "20分钟",
            keyPoints: ["保持桩功", "体会气感", "呼吸深长", "放松自然"]
          },
          {
            time: "下午 (15:00-15:20)",
            gongfa: "体呼吸训练",
            duration: "15分钟",
            keyPoints: ["扩展呼吸感知", "体会毛孔呼吸", "放松全身", "意念轻守"]
          },
          {
            time: "睡前 (21:00-21:30)",
            gongfa: "涌泉归元法",
            duration: "25分钟",
            keyPoints: ["深入静定", "意守丹田", "体会气感", "收功入睡"]
          }
        ],
        weeklyGoals: ["每天练功时间达到80分钟", "体会丹田温热感", "学习涌泉归元法要领"],
        checkItems: ["本周练功天数", "本周总时长", "气感状态", "下周调整建议"],
        adjustments: "气感不明显是正常的，不要刻意追求。坚持练习，气感自然会出现。"
      },
      {
        week: 2,
        weekTitle: "气感培养 · 第二周",
        weekDesc: "继续培养气感，逐步延长练功时间，体会气的流动。",
        dailySchedule: [
          {
            time: "晨起 (5:30-6:00)",
            gongfa: "涌泉归元法",
            duration: "25分钟",
            keyPoints: ["意守丹田", "体会气感", "呼吸深长", "放松"]
          },
          {
            time: "上午 (11:00-11:25)",
            gongfa: "混元立桩功",
            duration: "25分钟",
            keyPoints: ["桩功稳定", "气感明显", "呼吸自然", "意念轻守"]
          },
          {
            time: "下午 (15:00-15:25)",
            gongfa: "体呼吸训练",
            duration: "20分钟",
            keyPoints: ["毛孔呼吸", "全身放松", "意念扩展", "体会气感"]
          },
          {
            time: "睡前 (21:00-21:35)",
            gongfa: "涌泉归元法",
            duration: "30分钟",
            keyPoints: ["深入静定", "气感充盈", "收功", "入睡"]
          }
        ],
        weeklyGoals: ["每天练功时间达到100分钟", "气感明显", "体会气的流动"],
        checkItems: ["本周练功天数", "本周总时长", "气感状态", "下周调整建议"],
        adjustments: "如果气感过强，意念要更轻。如果气感微弱，保持耐心。"
      }
    ]
  },
  lianqi: {
    stage: "lianqi",
    stageTitle: "炼气化神",
    totalWeeks: 36,
    overview: "炼气化神阶段为期36周（9个月），重点是意识训练，从弥漫识海观入手，逐步扩展到动中三摩地。",
    weeklyPlans: [
      {
        week: 1,
        weekTitle: "觉知扩展 · 第一周",
        weekDesc: "学习弥漫识海观，开始扩展意识觉知范围。",
        dailySchedule: [
          {
            time: "晨起 (5:00-5:35)",
            gongfa: "弥漫识海观",
            duration: "30分钟",
            keyPoints: ["入静", "观想识海", "融入识海", "弥漫扩展"]
          },
          {
            time: "全天",
            gongfa: "动中三摩地",
            duration: "随时",
            keyPoints: ["行走觉知", "站立觉知", "动作觉知", "保持当下"]
          },
          {
            time: "睡前 (21:00-21:40)",
            gongfa: "弥漫识海观",
            duration: "35分钟",
            keyPoints: ["深入观想", "扩展觉知", "不执不取", "收功"]
          }
        ],
        weeklyGoals: ["每天静坐70分钟", "学习弥漫识海观", "开始动中觉知"],
        checkItems: ["本周练功天数", "本周总时长", "觉知状态", "下周调整建议"],
        adjustments: "观想模糊是正常的，随着练习会逐步清晰。"
      }
    ]
  },
  lianshen: {
    stage: "lianshen",
    stageTitle: "炼神返虚",
    totalWeeks: 48,
    overview: "炼神返虚阶段为期48周（12个月），重点是放下自我，体验天人合一。",
    weeklyPlans: [
      {
        week: 1,
        weekTitle: "返源初探 · 第一周",
        weekDesc: "学习投影返源禅，开始探索本源状态。",
        dailySchedule: [
          {
            time: "晨起 (5:00-5:45)",
            gongfa: "投影返源禅",
            duration: "40分钟",
            keyPoints: ["观现象", "识投影", "返本源", "不执取"]
          },
          {
            time: "全天",
            gongfa: "无事禅",
            duration: "随时",
            keyPoints: ["放下修行概念", "日常无事", "觉知不执", "体会平常"]
          },
          {
            time: "睡前 (21:00-21:50)",
            gongfa: "投影返源禅",
            duration: "45分钟",
            keyPoints: ["深入体证", "返源", "不执", "收功"]
          }
        ],
        weeklyGoals: ["每天静坐85分钟", "学习投影返源禅", "体会无事状态"],
        checkItems: ["本周练功天数", "本周总时长", "心境状态", "下周调整建议"],
        adjustments: "此阶段不要追求特殊体验，保持平常心。"
      }
    ]
  }
};

// ==================== 功法口诀数据 ====================

export interface FormulaLine {
  original: string;
  explanation: string;
  annotations?: { term: string; meaning: string }[];
}

export interface GongfaFormula {
  id: string;
  name: string;
  subtitle: string;
  stage: StageKey;
  preface: string;
  lines: FormulaLine[];
  summary: string;
  fanzhenNote: string;
}

export const gongfaFormulas: GongfaFormula[] = [
  {
    id: "hunyuan-lizhuang-koujue",
    name: "混元立桩功口诀",
    subtitle: "无极桩入门心法",
    stage: "lianxing",
    preface: "混元立桩功是凡真修炼体系的基础功法，此口诀由凡真子根据道家站桩心法整理而成，便于记忆和练习。",
    lines: [
      {
        original: "脚平膝微屈，胯收尾下垂",
        explanation: "双脚平行，与肩同宽，膝盖微微弯曲。胯部微微内收，尾闾（尾骨）自然下垂，如坐高凳。",
        annotations: [
          { term: "尾闾", meaning: "尾骨末端，脊柱最下端" },
          { term: "胯收", meaning: "胯部微微向内收敛，不前挺" }
        ]
      },
      {
        original: "百会轻轻领，脊柱自然直",
        explanation: "头顶百会穴如有一根线轻轻向上提拉，脊柱自然伸直，不刻意挺直。",
        annotations: [
          { term: "百会", meaning: "头顶正中穴位，督脉要穴" }
        ]
      },
      {
        original: "含胸拔背，虚领顶劲",
        explanation: "胸部微微内含，背部自然挺拔。头顶虚虚上领，如顶重物。",
        annotations: [
          { term: "含胸", meaning: "胸部微微内收，不前挺" },
          { term: "拔背", meaning: "背部自然挺拔，如贴墙壁" }
        ]
      },
      {
        original: "肩沉肘坠，手抱混元球",
        explanation: "双肩自然下沉，肘部自然下垂。双手抱圆于胸前，如抱一个大气球。",
        annotations: [
          { term: "混元球", meaning: "想象中的圆球，帮助手臂保持圆形" }
        ]
      },
      {
        original: "舌抵上颚，目垂帘",
        explanation: "舌头轻轻抵住上颚，接通任督二脉。双目微闭或垂帘，目光内收。",
        annotations: [
          { term: "任督二脉", meaning: "人体前后两条主要经络，任脉在前，督脉在后" },
          { term: "垂帘", meaning: "眼皮下垂，不完全闭合" }
        ]
      },
      {
        original: "意守丹田，如鸡孵卵",
        explanation: "意念轻轻放在脐下三寸处（丹田），如母鸡孵蛋般轻柔守护，不可过重。",
        annotations: [
          { term: "丹田", meaning: "脐下三寸处，内气汇聚之所" }
        ]
      },
      {
        original: "呼吸自然，松静自然",
        explanation: "呼吸不刻意调整，保持自然。全身放松，心神宁静，一切顺其自然。",
        annotations: []
      },
      {
        original: "站如松，立如钟，不动不摇",
        explanation: "站立如松树般挺拔，如大钟般沉稳。保持姿势不动不摇，培养定力。",
        annotations: []
      }
    ],
    summary: "混元立桩功口诀共八句，涵盖了站桩的基本要领：脚、膝、胯、脊柱、胸背、肩肘、手、舌、目、意、呼吸等各个方面。初学者可先背诵口诀，再逐步体会每句的含义。",
    fanzhenNote: "凡真子说：「站桩看似简单，实则深奥。这八句口诀是我多年修炼的精华，每句都包含深意。初学者不要急于求成，先站住、站对、站久，自然会有体会。」"
  },
  {
    id: "yongquan-guiyuan-koujue",
    name: "涌泉归元法口诀",
    subtitle: "炼精化气核心心法",
    stage: "lianjing",
    preface: "涌泉归元法是炼精化气阶段的核心功法，通过意念引导气机归元，培养先天之气。",
    lines: [
      {
        original: "吸气提会阴，呼气沉涌泉",
        explanation: "吸气时轻轻提会阴（前后阴之间），呼气时意念引导气沉至脚底涌泉穴。",
        annotations: [
          { term: "会阴", meaning: "前后阴之间的穴位，任督二脉交汇之处" },
          { term: "涌泉", meaning: "脚底前三分之一处的穴位，肾经起始穴" }
        ]
      },
      {
        original: "意轻如羽毛，气沉如水流",
        explanation: "意念要轻柔如羽毛，不可过重。气下沉的感觉如水流般自然。",
        annotations: []
      },
      {
        original: "丹田聚气海，尾闾通督脉",
        explanation: "丹田是气汇聚的地方，如大海般广阔。气从丹田下行至尾闾，再沿脊柱上行。",
        annotations: [
          { term: "督脉", meaning: "沿脊柱上行至头顶的经络" }
        ]
      },
      {
        original: "夹脊过玉枕，百会降印堂",
        explanation: "气沿脊柱上行，经过夹脊关、玉枕关，到达百会，再沿前额下行至印堂。",
        annotations: [
          { term: "夹脊", meaning: "脊柱中段，两肩胛骨之间" },
          { term: "玉枕", meaning: "后脑勺，枕骨部位" },
          { term: "印堂", meaning: "两眉之间的穴位" }
        ]
      },
      {
        original: "膻中归丹田，小周天自成",
        explanation: "气从印堂下行至膻中（胸口），再回归丹田，完成一个小周天循环。",
        annotations: [
          { term: "膻中", meaning: "胸口正中，两乳之间的穴位" },
          { term: "小周天", meaning: "气沿任督二脉循环一周" }
        ]
      },
      {
        original: "不追不随，静待气机",
        explanation: "不要刻意追求气感，也不要跟随气的运行。静静等待，让气机自然运行。",
        annotations: []
      },
      {
        original: "气足自通，水到渠成",
        explanation: "当气充足时，经络自然通畅。就像水满了自然流淌，不要强行引导。",
        annotations: []
      }
    ],
    summary: "涌泉归元法口诀共七句，阐述了炼精化气阶段气机运行的路径和心法。从呼吸入手，经过会阴、丹田、尾闾、督脉、百会、印堂、膻中，最终回归丹田，完成小周天。",
    fanzhenNote: "凡真子说：「此口诀是炼精化气的核心。很多人急于通小周天，反而气乱。记住：气足自通，水到渠成。意念要轻，如丝如缕，不可用力。」"
  },
  {
    id: "miman-shihai-koujue",
    name: "弥漫识海观口诀",
    subtitle: "炼气化神核心心法",
    stage: "lianqi",
    preface: "弥漫识海观是炼气化神阶段的核心观想法门，通过扩展意识觉知，打破个体与整体的界限。",
    lines: [
      {
        original: "静坐入宁静，识海现眼前",
        explanation: "静坐进入宁静状态后，观想自己面前出现一片无边无际的蓝色大海，这是纯净的意识之海。",
        annotations: [
          { term: "识海", meaning: "意识之海，比喻意识的广阔无边" }
        ]
      },
      {
        original: "我即海一滴，海即我无边",
        explanation: "观想自己既是海中的一滴水，也是整片大海。个体与整体不二。",
        annotations: []
      },
      {
        original: "意识向四面，弥漫至无边",
        explanation: "意识逐渐向四面八方扩散，无边无际，超越时间和空间的限制。",
        annotations: []
      },
      {
        original: "过去未来消，当下即永恒",
        explanation: "在弥漫的觉知中，过去和未来的界限消失，只有当下是真实的。",
        annotations: []
      },
      {
        original: "不执亦不取，如如自安然",
        explanation: "保持这种弥漫的状态，不执着、不取舍，如如不动，自然安然。",
        annotations: [
          { term: "如如", meaning: "如其所是，不改变、不造作" }
        ]
      },
      {
        original: "识神渐安静，元神自显现",
        explanation: "当识神（后天思维）安静下来后，元神（先天觉知）自然显现。",
        annotations: [
          { term: "识神", meaning: "后天形成的意识，主管思维分别" },
          { term: "元神", meaning: "先天本有的意识，主管直觉觉知" }
        ]
      }
    ],
    summary: "弥漫识海观口诀共六句，阐述了炼气化神阶段意识扩展的路径。从观想识海开始，逐步融入、弥漫、超越时空，最终达到不执不取、元神显现的境界。",
    fanzhenNote: "凡真子说：「弥漫识海观是我炼气化神阶段最重要的功法。很多人执着于气感，忽略了意识的修炼。其实意识才是根本，气只是桥梁。此口诀要反复体会，不可只背不用。」"
  },
  {
    id: "wushi-chan-koujue",
    name: "无事禅口诀",
    subtitle: "炼神返虚日常心法",
    stage: "lianshen",
    preface: "无事禅是炼神返虚阶段的日常心法，在无事中体会道的本体，放下一切修行概念。",
    lines: [
      {
        original: "放下修行念，平常即是道",
        explanation: "不再认为自己在「修行」，不再追求「进步」。平常心中自有大道。",
        annotations: []
      },
      {
        original: "无事可忙碌，无物可追求",
        explanation: "在日常生活中，保持无事的状态。不忙碌于琐事，不追求外在刺激。",
        annotations: []
      },
      {
        original: "觉知不执着，不取亦不舍",
        explanation: "保持觉知，但不执着。觉知一切，不取不舍，如镜子照物。",
        annotations: []
      },
      {
        original: "行住坐卧中，处处皆修行",
        explanation: "在行走、站立、坐卧、躺倒中，每一个动作都是修行。行住坐卧皆是禅。",
        annotations: []
      },
      {
        original: "去身份化我，天地一沙鸥",
        explanation: "放下所有身份标签，不再以「修行者」「老师」等自居。如天地间的沙鸥，自由自在。",
        annotations: []
      },
      {
        original: "慈悲自然流，无为无不为",
        explanation: "慈悲成为自然反应，不需要刻意。在无为中，一切行动自然发生，恰到好处。",
        annotations: [
          { term: "无为", meaning: "不刻意、不强求、不执着" }
        ]
      }
    ],
    summary: "无事禅口诀共六句，阐述了炼神返虚阶段的日常心法。从放下修行概念开始，到无事、觉知、去身份化，最终达到慈悲自然、无为而无不为的境界。",
    fanzhenNote: "凡真子说：「炼神返虚阶段，最大的障碍是「认为自己已经开悟」。真正的开悟是知道没有什么需要开悟的。这六句口诀，看似简单，实则深奥。我炼了三年，才渐渐体会。」"
  }
];

// ==================== 突破之法数据 ====================

export interface BreakthroughMethod {
  id: string;
  stage: StageKey;
  stageTitle: string;
  barrierName: string;
  barrierDesc: string;
  difficultyAnalysis: string[];
  methods: {
    source: string;
    method: string;
    details: string[];
  }[];
  fanzhenExperience: string;
  expectedTime: string;
  verificationStandard: string[];
}

export const breakthroughMethods: BreakthroughMethod[] = [
  {
    id: "jianchi-nan",
    stage: "lianxing",
    stageTitle: "炼形化精",
    barrierName: "如何突破「坚持难」",
    barrierDesc: "前两周是最容易放弃的时期。身体酸痛、效果不明显、时间不够等原因，导致很多初学者半途而废。",
    difficultyAnalysis: [
      "身体长期不运动，突然练功会出现酸痛不适",
      "期望值过高，希望短期内看到明显效果",
      "生活习惯难以改变，找不到固定时间",
      "缺乏同伴支持，独自练习容易懈怠",
      "对功法理解不深，不知道如何正确练习"
    ],
    methods: [
      {
        source: "道家智慧",
        method: "「道法自然」——循序渐进，不强求",
        details: [
          "从每天5分钟开始，逐步增加",
          "不求效果，只求坚持",
          "相信「水滴石穿」的力量",
          "身体酸痛是正常现象，坚持一周后会减轻"
        ]
      },
      {
        source: "佛家智慧",
        method: "「当下即是」——专注当下，不计较结果",
        details: [
          "每次练功只关注当下的感受",
          "不比较、不期待、不焦虑",
          "把练功当作休息，而非任务",
          "享受练功的过程，而非追求结果"
        ]
      },
      {
        source: "儒家智慧",
        method: "「克己复礼」——建立习惯，持之以恒",
        details: [
          "固定时间、固定地点练功",
          "记录练功日记，增强仪式感",
          "找到练功伙伴，互相监督",
          "设定小目标，完成后奖励自己"
        ]
      },
      {
        source: "武学智慧",
        method: "「冬练三九，夏练三伏」——吃苦耐劳，磨练意志",
        details: [
          "把练功当作磨练意志的过程",
          "酸痛是身体在调整，是进步的信号",
          "坚持过前两周，后面会越来越轻松",
          "想象自己在铸造一把宝剑，需要千锤百炼"
        ]
      }
    ],
    fanzhenExperience: "凡真子说：「我刚开始站桩时，第三天就差点放弃。腿酸得站不住，心里想着「这有什么用」。幸好我坚持了，第七天开始，腿不酸了，反而有一种说不出的舒服。后来我明白了，前两周是「换力期」，身体在从「散力」转为「整力」，酸痛是正常的。我教了上千个学生，凡是坚持过前两周的，90%都能继续练下去。」",
    expectedTime: "2-4周",
    verificationStandard: [
      "能够连续坚持14天不间断",
      "身体酸痛明显减轻",
      "开始体会到练功后的舒适感",
      "建立了固定的练功习惯"
    ]
  },
  {
    id: "qi-gan-bu-wending",
    stage: "lianjing",
    stageTitle: "炼精化气",
    barrierName: "如何突破「气感不稳定」",
    barrierDesc: "气感时有时无，今天明显，明天消失，让人怀疑自己的修炼是否正确。",
    difficultyAnalysis: [
      "气感受身体状态、情绪、环境等多种因素影响",
      "意念过重或过轻都会影响气感",
      "身体经络不通畅，气行受阻",
      "对气感过于执着，反而阻碍气的自然运行",
      "生活习惯不规律，精气不足"
    ],
    methods: [
      {
        source: "道家智慧",
        method: "「无为而治」——不刻意追求气感",
        details: [
          "气感是副产品，不是目的",
          "意念要轻，如丝如缕",
          "「来者不拒，去者不留」",
          "相信气有自己的运行规律"
        ]
      },
      {
        source: "佛家智慧",
        method: "「不执着」——不执着于气感",
        details: [
          "有气感不喜，无气感不忧",
          "把气感当作过客，不迎不送",
          "专注于呼吸和意念，而非气感",
          "气感的来去是自然的，不要干预"
        ]
      },
      {
        source: "中医智慧",
        method: "「调理气血」——从生活习惯入手",
        details: [
          "保证充足睡眠，养精蓄锐",
          "饮食清淡，少食辛辣",
          "避免过度劳累和情绪波动",
          "适当运动，疏通经络"
        ]
      }
    ],
    fanzhenExperience: "凡真子说：「我炼精化气时，气感也是时有时无。有段时间特别明显，后来又消失了，我当时很焦虑，以为自己退步了。后来师父告诉我：「气感如海潮，有涨有落，是正常的。」我恍然大悟，不再执着于气感，反而气感越来越稳定。现在我知道，气感不稳定是因为身体在调整，经络在疏通，这是一个过程，不是结果。」",
    expectedTime: "1-3个月",
    verificationStandard: [
      "气感虽然波动，但总体趋势是增强的",
      "不再因为气感消失而焦虑",
      "能够保持平和心态，继续练习",
      "气感逐渐稳定，不再大起大落"
    ]
  },
  {
    id: "yuzhen-guan",
    stage: "lianjing",
    stageTitle: "炼精化气",
    barrierName: "如何突破「玉枕关气冲病灶」",
    barrierDesc: "当气上行至玉枕关（后脑）时，会出现头痛、头晕、失眠等反应，这是气冲开淤堵的正常现象，但很多人因此害怕而停止修炼。",
    difficultyAnalysis: [
      "玉枕关是督脉上的重要关窍，气行至此处容易受阻",
      "头部经络不通，气冲病灶时产生疼痛",
      "对气冲病灶缺乏了解，产生恐惧心理",
      "意念过重，强行引气上行",
      "身体精气不足，气行无力"
    ],
    methods: [
      {
        source: "道家智慧",
        method: "「以意领气，轻引下行」——意念引导气下行",
        details: [
          "当气上头时，意念轻轻引至涌泉穴",
          "不要强行冲关，让气自然运行",
          "「气足自通」，耐心等待",
          "可适当按摩百会、风池穴辅助"
        ]
      },
      {
        source: "佛家智慧",
        method: "「观照疼痛」——以觉知面对不适",
        details: [
          "不抗拒疼痛，只是觉知它",
          "观察疼痛的变化，不跟随",
          "疼痛是身体在调整的信号",
          "保持平和心态，不惊不怖"
        ]
      },
      {
        source: "中医智慧",
        method: "「疏通经络」——辅助调理",
        details: [
          "按摩风池、百会、太阳穴",
          "适当运动，促进气血运行",
          "保证充足睡眠，养精蓄锐",
          "饮食清淡，避免上火"
        ]
      }
    ],
    fanzhenExperience: "凡真子说：「我通玉枕关时，头痛了整整一周，晚上都睡不着。我当时很害怕，以为出偏了。后来师父告诉我，这是「气冲病灶」，是气在打通淤堵的经络。他教我意念引气下行，按摩风池穴，同时保持心态平和。果然，一周后头痛消失，取而代之的是头脑清明，思维敏捷。后来我才知道，玉枕关是督脉最难通的一关，通了之后，脑力会显著提升。」",
    expectedTime: "1-4周",
    verificationStandard: [
      "头痛、头晕等症状消失",
      "头脑感到清明",
      "气能顺利通过玉枕关",
      "思维敏捷，记忆力提升"
    ]
  },
  {
    id: "shishen-yuanshen",
    stage: "lianqi",
    stageTitle: "炼气化神",
    barrierName: "如何突破「识神与元神分辨」",
    barrierDesc: "识神（后天思维）与元神（先天觉知）混杂在一起，难以分辨。很多人把识神的思维活动当作元神的觉知。",
    difficultyAnalysis: [
      "识神活跃，思维不断，难以安静",
      "元神微弱，不易觉察",
      "缺乏对识神和元神的清晰认知",
      "把思维当作觉知，把想象当作真实",
      "对元神的期待过高，反而阻碍其显现"
    ],
    methods: [
      {
        source: "佛家智慧",
        method: "「观心」——观察念头的来去",
        details: [
          "静坐中，观察念头的生起和消失",
          "发现「能观」的才是真正的自己",
          "念头是识神，能观念头的是元神",
          "不跟随念头，只是看着它"
        ]
      },
      {
        source: "道家智慧",
        method: "「回光返照」——将觉知收向内",
        details: [
          "将向外看的觉知收回向内",
          "观察「谁在观察」",
          "找到那个无形无相的觉知本体",
          "「照」是觉知，「回光」是收回"
        ]
      },
      {
        source: "儒家智慧",
        method: "「格物致知」——在日常生活中分辨",
        details: [
          "日常中观察自己的反应",
          "思维判断是识神，直觉觉知是元神",
          "遇事时的第一反应往往是元神",
          "后来的分析判断是识神"
        ]
      }
    ],
    fanzhenExperience: "凡真子说：「我分辨识神和元神，花了整整三个月。最初我以为没有念头就是元神，后来发现不对。元神不是「没有念头」，而是「能看念头」的那个。有一天静坐时，我突然发现：念头来了又走了，但有一个「东西」始终在那里，不动不摇。那个「东西」就是元神。这个发现让我欣喜若狂，但师父告诉我：「不要执着，元神本自具足，发现就好，不要停留。」后来我明白了，识神如波浪，元神如大海。波浪时起时伏，大海始终在那里。」",
    expectedTime: "3-6个月",
    verificationStandard: [
      "能够清晰分辨识神的思维和元神的觉知",
      "静坐中，念头来了能觉知，不被带走",
      "日常生活中，能保持觉知，不被情绪带走",
      "体验到「能观」的本体"
    ]
  },
  {
    id: "zhuangtai-bodong",
    stage: "lianqi",
    stageTitle: "炼气化神",
    barrierName: "如何突破「状态波动」",
    barrierDesc: "炼气化神阶段，状态波动很大。有时觉知非常清晰，有时又回归混沌。这种波动让人困惑和沮丧。",
    difficultyAnalysis: [
      "状态受身体、情绪、环境等多种因素影响",
      "对「好状态」的执着，导致状态差时沮丧",
      "修炼进入平台期，进步不明显",
      "生活中事务繁忙，影响修炼状态",
      "对状态波动缺乏正确认知"
    ],
    methods: [
      {
        source: "道家智慧",
        method: "「顺其自然」——不执着于状态",
        details: [
          "状态好时不骄傲，状态差时不气馁",
          "「祸兮福之所倚，福兮祸之所伏」",
          "波动是正常的，是身体在调整",
          "保持平常心，继续练习"
        ]
      },
      {
        source: "佛家智慧",
        method: "「不迎不拒」——平等对待一切状态",
        details: [
          "好状态不迎，差状态不拒",
          "一切状态都是修行的材料",
          "「烦恼即菩提」",
          "在差状态中修炼，进步更大"
        ]
      },
      {
        source: "儒家智慧",
        method: "「反求诸己」——从自身找原因",
        details: [
          "检查生活习惯是否规律",
          "检查情绪是否稳定",
          "检查修炼方法是否正确",
          "调整后再观察状态变化"
        ]
      }
    ],
    fanzhenExperience: "凡真子说：「我炼气化神时，状态波动特别大。有时觉知清晰得像水晶，有时又混沌得像泥浆。我一度很沮丧，以为自己退步了。后来师父问我：「大海有波浪时，大海减少了吗？」我恍然大悟。状态波动就像大海的波浪，波浪时起时伏，但大海始终在那里。觉知也是如此，有时清晰，有时混沌，但觉知的本体始终在那里。明白了这一点，我不再执着状态，反而状态越来越稳定。」",
    expectedTime: "3-6个月",
    verificationStandard: [
      "不再因为状态差而沮丧",
      "能够保持平常心，继续练习",
      "状态波动逐渐减小",
      "觉知本体始终清晰"
    ]
  },
  {
    id: "qu-shenfenhua",
    stage: "lianshen",
    stageTitle: "炼神返虚",
    barrierName: "如何突破「去身份化」",
    barrierDesc: "最难放下的是对自我身份的执着——「我是修行者」「我是老师」「我是成功人士」等标签。这些身份标签是自我存在的根基，放下它们意味着面对「无我」的恐惧。",
    difficultyAnalysis: [
      "身份标签是社会存在的基础，放下意味着失去社会认同",
      "「修行者」的身份成为新的执着",
      "对「无我」的恐惧，害怕失去自我",
      "身边的人不理解，产生孤独感",
      "放下身份后，不知如何行动"
    ],
    methods: [
      {
        source: "佛家智慧",
        method: "「无我」——认识到身份只是标签",
        details: [
          "观察身份标签是如何形成的",
          "发现身份只是社会的定义，不是真实的自己",
          "「诸法无我」，一切身份都是暂时的",
          "放下身份，才能见到真实的自己"
        ]
      },
      {
        source: "道家智慧",
        method: "「返璞归真」——回归本来的状态",
        details: [
          "想象婴儿的状态，没有身份标签",
          "回归天真自然，不做作",
          "「常德不离，复归于婴儿」",
          "在无事中体会本真的自己"
        ]
      },
      {
        source: "儒家智慧",
        method: "「尽人事听天命」——做好当下，不执着结果",
        details: [
          "做好该做的事，但不执着身份",
          "「君子不器」，不被身份限定",
          "在不同的角色中灵活转换",
          "内心保持自由，不被外境束缚"
        ]
      }
    ],
    fanzhenExperience: "凡真子说：「去身份化是我修炼中最难的一关。我以前是「老师」，很多人尊敬我，我也习惯了这个身份。后来有一天，我突然发现：「老师」只是一个标签，不是真正的我。真正的我是那个能觉知「老师」这个标签的「东西」。放下「老师」的身份后，我反而更自由了。我可以是老师，也可以不是老师，取决于当下的需要。现在，我不再被任何身份束缚，内心无比自在。这种自在，是以前从未体验过的。」",
    expectedTime: "6-12个月",
    verificationStandard: [
      "能够放下「修行者」等身份标签",
      "不再依赖身份获得认同感",
      "内心自由，不被身份束缚",
      "在不同角色中灵活转换，内心不动"
    ]
  }
];

// ==================== 凡真子组合数据 ====================

export interface SystemContribution {
  system: string;
  contribution: string;
  method: string;
}

export interface FanzhenCombination {
  id: string;
  stage: StageKey;
  stageTitle: string;
  combinationName: string;
  principle: string;
  contributions: SystemContribution[];
  practiceOrder: {
    step: number;
    gongfa: string;
    duration: string;
    note: string;
  }[];
  precautions: string[];
  fanzhenNote: string;
}

export const fanzhenCombinations: FanzhenCombination[] = [
  {
    id: "lianxing-zuhe",
    stage: "lianxing",
    stageTitle: "炼形化精",
    combinationName: "道家站桩 + 佛家身念处 + 武学易筋经 + 中医揉腹",
    principle: "炼形化精阶段的核心是修复身体、疏通经络。道家站桩培养内气，佛家身念处增强身体觉知，武学易筋经拉伸筋骨，中医揉腹调理脾胃。四者结合，从「气、觉、筋、脏」四个维度全面调理身体。",
    contributions: [
      {
        system: "道家",
        contribution: "培养内气，疏通经络",
        method: "混元立桩功——通过站桩培养丹田气，使气行全身，疏通经络"
      },
      {
        system: "佛家",
        contribution: "增强身体觉知",
        method: "身念处——通过观察身体感受，增强对身体的觉知，及时发现身体问题"
      },
      {
        system: "武学",
        contribution: "拉伸筋骨，强健体魄",
        method: "易筋经——通过八个动作拉伸全身经络，强健筋骨，改善体质"
      },
      {
        system: "中医",
        contribution: "调理脾胃，促进消化",
        method: "揉腹功——通过按摩腹部调理脾胃，促进消化吸收，为修炼提供能量"
      }
    ],
    practiceOrder: [
      {
        step: 1,
        gongfa: "混元立桩功",
        duration: "20-30分钟",
        note: "晨起练习，培养内气，面向东方"
      },
      {
        step: 2,
        gongfa: "易筋经八式",
        duration: "20-25分钟",
        note: "上午练习，拉伸筋骨，配合呼吸"
      },
      {
        step: 3,
        gongfa: "八段锦",
        duration: "15-20分钟",
        note: "下午练习，温和调理，疏通经络"
      },
      {
        step: 4,
        gongfa: "揉腹功",
        duration: "5-10分钟",
        note: "睡前练习，调理脾胃，安神助眠"
      },
      {
        step: 5,
        gongfa: "身念处观察",
        duration: "随时",
        note: "日常中观察身体感受，增强觉知"
      }
    ],
    precautions: [
      "初学不要贪多，先以站桩为主",
      "易筋经动作不要求到位，循序渐进",
      "揉腹要在饭后一小时进行",
      "身念处观察不要过度关注，保持自然",
      "四种功法要配合，不可偏废"
    ],
    fanzhenNote: "凡真子说：「炼形化精阶段，我结合了四家之长。道家站桩养气，佛家身念处增觉，武学易筋经拉筋，中医揉腹调脏。这四者相辅相成，缺一不可。我每天早上站桩，上午易筋经，下午八段锦，睡前揉腹。日常中随时观察身体感受。这样练了半年，身体焕然一新。」"
  },
  {
    id: "lianjing-zuhe",
    stage: "lianjing",
    stageTitle: "炼精化气",
    combinationName: "道家涌泉归元 + 佛家观照 + 武学太极 + 中医拍打",
    principle: "炼精化气阶段的核心是培养气感、打通经络。道家涌泉归元法引导气机，佛家观照培养觉知，武学太极以意领气，中医拍打疏通经络。四者结合，从「引、觉、领、通」四个维度促进气机运行。",
    contributions: [
      {
        system: "道家",
        contribution: "引导气机，归元丹田",
        method: "涌泉归元法——通过意念引导气机从丹田下行至涌泉，再回归丹田，形成循环"
      },
      {
        system: "佛家",
        contribution: "培养觉知，不执着",
        method: "观照——通过观察气的运行，培养觉知，不执着于气感"
      },
      {
        system: "武学",
        contribution: "以意领气，气随意行",
        method: "太极拳——通过缓慢的动作，以意领气，使气行全身"
      },
      {
        system: "中医",
        contribution: "疏通经络，促进气血",
        method: "拍打功——通过拍打身体经络，疏通经络，促进气血运行"
      }
    ],
    practiceOrder: [
      {
        step: 1,
        gongfa: "涌泉归元法",
        duration: "25-35分钟",
        note: "晨起静坐，引导气机"
      },
      {
        step: 2,
        gongfa: "太极拳",
        duration: "20-30分钟",
        note: "上午练习，以意领气"
      },
      {
        step: 3,
        gongfa: "拍打功",
        duration: "10-15分钟",
        note: "下午练习，疏通经络"
      },
      {
        step: 4,
        gongfa: "观照",
        duration: "随时",
        note: "日常中观察气的运行，不执着"
      }
    ],
    precautions: [
      "意念要轻，不可过重",
      "太极拳要慢，以意领气",
      "拍打力度适中，不可过重",
      "观照不执着，不追求气感",
      "气感强烈时不要骄傲，气感微弱时不要气馁"
    ],
    fanzhenNote: "凡真子说：「炼精化气阶段，我结合了道家导引、佛家观照、武学太极、中医拍打。道家导引引气，佛家观照增觉，武学太极领气，中医拍打通络。这四者配合，气感来得快，运行也顺畅。我每天早上静坐导引，上午打太极，下午拍打，日常中观照。这样练了一年，小周天通了。」"
  },
  {
    id: "lianqi-zuhe",
    stage: "lianqi",
    stageTitle: "炼气化神",
    combinationName: "道家弥漫识海 + 佛家观心 + 儒家事上练心",
    principle: "炼气化神阶段的核心是意识训练。道家弥漫识海观扩展觉知，佛家观心分辨识神元神，儒家事上练心将觉知融入日常。三者结合，从「扩、辨、用」三个维度训练意识。",
    contributions: [
      {
        system: "道家",
        contribution: "扩展觉知，打破界限",
        method: "弥漫识海观——通过观想将意识从个体扩展到宇宙，打破个体与整体的界限"
      },
      {
        system: "佛家",
        contribution: "分辨识神元神",
        method: "观心——通过观察念头的来去，分辨识神的思维和元神的觉知"
      },
      {
        system: "儒家",
        contribution: "将觉知融入日常",
        method: "事上练心——在日常事务中保持觉知，将修炼融入生活"
      }
    ],
    practiceOrder: [
      {
        step: 1,
        gongfa: "弥漫识海观",
        duration: "40-60分钟",
        note: "晨起静坐，扩展觉知"
      },
      {
        step: 2,
        gongfa: "观心",
        duration: "随时",
        note: "日常中观察念头，分辨识神元神"
      },
      {
        step: 3,
        gongfa: "事上练心",
        duration: "全天",
        note: "在日常事务中保持觉知"
      }
    ],
    precautions: [
      "弥漫识海观不要执着境界",
      "观心不要陷入思维分析",
      "事上练心不要影响正常工作",
      "三者要配合，不可偏废",
      "出现幻象不要执着，也不要恐惧"
    ],
    fanzhenNote: "凡真子说：「炼气化神阶段，我结合了道家扩展、佛家观心、儒家事上练心。道家扩展让我体验到觉知的无限，佛家观心让我分辨识神元神，儒家事上练心让我将觉知融入日常。这三者缺一不可。没有扩展，觉知局限；没有观心，无法分辨；没有事上练心，觉知无法落地。我每天早上弥漫识海观，日常中观心和事上练心。这样练了两年，觉知成为常态。」"
  },
  {
    id: "lianshen-zuhe",
    stage: "lianshen",
    stageTitle: "炼神返虚",
    combinationName: "道家无事禅 + 佛家慈悲 + 儒家尽人事听天命",
    principle: "炼神返虚阶段的核心是放下自我。道家无事禅放下修行概念，佛家慈悲培养同体大悲，儒家尽人事听天命放下执着。三者结合，从「放、悲、顺」三个维度超越自我。",
    contributions: [
      {
        system: "道家",
        contribution: "放下修行概念",
        method: "无事禅——放下「修行」「进步」等概念，在无事中体会道的本体"
      },
      {
        system: "佛家",
        contribution: "培养同体大悲",
        method: "慈悲心法——通过观想培养无缘大慈、同体大悲，体验到万物一体"
      },
      {
        system: "儒家",
        contribution: "放下执着，顺其自然",
        method: "尽人事听天命——尽力做好该做的事，但不执着结果，顺其自然"
      }
    ],
    practiceOrder: [
      {
        step: 1,
        gongfa: "投影返源禅",
        duration: "60分钟以上",
        note: "晨起深入体证"
      },
      {
        step: 2,
        gongfa: "无事禅",
        duration: "全天",
        note: "日常中保持无事状态"
      },
      {
        step: 3,
        gongfa: "慈悲心法",
        duration: "随时",
        note: "日常中培养慈悲心"
      },
      {
        step: 4,
        gongfa: "尽人事听天命",
        duration: "全天",
        note: "做好该做的事，不执着结果"
      }
    ],
    precautions: [
      "不要认为自己已经开悟",
      "慈悲不要变成执着",
      "尽人事不要变成懈怠",
      "三者要自然融合",
      "保持平常心，不特殊化"
    ],
    fanzhenNote: "凡真子说：「炼神返虚阶段，我结合了道家无事、佛家慈悲、儒家顺其自然。道家无事让我放下修行概念，佛家慈悲让我体验到万物一体，儒家顺其自然让我不执着结果。这三者融合，才是真正的返虚。我现在每天打坐，不是为了修行，而是喜欢那种宁静。日常中，慈悲是自然反应，做事是尽力而为，结果是顺其自然。这种生活，就是我追求的境界。」"
  }
];

// ==================== 各体系解读数据 ====================

export interface SystemInterpretation {
  system: string;
  icon: string;
  interpretation: string;
  keyConcepts: { term: string; meaning: string }[];
}

export const systemInterpretations: Record<StageKey, SystemInterpretation[]> = {
  lianxing: [
    {
      system: "道家",
      icon: "☯",
      interpretation: "道家认为炼形化精是「筑基」阶段。《道德经》云：「九层之台，起于累土。」此阶段以身体为本，通过站桩、导引等方法，使「形正」则「气顺」。道家强调「松静自然」，在放松中培养内气。",
      keyConcepts: [
        { term: "筑基", meaning: "修炼的基础阶段，如同建筑地基" },
        { term: "松静自然", meaning: "放松、宁静、顺其自然" },
        { term: "形正气顺", meaning: "身体端正，气机自然顺畅" }
      ]
    },
    {
      system: "佛家",
      icon: "☸",
      interpretation: "佛家称此阶段为「调身」。佛教修行讲究「调身、调息、调心」，炼形化精对应「调身」。通过观察身体（身念处），增强对身体的觉知，为后续的观心打下基础。",
      keyConcepts: [
        { term: "身念处", meaning: "观察身体的感受，增强觉知" },
        { term: "调身", meaning: "调整身体姿势，使身体放松" },
        { term: "四念处", meaning: "身、受、心、法四种观察对象" }
      ]
    },
    {
      system: "儒家",
      icon: "📜",
      interpretation: "儒家强调「修身」。《大学》云：「自天子以至于庶人，壹是皆以修身为本。」炼形化精即是修身的基础。通过端正身体，培养正气，为「齐家治国平天下」打下身体基础。",
      keyConcepts: [
        { term: "修身", meaning: "修养身体，培养正气" },
        { term: "正心诚意", meaning: "端正心念，真诚意念" },
        { term: "养气", meaning: "培养浩然之气" }
      ]
    },
    {
      system: "中医",
      icon: "🌿",
      interpretation: "中医认为此阶段是「扶正固本」。通过调理脾胃、疏通经络，使气血充盈，正气存内，邪不可干。《黄帝内经》云：「正气存内，邪不可干。」",
      keyConcepts: [
        { term: "扶正固本", meaning: "扶持正气，巩固根本" },
        { term: "疏通经络", meaning: "使经络通畅，气血运行无阻" },
        { term: "调理脾胃", meaning: "脾胃为后天之本，调理脾胃即调理根本" }
      ]
    },
    {
      system: "武学",
      icon: "⚔",
      interpretation: "武学称此阶段为「练筋骨皮」。通过站桩、易筋经等功法，强健筋骨，充实肌肉，为后续的「练一口气」打下基础。武学强调「外练筋骨皮，内练一口气」。",
      keyConcepts: [
        { term: "练筋骨皮", meaning: "锻炼筋骨和皮肤，强健体魄" },
        { term: "站桩", meaning: "武术基本功，培养桩力和内气" },
        { term: "易筋经", meaning: "改变筋骨的功法，拉伸经络" }
      ]
    }
  ],
  lianjing: [
    {
      system: "道家",
      icon: "☯",
      interpretation: "道家认为炼精化气是「炼己」阶段。通过意守丹田、引导气机，使后天之精转化为先天之气。《周易参同契》云：「同类易施功，非种难为巧。」此阶段以意领气，打通任督。",
      keyConcepts: [
        { term: "炼己", meaning: "锻炼自己的意识和气" },
        { term: "意守丹田", meaning: "意念守在丹田，培养内气" },
        { term: "小周天", meaning: "气沿任督二脉循环一周" }
      ]
    },
    {
      system: "佛家",
      icon: "☸",
      interpretation: "佛家称此阶段为「调息」。通过调整呼吸，使呼吸微细，心念宁静。佛教密宗有「宝瓶气」「金刚诵」等呼吸法，与此阶段相通。",
      keyConcepts: [
        { term: "调息", meaning: "调整呼吸，使呼吸微细" },
        { term: "宝瓶气", meaning: "密宗呼吸法，培养内气" },
        { term: "风瑜伽", meaning: "通过呼吸修炼的法门" }
      ]
    },
    {
      system: "儒家",
      icon: "📜",
      interpretation: "儒家强调「养气」。孟子曰：「我善养吾浩然之气。」炼精化气即是培养浩然之气的过程。通过集义、养气，使正气充盈。",
      keyConcepts: [
        { term: "浩然之气", meaning: "正大刚直的气" },
        { term: "集义", meaning: "积累正义的行为" },
        { term: "养气", meaning: "培养正气" }
      ]
    },
    {
      system: "中医",
      icon: "🌿",
      interpretation: "中医认为此阶段是「行气活血」。通过引导气机，使气血运行通畅，经络疏通。《黄帝内经》云：「气血不和，百病乃变化而生。」",
      keyConcepts: [
        { term: "行气", meaning: "使气运行" },
        { term: "活血", meaning: "使血流畅" },
        { term: "经络", meaning: "气血运行的通道" }
      ]
    },
    {
      system: "武学",
      icon: "⚔",
      interpretation: "武学称此阶段为「练一口气」。通过站桩、导引等方法，培养内气，使气沉丹田，发力时气随意行。武学强调「气沉丹田」，「以气催力」。",
      keyConcepts: [
        { term: "气沉丹田", meaning: "将气沉入丹田，稳固下盘" },
        { term: "以气催力", meaning: "用气来催动力量" },
        { term: "内气", meaning: "体内的能量" }
      ]
    }
  ],
  lianqi: [
    {
      system: "道家",
      icon: "☯",
      interpretation: "道家认为炼气化神是「炼神」阶段。通过以气养神，使精神力量增强。《太乙金华宗旨》云：「回光守中」，即是将光（觉知）收回，守在中央（元神）。",
      keyConcepts: [
        { term: "炼神", meaning: "锻炼精神力量" },
        { term: "回光", meaning: "将觉知收回" },
        { term: "守中", meaning: "守在中央，即元神" }
      ]
    },
    {
      system: "佛家",
      icon: "☸",
      interpretation: "佛家称此阶段为「调心」。通过禅修，使心念宁静，觉知显现。佛教有「止观」法门，「止」是定，「观」是慧。炼气化神即是止观双修。",
      keyConcepts: [
        { term: "止观", meaning: "止是定，观是慧" },
        { term: "禅定", meaning: "心念宁静的状态" },
        { term: "般若", meaning: "智慧，即觉知" }
      ]
    },
    {
      system: "儒家",
      icon: "📜",
      interpretation: "儒家强调「尽心知性」。孟子曰：「尽其心者，知其性也。」炼气化神即是尽心知性的过程。通过意识的修炼，认识自己的本性。",
      keyConcepts: [
        { term: "尽心", meaning: "充分发挥心的功能" },
        { term: "知性", meaning: "认识自己的本性" },
        { term: "良知", meaning: "先天本有的觉知" }
      ]
    },
    {
      system: "中医",
      icon: "🌿",
      interpretation: "中医认为此阶段是「养神」。中医讲「形、气、神」三宝，炼气化神即是养神的过程。神是主宰，养神即是养护生命的主宰。",
      keyConcepts: [
        { term: "养神", meaning: "养护精神" },
        { term: "三宝", meaning: "精、气、神" },
        { term: "神明", meaning: "精神的主宰" }
      ]
    },
    {
      system: "武学",
      icon: "⚔",
      interpretation: "武学称此阶段为「练神还虚」。通过意识的修炼，达到「神意合一」的境界。武学讲究「用意不用力」，即是此阶段的体现。",
      keyConcepts: [
        { term: "神意合一", meaning: "意识和意念合一" },
        { term: "用意不用力", meaning: "用意识引导，不用蛮力" },
        { term: "化劲", meaning: "将力量化为无形" }
      ]
    }
  ],
  lianshen: [
    {
      system: "道家",
      icon: "☯",
      interpretation: "道家认为炼神返虚是「返虚」阶段。通过放下自我，回归到道的本体。《道德经》云：「致虚极，守静笃。」即是此阶段的境界。",
      keyConcepts: [
        { term: "返虚", meaning: "回归到虚的状态" },
        { term: "致虚极", meaning: "达到虚的极致" },
        { term: "守静笃", meaning: "守住宁静的笃定" }
      ]
    },
    {
      system: "佛家",
      icon: "☸",
      interpretation: "佛家称此阶段为「见性」。通过放下执着，见到自己的本性。禅宗讲「顿悟」，即是此阶段的体验。六祖慧能曰：「菩提本无树，明镜亦非台。」",
      keyConcepts: [
        { term: "见性", meaning: "见到自己的本性" },
        { term: "顿悟", meaning: "突然的觉悟" },
        { term: "涅槃", meaning: "超越生死的境界" }
      ]
    },
    {
      system: "儒家",
      icon: "📜",
      interpretation: "儒家强调「天人合一」。通过修炼，达到人与天合一的境界。《中庸》云：「致中和，天地位焉，万物育焉。」",
      keyConcepts: [
        { term: "天人合一", meaning: "人与天合一" },
        { term: "中和", meaning: "中正平和" },
        { term: "尽性", meaning: "充分发挥本性" }
      ]
    },
    {
      system: "中医",
      icon: "🌿",
      interpretation: "中医认为此阶段是「形神合一」。通过修炼，使身体和精神合一，达到「形与神俱」的境界。《黄帝内经》云：「形与神俱，而尽终其天年。」",
      keyConcepts: [
        { term: "形神合一", meaning: "身体和精神合一" },
        { term: "天年", meaning: "自然的寿命" },
        { term: "真人", meaning: "修炼圆满的人" }
      ]
    },
    {
      system: "武学",
      icon: "⚔",
      interpretation: "武学称此阶段为「炼虚合道」。通过放下自我，与道合一。武学最高境界是「无形无意，感而遂通」。",
      keyConcepts: [
        { term: "炼虚合道", meaning: "修炼到虚，与道合一" },
        { term: "无形无意", meaning: "没有形式，没有意念" },
        { term: "感而遂通", meaning: "感应而自然通达" }
      ]
    }
  ]
};

// ==================== 核心概念数据 ====================

export interface CoreConcept {
  term: string;
  definition: string;
  application: string;
  related: string[];
}

export const coreConcepts: Record<StageKey, CoreConcept[]> = {
  lianxing: [
    {
      term: "精气神",
      definition: "精是生命的物质基础，气是生命的能量表现，神是生命的主宰。三者相互转化，精足则气旺，气旺则神全。",
      application: "炼形化精阶段重在「补精」，通过修复身体机能，使后天之精充盈。",
      related: ["性命双修", "后天返先天"]
    },
    {
      term: "性命双修",
      definition: "「性」指意识、精神，「命」指身体、生命。性命双修即同时修炼身体和精神。",
      application: "炼形化精属于「命功」，通过身体修炼来延长寿命、增强体质。",
      related: ["命功", "性功"]
    },
    {
      term: "松静自然",
      definition: "「松」是身体不紧张，「静」是心神不纷乱，「自然」是不刻意强求。",
      application: "站桩时保持身体放松，心神宁静，不刻意追求效果。",
      related: ["无为", "自然"]
    },
    {
      term: "后天返先天",
      definition: "人出生后，由先天状态转为后天状态。修炼的目标是使后天之精得到补充和升华，逐步向先天状态回归。",
      application: "通过修炼，使后天之精充盈，为炼精化气创造条件。",
      related: ["先天之气", "后天之气"]
    },
    {
      term: "丹田",
      definition: "脐下三寸处，内气汇聚之所。分为上丹田（印堂）、中丹田（膻中）、下丹田（脐下三寸）。",
      application: "炼形化精阶段开始培养丹田气感，意念轻守丹田。",
      related: ["气海", "关元"]
    }
  ],
  lianjing: [
    {
      term: "先天之气",
      definition: "人与生俱来的生命能量，不同于后天通过呼吸和饮食获得的气。",
      application: "炼精化气的目标是通过修炼，使后天之气不断补充先天之气。",
      related: ["后天之气", "元气"]
    },
    {
      term: "小周天",
      definition: "气沿任督二脉循环运行的路径，从丹田下会阴，过尾闾，沿督脉上行至百会，再沿任脉下行回丹田。",
      application: "小周天是炼精化气的核心验证标准，通过意守和引导，使气沿任督运行。",
      related: ["大周天", "任督二脉"]
    },
    {
      term: "任督二脉",
      definition: "任脉在前，从会阴至承浆；督脉在后，从尾闾至百会。二者交汇于会阴和龈交。",
      application: "炼精化气阶段主要打通任督二脉，使气机循环运行。",
      related: ["小周天", "奇经八脉"]
    },
    {
      term: "胎息",
      definition: "呼吸变得极其微细，如婴儿在母腹中的呼吸。不是憋气，而是自然达到的状态。",
      application: "炼精化气后期，呼吸逐步过渡到胎息状态。",
      related: ["体呼吸", "龟息"]
    },
    {
      term: "气冲病灶",
      definition: "气行至旧伤或病灶处时，会出现疼痛、酸胀等反应。这是气在疏通经络的正常现象。",
      application: "遇到气冲病灶时，不要惊慌，坚持练习会逐渐好转。",
      related: ["病灶", "疏通经络"]
    }
  ],
  lianqi: [
    {
      term: "识神",
      definition: "后天形成的意识，主管思维、判断、分别。特点是活跃、散乱、分别心强。",
      application: "炼气化神阶段，需要使识神安静下来，不再胡思乱想。",
      related: ["元神", "意识"]
    },
    {
      term: "元神",
      definition: "先天本有的意识，主管直觉、觉知、智慧。特点是宁静、清明、无分别。",
      application: "炼气化神的目标是使元神显现，体验到清明的觉知。",
      related: ["识神", "本性"]
    },
    {
      term: "觉知",
      definition: "意识的根本功能，是「知道」的能力。普通状态下，觉知被思维、情绪所遮蔽。",
      application: "通过静定修炼，使思维安静下来，让觉知显现。",
      related: ["意识", "观照"]
    },
    {
      term: "心流",
      definition: "意识完全专注于当下活动的状态，时间感消失，行动与意识合一。",
      application: "炼气化神阶段，修炼者会频繁体验到心流状态。",
      related: ["定境", "专注"]
    },
    {
      term: "弥漫识海",
      definition: "意识扩展的状态，觉知不再局限于身体内部，而是弥漫到周围环境，甚至无限。",
      application: "通过弥漫识海观，将意识从个体扩展到宇宙。",
      related: ["识海", "扩展觉知"]
    }
  ],
  lianshen: [
    {
      term: "虚",
      definition: "「虚」不是空无，而是道的本体状态。虚中涵万有，静中藏生机。",
      application: "炼神返虚就是回归到道的本体状态，体验到无形无相的真实。",
      related: ["道", "无"]
    },
    {
      term: "无我",
      definition: "放下对自我身份的执着，体验到个体与整体不二的境界。",
      application: "炼神返虚阶段，逐步放下对自我身份的执着。",
      related: ["去身份化", "自性"]
    },
    {
      term: "天人合一",
      definition: "个体意识与宇宙意识融为一体，体验到万物同体的大悲。",
      application: "炼神返虚阶段，去除遮蔽，恢复本来的合一状态。",
      related: ["合一", "万物一体"]
    },
    {
      term: "无为",
      definition: "「无为」不是什么都不做，而是不刻意、不强求、不执着。",
      application: "在无为中，一切行动自然发生，恰到好处。",
      related: ["自然", "道法自然"]
    },
    {
      term: "慈悲",
      definition: "体验到万物一体后，自然生起的同体大悲。不是刻意的善良，而是自然反应。",
      application: "炼神返虚阶段，慈悲成为自然流露，不需要刻意。",
      related: ["大悲", "同体"]
    }
  ]
};

// ==================== 难点预告数据 ====================

export interface DifficultyPreview {
  difficulty: string;
  description: string;
  prevention: string[];
  solution: string[];
}

export const difficultyPreviews: Record<StageKey, DifficultyPreview[]> = {
  lianxing: [
    {
      difficulty: "身体酸痛",
      description: "初期练功时，由于身体长期不运动，会出现肌肉酸痛、关节不适等反应。",
      prevention: ["循序渐进，不要急于求成", "练功前适当热身", "练功后适当放松"],
      solution: ["坚持练习，酸痛会在一周内减轻", "适当减少练功时间", "按摩酸痛部位"]
    },
    {
      difficulty: "难以坚持",
      description: "前两周是最容易放弃的时期，很多人因为看不到效果而失去信心。",
      prevention: ["设定小目标，完成后奖励自己", "找到练功伙伴，互相监督", "记录练功日记，增强仪式感"],
      solution: ["相信「水滴石穿」的力量", "从每天5分钟开始", "不要追求完美，先建立习惯"]
    },
    {
      difficulty: "胡思乱想",
      description: "站桩或静坐时，念头纷飞，难以安静。",
      prevention: ["不要抗拒念头", "把注意力放在呼吸或身体上", "接受念头来了又走"],
      solution: ["「来者不拒，去者不留」", "轻轻将注意力拉回", "坚持三个月，杂念会明显减少"]
    },
    {
      difficulty: "姿势不正确",
      description: "初学者往往姿势不正确，影响练功效果。",
      prevention: ["对着镜子练习", "请教老师或资深学员", "先熟悉口诀再练习"],
      solution: ["参照口诀逐步调整", "不要追求完美，先站住", "随着练习深入，姿势会自然调整"]
    }
  ],
  lianjing: [
    {
      difficulty: "气感不明显",
      description: "炼精化气初期，很多人感觉不到气感，怀疑自己修炼是否正确。",
      prevention: ["不要刻意追求气感", "保持耐心，继续练习", "相信气感会自然出现"],
      solution: ["意念要轻，如丝如缕", "检查姿势是否正确", "调整呼吸，使其深长细匀"]
    },
    {
      difficulty: "气感不稳定",
      description: "气感时有时无，今天明显，明天消失。",
      prevention: ["不执着于气感", "保持平和心态", "规律生活，养精蓄锐"],
      solution: ["「来者不拒，去者不留」", "检查身体状态", "调整意念的轻重"]
    },
    {
      difficulty: "气冲病灶",
      description: "气行至旧伤或病灶处时，会出现疼痛、酸胀等反应。",
      prevention: ["了解气冲病灶是正常的", "不要惊慌", "保持平和心态"],
      solution: ["坚持练习，气足自通", "意念引气绕行", "适当按摩病灶部位"]
    },
    {
      difficulty: "气上头",
      description: "气上行至头部时，出现头晕、头痛等反应。",
      prevention: ["意念不要过重", "不要强行引气上行", "保持呼吸自然"],
      solution: ["意念引气下行至涌泉", "按摩百会、风池穴", "适当休息"]
    }
  ],
  lianqi: [
    {
      difficulty: "识神与元神难以分辨",
      description: "识神和元神混杂在一起，难以分辨哪个是思维，哪个是觉知。",
      prevention: ["学习理论知识", "通过观心练习", "请教老师"],
      solution: ["观察念头的来去", "发现「能观」的才是真正的自己", "坚持练习，逐渐清晰"]
    },
    {
      difficulty: "状态波动",
      description: "有时觉知清晰，有时混沌，状态起伏不定。",
      prevention: ["不执着于状态", "保持平常心", "规律生活"],
      solution: ["状态好时不骄傲，状态差时不气馁", "继续练习", "检查生活习惯"]
    },
    {
      difficulty: "出现幻象",
      description: "练习中可能出现各种幻象，如光、颜色、形象等。",
      prevention: ["了解幻象是正常的", "不要执着", "保持觉知"],
      solution: ["「凡所有相，皆是虚妄」", "只是看着，不随不逐", "必要时停止练习，咨询老师"]
    },
    {
      difficulty: "动中三摩地难以保持",
      description: "在日常活动中难以保持觉知，容易被事务带走。",
      prevention: ["从简单的动作开始", "逐步扩展", "不要急于求成"],
      solution: ["发现走神后，轻轻拉回", "从行走觉知开始", "逐步扩展到其他活动"]
    }
  ],
  lianshen: [
    {
      difficulty: "去身份化困难",
      description: "最难放下的是对自我身份的执着，如「修行者」「老师」等标签。",
      prevention: ["认识到身份只是标签", "观察身份是如何形成的", "不要依赖身份获得认同"],
      solution: ["想象婴儿的状态", "在不同角色中灵活转换", "内心保持自由"]
    },
    {
      difficulty: "感到空虚",
      description: "放下修行概念后，可能会感到空虚，不知道做什么。",
      prevention: ["了解空虚是正常的", "不要恐惧", "保持觉知"],
      solution: ["空虚中自有充实", "继续练习", "在日常生活中体会平常"]
    },
    {
      difficulty: "慈悲变成执着",
      description: "慈悲心可能变成执着，如执着于帮助他人、执着于做善事。",
      prevention: ["了解慈悲是自然反应", "不要刻意", "保持觉知"],
      solution: ["慈悲后不执着", "帮助他人后不图回报", "保持平常心"]
    },
    {
      difficulty: "认为自己已经开悟",
      description: "此阶段最大的障碍是认为自己已经开悟，从而停止修行。",
      prevention: ["了解开悟不是终点", "保持谦逊", "继续练习"],
      solution: ["真正的开悟是知道没有什么需要开悟的", "修行成为生活方式", "不追求更高境界"]
    }
  ]
};
