"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { 
  Building2, 
  Home, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  TrendingUp,
  Bell,
  Search,
  Users,
  LayoutDashboard,
  ClipboardList,
  MoreHorizontal,
  ChevronRight,
  Plus
} from "lucide-react";
import Button from "@/components/Button";

export default function LandlordDashboard() {
  const { userName, profileImage } = useAuth();
  
  const getInitials = (name: string | null) => {
    if (!name) return "LM";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div 
      className="min-h-screen antialiased pb-24"
      style={{ background: "var(--color-background)" }}
    >
      {/* Premium Header */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-xl border-b px-6 py-5 flex items-center justify-between"
        style={{ 
          background: "rgba(250, 250, 248, 0.8)",
          borderColor: "var(--color-border-light)"
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3 flex-shrink-0"
            style={{ 
              background: "linear-gradient(135deg, var(--color-green-mid), var(--color-green-deep))",
              boxShadow: "0 8px 16px -4px rgba(27, 94, 69, 0.2)"
            }}
          >
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Overview
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
              Welcome, {userName || "Admin"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 border"
            style={{ 
              background: "var(--color-card)", 
              borderColor: "var(--color-border-light)",
              color: "var(--color-text-secondary)"
            }}
          >
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border-2 border-[#1B5E45]/20 p-0.5 overflow-hidden ring-4 ring-[#1B5E45]/5 flex-shrink-0">
            {profileImage ? (
              <img alt="Profile" src={profileImage} className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center text-white font-black text-xs" style={{ background: "var(--color-green-deep)" }}>
                {getInitials(userName)}
              </div>
            )}
          </button>
        </div>
      </header>

      <main className="px-6 py-8 max-w-2xl mx-auto space-y-8">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Buildings", value: "12", icon: Building2, color: "var(--color-green-deep)", trend: "+1", bg: "var(--color-surface-tint)" },
            { label: "Occupied", value: "84", icon: CheckCircle2, color: "var(--color-green-mid)", trend: "92%", bg: "var(--color-surface-secondary)" },
            { label: "Vacant", value: "8", icon: AlertCircle, color: "#D97706", trend: "Alert", bg: "#FEF3C7" },
            { label: "Revenue", value: "$42.5k", icon: DollarSign, color: "var(--color-green-deep)", trend: "+4%", bg: "var(--color-surface-tint)" }
          ].map((item, i) => (
            <div 
              key={i} 
              className="p-5 rounded-[2rem] border transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ 
                background: "var(--color-card)",
                borderColor: "var(--color-border-light)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: item.bg, color: item.color }}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1B5E45]">
                  {item.trend}
                </span>
              </div>
              <h2 className="text-2xl font-black" style={{ color: "var(--color-text-primary)" }}>{item.value}</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Revenue Trends */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Revenue Trends
            </h3>
            <Link href="/landlord/reports" className="text-[10px] font-black uppercase tracking-widest text-[#1B5E45] hover:underline">
              Analytics
            </Link>
          </div>
          <div 
            className="p-6 rounded-[2.5rem] border"
            style={{ 
              background: "var(--color-card)",
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <div className="h-32 w-full flex items-end justify-between gap-3 px-2">
              {[40, 55, 65, 80, 90, 100].map((h, i) => (
                <div key={i} className="w-full rounded-t-xl group h-full relative" style={{ background: "var(--color-surface-secondary)" }}>
                  <div 
                    className="absolute bottom-0 left-0 right-0 rounded-t-xl transition-all duration-700 group-hover:brightness-110" 
                    style={{ 
                      height: `${h}%`,
                      background: "linear-gradient(to top, var(--color-green-deep), var(--color-green-mid))" ,
                      opacity: 0.8
                    }} 
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-5 px-1 text-[9px] font-black tracking-[0.2em]" style={{ color: "var(--color-text-muted)" }}>
              <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Recent Ledger
            </h3>
            <Link href="/landlord/payments" className="text-[10px] font-black uppercase tracking-widest text-[#1B5E45] hover:underline">
              All History
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "James Wilson", unit: "Unit 4A", time: "2 mins ago", amount: "+$1,850.00", status: "PAID", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk-iYP06VzCv0j7fAB2uIbLgwquB2lJwEu5f51IILWg4qlwu97YtI3QbOBrmdI5OCLoQI8By__vHtQg5m05dC8-s7f_5-ITUFKWMZvMqC13hsr4oR8K0xQj2FnuZJZx7gMclKmRuKUf-UOb3eol8uGyO_QfF0EFlSs5VHb82GaktTL535-hXIYokrrhL5YJfTG0hzh0EA35Q7A0D6qnlwkyXTtLYH_TErl9bJt6f_S-kv8tpJvY4Gh-SK6CbcC0amxFDng5C9vEqVd" },
              { name: "Sarah Chen", unit: "Unit 12C", time: "1 hour ago", amount: "+$2,100.00", status: "PENDING", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV_20UvTtNpHw8HLBThMx3SUbaX_kv1q7t2VXOlh3yd99hPBBcFEw9HlV_zvxQDzhAtRSopzVzpnAJVqrJQ40d7ZuEytbwims83309-LSGbgFpls1FOKglo_KxCauJVA85MzRQlSGwAsqOTfU_g56ti4xLGOw4mCUOm5ezNNbhUTQBEzbUQnu6VlT5PiYm3aZCepf40SR7ynE_5-WujeksG1cdY4C84y_o7qCAeKDxSFvgyU7vl0iHxsQCwD7-7hiebEyOj0tWu69R" }
            ].map((p, i) => (
              <div 
                key={i} 
                className="p-4 rounded-[1.5rem] border flex items-center justify-between transition-all hover:border-[#1B5E45]/40"
                style={{ 
                  background: "var(--color-card)",
                  borderColor: "var(--color-border-light)",
                  boxShadow: "var(--shadow-card)"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border flex items-center justify-center overflow-hidden p-0.5">
                    <img alt="Tenant" src={p.img} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-black" style={{ color: "var(--color-text-primary)" }}>{p.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: "var(--color-text-muted)" }}>
                      {p.unit} • {p.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#1B5E45]">{p.amount}</p>
                  <span 
                    className={`inline-block px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mt-1 border ${
                      p.status === 'PAID' ? 'bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20' : 'bg-[#FEF3C7] text-[#92400e] border-[#92400e]/20'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Urgent Issues */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Support Queue
            </h3>
            <span className="bg-[#1B5E45] text-white text-[10px] font-black px-2 py-1 rounded-full px-2.5">3</span>
          </div>
          <Link 
            href="/landlord/complaints" 
            className="block p-5 rounded-[2.2rem] border transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group"
            style={{ 
              background: "var(--color-card)",
              borderColor: "var(--color-border-light)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[8px] font-black bg-[#EF4444] text-white px-2 py-1 rounded-full tracking-widest">URGENT</span>
                  <span className="text-[10px] font-bold tracking-widest text-[#1B5E45]">UNIT 102</span>
                </div>
                <h4 className="text-md font-black italic" style={{ color: "var(--color-text-primary)" }}>
                  "Water leakage in master bathroom"
                </h4>
              </div>
              <ChevronRight className="w-6 h-6 text-[#1B5E45] transition-transform group-hover:translate-x-1" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#EF4444]/10 transition-colors" />
          </Link>
        </section>
      </main>

      {/* Premium Bottom Nav */}
      <nav 
        className="fixed bottom-0 left-0 right-0 border-t px-6 py-4 pb-8 flex items-center justify-between z-50 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
        style={{ 
          background: "rgba(25, 25, 25, 0.98)", // Dark nav per spec
          borderColor: "#2A3A30"
        }}
      >
        <Link href="/landlord/dashboard" className="flex flex-col items-center gap-1.5 text-[#3DBE7A]">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </Link>
        <Link href="/landlord/tenants" className="flex flex-col items-center gap-1.5 text-white/40 hover:text-[#3DBE7A] transition-colors">
          <Users className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Tenants</span>
        </Link>
        
        <button 
          className="relative -top-10 w-16 h-16 rounded-3xl shadow-2xl flex items-center justify-center text-white border-4 transition-all hover:scale-110 active:scale-90"
          style={{ 
            background: "linear-gradient(135deg, var(--color-green-mid), var(--color-green-deep))",
            borderColor: "#1A1A1A",
            boxShadow: "0 10px 25px -5px rgba(27, 94, 69, 0.4)"
          }}
        >
          <Plus className="w-8 h-8" />
        </button>
        
        <Link href="/landlord/complaints" className="flex flex-col items-center gap-1.5 text-white/40 hover:text-[#3DBE7A] transition-colors">
          <ClipboardList className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Issues</span>
        </Link>
        <Link href="/landlord/profile" className="flex flex-col items-center gap-1.5 text-white/40 hover:text-[#3DBE7A] transition-colors">
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">More</span>
        </Link>
      </nav>
    </div>
  );
}
