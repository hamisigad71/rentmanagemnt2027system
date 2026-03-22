"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Bell,
  Settings,
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
  { label: "Dashboard",   href: "/tenant",              icon: <Home className="w-[18px] h-[18px]" /> },
  { label: "Rent Status", href: "/tenant/rent-status",  icon: <CreditCard className="w-[18px] h-[18px]" /> },
  { label: "Payments",    href: "/tenant/payments",     icon: <CreditCard className="w-[18px] h-[18px]" /> },
  { label: "Complaints",  href: "/tenant/complaints",   icon: <AlertCircle className="w-[18px] h-[18px]" /> },
  { label: "Profile",     href: "/tenant/profile",      icon: <User className="w-[18px] h-[18px]" /> },
];

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout, displayImage, userName } = useAuth();
  const pathname = usePathname();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "T";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--color-background)" }}>

      {/* ── Mobile overlay ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-30"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? 76 : 256 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed md:relative z-40 flex flex-col h-full flex-shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: "#ffffff",
          borderRight: "1px solid #e5e5e5",
          boxShadow: "4px 0 32px rgba(0,0,0,0.08)",
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />

        {/* Logo row */}
        <div
          className="flex items-center justify-between px-5 h-[72px] flex-shrink-0"
          style={{ borderBottom: "1px solid #e5e5e5" }}
        >
          <AnimatePresence mode="wait">
            {!sidebarCollapsed ? (
              <motion.div
                key="full"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Logo size="sm" isDark variant="full" />
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Logo size="sm" isDark variant="icon" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1">
            {/* Desktop collapse toggle */}
            <button
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand" : "Collapse"}
            >
              {sidebarCollapsed
                ? <ChevronRight className="w-4 h-4" />
                : <ChevronLeft className="w-4 h-4" />}
            </button>
            {/* Mobile close */}
            <button
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section label */}
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-5 pt-6 pb-2"
            >
              <p className="text-[8px] font-black uppercase " style={{ color: "#D1D5DB" }}>
                Navigation
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav links */}
        <nav className={`flex-1 overflow-y-auto py-3 space-y-1 ${sidebarCollapsed ? "px-3" : "px-3"}`}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? link.label : undefined}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group overflow-hidden"
                style={{
                  background: isActive ? "rgba(61,190,122,0.10)" : "transparent",
                  color: isActive ? "#3DBE7A" : "#374151",
                  justifyContent: sidebarCollapsed ? "center" : undefined,
                }}
              >
                {/* Active left bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[#3DBE7A]"
                  />
                )}

                {/* Hover bg */}
                <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />

                {/* Icon */}
                <span
                  className="relative z-10 flex-shrink-0 transition-colors duration-200"
                  style={{ color: isActive ? "#3DBE7A" : "#9CA3AF" }}
                >
                  {link.icon}
                </span>

                {/* Label */}
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.18 }}
                      className="relative z-10 text-[13px] font-bold whitespace-nowrap"
                      style={{ color: isActive ? "#3DBE7A" : "#374151" }}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* User profile mini card */}
        <div
          className="mx-3 mb-3 rounded-2xl overflow-hidden flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className={`flex items-center gap-3 p-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
            <div className="relative flex-shrink-0">
              <div
                className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center font-black text-xs text-white"
                style={{ background: "linear-gradient(135deg, #1B5E45, #3DBE7A)" }}
              >
                {displayImage
                  ? <img src={displayImage} alt="Avatar" className="w-full h-full object-cover" />
                  : getInitials(userName)
                }
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#3DBE7A] border-2 border-[#0F0F0F]" />
            </div>

            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-xs font-black text-white truncate leading-none mb-0.5">{userName || "Tenant"}</p>
                  <p className="text-[9px] font-black uppercase " style={{ color: "#3DBE7A" }}>Active</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout */}
          <button
            onClick={() => { logout(); setSidebarOpen(false); }}
            suppressHydrationWarning
            title={sidebarCollapsed ? "Logout" : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 transition-all duration-200 text-red-400/70 hover:text-red-400 hover:bg-red-900/15 text-[12px] font-bold border-t ${sidebarCollapsed ? "justify-center" : ""}`}
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <div
          className="flex-shrink-0 h-[72px] flex items-center justify-between px-5 gap-4"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          {/* Left: hamburger + breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-[#E8E8E4] bg-[#FAFAF8] hover:bg-[#F0F0EC] transition-all duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" style={{ color: "var(--color-text-primary)" }} />
            </button>

            <div>
              <p className="text-[8px] font-black uppercase " style={{ color: "rgba(0,0,0,0.28)" }}>
                Tenant Portal
              </p>
              <p className="text-sm font-black leading-none mt-0.5" style={{ color: "var(--color-text-primary)" }}>
                {links.find((l) => l.href === pathname)?.label ?? "Dashboard"}
              </p>
            </div>
          </div>

          {/* Right: actions + avatar */}
          <div className="flex items-center gap-3">
            

            {/* Divider */}
            <div className="w-px h-6 bg-[#E8E8E4]" />

            {/* Notification bell */}
            <button className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-[#E8E8E4] bg-[#FAFAF8] hover:bg-[#F0F0EC] transition-all duration-200">
              <Bell className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#3DBE7A]" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-[#E8E8E4]" />

            {/* User chip */}
            <div className="flex items-center gap-3 pl-1">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-black leading-none" style={{ color: "var(--color-text-primary)" }}>
                  {userName || "Valued Tenant"}
                </p>
                <p className="text-[9px] font-black uppercase  mt-0.5 italic" style={{ color: "#1B5E45" }}>
                  Tenant Account
                </p>
              </div>
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center font-black text-xs text-white"
                  style={{
                    background: "linear-gradient(135deg, #1B5E45, #3DBE7A)",
                    boxShadow: "0 2px 8px rgba(27,94,69,0.3)",
                  }}
                >
                  {displayImage
                    ? <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
                    : getInitials(userName)
                  }
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#3DBE7A] border-2 border-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div
          className="flex-1 overflow-auto pb-20 md:pb-0"
          style={{ background: "var(--color-background)" }}
        >
          {children}
        </div>

        <BottomNav
          items={[
            { label: "Home",    href: "/tenant",             icon: <Home className="w-5 h-5" /> },
            { label: "Rent",    href: "/tenant/rent-status", icon: <CreditCard className="w-5 h-5" /> },
            { label: "Bills",   href: "/tenant/payments",    icon: <CreditCard className="w-5 h-5" /> },
            { label: "Issue",   href: "/tenant/complaints",  icon: <AlertCircle className="w-5 h-5" /> },
            { label: "Profile", href: "/tenant/profile",     icon: <User className="w-5 h-5" /> },
          ]}
        />
      </div>
    </div>
  );
}