"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  Users,
  CreditCard,
  AlertCircle,
  BarChart3,
  User,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import BottomNav from "./BottomNav";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const links: SidebarLink[] = [
  { label: "Dashboard",  href: "/landlord",            icon: <Home className="w-5 h-5" /> },
  { label: "Buildings",  href: "/landlord/buildings",  icon: <Building2 className="w-5 h-5" /> },
  { label: "Units",      href: "/landlord/units",      icon: <Building2 className="w-5 h-5" /> },
  { label: "Tenants",    href: "/landlord/tenants",    icon: <Users className="w-5 h-5" /> },
  { label: "Payments",   href: "/landlord/payments",   icon: <CreditCard className="w-5 h-5" /> },
  { label: "Complaints", href: "/landlord/complaints", icon: <AlertCircle className="w-5 h-5" /> },
  { label: "Reports",    href: "/landlord/reports",    icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Profile",    href: "/landlord/profile",    icon: <User className="w-5 h-5" /> },
];

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout, displayImage, userName } = useAuth();
  const pathname = usePathname();

  return (
    <div className="flex h-screen" style={{ background: "var(--color-background)" }}>

      {/* ── Sidebar ── */}
      <div
        className={`fixed md:relative w-64 z-40 flex flex-col transition-all duration-300 transform h-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${sidebarCollapsed ? "md:w-20" : "md:w-64"}`}
        style={{
          background: "var(--color-dark)",
          borderRight: "1px solid var(--color-border-dark)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
        }}
      >
        {/* Logo */}
        <div
          className={`flex items-center transition-all duration-300 ${sidebarCollapsed ? "flex-col p-4 gap-4" : "p-6 justify-between"}`}
          style={{ borderBottom: "1px solid var(--color-border-dark)" }}
        >
          <Logo size="sm" isDark variant={sidebarCollapsed ? "icon" : "full"} />
          
          <div className="flex items-center gap-1">
            <button
              className="hidden md:flex p-1.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "var(--color-text-muted)" }}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
            <button
              className="md:hidden transition-colors"
              style={{ color: "var(--color-text-muted)" }}
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${sidebarCollapsed ? "md:justify-center md:px-3" : ""}`}
                style={{
                  background: isActive ? "rgba(61, 190, 122, 0.12)" : "transparent",
                  color: isActive ? "#3DBE7A" : "white",
                  borderLeft: isActive ? "2px solid #3DBE7A" : "2px solid transparent",
                }}
                title={sidebarCollapsed ? link.label : ""}
              >
                <span
                  className="transition-colors flex-shrink-0"
                  style={{ color: isActive ? "#3DBE7A" : "rgba(250, 250, 248, 0.5)" }}
                >
                  {link.icon}
                </span>
                {!sidebarCollapsed && (
                  <span className="font-medium text-sm truncate">{link.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          className="p-4"
          style={{ borderTop: "1px solid var(--color-border-dark)" }}
        >
          <button
            onClick={() => { logout(); setSidebarOpen(false); }}
            suppressHydrationWarning
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-900/20 font-medium text-sm ${sidebarCollapsed ? "md:justify-center md:px-3" : ""}`}
            title={sidebarCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="hidden md:inline">Logout</span>}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <div
          className="p-4 flex items-center justify-between"
          style={{
            background: "var(--color-card)",
            borderBottom: "1px solid var(--color-border-light)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <button className="md:hidden p-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" style={{ color: "var(--color-text-primary)" }} />
          </button>
          <div className="flex flex-col">
            <h1
              className="text-xl font-bold leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              Landlord Dashboard
            </h1>
            <p
              className="text-[10px] uppercase font-bold tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              {userName || "Property Manager"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/landlord/profile" className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center"
                style={{ border: "2px solid var(--color-border-mid)", background: "var(--color-surface-secondary)" }}
              >
                <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </Link>
          </div>
        </div>

        {/* Scrollable page body */}
        <div
          className="flex-1 overflow-auto pb-24 md:pb-0"
          style={{ background: "var(--color-background)" }}
        >
          {children}
        </div>

        <BottomNav
          items={[
            { label: "Home",     href: "/landlord",           icon: <Home className="w-6 h-6" /> },
            { label: "Buildings",href: "/landlord/buildings", icon: <Building2 className="w-6 h-6" /> },
            { label: "Tenants",  href: "/landlord/tenants",   icon: <Users className="w-6 h-6" /> },
            { label: "Payments", href: "/landlord/payments",  icon: <CreditCard className="w-6 h-6" /> },
            { label: "Profile",  href: "/landlord/profile",   icon: <User className="w-6 h-6" /> },
          ]}
        />
      </div>
    </div>
  );
}
