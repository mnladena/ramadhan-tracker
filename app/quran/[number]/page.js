"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { QURAN_SURAHS, JUZ_AMMA } from "../../lib/quran";
import { setLastReadSurah } from "../../lib/storage";

export default function SurahDetailPage() {
  const { number } = useParams();
  const [surahData, setSurahData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastMarkedAyat, setLastMarkedAyat] = useState(null);

  const surahInfo = QURAN_SURAHS.find((s) => s.number === parseInt(number));

  useEffect(() => {
    async function fetchSurah() {
      setIsLoading(true);
      setError(null);

      // Check storage for this surah's last marked ayat
      const stored = localStorage.getItem("ramadhan_planner_2026_last_read");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.number === parseInt(number)) {
          setLastMarkedAyat(parsed.ayat);
        }
      }

      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,id.indonesian`);
        if (!res.ok) throw new Error("Gagal mengambil data surah");
        
        const data = await res.json();
        if (data.code !== 200) throw new Error(data.data);
        
        const arabicData = data.data[0];
        const translationData = data.data[1];
        
        setSurahData({
          ...arabicData,
          translationAyats: translationData.ayahs
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (number) fetchSurah();
  }, [number]);

  const markAyat = (ayatNumber) => {
    setLastMarkedAyat(ayatNumber);
    setLastReadSurah({
      number: surahInfo.number,
      name: surahInfo.name,
      arabic: surahInfo.arabic
    }, ayatNumber);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 glass-card bg-white/5 rounded-2xl w-full"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 glass-card bg-white/5 rounded-2xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !surahInfo) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <h2 className="text-xl font-bold text-white mb-2">Terjadi Kesalahan</h2>
        <p className="text-white/50 mb-6">{error || "Surah tidak ditemukan"}</p>
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-all"
        >
          Kembali ke Index
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="glass-card overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/5 p-6 border-b border-amber-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/quran"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">{surahInfo.name}</h1>
                <p className="text-sm text-white/50">{surahData?.englishNameTranslation} · {surahInfo.ayat} Ayat</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-arabic text-amber-400">{surahInfo.arabic}</p>
              <p className="text-[10px] text-amber-400/50 uppercase tracking-widest mt-1">{surahInfo.type}</p>
            </div>
          </div>
        </div>
        
        {/* Bismillah */}
        {parseInt(number) !== 1 && parseInt(number) !== 9 && (
          <div className="py-8 text-center border-b border-white/5 bg-white/[0.01]">
            <p className="text-3xl font-arabic text-amber-300/80" dir="rtl">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </div>
        )}
      </div>

      {/* Ayats List */}
      <div className="space-y-4">
        {surahData?.ayahs.map((ayah, index) => {
          const isMarked = lastMarkedAyat === ayah.numberInSurah;
          return (
            <div
              key={ayah.number}
              id={`ayat-${ayah.numberInSurah}`}
              className={`
                glass-card p-6 space-y-6 hover:bg-white/[0.03] transition-all group border-white/5 
                ${isMarked ? "border-amber-500/40 bg-amber-500/[0.03]" : "hover:border-amber-500/20"}
              `}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isMarked ? "bg-amber-500/20 border-amber-500/40" : "bg-amber-500/10 border-amber-500/20"}`}>
                    <span className={`text-xs font-bold ${isMarked ? "text-amber-300" : "text-amber-400"}`}>{ayah.numberInSurah}</span>
                  </div>
                  <button
                    onClick={() => markAyat(ayah.numberInSurah)}
                    className={`
                      w-10 h-10 rounded-xl flex items-center justify-center transition-all
                      ${isMarked 
                        ? "bg-amber-500 text-white shadow-[0_0_15px_rgba(212,169,52,0.3)]" 
                        : "bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60"
                      }
                    `}
                    title={isMarked ? "Terakhir dibaca" : "Tandai terakhir dibaca"}
                  >
                    <svg className="w-5 h-5" fill={isMarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </button>
                </div>
                <p className="text-3xl leading-[2.5] font-arabic text-white/90 text-right" dir="rtl">
                  {ayah.text}
                  <span className="text-amber-500/40 text-2xl mr-2"> ﴿{ayah.numberInSurah}﴾</span>
                </p>
              </div>
              
              <div className="pl-14">
                <p className="text-white/80 leading-relaxed italic">
                  {surahData.translationAyats[index].text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center py-4">
        {parseInt(number) > 1 && (
          <Link
            href={`/quran/${parseInt(number) - 1}`}
            className="px-5 py-2.5 rounded-xl glass-card text-white/70 hover:text-white hover:border-amber-500/30 transition-all flex items-center gap-2"
          >
            ← Surah Sebelumnya
          </Link>
        )}
        <div className="flex-1"></div>
        {parseInt(number) < 114 && (
          <Link
            href={`/quran/${parseInt(number) + 1}`}
            className="px-5 py-2.5 rounded-xl glass-card text-white/70 hover:text-white hover:border-amber-500/30 transition-all flex items-center gap-2"
          >
            Surah Berikutnya →
          </Link>
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
