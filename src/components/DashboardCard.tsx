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

const colorClasses = {
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-[#FA0A12]/5 text-[#FA0A12] border-[#FA0A12]/20",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  pink: "bg-[#FA0A12]/5 text-[#FA0A12] border-[#FA0A12]/20",
};

const iconBgClasses = {
  blue: "bg-blue-100",
  green: "bg-green-100",
  red: "bg-[#FA0A12]/10",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  pink: "bg-[#FA0A12]/10",
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: DashboardCardProps) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-500/10 border-blue-500/20 glow-blue-500/10",
    green: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20 glow-emerald-500/10",
    red: "text-[#FA0A12] bg-[#FA0A12]/10 border-[#FA0A12]/20 glow-[#FA0A12]/10",
    yellow: "text-amber-600 bg-amber-500/10 border-amber-500/20 glow-amber-500/10",
    purple: "text-violet-600 bg-violet-500/10 border-violet-500/20 glow-violet-500/10",
    pink: "text-[#FA0A12] bg-[#FA0A12]/10 border-[#FA0A12]/20 glow-[#FA0A12]/10",
  };

  const gradientMap = {
    blue: "from-blue-500/20 to-transparent",
    green: "from-emerald-500/20 to-transparent",
    red: "from-[#FA0A12]/20 to-transparent",
    yellow: "from-amber-500/20 to-transparent",
    purple: "from-violet-500/20 to-transparent",
    pink: "from-[#FA0A12]/20 to-transparent",
  };

  return (
    <div
      className="glass-panel group relative p-5 rounded-[2rem] border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full flex flex-col justify-between"
    >
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, slate-200 1px, transparent 0)`, backgroundSize: '16px 16px' }} />
      
      {/* Dynamic Background Glow */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 ${colorMap[color].split(' ')[1]}`} />
      
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] truncate">{title}</p>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter transition-transform duration-300 group-hover:scale-[1.02] origin-left break-words">
              {value}
            </span>
          </div>
        </div>
        
        <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border transition-all duration-700 group-hover:rotate-12 shadow-sm shrink-0 ${colorMap[color]}`}>
          <Icon className="w-5 h-5 md:w-5.5 md:h-5.5" />
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-end justify-between gap-4">
        <div className="flex-1">
          {trend ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-black shrink-0 ${
                trend.direction === "up" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-[#FA0A12]/5 text-[#FA0A12] border border-[#FA0A12]/10"
              }`}>
                {trend.direction === "up" ? "↑" : "↓"} {trend.value}%
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">vs last period</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-pulse" />
               <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">Standard Metric</span>
            </div>
          )}
        </div>

        {/* Professional 'Data Horizon' - Visual Interest */}
        <div className="hidden sm:flex items-center gap-1 h-3 self-center">
           {[0.3, 0.6, 0.4, 0.9, 0.5].map((h, i) => (
             <div 
               key={i} 
               className={`w-0.5 rounded-full transition-all duration-700 delay-[${i * 100}ms] group-hover:brightness-110 ${colorMap[color].split(' ')[1]}`}
               style={{ height: `${h * 100}%`, opacity: 0.2 + (h * 0.4) }}
             />
           ))}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${gradientMap[color]} w-0 group-hover:w-full transition-all duration-700 ease-out`} />
      
      {/* Decorative Shimmer */}
      <div className="absolute inset-0 bg-shimmer opacity-0 group-hover:opacity-[0.02] pointer-events-none transition-opacity duration-700" />
    </div>
  );
}
