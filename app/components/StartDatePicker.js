"use client";

import { useState, useEffect } from "react";
import { hasChosenStartDate, setRamadhanStartDate } from "../lib/storage";

export default function StartDatePicker() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Only show if user hasn't chosen yet
    if (!hasChosenStartDate()) {
      setShow(true);
    }
  }, []);

  const handleSelect = (day) => {
    setSelected(day);
  };

  const handleConfirm = () => {
    if (!selected) return;
    setAnimateOut(true);
    setTimeout(() => {
      setRamadhanStartDate(selected);
      setShow(false);
      // Force re-render entire app by reloading
      window.location.reload();
    }, 600);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-600 ${
        animateOut ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#111827] to-[#0a0f1a]">
        {/* Animated stars */}
        <div className="stars-bg absolute inset-0 opacity-60" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-[slideUp_0.8s_ease-out]">
        {/* Crescent Moon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center animate-[float_3s_ease-in-out_infinite]">
            <span className="text-7xl filter drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">🌙</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Ramadhan <span className="text-amber-400">1447H</span>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
            Pilih tanggal mulai puasa Ramadhan untuk menyesuaikan jadwal dan penanggalan ibadahmu
          </p>
        </div>

        {/* Date Options */}
        <div className="space-y-3 mb-8">
          <button
            onClick={() => handleSelect(18)}
            className={`w-full group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 border-2 ${
              selected === 18
                ? "border-amber-400 bg-amber-500/15 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                  selected === 18
                    ? "bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    : "bg-white/10 text-white/60"
                }`}
              >
                18
              </div>
              <div className="text-left flex-1">
                <p className={`font-bold text-lg transition-colors ${selected === 18 ? "text-white" : "text-white/80"}`}>
                  Rabu, 18 Februari 2026
                </p>
                <p className={`text-sm transition-colors ${selected === 18 ? "text-amber-400/80" : "text-white/40"}`}>
                  1 Ramadhan 1447H (Muhammadiyah)
                </p>
              </div>
              {selected === 18 && (
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center animate-[scaleIn_0.3s_ease-out]">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => handleSelect(19)}
            className={`w-full group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 border-2 ${
              selected === 19
                ? "border-amber-400 bg-amber-500/15 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                  selected === 19
                    ? "bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    : "bg-white/10 text-white/60"
                }`}
              >
                19
              </div>
              <div className="text-left flex-1">
                <p className={`font-bold text-lg transition-colors ${selected === 19 ? "text-white" : "text-white/80"}`}>
                  Kamis, 19 Februari 2026
                </p>
                <p className={`text-sm transition-colors ${selected === 19 ? "text-amber-400/80" : "text-white/40"}`}>
                  1 Ramadhan 1447H (Pemerintah/NU)
                </p>
              </div>
              {selected === 19 && (
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center animate-[scaleIn_0.3s_ease-out]">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
            selected
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
          }`}
        >
          {selected ? "Mulai Ramadhan 🚀" : "Pilih Tanggal Mulai"}
        </button>

        {/* Footer note */}
        <p className="text-center text-white/25 text-xs mt-4">
          Pilihan ini hanya muncul sekali dan dapat disesuaikan nanti
        </p>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
