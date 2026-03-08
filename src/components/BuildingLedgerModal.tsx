"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Badge from "./Badge";
import Button from "./Button";
import {
  Users,
  CreditCard,
  Activity,
  Download,
  Calendar,
  Search,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { mockTenants, mockPayments, Building } from "@/data/mockData";
import { getAvatarUrl } from "@/utils/avatarUtils";

interface BuildingLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: Building | null;
}

export default function BuildingLedgerModal({
  isOpen,
  onClose,
  building,
}: BuildingLedgerModalProps) {
  const [activeTab, setActiveTab] = useState<"tenants" | "payments">("tenants");
  const [searchTerm, setSearchTerm] = useState("");

  if (!building) return null;

  const buildingTenants = mockTenants.filter((t) => {
    if (building.id === "bld-001")
      return ["unit-001","unit-002","unit-003","unit-004","unit-005"].some((u) => t.unitId.includes(u));
    if (building.id === "bld-002")
      return ["unit-006","unit-007","unit-008"].some((u) => t.unitId.includes(u));
    if (building.id === "bld-003")
      return ["unit-009","unit-010"].some((u) => t.unitId.includes(u));
    return false;
  });

  const buildingPayments = mockPayments.filter((p) => {
    if (building.id === "bld-001")
      return ["unit-001","unit-002","unit-003","unit-004","unit-005"].some((u) => p.unitId.includes(u));
    if (building.id === "bld-002")
      return ["unit-006","unit-007","unit-008"].some((u) => p.unitId.includes(u));
    if (building.id === "bld-003")
      return ["unit-009","unit-010"].some((u) => p.unitId.includes(u));
    return false;
  });

  const totalArrears = buildingTenants.reduce((sum, t) => sum + t.arrears, 0);
  const totalCollected = buildingPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredTenants = buildingTenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.unitId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = buildingPayments.filter(
    (p) =>
      p.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.unitId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asset Digital Ledger"
      size="full"
      className="p-0 overflow-hidden"
    >
      {/* ── Dark Header ── */}
      <div
        className="p-10 relative overflow-hidden shrink-0"
        style={{
          background: "linear-gradient(135deg, #1A1A1A 0%, #1B5E45 100%)",
          borderBottom: "1px solid var(--color-border-dark)",
        }}
      >
        {/* Ambient mint glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: "rgba(61,190,122,0.15)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[80px]"
          style={{ background: "rgba(27,94,69,0.3)" }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            {/* Label chip */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
              style={{
                background: "rgba(61,190,122,0.15)",
                border: "1px solid rgba(61,190,122,0.3)",
                color: "#3DBE7A",
              }}
            >
              <Activity className="w-3 h-3" />
              Asset Digital Ledger
            </div>
            {/* Building name */}
            <h2 className="text-5xl font-black tracking-tighter leading-none text-white">
              {building.name}{" "}
              <span className="text-3xl ml-2 font-medium" style={{ color: "rgba(250,250,248,0.35)" }}>
                / 0x{building.id.split("-").pop()}
              </span>
            </h2>
            {/* Meta */}
            <div className="flex items-center gap-4" style={{ color: "rgba(250,250,248,0.5)" }}>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                {buildingTenants.length} Active Occupants
              </div>
              <div className="w-1 h-1 rounded-full" style={{ background: "rgba(250,250,248,0.2)" }} />
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <CreditCard className="w-3.5 h-3.5" />
                {buildingPayments.length} Cumulative Transactions
              </div>
            </div>
          </div>

          {/* KPI pills */}
          <div className="flex gap-4">
            <div
              className="px-6 py-4 rounded-2xl text-center min-w-[140px]"
              style={{
                background: "rgba(61,190,122,0.1)",
                border: "1px solid rgba(61,190,122,0.25)",
              }}
            >
              <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: "#3DBE7A" }}>
                Building Yield
              </p>
              <p className="text-xl font-black text-white tracking-tighter">
                KSh {totalCollected.toLocaleString()}
              </p>
            </div>
            <div
              className="px-6 py-4 rounded-2xl text-center min-w-[140px]"
              style={{
                background: "rgba(250,10,18,0.1)",
                border: "1px solid rgba(250,10,18,0.2)",
              }}
            >
              <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-red-400">
                Exposure
              </p>
              <p className="text-xl font-black text-white tracking-tighter">
                KSh {totalArrears.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Bar & Search ── */}
      <div
        className="px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0"
        style={{
          background: "var(--color-card)",
          borderBottom: "1px solid var(--color-border-light)",
        }}
      >
        {/* Tabs */}
        <div
          className="flex p-1.5 rounded-2xl"
          style={{ background: "var(--color-background-alt)" }}
        >
          {(["tenants", "payments"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              style={
                activeTab === tab
                  ? {
                      background: "var(--color-card)",
                      color: "var(--color-green-deep)",
                      boxShadow: "var(--shadow-card)",
                    }
                  : { color: "var(--color-text-muted)" }
              }
            >
              {tab === "tenants" ? "Tenant Registry" : "Capital Flow"}
            </button>
          ))}
        </div>

        {/* Search + export */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder={`Filter ${activeTab}…`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-6 py-3 rounded-full w-full md:w-64 text-[11px] font-bold transition-all"
              style={{
                background: "var(--color-background-alt)",
                border: "1px solid var(--color-border-light)",
                color: "var(--color-text-primary)",
                outline: "none",
              }}
            />
          </div>
          <Button variant="outline" className="h-11 px-5">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div
        className="flex-1 overflow-auto p-10"
        style={{ background: "var(--color-background-alt)" }}
      >
        {activeTab === "tenants" ? (
          <div className="space-y-4">
            {filteredTenants.length > 0 ? (
              <div
                className="rounded-[2rem] overflow-hidden"
                style={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border-light)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <table className="w-full text-left border-collapse">
                  <thead style={{ background: "var(--color-dark)" }}>
                    <tr>
                      {["Occupant", "Assignment", "Financial Health", "Horizon"].map(
                        (col, i) => (
                          <th
                            key={col}
                            className={`px-8 py-5 text-[9px] font-black uppercase tracking-widest ${i === 3 ? "text-right" : ""}`}
                            style={{ color: "var(--color-text-on-dark)" }}
                          >
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTenants.map((tenant, idx) => (
                      <tr
                        key={tenant.id}
                        className="group transition-all duration-200"
                        style={{
                          background:
                            idx % 2 === 0
                              ? "var(--color-card)"
                              : "var(--color-surface-secondary)",
                          borderBottom: "1px solid var(--color-border-light)",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLTableRowElement).style.background =
                            "rgba(61,190,122,0.06)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLTableRowElement).style.background =
                            idx % 2 === 0
                              ? "var(--color-card)"
                              : "var(--color-surface-secondary)")
                        }
                      >
                        {/* Occupant */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-11 h-11 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform"
                              style={{ border: "1px solid var(--color-border-mid)" }}
                            >
                              <img src={getAvatarUrl(tenant.name)} alt={tenant.name} />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                                {tenant.name}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                                ID: {tenant.id.split("-").pop()}
                              </span>
                            </div>
                          </div>
                        </td>
                        {/* Unit badge */}
                        <td className="px-8 py-6">
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                            style={{
                              background: "var(--color-surface-tint)",
                              border: "1px solid var(--color-border-mid)",
                              color: "var(--color-green-deep)",
                            }}
                          >
                            UNIT {tenant.unitId.split("-").pop()}
                          </div>
                        </td>
                        {/* Financial health */}
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>
                              KSh {tenant.rent.toLocaleString()}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className="text-[10px] font-bold uppercase tracking-widest"
                                style={{ color: tenant.arrears > 0 ? "#FA0A12" : "var(--color-green-bright)" }}
                              >
                                Balance: KSh {tenant.arrears.toLocaleString()}
                              </span>
                              {tenant.arrears > 0 && (
                                <AlertTriangle className="w-2.5 h-2.5 animate-pulse" style={{ color: "#FA0A12" }} />
                              )}
                              {tenant.arrears === 0 && (
                                <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "var(--color-green-bright)" }} />
                              )}
                            </div>
                          </div>
                        </td>
                        {/* Move-in */}
                        <td className="px-8 py-6 text-right">
                          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                            In: {tenant.moveInDate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div
                  className="w-20 h-20 rounded-[2.5rem] flex items-center justify-center"
                  style={{ background: "var(--color-surface-tint)", color: "var(--color-green-bright)" }}
                >
                  <Users className="w-10 h-10" />
                </div>
                <p className="text-lg font-black tracking-tighter" style={{ color: "var(--color-text-primary)" }}>
                  No occupants found
                </p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Try a different search parameter
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPayments.length > 0 ? (
              <div
                className="rounded-[2rem] overflow-hidden"
                style={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border-light)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <table className="w-full text-left border-collapse">
                  <thead style={{ background: "var(--color-dark)" }}>
                    <tr>
                      {["Stakeholder", "Cycle", "Capital", "Protocol", "Timestamp"].map(
                        (col, i) => (
                          <th
                            key={col}
                            className={`px-8 py-5 text-[9px] font-black uppercase tracking-widest ${i === 4 ? "text-right" : ""}`}
                            style={{ color: "var(--color-text-on-dark)" }}
                          >
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment, idx) => (
                      <tr
                        key={payment.id}
                        className="group transition-all duration-200"
                        style={{
                          background:
                            idx % 2 === 0
                              ? "var(--color-card)"
                              : "var(--color-surface-secondary)",
                          borderBottom: "1px solid var(--color-border-light)",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLTableRowElement).style.background =
                            "rgba(61,190,122,0.06)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLTableRowElement).style.background =
                            idx % 2 === 0
                              ? "var(--color-card)"
                              : "var(--color-surface-secondary)")
                        }
                      >
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                              {payment.tenantName}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                              Unit {payment.unitId.split("-").pop()}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                            style={{
                              border: "1px solid var(--color-border-light)",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {payment.month}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-black" style={{ color: "var(--color-text-primary)" }}>
                          KSh {payment.amount.toLocaleString()}
                        </td>
                        <td className="px-8 py-6">
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest"
                            style={
                              payment.status === "completed"
                                ? { background: "var(--color-surface-tint)", color: "var(--color-green-deep)", border: "1px solid var(--color-border-mid)" }
                                : payment.status === "pending"
                                ? { background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }
                                : { background: "#FEE2E2", color: "#B91C1C", border: "1px solid #FECACA" }
                            }
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full bg-current ${payment.status === "pending" ? "animate-pulse" : ""}`}
                            />
                            {payment.status}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-[10px] font-bold" style={{ color: "var(--color-text-muted)" }}>
                            {payment.date}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div
                  className="w-20 h-20 rounded-[2.5rem] flex items-center justify-center"
                  style={{ background: "var(--color-surface-tint)", color: "var(--color-green-bright)" }}
                >
                  <CreditCard className="w-10 h-10" />
                </div>
                <p className="text-lg font-black tracking-tighter" style={{ color: "var(--color-text-primary)" }}>
                  No transactions recorded
                </p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Financial activity will appear here
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Action Footer ── */}
      <div
        className="p-8 flex items-center justify-between shrink-0"
        style={{
          background: "var(--color-card)",
          borderTop: "1px solid var(--color-border-light)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full overflow-hidden"
                style={{ border: "3px solid var(--color-card)", boxShadow: "var(--shadow-soft)" }}
              >
                <img src={getAvatarUrl(`System Admin ${i}`)} alt="Admin" />
              </div>
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
            System synchronized{" "}
            <span style={{ color: "var(--color-green-deep)" }}>Real-time</span>
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="h-12 px-8 text-[10px] font-black uppercase tracking-widest" onClick={onClose}>
            Close View
          </Button>
          <Button variant="premium" className="h-12 px-8 text-[10px] font-black uppercase tracking-widest">
            Sync Ledger
          </Button>
        </div>
      </div>
    </Modal>
  );
}
