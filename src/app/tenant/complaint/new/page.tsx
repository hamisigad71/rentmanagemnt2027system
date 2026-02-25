import Link from "next/link";

export default function TenantSubmitComplaint() {
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="max-w-107.5 mx-auto bg-white dark:bg-slate-900 min-h-screen flex flex-col shadow-2xl relative">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-5 py-4 flex items-center border-b border-slate-100 dark:border-slate-800">
          <Link href="/tenant/dashboard" className="p-1 -ml-1 text-[#135bec]">
            <span className="material-icons">arrow_back_ios</span>
          </Link>
          <h1 className="flex-1 text-center font-bold text-lg mr-6">
            Submit Complaint
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pt-6 pb-24">
          <section className="space-y-6 mb-10">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Issue Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all outline-none"
                placeholder="e.g. Leaking Faucet in Kitchen"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Detailed Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all outline-none resize-none"
                placeholder="Please provide as much detail as possible..."
                rows={4}
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Attachments
              </label>
              <div className="w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center space-y-2 bg-slate-50/50 dark:bg-slate-800/50 group cursor-pointer hover:border-[#135bec] transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#135bec]/10 flex items-center justify-center text-[#135bec]">
                  <span className="material-icons">add_a_photo</span>
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  Upload Photos or Video
                </span>
              </div>
            </div>
            <button className="w-full bg-[#135bec] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#135bec]/20 active:scale-[0.98] transition-transform">
              Submit Complaint
            </button>
          </section>

          <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="font-bold text-lg">My Past Complaints</h2>
              <button className="text-[#135bec] text-sm font-semibold">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Kitchen Sink Leakage",
                  date: "Submitted Oct 24, 2023",
                  status: "Pending",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAh3dqX4l-LgmQsiFxkvWLOTjNkJsRioA_h4yq99A4enlrnGHeQJFtHZiXLNoR10OD_-lBTTKuOXa1_4PfgMn0rb1HPCQtrVfg27IGu3Ewu2n-1inJybEA-2dgHuYWlgTX8IixtoY2nnBIIl9gpkwAhX6jw5WfIg_31UsE_a8mWOWnK2pvklzBfNCm5ddQgnxM_J0Rnb102l4sWaJ-I5Uu0miDyp3yKHE0NggDCBb_jtfenkNQ7OX7kGjcJrFbGaik6jxvPP-tkAQv",
                },
                {
                  title: "Broken Living Room Outlet",
                  date: "Submitted Oct 20, 2023",
                  status: "In Progress",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjcHbTl5kkSMcW_udHLhZLrsX03SdnkZxDwEhW3UAI8aOXK7TDtV9CaG1r9lPZlqNxETC5s57bzf_wf6LZAXVyIrigUuyGULuvtTmf8VAIiEtCNqQ26p3NxJGdhsYWVG9wQfMDD4-oQmwHENbr-imH3_alLYU-eH1PyGbTgR-FzlUrs5IvEd7KBZ9GOEsB8FdcM2fT66qJXbgOwOUFBw5qKEkpn6-o5IS6JKg62oHG0All32iGiaqbiJBJMeRznvmBLv4Mp0E6z2mK",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={c.img}
                      alt={c.title}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm truncate pr-2">
                        {c.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          c.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-[#135bec]/10 text-[#135bec] dark:bg-[#135bec]/20"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{c.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 max-w-107.5 mx-auto h-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-around items-center px-6 pb-6 z-50">
          <Link
            href="/tenant/dashboard"
            className="flex flex-col items-center text-slate-400"
          >
            <span className="material-icons">home</span>
            <span className="text-[10px] mt-1 font-medium">Home</span>
          </Link>
          <Link
            href="/tenant/complaint/new"
            className="flex flex-col items-center text-[#135bec]"
          >
            <span className="material-icons">assignment_late</span>
            <span className="text-[10px] mt-1 font-medium">Complaints</span>
          </Link>
          <Link
            href="/tenant/payments"
            className="flex flex-col items-center text-slate-400"
          >
            <span className="material-icons">payments</span>
            <span className="text-[10px] mt-1 font-medium">Rent</span>
          </Link>
          <button className="flex flex-col items-center text-slate-400">
            <span className="material-icons">person</span>
            <span className="text-[10px] mt-1 font-medium">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
