"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { 
  Mail, Phone, MapPin, Calendar, Save, Camera, X, 
  ShieldCheck, Building, Home, TrendingUp, Users, Briefcase,
  Lock, Bell, Globe
} from "lucide-react";
import { getLandlordStats } from "@/data/mockData";


export default function ProfilePage() {
    const { profileImage, displayImage, updateProfileImage, userName, updateUserName } = useAuth();
  const stats = getLandlordStats();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Split name if exists, otherwise defaults
  const [firstName, ...lastNameParts] = (userName || "John Proprietor").split(" ");
  const defaultLastName = lastNameParts.join(" ");

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: defaultLastName,
    email: "john.proprietor@email.com",
    phone: "+1 (555) 123-4567",
    address: "789 Landlord Avenue, Property City, PC 12345",
    company: "Proprietor Properties Inc.",
    role: "Senior Property Manager",
    website: "www.proprietorproperties.com"
  });

  const handleSave = () => {
    updateUserName(`${formData.firstName} ${formData.lastName}`);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <LandlordLayout>
      <div className="min-h-screen bg-slate-50 font-sans text-base">
        {/* Cinematic Cover Header */}
        <div className="h-72 relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Real Estate Cover" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-6xl px-8 flex justify-between items-end">
            <div className="hidden md:block">
              <h1 className="text-4xl font-medium text-white tracking-tight">Property Profile</h1>
              <p className="text-slate-200 mt-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#3DBE7A]" /> 
                {formData.company}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white">
                <span className="block text-xs font-medium uppercase tracking-wider text-slate-300">Member Since</span>
                <span className="text-sm font-medium">Jan 2022</span>
              </div>
              <div className="bg-[#E8F5EE]0/20 backdrop-blur-md border border-[#3DBE7A]/30 rounded-xl px-4 py-2 text-white/70">
                <span className="block text-xs font-medium uppercase tracking-wider text-white/60">Property Status</span>
                <span className="text-sm font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3DBE7A] animate-pulse"></span>
                  Elite Manager
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 pb-12 relative -mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Columns */}
            <div className="lg:col-span-4 space-y-6">
              {/* Profile Main Card */}
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8 text-center">
                  <div className="relative inline-block mb-6">
                    <div 
                      className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl bg-[#E8F5EE] overflow-hidden relative group cursor-pointer"
                      onClick={() => setShowAvatarModal(true)}
                    >
                      <img 
                        src={displayImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-medium text-slate-900">{formData.firstName} {formData.lastName}</h2>
                  <p className="text-[#1B5E45] font-medium text-sm mt-1">{formData.role}</p>
                  
                  <div className="flex justify-center gap-2 mt-4">
                    <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-medium border border-slate-100">Landlord</span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-100">Verified</span>
                  </div>

                </div>
              </div>

              {/* Advanced Stats Card */}
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">Property Snapshot</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <Building className="w-5 h-5 text-[#3DBE7A] mb-2" />
                    <p className="text-2xl font-medium text-slate-900">{stats.totalBuildings}</p>
                    <p className="text-xs font-medium text-slate-500">Buildings</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <Home className="w-5 h-5 text-purple-500 mb-2" />
                    <p className="text-2xl font-medium text-slate-900">{stats.totalUnits}</p>
                    <p className="text-xs font-medium text-slate-500">Total Units</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <Users className="w-5 h-5 text-green-500 mb-2" />
                    <p className="text-2xl font-medium text-slate-900">{stats.occupiedUnits}</p>
                    <p className="text-xs font-medium text-slate-500">Tenants</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <TrendingUp className="w-5 h-5 text-orange-500 mb-2" />
                    <p className="text-2xl font-medium text-slate-900">{(stats.occupiedUnits / stats.totalUnits * 100).toFixed(0)}%</p>
                    <p className="text-xs font-medium text-slate-500">Occupancy</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-2xl bg-[#1B5E45] text-white flex justify-between items-center shadow-lg shadow-[#1B5E45]/20">
                  <div>
                    <p className="text-xs font-medium text-white/70">Monthly Revenue</p>
                    <p className="text-xl font-medium">${stats.monthlyIncome.toLocaleString()}</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-white/50 opacity-50" />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Business Details Section */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 group/business">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 group-hover/business:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-medium text-slate-900 tracking-tighter uppercase">Corporate <span className="text-slate-400">Identity</span></h3>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Property Management Entity Protocol</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-1 h-3 bg-[#1B5E45] rounded-full" />
                       <label className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Entity Name</label>
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm tracking-tight ${
                        isEditing 
                          ? "bg-white border-slate-200 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/5 shadow-sm" 
                          : "bg-slate-50/50 border-transparent text-slate-900"
                      }`}
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-1 h-3 bg-[#1B5E45] rounded-full" />
                       <label className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Designation</label>
                    </div>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm tracking-tight ${
                        isEditing 
                          ? "bg-white border-slate-200 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/5 shadow-sm" 
                          : "bg-slate-50/50 border-transparent text-slate-900"
                      }`}
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2.5">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-1 h-3 bg-[#1B5E45] rounded-full" />
                       <label className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Headquarters</label>
                    </div>
                    <div className="relative group/input">
                      <MapPin className="absolute left-6 top-5 w-4 h-4 text-slate-400 group-focus-within/input:text-[#1B5E45] transition-colors" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={2}
                        className={`w-full pl-14 pr-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm tracking-tight resize-none ${
                          isEditing 
                            ? "bg-white border-slate-200 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/5 shadow-sm" 
                            : "bg-slate-50/50 border-transparent text-slate-900"
                        }`}
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-1 h-3 bg-[#1B5E45] rounded-full" />
                       <label className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Digital Hub</label>
                    </div>
                    <div className="relative group/input">
                      <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-[#1B5E45] transition-colors" />
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-14 pr-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm tracking-tight ${
                          isEditing 
                            ? "bg-white border-slate-200 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/5 shadow-sm" 
                            : "bg-slate-50/50 border-transparent text-slate-900"
                        }`}
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info Section */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 group/personal">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 group-hover/personal:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-medium text-slate-900 tracking-tighter uppercase">Personal <span className="text-slate-400">Ledger</span></h3>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Direct Contact & Identity Protocol</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-8">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-1 h-3 bg-[#1B5E45] rounded-full" />
                       <label className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Given Name</label>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm tracking-tight ${
                        isEditing 
                          ? "bg-white border-slate-200 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/5 shadow-sm" 
                          : "bg-slate-50/50 border-transparent text-slate-900"
                      }`}
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-1 h-3 bg-[#1B5E45] rounded-full" />
                       <label className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Family Name</label>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm tracking-tight ${
                        isEditing 
                          ? "bg-white border-slate-200 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/5 shadow-sm" 
                          : "bg-slate-50/50 border-transparent text-slate-900"
                      }`}
                    />
                  </div>
                  <div className="space-y-2.5 col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-1 h-3 bg-[#1B5E45] rounded-full" />
                       <label className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Digital Mailbox</label>
                    </div>
                    <div className="relative group/input">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-[#1B5E45] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-14 pr-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm tracking-tight ${
                          isEditing 
                            ? "bg-white border-slate-200 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/5 shadow-sm" 
                            : "bg-slate-50/50 border-transparent text-slate-900"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2.5 col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-1 h-3 bg-[#1B5E45] rounded-full" />
                       <label className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">Secure Line</label>
                    </div>
                    <div className="relative group/input">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-[#1B5E45] transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-14 pr-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm tracking-tight ${
                          isEditing 
                            ? "bg-white border-slate-200 focus:border-[#1B5E45] focus:ring-4 focus:ring-[#1B5E45]/5 shadow-sm" 
                            : "bg-slate-50/50 border-transparent text-slate-900"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-12 pt-10 border-t border-slate-100 flex justify-end gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="px-8 h-12 rounded-xl text-[10px] font-medium uppercase tracking-widest border-slate-200">Decline Changes</Button>
                    <Button onClick={handleSave} className="bg-slate-900 border-none text-white px-10 h-12 rounded-xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 text-[10px] font-medium uppercase tracking-widest">
                      <Save className="w-4 h-4 mr-2" />
                      Commit Data
                    </Button>
                  </div>
                )}
              </div>

              {/* Advanced Security & Preferences */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-xl border border-orange-100">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-slate-900">Security</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-sm">
                        <p className="font-medium text-slate-900">Password</p>
                        <p className="text-slate-500 text-xs">Updated 3 months ago</p>
                      </div>
                      <button className="text-xs font-medium text-[#1B5E45] hover:text-[#1B5E45]">Change</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-sm">
                        <p className="font-medium text-slate-900">2FA Auth</p>
                        <p className="text-red-500 text-xs font-medium">Not enabled</p>
                      </div>
                      <button className="text-xs font-medium text-[#1B5E45] hover:text-[#1B5E45]">Enable</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#E8F5EE] text-[#1B5E45] rounded-xl border border-[#C4D4C9]">
                      <Bell className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-slate-900">Preferences</h3>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Email Notifications</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B5E45]"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Marketing Mail</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B5E45]"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-black/20 transform animate-in zoom-in-95 duration-200 scale-100">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-slate-900">Property Identity</h3>
                <p className="text-xs text-slate-500 font-medium">Choose a professional appearance</p>
              </div>
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8">
              {/* File Upload Area */}
              <div className="mb-8">
                <label className="group block w-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-100 border-dashed rounded-2xl bg-slate-50 group-hover:bg-[#E8F5EE]/50 group-hover:border-[#3DBE7A] transition-all duration-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] text-[#1B5E45] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6" />
                      </div>
                      <p className="mb-1 text-sm font-medium text-slate-700 font-sans">Click to upload photo</p>
                      <p className="text-xs text-slate-500 font-medium font-sans">SVG, PNG, JPG (Max 5MB)</p>
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
                            updateProfileImage(reader.result as string);
                            setShowAvatarModal(false);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </label>
              </div>

              <div className="relative flex py-2 items-center mb-6 text-center">
                <p className="w-full text-slate-400 text-xs font-medium">Upload a custom picture or let the system generate one based on your name.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </LandlordLayout>
  );
}
