"use client";

import { useState, useEffect } from "react";
import ProgressRing from "./components/ProgressRing";
import StatsCard from "./components/StatsCard";
import CountdownTimer from "./components/CountdownTimer";
import ChecklistItem from "./components/ChecklistItem";
import { getRamadhanDay, getMotivationalQuote, SHALAT_LIST, DAILY_TASKS } from "./lib/data";
import { getDashboardStats, getDayProgress, getTrackerData, setTrackerData, getLastReadSurah } from "./lib/storage";
import { getUserCoordinates, getPrayerTimes } from "./lib/prayerTimes";
import Link from "next/link";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [today] = useState(getRamadhanDay());
  const [stats, setStats] = useState({ shalatPercentage: 0, fastingDays: 0, quranJuz: 0, shalatStreak: 0 });
  const [dayProgress, setDayProgress] = useState(0);
  const [todayData, setTodayData] = useState(null);
  const [lastRead, setLastRead] = useState(null);
  const [locationName, setLocationName] = useState("Mendeteksi...");
  const [todayTimings, setTodayTimings] = useState(null);
  const quote = getMotivationalQuote(today);

  useEffect(() => {
    setMounted(true);
    setStats(getDashboardStats());
    setDayProgress(getDayProgress(today));
    setTodayData(getTrackerData(today));
    setLastRead(getLastReadSurah());

    // Detect location and get today's prayer times
    async function initLocation() {
      const coords = await getUserCoordinates();
      if (coords && coords.name) {
        setLocationName(coords.name);
      }
      const dateString = new Date().toISOString().split("T")[0];
      const timings = await getPrayerTimes(dateString);
      if (timings) setTodayTimings(timings);
    }
    initLocation();
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

  const refreshLocation = async () => {
    setLocationName("Mendeteksi...");
    localStorage.removeItem("ramadhan_user_location");
    try {
      const coords = await getUserCoordinates();
      if (coords && coords.name) {
        setLocationName(coords.name);
      } else {
        setLocationName("Gagal mendeteksi");
      }
    } catch {
      setLocationName("Gagal mendeteksi");
    }
  };

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return { text: "Selamat Malam", emoji: "🌌" };
    if (hour < 12) return { text: "Selamat Pagi", emoji: "🌅" };
    if (hour < 15) return { text: "Selamat Siang", emoji: "☀️" };
    if (hour < 18) return { text: "Selamat Sore", emoji: "🌤️" };
    return { text: "Selamat Malam", emoji: "🌙" };
  };

  const greeting = getGreeting();

  // Prayer times display
  const prayerTimesDisplay = todayTimings ? [
    { name: "Imsak", time: todayTimings.imsak, icon: "🌑" },
    { name: "Subuh", time: todayTimings.subuh, icon: "🌅" },
    { name: "Dzuhur", time: todayTimings.dzuhur, icon: "☀️" },
    { name: "Ashar", time: todayTimings.ashar, icon: "🌤️" },
    { name: "Maghrib", time: todayTimings.maghrib, icon: "🌇" },
    { name: "Isya", time: todayTimings.isya, icon: "🌙" },
  ] : [];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Hero Header */}
      <div className="glass-card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/5" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{greeting.emoji}</span>
                <p className="text-sm text-amber-400/80 font-medium">{greeting.text}</p>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Ramadhan Hari ke-{today}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs bg-amber-500/15 text-amber-400 px-3 py-1.5 rounded-full border border-amber-500/20 font-semibold">
                  🕌 Ramadhan 1447H
                </span>
                <button 
                  className="inline-flex items-center gap-1.5 text-xs bg-white/5 text-white/50 px-3 py-1.5 rounded-full border border-white/10 hover:text-amber-400 hover:border-amber-500/20 transition-all group"
                  onClick={refreshLocation}
                  title="Klik untuk deteksi ulang lokasi"
                >
                  <svg className="w-3 h-3 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {locationName}
                </button>
              </div>

              {/* Ramadhan Progress Bar */}
              <div className="mt-5 max-w-md">
                <div className="flex justify-between text-xs text-white/40 mb-1.5">
                  <span>Progress Ramadhan</span>
                  <span className="text-amber-400 font-semibold">{today}/30 hari</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((today / 30) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="glass-card p-5 glow-animate border-amber-500/15 shrink-0">
              <CountdownTimer />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Prayer Times */}
      {prayerTimesDisplay.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {prayerTimesDisplay.map((p) => {
            // check if this is the current/next prayer
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const [h, m] = p.time.split(":").map(Number);
            const prayerMinutes = h * 60 + m;
            const isPast = prayerMinutes <= currentMinutes;
            const isNext = !isPast && prayerTimesDisplay.every(
              (other) => {
                const [oh, om] = other.time.split(":").map(Number);
                const otherMin = oh * 60 + om;
                return otherMin <= currentMinutes || otherMin >= prayerMinutes;
              }
            );

            return (
              <div
                key={p.name}
                className={`
                  glass-card p-3 text-center transition-all duration-300
                  ${isNext
                    ? "border-amber-500/30 bg-amber-500/[0.06] shadow-[0_0_20px_rgba(212,169,52,0.08)]"
                    : isPast ? "opacity-50" : ""
                  }
                `}
              >
                <span className="text-base block mb-1">{p.icon}</span>
                <p className={`text-[11px] font-medium mb-0.5 ${isNext ? "text-amber-400" : "text-white/50"}`}>{p.name}</p>
                <p className={`text-sm font-bold font-mono ${isNext ? "text-amber-300" : "text-white/80"}`}>{p.time}</p>
                {isNext && <div className="w-1 h-1 rounded-full bg-amber-400 mx-auto mt-1.5 animate-pulse" />}
              </div>
            );
          })}
        </div>
      )}

      {/* Progress & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Progress Ring Card */}
        <div className="glass-card p-6 flex flex-col items-center justify-center gap-4 lg:row-span-2">
          <h2 className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold">Hari Ini</h2>
          <ProgressRing progress={dayProgress} size={140} strokeWidth={10} />
          <p className="text-white/40 text-xs text-center leading-relaxed">
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
            className="glass-card p-5 flex items-center justify-between group hover:border-amber-500/30 transition-all duration-300 lg:col-span-2"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-amber-400/70 font-semibold mb-0.5">Lanjutkan Membaca</p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-white">{lastRead.name}</h3>
                  {lastRead.ayat && (
                    <span className="text-amber-400 font-bold text-sm">Ayat {lastRead.ayat}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <p className="text-2xl font-arabic text-amber-400/50 group-hover:text-amber-400 transition-colors hidden sm:block">
                {lastRead.arabic}
              </p>
              <svg className="w-5 h-5 text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        )}
      </div>

      {/* Quick Checklist + Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Quick Checklist */}
        <div className="glass-card p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="text-amber-400">📋</span> Checklist Hari Ini
            </h2>
            <Link href="/tracker" className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors flex items-center gap-1">
              Selengkapnya
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
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
        <div className="glass-card p-5 lg:col-span-2 flex flex-col justify-between glow-animate border-amber-500/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💎</span>
              <p className="text-[10px] uppercase tracking-widest text-amber-400/70 font-semibold">Mutiara Hikmah</p>
            </div>
            <p className="text-white/80 italic leading-relaxed">
              &ldquo;{quote.text}&rdquo;
            </p>
          </div>
          <p className="text-amber-400/60 text-xs mt-4 font-medium">
            — {quote.source}
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: "/tracker", icon: "✅", label: "Tracker Harian", desc: "Catat ibadah harian", color: "emerald" },
          { href: "/quran", icon: "📖", label: "Al-Quran", desc: "Baca & tilawah", color: "blue" },
          { href: "/dua", icon: "🤲", label: "Doa & Dzikir", desc: "Kumpulan doa", color: "purple" },
          { href: "/schedule", icon: "🕐", label: "Jadwal Shalat", desc: "Imsakiyah lengkap", color: "amber" },
        ].map((item) => {
          const colorClasses = {
            emerald: "hover:border-emerald-500/30 hover:from-emerald-500/10 hover:to-emerald-600/5",
            blue: "hover:border-blue-500/30 hover:from-blue-500/10 hover:to-blue-600/5",
            purple: "hover:border-purple-500/30 hover:from-purple-500/10 hover:to-purple-600/5",
            amber: "hover:border-amber-500/30 hover:from-amber-500/10 hover:to-amber-600/5",
          };
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`glass-card p-4 bg-gradient-to-br from-transparent to-transparent transition-all duration-300 hover:scale-[1.03] group ${colorClasses[item.color]}`}
            >
              <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform inline-block">{item.icon}</span>
              <h3 className="text-sm font-semibold text-white mb-0.5">{item.label}</h3>
              <p className="text-[11px] text-white/30">{item.desc}</p>
            </Link>
          );
        })}
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
