"use client";

/**
 * ActionOverlay — Premium fullscreen overlay for async action feedback.
 */

export type ActionOverlayColor = "blue" | "green" | "red" | "amber" | "purple";

export type ActionOverlayProps = {
  show: boolean;
  icon?: string;
  title: string;
  message: string;
  color?: ActionOverlayColor;
};

const colorStyles: Record<
  ActionOverlayColor,
  { bubble: string; spinner: string; glow: string }
> = {
  blue: {
    bubble: "bg-[#1B5E45] text-white",
    spinner: "border-[#3DBE7A]",
    glow: "shadow-[#1B5E45]/20",
  },
  green: {
    bubble: "bg-emerald-600 text-white",
    spinner: "border-emerald-500",
    glow: "shadow-emerald-500/20",
  },
  red: {
    bubble: "bg-[#FA0A12] text-white",
    spinner: "border-[#FA0A12]",
    glow: "shadow-[#FA0A12]/20",
  },
  amber: {
    bubble: "bg-amber-500 text-white",
    spinner: "border-amber-500",
    glow: "shadow-amber-500/20",
  },
  purple: {
    bubble: "bg-violet-600 text-white",
    spinner: "border-violet-500",
    glow: "shadow-violet-500/20",
  },
};

export default function ActionOverlay({
  show,
  icon = "check_circle",
  title,
  message,
  color = "blue",
}: ActionOverlayProps) {
  if (!show) return null;

  const { bubble, spinner, glow } = colorStyles[color] ?? colorStyles.blue;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-500">
      {/* Container with extra glow */}
      <div className="relative max-w-sm w-full animate-in zoom-in-95 duration-500">
        <div className="absolute -inset-4 bg-white/5 rounded-[3rem] blur-2xl" />
        
        {/* Main Card */}
        <div className="relative glass-panel bg-white/80 p-12 rounded-[2.5rem] text-center border border-white/40 shadow-2xl">
          
          {/* Icon Bubble */}
          <div
            className={`w-24 h-24 rounded-3xl ${bubble} flex items-center justify-center mx-auto mb-8 shadow-2xl ${glow} animate-float transform rotate-3`}
          >
            <span className="material-icons" style={{ fontSize: "3rem" }}>
              {icon}
            </span>
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-slate-500 font-semibold leading-relaxed px-4">
              {message}
            </p>
          </div>

          {/* Liquid Spinner */}
          <div className="flex justify-center">
            <div className="relative w-12 h-12">
              <div className={`absolute inset-0 border-[5px] ${spinner} opacity-20 rounded-full`} />
              <div
                className={`absolute inset-0 border-[5px] ${spinner} border-t-transparent rounded-full animate-spin`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
