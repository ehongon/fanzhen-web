"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { compareData, SCHOOL_COLORS, type SchoolId } from "@/lib/schools-data";

const schoolOrder: SchoolId[] = ["dao", "fo", "ru", "yi", "wu", "yujia", "qita"];

export default function CompareTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-xl border bg-white/80 shadow-sm">
        <thead>
          <tr className="bg-muted/30">
            <th className="border p-4 text-left font-serif text-sm font-bold text-charcoal">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-cinnabar" />
                对比维度
              </div>
            </th>
            {schoolOrder.map((id) => (
              <th
                key={id}
                className="border p-4 text-center font-serif text-sm font-bold"
                style={{ color: SCHOOL_COLORS[id].main }}
              >
                {id === "qita" ? "其他" : `${id === "yi" ? "中" : id === "wu" ? "武" : id === "ru" ? "儒" : id === "fo" ? "佛" : id === "dao" ? "道" : "瑜"}家`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compareData.map((row, index) => (
            <motion.tr
              key={row.dimension}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="transition-colors hover:bg-muted/10"
            >
              <td className="border p-4 font-medium text-charcoal">
                {row.dimension}
              </td>
              {schoolOrder.map((id) => (
                <td
                  key={id}
                  className="border p-4 text-center text-sm text-muted-foreground"
                >
                  <span
                    className="inline-block rounded-lg px-2 py-1"
                    style={{
                      backgroundColor: `${SCHOOL_COLORS[id].main}08`,
                    }}
                  >
                    {row[id]}
                  </span>
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
