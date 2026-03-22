"use client";

import React, { useState, useEffect, useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import { mockTenants } from "@/data/mockData";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Receipt, CreditCard, AlertCircle, CheckCircle2,
  ArrowRight, Loader2, ShieldCheck, TrendingUp,
  Calendar, Home, Zap, Wifi, Droplets, CheckCheck,
  Clock, DollarSign, ChevronRight,
} from "lucide-react";

/* ─── Reveal ──────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ────────────────────────────────────────────────────── */
function Counter({ to, prefix = "" }: { to: number; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setCount(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}</span>;
}

/* ─── Radial progress ─────────────────────────────────────────────────────── */
function RadialRing({ pct, size = 120, stroke = 8, color = "#3DBE7A" }: {
  pct: number; size?: number; stroke?: number; color?: string;
}) {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(0,0,0,0.07)" strokeWidth={stroke} />
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════════════════════════════════════════*/
function LoadingScreen() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Authenticating session…",
    "Fetching account data…",
    "Validating payment status…",
    "Securing your data…",
  ];

  useEffect(() => {
    const intervals = [
      setTimeout(() => { setStep(1); setProgress(28); }, 800),
      setTimeout(() => { setStep(2); setProgress(58); }, 2000),
      setTimeout(() => { setStep(3); setProgress(82); }, 3500),
      setTimeout(() => { setProgress(100); }, 4800),
    ];
    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <TenantLayout>
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-background)" }}>
        <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">

          {/* Icon assembly */}
          <div className="relative">
            {/* Outer pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full -m-4"
              style={{ background: "radial-gradient(circle,rgba(27,94,69,0.4),transparent 70%)", filter: "blur(12px)" }}
            />
            <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{ background: "linear-gradient(135deg,#0A1F15,#1B5E45)" }}>
              <div className="absolute inset-0 rounded-2xl opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.8) 1px,transparent 0)", backgroundSize: "14px 14px" }} />
              <Receipt className="w-9 h-9 text-white relative z-10" strokeWidth={1.5} />
            </div>
            {/* Spinning orbit */}
            <motion.div animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3">
              <div className="w-full h-full rounded-full border border-dashed border-[#3DBE7A]/30" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-[#3DBE7A]" />
            </motion.div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1.5">
            <h2 className="text-xl font-black tracking-tighter"
              style={{ color: "var(--color-text-primary)" }}>
              Loading Rent Status
            </h2>
            <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
              Securing your account data
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full space-y-2">
            <div className="h-2 rounded-full overflow-hidden"
              style={{ background: "var(--color-border-light)" }}>
              <motion.div className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#1B5E45,#3DBE7A)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
            </div>
            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}>
              <span>Initialising</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full space-y-2.5">
            {steps.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: i <= step ? 1 : 0.3, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  i < step ? "bg-[#1B5E45]" : i === step ? "bg-[#3DBE7A] animate-pulse" : "bg-transparent border border-[#E5E7EB]"
                }`}>
                  {i < step && <CheckCheck style={{ width: 9, height: 9, color: "white" }} />}
                </div>
                <span className="text-xs font-bold"
                  style={{ color: i <= step ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                  {s}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════*/
export default function RentStatusPage() {
  const currentTenant = mockTenants[0];
  const [isLoading, setIsLoading]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 5500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <LoadingScreen />;

  const settlePct  = Math.min(100, Math.round((currentTenant.paidAmount / currentTenant.rent) * 100));
  const allClear   = currentTenant.arrears === 0;
  const nextDue    = new Date();
  nextDue.setDate(1);
  nextDue.setMonth(nextDue.getMonth() + 1);

  return (
    <TenantLayout>
      <div className="min-h-screen p-5 md:p-8 space-y-6 max-w-[900px] mx-auto"
        style={{ background: "var(--color-background)" }}>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#1B5E45] flex items-center justify-center">
                <Receipt className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.45em]"
                style={{ color: "var(--color-text-muted)" }}>
                Tenant Portal
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none"
              style={{ color: "var(--color-text-primary)" }}>
              Rent{" "}
              <span className="bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] bg-clip-text text-transparent">
                Status
              </span>
            </h1>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--color-text-muted)" }}>
              Full breakdown of your rental account
            </p>
          </div>

          {/* Status chip */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-2xl border"
            style={{
              background: allClear ? "var(--color-surface-tint)" : "#FFF5F5",
              borderColor: allClear ? "var(--color-border-mid)" : "#FECACA",
            }}>
            {allClear
              ? <CheckCircle2 className="w-4 h-4" style={{ color: "#1B5E45" }} />
              : <AlertCircle className="w-4 h-4 text-red-500" />}
            <span className="text-xs font-black uppercase tracking-widest"
              style={{ color: allClear ? "#1B5E45" : "#dc2626" }}>
              {allClear ? "Account Clear" : "Balance Due"}
            </span>
          </motion.div>
        </Reveal>

        {/* ── HERO METRICS ROW ─────────────────────────────────────────────── */}
        <Reveal delay={0.04}>
          <div className="relative rounded-[1.8rem] overflow-hidden border"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(27,94,69,0.8) 1px,transparent 0)", backgroundSize: "22px 22px" }} />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-80 h-80 rounded-full -mr-32 -mt-32"
              style={{ background: "radial-gradient(circle,rgba(61,190,122,1),transparent 70%)", filter: "blur(70px)" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/30 to-transparent" />

            <div className="relative z-10 p-7 md:p-9">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">

                {/* Ring chart + settlement */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <RadialRing pct={settlePct} size={120} stroke={9} color="#3DBE7A" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-2xl font-black leading-none" style={{ color: "var(--color-text-primary)" }}>{settlePct}%</p>
                      <p className="text-[8px] font-black uppercase tracking-widest mt-0.5" style={{ color: "var(--color-text-muted)" }}>Settled</p>
                    </div>
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Settlement Progress</p>
                </div>

                {/* Key metrics */}
                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Monthly Rent",  val: currentTenant.rent,       prefix: "KSh ", color: "var(--color-text-primary)" },
                    { label: "Amount Paid",   val: currentTenant.paidAmount, prefix: "KSh ", color: "#1B5E45" },
                    { label: "Outstanding",   val: currentTenant.arrears,    prefix: "KSh ", color: allClear ? "#1B5E45" : "#dc2626" },
                    { label: "Unit",          val: 0, display: currentTenant.unitId, color: "var(--color-text-primary)" },
                    { label: "Next Due",      val: 0, display: nextDue.toLocaleDateString("en-KE", { month: "short", day: "numeric" }), color: "var(--color-text-primary)" },
                    { label: "Status",        val: 0, display: "Active", color: "#1B5E45" },
                  ].map((item, i) => (
                    <div key={i}
                      className="rounded-2xl p-3.5 border"
                      style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                      <p className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                      <p className="text-base font-black leading-none" style={{ color: item.color }}>
                        {item.display ?? (
                          <Counter to={item.val} prefix={item.prefix} />
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── UNIT INFORMATION ─────────────────────────────────────────────── */}
        <Reveal delay={0.06}>
          <div className="rounded-[1.8rem] border overflow-hidden"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-3 px-6 pt-6 pb-5 border-b"
              style={{ borderColor: "var(--color-border-light)" }}>
              <div className="w-9 h-9 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Unit Information</h3>
                <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Property details & occupancy
                </p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Unit Number",  val: currentTenant.unitId,   highlight: true },
                { label: "Move-in Date", val: currentTenant.moveInDate },
                { label: "Lease Status", val: "Active",               green: true },
                { label: "Floor",        val: "5th Floor" },
                { label: "Type",         val: "2BR Apartment" },
                { label: "Lease Term",   val: "12 Months" },
              ].map((item, i) => (
                <motion.div key={i}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  className="rounded-2xl p-4 border cursor-default transition-all"
                  style={{
                    background: item.highlight ? "var(--color-surface-tint)" : item.green ? "#F0FDF4" : "var(--color-background-alt)",
                    borderColor: item.highlight ? "var(--color-border-mid)" : item.green ? "#BBF7D0" : "var(--color-border-light)",
                  }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.35em] mb-1.5"
                    style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                  <p className="text-base font-black"
                    style={{ color: item.highlight ? "var(--color-green-deep)" : item.green ? "#1B5E45" : "var(--color-text-primary)" }}>
                    {item.val}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── RENT BREAKDOWN ───────────────────────────────────────────────── */}
        <Reveal delay={0.08}>
          <div className="rounded-[1.8rem] border overflow-hidden"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-3 px-6 pt-6 pb-5 border-b"
              style={{ borderColor: "var(--color-border-light)" }}>
              <div className="w-9 h-9 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Rent Breakdown</h3>
                <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Monthly charges & inclusions
                </p>
              </div>
            </div>

            <div className="p-6 space-y-3">
              {/* Base rent row */}
              <div className="flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-md"
                style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center">
                    <DollarSign className="w-4 h-4" style={{ color: "#1B5E45" }} />
                  </div>
                  <div>
                    <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Base Monthly Rent</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                      Due 1st of each month
                    </p>
                  </div>
                </div>
                <p className="text-xl font-black tabular-nums" style={{ color: "var(--color-text-primary)" }}>
                  KSh {currentTenant.rent.toLocaleString()}
                </p>
              </div>

              {/* Utilities row */}
              <div className="flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-md"
                style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Utilities & Services</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {[<Wifi className="w-3 h-3" />, <Droplets className="w-3 h-3" />, <Zap className="w-3 h-3" />].map((ic, i) => (
                        <span key={i} style={{ color: "var(--color-text-muted)" }}>{ic}</span>
                      ))}
                      <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                        WiFi, Water, Electricity
                      </p>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white"
                  style={{ background: "linear-gradient(135deg,#1B5E45,#246B4F)" }}>
                  Inclusive
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── PAYMENT SUMMARY ──────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="rounded-[1.8rem] border overflow-hidden"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-3 px-6 pt-6 pb-5 border-b"
              style={{ borderColor: "var(--color-border-light)" }}>
              <div className="w-9 h-9 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Current Balance</h3>
                <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Payment status overview
                </p>
              </div>
            </div>

            <div className="p-6 space-y-3">
              {/* Row trio */}
              {[
                { label: "Total Due",       val: currentTenant.rent,        color: "var(--color-text-primary)", bg: "var(--color-background-alt)", border: "var(--color-border-light)" },
                { label: "Amount Settled",  val: currentTenant.paidAmount,  color: "#1B5E45",                  bg: "var(--color-surface-tint)",    border: "var(--color-border-mid)" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border"
                  style={{ background: row.bg, borderColor: row.border }}>
                  <p className="text-sm font-black" style={{ color: "var(--color-text-muted)" }}>{row.label}</p>
                  <p className="text-xl font-black tabular-nums" style={{ color: row.color }}>
                    KSh {row.val.toLocaleString()}
                  </p>
                </div>
              ))}

              {/* Net balance — large */}
              <div className="flex items-center justify-between p-5 rounded-2xl border-2"
                style={{
                  background: allClear ? "var(--color-surface-tint)" : "#FFF5F5",
                  borderColor: allClear ? "var(--color-border-mid)" : "#FECACA",
                }}>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.38em]" style={{ color: "var(--color-text-muted)" }}>Net Balance</p>
                  <div className="flex items-center gap-2 mt-1">
                    {allClear
                      ? <CheckCircle2 className="w-4 h-4" style={{ color: "#1B5E45" }} />
                      : <AlertCircle className="w-4 h-4 text-red-500" />}
                    <p className="text-xs font-black" style={{ color: allClear ? "#1B5E45" : "#dc2626" }}>
                      {allClear ? "Account fully settled" : "Action required"}
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-black tabular-nums"
                  style={{ color: allClear ? "#1B5E45" : "#dc2626" }}>
                  KSh {currentTenant.arrears.toLocaleString()}
                </p>
              </div>

              {/* Settlement progress bar */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest"
                    style={{ color: "var(--color-text-muted)" }}>Settlement Progress</span>
                  <span className="text-[9px] font-black" style={{ color: "var(--color-green-deep)" }}>{settlePct}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--color-border-light)" }}>
                  <motion.div className="h-full rounded-full relative overflow-hidden"
                    style={{ background: "linear-gradient(90deg,#1B5E45,#3DBE7A)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${settlePct}%` }}
                    transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                    <motion.div className="absolute inset-0"
                      style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)" }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.8 }} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── STATUS ALERT ─────────────────────────────────────────────────── */}
        <Reveal delay={0.12}>
          <motion.div
            initial={{ scale: 0.97 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-4 p-5 rounded-2xl border-2"
            style={{
              background: allClear ? "var(--color-surface-tint)" : "#FFF5F5",
              borderColor: allClear ? "var(--color-border-mid)" : "#FECACA",
            }}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              allClear ? "bg-[#E8F5EE]" : "bg-red-100"
            }`}>
              {allClear
                ? <ShieldCheck className="w-5 h-5" style={{ color: "#1B5E45" }} />
                : <AlertCircle className="w-5 h-5 text-red-500" />}
            </div>
            <div>
              <p className="text-sm font-black mb-1"
                style={{ color: allClear ? "#1B5E45" : "#dc2626" }}>
                {allClear ? "Account Verified & Current" : `Outstanding Balance: KSh ${currentTenant.arrears.toLocaleString()}`}
              </p>
              <p className="text-xs font-medium leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {allClear
                  ? "Your rental account is fully up to date. Thank you for maintaining timely payments."
                  : "Please settle this outstanding amount at your earliest convenience to avoid any service interruption."}
              </p>
            </div>
          </motion.div>
        </Reveal>

        {/* ── M-PESA PAYMENT CTA ───────────────────────────────────────────── */}
        <Reveal delay={0.14}>
          <div className="relative rounded-[1.8rem] overflow-hidden border"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            {/* Subtle dot grid */}
            <div className="absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(27,94,69,0.8) 1px,transparent 0)", backgroundSize: "20px 20px" }} />
            {/* Green glow */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-72 h-72 rounded-full -mr-24 -mt-24"
              style={{ background: "radial-gradient(circle,rgba(61,190,122,1),transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/25 to-transparent" />

            <div className="relative z-10 p-7 md:p-9">
              {/* M-Pesa badge + live tag */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 px-4 rounded-xl flex items-center justify-center shadow-sm border"
                  style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                  <img src="/images/mpesa-logo.png" alt="M-Pesa"
                    className="h-5"
                    onError={e => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        '<span style="font-size:13px;font-weight:900;color:#4CAF50">M-PESA</span>';
                    }} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                  style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)" }}>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A]" />
                  <span className="text-[9px] font-black uppercase tracking-widest"
                    style={{ color: "var(--color-green-deep)" }}>
                    Live Payment Gateway
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-sm">
                  <p className="text-xl font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                    Settle Your Balance Securely
                  </p>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    Use M-Pesa for instant, verified rent payment. Rent is due by the 1st of each month.
                  </p>
                  <div className="flex items-center gap-4 pt-1">
                    {[
                      { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Encrypted" },
                      { icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: "Instant" },
                      { icon: <Clock className="w-3.5 h-3.5" />, label: "24/7 Access" },
                    ].map((badge, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"
                        style={{ color: "var(--color-text-muted)" }}>
                        {badge.icon} {badge.label}
                      </div>
                    ))}
                  </div>
                </div>

                <a href="/tenant/payments" className="shrink-0 w-full md:w-auto">
                  <motion.button
                    whileHover={{ y: -2, boxShadow: "0 20px 50px rgba(27,94,69,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-black text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg,#1B5E45,#246B4F)",
                      boxShadow: "0 8px 28px rgba(27,94,69,0.28)",
                    }}>
                    Pay Now via M-Pesa
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </TenantLayout>
  );
}