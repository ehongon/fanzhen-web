// 凡真修炼体系总览数据
// 四阶段九层结构，融合儒释道医武艺各家之长

export type StageKey = "lianxing" | "lianjing" | "lianqi" | "lianshen";
export type PeriodKey = "early" | "middle" | "late";
export type SchoolKey = "dao" | "fo" | "ru" | "yi" | "wu" | "yujia" | "kexue";
export type ConstitutionKey = "yangxu" | "yinxu" | "tanshi" | "qiyu" | "pinghe";

export interface SubLevel {
  key: PeriodKey;
  name: string;
  duration: string;
  positioning: string;
  coreGoals: {
    xing: string;
    qi: string;
    shen: string;
    xu?: string;
  };
  methods: Record<SchoolKey, string[]>;
  bestCombination: {
    name: string;
    items: string[];
    principle: string;
    duration: string;
  };
  constitutionAdvice: Record<ConstitutionKey, string[]>;
  coreConcepts: { title: string; content: string }[];
  mutualVerification: { school: string; content: string }[];
  difficulties: { problem: string; analysis: string; solution: string }[];
  breakthrough: string[];
  verificationStandards: string[];
  estimatedTime: string;
  dangerSignals: string[];
}

export interface StageOverview {
  key: StageKey;
  title: string;
  subtitle: string;
  order: number;
  color: string;
  coreGoal: string;
  estimatedTime: string;
  verificationCount: number;
  description: string;
  subLevels: SubLevel[];
}

export interface CoreConcept {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  explanation: string;
  plainExplanation: string;
  application: string;
  schoolsView: Record<SchoolKey, string>;
}

export interface SchoolMapping {
  stage: StageKey;
  stageName: string;
  mappings: Record<SchoolKey, {
    coreMethod: string;
    detail: string;
    classic: string;
  }>;
}

export interface BestCombination {
  stage: StageKey;
  stageName: string;
  combinations: {
    name: string;
    items: { name: string; duration: string; note: string }[];
    principle: string;
    suitable: string[];
    effect: string;
  }[];
}

export interface ConstitutionGuide {
  type: ConstitutionKey;
  name: string;
  description: string;
  characteristics: string[];
  stageAdvice: Record<StageKey, {
    focus: string;
    recommended: string[];
    avoid: string[];
    diet: string[];
    lifestyle: string[];
  }>;
}

export interface DifficultyBreakthrough {
  stage: StageKey;
  stageName: string;
  difficulties: {
    title: string;
    description: string;
    cause: string;
    solutions: { source: string; method: string }[];
    fanzhenTip: string;
  }[];
}

// ==================== 四阶段九层数据 ====================

export const stageOverviews: StageOverview[] = [
  {
    key: "lianxing",
    title: "炼形化精",
    subtitle: "身体重建，筑基之基",
    order: 1,
    color: "#4a7c59",
    coreGoal: "修复长期损耗的身体机能，重建健康基线，使后天之精充盈",
    estimatedTime: "3-6个月",
    verificationCount: 8,
    description: "以道家命功为基，融合中医养生、武学筑基、瑜伽体式，系统修复身体机能。此阶段重在「补精」，通过调整身体姿态、运动锻炼，使精血充盈，为后续修炼打下坚实基础。",
    subLevels: [
      {
        key: "early",
        name: "初期",
        duration: "1-3个月",
        positioning: "唤醒身体觉知，纠正不良体态",
        coreGoals: {
          xing: "纠正含胸驼背、脊柱侧弯等不良体态，恢复身体自然中正",
          qi: "建立腹式呼吸习惯，呼吸深度增加30%以上",
          shen: "改善睡眠质量，入睡时间缩短至30分钟以内",
        },
        methods: {
          dao: ["无极桩（每日15-20分钟）", "六字诀呼吸法", "导引术基础"],
          fo: ["安那般那念（观呼吸）", "行禅（缓慢行走觉知）", "四念处-身念处"],
          ru: ["正襟危坐调身法", "祭孔导引术", "礼的威仪训练"],
          yi: ["八段锦全套", "五禽戏（虎、鹿二戏）", "经络拍打（胆经、膀胱经）"],
          wu: ["形意拳三体式", "太极拳起势与野马分鬃", "基本功：压腿、踢腿"],
          yujia: ["山式站立（Tadasana）", "猫牛式（Marjaryasana-Bitilasana）", "婴儿式（Balasana）"],
          kexue: ["核心肌群激活训练", "本体感觉训练", "渐进式肌肉放松（PMR）"],
        },
        bestCombination: {
          name: "凡真子推荐：筑基唤醒组合",
          items: ["晨起无极桩20分钟", "八段锦15分钟", "睡前经络拍打10分钟"],
          principle: "桩功静养以培元，八段锦动功以疏通经络，拍打以激活气血。动静结合，符合「阳动阴静」之理。",
          duration: "每日45-50分钟",
        },
        constitutionAdvice: {
          yangxu: ["桩功时间延长至30分钟以培补阳气", "增加五禽戏虎戏以升发阳气", "避免清晨露水中练功", "配合艾灸关元、气海"],
          yinxu: ["减少桩功时间至15分钟", "增加瑜伽猫牛式以柔润脊柱", "避免中午烈日下练功", "配合六味地黄丸食疗"],
          tanshi: ["增加经络拍打力度，重点脾经、胃经", "八段锦「调理脾胃须单举」加做6次", "配合陈皮、茯苓代茶饮", "避免甜腻食物"],
          qiyu: ["增加行禅时间，每次30分钟", "配合「嘘」字诀疏肝理气", "选择开阔场地练功", "配合玫瑰花、佛手代茶饮"],
          pinghe: ["按标准方案练习即可", "可适当增加难度", "保持规律作息", "均衡饮食"],
        },
        coreConcepts: [
          { title: "后天之精", content: "人出生后通过饮食呼吸获得的精微物质，是维持生命活动的基础。炼形化精阶段重在补充后天之精。" },
          { title: "形正气顺", content: "身体姿态正确，气血运行自然顺畅。脊柱中正则督脉通畅，含胸拔背则任脉无阻。" },
        ],
        mutualVerification: [
          { school: "道家", content: "无极桩对应道家「抱元守一」，通过静立培养内气" },
          { school: "中医", content: "八段锦动作直接对应经络走向，「双手托天理三焦」调理三焦气机" },
          { school: "瑜伽", content: "山式站立与无极桩原理相通，都是建立身体正位和根基" },
          { school: "科学", content: "本体感觉训练已被证实可改善姿势控制和平衡能力" },
        ],
        difficulties: [
          { problem: "站桩时身体颤抖", analysis: "肌肉力量不足，身体在重新建立平衡", solution: "降低桩架高度，缩短时间，循序渐进" },
          { problem: "呼吸不自然", analysis: "长期胸式呼吸习惯，膈肌活动受限", solution: "先自然呼吸，不刻意追求腹式，待身体放松后自然过渡" },
        ],
        breakthrough: ["坚持每日固定时间练习", "记录身体变化日志", "寻找练习伙伴互相督促", "参加线下共修活动"],
        verificationStandards: ["连续站桩15分钟不抖", "腹式呼吸自然形成", "睡眠质量明显改善", "晨起精神饱满"],
        estimatedTime: "1-2个月",
        dangerSignals: ["头晕目眩持续不退", "胸闷气短", "关节疼痛加剧", "失眠加重"],
      },
      {
        key: "middle",
        name: "中期",
        duration: "3-9个月",
        positioning: "疏通经络，培养气感",
        coreGoals: {
          xing: "脊柱柔韧度显著提升，可完成标准易筋经全套动作",
          qi: "丹田出现温热感，手足常有温暖感",
          shen: "杂念减少，可专注呼吸10分钟以上",
        },
        methods: {
          dao: ["混元桩（每日30分钟）", "小周天导引（意念引导）", "胎息法初步"],
          fo: ["数息观", "不净观（白骨观简化版）", "慈悲观"],
          ru: ["静坐调息法", "格物致知心法", "诚意正心静坐"],
          yi: ["易筋经十二式全套", "五禽戏全套", "十二经络导引"],
          wu: ["形意拳五行拳", "太极拳二十四式", "八卦掌走圈"],
          yujia: ["拜日式A/B", "战士一/二式", "下犬式保持"],
          kexue: ["心率变异性（HRV）训练", "生物反馈训练", "迷走神经刺激练习"],
        },
        bestCombination: {
          name: "凡真子推荐：通经培元组合",
          items: ["混元桩30分钟", "易筋经全套25分钟", "十二经络导引15分钟"],
          principle: "混元桩培补元气，易筋经拉伸经筋，经络导引疏通气血。三者配合，形气并练。",
          duration: "每日70分钟",
        },
        constitutionAdvice: {
          yangxu: ["混元桩时意守关元", "易筋经「掌托天门」多做3次", "配合肉桂、干姜食疗", "避免冷水浴"],
          yinxu: ["桩功改为坐桩", "易筋经幅度减小，柔缓为主", "配合麦冬、玉竹食疗", "避免熬夜伤阴"],
          tanshi: ["增加八卦掌走圈30分钟", "易筋经「三盘落地」加做", "配合薏苡仁、赤小豆食疗", "饭后百步走"],
          qiyu: ["太极拳为主，桩功为辅", "增加「左右开弓似射雕」次数", "配合茉莉花、合欢花茶饮", "保持心情舒畅"],
          pinghe: ["按标准方案练习", "可适当增加强度", "尝试多种功法", "保持好奇心"],
        },
        coreConcepts: [
          { title: "丹田温热", content: "气血汇聚丹田产生的正常反应，说明气机开始活跃。不可刻意追求，也不可忽视。" },
          { title: "经筋", content: "中医概念，指联络关节、主司运动的筋膜组织。易筋经即通过拉伸经筋来强健身体。" },
        ],
        mutualVerification: [
          { school: "道家", content: "混元桩培养的内气，对应中医「元气」概念" },
          { school: "佛家", content: "数息观与道家「调息」相通，都是通过呼吸入手安定身心" },
          { school: "武学", content: "形意拳五行拳对应五行脏腑，劈拳属金通肺，钻拳属水通肾" },
          { school: "科学", content: "HRV训练与道家「调息」目标一致，都是提高自主神经调节能力" },
        ],
        difficulties: [
          { problem: "丹田温热感时有时无", analysis: "气机尚未稳定，受情绪、饮食、作息影响", solution: "保持规律作息，避免过饱过饥，不刻意追求气感" },
          { problem: "易筋经动作不到位", analysis: "经筋僵硬，关节活动度受限", solution: "循序渐进，不强行拉伸，配合呼吸慢慢深入" },
        ],
        breakthrough: ["增加练习时长至标准", "加入意念引导", "配合饮食调理", "定期参加共修"],
        verificationStandards: ["连续站桩30分钟轻松", "丹田温热感稳定", "易筋经动作标准", "手足温暖持续"],
        estimatedTime: "1-3个月",
        dangerSignals: ["气聚不散导致胀痛", "意念过重导致头痛", "过度拉伸导致拉伤", "出现幻觉"],
      },
      {
        key: "late",
        name: "后期",
        duration: "9-18个月",
        positioning: "巩固根基，为炼精化气做准备",
        coreGoals: {
          xing: "身体柔软度和力量显著提升，站桩1小时仍感轻松",
          qi: "气感清晰可辨，能感知任督二脉气流",
          shen: "心境平和，能觉察身体细微感受",
        },
        methods: {
          dao: ["三才桩（天地人合一）", "小周天完整运行", "内丹筑基功"],
          fo: ["止观双运", "四禅八定基础", "念佛三昧初步"],
          ru: ["定静安虑得", "心斋坐忘", "养吾浩然之气"],
          yi: ["大周天导引", "子午流注养生法", "灵龟八法"],
          wu: ["太极拳全套", "内家拳整劲训练", "推手初步"],
          yujia: ["阿斯汤加初级序列", "倒立准备式", "高级呼吸法（乌加依呼吸）"],
          kexue: ["冷暴露训练（渐进式）", "间歇性低氧训练", "高级生物反馈"],
        },
        bestCombination: {
          name: "凡真子推荐：筑基圆满组合",
          items: ["三才桩60分钟", "太极拳全套30分钟", "小周天导引20分钟"],
          principle: "三才桩培养深厚内气，太极拳运化气血，小周天导引打通任督。此时形气神三者开始合一。",
          duration: "每日110分钟",
        },
        constitutionAdvice: {
          yangxu: ["三才桩意守命门", "太极拳以刚为主，增强发劲", "配合鹿茸、肉苁蓉食疗", "冬季加强练功"],
          yinxu: ["三才桩改为坐式", "太极拳以柔为主，缓慢圆活", "配合熟地黄、枸杞子食疗", "夏季注意防暑"],
          tanshi: ["增加推手训练", "太极拳云手加做", "配合山楂、荷叶食疗", "避免久坐湿地"],
          qiyu: ["太极拳为主，桩功为辅", "增加「摇头摆尾去心火」", "配合香附、郁金食疗", "多参加集体活动"],
          pinghe: ["全面练习各功法", "可尝试教学相长", "探索个性化组合", "准备进入下一阶段"],
        },
        coreConcepts: [
          { title: "小周天", content: "气沿任督二脉循环运行的路径。从丹田下会阴，过尾闾，沿督脉上行至百会，再沿任脉下行回丹田。" },
          { title: "三才", content: "天、地、人三才。三才桩即头顶百会向上虚顶（天），脚底涌泉向下松沉（地），人中丹田居中调和（人）。" },
        ],
        mutualVerification: [
          { school: "道家", content: "小周天运行对应内丹「炼精化气」的准备阶段" },
          { school: "佛家", content: "止观双运与道家「性命双修」相通，都是定慧等持" },
          { school: "儒家", content: "「养吾浩然之气」与道家培养元气目标一致" },
          { school: "科学", content: "冷暴露训练可激活棕色脂肪，与道家「采摄外气」有相似生理效应" },
        ],
        difficulties: [
          { problem: "小周天运行不畅", analysis: "三关（尾闾、夹脊、玉枕）有阻滞", solution: "不强行冲关，继续养气，气足自通。可配合针灸推拿辅助" },
          { problem: "练功出现倦怠期", analysis: "身体进入平台期，需要调整方法或增加强度", solution: "尝试新的功法组合，参加共修获得能量，或短暂休息调整" },
        ],
        breakthrough: ["每日练功时间达到标准", "小周天运行通畅", "参加进阶共修", "寻找明师指点"],
        verificationStandards: ["站桩1小时轻松", "小周天运行完整", "身体柔软有力", "精力充沛稳定"],
        estimatedTime: "1-3个月",
        dangerSignals: ["强行冲关导致气乱", "出现幻听幻视", "情绪极端波动", "身体过度消耗"],
      },
    ],
  },
  {
    key: "lianjing",
    title: "炼精化气",
    subtitle: "气机生成，小周天与大周天",
    order: 2,
    color: "#5b8db8",
    coreGoal: "激活身体能量系统，培养气感，打通经络循环，使后天之精化为先天之气",
    estimatedTime: "6-12个月",
    verificationCount: 8,
    description: "以道家内丹为核心，融合佛家禅定、儒家静坐、中医经络、武学内功，系统激活能量循环。此阶段重在「化气」，通过意守、呼吸、观想，使精转化为气，打通小周天乃至大周天。",
    subLevels: [
      {
        key: "early",
        name: "初期",
        duration: "1-6个月",
        positioning: "气感培养，任督初通",
        coreGoals: {
          xing: "站桩姿势稳固，可静坐30分钟以上",
          qi: "丹田气感明显，温热、跳动、充实",
          shen: "能专注意守丹田15分钟不散",
        },
        methods: {
          dao: ["意守丹田法", "采药归炉", "文武火候初步"],
          fo: ["随息观", "四念处-受念处", "不净观进阶"],
          ru: ["主敬存诚静坐", "定性书心法", "夜气存养"],
          yi: ["任督二脉艾灸", "针刺导引（需专业医师）", "气功外放感知"],
          wu: ["形意拳内劲训练", "太极拳缠丝劲", "站桩加意念"],
          yujia: ["根锁（Mula Bandha）", "腹锁（Uddiyana Bandha）", "圣光调息（Kapalabhati）"],
          kexue: ["心率变异性高级训练", "呼吸同步训练", "温度生物反馈"],
        },
        bestCombination: {
          name: "凡真子推荐：采药归炉组合",
          items: ["意守丹田静坐40分钟", "采药归炉（特定呼吸法）20分钟", "太极拳缠丝劲30分钟"],
          principle: "静坐培养内气，采药归炉将散乱之气汇聚丹田，缠丝劲运化气血。三者配合，精气渐化为气。",
          duration: "每日90分钟",
        },
        constitutionAdvice: {
          yangxu: ["意守关元，配合艾灸", "增加武火呼吸", "配合附子理中丸食疗", "避免寒凉"],
          yinxu: ["意守涌泉，引火归元", "减少呼吸力度，文火为主", "配合知柏地黄丸食疗", "避免熬夜"],
          tanshi: ["意守中脘，健脾化湿", "增加圣光调息", "配合参苓白术散食疗", "避免甜腻"],
          qiyu: ["意守膻中，疏肝理气", "配合嘘字诀", "配合逍遥散食疗", "保持心情舒畅"],
          pinghe: ["按标准方案练习", "可适当增加难度", "探索个性化方法", "保持规律"],
        },
        coreConcepts: [
          { title: "采药", content: "「药」指体内真气。采药即将散乱之气汇聚于丹田，如同采撷药材归于药炉。" },
          { title: "文武火候", content: "武火指较强的意念和呼吸，用于采药；文火指轻柔的意念和呼吸，用于养气。" },
        ],
        mutualVerification: [
          { school: "道家", content: "意守丹田与佛家「安那般那念」都通过专注呼吸培养定力" },
          { school: "佛家", content: "受念处观察身体感受，与道家培养气感相通" },
          { school: "中医", content: "艾灸任督二脉可辅助打通小周天，与内丹修炼相互促进" },
          { school: "科学", content: "温度生物反馈可直观显示丹田温度变化，验证气感" },
        ],
        difficulties: [
          { problem: "气感不明显", analysis: "体质差异，有人气感敏锐，有人迟钝。也与意念轻重有关", solution: "不刻意追求，继续练习。意念要轻，如鸡孵卵" },
          { problem: "意守时杂念纷飞", analysis: "识神活跃，习惯性思维难以停止", solution: "采用数息法过渡，从1数到10再回头，逐步过渡到随息" },
        ],
        breakthrough: ["每日静坐时间达到40分钟", "学习文武火候", "参加内丹共修", "寻找明师验证"],
        verificationStandards: ["丹田气感稳定", "可意守15分钟不散", "静坐30分钟轻松", "手足温暖持续"],
        estimatedTime: "1-3个月",
        dangerSignals: ["气上头导致头晕", "意念过重导致头痛", "气聚不散导致胀痛", "情绪波动剧烈"],
      },
      {
        key: "middle",
        name: "中期",
        duration: "6-18个月",
        positioning: "小周天通畅，气机循环",
        coreGoals: {
          xing: "身体出现「气冲病灶」反应，旧病复发后痊愈",
          qi: "小周天运行通畅，气沿任督自动循环",
          shen: "入定时间延长，可进入轻安状态",
        },
        methods: {
          dao: ["小周天运行法", "卯酉周天", "火候精微调控"],
          fo: ["初禅训练", "四无量心", "密宗宝瓶气"],
          ru: ["孔颜乐处", "观喜怒哀乐未发", "夜气与平旦之气"],
          yi: ["子午流注针灸", "灵龟八法应用", "气功外气治疗"],
          wu: ["太极拳发劲", "形意拳暗劲", "八卦掌变劲"],
          yujia: ["经脉清洁呼吸（Nadi Shodhana）", "火呼吸（Bhastrika）", "昆达里尼基础"],
          kexue: ["经颅磁刺激（TMS）辅助", "高压氧治疗", "低温冷疗"],
        },
        bestCombination: {
          name: "凡真子推荐：周天运转组合",
          items: ["小周天运行静坐60分钟", "卯酉周天20分钟", "太极拳发劲30分钟"],
          principle: "小周天运行使气机循环不息，卯酉周天调和阴阳平衡，发劲将内气化为劲力。此时性命开始双修。",
          duration: "每日110分钟",
        },
        constitutionAdvice: {
          yangxu: ["小周天运行时意守命门", "增加火呼吸", "配合右归丸食疗", "冬季加强"],
          yinxu: ["卯酉周天为主，小周天为辅", "减少火呼吸，增加经脉清洁呼吸", "配合左归丸食疗", "夏季注意"],
          tanshi: ["小周天配合脾胃运化", "增加太极拳云手", "配合香砂六君子汤食疗", "饭后不宜立即练功"],
          qiyu: ["小周天时配合嘘字诀", "增加八卦掌变劲", "配合柴胡疏肝散食疗", "多与人交流"],
          pinghe: ["全面练习", "探索火候精微", "尝试教学", "准备大周天"],
        },
        coreConcepts: [
          { title: "气冲病灶", content: "气行至旧病或淤堵处时，会出现疼痛、酸胀等反应。这是气在疏通经络，坚持后会好转。" },
          { title: "卯酉周天", content: "小周天是南北方向（任督），卯酉周天是东西方向（带脉）。两者配合，形成十字循环。" },
        ],
        mutualVerification: [
          { school: "道家", content: "小周天运行与中医任督二脉完全对应" },
          { school: "佛家", content: "初禅的「离生喜乐」与道家小周天通的轻安状态相似" },
          { school: "中医", content: "子午流注针灸可在特定时辰增强特定经脉的气血运行，辅助周天功" },
          { school: "科学", content: "TMS可刺激特定脑区，与气功的意念引导有相似神经机制" },
        ],
        difficulties: [
          { problem: "气冲病灶反应强烈", analysis: "旧病淤堵严重，气行至该处受阻", solution: "坚持练习，气足自通。反应过于强烈时减少练功时间，或配合针灸推拿" },
          { problem: "小周天运行时断时续", analysis: "气机尚不稳定，受情绪、饮食、外界影响", solution: "保持心境平和，避免过饱过饥，选择安静环境练功" },
        ],
        breakthrough: ["每日静坐达到60分钟", "小周天运行稳定", "学习卯酉周天", "参加高级共修"],
        verificationStandards: ["小周天运行完整", "气冲病灶反应消退", "入定30分钟以上", "身体明显轻盈"],
        estimatedTime: "3-6个月",
        dangerSignals: ["气乱导致身体不适", "强行通周天气逆", "出现严重幻觉", "情绪失控"],
      },
      {
        key: "late",
        name: "后期",
        duration: "18-36个月",
        positioning: "大周天初通，气遍全身",
        coreGoals: {
          xing: "体呼吸形成，全身毛孔参与呼吸",
          qi: "大周天运行初步，气遍十二正经",
          shen: "识神与元神开始分辨，觉知清明",
        },
        methods: {
          dao: ["大周天运行法", "胎息法深入", "内丹结丹初步"],
          fo: ["二禅至四禅", "密宗拙火定", "大圆满心髓"],
          ru: ["尽心知性知天", "万物皆备于我", "天人合一静坐"],
          yi: ["大周天针灸", "奇经八脉调理", "气功高级外放"],
          wu: ["太极拳化劲", "形意拳化劲", "内家拳听劲"],
          yujia: ["高级调息法", "昆达里尼唤醒", "三摩地准备"],
          kexue: ["神经反馈训练", "脑波同步训练", "高级冷暴露"],
        },
        bestCombination: {
          name: "凡真子推荐：大周天通运组合",
          items: ["大周天运行静坐90分钟", "胎息法30分钟", "太极拳化劲40分钟"],
          principle: "大周天使气遍全身，胎息使呼吸微细，化劲使气化为无形之力。此时形气神三者深度融合。",
          duration: "每日160分钟",
        },
        constitutionAdvice: {
          yangxu: ["大周天时意守命门、督脉", "增加拙火定训练", "配合金匮肾气丸食疗", "冬季多练"],
          yinxu: ["大周天时意守涌泉、任脉", "减少拙火，增加清凉观想", "配合大补阴丸食疗", "夏季多练"],
          tanshi: ["大周天配合脾胃运化", "增加太极拳化劲", "配合实脾饮食疗", "避免湿冷"],
          qiyu: ["大周天配合疏肝理气", "增加听劲训练", "配合四逆散食疗", "保持心情舒畅"],
          pinghe: ["全面深入", "探索结丹", "准备进入炼气化神", "寻找明师"],
        },
        coreConcepts: [
          { title: "大周天", content: "气在全身十二正经和奇经八脉中循环运行。比小周天更全面，气感遍布全身。" },
          { title: "胎息", content: "呼吸变得极其微细，如婴儿在母腹中的呼吸。鼻息微微，若存若亡。" },
        ],
        mutualVerification: [
          { school: "道家", content: "大周天对应中医十二正经，胎息对应「体呼吸」" },
          { school: "佛家", content: "四禅的「息停」与道家胎息相通，都是呼吸极度微细的状态" },
          { school: "瑜伽", content: "昆达里尼唤醒与道家小周天通有相似能量体验" },
          { school: "科学", content: "脑波同步训练可使大脑进入特定频率，与禅定状态相似" },
        ],
        difficulties: [
          { problem: "大周天运行复杂", analysis: "十二正经路线复杂，意念难以同时照顾", solution: "先通一经，再通一经，逐步扩展。不可急于求成" },
          { problem: "胎息难以达到", analysis: "呼吸习惯根深蒂固，难以达到极微细状态", solution: "循序渐进，从腹式到体呼吸，逐步微细。不可憋气" },
        ],
        breakthrough: ["每日静坐达到90分钟", "大周天运行初步", "胎息法深入", "寻找明师指点"],
        verificationStandards: ["大周天运行初步", "胎息法稳定", "体呼吸形成", "识神元神可分辨"],
        estimatedTime: "3-6个月",
        dangerSignals: ["气散导致虚弱", "胎息变成憋气", "过度消耗精气", "出现严重偏差"],
      },
    ],
  },
  {
    key: "lianqi",
    title: "炼气化神",
    subtitle: "意识训练，识神与元神",
    order: 3,
    color: "#8b6fae",
    coreGoal: "以气养神，将能量转化为意识的觉知力，识神安静，元神显现",
    estimatedTime: "12-24个月",
    verificationCount: 8,
    description: "以佛家禅定和道家性功为核心，融合儒家心性之学、瑜伽冥想、现代心理学，系统训练意识。此阶段重在「化神」，通过深度静定，使识神安静下来，让元神显现。",
    subLevels: [
      {
        key: "early",
        name: "初期",
        duration: "1-12个月",
        positioning: "识神安静，元神初显",
        coreGoals: {
          xing: "身体进入深度放松，可长时间静坐不动",
          qi: "气感弥漫，不再局限于经络",
          shen: "识神活动减少，可觉知念头生灭",
        },
        methods: {
          dao: ["性功修炼", "回光返照", "凝神入炁穴"],
          fo: ["止观", "话头禅", "默照禅"],
          ru: ["定性", "尽心", "格物致知深入"],
          yi: ["五神藏调理", "情志养生", "音乐疗法（五音疗疾）"],
          wu: ["太极拳用意不用力", "推手听劲", "内家拳神意训练"],
          yujia: ["观呼吸进阶", "身体扫描", "内观（Vipassana）"],
          kexue: ["正念冥想（MBSR）", "神经可塑性训练", "认知行为疗法"],
        },
        bestCombination: {
          name: "凡真子推荐：凝神入炁组合",
          items: ["回光返照静坐60分钟", "止观双运30分钟", "太极拳用意不用力40分钟"],
          principle: "回光返照使识神内敛，止观双运定慧等持，用意不用力训练神意。此时开始性命双修。",
          duration: "每日130分钟",
        },
        constitutionAdvice: {
          yangxu: ["回光返照意守祖窍", "增加日光观想", "配合桂枝甘草汤食疗", "避免阴暗环境"],
          yinxu: ["回光返照意守泥丸", "增加月光观想", "配合酸枣仁汤食疗", "避免强光"],
          tanshi: ["回光返照配合脾胃运化", "增加身体扫描", "配合温胆汤食疗", "避免思虑过度"],
          qiyu: ["回光返照配合疏肝", "增加话头禅", "配合甘麦大枣汤食疗", "保持心情舒畅"],
          pinghe: ["按标准方案", "探索性功", "准备深入", "保持规律"],
        },
        coreConcepts: [
          { title: "识神与元神", content: "识神是后天意识，主管思维分别；元神是先天意识，主管觉知智慧。炼气化神就是让识神安静，元神显现。" },
          { title: "回光返照", content: "将外放的神识收回来，向内观照。如同将照向外界的光收回来，照向自己。" },
        ],
        mutualVerification: [
          { school: "道家", content: "回光返照与佛家「反观」相通，都是将觉知向内转" },
          { school: "佛家", content: "止观与道家「性命双修」相通，止是定，观是慧" },
          { school: "儒家", content: "「定性」与佛家「定」、道家「静」目标一致" },
          { school: "科学", content: "正念冥想已被大量研究证实可改善注意力和情绪调节" },
        ],
        difficulties: [
          { problem: "识神难以安静", analysis: "多年思维习惯，识神习惯性活跃", solution: "不抗拒念头，只是看着它。用「止」的方法，将注意力轻轻拉回" },
          { problem: "元神显现但不稳定", analysis: "元神初显，如同晨曦微光，易被识神遮蔽", solution: "保持练习，不追求、不执着。元神会自然稳定" },
        ],
        breakthrough: ["每日静坐达到60分钟", "学习止观", "参加禅修", "寻找明师"],
        verificationStandards: ["识神活动减少", "可觉知念头生灭", "静坐60分钟轻松", "出现轻安感受"],
        estimatedTime: "3-6个月",
        dangerSignals: ["执着于境界", "出现幻觉", "情绪极端波动", "脱离现实"],
      },
      {
        key: "middle",
        name: "中期",
        duration: "12-36个月",
        positioning: "元神稳定，觉知扩展",
        coreGoals: {
          xing: "身体与意识分离感出现，可觉知身体而不执着",
          qi: "气与神融合，气随意转",
          shen: "元神稳定，弥漫觉知出现",
        },
        methods: {
          dao: ["元神出窍（内观）", "炼神还虚初步", "三花聚顶"],
          fo: ["四禅", "神通开发（副产品，不执着）", "密宗光明定"],
          ru: ["万物皆备于我", "尽心知性", "与天地合其德"],
          yi: ["五神藏深度调理", "情志与脏腑关系", "高级音乐疗法"],
          wu: ["太极拳神意", "推手化劲", "内家拳神明"],
          yujia: ["三摩地准备", "高级冥想", "瑜伽睡眠（Yoga Nidra）"],
          kexue: ["深度神经反馈", "脑机接口训练", "高级正念"],
        },
        bestCombination: {
          name: "凡真子推荐：元神稳定组合",
          items: ["元神内观静坐90分钟", "四禅训练30分钟", "太极拳神意40分钟"],
          principle: "元神内观使元神稳定，四禅深化定力，神意训练将元神融入动作。此时元神开始主导。",
          duration: "每日160分钟",
        },
        constitutionAdvice: {
          yangxu: ["元神内观意守祖窍", "增加日光定", "配合人参养荣汤食疗", "保持阳气"],
          yinxu: ["元神内观意守泥丸", "增加月光定", "配合天王补心丹食疗", "保护阴精"],
          tanshi: ["元神内观配合脾胃", "增加瑜伽睡眠", "配合归脾汤食疗", "避免思虑"],
          qiyu: ["元神内观配合疏肝", "增加光明定", "配合丹栀逍遥散食疗", "保持开朗"],
          pinghe: ["全面深入", "探索神通", "不执着", "准备还虚"],
        },
        coreConcepts: [
          { title: "弥漫觉知", content: "觉知不再局限于身体内部，而是弥漫到周围环境。能感知到空间中的气场变化。" },
          { title: "三花聚顶", content: "精、气、神三者在头顶百会汇聚。是炼气化神的重要标志。" },
        ],
        mutualVerification: [
          { school: "道家", content: "三花聚顶与佛家「顶轮开启」有相似体验" },
          { school: "佛家", content: "四禅的「舍念清净」与道家元神稳定状态相似" },
          { school: "瑜伽", content: "三摩地与道家「定境」、佛家「禅定」目标一致" },
          { school: "科学", content: "深度神经反馈可训练大脑进入高阶意识状态" },
        ],
        difficulties: [
          { problem: "弥漫觉知后难以收回", analysis: "觉知扩展后，收功时需要循序渐进", solution: "收功时想象觉知如涟漪般层层收回丹田，不可突然收功" },
          { problem: "出现各种境界", analysis: "元神显现后，会出现各种光明、声音、形象", solution: "「凡所有相，皆是虚妄」。不执着、不恐惧，只是看着" },
        ],
        breakthrough: ["每日静坐达到90分钟", "元神稳定", "弥漫觉知出现", "参加高级禅修"],
        verificationStandards: ["元神稳定", "弥漫觉知出现", "四禅体验", "气随意转"],
        estimatedTime: "6-12个月",
        dangerSignals: ["执着于神通", "境界无法收回", "脱离现实", "精神异常"],
      },
      {
        key: "late",
        name: "后期",
        duration: "36-60个月",
        positioning: "炼神还虚初步，天人合一体验",
        coreGoals: {
          xing: "身体完全放松，行住坐卧皆是修行",
          qi: "气与神合一，气即是神，神即是气",
          shen: "识神完全安静，元神常照",
          xu: "天人合一体验出现",
        },
        methods: {
          dao: ["炼神还虚", "粉碎虚空", "与道合真"],
          fo: ["灭尽定", "大圆满", "禅宗顿悟"],
          ru: ["天人合一", "与天地合其德", "圣贤境界"],
          yi: ["天人相应", "五运六气", "高级情志调理"],
          wu: ["武道合一", "神明境界", "无形无意"],
          yujia: ["三摩地", "梵我合一", "高级昆达里尼"],
          kexue: ["超个人心理学", "高级意识状态研究", "整合性训练"],
        },
        bestCombination: {
          name: "凡真子推荐：还虚合道组合",
          items: ["炼神还虚静坐120分钟", "大圆满心法30分钟", "日常无事禅"],
          principle: "炼神还虚使神归于虚，大圆满心法直指本心，无事禅将修行融入日常。此时天人合一初现。",
          duration: "每日150分钟+全天候",
        },
        constitutionAdvice: {
          yangxu: ["还虚时意守虚无", "增加日光观想", "配合十全大补汤食疗", "保持阳气"],
          yinxu: ["还虚时意守虚空", "增加月光观想", "配合左归饮食疗", "保护阴精"],
          tanshi: ["还虚配合脾胃", "增加大圆满", "配合六君子汤食疗", "避免思虑"],
          qiyu: ["还虚配合疏肝", "增加顿悟禅", "配合柴胡疏肝散食疗", "保持开朗"],
          pinghe: ["全面深入", "探索合道", "不执着", "准备返虚"],
        },
        coreConcepts: [
          { title: "炼神还虚", content: "将元神进一步升华，归于虚无。不是消灭意识，而是超越意识的局限。" },
          { title: "天人合一", content: "个体意识与宇宙意识融为一体，体验到万物同体的大悲。" },
        ],
        mutualVerification: [
          { school: "道家", content: "炼神还虚与佛家「涅槃」、儒家「天人合一」境界相通" },
          { school: "佛家", content: "大圆满「明空双运」与道家「还虚」有相似体验" },
          { school: "儒家", content: "「与天地合其德」与道家「天人合一」、佛家「法界一体」相通" },
          { school: "科学", content: "超个人心理学研究高级意识状态，与宗教体验相互印证" },
        ],
        difficulties: [
          { problem: "天人合一体验不稳定", analysis: "天人合一初现，如同闪电，转瞬即逝", solution: "不追求、不执着。继续练习，体验会自然稳定" },
          { problem: "日常生活中难以保持", analysis: "日常事务繁杂，容易回到旧有模式", solution: "练习「动中禅」，在日常中保持觉知" },
        ],
        breakthrough: ["每日静坐达到120分钟", "天人合一体验", "参加闭关", "寻找明师印证"],
        verificationStandards: ["天人合一体验", "元神常照", "识神安静", "行住坐卧皆是修行"],
        estimatedTime: "6-12个月",
        dangerSignals: ["执着于境界", "脱离现实", "精神异常", "身体极度虚弱"],
      },
    ],
  },
  {
    key: "lianshen",
    title: "炼神返虚",
    subtitle: "放下自我，天人合一",
    order: 4,
    color: "#d4a574",
    coreGoal: "超越个体意识局限，体验天人合一的自在境界，无为而无不为",
    estimatedTime: "长期修炼",
    verificationCount: 8,
    description: "以道家「与道合真」、佛家「涅槃」、儒家「天人合一」为最高境界，融合各家之长，达到无为而无不为的自在。此阶段重在「返虚」，放下一切执着，回归道的本体。",
    subLevels: [
      {
        key: "early",
        name: "初期",
        duration: "1-3年",
        positioning: "放下自我，去身份化",
        coreGoals: {
          xing: "身体完全自然，不再刻意调整",
          qi: "气归于虚，不再感知气的运行",
          shen: "放下修行者身份，回归平常",
          xu: "虚静体验出现",
        },
        methods: {
          dao: ["粉碎虚空", "与道合真", "无为法"],
          fo: ["涅槃", "佛性显现", "无修之修"],
          ru: ["圣人无名", "神人无知", "至人无己"],
          yi: ["天人相应", "五运六气应用", "不治而治"],
          wu: ["无形无意", "感而遂通", "武道合一"],
          yujia: ["梵我合一", "三摩地深入", "无念之念"],
          kexue: ["超个人心理学应用", "整合性意识训练", "高级冥想研究"],
        },
        bestCombination: {
          name: "凡真子推荐：无为合道组合",
          items: ["无为静坐（无定式）", "日常无事禅", "慈悲行持"],
          principle: "无为静坐不执着于任何方法，无事禅将修行融入日常，慈悲行持利益众生。此时无修而修。",
          duration: "无定式，自然而行",
        },
        constitutionAdvice: {
          yangxu: ["无为时自然养阳", "增加日光浴", "配合温补食疗", "顺其自然"],
          yinxu: ["无为时自然养阴", "增加静养", "配合滋阴食疗", "避免耗散"],
          tanshi: ["无为时脾胃自调", "增加自然运动", "配合健脾食疗", "避免思虑"],
          qiyu: ["无为时肝气自舒", "增加自然交流", "配合疏肝食疗", "保持自然"],
          pinghe: ["自然而行", "无为而无不为", "利益众生", "与道合真"],
        },
        coreConcepts: [
          { title: "无为", content: "不是什么都不做，而是不刻意、不强求、不执着。在无为中，一切自然发生。" },
          { title: "去身份化", content: "放下「修行者」「老师」「学生」等身份标签，回归本来。" },
        ],
        mutualVerification: [
          { school: "道家", content: "无为与佛家「无修之修」、儒家「无为而治」相通" },
          { school: "佛家", content: "涅槃与道家「与道合真」、儒家「天人合一」境界一致" },
          { school: "儒家", content: "「至人无己」与道家「忘我」、佛家「无我」相通" },
          { school: "科学", content: "超个人心理学的「高峰体验」与宗教的「开悟」体验有相似神经机制" },
        ],
        difficulties: [
          { problem: "难以放下修行身份", analysis: "多年修行，「修行者」身份已成为自我认同的一部分", solution: "逐渐放下，不急于一时。从减少谈论修行开始" },
          { problem: "无为变成懈怠", analysis: "误解无为，以为无为就是什么都不做", solution: "无为是「不刻意」，不是「不做」。日常事务照常，只是心不执着" },
        ],
        breakthrough: ["放下修行身份", "体验无为", "参加闭关", "寻找明师印证"],
        verificationStandards: ["放下修行身份", "无为体验", "日常平常心", "慈悲心自然"],
        estimatedTime: "1-3年",
        dangerSignals: ["执着于无为", "脱离社会", "精神异常", "身体极度虚弱"],
      },
      {
        key: "middle",
        name: "中期",
        duration: "3-10年",
        positioning: "天人合一，慈悲自然",
        coreGoals: {
          xing: "身体与天地同步，顺应自然规律",
          qi: "气归于虚，虚中生气",
          shen: "天人合一成为常态",
          xu: "虚静常照",
        },
        methods: {
          dao: ["与道合真", "道法自然", "长生久视"],
          fo: [ "佛性常照", "无念之念", "悲智双运"],
          ru: ["与天地参", "参赞化育", "圣王之道"],
          yi: ["天人相应", "治未病", "养生延年"],
          wu: ["武道合一", "以武入道", "感而遂通"],
          yujia: ["梵我合一", "三摩地常照", "瑜伽生活"],
          kexue: ["整合性健康", "长寿研究", "高级意识应用"],
        },
        bestCombination: {
          name: "凡真子推荐：道法自然组合",
          items: ["自然静坐（无定式）", "日常慈悲行", "随缘度众"],
          principle: "自然静坐不执着于形式，日常慈悲行利益众生，随缘度众不刻意。此时与道合真。",
          duration: "无定式",
        },
        constitutionAdvice: {
          yangxu: ["自然养阳", "顺应四时", "配合食疗", "顺其自然"],
          yinxu: ["自然养阴", "顺应四时", "配合食疗", "避免耗散"],
          tanshi: ["自然调理", "顺应四时", "配合食疗", "避免思虑"],
          qiyu: ["自然舒畅", "顺应四时", "配合食疗", "保持自然"],
          pinghe: ["自然而行", "与道合真", "利益众生", "长生久视"],
        },
        coreConcepts: [
          { title: "天人合一常态", content: "天人合一不再是偶尔的体验，而是日常的常态。行住坐卧皆在道中。" },
          { title: "悲智双运", content: "慈悲与智慧同时具足。有慈悲而无智慧易生执着，有智慧而无慈悲易入空亡。" },
        ],
        mutualVerification: [
          { school: "道家", content: "长生久视与中医「治未病」、科学「长寿研究」相通" },
          { school: "佛家", content: "悲智双运与儒家「仁智双修」、道家「性命双修」相通" },
          { school: "儒家", content: "参赞化育与道家「道法自然」、佛家「利乐有情」相通" },
          { school: "科学", content: "长寿研究与道家「长生」、中医「延年」目标一致" },
        ],
        difficulties: [
          { problem: "慈悲心生但能力有限", analysis: "想帮助众生但能力有限，产生无力感", solution: "「随缘度众，尽力而为」。不执着结果，只问耕耘" },
          { problem: "天人合一但日常琐事繁杂", analysis: "日常事务与修行境界的矛盾", solution: "「烦恼即菩提」。日常事务即是修行，不分别" },
        ],
        breakthrough: ["天人合一常态", "慈悲心稳定", "随缘度众", "寻找明师印证"],
        verificationStandards: ["天人合一常态", "慈悲心自然", "智慧显现", "日常无为"],
        estimatedTime: "2-5年",
        dangerSignals: ["执着于境界", "脱离社会", "精神异常", "身体极度虚弱"],
      },
      {
        key: "late",
        name: "后期",
        duration: "10年以上",
        positioning: "究竟圆满，无为而无不为",
        coreGoals: {
          xing: "身体金刚不坏（相对），健康长寿",
          qi: "虚中生气，生生不息",
          shen: "究竟圆满，与道合真",
          xu: "虚空粉碎，大地平沉",
        },
        methods: {
          dao: ["与道合真", "长生久视", "无为而无不为"],
          fo: ["究竟涅槃", "佛果圆满", "普度众生"],
          ru: ["内圣外王", "参天地赞化育", "圣贤圆满"],
          yi: ["上工治未病", "养生延年", "天人合一医学"],
          wu: ["以武入道", "武道圆满", "感而遂通"],
          yujia: ["梵我合一", "瑜伽圆满", "三摩地究竟"],
          kexue: ["人类潜能开发", "意识研究前沿", "整合性科学"],
        },
        bestCombination: {
          name: "凡真子推荐：究竟圆满组合",
          items: ["无修之修", "无缘大慈同体大悲", "随缘度众"],
          principle: "无修之修是究竟的修行，无缘大慈同体大悲是究竟的慈悲，随缘度众是究竟的行持。",
          duration: "无时不在",
        },
        constitutionAdvice: {
          yangxu: ["究竟养阳", "与道合真", "长生久视", "顺其自然"],
          yinxu: ["究竟养阴", "与道合真", "长生久视", "避免耗散"],
          tanshi: ["究竟调理", "与道合真", "长生久视", "避免思虑"],
          qiyu: ["究竟舒畅", "与道合真", "长生久视", "保持自然"],
          pinghe: ["究竟圆满", "与道合真", "利益众生", "无为而无不为"],
        },
        coreConcepts: [
          { title: "究竟涅槃", content: "超越生死轮回，达到永恒的宁静。不是死亡，而是超越生死的境界。" },
          { title: "无为而无不为", content: "不刻意做任何事，但一切自然成就。因为与道合真，所以事事顺遂。" },
        ],
        mutualVerification: [
          { school: "道家", content: "长生久视与佛家「无量寿」、儒家「不朽」相通" },
          { school: "佛家", content: "究竟涅槃与道家「与道合真」、儒家「天人合一」是同一境界的不同表述" },
          { school: "儒家", content: "「内圣外王」与道家「无为而无不为」、佛家「悲智双运」相通" },
          { school: "科学", content: "人类潜能开发与宗教「开悟」有相似目标，都是探索意识的极限" },
        ],
        difficulties: [
          { problem: "圆满后如何继续", analysis: "达到圆满后，似乎无事可做", solution: "「无修而修，修而无修」。继续利益众生，只是不执着" },
          { problem: "如何帮助后人", analysis: "想将经验传承，但言语难以表达", solution: "「不立文字，教外别传」。以心印心，随缘指点" },
        ],
        breakthrough: ["究竟圆满", "与道合真", "利益众生", "传承道法"],
        verificationStandards: ["究竟圆满", "无为而无不为", "慈悲智慧圆满", "与道合真"],
        estimatedTime: "5年以上",
        dangerSignals: ["执着于圆满", "脱离众生", "精神异常", "身体极度虚弱"],
      },
    ],
  },
];

// ==================== 核心概念库 ====================

export const coreConcepts: CoreConcept[] = [
  {
    id: "jingshenqi",
    title: "精气神三位一体",
    subtitle: "生命的三大支柱",
    icon: "trinity",
    explanation: "精是生命的物质基础，气是生命的能量表现，神是生命的主宰。三者相互依存、相互转化：精足则气旺，气旺则神全；神全则气顺，气顺则精生。炼形化精阶段重在补精，炼精化气阶段重在化气，炼气化神阶段重在养神，炼神返虚阶段重在归虚。",
    plainExplanation: "精就是身体的物质基础，好比汽车的汽油；气就是能量，好比汽车的动力；神就是意识，好比驾驶员。三者缺一不可，互相影响。",
    application: "修炼时要三者兼顾，不可偏废。炼形时也要养神，炼神时也要保精。",
    schoolsView: {
      dao: "精气神是内丹修炼的核心，「炼精化气，炼气化神，炼神返虚」",
      fo: "精气神对应「身口意」三业，修炼即净化三业",
      ru: "精气神对应「形色天性」，通过修身养性达到天人合一",
      yi: "精气神对应「形气神」，中医养生重在调和三者",
      wu: "精气神对应「筋骨力」，武学修炼追求形气合一",
      yujia: "精气神对应「身息心」，瑜伽通过体式、呼吸、冥想调和三者",
      kexue: "精气神对应「物质能量信息」，现代科学从多角度研究生命",
    },
  },
  {
    id: "xingming",
    title: "性命双修",
    subtitle: "身体与意识同时修炼",
    icon: "balance",
    explanation: "「性」指意识、精神层面，「命」指身体、生命层面。性命双修就是同时修炼身体和意识，不可偏废。只修性不修命，则身体难以支撑；只修命不修性，则容易迷失方向。凡真体系以炼形化精、炼精化气为命功，以炼气化神、炼神返虚为性功，性命双修贯穿始终。",
    plainExplanation: "性就是心理、精神，命就是身体、生理。性命双修就是身心同时锻炼，不能只练身体不练心理，也不能只练心理不练身体。",
    application: "每个阶段都要兼顾身体和意识。炼形时保持觉知，炼神时保护身体。",
    schoolsView: {
      dao: "性命双修的提出者，「只修性，不修命，此是修行第一病」",
      fo: "偏重性功，但禅定也需要身体健康作为基础",
      ru: "「修身齐家治国平天下」，修身即性命双修",
      yi: "「形神合一」是中医养生的核心",
      wu: "「外练筋骨皮，内练一口气」，内外兼修",
      yujia: "「体式、呼吸、冥想」三者结合，即性命双修",
      kexue: "身心医学证实心理状态影响身体健康，反之亦然",
    },
  },
  {
    id: "yinyang",
    title: "阴阳五行的应用",
    subtitle: "宇宙万物的基本规律",
    icon: "yinyang",
    explanation: "阴阳是宇宙万物的两种基本属性，五行（木火土金水）是阴阳的五种表现形式。在修炼中，阴阳用于指导动静、刚柔、呼吸的配合；五行用于指导脏腑调理、情志调节、功法选择。例如：肝属木，喜条达，故气郁体质需疏肝；肾属水，主藏精，故炼精化气需保肾。",
    plainExplanation: "阴阳就是对立统一的两个方面，如白天黑夜、冷热、动静。五行就是金木水火土，代表五种基本属性。用来指导修炼，比如什么时候该动、什么时候该静。",
    application: "根据体质和季节选择功法。春季养肝（木），夏季养心（火），长夏养脾（土），秋季养肺（金），冬季养肾（水）。",
    schoolsView: {
      dao: "阴阳五行是道家修炼的理论基础，「一阴一阳之谓道」",
      fo: "阴阳对应「生灭」「空有」，但不执着于二元对立",
      ru: "「太极生两仪，两仪生四象」，阴阳是儒家易学的基础",
      yi: "阴阳五行是中医的核心理论，指导诊断和治疗",
      wu: "形意拳五行拳直接对应五行，劈拳属金通肺",
      yujia: "瑜伽三脉七轮与中医经络有相似能量系统",
      kexue: "阴阳对应「正负」「酸碱」等对立统一概念",
    },
  },
  {
    id: "zhoutian",
    title: "小周天/大周天的原理",
    subtitle: "能量循环的路径",
    icon: "cycle",
    explanation: "小周天是气沿任督二脉循环运行的路径：从丹田下会阴，过尾闾，沿督脉上行至百会，再沿任脉下行回丹田。大周天是气在全身十二正经中循环运行。小周天是炼精化气的核心验证标准，大周天是炼精化气高级阶段的标志。周天通畅意味着全身能量循环良好。",
    plainExplanation: "小周天就是气在体内沿着一条特定路线循环，从肚子下面开始，沿着脊柱向上到头顶，再从前额回到肚子。大周天就是气在全身所有经络中循环。",
    application: "通过意守和呼吸引导气沿周天运行。初期用意引导，后期气自运行。",
    schoolsView: {
      dao: "小周天/大周天是内丹修炼的核心，「河车运转」",
      fo: "密宗的「脉轮」与道家的「周天」有相似能量系统",
      ru: "「气贯长虹」与周天运行有相似体验",
      yi: "任督二脉是中医经络系统的核心，小周天与经络完全对应",
      wu: "内家拳的「整劲」与周天运行有关，气遍全身则劲整",
      yujia: "昆达里尼的上升与道家小周天运行有相似体验",
      kexue: "生物电磁场研究证实人体有能量循环路径",
    },
  },
  {
    id: "shishen",
    title: "识神与元神的辨析",
    subtitle: "后天意识与先天意识",
    icon: "mind",
    explanation: "识神是后天形成的意识，主管思维、判断、分别，特点是活跃、散乱、分别心强。元神是先天本有的意识，主管觉知、智慧、直觉，特点是宁静、清明、无分别。炼气化神的目标是通过修炼，使识神安静下来，让元神显现。识神如同波浪，元神如同海水；波浪平息，海水自现。",
    plainExplanation: "识神就是我们平时的思维、想法、判断，很活跃、很散乱。元神就是我们内在的觉知、智慧，很宁静、很清明。修炼就是让思维安静下来，让内在智慧显现。",
    application: "修炼时不抗拒念头（识神），只是看着它。识神自然安静后，元神显现。",
    schoolsView: {
      dao: "识神对应「欲神」，元神对应「元神」，《太乙金华宗旨》详述",
      fo: "识神对应「妄想」，元神对应「佛性」",
      ru: "识神对应「人心」，元神对应「道心」",
      yi: "识神对应「情志」，元神对应「神明」",
      wu: "识神对应「拙力」，元神对应「神力」",
      yujia: "识神对应「末那识」，元神对应「阿赖耶识」",
      kexue: "识神对应「显性意识」，元神对应「潜意识/超个人意识」",
    },
  },
  {
    id: "qichong",
    title: "气冲病灶的机理",
    subtitle: "修炼中的排病反应",
    icon: "heal",
    explanation: "气冲病灶是修炼过程中，气行至旧病或淤堵处时出现的疼痛、酸胀等反应。机理是：修炼使气血活跃，气行至病灶处时，冲击淤堵，产生不适。这是气在疏通经络、修复病灶的正常现象。坚持修炼，气足自通，病灶会逐渐痊愈。但需与真正的疾病加重区分。",
    plainExplanation: "练功时，气会跑到身体有问题的地方去修复，这时候可能会疼、会酸。这是好事，说明气在修复身体。但如果太严重，就要停下来休息。",
    application: "出现气冲病灶时，坚持练习但减少强度。配合针灸推拿可加速恢复。",
    schoolsView: {
      dao: "「气冲病灶」是内丹修炼的正常反应，「通则不痛，痛则不通」",
      fo: "「消业」与气冲病灶有相似体验，都是消除旧有障碍",
      ru: "「动心忍性」与气冲病灶相通，都是磨练身心",
      yi: "气冲病灶与中医「瞑眩反应」相同，是药效发挥的表现",
      wu: "「换劲」时的身体不适与气冲病灶相似",
      yujia: "瑜伽「排毒反应」与气冲病灶相似",
      kexue: "好转反应（Herxheimer reaction）与气冲病灶有相似机制",
    },
  },
  {
    id: "tihuxi",
    title: "体呼吸的科学解释",
    subtitle: "全身毛孔参与的呼吸",
    icon: "breathe",
    explanation: "体呼吸是在腹式呼吸基础上，进一步扩展呼吸感知的高级呼吸法。想象全身毛孔都在呼吸，吸气时天地清气从毛孔进入体内，呼气时体内浊气从毛孔排出。科学解释：皮肤确实有呼吸功能，可吸收氧气、排出二氧化碳。体呼吸通过意念引导，增强皮肤的呼吸感知，促进全身气体交换。",
    plainExplanation: "体呼吸就是想象全身皮肤都在呼吸，不只是鼻子。皮肤确实能呼吸，只是平时感觉不到。通过练习，可以增强这种感觉。",
    application: "在腹式呼吸基础上，将感知扩展到全身。呼吸越来越微细，如婴儿在母腹中的呼吸。",
    schoolsView: {
      dao: "体呼吸对应「胎息」，是内丹高级呼吸法",
      fo: "「息停」与体呼吸相通，都是呼吸极度微细",
      ru: "「养吾浩然之气」与体呼吸有相似体验",
      yi: "「肺主皮毛」，皮肤与肺相通，体呼吸符合中医理论",
      wu: "「内呼吸」与体呼吸相似，都是高级呼吸法",
      yujia: "「完全瑜伽呼吸」包含体表呼吸的感知",
      kexue: "皮肤呼吸占人体气体交换的1-2%，体呼吸可增强此功能",
    },
  },
  {
    id: "tianren",
    title: "天人合一的境界",
    subtitle: "个体与宇宙的合一",
    icon: "universe",
    explanation: "天人合一是修炼的最高境界，个体意识与宇宙意识融为一体，体验到万物同体的大悲。不是个体消失，而是个体与整体的界限消融。在天人合一中，个体成为宇宙的一部分，宇宙成为个体的延伸。这种体验超越语言，只能亲证。",
    plainExplanation: "天人合一就是感觉自己和整个宇宙融为一体，没有「我」和「外界」的分别。就像一滴水融入大海，成为大海的一部分。",
    application: "通过深度静定，逐步放下自我界限。不追求、不执着，体验会自然出现。",
    schoolsView: {
      dao: "「与道合真」即天人合一，「人法地，地法天，天法道，道法自然」",
      fo: "「法界一体」与天人合一相通，「一即一切，一切即一」",
      ru: "「天人合一」是儒家最高境界，「与天地合其德」",
      yi: "「天人相应」是中医理论，人体与自然界相互对应",
      wu: "「以武入道」最终达到天人合一",
      yujia: "「梵我合一」与天人合一完全相同",
      kexue: "超个人心理学的「宇宙意识」与天人合一有相似体验",
    },
  },
];

// ==================== 各体系对应表 ====================

export const schoolMappings: SchoolMapping[] = [
  {
    stage: "lianxing",
    stageName: "炼形化精",
    mappings: {
      dao: { coreMethod: "无极桩、混元桩", detail: "通过静立培养内气，疏通经络", classic: "《道德经》《太乙金华宗旨》" },
      fo: { coreMethod: "安那般那念、行禅", detail: "通过呼吸和行走觉知身体", classic: "《大安般守意经》《四念处经》" },
      ru: { coreMethod: "正襟危坐、礼的威仪", detail: "通过端正姿态培养正气", classic: "《礼记》《论语》" },
      yi: { coreMethod: "八段锦、五禽戏", detail: "通过导引术疏通经络", classic: "《黄帝内经》《易筋经》" },
      wu: { coreMethod: "形意拳三体式、基本功", detail: "通过桩功和基本功强健体魄", classic: "《形意拳谱》《太极拳论》" },
      yujia: { coreMethod: "山式、猫牛式", detail: "通过体式建立身体正位", classic: "《瑜伽经》《哈他瑜伽之光》" },
      kexue: { coreMethod: "核心训练、本体感觉训练", detail: "通过科学训练改善身体功能", classic: "运动生理学、康复医学" },
    },
  },
  {
    stage: "lianjing",
    stageName: "炼精化气",
    mappings: {
      dao: { coreMethod: "意守丹田、小周天", detail: "通过意守和呼吸培养气感", classic: "《周易参同契》《悟真篇》" },
      fo: { coreMethod: "数息观、随息观", detail: "通过呼吸修炼培养定力", classic: "《清净道论》《六妙法门》" },
      ru: { coreMethod: "静坐调息、夜气存养", detail: "通过静坐培养浩然之气", classic: "《定性书》《近思录》" },
      yi: { coreMethod: "任督艾灸、子午流注", detail: "通过针灸和时辰养生疏通经络", classic: "《针灸甲乙经》《子午流注针经》" },
      wu: { coreMethod: "形意拳五行拳、缠丝劲", detail: "通过拳法训练内劲", classic: "《形意拳谱》《陈式太极拳图说》" },
      yujia: { coreMethod: "根锁、腹锁、圣光调息", detail: "通过锁印和呼吸法激活能量", classic: "《瑜伽经》《格雷达本集》" },
      kexue: { coreMethod: "HRV训练、生物反馈", detail: "通过科技手段训练自主神经", classic: "心率变异性研究、生物反馈医学" },
    },
  },
  {
    stage: "lianqi",
    stageName: "炼气化神",
    mappings: {
      dao: { coreMethod: "回光返照、性功修炼", detail: "通过内观修炼意识", classic: "《太乙金华宗旨》《性命圭旨》" },
      fo: { coreMethod: "止观、话头禅", detail: "通过禅定训练觉知", classic: "《摩诃止观》《坛经》" },
      ru: { coreMethod: "定性、尽心", detail: "通过心性修养提升意识", classic: "《定性书》《传习录》" },
      yi: { coreMethod: "五神藏调理、情志养生", detail: "通过调理脏腑影响精神", classic: "《黄帝内经》《景岳全书》" },
      wu: { coreMethod: "太极拳用意不用力、推手", detail: "通过神意训练提升觉知", classic: "《太极拳论》《十三势行功心解》" },
      yujia: { coreMethod: "观呼吸进阶、内观", detail: "通过冥想训练意识", classic: "《瑜伽经》《清净道论》" },
      kexue: { coreMethod: "正念冥想、神经反馈", detail: "通过科学方法训练大脑", classic: "正念减压疗法（MBSR）、神经反馈医学" },
    },
  },
  {
    stage: "lianshen",
    stageName: "炼神返虚",
    mappings: {
      dao: { coreMethod: "炼神还虚、与道合真", detail: "通过无为法回归道的本体", classic: "《道德经》《庄子》" },
      fo: { coreMethod: "涅槃、大圆满", detail: "通过无修之修达到究竟", classic: "《涅槃经》《大圆满心髓》" },
      ru: { coreMethod: "天人合一、与天地参", detail: "通过修养达到圣贤境界", classic: "《中庸》《孟子》" },
      yi: { coreMethod: "天人相应、不治而治", detail: "通过顺应自然达到养生", classic: "《黄帝内经》《神农本草经》" },
      wu: { coreMethod: "武道合一、无形无意", detail: "通过武学达到道的境界", classic: "《拳意述真》《武当拳法》" },
      yujia: { coreMethod: "梵我合一、三摩地", detail: "通过瑜伽达到合一", classic: "《瑜伽经》《吠檀多哲学》" },
      kexue: { coreMethod: "超个人心理学、整合性训练", detail: "通过科学研究高级意识", classic: "超个人心理学、意识研究前沿" },
    },
  },
];

// ==================== 最佳组合推荐 ====================

export const bestCombinations: BestCombination[] = [
  {
    stage: "lianxing",
    stageName: "炼形化精",
    combinations: [
      {
        name: "初学筑基组合",
        items: [
          { name: "无极桩", duration: "20分钟", note: "晨起空腹，面向东方" },
          { name: "八段锦", duration: "15分钟", note: "上午或下午" },
          { name: "经络拍打", duration: "10分钟", note: "睡前" },
        ],
        principle: "桩功静养培元，八段锦疏通经络，拍打激活气血。动静结合，适合初学者。",
        suitable: ["零基础学员", "亚健康人群", "中老年初学者"],
        effect: "3个月改善睡眠，6个月精力充沛",
      },
      {
        name: "进阶通经组合",
        items: [
          { name: "混元桩", duration: "30分钟", note: "晨起" },
          { name: "易筋经", duration: "25分钟", note: "上午" },
          { name: "十二经络导引", duration: "15分钟", note: "下午" },
        ],
        principle: "混元桩培补元气，易筋经拉伸经筋，经络导引疏通气血。形气并练，适合有基础者。",
        suitable: ["有3个月以上基础", "身体较僵硬者", "想快速提升者"],
        effect: "6个月经筋柔软，9个月气感出现",
      },
      {
        name: "圆满筑基组合",
        items: [
          { name: "三才桩", duration: "60分钟", note: "晨起" },
          { name: "太极拳全套", duration: "30分钟", note: "上午" },
          { name: "小周天导引", duration: "20分钟", note: "睡前" },
        ],
        principle: "三才桩培养深厚内气，太极拳运化气血，小周天导引打通任督。形气神三者开始合一。",
        suitable: ["有1年以上基础", "准备进入炼精化气", "追求圆满者"],
        effect: "12个月筑基圆满，可进入下一阶段",
      },
    ],
  },
  {
    stage: "lianjing",
    stageName: "炼精化气",
    combinations: [
      {
        name: "采药归炉组合",
        items: [
          { name: "意守丹田静坐", duration: "40分钟", note: "子时或午时" },
          { name: "采药归炉", duration: "20分钟", note: "静坐后" },
          { name: "太极拳缠丝劲", duration: "30分钟", note: "下午" },
        ],
        principle: "静坐培养内气，采药归炉汇聚真气，缠丝劲运化气血。三者配合，精气渐化为气。",
        suitable: ["刚进入炼精化气", "丹田有气感者", "想培养气感者"],
        effect: "3个月气感明显，6个月任督初通",
      },
      {
        name: "周天运转组合",
        items: [
          { name: "小周天运行静坐", duration: "60分钟", note: "子时" },
          { name: "卯酉周天", duration: "20分钟", note: "卯时或酉时" },
          { name: "太极拳发劲", duration: "30分钟", note: "上午" },
        ],
        principle: "小周天运行使气机循环，卯酉周天调和阴阳，发劲将内气化为劲力。性命开始双修。",
        suitable: ["小周天初通者", "想稳定周天者", "追求内力者"],
        effect: "6个月周天稳定，12个月大周天初通",
      },
      {
        name: "大周天通运组合",
        items: [
          { name: "大周天运行静坐", duration: "90分钟", note: "子时" },
          { name: "胎息法", duration: "30分钟", note: "静坐中" },
          { name: "太极拳化劲", duration: "40分钟", note: "上午" },
        ],
        principle: "大周天使气遍全身，胎息使呼吸微细，化劲使气化为无形之力。形气神三者深度融合。",
        suitable: ["小周天通畅者", "准备进入炼气化神", "追求圆满者"],
        effect: "18个月大周天通畅，可进入下一阶段",
      },
    ],
  },
  {
    stage: "lianqi",
    stageName: "炼气化神",
    combinations: [
      {
        name: "凝神入炁组合",
        items: [
          { name: "回光返照静坐", duration: "60分钟", note: "子时" },
          { name: "止观双运", duration: "30分钟", note: "静坐中" },
          { name: "太极拳用意不用力", duration: "40分钟", note: "上午" },
        ],
        principle: "回光返照使识神内敛，止观双运定慧等持，用意不用力训练神意。此时开始性命双修。",
        suitable: ["刚进入炼气化神", "想培养觉知者", "追求入定者"],
        effect: "6个月识神安静，12个月元神初显",
      },
      {
        name: "元神稳定组合",
        items: [
          { name: "元神内观静坐", duration: "90分钟", note: "子时" },
          { name: "四禅训练", duration: "30分钟", note: "静坐中" },
          { name: "太极拳神意", duration: "40分钟", note: "上午" },
        ],
        principle: "元神内观使元神稳定，四禅深化定力，神意训练将元神融入动作。此时元神开始主导。",
        suitable: ["元神初显者", "想稳定元神者", "追求深度入定者"],
        effect: "12个月元神稳定，24个月弥漫觉知",
      },
      {
        name: "还虚合道组合",
        items: [
          { name: "炼神还虚静坐", duration: "120分钟", note: "子时" },
          { name: "大圆满心法", duration: "30分钟", note: "静坐中" },
          { name: "日常无事禅", duration: "全天候", note: "日常" },
        ],
        principle: "炼神还虚使神归于虚，大圆满心法直指本心，无事禅将修行融入日常。此时天人合一初现。",
        suitable: ["元神稳定者", "准备进入炼神返虚", "追求圆满者"],
        effect: "36个月天人合一初现，可进入下一阶段",
      },
    ],
  },
  {
    stage: "lianshen",
    stageName: "炼神返虚",
    combinations: [
      {
        name: "无为合道组合",
        items: [
          { name: "无为静坐", duration: "无定式", note: "自然而行" },
          { name: "日常无事禅", duration: "全天候", note: "日常" },
          { name: "慈悲行持", duration: "随缘", note: "日常" },
        ],
        principle: "无为静坐不执着于任何方法，无事禅将修行融入日常，慈悲行持利益众生。此时无修而修。",
        suitable: ["刚进入炼神返虚", "想放下执着者", "追求无为者"],
        effect: "1-3年放下自我，天人合一初现",
      },
      {
        name: "道法自然组合",
        items: [
          { name: "自然静坐", duration: "无定式", note: "自然" },
          { name: "日常慈悲行", duration: "全天候", note: "日常" },
          { name: "随缘度众", duration: "随缘", note: "日常" },
        ],
        principle: "自然静坐不执着于形式，日常慈悲行利益众生，随缘度众不刻意。此时与道合真。",
        suitable: ["天人合一初现者", "想稳定境界者", "追求自然者"],
        effect: "3-10年天人合一常态，慈悲自然",
      },
      {
        name: "究竟圆满组合",
        items: [
          { name: "无修之修", duration: "无时不在", note: "自然" },
          { name: "无缘大慈同体大悲", duration: "无时不在", note: "自然" },
          { name: "随缘度众", duration: "无时不在", note: "自然" },
        ],
        principle: "无修之修是究竟的修行，无缘大慈同体大悲是究竟的慈悲，随缘度众是究竟的行持。",
        suitable: ["天人合一常态者", "追求圆满者", "准备传承者"],
        effect: "10年以上究竟圆满，与道合真",
      },
    ],
  },
];

// ==================== 体质差异化指南 ====================

export const constitutionGuides: ConstitutionGuide[] = [
  {
    type: "yangxu",
    name: "阳虚体质",
    description: "阳气不足，畏寒怕冷，手足不温，喜热饮食",
    characteristics: ["畏寒怕冷", "手足不温", "喜热饮食", "精神不振", "睡眠偏多", "舌淡胖嫩"],
    stageAdvice: {
      lianxing: {
        focus: "培补阳气，温养身体",
        recommended: ["无极桩、混元桩（意守关元）", "五禽戏虎戏", "八段锦「双手托天理三焦」", "艾灸关元、气海、命门"],
        avoid: ["冷水浴", "寒凉食物", "过度出汗", "清晨露水中练功"],
        diet: ["羊肉、牛肉", "生姜、大葱", "肉桂、桂圆", "韭菜、核桃"],
        lifestyle: ["早睡早起", "多晒太阳", "避免熬夜", "冬季加强练功"],
      },
      lianjing: {
        focus: "温阳化气，通督壮阳",
        recommended: ["意守命门", "小周天时重点督脉", "武火呼吸", "配合附子理中丸"],
        avoid: ["意守涌泉（引火下行）", "过度文火", "寒凉食物", "冷水浴"],
        diet: ["鹿茸、肉苁蓉", "杜仲、巴戟天", "附子、干姜", "羊肉汤"],
        lifestyle: ["多晒太阳", "避免久坐湿地", "冬季多练", "保持温暖"],
      },
      lianqi: {
        focus: "温阳养神，避免寒凉",
        recommended: ["回光返照意守祖窍", "日光观想", "配合人参养荣汤"],
        avoid: ["月光观想", "过度清凉观想", "熬夜伤阳", "寒凉环境"],
        diet: ["人参、黄芪", "肉桂、附子", "干姜、大枣", "羊肉、鸡肉"],
        lifestyle: ["多晒太阳", "避免熬夜", "保持温暖", "冬季加强"],
      },
      lianshen: {
        focus: "自然养阳，顺应四时",
        recommended: ["无为时自然养阳", "日光浴", "配合温补食疗"],
        avoid: ["过度清凉", "寒凉环境", "熬夜", "过度消耗"],
        diet: ["温补食材", "羊肉、牛肉", "生姜、肉桂", "核桃、桂圆"],
        lifestyle: ["顺应四时", "多晒太阳", "保持温暖", "自然而行"],
      },
    },
  },
  {
    type: "yinxu",
    name: "阴虚体质",
    description: "阴液亏少，口燥咽干，手足心热，喜冷饮",
    characteristics: ["手足心热", "口燥咽干", "喜冷饮", "失眠多梦", "大便干燥", "舌红少津"],
    stageAdvice: {
      lianxing: {
        focus: "滋阴润燥，柔缓练功",
        recommended: ["坐桩为主，减少站桩", "瑜伽猫牛式", "八段锦柔缓练习", "配合六味地黄丸"],
        avoid: ["长时间站桩", "过度出汗", "烈日下练功", "辛辣刺激"],
        diet: ["银耳、百合", "麦冬、玉竹", "枸杞子、桑葚", "梨、西瓜"],
        lifestyle: ["避免熬夜", "午间休息", "避免暴晒", "保持清凉"],
      },
      lianjing: {
        focus: "滋阴降火，引火归元",
        recommended: ["意守涌泉", "卯酉周天为主", "文火呼吸", "配合知柏地黄丸"],
        avoid: ["意守关元（助火）", "武火呼吸", "辛辣刺激", "熬夜"],
        diet: ["熟地黄、山茱萸", "知母、黄柏", "麦冬、天冬", "甲鱼、海参"],
        lifestyle: ["避免熬夜", "午间休息", "避免暴晒", "保持清凉"],
      },
      lianqi: {
        focus: "滋阴养神，清凉观想",
        recommended: ["回光返照意守泥丸", "月光观想", "配合酸枣仁汤"],
        avoid: ["日光观想", "过度温热观想", "熬夜伤阴", "辛辣刺激"],
        diet: ["酸枣仁、柏子仁", "百合、莲子", "麦冬、五味子", "银耳、燕窝"],
        lifestyle: ["避免熬夜", "午间休息", "保持清凉", "避免暴晒"],
      },
      lianshen: {
        focus: "自然养阴，保护阴精",
        recommended: ["无为时自然养阴", "月光观想", "配合滋阴食疗"],
        avoid: ["过度温热", "暴晒", "熬夜", "过度消耗"],
        diet: ["滋阴食材", "银耳、百合", "麦冬、玉竹", "枸杞子、桑葚"],
        lifestyle: ["顺应四时", "避免熬夜", "保持清凉", "自然而行"],
      },
    },
  },
  {
    type: "tanshi",
    name: "痰湿体质",
    description: "痰湿凝聚，形体肥胖，腹部肥满，口黏苔腻",
    characteristics: ["形体肥胖", "腹部肥满", "口黏苔腻", "容易困倦", "面部油脂多", "舌体胖大"],
    stageAdvice: {
      lianxing: {
        focus: "健脾化湿，疏通经络",
        recommended: ["增加经络拍打（重点脾经、胃经）", "八段锦「调理脾胃须单举」", "八卦掌走圈", "配合陈皮、茯苓"],
        avoid: ["甜腻食物", "久坐不动", "过度静功", "潮湿环境"],
        diet: ["薏苡仁、赤小豆", "陈皮、茯苓", "山楂、荷叶", "冬瓜、丝瓜"],
        lifestyle: ["饭后百步走", "避免久坐", "保持干燥", "适度运动"],
      },
      lianjing: {
        focus: "化湿行气，健脾通督",
        recommended: ["意守中脘", "小周天配合脾胃运化", "增加太极拳云手", "配合参苓白术散"],
        avoid: ["甜腻食物", "饭后立即练功", "过度静功", "潮湿环境"],
        diet: ["白术、茯苓", "陈皮、半夏", "薏苡仁、山药", "冬瓜、荷叶"],
        lifestyle: ["饭后百步走", "避免久坐", "保持干燥", "适度运动"],
      },
      lianqi: {
        focus: "化湿养神，避免思虑",
        recommended: ["回光返照配合脾胃", "增加身体扫描", "配合温胆汤"],
        avoid: ["过度思虑", "甜腻食物", "久坐不动", "潮湿环境"],
        diet: ["茯苓、陈皮", "半夏、竹茹", "枳实、甘草", "薏苡仁、赤小豆"],
        lifestyle: ["避免思虑过度", "保持干燥", "适度运动", "饭后散步"],
      },
      lianshen: {
        focus: "自然调理，健脾化湿",
        recommended: ["无为时脾胃自调", "自然运动", "配合健脾食疗"],
        avoid: ["甜腻食物", "久坐", "思虑过度", "潮湿环境"],
        diet: ["健脾食材", "山药、茯苓", "陈皮、薏苡仁", "冬瓜、荷叶"],
        lifestyle: ["自然运动", "避免久坐", "保持干燥", "自然而行"],
      },
    },
  },
  {
    type: "qiyu",
    name: "气郁体质",
    description: "气机郁滞，神情抑郁，忧虑脆弱，闷闷不乐",
    characteristics: ["神情抑郁", "忧虑脆弱", "闷闷不乐", "胸胁胀痛", "善太息", "舌淡红苔薄白"],
    stageAdvice: {
      lianxing: {
        focus: "疏肝理气，舒畅情志",
        recommended: ["增加行禅", "配合嘘字诀", "太极拳为主", "玫瑰花、佛手代茶饮"],
        avoid: ["过度静功", "独处过久", "压抑情绪", "辛辣刺激"],
        diet: ["玫瑰花、佛手", "茉莉花、合欢花", "柴胡、香附", "柑橘、柚子"],
        lifestyle: ["多参加集体活动", "保持心情舒畅", "避免独处过久", "多与人交流"],
      },
      lianjing: {
        focus: "疏肝行气，理气通督",
        recommended: ["小周天时配合嘘字诀", "增加八卦掌变劲", "配合柴胡疏肝散"],
        avoid: ["压抑情绪", "过度静功", "独处过久", "辛辣刺激"],
        diet: ["柴胡、香附", "郁金、川芎", "枳壳、陈皮", "玫瑰花、茉莉花"],
        lifestyle: ["多与人交流", "保持心情舒畅", "避免独处过久", "适度运动"],
      },
      lianqi: {
        focus: "疏肝养神，保持开朗",
        recommended: ["回光返照配合疏肝", "增加话头禅", "配合甘麦大枣汤"],
        avoid: ["压抑情绪", "过度思虑", "独处过久", "辛辣刺激"],
        diet: ["甘草、小麦", "大枣、酸枣仁", "柴胡、香附", "玫瑰花、合欢花"],
        lifestyle: ["保持心情舒畅", "多与人交流", "避免独处过久", "适度运动"],
      },
      lianshen: {
        focus: "自然舒畅，疏肝解郁",
        recommended: ["无为时肝气自舒", "自然交流", "配合疏肝食疗"],
        avoid: ["压抑情绪", "独处过久", "思虑过度", "辛辣刺激"],
        diet: ["疏肝食材", "玫瑰花、佛手", "茉莉花、合欢花", "柑橘、柚子"],
        lifestyle: ["自然交流", "保持开朗", "避免独处", "自然而行"],
      },
    },
  },
  {
    type: "pinghe",
    name: "平和体质",
    description: "阴阳气血调和，体态适中，面色红润，精力充沛",
    characteristics: ["体态适中", "面色红润", "精力充沛", "睡眠良好", "二便正常", "舌淡红苔薄白"],
    stageAdvice: {
      lianxing: {
        focus: "全面练习，保持平衡",
        recommended: ["按标准方案练习", "可适当增加难度", "尝试多种功法", "保持规律"],
        avoid: ["过度练习", "偏废某一功法", "不规律", "过度劳累"],
        diet: ["均衡饮食", "五谷杂粮", "蔬菜水果", "适量蛋白质"],
        lifestyle: ["规律作息", "适度运动", "保持平衡", "心情愉悦"],
      },
      lianjing: {
        focus: "全面深入，探索火候",
        recommended: ["全面练习", "探索火候精微", "尝试教学", "准备进入下一阶段"],
        avoid: ["急于求成", "偏废某一功法", "过度劳累", "不规律"],
        diet: ["均衡饮食", "营养丰富", "适量补益", "保持规律"],
        lifestyle: ["规律作息", "适度运动", "保持平衡", "心情愉悦"],
      },
      lianqi: {
        focus: "全面深入，准备还虚",
        recommended: ["按标准方案", "探索性功", "准备深入", "保持规律"],
        avoid: ["急于求成", "偏废某一功法", "过度劳累", "不规律"],
        diet: ["均衡饮食", "清淡为主", "适量安神", "保持规律"],
        lifestyle: ["规律作息", "适度运动", "保持平衡", "心情愉悦"],
      },
      lianshen: {
        focus: "自然而行，无为而无不为",
        recommended: ["自然而行", "无为而无不为", "利益众生", "与道合真"],
        avoid: ["执着于境界", "脱离社会", "过度劳累", "不规律"],
        diet: ["自然饮食", "素食更佳", "少食多餐", "顺其自然"],
        lifestyle: ["自然而行", "无为而无不为", "利益众生", "与道合真"],
      },
    },
  },
];

// ==================== 难点与突破 ====================

export const difficultyBreakthroughs: DifficultyBreakthrough[] = [
  {
    stage: "lianxing",
    stageName: "炼形化精",
    difficulties: [
      {
        title: "站桩时身体颤抖",
        description: "初学者站桩时，身体经常出现不自主的颤抖，尤其是腿部和手臂",
        cause: "肌肉力量不足，身体在重新建立平衡和协调",
        solutions: [
          { source: "道家", method: "降低桩架高度，缩短时间，循序渐进。" },
          { source: "中医", method: "配合艾灸足三里、三阴交，增强肌肉力量。" },
          { source: "武学", method: "先练基本功（压腿、踢腿），再站桩。" },
          { source: "瑜伽", method: "先练山式站立，建立根基，再站桩。" },
        ],
        fanzhenTip: "颤抖是正常现象，说明身体在调整。不要抗拒，也不要追求。降低难度，循序渐进，三个月后自然消失。",
      },
      {
        title: "呼吸不自然",
        description: "练习腹式呼吸时，感觉刻意、不自然，甚至胸闷",
        cause: "长期胸式呼吸习惯，膈肌活动受限，身体紧张",
        solutions: [
          { source: "道家", method: "先自然呼吸，不刻意追求腹式，待身体放松后自然过渡。" },
          { source: "佛家", method: "观呼吸，只是觉知呼吸，不调整呼吸。" },
          { source: "瑜伽", method: "先练完全瑜伽呼吸，逐步过渡到腹式。" },
          { source: "科学", method: "渐进式肌肉放松（PMR）后，呼吸自然深化。" },
        ],
        fanzhenTip: "呼吸是身体的自然功能，不要刻意控制。先放松身体，呼吸自然深化。急于求成反而适得其反。",
      },
      {
        title: "练功后身体更累",
        description: "练功后感觉身体更累，甚至第二天精力下降",
        cause: "练功过度，身体尚未适应；或意念过重，消耗精神",
        solutions: [
          { source: "道家", method: "减少练功时间，放松意念，「松静自然」。" },
          { source: "中医", method: "配合食疗，补充气血。避免空腹练功。" },
          { source: "武学", method: "「练养结合」，练后充分休息。" },
          { source: "科学", method: "监测心率，避免过度训练。逐步增加强度。" },
        ],
        fanzhenTip: "练功是为了养生，不是为了消耗。如果练后更累，说明过度了。减少时间，放松意念，循序渐进。",
      },
    ],
  },
  {
    stage: "lianjing",
    stageName: "炼精化气",
    difficulties: [
      {
        title: "气感不明显",
        description: "练习很久，但始终感觉不到气的存在",
        cause: "体质差异，有人气感敏锐，有人迟钝；或意念过重/过轻",
        solutions: [
          { source: "道家", method: "不刻意追求，继续练习。意念要轻，如鸡孵卵。" },
          { source: "中医", method: "配合针灸，刺激穴位，增强气感。" },
          { source: "佛家", method: "观受念处，只是观察身体感受，不追求气感。" },
          { source: "科学", method: "使用生物反馈设备，直观显示身体变化。" },
        ],
        fanzhenTip: "气感因人而异，有人明显，有人微弱。不要刻意追求，继续练习即可。气感只是副产品，不是目的。",
      },
      {
        title: "气冲病灶反应强烈",
        description: "练功时，旧病处出现剧烈疼痛、酸胀",
        cause: "气行至旧病或淤堵处，冲击病灶",
        solutions: [
          { source: "道家", method: "坚持练习，气足自通。反应过于强烈时减少时间。" },
          { source: "中医", method: "配合针灸推拿，辅助疏通经络。" },
          { source: "佛家", method: "观疼痛，不抗拒，只是看着它。" },
          { source: "科学", method: "区分气冲病灶和疾病加重，必要时就医。" },
        ],
        fanzhenTip: "气冲病灶是好事，说明气在修复身体。但过于强烈时要适当减少强度，配合针灸推拿。坚持三个月，病灶会逐渐痊愈。",
      },
      {
        title: "小周天运行不畅",
        description: "气行至三关（尾闾、夹脊、玉枕）时受阻",
        cause: "三关有淤堵，气机不足",
        solutions: [
          { source: "道家", method: "不强行冲关，继续养气，气足自通。" },
          { source: "中医", method: "配合针灸推拿，疏通三关。" },
          { source: "武学", method: "配合太极拳，以动功辅助静功。" },
          { source: "瑜伽", method: "配合脊柱扭转体式，疏通脊柱。" },
        ],
        fanzhenTip: "三关不通是正常现象，不要强行冲关。继续养气，配合针灸推拿，气足自通。强行冲关容易出偏。",
      },
    ],
  },
  {
    stage: "lianqi",
    stageName: "炼气化神",
    difficulties: [
      {
        title: "识神难以安静",
        description: "静坐时杂念纷飞，无法安静",
        cause: "多年思维习惯，识神习惯性活跃",
        solutions: [
          { source: "道家", method: "不抗拒念头，只是看着它。用「止」的方法，轻轻拉回。" },
          { source: "佛家", method: "数息法，从1数到10，分散注意力。" },
          { source: "儒家", method: "「主敬」，保持恭敬心，杂念自然减少。" },
          { source: "科学", method: "正念冥想训练，逐步提升专注力。" },
        ],
        fanzhenTip: "杂念是正常现象，不要抗拒。你越抗拒，念头越多。方法是「来者不拒，去者不留」，把注意力轻轻拉回到呼吸或丹田。坚持三个月，杂念会明显减少。",
      },
      {
        title: "出现各种境界",
        description: "练功时出现光明、声音、形象等",
        cause: "元神显现后，识神的幻化",
        solutions: [
          { source: "道家", method: "「凡所有相，皆是虚妄」。不执着，不恐惧。" },
          { source: "佛家", method: "「凡所有相，皆是虚妄」。只是看着，不随不逐。" },
          { source: "儒家", method: "「子不语怪力乱神」，保持平常心。" },
          { source: "科学", method: "理解这是大脑的正常反应，不执着即可。" },
        ],
        fanzhenTip: "看到光、听到声音、看到形象，都是识神的幻化，不是元神的本体。不要执着，也不要恐惧，只是看着它。执着则会入魔，恐惧则会停滞。",
      },
      {
        title: "状态波动很大",
        description: "有时觉知清晰，有时混沌",
        cause: "元神初显，尚未稳定，受情绪、饮食、外界影响",
        solutions: [
          { source: "道家", method: "保持平常心，不追求、不执着。" },
          { source: "佛家", method: "「不取于相，如如不动」。保持平等心。" },
          { source: "儒家", method: "「不动心」，不为外境所动。" },
          { source: "科学", method: "记录状态变化，找出影响因素，逐步调整。" },
        ],
        fanzhenTip: "状态波动是正常的。不要因为状态好就骄傲，也不要因为状态差就气馁。保持平常心，坚持练习，状态会自然稳定。",
      },
    ],
  },
  {
    stage: "lianshen",
    stageName: "炼神返虚",
    difficulties: [
      {
        title: "难以放下修行身份",
        description: "多年修行，「修行者」身份已成为自我认同的一部分",
        cause: "自我认同固化，将修行与自我绑定",
        solutions: [
          { source: "道家", method: "「吾有大患，为吾有身」。逐步放下身体、身份、修行。" },
          { source: "佛家", method: "「无我」，放下所有身份标签。" },
          { source: "儒家", method: "「圣人无名」，放下「修行者」之名。" },
          { source: "科学", method: "理解身份是社会建构，逐步解构。" },
        ],
        fanzhenTip: "放下修行身份不是不修行，而是不执着于「修行者」这个标签。从减少谈论修行开始，逐步回归平常。",
      },
      {
        title: "无为变成懈怠",
        description: "误解无为，以为无为就是什么都不做",
        cause: "对「无为」的误解，将无为等同于懈怠",
        solutions: [
          { source: "道家", method: "无为是「不刻意」，不是「不做」。日常事务照常，只是心不执着。" },
          { source: "佛家", method: "「无修而修」，修行成为生活方式，不是追求目标。" },
          { source: "儒家", method: "「无为而治」，不治而治，不是不治。" },
          { source: "科学", method: "理解无为是心理状态的放松，不是行为的停止。" },
        ],
        fanzhenTip: "无为不是什么都不做，而是不刻意、不强求。日常事务照常，只是心不执着。该吃饭吃饭，该睡觉睡觉，只是吃饭时吃饭，睡觉时睡觉。",
      },
      {
        title: "慈悲心生但能力有限",
        description: "想帮助众生但能力有限，产生无力感",
        cause: "慈悲心增长，但能力尚未匹配",
        solutions: [
          { source: "道家", method: "「随缘度众，尽力而为」。不执着结果，只问耕耘。" },
          { source: "佛家", method: "「自利利他」，先自度，再度人。" },
          { source: "儒家", method: "「达则兼济天下，穷则独善其身」。量力而行。" },
          { source: "科学", method: "理解帮助他人的边界，避免过度消耗。" },
        ],
        fanzhenTip: "想帮助众生是好事，但不要因此产生压力。「随缘度众，尽力而为」。能帮则帮，帮不了也不执着。先修好自己，自然能影响他人。",
      },
    ],
  },
];

// ==================== 辅助函数 ====================

export function getStageOverview(key: StageKey): StageOverview | undefined {
  return stageOverviews.find((s) => s.key === key);
}

export function getAllStageOverviews(): StageOverview[] {
  return stageOverviews;
}

export function getCoreConcepts(): CoreConcept[] {
  return coreConcepts;
}

export function getCoreConceptById(id: string): CoreConcept | undefined {
  return coreConcepts.find((c) => c.id === id);
}

export function getSchoolMappings(): SchoolMapping[] {
  return schoolMappings;
}

export function getBestCombinations(): BestCombination[] {
  return bestCombinations;
}

export function getConstitutionGuides(): ConstitutionGuide[] {
  return constitutionGuides;
}

export function getDifficultyBreakthroughs(): DifficultyBreakthrough[] {
  return difficultyBreakthroughs;
}

export function getSubLevel(stageKey: StageKey, periodKey: PeriodKey): SubLevel | undefined {
  const stage = stageOverviews.find((s) => s.key === stageKey);
  return stage?.subLevels.find((sl) => sl.key === periodKey);
}

export const SCHOOL_NAMES: Record<SchoolKey, string> = {
  dao: "道家",
  fo: "佛家",
  ru: "儒家",
  yi: "中医",
  wu: "武学",
  yujia: "瑜伽",
  kexue: "科学",
};

export const SCHOOL_COLORS: Record<SchoolKey, string> = {
  dao: "#4a7c59",
  fo: "#8b6fae",
  ru: "#c75b39",
  yi: "#5b8db8",
  wu: "#d4a574",
  yujia: "#e8a87c",
  kexue: "#6b8e9f",
};

export const CONSTITUTION_NAMES: Record<ConstitutionKey, string> = {
  yangxu: "阳虚体质",
  yinxu: "阴虚体质",
  tanshi: "痰湿体质",
  qiyu: "气郁体质",
  pinghe: "平和体质",
};

export const CONSTITUTION_COLORS: Record<ConstitutionKey, string> = {
  yangxu: "#c75b39",
  yinxu: "#5b8db8",
  tanshi: "#8b7d5a",
  qiyu: "#8b6fae",
  pinghe: "#4a7c59",
};
