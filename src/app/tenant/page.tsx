"use client";

import React, { useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import Badge from "@/components/Badge";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  DollarSign, Calendar, AlertCircle, FileText, Plus, ArrowRight,
  TrendingUp, CreditCard, History, ShieldCheck, Zap, Home,
  Wrench, FileCheck, Bell, Phone, Download, Eye,
  MessageSquare, CheckCircle, Clock, Users, Wifi, Car,
  Dumbbell, ArrowUpRight, Activity, ChevronRight,
} from "lucide-react";
import { mockTenants, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

// ── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent = false, danger = false }: {
  label: string; value: string; sub?: string; accent?: boolean; danger?: boolean;
}) {
  return (
    <div className="relative rounded-2xl p-5 border overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background: accent ? "linear-gradient(135deg,#1B5E45,#246B4F)" : danger ? "#FFF5F5" : "var(--color-card)",
        borderColor: accent ? "transparent" : danger ? "#FECACA" : "var(--color-border-light)",
        boxShadow: accent ? "0 8px 32px rgba(27,94,69,0.22)" : "var(--shadow-card)",
      }}>
      {accent && <div className="absolute top-0 right-0 w-24 h-24 bg-white/8 rounded-full -mr-8 -mt-8" />}
      <p className="text-[9px] font-black uppercase tracking-[0.35em] mb-2"
        style={{ color: accent ? "rgba(255,255,255,0.55)" : "var(--color-text-muted)" }}>
        {label}
      </p>
      <p className={`text-2xl font-black tracking-tight leading-none mb-1 ${
        accent ? "text-white" : danger ? "text-red-600" : ""}`}
        style={{ color: accent || danger ? undefined : "var(--color-text-primary)" }}>
        {value}
      </p>
      {sub && (
        <p className="text-[10px] font-bold mt-1.5"
          style={{ color: accent ? "rgba(255,255,255,0.4)" : "var(--color-text-muted)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function TenantDashboard() {
  const { userName, displayImage } = useAuth();
  const currentTenant = mockTenants[0];
  const activeName = userName || currentTenant.name;
  const tenantPayments = mockPayments.filter((p) => p.tenantId === currentTenant.id);
  const tenantComplaints = mockComplaints.filter((c) => c.tenantId === currentTenant.id);

  const nextPaymentDate = new Date();
  nextPaymentDate.setDate(1);
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
  const settlementPct = Math.round((currentTenant.paidAmount / currentTenant.rent) * 100);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <TenantLayout>
      <div className="p-5 md:p-8 space-y-6 md:space-y-8 max-w-[1400px] mx-auto">

        {/* ── HERO BANNER ───────────────────────────────────────────────────── */}
        <Reveal>
          <div className="relative rounded-[1.8rem] overflow-hidden"
            style={{ minHeight: 220, boxShadow: "0 20px 60px rgba(0,0,0,0.14)" }}>
            {/* BG image */}
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80"
              alt="Property"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/92 via-[#0D0D0D]/75 to-[#0D0D0D]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent" />

            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/50 to-transparent" />

            <div className="relative z-10 p-7 md:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              {/* Left */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.38em] text-white/45">
                    Active Residential Portal
                  </span>
                </div>

                <div>
                  <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-[0.92]">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-[#3DBE7A] to-[#2AE299] bg-clip-text text-transparent">
                      {activeName.split(" ")[0]}
                    </span>
                  </h1>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-black text-white/60"
                      style={{ background: "rgba(255,255,255,0.06)" }}>
                      Unit {currentTenant.unitId}
                    </div>
                    <span className="text-white/20">•</span>
                    <p className="text-sm font-medium text-white/45">Residential Management System</p>
                  </div>
                </div>

                {/* Mini stats row */}
                <div className="flex items-center gap-6 pt-1">
                  <div>
                    <p className="text-lg font-black text-white tracking-tight">
                      KSh {currentTenant.rent.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/35 mt-0.5">Monthly Rent</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <p className="text-lg font-black tracking-tight"
                      style={{ color: currentTenant.arrears > 0 ? "#f87171" : "#3DBE7A" }}>
                      KSh {currentTenant.arrears.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/35 mt-0.5">Outstanding</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <p className="text-lg font-black text-white tracking-tight">
                      {nextPaymentDate.toLocaleDateString("en-KE", { month: "short", day: "numeric" })}
                    </p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/35 mt-0.5">Next Due</p>
                  </div>
                </div>
              </div>

              {/* Right — profile CTA + verified badge */}
              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <Link href="/tenant/profile">
                  <button className="flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-black text-white transition-all hover:shadow-[0_12px_40px_rgba(27,94,69,0.4)] hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg,#1B5E45,#246B4F)" }}>
                    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center bg-[#1B5E45]">
                      {displayImage
                        ? <img src={displayImage} alt="" className="w-full h-full object-cover" />
                        : <span className="text-[10px] font-black text-white">{getInitials(activeName)}</span>}
                    </div>
                    Manage Profile
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10"
                  style={{ background: "rgba(61,190,122,0.08)" }}>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3DBE7A]" strokeWidth={2} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Verified Account</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── STATS ROW ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Monthly Rent", value: `KSh ${currentTenant.rent.toLocaleString()}`, sub: "Due 1st of each month", accent: true },
            { label: "Balance Due", value: `KSh ${currentTenant.arrears.toLocaleString()}`, sub: currentTenant.arrears > 0 ? "Action required" : "All clear", danger: currentTenant.arrears > 0 },
            { label: "Next Due Date", value: nextPaymentDate.toLocaleDateString("en-KE", { month: "short", day: "numeric", year: "numeric" }), sub: "Upcoming payment" },
            { label: "Open Tickets", value: String(tenantComplaints.filter((c) => c.status !== "resolved").length), sub: "Active complaints" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <StatCard {...s} />
            </Reveal>
          ))}
        </div>

        {/* ── FINANCIAL HEALTH + QUICK ACTIONS ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Financial block — 2/3 */}
          <Reveal className="lg:col-span-2">
            <div className="rounded-[1.8rem] border overflow-hidden h-full"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              {/* Header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 12px rgba(27,94,69,0.3)" }}>
                    <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Financial Health</h3>
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                      Monthly reconciliation
                    </p>
                  </div>
                </div>
                <Link href="/tenant/payments">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-black transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 16px rgba(27,94,69,0.25)" }}>
                    <Plus className="w-3.5 h-3.5" /> Pay Now
                  </button>
                </Link>
              </div>

              <div className="p-7 space-y-6">
                {/* Trio */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Gross Obligation", val: `KSh ${currentTenant.rent.toLocaleString()}`, color: "var(--color-text-primary)", bg: "var(--color-background-alt)" },
                    { label: "Settled Credits", val: `KSh ${currentTenant.paidAmount.toLocaleString()}`, color: "var(--color-green-deep)", bg: "var(--color-surface-tint)" },
                    { label: "Arrears Pending", val: `KSh ${currentTenant.arrears.toLocaleString()}`, color: "#dc2626", bg: "#FFF5F5" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl p-4 border"
                      style={{ background: item.bg, borderColor: i === 2 ? "#FECACA" : "var(--color-border-light)" }}>
                      <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-2"
                        style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                      <p className="text-lg font-black tracking-tight leading-none" style={{ color: item.color }}>
                        {item.val}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: "#3DBE7A" }} />
                      <span className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>Settlement Progress</span>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ color: "var(--color-green-deep)", background: "var(--color-surface-tint)" }}>
                      {settlementPct}% Fulfilled
                    </span>
                  </div>
                  <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: "var(--color-border-light)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${settlementPct}%` }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: "linear-gradient(90deg,#1B5E45,#3DBE7A)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Quick Actions — 1/3 */}
          <Reveal delay={0.1}>
            <div className="rounded-[1.8rem] border overflow-hidden h-full flex flex-col"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1B5E45]">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Quick Actions</h3>
              </div>

              <div className="p-4 flex-1 grid grid-cols-2 gap-3 content-start">
                {[
                  { href: "/tenant/payments", icon: <DollarSign className="w-5 h-5" />, label: "Pay Rent", bg: "var(--color-surface-tint)", color: "var(--color-green-deep)" },
                  { href: "/tenant/complaint/new", icon: <MessageSquare className="w-5 h-5" />, label: "Report Issue", bg: "#FFF5F5", color: "#dc2626" },
                  { href: "/tenant/documents", icon: <FileCheck className="w-5 h-5" />, label: "Documents", bg: "var(--color-background-alt)", color: "var(--color-text-muted)" },
                  { href: "/tenant/complaints", icon: <Activity className="w-5 h-5" />, label: "My Tickets", bg: "var(--color-background-alt)", color: "var(--color-text-muted)" },
                ].map((action, i) => (
                  <Link key={i} href={action.href}>
                    <button className="w-full aspect-square flex flex-col items-center justify-center gap-2.5 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                      style={{ background: action.bg, borderColor: "var(--color-border-light)" }}>
                      <span style={{ color: action.color }}>{action.icon}</span>
                      <span className="text-[10px] font-black text-center leading-tight"
                        style={{ color: "var(--color-text-primary)" }}>{action.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── PROPERTY + MAINTENANCE ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Property Details */}
          <Reveal>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              {/* Hero image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                  alt="Unit Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-white font-black text-base leading-none">Unit {currentTenant.unitId}</p>
                    <p className="text-white/55 text-[10px] font-bold uppercase tracking-widest mt-1">2BR Apartment · 5th Floor</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-full border border-[#3DBE7A]/30 text-[9px] font-black text-[#3DBE7A] uppercase tracking-widest"
                    style={{ background: "rgba(61,190,122,0.12)" }}>
                    Active Lease
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Spec grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Sq. Footage", val: "1,200 sq ft" },
                    { label: "Lease Term", val: "12 Months" },
                    { label: "Move-in", val: "Jan 2024" },
                    { label: "Lease End", val: "Dec 2024" },
                  ].map((spec, i) => (
                    <div key={i} className="rounded-xl p-3 border"
                      style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                      <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: "var(--color-text-muted)" }}>{spec.label}</p>
                      <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>{spec.val}</p>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                <div className="pt-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: "var(--color-text-muted)" }}>Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: <Wifi className="w-3 h-3" />, label: "WiFi" },
                      { icon: <Car className="w-3 h-3" />, label: "Parking" },
                      { icon: <Dumbbell className="w-3 h-3" />, label: "Gym" },
                      { icon: <Users className="w-3 h-3" />, label: "Pool" },
                    ].map((a, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold"
                        style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)", color: "var(--color-text-muted)" }}>
                        {a.icon}{a.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Maintenance */}
          <Reveal delay={0.08}>
            <div className="rounded-[1.8rem] border overflow-hidden flex flex-col"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              {/* Header image strip */}
              <div className="relative h-24 overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/b3/d0/bd/b3d0bdbeb468dc389af199ed31069187.jpg"
                  alt="Maintenance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/85 to-[#1A1A1A]/40" />
                <div className="absolute inset-0 flex items-center px-6 gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold   text-white/80">Maintenance</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Service Requests</p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 space-y-3">
                {[
                  { title: "Kitchen Faucet Repair", time: "2 days ago", status: "warning", statusLabel: "In Progress" },
                  { title: "AC Filter Replacement", time: "Completed yesterday", status: "success", statusLabel: "Completed" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-sm"
                    style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{
                          background: item.status === "success" ? "var(--color-surface-tint)" : "#FFF5F5",
                          color: item.status === "success" ? "var(--color-green-deep)" : "#dc2626",
                        }}>
                        {item.status === "success" ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>{item.title}</p>
                        <p className="text-[9px] font-bold mt-0.5" style={{ color: "var(--color-text-muted)" }}>{item.time}</p>
                      </div>
                    </div>
                    <Badge text={item.statusLabel} type={item.status as any} />
                  </div>
                ))}

                <Link href="/tenant/complaint/new" className="block pt-2">
                  <button className="w-full py-3 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 16px rgba(27,94,69,0.25)" }}>
                    <Plus className="w-3.5 h-3.5" /> Request Maintenance
                  </button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── ACTIVITY: PAYMENTS + COMPLAINTS ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Payment History */}
          <Reveal>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1B5E45]">
                    <History className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Ledger History</h3>
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Payment records</p>
                  </div>
                </div>
                <Link href="/tenant/payments"
                  className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: "var(--color-green-deep)" }}>
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-5 space-y-2">
                {tenantPayments.slice(0, 4).map((payment) => (
                  <div key={payment.id}
                    className="flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-sm group"
                    style={{ background: "var(--color-background-alt)", borderColor: "transparent" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-light)";
                      (e.currentTarget as HTMLElement).style.background = "var(--color-card)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      (e.currentTarget as HTMLElement).style.background = "var(--color-background-alt)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center border"
                        style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>{payment.month}</p>
                        <p className="text-[9px] font-bold mt-0.5" style={{ color: "var(--color-text-muted)" }}>{payment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-black tabular-nums" style={{ color: "var(--color-text-primary)" }}>
                        KSh {payment.amount.toLocaleString()}
                      </p>
                      <Badge
                        text={payment.status === "completed" ? "Verified" : "Pending"}
                        type={payment.status === "completed" ? "success" : "warning"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Support Requests */}
          <Reveal delay={0.08}>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-500">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Support Requests</h3>
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Active tickets</p>
                  </div>
                </div>
                <Link href="/tenant/complaints"
                  className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: "var(--color-green-deep)" }}>
                  All Tickets <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-5 space-y-2">
                {tenantComplaints.length > 0 ? tenantComplaints.map((complaint) => (
                  <div key={complaint.id}
                    className="p-4 rounded-2xl border-l-[3px] transition-all hover:shadow-sm"
                    style={{
                      background: "var(--color-background-alt)",
                      borderLeftColor: complaint.status === "resolved" ? "var(--color-green-deep)" : complaint.status === "in-progress" ? "#f59e0b" : "#ef4444",
                    }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: "var(--color-text-muted)" }}>
                          {complaint.category}
                        </p>
                        <p className="text-xs font-black leading-snug" style={{ color: "var(--color-text-primary)" }}>
                          {complaint.title}
                        </p>
                      </div>
                      <Badge
                        text={complaint.status === "resolved" ? "Resolved" : complaint.status === "in-progress" ? "Active" : "New"}
                        type={complaint.status === "resolved" ? "success" : complaint.status === "in-progress" ? "warning" : "error"}
                      />
                    </div>
                  </div>
                )) : (
                  <div className="py-14 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: "var(--color-surface-tint)", color: "#3DBE7A" }}>
                      <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                      No Active Incidents
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── DOCS + ANNOUNCEMENTS + CONTACTS ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Documents */}
          <Reveal>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-3 px-6 pt-6 pb-5 border-b"
                style={{ borderColor: "var(--color-border-light)" }}>
                <div className="w-9 h-9 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                  <FileCheck className="w-4 h-4 text-white/60" />
                </div>
                <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Documents</h3>
              </div>

              <div className="p-5 space-y-2">
                {[
                  { name: "Lease Agreement", date: "Jan 2024" },
                  { name: "House Rules", date: "Dec 2023" },
                  { name: "Payment Receipt", date: "Feb 2024" },
                ].map((doc, i) => (
                  <div key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl border transition-all hover:shadow-sm"
                    style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--color-surface-tint)", color: "var(--color-text-muted)" }}>
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>{doc.name}</p>
                        <p className="text-[9px] font-bold" style={{ color: "var(--color-text-muted)" }}>{doc.date}</p>
                      </div>
                    </div>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-[#E8F5EE]"
                      style={{ color: "var(--color-green-deep)" }}>
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Announcements */}
           

          {/* Emergency Contacts */}
          <Reveal delay={0.12}>
            <div className="rounded-[1.8rem] border overflow-hidden"
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              {/* Image header */}
              <div className="relative h-24 overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/b3/d0/bd/b3d0bdbeb468dc389af199ed31069187.jpg"
                  alt="Contacts"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/85 to-[#1A1A1A]/40" />
                <div className="absolute inset-0 flex items-center px-6 gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                      <p className="text-[13px] font-bold   tracking-widest text-white/40">Emergency Contacts</p> 
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Available 24/7</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2">
                {[
                  { role: "Property Manager", num: "+254 700 123 456" },
                  { role: "Maintenance", num: "+254 700 654 321" },
                  { role: "Security", num: "+254 700 987 654" },
                ].map((contact, i) => (
                  <div key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl border"
                    style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                    <div>
                      <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>{contact.role}</p>
                      <p className="text-[10px] font-bold mt-0.5" style={{ color: "var(--color-text-muted)" }}>{contact.num}</p>
                    </div>
                    <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[#E8F5EE]"
                      style={{ color: "var(--color-green-deep)" }}>
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </TenantLayout>
  );
}