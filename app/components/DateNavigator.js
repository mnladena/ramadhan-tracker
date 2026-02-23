"use client";

export default function DateNavigator({ currentDay, onDayChange, todayLimit }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onDayChange(Math.max(1, currentDay - 1))}
        disabled={currentDay <= 1}
        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex-1 text-center">
        <p className="text-xs text-amber-400/80 uppercase tracking-widest">Ramadhan</p>
        <p className="text-3xl font-bold text-white">Hari ke-{currentDay}</p>
      </div>

      <button
        onClick={() => onDayChange(Math.min(30, currentDay + 1))}
        disabled={currentDay >= 30}
        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
