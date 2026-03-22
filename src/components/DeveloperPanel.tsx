"use client";

import React, { useState } from "react";
import { Code, ChevronUp, ChevronDown } from "lucide-react";

export default function DeveloperPanel() {
  const [creatorOpen, setCreatorOpen] = useState(false);

  return (
    <div className="relative w-full md:w-auto">
      <button
        className="flex items-center gap-1.5 px-4 py-2 md:py-2 text-xs font-semibold rounded-full transition-all duration-200 border"
        style={{
          background: "var(--color-card)",
          color: "var(--color-text-muted)",
          borderColor: "var(--color-border-light)",
        }}
        onClick={() => setCreatorOpen(!creatorOpen)}
      >
        <Code className="w-3 h-3" style={{ color: "var(--color-accent)" }} />
        Built by
        {creatorOpen ? (
          <ChevronUp className="w-3 h-3 transition-transform duration-200" />
        ) : (
          <ChevronDown className="w-3 h-3 transition-transform duration-200" />
        )}
      </button>

      {creatorOpen && (
        <div
          className="absolute bottom-full right-0 mb-2 w-64 rounded-3xl border p-5 shadow-lg"
          style={{
            background: "var(--color-card)",
            borderColor: "var(--color-border-light)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
            zIndex: 100,
          }}
        >
          {/* Top accent */}
          <div
            className="h-1 -mx-5 -mt-5 mb-4 rounded-t-3xl"
            style={{
              background: "linear-gradient(90deg, #3DBE7A, #72d489, #72b872)",
            }}
          />

          <div className="space-y-4">
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Daysman"
                alt="Daysman Gad"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <p
                  className="text-sm font-bold leading-none"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Daysman Gad
                </p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Full-stack Developer
                </p>
              </div>
            </div>

            <div style={{ borderColor: "var(--color-border-light)" }} className="border-t" />

            <div className="space-y-2.5">
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                Designed & built with care. A property management system for Kenya.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Prisma", "TypeScript"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
                    style={{
                      background: "rgba(61, 190, 122, 0.1)",
                      color: "var(--color-accent)",
                      borderColor: "var(--color-border-light)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderColor: "var(--color-border-light)" }} className="border-t" />

            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Made with{" "}
                <span style={{ color: "var(--color-accent)" }}>♥</span> in Nairobi
              </p>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{
                  background: "rgba(61, 190, 122, 0.05)",
                  color: "var(--color-accent)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
