"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import BuildingLedgerModal from "@/components/BuildingLedgerModal";
import { mockBuildings, mockUnits } from "@/data/mockData";
import { Plus, Building2, MapPin, Calendar, LayoutGrid, CheckCircle2, MoreVertical, Search, Filter, Camera, ShieldCheck, Map, Briefcase, Users, TrendingUp, Activity } from "lucide-react";

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState(mockBuildings);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Enhanced Form State
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    neighborhood: "",
    propertyType: "Residential Complex",
    units: "",
    yearBuilt: new Date().getFullYear().toString(),
    floors: "",
    amenities: [] as string[],
    description: "",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
  });

  const getOccupancyRate = (buildingId: string) => {
    const buildingUnits = mockUnits.filter((u) => u.buildingId === buildingId);
    if (buildingUnits.length === 0) return 30; // Default placeholder for demo
    const occupied = buildingUnits.filter(
      (u) => u.status === "occupied",
    ).length;
    return Math.round((occupied / buildingUnits.length) * 100);
  };

  const handleToggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBuilding = () => {
    setIsInitializing(true);
    
    // Simulate network delay for "Blockchain Sync" feeling
    setTimeout(() => {
      const newBuilding = {
        id: `bld-00${buildings.length + 1}`,
        name: formData.name || "Unnamed Asset",
        address: formData.address || "Unknown Location",
        units: parseInt(formData.units) || 0,
        occupiedUnits: 0,
        image: formData.image,
        yearBuilt: parseInt(formData.yearBuilt),
        description: formData.description,
        amenities: formData.amenities,
        floors: parseInt(formData.floors) || 1
      };

      setBuildings(prev => [newBuilding, ...prev]);
      setIsInitializing(false);
      setShowModal(false);
      
      // Reset form
      setFormData({
        name: "",
        address: "",
        neighborhood: "",
        propertyType: "Residential Complex",
        units: "",
        yearBuilt: new Date().getFullYear().toString(),
        floors: "",
        amenities: [] as string[],
        description: "",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
      });
    }, 3000);
  };

  return (
    <LandlordLayout>
      <div className="p-6 md:p-10 space-y-10 selection:bg-blue-100">
        {/* Header Section - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <Building2 className="w-3 h-3" />
              Real Estate Asset Manager
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Property <span className="text-slate-400">Inventory</span></h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search properties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suppressHydrationWarning
                className="pl-11 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl w-64 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all shadow-sm"
              />
            </div>
            <Button variant="premium" size="lg" className="h-14 px-8 rounded-2xl shadow-2xl" onClick={() => { setIsAdding(true); setShowModal(true); }}>
              <Plus className="w-5 h-5 mr-1" />
              Add Building
            </Button>
          </div>
        </div>

        {/* Buildings Grid - Balanced Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buildings.filter(b => 
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            b.address.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((building) => (
            <div
              key={building.id}
              onClick={() => { setSelectedBuilding(building); setIsAdding(false); setShowModal(true); }}
              className="group relative bg-white rounded-[2rem] border border-slate-200/50 shadow-xs hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col"
            >
              {/* Image Section - Refined Aspect Ratio */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={building.image}
                  alt={building.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge 
                    text="Premier" 
                    className="bg-slate-900 text-white border-none px-2.5 py-0.5 font-bold text-[9px] tracking-wider uppercase rounded-lg" 
                  />
                </div>
              </div>

              {/* Content Section - Balanced Typography & Spacing */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                    {building.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {building.address}
                  </div>
                </div>

                {/* Description Snippet - Fills the gap professionally */}
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                  High-performance residential asset located in the heart of {building.address.split(',').pop()?.trim()}. Managed with absolute precision.
                </p>

                {/* Stats Bar - Balanced & Understated */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-50 mt-auto">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Units</p>
                    <p className="text-sm font-bold text-slate-900">{building.units}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Built</p>
                    <p className="text-sm font-bold text-slate-900">{building.yearBuilt}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Occupancy</p>
                    <div className="flex items-center gap-1.5">
                       <p className="text-sm font-bold text-green-600">{getOccupancyRate(building.id)}%</p>
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                           <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Admin" />
                        </div>
                      ))}
                   </div>
                   <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                     Inspect &rarr;
                   </span>
                </div>
              </div>
            </div>
          ))}

          {/* New Building Ghost Card - Refined Height */}
          <div 
            onClick={() => { setIsAdding(true); setShowModal(true); }}
            className="group rounded-[1.5rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer min-h-[400px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all group-hover:scale-110">
               <Plus className="w-7 h-7" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 tracking-tight">Expand Property</p>
              <p className="text-xs font-medium text-slate-500 max-w-[180px] mx-auto mt-2 leading-relaxed">Systematically add new property assets to your inventory.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Building Details / Add Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="7xl"
        title={isAdding ? "" : ""}
        className="rounded-[3rem] p-0 overflow-hidden"
      >
        {isAdding ? (
          <div className="flex flex-col h-full max-h-[90vh]">
            <div className="p-10 border-b border-slate-100 space-y-2">
               <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Property <span className="text-blue-600">Entry</span></h3>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Asset Digital Twin Setup</p>
            </div>
            
            <form className="p-10 space-y-10 overflow-auto">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Building Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ivory Towers" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Property Category</label>
                    <select 
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all"
                    >
                      <option>Residential Complex</option>
                      <option>Commercial Center</option>
                      <option>Mixed Use</option>
                      <option>Industrial Warehouse</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Location Details</label>
                    <div className="relative">
                      <Map className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street & Neighborhood" 
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Total Units</label>
                        <input type="number" name="units" value={formData.units} onChange={handleInputChange} placeholder="24" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Floors</label>
                        <input type="number" name="floors" value={formData.floors} onChange={handleInputChange} placeholder="5" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                     </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Architecture Synopsis</label>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the asset's unique architecture and value proposition..." 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all min-h-[120px] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Checklist */}
              <div className="space-y-6">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Essential Amenities</label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["High Speed Fiber", "24/7 Security", "Backup Generator", "Gym & Pool", "CCTV Monitor", "Solar Water"].map((item) => (
                      <div 
                        key={item}
                        onClick={() => handleToggleAmenity(item)}
                        className={`px-4 py-3 border rounded-xl flex items-center gap-3 cursor-pointer transition-all ${formData.amenities.includes(item) ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white border-slate-100 text-slate-600 hover:border-blue-200"}`}
                      >
                         <CheckCircle2 className={`w-4 h-4 ${formData.amenities.includes(item) ? "text-white" : "text-slate-300"}`} />
                         <span className="text-[10px] font-black uppercase tracking-widest">{item}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Photo Upload Placeholder */}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Visual Documentation</label>
                 <div 
                    onClick={() => document.getElementById('building-image-upload')?.click()}
                    className="w-full h-40 border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-2 group hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer relative overflow-hidden"
                 >
                    {formData.image && formData.image.startsWith('data:') ? (
                      <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                    ) : null}
                    <Camera className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors relative z-10" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors relative z-10">
                      {formData.image && formData.image.startsWith('data:') ? 'Image selected' : 'Drag cinematic building photo'}
                    </p>
                    <input 
                      id="building-image-upload"
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleFileSelect}
                    />
                 </div>
              </div>

              <div className="flex gap-6 pt-10 border-t border-slate-50 mt-6">
                 <Button 
                    variant="premium" 
                    size="xl" 
                    className="flex-1 h-16 rounded-[20px]" 
                    onClick={handleAddBuilding}
                    disabled={isInitializing}
                 >
                    {isInitializing ? "Processing..." : "Initialize Asset"}
                 </Button>
                 <Button variant="secondary" size="xl" className="px-10 h-16 rounded-[20px]" onClick={() => setShowModal(false)} disabled={isInitializing}>Discard</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col h-full max-h-[90vh] bg-white overflow-hidden">
            {/* Header Section - Clean & Professional */}
            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2 py-0.5 bg-blue-50 rounded-md border border-blue-100">
                    Asset ID: {selectedBuilding?.id.split('-').pop()}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Established {selectedBuilding?.yearBuilt}
                  </span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                  {selectedBuilding?.name}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{selectedBuilding?.address}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                 <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Asset</span>
                 </div>
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                         <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="Admin" />
                      </div>
                    ))}
                 </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto bg-white">
              <div className="p-10 space-y-12">
                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-12">
                   {/* Left Column - Image & Synopsis */}
                   <div className="lg:col-span-7 space-y-10">
                      {/* Professional Asset Image */}
                      <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
                         <img src={selectedBuilding?.image} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
                      </div>

                      <div className="space-y-4">
                         <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/50">
                            <Briefcase className="w-4 h-4 text-slate-500" />
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Architecture Synopsis</h4>
                         </div>
                         <p className="text-base font-medium text-slate-600 leading-relaxed italic border-l-4 border-slate-200 pl-6">
                            {selectedBuilding?.description || "A premium urban asset designed for high-density modern living. This structure represents the pinnacle of residential integration with sophisticated security protocols and premium utility support."}
                         </p>
                      </div>

                      {/* Operational Intelligence Card - Refined */}
                      <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-8 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-colors duration-700" />
                         <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-600/5 blur-[80px] rounded-full" />
                         
                         <div className="relative z-10 flex items-center justify-between">
                            <div className="space-y-1">
                               <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Operational Intelligence</h5>
                               <p className="text-xl font-bold tracking-tight">Performance Matrix</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                               <ShieldCheck className="w-6 h-6 text-blue-400" />
                            </div>
                         </div>
                         
                         <div className="relative z-10 space-y-6">
                            <div className="space-y-3">
                               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                   <span className="text-slate-400">Yield Optimization</span>
                                   <span className="text-blue-400">85% Peak Efficiency</span>
                               </div>
                               <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-linear-to-r from-blue-600 to-blue-400 w-[85%] shadow-[0_0_20px_rgba(59,130,246,0.4)]" />
                               </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                               <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                                  <div className="flex items-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                     <span className="text-xs font-bold">Optimized</span>
                                  </div>
                               </div>
                               <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Integrity</p>
                                  <div className="flex items-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                     <span className="text-xs font-bold">Verified</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Right Column - Stats & Amenities */}
                   <div className="lg:col-span-5 space-y-10">
                      {/* Stats Column */}
                      <div className="grid grid-cols-2 gap-6">
                         {[
                           { label: 'Total Inventory', value: `${selectedBuilding?.units} Units`, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
                           { label: 'Occupancy Rate', value: `${((selectedBuilding?.occupiedUnits / selectedBuilding?.units) * 100).toFixed(1)}%`, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                           { label: 'Floor Matrix', value: `${selectedBuilding?.floors || 5} Levels`, icon: LayoutGrid, color: 'text-amber-600', bg: 'bg-amber-50' },
                           { label: 'Asset Value', value: 'High Yield', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                         ].map((stat, i) => (
                           <div key={i} className="p-6 bg-white rounded-[2rem] border border-slate-100 flex flex-col gap-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
                              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                 <stat.icon className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                                 <p className="text-xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                              </div>
                           </div>
                         ))}
                      </div>

                      {/* Amenities Section */}
                      <div className="space-y-6">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-1 h-6 bg-slate-900 rounded-full" />
                               <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Asset Amenities</h4>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{selectedBuilding?.amenities?.length || 4} Global Features</span>
                         </div>
                         
                         <div className="grid grid-cols-1 gap-3">
                            {(selectedBuilding?.amenities || ["High Speed Fiber", "24/7 Security", "Backup Generator", "Gym & Pool"]).map((item: string) => (
                              <div key={item} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] group hover:bg-white hover:border-blue-200 transition-all duration-300">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                                       <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{item}</span>
                                 </div>
                                 <div className="px-2 py-1 rounded-md bg-slate-200/50 text-[8px] font-bold text-slate-500 tracking-widest uppercase">Certified</div>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* Quick Maintenance View Card */}
                      <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white space-y-4 shadow-2xl shadow-blue-500/20">
                         <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Asset Health</p>
                         </div>
                         <p className="text-sm font-bold leading-snug">All primary systems are currently synchronized and performing within optimal parameters.</p>
                         <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">
                            Run Diagnostic
                         </button>
                      </div>
                   </div>
                </div>

                {/* Final Action Bar */}
                <div className="flex flex-col md:flex-row gap-4 pt-10 border-t border-slate-100">
                   <Button variant="premium" className="flex-1 h-20 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30" onClick={() => setShowLedger(true)}>
                      <Activity className="w-5 h-5 mr-3" />
                      Open Digital Ledger
                   </Button>
                   <Button variant="secondary" className="flex-1 h-20 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.2em] border-slate-200">
                      <LayoutGrid className="w-5 h-5 mr-3" />
                      Explore Unit Inventory
                   </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <BuildingLedgerModal 
        isOpen={showLedger} 
        onClose={() => setShowLedger(false)} 
        building={selectedBuilding} 
      />
    </LandlordLayout>
  );
}
