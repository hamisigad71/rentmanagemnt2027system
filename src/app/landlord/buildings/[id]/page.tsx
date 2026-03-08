"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LandlordLayout from "@/components/LandlordLayout";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import BuildingLedgerModal from "@/components/BuildingLedgerModal";
import { mockBuildings, mockUnits } from "@/data/mockData";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  LayoutGrid,
  TrendingUp,
  Activity,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Plus,
  Edit3,
  Search,
} from "lucide-react";

export default function BuildingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showLedger, setShowLedger] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const building = mockBuildings.find((b) => b.id === id);
  const buildingUnits = mockUnits.filter((u) => u.buildingId === id);

  if (!building) {
    return (
      <LandlordLayout>
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            Building not found
          </h2>
          <Button onClick={() => router.push("/landlord/buildings")} className="mt-4">
            Back to Buildings
          </Button>
        </div>
      </LandlordLayout>
    );
  }

  const occupiedUnitsCount = buildingUnits.filter((u) => u.status === "occupied").length;
  const occupancyRate =
    buildingUnits.length > 0
      ? Math.round((occupiedUnitsCount / buildingUnits.length) * 100)
      : 0;

  return (
    <LandlordLayout>
      <div
        className="p-6 md:p-10 space-y-10 min-h-screen"
        style={{ background: "var(--color-background)" }}
      >
        {/* ── Navigation & Header ── */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8"
          style={{ borderBottom: "1px solid var(--color-border-light)" }}
        >
          <div className="space-y-4">
            {/* Back */}
            <button
              onClick={() => router.push("/landlord/buildings")}
              className="group flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-colors"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-green-deep)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-text-muted)")
              }
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Inventory
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md"
                  style={{
                    background: "var(--color-surface-tint)",
                    border: "1px solid var(--color-border-mid)",
                    color: "var(--color-green-deep)",
                  }}
                >
                  Asset ID: {building.id.split("-").pop()}
                </span>
                <div className="w-1 h-1 rounded-full" style={{ background: "var(--color-border-mid)" }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Established {building.yearBuilt}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter" style={{ color: "var(--color-text-primary)" }}>
                {building.name}
              </h1>
              <div className="flex items-center gap-1.5" style={{ color: "var(--color-text-muted)" }}>
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-bold">{building.address}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="secondary" className="h-12 px-6">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Asset
            </Button>
            <Button variant="premium" className="h-12 px-8" onClick={() => setShowLedger(true)}>
              <Activity className="w-4 h-4 mr-2" />
              Open Ledger
            </Button>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Units", value: `${building.units}`,   icon: Building2,  color: "var(--color-green-deep)",    bg: "var(--color-surface-tint)" },
            { label: "Occupancy",   value: `${occupancyRate}%`,   icon: Users,      color: "var(--color-green-bright)",  bg: "var(--color-surface-tint)" },
            { label: "Asset Class", value: "Premier",             icon: TrendingUp, color: "#d97706",                    bg: "#FEF3C7" },
            { label: "Floors",      value: "5 Levels",            icon: LayoutGrid, color: "var(--color-green-mid)",     bg: "var(--color-surface-tint)" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl flex flex-col gap-4 transition-all hover:shadow-md group"
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border-light)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: stat.bg, color: stat.color }}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-2" style={{ color: "var(--color-text-muted)" }}>
                  {stat.label}
                </p>
                <p className="text-2xl font-black tracking-tighter" style={{ color: "var(--color-text-primary)" }}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Image + Details ── */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image + performance card */}
          <div className="space-y-6">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden" style={{ border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}>
              <img src={building.image} className="w-full h-full object-cover" alt={building.name} />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
            </div>

            {/* Performance card — stays dark */}
            <div
              className="p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group"
              style={{ background: "var(--color-dark)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px]" style={{ background: "rgba(61,190,122,0.12)" }} />
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <h5 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#3DBE7A" }}>
                    Asset Integrity
                  </h5>
                  <p className="text-xl font-bold tracking-tight">System Performance</p>
                </div>
                <ShieldCheck className="w-8 h-8" style={{ color: "#3DBE7A" }} />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span style={{ color: "rgba(250,250,248,0.5)" }}>Health Monitor</span>
                  <span style={{ color: "#3DBE7A" }}>Stable</span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="h-full w-[94%] rounded-full"
                    style={{ background: "var(--gradient-mint-glow)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description + amenities */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div
                className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl"
                style={{ background: "var(--color-background-alt)", border: "1px solid var(--color-border-light)" }}
              >
                <Briefcase className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
                <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--color-text-primary)" }}>
                  Architecture Synopsis
                </h4>
              </div>
              <p
                className="text-lg font-medium leading-relaxed italic pl-6"
                style={{ color: "var(--color-text-secondary)", borderLeft: "4px solid var(--color-border-mid)" }}
              >
                {building.description ||
                  "A high-yield residential asset engineered for modern urban living. Managed with absolute precision and integrated with sophisticated security protocols."}
              </p>
            </div>

            <div className="space-y-6">
              <h4
                className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-green-deep)" }} />
                Asset Amenities
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {(
                  building.amenities || [
                    "High Speed Fiber",
                    "24/7 Security",
                    "Backup Generator",
                    "Gym & Pool",
                  ]
                ).map((item: string) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 rounded-2xl group transition-all"
                    style={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border-light)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.borderColor =
                        "var(--color-green-mid)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.borderColor =
                        "var(--color-border-light)")
                    }
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--color-surface-tint)", color: "var(--color-green-deep)" }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Unit Inventory ── */}
        <div
          className="space-y-8 pt-10"
          style={{ borderTop: "1px solid var(--color-border-light)" }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-3xl font-black tracking-tighter" style={{ color: "var(--color-text-primary)" }}>
                Unit <span style={{ color: "var(--color-text-muted)" }}>Inventory</span>
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                Managing {buildingUnits.length} residential subspaces
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  type="text"
                  placeholder="Filter units…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-6 py-3 rounded-full w-64 text-sm font-bold transition-all"
                  style={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border-light)",
                    color: "var(--color-text-primary)",
                    outline: "none",
                  }}
                />
              </div>
              <Button variant="premium" className="h-12 px-6">
                <Plus className="w-4 h-4 mr-2" />
                Allocate Unit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buildingUnits
              .filter(
                (u) =>
                  u.number.includes(searchTerm) ||
                  u.type.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((unit) => (
                <div
                  key={unit.id}
                  className="group p-6 rounded-[2rem] transition-all cursor-pointer"
                  style={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border-light)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "var(--shadow-green)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--color-border-mid)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "var(--shadow-soft)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--color-border-light)";
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                        Room {unit.number}
                      </p>
                      <h4 className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                        {unit.type}
                      </h4>
                    </div>
                    <Badge
                      text={unit.status === "occupied" ? "Active" : "Vacant"}
                      type={unit.status === "occupied" ? "success" : "warning"}
                      className="rounded-lg text-[9px] px-2 py-0.5"
                    />
                  </div>
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: "1px solid var(--color-border-light)" }}
                  >
                    <p className="text-lg font-black" style={{ color: "var(--color-text-primary)" }}>
                      KSh {unit.rent.toLocaleString()}
                    </p>
                    <span
                      className="text-[10px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                      style={{ color: "var(--color-green-deep)" }}
                    >
                      View →
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
