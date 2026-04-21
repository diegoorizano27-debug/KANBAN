export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200 bg-white/86 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
