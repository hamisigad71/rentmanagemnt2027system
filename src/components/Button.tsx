import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "premium";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-95",
  outline:
    "border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:scale-95",
  ghost: 
    "text-slate-600 hover:bg-slate-100 active:scale-95",
  premium:
    "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-95 relative overflow-hidden group",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-2xl",
  lg: "px-7 py-3.5 text-base rounded-2xl",
  xl: "px-9 py-4.5 text-lg rounded-[24px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      suppressHydrationWarning
      className={cn(
        "font-bold transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      ) : (
        icon
      )}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
      </span>
      {variant === 'premium' && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
      )}
    </button>
  );
}
