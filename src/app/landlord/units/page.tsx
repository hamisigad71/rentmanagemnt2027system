"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LandlordLayout from "@/components/LandlordLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { mockUnits, mockBuildings, mockTenants } from "@/data/mockData";
import { getAvatarUrl } from "@/utils/avatarUtils";
import { Search, Filter, Layers, LayoutGrid, CheckCircle2, AlertCircle, ArrowUpRight, MapPin, Building2, MoreHorizontal, Users, Mail, Phone, ShieldCheck } from "lucide-react";

export default function UnitsPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "occupied" | "vacant"
  >("all");

  const filteredUnits =
    filterStatus === "all"
      ? mockUnits
      : mockUnits.filter((u) => u.status === filterStatus);

  const getBuilding = (buildingId: string) =>
    mockBuildings.find((b) => b.id === buildingId);

  return (
    <LandlordLayout>
      <div className="p-6 md:p-10 space-y-10 ">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <Layers className="w-3 h-3" />
              Dynamic Inventory Control
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Unit <span className="text-slate-400">Ledger</span></h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1B5E45] transition-colors" />
              <input 
                type="text" 
                placeholder="Search unit number..." 
                className="pl-11 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl w-64 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#1B5E45]/10 focus:bg-white transition-all shadow-sm"
                suppressHydrationWarning={true}
              />
            </div>
            <Button variant="premium" className="h-12 rounded-xl">Add Unit</Button>
          </div>
        </div>

        {/* Filters & Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
              <button 
                onClick={() => setFilterStatus("all")}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'all' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                suppressHydrationWarning={true}
              >
                All Assets ({mockUnits.length})
              </button>
              <button 
                onClick={() => setFilterStatus("occupied")}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'occupied' ? 'bg-white text-green-600 shadow-md' : 'text-slate-500 hover:text-green-600'}`}
                suppressHydrationWarning={true}
              >
                Occupied ({mockUnits.filter((u) => u.status === "occupied").length})
              </button>
              <button 
                onClick={() => setFilterStatus("vacant")}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'vacant' ? 'bg-white text-orange-600 shadow-md' : 'text-slate-500 hover:text-orange-600'}`}
                suppressHydrationWarning={true}
              >
                Vacant ({mockUnits.filter((u) => u.status === "vacant").length})
              </button>
           </div>
           
           <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500" />
                 <span>High Yield</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-orange-500" />
                 <span>Action Required</span>
              </div>
           </div>
        </div>

        {/* Units Table - Premium Architectural Style */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit Code</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Location</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Floor Level</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Value</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUnits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                         <AlertCircle className="w-10 h-10 text-slate-200" />
                         <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching assets found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUnits.map((unit) => (
                    <tr
                      key={unit.id}
                      onClick={() => {
                        setSelectedUnit(unit);
                        setShowModal(true);
                      }}
                      className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4 group/unit">
                           <div className="w-1.5 h-12 bg-slate-900 rounded-full group-hover/unit:bg-[#1B5E45] transition-all duration-300" />
                           <div className="flex flex-col gap-1">
                              <span className="text-[14px] font-semibold text-slate-900 tracking-tighter leading-none">
                                 Unit {unit.number}
                              </span>
                              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-[0.2em]">
                                 REF: 0x{unit.id.split('-').pop()}
                              </span>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                           <div className="flex items-center gap-1.5 font-semibold text-[11px] text-slate-900 uppercase tracking-widest leading-none">
                              {getBuilding(unit.buildingId)?.name}
                           </div>
                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-1">
                              <MapPin className="w-3 h-3 text-[#3DBE7A]/50" />
                              <span className="truncate max-w-[150px]">{getBuilding(unit.buildingId)?.address.split(',')[0]}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">{unit.type}</span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 font-medium text-[10px] text-slate-500">
                            LEVEL {unit.floor}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                           <span className="text-sm font-semibold text-slate-900">KSh {unit.rent.toLocaleString()}</span>
                           <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">Performance Monthly</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-[9px] uppercase tracking-widest ${unit.status === 'occupied' ? 'bg-green-100 text-green-700 shadow-[0_4px_12px_rgba(34,197,94,0.15)]' : 'bg-orange-100 text-orange-700'}`}>
                            {unit.status}
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end">
                            <button className="p-2 rounded-xl text-slate-400 hover:text-[#1B5E45] hover:bg-[#E8F5EE] transition-all">
                               <ArrowUpRight className="w-5 h-5" />
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Unit Details Modal - Cinematic View */}
      <Modal
        isOpen={showModal && !!selectedUnit}
        onClose={() => setShowModal(false)}
        title="Unit Details"
        size="6xl"
        className="rounded-[3rem] p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full bg-white">
          <div className="relative h-48 bg-slate-900 overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2),transparent_70%)]" />
             <div className="absolute inset-x-0 bottom-0 p-10 flex items-end justify-between z-10 bg-gradient-to-t from-slate-900 to-transparent">
                <div className="space-y-3">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B5E45]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#3DBE7A] border border-[#1B5E45]/30">
                      {getBuilding(selectedUnit?.buildingId)?.name}
                   </div>
                   <h3 className="text-4xl font-black text-white tracking-tighter shrink-0 capitalize">
                      <span className="text-white">Strategic</span> <span className="text-[#3DBE7A] underline decoration-white/20 underline-offset-8">Unit {selectedUnit?.number}</span>
                   </h3>
                </div>
                <div className="w-20 h-20 rounded-[2.5rem] bg-white text-slate-900 flex items-center justify-center font-black text-2xl shadow-2xl border-4 border-slate-900 group">
                   <LayoutGrid className="absolute w-5 h-5 text-slate-900/10 group-hover:scale-150 transition-transform duration-500" />
                   <span className="relative z-10">{selectedUnit?.number}</span>
                </div>
             </div>
          </div>

          <div className="p-10 space-y-10">
             <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 rounded-3xl space-y-1 text-center border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Floor Level</p>
                   <p className="text-2xl font-black text-slate-900 tracking-tighter">{selectedUnit?.floor}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl space-y-1 text-center border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuration</p>
                   <p className="text-lg font-black text-slate-900 tracking-tighter truncate">{selectedUnit?.type}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl space-y-1 text-center border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                   <p className={`text-xl font-black tracking-tighter ${selectedUnit?.status === 'occupied' ? 'text-green-600' : 'text-orange-600'}`}>
                      {selectedUnit?.status.toUpperCase()}
                   </p>
                </div>
             </div>

             {selectedUnit?.status === "occupied" && (
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#3DBE7A]" />
                        Resident Information
                      </h4>
                      <Badge text="VERIFIED" type="success" className="text-[9px] px-2 py-0.5" />
                   </div>
                   <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
                      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                         <div className="w-24 h-24 rounded-[2rem] border-4 border-white overflow-hidden shadow-xl bg-white shrink-0">
                            <img 
                              src={getAvatarUrl(mockTenants.find(t => t.unitId === selectedUnit?.id)?.name || "Resident")} 
                              alt="Resident" 
                              className="w-full h-full object-cover"
                            />
                         </div>
                         <div className="flex-1 space-y-4 text-center md:text-left">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Legal Occupant</p>
                               <h5 className="text-2xl font-black text-slate-900 tracking-tighter">
                                 {mockTenants.find(t => t.unitId === selectedUnit?.id)?.name || "Unknown Resident"}
                               </h5>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div className="flex items-center gap-2 text-xs font-bold text-slate-600 justify-center md:justify-start">
                                  <Phone className="w-3.5 h-3.5 text-[#3DBE7A]" />
                                  <span>{mockTenants.find(t => t.unitId === selectedUnit?.id)?.phone || "N/A"}</span>
                               </div>
                               <div className="flex items-center gap-2 text-xs font-bold text-slate-600 justify-center md:justify-start">
                                  <Mail className="w-3.5 h-3.5 text-[#3DBE7A]" />
                                  <span className="truncate">{mockTenants.find(t => t.unitId === selectedUnit?.id)?.email || "N/A"}</span>
                               </div>
                               <div className="flex items-center gap-2 text-xs font-bold text-slate-600 justify-center md:justify-start">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#3DBE7A]" />
                                  <span>ID: {mockTenants.find(t => t.unitId === selectedUnit?.id)?.idNumber || "N/A"}</span>
                               </div>
                            </div>
                         </div>
                         <Button 
                            variant="outline" 
                            className="rounded-xl h-12 text-[10px] uppercase tracking-widest px-6 shrink-0"
                            onClick={() => router.push("/landlord/tenants")}
                         >
                            View Profile
                         </Button>
                      </div>
                   </div>
                </div>
             )}

             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Yield Performance</h4>
                   <span className="text-xs font-bold text-slate-400">MONTHLY AUDIT</span>
                </div>
                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B5E45]/20 blur-[60px] rounded-full group-hover:bg-[#1B5E45]/40 transition-all duration-1000" />
                   <div className="relative z-10 flex items-end justify-between">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-[#3DBE7A] uppercase tracking-widest">Scheduled Rent</p>
                         <p className="text-4xl font-black tracking-tighter">KSh {selectedUnit?.rent.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                         <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex gap-4 pt-4">
                <Button 
                   variant="premium" 
                   className="flex-1 h-16 rounded-2xl text-[11px] uppercase tracking-widest"
                   onClick={() => router.push(`/landlord/buildings/${selectedUnit?.buildingId}`)}
                >
                   Modify Digital Twin
                </Button>
                <Button 
                   variant="outline" 
                   className="flex-1 h-16 rounded-2xl text-[11px] uppercase tracking-widest"
                   onClick={() => router.push("/landlord/payments")}
                >
                   Status Protocol
                </Button>
             </div>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
