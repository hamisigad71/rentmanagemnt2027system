"use client";

import React, { useState, useRef, useEffect } from "react";
import TenantLayout from "@/components/TenantLayout";
import Badge from "@/components/Badge";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CreditCard, Smartphone, Building, ShieldCheck,
  Clock, History, Info, CheckCircle2, Calendar,
  Lock, Zap, ArrowRight, DollarSign, TrendingUp,
  ChevronRight, Download, Building2, Check, X,
} from "lucide-react";
import { mockPayments, mockTenants } from "@/data/mockData";
import { useAction } from "@/context/ActionContext";
import { LOADER_DURATION } from "@/utils/constants";

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.56, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Animated progress bar ─────────────────────────────────────────────── */
function MiniBar({ pct, color = "#3DBE7A" }: { pct: number; color?: string }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border-light)" }}>
      <motion.div className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg,#1B5E45,${color})` }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

/* ─── Field label ────────────────────────────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[8px] font-black uppercase  mb-1.5"
      style={{ color: "var(--color-text-muted)" }}>
      {children}
    </label>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all focus:border-[#1B5E45]";
const inputStyle = {
  background: "var(--color-background-alt)",
  borderColor: "var(--color-border-light)",
  color: "var(--color-text-primary)",
};

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════*/
export default function TenantPaymentsPage() {
  const currentTenant  = mockTenants[0];
  const tenantPayments = mockPayments.filter(p => p.tenantId === currentTenant.id);
  const [method, setMethod]   = useState<"mpesa" | "card" | "bank">("mpesa");
  const [amount, setAmount]   = useState(currentTenant.arrears > 0 ? currentTenant.arrears : 0);
  const [refId, setRefId]     = useState("");
  const { showAction, updateAction, hideAction } = useAction();

  useEffect(() => {
    setRefId(`${currentTenant.id}-${new Date().getMonth() + 1}`);
  }, [currentTenant.id]);

  const handlePayment = () => {
    showAction({ title: "Establishing Secure Protocol", message: "Synchronizing with banking ledger...", color: "green", icon: "published_with_changes" });
    setTimeout(() => {
      updateAction({ title: "Transaction Authorized", message: "Your rental account has been reconciled.", color: "green", icon: "check_circle" });
      setTimeout(() => hideAction(), 1000);
    }, LOADER_DURATION - 1000);
  };

  const settlePct = Math.min(100, Math.round((currentTenant.paidAmount / currentTenant.rent) * 100));
  const allClear  = currentTenant.arrears === 0;
  const totalPaid = tenantPayments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);

  return (
    <TenantLayout>
      <div className="min-h-screen p-5 md:p-8 space-y-7 max-w-[1200px] mx-auto"
        style={{ background: "var(--color-background)" }} suppressHydrationWarning>

        {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#1B5E45] flex items-center justify-center">
                <CreditCard className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-[8px] font-black uppercase "
                style={{ color: "var(--color-text-muted)" }}>
                Tenant Portal
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none"
              style={{ color: "var(--color-text-primary)" }}>
              Financial{" "}
              <span className="bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] bg-clip-text text-transparent">
                Portal
              </span>
            </h1>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--color-text-muted)" }}>
              Secure payment processing & transaction history
            </p>
          </div>
          <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-black uppercase  transition-all hover:bg-[#F7F8F5]"
            style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
            <Download className="w-3.5 h-3.5" /> Export XLSX
          </button>
        </Reveal>

        {/* ── ACCOUNT SUMMARY STRIP ────────────────────────────────────────── */}
        <Reveal delay={0.04}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Monthly Rent",    val: `KSh ${currentTenant.rent.toLocaleString()}`,       accent: true },
              { label: "Outstanding",     val: `KSh ${currentTenant.arrears.toLocaleString()}`,    danger: allClear ? false : true },
              { label: "Total Paid",      val: `KSh ${totalPaid.toLocaleString()}` },
              { label: "Settlement",      val: `${settlePct}%` },
            ].map((card, i) => (
              <div key={i}
                className="relative rounded-2xl p-4 border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  background: card.accent ? "linear-gradient(135deg,#1B5E45,#246B4F)"
                    : card.danger ? "#FFF5F5" : "var(--color-card)",
                  borderColor: card.accent ? "transparent" : card.danger ? "#FECACA" : "var(--color-border-light)",
                  boxShadow: card.accent ? "0 8px 28px rgba(27,94,69,0.22)" : "var(--shadow-card)",
                }}>
                {card.accent && <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/8 rounded-full" />}
                <p className="text-[8px] font-black uppercase  mb-1.5"
                  style={{ color: card.accent ? "rgba(255,255,255,0.5)" : "var(--color-text-muted)" }}>
                  {card.label}
                </p>
                <p className="text-lg font-black tracking-tight leading-none"
                  style={{ color: card.accent ? "white" : card.danger ? "#dc2626" : "var(--color-text-primary)" }}>
                  {card.val}
                </p>
                {i === 3 && (
                  <div className="mt-2.5">
                    <MiniBar pct={settlePct} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ═══ LEFT — PAYMENT FORM (3/5) ═══════════════════════════════════ */}
          <div className="lg:col-span-3 space-y-5">

            {/* Outstanding balance hero */}
            <Reveal delay={0.06}>
              <div className="relative rounded-[1.8rem] overflow-hidden border"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
                {/* Green accent header */}
                <div className="relative overflow-hidden p-6 border-b"
                  style={{ borderColor: "var(--color-border-light)" }}>
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(27,94,69,0.8) 1px,transparent 0)", backgroundSize: "18px 18px" }} />
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10"
                    style={{ background: "rgba(61,190,122,0.1)" }} />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A]" />
                        <p className="text-[8px] font-black uppercase "
                          style={{ color: "var(--color-text-muted)" }}>
                          Ref: {refId}
                        </p>
                      </div>
                      <p className="text-[8px] font-black uppercase  mb-1.5"
                        style={{ color: "var(--color-text-muted)" }}>
                        Current Outstanding Balance
                      </p>
                      <p className="text-4xl font-black tracking-tighter"
                        style={{ color: allClear ? "#1B5E45" : "var(--color-text-primary)" }}>
                        KSh {currentTenant.arrears.toLocaleString()}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase  ${
                      allClear ? "bg-[#E8F5EE] border-[#C4D4C9] text-[#1B5E45]" : "bg-red-50 border-red-200 text-red-600"
                    }`}>
                      {allClear
                        ? <CheckCircle2 className="w-3 h-3" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                      {allClear ? "Clear" : "Due"}
                    </div>
                  </div>
                  {/* Settlement bar */}
                  <div className="relative z-10 mt-4 space-y-1.5">
                    <div className="flex justify-between text-[8px] font-black uppercase "
                      style={{ color: "var(--color-text-muted)" }}>
                      <span>Settlement</span><span style={{ color: "var(--color-green-deep)" }}>{settlePct}%</span>
                    </div>
                    <MiniBar pct={settlePct} />
                  </div>
                </div>

                {/* Amount input */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Enter Payment Amount</h4>
                      <p className="text-[9px] font-bold uppercase  mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}>Specify how much you want to pay</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border"
                      style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)" }}>
                      <Zap className="w-3 h-3" style={{ color: "#1B5E45" }} />
                      <span className="text-[8px] font-black uppercase "
                        style={{ color: "#1B5E45" }}>Instant</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <span className="text-sm font-black" style={{ color: "#1B5E45" }}>KSh</span>
                    </div>
                    <input type="number" value={amount}
                      onChange={e => setAmount(Number(e.target.value))}
                      className="w-full pl-14 pr-28 py-4 rounded-xl border text-2xl font-black outline-none transition-all focus:border-[#1B5E45]"
                      style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }}
                      placeholder="0" />
                    <div className="absolute right-3 inset-y-0 flex items-center gap-1.5">
                      {[
                        { label: "Full", fn: () => setAmount(currentTenant.arrears) },
                        { label: "50%",  fn: () => setAmount(Math.round(currentTenant.arrears / 2)) },
                      ].map((btn, i) => (
                        <button key={i} onClick={btn.fn}
                          className="px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase  border transition-all hover:bg-[#1B5E45] hover:text-white hover:border-[#1B5E45]"
                          style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Payment method selector */}
            <Reveal delay={0.08}>
              <div className="rounded-[1.8rem] border overflow-hidden"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-3 px-6 pt-6 pb-5 border-b"
                  style={{ borderColor: "var(--color-border-light)" }}>
                  <div className="w-9 h-9 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Payment Method</h3>
                    <p className="text-[8px] font-black uppercase "
                      style={{ color: "var(--color-text-muted)" }}>Choose your preferred option</p>
                  </div>
                </div>

                <div className="p-5 space-y-2 border-b" style={{ borderColor: "var(--color-border-light)" }}>
                  {[
                    { id: "mpesa", label: "M-Pesa",       sub: "Mobile Payment · Instant STK Push", icon: <Smartphone className="w-4 h-4" /> },
                    { id: "card",  label: "Debit / Credit", sub: "Visa · Mastercard · PCI Secured",   icon: <CreditCard className="w-4 h-4" /> },
                    { id: "bank",  label: "Bank Transfer",  sub: "Direct Account · Equity Bank",       icon: <Building2 className="w-4 h-4" /> },
                  ].map(m => {
                    const active = method === m.id;
                    return (
                      <motion.button key={m.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMethod(m.id as any)}
                        className="w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all"
                        style={{
                          background: active ? "var(--color-surface-tint)" : "var(--color-background-alt)",
                          borderColor: active ? "var(--color-border-mid)" : "var(--color-border-light)",
                        }}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          active ? "bg-[#1B5E45] text-white" : "bg-[#E8E8E4] text-[#9CA3AF]"
                        }`}>
                          {m.icon}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>{m.label}</p>
                          <p className="text-[9px] font-bold" style={{ color: "var(--color-text-muted)" }}>{m.sub}</p>
                        </div>
                        {active && (
                          <div className="w-5 h-5 rounded-full bg-[#1B5E45] flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Method-specific form */}
                <div className="p-5">
                  <AnimatePresence mode="wait">

                    {/* M-PESA */}
                    {method === "mpesa" && (
                      <motion.div key="mpesa"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4">
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl border"
                          style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)" }}>
                          <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-5 object-contain flex-shrink-0"
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>M-Pesa Express</p>
                            <p className="text-[9px] font-bold" style={{ color: "var(--color-text-muted)" }}>STK push to your registered number</p>
                          </div>
                          <Badge text="Instant" type="success" />
                        </div>
                        <div>
                          <FieldLabel>Phone Number</FieldLabel>
                          <div className="relative">
                            <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                              style={{ color: "var(--color-text-muted)" }} />
                            <input type="tel" placeholder="0712 345 678"
                              className={`${inputCls} pl-10`} style={inputStyle} />
                          </div>
                          <p className="text-[9px] font-bold flex items-center gap-1.5 mt-2"
                            style={{ color: "var(--color-text-muted)" }}>
                            <Info className="w-3 h-3 flex-shrink-0" style={{ color: "#3DBE7A" }} />
                            You'll receive an STK prompt to complete payment
                          </p>
                        </div>
                        <motion.button whileTap={{ scale: 0.97 }}
                          onClick={handlePayment}
                          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-black uppercase  transition-all hover:-translate-y-0.5"
                          style={{ background: "linear-gradient(135deg,#1B5E45,#246B4F)", boxShadow: "0 6px 20px rgba(27,94,69,0.28)" }}>
                          Pay KSh {amount.toLocaleString()} via M-Pesa
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    )}

                    {/* CARD */}
                    {method === "card" && (
                      <motion.div key="card"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4">
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl border"
                          style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)" }}>
                          <Lock className="w-4 h-4 flex-shrink-0" style={{ color: "#1B5E45" }} />
                          <div>
                            <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>PCI-DSS Compliant</p>
                            <p className="text-[9px] font-bold" style={{ color: "var(--color-text-muted)" }}>Card details are fully encrypted</p>
                          </div>
                        </div>
                        <div>
                          <FieldLabel>Card Number</FieldLabel>
                          <input type="text" placeholder="0000 0000 0000 0000"
                            className={`${inputCls} font-mono`} style={inputStyle} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <FieldLabel>Expiry</FieldLabel>
                            <input type="text" placeholder="MM / YY" className={inputCls} style={inputStyle} />
                          </div>
                          <div>
                            <FieldLabel>CVV</FieldLabel>
                            <input type="password" placeholder="•••" className={inputCls} style={inputStyle} />
                          </div>
                        </div>
                        <motion.button whileTap={{ scale: 0.97 }}
                          onClick={handlePayment}
                          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-black uppercase  transition-all hover:-translate-y-0.5"
                          style={{ background: "linear-gradient(135deg,#1B5E45,#246B4F)", boxShadow: "0 6px 20px rgba(27,94,69,0.28)" }}>
                          Charge KSh {amount.toLocaleString()}
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    )}

                    {/* BANK */}
                    {method === "bank" && (
                      <motion.div key="bank"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4">
                        <div className="rounded-2xl p-4 border space-y-3"
                          style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                          <p className="text-[8px] font-black uppercase "
                            style={{ color: "var(--color-text-muted)" }}>Bank Details</p>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { label: "Bank",        val: "Equity Bank",   green: false },
                              { label: "Account",     val: "1234 5678",     green: false },
                              { label: "Beneficiary", val: "RentManager",   green: false },
                              { label: "Reference",   val: refId,           green: true  },
                            ].map((row, i) => (
                              <div key={i} className="rounded-xl p-3 border"
                                style={{ background: "var(--color-card)", borderColor: row.green ? "var(--color-border-mid)" : "var(--color-border-light)" }}>
                                <p className="text-[7px] font-black uppercase  mb-0.5"
                                  style={{ color: row.green ? "#1B5E45" : "var(--color-text-muted)" }}>{row.label}</p>
                                <p className={`text-xs font-black font-mono ${row.green ? "text-[#1B5E45]" : ""}`}
                                  style={{ color: row.green ? undefined : "var(--color-text-primary)" }}>
                                  {row.val}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <motion.button whileTap={{ scale: 0.97 }}
                          onClick={handlePayment}
                          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-black uppercase  transition-all hover:-translate-y-0.5"
                          style={{ background: "linear-gradient(135deg,#1B5E45,#246B4F)", boxShadow: "0 6px 20px rgba(27,94,69,0.28)" }}>
                          Initiate Transfer
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>

            {/* Trust badges */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
                <p className="text-[8px] font-black uppercase "
                  style={{ color: "var(--color-text-muted)" }}>
                  Secure Payment Partners
                </p>
                <div className="flex items-center gap-5">
                  <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-4 object-contain opacity-60 hover:opacity-100 transition-opacity"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="w-px h-4" style={{ background: "var(--color-border-light)" }} />
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" style={{ color: "#1B5E45" }} />
                    <span className="text-[9px] font-black uppercase "
                      style={{ color: "var(--color-green-deep)" }}>PCI-DSS</span>
                  </div>
                  <div className="w-px h-4" style={{ background: "var(--color-border-light)" }} />
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#1B5E45" }} />
                    <span className="text-[9px] font-black uppercase "
                      style={{ color: "var(--color-green-deep)" }}>256-bit AES</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ═══ RIGHT — SIDEBAR (2/5) ════════════════════════════════════════ */}
          <div className="lg:col-span-2 space-y-5">

            {/* Security info */}
            <Reveal delay={0.07}>
              <div className="rounded-[1.8rem] border overflow-hidden"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
                {/* Dark header */}
                <div className="relative overflow-hidden p-5"
                  style={{ background: "linear-gradient(135deg,#0A1F15,#1B5E45)" }}>
                  <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.6) 1px,transparent 0)", backgroundSize: "16px 16px" }} />
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -mr-6 -mt-6"
                    style={{ background: "rgba(61,190,122,0.22)" }} />
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/12 border border-white/12 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-white/80" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">Security</p>
                      <p className="text-[8px] font-black uppercase  text-white/38">
                        Transaction protection
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { icon: <Lock className="w-3.5 h-3.5" />, title: "256-bit Encryption", desc: "Military-grade AES-GCM protection" },
                    { icon: <ShieldCheck className="w-3.5 h-3.5" />, title: "PCI-DSS Certified", desc: "Bank-level security standards" },
                    { icon: <Clock className="w-3.5 h-3.5" />, title: "24/7 Support", desc: "Expert assistance around the clock" },
                    { icon: <Zap className="w-3.5 h-3.5" />, title: "Instant Processing", desc: "Transactions confirmed in seconds" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl border"
                      style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                      <div className="w-7 h-7 rounded-lg bg-[#E8F5EE] flex items-center justify-center flex-shrink-0"
                        style={{ color: "#1B5E45" }}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>{item.title}</p>
                        <p className="text-[9px] font-bold mt-0.5" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Next payment reminder */}
            <Reveal delay={0.09}>
              <div className="rounded-2xl border p-5 space-y-3"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Payment Schedule</p>
                    <p className="text-[8px] font-black uppercase "
                      style={{ color: "var(--color-text-muted)" }}>Upcoming due dates</p>
                  </div>
                </div>
                {[
                  { month: "April 2025",  amount: currentTenant.rent, due: "Due 1st", status: "upcoming" },
                  { month: "March 2025",  amount: currentTenant.rent, due: "Paid",    status: "paid" },
                  { month: "Feb 2025",    amount: currentTenant.rent, due: "Paid",    status: "paid" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-t"
                    style={{ borderColor: "var(--color-border-light)" }}>
                    <div>
                      <p className="text-xs font-black" style={{ color: "var(--color-text-primary)" }}>{row.month}</p>
                      <p className="text-[9px] font-bold mt-0.5"
                        style={{ color: row.status === "upcoming" ? "#d97706" : "var(--color-green-deep)" }}>
                        {row.due}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-black tabular-nums"
                        style={{ color: "var(--color-text-primary)" }}>
                        KSh {row.amount.toLocaleString()}
                      </p>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        row.status === "paid" ? "bg-[#E8F5EE]" : "bg-amber-100"
                      }`}>
                        {row.status === "paid"
                          ? <Check className="w-3 h-3" style={{ color: "#1B5E45" }} strokeWidth={3} />
                          : <Clock className="w-3 h-3 text-amber-600" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── PAYMENT HISTORY ──────────────────────────────────────────────── */}
        <Reveal delay={0.06}>
          <div className="rounded-[1.8rem] border overflow-hidden"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b"
              style={{ borderColor: "var(--color-border-light)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                  <History className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Payment History</h3>
                  <p className="text-[8px] font-black uppercase "
                    style={{ color: "var(--color-text-muted)" }}>
                    Complete transaction ledger
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-[9px] font-black uppercase  transition-all hover:gap-2"
                style={{ color: "var(--color-green-deep)" }}>
                Export <Download className="w-3 h-3" />
              </button>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#1A1A1A" }}>
                    {["Transaction ID", "Month", "Amount", "Status", "Date"].map((h, i) => (
                      <th key={i}
                        className="px-6 py-4 text-left text-[9px] font-black uppercase  text-white/50">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tenantPayments.map((payment, i) => (
                    <motion.tr key={payment.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="transition-colors border-b"
                      style={{
                        background: i % 2 === 0 ? "var(--color-card)" : "var(--color-background-alt)",
                        borderColor: "var(--color-border-light)",
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--color-surface-tint)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "var(--color-card)" : "var(--color-background-alt)"}
                    >
                      <td className="px-6 py-4 text-xs font-black font-mono"
                        style={{ color: "#1B5E45" }}>
                        #PAY-{payment.id.split("-").pop()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                            <Calendar className="w-3.5 h-3.5" style={{ color: "#1B5E45" }} />
                          </div>
                          <span className="text-xs font-black uppercase "
                            style={{ color: "var(--color-text-primary)" }}>
                            {payment.month}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-black tabular-nums"
                        style={{ color: "var(--color-text-primary)" }}>
                        KSh {payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          text={payment.status === "completed" ? "Paid" : payment.status === "pending" ? "Pending" : "Failed"}
                          type={payment.status === "completed" ? "success" : payment.status === "pending" ? "warning" : "error"} />
                      </td>
                      <td className="px-6 py-4 text-xs font-bold uppercase "
                        style={{ color: "var(--color-text-muted)" }}>
                        {payment.date}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden p-4 space-y-3">
              {tenantPayments.map((payment, i) => (
                <motion.div key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border overflow-hidden"
                  style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                  <div className="flex items-center justify-between px-4 py-3 border-b"
                    style={{ background: "#1A1A1A", borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <History className="w-3.5 h-3.5 text-white/70" />
                      </div>
                      <p className="text-xs font-black text-white/80 font-mono">
                        #PAY-{payment.id.split("-").pop()}
                      </p>
                    </div>
                    <Badge
                      text={payment.status === "completed" ? "Paid" : payment.status === "pending" ? "Pending" : "Failed"}
                      type={payment.status === "completed" ? "success" : payment.status === "pending" ? "warning" : "error"} />
                  </div>
                  <div className="p-4 space-y-2.5">
                    {[
                      { label: "Month",  val: payment.month.toUpperCase() },
                      { label: "Amount", val: `KSh ${payment.amount.toLocaleString()}`, green: true },
                      { label: "Date",   val: payment.date },
                    ].map((row, j) => (
                      <div key={j} className="flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase "
                          style={{ color: "var(--color-text-muted)" }}>{row.label}</p>
                        <p className={`text-xs font-black ${row.green ? "" : ""}`}
                          style={{ color: row.green ? "#1B5E45" : "var(--color-text-primary)" }}>
                          {row.val}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </TenantLayout>
  );
}