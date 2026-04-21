export default function MetricPill({ label, value, accent = "cyan" }) {
  const colorMap = {
    cyan: "from-cyan-50 to-sky-50 text-slate-900 border-cyan-100",
    blue: "from-blue-50 to-indigo-50 text-slate-900 border-blue-100",
    violet: "from-violet-50 to-fuchsia-50 text-slate-900 border-violet-100",
    emerald: "from-emerald-50 to-teal-50 text-slate-900 border-emerald-100",
  };

  return (
    <div className={`rounded-3xl border bg-gradient-to-br px-4 py-4 ${colorMap[accent]}`}>
      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-950">{value}</div>
    </div>
  );
}
