"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#FAFAF8]/80 backdrop-blur-md"
        >
          {/* Mint ambient gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5EE]/30 via-white/40 to-[#F4F4F0]/20 opacity-80 pointer-events-none" />

          <div className="relative flex items-center justify-center">
            {/* Mint glow pulse */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.08, 0.22, 0.08],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-40 h-40 bg-[#3DBE7A] rounded-full blur-[60px] will-change-transform"
            />

            {/* Floating icon card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 p-10 bg-white backdrop-blur-xl rounded-[3rem] border border-[#C4D4C9] shadow-[0_20px_40px_-12px_rgba(27,94,69,0.18)] flex items-center justify-center will-change-transform"
            >
              <ShieldCheck className="w-20 h-20 text-[#1B5E45]" strokeWidth={1} />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E8F5EE]/40 to-transparent rounded-[3rem]" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="mt-12 flex flex-col items-center relative z-10 will-change-transform"
          >
            <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tighter uppercase mb-1">
              Rent<span className="text-[#1B5E45]">Manager</span>
            </h2>
            <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-[0.4em] mb-6">
              System Processing
            </p>

            {/* Mint loading dots */}
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
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 bg-[#3DBE7A] rounded-full will-change-transform"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
