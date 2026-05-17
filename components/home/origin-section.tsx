"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CircleDot,
  CloudSun,
  BookOpen,
  Users,
  Calendar,
  MapPin,
  Heart,
  Quote,
  Sparkles,
} from "lucide-react";

// YinYang icon not in lucide-react, use a custom SVG
const YinYangIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20"/>
    <circle cx="12" cy="7" r="2"/>
    <circle cx="12" cy="17" r="2" fill="currentColor"/>
  </svg>
);
import ScrollReveal from "@/components/effects/scroll-reveal";
import {
  timelineEvents,
  coreConcepts,
  systemFeatures,
  statistics,
  fanzhenProfile as laoCaoProfile,
  originalIntention,
  messageToPractitioners,
  phaseColors,
  type TimelineEvent,
} from "@/lib/origin-data";
import { cn } from "@/lib/utils";

// 图标映射
const iconMap: Record<string, React.ElementType> = {
  YinYang: YinYangIcon,
  CircleDot,
  CloudSun,
};

// 阶段标签映射
const phaseLabels: Record<TimelineEvent["phase"], string> = {
  struggle: "困境",
  begin: "起步",
  growth: "成长",
  breakthrough: "突破",
  integration: "整合",
  creation: "创立",
};

// 数字动画组件
function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value, 10);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeOut * numericValue));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? displayValue.toLocaleString() : "0"}
      {suffix}
    </span>
  );
}

// 时间线节点组件
function TimelineNode({
  event,
  index,
  isLast,
}: {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = phaseColors[event.phase];
  const Icon =
    event.phase === "struggle"
      ? Heart
      : event.phase === "begin"
      ? Sparkles
      : event.phase === "growth"
      ? Calendar
      : event.phase === "breakthrough"
      ? BookOpen
      : event.phase === "integration"
      ? Users
      : MapPin;

  return (
    <ScrollReveal delay={index * 100} duration={600} direction="left" distance={20}>
      <div className="relative flex gap-4 group">
        {/* 时间节点竖线 */}
        <div className="flex flex-col items-center">
          {/* 节点圆圈 */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer",
              colors.bg,
              colors.border,
              isExpanded && "shadow-lg"
            )}
            style={
              isExpanded
                ? { boxShadow: `0 0 15px ${colors.glow}` }
                : {}
            }
          >
            <Icon className={cn("w-4 h-4", colors.text)} />
            {isExpanded && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `2px solid ${colors.glow}` }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </motion.button>
          {/* 竖线 */}
          {!isLast && (
            <div className="w-px flex-1 bg-gradient-to-b from-gold/30 to-gold/5 mt-2" />
          )}
        </div>

        {/* 内容 */}
        <div className={cn("flex-1 pb-8", !isLast && "pb-8")}>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-sm font-bold", colors.text)}>
              {event.year}
            </span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                colors.bg,
                colors.border,
                colors.text
              )}
            >
              {phaseLabels[event.phase]}
            </span>
          </div>
          <h4 className="text-rice font-serif-cn font-bold text-base mb-1 group-hover:text-gold transition-colors">
            {event.title}
          </h4>
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-rice/50 text-sm leading-relaxed overflow-hidden"
              >
                {event.description}
              </motion.p>
            )}
          </AnimatePresence>
          {!isExpanded && (
            <p className="text-rice/40 text-xs line-clamp-1">{event.description}</p>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

// 核心理念卡片
function ConceptCard({
  concept,
  index,
}: {
  concept: (typeof coreConcepts)[0];
  index: number;
}) {
  const Icon = iconMap[concept.icon] || CircleDot;

  return (
    <ScrollReveal delay={index * 150} duration={600} direction="up" distance={20}>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 0 25px rgba(212, 165, 116, 0.15)" }}
        className="relative p-6 rounded-xl bg-ink-light/50 border border-gold/10 hover:border-gold/30 transition-all duration-300 group"
      >
        {/* 装饰角 */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20 rounded-tl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20 rounded-br-xl" />

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
            <Icon className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h4 className="text-rice font-serif-cn font-bold text-lg mb-1">
              {concept.title}
            </h4>
            <p className="text-gold/70 text-xs mb-2">{concept.subtitle}</p>
            <p className="text-rice/50 text-sm leading-relaxed">
              {concept.description}
            </p>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

// 特点标签
function FeatureItem({
  feature,
  index,
}: {
  feature: (typeof systemFeatures)[0];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 100} duration={500} direction="right" distance={15}>
      <motion.div
        whileHover={{ x: 5 }}
        className="flex items-start gap-3 p-4 rounded-lg bg-ink-light/30 border border-gold/5 hover:border-gold/20 transition-all duration-300"
      >
        <div className="w-2 h-2 rounded-full bg-gold/50 mt-2 flex-shrink-0" />
        <div>
          <h5 className="text-rice/80 font-medium text-sm mb-1">{feature.title}</h5>
          <p className="text-rice/40 text-xs leading-relaxed">{feature.description}</p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

// 统计卡片
function StatCard({
  stat,
  index,
}: {
  stat: (typeof statistics)[0];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 100} duration={600} direction="up" distance={20}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-center p-6"
      >
        <div className="text-3xl md:text-4xl font-serif-cn font-bold text-gold mb-2">
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
        </div>
        <div className="text-rice/50 text-sm">{stat.label}</div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function OriginSection() {
  return (
    <section className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
      </div>

      {/* 装饰光晕 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cinnabar/5 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <ScrollReveal duration={600} direction="up" distance={20}>
          <div className="text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-gold/60 text-sm tracking-[0.3em] uppercase">
                Origin
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-cn font-bold text-rice mb-4">
              缘起
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
            <p className="text-rice/50 text-sm md:text-base max-w-md mx-auto">
              凡真之路，始于足下
            </p>
          </div>
        </ScrollReveal>

        {/* 凡真子简介 */}
        <ScrollReveal duration={600} direction="up" distance={20}>
          <div className="max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="relative p-8 md:p-10 rounded-2xl bg-ink-light/40 border border-gold/10">
              {/* 引号装饰 */}
              <Quote className="absolute top-4 left-4 w-8 h-8 text-gold/20" />
              <Quote className="absolute bottom-4 right-4 w-8 h-8 text-gold/20 rotate-180" />

              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-serif-cn font-bold text-rice mb-2">
                  {laoCaoProfile.name}
                </h3>
                <p className="text-gold/70 text-sm mb-6">{laoCaoProfile.title}</p>
                <p className="text-rice/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                  {laoCaoProfile.description}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 主内容区域 - 左右布局 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* 左侧：修炼时间线 */}
          <div>
            <ScrollReveal duration={600} direction="up" distance={20}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif-cn font-bold text-rice">
                  修炼历程
                </h3>
              </div>
            </ScrollReveal>

            <div className="pl-2">
              {timelineEvents.map((event, index) => (
                <TimelineNode
                  key={event.year}
                  event={event}
                  index={index}
                  isLast={index === timelineEvents.length - 1}
                />
              ))}
            </div>
          </div>

          {/* 右侧：初心与理念 */}
          <div className="space-y-10">
            {/* 核心理念 */}
            <div>
              <ScrollReveal duration={600} direction="up" distance={20}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif-cn font-bold text-rice">
                    核心理念
                  </h3>
                </div>
              </ScrollReveal>
              <div className="space-y-4">
                {coreConcepts.map((concept, index) => (
                  <ConceptCard key={concept.id} concept={concept} index={index} />
                ))}
              </div>
            </div>

            {/* 初心宣言 */}
            <div>
              <ScrollReveal duration={600} direction="up" distance={20}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif-cn font-bold text-rice">
                    {originalIntention.title}
                  </h3>
                </div>
              </ScrollReveal>
              <div className="p-6 rounded-xl bg-ink-light/40 border border-gold/10">
                <ul className="space-y-3">
                  {originalIntention.content.map((item, index) => (
                    <ScrollReveal
                      key={index}
                      delay={index * 100}
                      duration={500}
                      direction="right"
                      distance={15}
                    >
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-cinnabar/60 mt-2 flex-shrink-0" />
                        <span className="text-rice/60 text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </div>

            {/* 体系特点 */}
            <div>
              <ScrollReveal duration={600} direction="up" distance={20}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif-cn font-bold text-rice">
                    凡真体系特点
                  </h3>
                </div>
              </ScrollReveal>
              <div className="space-y-3">
                {systemFeatures.map((feature, index) => (
                  <FeatureItem key={feature.id} feature={feature} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 寄语 */}
        <ScrollReveal duration={600} direction="up" distance={20}>
          <div className="max-w-4xl mx-auto mb-16 md:mb-20">
            <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-ink-light/60 to-ink-light/30 border border-gold/15">
              {/* 装饰线 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-serif-cn font-bold text-gold mb-6">
                  {messageToPractitioners.title}
                </h3>
                <p className="text-rice/60 text-sm md:text-base leading-relaxed max-w-3xl mx-auto italic">
                  &ldquo;{messageToPractitioners.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="w-8 h-px bg-gold/30" />
                  <span className="text-gold/50 text-xs">凡真子</span>
                  <div className="w-8 h-px bg-gold/30" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 底部数据统计 */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-12">
            {statistics.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
