"use client";

import React, { useState, useRef } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend,
} from "recharts";
import { motion, useInView } from "framer-motion";
import {
  BarChart3, TrendingUp, Users, PieChart,
  Download, Calendar, ArrowUpRight,
  ShieldCheck, Activity, DollarSign,
  ChevronRight, TrendingDown, Zap,
} from "lucide-react";

/* ─── data ─────────────────────────────────────────────────────────────────── */
const incomeData = [
  { month: "Jan", income: 125000, expenses: 42000 },
  { month: "Feb", income: 132000, expenses: 38000 },
  { month: "Mar", income: 128000, expenses: 44000 },
  { month: "Apr", income: 141000, expenses: 39000 },
  { month: "May", income: 139000, expenses: 41000 },
  { month: "Jun", income: 153000, expenses: 36000 },
];

const occupancyData = [
  { month: "Jan", occupied: 90, vacant: 10 },
  { month: "Feb", occupied: 92, vacant: 8 },
  { month: "Mar", occupied: 91, vacant: 9 },
  { month: "Apr", occupied: 94, vacant: 6 },
  { month: "May", occupied: 95, vacant: 5 },
  { month: "Jun", occupied: 98, vacant: 2 },
];

const collectionData = [
  { month: "Jan", rate: 96 },
  { month: "Feb", rate: 97 },
  { month: "Mar", rate: 95 },
  { month: "Apr", rate: 98 },
  { month: "May", rate: 99 },
  { month: "Jun", rate: 99.1 },
];

/* ─── custom tooltip ────────────────────────────────────────────────────────── */
function DarkTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-white text-xs shadow-2xl"
      style={{ background: "#0F0F0F", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="font-black text-white/40 uppercase  text-[8px] mb-1.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
          <span className="font-black">{typeof p.value === 'number' && p.value > 1000
            ? `KSh ${p.value.toLocaleString()}` : `${p.value}${p.name === 'rate' ? '%' : ''}`}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── reveal ────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function ReportsPage() {
  const [incomeTab, setIncomeTab] = useState<"income" | "expenses">("income");

  const netIncome = incomeData.reduce((s, d) => s + d.income - d.expenses, 0);
  const totalIncome = incomeData.reduce((s, d) => s + d.income, 0);

  return (
    <LandlordLayout>
      <div className="min-h-screen p-5 md:p-8 space-y-7" style={{ background: "var(--color-background)" }}>

        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <Reveal className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5 text-[#3DBE7A]" />
              </div>
              <p className="text-[8px] font-black uppercase "
                style={{ color: "var(--color-text-muted)" }}>
                Strategic Intelligence
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none"
              style={{ color: "var(--color-text-primary)" }}>
              Property{" "}
              <span className="bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] bg-clip-text text-transparent">
                Analytics
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black border transition-all hover:bg-[#F7F8F5]"
              style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-black uppercase  transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 14px rgba(27,94,69,0.28)" }}>
              <Calendar className="w-3.5 h-3.5" /> Custom Range
            </button>
          </div>
        </Reveal>

        {/* ── KPI CARDS — preserved exactly from image ─────────────────────── */}
        <Reveal delay={0.04}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Avg Occupancy",
                value: "98.2%",
                icon: Users,
                iconBg: "#EFF6FF",
                iconColor: "#3B82F6",
                trend: "+1.4%",
                trendColor: "#10B981",
              },
              {
                label: "Net Yield",
                value: "14.5%",
                icon: TrendingUp,
                iconBg: "#F0FDF4",
                iconColor: "#10B981",
                trend: "+0.8%",
                trendColor: "#10B981",
              },
              {
                label: "Collection Rate",
                value: "99.1%",
                icon: ShieldCheck,
                iconBg: "#ECFDF5",
                iconColor: "#059669",
                trend: "Optimal",
                trendColor: "#059669",
              },
              {
                label: "Maintenance ROI",
                value: "8.2%",
                icon: Activity,
                iconBg: "#EEF2FF",
                iconColor: "#6366F1",
                trend: "-2.1%",
                trendColor: "#EF4444",
              },
            ].map((card, i) => (
              /* ─── CARD STYLE IS IDENTICAL TO THE IMAGE ─── */
              <div key={i}
                className="bg-white rounded-2xl border p-5 hover:shadow-md transition-all group"
                style={{ borderColor: "#F1F5F9", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: card.iconBg }}>
                  <card.icon className="w-4.5 h-4.5" style={{ color: card.iconColor, width: 18, height: 18 }} />
                </div>
                <p className="text-[9px] font-black uppercase  mb-1.5"
                  style={{ color: "#94A3B8" }}>
                  {card.label}
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-black tracking-tight" style={{ color: "#0F172A" }}>
                    {card.value}
                  </p>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-md mb-0.5"
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      color: card.trendColor,
                    }}>
                    {card.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── CHARTS ROW ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Income / Expenses Area Chart */}
          <Reveal delay={0.06}>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              {/* Chart header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div>
                  <p className="text-[9px] font-black uppercase  mb-1"
                    style={{ color: "#3DBE7A" }}>
                    Revenue Streams
                  </p>
                  <h3 className="text-base font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                    Income vs Expenses
                  </h3>
                </div>
                {/* Toggle */}
                <div className="flex items-center p-1 rounded-xl gap-1"
                  style={{ background: "var(--color-background-alt)", border: "1px solid var(--color-border-light)" }}>
                  {(["income", "expenses"] as const).map(tab => (
                    <button key={tab}
                      onClick={() => setIncomeTab(tab)}
                      className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase  transition-all"
                      style={{
                        background: incomeTab === tab ? "white" : "transparent",
                        color: incomeTab === tab ? "var(--color-text-primary)" : "var(--color-text-muted)",
                        boxShadow: incomeTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary strip */}
              <div className="flex items-center gap-6 px-6 py-3 border-b"
                style={{ borderColor: "var(--color-border-light)", background: "var(--color-background-alt)" }}>
                <div>
                  <p className="text-[8px] font-black uppercase " style={{ color: "var(--color-text-muted)" }}>H1 Total Income</p>
                  <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>
                    KSh {totalIncome.toLocaleString()}
                  </p>
                </div>
                <div className="w-px h-8" style={{ background: "var(--color-border-light)" }} />
                <div>
                  <p className="text-[8px] font-black uppercase " style={{ color: "var(--color-text-muted)" }}>Net Income</p>
                  <p className="text-sm font-black" style={{ color: "var(--color-green-deep)" }}>
                    KSh {netIncome.toLocaleString()}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full"
                  style={{ background: "#E8F5EE", color: "#1B5E45" }}>
                  <TrendingUp className="w-3 h-3" /> +18% YoY
                </div>
              </div>

              <div className="p-6">
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={incomeData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1B5E45" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#1B5E45" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.12} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}
                        stroke="var(--color-border-light)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false}
                        tick={{ fontSize: 9, fontWeight: 900, fill: "#94A3B8" }} dy={8} />
                      <YAxis axisLine={false} tickLine={false}
                        tick={{ fontSize: 9, fontWeight: 900, fill: "#94A3B8" }}
                        tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                      <Tooltip content={<DarkTooltip />} />
                      <Area type="monotone" dataKey="income" stroke="#1B5E45" strokeWidth={2.5}
                        fill="url(#gradIncome)" dot={false}
                        display={incomeTab === "income" ? "block" : "none"} />
                      <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2.5}
                        fill="url(#gradExpenses)" dot={false}
                        display={incomeTab === "expenses" ? "block" : "none"} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Occupancy Bar Chart */}
          <Reveal delay={0.08}>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div>
                  <p className="text-[9px] font-black uppercase  mb-1"
                    style={{ color: "#3DBE7A" }}>
                    Inventory Health
                  </p>
                  <h3 className="text-base font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                    Occupancy Rate
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-black"
                  style={{ color: "var(--color-text-muted)" }}>
                  <Calendar className="w-3.5 h-3.5" /> H1 2024
                </div>
              </div>

              {/* Summary strip */}
              <div className="flex items-center gap-6 px-6 py-3 border-b"
                style={{ borderColor: "var(--color-border-light)", background: "var(--color-background-alt)" }}>
                <div>
                  <p className="text-[8px] font-black uppercase " style={{ color: "var(--color-text-muted)" }}>Peak Occupancy</p>
                  <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>98%</p>
                </div>
                <div className="w-px h-8" style={{ background: "var(--color-border-light)" }} />
                <div>
                  <p className="text-[8px] font-black uppercase " style={{ color: "var(--color-text-muted)" }}>Avg Occupancy</p>
                  <p className="text-sm font-black" style={{ color: "var(--color-green-deep)" }}>93.3%</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-3 text-[9px] font-black">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#1B5E45]" />
                      <span style={{ color: "var(--color-text-muted)" }}>Occupied</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                      <span style={{ color: "var(--color-text-muted)" }}>Vacant</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={occupancyData} barGap={4} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}
                        stroke="var(--color-border-light)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false}
                        tick={{ fontSize: 9, fontWeight: 900, fill: "#94A3B8" }} dy={8} />
                      <YAxis axisLine={false} tickLine={false}
                        tick={{ fontSize: 9, fontWeight: 900, fill: "#94A3B8" }}
                        tickFormatter={v => `${v}%`} domain={[0, 100]} />
                      <Tooltip content={<DarkTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)", radius: 8 }} />
                      <Bar dataKey="occupied" fill="#1B5E45" radius={[6, 6, 0, 0]} name="Occupied" maxBarSize={36} />
                      <Bar dataKey="vacant" fill="#E5E7EB" radius={[6, 6, 0, 0]} name="Vacant" maxBarSize={36} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── COLLECTION RATE LINE CHART ───────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="rounded-[1.8rem] border overflow-hidden"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 pt-6 pb-4 border-b"
              style={{ borderColor: "var(--color-border-light)" }}>
              <div>
                <p className="text-[9px] font-black uppercase  mb-1"
                  style={{ color: "#3DBE7A" }}>
                  Financial Compliance
                </p>
                <h3 className="text-base font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                  Rent Collection Rate
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { label: "Avg Rate", val: "97.3%", color: "var(--color-text-primary)" },
                  { label: "Current", val: "99.1%", color: "#1B5E45" },
                ].map((s, i) => (
                  <div key={i} className="text-right">
                    <p className="text-[8px] font-black uppercase " style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
                    <p className="text-sm font-black" style={{ color: s.color }}>{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={collectionData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-light)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false}
                      tick={{ fontSize: 9, fontWeight: 900, fill: "#94A3B8" }} dy={8} />
                    <YAxis axisLine={false} tickLine={false}
                      tick={{ fontSize: 9, fontWeight: 900, fill: "#94A3B8" }}
                      domain={[90, 100]} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<DarkTooltip />} />
                    <Line type="monotone" dataKey="rate" stroke="#3DBE7A" strokeWidth={2.5}
                      dot={{ fill: "#1B5E45", r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: "#1B5E45", strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── STRATEGY BANNER ─────────────────────────────────────────────── */}
        <Reveal delay={0.12}>
          <div className="relative rounded-[1.8rem] overflow-hidden"
            style={{ background: "#0F0F0F", minHeight: 180 }}>
            {/* dot grid */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.5) 1px,transparent 0)", backgroundSize: "24px 24px" }} />
            {/* glows */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] -mr-20 -mt-20"
              style={{ background: "rgba(61,190,122,0.14)" }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] -ml-20 -mb-20"
              style={{ background: "rgba(27,94,69,0.25)" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />

            <div className="relative z-10 p-7 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left copy */}
              <div className="space-y-3 max-w-md">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                  <p className="text-[8px] font-black uppercase  text-white/35">
                    AI-Driven Insights
                  </p>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                  Optimising Asset{" "}
                  <span className="bg-gradient-to-r from-[#3DBE7A] to-[#2AE299] bg-clip-text text-transparent">
                    Utilisation
                  </span>
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Based on current diagnostics, high-yield commercial expansion in the Downtown sector is recommended to maximise portfolio returns.
                </p>
                <button className="flex items-center gap-2 text-xs font-black text-[#3DBE7A] uppercase  hover:gap-3 transition-all">
                  View Full Report <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Right stat tiles */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                {[
                  { label: "Growth Index", val: "+18%", sub: "Year-on-year", highlight: true },
                  { label: "Risk Factor",  val: "Low",  sub: "Market Neutral", highlight: false },
                  { label: "Yield Score",  val: "A+",   sub: "Portfolio Grade", highlight: false },
                ].map((tile, i) => (
                  <div key={i}
                    className="flex-1 p-4 rounded-2xl border text-center space-y-1.5"
                    style={{
                      background: tile.highlight ? "rgba(61,190,122,0.1)" : "rgba(255,255,255,0.05)",
                      borderColor: tile.highlight ? "rgba(61,190,122,0.25)" : "rgba(255,255,255,0.08)",
                    }}>
                    <p className="text-[8px] font-black uppercase "
                      style={{ color: tile.highlight ? "#3DBE7A" : "rgba(255,255,255,0.3)" }}>
                      {tile.label}
                    </p>
                    <p className="text-2xl font-black text-white">{tile.val}</p>
                    <p className="text-[8px] font-bold uppercase  text-white/25">{tile.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </LandlordLayout>
  );
}