"use client";

import { useState, useEffect } from "react";
import ProgressRing from "./components/ProgressRing";
import StatsCard from "./components/StatsCard";
import CountdownTimer from "./components/CountdownTimer";
import ChecklistItem from "./components/ChecklistItem";
import { getRamadhanDay, getMotivationalQuote, SHALAT_LIST, DAILY_TASKS } from "./lib/data";
import { getDashboardStats, getDayProgress, getTrackerData, setTrackerData } from "./lib/storage";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [today] = useState(getRamadhanDay());
  const [stats, setStats] = useState({ shalatPercentage: 0, fastingDays: 0, quranJuz: 0, shalatStreak: 0 });
  const [dayProgress, setDayProgress] = useState(0);
  const [todayData, setTodayData] = useState(null);
  const quote = getMotivationalQuote(today);

  useEffect(() => {
    setMounted(true);
    setStats(getDashboardStats());
    setDayProgress(getDayProgress(today));
    setTodayData(getTrackerData(today));
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
          <p className="text-white/50 mt-1">
            Hari ke-<span className="text-amber-400 font-semibold">{today}</span> Ramadhan 1447H
          </p>
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
