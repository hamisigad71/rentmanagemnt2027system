"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import BuildingLedgerModal from "@/components/BuildingLedgerModal";
import { mockBuildings, mockUnits } from "@/data/mockData";
import { Plus, Building2, MapPin, Calendar, LayoutGrid, CheckCircle2, MoreVertical, Search, Filter, Camera, ShieldCheck, Map, Briefcase, Users, TrendingUp, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { LOADER_DURATION } from "@/utils/constants";

export default function BuildingsPage() {
  const router = useRouter();
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
    }, LOADER_DURATION);
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
              onClick={() => router.push(`/landlord/buildings/${building.id}`)}
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

      {/* Add Building Modal Only */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="7xl"
        title=""
        className="rounded-[3rem] p-0 overflow-hidden"
      >
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
      </Modal>

      <BuildingLedgerModal 
        isOpen={showLedger} 
        onClose={() => setShowLedger(false)} 
        building={selectedBuilding} 
      />
    </LandlordLayout>
  );
}
