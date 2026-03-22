"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Building2, Users, TrendingUp, ArrowRight, CheckCircle2,
  ShieldCheck, Zap, Globe, Heart, MessageSquare, CreditCard,
  Layers, Star, Smartphone, Briefcase,
  Home, Search, PlusCircle, Bell, User, Camera,
  Database,
  Shield, ChevronDown, ChevronUp, ArrowUpRight, Play, Code
} from "lucide-react";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
 
// ─── Fade-up reveal wrapper ───────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const p = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  const { role, profileImage, userName } = useAuth();
  const [creatorOpen, setCreatorOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getInitials = (name: string | null) => {
    if (!name) return "RM";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const profileLink = role === "landlord" ? "/landlord/profile" : "/tenant/profile";

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "var(--color-background)" }} suppressHydrationWarning>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <motion.nav
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: navScrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(24px)",
          borderBottom: navScrolled ? "1px solid rgba(27,94,69,0.12)" : "1px solid transparent",
          boxShadow: navScrolled ? "0 4px 32px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 shrink-0">
            <Logo size="sm" variant="full" className="md:scale-105" />
          </Link>

          <div
            className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.22em]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {["Features", "Solutions", "How it Works"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="relative group hover:text-[#1B5E45] transition-colors duration-200"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#1B5E45] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4" suppressHydrationWarning>
            {role ? (
              <Link
                href={profileLink}
                className="flex items-center gap-3 p-1.5 pr-5 rounded-full border border-[#E8E8E4] bg-[#FAFAF8] hover:bg-[#F4F4F0] transition-all"
              >
                <div className="w-9 h-9 rounded-full border-2 border-white shadow overflow-hidden bg-[#F4F4F0] flex items-center justify-center">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-white font-bold text-xs italic">
                      {getInitials(userName)}
                    </div>
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-black leading-none" style={{ color: "var(--color-text-primary)" }}>{userName || "Account"}</p>
                  <p className="text-[8px] text-[#1B5E45] font-black uppercase tracking-widest mt-0.5 italic">Active Portal</p>
                </div>
              </Link>
            ) : (
              <Link href="/auth/register">
                <Button variant="premium" className="h-10 px-6 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[50vh] md:min-h-[95vh] flex items-center overflow-hidden">
        {/* Parallax BG */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Architecture"
            className="w-full h-[115%] object-cover"
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/85 to-[#0D0D0D]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent" />
        </motion.div>

        {/* Floating grid lines */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0 border-l"
              style={{
                left: `${(i + 1) * 16.666}%`,
                borderColor: "rgba(255,255,255,0.03)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
            />
          ))}
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full py-6 md:py-24"
          style={{ opacity: heroOpacity }}
        >
          <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
            {/* Left copy */}
            <div className="lg:col-span-7 space-y-4 md:space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 text-[9px] font-black uppercase tracking-[0.38em] text-white"
                style={{ background: "rgba(61,190,122,0.12)", backdropFilter: "blur(12px)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                Premier Property Intelligence
              </motion.div>

              {/* Headline */}
              <div className="space-y-1 overflow-hidden">
                {["PROPERTIES", "PERFECTED"].map((word, i) => (
                  <motion.div
                    key={word}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <h1
                      className={`text-4xl md:text-8xl font-black leading-[0.88] tracking-tighter ${
                        i === 1
                          ? "bg-gradient-to-r from-[#3DBE7A] to-[#2AE299] bg-clip-text text-transparent"
                          : "text-white"
                      }`}
                    >
                      {word}
                    </h1>
                  </motion.div>
                ))}
              </div>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
                className="text-sm md:text-lg text-white/55 leading-relaxed max-w-lg font-medium italic"
              >
                The most sophisticated ecosystem for elite property managers and high-profile tenants. Precision, security, and absolute clarity.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
                className="flex flex-row flex-wrap gap-2 md:gap-4 items-center"
              >
                <Link href="/auth/login?role=landlord">
                  <button className="group flex items-center gap-2 md:gap-3 bg-white text-[#1A1A1A] hover:bg-[#E8F5EE] px-4 md:px-8 h-12 md:h-14 rounded-2xl shadow-2xl text-[11px] md:text-sm font-black italic transition-all duration-300 hover:shadow-[0_20px_60px_rgba(61,190,122,0.3)] hover:-translate-y-0.5 whitespace-nowrap">
                    Enter Property Portal
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/auth/login?role=tenant">
                  <button className="flex items-center gap-2 md:gap-3 h-12 md:h-14 px-4 md:px-8 rounded-2xl border border-white/20 text-white text-[11px] md:text-sm font-black italic hover:bg-white/10 transition-all duration-300 whitespace-nowrap" style={{ backdropFilter: "blur(8px)" }}>
                    Find Your Residence
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </Link>
              </motion.div>

              {/* Social proof row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex items-center gap-5 pt-2"
              >
                <div className="flex -space-x-2.5">
                  {[33, 34, 35, 36].map((n) => (
                    <div key={n} className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden ring-1 ring-black/5">
                      <img src={`https://i.pravatar.cc/80?img=${n}`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#3DBE7A] text-[#3DBE7A]" />
                    ))}
                  </div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-0.5">500+ Active Users</p>
                </div>
              </motion.div>
            </div>

            {/* Right card panel */}
            <div className="hidden lg:block lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Glow */}
                <div className="absolute -inset-12 bg-[#3DBE7A]/15 rounded-full blur-[80px]" />

                {/* Main card */}
                <div
                  className="relative rounded-[2.5rem] p-10 border border-white/10"
                  style={{
                    background: "rgba(20,20,20,0.65)",
                    backdropFilter: "blur(32px)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Card header */}
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1B5E45]/30 flex items-center justify-center border border-[#3DBE7A]/20">
                        <ShieldCheck className="w-5 h-5 text-[#3DBE7A]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Platform Status</p>
                        <p className="text-xs font-black text-white italic">Verified Secure</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3DBE7A]/10 border border-[#3DBE7A]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                      <span className="text-[8px] font-black text-[#3DBE7A] uppercase tracking-widest">Live</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-6 mb-10">
                    <div>
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Collection Rate</span>
                        <span className="text-[9px] font-black text-[#3DBE7A]">99.2%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "99.2%" }}
                          transition={{ delay: 1, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #1B5E45, #3DBE7A)" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Occupancy</span>
                        <span className="text-[9px] font-black text-[#3DBE7A]">94%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "94%" }}
                          transition={{ delay: 1.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #1B5E45, #3DBE7A)" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Big stat */}
                  <div className="flex items-end justify-between border-t border-white/5 pt-8">
                    <div>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Trust Score</p>
                      <p className="text-6xl font-black text-white tracking-tighter italic leading-none">98<span className="text-[#3DBE7A]">%</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Active Units</p>
                      <p className="text-2xl font-black text-white/60 italic">1,200+</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-8 -left-8 bg-white rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-4 border border-[#E8E8E4]"
                >
                  <div className="w-10 h-10 bg-[#1B5E45] rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 fill-[#3DBE7A] text-[#3DBE7A]" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Response Time</p>
                    <p className="text-sm font-black text-[#1A1A1A] italic">{"< 15 mins"}</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#0F0F0F" }}>
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DBE7A]/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { val: 1200, suffix: "+", label: "Active Units" },
              { val: 99, suffix: ".2%", label: "Collection Rate" },
              { val: 12, suffix: "h", label: "Avg Response" },
              { val: 49, suffix: "/5", label: "Trust Score" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08} className="flex flex-col items-center text-center">
                <p className="text-5xl md:text-6xl font-black text-white tracking-tight tabular-nums">
                  <Counter to={stat.val} suffix={stat.suffix} />
                </p>
                <div className="w-8 h-px bg-[#3DBE7A]/40 my-3" />
                <p className="text-[9px] font-black text-[#3DBE7A] uppercase tracking-[0.35em]">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* ── SOLUTIONS ───────────────────────────────────────────────────────── */}
      <section id="solutions" className="py-28 bg-[#F7F8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-20">
            <p className="text-[9px] font-black uppercase tracking-[0.42em] text-[#3DBE7A] mb-4">Dual Platform</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter mb-5">
              Solutions for Everyone
            </h2>
            <div className="w-12 h-px bg-[#1B5E45]/30 mx-auto mb-6" />
            <p className="text-base text-[#6B7280] max-w-xl mx-auto leading-relaxed">
              Tailored platforms for property managers and tenants to streamline operations and enhance every experience.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Landlord card */}
            <Reveal delay={0.1}>
              <div className="group relative bg-white rounded-[2rem] p-10 border border-[#E8E8E4] hover:border-[#1B5E45]/30 transition-all duration-500 hover:shadow-[0_24px_64px_rgba(27,94,69,0.12)] overflow-hidden">
                {/* BG accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8F5EE] rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 translate-x-12 -translate-y-12" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#1B5E45] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#1B5E45]/20 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>

                  <p className="text-[8px] font-black text-[#3DBE7A] uppercase tracking-[0.38em] mb-2">For Managers</p>
                  <h3 className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight mb-4">Property Managers</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-8">
                    Comprehensive tools for managing properties, tracking payments, and maintaining tenant relationships at scale.
                  </p>

                  <ul className="space-y-3 mb-10">
                    {["Property and tenant management", "Automated rent collection", "Financial reporting & analytics"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#374151]">
                        <div className="w-5 h-5 rounded-full bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1B5E45]" strokeWidth={2} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link href="/auth/login?role=landlord">
                    <button className="group/btn flex items-center gap-2 bg-[#1B5E45] text-white px-6 h-12 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#246B4F] transition-all duration-300 hover:shadow-lg hover:shadow-[#1B5E45]/25 hover:-translate-y-0.5">
                      Enter Portal
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Tenant card */}
            <Reveal delay={0.2}>
              <div className="group relative bg-[#1A1A1A] rounded-[2rem] p-10 border border-white/5 hover:border-[#3DBE7A]/20 transition-all duration-500 hover:shadow-[0_24px_64px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3DBE7A]/8 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-16 -translate-y-16" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-[#3DBE7A]/30 group-hover:scale-110 transition-transform duration-300" style={{ background: "rgba(61,190,122,0.1)" }}>
                    <Users className="w-6 h-6 text-[#3DBE7A]" strokeWidth={1.5} />
                  </div>

                  <p className="text-[8px] font-black text-[#3DBE7A] uppercase tracking-[0.38em] mb-2">For Residents</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">Tenants</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-8">
                    Easy-to-use platform for rent payments, maintenance requests, and seamless communication with your landlord.
                  </p>

                  <ul className="space-y-3 mb-10">
                    {["Secure online payments", "Maintenance request tracking", "Direct communication tools"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border border-[#3DBE7A]/30" style={{ background: "rgba(61,190,122,0.1)" }}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3DBE7A]" strokeWidth={2} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link href="/auth/login?role=tenant">
                    <button className="group/btn flex items-center gap-2 bg-white/8 border border-white/10 text-white px-6 h-12 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5">
                      Find Residence
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <Reveal className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Dashboard"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 via-transparent to-transparent" />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 flex items-center gap-4 border border-white/50 shadow-xl">
                    <div className="w-10 h-10 bg-[#1B5E45] rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-[#6B7280] uppercase tracking-widest">Revenue Growth</p>
                      <p className="text-base font-black text-[#1A1A1A] italic">+24% this quarter</p>
                    </div>
                    <div className="ml-auto text-[#3DBE7A]">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Features list */}
            <div className="space-y-12 mt-12 lg:mt-0">
              <Reveal>
                <p className="text-[9px] font-black uppercase tracking-[0.42em] text-[#3DBE7A] mb-3">Platform Power</p>
                <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9] mb-5">
                  Comprehensive Management
                </h2>
                <div className="w-10 h-px bg-[#1B5E45]/30 mb-5" />
                <p className="text-base text-[#6B7280] leading-relaxed">
                  Every tool you need to manage properties efficiently and build lasting tenant relationships.
                </p>
              </Reveal>

              <div className="space-y-6">
                {[
                  {
                    icon: <Smartphone className="w-5 h-5" />,
                    title: "Mobile-First Access",
                    desc: "Manage your entire portfolio on-the-go with a fully responsive interface.",
                    delay: 0.1,
                  },
                  {
                    icon: <Layers className="w-5 h-5" />,
                    title: "Financial Intelligence",
                    desc: "Track payments, generate reports, and maintain precise financial records effortlessly.",
                    delay: 0.2,
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: "Trust & Transparency",
                    desc: "Build lasting trust through verified transactions and crystal-clear communication.",
                    delay: 0.3,
                  },
                ].map((item, i) => (
                  <Reveal key={i} delay={item.delay}>
                    <div className="group flex gap-5 p-5 rounded-2xl hover:bg-[#F7F8F5] transition-all duration-300 border border-transparent hover:border-[#E8E8E4] cursor-default">
                      <div className="w-11 h-11 bg-[#1B5E45] rounded-xl flex items-center justify-center text-[#3DBE7A] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-[#1A1A1A] mb-1.5">{item.title}</h4>
                        <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: "#0F0F0F" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1B5E45]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[#3DBE7A]/10 rounded-full blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <Reveal>
            <p className="text-[9px] font-black uppercase tracking-[0.42em] text-[#3DBE7A] mb-5">Get Started Today</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              Ready to Transform<br />
              <span className="bg-gradient-to-r from-[#3DBE7A] to-[#2AE299] bg-clip-text text-transparent">
                Your Portfolio?
              </span>
            </h2>
            <div className="w-12 h-px bg-[#3DBE7A]/30 mx-auto mb-6" />
            <p className="text-base text-white/45 mb-12 max-w-xl mx-auto leading-relaxed">
              Join hundreds of property managers and tenants who trust our platform for their complete property management needs.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link href="/auth/register">
                <button className="group flex items-center gap-3 bg-[#3DBE7A] text-white/70 px-8 h-14 rounded-2xl text-sm font-black uppercase tracking-wide hover:bg-[#2AE299] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(61,190,122,0.35)] hover:-translate-y-0.5 whitespace-nowrap">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  {[37, 38, 39, 40].map((n) => (
                    <div key={n} className="w-9 h-9 rounded-full border-2 border-[#0F0F0F] overflow-hidden">
                      <img src={`https://i.pravatar.cc/80?img=${n}`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-[#3DBE7A] text-[#3DBE7A]" />)}
                  </div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">500+ Active Users</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t pt-24 pb-14 font-sans" style={{ borderColor: "var(--color-border-light)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Brand col */}
            <div className="lg:col-span-4 space-y-8">
              <Logo size="md" variant="full" />
              <p className="text-sm font-medium leading-relaxed max-w-xs" style={{ color: "var(--color-text-muted)" }}>
                Empowering the future of property management with elite, precision technology.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <Globe className="w-4 h-4" /> },
                  { icon: <MessageSquare className="w-4 h-4" /> },
                ].map((s, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#E8E8E4] flex items-center justify-center text-[#9CA3AF] hover:text-[#1B5E45] hover:border-[#3DBE7A]/40 hover:bg-[#E8F5EE] transition-all duration-300"
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-8 md:gap-12">
              {[
                { title: "Network", links: ["Features", "Solutions", "Pricing", "Security"] },
                { title: "Ecosystem", links: ["Help Center", "API Docs", "Status", "Resources"] },
                { title: "Protocol", links: ["About Us", "Our Blog", "Careers", "Contact"] },
              ].map((group, i) => (
                <div key={i} className="space-y-6">
                  <h5 className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: "var(--color-text-primary)" }}>
                    {group.title}
                  </h5>
                  <ul className="space-y-4">
                    {group.links.map((link, j) => (
                      <li key={j}>
                        <a
                          href="#"
                          className="text-xs font-bold hover:text-[#1B5E45] transition-colors duration-200"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-10 border-t space-y-5" style={{ borderColor: "var(--color-border-light)" }}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <p className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color: "var(--color-text-muted)" }}>
                &copy; 2024 RentManager Protocol. All Rights Reserved.
              </p>
              <div className="flex items-center gap-8">
                {["Privacy", "Policy", "Terms"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[9px] font-black uppercase tracking-[0.35em] hover:text-[#1B5E45] transition-colors"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Developer section */}
            <div className="relative w-full md:w-auto" suppressHydrationWarning>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 md:py-2 text-xs font-semibold rounded-full transition-all duration-200 border"
                    style={{
                      background: "var(--color-card)",
                      color: "var(--color-text-muted)",
                      borderColor: "var(--color-border-light)",
                    }}
                    onClick={() => setCreatorOpen(!creatorOpen)}
                  >
                    <Code className="w-3 h-3" style={{ color: "var(--color-accent)" }} />
                    Built by
                    {creatorOpen ? (
                      <ChevronUp className="w-3 h-3 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                    )}
                  </button>
            
                  {creatorOpen && (
                    <div
                      className="absolute bottom-full right-0 mb-2 w-64 rounded-3xl border p-5 shadow-lg"
                      style={{
                        background: "var(--color-card)",
                        borderColor: "var(--color-border-light)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                        zIndex: 100,
                      }}
                    >
                      {/* Top accent */}
                      <div
                        className="h-1 -mx-5 -mt-5 mb-4 rounded-t-3xl"
                        style={{
                          background: "linear-gradient(90deg, #3DBE7A, #72d489, #72b872)",
                        }}
                      />
            
                      <div className="space-y-4">
                        {/* Avatar + name */}
                        <div className="flex items-center gap-3">
                          <img
                            src="/profile-avatar.jpg"
                            alt="Daysman Gad"
                            className="w-11 h-11 rounded-full object-cover"
                          />
                          <div>
                            <p
                              className="text-sm font-bold leading-none"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              Daysman Gad
                            </p>
                            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                              Full-stack Developer
                            </p>
                          </div>
                        </div>
            
                        <div style={{ borderColor: "var(--color-border-light)" }} className="border-t" />
            
                        <div className="space-y-2.5">
                          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                            Designed & built with care. A property management system for Kenya.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {["Next.js", "Prisma", "TypeScript"].map((t) => (
                              <span
                                key={t}
                                className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
                                style={{
                                  background: "rgba(61, 190, 122, 0.1)",
                                  color: "var(--color-accent)",
                                  borderColor: "var(--color-border-light)",
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
            
                        <div style={{ borderColor: "var(--color-border-light)" }} className="border-t" />
            
                        <div className="flex items-center justify-between">
                          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                            Made with{" "}
                            <span style={{ color: "var(--color-accent)" }}>♥</span> in Nairobi
                          </p>
                          <span
                            className="text-xs font-bold px-3 py-1 rounded-full border"
                            style={{
                              background: "rgba(61, 190, 122, 0.05)",
                              color: "var(--color-accent)",
                              borderColor: "var(--color-border-light)",
                            }}
                          >
                            v1.0.0
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
          </div>
        </div>
      </footer>
    </div>
  );
}