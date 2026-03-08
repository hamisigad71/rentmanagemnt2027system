"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { Mail, Lock, ArrowLeft, Github } from "lucide-react";

function LoginForm({ onRoleChange }: { onRoleChange: (role: "landlord" | "tenant") => void }) {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "tenant" ? "tenant" : "landlord";
  
  const [role, setRoleState] = useState<"landlord" | "tenant">(initialRole);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ role });
  };

  const setRole = (newRole: "landlord" | "tenant") => {
    setRoleState(newRole);
    onRoleChange(newRole);
  };

  return (
    <div className="flex flex-col w-full max-w-md px-4 sm:px-0">
      {/* Branding */}
      <div className="mb-10 w-full">
        <div className="flex flex-col items-start gap-4">
          <Logo size="lg" variant="full" className="transform -ml-2" />
        </div>
        <div className="mt-8 space-y-2">
          <h1 className="text-4xl font-black text-[#0B241B] tracking-tight">
            Secure Access
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Synchronize with your property management nexus.
          </p>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
            />
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
        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setRole("landlord")}
            className={`py-2 rounded-lg text-sm font-semibold transition-all ${
              role === "landlord"
                ? "bg-white text-[#1B5E45] shadow-sm"
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
                ? "bg-white text-[#1B5E45] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Tenant
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B5E45]/20 focus:border-[#1B5E45] transition-all bg-gray-50/30"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link href="#" className="text-sm font-semibold text-[#1B5E45] hover:text-[#246B4F]">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B5E45]/20 focus:border-[#1B5E45] transition-all bg-gray-50/30"
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full bg-[#1B5E45] hover:bg-[#246B4F] text-white py-3 rounded-xl font-bold shadow-lg shadow-[#1B5E45]/20 mt-2">
          Sign in
        </Button>
      </form>

      <p className="mt-8 text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="text-[#1B5E45] hover:text-[#246B4F] font-bold"
        >
          Sign up
        </Link>
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 justify-center mt-8 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}

function HeroSection({ role }: { role: "landlord" | "tenant" }) {
  const heroContent = {
    landlord: {
      title: "Designed for Landlords",
      description: "Manage your Property with precision. Comprehensive analytics and real-time income tracking.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    tenant: {
      title: "Built for Tenants",
      description: "Frictionless rent payments and digital service requests. RentManager makes renting simple.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
    }
  };

  const activeHero = heroContent[role];

  return (
    <div className="hidden lg:block relative overflow-hidden bg-[#1A1A1A]">
      <img
        src={activeHero.image}
        alt="Hero Image"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1B5E45]/40 to-transparent flex flex-col justify-center p-12">
        <div className="backdrop-blur-md bg-white/5 p-10 rounded-[2.5rem] border border-white/10 text-white max-w-lg shadow-2xl">
          <h2 className="text-4xl font-black italic mb-4">{activeHero.title}</h2>
          <p className="text-white/70 text-lg font-medium leading-relaxed">
            {activeHero.description}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#E8F5EE] flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">Joined by 2,000+ users this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "tenant" ? "tenant" : "landlord";
  const [role, setRole] = useState<"landlord" | "tenant">(initialRole);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Side: Form */}
      <div className="flex flex-col items-center justify-center py-12 px-6 lg:px-8">
        <LoginForm onRoleChange={(newRole) => setRole(newRole)} />
      </div>

      <HeroSection role={role} />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DBE7A]"></div></div>}>
      <LoginContent />
    </Suspense>
  );
}
