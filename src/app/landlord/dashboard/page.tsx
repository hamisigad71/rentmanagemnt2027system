"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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
    <div className="bg-[#f6f6f8] dark:bg-[#101622] font-display text-slate-800 dark:text-slate-200 antialiased min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-[#135bec]/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#135bec] flex items-center justify-center text-white">
            <span className="material-icons">business</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Overview</h1>
            <p className="text-xs text-slate-500">Welcome back, {userName || "Admin"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <span className="material-icons">notifications</span>
          </button>
          <button className="w-10 h-10 overflow-hidden rounded-full border-2 border-[#135bec]/20 flex items-center justify-center">
            {profileImage ? (
              <img alt="Profile" src={profileImage} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#135bec] flex items-center justify-center text-white font-bold text-xs">
                {getInitials(userName)}
              </div>
            )}
          </button>
        </div>
      </header>

      <main className="px-4 py-6 mb-24 max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#135bec]/10 flex items-center justify-center">
                <span className="material-icons text-[#135bec] text-sm">apartment</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Buildings</span>
            </div>
            <div className="flex items-end gap-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">12</h2>
              <span className="text-[10px] text-green-500 mb-0.5">+1</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="material-icons text-green-600 text-sm">check_circle</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Occupied</span>
            </div>
            <div className="flex items-end gap-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">84</h2>
              <span className="text-[10px] text-slate-400 mb-0.5">92%</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <span className="material-icons text-orange-600 text-sm">error_outline</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Vacant</span>
            </div>
            <div className="flex items-end gap-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">8</h2>
              <span className="text-[10px] text-orange-500 mb-0.5">Alert</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#135bec]/10 flex items-center justify-center">
                <span className="material-icons text-[#135bec] text-sm">payments</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Revenue</span>
            </div>
            <div className="flex items-end gap-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">$42.5k</h2>
              <span className="text-[10px] text-green-500 mb-0.5">+4%</span>
            </div>
          </div>
        </div>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue Trends</h3>
            <Link href="/landlord/reports" className="text-xs font-semibold text-[#135bec]">Last 6 Months</Link>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm">
            <div className="h-32 w-full flex items-end justify-between gap-2 px-1">
              {[40, 55, 65, 80, 90, 100].map((h, i) => (
                <div key={i} className="w-full bg-[#135bec]/10 rounded-t-sm relative group h-full">
                  <div className="absolute bottom-0 left-0 right-0 bg-[#135bec]/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-[#135bec] rounded-t-sm" style={{ height: `${h * 0.7}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 px-1 text-[10px] font-medium text-slate-400">
              <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Payments</h3>
            <Link href="/landlord/payments" className="text-xs font-semibold text-[#135bec]">View All</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "James Wilson", unit: "Unit 4A", time: "2 mins ago", amount: "+$1,850.00", status: "PAID", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk-iYP06VzCv0j7fAB2uIbLgwquB2lJwEu5f51IILWg4qlwu97YtI3QbOBrmdI5OCLoQI8By__vHtQg5m05dC8-s7f_5-ITUFKWMZvMqC13hsr4oR8K0xQj2FnuZJZx7gMclKmRuKUf-UOb3eol8uGyO_QfF0EFlSs5VHb82GaktTL535-hXIYokrrhL5YJfTG0hzh0EA35Q7A0D6qnlwkyXTtLYH_TErl9bJt6f_S-kv8tpJvY4Gh-SK6CbcC0amxFDng5C9vEqVd" },
              { name: "Sarah Chen", unit: "Unit 12C", time: "1 hour ago", amount: "+$2,100.00", status: "PENDING", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV_20UvTtNpHw8HLBThMx3SUbaX_kv1q7t2VXOlh3yd99hPBBcFEw9HlV_zvxQDzhAtRSopzVzpnAJVqrJQ40d7ZuEytbwims83309-LSGbgFpls1FOKglo_KxCauJVA85MzRQlSGwAsqOTfU_g56ti4xLGOw4mCUOm5ezNNbhUTQBEzbUQnu6VlT5PiYm3aZCepf40SR7ynE_5-WujeksG1cdY4C84y_o7qCAeKDxSFvgyU7vl0iHxsQCwD7-7hiebEyOj0tWu69R" }
            ].map((p, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img alt="Tenant" src={p.img} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{p.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{p.unit} • {p.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${p.status === 'PAID' ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>{p.amount}</p>
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${p.status === 'PAID' ? 'bg-green-100 dark:bg-green-900/40 text-green-600' : 'bg-[#135bec]/10 text-[#135bec]'} mt-1`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Complaints</h3>
            <span className="bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
            <Link href="/landlord/complaints" className="block p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-brand-red bg-red-50 dark:bg-brand-red/20 px-1.5 py-0.5 rounded">URGENT</span>
                    <span className="text-[10px] text-slate-400">Unit 102 • Heights Tower</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Water leakage in master bathroom</h4>
                </div>
                <span className="material-icons text-xl text-slate-400">chevron_right</span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#101622] border-t border-slate-100 dark:border-slate-800 px-6 py-3 pb-6 flex items-center justify-between z-50">
        <Link href="/landlord/dashboard" className="flex flex-col items-center gap-1 text-[#135bec]">
          <span className="material-icons">dashboard</span>
          <span className="text-[10px] font-bold">Dashboard</span>
        </Link>
        <Link href="/landlord/tenants" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#135bec] transition-colors">
          <span className="material-icons">groups</span>
          <span className="text-[10px] font-medium">Tenants</span>
        </Link>
        <button className="relative -top-6 bg-[#135bec] w-14 h-14 rounded-full shadow-lg shadow-[#135bec]/40 flex items-center justify-center text-white border-4 border-white dark:border-[#101622]">
          <span className="material-icons text-3xl">add</span>
        </button>
        <Link href="/landlord/complaints" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#135bec] transition-colors">
          <span className="material-icons">assignment</span>
          <span className="text-[10px] font-medium">Issues</span>
        </Link>
        <Link href="/landlord/profile" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#135bec] transition-colors">
          <span className="material-icons">more_horiz</span>
          <span className="text-[10px] font-medium">More</span>
        </Link>
      </nav>
    </div>
  );
}
