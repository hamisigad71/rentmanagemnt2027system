"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

export default function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/60 backdrop-blur-md"
          >
            {/* Optimized Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/10 via-white/30 to-slate-50/10 opacity-70 pointer-events-none" />
            
            <div className="relative flex items-center justify-center">
              {/* Simplified Glow - Performance Optimized */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-40 h-40 bg-blue-500 rounded-full blur-[60px] will-change-transform"
              />

              {/* Main Animated Icon Container - Optimized */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 p-10 bg-white/80 backdrop-blur-xl rounded-[3rem] border border-white shadow-[0_20px_40px_-12px_rgba(59,130,246,0.1)] flex items-center justify-center will-change-transform"
              >
                <Shield className="w-20 h-20 text-blue-600" strokeWidth={1} />
                <div className="absolute inset-0 bg-linear-to-tr from-blue-600/5 to-transparent rounded-[3rem]" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="mt-12 flex flex-col items-center relative z-10 will-change-transform"
            >
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-1">
                Rent<span className="text-blue-600">Manager</span>
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">
                System Processing
              </p>
              
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-blue-600 rounded-full shadow-sm will-change-transform"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
