'use client';

import React, { useState } from 'react';
import LandlordLayout from '@/components/LandlordLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { mockTenants, mockUnits, mockBuildings } from '@/data/mockData';
import { getAvatarUrl } from '@/utils/avatarUtils';
import { Users, Search, Filter, AlertTriangle, ArrowUpRight, Mail, Phone, Calendar, CreditCard, ShieldCheck, MoreHorizontal, Building2, LayoutGrid, Hash } from 'lucide-react';

export default function TenantsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAssignmentDetails = (unitId: string) => {
    const unit = mockUnits.find(u => u.id === unitId);
    const building = mockBuildings.find(b => b.id === unit?.buildingId);
    return {
      unitNumber: unit?.number || 'N/A',
      buildingName: building?.name || 'Unknown Building'
    };
  };

  return (
    <LandlordLayout>
      <div className="p-6 md:p-10 space-y-12" style={{ background: "var(--color-background)" }}>
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b" style={{ borderColor: "var(--color-border-light)" }}>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em]" style={{ background: "var(--color-surface-tint)", color: "var(--color-green-deep)" }}>
              <Users className="w-3.5 h-3.5" />
              Human Capital Registry
            </div>
            <h2 className="text-4xl md:text-6xl tracking-tighter whitespace-nowrap md:whitespace-normal" style={{ color: "var(--color-text-primary)" }}>
              Tenant <span className="opacity-30">Portfolio</span>
            </h2>
          </div>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4">
             <div className="relative group flex-shrink-0">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors" style={{ color: "var(--color-text-muted)" }} />
              <input 
                type="text" 
                placeholder="Find resident..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-8 py-4 rounded-[1.5rem] w-40 md:w-80 text-sm transition-all shadow-sm focus:ring-8 focus:ring-[#1B5E45]/5 focus:border-[#1B5E45] outline-none"
                style={{ background: "var(--color-card)", border: "1px solid var(--color-border-light)", color: "var(--color-text-primary)" }}
                suppressHydrationWarning={true}
              />
            </div>
            <Button variant="premium" className="h-14 px-6 md:px-10 rounded-2xl shadow-xl shadow-[#1B5E45]/20 flex-shrink-0 whitespace-nowrap w-40 md:w-auto">Onboard Resident</Button>
          </div>
        </div>

        {/* Registry Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {(() => {
             const total = mockTenants.length;
             const active = mockTenants.filter(t => t.status === 'active').length;
             const risk = mockTenants.filter(t => t.arrears > 0).length;
             const overdue = risk;
             const averageRent = Math.round(mockTenants.reduce((sum, t) => sum + t.rent, 0) / (total || 1));
             const inspections = 5;
             return [
               { label: 'Total Registry',  value: total, detail: `${total} tenants`, icon: Users, bgColor: 'var(--color-surface-tint)',    iconColor: 'var(--color-green-deep)' },
               { label: 'Active Leases',   value: active, detail: `${Math.round((active / (total||1)) * 100)}% occupied`, icon: ShieldCheck, bgColor: 'var(--color-surface-tint)',    iconColor: 'var(--color-green-deep)' },
               { label: 'Risk Exposure',   value: risk, detail: `${risk} with arrears`, icon: AlertTriangle, bgColor: '#FFF1F0',                    iconColor: '#F5222D' },
               { label: 'Pending Cycle',   value: '2', detail: 'reviews pending', icon: Calendar,     bgColor: 'var(--color-background-alt)', iconColor: 'var(--color-text-muted)' },
               { label: 'Overdue Payments', value: overdue, detail: `${overdue} tenant(s)`, icon: CreditCard, bgColor: '#FFF1F0', iconColor: '#F5222D' },
               { label: 'Avg. Rent (KSh)', value: averageRent.toLocaleString(), detail: 'per unit', icon: CreditCard, bgColor: 'var(--color-surface-tint)', iconColor: 'var(--color-green-deep)' },
               { label: 'Upcoming Inspections', value: inspections, detail: `${inspections} scheduled`, icon: Calendar, bgColor: 'var(--color-background-alt)', iconColor: 'var(--color-text-muted)' }
             ];
           })().map((stat, i) => (
             <div key={i} className="p-8 rounded-[2.5rem] border shadow-2xl transition-all group" style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
                <div className="w-12 h-12 rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg" style={{ background: stat.bgColor, color: stat.iconColor }}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>{stat.label}</p>
                <p className="text-3xl tracking-tighter mt-1" style={{ color: "var(--color-text-primary)" }}>{stat.value}</p>
                {stat.detail && (
                  <p className="text-xs text-gray-500 mt-1" style={{ color: "var(--color-text-muted)" }}>{stat.detail}</p>
                )}
             </div>
           ))}
        </div>

        {/* Additional insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2.5rem] border shadow-2xl" style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)" }}>
            <h4 className="text-lg font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>Occupancy Rate</h4>
            <p className="text-4xl font-bold" style={{ color: "var(--color-green-deep)" }}>92%</p>
            <p className="text-sm text-gray-500 mt-2">Percentage of units currently leased</p>
          </div>
          <div className="p-8 rounded-[2.5rem] border shadow-2xl" style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)" }}>
            <h4 className="text-lg font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>Monthly Income Estimate</h4>
            <p className="text-4xl font-bold" style={{ color: "var(--color-green-deep)" }}>KSh {Math.round(mockTenants.reduce((sum, t) => sum + t.rent, 0)).toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Based on current rents</p>
          </div>
        </div>

        {/* Tenants Table */}
        <div className="bg-white border shadow-2xl overflow-hidden" style={{ borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1A1A1A] text-white">
                  {['Resident','Assignment','Protocol Node','Financials','Status','Archive'].map((col, i) => (
                    <th key={col} className={`px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] ${i === 5 ? 'text-right' : ''}`}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--color-border-light)" }}>
                {mockTenants.filter(t => {
                  const details = getAssignmentDetails(t.unitId);
                  const searchStr = `${t.name} ${details.buildingName} ${details.unitNumber} ${t.roomNumber} ${t.phone} ${t.email}`.toLowerCase();
                  return searchStr.includes(searchTerm.toLowerCase());
                }).map((tenant, i) => (
                  <tr
                    key={tenant.id}
                    onClick={() => {
                      setSelectedTenant(tenant);
                      setShowModal(true);
                    }}
                    className={`group transition-all cursor-pointer hover:bg-[rgba(61,190,122,0.06)] ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'}`}
                  >
                    <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 lg:py-6">
                      <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 overflow-hidden group-hover:scale-110 transition-all border shadow-lg" style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                           <img src={getAvatarUrl(tenant.name)} alt={tenant.name} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                           <span className="text-xs md:text-sm lg:text-base font-semibold tracking-tighter" style={{ color: "var(--color-text-primary)" }}>{tenant.name}</span>
                           <span className="text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>IDENT: {tenant.id.split('-').pop()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 lg:py-6">
                      <div className="flex items-center gap-3 md:gap-4 group/assignment">
                         <div className="w-1 h-8 md:h-9 lg:h-10 rounded-full transition-colors bg-[#1A1A1A]" />
                         <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-widest leading-none" style={{ color: "var(--color-text-primary)" }}>
                               {getAssignmentDetails(tenant.unitId).buildingName}
                            </span>
                            <div className="flex items-center gap-2 md:gap-3 mt-1">
                               <div className="flex items-center gap-1 text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-tighter" style={{ color: "var(--color-text-muted)" }}>
                                  <LayoutGrid className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 text-[#3DBE7A]" />
                                  <span>U-{getAssignmentDetails(tenant.unitId).unitNumber}</span>
                                </div>
                               <div className="flex items-center gap-1 text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-tighter" style={{ color: "var(--color-text-muted)" }}>
                                  <Hash className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 text-[#3DBE7A]" />
                                  <span>R-{tenant.roomNumber || 'N/A'}</span>
                               </div>
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 lg:py-6 text-[9px] md:text-[10px] lg:text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        <div className="flex flex-col gap-0.5">
                            <span>{tenant.email}</span>
                            <span className="opacity-60">{tenant.phone}</span>
                        </div>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 lg:py-6">
                      <div className="flex flex-col gap-1">
                         <span className="text-base md:text-lg lg:text-xl tracking-tighter" style={{ color: "var(--color-text-primary)" }}>KSh {tenant.rent.toLocaleString()}</span>
                         <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-widest ${tenant.arrears > 0 ? 'text-[#F5222D]' : 'text-[#3DBE7A]'}`}>
                               Liability: {tenant.arrears.toLocaleString()}
                            </span>
                            {tenant.arrears > 0 && <AlertTriangle className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#F5222D] animate-pulse" />}
                         </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 lg:py-6">
                        <Badge
                          text={tenant.status.toUpperCase()}
                          type={tenant.status === 'active' ? 'success' : 'default'}
                        />
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 lg:py-6 text-right">
                       <div className="flex justify-end">
                          <button className="p-2 md:p-3 rounded-lg md:rounded-xl transition-all border border-transparent hover:border-[#E8F5EE] hover:bg-[#E8F5EE] hover:shadow-xl text-gray-300 hover:text-[#1B5E45]">
                             <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
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

      {/* Tenant Details Modal */}
      <Modal
        isOpen={showModal && !!selectedTenant}
        onClose={() => setShowModal(false)}
        title=""
        size="6xl"
        className="rounded-[4rem] p-0 overflow-hidden shadow-2xl border-none"
      >
        <div className="flex flex-col h-full overflow-hidden" style={{ background: "var(--color-background)" }}>
          <div className="relative h-64 bg-[#1A1A1A] overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E45]/40 via-transparent to-transparent" />
             <div className="absolute inset-x-0 bottom-0 p-12 flex items-end justify-between z-10">
                <div className="flex items-center gap-10">
                   <div className="w-32 h-32 rounded-[2.5rem] border-[6px] border-[#FAFAF8] overflow-hidden shadow-3xl">
                       <img src={getAvatarUrl(selectedTenant?.name)} alt={selectedTenant?.name} />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-5xl text-white tracking-tighter">{selectedTenant?.name}</h3>
                      <p className="text-[11px] text-[#3DBE7A] uppercase tracking-[0.4em] leading-none">Strategic Bio-Entity Identity</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <Badge text={selectedTenant?.status?.toUpperCase()} type={selectedTenant?.status === 'active' ? 'success' : 'default'} />
                   <div className="px-6 py-2.5 bg-[#1B5E45] rounded-full text-white text-[10px] uppercase tracking-widest shadow-2xl border border-white/10">ID: 0x{selectedTenant?.id.split('-').pop()}</div>
                </div>
             </div>
          </div>

          <div className="p-12 md:p-16 space-y-12 overflow-auto no-scrollbar">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                   <h4 className="text-[10px] text-gray-400 uppercase tracking-[0.4em] px-2">Financial Integrity Ledger</h4>
                   <div className="p-10 rounded-[3rem] space-y-8 border shadow-2xl" style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)" }}>
                      <div className="flex justify-between items-center">
                         <div className="space-y-2">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Net Liability</p>
                            <p className={`text-5xl tracking-tighter ${selectedTenant?.arrears > 0 ? 'text-[#F5222D]' : 'text-[#3DBE7A]'}`}>
                               KSh {selectedTenant?.arrears.toLocaleString()}
                            </p>
                         </div>
                         {selectedTenant?.arrears > 0 && <AlertTriangle className="w-12 h-12 text-[#F5222D]/20 animate-pulse fill-current" />}
                      </div>
                      <div className="w-full bg-[#FAFAF8] h-3 rounded-full overflow-hidden border">
                         <div className="h-full rounded-full bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A]" style={{ width: "85%" }} />
                      </div>
                      <div className="flex justify-between text-[11px] uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                         <span>Compliance Score Metrics</span>
                         <span className="text-[#1B5E45]">0.85 Protocol Rank</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-8">
                   <h4 className="text-[10px] text-gray-400 uppercase tracking-[0.4em] px-2">Asset Allocation Node</h4>
                   <div className="p-10 rounded-[3rem] text-white shadow-2xl shadow-[#1B5E45]/30 space-y-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #1B5E45 100%)" }}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                      <div className="space-y-8 relative z-10">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-3xl shadow-2xl">
                               <Building2 className="w-8 h-8 text-[#3DBE7A]" />
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none">Parent Facility</p>
                               <p className="text-2xl tracking-tighter">{getAssignmentDetails(selectedTenant?.unitId).buildingName}</p>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-4 p-5 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-sm">
                               <LayoutGrid className="w-6 h-6 text-[#3DBE7A]" />
                               <div className="space-y-1">
                                  <p className="text-[9px] text-white/40 uppercase tracking-widest leading-none">Unit Node</p>
                                  <p className="text-lg">{getAssignmentDetails(selectedTenant?.unitId).unitNumber}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4 p-5 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-sm">
                               <Hash className="w-6 h-6 text-[#3DBE7A]" />
                               <div className="space-y-1">
                                  <p className="text-[9px] text-white/40 uppercase tracking-widest leading-none">Room Sec</p>
                                  <p className="text-lg">{selectedTenant?.roomNumber || 'N/A'}</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="pt-8 border-t border-white/10 flex justify-between items-center relative z-10">
                         <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase tracking-widest leading-none">Onboarding Horizon</p>
                            <p className="text-lg">{selectedTenant?.moveInDate}</p>
                         </div>
                         <Button variant="premium" className="rounded-2xl h-14" onClick={() => setShowModal(false)}>Modify Node</Button>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex gap-6 pt-8 border-t" style={{ borderColor: "var(--color-border-light)" }}>
                <Button variant="premium" size="xl" className="flex-1 h-20 rounded-3xl text-xl shadow-2xl">Transmit Message</Button>
                <Button variant="secondary" size="xl" className="px-12 h-20 rounded-3xl text-sm uppercase tracking-widest" onClick={() => setShowModal(false)}>Close View</Button>
             </div>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
