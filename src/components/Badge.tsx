import React from "react";

interface BadgeProps {
  text: string;
  type?: "success" | "warning" | "error" | "info" | "default";
  className?: string;
}

const badgeClasses = {
  success: "bg-[#E8F5EE] text-[#1B5E45] border border-[#C4D4C9]",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  error:   "bg-red-50 text-red-700 border border-red-200",
  info:    "bg-[#E8F5EE] text-[#1B5E45] border border-[#C4D4C9]",
  default: "bg-[#F0F5F0] text-[#4B5563] border border-[#E8E8E2]",
};

export default function Badge({ text, type = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeClasses[type]} ${className}`}
    >
      {text}
    </span>
  );
}
