"use client";

import { motion } from "framer-motion";
import { Shield, CreditCard, TrendingUp } from "lucide-react";

export const AnimatedShield = () => {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="p-6 bg-blue-50/80 backdrop-blur-sm rounded-[2rem] border border-blue-100 shadow-sm flex items-center justify-center"
    >
      <Shield className="w-12 h-12 text-blue-600" />
    </motion.div>
  );
};

export const AnimatedCreditCard = () => {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
      className="p-6 bg-blue-50/80 backdrop-blur-sm rounded-[2rem] border border-blue-100 shadow-sm flex items-center justify-center"
    >
      <CreditCard className="w-12 h-12 text-blue-600" />
    </motion.div>
  );
};

export const AnimatedTrendingUp = () => {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
      className="p-6 bg-blue-50/80 backdrop-blur-sm rounded-[2rem] border border-blue-100 shadow-sm flex items-center justify-center"
    >
      <TrendingUp className="w-12 h-12 text-blue-600" />
    </motion.div>
  );
};
