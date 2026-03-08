import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  className?: string;
}

const sizeClasses = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-[calc(100vw-4rem)]",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className = "",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: "rgba(26, 26, 26, 0.55)", backdropFilter: "blur(6px)" }}
    >
      <div
        className={`bg-white ${sizeClasses[size]} w-full max-h-screen overflow-y-auto ${className}`}
        style={{ borderRadius: "var(--radius-modal)", boxShadow: "var(--shadow-modal)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: "1px solid var(--color-border-light)" }}
        >
          <h2 className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="transition-colors p-1.5 rounded-lg hover:bg-[#F4F4F0]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6" style={{ color: "var(--color-text-secondary)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
