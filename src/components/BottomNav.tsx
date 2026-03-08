"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface BottomNavProps {
  items: NavItem[];
  activeColor?: string; // kept for API compat, ignored — always uses green-bright
}

export default function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none">
      <nav
        className="flex items-center justify-around p-2 pointer-events-auto rounded-2xl"
        style={{
          background: "rgba(26, 26, 26, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--color-border-dark)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 w-full"
              style={{
                color: isActive ? "#3DBE7A" : "rgba(250, 250, 248, 0.5)",
                background: isActive ? "rgba(61, 190, 122, 0.1)" : "transparent",
              }}
            >
              <div
                className={`transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] font-bold mt-1 tracking-tight transition-all duration-300 ${isActive ? "opacity-100" : "opacity-50"}`}
              >
                {item.label}
              </span>
              {/* Active dot indicator */}
              {isActive && (
                <div className="w-1 h-1 rounded-full mt-0.5 bg-[#3DBE7A]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
