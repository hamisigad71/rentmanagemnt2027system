"use client";

import React, { useState, useRef } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Modal from "@/components/Modal";
import BuildingLedgerModal from "@/components/BuildingLedgerModal";
import { mockBuildings, mockUnits, mockTenants } from "@/data/mockData";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plus, Building2, MapPin, Calendar, LayoutGrid, CheckCircle2,
  Search, Camera, ShieldCheck, Users, TrendingUp, ArrowRight,
  ArrowUpRight, ChevronRight, Home, DollarSign, Layers,
  Wifi, Car, Dumbbell, Zap, Shield, X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { LOADER_DURATION } from "@/utils/constants";

/* ─── helpers ───────────────────────────────────────────────────────────────── */
function getOccupancyRate(buildingId: string) {
  const units = mockUnits.filter(u => u.buildingId === buildingId);
  if (!units.length) return 30;
  return Math.round((units.filter(u => u.status === "occupied").length / units.length) * 100);
}
function getBuildingUnits(buildingId: string) {
  return mockUnits.filter(u => u.buildingId === buildingId);
}
function getBuildingTenants(buildingId: string) {
  const unitIds = getBuildingUnits(buildingId).map(u => u.id);
  return mockTenants.filter(t => unitIds.includes(t.unitId));
}
function getBuildingRevenue(buildingId: string) {
  return getBuildingTenants(buildingId).reduce((s, t) => s + t.rent, 0);
}
function getBuildingArrears(buildingId: string) {
  return getBuildingTenants(buildingId).filter(t => t.arrears > 0).length;
}

/* ─── animation wrapper ─────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── animated occupancy bar ─────────────────────────────────────────────── */
function OccBar({ pct }: { pct: number }) {
  return (
    <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
      <motion.div className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg,#1B5E45,#3DBE7A)" }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

/* ─── form field ────────────────────────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[8px] font-black uppercase tracking-[0.38em]"
        style={{ color: "var(--color-text-muted)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all focus:border-[#3DBE7A]";
const inputStyle = {
  background: "var(--color-background-alt)",
  borderColor: "var(--color-border-light)",
  color: "var(--color-text-primary)",
};

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function BuildingsPage() {
  const router = useRouter();
  const [buildings, setBuildings] = useState(mockBuildings);
  const [showModal, setShowModal]     = useState(false);
  const [showLedger, setShowLedger]   = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [isAdding, setIsAdding]       = useState(false);
  const [search, setSearch]           = useState("");

  const [formData, setFormData] = useState({
    name: "", address: "", propertyType: "Residential Complex",
    units: "", yearBuilt: new Date().getFullYear().toString(),
    floors: "", amenities: [] as string[], description: "",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const toggleAmenity = (a: string) =>
    setFormData(p => ({
      ...p,
      amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a],
    }));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(p => ({ ...p, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      setBuildings(p => [{
        id: `bld-${Date.now()}`,
        name: formData.name || "Unnamed Property",
        address: formData.address || "—",
        units: parseInt(formData.units) || 0,
        occupiedUnits: 0,
        image: formData.image,
        yearBuilt: parseInt(formData.yearBuilt),
        description: formData.description,
        amenities: formData.amenities,
        floors: parseInt(formData.floors) || 1,
      }, ...p]);
      setIsAdding(false);
      setShowModal(false);
      setFormData({ name:"",address:"",propertyType:"Residential Complex",units:"",yearBuilt:new Date().getFullYear().toString(),floors:"",amenities:[],description:"",image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80" });
    }, LOADER_DURATION);
  };

  /* summary stats */
  const totalUnits    = buildings.reduce((s, b) => s + b.units, 0);
  const totalOccupied = mockUnits.filter(u => u.status === "occupied").length;
  const totalRevenue  = mockTenants.reduce((s, t) => s + t.rent, 0);
  const portfolioOcc  = totalUnits ? Math.round((totalOccupied / totalUnits) * 100) : 0;

  const filtered = buildings.filter(b =>
    `${b.name} ${b.address}`.toLowerCase().includes(search.toLowerCase())
  );

  const AMENITY_ICONS: Record<string, React.ReactNode> = {
    "High-Speed WiFi": <Wifi className="w-4 h-4" />,
    "Parking":         <Car className="w-4 h-4" />,
    "Gym":             <Dumbbell className="w-4 h-4" />,
    "24/7 Security":   <Shield className="w-4 h-4" />,
    "Backup Power":    <Zap className="w-4 h-4" />,
    "CCTV":            <Camera className="w-4 h-4" />,
  };

  return (
    <LandlordLayout>
      <div className="min-h-screen" style={{ background: "var(--color-background)" }}>

        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="px-6 md:px-8 pt-7 pb-0">
          <Reveal className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-[#3DBE7A]" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.42em]"
                  style={{ color: "var(--color-text-muted)" }}>
                  Property Portfolio
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none"
                style={{ color: "var(--color-text-primary)" }}>
                Buildings &{" "}
                <span className="bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] bg-clip-text text-transparent">
                  Properties
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                  style={{ color: "var(--color-text-muted)" }} />
                <input type="text" placeholder="Search properties…" value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all w-52"
                  style={{ background: "var(--color-card)", border: "1px solid var(--color-border-light)", color: "var(--color-text-primary)" }}
                  suppressHydrationWarning />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 whitespace-nowrap"
                style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 14px rgba(27,94,69,0.28)" }}>
                <Plus className="w-3.5 h-3.5" /> Add Building
              </button>
            </div>
          </Reveal>

          {/* Portfolio summary strip */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: "Total Buildings",  val: buildings.length,               icon: Building2,  accent: true },
                { label: "Total Units",      val: totalUnits,                     icon: Home },
                { label: "Portfolio Occ.",   val: `${portfolioOcc}%`,             icon: TrendingUp },
                { label: "Monthly Revenue",  val: `KSh ${totalRevenue.toLocaleString()}`, icon: DollarSign },
              ].map(({ label, val, icon: Icon, accent }, i) => (
                <div key={i}
                  className="relative rounded-2xl p-4 border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: accent ? "linear-gradient(135deg,#1B5E45,#246B4F)" : "var(--color-card)",
                    borderColor: accent ? "transparent" : "var(--color-border-light)",
                    boxShadow: accent ? "0 8px 28px rgba(27,94,69,0.22)" : "var(--shadow-card)",
                  }}>
                  {accent && <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/8 rounded-full" />}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${accent ? "bg-white/15" : "bg-[#E8F5EE] border border-[#C4D4C9]"}`}>
                    <Icon className="w-4 h-4" style={{ color: accent ? "rgba(255,255,255,0.9)" : "#1B5E45" }} />
                  </div>
                  <p className="text-2xl font-black leading-none mb-1"
                    style={{ color: accent ? "white" : "var(--color-text-primary)" }}>
                    {val}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-[0.32em]"
                    style={{ color: accent ? "rgba(255,255,255,0.48)" : "var(--color-text-muted)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── BUILDINGS GRID ───────────────────────────────────────────────── */}
        <div className="px-6 md:px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map((building, i) => {
                const occ      = getOccupancyRate(building.id);
                const units    = getBuildingUnits(building.id);
                const tenants  = getBuildingTenants(building.id);
                const revenue  = getBuildingRevenue(building.id);
                const arrears  = getBuildingArrears(building.id);
                const occupied = units.filter(u => u.status === "occupied").length;
                const vacant   = units.length - occupied;

                return (
                  <motion.div key={building.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
                    style={{
                      background: "var(--color-card)",
                      borderColor: "var(--color-border-light)",
                      boxShadow: "var(--shadow-card)",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,94,69,0.22)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-light)"}
                  >
                    {/* Property image */}
                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      <img src={building.image} alt={building.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/20 to-transparent" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />

                      {/* Occ badge */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-end justify-between mb-1.5">
                          <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-0.5">Occupancy</p>
                            <p className="text-xl font-black text-white leading-none">{occ}%</p>
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15"
                            style={{ background: "rgba(61,190,122,0.15)" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Live</span>
                          </div>
                        </div>
                        <OccBar pct={occ} />
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col gap-4 flex-1">

                      {/* Name + address */}
                      <div>
                        <h3 className="text-base font-black tracking-tight group-hover:text-[#1B5E45] transition-colors"
                          style={{ color: "var(--color-text-primary)" }}>
                          {building.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3 h-3 text-[#3DBE7A] flex-shrink-0" />
                          <p className="text-xs font-medium truncate" style={{ color: "var(--color-text-muted)" }}>
                            {building.address}
                          </p>
                        </div>
                      </div>

                      {/* Stat grid */}
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: "Units",    val: building.units },
                          { label: "Occupied", val: occupied },
                          { label: "Vacant",   val: vacant },
                          { label: "Est.",     val: building.yearBuilt },
                        ].map((s, i) => (
                          <div key={i} className="rounded-xl p-2.5 text-center border"
                            style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                            <p className="text-[9px] font-black uppercase tracking-widest mb-0.5"
                              style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
                            <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>{s.val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Revenue + arrears row */}
                      <div className="flex items-center justify-between py-3 border-t border-b"
                        style={{ borderColor: "var(--color-border-light)" }}>
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: "var(--color-text-muted)" }}>Monthly Revenue</p>
                          <p className="text-sm font-black" style={{ color: "var(--color-green-deep)" }}>
                            {revenue > 0 ? `KSh ${revenue.toLocaleString()}` : "—"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: "var(--color-text-muted)" }}>Arrears</p>
                          <p className="text-sm font-black" style={{ color: arrears > 0 ? "#dc2626" : "#3DBE7A" }}>
                            {arrears > 0 ? `${arrears} tenant${arrears > 1 ? "s" : ""}` : "All clear"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: "var(--color-text-muted)" }}>Tenants</p>
                          <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>
                            {tenants.length}
                          </p>
                        </div>
                      </div>

                      {/* Amenities chips */}
                      {building.amenities && building.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {building.amenities.slice(0, 4).map((a, i) => (
                            <span key={i}
                              className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border"
                              style={{ background: "var(--color-surface-tint)", color: "var(--color-green-deep)", borderColor: "var(--color-border-mid)" }}>
                              {a}
                            </span>
                          ))}
                          {building.amenities.length > 4 && (
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border"
                              style={{ background: "var(--color-background-alt)", color: "var(--color-text-muted)", borderColor: "var(--color-border-light)" }}>
                              +{building.amenities.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action row */}
                      <div className="flex items-center gap-2 mt-auto">
                        <button
                          onClick={() => router.push(`/landlord/buildings/${building.id}`)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5"
                          style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 12px rgba(27,94,69,0.22)" }}>
                          View Details <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); setSelectedBuilding(building); setShowLedger(true); }}
                          className="flex items-center justify-center w-10 h-10 rounded-xl border transition-all hover:bg-[#E8F5EE] hover:border-[#C4D4C9]"
                          style={{ borderColor: "var(--color-border-light)" }}
                          title="View Ledger">
                          <Layers className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Add card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: filtered.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setShowModal(true)}
              className="group rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center gap-5 cursor-pointer transition-all duration-300 hover:border-[#3DBE7A] hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: "var(--color-border-light)", minHeight: 320, background: "var(--color-card)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(61,190,122,0.03)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--color-card)"}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1B5E45] border"
                style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)", color: "#1B5E45" }}>
                <Plus className="w-6 h-6 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Add New Building</p>
                <p className="text-[9px] font-bold uppercase tracking-widest mt-1.5"
                  style={{ color: "var(--color-text-muted)" }}>
                  Expand your portfolio
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── ADD BUILDING MODAL ───────────────────────────────────────────────── */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title=""
        size="7xl"
        className="rounded-[1.5rem] p-0 overflow-hidden border-none"
      >
        <div className="flex flex-col max-h-[92vh]" style={{ background: "var(--color-background)" }}>

          {/* Modal hero header */}
          <div className="relative overflow-hidden flex-shrink-0" style={{ background: "#0F0F0F", minHeight: 110 }}>
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.5) 1px,transparent 0)", backgroundSize: "24px 24px" }} />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -mr-20 -mt-20"
              style={{ background: "rgba(61,190,122,0.14)" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />
            <div className="relative z-10 px-8 py-7 flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1B5E45]/30 border border-[#3DBE7A]/25 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-[#3DBE7A]" />
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-[0.42em] text-white/30">Portfolio</p>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">Register New Building</h3>
                <p className="text-[10px] text-white/30">Add a property to your managed portfolio</p>
              </div>
              <button onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/15"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="overflow-auto p-7 space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Left */}
              <div className="space-y-4">
                <Field label="Building Name">
                  <input type="text" name="name" value={formData.name} onChange={handleInput}
                    placeholder="e.g. Sunrise Apartments" className={inputCls} style={inputStyle} />
                </Field>
                <Field label="Property Type">
                  <select name="propertyType" value={formData.propertyType} onChange={handleInput}
                    className={inputCls} style={inputStyle}>
                    <option>Residential Complex</option>
                    <option>Commercial Center</option>
                    <option>Mixed Use</option>
                    <option>Industrial</option>
                  </select>
                </Field>
                <Field label="Address">
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#3DBE7A]" />
                    <input type="text" name="address" value={formData.address} onChange={handleInput}
                      placeholder="Street address, city" className={`${inputCls} pl-10`} style={inputStyle} />
                  </div>
                </Field>
                <Field label="Description">
                  <textarea name="description" value={formData.description} onChange={handleInput}
                    placeholder="Brief description of the property…"
                    className={`${inputCls} min-h-[80px] resize-none`} style={inputStyle} />
                </Field>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Total Units">
                    <input type="number" name="units" value={formData.units} onChange={handleInput}
                      placeholder="24" className={inputCls} style={inputStyle} />
                  </Field>
                  <Field label="Floors">
                    <input type="number" name="floors" value={formData.floors} onChange={handleInput}
                      placeholder="5" className={inputCls} style={inputStyle} />
                  </Field>
                  <Field label="Year Built">
                    <input type="number" name="yearBuilt" value={formData.yearBuilt} onChange={handleInput}
                      placeholder="2020" className={inputCls} style={inputStyle} />
                  </Field>
                </div>

                {/* Amenities */}
                <Field label="Amenities">
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(AMENITY_ICONS).map(([amenity, icon]) => {
                      const active = formData.amenities.includes(amenity);
                      return (
                        <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-black transition-all"
                          style={{
                            background: active ? "var(--color-surface-tint)" : "var(--color-background-alt)",
                            borderColor: active ? "var(--color-border-mid)" : "var(--color-border-light)",
                            color: active ? "var(--color-green-deep)" : "var(--color-text-muted)",
                          }}>
                          {icon}
                          <span className="text-[9px] uppercase tracking-widest truncate">{amenity}</span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Image upload */}
                <Field label="Property Photo">
                  <div
                    onClick={() => document.getElementById("bldg-img-upload")?.click()}
                    className="relative h-28 rounded-xl border-2 border-dashed overflow-hidden cursor-pointer transition-all hover:border-[#3DBE7A]"
                    style={{ borderColor: "var(--color-border-light)", background: "var(--color-background-alt)" }}>
                    {formData.image && formData.image.startsWith("data:") && (
                      <img src={formData.image} alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-white border flex items-center justify-center shadow-sm"
                        style={{ color: "#1B5E45" }}>
                        <Camera className="w-4 h-4" />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest"
                        style={{ color: "var(--color-text-muted)" }}>
                        {formData.image.startsWith("data:") ? "Photo uploaded" : "Upload photo"}
                      </p>
                    </div>
                    <input id="bldg-img-upload" type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                  </div>
                </Field>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t" style={{ borderColor: "var(--color-border-light)" }}>
              <button onClick={handleAdd} disabled={isAdding}
                className="flex-1 py-3 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#1B5E45,#3DBE7A)", boxShadow: "0 4px 16px rgba(27,94,69,0.25)" }}>
                {isAdding ? "Adding…" : "Add Building"}
              </button>
              <button onClick={() => setShowModal(false)} disabled={isAdding}
                className="flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-widest border transition-all hover:bg-[#F7F8F5]"
                style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                Cancel
              </button>
            </div>
          </div>
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