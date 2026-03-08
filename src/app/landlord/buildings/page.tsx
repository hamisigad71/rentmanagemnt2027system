"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import BuildingLedgerModal from "@/components/BuildingLedgerModal";
import { mockBuildings, mockUnits } from "@/data/mockData";
import { 
  Plus, 
  Building2, 
  MapPin, 
  Calendar, 
  LayoutGrid, 
  CheckCircle2, 
  MoreVertical, 
  Search, 
  Filter, 
  Camera, 
  ShieldCheck, 
  Map, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Activity,
  ArrowRight,
  Database
} from "lucide-react";
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
    if (buildingUnits.length === 0) return 30;
    const occupied = buildingUnits.filter((u) => u.status === "occupied").length;
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
      <div className="p-6 md:p-10 space-y-12" style={{ background: "var(--color-background)" }}>
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b" style={{ borderColor: "var(--color-border-light)" }}>
          <div className="space-y-4">
            <div 
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]" 
              style={{ background: "var(--color-surface-tint)", color: "var(--color-green-deep)" }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter whitespace-nowrap md:whitespace-normal" style={{ color: "var(--color-text-primary)" }}>
              Property <span className="opacity-30 italic">Inventory</span>
            </h2>
          </div>
          
          <div className="flex flex-nowrap md:flex-wrap items-center gap-3 md:gap-4">
            <div className="relative group flex-shrink-0">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors" style={{ color: "var(--color-text-muted)" }} />
              <input 
                type="text" 
                placeholder="Find property..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suppressHydrationWarning
                className="pl-12 pr-8 py-4 rounded-[1.5rem] w-40 md:w-72 text-sm font-black transition-all shadow-sm focus:ring-8 focus:ring-[#1B5E45]/5 focus:border-[#1B5E45] outline-none"
                style={{ background: "var(--color-card)", border: "1px solid var(--color-border-light)", color: "var(--color-text-primary)" }}
              />
            </div>
            <Button 
              variant="premium" 
              className="h-14 px-6 md:px-10 rounded-2xl shadow-xl shadow-[#1B5E45]/20 flex-shrink-0 whitespace-nowrap w-40 md:w-auto" 
              onClick={() => { setIsAdding(true); setShowModal(true); }}
            >
              <Plus className="w-5 h-5 mr-2" />
              New Asset
            </Button>
          </div>
        </div>

        {/* Global Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {buildings.filter(b => 
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            b.address.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((building) => (
            <div
              key={building.id}
              onClick={() => router.push(`/landlord/buildings/${building.id}`)}
              className="group relative rounded-xl md:rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1B5E45]/10 cursor-pointer flex flex-col overflow-hidden" 
              style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden">
                <img
                  src={building.image}
                  alt={building.name}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge 
                    text="Premium" 
                    className="bg-white/10 backdrop-blur-sm text-white border-white/20 px-2 py-0.5 font-black text-[7px] md:text-[8px] tracking-[0.15em] uppercase rounded-full" 
                  />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div 
                    className="px-3 py-1.5 rounded-xl md:rounded-2xl backdrop-blur-xl border border-white/20 text-white shadow-lg"
                    style={{ background: "rgba(27, 94, 69, 0.4)" }}
                  >
                    <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest opacity-80">Occ.</p>
                    <p className="text-sm md:text-base font-black">{getOccupancyRate(building.id)}%</p>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-4 lg:p-5 flex-1 flex flex-col border-t" style={{ borderColor: "var(--color-border-light)" }}>
                <div className="mb-2 md:mb-3">
                  <h3 className="text-sm md:text-base lg:text-lg font-bold italic tracking-tight mb-1 group-hover:text-[#1B5E45] transition-colors line-clamp-1" style={{ color: "var(--color-text-primary)" }}>
                    {building.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[7px] md:text-[8px] font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#3DBE7A]" />
                    <span className="line-clamp-1">{building.address.split(',')[0]}</span>
                  </div>
                </div>

                <p className="text-[10px] md:text-xs font-medium leading-tight mb-3 md:mb-4 line-clamp-1 italic opacity-70" style={{ color: "var(--color-text-muted)" }}>
                  Strategic residential asset
                </p>

                <div className="grid grid-cols-2 gap-2 md:gap-3 py-2 md:py-3 border-y mb-3 md:mb-4 text-[10px] md:text-xs" style={{ borderColor: "var(--color-border-light)" }}>
                  <div className="space-y-0.5">
                    <p className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] opacity-60" style={{ color: "var(--color-text-muted)" }}>Units</p>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-base md:text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>{building.units}</span>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] opacity-60" style={{ color: "var(--color-text-muted)" }}>Est.</p>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-base md:text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>{building.yearBuilt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto gap-2 text-[9px] md:text-[10px]">
                   <div className="flex -space-x-1.5 md:-space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white bg-[#F0F5F0] overflow-hidden shadow-sm">
                           <img src={`https://i.pravatar.cc/100?img=${i + 22}`} alt="Admin" />
                        </div>
                      ))}
                   </div>
                   <div className="flex items-center gap-1 group/btn font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                     <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.15em] transform group-hover/btn:translate-x-0.5 transition-transform" style={{ color: "#1B5E45" }}>
                       View
                     </span>
                     <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 transition-transform group-hover:translate-x-0.5" style={{ color: "#1B5E45" }} />
                   </div>
                </div>
              </div>
            </div>
          ))}

          {/* New Asset Digital Twin Entry Card */}
          <div 
            onClick={() => { setIsAdding(true); setShowModal(true); }}
            className="group rounded-xl md:rounded-2xl border-2 border-dashed p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center text-center gap-4 md:gap-6 hover:border-[#3DBE7A] hover:bg-[#E8F5EE]/50 transition-all duration-500 cursor-pointer min-h-[280px] md:min-h-[320px]"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-lg text-[#1B5E45]" style={{ background: "var(--color-surface-tint)" }}>
               <Plus className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </div>
            <div className="space-y-2">
              <p className="text-base md:text-lg lg:text-xl font-bold italic tracking-tight" style={{ color: "var(--color-text-primary)" }}>Add Property</p>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-[180px] mx-auto opacity-60">New asset to portfolio</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="7xl"
        title=""
        className="rounded-[4rem] p-0 overflow-hidden shadow-2xl border-none"
      >
        <div className="flex flex-col h-full max-h-[95vh]" style={{ background: "var(--color-background)" }}>
          <div className="p-12 md:p-16 border-b space-y-4" style={{ borderColor: "var(--color-border-light)" }}>
              <div 
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]" 
                style={{ background: "var(--color-surface-tint)", color: "var(--color-green-deep)" }}
              >
                <Database className="w-3.5 h-3.5" />
                Asset Registry
              </div>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter" style={{ color: "var(--color-text-primary)" }}>Asset <span className="opacity-30 italic">Registration</span></h3>
          </div>
          
          <form className="p-12 md:p-16 space-y-12 overflow-auto scrollbar-hide">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Building Identity</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter asset name..." 
                    className="w-full px-8 py-5 border rounded-3xl text-md font-bold focus:outline-none focus:ring-8 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] transition-all italic"
                    style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Property Classification</label>
                  <select 
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-8 py-5 border rounded-3xl text-md font-black italic focus:outline-none focus:ring-8 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] appearance-none transition-all"
                    style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }}
                  >
                    <option>Residential Complex</option>
                    <option>Commercial Center</option>
                    <option>Mixed Use</option>
                    <option>Industrial Warehouse</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Geolocation</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3DBE7A]" />
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Latitude / Longitude / Address" 
                      className="w-full pl-16 pr-8 py-5 border rounded-3xl text-md font-bold focus:outline-none focus:ring-8 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] transition-all italic"
                      style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Total Nodes</label>
                      <input type="number" name="units" value={formData.units} onChange={handleInputChange} placeholder="24" className="w-full px-8 py-5 border rounded-3xl text-md font-bold focus:outline-none focus:ring-8 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] transition-all" style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Structure Floors</label>
                      <input type="number" name="floors" value={formData.floors} onChange={handleInputChange} placeholder="5" className="w-full px-8 py-5 border rounded-3xl text-md font-bold focus:outline-none focus:ring-8 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] transition-all" style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }} />
                    </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Architecture Narrative</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Log internal architecture data and asset value..." 
                className="w-full px-8 py-6 border rounded-3xl text-md font-medium italic focus:outline-none focus:ring-8 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] transition-all min-h-[160px] resize-none"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-primary)" }}
              />
            </div>

            {/* Premium Amenities Checklist */}
            <div className="space-y-8">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Infrastructure Specs</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {["Fiber 1Gbps", "24/7 Shield", "Backup Grid", "Life Studio", "CCTV AI", "Solar Grid"].map((item) => (
                    <div 
                      key={item}
                      onClick={() => handleToggleAmenity(item)}
                      className="px-4 py-5 border rounded-3xl flex flex-col items-center gap-3 cursor-pointer transition-all duration-500 hover:scale-105"
                      style={formData.amenities.includes(item) ? { background: "var(--color-green-deep)", borderColor: "var(--color-green-deep)", color: "#fff", transform: "translateY(-5px)", boxShadow: "0 20px 30px -10px rgba(27, 94, 69, 0.3)" } : { background: "var(--color-card)", borderColor: "var(--color-border-light)", color: "var(--color-text-secondary)" }}
                    >
                        <CheckCircle2 className={`w-6 h-6 ${formData.amenities.includes(item) ? "text-[#3DBE7A]" : "text-slate-100"}`} />
                        <span className="text-[8px] font-black uppercase tracking-widest text-center">{item}</span>
                    </div>
                  ))}
                </div>
            </div>

            {/* Media Upload Area */}
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Visual Asset</label>
                <div 
                  onClick={() => document.getElementById('building-image-upload')?.click()}
                  className="w-full h-56 border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center gap-4 transition-all duration-700 cursor-pointer relative overflow-hidden group" 
                  style={{ borderColor: "var(--color-border-light)", background: "var(--color-background-alt)" }}
                >
                  <div className="absolute inset-0 bg-[#E8F5EE]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {formData.image && formData.image.startsWith('data:') ? (
                    <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                  ) : null}
                  <div className="p-4 bg-white rounded-2xl shadow-xl transition-transform group-hover:scale-110 relative z-10" style={{ color: "#1B5E45" }}>
                    <Camera className="w-8 h-8" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-[#1B5E45] transition-colors relative z-10">
                    {formData.image && formData.image.startsWith('data:') ? 'Asset Uploaded' : 'Upload Cinematic Imagery'}
                  </p>
                  <input id="building-image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-12 border-t mt-12" style={{ borderColor: "var(--color-border-light)" }}>
                <Button 
                  variant="premium" 
                  size="xl" 
                  className="flex-1 h-20 rounded-3xl text-xl font-black italic shadow-2xl" 
                  onClick={handleAddBuilding}
                  disabled={isInitializing}
                >
                  {isInitializing ? "Processing Digital Twin..." : "Confirm Asset Node"}
                </Button>
                <Button variant="secondary" size="xl" className="px-12 h-20 rounded-3xl text-sm font-black uppercase tracking-widest" onClick={() => setShowModal(false)} disabled={isInitializing}>Discard</Button>
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
