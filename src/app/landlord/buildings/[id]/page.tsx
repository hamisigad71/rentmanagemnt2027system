"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import LandlordLayout from "@/components/LandlordLayout";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import BuildingLedgerModal from "@/components/BuildingLedgerModal";
import { mockBuildings, mockUnits } from "@/data/mockData";
import { 
  ArrowLeft, Building2, MapPin, 
  Users, LayoutGrid, TrendingUp, 
  Activity, ShieldCheck, Briefcase, 
  CheckCircle2, Plus, Edit3, 
  Trash2, Search
} from "lucide-react";

export default function BuildingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showLedger, setShowLedger] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const building = mockBuildings.find(b => b.id === id);
  const buildingUnits = mockUnits.filter(u => u.buildingId === id);

  if (!building) {
    return (
      <LandlordLayout>
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold">Building not found</h2>
          <Button onClick={() => router.push("/landlord/buildings")} className="mt-4">
            Back to Buildings
          </Button>
        </div>
      </LandlordLayout>
    );
  }

  const occupiedUnitsCount = buildingUnits.filter(u => u.status === "occupied").length;
  const occupancyRate = buildingUnits.length > 0 
    ? Math.round((occupiedUnitsCount / buildingUnits.length) * 100) 
    : 0;

  return (
    <LandlordLayout>
      <div className="p-6 md:p-10 space-y-10 selection:bg-blue-100 bg-slate-50/30 min-h-screen">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-4">
            <button 
              onClick={() => router.push("/landlord/buildings")}
              className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Inventory
            </button>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2 py-0.5 bg-blue-50 rounded-md border border-blue-100">
                  Asset ID: {building.id.split('-').pop()}
                </span>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Established {building.yearBuilt}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                {building.name}
              </h1>
              <div className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-bold">{building.address}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="secondary" className="h-12 px-6 rounded-xl border-slate-200">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Asset
            </Button>
            <Button variant="premium" className="h-12 px-8 rounded-xl shadow-xl shadow-blue-500/20" onClick={() => setShowLedger(true)}>
              <Activity className="w-4 h-4 mr-2" />
              Open Ledger
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Visuals & Synopsis */}
          <div className="lg:col-span-12 space-y-10">
             {/* Stats Bar - High Level */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Units', value: `${building.units}`, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Occupancy', value: `${occupancyRate}%`, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Asset Class', value: 'Premier', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Floors', value: '5 Levels', icon: LayoutGrid, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200/50 shadow-sm flex flex-col gap-4 hover:shadow-md transition-all group">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                    </div>
                  </div>
                ))}
             </div>

             <div className="grid lg:grid-cols-2 gap-10">
                {/* Image Section */}
                <div className="space-y-6">
                  <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-white">
                    <img src={building.image} className="w-full h-full object-cover" alt={building.name} />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
                  </div>
                  <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="space-y-1">
                        <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Asset Integrity</h5>
                        <p className="text-xl font-bold tracking-tight">System Performance</p>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Health Monitor</span>
                        <span className="text-emerald-400">Stable</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-blue-600 to-emerald-400 w-[94%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/50">
                      <Briefcase className="w-4 h-4 text-slate-500" />
                      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Architecture Synopsis</h4>
                    </div>
                    <p className="text-lg font-medium text-slate-600 leading-relaxed italic border-l-4 border-slate-200 pl-6">
                      {building.description || "A high-yield residential asset engineered for modern urban living. Managed with absolute precision and integrated with sophisticated security protocols."}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-blue-600" />
                       Asset Amenities
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {(building.amenities || ["High Speed Fiber", "24/7 Security", "Backup Generator", "Gym & Pool"]).map((item: string) => (
                        <div key={item} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl group hover:border-blue-400 transition-all">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600">
                             <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Unit Inventory Subsection */}
        <div className="space-y-8 pt-10 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Unit <span className="text-slate-400">Inventory</span></h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Managing {buildingUnits.length} residential subspaces</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Filter units..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-64 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                />
              </div>
              <Button variant="premium" className="h-12 px-6 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Allocate Unit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buildingUnits
              .filter(u => u.number.includes(searchTerm) || u.type.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((unit) => (
              <div key={unit.id} className="group bg-white p-6 rounded-[2rem] border border-slate-200/50 hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Room {unit.number}</p>
                    <h4 className="text-lg font-bold text-slate-900">{unit.type}</h4>
                  </div>
                  <Badge 
                    text={unit.status === 'occupied' ? 'Active' : 'Vacant'} 
                    type={unit.status === 'occupied' ? 'success' : 'warning'}
                    className="rounded-lg text-[9px] px-2 py-0.5"
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <p className="text-lg font-black text-slate-900">KSh {unit.rent.toLocaleString()}</p>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    View &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BuildingLedgerModal 
        isOpen={showLedger} 
        onClose={() => setShowLedger(false)} 
        building={building} 
      />
    </LandlordLayout>
  );
}
