"use client";

export default function ChecklistItem({ label, icon, checked, onChange, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        group flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-300
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
        ${checked
          ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          : !disabled ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20" : "bg-white/5 border border-white/10"
        }
      `}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      <span className={`flex-1 font-medium transition-colors ${checked ? "text-emerald-300" : "text-white/80"}`}>
        {label}
      </span>
      <div
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
          ${checked
            ? "bg-emerald-500 border-emerald-400 scale-110"
            : "border-white/30 group-hover:border-white/50"
          }
        `}
      >
        {checked && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}
