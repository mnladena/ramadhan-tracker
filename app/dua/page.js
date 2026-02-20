"use client";

import { useState } from "react";
import DuaCard from "../components/DuaCard";
import { DUA_COLLECTION, DUA_CATEGORIES } from "../lib/data";

export default function DuaPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDuas = DUA_COLLECTION.filter((dua) => {
    const matchCategory = activeCategory === "Semua" || dua.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Doa & Dzikir</h1>
        <p className="text-white/50 mt-1">Koleksi doa pilihan untuk Ramadhan</p>
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari doa..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 transition-all"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {DUA_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
              ${activeCategory === cat
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_0_15px_rgba(212,169,52,0.2)]"
                : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dua Cards */}
      <div className="space-y-3">
        {filteredDuas.length > 0 ? (
          filteredDuas.map((dua) => <DuaCard key={dua.id} dua={dua} />)
        ) : (
          <div className="glass-card p-12 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-white/50">Tidak ada doa yang ditemukan</p>
          </div>
        )}
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
