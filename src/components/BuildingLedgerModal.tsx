"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Badge from "./Badge";
import Button from "./Button";
import { 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  Calendar, 
  Building2, 
  Search,
  Filter,
  CheckCircle2,
  Activity
} from "lucide-react";
import { mockTenants, mockPayments, Building } from "@/data/mockData";
import { getAvatarUrl } from "@/utils/avatarUtils";

interface BuildingLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: Building | null;
}

export default function BuildingLedgerModal({ isOpen, onClose, building }: BuildingLedgerModalProps) {
  const [activeTab, setActiveTab] = useState<"tenants" | "payments">("tenants");
  const [searchTerm, setSearchTerm] = useState("");

  if (!building) return null;

  const buildingTenants = mockTenants.filter(t => {
    // In a real app, unitId would link to buildingId. 
    // For now, we'll use unitId prefix matching or mock unit mapping.
    // Assuming unitId format like 'unit-001' and we have a way to know building.
    // Looking at mockData, unit-001 to unit-005 belong to bld-001.
    // Let's use a more robust check based on mockUnits if we had it, 
    // but building.id is bld-001, bld-002, bld-003.
    // For the demo, we'll map them based on our known mock structure.
    if (building.id === "bld-001") return t.unitId.includes("unit-001") || t.unitId.includes("unit-002") || t.unitId.includes("unit-003") || t.unitId.includes("unit-004") || t.unitId.includes("unit-005");
    if (building.id === "bld-002") return t.unitId.includes("unit-006") || t.unitId.includes("unit-007") || t.unitId.includes("unit-008");
    if (building.id === "bld-003") return t.unitId.includes("unit-009") || t.unitId.includes("unit-010");
    return false;
  });

  const buildingPayments = mockPayments.filter(p => {
    if (building.id === "bld-001") return p.unitId.includes("unit-001") || p.unitId.includes("unit-002") || p.unitId.includes("unit-003") || p.unitId.includes("unit-004") || p.unitId.includes("unit-005");
    if (building.id === "bld-002") return p.unitId.includes("unit-006") || p.unitId.includes("unit-007") || p.unitId.includes("unit-008");
    if (building.id === "bld-003") return p.unitId.includes("unit-009") || p.unitId.includes("unit-010");
    return false;
  });

  const totalArrears = buildingTenants.reduce((sum, t) => sum + t.arrears, 0);
  const totalCollected = buildingPayments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);

  const filteredTenants = buildingTenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.unitId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = buildingPayments.filter(p => 
    p.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.unitId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asset Digital Ledger"
      size="full"
      className="rounded-[3rem] p-0 overflow-hidden bg-slate-50"
    >
        {/* Header Section */}
        <div className="p-10 bg-slate-900 relative overflow-hidden shrink-0 border-b border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600/5 blur-[80px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 border border-blue-600/30">
                <Activity className="w-3 h-3" />
                Asset Digital Ledger
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
                {building.name} <span className="text-slate-500 text-3xl ml-2 font-medium">/ 0x{building.id.split('-').pop()}</span>
              </h2>
              <div className="flex items-center gap-4 text-slate-400">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Users className="w-3.5 h-3.5" />
                  {buildingTenants.length} Active Occupants
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <CreditCard className="w-3.5 h-3.5" />
                  {buildingPayments.length} Cumulative Transactions
                </div>
              </div>
            </div>

            <div className="flex gap-4">
               <div className="px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center min-w-[140px]">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Building Yield</p>
                  <p className="text-xl font-black text-white tracking-tighter">KSh {totalCollected.toLocaleString()}</p>
               </div>
               <div className="px-6 py-4 bg-brand-red/10 backdrop-blur-xl rounded-2xl border border-brand-red/20 text-center min-w-[140px]">
                  <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Exposure</p>
                  <p className="text-xl font-black text-white tracking-tighter">KSh {totalArrears.toLocaleString()}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Navigation & Search */}
        <div className="px-10 py-6 border-b border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab("tenants")}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "tenants" ? "bg-white text-slate-900 shadow-xl shadow-slate-200" : "text-slate-500 hover:text-slate-900"}`}
            >
              Tenant Registry
            </button>
            <button 
              onClick={() => setActiveTab("payments")}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "payments" ? "bg-white text-slate-900 shadow-xl shadow-slate-200" : "text-slate-500 hover:text-slate-900"}`}
            >
              Capital Flow
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={`Filter ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-6 py-3 bg-slate-100 border-none rounded-2xl w-full md:w-64 text-[11px] font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <Button variant="outline" className="h-11 rounded-2xl px-6 border-slate-200">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-10 bg-slate-50/50">
          {activeTab === "tenants" ? (
            <div className="space-y-4">
              {filteredTenants.length > 0 ? (
                <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-200/60">
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Occupant</th>
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Assignment</th>
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Financial Health</th>
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Horizon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTenants.map((tenant) => (
                        <tr key={tenant.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden group-hover:scale-105 transition-transform">
                                <img src={getAvatarUrl(tenant.name)} alt={tenant.name} />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-900 tracking-tight text-sm">{tenant.name}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {tenant.id.split('-').pop()}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                              UNIT {tenant.unitId.split('-').pop()}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-black text-slate-900">KSh {tenant.rent.toLocaleString()}</span>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${tenant.arrears > 0 ? "text-brand-red" : "text-emerald-500"}`}>
                                  Balance: KSh {tenant.arrears.toLocaleString()}
                                </span>
                                {tenant.arrears > 0 && <AlertTriangle className="w-2.5 h-2.5 text-brand-red animate-pulse" />}
                                {tenant.arrears === 0 && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />}
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In: {tenant.moveInDate}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-white flex items-center justify-center text-slate-200 shadow-inner">
                    <Users className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-slate-900 tracking-tighter">No occupants found</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Try a different search parameter</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPayments.length > 0 ? (
                <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-200/60">
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Stakeholder</th>
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Cycle</th>
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Capital</th>
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol</th>
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPayments.map((payment) => (
                        <tr key={payment.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 tracking-tight text-sm">{payment.tenantName}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit {payment.unitId.split('-').pop()}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100 px-3 py-1.5 rounded-xl">{payment.month}</span>
                          </td>
                          <td className="px-8 py-6 text-sm font-black text-slate-900">
                            KSh {payment.amount.toLocaleString()}
                          </td>
                          <td className="px-8 py-6">
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest ${
                              payment.status === 'completed' ? 'bg-emerald-100 text-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.15)]' : 
                              payment.status === 'pending' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full bg-current ${payment.status === 'pending' ? 'animate-pulse' : ''}`} />
                              {payment.status}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <span className="text-[10px] font-bold text-slate-400">{payment.date}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-white flex items-center justify-center text-slate-200 shadow-inner">
                    <CreditCard className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-slate-900 tracking-tighter">No transactions recorded</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Financial activity will appear here</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-10 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-9 h-9 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm flex items-center justify-center">
                       <img src={getAvatarUrl(`System Admin ${i}`)} alt="Admin" />
                    </div>
                 ))}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                 System synchronized <span className="text-blue-600">Real-time</span>
              </p>
           </div>
           <div className="flex gap-4">
              <Button variant="secondary" className="h-14 px-10 rounded-[20px] text-[10px] font-black uppercase tracking-widest" onClick={onClose}>
                 Close View
              </Button>
              <Button variant="premium" className="h-14 px-10 rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-600/20">
                 Sync Blockchain
              </Button>
           </div>
      </div>
    </Modal>
  );
}
