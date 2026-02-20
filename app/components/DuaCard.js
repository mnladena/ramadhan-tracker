"use client";

import { useState } from "react";

export default function DuaCard({ dua }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`
        group rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer
        ${expanded
          ? "bg-gradient-to-br from-amber-500/10 to-amber-700/5 border-amber-500/30 shadow-[0_0_30px_rgba(212,169,52,0.1)]"
          : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
        }
      `}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">
            {dua.category}
          </span>
          <svg
            className={`w-5 h-5 text-white/40 transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">{dua.title}</h3>
      </div>

      <div
        className={`
          transition-all duration-500 ease-in-out overflow-hidden
          ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-5 pb-5 space-y-4">
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/10 rounded-xl p-4 border border-amber-500/10">
            <p className="text-2xl text-right leading-loose font-arabic text-amber-100" dir="rtl">
              {dua.arabic}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-300/70 mb-1">Transliterasi</p>
            <p className="text-white/70 italic">{dua.transliteration}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-300/70 mb-1">Terjemahan</p>
            <p className="text-white/80">{dua.translation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
