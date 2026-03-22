"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show if scrolling up, hide if scrolling down
      // Added a small threshold (10px) to avoid flickering
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pointer-events-none"
        >
          <nav
            className="flex items-center justify-around p-2 pointer-events-auto rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.14)",
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
                    color: isActive ? "#3DBE7A" : "rgba(30, 41, 59, 0.6)",
                    background: isActive ? "rgba(61, 190, 122, 0.15)" : "transparent",
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
