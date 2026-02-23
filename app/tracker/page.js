"use client";

import { useState, useEffect } from "react";
import DateNavigator from "../components/DateNavigator";
import ChecklistItem from "../components/ChecklistItem";
import ProgressRing from "../components/ProgressRing";
import { SHALAT_LIST, DAILY_TASKS, getRamadhanDay } from "../lib/data";
import { getTrackerData, setTrackerData, getDayProgress, getLastReadSurah } from "../lib/storage";

export default function TrackerPage() {
  const [mounted, setMounted] = useState(false);
  const [todayLimit, setTodayLimit] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);

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
      const lastRead = getLastReadSurah();

      // Automatically sync progress if it's today or if current data is behind
      if (lastRead && lastRead.juz) {
        if (!d.quran || lastRead.juz > (d.quran.juz || 0)) {
          d = {
            ...d,
            quran: {
              ...d.quran,
              juz: lastRead.juz
            }
          };
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

  return (
    <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Daily Tracker</h1>
          <p className="text-white/50 mt-1">Catat ibadah harianmu</p>
        </div>
        <div className="flex items-center gap-4">
          <ProgressRing progress={progress} size={64} strokeWidth={5} />
        </div>
      </div>

      {/* Date Navigator */}
      <div className="glass-card p-5">
        <DateNavigator currentDay={currentDay} onDayChange={handleDayChange} todayLimit={todayLimit} />
      </div>

      {/* Shalat Section */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">🕌</span> Shalat
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SHALAT_LIST.map((shalat) => (
            <ChecklistItem
              key={shalat.id}
              label={shalat.label}
              icon={shalat.icon}
              checked={data.shalat[shalat.id] || false}
              onChange={() => toggleShalat(shalat.id)}
              disabled={currentDay > todayLimit}
            />
          ))}
        </div>
      </div>

      {/* Quran Section */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">📖</span> Al-Quran
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white/50 block mb-2">Juz yang dibaca</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuranJuz((data.quran?.juz || 0) - 1)}
                disabled={currentDay > todayLimit}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
              >
                −
              </button>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-center">
                <span className="text-2xl font-bold text-white">{data.quran?.juz || 0}</span>
                <span className="text-white/40 text-sm ml-1">/ 30</span>
              </div>
              <button
                onClick={() => updateQuranJuz((data.quran?.juz || 0) + 1)}
                disabled={currentDay > todayLimit}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm text-white/50 block mb-2">Halaman dibaca hari ini</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuranPages((data.quran?.pages || 0) - 1)}
                disabled={currentDay > todayLimit}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
              >
                −
              </button>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-center">
                <span className="text-2xl font-bold text-white">{data.quran?.pages || 0}</span>
                <span className="text-white/40 text-sm ml-1">halaman</span>
              </div>
              <button
                onClick={() => updateQuranPages((data.quran?.pages || 0) + 1)}
                disabled={currentDay > todayLimit}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all flex items-center justify-center text-lg font-bold disabled:opacity-20 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">✅</span> Ibadah Lainnya
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DAILY_TASKS.map((task) => (
            <ChecklistItem
              key={task.id}
              label={task.label}
              icon={task.icon}
              checked={data[task.id] || false}
              onChange={() => toggleTask(task.id)}
              disabled={currentDay > todayLimit}
            />
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">📝</span> Catatan
        </h2>
        <textarea
          value={data.notes || ""}
          onChange={(e) => updateNotes(e.target.value)}
          disabled={currentDay > todayLimit}
          placeholder={currentDay > todayLimit ? "Belum bisa menulis catatan untuk hari ini" : "Tuliskan refleksi atau catatan hari ini..."}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 resize-none min-h-[100px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Day selector grid */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">📅</span> Pilih Hari
        </h2>
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const dayProg = getDayProgress(day);
            const isActive = day === currentDay;
            const isToday = day === todayLimit;
            const isFuture = day > todayLimit;
            return (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`
                  relative w-full aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${isActive
                    ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-[0_0_20px_rgba(212,169,52,0.3)]"
                    : dayProg >= 100
                      ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                      : dayProg > 0
                        ? "bg-white/5 border border-white/10 text-white/70"
                        : "bg-white/[0.02] border border-white/5 text-white/30"
                  }
                  ${isFuture ? "opacity-40" : ""}
                  hover:scale-110 active:scale-95
                `}
              >
                {day}
                {isToday && !isActive && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
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
