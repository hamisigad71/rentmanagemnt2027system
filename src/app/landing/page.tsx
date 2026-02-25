"use client";

import Link from "next/link";
import { 
  Building2, Users, TrendingUp, ArrowRight, CheckCircle2, 
  ShieldCheck, Zap, Globe, Heart, MessageSquare, CreditCard,
  Layers, Star, Smartphone, Briefcase,
  Home, Search, PlusCircle, Bell, User, Camera
} from "lucide-react";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { role, profileImage, userName } = useAuth();

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
    <div className="min-h-screen bg-[#fdfdfd] font-sans selection:bg-blue-100" suppressHydrationWarning>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-slate-900/10 group-hover:scale-105 transition-all duration-500 transform rotate-3">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-slate-900 tracking-tighter leading-none">RentManager</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Ecosystem</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[13px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-slate-900 transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </a>
            <a href="#solutions" className="hover:text-slate-900 transition-colors relative group">
              Solutions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors relative group">
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </a>
          </div>

          <div className="flex items-center gap-6" suppressHydrationWarning>
            {role ? (
              <Link href={profileLink} className="flex items-center gap-4 p-1.5 pr-5 bg-slate-50 rounded-full border border-slate-200 hover:bg-slate-100 transition-all group">
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(userName)}
                    </div>
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black text-slate-900 leading-none">{userName || "Account"}</p>
                  <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest mt-1">Dashboard</p>
                </div>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <span className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors px-4">Log In</span>
                </Link>
                <Link href="/auth/register">
                  <Button variant="premium" size="lg" className="shadow-2xl shadow-slate-900/10 hidden sm:flex">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Unique Cinematic Architectural Concept */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Full-Bleed Background with Architectural Depth */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Elite Architecture" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/80 to-slate-900/20"></div>
          
          {/* Subtle Grain/Texture for Professional Print Look */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
          <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
            {/* Content Left */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.4em] text-white mb-12">
                Premier Property Logic
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
                LIVING <br />
                <span className="text-slate-400">DEFINED.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-14 leading-relaxed max-w-xl font-medium">
                The most sophisticated ecosystem designed for elite managers and high-profile tenants. Precision, security, and absolute clarity.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 items-center">
                <Link href="/auth/login?role=landlord">
                  <Button variant="premium" size="xl" className="bg-white text-slate-950 hover:bg-slate-50 px-12 h-20 rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] group">
                    Enter Property
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="hidden sm:block w-px h-16 bg-white/10 mx-2" />
                <Link href="/auth/login?role=tenant">
                  <span className="text-sm font-black text-white uppercase tracking-[0.3em] hover:text-blue-400 cursor-pointer transition-colors">Find Residence</span>
                </Link>
              </div>
            </div>

            {/* Visual Right - Editorial Style */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-10 bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
                
                {/* Floating Architectural Card */}
                <div className="relative glass-panel-dark bg-slate-900/40 p-10 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-3xl animate-float">
                  <div className="flex justify-between items-start mb-12">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <ShieldCheck className="w-8 h-8 text-blue-400" />
                     </div>
                     <div className="text-right">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                       <p className="text-sm font-black text-white">Verified Secure</p>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-3/4 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                    </div>
                    <div className="flex justify-between items-end">
                       <p className="text-4xl font-black text-white tracking-tighter">98%</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-2">Institutional Trust</p>
                    </div>
                  </div>
                </div>

                {/* Micro Overlay */}
                <div className="absolute -bottom-12 -left-12 p-6 glass-panel rounded-3xl border border-white shadow-2xl hidden xl:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Response</p>
                      <p className="text-base font-black text-slate-950">&lt; 15 mins</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-30">
           <div className="w-px h-12 bg-white" />
           <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] vertical-rl">Scroll</span>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 text-center">
            <div className="space-y-4">
              <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">1,200+</p>
              <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Active Units</p>
            </div>
            <div className="space-y-4">
              <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">99.2%</p>
              <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Collection Rate</p>
            </div>
            <div className="space-y-4">
              <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">&lt; 12h</p>
              <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Response Time</p>
            </div>
            <div className="space-y-4">
              <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">4.9/5</p>
              <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Trust Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-24 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-1 bg-blue-600 rounded-full" />
            <span className="text-xs font-black text-blue-600 uppercase tracking-[0.4em]">The Ecosystem</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-none max-w-2xl">
            Tailored for <br />
            <span className="text-slate-400">absolute success.</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10">
          {/* For Landlords - Dark Premium */}
          <div className="group relative bg-slate-950 rounded-[3rem] p-12 md:p-16 overflow-hidden text-white transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Building2 className="w-80 h-80 rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-12 shadow-2xl shadow-blue-500/20">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black mb-8 tracking-tight">Enterprise <br />Landlord Suite</h3>
              <ul className="space-y-6 mb-16">
                 {[
                   "Institutional grade analytics",
                   "Automated tenant verification",
                   "Real-time yield optimization"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-5 text-slate-400 font-bold group-hover:text-white transition-colors">
                     <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center">
                       <div className="w-2 h-2 bg-blue-600 rounded-full" />
                     </div>
                     <span className="text-sm uppercase tracking-widest">{item}</span>
                   </li>
                 ))}
              </ul>
              <Link href="/auth/login?role=landlord" suppressHydrationWarning>
                <Button variant="premium" size="xl" className="bg-white text-slate-900 hover:bg-slate-50 border-none w-full sm:w-auto">
                   Explore Enterprise
                </Button>
              </Link>
            </div>
          </div>

          {/* For Tenants - Light Premium */}
          <div className="group relative bg-white rounded-[3rem] p-12 md:p-16 overflow-hidden border-2 border-slate-50 shadow-2xl shadow-slate-200/40 transition-all duration-700 hover:border-blue-100">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <Users className="w-80 h-80 -rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-12 shadow-2xl shadow-slate-900/10">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Modern <br />Tenant Portal</h3>
              <ul className="space-y-6 mb-16">
                {[
                  "One-click M-Pesa payments",
                  "Verified property network",
                  "Digital service requests"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-5 text-slate-500 font-bold group-hover:text-slate-900 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    </div>
                    <span className="text-sm uppercase tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/login?role=tenant" suppressHydrationWarning>
                <Button variant="premium" size="xl" className="w-full sm:w-auto">
                  Find Your Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Features Section */}
      <section id="features" className="py-32 bg-[#fdfdfd] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative group">
              <div className="absolute -inset-10 bg-blue-100 rounded-full blur-[120px] opacity-30 group-hover:opacity-50 transition-opacity" />
              <img 
                src="https://i.pinimg.com/1200x/30/41/e3/3041e3ba6138fbbe2b8e00545e6c1b5f.jpg" 
                alt="Management App Interface" 
                className="relative rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-white transform -rotate-2 hover:rotate-0 transition-all duration-1000"
              />
            </div>
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                  Management, <br />
                  <span className="text-blue-600">reimagined.</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                  We've stripped away the complexity of traditional systems to give you a powerful, architectural control center.
                </p>
              </div>

              <div className="grid gap-8">
                {[
                  { icon: <Smartphone />, title: "Mobile Control", desc: "Manage everything from your pocket with our elite mobile experience." },
                  { icon: <Layers />, title: "Precision Accounting", desc: "Automated ledgers and tax-ready reports with institutional accuracy." },
                  { icon: <Star />, title: "Reputation Engine", desc: "Build a verified history of excellence as a landlord or tenant." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-14 h-14 shrink-0 glass-panel flex items-center justify-center rounded-2xl text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-xl font-black text-slate-900 leading-none">{item.title}</h4>
                       <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Cinematic CTA */}
      <section className="pb-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[4rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative bg-slate-950 rounded-[4rem] overflow-hidden min-h-[600px] flex items-center">
            {/* Background Visual */}
            <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-110 transition-transform duration-[5000ms]" alt="Office Building" />
               <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            <div className="relative z-10 p-12 md:p-24 max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8">
                Join the Elite
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[0.95] tracking-tighter">
                Scale your <br />
                <span className="text-blue-500">empire</span> today.
              </h2>
              <p className="text-xl text-slate-400 mb-12 font-medium max-w-lg leading-relaxed">
                Join 500+ elite property managers who have already simplified their lifestyle with RentManager.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/auth/register">
                  <Button variant="premium" size="xl" className="bg-white text-slate-950 hover:bg-slate-50 border-none group px-12">
                    Start Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 glass-panel-dark rounded-[24px] border border-white/10">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-widest">Active Members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refined Footer */}
      <footer className="bg-white border-t border-slate-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black">RM</div>
                <span className="font-black text-2xl text-slate-900 tracking-tighter">RentManager</span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                Empowering the future of property management with elite technology and seamless digital experiences.
              </p>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer border border-slate-100">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer border border-slate-100">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
              {[
                { title: "Platform", links: ["Features", "Solutions", "Pricing", "Security"] },
                { title: "Support", links: ["Help Center", "API Docs", "System Status", "Resources"] },
                { title: "Company", links: ["About Us", "Our Blog", "Careers", "Contact"] }
              ].map((group, i) => (
                <div key={i} className="space-y-8">
                  <h5 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em]">{group.title}</h5>
                  <ul className="space-y-4">
                    {group.links.map((link, j) => (
                      <li key={j}><a href="#" className="text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              &copy; 2024 RentManager Ecosystem. All Rights Reserved.
            </p>
            <div className="flex items-center gap-10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-blue-600 cursor-pointer">Privacy Policy</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-blue-600 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Nav Mockup */}
      <div className="md:hidden fixed bottom-10 left-6 right-6 z-50">
        <div className="glass-panel bg-white/80 p-3 rounded-[2.5rem] shadow-2xl flex items-center justify-around">
          <button className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg"><Home /></button>
          <button className="w-12 h-12 text-slate-400"><Search /></button>
          <button className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl -mt-10"><PlusCircle /></button>
          <button className="w-12 h-12 text-slate-400"><Bell /></button>
          <button className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
        </div>
      </div>
    </div>
  );
}

// Add these custom animations to globals.css if needed
// @keyframes animate-bounce-slow {
//   0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
//   50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
// }
