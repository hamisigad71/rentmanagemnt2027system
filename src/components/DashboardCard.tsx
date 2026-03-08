import React from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "green" | "red" | "yellow" | "purple" | "pink";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

/* All "blue" and "green" variants now map to forest-green emerald tokens.
   Red keeps its semantic meaning (arrears, alerts).
   Yellow/amber kept for neutral metrics. */
const colorMap = {
  blue:   "text-[#1B5E45] bg-[#E8F5EE] border-[#C4D4C9]",
  green:  "text-[#1B5E45] bg-[#E8F5EE] border-[#C4D4C9]",
  red:    "text-[#FA0A12] bg-[#FA0A12]/10 border-[#FA0A12]/20",
  yellow: "text-amber-700 bg-amber-50 border-amber-200",
  purple: "text-[#1B5E45] bg-[#E8F5EE] border-[#C4D4C9]",
  pink:   "text-[#FA0A12] bg-[#FA0A12]/10 border-[#FA0A12]/20",
};

const gradientMap = {
  blue:   "from-[#3DBE7A]/15 to-transparent",
  green:  "from-[#3DBE7A]/15 to-transparent",
  red:    "from-[#FA0A12]/15 to-transparent",
  yellow: "from-amber-500/15 to-transparent",
  purple: "from-[#3DBE7A]/15 to-transparent",
  pink:   "from-[#FA0A12]/15 to-transparent",
};

const glowMap = {
  blue:   "bg-[#E8F5EE]",
  green:  "bg-[#E8F5EE]",
  red:    "bg-[#FA0A12]/10",
  yellow: "bg-amber-50",
  purple: "bg-[#E8F5EE]",
  pink:   "bg-[#FA0A12]/10",
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: DashboardCardProps) {
  return (
    <div
      className="group relative p-5 rounded-[var(--radius-card)] bg-[var(--color-card)] border border-[var(--color-border-light)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-modal)] transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full flex flex-col justify-between"
    >
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #246B4F 1px, transparent 0)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Hover glow blob */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000 ${glowMap[color]}`}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-[0.2em] truncate font-sans">
            {title}
          </p>
          <div className="flex flex-col">
            <span className="text-xl md:text-3xl font-normal text-[#1A1A1A] tracking-tight transition-transform duration-300 group-hover:scale-[1.02] origin-left break-words font-serif">
              {value}
            </span>
          </div>
        </div>

        <div
          className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border transition-all duration-700 group-hover:rotate-12 shadow-sm shrink-0 ${colorMap[color]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-end justify-between gap-4">
        <div className="flex-1">
          {trend ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              <div
                className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-black shrink-0 ${
                  trend.direction === "up"
                    ? "bg-[#E8F5EE] text-[#1B5E45] border border-[#C4D4C9]"
                    : "bg-[#FA0A12]/5 text-[#FA0A12] border border-[#FA0A12]/10"
                }`}
              >
                {trend.direction === "up" ? "↑" : "↓"} {trend.value}%
              </div>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">
                vs last period
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C4D4C9] animate-pulse" />
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest leading-none">
                Standard Metric
              </span>
            </div>
          )}
        </div>

        {/* Mini data horizon bars */}
        <div className="hidden sm:flex items-center gap-1 h-3 self-center">
          {[0.3, 0.6, 0.4, 0.9, 0.5].map((h, i) => (
            <div
              key={i}
              className={`w-0.5 rounded-full transition-all duration-700 ${glowMap[color]}`}
              style={{
                height: `${h * 100}%`,
                opacity: 0.3 + h * 0.5,
                backgroundColor:
                  color === "red" ? "#FA0A12" :
                  color === "yellow" ? "#d97706" :
                  "#3DBE7A",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom accent gradient line on hover */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${gradientMap[color]} w-0 group-hover:w-full transition-all duration-700 ease-out`}
      />
    </div>
  );
}
