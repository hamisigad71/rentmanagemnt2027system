"use client";

import React from "react";
import LandlordLayout from "@/components/LandlordLayout";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { BarChart3, TrendingUp, Users, PieChart, Download, Calendar, Filter, ArrowUpRight, ShieldCheck, Activity } from "lucide-react";
import Button from "@/components/Button";

const incomeData = [
  { month: "Jan", income: 125000 },
  { month: "Feb", income: 132000 },
  { month: "Mar", income: 128000 },
  { month: "Apr", income: 141000 },
  { month: "May", income: 139000 },
  { month: "Jun", income: 145000 },
];

const occupancyData = [
  { month: "Jan", occupied: 90, vacant: 10 },
  { month: "Feb", occupied: 92, vacant: 8 },
  { month: "Mar", occupied: 91, vacant: 9 },
  { month: "Apr", occupied: 94, vacant: 6 },
  { month: "May", occupied: 95, vacant: 5 },
  { month: "Jun", occupied: 98, vacant: 2 },
];

export default function ReportsPage() {
  return (
    <LandlordLayout>
      <div className="p-6 md:p-10 space-y-10 ">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <BarChart3 className="w-3 h-3" />
              Strategic Intelligence Hub
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter"> Property <span className="text-slate-400">Analytics</span></h2>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="outline" className="h-12 rounded-xl group">
               <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
               Export Analysis
             </Button>
            <Button variant="premium" className="h-12 rounded-xl">Custom Query</Button>
          </div>
        </div>

        {/* Intelligence Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Avg Occupancy', value: '98.2%', icon: Users, color: 'blue', trend: '+1.4%' },
             { label: 'Net Yield', value: '14.5%', icon: TrendingUp, color: 'green', trend: '+0.8%' },
             { label: 'Collection Rate', value: '99.1%', icon: ShieldCheck, color: 'emerald', trend: 'Optimal' },
             { label: 'Maintenance ROI', value: '8.2%', icon: Activity, color: 'indigo', trend: '-2.1%' }
           ].map((node, i) => (
             <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-${node.color}-50 flex items-center justify-center text-${node.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                   <node.icon className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{node.label}</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter mt-1">{node.value}</p>
                   </div>
                   <div className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                      {node.trend}
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Income Chart - Cinematic Area Chart */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-10 space-y-8">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-[#1B5E45] uppercase tracking-widest">Revenue Streams</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Performance Horizon</h3>
                 </div>
                 <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button className="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white shadow-sm text-slate-900">Income</button>
                    <button className="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900">Expenses</button>
                 </div>
              </div>
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={incomeData}>
                       <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                          dy={10}
                       />
                       <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                       />
                       <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                          itemStyle={{ color: '#fff' }}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="income" 
                          stroke="#2563eb" 
                          strokeWidth={4} 
                          fillOpacity={1} 
                          fill="url(#colorIncome)" 
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Occupancy Chart - Premium Bar Chart */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-10 space-y-8">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Inventory Health</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Occupancy Metrics</h3>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Calendar className="w-4 h-4" />
                    H1 2024
                 </div>
              </div>
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={occupancyData} barGap={8}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                          dy={10}
                       />
                       <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                       />
                       <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff' }}
                       />
                       <Bar dataKey="occupied" fill="#10b981" radius={[6, 6, 0, 0]} name="Occupied Unit %" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Strategic Roadmap - Premium Table/List */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B5E45]/20 blur-[150px] rounded-full" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 max-w-xl mx-auto">
              <div className="max-w-sm space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE]0/20 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-300">
                    <PieChart className="w-3 h-3" />
                     Property Strategy
                 </div>
                 <h3 className="text-2xl md:text-4xl font-medium tracking-tighter leading-tight"><span className="text-white">Optimizing Asset</span> <span className="text-[#3DBE7A]">Utilization</span> <span className="text-white">Protocols.</span></h3>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    Based on current market trends and property diagnostics, you are advised to expand high-yield commercial assets in the Downtoan sector.
                 </p>
              </div>
              <div className="flex flex-row gap-3 md:gap-6 w-full md:w-auto">
                 <div className="flex-1 p-2.5 md:p-6 bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] border border-white/10 text-center space-y-1.5 md:space-y-2">
                    <p className="text-[8px] md:text-[10px] font-medium text-[#3DBE7A] uppercase tracking-wider md:tracking-widest">Growth Index</p>
                    <p className="text-2xl md:text-4xl font-medium tracking-tighter">+18%</p>
                    <p className="text-[8px] md:text-[9px] font-medium text-slate-500 uppercase tracking-wider md:tracking-widest">Year-on-year</p>
                 </div>
                 <div className="flex-1 p-2.5 md:p-6 bg-white/10 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] border border-white/10 text-center space-y-1.5 md:space-y-2">
                    <p className="text-[8px] md:text-[10px] font-medium text-[#3DBE7A] uppercase tracking-wider md:tracking-widest">Risk Factor</p>
                    <p className="text-2xl md:text-4xl font-medium tracking-tighter">Low</p>
                    <p className="text-[8px] md:text-[9px] font-medium text-slate-500 uppercase tracking-wider md:tracking-widest">Market Neutral</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </LandlordLayout>
  );
}
