"use client";

import React from "react";
import TenantLayout from "@/components/TenantLayout";
import DashboardCard from "@/components/DashboardCard";
import Button from "@/components/Button";
import Link from "next/link";
import Badge from "@/components/Badge";
import {
  DollarSign,
  Calendar,
  AlertCircle,
  FileText,
  Plus,
  ArrowRight,
  TrendingUp,
  CreditCard,
  History,
  ShieldCheck,
  Activity,
  Zap,
  Home,
  Wrench,
  FileCheck,
  Bell,
  Phone,
  BookOpen,
  Settings,
  Download,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Wifi,
  Car,
  Dumbbell,
} from "lucide-react";
import { mockTenants, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

export default function TenantDashboard() {
  const { userName, displayImage } = useAuth();
  const currentTenant = mockTenants[0];
  const activeName = userName || currentTenant.name;
  const tenantPayments = mockPayments.filter((p) => p.tenantId === currentTenant.id);
  const tenantComplaints = mockComplaints.filter((c) => c.tenantId === currentTenant.id);

  const nextPaymentDate = new Date();
  nextPaymentDate.setDate(1);
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

  const settlementPct = Math.round((currentTenant.paidAmount / currentTenant.rent) * 100);

  return (
    <TenantLayout>
      <div className="p-6 md:p-8 space-y-8">

        {/* ── Welcome Hero ── */}
        <div
          className="relative rounded-2xl md:rounded-[3rem] p-4 md:p-14 overflow-hidden shadow-lg md:shadow-2xl group"
          style={{ background: "var(--color-card)", border: "1px solid var(--color-border-light)" }}
        >
          {/* Subtle accent gradient */}
          <div
            className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 rounded-full blur-[60px] md:blur-[120px] -mr-24 md:-mr-48 -mt-24 md:-mt-48 opacity-5"
            style={{ background: "var(--gradient-green)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-10">
            <div className="space-y-3 md:space-y-6 max-w-2xl">
              {/* Status indicator */}
              <div className="flex items-center gap-2 md:gap-4">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse"
                  style={{ background: "var(--color-green-bright)" }}
                />
                <span className="text-xs md:text-sm font-medium uppercase tracking-wider md:tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Active Residential Portal
                </span>
              </div>

              {/* Welcome heading */}
              <div className="space-y-1 md:space-y-2">
                <h2 className="text-2xl md:text-6xl font-medium md:font-black tracking-tight leading-none" style={{ color: "var(--color-text-primary)" }}>
                  Welcome back,{" "}
                  <span style={{ background: "linear-gradient(to right, var(--color-green-deep), var(--color-green-bright))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {activeName.split(" ")[0]}
                  </span>
                  !
                </h2>
                <div className="flex items-center gap-2 md:gap-4 font-medium" style={{ color: "var(--color-text-muted)" }}>
                  <div
                    className="px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl border text-xs md:text-sm"
                    style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)", color: "var(--color-text-primary)" }}
                  >
                    Unit {currentTenant.unitId}
                  </div>
                  <span className="text-sm md:text-xl">•</span>
                  <p className="text-sm md:text-lg">Residential Management System</p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-4 md:gap-8 pt-2 md:pt-4">
                <div className="text-center">
                  <p className="text-lg md:text-2xl font-medium" style={{ color: "var(--color-text-primary)" }}>
                    KSh {currentTenant.rent.toLocaleString()}
                  </p>
                  <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider md:tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    Monthly Rent
                  </p>
                </div>
                <div className="w-px h-8 md:h-12" style={{ background: "var(--color-border-light)" }} />
                <div className="text-center">
                  <p className="text-lg md:text-2xl font-medium" style={{ color: currentTenant.arrears > 0 ? "#FA0A12" : "var(--color-green-deep)" }}>
                    KSh {currentTenant.arrears.toLocaleString()}
                  </p>
                  <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider md:tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    Outstanding
                  </p>
                </div>
              </div>
            </div>

            {/* Profile CTA */}
            <div className="flex flex-col items-end gap-3 md:gap-6 shrink-0 w-full md:w-auto">
              <Link href="/tenant/profile" className="w-full md:w-auto">
                <button
                  className="flex items-center gap-2 md:gap-4 px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-medium text-xs md:text-sm transition-all hover:shadow-lg md:hover:shadow-xl active:scale-95 group/btn w-full md:w-auto justify-center md:justify-start"
                  style={{ background: "var(--gradient-green)", boxShadow: "var(--shadow-green)", color: "white" }}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-white/20">
                    <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <span className="hidden sm:inline">Manage Profile</span>
                  <span className="sm:hidden">Profile</span>
                  <ArrowRight className="w-3 h-3 md:w-5 md:h-5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </Link>

              {/* Trust badge */}
              <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 md:py-2 rounded-full border" style={{ background: "var(--color-surface-tint)", borderColor: "var(--color-border-mid)" }}>
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" style={{ color: "var(--color-green-bright)" }} />
                <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider md:tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Verified Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Key Stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Monthly Rent"     value={`KSh ${currentTenant.rent.toLocaleString()}`}    icon={DollarSign} color="blue" />
          <DashboardCard title="Balance Due"      value={`KSh ${currentTenant.arrears.toLocaleString()}`} icon={AlertCircle} color={currentTenant.arrears > 0 ? "red" : "green"} />
          <DashboardCard title="Next Due Date"    value={nextPaymentDate.toLocaleDateString()}             icon={Calendar}   color="blue" />
          <DashboardCard title="Active Complaints" value={tenantComplaints.filter((c) => c.status !== "resolved").length} icon={FileText} color="yellow" />
        </div>

        {/* ── Financial Health ── */}
        <div
          className="rounded-xl md:rounded-[2.5rem] p-4 md:p-10 relative overflow-hidden"
          style={{
            background: "var(--color-card)",
            border: "1px solid var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Decorative mint blob */}
          <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 rounded-full blur-2xl md:blur-3xl -mr-16 md:-mr-32 -mt-16 md:-mt-32 opacity-20" style={{ background: "var(--color-green-soft)" }} />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8 mb-6 md:mb-12">
            <div className="space-y-1">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div
                  className="w-8 md:w-10 h-8 md:h-10 rounded-lg text-white flex items-center justify-center"
                  style={{ background: "var(--gradient-green)", boxShadow: "var(--shadow-green)" }}
                >
                  <ShieldCheck className="w-4 md:w-6 h-4 md:h-6" />
                </div>
                <h3 className="text-lg md:text-2xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                  Financial Health
                </h3>
              </div>
              <p className="text-xs md:text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                Monthly reconciliation &amp; settlement status
              </p>
            </div>

            <Link href="/tenant/payments" className="w-full md:w-auto">
              <button
                className="w-full md:w-auto px-4 md:px-8 py-3 md:py-4 text-white rounded-xl md:rounded-2xl font-medium text-xs md:text-sm transition-all active:scale-95 flex items-center gap-2 md:gap-3 justify-center md:justify-start"
                style={{ background: "var(--gradient-green)", boxShadow: "var(--shadow-green)" }}
              >
                <Plus className="w-4 md:w-5 h-4 md:h-5" />
                <span className="hidden sm:inline">Initialize Payment</span>
                <span className="sm:hidden">Add Payment</span>
              </button>
            </Link>
          </div>

          {/* Stat trio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12">
            {/* Gross */}
            <div
              className="relative p-4 md:p-8 rounded-xl md:rounded-[2rem] group/stat"
              style={{ background: "var(--color-background-alt)", border: "1px solid var(--color-border-light)" }}
            >
              <p className="text-[8px] md:text-[10px] font-medium uppercase tracking-wider md:tracking-[0.2em] mb-2 md:mb-3" style={{ color: "var(--color-text-muted)" }}>Gross Obligations</p>
              <p className="text-xl md:text-3xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                KSh {currentTenant.rent.toLocaleString()}
              </p>
              <div className="absolute right-4 md:right-6 top-4 md:top-6 w-8 md:w-10 h-8 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center border transition-all" style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-muted)" }}>
                <DollarSign className="w-4 md:w-5 h-4 md:h-5" />
              </div>
            </div>

            {/* Settled */}
            <div
              className="relative p-4 md:p-8 rounded-xl md:rounded-[2rem] group/stat"
              style={{ background: "var(--color-surface-tint)", border: "1px solid var(--color-border-mid)" }}
            >
              <p className="text-[8px] md:text-[10px] font-medium uppercase tracking-wider md:tracking-[0.2em] mb-2 md:mb-3" style={{ color: "var(--color-text-muted)" }}>Settled Credits</p>
              <p className="text-xl md:text-3xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-green-deep)" }}>
                KSh {currentTenant.paidAmount.toLocaleString()}
              </p>
              <div className="absolute right-4 md:right-6 top-4 md:top-6 w-8 md:w-10 h-8 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center border transition-all" style={{ borderColor: "var(--color-border-mid)", color: "var(--color-green-bright)" }}>
                <Zap className="w-4 md:w-5 h-4 md:h-5" />
              </div>
            </div>

            {/* Arrears */}
            <div
              className="relative p-4 md:p-8 rounded-xl md:rounded-[2rem] group/stat"
              style={{ background: "#FFF5F5", border: "1px solid #FECACA" }}
            >
              <p className="text-[8px] md:text-[10px] font-medium uppercase tracking-wider md:tracking-[0.2em] mb-2 md:mb-3" style={{ color: "var(--color-text-muted)" }}>Arrears Pending</p>
              <p className="text-xl md:text-3xl font-medium md:font-black tracking-tight text-red-600">
                KSh {currentTenant.arrears.toLocaleString()}
              </p>
              <div className="absolute right-4 md:right-6 top-4 md:top-6 w-8 md:w-10 h-8 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center border transition-all" style={{ borderColor: "#FECACA", color: "#FA0A12" }}>
                <CreditCard className="w-4 md:w-5 h-4 md:h-5" />
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between px-0 md:px-2 gap-3">
              <div className="flex items-center gap-1 md:gap-2">
                <TrendingUp className="w-3 md:w-4 h-3 md:h-4" style={{ color: "var(--color-green-bright)" }} />
                <span className="text-xs md:text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                  Total Settlement Progress
                </span>
              </div>
              <span
                className="text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full whitespace-nowrap"
                style={{ color: "var(--color-green-deep)", background: "var(--color-surface-tint)" }}
              >
                {settlementPct}% Fulfilled
              </span>
            </div>
            <div
              className="relative w-full h-3 md:h-4 rounded-full overflow-hidden"
              style={{ background: "var(--color-border-light)" }}
            >
              <div
                className="absolute inset-y-0 left-0 animate-shimmer"
                style={{
                  width: `${settlementPct}%`,
                  background: "var(--gradient-mint-glow)",
                  borderRadius: "999px",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div
          className="rounded-xl md:rounded-[2.5rem] p-4 md:p-8"
          style={{
            background: "var(--color-card)",
            border: "1px solid var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 md:w-10 h-8 md:h-10 rounded-lg text-white flex items-center justify-center"
              style={{ background: "var(--gradient-green)", boxShadow: "var(--shadow-green)" }}
            >
              <Zap className="w-4 md:w-5 h-4 md:h-5" />
            </div>
            <h3 className="text-lg md:text-xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Quick Actions
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Link href="/tenant/payments">
              <button className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border transition-all hover:shadow-md active:scale-95 group"
                style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--color-green-soft)", color: "var(--color-green-deep)" }}>
                    <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-center" style={{ color: "var(--color-text-primary)" }}>Pay Rent</span>
                </div>
              </button>
            </Link>

            <Link href="/tenant/complaint/new">
              <button className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border transition-all hover:shadow-md active:scale-95 group"
                style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ background: "#FFF5F5", color: "#FA0A12" }}>
                    <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-center" style={{ color: "var(--color-text-primary)" }}>Report Issue</span>
                </div>
              </button>
            </Link>

            <Link href="/tenant/documents">
              <button className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border transition-all hover:shadow-md active:scale-95 group"
                style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--color-surface-tint)", color: "var(--color-text-muted)" }}>
                    <FileCheck className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-center" style={{ color: "var(--color-text-primary)" }}>Documents</span>
                </div>
              </button>
            </Link>

            <Link href="/tenant/profile">
              <button className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border transition-all hover:shadow-md active:scale-95 group"
                style={{ background: "var(--color-background-alt)", borderColor: "var(--color-border-light)" }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--color-surface-tint)", color: "var(--color-text-muted)" }}>
                    <Settings className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-center" style={{ color: "var(--color-text-primary)" }}>Settings</span>
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* ── Property Information ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div
            className="rounded-xl md:rounded-[2.5rem] p-4 md:p-8"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 md:w-10 h-8 md:h-10 rounded-lg text-white flex items-center justify-center"
                style={{ background: "var(--color-dark)" }}
              >
                <Home className="w-4 md:w-5 h-4 md:h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                Property Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="relative h-32 md:h-40 rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white text-sm font-medium">Unit {currentTenant.unitId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Property Type</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>2BR Apartment</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Floor</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>5th Floor</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Sq. Footage</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>1,200 sq ft</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Lease Term</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>12 Months</p>
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: "var(--color-border-light)" }}>
                <h4 className="text-sm font-medium mb-3" style={{ color: "var(--color-text-primary)" }}>Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: <Wifi className="w-3 h-3" />, label: "WiFi" },
                    { icon: <Car className="w-3 h-3" />, label: "Parking" },
                    { icon: <Dumbbell className="w-3 h-3" />, label: "Gym" },
                    { icon: <Users className="w-3 h-3" />, label: "Pool" },
                  ].map((amenity, i) => (
                    <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: "var(--color-surface-tint)", color: "var(--color-text-muted)" }}>
                      {amenity.icon}
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl md:rounded-[2.5rem] p-4 md:p-8"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 md:w-10 h-8 md:h-10 rounded-lg text-white flex items-center justify-center"
                style={{ background: "#FA0A12" }}
              >
                <Wrench className="w-4 md:w-5 h-4 md:h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                Maintenance Status
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--color-background-alt)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FFF5F5", color: "#FA0A12" }}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Kitchen Faucet Repair</p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Requested 2 days ago</p>
                  </div>
                </div>
                <Badge text="In Progress" type="warning" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--color-surface-tint)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-green-soft)", color: "var(--color-green-deep)" }}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>AC Filter Replacement</p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Completed yesterday</p>
                  </div>
                </div>
                <Badge text="Completed" type="success" />
              </div>

              <Link href="/tenant/complaint/new">
                <button className="w-full mt-4 px-4 py-3 rounded-lg font-medium text-sm transition-all active:scale-95" style={{ background: "var(--gradient-green)", color: "white" }}>
                  Request Maintenance
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Important Documents & Announcements ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          <div
            className="rounded-xl md:rounded-[2.5rem] p-4 md:p-8"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 md:w-10 h-8 md:h-10 rounded-lg text-white flex items-center justify-center"
                style={{ background: "var(--color-dark)" }}
              >
                <FileCheck className="w-4 md:w-5 h-4 md:h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                Documents
              </h3>
            </div>

            <div className="space-y-3">
              {[
                { name: "Lease Agreement", date: "Jan 2024", type: "PDF" },
                { name: "House Rules", date: "Dec 2023", type: "PDF" },
                { name: "Payment Receipt", date: "Feb 2024", type: "PDF" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg transition-all hover:shadow-sm" style={{ background: "var(--color-background-alt)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-surface-tint)", color: "var(--color-text-muted)" }}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{doc.name}</p>
                      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{doc.date}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg transition-all hover:bg-white" style={{ color: "var(--color-green-deep)" }}>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl md:rounded-[2.5rem] p-4 md:p-8"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 md:w-10 h-8 md:h-10 rounded-lg text-white flex items-center justify-center"
                style={{ background: "#FA0A12" }}
              >
                <Bell className="w-4 md:w-5 h-4 md:h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                Announcements
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border-l-4" style={{ background: "var(--color-background-alt)", borderLeftColor: "var(--color-green-deep)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ background: "var(--color-green-deep)" }} />
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>Scheduled Maintenance</p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Elevator maintenance on March 15th, 2-4 PM</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border-l-4" style={{ background: "var(--color-background-alt)", borderLeftColor: "#FA0A12" }}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ background: "#FA0A12" }} />
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>Community Event</p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Neighborhood cleanup this Saturday at 9 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl md:rounded-[2.5rem] p-4 md:p-8"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 md:w-10 h-8 md:h-10 rounded-lg text-white flex items-center justify-center"
                style={{ background: "var(--color-dark)" }}
              >
                <Phone className="w-4 md:w-5 h-4 md:h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                Emergency Contacts
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--color-background-alt)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Property Manager</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>+254 700 123 456</p>
                </div>
                <button className="p-2 rounded-lg transition-all hover:bg-white" style={{ color: "var(--color-green-deep)" }}>
                  <Phone className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--color-background-alt)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Maintenance</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>+254 700 654 321</p>
                </div>
                <button className="p-2 rounded-lg transition-all hover:bg-white" style={{ color: "var(--color-green-deep)" }}>
                  <Phone className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--color-background-alt)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Security</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>+254 700 987 654</p>
                </div>
                <button className="p-2 rounded-lg transition-all hover:bg-white" style={{ color: "var(--color-green-deep)" }}>
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Property Guidelines ── */}
        <div
          className="rounded-xl md:rounded-[2.5rem] p-4 md:p-8"
          style={{
            background: "var(--color-card)",
            border: "1px solid var(--color-border-light)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 md:w-10 h-8 md:h-10 rounded-lg text-white flex items-center justify-center"
              style={{ background: "var(--gradient-green)", boxShadow: "var(--shadow-green)" }}
            >
              <BookOpen className="w-4 md:w-5 h-4 md:h-5" />
            </div>
            <h3 className="text-lg md:text-xl font-medium md:font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Property Guidelines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg" style={{ background: "var(--color-background-alt)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-green-soft)", color: "var(--color-green-deep)" }}>
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Quiet Hours</h4>
              </div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>10 PM - 8 AM daily</p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: "var(--color-background-alt)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-green-soft)", color: "var(--color-green-deep)" }}>
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Guests</h4>
              </div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Max 2 overnight guests</p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: "var(--color-background-alt)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-green-soft)", color: "var(--color-green-deep)" }}>
                  <Car className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Parking</h4>
              </div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>1 assigned space per unit</p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: "var(--color-background-alt)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-green-soft)", color: "var(--color-green-deep)" }}>
                  <Wrench className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Maintenance</h4>
              </div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>24/7 emergency response</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--color-border-light)" }}>
            <Link href="/tenant/guidelines">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-md" style={{ background: "var(--color-surface-tint)", color: "var(--color-text-primary)" }}>
                <Eye className="w-4 h-4" />
                View Full Guidelines
              </button>
            </Link>
          </div>
        </div>

        {/* ── Activity Streams & History ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* Ledger History - Mobile Optimized */}
          <div
            className="rounded-lg md:rounded-[2.5rem] p-4 md:p-8 lg:p-10"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-2 md:gap-3">
                <div
                  className="w-8 md:w-10 h-8 md:h-10 rounded-lg md:rounded-xl text-white flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--color-dark)" }}
                >
                  <History className="w-4 md:w-5 h-4 md:h-5" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-semibold md:font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                  Ledger History
                </h3>
              </div>
              <Link
                href="/tenant/payments"
                className="text-[9px] md:text-[10px] font-medium uppercase tracking-wider md:tracking-widest flex items-center gap-1 md:gap-2 transition-transform hover:translate-x-1 whitespace-nowrap"
                style={{ color: "var(--color-green-deep)" }}
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Payment Items */}
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              {tenantPayments.slice(0, 4).map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 md:p-4 lg:p-5 rounded-lg md:rounded-2xl lg:rounded-3xl transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: "var(--color-background-alt)",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "var(--color-card)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-light)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "var(--color-background-alt)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
                  }}
                >
                  {/* Left side - Icon & Details */}
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--color-card)", border: "1px solid var(--color-border-light)", color: "var(--color-text-muted)" }}
                    >
                      <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm md:text-base font-medium tracking-tight truncate" style={{ color: "var(--color-text-primary)" }}>
                        {payment.month}
                      </p>
                      <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider mt-0.5 md:mt-1" style={{ color: "var(--color-text-muted)" }}>
                        {payment.date}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Amount & Badge */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-1 md:gap-2">
                    <p className="font-medium tabular-nums text-sm md:text-base lg:text-lg leading-none" style={{ color: "var(--color-text-primary)" }}>
                      KSh {payment.amount.toLocaleString()}
                    </p>
                    <div className="scale-95 md:scale-100 origin-right">
                      <Badge
                        text={payment.status === "completed" ? "Verified" : "Syncing"}
                        type={payment.status === "completed" ? "success" : "warning"}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Requests */}
          <div
            className="rounded-[2.5rem] p-8 md:p-10"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center" style={{ background: "#FA0A12" }}>
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                  Support Requests
                </h3>
              </div>
              <Link
                href="/tenant/complaints"
                className="text-[10px] font-medium uppercase tracking-widest flex items-center gap-2 transition-transform hover:translate-x-1"
                style={{ color: "var(--color-green-deep)" }}
              >
                Tickets <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {tenantComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-6 border-l-4 rounded-r-3xl transition-all duration-300"
                  style={{ background: "var(--color-background-alt)", borderLeftColor: "var(--color-border-mid)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = "var(--color-green-deep)";
                    (e.currentTarget as HTMLDivElement).style.background = "var(--color-card)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = "var(--color-border-mid)";
                    (e.currentTarget as HTMLDivElement).style.background = "var(--color-background-alt)";
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-[9px] font-medium uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                        {complaint.category}
                      </span>
                      <p className="font-medium tracking-tight leading-snug" style={{ color: "var(--color-text-primary)" }}>
                        {complaint.title}
                      </p>
                    </div>
                    <Badge
                      text={complaint.status === "resolved" ? "Resolved" : complaint.status === "in-progress" ? "Active" : "New"}
                      type={complaint.status === "resolved" ? "success" : complaint.status === "in-progress" ? "warning" : "error"}
                    />
                  </div>
                </div>
              ))}
              {tenantComplaints.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: "var(--color-surface-tint)", color: "var(--color-green-bright)" }}
                  >
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    No Active Incidents
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
