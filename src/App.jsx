import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  ChevronDown,
  ChevronsUpDown,
  Factory,
  Gauge,
  Layers3,
  LayoutDashboard,
  LineChart as LineChartIcon,
  Package,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import GlassCard from "./components/GlassCard";
import MetricPill from "./components/MetricPill";
import NavButton from "./components/NavButton";
import SlideShell, { slideFade } from "./components/SlideShell";
import {
  slides,
  familyData,
  rootCauseData,
  vsmSteps,
  phaseData,
  kanbanData,
  scenarioData,
  comparisonBars,
  radarData,
  kpiCards,
} from "./data/presentationData";

function formatNumber(v) {
  return new Intl.NumberFormat("en-US").format(v);
}

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  boxShadow: "0 20px 40px rgba(15,23,42,0.08)",
};

export default function App() {
  const scrollerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState("cover");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedStep, setSelectedStep] = useState(vsmSteps[12]);
  const [selectedPhase, setSelectedPhase] = useState(phaseData[0]);
  const [scenario, setScenario] = useState("Base");
  const [kanbanFilter, setKanbanFilter] = useState("All");

  const filteredKanban = useMemo(() => {
    return kanbanFilter === "All"
      ? kanbanData
      : kanbanData.filter((item) => item.category === kanbanFilter);
  }, [kanbanFilter]);

  useEffect(() => {
    const sections = slides.map((s) => document.getElementById(s.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSlide(entry.target.id);
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleKey = (e) => {
      const idx = slides.findIndex((s) => s.id === activeSlide);
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        const next = slides[Math.min(idx + 1, slides.length - 1)];
        document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth" });
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        const prev = slides[Math.max(idx - 1, 0)];
        document.getElementById(prev.id)?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeSlide]);

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-950">
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-slate-200/70">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500"
          animate={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[-8%] h-[32rem] w-[32rem] rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute bottom-[-8%] left-[20%] h-[24rem] w-[24rem] rounded-full bg-violet-200/25 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />
      </div>

      <div className="fixed right-4 top-4 z-40 hidden w-[250px] rounded-[28px] border border-slate-200 bg-white/86 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl xl:block">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Presentation</div>
            <div className="mt-1 text-sm font-medium text-slate-950">Lean–Digital Kanban Study</div>
          </div>
          <LayoutDashboard className="h-4 w-4 text-cyan-600" />
        </div>
        <div className="space-y-2">
          {slides.map((slide) => (
            <NavButton
              key={slide.id}
              active={activeSlide === slide.id}
              onClick={() => document.getElementById(slide.id)?.scrollIntoView({ behavior: "smooth" })}
            >
              {slide.label}
            </NavButton>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
          <div className="uppercase tracking-[0.25em] text-slate-400">Navigation</div>
          <div className="mt-2 leading-6">Scroll, use the right panel, or press ↑ ↓ / PageUp PageDown.</div>
        </div>
      </div>

      <main ref={scrollerRef} className="snap-y snap-mandatory">
        <section id="cover" className="relative flex min-h-screen snap-start items-center px-6 py-20 lg:px-10 xl:px-16">
          <div className="mx-auto grid w-full max-w-[1500px] gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:gap-12">
            <motion.div initial="hidden" animate="visible" variants={slideFade} className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-cyan-700">
                <Sparkles className="h-4 w-4" />
                Industrial Engineering Program
              </div>

              <div className="space-y-6">
                <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] text-slate-950 md:text-6xl xl:text-7xl">
                  Integrated Lean–Digital Kanban Model for Improving Production Efficiency and OTD Performance in a Gas Stove Manufacturing SME
                </h1>

                <div className="max-w-4xl space-y-4">
                  <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Authors</div>
                  <p className="text-base leading-8 text-slate-700 xl:text-lg">
                    Diego Orizano-Salvador · Francis Lachos-Silva · Fernando Maradiegue-Tuesta · Fabiola Pinzón-Hoyos · Anita Straujuma
                  </p>
                </div>

                <div className="max-w-4xl space-y-4">
                  <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Affiliations</div>
                  <p className="text-base leading-8 text-slate-600 xl:text-lg">
                    Department of Industrial Engineering, Peruvian University of Applied Sciences (UPC), Lima, Peru · International Business Program, Pilot University of Colombia, Bogotá, Colombia · Faculty of Engineering Economics and Management, Riga, Latvia
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpiCards.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + idx * 0.08, duration: 0.55 }}
                    >
                      <GlassCard className="h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]">
                        <div className="flex items-start justify-between">
                          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{item.label}</div>
                          <Icon className="h-4 w-4 text-cyan-600" />
                        </div>
                        <div className="mt-5 text-3xl font-semibold text-slate-950">{item.value}</div>
                        <div className="mt-2 text-sm text-slate-600">{item.sub}</div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => document.getElementById("summary")?.scrollIntoView({ behavior: "smooth" })}
                  className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  Start presentation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <ChevronDown className="h-4 w-4 animate-bounce" />
                  Scroll to continue
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="relative"
            >
              <GlassCard className="relative overflow-hidden p-6 xl:p-7">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,182,212,0.06),transparent_35%,rgba(99,102,241,0.06))]" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Study at a glance</div>
                      <div className="mt-2 text-2xl font-semibold text-slate-950">Problem, method and expected contribution</div>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                      <Gauge className="h-5 w-5 text-cyan-700" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <MetricPill label="Context" value="Gas stove SME" accent="cyan" />
                    <MetricPill label="Focus" value="OTD improvement" accent="emerald" />
                    <MetricPill label="Method" value="Lean + DES" accent="blue" />
                    <MetricPill label="Scope" value="2024 dataset" accent="violet" />
                  </div>

                  <GlassCard className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Research logic</div>
                        <div className="mt-1 text-lg font-medium text-slate-950">Core structure of the study</div>
                      </div>
                      <BarChart3 className="h-4 w-4 text-cyan-600" />
                    </div>
                    <div className="grid gap-3">
                      {[
                        "Baseline diagnosis identifies the family with the highest delivery and economic exposure.",
                        "Current-state VSM makes waiting, setups, rework and constraints visible across the flow.",
                        "An integrated Lean–Digital Kanban model is proposed to stabilize execution and material availability.",
                        "DES compares AS-IS and TO-BE scenarios using explicit and conservative assumptions.",
                      ].map((text, i) => (
                        <div key={text} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-700">
                            {i + 1}
                          </div>
                          <p className="text-sm leading-6 text-slate-600">{text}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        <SlideShell
          id="summary"
          eyebrow="Study overview"
          title="The research integrates flow stabilization and replenishment control to improve delivery reliability"
          subtitle="The narrative is organized around four connected questions: where the delivery problem is concentrated, what the current flow reveals, how the integrated model intervenes, and what performance gains are validated through simulation."
          rightSlot={
            <GlassCard className="h-full p-6 xl:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Overview</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">Baseline and target state</div>
                </div>
                <LayoutDashboard className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <GlassCard className="p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Global OTD</div>
                  <div className="mt-3 text-4xl font-semibold text-slate-950">73.65%</div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "73.65%" }} viewport={{ once: false }} className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  </div>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Validated OTD</div>
                  <div className="mt-3 text-4xl font-semibold text-slate-950">95.7%</div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "95.7%" }} viewport={{ once: false }} className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                  </div>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Critical family share</div>
                  <div className="mt-3 text-4xl font-semibold text-slate-950">78%</div>
                  <p className="mt-2 text-sm text-slate-600">of total delay-related penalties</p>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">PCE</div>
                  <div className="mt-3 text-4xl font-semibold text-slate-950">2.85%</div>
                  <p className="mt-2 text-sm text-slate-600">indicating major non-value-added time</p>
                </GlassCard>
              </div>
              <div className="mt-6 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={comparisonBars}>
                    <defs>
                      <linearGradient id="asisArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.03} />
                      </linearGradient>
                      <linearGradient id="tobeArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148,163,184,0.25)" vertical={false} />
                    <XAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="asis" stroke="#06b6d4" fill="url(#asisArea)" strokeWidth={2.5} />
                    <Area type="monotone" dataKey="tobe" stroke="#10b981" fill="url(#tobeArea)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Business problem",
                text: "The delivery gap does not arise from a single failure. It emerges from accumulated execution variability and material discontinuity across the production system.",
                icon: TrendingUp,
              },
              {
                title: "Research focus",
                text: "The study does not evaluate isolated Lean tools. It examines how flow stabilization and replenishment logic can work together in a low-cost SME context.",
                icon: Layers3,
              },
              {
                title: "Validation strategy",
                text: "Claims are bounded by published evidence and then tested through DES so that the results remain transparent and operationally credible.",
                icon: ShieldCheck,
              },
              {
                title: "Managerial relevance",
                text: "The model links diagnosis, prioritization, intervention design and expected business outcomes in one coherent decision framework.",
                icon: BarChart3,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.title} className="group p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
                  <div className="flex items-start justify-between">
                    <div className="text-lg font-medium text-slate-950">{item.title}</div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 group-hover:border-cyan-200 group-hover:bg-cyan-50">
                      <Icon className="h-5 w-5 text-cyan-700" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                </GlassCard>
              );
            })}
          </div>
        </SlideShell>

        <SlideShell
          id="baseline"
          eyebrow="Baseline diagnosis"
          title="The main delivery exposure is economically concentrated in the two-burner family"
          subtitle="The baseline does not distribute urgency evenly across the system. One product family concentrates most of the order volume and most of the penalty exposure, making it the natural focus of the intervention."
          rightSlot={
            <GlassCard className="h-full p-6 xl:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Family comparison</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">OTD and penalty profile</div>
                </div>
                <BarChart3 className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={familyData} barGap={12}>
                    <CartesianGrid stroke="rgba(148,163,184,0.25)" vertical={false} />
                    <XAxis dataKey="family" stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                    <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: "#475569" }} />
                    <Bar yAxisId="left" dataKey="otd" name="OTD %" radius={[12, 12, 0, 0]} fill="#06b6d4" />
                    <Bar yAxisId="right" dataKey="penalties" name="Penalty USD" radius={[12, 12, 0, 0]} fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {familyData.map((item) => (
                  <div key={item.family} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{item.family}</div>
                    <div className="mt-3 text-2xl font-semibold text-slate-950">{item.orders}</div>
                    <div className="text-sm text-slate-600">orders in 2024</div>
                    <div className="mt-3 text-sm leading-6 text-slate-600">
                      {item.onTime} on time · {item.late} late
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          }
        >
          <div className="grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
            <GlassCard className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Criticality</div>
                  <div className="mt-1 text-xl font-medium text-slate-950">Why the two-burner family becomes the focal lens</div>
                </div>
                <Package className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="space-y-4">
                {[
                  ["Volume dominance", "80 orders out of 148"],
                  ["OTD weakness", "70.0% on-time"],
                  ["Economic concentration", "$14,641 in expected baseline penalty exposure"],
                  ["Implication", "Improving this family moves most of the delivery problem"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="text-sm text-slate-600">{label}</div>
                    <div className="text-sm font-medium text-slate-950">{value}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Penalty share</div>
                  <div className="mt-1 text-xl font-medium text-slate-950">Economic concentration map</div>
                </div>
                <TrendingUp className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={familyData} dataKey="share" nameKey="family" innerRadius={65} outerRadius={100} paddingAngle={4}>
                      {["#06b6d4", "#10b981", "#6366f1"].map((color) => (
                        <Cell key={color} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: "#475569" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        </SlideShell>

        <section id="vsm" className="relative min-h-screen snap-start px-6 py-20 lg:px-10 xl:px-16">
          <div className="mx-auto w-full max-w-[1500px]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2 }} variants={slideFade} className="mb-8 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-700">
                <Factory className="h-3.5 w-3.5" />
                AS-IS Value Stream Map
              </div>
              <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr] xl:items-end">
                <div>
                  <h2 className="text-4xl font-semibold leading-tight text-slate-950 md:text-5xl xl:text-6xl">
                    The current-state map reveals where time accumulates and flow loses stability
                  </h2>
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 md:text-base xl:text-lg">
                    The current-state VSM combines waiting, setups, quality yield and process times to show where lead time expands.
                    Select any process node to inspect its local profile and observe how instability propagates across the stream.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-4">
                  <MetricPill label="Raw material buffer" value="17 days" accent="blue" />
                  <MetricPill label="TAV" value="0.31 days" accent="cyan" />
                  <MetricPill label="TNVA" value="10.5 days" accent="violet" />
                  <MetricPill label="PCE" value="2.85%" accent="emerald" />
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <GlassCard className="overflow-hidden p-5 xl:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Process flow</div>
                    <div className="mt-1 text-xl font-medium text-slate-950">Select a node to inspect the process profile</div>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 text-cyan-600" />
                </div>

                <div className="relative overflow-x-auto pb-2">
                  <div className="absolute left-0 right-0 top-[82px] h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                  <div className="flex min-w-[1550px] gap-3 pr-4">
                    {vsmSteps.map((item, idx) => {
                      const isActive = selectedStep.step === item.step;
                      const tone =
                        item.type === "constraint"
                          ? "from-amber-50 to-orange-50 border-amber-100"
                          : item.type === "critical"
                          ? "from-cyan-50 to-blue-50 border-cyan-100"
                          : item.type === "quality"
                          ? "from-violet-50 to-fuchsia-50 border-violet-100"
                          : "from-white to-slate-50 border-slate-200";

                      return (
                        <button
                          key={item.step}
                          onClick={() => setSelectedStep(item)}
                          className={`relative mt-8 w-[190px] shrink-0 rounded-[24px] border bg-gradient-to-br p-4 text-left transition-all duration-300 hover:-translate-y-1 ${tone} ${
                            isActive ? "shadow-[0_0_0_1px_rgba(14,165,233,0.25),0_20px_40px_rgba(15,23,42,0.08)]" : ""
                          }`}
                        >
                          <div className="absolute -top-8 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 text-xs text-cyan-700">
                            {idx + 1}
                          </div>
                          <div className="min-h-[58px] text-sm font-medium leading-5 text-slate-950">{item.step}</div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                            <div>CT</div>
                            <div className="text-right text-slate-950">{item.ct} min</div>
                            <div>Setup</div>
                            <div className="text-right text-slate-950">{item.setup} min</div>
                            <div>Wait</div>
                            <div className="text-right text-slate-950">{item.wait} d</div>
                            <div>FPY</div>
                            <div className="text-right text-slate-950">{item.fpy}%</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="h-full p-5 xl:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedStep.step}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Selected node</div>
                        <div className="mt-1 text-2xl font-semibold text-slate-950">{selectedStep.step}</div>
                      </div>
                      <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs uppercase tracking-[0.2em] text-cyan-700">
                        {selectedStep.type}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <MetricPill label="Cycle time" value={`${selectedStep.ct} min`} accent="cyan" />
                      <MetricPill label="Setup" value={`${selectedStep.setup} min`} accent="blue" />
                      <MetricPill label="FPY" value={`${selectedStep.fpy}%`} accent="emerald" />
                      <MetricPill label="Inter-process wait" value={`${selectedStep.wait} days`} accent="violet" />
                    </div>

                    <GlassCard className="p-4">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Interpretation</div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {selectedStep.type === "constraint"
                          ? "This step behaves as the visible capacity governor. High processing time and accumulated waiting make it a central leverage point for stabilization and delivery improvement."
                          : selectedStep.type === "quality"
                          ? "This node reflects quality fragility. Moderate cycle times can still become delivery-relevant when FPY erosion triggers rework and hidden schedule slippage."
                          : selectedStep.type === "critical"
                          ? "This transformation step is structurally important. Setups, welding effort and queue growth here propagate variability downstream, especially before finishing operations."
                          : "This step is not the main bottleneck by itself, but local instability contributes to cumulative lead-time inflation across the stream."}
                      </p>
                    </GlassCard>

                    <div className="h-[240px] rounded-[24px] border border-slate-200 bg-slate-50 p-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[selectedStep]}>
                          <CartesianGrid stroke="rgba(148,163,184,0.25)" vertical={false} />
                          <XAxis dataKey="step" hide />
                          <YAxis stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Legend wrapperStyle={{ color: "#475569" }} />
                          <Bar dataKey="ct" name="CT (min)" radius={[10, 10, 0, 0]} fill="#06b6d4" />
                          <Bar dataKey="setup" name="Setup (min)" radius={[10, 10, 0, 0]} fill="#6366f1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </GlassCard>
            </div>
          </div>
        </section>

        <SlideShell
          id="causes"
          eyebrow="Economic root causes"
          title="Root-cause prioritization converts operational waste into an economic decision map"
          subtitle="The Pareto structure matters because it ranks improvement priorities by financial impact. This makes the intervention roadmap clearer under SME resource constraints."
          rightSlot={
            <GlassCard className="h-full p-6 xl:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Pareto view</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">Cumulative loss concentration</div>
                </div>
                <LineChartIcon className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={rootCauseData}>
                    <CartesianGrid stroke="rgba(148,163,184,0.25)" vertical={false} />
                    <XAxis
                      dataKey="cause"
                      stroke="#94a3b8"
                      tick={{ fill: "#475569", fontSize: 11 }}
                      angle={-16}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: "#475569" }} />
                    <Bar yAxisId="left" dataKey="loss" name="Allocated loss (USD)" fill="#06b6d4" radius={[12, 12, 0, 0]} />
                    <Line yAxisId="right" dataKey="cum" name="Cumulative %" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          }
        >
          <div className="grid gap-4">
            {rootCauseData.map((item, idx) => (
              <motion.div
                key={item.cause}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group grid gap-4 rounded-[28px] border border-slate-200 bg-white/86 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_24px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_0.7fr_0.55fr_1fr]"
              >
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Root cause {idx + 1}</div>
                  <div className="mt-2 text-lg font-medium text-slate-950">{item.cause}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Weight</div>
                  <div className="mt-2 text-2xl font-semibold text-cyan-700">{item.weight}%</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Loss</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-950">${formatNumber(item.loss)}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    <span>Cumulative concentration</span>
                    <span>{item.cum}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.cum}%` }}
                      viewport={{ once: false }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </SlideShell>

        <section id="model" className="relative min-h-screen snap-start px-6 py-20 lg:px-10 xl:px-16">
          <div className="mx-auto w-full max-w-[1500px]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2 }} variants={slideFade} className="mb-8 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-700">
                <Layers3 className="h-3.5 w-3.5" />
                Integrated improvement model
              </div>
              <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr] xl:items-end">
                <div>
                  <h2 className="text-4xl font-semibold leading-tight text-slate-950 md:text-5xl xl:text-6xl">
                    The model connects four phases into one intervention architecture
                  </h2>
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 md:text-base xl:text-lg">
                    The intervention is designed as a sequence of mutually reinforcing actions. Stabilization reduces variability,
                    and the replenishment layer protects critical materials from stockout-driven disruption.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <MetricPill label="Lean" value="5S · SMED · SW · TPM" accent="cyan" />
                  <MetricPill label="Replenishment" value="BOM-driven ROP" accent="emerald" />
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
              <GlassCard className="p-5 xl:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Phased roadmap</div>
                    <div className="mt-1 text-xl font-medium text-slate-950">Select a phase to expand</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-cyan-600" />
                </div>
                <div className="space-y-3">
                  {phaseData.map((phase, idx) => {
                    const Icon = phase.icon;
                    const active = selectedPhase.id === phase.id;
                    return (
                      <button
                        key={phase.id}
                        onClick={() => setSelectedPhase(phase)}
                        className={`w-full rounded-[24px] border p-4 text-left transition-all duration-300 ${
                          active
                            ? "border-cyan-200 bg-cyan-50 shadow-sm"
                            : "border-slate-200 bg-slate-50 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                              <Icon className="h-5 w-5 text-cyan-700" />
                            </div>
                            <div>
                              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Step {idx + 1}</div>
                              <div className="mt-1 text-lg font-medium text-slate-950">{phase.title}</div>
                            </div>
                          </div>
                          <ArrowRight className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${active ? "translate-x-1 text-cyan-700" : ""}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </GlassCard>

              <GlassCard className="p-5 xl:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPhase.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div className={`rounded-[28px] border border-slate-200 bg-gradient-to-br p-5 ${selectedPhase.accent}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Expanded phase</div>
                          <div className="mt-2 text-2xl font-semibold text-slate-950">{selectedPhase.title}</div>
                        </div>
                        <selectedPhase.icon className="h-6 w-6 text-cyan-700" />
                      </div>
                      <div className="mt-5 grid gap-3">
                        {selectedPhase.bullets.map((bullet) => (
                          <div key={bullet} className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm leading-6 text-slate-700">
                            {bullet}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <GlassCard className="p-4">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Role in the model</div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          Each phase reduces uncertainty so that the next layer of control can operate with more discipline and less noise.
                        </p>
                      </GlassCard>
                      <GlassCard className="p-4">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Expected effect</div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          The cumulative logic targets shorter setups, lower rework, higher availability and fewer stockout-driven interruptions.
                        </p>
                      </GlassCard>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                      {[
                        ["Stability", 82],
                        ["Speed", 76],
                        ["Reliability", 88],
                        ["Visibility", 91],
                      ].map(([label, val]) => (
                        <GlassCard key={label} className="p-4 text-center">
                          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</div>
                          <div className="mt-3 text-3xl font-semibold text-slate-950">{val}%</div>
                        </GlassCard>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </GlassCard>
            </div>
          </div>
        </section>

        <SlideShell
          id="kanban"
          eyebrow="Critical materials"
          title="The replenishment layer is designed around a small set of materials with the highest interruption risk"
          subtitle="The material logic is intentionally selective. Critical items are parameterized through demand, lead time, safety stock and reorder points so that replenishment reacts to actual exposure rather than intuition."
          rightSlot={
            <GlassCard className="h-full p-6 xl:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Parameter table</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">Critical material filter</div>
                </div>
                <Boxes className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {["All", "Components", "Materials", "Packaging & kits"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setKanbanFilter(filter)}
                    className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
                      kanbanFilter === filter
                        ? "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="max-h-[430px] overflow-auto rounded-[24px] border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-white/95 backdrop-blur-xl">
                    <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      <th className="px-4 py-3">Material</th>
                      <th className="px-4 py-3">Unit</th>
                      <th className="px-4 py-3">D</th>
                      <th className="px-4 py-3">LT</th>
                      <th className="px-4 py-3">SS</th>
                      <th className="px-4 py-3">ROP</th>
                      <th className="px-4 py-3">Q</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKanban.map((item) => (
                      <tr key={item.material} className="border-b border-slate-100 transition-colors duration-300 hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-950">
                          {item.material}
                          <div className="mt-1 text-xs text-slate-500">{item.category}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{item.unit}</td>
                        <td className="px-4 py-3 text-slate-600">{item.d}</td>
                        <td className="px-4 py-3 text-slate-600">{item.lt}</td>
                        <td className="px-4 py-3 text-slate-600">{item.ss}</td>
                        <td className="px-4 py-3 text-cyan-700">{item.rop}</td>
                        <td className="px-4 py-3 text-emerald-700">{item.q}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Selection principle",
                text: "Critical items are chosen because they strongly affect flow continuity through non-negligible lead times and stockout sensitivity.",
              },
              {
                title: "Parameter logic",
                text: "ROP = D × LT + SS links consumption, replenishment time and protection stock into a practical trigger rule.",
              },
              {
                title: "Operational feasibility",
                text: "The architecture can be implemented with basic digital tools without requiring full ERP or MES integration.",
              },
              {
                title: "Connection to Lean",
                text: "Once execution is more stable, replenishment signals can respond to actual demand and no longer operate as last-minute reactions.",
              },
            ].map((item, idx) => (
              <GlassCard key={item.title} className="group p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
                <div className="flex items-start justify-between">
                  <div className="text-lg font-medium text-slate-950">{item.title}</div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-cyan-700">0{idx + 1}</div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </GlassCard>
            ))}
          </div>
        </SlideShell>

        <SlideShell
          id="validation"
          eyebrow="Validation logic"
          title="The validation design keeps the expected gains bounded, transparent and auditable"
          subtitle="The study avoids aggressive projections. Improvement bounds are defined using published evidence and then tested through DES over the full 2024 horizon."
          rightSlot={
            <GlassCard className="h-full p-6 xl:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Validation sequence</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">From assumptions to output metrics</div>
                </div>
                <ShieldCheck className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="space-y-4">
                {[
                  {
                    no: "01",
                    title: "Bound the intervention",
                    text: "Published Lean, SMED and TPM evidence defines realistic and non-aggressive improvement ranges.",
                  },
                  {
                    no: "02",
                    title: "Model AS-IS and TO-BE",
                    text: "DES holds the same demand logic constant while changing only the validated operational drivers.",
                  },
                  {
                    no: "03",
                    title: "Report uncertainty",
                    text: "Thirty replications generate 95% confidence intervals for OTD, capacity, late orders and penalty exposure.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.no}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="rounded-[24px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-sm font-semibold text-cyan-700">
                        {item.no}
                      </div>
                      <div>
                        <div className="text-lg font-medium text-slate-950">{item.title}</div>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Key assumptions</div>
                  <div className="mt-1 text-xl font-medium text-slate-950">AS-IS vs TO-BE operational drivers</div>
                </div>
                <Gauge className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="space-y-3">
                {[
                  ["Paint effective CT", "26.8 → 22.0 min/unit"],
                  ["Oven effective CT", "29.0 → 23.0 min/unit"],
                  ["Setup loss", "Triangular(2,6,12) → Triangular(0.5,2,4)"],
                  ["Search / motion loss", "Triangular(5,10,18) → Triangular(0.2,1.0,2.0)"],
                  ["Stockout probability", "0.15 → 0.02 per shift"],
                  ["Residual rework", "0.10 → 0.02"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm">
                    <span className="text-slate-600">{k}</span>
                    <span className="font-medium text-slate-950">{v}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Capability profile</div>
                  <div className="mt-1 text-xl font-medium text-slate-950">System maturity before and after</div>
                </div>
                <LineChartIcon className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(148,163,184,0.35)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 11 }} />
                    <Radar name="AS-IS" dataKey="asis" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.18} strokeWidth={2} />
                    <Radar name="TO-BE" dataKey="tobe" stroke="#10b981" fill="#10b981" fillOpacity={0.16} strokeWidth={2} />
                    <Legend wrapperStyle={{ color: "#475569" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        </SlideShell>

        <section id="results" className="relative min-h-screen snap-start px-6 py-20 lg:px-10 xl:px-16">
          <div className="mx-auto w-full max-w-[1500px]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2 }} variants={slideFade} className="mb-8 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-700">
                <TrendingUp className="h-3.5 w-3.5" />
                DES results
              </div>
              <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr] xl:items-end">
                <div>
                  <h2 className="text-4xl font-semibold leading-tight text-slate-950 md:text-5xl xl:text-6xl">
                    Simulation outputs show a strong OTD recovery with lower delivery risk exposure
                  </h2>
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 md:text-base xl:text-lg">
                    Scenario selection allows the results to be read through different levels of conservatism.
                    The base case remains the reference because it balances impact and plausibility.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(scenarioData).map((key) => (
                    <button
                      key={key}
                      onClick={() => setScenario(key)}
                      className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
                        scenario === key
                          ? "bg-slate-950 text-white shadow-xl"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <GlassCard className="p-5 xl:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scenario}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Selected scenario</div>
                        <div className="mt-1 text-2xl font-semibold text-slate-950">{scenario}</div>
                      </div>
                      <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs uppercase tracking-[0.2em] text-cyan-700">
                        95% CI
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <MetricPill label="OTD" value={`${scenarioData[scenario].otd}%`} accent="cyan" />
                      <MetricPill label="Capacity" value={`${scenarioData[scenario].capacity}`} accent="blue" />
                      <MetricPill label="Late orders" value={`${scenarioData[scenario].late}`} accent="violet" />
                      <MetricPill label="Penalty exposure" value={`$${formatNumber(scenarioData[scenario].penalty)}`} accent="emerald" />
                    </div>

                    <GlassCard className="p-4">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Confidence interval</div>
                      <div className="mt-3 text-3xl font-semibold text-slate-950">{scenarioData[scenario].ci}</div>
                      <p className="mt-2 text-sm text-slate-600">OTD 95% confidence interval for the selected scenario.</p>
                    </GlassCard>

                    <div className="grid gap-3">
                      {[
                        ["Setup loss", scenarioData[scenario].setup, "min/shift"],
                        ["Search / motion loss", scenarioData[scenario].search, "min/shift"],
                        ["Residual rework", scenarioData[scenario].rework, "p"],
                        ["Stockout probability", scenarioData[scenario].stockout, "p/shift"],
                      ].map(([label, value, unit]) => {
                        const width = typeof value === "number"
                          ? Math.min(100, Number(value) * (label.includes("probability") || label.includes("rework") ? 450 : 7))
                          : 40;

                        return (
                          <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">{label}</span>
                              <span className="font-medium text-slate-950">{value} {unit}</span>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-slate-100">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${width}%` }}
                                transition={{ duration: 0.6 }}
                                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </GlassCard>

              <GlassCard className="p-5 xl:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Comparative results</div>
                    <div className="mt-1 text-2xl font-semibold text-slate-950">Base scenario vs AS-IS</div>
                  </div>
                  <Gauge className="h-5 w-5 text-cyan-600" />
                </div>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonBars} barGap={18}>
                      <CartesianGrid stroke="rgba(148,163,184,0.25)" vertical={false} />
                      <XAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                      <YAxis stroke="#94a3b8" tick={{ fill: "#475569", fontSize: 12 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend wrapperStyle={{ color: "#475569" }} />
                      <Bar dataKey="asis" name="AS-IS" fill="#06b6d4" radius={[12, 12, 0, 0]} />
                      <Bar dataKey="tobe" name="TO-BE Base" fill="#10b981" radius={[12, 12, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-4">
                  {[
                    ["OTD uplift", "+25.7 pp"],
                    ["Capacity gain", "+37.1%"],
                    ["Late orders", "−85.4%"],
                    ["Penalty exposure", "−85.6%"],
                  ].map(([label, val]) => (
                    <GlassCard key={label} className="p-4 text-center">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</div>
                      <div className="mt-3 text-3xl font-semibold text-slate-950">{val}</div>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <SlideShell
          id="closing"
          eyebrow="Conclusions"
          title="The combined model suggests that delivery reliability improves when execution stability and replenishment control are treated as one system"
          subtitle="The main conclusion is not that one tool solved the problem, but that a coordinated architecture of flow stabilization and material signaling can substantially reduce delay exposure in an SME setting."
          rightSlot={
            <GlassCard className="h-full p-6 xl:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Key takeaways</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">Synthesis of findings</div>
                </div>
                <Sparkles className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="space-y-3">
                {[
                  "OTD reliability behaves as a system-level problem rather than an isolated process problem.",
                  "Economic prioritization helps direct scarce SME resources toward the most critical drivers.",
                  "Lean stabilization and Digital Kanban strengthen each other when implemented as one architecture.",
                  "DES provides a transparent bridge between operational reasoning and quantified performance expectations.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          }
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Diagnosis",
                text: "The baseline shows where delivery failure is concentrated and why the two-burner family deserves priority.",
              },
              {
                title: "Flow logic",
                text: "The VSM demonstrates that waiting, setups, rework and bottlenecks cannot be addressed as disconnected issues.",
              },
              {
                title: "Intervention",
                text: "The proposed model combines Lean stabilization and BOM-driven replenishment into one coherent implementation path.",
              },
              {
                title: "Results",
                text: "Under the validated scenario set, the model suggests higher OTD, fewer late orders and much lower penalty exposure.",
              },
            ].map((item, idx) => (
              <GlassCard key={item.title} className="group p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
                <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">0{idx + 1}</div>
                <div className="mt-3 text-lg font-medium text-slate-950">{item.title}</div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => document.getElementById("cover")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-all duration-300 hover:bg-slate-50"
            >
              Back to top
              <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
            </button>
            <div className="text-sm text-slate-500">
              Lean–Digital Kanban model for improving OTD performance in a gas stove manufacturing SME.
            </div>
          </div>
        </SlideShell>
      </main>
    </div>
  );
}
