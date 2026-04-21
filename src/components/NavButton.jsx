export default function NavButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border px-3 py-2 text-left text-xs transition-all duration-300 ${
        active
          ? "border-cyan-500/25 bg-cyan-50 text-slate-900 shadow-sm"
          : "border-slate-200 bg-white/70 text-slate-500 hover:border-slate-300 hover:bg-white hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}
