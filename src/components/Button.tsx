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
    "bg-[#1B5E45] text-white hover:bg-[#246B4F] shadow-[0_4px_24px_rgba(27,94,69,0.25)] hover:shadow-[0_8px_32px_rgba(27,94,69,0.35)] active:bg-[#164D39] active:scale-[0.98]",
  secondary:
    "bg-white border border-[#1B5E45] text-[#1B5E45] hover:bg-[#E8F5EE] active:scale-[0.98]",
  outline:
    "border border-[#E8E8E2] text-[#1A1A1A] hover:border-[#C4D4C9] hover:bg-[#F4F4F0] active:scale-[0.98]",
  ghost:
    "text-[#1A1A1A] hover:bg-[#F4F4F0] active:scale-[0.98]",
  premium:
    "text-white shadow-[0_4px_24px_rgba(27,94,69,0.35)] active:scale-[0.98] relative overflow-hidden group",
};

const sizeClasses = {
  sm: "px-4 py-1.5 text-xs rounded-full",
  md: "px-5 py-2.5 text-sm rounded-full",
  lg: "px-7 py-3.5 text-base rounded-full",
  xl: "px-9 py-4.5 text-lg rounded-full",
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
        "font-bold transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 disabled:bg-[#E8E8E2] disabled:text-[#6B7280] disabled:shadow-none disabled:border-0",
        variantClasses[variant],
        sizeClasses[size],
        // Premium has its own gradient bg applied inline to allow the shimmer overlay
        variant === "premium"
          ? "bg-gradient-to-r from-[#246B4F] to-[#1B5E45]"
          : "",
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
      {variant === "premium" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3DBE7A]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
      )}
    </button>
  );
}
