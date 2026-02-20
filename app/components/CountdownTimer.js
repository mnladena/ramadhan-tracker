"use client";

import { useState, useEffect } from "react";
import { IMSAKIYAH_JAKARTA, getRamadhanDay } from "../lib/data";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [nextEvent, setNextEvent] = useState("Loading...");

  useEffect(() => {
    function getNextPrayerTime() {
      const now = new Date();
      const currentDay = getRamadhanDay(now);
      const schedule = IMSAKIYAH_JAKARTA.find((s) => s.day === currentDay) || IMSAKIYAH_JAKARTA[0];

      const events = [
        { name: "Imsak", time: schedule.imsak },
        { name: "Subuh", time: schedule.subuh },
        { name: "Terbit", time: schedule.terbit },
        { name: "Dzuhur", time: schedule.dzuhur },
        { name: "Ashar", time: schedule.ashar },
        { name: "Maghrib (Buka Puasa)", time: schedule.maghrib },
        { name: "Isya", time: schedule.isya },
      ];

      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      for (const event of events) {
        const [h, m] = event.time.split(":").map(Number);
        const eventMinutes = h * 60 + m;
        if (eventMinutes > currentMinutes) {
          const diff = eventMinutes - currentMinutes;
          const hours = Math.floor(diff / 60);
          const minutes = diff % 60;
          const seconds = 60 - now.getSeconds();
          return {
            name: event.name,
            hours,
            minutes: minutes > 0 ? minutes - 1 : 0,
            seconds: seconds === 60 ? 0 : seconds,
          };
        }
      }

      // After Isya, count to next day's Imsak
      const nextSchedule = IMSAKIYAH_JAKARTA.find((s) => s.day === currentDay + 1) || IMSAKIYAH_JAKARTA[0];
      const [h, m] = nextSchedule.imsak.split(":").map(Number);
      const targetMinutes = 24 * 60 - currentMinutes + h * 60 + m;
      return {
        name: "Imsak",
        hours: Math.floor(targetMinutes / 60),
        minutes: targetMinutes % 60,
        seconds: 60 - now.getSeconds(),
      };
    }

    function updateCountdown() {
      const result = getNextPrayerTime();
      setNextEvent(result.name);
      setTimeLeft({
        hours: result.hours,
        minutes: result.minutes,
        seconds: result.seconds,
      });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-widest text-amber-400/80 mb-2">Menuju {nextEvent}</p>
      <div className="flex items-center justify-center gap-2">
        <TimeBlock value={pad(timeLeft.hours)} label="Jam" />
        <span className="text-2xl font-bold text-amber-400 animate-pulse">:</span>
        <TimeBlock value={pad(timeLeft.minutes)} label="Menit" />
        <span className="text-2xl font-bold text-amber-400 animate-pulse">:</span>
        <TimeBlock value={pad(timeLeft.seconds)} label="Detik" />
      </div>
    </div>
  );
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-lg px-3 py-2 min-w-[56px] border border-white/10">
        <span className="text-2xl font-bold text-white font-mono">{value}</span>
      </div>
      <span className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}
