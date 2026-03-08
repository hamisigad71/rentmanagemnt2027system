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
import { useAction } from "@/context/ActionContext";
import { LOADER_DURATION } from "@/utils/constants";

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
      title: "Establishing Secure Protocol",
      message: "Synchronizing with banking ledger...",
      color: "green",
      icon: "published_with_changes"
    });
  
    // Initial verification delay
    setTimeout(() => {
      updateAction({
        title: "Transaction Authorized",
        message: "Your rental account has been reconciled.",
        color: "green",
        icon: "check_circle"
      });
      
      setTimeout(() => hideAction(), 1000);
    }, LOADER_DURATION - 1000);
  };

  return (
    <TenantLayout>
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen" suppressHydrationWarning>
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#1B5E45] to-[#246B4F] flex items-center justify-center text-white shadow-lg">
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Financial Portal</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Secure payment processing & transaction management</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Summary Box */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="relative bg-gradient-to-br from-[#1B5E45] via-[#246B4F] to-[#0f3d2a] p-8 text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#3DBE7A]/5 rounded-full blur-3xl -mr-40 -mt-40" />
                  
                  <div className="relative z-10 space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Reference: {refId}</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Current Outstanding Balance</p>
                          <div className="flex items-end gap-4">
                            <div>
                              <p className="text-5xl font-bold tracking-tight">KSh {currentTenant.arrears.toLocaleString()}</p>
                            </div>
                            <div className="px-4 py-1.5 bg-red-500/90 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg mb-2">
                              Outstanding
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/20">
                       <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-[#3DBE7A]" />
                        <p className="text-xs font-semibold text-white/70">256-Bit Encryption</p>
                       </div>
                      <p className="text-xs font-bold text-white/40 font-mono">AES-GCM Protocol</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Enter Payment Amount</h4>
                        <p className="text-sm text-gray-500 font-medium mt-1">Specify how much you want to pay</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E8F5EE] rounded-lg border border-[#C4D4C9]">
                        <Zap className="w-4 h-4 text-[#1B5E45]" />
                        <span className="text-xs font-bold text-[#1B5E45] uppercase tracking-wider">Instant Process</span>
                      </div>
                    </div>

                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <span className="text-[#1B5E45] font-bold text-xl">KSh</span>
                      </div>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-20 pr-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-xl font-bold text-3xl focus:ring-4 focus:ring-[#3DBE7A]/10 focus:border-[#3DBE7A] outline-none transition-all text-gray-900 placeholder-gray-400"
                        placeholder="0"
                      />
                      <div className="absolute right-6 inset-y-0 flex items-center gap-2">
                         <button onClick={() => setAmount(currentTenant.arrears)} className="px-3 py-2 bg-gray-100 hover:bg-[#1B5E45] hover:text-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 transition-all active:scale-95 uppercase tracking-tight shadow-sm">Full</button>
                         <button onClick={() => setAmount(currentTenant.arrears / 2)} className="px-3 py-2 bg-gray-100 hover:bg-[#1B5E45] hover:text-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 transition-all active:scale-95 uppercase tracking-tight shadow-sm">50%</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Verification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1B5E45] to-[#246B4F] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#1B5E45] uppercase tracking-wider mb-1">Secure Encryption</p>
                      <h4 className="text-sm font-bold text-gray-900">256-bit AES-GCM Protocol</h4>
                      <p className="text-xs text-gray-600 mt-3 leading-relaxed">Military-grade encryption protects all your transaction data with institutional-level security standards.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 p-6 hover:shadow-lg transition-all">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                       <Smartphone className="w-6 h-6" />
                     </div>
                     <div className="flex-1">
                       <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Always Available</p>
                       <h4 className="text-sm font-bold text-gray-900">24/7 Expert Support</h4>
                       <p className="text-xs text-gray-600 mt-3 leading-relaxed">Our support team is available around the clock to assist with any payment or account inquiries.</p>
                     </div>
                   </div>
                </div>
              </div>

            {/* Payment Methods Selection */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shadow-md">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">Choose your preferred payment option</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3 mb-8">
                {[
                  { id: "mpesa", label: "M-Pesa", desc: "Mobile Payment", icon: <Smartphone className="w-5 h-5" />, color: "emerald" },
                  { id: "card", label: "Debit Card", desc: "Visa/Mastercard", icon: <CreditCard className="w-5 h-5" />, color: "blue" },
                  { id: "bank", label: "Bank Transfer", desc: "Direct Account", icon: <Building className="w-5 h-5" />, color: "slate" }
                ].map((meth) => (
                  <button 
                    key={meth.id}
                    onClick={() => setPaymentMethod(meth.id as any)}
                    className={`group relative flex items-center gap-4 p-4 rounded-lg border-2 transition-all active:scale-95 ${
                      paymentMethod === meth.id 
                      ? `border-[#1B5E45] bg-[#E8F5EE] shadow-md` 
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {paymentMethod === meth.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#1B5E45] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                      paymentMethod === meth.id 
                        ? `bg-[#1B5E45] text-white shadow-md` 
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {meth.icon}
                    </div>
                    <div className="text-left flex-1">
                      <p className={`text-sm font-bold transition-colors ${paymentMethod === meth.id ? "text-gray-900" : "text-gray-600"}`}>{meth.label}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{meth.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="border-t pt-8">
                {paymentMethod === "mpesa" && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-6 object-contain" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">M-Pesa Express</p>
                        <p className="text-xs text-gray-600 mt-0.5">STK push to your registered number</p>
                      </div>
                      <Badge text="Instant" type="success" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <input 
                          type="tel" 
                          placeholder="0712 345 678"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-semibold text-gray-900"
                        />
                      </div>
                      <p className="text-xs text-gray-600 flex items-center gap-2 mt-2">
                        <Info className="w-4 h-4 text-emerald-600" />
                        You'll receive an STK prompt to complete the payment
                      </p>
                    </div>
                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-base font-bold shadow-lg rounded-lg active:scale-[0.98] transition-all border-none flex items-center justify-center gap-2"
                    >
                      <span>Pay KSh {amount.toLocaleString()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">PCI-DSS Compliant</p>
                        <p className="text-xs text-gray-600 mt-0.5">Your card details are encrypted</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-mono text-gray-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Expiry</label>
                          <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 font-semibold" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">CVV</label>
                          <input type="password" placeholder="***" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 font-semibold" />
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-[#1B5E45] hover:bg-[#154a36] text-white py-4 text-base font-bold shadow-lg rounded-lg active:scale-[0.98] transition-all border-none flex items-center justify-center gap-2"
                    >
                      <span>Charge KSh {amount.toLocaleString()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-4">
                      <div className="space-y-3 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-gray-700" />
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm">Institutional Deposit</h4>
                            <p className="text-xs text-gray-600 font-mono mt-0.5">{refId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Bank</p>
                          <p className="font-bold text-gray-900">Equity Bank</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Account</p>
                          <p className="font-bold text-gray-900 font-mono">1234 5678</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Beneficiary</p>
                          <p className="font-bold text-gray-900">RentManager</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1B5E45] uppercase tracking-wider mb-1">Reference</p>
                          <p className="font-bold text-[#1B5E45] font-mono">{refId}</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-[#1B5E45] hover:bg-[#154a36] text-white py-4 text-base font-bold shadow-lg rounded-lg active:scale-[0.98] transition-all border-none flex items-center justify-center gap-2"
                    >
                      <span>Initiate Transfer</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center gap-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Secure Payment Methods</p>
              <div className="flex items-center justify-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-5 object-contain" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Cards" className="h-4 object-contain" />
                <div className="flex items-center gap-2 border-l pl-8 border-gray-300">
                  <Lock className="w-4 h-4 text-[#1B5E45]" />
                  <span className="text-xs font-bold text-[#1B5E45]">PCI-DSS Certified</span>
                </div>
              </div>
            </div>
        </div>

        {/* History Section */}
        <div className="pt-6 md:pt-8 lg:pt-10 mt-8 md:mt-10 lg:mt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                 <History className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Payment History</h3>
                <p className="text-xs md:text-sm text-gray-600 font-medium mt-0.5 md:mt-1">Complete transaction ledger and records</p>
              </div>
            </div>
            <button className="text-xs md:text-sm font-bold text-[#1B5E45] hover:text-[#154a36] transition-colors uppercase tracking-wider px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-[#E8F5EE]">Export (XLSX)</button>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left font-bold uppercase tracking-wider text-xs md:text-sm">ID</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left font-bold uppercase tracking-wider text-xs md:text-sm">Month</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left font-bold uppercase tracking-wider text-xs md:text-sm">Amount</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left font-bold uppercase tracking-wider text-xs md:text-sm">Status</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left font-bold uppercase tracking-wider text-xs md:text-sm">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tenantPayments.map((payment, i) => (
                    <tr key={payment.id} className={`transition-all hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-[#1B5E45] text-sm md:text-base">#PAY-{payment.id}</td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                           <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center text-[#1B5E45] flex-shrink-0">
                            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                           </div>
                           <span className="text-xs md:text-sm font-bold text-gray-900 uppercase">{payment.month}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-gray-900 text-sm md:text-base">KSh {payment.amount.toLocaleString()}</td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <Badge
                          text={payment.status === 'completed' ? 'Paid' : payment.status === 'pending' ? 'Pending' : 'Failed'}
                          type={
                            payment.status === 'completed'
                              ? 'success'
                              : payment.status === 'pending'
                              ? 'warning'
                              : 'error'
                          }
                        />
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-600 font-bold text-xs uppercase tracking-wider">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {tenantPayments.map((payment) => (
              <div key={payment.id} className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <History className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-75">Transaction ID</p>
                      <p className="text-sm font-bold">#PAY-{payment.id}</p>
                    </div>
                  </div>
                  <Badge
                    text={payment.status === 'completed' ? 'Paid' : payment.status === 'pending' ? 'Pending' : 'Failed'}
                    type={
                      payment.status === 'completed'
                        ? 'success'
                        : payment.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-[#1B5E45]" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Month</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 uppercase">{payment.month}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount Paid</span>
                      <span className="text-lg font-bold text-[#1B5E45]">KSh {payment.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</span>
                    <span className="text-xs font-bold text-gray-700">{payment.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
