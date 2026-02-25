"use client";

import { useState, useEffect } from "react";
import DateNavigator from "../components/DateNavigator";
import ChecklistItem from "../components/ChecklistItem";
import ProgressRing from "../components/ProgressRing";
import { SHALAT_LIST, DAILY_TASKS, getRamadhanDay } from "../lib/data";
import { getTrackerData, setTrackerData, getDayProgress, getLastReadSurah } from "../lib/storage";
import Link from "next/link";

export default function TrackerPage() {
  const [mounted, setMounted] = useState(false);
  const [todayLimit, setTodayLimit] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lastRead, setLastRead] = useState(null);
  const [showDayPicker, setShowDayPicker] = useState(false);

  const handleDayChange = (day) => {
    if (day <= 30) {
      setCurrentDay(day);
    }
  };

  useEffect(() => {
    const today = getRamadhanDay();
    setTodayLimit(today);
    setCurrentDay(today);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      let d = getTrackerData(currentDay);
      const lr = getLastReadSurah();
      setLastRead(lr);

      if (lr && lr.juz) {
        let changed = false;
        if (!d.quran) d.quran = { juz: 0, pages: 0 };
        
        if (lr.juz > (d.quran.juz || 0)) {
          d.quran.juz = lr.juz;
          changed = true;
        }
        
        if (lr.page && lr.page > (d.quran.pages || 0)) {
          d.quran.pages = lr.page;
          changed = true;
        }

        if (changed) {
          setTrackerData(currentDay, d);
        }
      }

      setData(d);
      setProgress(getDayProgress(currentDay));
    }
  }, [currentDay, mounted]);

  const updateData = (newData) => {
    setTrackerData(currentDay, newData);
    setData({ ...newData });
    setProgress(getDayProgress(currentDay));
  };

  const toggleShalat = (id) => {
    if (currentDay > todayLimit) return;
    const newData = { ...data, shalat: { ...data.shalat, [id]: !data.shalat[id] } };
    updateData(newData);
  };

  const toggleTask = (id) => {
    if (currentDay > todayLimit) return;
    const newData = { ...data, [id]: !data[id] };
    updateData(newData);
  };

  const updateQuranJuz = (juz) => {
    if (currentDay > todayLimit) return;
    const newData = { ...data, quran: { ...data.quran, juz: Math.max(0, Math.min(30, juz)) } };
    updateData(newData);
  };

  const updateQuranPages = (pages) => {
    if (currentDay > todayLimit) return;
    const newData = { ...data, quran: { ...data.quran, pages: Math.max(0, pages) } };
    updateData(newData);
  };

  const updateNotes = (notes) => {
    if (currentDay > todayLimit) return;
    const newData = { ...data, notes };
    updateData(newData);
  };

  if (!mounted || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isFutureDay = currentDay > todayLimit;
  const isToday = currentDay === todayLimit;
  const shalatDone = Object.values(data.shalat || {}).filter(Boolean).length;
  const shalatTotal = Object.keys(data.shalat || {}).length;
  const tasksDone = DAILY_TASKS.filter(t => data[t.id]).length;

  return (
    <div className="space-y-5 animate-[fadeIn_0.6s_ease-out]">
      {/* Header Card with Day Navigator + Progress */}
      <div className="glass-card overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/10 via-transparent to-amber-600/5 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Daily Tracker</h1>
              <p className="text-white/40 text-sm mt-0.5">
                {isFutureDay ? "Hari ini belum tiba" : isToday ? "Catat ibadah hari ini" : "Melihat catatan hari sebelumnya"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Mini Progress */}
              <ProgressRing progress={progress} size={56} strokeWidth={5} />
            </div>
          </div>

          {/* Date Navigator */}
          <DateNavigator currentDay={currentDay} onDayChange={handleDayChange} todayLimit={todayLimit} />
        </div>

        {/* Day Summary Strip */}
        <div className="px-5 sm:px-6 py-3 border-t border-white/5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${shalatDone >= 5 ? "bg-emerald-400" : shalatDone > 0 ? "bg-amber-400" : "bg-white/20"}`} />
              <span className="text-white/50">Shalat <span className="text-white/80 font-semibold">{shalatDone}/{shalatTotal}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${data.puasa ? "bg-emerald-400" : "bg-white/20"}`} />
              <span className="text-white/50">Puasa <span className="text-white/80 font-semibold">{data.puasa ? "✓" : "—"}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${(data.quran?.juz || 0) > 0 ? "bg-emerald-400" : "bg-white/20"}`} />
              <span className="text-white/50">Quran <span className="text-white/80 font-semibold">{data.quran?.juz || 0} Juz</span></span>
            </div>
          </div>
          <button
            onClick={() => setShowDayPicker(!showDayPicker)}
            className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Pilih Hari
          </button>
        </div>
      </div>

      {/* Collapsible Day Picker Grid */}
      {showDayPicker && (
        <div className="glass-card p-5 animate-[fadeIn_0.2s_ease-out]">
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const dayProg = getDayProgress(day);
              const isActive = day === currentDay;
              const isDayToday = day === todayLimit;
              const isFuture = day > todayLimit;
              return (
                <button
                  key={day}
                  onClick={() => { handleDayChange(day); setShowDayPicker(false); }}
                  className={`
                    relative w-full aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-[0_0_20px_rgba(212,169,52,0.3)] scale-105"
                      : dayProg >= 100
                        ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:scale-105"
                        : dayProg > 0
                          ? "bg-white/5 border border-white/10 text-white/70 hover:scale-105 hover:bg-white/10"
                          : "bg-white/[0.02] border border-white/5 text-white/30 hover:bg-white/5"
                    }
                    ${isFuture ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                  `}
                  disabled={isFuture}
                >
                  {day}
                  {isDayToday && !isActive && (
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-[#0a1628]" />
                  )}
                  {dayProg >= 100 && !isActive && (
                    <span className="text-[8px] mt-0.5">✓</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-[10px] text-white/30">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30" />
              <span>Selesai</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-white/5 border border-white/10" />
              <span>Sebagian</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-gradient-to-br from-amber-500 to-amber-600" />
              <span>Dipilih</span>
            </div>
          </div>
        </div>
      )}

      {/* Future Day Warning */}
      {isFutureDay && (
        <div className="glass-card p-4 border-amber-500/20 bg-amber-500/[0.03] flex items-center gap-3">
          <span className="text-xl">⏳</span>
          <p className="text-sm text-amber-300/80">
            Hari ke-{currentDay} belum tiba. Data tidak bisa diubah.
          </p>
        </div>
      )}

      {/* Main Content: 2-column on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Shalat Section */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <span className="text-amber-400">🕌</span> Shalat
              </h2>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                shalatDone >= 5
                  ? "bg-emerald-500/15 text-emerald-400"
                  : shalatDone > 0
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-white/5 text-white/30"
              }`}>
                {shalatDone}/{shalatTotal}
              </span>
            </div>
            <div className="space-y-2">
              {SHALAT_LIST.map((shalat) => (
                <ChecklistItem
                  key={shalat.id}
                  label={shalat.label}
                  icon={shalat.icon}
                  checked={data.shalat[shalat.id] || false}
                  onChange={() => toggleShalat(shalat.id)}
                  disabled={isFutureDay}
                />
              ))}
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <span className="text-amber-400">✅</span> Ibadah Lainnya
              </h2>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                tasksDone === DAILY_TASKS.length
                  ? "bg-emerald-500/15 text-emerald-400"
                  : tasksDone > 0
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-white/5 text-white/30"
              }`}>
                {tasksDone}/{DAILY_TASKS.length}
              </span>
            </div>
            <div className="space-y-2">
              {DAILY_TASKS.map((task) => (
                <ChecklistItem
                  key={task.id}
                  label={task.label}
                  icon={task.icon}
                  checked={data[task.id] || false}
                  onChange={() => toggleTask(task.id)}
                  disabled={isFutureDay}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Quran Section */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400">📖</span> Al-Quran
            </h2>

            {/* Last Read Card */}
            {lastRead && (
              <Link 
                href={`/quran/${lastRead.number}${lastRead.ayat ? `#ayat-${lastRead.ayat}` : ""}`}
                className="group block mb-5 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/15 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-amber-400/70 font-semibold">Terakhir Dibaca</p>
                      <p className="text-white font-bold truncate">
                        {lastRead.name}
                        {lastRead.ayat && <span className="text-amber-400/80 font-semibold text-sm ml-1.5">: {lastRead.ayat}</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-lg font-arabic text-amber-400/50 group-hover:text-amber-400 transition-colors hidden sm:inline">{lastRead.arabic}</span>
                    <svg className="w-4 h-4 text-white/20 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )}

            {/* Juz & Pages */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-white/50">Juz</label>
                  <span className="text-[10px] text-amber-400/50 font-medium">Auto-sync dari bacaan</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuranJuz((data.quran?.juz || 0) - 1)}
                    disabled={isFutureDay}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 text-center relative overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-amber-500/10 transition-all duration-500"
                      style={{ width: `${((data.quran?.juz || 0) / 30) * 100}%` }}
                    />
                    <span className="text-xl font-bold text-white relative">{data.quran?.juz || 0}</span>
                    <span className="text-white/30 text-sm ml-1 relative">/ 30</span>
                  </div>
                  <button
                    onClick={() => updateQuranJuz((data.quran?.juz || 0) + 1)}
                    disabled={isFutureDay}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-white/50 block mb-2">Halaman Dibaca Hari Ini</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuranPages((data.quran?.pages || 0) - 1)}
                    disabled={isFutureDay}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 text-center">
                    <span className="text-xl font-bold text-white">{data.quran?.pages || 0}</span>
                    <span className="text-white/30 text-sm ml-1">hal</span>
                  </div>
                  <button
                    onClick={() => updateQuranPages((data.quran?.pages || 0) + 1)}
                    disabled={isFutureDay}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-amber-400">📝</span> Catatan
              {data.notes && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </h2>
            <textarea
              value={data.notes || ""}
              onChange={(e) => updateNotes(e.target.value)}
              disabled={isFutureDay}
              placeholder={isFutureDay ? "Belum bisa menulis catatan untuk hari ini" : "Tuliskan refleksi atau catatan hari ini..."}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 resize-none min-h-[120px] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>

          {/* Day Completion Summary (only if day has data) */}
          {progress > 0 && (
            <div className={`glass-card p-5 border-l-2 ${
              progress >= 100 ? "border-l-emerald-400 bg-emerald-500/[0.02]" :
              progress >= 50 ? "border-l-amber-400 bg-amber-500/[0.02]" :
              "border-l-white/20"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-1">Ringkasan Hari ke-{currentDay}</p>
                  <p className={`text-lg font-bold ${
                    progress >= 100 ? "text-emerald-400" : progress >= 50 ? "text-amber-400" : "text-white/60"
                  }`}>
                    {progress >= 100 ? "Masya Allah! Sempurna! 🎉" :
                     progress >= 75 ? "Luar biasa! Sedikit lagi! 💪" :
                     progress >= 50 ? "Setengah jalan, semangat! 🌟" :
                     "Masih bisa ditingkatkan 💫"}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-3xl font-bold ${
                    progress >= 100 ? "text-emerald-400" : progress >= 50 ? "text-amber-400" : "text-white/40"
                  }`}>
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          )}
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
