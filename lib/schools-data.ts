// 各派修炼体系数据
// 儒释道医武艺各家之长的完整资料

export type SchoolId = "dao" | "fo" | "ru" | "yi" | "wu" | "yujia" | "qita";

export interface TimelineEvent {
  period: string;
  title: string;
  description: string;
}

export interface Classic {
  name: string;
  author?: string;
  dynasty?: string;
  description: string;
}

export interface Method {
  name: string;
  category: string;
  description: string;
  keyPoints?: string[];
}

export interface CultivationLevel {
  level: string;
  name: string;
  description: string;
  fanzhenMapping: string;
}

export interface CoreConcept {
  name: string;
  explanation: string;
}

export interface SchoolData {
  id: SchoolId;
  name: string;
  subtitle: string;
  color: string;
  colorLight: string;
  colorDark: string;
  overview: string;
  history: TimelineEvent[];
  classics: Classic[];
  methods: Method[];
  levels: CultivationLevel[];
  concepts: CoreConcept[];
  entryAdvice: string[];
  fanzhenSummary: string;
}

export const SCHOOL_COLORS: Record<SchoolId, { main: string; light: string; dark: string; bg: string }> = {
  dao: {
    main: "#2d8a7a",
    light: "#4db8a6",
    dark: "#1a5c50",
    bg: "#e8f5f2",
  },
  fo: {
    main: "#c9a84c",
    light: "#e0c878",
    dark: "#a0822e",
    bg: "#faf5e6",
  },
  ru: {
    main: "#b8443f",
    light: "#d46860",
    dark: "#8c2e2a",
    bg: "#fceeee",
  },
  yi: {
    main: "#4a9b5e",
    light: "#6bbd7e",
    dark: "#357a47",
    bg: "#e8f5eb",
  },
  wu: {
    main: "#3d7ab8",
    light: "#5a9dd4",
    dark: "#2a5c8c",
    bg: "#e8f0f8",
  },
  yujia: {
    main: "#8b5a9f",
    light: "#a87ab8",
    dark: "#6b3f7d",
    bg: "#f0e8f5",
  },
  qita: {
    main: "#7a7a7a",
    light: "#999999",
    dark: "#5a5a5a",
    bg: "#f0f0f0",
  },
};

export const schoolsData: Record<SchoolId, SchoolData> = {
  dao: {
    id: "dao",
    name: "道家",
    subtitle: "长生不死、羽化登仙，性命双修",
    color: SCHOOL_COLORS.dao.main,
    colorLight: SCHOOL_COLORS.dao.light,
    colorDark: SCHOOL_COLORS.dao.dark,
    overview:
      "道家修炼以「道」为核心，追求长生久视、与道合真。强调「性命双修」——「性」指心性、精神层面，「命」指身体、生命层面。道家认为人体是一个小宇宙，通过修炼可以返本归元，达到天人合一的境界。修炼方法以内丹学最为系统，从筑基开始，历经炼精化气、炼气化神、炼神还虚，最终炼虚合道。",
    history: [
      {
        period: "先秦时期",
        title: "早期道教",
        description:
          "老子著《道德经》，庄子著《南华经》，奠定道家哲学基础。主张「道法自然」「无为而治」，追求精神自由。",
      },
      {
        period: "汉魏时期",
        title: "神仙道教",
        description:
          "葛洪著《抱朴子》，系统总结神仙方术。外丹术兴盛，以金石药物求长生。同时内养术也开始发展。",
      },
      {
        period: "唐宋时期",
        title: "内丹道崛起",
        description:
          "钟离权、吕洞宾开创内丹派，张伯端著《悟真篇》，内丹学取代外丹成为主流。强调「炼精化气，炼气化神」。",
      },
      {
        period: "明清时期",
        title: "内丹道成熟",
        description:
          "《伍柳仙宗》《性命圭旨》等著作问世，内丹学体系完全成熟。形成完整的筑基→炼精化气→炼气化神→炼神还虚→炼虚合道五层修炼体系。",
      },
    ],
    classics: [
      {
        name: "《道德经》",
        author: "老子",
        dynasty: "春秋",
        description: "道家根本经典，阐述「道」的本质和无为而治的思想，是修炼的哲学基础。",
      },
      {
        name: "《南华经》",
        author: "庄子",
        dynasty: "战国",
        description: "即《庄子》，阐述逍遥游、齐物论等思想，是道家精神修炼的重要参考。",
      },
      {
        name: "《抱朴子》",
        author: "葛洪",
        dynasty: "东晋",
        description: "系统总结神仙方术，分为内篇（神仙方药）和外篇（人间世事）。",
      },
      {
        name: "《悟真篇》",
        author: "张伯端",
        dynasty: "北宋",
        description: "内丹学核心经典，与《周易参同契》并称「丹经之王」，阐述内丹修炼原理。",
      },
      {
        name: "《伍柳仙宗》",
        author: "伍冲虚、柳华阳",
        dynasty: "明清",
        description: "内丹学集大成之作，详细论述小周天、大周天运行方法。",
      },
      {
        name: "《性命圭旨》",
        author: "尹真人",
        dynasty: "明",
        description: "图文并茂地阐述性命双修理论，是内丹修炼的实用指南。",
      },
    ],
    methods: [
      {
        name: "导引术",
        category: "动功",
        description: "通过特定动作引导气血运行，包括八段锦、易筋经、五禽戏等。",
        keyPoints: ["动作与呼吸配合", "意念引导气血", "循序渐进，不可强求"],
      },
      {
        name: "吐纳法",
        category: "呼吸",
        description: "通过调节呼吸来培养内气，包括腹式呼吸、胎息法等。",
        keyPoints: ["深、长、细、匀", "吸气时意守丹田", "呼气时放松全身"],
      },
      {
        name: "存思法",
        category: "意念",
        description: "通过意念观想体内景象，如内视五脏六腑、观想丹田等。",
        keyPoints: ["意念要轻，如鸡孵卵", "不可过于执着", "以自然为度"],
      },
      {
        name: "内丹术",
        category: "综合",
        description: "系统化的修炼方法，包括筑基、炼精化气、炼气化神、炼神还虚四个阶段。",
        keyPoints: ["筑基是根基，不可跳过", "火候调控是关键", "需明师指点"],
      },
    ],
    levels: [
      {
        level: "一",
        name: "筑基",
        description: "修复身体，培养元气，使后天之精充盈。站桩、导引、调息是主要方法。",
        fanzhenMapping: "筑基准备阶段",
      },
      {
        level: "二",
        name: "炼精化气",
        description: "将后天之精转化为先天之气，打通小周天。意守丹田，培养气感。",
        fanzhenMapping: "小周天阶段",
      },
      {
        level: "三",
        name: "炼气化神",
        description: "将气转化为神，打通大周天，结丹。识神安静，元神显现。",
        fanzhenMapping: "大周天结丹阶段",
      },
      {
        level: "四",
        name: "炼神还虚",
        description: "元神进一步升华，归于虚无。粉碎虚空，与道合真。",
        fanzhenMapping: "育婴出神阶段",
      },
      {
        level: "五",
        name: "炼虚合道",
        description: "最终境界，与道合一，无为而无不为。长生久视，究竟圆满。",
        fanzhenMapping: "凡真圆满阶段",
      },
    ],
    concepts: [
      {
        name: "道",
        explanation: "宇宙万物的本源和规律，无形无象，却生化一切。",
      },
      {
        name: "德",
        explanation: "道的体现和功用，修道即是积德。",
      },
      {
        name: "精",
        explanation: "生命的物质基础，包括先天之精和后天之精。",
      },
      {
        name: "气",
        explanation: "生命的能量表现，是精的升华。",
      },
      {
        name: "神",
        explanation: "生命的主宰，是气的升华。",
      },
      {
        name: "丹田",
        explanation: "人体能量中心，分为上丹田（泥丸）、中丹田（膻中）、下丹田（关元）。",
      },
      {
        name: "周天",
        explanation: "气在体内循环运行的路径，小周天沿任督二脉，大周天遍十二正经。",
      },
      {
        name: "火候",
        explanation: "修炼中意念和呼吸的调控，分为武火（较强）和文火（较弱）。",
      },
    ],
    entryAdvice: [
      "从站桩开始，每日15-30分钟，培养身体觉知",
      "学习腹式呼吸，使呼吸深、长、细、匀",
      "配合八段锦或易筋经，疏通经络",
      "阅读《道德经》，建立正确的修炼观念",
      "寻找明师指点，避免盲修瞎练",
      "保持规律作息，节制欲望",
    ],
    fanzhenSummary:
      "凡真体系以道家内丹学为根基，炼形化精对应道家筑基，炼精化气对应小周天，炼气化神对应大周天结丹，炼神返虚对应育婴出神。",
  },
  fo: {
    id: "fo",
    name: "佛家",
    subtitle: "戒定慧三学，四圣谛",
    color: SCHOOL_COLORS.fo.main,
    colorLight: SCHOOL_COLORS.fo.light,
    colorDark: SCHOOL_COLORS.fo.dark,
    overview:
      "佛家修炼以「戒定慧」三学为核心，通过持戒净化行为，通过修定净化心意，通过修慧净化知见。最终目标是解脱生死轮回，达到涅槃寂静。佛家强调「诸法无我」「诸行无常」，通过内观觉察身心实相，断除烦恼，证得菩提。",
    history: [
      {
        period: "公元前6世纪",
        title: "佛陀创教",
        description:
          "释迦牟尼在印度菩提树下悟道，创立佛教。提出四圣谛、八正道，开启解脱之道。",
      },
      {
        period: "公元前3世纪",
        title: "部派佛教",
        description:
          "佛教分裂为上座部和大众部，经典开始系统结集。阿毗达摩（论藏）发展，对心法进行精细分析。",
      },
      {
        period: "公元1-10世纪",
        title: "大乘佛教兴起",
        description:
          "般若中观、瑜伽唯识等大乘思想发展。中国形成天台、华严、禅宗、净土等宗派。",
      },
      {
        period: "公元7-12世纪",
        title: "密宗发展",
        description:
          "印度密宗形成并传入西藏，与苯教融合形成藏传佛教。强调即身成佛，以咒印观想为修行方法。",
      },
    ],
    classics: [
      {
        name: "《金刚经》",
        author: "",
        dynasty: "后秦",
        description: "般若部核心经典，阐述「凡所有相，皆是虚妄」，是禅宗的重要依止。",
      },
      {
        name: "《心经》",
        author: "",
        dynasty: "唐",
        description: "般若心经，仅260字，浓缩大乘空性思想，是日常持诵的重要经典。",
      },
      {
        name: "《六祖坛经》",
        author: "惠能",
        dynasty: "唐",
        description: "唯一被尊为「经」的中国著作，阐述顿悟思想，是禅宗根本经典。",
      },
      {
        name: "《大念住经》",
        author: "",
        dynasty: "",
        description: "南传佛教核心经典，系统阐述四念处修行方法，是内观禅的理论基础。",
      },
      {
        name: "《瑜伽师地论》",
        author: "弥勒",
        dynasty: "唐",
        description: "唯识宗根本论典，详细论述修行的各个阶段和境界。",
      },
    ],
    methods: [
      {
        name: "持戒",
        category: "戒学",
        description: "遵守戒律，净化身口意三业。包括五戒、八戒、菩萨戒等。",
        keyPoints: ["不杀生、不偷盗、不邪淫", "不妄语、不饮酒", "持戒是定慧的基础"],
      },
      {
        name: "止禅",
        category: "定学",
        description: "通过专注培养定力，包括安那般那念（观呼吸）、遍处观等。",
        keyPoints: ["选择所缘境", "持续专注", "对治五盖（障碍）"],
      },
      {
        name: "观禅",
        category: "慧学",
        description: "通过观察身心现象培养智慧，包括四念处、缘起观等。",
        keyPoints: ["观察而不执着", "了知无常、苦、无我", "从定发慧"],
      },
      {
        name: "四无量心",
        category: "心量",
        description: "培养慈、悲、喜、舍四种无量心，扩展心量。",
        keyPoints: ["从近及远，逐步扩展", "配合呼吸练习", "日常保持"],
      },
    ],
    levels: [
      {
        level: "一",
        name: "持戒",
        description: "遵守戒律，净化行为。五戒是基本，八戒是进阶，菩萨戒是大乘。",
        fanzhenMapping: "持戒身念处阶段",
      },
      {
        level: "二",
        name: "止禅",
        description: "通过专注培养定力，从近行定到安止定，逐步深入。",
        fanzhenMapping: "初禅至三禅阶段",
      },
      {
        level: "三",
        name: "观禅",
        description: "通过观察身心现象，了知无常、苦、无我，培养智慧。",
        fanzhenMapping: "四禅见道阶段",
      },
      {
        level: "四",
        name: "四禅八定",
        description: "深入禅定，从初禅到四禅，再到无色界四空定，定力深厚。",
        fanzhenMapping: "修道阶段",
      },
      {
        level: "五",
        name: "见道",
        description: "初见真理，断除见惑，证得初果（须陀洹）。",
        fanzhenMapping: "修道阶段",
      },
      {
        level: "六",
        name: "修道",
        description: "继续修行，断除思惑，逐步证得二果、三果、四果。",
        fanzhenMapping: "修道阶段",
      },
      {
        level: "七",
        name: "究竟",
        description: "证得阿罗汉果或佛果，断除一切烦恼，达到涅槃。",
        fanzhenMapping: "修道涅槃阶段",
      },
    ],
    concepts: [
      {
        name: "四圣谛",
        explanation: "苦谛、集谛、灭谛、道谛，是佛教的核心教义。",
      },
      {
        name: "八正道",
        explanation: "正见、正思维、正语、正业、正命、正精进、正念、正定。",
      },
      {
        name: "缘起",
        explanation: "诸法因缘生，诸法因缘灭，是佛教的世界观。",
      },
      {
        name: "无我",
        explanation: "一切法无自性，没有永恒不变的「我」。",
      },
      {
        name: "涅槃",
        explanation: "烦恼熄灭，达到究竟的寂静和解脱。",
      },
      {
        name: "菩提心",
        explanation: "觉悟的心，发愿为利益众生而修行成佛。",
      },
      {
        name: "六度",
        explanation: "布施、持戒、忍辱、精进、禅定、般若，是大乘修行的六种方法。",
      },
      {
        name: "四念处",
        explanation: "身念处、受念处、心念处、法念处，是内观禅的核心方法。",
      },
    ],
    entryAdvice: [
      "从持戒开始，至少持五戒",
      "每日静坐15-30分钟，从观呼吸入手",
      "阅读《金刚经》或《心经》，建立正见",
      "培养慈悲心，从身边的人开始",
      "寻找善知识，加入修行团体",
      "保持正念，在日常生活中修行",
    ],
    fanzhenSummary:
      "凡真体系将佛家戒定慧三学融入各阶段。持戒对应炼形化精的身念处，止禅对应炼精化气的定力培养，观禅对应炼气化神的觉知训练，涅槃对应炼神返虚的究竟境界。",
  },
  ru: {
    id: "ru",
    name: "儒家",
    subtitle: "内圣外王，修身养性",
    color: SCHOOL_COLORS.ru.main,
    colorLight: SCHOOL_COLORS.ru.light,
    colorDark: SCHOOL_COLORS.ru.dark,
    overview:
      "儒家修炼以「修身」为核心，追求「内圣外王」的理想境界。强调通过道德修养、心性陶冶，达到人格完善。儒家修炼不是出世，而是在入世中修行，「修身齐家治国平天下」是其理想路径。通过格物致知、诚意正心、存心养性，最终达到「天人合一」的圣贤境界。",
    history: [
      {
        period: "春秋时期",
        title: "孔子创儒",
        description:
          "孔子创立儒家，提出「仁」的核心思想，强调「克己复礼」。删述六经，奠定儒家经典基础。",
      },
      {
        period: "战国时期",
        title: "孟荀发展",
        description:
          "孟子提出「性善论」，强调「养吾浩然之气」。荀子提出「性恶论」，强调「化性起伪」。",
      },
      {
        period: "宋明时期",
        title: "理学心学",
        description:
          "程朱理学强调「格物致知」「存天理灭人欲」。陆王心学强调「心即理」「致良知」。",
      },
      {
        period: "明清时期",
        title: "实学兴起",
        description:
          "王阳明心学大成，提出「知行合一」。明清之际，实学兴起，强调经世致用。",
      },
    ],
    classics: [
      {
        name: "《大学》",
        author: "曾子",
        dynasty: "先秦",
        description: "阐述「三纲领」（明明德、亲民、止于至善）和「八条目」（格致诚正修齐治平）。",
      },
      {
        name: "《中庸》",
        author: "子思",
        dynasty: "先秦",
        description: "阐述「中庸之道」和「诚」的思想，是儒家心性修炼的重要经典。",
      },
      {
        name: "《论语》",
        author: "孔子弟子",
        dynasty: "先秦",
        description: "记录孔子及其弟子言行，是儒家思想的根本经典。",
      },
      {
        name: "《孟子》",
        author: "孟子",
        dynasty: "战国",
        description: "阐述性善论和仁政思想，提出「养吾浩然之气」的修炼方法。",
      },
      {
        name: "《传习录》",
        author: "王阳明",
        dynasty: "明",
        description: "记录王阳明言行，阐述心学思想，是儒家修炼的实用指南。",
      },
    ],
    methods: [
      {
        name: "格物致知",
        category: "认知",
        description: "通过观察事物原理，获得真知。是儒家修炼的认知基础。",
        keyPoints: ["观察事物", "穷究其理", "推及身心"],
      },
      {
        name: "诚意正心",
        category: "心性",
        description: "使意念真诚，使心地端正。是儒家修炼的心性功夫。",
        keyPoints: ["不自欺", "慎独", "保持中正"],
      },
      {
        name: "静坐存养",
        category: "静功",
        description: "通过静坐涵养心性，培养浩然之气。",
        keyPoints: ["调身、调息、调心", "收摄身心", "涵养德性"],
      },
      {
        name: "主敬",
        category: "日常",
        description: "时刻保持恭敬心，是儒家日常修养的核心方法。",
        keyPoints: ["整齐严肃", "动容貌", "正衣冠"],
      },
    ],
    levels: [
      {
        level: "一",
        name: "格物致知",
        description: "通过学习和观察，获得对事物和自我的正确认识。",
        fanzhenMapping: "格物致知阶段",
      },
      {
        level: "二",
        name: "诚意正心",
        description: "使意念真诚，心地端正，不自欺，不欺人。",
        fanzhenMapping: "诚意正心阶段",
      },
      {
        level: "三",
        name: "静坐存养",
        description: "通过静坐涵养心性，培养浩然之气。",
        fanzhenMapping: "诚意正心阶段",
      },
      {
        level: "四",
        name: "存心养性",
        description: "时刻保持正念，涵养天性，达到「不动心」的境界。",
        fanzhenMapping: "浩然正气阶段",
      },
      {
        level: "五",
        name: "浩然正气",
        description: "培养出至大至刚的浩然之气，充塞天地之间。",
        fanzhenMapping: "浩然正气阶段",
      },
      {
        level: "六",
        name: "止于至善",
        description: "达到最高的善，实现「天人合一」的圣贤境界。",
        fanzhenMapping: "止于至善阶段",
      },
    ],
    concepts: [
      {
        name: "仁",
        explanation: "儒家核心概念，指爱人，是道德的根本。",
      },
      {
        name: "义",
        explanation: "正当的行为，是「仁」的具体表现。",
      },
      {
        name: "礼",
        explanation: "社会规范和仪式，是修身的外在表现。",
      },
      {
        name: "智",
        explanation: "辨别是非的能力，是修身的认知基础。",
      },
      {
        name: "信",
        explanation: "诚实守信，是修身的根本。",
      },
      {
        name: "中庸",
        explanation: "不偏不倚，恰到好处，是最高的道德标准。",
      },
      {
        name: "浩然之气",
        explanation: "至大至刚的气，通过道德修养培养，充塞天地之间。",
      },
      {
        name: "良知",
        explanation: "王阳明提出，指人心中本有的道德判断力。",
      },
    ],
    entryAdvice: [
      "从阅读《论语》开始，了解儒家基本思想",
      "每日静坐15-20分钟，培养心性",
      "在日常生活中践行「仁」的思想",
      "学习礼仪，保持恭敬心",
      "记录每日言行，反省改进",
      "培养浩然之气，从点滴做起",
    ],
    fanzhenSummary:
      "凡真体系将儒家修身养性融入各阶段。格物致知对应炼形化精的认知基础，诚意正心对应炼精化气的心性培养，浩然正气对应炼气化神的能量升华，止于至善对应炼神返虚的圆满境界。",
  },
  yi: {
    id: "yi",
    name: "中医",
    subtitle: "天人合一，阴阳五行，精气神",
    color: SCHOOL_COLORS.yi.main,
    colorLight: SCHOOL_COLORS.yi.light,
    colorDark: SCHOOL_COLORS.yi.dark,
    overview:
      "中医养生以「天人合一」为核心理念，强调人体与自然的和谐统一。以阴阳五行、脏腑经络、精气神为理论基础，通过饮食调理、运动导引、针灸推拿、药物调养等方法，达到「治未病」的目的。中医修炼注重整体观念，认为人体是一个有机整体，身心相互影响。",
    history: [
      {
        period: "上古时期",
        title: "医学起源",
        description:
          "神农尝百草，黄帝问医于岐伯。《黄帝内经》成书，奠定中医理论体系。",
      },
      {
        period: "春秋战国",
        title: "理论形成",
        description:
          "扁鹊创立四诊法（望闻问切）。《黄帝内经》系统阐述阴阳五行、脏腑经络理论。",
      },
      {
        period: "汉代",
        title: "临床发展",
        description:
          "张仲景著《伤寒论》，创立辨证论治体系。华佗创五禽戏，开运动养生先河。",
      },
      {
        period: "唐宋时期",
        title: "方剂成熟",
        description:
          "孙思邈著《千金方》，集唐以前医学大成。宋代设立太医局，医学教育制度化。",
      },
    ],
    classics: [
      {
        name: "《黄帝内经》",
        author: "",
        dynasty: "先秦",
        description: "中医根本经典，分为《素问》和《灵枢》，系统阐述中医理论体系。",
      },
      {
        name: "《伤寒论》",
        author: "张仲景",
        dynasty: "东汉",
        description: "辨证论治的奠基之作，创立六经辨证体系。",
      },
      {
        name: "《神农本草经》",
        author: "",
        dynasty: "汉",
        description: "中国最早的药物学专著，记载365种药物。",
      },
      {
        name: "《针灸甲乙经》",
        author: "皇甫谧",
        dynasty: "晋",
        description: "最早的针灸学专著，系统论述经络穴位。",
      },
    ],
    methods: [
      {
        name: "饮食调理",
        category: "养生",
        description: "根据体质和季节选择食物，达到阴阳平衡。",
        keyPoints: ["因人制宜", "因时制宜", "五味调和"],
      },
      {
        name: "运动导引",
        category: "动功",
        description: "通过特定动作疏通经络，包括八段锦、五禽戏、太极拳等。",
        keyPoints: ["形神兼备", "循序渐进", "持之以恒"],
      },
      {
        name: "针灸推拿",
        category: "治疗",
        description: "通过刺激穴位和经络，调节气血运行。",
        keyPoints: ["辨证取穴", "手法得当", "配合呼吸"],
      },
      {
        name: "药物调养",
        category: "内治",
        description: "通过中药调理脏腑功能，达到养生目的。",
        keyPoints: ["辨证用药", "君臣佐使", "中病即止"],
      },
    ],
    levels: [
      {
        level: "一",
        name: "治未病",
        description: "预防疾病，通过饮食、运动、情志调节保持健康。",
        fanzhenMapping: "治未病阶段",
      },
      {
        level: "二",
        name: "元气培育",
        description: "培养元气，使气血充盈，脏腑功能正常。",
        fanzhenMapping: "元气培育阶段",
      },
      {
        level: "三",
        name: "心肾相交",
        description: "使心火下降，肾水上升，达到心肾相交、水火既济。",
        fanzhenMapping: "心肾相交阶段",
      },
      {
        level: "四",
        name: "形与神俱",
        description: "形体与精神和谐统一，达到「形与神俱，而尽终其天年」。",
        fanzhenMapping: "形与神俱阶段",
      },
    ],
    concepts: [
      {
        name: "阴阳",
        explanation: "宇宙万物的两种基本属性，相互对立又相互依存。",
      },
      {
        name: "五行",
        explanation: "木火土金水五种基本物质，相生相克，构成万物。",
      },
      {
        name: "精气神",
        explanation: "生命的三大要素，精是物质基础，气是能量，神是主宰。",
      },
      {
        name: "脏腑",
        explanation: "五脏六腑，是人体生理功能的核心。",
      },
      {
        name: "经络",
        explanation: "气血运行的通道，连接脏腑和体表。",
      },
      {
        name: "气血",
        explanation: "气是动力，血是物质基础，气血调和则健康。",
      },
      {
        name: "津液",
        explanation: "体内的水液，滋润脏腑、濡养肌肤。",
      },
      {
        name: "治未病",
        explanation: "预防疾病的发生，是中医养生的核心理念。",
      },
    ],
    entryAdvice: [
      "了解自己的体质（平和、阳虚、阴虚、痰湿、气郁等）",
      "根据体质调整饮食，因人制宜",
      "学习八段锦或五禽戏，每日练习",
      "保持规律作息，顺应自然规律",
      "调节情志，避免七情内伤",
      "定期体检，及时发现健康问题",
    ],
    fanzhenSummary:
      "凡真体系将中医养生融入各阶段。治未病对应炼形化精的身体修复，元气培育对应炼精化气的能量培养，心肾相交对应炼气化神的身心合一，形与神俱对应炼神返虚的圆满境界。",
  },
  wu: {
    id: "wu",
    name: "武学",
    subtitle: "内外兼修，止戈为武",
    color: SCHOOL_COLORS.wu.main,
    colorLight: SCHOOL_COLORS.wu.light,
    colorDark: SCHOOL_COLORS.wu.dark,
    overview:
      "武学修炼以「止戈为武」为宗旨，追求内外兼修、形神合一。外练筋骨皮，内练一口气。武学不仅是技击之术，更是修身之道。通过基本功、套路、对练、内功的系统训练，强健体魄，培养意志，提升精神境界。",
    history: [
      {
        period: "先秦时期",
        title: "武术起源",
        description:
          "武术源于狩猎和战争。春秋战国时期，剑术、射术发展。越女论剑，奠定剑术理论。",
      },
      {
        period: "唐宋时期",
        title: "内家拳形成",
        description:
          "太极拳、形意拳、八卦掌等内家拳形成。强调「以意领气」「用意不用力」。",
      },
      {
        period: "明清时期",
        title: "武术繁荣",
        description:
          "武术门派林立，少林、武当、峨眉等名山形成武术中心。武术理论与道家、佛家融合。",
      },
      {
        period: "近现代",
        title: "武术转型",
        description:
          "武术从技击转向健身和修身。国家推广简化太极拳，武术进入体育体系。",
      },
    ],
    classics: [
      {
        name: "《太极拳经》",
        author: "王宗岳",
        dynasty: "清",
        description: "太极拳理论经典，阐述「太极者，无极而生，动静之机，阴阳之母」。",
      },
      {
        name: "《形意拳谱》",
        author: "李洛能",
        dynasty: "清",
        description: "形意拳经典，阐述五行拳和十二形的原理和练法。",
      },
      {
        name: "《八卦掌谱》",
        author: "董海川",
        dynasty: "清",
        description: "八卦掌经典，阐述走转变化和掌法原理。",
      },
    ],
    methods: [
      {
        name: "基本功",
        category: "基础",
        description: "包括站桩、踢腿、压腿、腰功等，是武术的基础。",
        keyPoints: ["循序渐进", "持之以恒", "形正势顺"],
      },
      {
        name: "套路",
        category: "技术",
        description: "连贯的攻防动作组合，是武术的主要练习形式。",
        keyPoints: ["形神兼备", "刚柔相济", "快慢相间"],
      },
      {
        name: "对练",
        category: "应用",
        description: "两人配合练习，包括推手、散手等。",
        keyPoints: ["沾粘连随", "不丢不顶", "随曲就伸"],
      },
      {
        name: "内功",
        category: "内修",
        description: "通过意念和呼吸培养内气，包括站桩、打坐等。",
        keyPoints: ["以意领气", "气沉丹田", "用意不用力"],
      },
    ],
    levels: [
      {
        level: "一",
        name: "基本功",
        description: "练习站桩、踢腿、压腿等基本功，打好身体基础。",
        fanzhenMapping: "基本功阶段",
      },
      {
        level: "二",
        name: "内功入门",
        description: "学习以意领气，培养内气，气沉丹田。",
        fanzhenMapping: "内功入门阶段",
      },
      {
        level: "三",
        name: "以神御气",
        description: "用意不用力，以神意引导气的运行。",
        fanzhenMapping: "以神御气阶段",
      },
      {
        level: "四",
        name: "神意合一",
        description: "形神合一，出神入化，达到「无形无意，感而遂通」。",
        fanzhenMapping: "神意合一阶段",
      },
    ],
    concepts: [
      {
        name: "内家与外家",
        explanation: "内家重内功，以意领气；外家重外功，以力取胜。",
      },
      {
        name: "整劲",
        explanation: "全身力量协调统一，发出整体的力量。",
      },
      {
        name: "听劲",
        explanation: "通过触觉感知对方的劲力变化。",
      },
      {
        name: "化劲",
        explanation: "将对方的劲力化解，不与之对抗。",
      },
      {
        name: "发劲",
        explanation: "将内气转化为劲力发出。",
      },
      {
        name: "气沉丹田",
        explanation: "将气下沉到丹田，使下盘稳固。",
      },
      {
        name: "以意领气",
        explanation: "用意念引导气的运行。",
      },
      {
        name: "用意不用力",
        explanation: "用意念而不是肌肉力量来完成动作。",
      },
    ],
    entryAdvice: [
      "从基本功开始，不可急于求成",
      "选择一门拳法深入练习",
      "每日站桩15-30分钟，培养内气",
      "找明师指导，避免走弯路",
      "注意热身和放松，避免受伤",
      "将武术融入日常生活，修身养性",
    ],
    fanzhenSummary:
      "凡真体系将武学内功融入各阶段。基本功对应炼形化精的身体修复，内功入门对应炼精化气的气感培养，以神御气对应炼气化神的意识训练，神意合一对应炼神返虚的圆满境界。",
  },
  yujia: {
    id: "yujia",
    name: "瑜伽",
    subtitle: "八支瑜伽，身心合一",
    color: SCHOOL_COLORS.yujia.main,
    colorLight: SCHOOL_COLORS.yujia.light,
    colorDark: SCHOOL_COLORS.yujia.dark,
    overview:
      "瑜伽源于古印度，意为「联结」，追求个体意识与宇宙意识的合一。以八支瑜伽为修炼体系，从持戒、精进开始，通过体式、调息、收摄、专注、禅定，最终达到三摩地。瑜伽强调身心合一，通过体式训练身体，通过呼吸和冥想训练心灵。",
    history: [
      {
        period: "公元前3000年",
        title: "瑜伽起源",
        description:
          "印度河流域文明出现瑜伽雏形。瑜伽与印度教、佛教结合，形成系统的修炼体系。",
      },
      {
        period: "公元前500年",
        title: "经典形成",
        description:
          "帕坦伽利著《瑜伽经》，系统阐述八支瑜伽。佛陀将瑜伽融入佛教修行。",
      },
      {
        period: "中世纪",
        title: "哈他瑜伽",
        description:
          "哈他瑜伽兴起，强调体式和呼吸。斯瓦特玛拉玛著《哈他瑜伽之光》。",
      },
      {
        period: "19-20世纪",
        title: "瑜伽传播",
        description:
          "瑜伽传入西方，与现代科学结合。形成各种现代瑜伽流派，如艾扬格瑜伽、阿斯汤加瑜伽等。",
      },
    ],
    classics: [
      {
        name: "《瑜伽经》",
        author: "帕坦伽利",
        dynasty: "公元前",
        description: "瑜伽根本经典，阐述八支瑜伽和瑜伽哲学。",
      },
      {
        name: "《薄伽梵歌》",
        author: "",
        dynasty: "公元前",
        description: "印度史诗《摩诃婆罗多》的一部分，阐述行动瑜伽、奉爱瑜伽、智慧瑜伽。",
      },
      {
        name: "《哈他瑜伽之光》",
        author: "斯瓦特玛拉玛",
        dynasty: "15世纪",
        description: "哈他瑜伽经典，详细阐述体式、呼吸、收束法等。",
      },
    ],
    methods: [
      {
        name: "体式（Asana）",
        category: "身体",
        description: "通过各种姿势训练身体，增强柔韧性、力量和平衡。",
        keyPoints: ["稳定而舒适", "配合呼吸", "循序渐进"],
      },
      {
        name: "调息（Pranayama）",
        category: "呼吸",
        description: "通过调节呼吸控制生命能量（Prana）。",
        keyPoints: ["吸、屏、呼、屏", "左右鼻孔交替", "循序渐进"],
      },
      {
        name: "收摄（Pratyahara）",
        category: "感官",
        description: "将感官从外界收回，转向内在。",
        keyPoints: ["关闭感官", "转向内在", "为冥想做准备"],
      },
      {
        name: "冥想（Dhyana）",
        category: "意识",
        description: "持续的专注和觉知，最终达到三摩地。",
        keyPoints: ["选择所缘境", "持续专注", "不执着"],
      },
    ],
    levels: [
      {
        level: "一",
        name: "持戒（Yama）",
        description: "社会伦理，包括不伤害、诚实、不偷盗、节制、不贪婪。",
        fanzhenMapping: "持戒阶段",
      },
      {
        level: "二",
        name: "精进（Niyama）",
        description: "个人修养，包括清净、知足、苦行、研读、臣服于神。",
        fanzhenMapping: "持戒阶段",
      },
      {
        level: "三",
        name: "体式（Asana）",
        description: "身体姿势的训练，使身体稳定舒适。",
        fanzhenMapping: "体式阶段",
      },
      {
        level: "四",
        name: "调息（Pranayama）",
        description: "呼吸控制，调节生命能量。",
        fanzhenMapping: "调息阶段",
      },
      {
        level: "五",
        name: "收摄（Pratyahara）",
        description: "感官内收，将注意力从外界转向内在。",
        fanzhenMapping: "调息阶段",
      },
      {
        level: "六",
        name: "专注（Dharana）",
        description: "将意识集中在一个对象上。",
        fanzhenMapping: "禅那阶段",
      },
      {
        level: "七",
        name: "禅定（Dhyana）",
        description: "持续的专注，意识与对象融为一体。",
        fanzhenMapping: "禅那阶段",
      },
      {
        level: "八",
        name: "三摩地（Samadhi）",
        description: "最终的合一境界，个体意识与宇宙意识融合。",
        fanzhenMapping: "三摩地阶段",
      },
    ],
    concepts: [
      {
        name: "梵（Brahman）",
        explanation: "宇宙的终极实在，万物的本源。",
      },
      {
        name: "阿特曼（Atman）",
        explanation: "个体的灵魂，与梵本质同一。",
      },
      {
        name: "业力（Karma）",
        explanation: "行为及其果报，决定轮回的方向。",
      },
      {
        name: "轮回（Samsara）",
        explanation: "生死轮回，是痛苦的根源。",
      },
      {
        name: "解脱（Moksha）",
        explanation: "从轮回中解脱，达到最终的自由。",
      },
      {
        name: "普拉那（Prana）",
        explanation: "生命能量，通过呼吸和体式来调节。",
      },
      {
        name: "脉轮（Chakra）",
        explanation: "人体能量中心，共有七个主要脉轮。",
      },
      {
        name: "昆达里尼（Kundalini）",
        explanation: "沉睡在海底轮的能量，通过修炼可以唤醒上升。",
      },
    ],
    entryAdvice: [
      "从基础体式开始，不要急于求成",
      "学习正确的呼吸方法",
      "选择一位合格的瑜伽老师",
      "了解瑜伽的哲学背景",
      "保持规律练习，每周至少3次",
      "将瑜伽融入日常生活",
    ],
    fanzhenSummary:
      "凡真体系将瑜伽八支融入各阶段。体式对应炼形化精的身体训练，调息对应炼精化气的呼吸培养，禅那对应炼气化神的意识训练，三摩地对应炼神返虚的合一境界。",
  },
  qita: {
    id: "qita",
    name: "其他体系",
    subtitle: "多元修炼，殊途同归",
    color: SCHOOL_COLORS.qita.main,
    colorLight: SCHOOL_COLORS.qita.light,
    colorDark: SCHOOL_COLORS.qita.dark,
    overview:
      "除了儒释道医武艺瑜伽等传统体系外，还有许多其他修炼体系值得关注。藏传佛教密宗以其独特的即身成佛理念著称；西方冥想融合了现代心理学和东方传统；人体科学则从现代科学角度探索身心修炼。这些体系虽然方法不同，但目标相通，都是追求身心健康和意识提升。",
    history: [
      {
        period: "公元7世纪",
        title: "密宗传入西藏",
        description:
          "印度密宗传入西藏，与苯教融合，形成藏传佛教。强调即身成佛，以咒印观修为特色。",
      },
      {
        period: "20世纪60年代",
        title: "西方冥想兴起",
        description:
          "东方冥想传入西方，与心理学结合。乔·卡巴金创立正念减压疗法（MBSR）。",
      },
      {
        period: "21世纪",
        title: "人体科学发展",
        description:
          "现代科学从神经科学、生理学、心理学等角度研究身心修炼，形成人体科学。",
      },
    ],
    classics: [
      {
        name: "《大幻化网》",
        author: "",
        dynasty: "",
        description: "藏传佛教密宗经典，阐述大圆满思想。",
      },
      {
        name: "《正念减压》",
        author: "乔·卡巴金",
        dynasty: "现代",
        description: "系统阐述正念冥想的理论和实践方法。",
      },
      {
        name: "《超个人心理学》",
        author: "肯·威尔伯",
        dynasty: "现代",
        description: "从心理学角度研究高级意识状态和灵性体验。",
      },
    ],
    methods: [
      {
        name: "四加行",
        category: "密宗",
        description: "藏传佛教的基础修行，包括皈依、发菩提心、金刚萨埵、供曼扎。",
        keyPoints: ["十万遍皈依大礼拜", "十万遍金刚萨埵心咒", "十万遍曼扎供"],
      },
      {
        name: "拙火定",
        category: "密宗",
        description: "通过观想和呼吸唤醒体内的拙火（昆达里尼），沿中脉上升。",
        keyPoints: ["观想中脉", "培养拙火", "引导上升"],
      },
      {
        name: "正念冥想",
        category: "西方",
        description: "通过有意识地觉察当下，不加评判地接纳体验。",
        keyPoints: ["觉察当下", "不加评判", "持续练习"],
      },
      {
        name: "身体扫描",
        category: "西方",
        description: "系统地将注意力集中在身体各个部位，培养身体觉知。",
        keyPoints: ["从头到脚", "觉察感受", "不试图改变"],
      },
      {
        name: "HRV训练",
        category: "科学",
        description: "通过心率变异性训练，提高自主神经系统的调节能力。",
        keyPoints: ["监测心率", "调节呼吸", "提高HRV"],
      },
      {
        name: "脑电波调节",
        category: "科学",
        description: "通过神经反馈训练，调节脑电波频率，达到特定意识状态。",
        keyPoints: ["监测脑电波", "反馈训练", "调节频率"],
      },
    ],
    levels: [
      {
        level: "一",
        name: "四加行",
        description: "藏传佛教的基础修行，积累资粮，净化业障。",
        fanzhenMapping: "筑基准备阶段",
      },
      {
        level: "二",
        name: "拙火定",
        description: "唤醒体内能量，打通中脉。",
        fanzhenMapping: "小周天阶段",
      },
      {
        level: "三",
        name: "幻身修法",
        description: "通过观想修炼幻身，为光明修法做准备。",
        fanzhenMapping: "大周天结丹阶段",
      },
      {
        level: "四",
        name: "大圆满",
        description: "藏传佛教的最高修法，直指心性，即身成佛。",
        fanzhenMapping: "育婴出神阶段",
      },
      {
        level: "五",
        name: "身体扫描",
        description: "西方冥想的基础方法，培养身体觉知。",
        fanzhenMapping: "治未病阶段",
      },
      {
        level: "六",
        name: "呼吸觉察",
        description: "通过观察呼吸培养专注和觉知。",
        fanzhenMapping: "初禅至三禅阶段",
      },
      {
        level: "七",
        name: "正念冥想",
        description: "持续的觉知训练，培养正念。",
        fanzhenMapping: "四禅见道阶段",
      },
      {
        level: "八",
        name: "超个人体验",
        description: "超越个人界限的体验，与宇宙合一。",
        fanzhenMapping: "修道涅槃阶段",
      },
      {
        level: "九",
        name: "运动科学",
        description: "通过科学运动改善身体机能。",
        fanzhenMapping: "基本功阶段",
      },
      {
        level: "十",
        name: "HRV训练",
        description: "通过心率变异性训练提高自主神经调节能力。",
        fanzhenMapping: "内功入门阶段",
      },
      {
        level: "十一",
        name: "脑电波调节",
        description: "通过神经反馈调节脑电波，优化大脑功能。",
        fanzhenMapping: "以神御气阶段",
      },
      {
        level: "十二",
        name: "意识研究",
        description: "从科学角度探索意识的本质和极限。",
        fanzhenMapping: "神意合一阶段",
      },
    ],
    concepts: [
      {
        name: "即身成佛",
        explanation: "密宗认为可以在这一生中通过修炼达到佛的境界。",
      },
      {
        name: "中脉",
        explanation: "密宗认为人体中央有一条能量通道，是修炼的核心。",
      },
      {
        name: "正念",
        explanation: "有意识地觉察当下，不加评判地接纳体验。",
      },
      {
        name: "HRV",
        explanation: "心率变异性，反映自主神经系统的调节能力。",
      },
      {
        name: "脑电波",
        explanation: "大脑神经元的电活动，分为α、β、θ、δ等不同频率。",
      },
      {
        name: "超个人",
        explanation: "超越个人界限的体验，包括高峰体验、神秘体验等。",
      },
      {
        name: "神经可塑性",
        explanation: "大脑可以通过经验和训练改变结构和功能。",
      },
      {
        name: "迷走神经",
        explanation: "第十对脑神经，与放松、恢复、社会连接有关。",
      },
    ],
    entryAdvice: [
      "了解不同体系的特点，选择适合自己的",
      "从基础方法开始，如身体扫描、呼吸觉察",
      "学习科学知识，理解修炼的生理机制",
      "使用科技工具辅助训练，如心率监测",
      "保持开放心态，不排斥任何体系",
      "寻找专业指导，避免盲目练习",
    ],
    fanzhenSummary:
      "凡真体系融合各派之长。藏传佛教密宗的四加行、拙火定、大圆满对应内丹修炼的各个阶段；西方冥想的身体扫描、呼吸觉察、正念对应基础修炼；人体科学的HRV训练、脑电波调节对应现代科学验证。",
  },
};

export function getSchoolById(id: string): SchoolData | undefined {
  return schoolsData[id as SchoolId];
}

export function getAllSchools(): SchoolData[] {
  return Object.values(schoolsData);
}

export function getSchoolIds(): SchoolId[] {
  return Object.keys(schoolsData) as SchoolId[];
}

// 对比数据
export interface CompareDimension {
  dimension: string;
  dao: string;
  fo: string;
  ru: string;
  yi: string;
  wu: string;
  yujia: string;
  qita: string;
}

export const compareData: CompareDimension[] = [
  {
    dimension: "核心目标",
    dao: "长生久视，与道合真",
    fo: "解脱轮回，证得涅槃",
    ru: "内圣外王，止于至善",
    yi: "治未病，形与神俱",
    wu: "内外兼修，止戈为武",
    yujia: "梵我合一，三摩地",
    qita: "身心健康，意识提升",
  },
  {
    dimension: "修炼方法",
    dao: "内丹、导引、吐纳",
    fo: "戒定慧、止观",
    ru: "格致诚正、静坐",
    yi: "饮食、导引、针灸",
    wu: "基本功、套路、内功",
    yujia: "体式、调息、冥想",
    qita: "冥想、科技辅助",
  },
  {
    dimension: "核心经典",
    dao: "《道德经》《悟真篇》",
    fo: "《金刚经》《坛经》",
    ru: "《论语》《传习录》",
    yi: "《黄帝内经》《伤寒论》",
    wu: "《太极拳经》《形意拳谱》",
    yujia: "《瑜伽经》《薄伽梵歌》",
    qita: "《大圆满》《正念减压》",
  },
  {
    dimension: "修炼层次",
    dao: "筑基→化气→化神→还虚→合道",
    fo: "持戒→止禅→观禅→四禅八定→涅槃",
    ru: "格物→诚意→存养→浩然→至善",
    yi: "治未病→元气→心肾→形神",
    wu: "基本功→内功→神御→合一",
    yujia: "持戒→精进→体式→调息→三摩地",
    qita: "基础→进阶→高级→圆满",
  },
  {
    dimension: "与凡真对应",
    dao: "筑基→小周天→大周天→育婴",
    fo: "持戒→初禅→四禅→涅槃",
    ru: "格物→诚意→浩然→至善",
    yi: "治未病→元气→心肾→形神",
    wu: "基本功→内功→神御→合一",
    yujia: "体式→调息→禅那→三摩地",
    qita: "基础→进阶→高级→圆满",
  },
  {
    dimension: "特色",
    dao: "性命双修，内丹体系",
    fo: "戒定慧三学，禅定",
    ru: "入世修行，道德修养",
    yi: "整体观念，治未病",
    wu: "内外兼修，技击养生",
    yujia: "八支体系，身心合一",
    qita: "多元融合，科学验证",
  },
];

// 融合修炼建议
export interface FusionAdvice {
  title: string;
  description: string;
  combination: string[];
  benefit: string;
}

export const fusionAdvices: FusionAdvice[] = [
  {
    title: "动静结合",
    description: "将动功和静功结合，达到阴阳平衡。",
    combination: ["道家站桩", "武学套路", "瑜伽体式"],
    benefit: "既培养内气，又强健体魄，避免偏废。",
  },
  {
    title: "性命双修",
    description: "同时修炼身体和心性，不可偏废。",
    combination: ["道家内丹", "佛家禅定", "儒家静坐"],
    benefit: "身体强健，心性平和，达到身心和谐。",
  },
  {
    title: "医武合一",
    description: "将中医养生和武学内功结合。",
    combination: ["中医导引", "武学内功", "瑜伽调息"],
    benefit: "疏通经络，培养内气，强身健体。",
  },
  {
    title: "东西方融合",
    description: "将东方传统和西方科学结合。",
    combination: ["正念冥想", "HRV训练", "道家吐纳"],
    benefit: "科学验证，安全可靠，效果显著。",
  },
  {
    title: "三教合一",
    description: "融合儒释道三家之长。",
    combination: ["道家内丹", "佛家禅定", "儒家心性"],
    benefit: "取长补短，全面修炼，理事圆融。",
  },
];
