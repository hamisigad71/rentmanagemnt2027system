"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Building2, Users, TrendingUp, ArrowRight, CheckCircle2, 
  ShieldCheck, Zap, Globe, Heart, MessageSquare, CreditCard,
  Layers, Star, Smartphone, Briefcase,
  Home, Search, PlusCircle, Bell, User, Camera,
  Database,
  Shield, ChevronDown
} from "lucide-react";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { role, profileImage, userName } = useAuth();
  const [showDeveloper, setShowDeveloper] = useState(false);

  const getInitials = (name: string | null) => {
    if (!name) return "RM";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const profileLink = role === 'landlord' ? '/landlord/profile' : '/tenant/profile';

  return (
    <div className="min-h-screen font-sans" style={{ background: "var(--color-background)" }} suppressHydrationWarning>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b" style={{ borderColor: "var(--color-border-light)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group cursor-pointer shrink-0">
            <Logo size="sm" variant="full" className="md:scale-110" />
          </Link>
          
          <div className="hidden lg:flex items-center gap-12 text-[12px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--color-text-muted)" }}>
            <a href="#features" className="hover:text-[#1B5E45] transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1B5E45] transition-all group-hover:w-full" />
            </a>
            <a href="#solutions" className="hover:text-[#1B5E45] transition-colors relative group">
              Solutions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1B5E45] transition-all group-hover:w-full" />
            </a>
            <a href="#how-it-works" className="hover:text-[#1B5E45] transition-colors relative group">
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1B5E45] transition-all group-hover:w-full" />
            </a>
          </div>

          <div className="flex items-center gap-6" suppressHydrationWarning>
            {role ? (
              <Link href={profileLink} className="flex items-center gap-4 p-1.5 pr-5 bg-[#FAFAF8] rounded-full border border-[#E8E8E4] hover:bg-[#F4F4F0] transition-all group">
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-[#F4F4F0] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-white font-bold text-sm italic">
                      {getInitials(userName)}
                    </div>
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black leading-none" style={{ color: "var(--color-text-primary)" }}>{userName || "Account"}</p>
                  <p className="text-[9px] text-[#1B5E45] font-black uppercase tracking-widest mt-1 italic">Active Portal</p>
                </div>
              </Link>
            ) : (
              <>
                <Link href="/auth/register" className="whitespace-nowrap">
                  <Button variant="premium" className="h-10 sm:h-12 px-4 sm:px-8 rounded-full shadow-xl text-[10px] sm:text-xs">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Elite Architecture" 
            className="w-full h-full object-cover grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/90 to-[#1A1A1A]/40"></div>
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
          <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div 
                className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 md:mb-12"
                style={{ background: "rgba(61, 190, 122, 0.1)" }}
              >
                <Database className="w-3.5 h-3.5 text-[#3DBE7A]" />
                Premier Property Logic
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter mb-8 md:mb-10">
                <span className="text-white">PROPERTIES</span>
                <br />
                <span className="bg-gradient-to-r from-[#3DBE7A] to-[#2AE299] bg-clip-text text-transparent">PERFECTED</span>
              </h1>
              
              <p className="text-base md:text-lg text-white/60 mb-12 md:mb-14 leading-relaxed max-w-xl font-medium italic">
                The most sophisticated ecosystem designed for elite managers and high-profile tenants. Precision, security, and absolute clarity.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
                <Link href="/auth/login?role=landlord">
                  <Button className="bg-white text-[#1A1A1A] hover:bg-[#E8F5EE] px-6 sm:px-12 h-12 sm:h-20 rounded-[1.8rem] shadow-2xl text-sm sm:text-base font-black italic group border-none whitespace-nowrap w-full sm:w-auto">
                    Enter Property
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/auth/login?role=tenant" className="w-full sm:w-auto">
                  <span className="text-sm sm:text-[10px] font-black text-white uppercase tracking-[0.2em] sm:tracking-[0.4em] hover:text-[#3DBE7A] cursor-pointer transition-all border-b border-white/20 pb-1 whitespace-nowrap block text-center sm:text-left">Find Residence</span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-10 bg-[#3DBE7A]/20 rounded-full blur-[100px] animate-pulse" />
                
                <div className="relative bg-[#1A1A1A]/60 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl animate-float">
                  <div className="flex justify-between items-start mb-14">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <ShieldCheck className="w-10 h-10 text-[#3DBE7A]" />
                     </div>
                     <div className="text-right">
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Status</p>
                       <p className="text-md font-black text-white italic">Verified Secure</p>
                     </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-3/4 bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] shadow-[0_0_20px_rgba(61,190,122,0.5)]" />
                    </div>
                    <div className="flex justify-between items-end">
                       <p className="text-5xl font-black text-white tracking-tighter italic">98%</p>
                       <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] pb-2">Institutional Trust</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-10 -left-10 p-8 bg-white rounded-[2rem] border shadow-2xl hidden xl:block">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-[#3DBE7A] transform rotate-6">
                      <Zap className="w-7 h-7 fill-[#3DBE7A]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Response</p>
                      <p className="text-lg font-black text-[#1A1A1A] italic">&lt; 15 mins</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#1A1A1A] py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Active Units", val: "1,200+" },
              { label: "Collection Rate", val: "99.2%" },
              { label: "Response Time", val: "< 12h" },
              { label: "Trust Score", val: "4.9/5" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <p className="text-5xl md:text-6xl font-bold text-white tracking-tight">{stat.val}</p>
                <p className="text-[#3DBE7A] font-semibold text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Solutions for Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored platforms for property managers and tenants to streamline operations and enhance experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Landlords */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-[#1B5E45] rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Property Managers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive tools for managing properties, tracking payments, and maintaining tenant relationships.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Property and tenant management",
                  "Automated rent collection",
                  "Financial reporting and analytics"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#3DBE7A] flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/login?role=landlord">
                <Button className="bg-[#1B5E45] text-white hover:bg-[#246B4F] w-full h-12 rounded-lg text-sm font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Tenants */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-[#E8F5EE] rounded-lg flex items-center justify-center mb-6 border border-[#C4D4C9]">
                <Users className="w-6 h-6 text-[#1B5E45]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Tenants</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Easy-to-use platform for rent payments, maintenance requests, and landlord communication.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Secure online payments",
                  "Maintenance request tracking",
                  "Direct communication with landlords"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#3DBE7A] flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/login?role=tenant">
                <Button className="bg-[#1B5E45] text-white hover:bg-[#246B4F] w-full h-12 rounded-lg text-sm font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Property Management Dashboard" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Comprehensive Property Management
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our platform provides all the tools you need to manage properties efficiently and maintain strong tenant relationships.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: <Smartphone className="w-6 h-6" />, title: "Mobile Access", desc: "Manage your properties on-the-go with our responsive mobile interface." },
                  { icon: <Layers className="w-6 h-6" />, title: "Financial Management", desc: "Track payments, generate reports, and maintain accurate financial records." },
                  { icon: <Star className="w-6 h-6" />, title: "Trust & Transparency", desc: "Build trust through verified transactions and clear communication." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-[#1B5E45] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Join hundreds of property managers and tenants who trust our platform for their property management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button className="bg-[#3DBE7A] text-white hover:bg-[#2AE299] px-8 h-12 rounded-lg text-sm font-semibold">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+32}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span>500+ active users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t pt-20 md:pt-40 pb-12 md:pb-20 font-sans" style={{ borderColor: "var(--color-border-light)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 mb-16 md:mb-32">
            <div className="lg:col-span-5 space-y-8 md:space-y-12">
              <div className="flex items-center gap-4">
                <Logo size="md" variant="full" />
              </div>
              <p className="text-sm md:text-lg font-medium leading-relaxed max-w-sm" style={{ color: "var(--color-text-muted)" }}>
                Empowering the future of property management with elite technology.
              </p>
              <div className="flex gap-4 md:gap-6">
                <div className="w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-[#FAFAF8] flex items-center justify-center text-slate-300 hover:text-[#1B5E45] hover:border-[#3DBE7A] transition-all cursor-pointer border border-[#E8E8E4] shadow-sm">
                  <Globe className="w-5 md:w-6 h-5 md:h-6" />
                </div>
                <div className="w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-[#FAFAF8] flex items-center justify-center text-slate-300 hover:text-[#1B5E45] hover:border-[#3DBE7A] transition-all cursor-pointer border border-[#E8E8E4] shadow-sm">
                  <MessageSquare className="w-5 md:w-6 h-5 md:h-6" />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-3 gap-6 md:gap-16">
              {[
                { title: "Network", links: ["Features", "Solutions", "Pricing", "Security"] },
                { title: "Ecosystem", links: ["Help Center", "API Docs", "Status", "Resources"] },
                { title: "Protocol", links: ["About Us", "Our Blog", "Careers", "Contact"] }
              ].map((group, i) => (
                <div key={i} className="space-y-4 md:space-y-10">
                  <h5 className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--color-text-primary)" }}>{group.title}</h5>
                  <ul className="space-y-3 md:space-y-6">
                    {group.links.map((link, j) => (
                      <li key={j}><a href="#" className="font-bold text-xs md:text-sm hover:text-[#1B5E45] transition-colors" style={{ color: "var(--color-text-muted)" }}>{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-8 md:pt-16 border-t space-y-6 md:space-y-8" style={{ borderColor: "var(--color-border-light)" }}>
            {/* Top Row - Copyright & Legal */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]" style={{ color: "var(--color-text-muted)" }}>
                &copy; 2024 RentManager Protocol. All Rights Reserved.
              </p>
              <div className="flex items-center gap-8 md:gap-16">
                <a href="#" className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:text-[#1B5E45] transition-colors" style={{ color: "var(--color-text-muted)" }}>Privacy</a>
                <a href="#" className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:text-[#1B5E45] transition-colors" style={{ color: "var(--color-text-muted)" }}>Policy</a>
                <a href="#" className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:text-[#1B5E45] transition-colors" style={{ color: "var(--color-text-muted)" }}>Terms</a>
              </div>
            </div>

            {/* Developer Section - Collapsible */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
              {/* Developer Info - Toggleable */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDeveloper ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#1B5E45] to-[#3DBE7A] flex items-center justify-center shadow-lg shadow-[#1B5E45]/20">
                    <span className="text-white font-black text-xs md:text-sm">D</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--color-text-muted)" }}>Crafted by</p>
                    <p className="text-xs md:text-sm font-black" style={{ color: "var(--color-text-primary)" }}>Daysman Gad</p>
                  </div>
                </div>
              </div>
              
              {/* Status Badge & Toggle Button */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-slate-50" style={{ borderColor: "var(--color-border-light)" }}>
                  <div className="w-2 h-2 rounded-full bg-[#3DBE7A] animate-pulse" />
                  <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>Crafted with precision</span>
                </div>
                
                <button
                  onClick={() => setShowDeveloper(!showDeveloper)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:bg-slate-100 whitespace-nowrap"
                  style={{ borderColor: "var(--color-border-light)" }}
                  title={showDeveloper ? "Hide developer" : "Show developer"}
                >
                  <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--color-text-muted)" }}>
                    {showDeveloper ? 'Hide' : 'Show'}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showDeveloper ? 'rotate-180' : ''}`} style={{ color: "var(--color-text-muted)" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}

// Add these custom animations to globals.css if needed
// @keyframes animate-bounce-slow {
//   0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
//   50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
// }
