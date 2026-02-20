"use client";

import { useState, useEffect } from "react";
import ProgressRing from "./components/ProgressRing";
import StatsCard from "./components/StatsCard";
import CountdownTimer from "./components/CountdownTimer";
import ChecklistItem from "./components/ChecklistItem";
import { getRamadhanDay, getMotivationalQuote, SHALAT_LIST, DAILY_TASKS } from "./lib/data";
import { getDashboardStats, getDayProgress, getTrackerData, setTrackerData, getLastReadSurah } from "./lib/storage";
import Link from "next/link";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [today] = useState(getRamadhanDay());
  const [stats, setStats] = useState({ shalatPercentage: 0, fastingDays: 0, quranJuz: 0, shalatStreak: 0 });
  const [dayProgress, setDayProgress] = useState(0);
  const [todayData, setTodayData] = useState(null);
  const [lastRead, setLastRead] = useState(null);
  const [locationName, setLocationName] = useState("Mendeteksi...");
  const quote = getMotivationalQuote(today);

  useEffect(() => {
    setMounted(true);
    setStats(getDashboardStats());
    setDayProgress(getDayProgress(today));
    setTodayData(getTrackerData(today));
    setLastRead(getLastReadSurah());
  }, [today]);

  const handleQuickToggle = (key) => {
    const data = getTrackerData(today);

    if (key.startsWith("shalat_")) {
      const shalatKey = key.replace("shalat_", "");
      data.shalat[shalatKey] = !data.shalat[shalatKey];
    } else {
      data[key] = !data[key];
    }

    setTrackerData(today, data);
    setTodayData({ ...data });
    setDayProgress(getDayProgress(today));
    setStats(getDashboardStats());
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Assalamu&apos;alaikum 🌙
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-white/50">
              Hari ke-<span className="text-amber-400 font-semibold">{today}</span> Ramadhan 1447H
            </p>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <div className="flex items-center gap-1.5 text-amber-400/80 text-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">{locationName}</span>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 glow-animate">
          <CountdownTimer />
        </div>
      </div>

      {/* Progress & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Ring Card */}
        <div className="glass-card p-6 flex flex-col items-center justify-center gap-4 lg:row-span-2">
          <h2 className="text-sm uppercase tracking-widest text-amber-400/80">Progress Hari Ini</h2>
          <ProgressRing progress={dayProgress} size={160} strokeWidth={10} />
          <p className="text-white/40 text-sm text-center">
            {dayProgress >= 100 ? "Masya Allah! Sempurna! 🎉" :
             dayProgress >= 75 ? "Luar biasa! Sedikit lagi! 💪" :
             dayProgress >= 50 ? "Sudah setengah jalan! 🌟" :
             "Yuk mulai ibadah hari ini! ☀️"}
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCard icon="🔥" value={stats.shalatStreak} label="Hari Streak Shalat" color="amber" />
        <StatsCard icon="📖" value={`${stats.quranJuz} Juz`} label="Quran Terbaca" color="blue" />
        <StatsCard icon="🍽️" value={`${stats.fastingDays}/30`} label="Hari Berpuasa" color="emerald" />
        <StatsCard icon="🤲" value={`${stats.shalatPercentage}%`} label="Tingkat Shalat" color="purple" />

        {/* Last Read Surah */}
        {lastRead && (
          <Link
            href={`/quran/${lastRead.number}${lastRead.ayat ? `#ayat-${lastRead.ayat}` : ""}`}
            className="glass-card p-6 flex items-center justify-between group hover:border-amber-500/30 transition-all lg:col-span-2"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📖
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold mb-1">Terakhir Dibaca</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-white">{lastRead.name}</h3>
                  {lastRead.ayat && (
                    <span className="text-amber-400 font-bold text-sm">Ayat {lastRead.ayat}</span>
                  )}
                </div>
                <p className="text-white/40 text-xs mt-1">
                  Surah {lastRead.number} · Klik untuk lanjut membaca
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-arabic text-amber-400/60 group-hover:text-amber-400 transition-colors">
                {lastRead.arabic}
              </p>
            </div>
          </Link>
        )}
      </div>

      {/* Quick Checklist Today */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">📋</span> Checklist Hari Ini
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SHALAT_LIST.slice(0, 6).map((shalat) => (
            <ChecklistItem
              key={shalat.id}
              label={shalat.label}
              icon={shalat.icon}
              checked={todayData?.shalat?.[shalat.id] || false}
              onChange={() => handleQuickToggle(`shalat_${shalat.id}`)}
            />
          ))}
          {DAILY_TASKS.slice(0, 2).map((task) => (
            <ChecklistItem
              key={task.id}
              label={task.label}
              icon={task.icon}
              checked={todayData?.[task.id] || false}
              onChange={() => handleQuickToggle(task.id)}
            />
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="glass-card p-6 glow-animate">
        <div className="flex items-start gap-4">
          <span className="text-3xl">💎</span>
          <div>
            <p className="text-white/80 italic leading-relaxed text-lg">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="text-amber-400/70 text-sm mt-3 font-medium">
              — {quote.source}
            </p>
          </div>
        </div>
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
