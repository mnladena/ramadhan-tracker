"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QURAN_SURAHS } from "../lib/quran";
import { getLastReadSurah } from "../lib/storage";

const POPULAR_SURAHS = [
  { number: 36, name: "Yasin", emoji: "💎" },
  { number: 55, name: "Ar-Rahman", emoji: "🌺" },
  { number: 67, name: "Al-Mulk", emoji: "👑" },
  { number: 56, name: "Al-Waqi'ah", emoji: "⚡" },
  { number: 18, name: "Al-Kahf", emoji: "🏔️" },
  { number: 97, name: "Al-Qadr", emoji: "🌙" },
];

export default function QuranPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJuz, setFilterJuz] = useState(0);
  const [filterType, setFilterType] = useState("Semua");
  const [lastRead, setLastRead] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lr = getLastReadSurah();
    if (lr) setLastRead(lr);
  }, []);

  const filteredSurahs = QURAN_SURAHS.filter((s) => {
    const matchSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.arabic.includes(searchQuery) ||
      String(s.number).includes(searchQuery);
    const matchJuz = filterJuz === 0 || s.juz === filterJuz;
    const matchType = filterType === "Semua" || s.type === filterType;
    return matchSearch && matchJuz && matchType;
  });

  const totalAyat = QURAN_SURAHS.reduce((sum, s) => sum + s.ayat, 0);

  return (
    <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Al-Quran</h1>
          <p className="text-white/50 mt-1">Al-Quran Al-Karim — 114 Surah · {totalAyat.toLocaleString()} Ayat · 30 Juz</p>
        </div>
        <Link
          href="/quran/juz-amma"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(212,169,52,0.3)] transition-all duration-300 flex items-center gap-2"
        >
          📖 Juz Amma
        </Link>
      </div>

      {/* Continue Reading Card */}
      {mounted && lastRead && (
        <Link
          href={`/quran/${lastRead.number}${lastRead.ayat ? `#ayat-${lastRead.ayat}` : ""}`}
          className="group block glass-card overflow-hidden border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="bg-gradient-to-r from-amber-500/15 via-amber-600/5 to-transparent p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-amber-400/70 uppercase tracking-widest font-semibold mb-1">Lanjutkan Membaca</p>
              <h3 className="text-lg font-bold text-white truncate">
                {lastRead.name}
                {lastRead.ayat && <span className="text-white/50 font-normal text-sm ml-2">Ayat {lastRead.ayat}</span>}
              </h3>
              <p className="text-xs text-white/40 mt-0.5">
                {lastRead.juz ? `Juz ${lastRead.juz}` : ""}
                {lastRead.readAt && ` · ${new Date(lastRead.readAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-arabic text-amber-400/60 group-hover:text-amber-400 transition-colors">{lastRead.arabic}</p>
            </div>
            <svg className="w-5 h-5 text-white/20 group-hover:text-amber-400 transition-all group-hover:translate-x-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      )}

      {/* Quick Access */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3">Surah Populer</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {POPULAR_SURAHS.map((s) => (
            <Link
              key={s.number}
              href={`/quran/${s.number}`}
              className="glass-card p-3 text-center hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <span className="text-xl block mb-1">{s.emoji}</span>
              <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors truncate block">{s.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari surah (nama atau nomor)..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Type Filter */}
        <div className="flex gap-2">
          {["Semua", "Makkiyah", "Madaniyah"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${filterType === type
                  ? type === "Makkiyah"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                    : type === "Madaniyah"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_0_15px_rgba(212,169,52,0.2)]"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
                }
              `}
            >
              {type === "Makkiyah" && "🕋 "}{type === "Madaniyah" && "🕌 "}{type}
            </button>
          ))}
          <span className="text-xs text-white/30 self-center ml-2">{filteredSurahs.length} surah</span>
        </div>

        {/* Juz Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilterJuz(0)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              filterJuz === 0
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_0_15px_rgba(212,169,52,0.2)]"
                : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
            }`}
          >
            Semua Juz
          </button>
          {[...Array(30)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setFilterJuz(i + 1)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                filterJuz === i + 1
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_0_15px_rgba(212,169,52,0.2)]"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
              }`}
            >
              Juz {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Surah Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSurahs.map((surah) => {
          const isLastRead = mounted && lastRead && lastRead.number === surah.number;
          return (
            <Link
              key={surah.number}
              href={`/quran/${surah.number}`}
              className={`
                group glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer
                ${isLastRead
                  ? "border-amber-500/30 bg-amber-500/[0.03] hover:border-amber-400/50"
                  : "hover:border-amber-500/30"
                }
              `}
            >
              {/* Number */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 border ${
                isLastRead
                  ? "from-amber-500/30 to-amber-600/10 border-amber-500/30"
                  : "from-amber-500/20 to-amber-600/5 border-amber-500/15"
              }`}>
                <span className={`text-sm font-bold ${isLastRead ? "text-amber-300" : "text-amber-400"}`}>{surah.number}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold truncate">{surah.name}</h3>
                  {isLastRead && (
                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    surah.type === "Makkiyah"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-blue-500/15 text-blue-400"
                  }`}>
                    {surah.type}
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-0.5">{surah.ayat} ayat · Juz {surah.juz}</p>
              </div>

              {/* Arabic name */}
              <p className="text-xl font-arabic text-amber-400/70 group-hover:text-amber-400 transition-colors flex-shrink-0">
                {surah.arabic}
              </p>
            </Link>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-white/50">Tidak ada surah yang ditemukan</p>
          <button
            onClick={() => { setSearchQuery(""); setFilterJuz(0); setFilterType("Semua"); }}
            className="mt-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm"
          >
            Reset Filter
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
