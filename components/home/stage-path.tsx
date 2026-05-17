"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell,
  Wind,
  Brain,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/effects/scroll-reveal";
import { TextGlow } from "@/components/effects/glow-effect";

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

const stages: Stage[] = [
  {
    id: 1,
    title: "炼形化精",
    subtitle: "筑基阶段",
    description: "通过身体锻炼和呼吸调节，将形体转化为精气",
    details: [
      "基础体能训练",
      "呼吸法入门",
      "身体感知觉醒",
      "精气初步凝聚",
    ],
    icon: Dumbbell,
    color: "text-cinnabar",
    bgColor: "bg-cinnabar/10",
    borderColor: "border-cinnabar/30",
    glowColor: "rgba(199, 91, 57, 0.4)",
  },
  {
    id: 2,
    title: "炼精化气",
    subtitle: "行气阶段",
    description: "将精气转化为内气，贯通经脉",
    details: [
      "小周天运行",
      "经脉疏通",
      "内气凝聚",
      "气感深化",
    ],
    icon: Wind,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: 3,
    title: "炼气化神",
    subtitle: "凝神阶段",
    description: "将内气与神识融合，开启灵觉",
    details: [
      "神识觉醒",
      "灵觉开发",
      "气化神凝",
      "意识扩展",
    ],
    icon: Brain,
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
    borderColor: "border-sky-400/30",
    glowColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: 4,
    title: "炼神返虚",
    subtitle: "还虚阶段",
    description: "神识归于虚无，与道合一",
    details: [
      "虚空入定",
      "天人合一",
      "道法自然",
      "返璞归真",
    ],
    icon: Sparkles,
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
    glowColor: "rgba(212, 165, 116, 0.4)",
  },
];

// Pulse ring animation component
function PulseRing({ color, isActive }: { color: string; isActive: boolean }) {
  if (!isActive) return null;

  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${color}`,
        }}
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${color}`,
        }}
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
    </>
  );
}

function StageNode({
  stage,
  index,
  isActive,
  onHover,
}: {
  stage: Stage;
  index: number;
  isActive: boolean;
  onHover: (id: number | null) => void;
}) {
  const Icon = stage.icon;

  return (
    <ScrollReveal
      delay={index * 150}
      duration={600}
      direction="up"
      distance={30}
    >
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => onHover(stage.id)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Node circle */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
            isActive
              ? `${stage.bgColor} ${stage.borderColor} border-2 shadow-lg`
              : "bg-ink-light/50 border border-gold/20"
          }`}
          style={
            isActive
              ? {
                  boxShadow: `0 0 20px ${stage.glowColor}, 0 0 40px ${stage.glowColor.replace(
                    /[\d.]+\)$/,
                    "0.2)"
                  )}`,
                }
              : {}
          }
        >
          <Icon
            className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 ${
              isActive ? stage.color : "text-rice/40"
            }`}
          />

          {/* Pulse rings when active */}
          <PulseRing color={stage.glowColor} isActive={isActive} />

          {/* Inner glow */}
          {isActive && (
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle, ${stage.glowColor.replace(
                  /[\d.]+\)$/,
                  "0.3)"
                )} 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Stage number */}
          <motion.div
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isActive
                ? "bg-cinnabar text-rice"
                : "bg-ink-light text-rice/50"
            }`}
            animate={
              isActive
                ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      `0 0 0px ${stage.glowColor}`,
                      `0 0 8px ${stage.glowColor}`,
                      `0 0 0px ${stage.glowColor}`,
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stage.id}
          </motion.div>
        </motion.div>

        {/* Title */}
        <h3
          className={`mt-4 text-lg md:text-xl font-serif-cn font-bold transition-colors duration-300 ${
            isActive ? stage.color : "text-rice/70"
          }`}
        >
          {isActive ? (
            <TextGlow glowColor={stage.glowColor} glowIntensity={8}>
              {stage.title}
            </TextGlow>
          ) : (
            stage.title
          )}
        </h3>
        <p className="text-xs text-rice/40 mt-1">{stage.subtitle}</p>
      </div>
    </ScrollReveal>
  );
}

// Energy flow connecting line
function ConnectingLine({
  index,
  isActive,
  stageColor,
}: {
  index: number;
  isActive: boolean;
  stageColor: string;
}) {
  return (
    <ScrollReveal
      delay={index * 150 + 200}
      duration={500}
      direction="right"
      distance={20}
    >
      <div className="hidden md:flex items-center px-2">
        <div className="relative w-16 lg:w-24 h-px">
          {/* Background line */}
          <div className="absolute inset-0 bg-gold/10" />

          {/* Animated energy flow line */}
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{
              background: isActive
                ? `linear-gradient(to right, ${stageColor}60, ${stageColor})`
                : "linear-gradient(to right, rgba(212, 165, 116, 0.3), rgba(212, 165, 116, 0.6))",
            }}
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{
              delay: index * 0.2 + 0.5,
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          />

          {/* Dashed energy flow animation */}
          <motion.div
            className="absolute inset-y-0 left-0 w-full"
            style={{
              background: isActive
                ? `repeating-linear-gradient(to right, transparent, transparent 4px, ${stageColor}80 4px, ${stageColor}80 8px)`
                : "repeating-linear-gradient(to right, transparent, transparent 4px, rgba(212, 165, 116, 0.4) 4px, rgba(212, 165, 116, 0.4) 8px)",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "12px 0px"],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 + 1, duration: 0.3 }}
            viewport={{ once: true }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1"
          >
            <ArrowRight
              className="w-3 h-3"
              style={{ color: isActive ? stageColor : "rgba(212, 165, 116, 0.6)" }}
            />
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function DetailCard({ stage }: { stage: Stage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`absolute top-full mt-6 left-1/2 -translate-x-1/2 w-72 md:w-80 p-6 rounded-xl bg-ink-light/90 backdrop-blur-md border ${stage.borderColor} shadow-xl z-20`}
      style={{
        boxShadow: `0 0 20px ${stage.glowColor.replace(
          /[\d.]+\)$/,
          "0.1)"
        )}`,
      }}
    >
      <h4 className={`text-lg font-serif-cn font-bold ${stage.color} mb-2`}>
        {stage.title}
      </h4>
      <p className="text-sm text-rice/60 mb-4 leading-relaxed">
        {stage.description}
      </p>
      <ul className="space-y-2">
        {stage.details.map((detail, i) => (
          <motion.li
            key={detail}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center text-sm text-rice/50"
          >
            <motion.span
              className={`w-1.5 h-1.5 rounded-full ${stage.color.replace(
                "text-",
                "bg-"
              )} mr-3`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
            {detail}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function StagePath() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      </div>

      {/* Stage icons SVG background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/images/stage-icons.svg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal duration={600} direction="up" distance={20}>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-serif-cn font-bold text-rice mb-4">
              修炼四阶
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
            <p className="text-rice/50 text-sm md:text-base max-w-md mx-auto">
              从炼形到返虚，循序渐进，每一步都是生命的蜕变
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:flex items-start justify-center">
            {stages.map((stage, index) => (
              <div key={stage.id} className="relative flex items-start">
                <div className="relative">
                  <StageNode
                    stage={stage}
                    index={index}
                    isActive={activeStage === stage.id}
                    onHover={setActiveStage}
                  />
                  <AnimatePresence>
                    {activeStage === stage.id && (
                      <DetailCard stage={stage} />
                    )}
                  </AnimatePresence>
                </div>
                {index < stages.length - 1 && (
                  <ConnectingLine
                    index={index}
                    isActive={activeStage === stage.id}
                    stageColor={stage.glowColor.replace(/[\d.]+\)$/, "1)")}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden flex flex-col items-center space-y-8">
            {stages.map((stage, index) => (
              <div key={stage.id} className="relative flex flex-col items-center">
                <StageNode
                  stage={stage}
                  index={index}
                  isActive={activeStage === stage.id}
                  onHover={setActiveStage}
                />
                <AnimatePresence>
                  {activeStage === stage.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div
                        className={`w-72 p-5 rounded-xl bg-ink-light/90 border ${stage.borderColor}`}
                      >
                        <p className="text-sm text-rice/60 mb-3">
                          {stage.description}
                        </p>
                        <ul className="space-y-1.5">
                          {stage.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-center text-xs text-rice/50"
                            >
                              <span
                                className={`w-1 h-1 rounded-full ${stage.color.replace(
                                  "text-",
                                  "bg-"
                                )} mr-2`}
                              />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {index < stages.length - 1 && (
                  <ScrollReveal
                    delay={index * 150 + 300}
                    duration={500}
                    direction="down"
                    distance={15}
                  >
                    <div className="w-px h-8 bg-gradient-to-b from-gold/30 to-gold/10 mt-4" />
                  </ScrollReveal>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={400} duration={600} direction="up" distance={20}>
          <div className="text-center mt-16 md:mt-24">
            <motion.a
              href="/system"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 165, 116, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 rounded-full text-sm transition-colors duration-300"
            >
              查看完整修炼体系
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
