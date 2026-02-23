"use client";

import { IMSAKIYAH_JAKARTA } from "./data";

const PRAYER_STORAGE_KEY = "ramadhan_prayer_times";
const LOCATION_STORAGE_KEY = "ramadhan_user_location";

const KEMENAG_API_BASE = "https://api.myquran.com/v2/sholat";

async function getKemenagCityId(cityName) {
  if (!cityName) return null;
  try {
    const res = await fetch(`${KEMENAG_API_BASE}/kota/cari/${cityName}`);
    const data = await res.json();
    if (data.status && data.data && data.data.length > 0) {
      // Find exact match or first one
      const match = data.data.find(c => c.lokasi.toLowerCase().includes(cityName.toLowerCase())) || data.data[0];
      return match.id;
    }
    return null;
  } catch {
    return null;
  }
}

async function getKemenagPrayerTimes(cityId, year, month, day) {
  try {
    const res = await fetch(`${KEMENAG_API_BASE}/jadwal/${cityId}/${year}/${month}/${day}`);
    const data = await res.json();
    if (data.status && data.data && data.data.jadwal) {
      const j = data.data.jadwal;
      return {
        imsak: j.imsak,
        subuh: j.subuh,
        terbit: j.terbit,
        dzuhur: j.dzuhur,
        ashar: j.ashar,
        maghrib: j.maghrib,
        isya: j.isya,
        readableDate: j.tanggal,
        location: data.data.lokasi
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getPrayerTimes(dateString) {
  if (typeof window === "undefined") return null;

  try {
    const coords = await getUserCoordinates();
    if (!coords) return getFallbackTimes(dateString);

    const { latitude, longitude, name } = coords;
    
    // Check cache first (per day)
    const cacheKey = `${PRAYER_STORAGE_KEY}_${dateString}_${name}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    // Try Kemenag API (via City Name)
    const [year, month, day] = dateString.split("-");
    const cityId = await getKemenagCityId(name);
    if (cityId) {
      const kemenagData = await getKemenagPrayerTimes(cityId, year, month, day);
      if (kemenagData) {
        localStorage.setItem(cacheKey, JSON.stringify(kemenagData));
        return kemenagData;
      }
    }

    // Fallback to Aladhan API (with Kemenag method 11)
    // Method 2 is ISNA, common in Indonesia/SE Asia
    const response = await fetch(`https://api.aladhan.com/v1/timings/${dateString}?latitude=${latitude}&longitude=${longitude}&method=11`);
    const data = await response.json();

    if (data.code === 200) {
      const timings = data.data.timings;
      const formatted = {
        imsak: timings.Imsak,
        subuh: timings.Fajr,
        terbit: timings.Sunrise,
        dzuhur: timings.Dhuhr,
        ashar: timings.Asr,
        maghrib: timings.Maghrib,
        isya: timings.Isha,
        readableDate: data.data.date.readable,
        location: name
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(formatted));
      return formatted;
    }
    
    return getFallbackTimes(dateString);
  } catch (error) {
    console.error("Failed to fetch prayer times:", error);
    return getFallbackTimes(dateString);
  }
}

async function getLocationName(lat, lon) {
  try {
    // BigDataCloud is faster and more accurate for city-level reverse geocoding
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=id`);
    const data = await res.json();
    return data.city || data.locality || data.principalSubdivision || null;
  } catch {
    return null;
  }
}

async function getIPLocation() {
  try {
    const res = await fetch('https://freeipapi.com/api/json');
    const data = await res.json();
    if (data.latitude && data.longitude) {
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        name: data.cityName || data.regionName || "Lokasi Anda"
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getUserCoordinates() {
  // Check stored location
  const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  // Try Browser Geolocation first
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      getIPLocation().then(resolve);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const name = await getLocationName(latitude, longitude);
        const coords = { latitude, longitude, name: name || "Lokasi Anda" };
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(coords));
        resolve(coords);
      },
      async () => {
        // Fallback to IP-based location if permission denied
        const ipLoc = await getIPLocation();
        if (ipLoc) {
          localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(ipLoc));
        }
        resolve(ipLoc);
      },
      { timeout: 5000 }
    );
  });
}

export async function fetchMonthlySchedule(year, month) {
  if (typeof window === "undefined") return null;
  
  try {
    const coords = await getUserCoordinates();
    if (!coords) return null;

    const { latitude, longitude, name } = coords;
    
    // Try Kemenag Monthly first
    const cityId = await getKemenagCityId(name);
    if (cityId) {
      try {
        const res = await fetch(`${KEMENAG_API_BASE}/jadwal/${cityId}/${year}/${month}`);
        const data = await res.json();
        if (data.status && data.data && data.data.jadwal) {
          return {
            location: data.data.lokasi,
            timings: data.data.jadwal.map(j => ({
              date: j.tanggal,
              day: parseInt(j.tanggal.split("-")[2]),
              imsak: j.imsak,
              subuh: j.subuh,
              terbit: j.terbit,
              dzuhur: j.dzuhur,
              ashar: j.ashar,
              maghrib: j.maghrib,
              isya: j.isya,
            }))
          };
        }
      } catch (e) { console.error("Kemenag monthly error:", e); }
    }

    // Fallback to Aladhan Monthly
    const response = await fetch(`https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=11`);
    const data = await response.json();

    if (data.code === 200) {
      return {
        location: name,
        timings: data.data.map(day => ({
          date: day.date.readable,
          day: parseInt(day.date.gregorian.day), // This is not quite right but we'll use array index in page
          imsak: day.timings.Imsak.split(" ")[0],
          subuh: day.timings.Fajr.split(" ")[0],
          terbit: day.timings.Sunrise.split(" ")[0],
          dzuhur: day.timings.Dhuhr.split(" ")[0],
          ashar: day.timings.Asr.split(" ")[0],
          maghrib: day.timings.Maghrib.split(" ")[0],
          isya: day.timings.Isha.split(" ")[0],
        }))
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch monthly schedule:", error);
    return null;
  }
}

function getFallbackTimes(dateString) {
  // Return Jakarta times as fallback
  // We need to find which day of Ramadhan it is, or just use today's Jakarta schedule
  // For simplicity, we use the first day's Jakarta schedule in this helper
  const schedule = IMSAKIYAH_JAKARTA[0];
  return {
    ...schedule,
    location: "Jakarta (Default)"
  };
}
