"use client";

import React from "react";
import TenantLayout from "@/components/TenantLayout";
import DashboardCard from "@/components/DashboardCard";
import Button from "@/components/Button";
import Link from "next/link";
import Badge from "@/components/Badge";
import {
  DollarSign,
  Calendar,
  AlertCircle,
  FileText,
  Plus,
  ArrowRight,
  TrendingUp,
  CreditCard,
  History,
  ShieldCheck,
  Activity,
  User,
  Zap
} from "lucide-react";
import { mockTenants, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

export default function TenantDashboard() {
  const { userName, displayImage } = useAuth();
  // Mock current tenant
  const currentTenant = mockTenants[0];
  const activeName = userName || currentTenant.name;
  const tenantPayments = mockPayments.filter(
    (p) => p.tenantId === currentTenant.id,
  );
  const tenantComplaints = mockComplaints.filter(
    (c) => c.tenantId === currentTenant.id,
  );

  const nextPaymentDate = new Date();
  nextPaymentDate.setDate(1);
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

  return (
    <TenantLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Cinematic Welcome Header */}
        <div className="relative glass-panel border-white/20 rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-2xl group">
          {/* Dynamic Background */}
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-indigo-900" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse-soft transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] -ml-40 -mb-40" />
          <div className="absolute inset-0 bg-shimmer opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] font-black text-blue-200 uppercase tracking-[0.2em]">Verified Residental Access</span>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                  Welcome, <span className="bg-linear-to-r from-blue-200 to-white bg-clip-text text-transparent">{activeName.split(' ')[0]}</span>!
                </h2>
                <div className="flex items-center gap-3 text-slate-400 font-bold">
                  <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-xs text-blue-300">Unit {currentTenant.unitId}</div>
                  <span className="text-slate-600 font-black">/</span>
                  <p>Residential Managed Portal</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 shrink-0">
               <Link href="/tenant/profile">
                  <button className="flex items-center gap-3 px-6 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all hover:shadow-xl hover:shadow-blue-500/10 active:scale-95 group/btn">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-100">
                      <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    Review Passport
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
               </Link>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Monthly Rent"
            value={`KSh ${currentTenant.rent.toLocaleString()}`}
            icon={DollarSign}
            color="blue"
          />
          <DashboardCard
            title="Balance Due"
            value={`KSh ${currentTenant.arrears.toLocaleString()}`}
            icon={AlertCircle}
            color={currentTenant.arrears > 0 ? "red" : "green"}
          />
          <DashboardCard
            title="Next Due Date"
            value={nextPaymentDate.toLocaleDateString()}
            icon={Calendar}
            color="blue"
          />
          <DashboardCard
            title="Active Complaints"
            value={
              tenantComplaints.filter((c) => c.status !== "resolved").length
            }
            icon={FileText}
            color="yellow"
          />
        </div>

        {/* Payment Lifecycle Overview */}
        <div className="glass-panel border-white/20 rounded-[2.5rem] shadow-2xl p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Financial Health</h3>
              </div>
              <p className="text-sm font-bold text-slate-400">Monthly reconciliation & settlement status</p>
            </div>
            
            <Link href="/tenant/payments">
              <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-3">
                <Plus className="w-5 h-5" />
                Initialize Payment
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="relative p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 group/stat">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Gross Obligations</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">KSh {currentTenant.rent.toLocaleString()}</p>
              <div className="absolute right-6 top-6 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 border border-slate-100 group-hover/stat:text-blue-600 group-hover/stat:border-blue-100 transition-all"><DollarSign className="w-5 h-5" /></div>
            </div>
            <div className="relative p-8 rounded-[2rem] bg-emerald-50/30 border border-emerald-100/50 group/stat">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Settled Credits</p>
              <p className="text-3xl font-black text-emerald-600 tracking-tighter">KSh {currentTenant.paidAmount.toLocaleString()}</p>
              <div className="absolute right-6 top-6 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 border border-slate-100 group-hover/stat:text-emerald-600 group-hover/stat:border-emerald-100 transition-all"><Zap className="w-5 h-5" /></div>
            </div>
            <div className="relative p-8 rounded-[2rem] bg-rose-50/30 border border-rose-100/50 group/stat">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Arrears Pending</p>
              <p className="text-3xl font-black text-brand-red tracking-tighter">KSh {currentTenant.arrears.toLocaleString()}</p>
              <div className="absolute right-6 top-6 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 border border-slate-100 group-hover/stat:text-brand-red group-hover/stat:border-rose-100 transition-all"><CreditCard className="w-5 h-5" /></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-black text-slate-900">Total Settlement Progress</span>
              </div>
              <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{Math.round((currentTenant.paidAmount / currentTenant.rent) * 100)}% Fulfilled</span>
            </div>
            <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-600 via-indigo-600 to-indigo-700 animate-shimmer"
                style={{
                  width: `${(currentTenant.paidAmount / currentTenant.rent) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Activity Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Recent Payments - Redesigned */}
          <div className="glass-panel border-white/20 rounded-[2.5rem] shadow-2xl p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                  <History className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Ledger History</h3>
              </div>
              <Link href="/tenant/payments" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">View All <ArrowRight className="w-3 h-3" /></Link>
            </div>
            
            <div className="space-y-4">
              {tenantPayments.slice(0, 4).map((payment) => (
                <div
                  key={payment.id}
                  className="group/item flex items-center justify-between p-5 bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover/item:text-blue-600 group-hover/item:border-blue-100 transition-all">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 tracking-tight">{payment.month}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{payment.date}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-black text-slate-900 tabular-nums text-lg leading-none">KSh {payment.amount.toLocaleString()}</p>
                    <div className="inline-block transform scale-90 origin-right">
                       <Badge
                        text={payment.status === "completed" ? "Verified" : "Syncing"}
                        type={payment.status === "completed" ? "success" : "warning"}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Complaints - Redesigned */}
          <div className="glass-panel border-white/20 rounded-[2.5rem] shadow-2xl p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-lg shadow-rose-600/20">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Support Requests</h3>
              </div>
              <Link href="/tenant/complaints" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">Tickets <ArrowRight className="w-3 h-3" /></Link>
            </div>
            
            <div className="space-y-4">
              {tenantComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="group/item p-6 bg-slate-50/50 hover:bg-white border-l-4 border-slate-200 hover:border-blue-500 rounded-r-3xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{complaint.category}</span>
                      </div>
                      <p className="font-black text-slate-900 tracking-tight leading-snug">
                        {complaint.title}
                      </p>
                    </div>
                    <Badge
                      text={
                        complaint.status === "resolved"
                          ? "Resolved"
                          : complaint.status === "in-progress"
                            ? "Active"
                            : "New"
                      }
                      type={
                        complaint.status === "resolved"
                          ? "success"
                          : complaint.status === "in-progress"
                            ? "warning"
                            : "error"
                      }
                    />
                  </div>
                </div>
              ))}
              {tenantComplaints.length === 0 && (
                <div className="py-20 text-center space-y-4">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                     <ShieldCheck className="w-8 h-8" />
                   </div>
                   <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No Active Incidents</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
