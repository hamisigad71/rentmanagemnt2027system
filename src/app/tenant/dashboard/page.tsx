"use client";

import React from "react";
import Link from "next/link";
import TenantLayout from "@/components/TenantLayout";
import { mockTenants } from "@/data/mockData";
import { 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Wallet,
  Clock,
  FileText,
  Activity,
  Zap,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import Button from "@/components/Button";

export default function TenantDashboard() {
  const currentTenant = mockTenants[0];
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const paymentProgress = (currentTenant.paidAmount / currentTenant.rent) * 100;
  const isFullyPaid = currentTenant.arrears === 0;

  return (
    <TenantLayout>
      <div 
        className="min-h-screen p-6 md:p-8"
        style={{ background: "var(--color-background)" }}
      >
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Enhanced Welcome Hero */}
          <div 
            className="relative rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-2xl group border border-[#2A3A30]/30"
            style={{ 
              background: "linear-gradient(135deg, #1A1A1A 0%, #1B5E45 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#3DBE7A]/20 rounded-full blur-[120px] -mr-32 -mt-32 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1B5E45]/40 rounded-full blur-[100px] -ml-20 -mb-20" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#3DBE7A] shadow-[0_0_8px_#3DBE7A]"></span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{currentDate}</p>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Welcome back, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DBE7A] to-white/60">
                    {currentTenant.name.split(' ')[0]}
                  </span>
                </h1>
                <div className="flex items-center gap-4 text-white/50 text-sm font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#3DBE7A]" />
                    <span>Unit {currentTenant.unitId}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Lease Active</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button 
                  onClick={() => window.location.href = '/tenant/payments'} 
                  className="bg-white text-[#1B5E45] hover:bg-[#E8F5EE] border-none px-8 py-3 rounded-xl shadow-lg text-sm font-black"
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Make Payment
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/tenant/complaints'}
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest"
                >
                  <AlertCircle className="w-5 h-5 mr-3" />
                  Report Issue
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid - Emerald Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Monthly Rent", value: `$${currentTenant.rent}`, icon: Wallet, color: "#1B5E45", sub: "Due on 1st", bg: "var(--color-surface-tint)" },
              { label: "Current Balance", value: `$${currentTenant.arrears}`, icon: isFullyPaid ? CheckCircle2 : AlertCircle, color: isFullyPaid ? "#3DBE7A" : "#EF4444", sub: isFullyPaid ? "Fully Paid" : "Due Now", bg: isFullyPaid ? "#E8F5EE" : "#FEE2E2" },
              { label: "Next Due", value: "Mar 01", icon: Calendar, color: "#1B5E45", sub: "12 days left", bg: "var(--color-surface-secondary)" },
              { label: "Active Requests", value: "1", icon: FileText, color: "#D97706", sub: "Maintenance", bg: "#FEF3C7" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-[2.2rem] border transition-all hover:-translate-y-1 hover:shadow-xl group"
                style={{ 
                  borderColor: "var(--color-border-light)",
                  boxShadow: "var(--shadow-card)"
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6"
                    style={{ background: stat.bg, color: stat.color }}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>{stat.value}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: stat.color }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Financial Health Section */}
            <div 
              className="lg:col-span-2 bg-white rounded-[3rem] border p-10 md:p-12"
              style={{ 
                borderColor: "var(--color-border-light)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>Financial Health</h2>
                  <p className="text-sm font-medium mt-1" style={{ color: "var(--color-text-muted)" }}>Current account standing</p>
                </div>
                <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${isFullyPaid ? 'bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
                  {isFullyPaid ? 'Settled' : 'Action Needed'}
                </div>
              </div>

              <div className="space-y-10">
                <div className="relative pt-1">
                  <div className="flex mb-4 items-end justify-between">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 bg-[#F0F5F0] rounded-lg" style={{ color: "var(--color-green-deep)" }}>
                        {paymentProgress.toFixed(0)}% Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black" style={{ color: "var(--color-text-primary)" }}>
                        ${currentTenant.paidAmount} <span className="text-sm text-slate-300 font-bold">/ ${currentTenant.rent}</span>
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 flex rounded-full bg-[#FAFAF8] border inner-shadow">
                    <div 
                      className="shadow-lg rounded-full flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000"
                      style={{ 
                        width: `${paymentProgress}%`,
                        background: "linear-gradient(to right, var(--color-green-deep), var(--color-green-mid))",
                        boxShadow: "0 0 15px rgba(61, 190, 122, 0.3)"
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: "Total Committed", val: `$${currentTenant.rent}`, color: "var(--color-text-muted)" },
                    { label: "Paid to Date", val: `$${currentTenant.paidAmount}`, color: "var(--color-green-deep)" },
                    { label: "Outstanding", val: `$${currentTenant.arrears}`, color: isFullyPaid ? "var(--color-text-muted)" : "#EF4444" }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#F0F5F0]">
                      <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.val}</p>
                    </div>
                  ))}
                </div>

                {!isFullyPaid && (
                  <div className="bg-[#E8F5EE] border border-[#1B5E45]/10 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1B5E45] shadow-sm">
                        <Zap className="w-6 h-6 fill-[#1B5E45]" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-md">Immediate Settlement</p>
                        <p className="text-sm font-medium text-[#1B5E45]/80">Avoid late fees by paying the balance today.</p>
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto px-10">Pay ${currentTenant.arrears}</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Side Column */}
            <div className="space-y-8">
              {/* Quick Actions Card */}
              <div 
                className="rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl group border border-[#1B5E45]/20"
                style={{ background: "#1A1A1A" }}
              >
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1B5E45]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                
                <h3 className="font-black text-xl mb-8 tracking-tight">Quick Actions</h3>
                <div className="space-y-4 relative z-10">
                  <Link href="/tenant/complaints" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 group/link">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#3DBE7A]/20 text-[#3DBE7A] rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="font-black text-xs uppercase tracking-widest">Maintenance</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover/link:translate-x-1 group-hover/link:text-white transition-all" />
                  </Link>
                  <Link href="/tenant/profile" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 group/link">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 text-white/60 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-black text-xs uppercase tracking-widest">Lease Terms</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover/link:translate-x-1 group-hover/link:text-white transition-all" />
                  </Link>
                </div>
              </div>

              {/* Activity Timeline */}
              <div 
                className="bg-white rounded-[3rem] border p-8"
                style={{ 
                  borderColor: "var(--color-border-light)",
                  boxShadow: "var(--shadow-card)"
                }}
              >
                <h3 className="font-black text-slate-900 mb-8 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#1B5E45]" />
                  Timeline
                </h3>
                <div className="space-y-8">
                  {[
                    { title: "Rent Payment", date: "Oct 01", amount: "$1200", type: "payment" },
                    { title: "Request Filed", date: "Sep 28", status: "In Progress", type: "request" },
                    { title: "Lease Renewed", date: "Aug 15", status: "Active", type: "document" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 relative group">
                      {i !== 2 && <div className="absolute left-2.5 top-8 bottom-0 w-px bg-slate-100 group-hover:bg-[#1B5E45]/20 transition-colors"></div>}
                      <div className={`w-5 h-5 rounded-full border-2 border-white shadow-md shrink-0 z-10 transition-transform group-hover:scale-125 ${
                        item.type === 'payment' ? 'bg-[#3DBE7A]' : 
                        item.type === 'request' ? 'bg-[#D97706]' : 'bg-[#1B5E45]'
                      }`}></div>
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{item.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 mb-1">{item.date}</p>
                        {item.amount && <span className="text-[9px] font-black text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full">{item.amount}</span>}
                        {item.status && <span className="text-[9px] font-black text-slate-500 bg-[#F0F5F0] px-2 py-0.5 rounded-full uppercase tracking-widest">{item.status}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/tenant/payments" className="block text-center text-[10px] font-black uppercase tracking-widest text-[#1B5E45] mt-8 hover:underline">
                  Complete Ledger History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
