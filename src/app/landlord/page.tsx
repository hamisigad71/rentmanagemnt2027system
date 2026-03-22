"use client";

import React, { useState, useRef, useEffect } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Modal from "@/components/Modal";
import Badge from "@/components/Badge";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Building2, Home, Users, DollarSign, AlertCircle, Plus,
  ArrowRight, TrendingUp, TrendingDown, Activity, BarChart3,
  ShieldCheck, Calendar, ChevronRight,
  CheckCircle2, Clock, Layers,
} from "lucide-react";
import { getLandlordStats, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════════════════════════════*/
function Reveal({ children, delay = 0, className = "", y = 20 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ to, prefix = "" }: { to: number; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1100, 1);
      setCount(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}</span>;
}

/* ── Inline sparkline bars ────────────────────────────────────────────────── */
function Sparkline({ data, color = "#3DBE7A" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-7">
      {data.map((v, i) => (
        <motion.div key={i} className="flex-1 rounded-sm"
          style={{ background: i === data.length - 1 ? color : `${color}50` }}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.45, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }} />
      ))}
    </div>
  );
}

/* ── KPI stat card ────────────────────────────────────────────────────────── */
function StatCard({ label, value, numVal, icon: Icon, trend, accent, danger, sparkline }: {
  label: string; value: string | number; numVal?: number;
  icon: React.ElementType; trend?: { value: number; dir: "up" | "down" };
  accent?: boolean; danger?: boolean; sparkline?: number[];
}) {
  const up = trend?.dir === "up";
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="relative rounded-2xl p-5 border overflow-hidden cursor-default"
      style={{
        background: accent ? "linear-gradient(135deg,#0F2D1E,#1B5E45)"
          : danger ? "#FFF5F5" : "var(--color-card)",
        borderColor: accent ? "rgba(61,190,122,0.28)" : danger ? "#FECACA" : "var(--color-border-light)",
        boxShadow: accent
          ? "0 12px 40px rgba(27,94,69,0.28), inset 0 1px 0 rgba(255,255,255,0.07)"
          : "var(--shadow-card)",
      }}>
      {accent && (
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl"
          style={{ background: "rgba(61,190,122,0.18)" }} />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          accent ? "bg-white/12 border border-white/10"
          : danger ? "bg-red-100" : "bg-[#F7F8F5] border border-[#EAEAE6]"
        }`}>
          <Icon style={{ width: 18, height: 18,
            color: accent ? "#3DBE7A" : danger ? "#dc2626" : "#1B5E45" }} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[8px] font-black ${
            up ? accent ? "bg-white/10 text-white/60" : "bg-[#E8F5EE] text-[#1B5E45]"
               : "bg-red-100 text-red-600"
          }`}>
            {up ? <TrendingUp style={{width:10,height:10}} /> : <TrendingDown style={{width:10,height:10}} />}
            {trend.value}%
          </div>
        )}
      </div>

      <p className="text-[8px] font-black uppercase mb-1.5"
        style={{ color: accent ? "rgba(255,255,255,0.42)" : "var(--color-text-muted)" }}>
        {label}
      </p>
      <p className="text-2xl font-black tracking-tight leading-none"
        style={{ color: accent ? "white" : danger ? "#dc2626" : "var(--color-text-primary)" }}>
        {numVal !== undefined
          ? <Counter to={numVal} prefix={typeof value === "string" && value.includes("KSh") ? "KSh " : ""} />
          : value}
      </p>

      {sparkline && (
        <div className="mt-3.5">
          <Sparkline data={sparkline} color={accent ? "#3DBE7A" : "#1B5E45"} />
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════*/
export default function LandlordDashboard() {
  const { userName }   = useAuth();
  const stats          = getLandlordStats();
  const [showModal, setModal] = useState(false);
  const recentPayments   = mockPayments.slice(0, 5);
  const recentComplaints = mockComplaints.slice(0, 4);
  const occupancyPct     = Math.round((stats.occupiedUnits / stats.totalUnits) * 100);
  const hour             = new Date().getHours();
  const greeting         = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";
  const today            = new Date().toLocaleDateString("en-KE", { weekday: "long", month: "long", day: "numeric" });

  return (
    <LandlordLayout>
      <div className="min-h-screen p-5 md:p-8 space-y-7 max-w-[1440px] mx-auto"
        style={{ background: "var(--color-background)" }}>

        {/* ═══ HERO ═════════════════════════════════════════════════════════ */}
        <Reveal>
          <div className="relative rounded-[1.8rem] overflow-hidden border border-[var(--color-border-light)]"
            style={{ minHeight: 210, boxShadow: "var(--shadow-card)" }}>

            {/* Layered bg — Light Mode Emerald */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, var(--color-surface-tint) 0%, var(--color-background) 100%)" }} />
            <div className="absolute inset-0 opacity-[0.4]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-border-mid) 1px, transparent 0)", backgroundSize: "26px 26px" }} />

            {/* Animated orbs — Lighter & softer */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full -mr-40 -mt-40"
              style={{ background: "radial-gradient(circle, var(--color-surface-tint), transparent 70%)", filter: "blur(80px)" }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-16 -mb-16"
              style={{ background: "radial-gradient(circle, var(--color-green-soft), transparent 70%)", filter: "blur(60px)" }}
            />

            {/* Lines — Darker accent lines for visibility */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-mid)] to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent" />

            <div className="relative z-10 p-7 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-7">

                {/* Left */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2.5">
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A]"
                    />
                    <span className="text-[8px] font-black uppercase text-[var(--color-text-muted)]">
                      Property Command Centre
                    </span>
                  </div>

                  <div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-[var(--color-text-primary)] leading-[0.9]">
                      Good {greeting},
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] mt-1.5">
                      <span className="bg-gradient-to-r from-[#3DBE7A] to-[#2AE299] bg-clip-text text-transparent">
                        {userName?.split(" ")[0] || "Manager"}
                      </span>
                    </h1>
                    <p className="text-xs font-medium text-[var(--color-text-muted)] mt-3 flex items-center gap-1.5">
                      <Calendar style={{ width: 12, height: 12 }} />
                      {today}
                    </p>
                  </div>

                  {/* Inline metrics */}
                  <div className="flex items-center gap-5 pt-1">
                    {[
                      { label: "Buildings",  val: stats.totalBuildings },
                      { label: "Total Units",val: stats.totalUnits },
                      { label: "Occupancy",  val: `${occupancyPct}%` },
                      { label: "Income",     val: `KSh ${(stats.monthlyIncome / 1000).toFixed(0)}k` },
                    ].map((item, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <div className="w-px h-7 bg-[var(--color-border-light)]" />}
                        <div>
                          <p className="text-base font-black text-[var(--color-text-primary)] tracking-tight">{item.val}</p>
                          <p className="text-[8px] font-black uppercase text-[var(--color-text-muted)] mt-0.5">{item.label}</p>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Right — CTA + alert chips */}
                <div className="flex flex-col items-start md:items-end gap-3">
                  <button onClick={() => setModal(true)}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-white text-sm font-black transition-all hover:shadow-[0_12px_40px_rgba(27,94,69,0.5)] hover:-translate-y-0.5"
                    style={{ background: "#1B5E45" }}>
                    <Plus style={{ width: 16, height: 16 }} /> Add Building
                  </button>

                  <AnimatePresence>
                    {stats.tenantsInArrears > 0 && (
                      <motion.div key="arrears"
                        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-400/22"
                        style={{ background: "rgba(239,68,68,0.1)" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[8px] font-black text-red-600 uppercase ">
                          {stats.tenantsInArrears} tenants in arrears
                        </span>
                      </motion.div>
                    )}
                    {stats.activeComplaints > 0 && (
                      <motion.div key="complaints"
                        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        transition={{ delay: 1, duration: 0.4 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/22"
                        style={{ background: "rgba(245,158,11,0.1)" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                        <span className="text-[8px] font-black text-amber-600 uppercase ">
                          {stats.activeComplaints} open complaints
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ PRIMARY KPIs ═════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Buildings", value: stats.totalBuildings,   numVal: stats.totalBuildings,  icon: Building2,  trend: { value: 5, dir: "up" as const } },
            { label: "Total Units",     value: stats.totalUnits,       numVal: stats.totalUnits,      icon: Home,       trend: { value: 4, dir: "up" as const }, accent: true, sparkline: [80,82,85,84,90,94] },
            { label: "Occupied Units",  value: stats.occupiedUnits,    numVal: stats.occupiedUnits,   icon: Users,      trend: { value: 2, dir: "up" as const } },
            { label: "Monthly Income",  value: `KSh ${stats.monthlyIncome.toLocaleString()}`, numVal: stats.monthlyIncome, icon: DollarSign, trend: { value: 8, dir: "up" as const }, sparkline: [62,75,68,88,92,100] },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <StatCard {...card} />
            </Reveal>
          ))}
        </div>

        {/* ═══ ALERT KPIs + PORTFOLIO HEALTH ════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Alert trio */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "Vacant Units",       value: stats.vacantUnits,      numVal: stats.vacantUnits,      icon: Home,        trend: { value: 2, dir: "down" as const }, danger: true },
              { label: "Tenants in Arrears", value: stats.tenantsInArrears, numVal: stats.tenantsInArrears, icon: AlertCircle, trend: { value: 1, dir: "down" as const }, danger: true },
              { label: "Active Complaints",  value: stats.activeComplaints, numVal: stats.activeComplaints, icon: Activity,    trend: { value: 12, dir: "up" as const }, danger: true },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <StatCard {...card} />
              </Reveal>
            ))}
          </div>

          {/* Portfolio Health */}
          <Reveal delay={0.12} className="lg:col-span-2">
            <div className="rounded-[1.8rem] border overflow-hidden h-full flex flex-col"
        style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }} >

              {/* Dark header */}
              <div className="relative overflow-hidden flex-shrink-0" style={{ minHeight: 78 }}>
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#071510,#1B5E45)" }} />
                <div className="absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.6) 1px,transparent 0)", backgroundSize: "18px 18px" }} />
                <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl -mr-8 -mt-8"
                  style={{ background: "rgba(63, 135, 97, 0.22)" }} />
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <BarChart3 style={{ width: 16, height: 16, color: "rgba(255,255,255,0.65)" }} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">Portfolio Health</p>
                      <p className="text-[8px] font-black uppercase  text-white/32">
                        Live occupancy & revenue
                      </p>
                    </div>
                  </div>
                  <Link href="/landlord/reports"
                    className="flex items-center gap-1 text-[9px] font-black uppercase  text-white/35 hover:text-[#3DBE7A] transition-colors">
                    Full Report <ChevronRight style={{ width: 12, height: 12 }} />
                  </Link>
                </div>
              </div>

              <div className="p-6 flex-1 space-y-5">
                {/* Occupancy bar with shimmer */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users style={{ width: 14, height: 14, color: "#3DBE7A" }} />
                      <span className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>
                        Occupancy Rate
                      </span>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ color: "var(--color-green-deep)", background: "var(--color-surface-tint)" }}>
                      {occupancyPct}% Occupied
                    </span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--color-border-light)" }}>
                    <motion.div className="h-full rounded-full relative overflow-hidden"
                      style={{ background: "linear-gradient(90deg,#0C2218,#1B5E45,#3DBE7A)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${occupancyPct}%` }}
                      transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                      <motion.div className="absolute inset-0"
                        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)" }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.8 }} />
                    </motion.div>
                  </div>
                  <div className="flex justify-between mt-1.5 text-[8px] font-black uppercase "
                    style={{ color: "var(--color-text-muted)" }}>
                    <span>{stats.occupiedUnits} occupied</span>
                    <span>{stats.vacantUnits} vacant</span>
                  </div>
                </div>

                {/* Income sparkline */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[9px] font-black uppercase "
                      style={{ color: "var(--color-text-muted)" }}>
                      Revenue — Last 6 Months
                    </p>
                    <span className="text-[8px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: "#E8F5EE", color: "#1B5E45" }}>
                      +18% YoY
                    </span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[62, 75, 68, 88, 92, 100].map((h, i) => (
                      <div key={i} className="flex-1">
                        <motion.div className="w-full rounded-t-lg"
                          style={{ background: i === 5 ? "linear-gradient(180deg,#3DBE7A,#1B5E45)" : i >= 4 ? "rgba(27,94,69,0.3)" : "var(--color-border-light)" }}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.55, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-[8px] font-bold"
                    style={{ color: "var(--color-text-muted)" }}>
                    {["Oct","Nov","Dec","Jan","Feb","Mar"].map(m => <span key={m}>{m}</span>)}
                  </div>
                </div>

                {/* Metric tiles */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Collection Rate", val: "99.2%" },
                    { label: "Avg Response",     val: "< 12h" },
                    { label: "Net Yield",        val: "14.5%" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-3 border text-center"
                      style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                      <p className="text-[7px] font-black uppercase mb-1"
                        style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                      <p className="text-sm font-black" style={{ color: "var(--color-green-deep)" }}>{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ═══ QUICK ACTIONS ════════════════════════════════════════════════ */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Add Building",  icon: Building2,  href: "#",                    accent: true },
              { label: "View Tenants",  icon: Users,      href: "/landlord/tenants" },
              { label: "Payments",      icon: DollarSign, href: "/landlord/payments" },
              { label: "Reports",       icon: BarChart3,  href: "/landlord/reports" },
            ].map((action, i) => (
              <Link key={i} href={action.href}
                onClick={action.label === "Add Building" ? (e) => { e.preventDefault(); setModal(true); } : undefined}>
                <motion.div
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border cursor-pointer transition-colors"
                  style={{
                    background: action.accent ? "#1B5E45" : "var(--color-card)",
                    borderColor: action.accent ? "transparent" : "var(--color-border-light)",
                    boxShadow: action.accent ? "0 8px 24px rgba(27,94,69,0.22)" : "var(--shadow-card)",
                  }}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    action.accent ? "bg-white/20" : "bg-[#E8F5EE] border border-[#C4D4C9]"
                  }`}>
                    <action.icon style={{ width: 16, height: 16, color: action.accent ? "white" : "#1B5E45" }} />
                  </div>
                  <p className="text-xs font-black flex-1"
                    style={{ color: action.accent ? "white" : "var(--color-text-primary)" }}>
                    {action.label}
                  </p>
                  <ChevronRight style={{ width: 14, height: 14,
                    color: action.accent ? "rgba(255,255,255,0.45)" : "var(--color-text-muted)" }} />
                </motion.div>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* ═══ PAYMENTS + COMPLAINTS ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Payments */}
          <Reveal>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#3DBE7A] flex items-center justify-center">
                    <DollarSign style={{ width: 16, height: 16, color: "white" }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Recent Payments</h3>
                    <p className="text-[8px] font-black uppercase " style={{ color: "var(--color-text-muted)" }}>
                      {recentPayments.filter(p => p.status === "completed").length} verified this cycle
                    </p>
                  </div>
                </div>
                <Link href="/landlord/payments"
                  className="flex items-center gap-1 text-[9px] font-black uppercase  hover:gap-2 transition-all"
                  style={{ color: "var(--color-green-deep)" }}>
                  View All <ArrowRight style={{ width: 12, height: 12 }} />
                </Link>
              </div>

              <div className="p-5 space-y-2">
                {recentPayments.map((payment, i) => (
                  <motion.div key={payment.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-between p-3.5 rounded-2xl border cursor-default transition-all"
                    style={{ background: "var(--color-background-alt)", borderColor: "transparent" }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "var(--color-card)";
                      el.style.borderColor = "var(--color-border-light)";
                      el.style.transform = "translateX(2px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "var(--color-background-alt)";
                      el.style.borderColor = "transparent";
                      el.style.transform = "translateX(0)";
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#1A1A1A]">
                          <img src={`https://i.pravatar.cc/80?u=${payment.tenantName}`}
                            alt={payment.tenantName} className="w-full h-full object-cover" />
                        </div>
                        {payment.status === "completed" && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#3DBE7A] border-2 border-white flex items-center justify-center">
                            <CheckCircle2 style={{ width: 7, height: 7, color: "white" }} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>
                          {payment.tenantName}
                        </p>
                        <p className="text-[8px] font-bold uppercase  mt-0.5"
                          style={{ color: "var(--color-text-muted)" }}>
                          {payment.month}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-black tabular-nums"
                        style={{ color: "var(--color-text-primary)" }}>
                        KSh {payment.amount.toLocaleString()}
                      </p>
                      <Badge text={payment.status === "completed" ? "Verified" : "Pending"}
                        type={payment.status === "completed" ? "success" : "warning"} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary footer */}
              <div className="px-5 pb-5">
                <div className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{ background: "var(--color-surface-tint)", border: "1px solid var(--color-border-mid)" }}>
                  <p className="text-[8px] font-black uppercase"
                    style={{ color: "var(--color-text-muted)" }}>Total Collected</p>
                  <p className="text-sm font-black" style={{ color: "var(--color-green-deep)" }}>
                    KSh {recentPayments.filter(p => p.status === "completed")
                      .reduce((s, p) => s + p.amount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Complaints */}
          <Reveal delay={0.08}>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center">
                    <Activity style={{ width: 16, height: 16, color: "white" }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Open Complaints</h3>
                    <p className="text-[8px] font-black uppercase "
                      style={{ color: "var(--color-text-muted)" }}>
                      {recentComplaints.filter(c => c.status !== "resolved").length} requiring attention
                    </p>
                  </div>
                </div>
                <Link href="/landlord/complaints"
                  className="flex items-center gap-1 text-[9px] font-black uppercase  hover:gap-2 transition-all"
                  style={{ color: "var(--color-green-deep)" }}>
                  All Tickets <ArrowRight style={{ width: 12, height: 12 }} />
                </Link>
              </div>

              <div className="p-5 space-y-2">
                {recentComplaints.map((complaint, i) => {
                  const sc = complaint.status === "resolved"
                    ? { color: "#1B5E45", Icon: CheckCircle2 }
                    : complaint.status === "in-progress"
                    ? { color: "#f59e0b", Icon: Clock }
                    : { color: "#ef4444", Icon: AlertCircle };
                  return (
                    <motion.div key={complaint.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="p-3.5 rounded-2xl border-l-[3px] cursor-default transition-all"
                      style={{ background: "var(--color-background-alt)", borderLeftColor: sc.color }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--color-card)";
                        el.style.boxShadow = "var(--shadow-card)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--color-background-alt)";
                        el.style.boxShadow = "none";
                      }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <sc.Icon style={{ width: 12, height: 12, flexShrink: 0, color: sc.color }} />
                            <p className="text-[8px] font-black uppercase"
                              style={{ color: "var(--color-text-muted)" }}>
                              {complaint.category}
                            </p>
                          </div>
                          <p className="text-xs font-black leading-snug truncate"
                            style={{ color: "var(--color-text-primary)" }}>
                            {complaint.title}
                          </p>
                          <p className="text-[9px] font-bold mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                            {complaint.tenantName}
                          </p>
                        </div>
                        <Badge
                          text={complaint.status === "resolved" ? "Resolved"
                            : complaint.status === "in-progress" ? "Active" : "New"}
                          type={complaint.status === "resolved" ? "success"
                            : complaint.status === "in-progress" ? "warning" : "error"}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Priority alert */}
              {recentComplaints.some(c => c.status === "pending") && (
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                    style={{ background: "#FFF5F5", border: "1px solid #FECACA" }}>
                    <AlertCircle style={{ width: 14, height: 14, color: "#ef4444", flexShrink: 0 }} />
                    <p className="text-[8px] font-black uppercase  text-red-600">
                      Pending issues require immediate attention
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ═══ MODAL ════════════════════════════════════════════════════════════ */}
      <Modal isOpen={showModal} onClose={() => setModal(false)} title="" size="5xl"
        className="rounded-[1.5rem] p-0 overflow-hidden border-none">
        <div style={{ background: "var(--color-background)" }}>
          {/* Dark hero */}
          <div className="relative overflow-hidden" style={{ background: "#0F0F0F", minHeight: 108 }}>
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.5) 1px,transparent 0)", backgroundSize: "22px 22px" }} />
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-12 -mt-12"
              style={{ background: "rgba(61,190,122,0.18)" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />
            <div className="relative z-10 px-7 py-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-[#3DBE7A]/28 flex items-center justify-center"
                style={{ background: "rgba(61,190,122,0.14)" }}>
                <Building2 style={{ width: 16, height: 16, color: "#3DBE7A" }} />
              </div>
              <div>
                <p className="text-sm font-black text-white">Register New Building</p>
                <p className="text-[8px] font-black uppercase text-white/30">Add to portfolio</p>
              </div>
            </div>
          </div>

          <div className="p-7 space-y-4">
            {[
              { label: "Building Name", type: "text",   ph: "e.g., Sunrise Apartments" },
              { label: "Address",       type: "text",   ph: "Street address, City" },
            ].map(({ label, type, ph }) => (
              <div key={label} className="space-y-1.5">
                <label className="text-[8px] font-black uppercase "
                  style={{ color: "var(--color-text-muted)" }}>{label}</label>
                <input type={type} placeholder={ph}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:border-[#3DBE7A] transition-all"
                  style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Number of Units", ph: "24" }, { label: "Year Built", ph: "2020" }].map(({ label, ph }) => (
                <div key={label} className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase"
                    style={{ color: "var(--color-text-muted)" }}>{label}</label>
                  <input type="number" placeholder={ph}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:border-[#3DBE7A] transition-all"
                    style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setModal(false)}
                className="flex-1 py-3 rounded-xl text-white text-sm font-black uppercase  transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#1B5E45", borderColor: "#1B5E45", boxShadow: "0 4px 16px rgba(27,94,69,0.25)" }}>
                Add Building
              </button>
              <button onClick={() => setModal(false)}
                className="flex-1 py-3 rounded-xl text-sm font-black uppercase  border transition-all hover:bg-[#F7F8F5]"
                style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}