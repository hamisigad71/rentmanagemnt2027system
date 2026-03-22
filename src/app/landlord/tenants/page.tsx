'use client';

import React, { useState, useRef } from 'react';
import LandlordLayout from '@/components/LandlordLayout';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { mockTenants, mockUnits, mockBuildings } from '@/data/mockData';
import { getAvatarUrl } from '@/utils/avatarUtils';
import {
  Users, Search, AlertTriangle, Mail, Phone,
  ShieldCheck, Building2, Hash, TrendingUp,
  Plus, CheckCircle2, DollarSign, ChevronDown,
  ArrowUpRight, X, Calendar, Home,
} from 'lucide-react';

/* ── helpers ─────────────────────────────────────────────────────────────────*/
function getAssignment(unitId: string) {
  const unit     = mockUnits.find(u => u.id === unitId);
  const building = mockBuildings.find(b => b.id === unit?.buildingId);
  return { unitNumber: unit?.number || 'N/A', buildingName: building?.name || '—' };
}

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
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

function Counter({ to, prefix = '' }: { to: number; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1000, 1);
      setCount(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}</span>;
}

function MiniBar({ pct, color = '#3DBE7A' }: { pct: number; color?: string }) {
  return (
    <div className="h-1 rounded-full overflow-hidden w-full" style={{ background: '#E5E7EB' }}>
      <motion.div className="h-full rounded-full" style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

function CircleProgress({ pct }: { pct: number }) {
  const r    = 18;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" className="-rotate-90">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#E5E7EB" strokeWidth="5" />
      <motion.circle cx="24" cy="24" r={r} fill="none"
        stroke="#3DBE7A" strokeWidth="5" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════════*/
export default function TenantsPage() {
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState<'all' | 'active' | 'arrears'>('all');
  const [selectedTenant, setSel]  = useState<any>(null);
  const [expandedId, setExpanded] = useState<string | null>(null);

  const total     = mockTenants.length;
  const active    = mockTenants.filter(t => t.status === 'active').length;
  const inArrears = mockTenants.filter(t => t.arrears > 0).length;
  const totalRent = mockTenants.reduce((s, t) => s + t.rent, 0);
  const avgRent   = Math.round(totalRent / (total || 1));
  const occPct    = Math.round((active  / (total || 1)) * 100);
  const compPct   = Math.round(((total - inArrears) / (total || 1)) * 100);

  const filtered = mockTenants.filter(t => {
    const d = getAssignment(t.unitId);
    const ok = `${t.name} ${d.buildingName} ${d.unitNumber} ${t.email} ${t.phone}`
      .toLowerCase().includes(search.toLowerCase());
    if (filter === 'active')  return ok && t.status === 'active';
    if (filter === 'arrears') return ok && t.arrears > 0;
    return ok;
  });

  return (
    <LandlordLayout>
      <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

        {/* ═══ HEADER ═══════════════════════════════════════════════════════ */}
        <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-0">

          {/* Title row */}
          <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-[#3DBE7A]" />
                </div>
                <p className="text-[8px] font-black uppercase tracking-[0.45em]"
                  style={{ color: 'var(--color-text-muted)' }}>
                  Tenant Registry
                </p>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none"
                style={{ color: 'var(--color-text-primary)' }}>
                Resident{' '}
                <span className="bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] bg-clip-text text-transparent">
                  Management
                </span>
              </h1>
            </div>
            <button
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#1B5E45,#3DBE7A)', boxShadow: '0 4px 14px rgba(27,94,69,0.28)' }}>
              <Plus className="w-3.5 h-3.5" /> Onboard Tenant
            </button>
          </Reveal>

          {/* KPI strip — horizontal scroll on mobile */}
          <Reveal delay={0.04}>
            <div className="flex gap-3 mb-6 overflow-x-auto pb-1 -mx-1 px-1 snap-x scrollbar-hide">
              {[
                { label: 'Total Tenants',    numVal: total,     prefix: '',      icon: Users,         accent: true },
                { label: 'Active Leases',    numVal: active,    prefix: '',      icon: CheckCircle2 },
                { label: 'In Arrears',       numVal: inArrears, prefix: '',      icon: AlertTriangle, danger: true },
                { label: 'Monthly Revenue',  numVal: totalRent, prefix: 'KSh ',  icon: DollarSign },
                { label: 'Avg Rent / Unit',  numVal: avgRent,   prefix: 'KSh ',  icon: TrendingUp },
              ].map(({ label, numVal, prefix, icon: Icon, accent, danger }, i) => (
                <div key={i}
                  className="flex-shrink-0 snap-start rounded-2xl p-4 border overflow-hidden relative transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    width: 156,
                    background: accent ? 'linear-gradient(135deg,#1B5E45,#246B4F)'
                      : danger ? '#FFF5F5' : 'var(--color-card)',
                    borderColor: accent ? 'transparent' : danger ? '#FECACA' : 'var(--color-border-light)',
                    boxShadow: accent ? '0 8px 28px rgba(27,94,69,0.22)' : 'var(--shadow-card)',
                  }}>
                  {accent && <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/8 rounded-full" />}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${
                    accent ? 'bg-white/15' : danger ? 'bg-red-100' : 'bg-[#E8F5EE] border border-[#C4D4C9]'
                  }`}>
                    <Icon className="w-4 h-4"
                      style={{ color: accent ? 'rgba(255,255,255,0.9)' : danger ? '#dc2626' : '#1B5E45' }} />
                  </div>
                  <p className="text-xl font-black leading-none mb-1"
                    style={{ color: accent ? 'white' : danger ? '#dc2626' : 'var(--color-text-primary)' }}>
                    <Counter to={numVal} prefix={prefix} />
                  </p>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] leading-tight"
                    style={{ color: accent ? 'rgba(255,255,255,0.48)' : 'var(--color-text-muted)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Occupancy + compliance */}
          <Reveal delay={0.07}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Occupancy Rate',    pct: occPct,  detail: `${active} of ${total} active leases` },
                { label: 'Payment Compliance', pct: compPct, detail: `${total - inArrears} of ${total} fully paid` },
              ].map((bar, i) => (
                <div key={i} className="rounded-2xl border p-4 flex items-center gap-4"
                  style={{ background: 'var(--color-card)', borderColor: 'var(--color-border-light)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <CircleProgress pct={bar.pct} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-black" style={{ color: 'var(--color-green-deep)' }}>{bar.pct}%</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black mb-1.5" style={{ color: 'var(--color-text-primary)' }}>{bar.label}</p>
                    <MiniBar pct={bar.pct} />
                    <p className="text-[9px] font-bold mt-1.5" style={{ color: 'var(--color-text-muted)' }}>{bar.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Search + filters */}
          <Reveal delay={0.09}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                  style={{ color: 'var(--color-text-muted)' }} />
                <input type="text" placeholder="Search name, unit, email…"
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                  style={{ background: 'var(--color-card)', border: '1px solid var(--color-border-light)', color: 'var(--color-text-primary)' }}
                  suppressHydrationWarning />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {(['all', 'active', 'arrears'] as const).map(f => {
                  const count = f === 'all' ? total : f === 'active' ? active : inArrears;
                  return (
                    <button key={f} onClick={() => setFilter(f)}
                      className="px-3.5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
                      style={{
                        background: filter === f ? 'var(--color-surface-tint)' : 'var(--color-card)',
                        border: `1px solid ${filter === f ? 'var(--color-border-mid)' : 'var(--color-border-light)'}`,
                        color: filter === f ? 'var(--color-green-deep)' : 'var(--color-text-muted)',
                      }}>
                      {f.charAt(0).toUpperCase() + f.slice(1)} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ═══ TENANT LIST ══════════════════════════════════════════════════ */}
        <div className="px-4 sm:px-6 md:px-8 pb-10 space-y-2">

          {/* Desktop column labels */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-4 pb-1">
            {[
              { label: 'Resident',    col: 'col-span-3' },
              { label: 'Assignment', col: 'col-span-2' },
              { label: 'Contact',    col: 'col-span-3' },
              { label: 'Financials', col: 'col-span-2' },
              { label: 'Status',     col: 'col-span-1' },
              { label: '',           col: 'col-span-1' },
            ].map((h, i) => (
              <p key={i} className={`${h.col} text-[8px] font-black uppercase tracking-[0.38em]`}
                style={{ color: 'var(--color-text-muted)' }}>{h.label}</p>
            ))}
          </div>

          <AnimatePresence>
            {filtered.map((tenant, i) => {
              const details    = getAssignment(tenant.unitId);
              const hasArrears = tenant.arrears > 0;
              const isExpanded = expandedId === tenant.id;
              const settlePct  = Math.min(100, Math.round(((tenant.paidAmount || 0) / (tenant.rent || 1)) * 100));

              return (
                <motion.div key={tenant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border overflow-hidden transition-shadow duration-200"
                  style={{
                    background: 'var(--color-card)',
                    borderColor: hasArrears ? '#FECACA' : 'var(--color-border-light)',
                    borderLeft: `3px solid ${hasArrears ? '#ef4444' : isExpanded ? '#1B5E45' : 'transparent'}`,
                    boxShadow: isExpanded ? '0 8px 32px rgba(0,0,0,0.08)' : 'var(--shadow-card)',
                  }}>

                  {/* ─── Summary row ─────────────────────────────────────── */}
                  <div
                    className="grid grid-cols-12 gap-2 md:gap-3 items-center px-3 md:px-4 py-3 cursor-pointer group transition-colors duration-150"
                    onClick={() => setExpanded(isExpanded ? null : tenant.id)}
                    onMouseEnter={e => { if (!isExpanded) (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-tint)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>

                    {/* Resident cell */}
                    <div className="col-span-9 md:col-span-3 flex items-center gap-2.5 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-border-light)' }}>
                          <img src={getAvatarUrl(tenant.name)} alt={tenant.name} className="w-full h-full object-cover" />
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                          tenant.status === 'active' ? 'bg-[#3DBE7A]' : 'bg-gray-300'}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black truncate" style={{ color: 'var(--color-text-primary)' }}>{tenant.name}</p>
                        <p className="text-[8px] font-bold uppercase tracking-widest mt-0.5"
                          style={{ color: 'var(--color-text-muted)' }}>#{tenant.id.split('-').pop()}</p>
                      </div>
                    </div>

                    {/* Mobile: status + chevron */}
                    <div className="col-span-3 flex items-center justify-end gap-2 md:hidden">
                      <Badge text={tenant.status === 'active' ? 'Active' : 'Inactive'}
                        type={tenant.status === 'active' ? 'success' : 'default'} />
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                      </motion.div>
                    </div>

                    {/* Assignment — desktop */}
                    <div className="hidden md:block col-span-2 min-w-0">
                      <p className="text-xs font-black truncate" style={{ color: 'var(--color-text-primary)' }}>
                        {details.buildingName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] font-bold text-[#3DBE7A]">U-{details.unitNumber}</span>
                        <span className="text-[9px] font-bold" style={{ color: 'var(--color-text-muted)' }}>
                          · R-{tenant.roomNumber || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Contact — desktop */}
                    <div className="hidden md:block col-span-3 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                        <span className="text-xs font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{tenant.phone}</span>
                      </div>
                    </div>

                    {/* Financials — desktop */}
                    <div className="hidden md:block col-span-2">
                      <p className="text-sm font-black tabular-nums" style={{ color: 'var(--color-text-primary)' }}>
                        KSh {tenant.rent.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {hasArrears
                          ? <><AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span className="text-[9px] font-black text-red-500 truncate">{tenant.arrears.toLocaleString()} due</span></>
                          : <><CheckCircle2 className="w-3 h-3 text-[#3DBE7A] flex-shrink-0" />
                              <span className="text-[9px] font-black text-[#3DBE7A]">Clear</span></>}
                      </div>
                    </div>

                    {/* Status — desktop */}
                    <div className="hidden md:flex col-span-1 items-center">
                      <Badge text={tenant.status === 'active' ? 'Active' : 'Inactive'}
                        type={tenant.status === 'active' ? 'success' : 'default'} />
                    </div>

                    {/* Expand + profile — desktop */}
                    <div className="hidden md:flex col-span-1 items-center justify-end gap-1.5">
                      <button
                        onClick={e => { e.stopPropagation(); setSel(tenant); }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:bg-[#E8F5EE] hover:border-[#C4D4C9]"
                        style={{ borderColor: 'var(--color-border-light)' }} title="Full profile">
                        <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
                      </button>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                      </motion.div>
                    </div>
                  </div>

                  {/* ─── Expandable panel ─────────────────────────────────── */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t"
                        style={{ borderColor: 'var(--color-border-light)' }}>
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                          {/* Assignment tile */}
                          <div className="rounded-xl border p-3.5 space-y-2.5"
                            style={{ background: 'var(--color-background-alt)', borderColor: 'var(--color-border-light)' }}>
                            <p className="text-[8px] font-black uppercase tracking-[0.35em]" style={{ color: 'var(--color-text-muted)' }}>Assignment</p>
                            {[
                              { icon: <Building2 className="w-3 h-3 text-[#3DBE7A]" />, label: 'Building', val: details.buildingName },
                              { icon: <Home className="w-3 h-3 text-[#3DBE7A]" />,      label: 'Unit',     val: `U-${details.unitNumber}` },
                              { icon: <Hash className="w-3 h-3 text-[#3DBE7A]" />,      label: 'Room',     val: tenant.roomNumber || 'N/A' },
                            ].map((r, i) => (
                              <div key={i} className="flex items-center gap-2 min-w-0">
                                {r.icon}
                                <span className="text-[9px] font-bold flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>{r.label}:</span>
                                <span className="text-[10px] font-black truncate" style={{ color: 'var(--color-text-primary)' }}>{r.val}</span>
                              </div>
                            ))}
                          </div>

                          {/* Contact tile */}
                          <div className="rounded-xl border p-3.5 space-y-2.5"
                            style={{ background: 'var(--color-background-alt)', borderColor: 'var(--color-border-light)' }}>
                            <p className="text-[8px] font-black uppercase tracking-[0.35em]" style={{ color: 'var(--color-text-muted)' }}>Contact</p>
                            {[
                              { icon: <Mail className="w-3 h-3" />,  val: tenant.email },
                              { icon: <Phone className="w-3 h-3" />, val: tenant.phone },
                              { icon: <Calendar className="w-3 h-3" />, val: tenant.moveInDate || '—' },
                            ].map((r, i) => (
                              <div key={i} className="flex items-center gap-2 min-w-0">
                                <span className="flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>{r.icon}</span>
                                <span className="text-[10px] font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>{r.val}</span>
                              </div>
                            ))}
                          </div>

                          {/* Financials tile */}
                          <div className="rounded-xl border p-3.5"
                            style={{
                              background: hasArrears ? '#FFF5F5' : 'var(--color-background-alt)',
                              borderColor: hasArrears ? '#FECACA' : 'var(--color-border-light)',
                            }}>
                            <p className="text-[8px] font-black uppercase tracking-[0.35em] mb-2.5" style={{ color: 'var(--color-text-muted)' }}>Financials</p>
                            <div className="space-y-1.5">
                              {[
                                { label: 'Rent',    val: `KSh ${tenant.rent.toLocaleString()}`,              color: 'var(--color-text-primary)' },
                                { label: 'Paid',    val: `KSh ${(tenant.paidAmount||0).toLocaleString()}`,   color: 'var(--color-green-deep)' },
                                { label: 'Arrears', val: `KSh ${tenant.arrears.toLocaleString()}`,           color: hasArrears ? '#dc2626' : 'var(--color-green-deep)' },
                              ].map((r, i) => (
                                <div key={i} className="flex justify-between">
                                  <span className="text-[9px] font-bold" style={{ color: 'var(--color-text-muted)' }}>{r.label}</span>
                                  <span className="text-[10px] font-black" style={{ color: r.color }}>{r.val}</span>
                                </div>
                              ))}
                              <div className="pt-1.5">
                                <MiniBar pct={settlePct} color={hasArrears ? '#ef4444' : '#3DBE7A'} />
                                <p className="text-[8px] font-bold mt-1 text-right" style={{ color: 'var(--color-text-muted)' }}>{settlePct}% settled</p>
                              </div>
                            </div>
                          </div>

                          {/* Actions tile */}
                          <div className="rounded-xl border p-3.5 flex flex-col gap-2"
                            style={{ background: 'var(--color-background-alt)', borderColor: 'var(--color-border-light)' }}>
                            <p className="text-[8px] font-black uppercase tracking-[0.35em]" style={{ color: 'var(--color-text-muted)' }}>Actions</p>
                            <div className="flex flex-col gap-2 flex-1 justify-center">
                              <button onClick={() => setSel(tenant)}
                                className="w-full py-2 rounded-lg text-white text-[9px] font-black uppercase tracking-widest transition-all hover:-translate-y-0.5"
                                style={{ background: 'linear-gradient(135deg,#1B5E45,#3DBE7A)' }}>
                                Full Profile
                              </button>
                              <button className="w-full py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all hover:bg-white"
                                style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-muted)' }}>
                                Send Message
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <ShieldCheck className="w-3 h-3 text-[#3DBE7A] flex-shrink-0" />
                              <p className="text-[8px] font-bold" style={{ color: 'var(--color-text-muted)' }}>
                                {tenant.status === 'active' ? 'Verified Active' : 'Inactive Account'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-20 flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                style={{ background: 'var(--color-background-alt)', borderColor: 'var(--color-border-light)' }}>
                <Search className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-black" style={{ color: 'var(--color-text-primary)' }}>No residents found</p>
                <p className="text-xs font-medium mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Adjust your search or filter to see results.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ FULL PROFILE MODAL ════════════════════════════════════════════ */}
      <Modal
        isOpen={!!selectedTenant}
        onClose={() => setSel(null)}
        title=""
        size="4xl"
        className="rounded-[1.5rem] p-0 overflow-hidden border-none"
      >
        {selectedTenant && (() => {
          const details    = getAssignment(selectedTenant.unitId);
          const hasArrears = selectedTenant.arrears > 0;
          const settlePct  = Math.min(100, Math.round(
            ((selectedTenant.paidAmount || 0) / (selectedTenant.rent || 1)) * 100));
          return (
            <div style={{ background: 'var(--color-background)' }}>

              {/* Dark hero */}
              <div className="relative overflow-hidden" style={{ background: '#0F0F0F', minHeight: 118 }}>
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.5) 1px,transparent 0)', backgroundSize: '22px 22px' }} />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-12 -mt-12"
                  style={{ background: 'rgba(61,190,122,0.16)' }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />
                <div className="relative z-10 px-7 py-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
                        <img src={getAvatarUrl(selectedTenant.name)} alt={selectedTenant.name}
                          className="w-full h-full object-cover" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0F0F0F] ${
                        selectedTenant.status === 'active' ? 'bg-[#3DBE7A]' : 'bg-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight">{selectedTenant.name}</h3>
                      <div className="flex items-center gap-2.5 mt-1">
                        <p className="text-[8px] font-black uppercase tracking-[0.38em] text-white/35">
                          #{selectedTenant.id.split('-').pop()}
                        </p>
                        <Badge text={selectedTenant.status === 'active' ? 'Active' : 'Inactive'}
                          type={selectedTenant.status === 'active' ? 'success' : 'default'} />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSel(null)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-white/15"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <X className="w-4 h-4 text-white/50" />
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Contact card */}
                <div className="rounded-2xl border p-4"
                  style={{ background: 'var(--color-card)', borderColor: 'var(--color-border-light)' }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.38em] mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    Contact
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { icon: <Mail className="w-3.5 h-3.5" />,     label: 'Email',   val: selectedTenant.email },
                      { icon: <Phone className="w-3.5 h-3.5" />,    label: 'Phone',   val: selectedTenant.phone },
                      { icon: <Calendar className="w-3.5 h-3.5" />, label: 'Move-in', val: selectedTenant.moveInDate || '—' },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border"
                          style={{ background: 'var(--color-background-alt)', borderColor: 'var(--color-border-light)', color: 'var(--color-text-muted)' }}>
                          {r.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{r.label}</p>
                          <p className="text-xs font-black truncate" style={{ color: 'var(--color-text-primary)' }}>{r.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property card */}
                <div className="rounded-2xl border p-4"
                  style={{ background: 'var(--color-card)', borderColor: 'var(--color-border-light)' }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.38em] mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    Property Assignment
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { icon: <Building2 className="w-3.5 h-3.5" />, label: 'Building', val: details.buildingName },
                      { icon: <Home className="w-3.5 h-3.5" />,      label: 'Unit',     val: `U-${details.unitNumber}` },
                      { icon: <Hash className="w-3.5 h-3.5" />,      label: 'Room',     val: selectedTenant.roomNumber || 'N/A' },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border"
                          style={{ background: 'var(--color-background-alt)', borderColor: 'var(--color-border-light)', color: '#3DBE7A' }}>
                          {r.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{r.label}</p>
                          <p className="text-xs font-black truncate" style={{ color: 'var(--color-text-primary)' }}>{r.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial card */}
                <div className="rounded-2xl border p-4"
                  style={{
                    background: hasArrears ? '#FFF5F5' : 'var(--color-card)',
                    borderColor: hasArrears ? '#FECACA' : 'var(--color-border-light)',
                  }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.38em] mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    Financial Summary
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: 'Monthly Rent', val: `KSh ${selectedTenant.rent?.toLocaleString()}`,        color: 'var(--color-text-primary)' },
                      { label: 'Paid Amount',   val: `KSh ${selectedTenant.paidAmount?.toLocaleString()}`, color: 'var(--color-green-deep)' },
                      { label: 'Arrears',       val: `KSh ${selectedTenant.arrears?.toLocaleString()}`,    color: hasArrears ? '#dc2626' : 'var(--color-green-deep)' },
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b last:border-0"
                        style={{ borderColor: hasArrears ? '#FED7D7' : 'var(--color-border-light)' }}>
                        <span className="text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>{r.label}</span>
                        <span className="text-sm font-black" style={{ color: r.color }}>{r.val}</span>
                      </div>
                    ))}
                    <div className="pt-1 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Settlement</span>
                        <span className="text-[9px] font-black" style={{ color: hasArrears ? '#dc2626' : '#3DBE7A' }}>{settlePct}%</span>
                      </div>
                      <MiniBar pct={settlePct} color={hasArrears ? '#ef4444' : '#3DBE7A'} />
                    </div>
                  </div>
                </div>

                {/* Lease dark card */}
                <div className="rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(145deg,#0A1F15,#1B5E45)' }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -mr-6 -mt-6"
                    style={{ background: 'rgba(61,190,122,0.22)' }} />
                  <div className="p-4 space-y-3.5 relative z-10">
                    <p className="text-[8px] font-black uppercase tracking-[0.38em] text-white/30">Lease Details</p>
                    {[
                      { label: 'Move-in Date', val: selectedTenant.moveInDate || '—' },
                      { label: 'Lease Status', val: selectedTenant.status === 'active' ? 'Active' : 'Inactive' },
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-[9px] font-bold text-white/38">{r.label}</span>
                        <span className="text-xs font-black text-white">{r.val}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3DBE7A]" />
                      <span className="text-[8px] font-black text-white/38 uppercase tracking-widest">Verified Account</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 flex gap-3">
                <button className="flex-1 py-3 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#1B5E45,#3DBE7A)', boxShadow: '0 4px 16px rgba(27,94,69,0.25)' }}>
                  Send Message
                </button>
                <button onClick={() => setSel(null)}
                  className="flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-widest border transition-all hover:bg-[#F7F8F5]"
                  style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-muted)' }}>
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