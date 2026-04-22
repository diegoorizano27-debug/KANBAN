import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const slideFade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function SlideShell({
  id,
  eyebrow,
  title,
  subtitle,
  rightSlot,
  children,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`relative flex min-h-screen snap-start items-center px-6 py-20 lg:px-10 xl:px-16 ${className}`}
    >
      <div className="mx-auto grid w-full max-w-[1500px] gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={slideFade}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-700">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
          <div className="space-y-4">
            <h2 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-950 md:text-5xl xl:text-6xl">
              {title}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base xl:text-lg">
              {subtitle}
            </p>
          </div>
          {children}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          {rightSlot}
        </motion.div>
      </div>
    </section>
  );
}
