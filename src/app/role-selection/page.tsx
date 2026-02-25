import Link from "next/link";

export default function RoleSelectionPage() {
  return (
    <div className="font-display bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[390px] mx-auto flex flex-col min-h-screen justify-between py-12">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#135bec]/10 rounded-xl mb-6">
            <span className="material-icons text-[#135bec] text-3xl">apartment</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">Please select your role to continue</p>
        </header>

        <main className="space-y-6 flex-grow flex flex-col justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 p-6 flex flex-col items-center text-center transition-all active:scale-[0.98] group">
            <div className="w-16 h-16 bg-[#135bec]/5 dark:bg-[#135bec]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#135bec]/10 transition-colors">
              <span className="material-icons text-[#135bec] text-4xl">home</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Landlord</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Manage properties, track payments, and find your next tenants.
            </p>
            <Link 
              href="/landlord/dashboard" 
              className="w-full bg-[#135bec] text-white font-medium py-3.5 rounded-lg shadow-lg shadow-[#135bec]/20 hover:bg-[#135bec]/90 transition-colors active:ring-4 active:ring-[#135bec]/20 text-center"
            >
              Login as Landlord
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 p-6 flex flex-col items-center text-center transition-all active:scale-[0.98] group">
            <div className="w-16 h-16 bg-[#135bec]/5 dark:bg-[#135bec]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#135bec]/10 transition-colors">
              <span className="material-icons text-[#135bec] text-4xl">vpn_key</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Tenant</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Pay rent securely, request maintenance, and view your lease.
            </p>
            <Link 
              href="/tenant/dashboard" 
              className="w-full bg-[#135bec] text-white font-medium py-3.5 rounded-lg shadow-lg shadow-[#135bec]/20 hover:bg-[#135bec]/90 transition-colors active:ring-4 active:ring-[#135bec]/20 text-center"
            >
              Login as Tenant
            </Link>
          </div>
        </main>

        <footer className="mt-10 text-center">
          <a className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#135bec] transition-colors inline-flex items-center gap-1" href="#">
            Need help with your account?
            <span className="material-icons text-xs">arrow_forward</span>
          </a>
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-32 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          </div>
        </footer>
      </div>

      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#135bec]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#135bec]/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
