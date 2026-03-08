"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  AlertCircle,
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
  { label: "Dashboard",  href: "/tenant",             icon: <Home className="w-5 h-5" /> },
  { label: "Rent Status",href: "/tenant/rent-status", icon: <CreditCard className="w-5 h-5" /> },
  { label: "Payments",   href: "/tenant/payments",    icon: <CreditCard className="w-5 h-5" /> },
  { label: "Complaints", href: "/tenant/complaints",  icon: <AlertCircle className="w-5 h-5" /> },
  { label: "Profile",    href: "/tenant/profile",     icon: <User className="w-5 h-5" /> },
];

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout, displayImage, userName } = useAuth();
  const pathname = usePathname();

  return (
    <div className="flex h-screen" style={{ background: "var(--color-background)" }}>

      {/* ── Sidebar ── */}
      <div
        className={`fixed md:relative transition-all duration-300 z-40 flex flex-col h-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${sidebarCollapsed ? "w-20" : "w-64"}`}
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
              className="hidden md:flex items-center justify-center p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "var(--color-text-muted)" }}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${sidebarCollapsed ? "justify-center" : ""}`}
                style={{
                  background: isActive ? "rgba(61, 190, 122, 0.12)" : "transparent",
                  color: isActive ? "#3DBE7A" : "rgba(250, 250, 248, 0.7)",
                  borderLeft: isActive ? "2px solid #3DBE7A" : "2px solid transparent",
                }}
                title={sidebarCollapsed ? link.label : undefined}
              >
                <span style={{ color: isActive ? "#3DBE7A" : "rgba(250, 250, 248, 0.5)" }}>
                  {link.icon}
                </span>
                {!sidebarCollapsed && <span className="font-medium text-sm">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
          <button
            onClick={() => { logout(); setSidebarOpen(false); }}
            suppressHydrationWarning
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-900/20 font-medium text-sm ${sidebarCollapsed ? "justify-center" : ""}`}
            title={sidebarCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
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
          <h1 className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            Tenant Portal
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none" style={{ color: "var(--color-text-primary)" }}>
                {userName || "Valued Tenant"}
              </p>
              <p
                className="text-xs mt-1 uppercase font-bold tracking-tighter opacity-50"
                style={{ color: "var(--color-text-muted)" }}
              >
                Tenant Account
              </p>
            </div>
            {/* Avatar with emerald gradient ring */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold overflow-hidden"
              style={{
                background: "var(--gradient-green)",
                border: "2px solid var(--color-border-mid)",
              }}
            >
              <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Scrollable page body */}
        <div
          className="flex-1 overflow-auto pb-20 md:pb-0"
          style={{ background: "var(--color-background)" }}
        >
          {children}
        </div>

        <BottomNav
          items={[
            { label: "Home",    href: "/tenant",             icon: <Home className="w-6 h-6" /> },
            { label: "Rent",    href: "/tenant/rent-status", icon: <CreditCard className="w-6 h-6" /> },
            { label: "Bills",   href: "/tenant/payments",    icon: <CreditCard className="w-6 h-6" /> },
            { label: "Issue",   href: "/tenant/complaints",  icon: <AlertCircle className="w-6 h-6" /> },
            { label: "Profile", href: "/tenant/profile",     icon: <User className="w-6 h-6" /> },
          ]}
        />
      </div>
    </div>
  );
}
