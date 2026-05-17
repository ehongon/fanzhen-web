export interface VideoLink {
  title: string;
  url: string;
  platform: "bilibili" | "youtube";
  duration: string;
  instructor: string;
  description: string;
}

export interface Gongfa {
  id: string;
  slug: string;
  name: string;
  alias?: string;
  school: string;
  schools: string[];
  stage: string;
  stages: string[];
  dimension: string[];
  scene: string[];
  audience: string[];
  type: string;
  effects: string[];
  difficulty: number;
  duration: string;
  riskLevel: "safe" | "caution" | "guided";
  description: string;
  history?: string;
  steps: string[];
  breathing?: string;
  mindFocus?: string;
  precautions?: string[];
  commonMistakes?: { correct: string; wrong: string }[];
  advancedPath?: string[];
  interpretations?: Record<string, string>;
  fanzhenExperience?: string;
  reviews?: { user: string; content: string; rating: number }[];
  relatedGongfa?: string[];
  videos?: VideoLink[];
  image?: string;
  stepImages?: string[];
}

// 常量导出
export const SCHOOLS = ["道家", "佛家", "儒家", "武学", "瑜伽", "中医", "现代"] as const;

export const SCHOOL_COLORS: Record<string, string> = {
  "道家": "bg-teal-100 text-teal-800",
  "佛家": "bg-amber-100 text-amber-800",
  "儒家": "bg-red-100 text-red-800",
  "武学": "bg-blue-100 text-blue-800",
  "瑜伽": "bg-purple-100 text-purple-800",
  "中医": "bg-green-100 text-green-800",
  "现代": "bg-gray-100 text-gray-800",
};

export const STAGES = ["炼形化精", "炼精化气", "炼气化神", "炼神返虚", "全阶段"] as const;

export const STAGE_COLORS: Record<string, string> = {
  "炼形化精": "bg-green-100 text-green-800 border-green-200",
  "炼精化气": "bg-blue-100 text-blue-800 border-blue-200",
  "炼气化神": "bg-purple-100 text-purple-800 border-purple-200",
  "炼神返虚": "bg-amber-100 text-amber-800 border-amber-200",
  "全阶段": "bg-gray-100 text-gray-800 border-gray-200",
};

export const GONGFA_TYPES = ["静功", "动功", "动静结合", "心法"] as const;

export const TYPE_COLORS: Record<string, string> = {
  "静功": "bg-indigo-100 text-indigo-800",
  "动功": "bg-orange-100 text-orange-800",
  "动静结合": "bg-pink-100 text-pink-800",
  "心法": "bg-cyan-100 text-cyan-800",
};

export const EFFECTS = ["强身健体", "疏通经络", "培育元气", "提升觉知", "宁心安神", "调理脏腑", "减压放松", "情绪调节", "内外兼修", "身心合一", "以柔克刚", "吐故纳新", "净化身心", "提升能量", "强筋健骨", "舒筋活络"] as const;

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: "入门",
  2: "简单",
  3: "中等",
  4: "较难",
  5: "困难",
};

export const gongfaList: Gongfa[] = [
  // 道家功法
  {
    id: "hunyuan-lizhuang",
    slug: "hunyuan-lizhuang",
    name: "混元立桩功",
    alias: "无极桩",
    school: "道家",
    schools: ["道家", "武学"],
    stage: "炼形化精",
    stages: ["炼形化精"],
    dimension: ["身"],
    scene: ["晨课", "晚课", "日常"],
    audience: ["初学者", "所有人"],
    type: "静功",
    effects: ["强身健体", "疏通经络", "培育元气"],
    difficulty: 2,
    duration: "15-30分钟",
    riskLevel: "safe",
    description: "混元立桩功是炼形化精阶段最核心的功法，也是整个凡真体系的根基。通过静站培养身体的气感，改善下盘稳定、强化下肢循环、恢复精力。",
    history: "混元桩源于道家内丹修炼，后融入武术站桩体系。无极桩意为'无形无象，无极而生'，是太极拳的基本桩功。",
    steps: [
      "双脚平行，与肩同宽，脚尖微内扣，全脚掌均匀着地",
      "膝盖微屈，大概120-135度，膝关节朝向与脚尖一致",
      "胯根内收，尾骨自然下垂，如坐高凳",
      "头顶百会穴轻轻上领，颈椎拉长，下巴微收",
      "脊柱保持自然生理曲度，腰椎放松，命门穴自然后凸",
      "肩胛骨微微外张，肩膀放松下沉",
      "手臂自然下垂，或双手抱于丹田前，手心相对如抱球状",
      "眼睛轻闭或微闭，舌抵上腭，面部放松",
      "呼吸自然，不刻意控制，保持放松状态"
    ],
    breathing: "自然呼吸，不刻意控制。随着练习深入，呼吸会逐渐变得深长均匀。",
    mindFocus: "初学者可将注意力轻轻放在脚底与地面的接触感，或放在丹田区域。",
    precautions: [
      "膝盖有伤者需调整屈膝角度，避免疼痛",
      "饭后1小时内不宜站桩",
      "站桩后出现头晕、恶心应立即停止",
      "不要在风口或空调直吹处站桩"
    ],
    commonMistakes: [
      { correct: "膝盖微屈，不超过脚尖", wrong: "膝盖过度前屈或内扣" },
      { correct: "肩膀放松下沉", wrong: "耸肩或含胸驼背" },
      { correct: "呼吸自然", wrong: "刻意深呼吸或憋气" }
    ],
    advancedPath: ["混元桩（双手抱球）", "三体式", "太极桩"],
    interpretations: {
      "道家": "筑基之法，培养先天一气",
      "武学": "练整劲的基础，下盘稳固",
      "中医": "疏通经络，调和气血"
    },
    fanzhenExperience: "凡真子原话：'如果炼形化精阶段只能练一个功法，那就站桩。其他都可以没有，站桩必须有。'他通过三个月的站桩练习，睡眠明显改善，精力恢复。",
    reviews: [
      { user: "修行者A", content: "站桩三个月后，睡眠质量大幅提升", rating: 5 },
      { user: "修行者B", content: "起初很难坚持，但慢慢体会到身体的放松", rating: 4 }
    ],
    videos: [
      {
        title: "【站桩入门】混元桩详细教学",
        url: "https://www.bilibili.com/video/BV1xx411x7Xx",
        platform: "bilibili",
        duration: "25:30",
        instructor: "太极传人",
        description: "混元桩基础姿势详解，适合初学者入门"
      },
      {
        title: "无极桩姿势详解",
        url: "https://www.bilibili.com/video/BV1yx411x7Yy",
        platform: "bilibili",
        duration: "18:45",
        instructor: "养生专家",
        description: "无极桩的正确姿势与常见错误纠正"
      },
      {
        title: "Wuji Stance Tutorial",
        url: "https://www.youtube.com/watch?v=example1",
        platform: "youtube",
        duration: "22:00",
        instructor: "Master Chen",
        description: "English tutorial on Wuji stance fundamentals"
      }
    ]
  },
  {
    id: "yongquan-guiyuan",
    slug: "yongquan-guiyuan",
    name: "涌泉归元法",
    school: "道家",
    schools: ["道家"],
    stage: "炼精化气",
    stages: ["炼精化气"],
    dimension: ["气"],
    scene: ["晚课", "日常"],
    audience: ["进阶者"],
    type: "静功",
    effects: ["培育元气", "气沉丹田", "引火归元"],
    difficulty: 3,
    duration: "15-20分钟",
    riskLevel: "caution",
    description: "涌泉归元法是炼精化气阶段最核心的功法，通过呼吸配合意念，引导气机下沉至脚底涌泉穴，建立'根气'，形成'下实上虚'的身体结构。",
    history: "源于道家内丹术，涌泉穴为肾经井穴，肾主先天之气。此法强调'引气归根'，使散越之气回归根本。",
    steps: [
      "先站混元桩或无极桩10-15分钟，等待身体放松",
      "吸气时轻轻提会阴，意念从下丹田向上微微吸气",
      "呼气时意念从头顶沿身体前侧缓缓下行",
      "经过额头、鼻子、胸口、腹部，最后到脚底涌泉穴",
      "在涌泉穴处微微停留，感受气'沉'入脚底",
      "自然呼吸，每次呼气时都意念下沉",
      "练习15-20分钟后，收功"
    ],
    breathing: "吸气时意念上行，呼气时意念下沉至涌泉。呼吸要自然、深长、均匀。",
    mindFocus: "意念要轻柔，如羽毛拂面，不要用力。体会气'沉'入脚底的感觉，像水渗入沙地。",
    precautions: [
      "意念不可过重，'意轻如丝'",
      "头部胀痛时应立即停止，改为纯站桩",
      "不要在疲劳或情绪激动时练习",
      "练习后要有收功过程"
    ],
    commonMistakes: [
      { correct: "意念轻柔，如羽毛拂面", wrong: "用意念强行引导气机" },
      { correct: "呼气时气沉脚底", wrong: "吸气时意念下沉" },
      { correct: "停留感受", wrong: "急于求成，追求气感" }
    ],
    fanzhenExperience: "凡真子原话：'涌泉归元法是此阶段的定海神针。气机上浮时，用它引气下行；心神不宁时，用它安定心神。'"
  },
  {
    id: "miman-shihai",
    slug: "miman-shihai",
    name: "弥漫识海观",
    school: "道家",
    schools: ["道家", "佛家"],
    stage: "炼气化神",
    stages: ["炼气化神"],
    dimension: ["神"],
    scene: ["静中", "日常"],
    audience: ["进阶者"],
    type: "心法",
    effects: ["提升觉知", "扩展意识", "分辨识神元神"],
    difficulty: 4,
    duration: "30-60分钟",
    riskLevel: "guided",
    description: "弥漫识海观是炼气化神阶段的核心功法，培养'全场觉知'的能力，不是'我在看'，而是'看'本身在发生。",
    steps: [
      "静坐或站桩，让身体自然放松",
      "不刻意关注任何特定对象",
      "让觉知自然弥漫，如同灯光照亮整个房间",
      "身体、呼吸、念头、外界声音，都在觉知中自然呈现",
      "不追逐、不排斥任何现象",
      "保持这种'知道'的状态",
      "练习30-60分钟"
    ],
    fanzhenExperience: "凡真子体验：'不是我在看，而是看本身在发生。身体、呼吸、念头、外界声音，都在这个看中自然呈现，不需要我去注意它们。'"
  },
  // 佛家功法
  {
    id: "anan-banna",
    slug: "anan-banna",
    name: "安那般那",
    alias: "观呼吸",
    school: "佛家",
    schools: ["佛家"],
    stage: "炼形化精",
    stages: ["炼形化精", "炼精化气"],
    dimension: ["心", "气"],
    scene: ["晨课", "晚课", "日常"],
    audience: ["初学者", "所有人"],
    type: "静功",
    effects: ["宁心安神", "提升专注", "培育觉知"],
    difficulty: 1,
    duration: "15-30分钟",
    riskLevel: "safe",
    description: "安那般那是佛陀教导的根本修行方法，通过观察呼吸培养专注力和觉知力，是所有禅修的基础。",
    history: "出自《大念住经》，是佛教四念住修法中的身念处，为佛陀亲自教导的修行根本。",
    steps: [
      "选择安静的环境，采取舒适的坐姿",
      "轻轻闭上眼睛，将注意力放在呼吸上",
      "感受气息从鼻孔进入和出去",
      "不要控制呼吸，只是观察自然的呼吸",
      "当注意力跑掉时，温和地将其带回到呼吸",
      "持续观察呼吸的进出、长短、粗细",
      "练习15-30分钟"
    ],
    interpretations: {
      "佛家": "四念住之根本，培养正念的基础",
      "道家": "调息之法，神气合一的入门",
      "现代": "正念冥想的核心技术，有科学研究支持"
    },
    videos: [
      {
        title: "【禅修入门】安那般那观呼吸",
        url: "https://www.bilibili.com/video/BV1rx411x7Rr",
        platform: "bilibili",
        duration: "30:00",
        instructor: "释一行",
        description: "安那般那观呼吸禅修入门指导"
      },
      {
        title: "Anapanasati Meditation",
        url: "https://www.youtube.com/watch?v=example5",
        platform: "youtube",
        duration: "25:00",
        instructor: "Thanissaro Bhikkhu",
        description: "Guided Anapanasati breathing meditation"
      }
    ]
  },
  {
    id: "six-word-jue",
    slug: "six-word-jue",
    name: "六字诀",
    school: "道家",
    schools: ["道家", "中医"],
    stage: "炼形化精",
    stages: ["炼形化精", "炼精化气"],
    dimension: ["身", "气"],
    scene: ["晨课", "日常"],
    audience: ["初学者", "所有人"],
    type: "动功",
    effects: ["调理脏腑", "疏通经络", "吐故纳新"],
    difficulty: 2,
    duration: "15-20分钟",
    riskLevel: "safe",
    description: "六字诀是通过嘘、呵、呼、呬、吹、嘻六个字的发音，配合特定的动作和呼吸，调理五脏六腑的传统养生功法。",
    steps: [
      "嘘字诀：养肝，双目圆睁，双手从腰间缓缓抬起",
      "呵字诀：养心，双手捧心，张口发'呵'音",
      "呼字诀：养脾，双手按腹，撮口发'呼'音",
      "呬字诀：养肺，双手托天，开口发'呬'音",
      "吹字诀：养肾，双手抱膝，撮口发'吹'音",
      "嘻字诀：理三焦，双手交叉，开口发'嘻'音"
    ],
    videos: [
      {
        title: "【六字诀】完整教学",
        url: "https://www.bilibili.com/video/BV1sx411x7Ss",
        platform: "bilibili",
        duration: "18:20",
        instructor: "气功大师",
        description: "六字诀完整六式教学，配合呼吸吐纳"
      }
    ]
  },
  // 武学功法
  {
    id: "yijinjing",
    slug: "yijinjing",
    name: "易筋经",
    alias: "易筋八式",
    school: "武学",
    schools: ["武学", "佛家"],
    stage: "炼形化精",
    stages: ["炼形化精"],
    dimension: ["身"],
    scene: ["晨课", "日常"],
    audience: ["初学者", "所有人"],
    type: "动功",
    effects: ["舒筋活络", "强筋健骨", "调理脏腑"],
    difficulty: 3,
    duration: "20-30分钟",
    riskLevel: "safe",
    description: "易筋经是炼形化精阶段的核心动功，通过'拉筋、动关节、带呼吸'的方式，疏通筋膜，释放长期积累的肌肉张力。",
    history: "相传为达摩祖师所创，是少林功夫的基础功法。'易筋'意为改变筋膜，使筋骨柔软有力。",
    steps: [
      "韦驮献杵第一式：调理气息，舒展肩臂",
      "韦驮献杵第二式：横担日月，疏通肝胆",
      "韦驮献杵第三式：掌托天门，升降气机",
      "摘星换斗式：调理心肺，疏通大肠经",
      "倒拽九牛尾式：强腰固肾，锻炼整劲",
      "出爪亮翅式：宣肺理气，舒展胸背",
      "九鬼拔马刀式：调理脾胃，疏通带脉",
      "落地金盘：收势固本，引气归元"
    ],
    fanzhenExperience: "凡真子每日晨起练习易筋经，作为站桩前的热身，帮助打开身体，疏通筋膜。",
    videos: [
      {
        title: "【易筋经】完整十二式教学",
        url: "https://www.bilibili.com/video/BV1zx411x7Zz",
        platform: "bilibili",
        duration: "32:15",
        instructor: "释延王",
        description: "少林寺易筋经完整十二式详细教学"
      },
      {
        title: "易筋经八式详解",
        url: "https://www.bilibili.com/video/BV1wx411x7Ww",
        platform: "bilibili",
        duration: "28:40",
        instructor: "养生导师",
        description: "易筋经八式动作分解与呼吸配合"
      },
      {
        title: "Yi Jin Jing Complete Tutorial",
        url: "https://www.youtube.com/watch?v=example2",
        platform: "youtube",
        duration: "35:00",
        instructor: "Shi Heng Yi",
        description: "Complete Yi Jin Jing Qigong practice guide"
      }
    ]
  },
  {
    id: "baduanjin",
    slug: "baduanjin",
    name: "八段锦",
    school: "武学",
    schools: ["武学", "道家", "中医"],
    stage: "炼形化精",
    stages: ["炼形化精"],
    dimension: ["身"],
    scene: ["晨课", "日常"],
    audience: ["初学者", "所有人"],
    type: "动功",
    effects: ["调理脏腑", "疏通经络", "强身健体"],
    difficulty: 2,
    duration: "15-20分钟",
    riskLevel: "safe",
    description: "八段锦是一套优秀的传统导引功法，动作柔和连贯，如行云流水，侧重于调理内脏功能。",
    steps: [
      "两手托天理三焦",
      "左右开弓似射雕",
      "调理脾胃须单举",
      "五劳七伤往后瞧",
      "摇头摆尾去心火",
      "两手攀足固肾腰",
      "攒拳怒目增气力",
      "背后七颠百病消"
    ],
    videos: [
      {
        title: "【八段锦】国家标准版教学",
        url: "https://www.bilibili.com/video/BV1vx411x7Vv",
        platform: "bilibili",
        duration: "12:30",
        instructor: "国家体育总局",
        description: "八段锦国家标准版完整演示"
      },
      {
        title: "八段锦口令版",
        url: "https://www.bilibili.com/video/BV1ux411x7Uu",
        platform: "bilibili",
        duration: "15:00",
        instructor: "健身气功教练",
        description: "带口令的八段锦练习版，适合跟练"
      },
      {
        title: "Baduanjin Qigong",
        url: "https://www.youtube.com/watch?v=example3",
        platform: "youtube",
        duration: "14:20",
        instructor: "Dr. Chen",
        description: "Standard Baduanjin Qigong practice with English guidance"
      }
    ]
  },
  {
    id: "taijiquan",
    slug: "taijiquan",
    name: "太极拳",
    alias: "24式简化太极拳",
    school: "武学",
    schools: ["武学", "道家"],
    stage: "炼精化气",
    stages: ["炼精化气", "炼气化神"],
    dimension: ["身", "气", "神"],
    scene: ["晨课", "日常", "动中"],
    audience: ["进阶者", "所有人"],
    type: "动静结合",
    effects: ["内外兼修", "身心合一", "以柔克刚"],
    difficulty: 4,
    duration: "30-60分钟",
    riskLevel: "safe",
    description: "太极拳是内外兼修的传统武术，动作缓慢圆活，强调'以意导气，以气运身'，是炼精化气到炼气化神的优秀功法。",
    history: "起源于明末清初，集道家哲学、中医经络、武术技击于一体。24式简化太极拳由国家体委于1956年编排。",
    steps: [
      "起势：立身中正，气沉丹田",
      "左右野马分鬃：以腰为轴，虚实分明",
      "白鹤亮翅：舒展大方，上下相随",
      "左右搂膝拗步：步法稳健，手眼协调",
      "手挥琵琶：含胸拔背，沉肩坠肘",
      "左右倒卷肱：退步灵活，转换自如",
      "左揽雀尾：掤捋挤按，四正手法",
      "右揽雀尾：掤捋挤按，四正手法",
      "单鞭：身法中正，劲力完整",
      "云手：腰脊旋转，两手如轮"
    ],
    interpretations: {
      "道家": "以柔克刚，道法自然的身体实践",
      "武学": "以意导气，以气运身的内家拳法",
      "中医": "疏通经络，调和气血的运动疗法"
    },
    videos: [
      {
        title: "【太极拳】24式简化太极拳教学",
        url: "https://www.bilibili.com/video/BV1tx411x7Tt",
        platform: "bilibili",
        duration: "28:00",
        instructor: "李德印",
        description: "24式简化太极拳完整教学"
      },
      {
        title: "太极拳入门基本功",
        url: "https://www.youtube.com/watch?v=example4",
        platform: "youtube",
        duration: "20:30",
        instructor: "Master Yang",
        description: "Tai Chi basic movements and principles"
      }
    ]
  },
  // 瑜伽功法
  {
    id: "pranayama",
    slug: "pranayama",
    name: "呼吸控制法",
    alias: "Pranayama",
    school: "瑜伽",
    schools: ["瑜伽"],
    stage: "炼精化气",
    stages: ["炼精化气"],
    dimension: ["气"],
    scene: ["晨课", "晚课"],
    audience: ["初学者", "进阶者"],
    type: "静功",
    effects: ["培育元气", "净化身心", "提升能量"],
    difficulty: 3,
    duration: "20-30分钟",
    riskLevel: "caution",
    description: "Pranayama是瑜伽八支中的第四支，通过各种呼吸技巧控制生命能量（Prana），是培育气机的有效方法。",
    steps: [
      "腹式呼吸：吸气时腹部鼓起，呼气时腹部收缩",
      "交替鼻孔呼吸：左右鼻孔交替呼吸，平衡阴阳",
      "蜂鸣呼吸：呼气时发出蜂鸣声，振动颅腔",
      "圣光调息：快速有力的腹部呼吸，净化能量通道"
    ]
  },
  // 佛家功法
  {
    id: "zhi-guan",
    slug: "zhi-guan",
    name: "止观法门",
    alias: "奢摩他毗婆舍那",
    school: "佛家",
    schools: ["佛家"],
    stage: "炼气化神",
    stages: ["炼气化神", "炼神返虚"],
    dimension: ["心", "神"],
    scene: ["静中", "日常"],
    audience: ["进阶者"],
    type: "心法",
    effects: ["提升觉知", "宁心安神", "情绪调节"],
    difficulty: 4,
    duration: "30-60分钟",
    riskLevel: "guided",
    description: "止观是佛家禅修的核心方法，'止'（奢摩他）令心专注一境，'观'（毗婆舍那）以智慧观察实相。由隋代智者大师系统整理为天台宗核心修法。",
    history: "源于佛陀时代，经龙树菩萨、世亲菩萨等发展，由隋代智者大师在《摩诃止观》中系统化为完整的修行体系。",
    steps: [
      "调身：采取舒适坐姿，脊柱正直，双肩放松",
      "调息：呼吸自然，不刻意控制，逐渐深长均匀",
      "调心：将注意力放在呼吸或丹田，令心专注",
      "修止：心随呼吸，念念相续，不随妄想流转",
      "修观：于定心中观察身心无常、无我之实相",
      "止观双运：定中有慧，慧中有定，定慧等持"
    ],
    breathing: "自然呼吸，逐渐转为腹式呼吸。止时呼吸微细，观时呼吸自然。",
    mindFocus: "初学以呼吸为所缘，进阶以身心现象为所缘，高阶以法性为所缘。",
    precautions: [
      "修止时不可强行压制念头，只是不随",
      "修观时不可空想理论，须如实观察",
      "出现境界不可执着，不可追求神通",
      "建议在明师指导下修习"
    ],
    commonMistakes: [
      { correct: "不随妄想，只是知道", wrong: "强行压制念头" },
      { correct: "如实观察身心现象", wrong: "用思维分析代替观照" },
      { correct: "定慧等持，不偏不倚", wrong: "偏修止或偏修观" }
    ],
    interpretations: {
      "佛家": "天台宗核心修法，定慧双运之道",
      "道家": "类似凝神入炁穴，性命双修",
      "现代": "专注力训练与元认知观察的结合"
    },
    fanzhenExperience: "凡真子体验：'止观是炼气化神阶段最重要的法门。止让识神安定，观让元神显现。止是收，观是放；止是定，观是慧。'"
  },
  {
    id: "nei-guan",
    slug: "nei-guan",
    name: "内观禅",
    alias: "Vipassana",
    school: "佛家",
    schools: ["佛家", "现代"],
    stage: "炼精化气",
    stages: ["炼精化气", "炼气化神"],
    dimension: ["身", "心"],
    scene: ["静中", "日常"],
    audience: ["初学者", "进阶者"],
    type: "静功",
    effects: ["提升觉知", "净化身心", "情绪调节"],
    difficulty: 3,
    duration: "30-60分钟",
    riskLevel: "safe",
    description: "内观禅（Vipassana）是佛陀教导的根本修行方法，通过观察身体感受来培养觉知力和平等心，是南传佛教的核心修法。",
    history: "源于佛陀在《大念住经》中的教导，由缅甸乌巴庆尊者、葛印卡老师等近代大师推广至全世界。",
    steps: [
      "坐姿：采取舒适坐姿，保持脊柱正直",
      "观察呼吸：将注意力放在鼻孔下方，感受气息的进出",
      "观察身体感受：从头到脚扫描身体，观察各种感受",
      "不反应：对愉悦感受不贪爱，对不愉悦感受不嗔恨",
      "保持平等心：对所有感受保持中立的态度",
      "持续观察：日复一日，持续不断地观察"
    ],
    breathing: "自然呼吸，只是观察，不控制。",
    mindFocus: "注意力放在身体感受上，特别是呼吸时的鼻孔感受和全身扫描时的身体感受。",
    precautions: [
      "初学者建议参加十日课程",
      "出现强烈情绪反应时不可停止，继续观察",
      "不可将内观当作放松或减压工具",
      "需要持续每日练习才能见效"
    ],
    interpretations: {
      "佛家": "四念住之身受心法，根本修行方法",
      "现代": "有科学研究支持的觉知训练方法",
      "道家": "类似身念处观照，培育身体觉知"
    }
  },
  {
    id: "chan-zuo",
    slug: "chan-zuo",
    name: "禅宗坐禅",
    alias: "默照禅",
    school: "佛家",
    schools: ["佛家"],
    stage: "炼气化神",
    stages: ["炼气化神", "炼神返虚"],
    dimension: ["心", "神"],
    scene: ["静中"],
    audience: ["进阶者"],
    type: "心法",
    effects: ["提升觉知", "宁心安神", "身心合一"],
    difficulty: 5,
    duration: "30-90分钟",
    riskLevel: "guided",
    description: "禅宗坐禅以'默照'为法，不借外缘，直指本心。通过静坐默照，照见本来面目，是顿悟法门的核心实践。",
    history: "源于达摩祖师西来，经六祖惠能发扬光大，形成中国特有的禅宗修行体系。",
    steps: [
      "调身：结跏趺坐或单盘，脊柱正直，双手结定印",
      "调息：呼吸自然，逐渐深长微细",
      "调心：不缘外境，不随妄想，只是默照",
      "默：无言无说，无思无虑",
      "照：了了分明，如如不动",
      "打成一片：行住坐卧，动静语默，皆是禅"
    ],
    mindFocus: "无特定所缘，只是觉知本身。不缘呼吸，不缘丹田，只是'知道'。",
    precautions: [
      "需要明师指导，不可盲修瞎练",
      "出现境界不可执着，不可追求",
      "不可将禅坐当作休息或放松",
      "需要长期持续练习"
    ],
    fanzhenExperience: "凡真子体验：'坐禅是炼气化神到炼神返虚的关键法门。从'我在坐禅'到'坐禅在进行'，再到'无禅可坐'，这就是从有为到无为的过程。'"
  },
  // 儒家功法
  {
    id: "jing-zuo",
    slug: "jing-zuo",
    name: "儒家静坐",
    alias: "程门立雪",
    school: "儒家",
    schools: ["儒家"],
    stage: "炼形化精",
    stages: ["炼形化精", "炼精化气"],
    dimension: ["心"],
    scene: ["晨课", "晚课"],
    audience: ["初学者", "所有人"],
    type: "静功",
    effects: ["宁心安神", "提升专注", "情绪调节"],
    difficulty: 2,
    duration: "15-30分钟",
    riskLevel: "safe",
    description: "儒家静坐是宋明理学的重要修养方法，通过静坐收心，涵养德性，达到'未发之中'的境界。",
    history: "由程颢、程颐兄弟倡导，经朱熹、王阳明等发展，成为儒家修身的重要方法。",
    steps: [
      "端坐：正襟危坐，脊柱正直，双手平放膝上",
      "收心：将散乱的心收回来，不随外境流转",
      "主敬：保持恭敬严肃的态度，不怠不慢",
      "存养：涵养本心，如养浩然之气",
      "观理：静中体认天理，明本心之善",
      "省察：静坐后反省一日言行，有过则改"
    ],
    mindFocus: "初学以收心为主，进阶以体认天理为主，高阶以'未发之中'为主。",
    interpretations: {
      "儒家": "主敬存养，修身齐家之法",
      "道家": "类似心斋坐忘，但更重伦理",
      "佛家": "类似止观，但目标在成圣而非成佛"
    }
  },
  {
    id: "hao-ran-qi",
    slug: "hao-ran-qi",
    name: "浩然之气培育法",
    alias: "孟子养气",
    school: "儒家",
    schools: ["儒家", "中医"],
    stage: "炼精化气",
    stages: ["炼精化气", "炼气化神"],
    dimension: ["气", "心"],
    scene: ["日常", "动中"],
    audience: ["初学者", "进阶者"],
    type: "心法",
    effects: ["培育元气", "提升觉知", "内外兼修"],
    difficulty: 3,
    duration: "日常持续",
    riskLevel: "safe",
    description: "浩然之气培育法源于孟子，通过'直养而无害'的方式，在日常行事中培养充塞天地之间的正气。",
    history: "《孟子·公孙丑上》：'我善养吾浩然之气。其为气也，至大至刚，以直养而无害，则塞于天地之间。'",
    steps: [
      "集义：事事依义而行，积累善行",
      "直养：正直无邪，不曲不阿",
      "无害：不揠苗助长，不急于求成",
      "配道：与道义相配合，不孤不寡",
      "充塞：日积月累，气充塞于天地之间"
    ],
    mindFocus: "在日常行事中保持正念，事事依义而行，自然培育浩然之气。",
    interpretations: {
      "儒家": "修身养气，成圣之道",
      "道家": "类似炼气，但更重伦理",
      "中医": "正气内存，邪不可干"
    }
  },
  // 中医功法
  {
    id: "wu-qin-xi",
    slug: "wu-qin-xi",
    name: "五禽戏",
    alias: "华佗五禽戏",
    school: "中医",
    schools: ["中医", "武学"],
    stage: "炼形化精",
    stages: ["炼形化精"],
    dimension: ["身"],
    scene: ["晨课", "日常"],
    audience: ["初学者", "所有人"],
    type: "动功",
    effects: ["强身健体", "调理脏腑", "舒筋活络"],
    difficulty: 2,
    duration: "20-30分钟",
    riskLevel: "safe",
    description: "五禽戏是东汉华佗创编的导引功法，模仿虎、鹿、熊、猿、鸟五种动物的动作，分别调理肝、肾、脾、心、肺五脏。",
    history: "由东汉名医华佗创编，《后汉书》记载：'华佗晓养性之术，年且百岁而犹有壮容。'五禽戏是其养生核心方法。",
    steps: [
      "虎戏：威猛虎扑，疏肝理气，增强筋骨",
      "鹿戏：轻盈鹿奔，补肾强腰，灵活关节",
      "熊戏：沉稳熊晃，健脾和胃，充实四肢",
      "猿戏：敏捷猿摘，养心益智，灵活身手",
      "鸟戏：舒展鸟飞，宣肺理气，调达气机"
    ],
    interpretations: {
      "中医": "五脏导引，脏腑调理",
      "武学": "仿生运动，强身健体",
      "道家": "道法自然，仿生养生"
    }
  },
  {
    id: "tui-na",
    slug: "tui-na",
    name: "自我推拿",
    alias: "自我按摩",
    school: "中医",
    schools: ["中医"],
    stage: "炼形化精",
    stages: ["炼形化精", "炼精化气"],
    dimension: ["身"],
    scene: ["日常", "睡前"],
    audience: ["初学者", "所有人"],
    type: "动功",
    effects: ["疏通经络", "调理脏腑", "减压放松"],
    difficulty: 1,
    duration: "10-20分钟",
    riskLevel: "safe",
    description: "自我推拿是中医传统养生方法，通过按摩特定穴位和经络，疏通气血，调理脏腑，简单易行，适合日常保健。",
    steps: [
      "干洗脸：双手搓热，从额头到下巴反复摩擦",
      "梳头：十指如梳，从前额梳到后脑",
      "揉腹：双手重叠，顺时针揉腹36圈",
      "搓腰：双手搓热，上下搓擦腰部肾区",
      "捏脊：双手从尾椎捏到大椎，反复3-5次",
      "拍腿：双手轻拍大腿外侧胆经"
    ],
    precautions: [
      "饭后1小时内不宜揉腹",
      "孕妇不宜揉腹和捏脊",
      "皮肤破损处不宜按摩",
      "力度适中，以舒适为度"
    ]
  },
  {
    id: "qiang-zhuang-gong",
    slug: "qiang-zhuang-gong",
    name: "强壮功",
    alias: "内养功",
    school: "中医",
    schools: ["中医", "道家"],
    stage: "炼精化气",
    stages: ["炼精化气"],
    dimension: ["气"],
    scene: ["晨课", "晚课"],
    audience: ["初学者", "进阶者"],
    type: "静功",
    effects: ["培育元气", "强身健体", "调理脏腑"],
    difficulty: 2,
    duration: "20-40分钟",
    riskLevel: "safe",
    description: "强壮功是中医气功的重要功法，通过特定的呼吸方法和意念引导，培育元气，增强体质，是炼精化气阶段的辅助功法。",
    steps: [
      "预备式：站立调息，身心放松",
      "吸气：鼻吸，意想气从四面八方聚于丹田",
      "闭气：屏息片刻，意守丹田",
      "呼气：口呼，意想浊气从全身排出",
      "重复：一吸一呼为一息，反复练习",
      "收功：气归丹田，静养片刻"
    ],
    breathing: "吸-闭-呼法。吸气时腹部鼓起，闭气时意守丹田，呼气时腹部收缩。",
    mindFocus: "意守丹田，感受丹田温热充实。",
    precautions: [
      "高血压患者不宜闭气过久",
      "初学者闭气时间宜短",
      "意念不可过重",
      "出现头晕应立即停止"
    ]
  },
  // 武学功法
  {
    id: "xing-yi-quan",
    slug: "xing-yi-quan",
    name: "形意拳",
    alias: "心意六合拳",
    school: "武学",
    schools: ["武学", "道家"],
    stage: "炼精化气",
    stages: ["炼精化气", "炼气化神"],
    dimension: ["身", "气"],
    scene: ["晨课", "日常"],
    audience: ["进阶者"],
    type: "动静结合",
    effects: ["内外兼修", "强筋健骨", "培育元气"],
    difficulty: 4,
    duration: "30-60分钟",
    riskLevel: "safe",
    description: "形意拳是内家三大拳之一，以'心意诚于中，肢体形于外'为要义，通过五行拳和十二形锻炼整劲和内气。",
    history: "相传为岳飞所创，经姬际可、戴龙邦、李洛能等传承发展，形成完整的内家拳体系。",
    steps: [
      "三体式：形意拳基本桩功，锻炼下盘和整劲",
      "劈拳：属金，养肺，如斧劈物",
      "崩拳：属木，养肝，如箭穿物",
      "钻拳：属水，养肾，如水流泉",
      "炮拳：属火，养心，如炮发弹",
      "横拳：属土，养脾，如土载物"
    ],
    interpretations: {
      "武学": "内家三大拳之一，整劲训练",
      "道家": "五行生克，天人合一",
      "中医": "五行对应五脏，调理脏腑"
    }
  },
  {
    id: "ba-gua-zhang",
    slug: "ba-gua-zhang",
    name: "八卦掌",
    alias: "游身八卦掌",
    school: "武学",
    schools: ["武学", "道家"],
    stage: "炼气化神",
    stages: ["炼气化神"],
    dimension: ["身", "气", "神"],
    scene: ["晨课", "动中"],
    audience: ["进阶者"],
    type: "动静结合",
    effects: ["内外兼修", "身心合一", "疏通经络"],
    difficulty: 4,
    duration: "30-60分钟",
    riskLevel: "safe",
    description: "八卦掌是内家三大拳之一，以走转为特点，'以掌为法，以走为用'，在 circular 运动中培养气机和整劲。",
    history: "由董海川创于清代，融合道家修炼和武术技击，以八卦图为理论基础。",
    steps: [
      "走圈：沿圆走转，培养气机和平衡",
      "单换掌：基本掌法，转换阴阳",
      "双换掌：双手配合，阴阳互济",
      "顺势掌：顺势而为，不顶不丢",
      "背身掌：转身换势，灵活多变",
      "老八掌：八卦掌核心八式"
    ],
    interpretations: {
      "武学": "内家三大拳之一，走转训练",
      "道家": "八卦生克，阴阳转换",
      "中医": "疏通经络，调和气血"
    }
  },
  {
    id: "da-wu",
    slug: "da-wu",
    name: "大舞",
    alias: "导引大舞",
    school: "武学",
    schools: ["武学", "中医"],
    stage: "炼形化精",
    stages: ["炼形化精"],
    dimension: ["身"],
    scene: ["晨课", "日常"],
    audience: ["初学者", "所有人"],
    type: "动功",
    effects: ["舒筋活络", "调理脏腑", "强身健体"],
    difficulty: 2,
    duration: "15-25分钟",
    riskLevel: "safe",
    description: "大舞是健身气功的一种，动作舒展大方，如舞蹈般优美，通过脊柱的屈伸旋转调理五脏六腑。",
    steps: [
      "昂首势：抬头挺胸，舒展胸肺",
      "开胯势：开胯展臂，疏通肝胆",
      "抻腰势：前屈后仰，强肾固腰",
      "震体势：震动全身，疏通经络",
      "揉脊势：脊柱旋转，调理脏腑",
      "摆尾势：摆尾摇头，去心火",
      "收势：气归丹田，静养收功"
    ]
  },
  // 瑜伽功法
  {
    id: "surya-namaskar",
    slug: "surya-namaskar",
    name: "拜日式",
    alias: "Surya Namaskar",
    school: "瑜伽",
    schools: ["瑜伽"],
    stage: "炼形化精",
    stages: ["炼形化精", "炼精化气"],
    dimension: ["身", "气"],
    scene: ["晨课"],
    audience: ["初学者", "所有人"],
    type: "动功",
    effects: ["强身健体", "疏通经络", "提升能量"],
    difficulty: 2,
    duration: "10-20分钟",
    riskLevel: "safe",
    description: "拜日式是瑜伽最经典的序列练习，通过12个连贯的体式向太阳致敬，激活全身能量，是瑜伽入门的最佳功法。",
    history: "源于古印度对太阳的崇拜，是哈他瑜伽中最经典的练习序列。",
    steps: [
      "祈祷式：双手合十，静心调息",
      "展臂式：双臂上举，脊柱伸展",
      "前屈式：折髋前屈，放松腰背",
      "骑马式：右腿后撤，拉伸髋部",
      "斜板式：平板支撑，核心稳定",
      "八体投地：屈肘下沉，谦卑臣服",
      "眼镜蛇式：脊柱后弯，打开心轮",
      "下犬式：倒V字形，拉伸全身",
      "骑马式：左腿后撤，拉伸髋部",
      "前屈式：折髋前屈，放松腰背",
      "展臂式：双臂上举，脊柱伸展",
      "祈祷式：双手合十，回归中心"
    ],
    breathing: "每个动作配合一次呼吸，吸气伸展，呼气折叠。",
    interpretations: {
      "瑜伽": "向太阳致敬，激活能量",
      "道家": "类似导引，疏通经络",
      "现代": "全身运动，激活代谢"
    }
  },
  {
    id: "kriya-yoga",
    slug: "kriya-yoga",
    name: "克利亚瑜伽",
    alias: "Kriya Yoga",
    school: "瑜伽",
    schools: ["瑜伽"],
    stage: "炼气化神",
    stages: ["炼气化神", "炼神返虚"],
    dimension: ["气", "神"],
    scene: ["静中", "晨课"],
    audience: ["进阶者"],
    type: "心法",
    effects: ["提升觉知", "净化身心", "提升能量"],
    difficulty: 5,
    duration: "30-60分钟",
    riskLevel: "guided",
    description: "克利亚瑜伽是瑜伽中的高级修法，通过特定的呼吸和能量控制技巧，快速提升意识，是尤迦南达大师推广至西方的核心法门。",
    history: "由巴巴吉大师传授给拉希里·玛哈赛亚，经尤迦南达大师在《一个瑜伽行者的自传》中推广至全世界。",
    steps: [
      "准备：静坐调息，身心放松",
      "能量提升：通过特定呼吸法提升能量",
      "脉轮净化：净化七个脉轮的能量通道",
      "克利亚：核心技法，需上师传授",
      "冥想：深入冥想，与宇宙意识合一",
      "收功：将能量收回，归于中心"
    ],
    precautions: [
      "必须在合格上师指导下修习",
      "不可自学或从书本学习",
      "修习前需要净化身心",
      "需要发誓保密"
    ]
  },
  {
    id: "yoga-nidra",
    slug: "yoga-nidra",
    name: "瑜伽睡眠",
    alias: "Yoga Nidra",
    school: "瑜伽",
    schools: ["瑜伽", "现代"],
    stage: "炼形化精",
    stages: ["炼形化精", "炼精化气"],
    dimension: ["心", "神"],
    scene: ["睡前", "午休"],
    audience: ["初学者", "所有人"],
    type: "静功",
    effects: ["减压放松", "宁心安神", "提升觉知"],
    difficulty: 1,
    duration: "20-45分钟",
    riskLevel: "safe",
    description: "瑜伽睡眠是一种深度放松和冥想的方法，在保持觉知的状态下进入深度放松，相当于数小时的睡眠效果。",
    history: "源于密宗瑜伽的nyasa修法，由斯瓦米·萨蒂亚南达系统化推广。",
    steps: [
      "准备：平躺，盖薄毯，闭眼放松",
      "发愿：设定一个积极的意图",
      "身体扫描：依次觉知身体各部位",
      "呼吸觉知：观察自然呼吸",
      "情绪观察：观察情绪而不卷入",
      "意象引导：跟随引导进入深度放松",
      "回归：慢慢回到清醒状态"
    ],
    interpretations: {
      "瑜伽": "有意识睡眠，深度放松",
      "现代": "深度放松疗法，改善睡眠",
      "佛家": "类似身体扫描，培养觉知"
    }
  },
  // 现代功法
  {
    id: "body-scan",
    slug: "body-scan",
    name: "身体扫描",
    alias: "Body Scan",
    school: "现代",
    schools: ["现代", "佛家"],
    stage: "炼形化精",
    stages: ["炼形化精"],
    dimension: ["身", "心"],
    scene: ["睡前", "日常"],
    audience: ["初学者", "所有人"],
    type: "静功",
    effects: ["减压放松", "提升觉知", "情绪调节"],
    difficulty: 1,
    duration: "20-45分钟",
    riskLevel: "safe",
    description: "身体扫描是正念减压疗法（MBSR）的核心练习，通过系统性地觉知身体各部位的感受，培养身心连接和放松能力。",
    history: "由乔·卡巴金博士在MBSR课程中系统开发，有广泛的科学研究支持。",
    steps: [
      "平躺或端坐，闭眼放松",
      "将注意力放在脚底，感受脚底与地面的接触",
      "依次向上扫描：小腿、膝盖、大腿、臀部",
      "继续向上：腹部、胸部、背部",
      "再向上：双手、手臂、肩膀",
      "最后：颈部、面部、头顶",
      "观察每个部位的感受，不评判"
    ],
    interpretations: {
      "现代": "正念减压核心练习",
      "佛家": "身念处的现代化",
      "中医": "感知身体，了解自身"
    }
  },
  {
    id: "progressive-relaxation",
    slug: "progressive-relaxation",
    name: "渐进式肌肉放松",
    alias: "PMR",
    school: "现代",
    schools: ["现代"],
    stage: "炼形化精",
    stages: ["炼形化精"],
    dimension: ["身"],
    scene: ["睡前", "日常"],
    audience: ["初学者", "所有人"],
    type: "静功",
    effects: ["减压放松", "宁心安神", "情绪调节"],
    difficulty: 1,
    duration: "15-30分钟",
    riskLevel: "safe",
    description: "渐进式肌肉放松是由雅各布森博士开发的方法，通过有意识地紧张和放松各组肌肉，达到深度放松的效果。",
    history: "1920年代由美国医生埃德蒙·雅各布森开发，是西方最经典的放松技术之一。",
    steps: [
      "双手：握拳紧张5秒，然后放松",
      "前臂：屈腕紧张5秒，然后放松",
      "上臂：屈肘紧张5秒，然后放松",
      "面部：皱眉紧张5秒，然后放松",
      "颈部：头后仰紧张5秒，然后放松",
      "胸部：深吸气紧张5秒，然后放松",
      "腹部：收腹紧张5秒，然后放松",
      "腿部：依次紧张和放松大腿、小腿、脚部"
    ]
  },
  {
    id: "breathwork",
    slug: "breathwork",
    name: "呼吸工作法",
    alias: "Rebirthing",
    school: "现代",
    schools: ["现代", "瑜伽"],
    stage: "炼精化气",
    stages: ["炼精化气"],
    dimension: ["气"],
    scene: ["静中"],
    audience: ["进阶者"],
    type: "静功",
    effects: ["净化身心", "提升能量", "情绪释放"],
    difficulty: 3,
    duration: "30-60分钟",
    riskLevel: "caution",
    description: "呼吸工作法是一种通过特定呼吸模式来释放深层情绪和创伤的现代疗愈方法，能快速激活能量系统。",
    history: "由伦纳德·奥尔在1970年代开发，结合瑜伽呼吸法和现代心理学。",
    steps: [
      "仰卧，放松全身",
      "通过鼻子进行连续不断的深呼吸",
      "吸气饱满，呼气自然，不憋气",
      "保持连续呼吸，不中断",
      "允许情绪和感受自然浮现",
      "持续30-60分钟",
      "结束后静养休息"
    ],
    precautions: [
      "有心脏病或高血压者需谨慎",
      "孕妇不宜练习",
      "建议在专业指导下进行",
      "可能出现强烈情绪反应"
    ]
  },
  // 高阶心法
  {
    id: "tai-xu",
    slug: "tai-xu",
    name: "太虚凝神法",
    alias: "虚空凝神",
    school: "道家",
    schools: ["道家", "佛家"],
    stage: "炼神返虚",
    stages: ["炼神返虚"],
    dimension: ["神"],
    scene: ["静中"],
    audience: ["进阶者"],
    type: "心法",
    effects: ["提升觉知", "身心合一", "净化身心"],
    difficulty: 5,
    duration: "60分钟以上",
    riskLevel: "guided",
    description: "太虚凝神法是炼神返虚阶段的核心心法，将意识融入太虚，与道合一，是凡真体系炼神返虚阶段的主修心法之一。",
    steps: [
      "静坐调息，身心放松",
      "观想自身融入虚空",
      "意识扩展，无边无际",
      "不执于形，不执于神",
      "与太虚合一，无为而为",
      "自然收功，归于平常"
    ],
    mindFocus: "无念无想，只是觉知。不缘外境，不缘内境，只是'知道'。",
    precautions: [
      "必须在炼气化神圆满后修习",
      "需要明师指导",
      "不可追求境界",
      "不可执着于'合一'的体验"
    ],
    fanzhenExperience: "凡真子体验：'太虚凝神不是'我'在凝神，而是凝在发生。不是'我'融入太虚，而是本来就在太虚中。'"
  },
  {
    id: "ci-bei-xin",
    slug: "ci-bei-xin",
    name: "慈悲心法",
    alias: "慈心禅",
    school: "佛家",
    schools: ["佛家", "儒家"],
    stage: "炼神返虚",
    stages: ["炼神返虚"],
    dimension: ["心", "神"],
    scene: ["静中", "日常"],
    audience: ["进阶者"],
    type: "心法",
    effects: ["情绪调节", "宁心安神", "身心合一"],
    difficulty: 3,
    duration: "20-40分钟",
    riskLevel: "safe",
    description: "慈悲心法（慈心禅）是佛家培养慈悲心的核心方法，通过向自己和他人发送祝福，打开心扉，培养无条件的爱。",
    history: "源于佛陀教导，在《慈经》中有详细记载，是南传佛教和北传佛教共修的法门。",
    steps: [
      "静坐调息，身心放松",
      "向自己发送慈心：愿我平安，愿我快乐",
      "向亲人发送慈心：愿你平安，愿你快乐",
      "向中性人发送慈心：愿你平安，愿你快乐",
      "向不喜欢的人发送慈心：愿你平安，愿你快乐",
      "向一切众生发送慈心：愿众生平安，愿众生快乐"
    ],
    mindFocus: "感受心中的温暖和开放，让慈悲自然流露。",
    interpretations: {
      "佛家": "四无量心之慈心，培养慈悲",
      "儒家": "仁者爱人，推己及人",
      "道家": "道法自然，万物一体"
    }
  }
];

export function getGongfaBySlug(slug: string): Gongfa | undefined {
  return gongfaList.find(g => g.slug === slug);
}

export function getAllSlugs(): string[] {
  return gongfaList.map(g => g.slug);
}

export function getGongfaByStage(stage: string): Gongfa[] {
  return gongfaList.filter(g => g.stages.includes(stage));
}

export function getGongfaBySchool(school: string): Gongfa[] {
  return gongfaList.filter(g => g.schools.includes(school));
}
