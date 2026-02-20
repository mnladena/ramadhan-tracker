"use client";

import { useState } from "react";
import Link from "next/link";
import { QURAN_SURAHS } from "../lib/quran";

export default function QuranPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJuz, setFilterJuz] = useState(0);

  const filteredSurahs = QURAN_SURAHS.filter((s) => {
    const matchSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.arabic.includes(searchQuery) ||
      String(s.number).includes(searchQuery);
    const matchJuz = filterJuz === 0 || s.juz === filterJuz;
    return matchSearch && matchJuz;
  });

  return (
    <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Al-Quran</h1>
          <p className="text-white/50 mt-1">114 Surah Al-Quran Al-Karim</p>
        </div>
        <Link
          href="/quran/juz-amma"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(212,169,52,0.3)] transition-all duration-300 flex items-center gap-2"
        >
          📖 Juz Amma
        </Link>
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

      {/* Surah Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSurahs.map((surah) => (
          <Link
            key={surah.number}
            href={`/quran/${surah.number}`}
            className="group glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/30 cursor-pointer"
          >
            {/* Number */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/15 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-amber-400">{surah.number}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold truncate">{surah.name}</h3>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  surah.type === "Makkiyah"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-blue-500/15 text-blue-400"
                }`}>
                  {surah.type}
                </span>
              </div>
              <p className="text-xs text-white/40">{surah.ayat} ayat · Juz {surah.juz}</p>
            </div>

            {/* Arabic name */}
            <p className="text-xl font-arabic text-amber-400/70 group-hover:text-amber-400 transition-colors flex-shrink-0">
              {surah.arabic}
            </p>
          </Link>
        ))}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-white/50">Tidak ada surah yang ditemukan</p>
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
