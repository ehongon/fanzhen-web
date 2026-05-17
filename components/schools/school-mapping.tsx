"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import type { CultivationLevel } from "@/lib/schools-data";

interface SchoolMappingProps {
  levels: CultivationLevel[];
  color: string;
}

export default function SchoolMapping({ levels, color }: SchoolMappingProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-xl border bg-white/80 shadow-sm">
        <thead>
          <tr className="bg-muted/30">
            <th className="border p-4 text-left font-serif text-sm font-bold text-charcoal">
              层次
            </th>
            <th className="border p-4 text-left font-serif text-sm font-bold text-charcoal">
              名称
            </th>
            <th className="border p-4 text-left font-serif text-sm font-bold text-charcoal">
              描述
            </th>
            <th className="border p-4 text-left font-serif text-sm font-bold text-charcoal">
              凡真对应
            </th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="transition-colors hover:bg-muted/10"
            >
              <td className="border p-4">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {level.level}
                </div>
              </td>
              <td className="border p-4">
                <span className="font-serif text-base font-bold" style={{ color }}>
                  {level.name}
                </span>
              </td>
              <td className="border p-4 text-sm text-muted-foreground">
                {level.description}
              </td>
              <td className="border p-4">
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${color}12`,
                    color: color,
                  }}
                >
                  <Layers className="h-3 w-3" />
                  {level.fanzhenMapping}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
