"use client";

import React, { useState, useEffect, useRef } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Modal from "@/components/Modal";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { mockComplaints } from "@/data/mockData";
import { getAvatarUrl } from "@/utils/avatarUtils";
import {
  AlertCircle, Search, Wrench, ShieldAlert,
  Calendar, ChevronRight, X, Plus,
  CheckCheck, Timer, CircleDot,
} from "lucide-react";

type Status = "all" | "pending" | "in-progress" | "resolved";

/* ─── config helpers ────────────────────────────────────────────────────────── */
function priorityConfig(p: string) {
  if (p === "high")   return { label: "High",   dot: "#ef4444", bg: "#FFF5F5", text: "#dc2626", border: "#FECACA", barBg: "rgba(239,68,68,0.12)" };
  if (p === "medium") return { label: "Medium", dot: "#f59e0b", bg: "#FFFBEB", text: "#d97706", border: "#FDE68A", barBg: "rgba(245,158,11,0.12)" };
  return                     { label: "Low",    dot: "#3DBE7A", bg: "#F0FDF4", text: "#1B5E45", border: "#BBF7D0", barBg: "rgba(61,190,122,0.1)" };
}

function statusConfig(s: string) {
  if (s === "resolved")    return { label: "Resolved",    icon: CheckCheck, color: "#1B5E45", bg: "var(--color-surface-tint)", border: "var(--color-border-mid)" };
  if (s === "in-progress") return { label: "In Progress", icon: Timer,      color: "#d97706", bg: "#FFFBEB",                    border: "#FDE68A" };
  return                          { label: "Pending",     icon: CircleDot,  color: "#dc2626", bg: "#FFF5F5",                    border: "#FECACA" };
}

/* ─── animation wrapper ────────────────────────────────────────────────────── */
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

/* ─── animated progress ring ─────────────────────────────────────────────── */
function ProgressRing({ pct, size = 56, stroke = 5, color = "#3DBE7A" }: {
  pct: number; size?: number; stroke?: number; color?: string;
}) {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function ComplaintsPage() {
  const [filter, setFilter]       = useState<Status>("all");
  const [search, setSearch]       = useState("");
  const [selected, setSelected]   = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const total      = mockComplaints.length;
  const pending    = mockComplaints.filter(c => c.status === "pending").length;
  const inProgress = mockComplaints.filter(c => c.status === "in-progress").length;
  const resolved   = mockComplaints.filter(c => c.status === "resolved").length;
  const highPrio   = mockComplaints.filter(c => c.priority === "high").length;

  const filtered = mockComplaints.filter(c => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchSearch = `${c.title} ${c.tenantName} ${c.category}`.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <LandlordLayout>
      <div className="min-h-screen" style={{ background: "var(--color-background)" }}>

        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="px-6 md:px-8 pt-7 pb-0">

          {/* Title row */}
          <Reveal className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-[#3DBE7A] flex items-center justify-center text-white">
                  <Wrench className="w-4 h-4" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.42em]"
                  style={{ color: "var(--color-text-muted)" }}>
                  Maintenance & Issues
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none"
                style={{ color: "var(--color-text-primary)" }}>
                Issue{" "}
                <span className="bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] bg-clip-text text-transparent">
                  Tracker
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                  style={{ color: "var(--color-text-muted)" }} />
                <input type="text" placeholder="Search issues…" value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all w-52"
                  style={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border-light)",
                    color: "var(--color-text-primary)",
                  }} />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 whitespace-nowrap"
                style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 14px rgba(27,94,69,0.28)" }}>
                <Plus className="w-3.5 h-3.5" /> New Issue
              </button>
            </div>
          </Reveal>

          {/* Stats strip */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
              {[
                { label: "Total Issues",  val: total,      icon: AlertCircle, accent: true },
                { label: "Pending",       val: pending,    icon: CircleDot,   danger: true },
                { label: "In Progress",   val: inProgress, icon: Timer,       warn: true },
                { label: "Resolved",      val: resolved,   icon: CheckCheck },
              ].map(({ label, val, icon: Icon, accent, danger, warn }, i) => (
                <div key={i}
                  className="relative rounded-2xl p-4 border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: accent ? "linear-gradient(135deg,#1B5E45,#246B4F)"
                      : danger ? "#FFF5F5" : warn ? "#FFFBEB" : "var(--color-card)",
                    borderColor: accent ? "transparent" : danger ? "#FECACA" : warn ? "#FDE68A" : "var(--color-border-light)",
                    boxShadow: accent ? "0 8px 28px rgba(27,94,69,0.22)" : "var(--shadow-card)",
                  }}>
                  {accent && <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/8 rounded-full" />}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      accent ? "bg-white/15" : danger ? "bg-red-100" : warn ? "bg-amber-100" : "bg-[#E8F5EE]"
                    }`}>
                      <Icon className="w-4 h-4"
                        style={{ color: accent ? "rgba(255,255,255,0.9)" : danger ? "#dc2626" : warn ? "#d97706" : "#1B5E45" }} />
                    </div>
                    {accent && highPrio > 0 && (
                      <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 uppercase tracking-widest">
                        {highPrio} high
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-black leading-none"
                    style={{ color: accent ? "white" : danger ? "#dc2626" : warn ? "#d97706" : "var(--color-text-primary)" }}>
                    {val}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-[0.32em] mt-1"
                    style={{ color: accent ? "rgba(255,255,255,0.48)" : "var(--color-text-muted)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Filter tabs */}
          <Reveal delay={0.08}>
            <div className="flex items-center gap-0 mb-7 border-b" style={{ borderColor: "var(--color-border-light)" }}>
              {(["all", "pending", "in-progress", "resolved"] as Status[]).map(s => {
                const count  = s === "all" ? total : mockComplaints.filter(c => c.status === s).length;
                const active = filter === s;
                return (
                  <button key={s}
                    onClick={() => setFilter(s)}
                    className="relative px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
                    style={{ color: active ? "var(--color-green-deep)" : "var(--color-text-muted)" }}>
                    {s.replace("-", " ")}
                    {isMounted && (
                      <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-black"
                        style={{
                          background: active ? "var(--color-surface-tint)" : "transparent",
                          color: active ? "var(--color-green-deep)" : "var(--color-text-muted)",
                        }}>
                        {count}
                      </span>
                    )}
                    {active && (
                      <motion.div layoutId="tabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: "var(--color-green-deep)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* ── ISSUE CARDS GRID ─────────────────────────────────────────────── */}
        <div className="px-6 md:px-8 pb-10">
          {filtered.length === 0 ? (
            <div className="py-20 flex flex-col items-center gap-4 rounded-2xl border border-dashed"
              style={{ borderColor: "var(--color-border-light)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                <ShieldAlert className="w-6 h-6" style={{ color: "var(--color-text-muted)" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>No issues found</p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                  {filter === "all" ? "All clear — no incidents logged." : `No ${filter.replace("-"," ")} issues.`}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((c, i) => {
                  const pConf = priorityConfig(c.priority);
                  const sConf = statusConfig(c.status);
                  const SIcon = sConf.icon;
                  return (
                    <motion.div key={c.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.38, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setSelected(c)}
                      className="group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                      style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,94,69,0.22)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-light)"}
                    >
                      {/* Coloured priority top bar */}
                      <div className="h-1 w-full flex-shrink-0" style={{ background: pConf.dot }} />

                      <div className="p-5 flex flex-col gap-4 flex-1">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-[8px] font-black uppercase tracking-[0.38em] mb-1.5"
                              style={{ color: "var(--color-text-muted)" }}>
                              {c.category}
                            </p>
                            <h3 className="text-sm font-black leading-snug group-hover:text-[#1B5E45] transition-colors"
                              style={{ color: "var(--color-text-primary)" }}>
                              {c.title}
                            </h3>
                          </div>
                          <div className="flex-shrink-0 px-2.5 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest"
                            style={{ background: pConf.bg, color: pConf.text, borderColor: pConf.border }}>
                            {pConf.label}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs leading-relaxed line-clamp-2"
                          style={{ color: "var(--color-text-muted)" }}>
                          {c.description}
                        </p>

                        {/* Reporter row */}
                        <div className="flex items-center gap-2.5 py-3 border-t border-b"
                          style={{ borderColor: "var(--color-border-light)" }}>
                          <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 border"
                            style={{ borderColor: "var(--color-border-light)" }}>
                            <img src={getAvatarUrl(c.tenantName)} alt={c.tenantName}
                              className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black truncate" style={{ color: "var(--color-text-primary)" }}>
                              {c.tenantName}
                            </p>
                            <p className="text-[8px] font-bold uppercase tracking-widest"
                              style={{ color: "var(--color-text-muted)" }}>
                              Unit {c.unitId?.split("-").pop()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] font-bold flex-shrink-0"
                            style={{ color: "var(--color-text-muted)" }}>
                            <Calendar className="w-3 h-3" />
                            {c.createdDate}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[9px] font-black"
                            style={{ background: sConf.bg, borderColor: sConf.border, color: sConf.color }}>
                            <SIcon className="w-3 h-3" />
                            {sConf.label}
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
            </div>
          )}
        </div>
      </div>

      {/* ── DETAIL MODAL ────────────────────────────────────────────────────── */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title=""
        size="5xl"
        className="rounded-[1.5rem] p-0 overflow-hidden border-none"
      >
        {selected && (() => {
          const pConf      = priorityConfig(selected.priority);
          const sConf      = statusConfig(selected.status);
          const SIcon      = sConf.icon;
          const progressPct = selected.status === "resolved" ? 100 : selected.status === "in-progress" ? 55 : 10;
          return (
            <div style={{ background: "var(--color-background)" }}>

              {/* Dark hero */}
              <div className="relative overflow-hidden" style={{ background: "#0F0F0F", minHeight: 130 }}>
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.5) 1px,transparent 0)", backgroundSize: "24px 24px" }} />
                <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-[80px] -mr-16 -mt-16"
                  style={{ background: `${pConf.dot}28` }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />
                {/* Priority left stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: pConf.dot }} />

                <div className="relative z-10 px-8 py-7 flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-black uppercase tracking-[0.42em] text-white/30">
                        {selected.category}
                      </span>
                      <div className="w-px h-3 bg-white/15" />
                      <span className="text-[8px] font-black uppercase tracking-widest"
                        style={{ color: pConf.dot }}>
                        {pConf.label} Priority
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight leading-tight max-w-lg">
                      {selected.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black"
                        style={{ background: `${sConf.color}18`, borderColor: `${sConf.color}30`, color: sConf.color }}>
                        <SIcon className="w-3 h-3" />
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

              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Description */}
                <div className="rounded-2xl border p-5"
                  style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.38em] mb-4"
                    style={{ color: "var(--color-text-muted)" }}>Incident Description</p>
                  <p className="text-sm leading-relaxed italic"
                    style={{ color: "var(--color-text-primary)" }}>
                    "{selected.description}"
                  </p>
                  <div className="mt-5 pt-4 border-t flex items-center gap-3"
                    style={{ borderColor: "var(--color-border-light)" }}>
                    <div className="w-9 h-9 rounded-xl overflow-hidden border flex-shrink-0"
                      style={{ borderColor: "var(--color-border-light)" }}>
                      <img src={getAvatarUrl(selected.tenantName)} alt={selected.tenantName}
                        className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>
                        {selected.tenantName}
                      </p>
                      <p className="text-[8px] font-bold uppercase tracking-widest mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}>
                        Unit {selected.unitId?.split("-").pop()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resolution — dark card */}
                <div className="rounded-2xl overflow-hidden relative"
                  style={{ background: "linear-gradient(145deg,#0A1F15,#1B5E45)" }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10"
                    style={{ background: "rgba(61,190,122,0.22)" }} />
                  <div className="p-5 space-y-5 relative z-10">
                    <p className="text-[8px] font-black uppercase tracking-[0.38em] text-white/30">
                      Resolution Progress
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <ProgressRing pct={progressPct} size={56} stroke={5} color="#3DBE7A" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-black text-white">{progressPct}%</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-white mb-1.5">
                          {selected.status.replace("-"," ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </p>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
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
                        { label: "SLA",       val: "2.4 Hours" },
                        { label: "Priority",  val: pConf.label },
                        { label: "Category",  val: selected.category },
                      ].map((item, i) => (
                        <div key={i} className="p-3 rounded-xl border border-white/8"
                          style={{ background: "rgba(255,255,255,0.06)" }}>
                          <p className="text-[7px] font-black uppercase tracking-widest text-white/28 mb-0.5">{item.label}</p>
                          <p className="text-[10px] font-black text-white truncate">{item.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-7 pb-7 flex gap-3">
                <button className="flex-1 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 16px rgba(27,94,69,0.25)" }}>
                  {selected.status === "resolved" ? "Re-open Issue" : "Mark Resolved"}
                </button>
                <button className="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all hover:bg-[#F7F8F5]"
                  style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                  Assign Contractor
                </button>
                <button onClick={() => setSelected(null)}
                  className="px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all hover:bg-[#F7F8F5]"
                  style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </LandlordLayout>
  );
}