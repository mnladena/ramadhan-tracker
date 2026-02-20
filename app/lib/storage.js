const STORAGE_KEY = "ramadhan_planner_2026";

export function getTrackerData(day) {
  if (typeof window === "undefined") return getDefaultData();
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_day_${day}`);
    if (!raw) return getDefaultData();
    return JSON.parse(raw);
  } catch {
    return getDefaultData();
  }
}

export function setTrackerData(day, data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_KEY}_day_${day}`, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data:", e);
  }
}

export function getDefaultData() {
  return {
    shalat: {
      subuh: false,
      dzuhur: false,
      ashar: false,
      maghrib: false,
      isya: false,
      tarawih: false,
      tahajjud: false,
    },
    quran: {
      juz: 0,
      pages: 0,
    },
    puasa: false,
    sedekah: false,
    dzikir_pagi: false,
    dzikir_petang: false,
    notes: "",
  };
}

export function getAllTrackerData() {
  if (typeof window === "undefined") return {};
  const allData = {};
  for (let day = 1; day <= 30; day++) {
    allData[day] = getTrackerData(day);
  }
  return allData;
}

export function getDashboardStats() {
  const allData = getAllTrackerData();
  let totalShalatDone = 0;
  let totalShalatPossible = 0;
  let fastingDays = 0;
  let totalQuranJuz = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  for (let day = 1; day <= 30; day++) {
    const d = allData[day];
    if (!d) continue;

    const shalatKeys = Object.keys(d.shalat || {});
    const dayShalaatDone = shalatKeys.filter((k) => d.shalat[k]).length;
    totalShalatDone += dayShalaatDone;
    totalShalatPossible += shalatKeys.length;

    if (d.puasa) fastingDays++;
    if (d.quran) totalQuranJuz = Math.max(totalQuranJuz, d.quran.juz || 0);

    if (dayShalaatDone >= 5) {
      tempStreak++;
    } else {
      if (tempStreak > currentStreak) currentStreak = tempStreak;
      tempStreak = 0;
    }
  }
  if (tempStreak > currentStreak) currentStreak = tempStreak;

  return {
    shalatPercentage: totalShalatPossible > 0 ? Math.round((totalShalatDone / totalShalatPossible) * 100) : 0,
    fastingDays,
    quranJuz: totalQuranJuz,
    shalatStreak: currentStreak,
  };
}

export function getDayProgress(day) {
  const data = getTrackerData(day);
  if (!data) return 0;

  let done = 0;
  let total = 0;

  // Shalat (7 items)
  const shalatKeys = Object.keys(data.shalat || {});
  shalatKeys.forEach((k) => {
    total++;
    if (data.shalat[k]) done++;
  });

  // Puasa
  total++;
  if (data.puasa) done++;

  // Sedekah
  total++;
  if (data.sedekah) done++;

  // Dzikir
  total++;
  if (data.dzikir_pagi) done++;
  total++;
  if (data.dzikir_petang) done++;

  // Quran (count if any progress)
  total++;
  if (data.quran && (data.quran.juz > 0 || data.quran.pages > 0)) done++;

  return total > 0 ? Math.round((done / total) * 100) : 0;
}

export function getLastReadSurah() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_last_read`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setLastReadSurah(surah, ayat = null) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_KEY}_last_read`, JSON.stringify({
      ...surah,
      ayat,
      readAt: new Date().toISOString()
    }));
  } catch (e) {
    console.error("Failed to save last read:", e);
  }
}
