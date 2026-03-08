"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon";
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = "md", 
  variant = "full",
  isDark = false 
}) => {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 120,
  };

  const dim = sizeMap[size];
  
  // High-end Palette matching the new logo
  const gold = "#D4AF37"; 
  const textColor = isDark ? "#FFFFFF" : "#0B241B";

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* New PNG Logo Emblem */}
      <div 
        className="relative flex items-center justify-center transition-all duration-500 group-hover:scale-110"
        style={{ width: dim, height: dim }}
      >
        <Image
          src="/images/logo/main-logo.png"
          alt="Nexus Rent Logo"
          width={dim}
          height={dim}
          className="object-contain filter drop-shadow-md"
          priority
        />
      </div>
      
      {variant === "full" && (
        <div className="flex flex-col whitespace-nowrap">
          <div className="flex items-baseline gap-1">
            <span 
              className="font-black tracking-tighter leading-none transition-colors duration-300"
              style={{ 
                color: textColor,
                fontSize: size === 'xs' ? '14px' : size === 'sm' ? '16px' : '22px'
              }}
            >
              NEXUS
            </span>
            <span 
              className="font-black tracking-tighter leading-none"
              style={{ 
                color: gold,
                fontSize: size === 'xs' ? '14px' : size === 'sm' ? '16px' : '22px'
              }}
            >
              RENT
            </span>
          </div>
          <span 
            className="font-black uppercase tracking-[0.4em] mt-1.5 opacity-40 transition-opacity group-hover:opacity-70"
            style={{ 
              color: textColor,
              fontSize: size === 'xs' ? '6px' : '8px'
            }}
          >
            Institutional Ecosystem
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
