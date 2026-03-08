"use client";

import React, { useState, useEffect } from "react";
import TenantLayout from "@/components/TenantLayout";
import { mockTenants } from "@/data/mockData";
import { Receipt, CreditCard, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/Button";

export default function RentStatusPage() {
  const currentTenant = mockTenants[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force loading for 5-6 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500); // 5.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <TenantLayout>
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-background)" }}>
          <div className="text-center space-y-6 md:space-y-8">
            {/* Animated Logo/Icon */}
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto rounded-full bg-gradient-to-br from-[#1B5E45] to-[#246B4F] flex items-center justify-center shadow-2xl">
                <Receipt className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-[#3DBE7A] rounded-full flex items-center justify-center animate-bounce">
                <Loader2 className="w-3 h-3 md:w-4 md:h-4 text-white animate-spin" />
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                Loading Rent Status
              </h2>
              <p className="text-sm md:text-base text-gray-600 font-medium">
                Retrieving your account information...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-64 md:w-80 mx-auto">
              <div className="bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] h-full rounded-full animate-pulse" 
                     style={{ 
                       animation: 'loading 5.5s ease-in-out forwards',
                       width: '0%'
                     }} />
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-2 font-medium">Please wait while we secure your data</p>
            </div>

            {/* Loading Steps */}
            <div className="space-y-2 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <div className="w-2 h-2 bg-[#3DBE7A] rounded-full animate-pulse" />
                <span className="text-gray-600 font-medium">Authenticating session...</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <span className="text-gray-400 font-medium">Fetching account data...</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <span className="text-gray-400 font-medium">Validating payment status...</span>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes loading {
              0% { width: 0%; }
              20% { width: 25%; }
              40% { width: 50%; }
              60% { width: 75%; }
              80% { width: 90%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      </TenantLayout>
    );
  }

  return (
    <TenantLayout>
      <div className="p-4 md:p-8 lg:p-10 min-h-full" style={{ background: "var(--color-background)" }}>
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Rent Status
            </h2>
            <p style={{ color: "var(--color-text-muted)" }} className="mt-1 md:mt-2 text-sm md:text-base font-medium">
              Detailed breakdown of your rental account protocol
            </p>
          </div>

          {/* Rent Information Card */}
          <div className="bg-white border shadow-md md:shadow-lg p-4 md:p-8 lg:p-10 space-y-6 md:space-y-8" style={{ borderColor: "var(--color-border-light)" }}>
            {/* Unit Information */}
            <div className="pb-6 md:pb-8 lg:pb-10 border-b-2" style={{ borderColor: "var(--color-border-light)" }}>
              <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-[#1B5E45] to-[#246B4F] flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <Receipt className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>Unit Information</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5 md:mt-1">Property details and occupancy</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-white p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl border border-gray-100 hover:border-[#3DBE7A] transition-colors">
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 md:mb-2">Unit Number</p>
                  <p className="text-lg md:text-2xl font-bold text-[#1B5E45]">{currentTenant.unitId}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl border border-gray-100 hover:border-[#3DBE7A] transition-colors">
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 md:mb-2">Move-in Date</p>
                  <p className="text-lg md:text-xl font-bold text-gray-900">{currentTenant.moveInDate}</p>
                </div>
                <div className="bg-gradient-to-br from-[#E8F5EE] to-[#F0F9F6] p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl border border-[#C4D4C9] col-span-2 md:col-span-1">
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#1B5E45] mb-1 md:mb-2">Status</p>
                  <p className="text-lg md:text-xl font-bold text-[#1B5E45]">Active</p>
                </div>
              </div>
            </div>

            {/* Rent Amount Breakdown */}
            <div className="pb-6 md:pb-8 lg:pb-10 border-b-2" style={{ borderColor: "var(--color-border-light)" }}>
              <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>Rent Breakdown</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5 md:mt-1">Monthly charges and inclusions</p>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 p-3 md:p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg md:rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-600">Base Monthly Rent</p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">Due on 1st of each month</p>
                  </div>
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 whitespace-nowrap">
                    KSh {currentTenant.rent.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 p-3 md:p-4 lg:p-6 bg-gradient-to-r from-green-50 to-white rounded-lg md:rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-600">Utilities & Services</p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">Water, electricity, internet</p>
                  </div>
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#1B5E45] to-[#246B4F] text-white text-[9px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest rounded-lg">
                    Inclusive
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="pb-6 md:pb-8 lg:pb-10 border-b-2" style={{ borderColor: "var(--color-border-light)" }}>
              <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>Current Balance</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5 md:mt-1">Payment status overview</p>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex items-center justify-between p-3 md:p-4 lg:p-5 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200">
                  <span className="text-xs md:text-sm font-semibold text-gray-700">Total Due</span>
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    KSh {currentTenant.rent.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 md:p-4 lg:p-5 bg-green-50 rounded-lg md:rounded-xl border border-green-200">
                  <span className="text-xs md:text-sm font-semibold text-gray-700">Amount Settled</span>
                  <span className="text-lg md:text-xl font-bold text-[#1B5E45]">
                    KSh {currentTenant.paidAmount.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className={`flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 p-4 md:p-5 lg:p-6 rounded-lg md:rounded-xl border-2 font-bold text-base md:text-lg ${
                currentTenant.arrears > 0
                  ? "bg-red-50 border-red-300 text-red-700"
                  : "bg-green-50 border-[#3DBE7A] text-[#1B5E45]"
              }`}>
                <span className="uppercase tracking-tight md:tracking-wide text-xs md:text-sm">Net Balance</span>
                <span className="text-2xl md:text-3xl font-black">
                  KSh {currentTenant.arrears.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Status Message */}
            <div className={`p-4 md:p-5 lg:p-6 rounded-lg md:rounded-xl border-2 flex gap-3 md:gap-4 items-start transition-all ${
              currentTenant.arrears === 0 
              ? "bg-green-50 border-[#3DBE7A] text-[#1B5E45]" 
              : "bg-red-50 border-red-300 text-red-700"
            }`}>
              {currentTenant.arrears === 0 ? (
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base md:text-lg leading-tight">
                  {currentTenant.arrears === 0
                    ? "Account Status: Verified & Current"
                    : `Outstanding Balance: KSh ${currentTenant.arrears.toLocaleString()}`}
                </p>
                <p className="text-xs md:text-sm mt-1 md:mt-2 opacity-90 font-medium leading-relaxed">
                  {currentTenant.arrears === 0
                    ? "Your rental account is up to date. Thank you for maintaining timely payments."
                    : "Please settle this amount at your earliest convenience to avoid service interruption."}
                </p>
              </div>
            </div>

            {/* M-Pesa Integration */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl lg:rounded-2xl space-y-6 md:space-y-8 relative overflow-hidden group border border-gray-700 shadow-xl">
              <div className="absolute top-0 right-0 p-8 md:p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                <CreditCard className="w-32 h-32 md:w-40 md:h-40" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                  <div className="h-10 md:h-12 px-3 md:px-4 bg-white rounded-lg flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform shadow-lg">
                    <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-5 md:h-6" />
                  </div>
                  <div className="h-8 md:h-10 px-3 md:px-4 bg-[#3DBE7A]/20 rounded-lg border border-[#3DBE7A]/40 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3DBE7A] rounded-full animate-pulse" />
                    <span className="text-[9px] md:text-xs font-bold text-[#3DBE7A] uppercase tracking-widest">Live Payment Gateway</span>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  <p className="text-white font-bold text-base md:text-lg leading-tight">
                    Settle Your Balance Securely
                  </p>
                  <p className="text-white/50 font-medium text-xs md:text-sm leading-relaxed">
                    Use M-Pesa for instant payment. Rent is due by the 1st of each month. Secure and verified transactions.
                  </p>
                </div>

                <a href="/tenant/payments" className="block">
                  <Button className="w-full bg-gradient-to-r from-[#3DBE7A] to-[#2AE299] hover:from-[#2AE299] hover:to-[#1B5E45] text-white h-12 md:h-14 rounded-lg font-bold text-xs md:text-sm lg:text-base shadow-2xl group border-none transition-all hover:shadow-[0_0_30px_rgba(61,190,122,0.3)]">
                    Pay Now via M-Pesa
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
