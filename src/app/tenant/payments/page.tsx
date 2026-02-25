"use client";

import React, { useState } from "react";
import TenantLayout from "@/components/TenantLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  History,
  Info,
  CheckCircle2,
  Calendar,
  Lock,
  Zap,
  ArrowRight
} from "lucide-react";
import { mockPayments, mockTenants } from "@/data/mockData";
import { ActionProvider, useAction } from "@/context/ActionContext";

export default function TenantPaymentsPage() {
  const currentTenant = mockTenants[0];
  const tenantPayments = mockPayments.filter((p) => p.tenantId === currentTenant.id);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "bank">("mpesa");
  const [amount, setAmount] = useState(currentTenant.arrears > 0 ? currentTenant.arrears : 0);
  const [refId, setRefId] = useState("");
  const { showAction, updateAction, hideAction } = useAction();

  React.useEffect(() => {
    setRefId(`${currentTenant.id}-${new Date().getMonth() + 1}`);
  }, [currentTenant.id]);

  const handlePayment = () => {
    showAction({
      title: "Verifying Payment",
      message: "Please wait while we secure your transaction...",
      color: "blue",
      icon: "published_with_changes"
    });

    setTimeout(() => {
      updateAction({
        title: "Payment Successful",
        message: "Your rental balance has been updated.",
        color: "green",
        icon: "check_circle"
      });
      
      setTimeout(() => hideAction(), 1000);
    }, 2000);
  };

  // M-Pesa Logo
  const MpesaLogo = () => (
    <div className="flex items-center gap-1">
      <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-10 object-contain" />
    </div>
  );

  return (
    <TenantLayout>
      <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Secure Payments</h2>
          <p className="text-gray-600 mt-1">Manage your rent and utilities securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Summary Box - Redesigned for Premium Feel */}
              <div className="glass-panel border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden group transition-all hover:shadow-blue-500/5 hover:-translate-y-1">
                <div className="relative bg-linear-to-br from-slate-900 via-blue-900 to-indigo-950 p-10 text-white overflow-hidden">
                  {/* Cinematic Effects */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse-soft" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />
                  <div className="absolute inset-0 bg-shimmer opacity-[0.03] pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <p className="text-blue-200/60 text-[10px] font-black uppercase tracking-[0.3em]">Account Statement</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 text-xs font-bold">Total Arrears</p>
                        <div className="flex items-center gap-4">
                          <span className="text-6xl font-black tracking-tighter bg-linear-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                            KSh {currentTenant.arrears.toLocaleString()}
                          </span>
                          <Badge text="Outstanding" type="error" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                       <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
                            <Lock className="w-3.5 h-3.5 text-blue-300/60" />
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] font-black text-blue-300/40 uppercase tracking-widest">Secure Ledger v4.2</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 space-y-8 bg-white/5 backdrop-blur-3xl border-t border-white/5">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Payment Configuration</h4>
                        <p className="text-[11px] text-slate-400 font-bold">Adjust your contribution amount</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                        <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Priority Sync</span>
                      </div>
                    </div>

                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <span className="text-slate-300 font-extrabold text-xl group-focus-within/input:text-blue-600 transition-colors">KSh</span>
                      </div>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        suppressHydrationWarning
                        className="w-full pl-20 pr-8 py-7 bg-slate-50/50 border border-slate-200/60 rounded-[2rem] font-black text-4xl text-slate-900 focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner group-hover/input:border-slate-300"
                        placeholder="0.00"
                      />
                      <div className="absolute right-6 inset-y-0 flex items-center gap-3">
                         <button suppressHydrationWarning onClick={() => setAmount(currentTenant.arrears)} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:text-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all active:scale-95 uppercase tracking-widest">All</button>
                         <button suppressHydrationWarning onClick={() => setAmount(currentTenant.arrears / 2)} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:text-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all active:scale-95 uppercase tracking-widest">Half</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Payment Methods Selection */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  Choose Payment Method
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 2 of 2</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <button 
                  onClick={() => setPaymentMethod("mpesa")}
                  suppressHydrationWarning
                  className={`group relative overflow-hidden flex items-center sm:flex-col sm:justify-center gap-4 p-6 rounded-[2rem] border-2 transition-all duration-500 active:scale-95 ${
                    paymentMethod === "mpesa" 
                    ? "border-emerald-500 bg-emerald-50/50 shadow-2xl shadow-emerald-500/10" 
                    : "border-slate-100 bg-slate-50/30 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  {paymentMethod === "mpesa" && <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500 rounded-bl-3xl flex items-center justify-center animate-in slide-in-from-top-4 slide-in-from-right-4"><CheckCircle2 className="w-5 h-5 text-white" /></div>}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${paymentMethod === "mpesa" ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 scale-110" : "bg-white text-slate-400 group-hover:text-emerald-500"}`}>
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className={`text-sm font-black transition-colors ${paymentMethod === "mpesa" ? "text-emerald-900" : "text-slate-600"}`}>M-Pesa</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mobile Pay</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setPaymentMethod("card")}
                  suppressHydrationWarning
                  className={`group relative overflow-hidden flex items-center sm:flex-col sm:justify-center gap-4 p-6 rounded-[2rem] border-2 transition-all duration-500 active:scale-95 ${
                    paymentMethod === "card" 
                    ? "border-blue-500 bg-blue-50/50 shadow-2xl shadow-blue-500/10" 
                    : "border-slate-100 bg-slate-50/30 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  {paymentMethod === "card" && <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500 rounded-bl-3xl flex items-center justify-center animate-in slide-in-from-top-4 slide-in-from-right-4"><CheckCircle2 className="w-5 h-5 text-white" /></div>}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${paymentMethod === "card" ? "bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-110" : "bg-white text-slate-400 group-hover:text-blue-600"}`}>
                    <CreditCard className="w-7 h-7" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className={`text-sm font-black transition-colors ${paymentMethod === "card" ? "text-blue-900" : "text-slate-600"}`}>Credit Card</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Global Pay</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setPaymentMethod("bank")}
                  suppressHydrationWarning
                  className={`group relative overflow-hidden flex items-center sm:flex-col sm:justify-center gap-4 p-6 rounded-[2rem] border-2 transition-all duration-500 active:scale-95 ${
                    paymentMethod === "bank" 
                    ? "border-indigo-500 bg-indigo-50/50 shadow-2xl shadow-indigo-500/10" 
                    : "border-slate-100 bg-slate-50/30 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  {paymentMethod === "bank" && <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500 rounded-bl-3xl flex items-center justify-center animate-in slide-in-from-top-4 slide-in-from-right-4"><CheckCircle2 className="w-5 h-5 text-white" /></div>}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${paymentMethod === "bank" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 scale-110" : "bg-white text-slate-400 group-hover:text-indigo-600"}`}>
                    <Building className="w-7 h-7" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className={`text-sm font-black transition-colors ${paymentMethod === "bank" ? "text-indigo-900" : "text-slate-600"}`}>Bank Wire</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Direct Pay</p>
                  </div>
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-100">
                {paymentMethod === "mpesa" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                          <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-8 object-contain" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none">M-Pesa Express</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Direct Push Payment</p>
                        </div>
                      </div>
                      <Badge text="Instant Verify" type="success" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-green-600 transition-colors">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <input 
                          type="tel" 
                          placeholder="0712 345 678"
                          suppressHydrationWarning
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-lg"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 ml-1">
                        <Info className="w-3.5 h-3.5 text-blue-500" />
                        You will receive an automated STK prompt on your mobile device.
                      </p>
                    </div>
                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 py-8 text-xl font-black shadow-2xl shadow-green-500/30 rounded-[1.5rem] transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 overflow-hidden relative group"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span>Authorize KSh {amount.toLocaleString()}</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-1.5 px-2 border border-slate-200/50">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Visa & Mastercard" className="h-8 object-contain rounded-sm" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none">Credit / Debit Card</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Secure 3D-Authentication</p>
                        </div>
                      </div>
                      <Badge text="Secured by Stripe" type="success" />
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Card Number</label>
                        <div className="relative group/field">
                          <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            suppressHydrationWarning
                            className="w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold tracking-[0.2em] text-lg"
                          />
                           <div className="absolute right-6 inset-y-0 flex items-center">
                             <Lock className="w-5 h-5 text-slate-300 group-focus-within/field:text-blue-500 transition-colors" />
                           </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2.5">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Expiry</label>
                          <input type="text" placeholder="MM / YY" suppressHydrationWarning className="w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-lg" />
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">CVV</label>
                          <input type="password" placeholder="***" suppressHydrationWarning className="w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-lg" />
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-8 text-xl font-black shadow-2xl shadow-blue-500/30 rounded-[1.5rem] transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                    >
                      <span>Authorize KSh {amount.toLocaleString()}</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50 space-y-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-16 -mt-16" />
                      <div className="flex items-center gap-4 border-b border-indigo-100 pb-6">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/20">
                          <Building className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-lg leading-tight">Direct Deposit Details</h4>
                          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mt-1">Tier-1 Institutional Account</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                        <div className="group/cell">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bank Entity</p>
                          <p className="font-black text-slate-900 text-base">Equity Bank Kenya</p>
                        </div>
                        <div className="group/cell">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Account Number</p>
                          <p className="font-black text-slate-900 text-base tabular-nums flex items-center gap-2">
                            1234 5678 9012
                            <Badge text="Verified" type="success" />
                          </p>
                        </div>
                        <div className="group/cell">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Beneficiary</p>
                          <p className="font-black text-slate-900 text-base">RM Property Management</p>
                        </div>
                        <div className="group/cell">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reference Code</p>
                          <div className="flex items-center gap-2">
                             <p className="font-black text-indigo-600 text-base tabular-nums">{refId}</p>
                             <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-400 cursor-copy active:scale-90 transition-transform"><Lock className="w-3 h-3" /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-900 text-white p-6 rounded-[2rem] flex gap-5 items-center shadow-2xl shadow-slate-900/10 border border-white/5">
                      <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 shrink-0">
                        <Info className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white leading-tight">Digital Receipt Required</p>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">Once your transfer is complete, please upload the PDF/Screenshot receipt for instant reconciliation.</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-slate-900 hover:bg-slate-800 py-8 text-xl font-black shadow-2xl rounded-[1.5rem] transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                    >
                      <span>Complete Wire Transfer</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Info Area */}
          <div className="space-y-8">
            <div className="glass-panel border-white/20 rounded-[2.5rem] shadow-2xl p-10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <h3 className="text-[10px] font-black text-slate-800 mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                  Trust & Security
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 border border-slate-100 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:border-blue-500 group-hover/item:shadow-xl group-hover/item:shadow-blue-500/20 transition-all duration-300">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none">256-bit SSL</p>
                      <p className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">Enterprise Grade</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 border border-slate-100 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:border-blue-500 group-hover/item:shadow-xl group-hover/item:shadow-blue-500/20 transition-all duration-300">
                      <Clock className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none">Safe-Sync</p>
                      <p className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">Real-time settlement</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Partner Ecosystem</p>
                  <div className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-all filter grayscale hover:grayscale-0">
                    <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-8 object-contain" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Visa & Mastercard" className="h-6 object-contain rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-transparent opacity-50" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-3xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-500">
                  <Info className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="font-black text-2xl mb-4 tracking-tight">Concierge Support</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">Experiencing an issue? Our priority support team is standing by to assist with your transaction.</p>
                <button className="w-full py-5 bg-white text-slate-900 hover:bg-blue-50 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98]">
                  Open Priority Ticket
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <History className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Payment Activity</h3>
          </div>
          
          <div className="glass-panel border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-white/5">
                    <th className="px-10 py-6 text-left font-black uppercase tracking-[0.2em] text-[10px]">Reference</th>
                    <th className="px-10 py-6 text-left font-black uppercase tracking-[0.2em] text-[10px]">Statement Month</th>
                    <th className="px-10 py-6 text-left font-black uppercase tracking-[0.2em] text-[10px]">Net Value</th>
                    <th className="px-10 py-6 text-left font-black uppercase tracking-[0.2em] text-[10px]">Status</th>
                    <th className="px-10 py-6 text-left font-black uppercase tracking-[0.2em] text-[10px]">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tenantPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-blue-50/30 transition-all duration-300 group/row">
                      <td className="px-10 py-8 font-black text-blue-600 tabular-nums text-sm group-hover/row:translate-x-1 transition-transform duration-300">#PAY-{payment.id}</td>
                      <td className="px-10 py-8 font-black text-slate-900">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover/row:bg-blue-50 group-hover/row:text-blue-600 transition-colors">
                            <Calendar className="w-4 h-4" />
                           </div>
                           <span className="text-sm">{payment.month}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 font-black text-slate-900 tabular-nums text-base">KSh {payment.amount.toLocaleString()}</td>
                      <td className="px-10 py-8">
                        <div className="transform scale-100 origin-left">
                          <Badge
                            text={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            type={
                              payment.status === 'completed'
                                ? 'success'
                                : payment.status === 'pending'
                                ? 'warning'
                                : 'error'
                            }
                          />
                        </div>
                      </td>
                      <td className="px-10 py-8 text-slate-400 font-bold text-xs">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* ActionOverlay removed as it is now global */}
    </TenantLayout>
  );
}
