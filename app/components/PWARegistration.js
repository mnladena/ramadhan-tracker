"use client";

import { useEffect } from "react";

export default function PWARegistration() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.serivceWorker !== undefined
    ) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered"))
        .catch((err) => console.log("Service Worker registration failed", err));
    } else if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Direct registration if not using workbox
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return null;
}
