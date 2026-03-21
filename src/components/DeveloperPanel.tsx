"use client";

import { useState } from "react";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";

const L = {
  card: "#FFFFFF",
  cardBorder: "#E5E7EB",
  muted: "#6B7280",
  accent: "#1B5E45",
  accentLight: "#3DBE7A",
  accentGlow: "rgba(61,190,122,0.1)",
  accentGlow2: "rgba(61,190,122,0.15)",
  text: "#111827",
  subtle: "#6B7280",
};

export default function DeveloperPanel() {
  const [creatorOpen, setCreatorOpen] = useState(false);

  return (
    <div className="flex justify-end w-full">
      <div className="relative w-full md:w-auto">
        <button
        onClick={() => setCreatorOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E4] bg-white shadow-sm hover:bg-[#F7F7F7] transition-all duration-200"
        style={{ fontSize: "11px", fontWeight: 600 }}
      >
        <Code2 className="w-3.5 h-3.5 text-[#3DBE7A]" />
        Built by
        {creatorOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {creatorOpen && (
        <div
          className="absolute bottom-[calc(100%+10px)] right-0 w-[260px] rounded-xl border shadow-xl p-4 z-50"
          style={{ background: L.card, borderColor: L.cardBorder }}
        >
          <div className="h-1 mx-[-16px] mt-[-16px] mb-3 rounded-t-xl" style={{ background: `linear-gradient(90deg, ${L.accent}, ${L.accentLight}, #72b872)` }} />

          <div className="flex items-center gap-3 mb-3">
            <img
              src="/profile-avatar.jpg"
              alt="Daysman Gad"
              className="w-11 h-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-black" style={{ color: L.text }}>
                Daysman Gad
              </p>
              <p className="text-xs" style={{ color: L.muted }}>
                Full-stack Developer
              </p>
            </div>
          </div>

          <div className="border-t" style={{ borderColor: L.cardBorder }} />

          <div className="mt-3 text-xs" style={{ color: L.muted, lineHeight: 1.6 }}>
            Designed & built with care. Crafted for DriveKE — Kenya's premier car hire platform.
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {['Next.js', 'Chakra UI', 'TypeScript'].map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full px-2.5 py-0.5 border text-[10px] font-bold"
                style={{ background: L.accentGlow, borderColor: L.cardBorder, color: L.accentLight }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="border-t mt-3" style={{ borderColor: L.cardBorder }} />

          <div className="flex items-center justify-between mt-2 text-xs" style={{ color: L.subtle }}>
            <span>
              Made with <span className="text-[#3DBE7A]">♥</span> in Nairobi
            </span>
            <span className="inline-flex px-2 py-1 rounded-full border" style={{ borderColor: L.cardBorder, background: L.accentGlow2, color: L.accentLight }}>
              v1.0.0
            </span>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
