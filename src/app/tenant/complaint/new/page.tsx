"use client";

import React, { useState, useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { mockComplaints, mockTenants } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import {
  AlertCircle, Plus, Search, CheckCircle2, Clock,
  CircleDot, ChevronRight, X, Calendar, Tag,
  Wrench, Wifi, Droplets, Zap, Shield, MoreHorizontal,
  MessageSquare, ArrowRight, ShieldCheck, Timer,
  CheckCheck, Filter,
} from "lucide-react";

/* ─── types ──────────────────────────────────────────────────────────────── */
type Priority = "low" | "medium" | "high";
type Status   = "all" | "pending" | "in-progress" | "resolved";

/* ─── config ─────────────────────────────────────────────────────────────── */
function priorityConf(p: string) {
  if (p === "high")   return { label: "High",   dot: "#ef4444", bg: "#FFF5F5", text: "#dc2626", border: "#FECACA" };
  if (p === "medium") return { label: "Medium", dot: "#f59e0b", bg: "#FFFBEB", text: "#d97706", border: "#FDE68A" };
  return                     { label: "Low",    dot: "#3DBE7A", bg: "#F0FDF4", text: "#1B5E45", border: "#BBF7D0" };
}

function statusConf(s: string) {
  if (s === "resolved")    return { label: "Resolved",    Icon: CheckCheck,  color: "#1B5E45", bg: "var(--color-surface-tint)", border: "var(--color-border-mid)" };
  if (s === "in-progress") return { label: "In Progress", Icon: Timer,       color: "#d97706", bg: "#FFFBEB",                    border: "#FDE68A" };
  return                          { label: "Pending",     Icon: CircleDot,   color: "#dc2626", bg: "#FFF5F5",                    border: "#FECACA" };
}

const CATEGORIES = [
  { label: "Plumbing",     icon: <Droplets className="w-4 h-4" /> },
  { label: "Electrical",   icon: <Zap className="w-4 h-4" /> },
  { label: "Internet",     icon: <Wifi className="w-4 h-4" /> },
  { label: "Maintenance",  icon: <Wrench className="w-4 h-4" /> },
  { label: "Security",     icon: <Shield className="w-4 h-4" /> },
  { label: "Other",        icon: <MoreHorizontal className="w-4 h-4" /> },
];

/* ─── reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── progress ring ──────────────────────────────────────────────────────── */
function Ring({ pct, size = 56, stroke = 5, color = "#3DBE7A" }: {
  pct: number; size?: number; stroke?: number; color?: string;
}) {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════*/
export default function TenantComplaintsPage() {
  const { userName } = useAuth();
  const currentTenant = mockTenants[0];

  /* filter tenant's own complaints */
  const myComplaints = mockComplaints.filter(c => c.tenantId === currentTenant.id);

  const [filter, setFilter]       = useState<Status>("all");
  const [search, setSearch]       = useState("");
  const [selected, setSelected]   = useState<any>(null);
  const [showForm, setShowForm]   = useState(false);

  /* form state */
  const [form, setForm] = useState({
    title: "", category: "", priority: "medium" as Priority, description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  /* stats */
  const total      = myComplaints.length;
  const pending    = myComplaints.filter(c => c.status === "pending").length;
  const inProgress = myComplaints.filter(c => c.status === "in-progress").length;
  const resolved   = myComplaints.filter(c => c.status === "resolved").length;
  const resolvePct = total ? Math.round((resolved / total) * 100) : 0;

  /* filtered list */
  const filtered = myComplaints.filter(c => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchSearch = `${c.title} ${c.category}`.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  /* submit handler */
  const handleSubmit = () => {
    if (!form.title || !form.category || !form.description) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setForm({ title: "", category: "", priority: "medium", description: "" });
    }, 2000);
  };

  return (
    <TenantLayout>
      <div className="min-h-screen p-5 md:p-8 space-y-6 max-w-[1200px] mx-auto"
        style={{ background: "var(--color-background)" }}>

        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                <AlertCircle className="w-3.5 h-3.5 text-[#3DBE7A]" />
              </div>
              <p className="text-[8px] font-black uppercase "
                style={{ color: "var(--color-text-muted)" }}>
                Tenant Portal
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none"
              style={{ color: "var(--color-text-primary)" }}>
              My{" "}
              <span className="bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] bg-clip-text text-transparent">
                Complaints
              </span>
            </h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-black uppercase  transition-all hover:-translate-y-0.5 whitespace-nowrap"
            style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 14px rgba(27,94,69,0.28)" }}>
            <Plus className="w-3.5 h-3.5" /> New Complaint
          </button>
        </Reveal>

        {/* ── STATS STRIP ────────────────────────────────────────────────── */}
        <Reveal delay={0.04}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Logged",   val: total,      icon: AlertCircle,  accent: true },
              { label: "Pending",        val: pending,    icon: CircleDot,    danger: true },
              { label: "In Progress",    val: inProgress, icon: Timer,        warn: true },
              { label: "Resolved",       val: resolved,   icon: CheckCheck },
            ].map(({ label, val, icon: Icon, accent, danger, warn }, i) => (
              <div key={i}
                className="relative rounded-2xl p-4 border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  background: accent ? "linear-gradient(135deg,#1B5E45,#246B4F)"
                    : danger ? "#FFF5F5" : warn ? "#FFFBEB" : "var(--color-card)",
                  borderColor: accent ? "transparent" : danger ? "#FECACA" : warn ? "#FDE68A" : "var(--color-border-light)",
                  boxShadow: accent ? "0 8px 28px rgba(27,94,69,0.22)" : "var(--shadow-card)",
                }}>
                {accent && <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/8 rounded-full" />}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${
                  accent ? "bg-white/15" : danger ? "bg-red-100" : warn ? "bg-amber-100" : "bg-[#E8F5EE] border border-[#C4D4C9]"
                }`}>
                  <Icon className="w-4 h-4"
                    style={{ color: accent ? "rgba(255,255,255,0.9)" : danger ? "#dc2626" : warn ? "#d97706" : "#1B5E45" }} />
                </div>
                <p className="text-2xl font-black leading-none mb-1"
                  style={{ color: accent ? "white" : danger ? "#dc2626" : warn ? "#d97706" : "var(--color-text-primary)" }}>
                  {val}
                </p>
                <p className="text-[8px] font-black uppercase "
                  style={{ color: accent ? "rgba(255,255,255,0.48)" : "var(--color-text-muted)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── RESOLUTION PROGRESS ──────────────────────────────────────────── */}
        <Reveal delay={0.06}>
          <div className="rounded-2xl border overflow-hidden"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative flex-shrink-0">
                <Ring pct={resolvePct} size={64} stroke={6} color="#3DBE7A" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black" style={{ color: "var(--color-green-deep)" }}>
                    {resolvePct}%
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black mb-1" style={{ color: "var(--color-text-primary)" }}>
                  Resolution Progress
                </p>
                <div className="h-2.5 rounded-full overflow-hidden mb-1.5"
                  style={{ background: "var(--color-border-light)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg,#1B5E45,#3DBE7A)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${resolvePct}%` }}
                    transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
                </div>
                <p className="text-[9px] font-bold" style={{ color: "var(--color-text-muted)" }}>
                  {resolved} of {total} complaints resolved
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                {[
                  { label: "Avg Response", val: "< 24h", color: "var(--color-green-deep)" },
                  { label: "SLA Rating",   val: "98%",   color: "var(--color-green-deep)" },
                ].map((s, i) => (
                  <div key={i} className="text-center sm:text-right">
                    <p className="text-[8px] font-black uppercase  mb-0.5"
                      style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
                    <p className="text-base font-black" style={{ color: s.color }}>{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── SEARCH + FILTER ──────────────────────────────────────────────── */}
        <Reveal delay={0.08}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                style={{ color: "var(--color-text-muted)" }} />
              <input type="text" placeholder="Search complaints…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                style={{ background: "var(--color-card)", border: "1px solid var(--color-border-light)", color: "var(--color-text-primary)" }}
                suppressHydrationWarning />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "pending", "in-progress", "resolved"] as Status[]).map(f => {
                const count = f === "all" ? total : myComplaints.filter(c => c.status === f).length;
                return (
                  <button key={f} onClick={() => setFilter(f)}
                    className="px-3.5 py-2 rounded-xl text-[9px] font-black uppercase  transition-all whitespace-nowrap"
                    style={{
                      background: filter === f ? "var(--color-surface-tint)" : "var(--color-card)",
                      border: `1px solid ${filter === f ? "var(--color-border-mid)" : "var(--color-border-light)"}`,
                      color: filter === f ? "var(--color-green-deep)" : "var(--color-text-muted)",
                    }}>
                    {f.replace("-", " ")} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── COMPLAINT CARDS ───────────────────────────────────────────────── */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="py-20 flex flex-col items-center gap-4 rounded-2xl border border-dashed"
              style={{ borderColor: "var(--color-border-light)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                {filter === "resolved"
                  ? <CheckCircle2 className="w-6 h-6" style={{ color: "#3DBE7A" }} />
                  : <ShieldCheck className="w-6 h-6" style={{ color: "var(--color-text-muted)" }} />}
              </div>
              <div className="text-center">
                <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>
                  {filter === "all" ? "No complaints logged" : `No ${filter.replace("-", " ")} complaints`}
                </p>
                <p className="text-xs font-medium mt-1" style={{ color: "var(--color-text-muted)" }}>
                  {filter === "all" ? "Tap 'New Complaint' to report an issue." : "Try a different filter."}
                </p>
              </div>
              {filter === "all" && (
                <button onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-black uppercase  mt-1"
                  style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)" }}>
                  <Plus className="w-3.5 h-3.5" /> Report Issue
                </button>
              )}
            </div>
          ) : (
            <AnimatePresence>
              {filtered.map((complaint, i) => {
                const pConf = priorityConf(complaint.priority);
                const sConf = statusConf(complaint.status);
                return (
                  <motion.div key={complaint.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.38, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setSelected(complaint)}
                    className="group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                    style={{
                      background: "var(--color-card)",
                      borderColor: "var(--color-border-light)",
                      borderLeft: `3px solid ${pConf.dot}`,
                      boxShadow: "var(--shadow-card)",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,94,69,0.2)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-light)"}
                  >
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Left content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[8px] font-black uppercase "
                            style={{ color: "var(--color-text-muted)" }}>
                            {complaint.category}
                          </span>
                          <span className="text-[8px]" style={{ color: "var(--color-border-light)" }}>·</span>
                          <span className="text-[8px] font-black uppercase "
                            style={{ color: "var(--color-text-muted)" }}>
                            {complaint.createdDate}
                          </span>
                        </div>
                        <p className="text-sm font-black leading-snug group-hover:text-[#1B5E45] transition-colors"
                          style={{ color: "var(--color-text-primary)" }}>
                          {complaint.title}
                        </p>
                        <p className="text-xs leading-relaxed line-clamp-2"
                          style={{ color: "var(--color-text-muted)" }}>
                          {complaint.description}
                        </p>
                      </div>

                      {/* Right badges + arrow */}
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          {/* Priority badge */}
                          <span className="px-2.5 py-1 rounded-full border text-[8px] font-black uppercase "
                            style={{ background: pConf.bg, color: pConf.text, borderColor: pConf.border }}>
                            {pConf.label}
                          </span>
                          {/* Status badge */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[9px] font-black"
                            style={{ background: sConf.bg, borderColor: sConf.border, color: sConf.color }}>
                            <sConf.Icon className="w-3 h-3" />
                            {sConf.label}
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-xl flex items-center justify-center border transition-all group-hover:bg-[#E8F5EE] group-hover:border-[#C4D4C9]"
                          style={{ borderColor: "var(--color-border-light)" }}>
                          <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--color-text-muted)" }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* ═══ DETAIL MODAL ═════════════════════════════════════════════════════ */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}
        title="" size="4xl" className="rounded-[1.5rem] p-0 overflow-hidden border-none">
        {selected && (() => {
          const pConf = priorityConf(selected.priority);
          const sConf = statusConf(selected.status);
          const progressPct = selected.status === "resolved" ? 100
            : selected.status === "in-progress" ? 55 : 10;
          return (
            <div style={{ background: "var(--color-background)" }}>
              {/* Dark hero */}
              <div className="relative overflow-hidden" style={{ background: "#0F0F0F", minHeight: 120 }}>
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.5) 1px,transparent 0)", backgroundSize: "22px 22px" }} />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-12 -mt-12"
                  style={{ background: `${pConf.dot}28` }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />
                {/* Priority left stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: pConf.dot }} />

                <div className="relative z-10 px-7 py-6 flex items-start justify-between gap-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[8px] font-black uppercase  text-white/30">
                        {selected.category}
                      </span>
                      <div className="w-px h-3 bg-white/15" />
                      <span className="text-[8px] font-black uppercase "
                        style={{ color: pConf.dot }}>
                        {pConf.label} Priority
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight leading-tight max-w-lg">
                      {selected.title}
                    </h3>
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black"
                        style={{ background: `${sConf.color}18`, borderColor: `${sConf.color}30`, color: sConf.color }}>
                        <sConf.Icon className="w-3 h-3" />
                        {sConf.label}
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/30">
                        <Calendar className="w-3 h-3" />
                        {selected.createdDate}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-white/15"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <X className="w-4 h-4 text-white/50" />
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Description */}
                <div className="rounded-2xl border p-5"
                  style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)" }}>
                  <p className="text-[8px] font-black uppercase  mb-4"
                    style={{ color: "var(--color-text-muted)" }}>Issue Description</p>
                  <p className="text-sm leading-relaxed italic"
                    style={{ color: "var(--color-text-primary)" }}>
                    "{selected.description}"
                  </p>
                  <div className="mt-5 pt-4 border-t flex flex-wrap gap-3"
                    style={{ borderColor: "var(--color-border-light)" }}>
                    {[
                      { label: "Ticket ID",  val: `#${selected.id.split("-").pop()}` },
                      { label: "Category",   val: selected.category },
                      { label: "Unit",       val: `Unit ${selected.unitId?.split("-").pop() || "—"}` },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl px-3 py-2 border"
                        style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                        <p className="text-[7px] font-black uppercase  mb-0.5"
                          style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                        <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status / dark card */}
                <div className="rounded-2xl overflow-hidden relative"
                  style={{ background: "linear-gradient(145deg,#0A1F15,#1B5E45)" }}>
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl -mr-8 -mt-8"
                    style={{ background: "rgba(61,190,122,0.22)" }} />
                  <div className="p-5 space-y-4 relative z-10">
                    <p className="text-[8px] font-black uppercase  text-white/30">
                      Resolution Status
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <Ring pct={progressPct} size={52} stroke={5} color="#3DBE7A" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-black text-white">{progressPct}%</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-white mb-1.5">
                          {selected.status.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </p>
                        <div className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.1)" }}>
                          <motion.div className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg,#1B5E45,#3DBE7A)" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Reported",  val: selected.createdDate },
                        { label: "SLA",       val: "24 Hours" },
                        { label: "Priority",  val: pConf.label },
                        { label: "Status",    val: sConf.label },
                      ].map((item, i) => (
                        <div key={i} className="p-2.5 rounded-xl border border-white/8"
                          style={{ background: "rgba(255,255,255,0.06)" }}>
                          <p className="text-[7px] font-black uppercase  text-white/28 mb-0.5">{item.label}</p>
                          <p className="text-[10px] font-black text-white">{item.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 flex gap-3">
                {selected.status !== "resolved" && (
                  <button className="flex-1 py-3 rounded-xl text-white text-xs font-black uppercase  transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 16px rgba(27,94,69,0.25)" }}>
                    Follow Up
                  </button>
                )}
                <button onClick={() => setSelected(null)}
                  className="flex-1 py-3 rounded-xl text-xs font-black uppercase  border transition-all hover:bg-[#F7F8F5]"
                  style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* ═══ NEW COMPLAINT MODAL ══════════════════════════════════════════════ */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}
        title="" size="5xl" className="rounded-[1.5rem] p-0 overflow-hidden border-none">
        <div style={{ background: "var(--color-background)" }}>

          {/* Dark hero */}
          <div className="relative overflow-hidden" style={{ background: "#0F0F0F", minHeight: 108 }}>
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.5) 1px,transparent 0)", backgroundSize: "22px 22px" }} />
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-12 -mt-12"
              style={{ background: "rgba(61,190,122,0.18)" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />
            <div className="relative z-10 px-7 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-[#3DBE7A]/28 flex items-center justify-center"
                  style={{ background: "rgba(61,190,122,0.14)" }}>
                  <MessageSquare className="w-4 h-4 text-[#3DBE7A]" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Report an Issue</p>
                  <p className="text-[8px] font-black uppercase  text-white/30">
                    Submit a new complaint
                  </p>
                </div>
              </div>
              <button onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/15"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">

            {/* Success state */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "var(--color-surface-tint)", border: "1px solid var(--color-border-mid)" }}>
                    <CheckCircle2 className="w-7 h-7 text-[#3DBE7A]" />
                  </div>
                  <p className="text-base font-black" style={{ color: "var(--color-text-primary)" }}>
                    Complaint Submitted!
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    Your issue has been logged. We'll respond within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!submitted && (
              <>
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase "
                    style={{ color: "var(--color-text-muted)" }}>
                    Issue Title
                  </label>
                  <input type="text" placeholder="Brief description of the issue…"
                    value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:border-[#3DBE7A] transition-all"
                    style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }} />
                </div>

                {/* Category grid */}
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase "
                    style={{ color: "var(--color-text-muted)" }}>
                    Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map(cat => (
                      <button key={cat.label} type="button"
                        onClick={() => setForm(p => ({ ...p, category: cat.label }))}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-black transition-all"
                        style={{
                          background: form.category === cat.label ? "var(--color-surface-tint)" : "var(--color-background-alt)",
                          borderColor: form.category === cat.label ? "var(--color-border-mid)" : "var(--color-border-light)",
                          color: form.category === cat.label ? "var(--color-green-deep)" : "var(--color-text-muted)",
                        }}>
                        {cat.icon}
                        <span className="text-[9px] uppercase ">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase "
                    style={{ color: "var(--color-text-muted)" }}>
                    Priority Level
                  </label>
                  <div className="flex gap-2">
                    {(["low", "medium", "high"] as Priority[]).map(p => {
                      const conf = priorityConf(p);
                      return (
                        <button key={p} type="button"
                          onClick={() => setForm(prev => ({ ...prev, priority: p }))}
                          className="flex-1 py-2.5 rounded-xl border text-[9px] font-black uppercase  transition-all"
                          style={{
                            background: form.priority === p ? conf.bg : "var(--color-background-alt)",
                            borderColor: form.priority === p ? conf.border : "var(--color-border-light)",
                            color: form.priority === p ? conf.text : "var(--color-text-muted)",
                          }}>
                          {conf.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase "
                    style={{ color: "var(--color-text-muted)" }}>
                    Detailed Description
                  </label>
                  <textarea placeholder="Please describe the issue in detail…" rows={4}
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:border-[#3DBE7A] transition-all resize-none"
                    style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }} />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button onClick={handleSubmit}
                    disabled={!form.title || !form.category || !form.description}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-black uppercase  transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 16px rgba(27,94,69,0.25)" }}>
                    Submit Complaint
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl text-sm font-black uppercase  border transition-all hover:bg-[#F7F8F5]"
                    style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </TenantLayout>
  );
}