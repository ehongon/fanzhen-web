"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  type SchoolMapping,
  SCHOOL_NAMES,
  SCHOOL_COLORS,
  type SchoolKey,
} from "@/lib/system-overview-data";
import { BookOpen, Info } from "lucide-react";

interface SchoolMappingProps {
  mappings: SchoolMapping[];
}

export default function SchoolMapping({ mappings }: SchoolMappingProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    stage: string;
    school: SchoolKey;
  } | null>(null);

  const schools: SchoolKey[] = ["dao", "fo", "ru", "yi", "wu", "yujia", "kexue"];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
            各体系对应表
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            儒释道医武艺各家之法，在四阶段中各有对应，殊途同归
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cinnabar/60" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl border bg-card shadow-card">
            <thead>
              <tr className="bg-muted/50">
                <th className="border p-4 text-left font-serif text-sm font-bold">
                  修炼阶段
                </th>
                {schools.map((school) => (
                  <th
                    key={school}
                    className="border p-4 text-center font-serif text-sm font-bold"
                    style={{ color: SCHOOL_COLORS[school] }}
                  >
                    {SCHOOL_NAMES[school]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mappings.map((mapping, index) => (
                <motion.tr
                  key={mapping.stage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="transition-colors hover:bg-muted/20"
                >
                  <td className="border p-4">
                    <div className="font-serif text-base font-bold">
                      {mapping.stageName}
                    </div>
                  </td>
                  {schools.map((school) => {
                    const data = mapping.mappings[school];
                    const isHovered =
                      hoveredCell?.stage === mapping.stage &&
                      hoveredCell?.school === school;

                    return (
                      <td
                        key={school}
                        className="relative border p-4"
                        onMouseEnter={() =>
                          setHoveredCell({ stage: mapping.stage, school })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div
                          className="mb-1 text-sm font-bold"
                          style={{ color: SCHOOL_COLORS[school] }}
                        >
                          {data.coreMethod}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {data.detail}
                        </div>

                        {/* 悬停详情 */}
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute left-0 top-full z-50 w-72 rounded-xl border bg-white p-4 shadow-card-hover"
                            style={{
                              borderColor: `${SCHOOL_COLORS[school]}30`,
                            }}
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <BookOpen
                                className="h-4 w-4"
                                style={{ color: SCHOOL_COLORS[school] }}
                              />
                              <span
                                className="text-sm font-bold"
                                style={{ color: SCHOOL_COLORS[school] }}
                              >
                                {SCHOOL_NAMES[school]} · {mapping.stageName}
                              </span>
                            </div>
                            <p className="mb-2 text-sm">{data.detail}</p>
                            <div className="rounded-lg bg-muted/40 p-2">
                              <div className="mb-1 text-xs font-medium text-muted-foreground">
                                核心方法
                              </div>
                              <p className="text-sm font-medium">
                                {data.coreMethod}
                              </p>
                            </div>
                            <div className="mt-2 rounded-lg bg-muted/40 p-2">
                              <div className="mb-1 text-xs font-medium text-muted-foreground">
                                经典参考
                              </div>
                              <p className="text-sm">{data.classic}</p>
                            </div>
                          </motion.div>
                        )}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>悬停在单元格上查看详细说明和经典参考</span>
        </div>
      </div>
    </section>
  );
}
