"use client";

import { useState, useEffect } from "react";
import { getRamadhanDay } from "../lib/data";
import { getPrayerTimes } from "../lib/prayerTimes";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [nextEvent, setNextEvent] = useState("Memuat...");
  const [useLocalTimes, setUseLocalTimes] = useState(false);

  useEffect(() => {
    async function updateCountdown() {
      const now = new Date();
      const dateString = now.toISOString().split("T")[0]; // YYYY-MM-DD
      
      const timings = await getPrayerTimes(dateString);
      if (!timings) return;

      const events = [
        { name: "Imsak", time: timings.imsak },
        { name: "Subuh", time: timings.subuh },
        { name: "Terbit", time: timings.terbit },
        { name: "Dzuhur", time: timings.dzuhur },
        { name: "Ashar", time: timings.ashar },
        { name: "Maghrib", time: timings.maghrib },
        { name: "Isya", time: timings.isya },
      ];

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let found = false;

      for (const event of events) {
        const [h, m] = event.time.split(":").map(Number);
        const eventMinutes = h * 60 + m;
        if (eventMinutes > currentMinutes) {
          const diff = eventMinutes - currentMinutes;
          setNextEvent(event.name + (event.name === "Maghrib" ? " (Buka)" : ""));
          setTimeLeft({
            hours: Math.floor(diff / 60),
            minutes: diff % 60 === 0 ? 0 : diff % 60 - 1,
            seconds: 60 - now.getSeconds() === 60 ? 0 : 60 - now.getSeconds(),
          });
          found = true;
          break;
        }
      }

      if (!found) {
        // After Isya
        setNextEvent("Imsak Esok");
        // Logic for next day could be added here, but simpler to just show 0 or "Besok"
      }
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
