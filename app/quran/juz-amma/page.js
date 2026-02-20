"use client";

import { useState } from "react";
import Link from "next/link";
import { JUZ_AMMA, QURAN_SURAHS } from "../../lib/quran";

export default function JuzAmmaPage() {
  const [activeSurah, setActiveSurah] = useState(null);
  const juzAmmaSurahs = QURAN_SURAHS.filter((s) => s.juz === 30);

  return (
    <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              href="/quran"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-white">Juz Amma</h1>
          </div>
          <p className="text-white/50 ml-11">Juz ke-30 · Surah 78 - 114</p>
        </div>
      </div>

      {/* Surah Quick Nav */}
      <div className="glass-card p-4">
        <p className="text-xs text-amber-400/70 uppercase tracking-wider mb-3 font-semibold">Pilih Surah</p>
        <div className="flex flex-wrap gap-2">
          {juzAmmaSurahs.map((s) => {
            const hasContent = JUZ_AMMA.find((j) => j.number === s.number);
            return (
              <a
                key={s.number}
                href={`#surah-${s.number}`}
                onClick={() => setActiveSurah(s.number)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                  ${activeSurah === s.number
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                    : hasContent
                      ? "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                      : "bg-white/[0.02] border border-white/5 text-white/30"
                  }
                `}
              >
                {s.number}. {s.name}
              </a>
            );
          })}
        </div>
      </div>

      {/* Surah Content */}
      <div className="space-y-6">
        {JUZ_AMMA.map((surah) => (
          <div
            key={surah.number}
            id={`surah-${surah.number}`}
            className="glass-card overflow-hidden scroll-mt-6"
          >
            {/* Surah Header */}
            <div className="bg-gradient-to-r from-amber-500/15 to-amber-600/5 border-b border-amber-500/10 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-amber-400">{surah.number}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{surah.name}</h2>
                    <p className="text-sm text-white/50">{surah.translation} · {surah.ayat.length} ayat</p>
                  </div>
                </div>
                <p className="text-3xl font-arabic text-amber-400/80">{surah.arabic}</p>
              </div>
            </div>

            {/* Bismillah (except At-Taubah) */}
            {surah.number !== 9 && (
              <div className="text-center py-4 border-b border-white/5">
                <p className="text-2xl font-arabic text-amber-300/70" dir="rtl">
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>
              </div>
            )}

            {/* Ayat */}
            <div className="p-5 space-y-3">
              {surah.ayat.map((ayat, index) => (
                <div
                  key={index}
                  className="group flex gap-4 items-start p-3 rounded-xl hover:bg-white/[0.03] transition-all"
                >
                  {/* Ayat Number */}
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-amber-400/70">{index + 1}</span>
                  </div>

                  {/* Arabic Text */}
                  <p className="text-2xl leading-[2.2] font-arabic text-white/90 flex-1 text-right" dir="rtl">
                    {ayat}
                    <span className="text-amber-400/50 text-lg mr-1"> ﴿{index + 1}﴾</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back to top */}
      <div className="text-center py-4">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          Kembali ke Atas
        </a>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
