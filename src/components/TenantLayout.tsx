"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  CreditCard,
  AlertCircle,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "./BottomNav";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const links: SidebarLink[] = [
  { label: "Dashboard", href: "/tenant", icon: <Home className="w-5 h-5" /> },
  {
    label: "Rent Status",
    href: "/tenant/rent-status",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    label: "Payments",
    href: "/tenant/payments",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    label: "Complaints",
    href: "/tenant/complaints",
    icon: <AlertCircle className="w-5 h-5" />,
  },
  {
    label: "Profile",
    href: "/tenant/profile",
    icon: <User className="w-5 h-5" />,
  },
];

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, displayImage, userName } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 bg-white border-r border-gray-200 shadow-sm z-40 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              RT
            </div>
            <span className="font-bold text-gray-900">RentTenant</span>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
            suppressHydrationWarning
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Tenant Portal</h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-none">{userName || "Valued Tenant"}</p>
              <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-tighter opacity-50">Tenant Account</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold overflow-hidden border-2 border-white shadow-sm">
              <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto pb-20 md:pb-0">{children}</div>

        <BottomNav 
          activeColor="green"
          items={[
            { label: "Home", href: "/tenant", icon: <Home className="w-6 h-6" /> },
            { label: "Rent", href: "/tenant/rent-status", icon: <CreditCard className="w-6 h-6" /> },
            { label: "Bills", href: "/tenant/payments", icon: <CreditCard className="w-6 h-6" /> },
            { label: "Issue", href: "/tenant/complaints", icon: <AlertCircle className="w-6 h-6" /> },
            { label: "Profile", href: "/tenant/profile", icon: <User className="w-6 h-6" /> },
          ]} 
        />
      </div>
    </div>
  );
}
