"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import { User, Mail, Lock, Phone, ArrowLeft, CreditCard, Home, Building, Camera, PlusCircle, CheckCircle2 } from "lucide-react";
import { mockBuildings, mockUnits } from "@/data/mockData";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    idNumber: "",
    buildingId: "",
    unitId: "",
    profileImage: "",
    roomNumber: "",
  });
  const [role, setRole] = useState<"landlord" | "tenant">("landlord");
  const { login } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Filter vacant units for selected building
  const availableUnits = useMemo(() => {
    if (!formData.buildingId) return [];
    return mockUnits.filter(
      unit => unit.buildingId === formData.buildingId && unit.status === "vacant"
    );
  }, [formData.buildingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register - login with name and image
    login({ 
      role, 
      name: formData.name, 
      profileImage: formData.profileImage 
    });
  };

  const heroContent = {
    landlord: {
      title: "Designed for Landlords",
      description: "Comprehensive Property analytics and real-time income tracking. Manage your properties with precision.",
      features: [
        "Property Analytics",
        "Tenant Verification",
        "Maintenance Dashboard",
        "Real-time Tracking"
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    tenant: {
      title: "Built for Tenants",
      description: "Frictionless rent payments via M-Pesa and digital service requests. Find a home you'll love.",
      features: [
        "Easy M-Pesa Payments",
        "Service Requests",
        "Direct Support",
        "Living History"
      ],
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
    }
  };

  const activeHero = heroContent[role];

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Side: Form Container */}
      <div className="flex flex-col h-full overflow-y-auto px-6 py-12 lg:px-12">
        <div className="max-w-md w-full mx-auto">
          {/* Branding */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                RM
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">RentManager</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-6">
              Create an account
            </h1>
            <p className="text-gray-500 mt-2">
              Join RentManager to manage your properties today
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400 group-hover:bg-blue-50/30">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-300 group-hover:text-blue-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg shadow-lg">
                  <PlusCircle className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-3">Upload Photo</p>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("landlord")}
                className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                  role === "landlord"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Landlord
              </button>
              <button
                type="button"
                onClick={() => setRole("tenant")}
                className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                  role === "tenant"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Tenant
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30"
                />
              </div>
            </div>

            {/* ID Number - Only for Tenants */}
            {role === "tenant" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ID Number / Passport
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="idNumber"
                    placeholder="ID-12345678"
                    required={role === "tenant"}
                    value={formData.idNumber}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30"
                  />
                </div>
              </div>
            )}

            {/* Email and Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+254..."
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Building and Unit Selection - Only for Tenants */}
            {role === "tenant" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Building
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="buildingId"
                        required={role === "tenant"}
                        value={formData.buildingId}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30 text-sm appearance-none"
                      >
                        <option value="">Select Building</option>
                        {mockBuildings.map(b => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      House Type
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="unitId"
                        required={role === "tenant"}
                        disabled={!formData.buildingId}
                        value={formData.unitId}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30 text-sm appearance-none disabled:opacity-50"
                      >
                        <option value="">{formData.buildingId ? "Select Type" : "Pick Building First"}</option>
                        {availableUnits.map(u => (
                          <option key={u.id} value={u.id}>{u.type} (KSh {u.rent.toLocaleString()})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Room/House Number
                  </label>
                  <div className="relative">
                    <CheckCircle2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="roomNumber"
                      placeholder="e.g. A4, 102"
                      required={role === "tenant"}
                      value={formData.roomNumber}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30 text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50/30 text-sm"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 mt-2">
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700 font-bold"
            >
              Sign in
            </Link>
          </p>

          <Link
            href="/"
            className="flex items-center gap-2 justify-center mt-8 mb-12 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Right Side: Image & Content */}
      <div className="hidden lg:block relative overflow-hidden bg-blue-600">
        <img
          src={activeHero.image}
          alt="Modern Architectural Building"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-b from-blue-900/80 via-blue-900/20 to-transparent flex flex-col justify-center p-12">
          <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/20 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-4">{activeHero.title}</h2>
            <p className="text-blue-50/80 text-lg leading-relaxed">
              {activeHero.description}
            </p>
            <ul className="mt-8 space-y-3">
              {activeHero.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
