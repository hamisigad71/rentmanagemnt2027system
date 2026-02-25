"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "./BottomNav";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const links: SidebarLink[] = [
  { label: "Dashboard", href: "/landlord", icon: <Home className="w-5 h-5" /> },
  {
    label: "Buildings",
    href: "/landlord/buildings",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    label: "Units",
    href: "/landlord/units",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    label: "Tenants",
    href: "/landlord/tenants",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Payments",
    href: "/landlord/payments",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    label: "Complaints",
    href: "/landlord/complaints",
    icon: <AlertCircle className="w-5 h-5" />,
  },
  {
    label: "Reports",
    href: "/landlord/reports",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: "Profile",
    href: "/landlord/profile",
    icon: <User className="w-5 h-5" />,
  },
];

export default function LandlordLayout({
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
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              RM
            </div>
            <span className="font-bold text-gray-900">RentManager</span>
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
            suppressHydrationWarning
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
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              Landlord Dashboard
            </h1>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {userName || "Property Manager"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/landlord/profile" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </Link>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto pb-24 md:pb-0">{children}</div>

        <BottomNav 
          activeColor="blue"
          items={[
            { label: "Home", href: "/landlord", icon: <Home className="w-6 h-6" /> },
            { label: "Buildings", href: "/landlord/buildings", icon: <Building2 className="w-6 h-6" /> },
            { label: "Tenants", href: "/landlord/tenants", icon: <Users className="w-6 h-6" /> },
            { label: "Payments", href: "/landlord/payments", icon: <CreditCard className="w-6 h-6" /> },
            { label: "Profile", href: "/landlord/profile", icon: <User className="w-6 h-6" /> },
          ]} 
        />
      </div>
    </div>
  );
}
