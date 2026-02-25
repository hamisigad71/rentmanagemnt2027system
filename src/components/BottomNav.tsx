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
  activeColor?: string;
}

export default function BottomNav({ items, activeColor = "blue" }: BottomNavProps) {
  const pathname = usePathname();

  const getColorClasses = (isActive: boolean) => {
    if (!isActive) return "text-gray-500 hover:text-gray-900";
    
    switch (activeColor) {
      case "green":
        return "text-green-600 bg-green-50/50";
      case "blue":
      default:
        return "text-blue-600 bg-blue-50/50";
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none">
      <nav className="bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl flex items-center justify-around p-2 pointer-events-auto">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 w-full ${getColorClasses(isActive)}`}
            >
              <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-bold mt-1 tracking-tight transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
