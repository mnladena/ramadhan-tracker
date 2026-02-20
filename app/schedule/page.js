"use client";

import { useState, useEffect } from "react";
import CountdownTimer from "../components/CountdownTimer";
import { IMSAKIYAH_JAKARTA, getRamadhanDay } from "../lib/data";
import { fetchMonthlySchedule } from "../lib/prayerTimes";

export default function SchedulePage() {
  const [mounted, setMounted] = useState(false);
  const [schedule, setSchedule] = useState(IMSAKIYAH_JAKARTA);
  const [locationName, setLocationName] = useState("Jakarta & Sekitarnya");
  const [isLoading, setIsLoading] = useState(true);
  const today = getRamadhanDay();

  useEffect(() => {
    setMounted(true);
    async function loadSchedule() {
      setIsLoading(true);
      const data = await fetchMonthlySchedule(2026, 3);
      if (data && data.timings) {
        setSchedule(data.timings.map((m, i) => ({ ...m, day: i + 1 })));
        if (data.location) {
          setLocationName(`Lokasi: ${data.location}`);
        }
      } else {
        // Fallback to Jakarta if fetch fails
        setSchedule(IMSAKIYAH_JAKARTA);
        setLocationName("Jakarta & Sekitarnya (Default)");
      }
      setIsLoading(false);
    }
    loadSchedule();
  }, []);

  return (
    <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Jadwal Imsakiyah</h1>
          <p className="text-white/50 mt-1">{locationName} — Ramadhan 1447H</p>
        </div>
        {mounted && (
          <div className="glass-card p-4 glow-animate">
            <CountdownTimer />
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="glass-card p-12 text-center animate-pulse">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40">Mendeteksi lokasi dan memuat jadwal...</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-4 text-left text-xs font-semibold text-amber-400/80 uppercase tracking-wider">Hari</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-amber-400/80 uppercase tracking-wider">Tanggal</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-amber-400/80 uppercase tracking-wider">Imsak</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-amber-400/80 uppercase tracking-wider">Subuh</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-amber-400/80 uppercase tracking-wider hidden sm:table-cell">Terbit</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-amber-400/80 uppercase tracking-wider hidden sm:table-cell">Dzuhur</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-amber-400/80 uppercase tracking-wider hidden md:table-cell">Ashar</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-amber-400/80 uppercase tracking-wider">Maghrib</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-amber-400/80 uppercase tracking-wider hidden md:table-cell">Isya</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, 30).map((row) => {
                  const isToday = mounted && row.day === today;
                  return (
                    <tr
                      key={row.day}
                      className={`
                        border-b border-white/5 transition-all duration-300
                        ${isToday
                          ? "bg-gradient-to-r from-amber-500/15 to-amber-600/5 border-l-2 border-l-amber-400"
                          : "hover:bg-white/[0.03]"
                        }
                      `}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isToday ? "text-amber-400" : "text-white/80"}`}>
                            {row.day}
                          </span>
                          {isToday && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-semibold">
                              HARI INI
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`px-4 py-3.5 ${isToday ? "text-white" : "text-white/60"}`}>
                        {row.date}
                      </td>
                      <td className={`px-4 py-3.5 text-center font-mono ${isToday ? "text-amber-300 font-semibold" : "text-white/60"}`}>
                        {row.imsak}
                      </td>
                      <td className={`px-4 py-3.5 text-center font-mono ${isToday ? "text-white font-semibold" : "text-white/60"}`}>
                        {row.subuh}
                      </td>
                      <td className={`px-4 py-3.5 text-center font-mono hidden sm:table-cell ${isToday ? "text-white" : "text-white/60"}`}>
                        {row.terbit}
                      </td>
                      <td className={`px-4 py-3.5 text-center font-mono hidden sm:table-cell ${isToday ? "text-white" : "text-white/60"}`}>
                        {row.dzuhur}
                      </td>
                      <td className={`px-4 py-3.5 text-center font-mono hidden md:table-cell ${isToday ? "text-white" : "text-white/60"}`}>
                        {row.ashar}
                      </td>
                      <td className={`px-4 py-3.5 text-center font-mono ${isToday ? "text-amber-300 font-semibold" : "text-white/60"}`}>
                        {row.maghrib}
                      </td>
                      <td className={`px-4 py-3.5 text-center font-mono hidden md:table-cell ${isToday ? "text-white" : "text-white/60"}`}>
                        {row.isya}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-white/40">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-amber-500/30 to-amber-600/10 border border-amber-400/30" />
          <span>Hari ini</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400/60">*</span>
          <span>Waktu untuk wilayah Jakarta</span>
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
