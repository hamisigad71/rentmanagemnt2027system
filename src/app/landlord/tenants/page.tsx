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
      <div className="p-6 md:p-10 space-y-10 selection:bg-blue-100">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <Users className="w-3 h-3" />
              Human Capital Registry
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Tenant <span className="text-slate-400">Inventory</span></h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, property or unit..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl w-80 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all shadow-sm"
              />
            </div>
            <Button variant="premium" className="h-12 rounded-xl">Onboard Tenant</Button>
          </div>
        </div>

        {/* Registry Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Registry', value: mockTenants.length, icon: Users, color: 'blue' },
             { label: 'Active Leases', value: mockTenants.filter(t => t.status === 'active').length, icon: ShieldCheck, color: 'green' },
             { label: 'At Risk (Arrears)', value: mockTenants.filter(t => t.arrears > 0).length, icon: AlertTriangle, color: 'red' },
             { label: 'Pending Renewals', value: '2', icon: Calendar, color: 'slate' }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                   <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 tracking-tighter mt-1">{stat.value}</p>
             </div>
           ))}
        </div>

        {/* Tenants Table - Premium architectural Style */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Occupant</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Assignment</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Node</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Financial Obligation</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Archive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockTenants.filter(t => {
                  const details = getAssignmentDetails(t.unitId);
                  const searchStr = `${t.name} ${details.buildingName} ${details.unitNumber} ${t.roomNumber} ${t.phone} ${t.email}`.toLowerCase();
                  return searchStr.includes(searchTerm.toLowerCase());
                }).map((tenant) => (
                  <tr
                    key={tenant.id}
                    onClick={() => {
                      setSelectedTenant(tenant);
                      setShowModal(true);
                    }}
                    className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden group-hover:scale-105 transition-transform">
                           <img src={getAvatarUrl(tenant.name)} alt={tenant.name} />
                        </div>
                        <div className="flex flex-col">
                           <span className="font-black text-slate-900 tracking-tight">{tenant.name}</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {tenant.id.split('-').pop()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4 group/assignment">
                         <div className="w-1 h-12 bg-slate-900 rounded-full group-hover/assignment:bg-blue-600 transition-colors" />
                         <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none">
                               {getAssignmentDetails(tenant.unitId).buildingName}
                            </span>
                            <div className="flex items-center gap-3 mt-1">
                               <div className="flex items-center gap-1.5 font-bold text-[10px] text-slate-400 uppercase tracking-tighter">
                                  <LayoutGrid className="w-3 h-3" />
                                  <span className="text-slate-600">Unit {getAssignmentDetails(tenant.unitId).unitNumber}</span>
                               </div>
                               <div className="w-1 h-1 rounded-full bg-slate-200" />
                               <div className="flex items-center gap-1.5 font-bold text-[10px] text-slate-400 uppercase tracking-tighter">
                                  <Hash className="w-3 h-3" />
                                  <span className="text-slate-600 font-black">Room {tenant.roomNumber || 'N/A'}</span>
                               </div>
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                             <Mail className="w-3 h-3 text-slate-400" />
                             {tenant.email}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                             <Phone className="w-3 h-3 text-slate-400" />
                             {tenant.phone}
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                         <span className="text-sm font-black text-slate-900">KSh {tenant.rent.toLocaleString()}</span>
                         <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${tenant.arrears > 0 ? 'text-brand-red' : 'text-green-500'}`}>
                               Arrears: KSh {tenant.arrears.toLocaleString()}
                            </span>
                            {tenant.arrears > 0 && <AlertTriangle className="w-2.5 h-2.5 text-brand-red animate-pulse" />}
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest ${tenant.status === 'active' ? 'bg-green-100 text-green-700 shadow-[0_4px_12px_rgba(34,197,94,0.15)]' : 'bg-slate-100 text-slate-500'}`}>
                          {tenant.status}
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end">
                          <button className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
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

      {/* Tenant Details Modal - Cinematic View */}
      <Modal
        isOpen={showModal && !!selectedTenant}
        onClose={() => setShowModal(false)}
        title="Tenant Details"
        size="6xl"
        className="rounded-[3rem] p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full bg-white">
          <div className="relative h-48 bg-slate-900 overflow-hidden">
             <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay" />
             <div className="absolute inset-x-0 bottom-0 p-10 flex items-end justify-between z-10">
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-[2rem] border-4 border-white overflow-hidden shadow-2xl">
                       <img src={getAvatarUrl(selectedTenant?.name)} alt={selectedTenant?.name} />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-3xl font-black text-white tracking-tighter">{selectedTenant?.name}</h3>
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em]">Verified Strategic Resident</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white font-black text-[10px] uppercase tracking-widest border border-white/10">Active</div>
                   <div className="px-4 py-2 bg-blue-600 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-xl">Lease ID: 882</div>
                </div>
             </div>
          </div>

          <div className="p-10 space-y-8">
             <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Integrity</h4>
                   <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                      <div className="flex justify-between items-center">
                         <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Calculated Arrears</p>
                            <p className={`text-2xl font-black tracking-tighter ${selectedTenant?.arrears > 0 ? 'text-brand-red' : 'text-green-600'}`}>
                               KSh {selectedTenant?.arrears.toLocaleString()}
                            </p>
                         </div>
                         {selectedTenant?.arrears > 0 && <AlertTriangle className="w-8 h-8 text-red-100 fill-brand-red" />}
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-green-500 h-full w-[85%] rounded-full" />
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <span>Compliance Score</span>
                         <span className="text-slate-900">85%</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Assignment</h4>
                   <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-2xl shadow-blue-600/30 space-y-6">
                      <div className="space-y-5">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                               <Building2 className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                               <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest underline decoration-blue-400 underline-offset-4">Assigned Building</p>
                               <p className="text-lg font-black tracking-tight">{getAssignmentDetails(selectedTenant?.unitId).buildingName}</p>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                               <LayoutGrid className="w-4 h-4 text-blue-200" />
                               <div className="space-y-0.5">
                                  <p className="text-[8px] font-black text-blue-200 uppercase tracking-widest">Unit</p>
                                  <p className="text-xs font-black">{getAssignmentDetails(selectedTenant?.unitId).unitNumber}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                               <Hash className="w-4 h-4 text-blue-200" />
                               <div className="space-y-0.5">
                                  <p className="text-[8px] font-black text-blue-200 uppercase tracking-widest">Room</p>
                                  <p className="text-xs font-black">{selectedTenant?.roomNumber || 'N/A'}</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                         <div className="space-y-1">
                            <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest">Move-in Horizon</p>
                            <p className="text-sm font-black">{selectedTenant?.moveInDate}</p>
                         </div>
                         <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex gap-4 pt-4">
                <Button variant="premium" className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest">Relay Message</Button>
                <Button variant="outline" className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest border-slate-200">Modify Data Node</Button>
             </div>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
