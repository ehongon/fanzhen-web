"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 折线图数据点
interface LineChartPoint {
  label: string;
  value: number;
}

// 饼图数据段
interface PieChartSegment {
  label: string;
  value: number;
  color: string;
}

interface ProgressChartProps {
  type: "line" | "pie" | "bar";
  title: string;
  data: LineChartPoint[] | PieChartSegment[];
  className?: string;
  delay?: number;
}

// SVG 折线图组件
function LineChart({ data, delay = 0 }: { data: LineChartPoint[]; delay?: number }) {
  const points = data as LineChartPoint[];
  const maxValue = Math.max(...points.map((p) => p.value));
  const minValue = Math.min(...points.map((p) => p.value));
  const range = maxValue - minValue || 1;

  const width = 400;
  const height = 160;
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) =>
    padding.left + (index / (points.length - 1)) * chartWidth;
  const getY = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p.value)}`)
    .join(" ");

  const areaD = `${pathD} L ${getX(points.length - 1)} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className="w-full"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 网格线 */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding.top + (i / 4) * chartHeight;
          return (
            <line
              key={i}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Y轴标签 */}
        {[0, 1, 2, 3, 4].map((i) => {
          const value = minValue + (range * (4 - i)) / 4;
          const y = padding.top + (i / 4) * chartHeight;
          return (
            <text
              key={i}
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              className="text-xs fill-muted-foreground"
              style={{ fontSize: "10px" }}
            >
              {Math.round(value)}
            </text>
          );
        })}

        {/* 面积填充 */}
        <motion.path
          d={areaD}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />

        {/* 折线 */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeInOut" }}
        />

        {/* 数据点 */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={getX(i)}
            cy={getY(p.value)}
            r="4"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.5 + i * 0.05 }}
          />
        ))}

        {/* X轴标签 */}
        {points.map((p, i) => {
          if (i % Math.ceil(points.length / 6) !== 0 && i !== points.length - 1)
            return null;
          return (
            <text
              key={i}
              x={getX(i)}
              y={height - 8}
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
              style={{ fontSize: "10px" }}
            >
              {p.label}
            </text>
          );
        })}

        {/* 渐变定义 */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.2"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// SVG 饼图组件
function PieChart({ data, delay = 0 }: { data: PieChartSegment[]; delay?: number }) {
  const segments = data as PieChartSegment[];
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  let currentAngle = -Math.PI / 2; // 从顶部开始

  const arcs = segments.map((segment) => {
    const angle = (segment.value / total) * Math.PI * 2;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;

    const pathD = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    return { ...segment, pathD, percentage: Math.round((segment.value / total) * 100) };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className="w-full flex flex-col items-center"
    >
      <svg viewBox="0 0 200 200" className="w-48 h-48">
        {arcs.map((arc, i) => (
          <motion.path
            key={i}
            d={arc.pathD}
            fill={arc.color}
            stroke="hsl(var(--card))"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay + i * 0.1 }}
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          />
        ))}
        {/* 中心白色圆 */}
        <circle
          cx={centerX}
          cy={centerY}
          r="45"
          fill="hsl(var(--card))"
        />
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          className="text-sm font-bold fill-foreground"
        >
          总计
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          className="text-lg font-bold fill-primary"
        >
          {total}h
        </text>
      </svg>

      {/* 图例 */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {arcs.map((arc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.5 + i * 0.1 }}
            className="flex items-center space-x-1.5"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: arc.color }}
            />
            <span className="text-xs text-muted-foreground">
              {arc.label} ({arc.percentage}%)
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// 进度条组件
function ProgressBar({ data, delay = 0 }: { data: PieChartSegment[]; delay?: number }) {
  const segments = data as PieChartSegment[];
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className="w-full space-y-4"
    >
      {segments.map((segment, i) => {
        const percentage = (segment.value / total) * 100;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">
                {segment.label}
              </span>
              <span className="text-sm text-muted-foreground">
                {segment.value} / {total} ({Math.round(percentage)}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: segment.color }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: delay + 0.3 + i * 0.15, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function ProgressChart({
  type,
  title,
  data,
  className,
  delay = 0,
}: ProgressChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-card rounded-xl border border-border/50 shadow-card p-5",
        className
      )}
    >
      <h3 className="font-serif-cn font-semibold text-lg text-foreground mb-4">
        {title}
      </h3>
      {type === "line" && <LineChart data={data as LineChartPoint[]} delay={delay} />}
      {type === "pie" && <PieChart data={data as PieChartSegment[]} delay={delay} />}
      {type === "bar" && <ProgressBar data={data as PieChartSegment[]} delay={delay} />}
    </motion.div>
  );
}
