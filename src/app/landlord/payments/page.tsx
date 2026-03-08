"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { mockPayments } from "@/data/mockData";
import { Download, CreditCard, Search, ArrowUpRight, TrendingUp, Clock, AlertCircle, Calendar, Plus, ExternalLink, Filter } from "lucide-react";
import { useAction } from "@/context/ActionContext";
import { LOADER_DURATION } from "@/utils/constants";

export default function PaymentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [filterMonth, setFilterMonth] = useState("all");
  const { showAction, hideAction } = useAction();

  const handleGenerateReport = () => {
    showAction({
      title: "Generating Audit",
      message: "Analyzing historical ledger data...",
      color: "blue",
      icon: "analytics"
    });

    setTimeout(() => {
      hideAction();
    }, LOADER_DURATION);
  };

  const totalCollected = mockPayments.reduce(
    (sum, p) => (p.status === "completed" ? sum + p.amount : sum),
    0
  );
  const totalPending = mockPayments.reduce(
    (sum, p) => (p.status === "pending" ? sum + p.amount : sum),
    0
  );
  const totalOverdue = mockPayments.reduce(
    (sum, p) => (p.status === "overdue" ? sum + p.amount : sum),
    0
  );

  const filteredPayments = mockPayments.filter(payment => 
    filterMonth === "all" || payment.month.toLowerCase().includes(filterMonth.toLowerCase())
  );

  return (
    <LandlordLayout>
      <div className="p-6 md:p-10 space-y-10 ">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <CreditCard className="w-3 h-3" />
              Capital Flow Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Digital <span className="text-slate-400">Ledger</span></h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1B5E45] transition-colors" />
              <input 
                type="text" 
                placeholder="Search transaction..." 
                className="pl-11 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl w-64 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#1B5E45]/10 focus:bg-white transition-all shadow-sm"
              />
            </div>
            <Button variant="premium" className="h-12 rounded-xl" onClick={handleGenerateReport}>Generate Report</Button>
          </div>
        </div>

        {/* Financial Architecture - Intelligence Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Yield Collected', value: totalCollected, icon: TrendingUp, color: 'emerald', trend: '+12.5%' },
             { label: 'Pending Liquidity', value: totalPending, icon: Clock, color: 'blue', trend: 'Audit Req' },
             { label: 'Arrears Threshold', value: totalOverdue, icon: AlertCircle, color: 'rose', trend: 'Action Req' }
           ].map((node, i) => (
             <div key={i} className="relative group p-4 md:p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 md:w-28 md:h-28 bg-${node.color}-500/5 blur-[60px] rounded-full group-hover:bg-${node.color}-500/10 transition-all`} />
                <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                   <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-${node.color}-50 flex items-center justify-center text-${node.color}-600 group-hover:scale-110 transition-transform`}>
                         <node.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className={`px-2 py-1 rounded-lg bg-${node.color}-50 text-${node.color}-600 font-semibold text-[8px] md:text-[9px] uppercase tracking-widest`}> 
                         {node.trend}
                      </div>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs md:text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{node.label}</p>
                      <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tighter">KSh {node.value.toLocaleString()}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Ledger Table - Premium Digital Twin Interface */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="inline-flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest">
                   <Filter className="w-4 h-4 text-[#1B5E45]" />
                   Temporal Filter:
                </div>
                <div className="flex flex-wrap sm:flex-nowrap bg-slate-100 p-1 rounded-xl">
                   {['all', 'June', 'May'].map(m => (
                     <button 
                       key={m}
                       onClick={() => setFilterMonth(m)}
                       className={`px-3 py-1 rounded-lg text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest transition-all ${filterMonth === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                     >
                        {m}
                     </button>
                   ))}
                </div>
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time sync active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Stakeholder</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Assignment</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Interval</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Capital</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Protocol</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    onClick={() => {
                      setSelectedPayment(payment);
                      setShowModal(true);
                    }}
                    className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 md:px-6 py-4 md:py-5">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-slate-100 flex items-center justify-center font-semibold text-[9px] md:text-[10px] text-slate-500 border border-slate-200">
                             {payment.tenantName.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-900 tracking-tight text-sm md:text-base">{payment.tenantName}</span>
                       </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5">
                       <span className="text-[9px] md:text-[10px] font-semibold text-slate-500 uppercase tracking-widest border border-slate-100 px-2 py-1 rounded-lg">
                          Unit {payment.unitId.split('-').pop()}
                       </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm font-medium text-slate-600">{payment.month}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5 font-semibold text-slate-900 text-sm md:text-base">KSh {payment.amount.toLocaleString()}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5">
                       <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-[8px] md:text-[9px] uppercase tracking-widest ${
                         payment.status === 'completed' ? 'bg-emerald-100 text-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.15)]' : 
                         payment.status === 'pending' ? 'bg-[#E8F5EE] text-[#1B5E45]' : 'bg-brand-red/10 text-brand-red'
                       }`}>
                          <div className={`w-1.5 h-1.5 rounded-full bg-current ${payment.status === 'pending' ? 'animate-pulse' : ''}`} />
                          {payment.status}
                       </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-[10px] md:text-[11px] font-medium text-slate-400">{payment.date}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                       <div className="flex justify-end translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                          <button className="p-2 rounded-xl text-[#1B5E45] hover:bg-[#E8F5EE]">
                             <ArrowUpRight className="w-5 h-5" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Details Modal - Cinematic Receipt View */}
      <Modal
        isOpen={showModal && !!selectedPayment}
        onClose={() => setShowModal(false)}
        title="Payment Details"
        size="6xl"
        className="rounded-[3rem] p-0 overflow-hidden"
      >
        <div className="flex flex-col bg-white">
          <div className="p-10 bg-slate-900 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B5E45]/20 blur-[100px] rounded-full" />
             <div className="relative z-10 flex flex-col gap-8">
                <div className="flex justify-between items-start">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                      <CreditCard className="w-6 h-6 text-white" />
                   </div>
                   <div className={`px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest border ${
                     selectedPayment?.status === 'completed' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 
                     selectedPayment?.status === 'pending' ? 'border-[#1B5E45]/50 text-[#3DBE7A] bg-[#E8F5EE]0/10' : 'border-brand-red/50 text-brand-red bg-rose-500/10'
                   }`}>
                      {selectedPayment?.status} Protocol
                   </div>
                </div>
                <div className="space-y-1">
                   <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">Transaction Value</p>
                   <h3 className="text-5xl font-black text-white tracking-tighter">KSh {selectedPayment?.amount.toLocaleString()}</h3>
                </div>
             </div>
          </div>

          <div className="p-10 space-y-8">
             <div className="grid grid-cols-2 gap-8 py-8 border-b border-slate-50">
                <div className="space-y-4">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Payer</p>
                      <p className="text-lg font-black text-slate-900 tracking-tight">{selectedPayment?.tenantName}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Allocated</p>
                      <p className="text-sm font-bold text-slate-600">UNIT {selectedPayment?.unitId.split('-').pop()}</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temporal Cycle</p>
                      <p className="text-lg font-black text-slate-900 tracking-tight">{selectedPayment?.month}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Settlement Node</p>
                      <p className="text-sm font-bold text-slate-600">{selectedPayment?.date}</p>
                   </div>
                </div>
             </div>

             <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payment Provider</p>
                   <p className="text-xs font-black text-slate-900">Verified System Protocol</p>
                </div>
                <div className="flex items-center gap-4 grayscale opacity-40">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" className="h-4 object-contain" alt="MPesa" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-3 object-contain" alt="Visa" />
                </div>
             </div>

             <div className="flex gap-4 pt-4">
                <Button variant="premium" className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-[#1B5E45]/20">
                   <Download className="w-4 h-4" />
                   Download Audit
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest border-slate-200">
                   <ExternalLink className="w-4 h-4" />
                   Verify Transaction
                </Button>
             </div>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
