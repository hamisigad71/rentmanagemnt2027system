import Link from "next/link";
import { Building2, Home, Key, HelpCircle, ArrowRight } from "lucide-react";

export default function RoleSelectionPage() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center p-6" style={{ background: "var(--color-background)" }}>
      <div className="w-full max-w-[420px] mx-auto flex flex-col min-h-[85vh] justify-between py-12">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1B5E45]/10 rounded-[1.5rem] mb-8 animate-float">
            <Building2 className="text-[#1B5E45] w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter" style={{ color: "var(--color-text-primary)" }}>Welcome Back</h1>
          <p className="mt-2 font-medium italic" style={{ color: "var(--color-text-muted)" }}>Select your portal to continue protocol</p>
        </header>

        <main className="space-y-8 flex-grow flex flex-col justify-center">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border p-8 flex flex-col items-center text-center transition-all active:scale-[0.98] group relative overflow-hidden" 
               style={{ borderColor: "var(--color-border-light)" }}>
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
              <Home className="w-24 h-24" />
            </div>
            
            <div className="w-20 h-20 bg-[#E8F5EE] rounded-3xl flex items-center justify-center mb-6 group-hover:bg-[#1B5E45] group-hover:text-white transition-all duration-500">
              <Home className="text-[#1B5E45] w-10 h-10 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-black mb-2 italic" style={{ color: "var(--color-text-primary)" }}>Landlord</h2>
            <p className="text-sm mb-10 font-medium italic" style={{ color: "var(--color-text-muted)" }}>
              Manage properties, track payments, and optimize your portfolio yield.
            </p>
            <Link 
              href="/landlord/dashboard" 
              className="w-full bg-[#1B5E45] text-white font-black py-4 rounded-full shadow-xl hover:bg-[#154a36] transition-all text-center flex items-center justify-center gap-2 group/btn italic"
            >
              Enter Dashboard
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl border p-8 flex flex-col items-center text-center transition-all active:scale-[0.98] group relative overflow-hidden"
               style={{ borderColor: "var(--color-border-light)" }}>
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
              <Key className="w-24 h-24" />
            </div>

            <div className="w-20 h-20 bg-[#F4F4F0] rounded-3xl flex items-center justify-center mb-6 group-hover:bg-[#1B5E45] group-hover:text-white transition-all duration-500">
              <Key className="text-[#1B5E45] w-10 h-10 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-black mb-2 italic" style={{ color: "var(--color-text-primary)" }}>Tenant</h2>
            <p className="text-sm mb-10 font-medium italic" style={{ color: "var(--color-text-muted)" }}>
              Pay rent securely, request maintenance, and manage your verified status.
            </p>
            <Link 
              href="/tenant/dashboard" 
              className="w-full bg-[#1A1A1A] text-white font-black py-4 rounded-full shadow-xl hover:bg-black transition-all text-center flex items-center justify-center gap-2 group/btn italic"
            >
              Access Portal
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </main>

        <footer className="mt-12 text-center">
          <a className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#1B5E45] transition-colors inline-flex items-center gap-2 italic" 
             style={{ color: "var(--color-text-muted)" }} href="#">
            <HelpCircle className="w-3 h-3" />
            Need help with your account?
          </a>
          <div className="mt-10 flex justify-center">
            <div className="w-32 h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-[#1B5E45] rounded-full" />
            </div>
          </div>
        </footer>
      </div>

      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#E8F5EE] opacity-50 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#E8F5EE] opacity-50 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
