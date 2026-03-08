"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, TrendingUp } from "lucide-react";

const floatTransition = (delay = 0) => ({
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay,
});

const containerClass =
  "p-6 backdrop-blur-sm rounded-[2rem] flex items-center justify-center";
const containerStyle = {
  background: "var(--color-surface-tint)",
  border: "1px solid var(--color-border-mid)",
  boxShadow: "var(--shadow-mint)",
};

export const AnimatedShield = () => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={floatTransition(0)}
    className={containerClass}
    style={containerStyle}
  >
    <ShieldCheck className="w-12 h-12" style={{ color: "var(--color-green-deep)" }} />
  </motion.div>
);

export const AnimatedCreditCard = () => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={floatTransition(0.2)}
    className={containerClass}
    style={containerStyle}
  >
    <CreditCard className="w-12 h-12" style={{ color: "var(--color-green-deep)" }} />
  </motion.div>
);

export const AnimatedTrendingUp = () => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={floatTransition(0.4)}
    className={containerClass}
    style={containerStyle}
  >
    <TrendingUp className="w-12 h-12" style={{ color: "var(--color-green-deep)" }} />
  </motion.div>
);
