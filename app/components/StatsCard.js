"use client";

export default function StatsCard({ icon, value, label, color = "amber" }) {
  const colorMap = {
    amber: "from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400",
    emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400",
  };

  const classes = colorMap[color] || colorMap.amber;

  return (
    <div className={`bg-gradient-to-br ${classes} rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  );
}
