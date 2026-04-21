import {
  ClipboardList,
  Gauge,
  Package,
  TrendingUp,
  ShieldCheck,
  Wrench,
  Factory,
  Boxes,
} from "lucide-react";

export const slides = [
  { id: "cover", label: "01 / Cover" },
  { id: "summary", label: "02 / Overview" },
  { id: "baseline", label: "03 / Baseline" },
  { id: "vsm", label: "04 / VSM" },
  { id: "causes", label: "05 / Root Causes" },
  { id: "model", label: "06 / Model" },
  { id: "kanban", label: "07 / Materials" },
  { id: "validation", label: "08 / Validation" },
  { id: "results", label: "09 / Results" },
  { id: "closing", label: "10 / Conclusions" },
];

export const familyData = [
  { family: "1 Burner", orders: 27, onTime: 20, late: 7, otd: 74.07, penalties: 520, share: 2.8 },
  { family: "2 Burners", orders: 80, onTime: 56, late: 24, otd: 70.0, penalties: 14641, share: 78.0 },
  { family: "3 Burners", orders: 41, onTime: 33, late: 8, otd: 80.49, penalties: 3615, share: 19.2 },
];

export const rootCauseData = [
  { cause: "Searching / disorder", weight: 24.3, loss: 4563, cum: 24.3 },
  { cause: "Painting rework", weight: 19.2, loss: 3605, cum: 43.5 },
  { cause: "Prolonged setup", weight: 18.5, loss: 3474, cum: 62.0 },
  { cause: "Material stockouts", weight: 17.1, loss: 3211, cum: 79.1 },
  { cause: "Mechanical failures", weight: 12.2, loss: 2291, cum: 91.3 },
  { cause: "Electrical instability", weight: 8.7, loss: 1632, cum: 100.0 },
];

export const vsmSteps = [
  { step: "Base cutting", ct: 6, setup: 10, fpy: 98, wait: 0.6, type: "fabrication" },
  { step: "Base deburring", ct: 4, setup: 8, fpy: 99, wait: 0.5, type: "fabrication" },
  { step: "Base bending", ct: 5, setup: 8, fpy: 98, wait: 0.7, type: "fabrication" },
  { step: "Base welding", ct: 12, setup: 12, fpy: 96, wait: 0.7, type: "critical" },
  { step: "Leg cutting", ct: 4, setup: 8, fpy: 99, wait: 0.6, type: "fabrication" },
  { step: "Leg welding", ct: 10, setup: 12, fpy: 90, wait: 0.8, type: "quality" },
  { step: "Grill bar cutting", ct: 6, setup: 8, fpy: 98, wait: 0.6, type: "fabrication" },
  { step: "Grill welding", ct: 12, setup: 10, fpy: 95, wait: 0.9, type: "critical" },
  { step: "Sheet cutting", ct: 3, setup: 6, fpy: 94, wait: 0.4, type: "quality" },
  { step: "Logo stamping", ct: 2, setup: 4, fpy: 93, wait: 0.3, type: "quality" },
  { step: "Sheet welding", ct: 10, setup: 12, fpy: 96, wait: 0.6, type: "critical" },
  { step: "Washing", ct: 6, setup: 8, fpy: 98, wait: 0.6, type: "support" },
  { step: "Painting", ct: 26, setup: 25, fpy: 98, wait: 1.2, type: "constraint" },
  { step: "Oven curing", ct: 28, setup: 10, fpy: 98, wait: 1.0, type: "constraint" },
  { step: "Accessories", ct: 8, setup: 6, fpy: 98, wait: 0.9, type: "support" },
  { step: "Packaging", ct: 6, setup: 4, fpy: 99, wait: 0.6, type: "support" },
];

export const phaseData = [
  {
    id: "phase1",
    title: "Phase 1 · Stabilize",
    icon: ShieldCheck,
    accent: "from-cyan-500/10 to-sky-500/5",
    bullets: ["5S + visual management", "Search and motion loss reduction", "Workstation discipline and layout clarity"],
  },
  {
    id: "phase2",
    title: "Phase 2 · Flow",
    icon: Wrench,
    accent: "from-indigo-500/10 to-blue-500/5",
    bullets: ["SMED for setup compression", "Standardized work for repeatability", "Variance reduction at critical operations"],
  },
  {
    id: "phase3",
    title: "Phase 3 · Reliability",
    icon: Factory,
    accent: "from-violet-500/10 to-fuchsia-500/5",
    bullets: ["TPM routines", "Micro-stoppage control", "Availability stabilization"],
  },
  {
    id: "phase4",
    title: "Phase 4 · Replenishment",
    icon: Boxes,
    accent: "from-emerald-500/10 to-cyan-500/5",
    bullets: ["BOM-driven digital Kanban", "ROP-based triggering", "Low-cost digital signaling"],
  },
];

export const kanbanData = [
  { material: "Burner assembly", category: "Components", unit: "pc", bom: 2.0, d: 40, lt: 12, ss: 80, rop: 560, q: 600 },
  { material: "Valve + injector set", category: "Components", unit: "pc", bom: 2.0, d: 40, lt: 10, ss: 80, rop: 480, q: 500 },
  { material: "Control knob", category: "Components", unit: "pc", bom: 2.0, d: 40, lt: 7, ss: 80, rop: 360, q: 800 },
  { material: "Grate", category: "Components", unit: "pc", bom: 1.0, d: 20, lt: 9, ss: 40, rop: 220, q: 300 },
  { material: "LPG hose kit", category: "Packaging & kits", unit: "set", bom: 1.0, d: 20, lt: 6, ss: 40, rop: 160, q: 250 },
  { material: "Packaging set", category: "Packaging & kits", unit: "set", bom: 1.0, d: 20, lt: 3, ss: 20, rop: 80, q: 250 },
  { material: "Powder paint", category: "Materials", unit: "kg", bom: 0.12, d: 2.4, lt: 5, ss: 2.4, rop: 14.4, q: 25 },
  { material: "Stainless sheet AISI 430", category: "Materials", unit: "kg", bom: 0.9, d: 18, lt: 8, ss: 18, rop: 162, q: 500 },
  { material: "Carbon steel sheet", category: "Materials", unit: "kg", bom: 2.5, d: 50, lt: 5, ss: 50, rop: 300, q: 1000 },
];

export const scenarioData = {
  "AS-IS": {
    otd: 70.0,
    ci: "69.2–70.8",
    capacity: 14.52,
    late: 24.0,
    penalty: 14641,
    setup: 6.67,
    search: 11.0,
    rework: 0.10,
    stockout: 0.15,
  },
  Base: {
    otd: 95.7,
    ci: "94.8–96.5",
    capacity: 19.9,
    late: 3.5,
    penalty: 2110,
    setup: 2.17,
    search: 1.07,
    rework: 0.02,
    stockout: 0.02,
  },
  Conservative: {
    otd: 91.3,
    ci: "90.1–92.4",
    capacity: 18.85,
    late: 7.0,
    penalty: 4270,
    setup: 2.17,
    search: 1.07,
    rework: 0.02,
    stockout: 0.02,
  },
  Optimistic: {
    otd: 97.8,
    ci: "97.0–98.4",
    capacity: 20.62,
    late: 1.8,
    penalty: 1070,
    setup: 2.17,
    search: 1.07,
    rework: 0.02,
    stockout: 0.02,
  },
};

export const comparisonBars = [
  { metric: "OTD (%)", asis: 70.0, tobe: 95.7 },
  { metric: "Capacity", asis: 14.52, tobe: 19.9 },
  { metric: "Late orders", asis: 24.0, tobe: 3.5 },
  { metric: "Penalty (USD)", asis: 14641, tobe: 2110 },
];

export const radarData = [
  { subject: "Flow stability", asis: 45, tobe: 88 },
  { subject: "Material availability", asis: 40, tobe: 92 },
  { subject: "Changeover agility", asis: 38, tobe: 84 },
  { subject: "Execution control", asis: 42, tobe: 90 },
  { subject: "Delivery reliability", asis: 48, tobe: 95 },
  { subject: "Digital readiness", asis: 35, tobe: 82 },
];

export const kpiCards = [
  { label: "Orders analyzed", value: "148", sub: "2024 order trace", icon: ClipboardList },
  { label: "Global OTD", value: "73.65%", sub: "Observed baseline", icon: Gauge },
  { label: "Critical family", value: "2 Burners", sub: "80 orders · 70% OTD", icon: Package },
  { label: "Annual loss", value: "$18,776", sub: "Delay-related exposure", icon: TrendingUp },
];
