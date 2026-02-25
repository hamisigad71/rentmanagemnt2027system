import React from "react";

interface BadgeProps {
  text: string;
  type?: "success" | "warning" | "error" | "info" | "default";
  className?: string;
}

const badgeClasses = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  default: "bg-gray-100 text-gray-800",
};

export default function Badge({ text, type = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeClasses[type]} ${className}`}
    >
      {text}
    </span>
  );
}
