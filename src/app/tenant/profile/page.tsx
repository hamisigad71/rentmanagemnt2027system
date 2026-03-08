"use client";

import React, { useState } from "react";
import TenantLayout from "@/components/TenantLayout";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { Mail, Phone, Home, Calendar, Save, Camera, X, ShieldCheck, Clock, CreditCard, Star, ChevronRight } from "lucide-react";
import { mockTenants } from "@/data/mockData";

export default function TenantProfilePage() {
  const currentTenant = mockTenants[0];
  const { displayImage, updateProfileImage, userName, updateUserName } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [formData, setFormData] = useState({
    name: userName || currentTenant.name,
    email: currentTenant.email,
    phone: currentTenant.phone,
    emergencyContact: "Sarah Connor",
    emergencyPhone: "(555) 999-8888",
  });

  const handleSave = () => {
    updateUserName(formData.name);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <TenantLayout>
      <div className="min-h-screen font-sans" style={{ background: "var(--color-background)" }}>
        {/* Premium Cover Header */}
        <div className="h-60 md:h-80 relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop" 
            alt="Cover" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/90 via-[#1B5E45]/50 to-[#3DBE7A]/20 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-white/80 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 pb-12 md:pb-20 relative -mt-32 md:-mt-40">
          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl md:rounded-[3.5rem] shadow-lg md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100/50 overflow-hidden backdrop-blur-sm">
            <div className="p-6 md:p-8 lg:p-14">
              
              {/* Header: Avatar & Name */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start relative">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] xl:rounded-[3rem] border-3 md:border-4 lg:border-6 xl:border-8 border-white shadow-lg md:shadow-xl lg:shadow-2xl bg-[#E8F5EE] overflow-hidden relative group cursor-pointer" onClick={() => setShowAvatarModal(true)}>
                    <img 
                      src={displayImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E45]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <Camera className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white drop-shadow-2xl" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-[#3DBE7A] to-[#2AE299] rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center text-white border-2 md:border-3 lg:border-4 xl:border-4 border-white shadow-lg animate-pulse">
                    <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                  </div>
                </div>

                <div className="flex-1 pt-2 md:pt-4 w-full">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6">
                    <div>
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                        <span className="bg-[#E8F5EE] text-[#1B5E45] px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-medium uppercase tracking-wider border border-[#C4D4C9]">Premium Resident</span>
                        <div className="flex items-center gap-1 text-amber-500">
                           <Star className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 fill-current" />
                           <Star className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 fill-current" />
                           <Star className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 fill-current" />
                           <Star className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 fill-current" />
                           <Star className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 fill-current" />
                        </div>
                      </div>
                      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-tight" style={{ color: "var(--color-text-primary)" }}>{formData.name}</h1>
                      <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3 lg:mt-4 text-gray-500 font-medium">
                        <div className="p-1 md:p-1.5 lg:p-2 bg-[#F4F4F0] rounded-lg md:rounded-xl">
                          <Home className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#1B5E45]" />
                        </div>
                        <span className="text-sm md:text-base lg:text-lg">Unit {currentTenant.unitId} protocol</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 rounded-full font-medium text-xs md:text-sm lg:text-base shadow-lg transition-all ${
                        isEditing 
                          ? "bg-[#FAFAF8] border border-[#E8E8E4] text-[#1B5E45] hover:bg-white" 
                          : "bg-[#1B5E45] text-white hover:bg-[#154a36] border-none"
                      }`}
                    >
                      {isEditing ? "Discard Changes" : "Edit Profile"}
                    </Button>
                  </div>

                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-6 md:mt-8 lg:mt-10 auto-rows-fr">
                    {[
                      { label: "Nominal Rent", val: `KSh ${currentTenant.rent.toLocaleString()}`, icon: <CreditCard className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, highlight: false },
                      { label: "Lease Cycle", val: "Dec 2024", icon: <Clock className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, highlight: false },
                      { label: "Trust Score", val: "Elite", icon: <Star className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, highlight: true },
                      { label: "Initial Bond", val: "KSh 1,500", icon: <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />, highlight: false }
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className={`p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg flex flex-col justify-between transition-all hover:-translate-y-1 duration-300 md:min-h-38 md:min-w-48 md:h-full ${
                          stat.highlight
                            ? 'bg-gradient-to-br from-[#1B5E45] to-[#154a36] text-white border border-[#3DBE7A]/20 md:shadow-2xl md:scale-105' 
                            : 'bg-white text-gray-900 border border-gray-100 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex flex-col h-full justify-between">
                          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                            <div className={`p-1.5 md:p-2 lg:p-3 rounded-lg flex-shrink-0 ${stat.highlight ? 'bg-white/20' : 'bg-gradient-to-br from-[#E8F5EE] to-[#D4E8DD] text-[#1B5E45]'}`}>
                              {stat.icon}
                            </div>
                          </div>
                          <div>
                            <p className={`text-[9px] md:text-xs font-semibold md:font-medium mb-1 md:mb-2 ${
                              stat.highlight ? 'text-white/75' : 'text-gray-500'
                            }`}>{stat.label}</p>
                            <p className={`text-sm md:text-lg lg:text-2xl font-bold md:font-bold lg:font-black ${stat.highlight ? 'text-white' : 'text-gray-900'}`}>{stat.val}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full h-px my-8 sm:my-10 lg:my-14" style={{ background: "var(--color-border-light)" }}></div>

              {/* Information Form */}
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16">
                {/* Contact Info */}
                <div className="space-y-6 md:space-y-8 lg:space-y-10">
                  <div className="group/contact">
                    <div className="flex items-center gap-3 md:gap-4 lg:gap-5 mb-6 md:mb-8 lg:mb-10">
                      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-white shadow-2xl group-hover/contact:scale-110 transition-transform">
                        <Mail className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight" style={{ color: "var(--color-text-primary)" }}>Member <span className="text-[#1B5E45]">Ledger</span></h3>
                        <p className="text-[8px] md:text-[9px] lg:text-[10px] font-medium tracking-wide" style={{ color: "var(--color-text-muted)" }}>Digital identification routing</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 md:space-y-6 lg:space-y-8 pl-1">
                       {/* email */}
                       <div className="space-y-2 md:space-y-3">
                         <p className="text-[8px] md:text-[9px] lg:text-[10px] font-medium tracking-wide text-gray-500 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#3DBE7A] animate-pulse shadow-[0_0_10px_rgba(61,190,122,0.5)]" />
                           Verified Mailbox
                         </p>
                       {isEditing ? (
                         <input
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full border-2 bg-white border-[#1B5E45]/20 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/10 shadow-lg font-medium text-xs md:text-sm lg:text-base xl:text-md transition-all duration-300 hover:shadow-xl"
                         />
                       ) : (
                         <div className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-sm font-medium text-xs md:text-sm lg:text-base xl:text-md">
                           {formData.email}
                         </div>
                       )}
                       </div>
                       {/* phone */}
                       <div className="space-y-2 md:space-y-3">
                         <p className="text-[8px] md:text-[9px] lg:text-[10px] font-medium tracking-wide text-gray-500 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#3DBE7A] animate-pulse shadow-[0_0_10px_rgba(61,190,122,0.5)]" />
                           Encrypted Line
                         </p>
                       {isEditing ? (
                         <input
                           type="tel"
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full border-2 bg-white border-[#1B5E45]/20 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/10 shadow-lg font-medium text-xs md:text-sm lg:text-base xl:text-md transition-all duration-300 hover:shadow-xl"
                         />
                       ) : (
                         <div className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-sm font-medium text-xs md:text-sm lg:text-base xl:text-md">
                           {formData.phone}
                         </div>
                       )}
                       </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-6 md:space-y-8 lg:space-y-10">
                  <div className="group/emergency">
                    <div className="flex items-center gap-3 md:gap-4 lg:gap-5 mb-6 md:mb-8 lg:mb-10">
                      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-2xl group-hover/emergency:scale-110 transition-transform">
                        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight" style={{ color: "var(--color-text-primary)" }}>Fail-safe <span className="text-red-500">Contact</span></h3>
                        <p className="text-[8px] md:text-[9px] lg:text-[10px] font-medium tracking-wide" style={{ color: "var(--color-text-muted)" }}>Escalation intervention node</p>
                      </div>
                    </div>

                    <div className="space-y-4 md:space-y-6 lg:space-y-8 pl-1">
                       <div className="space-y-2 md:space-y-3">
                         <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            <label className="text-[8px] md:text-[9px] lg:text-[10px] font-medium tracking-wide" style={{ color: "var(--color-text-muted)" }}>Agent Identity</label>
                         </div>
                         {isEditing ? (
                           <input
                             type="text"
                             name="emergencyContact"
                             value={formData.emergencyContact}
                             onChange={handleChange}
                             className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full border-2 bg-white border-red-500/20 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 shadow-lg font-medium text-xs md:text-sm lg:text-base xl:text-md transition-all duration-300 hover:shadow-xl"
                           />
                         ) : (
                           <div className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full bg-gradient-to-r from-red-50/50 to-white border border-red-200/50 shadow-sm font-medium text-xs md:text-sm lg:text-base xl:text-md">
                             {formData.emergencyContact}
                           </div>
                         )}
                       </div>
                       <div className="space-y-2 md:space-y-3">
                         <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            <label className="text-[8px] md:text-[9px] lg:text-[10px] font-medium tracking-wide" style={{ color: "var(--color-text-muted)" }}>Access Hotline</label>
                         </div>
                         {isEditing ? (
                           <input
                             type="tel"
                             name="emergencyPhone"
                             value={formData.emergencyPhone}
                             onChange={handleChange}
                             className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full border-2 bg-white border-red-500/20 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 shadow-lg font-medium text-xs md:text-sm lg:text-base xl:text-md transition-all duration-300 hover:shadow-xl"
                           />
                         ) : (
                           <div className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full bg-gradient-to-r from-red-50/50 to-white border border-red-200/50 shadow-sm font-medium text-xs md:text-sm lg:text-base xl:text-md">
                             {formData.emergencyPhone}
                           </div>
                         )}
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-16 pt-4 md:pt-6 lg:pt-8 xl:pt-10 border-t border-gray-100 flex justify-end gap-3 md:gap-4 lg:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <Button variant="secondary" onClick={() => setIsEditing(false)} className="px-4 md:px-6 lg:px-8 xl:px-10 h-8 md:h-10 lg:h-12 xl:h-16 rounded-full font-medium text-xs md:text-sm lg:text-base xl:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300">Discard</Button>
                  <Button onClick={handleSave} className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#3DBE7A] px-6 md:px-8 lg:px-10 xl:px-12 h-8 md:h-10 lg:h-12 xl:h-16 rounded-full font-medium text-xs md:text-sm lg:text-base xl:text-lg shadow-2xl hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 border-none">
                    <Save className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-1 md:mr-2 lg:mr-3" />
                    Apply Protocol
                  </Button>
                </div>
              )}
            </div>
            
            {/* Banner Footer */}
            {!isEditing && (
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] px-4 md:px-8 lg:px-10 xl:px-14 py-6 md:py-8 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 md:p-8 lg:p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                  <Star className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 text-white" />
                </div>
                
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4 text-white/60 text-xs md:text-sm font-black relative z-10">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#3DBE7A]" />
                  <span>Verified since October 2023</span>
                </div>
                
                <div className="text-center md:text-right relative z-10">
                  <p className="text-[8px] md:text-[9px] lg:text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1 md:mb-2">Protocol Status</p>
                  <div className="flex items-center gap-2 md:gap-3 bg-white/10 px-3 md:px-4 lg:px-6 py-1 md:py-2 rounded-full border border-white/20 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-[#3DBE7A] animate-pulse shadow-[0_0_15px_rgba(61,190,122,0.5)]"></span>
                    <span className="text-sm md:text-base lg:text-md font-black text-[#3DBE7A]">Active & Compliant</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 md:mt-8 lg:mt-10 xl:mt-12 flex flex-col md:flex-row justify-center gap-3 md:gap-4 lg:gap-6">
            <button className="flex items-center gap-1 md:gap-2 text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#1B5E45] transition-all duration-300 hover:scale-105">
              Download Lease Agreement (PDF)
              <ChevronRight className="w-2 h-2 md:w-3 md:h-3" />
            </button>
            <span className="hidden md:block text-gray-300">|</span>
            <button className="flex items-center gap-1 md:gap-2 text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-105">
              Inactivate Account Portal
              <ChevronRight className="w-2 h-2 md:w-3 md:h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Modern Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-[#1A1A1A]/80 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] w-full max-w-sm md:max-w-md lg:max-w-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] transform animate-in zoom-in-95 duration-300">
            <div className="p-6 md:p-8 lg:p-10 border-b flex items-center justify-between" style={{ borderColor: "var(--color-border-light)" }}>
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter text-[#1A1A1A]">Update Identity</h3>
                <p className="text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-gray-400">Capture new visual identifier</p>
              </div>
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-[#FAFAF8] text-[#1A1A1A] flex items-center justify-center hover:bg-[#E8E8E4] transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
            <div className="p-8 md:p-10 lg:p-12">
              {/* File Upload Area */}
              <div className="mb-6 md:mb-8 lg:mb-10">
                <label className="group block w-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center w-full h-40 md:h-48 lg:h-56 border-2 border-[#E8F5EE] border-dashed rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] bg-[#FAFAF8] group-hover:bg-[#E8F5EE]/30 group-hover:border-[#3DBE7A] transition-all duration-500">
                    <div className="flex flex-col items-center justify-center pt-3 md:pt-4 lg:pt-5 pb-4 md:pb-5 lg:pb-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl lg:rounded-3xl bg-[#E8F5EE] text-[#1B5E45] flex items-center justify-center mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 group-hover:bg-[#1B5E45] group-hover:text-white transition-all duration-500">
                        <Camera className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                      </div>
                      <p className="mb-1 md:mb-2 text-sm md:text-base lg:text-xl font-black text-[#1A1A1A]">Inject Custom Capture</p>
                      <p className="text-[8px] md:text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">SVG, PNG, JPG (MAX 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64String = reader.result as string;
                            updateProfileImage(base64String);
                            setShowAvatarModal(false);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </label>
              </div>

              <div className="text-center">
                <p className="text-[8px] md:text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose max-w-xs mx-auto">
                  Visual updates are verified across the rental ecosystem protocol. Identification must be current.
                </p>
              </div>
            </div>
            <div className="p-4 md:p-6 lg:p-8 bg-[#1A1A1A] text-center">
               <button onClick={() => setShowAvatarModal(false)} className="text-[#3DBE7A] text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform">
                 Return to Portal
               </button>
            </div>
          </div>
        </div>
      )}
    </TenantLayout>
  );
}
