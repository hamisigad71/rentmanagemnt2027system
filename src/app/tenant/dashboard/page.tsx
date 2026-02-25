"use client";

import React from "react";
import Link from "next/link";
import TenantLayout from "@/components/TenantLayout";
import { mockTenants } from "@/data/mockData";
import { 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Wallet,
  Clock,
  FileText,
  Activity
} from "lucide-react";
import Button from "@/components/Button";

export default function TenantDashboard() {
  const currentTenant = mockTenants[0];
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Calculate payment progress
  const paymentProgress = (currentTenant.paidAmount / currentTenant.rent) * 100;
  const isFullyPaid = currentTenant.arrears === 0;

  return (
    <TenantLayout>
      <div className="min-h-screen bg-slate-50 font-sans p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-slate-500 font-medium mb-1">{currentDate}</p>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back, {currentTenant.name.split(' ')[0]}!
              </h1>
              <p className="text-slate-600 mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Unit {currentTenant.unitId} • Lease Active
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => window.location.href = '/tenant/payments'} className="bg-slate-900 shadow-lg shadow-slate-900/20">
                <CreditCard className="w-4 h-4 mr-2" />
                Make Payment
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/tenant/complaints'}>
                <AlertCircle className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Rent Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rent</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">${currentTenant.rent}</h3>
              <p className="text-xs text-slate-500">Monthly breakdown</p>
            </div>

            {/* Balance Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${isFullyPaid ? 'bg-green-50 text-green-600' : 'bg-brand-red/10 text-brand-red'}`}>
                  {isFullyPaid ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Balance</span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${isFullyPaid ? 'text-slate-900' : 'text-brand-red'}`}>
                ${currentTenant.arrears}
              </h3>
              <p className="text-xs text-slate-500">{isFullyPaid ? 'All caught up!' : 'Due immediately'}</p>
            </div>

            {/* Next Due Date */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Due</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Mar 1, 2026</h3>
              <p className="text-xs text-slate-500">12 days remaining</p>
            </div>

            {/* Active Requests */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requests</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">1</h3>
              <p className="text-xs text-slate-500">Active maintenance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Financial Health Section */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Financial Overview</h2>
                  <p className="text-sm text-slate-500">Current month payment status</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${isFullyPaid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {isFullyPaid ? 'Paid in Full' : 'Payment Pending'}
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-slate-600">
                        {paymentProgress}% Paid
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-slate-600">
                        ${currentTenant.paidAmount} of ${currentTenant.rent}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-slate-100">
                    <div style={{ width: `${paymentProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">Total Rent</p>
                    <p className="text-xl font-bold text-slate-900">${currentTenant.rent}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">Paid Amount</p>
                    <p className="text-xl font-bold text-green-600">${currentTenant.paidAmount}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">Reamining</p>
                    <p className="text-xl font-bold text-brand-red">${currentTenant.arrears}</p>
                  </div>
                </div>

                {!isFullyPaid && (
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-blue-900 text-sm">Action Required</p>
                        <p className="text-xs text-blue-700">Please settle your outstanding balance of ${currentTenant.arrears}.</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full sm:w-auto">Pay Now</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg shadow-slate-900/10 p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/tenant/complaints" className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg group-hover:text-orange-300">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-sm">Report Maintenance</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/tenant/profile" className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg group-hover:text-blue-300">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-sm">View Lease Details</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-500" />
                  Recent Activity
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Rent Payment", date: "Oct 01, 2023", amount: "$1200", type: "payment" },
                    { title: "Maintenance Request", date: "Sep 28, 2023", status: "In Progress", type: "request" },
                    { title: "Lease Renewed", date: "Aug 15, 2023", status: "Signed", type: "document" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 relative">
                      {i !== 2 && <div className="absolute left-2.5 top-8 bottom-0 w-px bg-slate-100"></div>}
                      <div className={`w-5 h-5 rounded-full border-2 border-white shadow-sm shrink-0 z-10 ${
                        item.type === 'payment' ? 'bg-green-500' : 
                        item.type === 'request' ? 'bg-orange-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500 mb-1">{item.date}</p>
                        {item.amount && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{item.amount}</span>}
                        {item.status && <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{item.status}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/tenant/profile" className="block text-center text-xs font-bold text-blue-600 mt-6 hover:underline">View All History</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
