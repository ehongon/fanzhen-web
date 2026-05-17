"use client";

import { motion } from "framer-motion";
import { Flame, Wind, Droplets, Sun, Moon, Mountain } from "lucide-react";

interface Gongfa {
  id: number;
  name: string;
  description: string;
  effects: string[];
  stage: string;
  difficulty: string;
  icon: React.ElementType;
  gradient: string;
}

const gongfas: Gongfa[] = [
  {
    id: 1,
    name: "八段锦",
    description: "传统导引养生功法，通过八个动作调理脏腑、疏通经络",
    effects: ["强身健体", "疏通经络", "调理气血"],
    stage: "炼形化精",
    difficulty: "入门",
    icon: Flame,
    gradient: "from-cinnabar/20 to-cinnabar/5",
  },
  {
    id: 2,
    name: "六字诀",
    description: "以嘘、呵、呼、呬、吹、嘻六字吐纳，调理五脏六腑",
    effects: ["脏腑调理", "呼吸深化", "精气凝聚"],
    stage: "炼形化精",
    difficulty: "入门",
    icon: Wind,
    gradient: "from-amber-500/20 to-amber-500/5",
  },
  {
    id: 3,
    name: "小周天功",
    description: "引导内气沿任督二脉循环运行，打通小周天",
    effects: ["经脉贯通", "内气运行", "周天循环"],
    stage: "炼精化气",
    difficulty: "进阶",
    icon: Droplets,
    gradient: "from-sky-400/20 to-sky-400/5",
  },
  {
    id: 4,
    name: "站桩功",
    description: "静立调息，培养内气，稳固下盘根基",
    effects: ["培元固本", "内气凝聚", "根基稳固"],
    stage: "炼精化气",
    difficulty: "进阶",
    icon: Mountain,
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: 5,
    name: "凝神入炁穴",
    description: "将意识集中于丹田，实现神气合一",
    effects: ["神识觉醒", "神气合一", "灵觉开发"],
    stage: "炼气化神",
    difficulty: "高级",
    icon: Sun,
    gradient: "from-gold/20 to-gold/5",
  },
  {
    id: 6,
    name: "胎息法",
    description: "模拟胎儿呼吸，达到息停脉住的深层入定状态",
    effects: ["虚空入定", "天人合一", "返璞归真"],
    stage: "炼神返虚",
    difficulty: "大师",
    icon: Moon,
    gradient: "from-violet-400/20 to-violet-400/5",
  },
];

const difficultyColors: Record<string, string> = {
  入门: "bg-emerald-500/20 text-emerald-400",
  进阶: "bg-sky-500/20 text-sky-400",
  高级: "bg-amber-500/20 text-amber-400",
  大师: "bg-violet-500/20 text-violet-400",
};

const stageColors: Record<string, string> = {
  炼形化精: "text-cinnabar",
  炼精化气: "text-amber-500",
  炼气化神: "text-sky-400",
  炼神返虚: "text-gold",
};

function GongfaCard({ gongfa, index }: { gongfa: Gongfa; index: number }) {
  const Icon = gongfa.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative h-full bg-ink-light/50 backdrop-blur-sm rounded-2xl border border-gold/10 overflow-hidden transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-xl group-hover:shadow-gold/5">
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gongfa.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gongfa.gradient} flex items-center justify-center`}
            >
              <Icon className="w-6 h-6 text-gold" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full ${difficultyColors[gongfa.difficulty]}`}
              >
                {gongfa.difficulty}
              </span>
              <span className={`text-xs ${stageColors[gongfa.stage]}`}>
                {gongfa.stage}
              </span>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-lg font-serif-cn font-bold text-rice mb-2 group-hover:text-gold transition-colors duration-300">
            {gongfa.name}
          </h3>
          <p className="text-sm text-rice/50 leading-relaxed mb-4">
            {gongfa.description}
          </p>

          {/* Effects tags */}
          <div className="flex flex-wrap gap-2">
            {gongfa.effects.map((effect) => (
              <span
                key={effect}
                className="text-xs px-2.5 py-1 rounded-md bg-gold/5 text-gold/70 border border-gold/10"
              >
                {effect}
              </span>
            ))}
          </div>
        </div>

        {/* Hover shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );
}

export default function GongfaCards() {
  return (
    <section className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif-cn font-bold text-rice mb-4">
            推荐功法
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
          <p className="text-rice/50 text-sm md:text-base max-w-md mx-auto">
            精选六大经典功法，助你踏上修炼之路
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gongfas.map((gongfa, index) => (
            <GongfaCard key={gongfa.id} gongfa={gongfa} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="/gongfa"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 rounded-full text-sm transition-colors duration-300"
          >
            浏览全部功法
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
