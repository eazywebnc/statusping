"use client";


import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  Bell,
  Globe,
  LineChart,
  Lock,
  Smartphone,
  Webhook,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animated visual: uptime graph (green line chart with pulsing dots) */
/* ------------------------------------------------------------------ */
function UptimeGraph() {
  return (
    <div className="relative mt-4 h-32 w-full overflow-hidden rounded-lg bg-zinc-950/60 border border-zinc-800/50 p-3">
      <svg
        viewBox="0 0 400 100"
        fill="none"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        {/* grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="rgba(63,63,70,0.4)"
            strokeDasharray="4 4"
          />
        ))}
        {/* uptime line */}
        <motion.path
          d="M0,70 C30,68 50,40 80,38 C110,36 130,42 160,30 C190,18 210,22 240,20 C270,18 290,25 320,15 C350,5 370,10 400,8"
          stroke="url(#greenGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
        {/* area fill */}
        <motion.path
          d="M0,70 C30,68 50,40 80,38 C110,36 130,42 160,30 C190,18 210,22 240,20 C270,18 290,25 320,15 C350,5 370,10 400,8 L400,100 L0,100 Z"
          fill="url(#greenAreaGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
        <defs>
          <linearGradient id="greenGrad" x1="0" y1="0" x2="400" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient
            id="greenAreaGrad"
            x1="200"
            y1="0"
            x2="200"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {/* pulsing dots */}
      {[
        { x: "20%", y: "36%", delay: 0.4 },
        { x: "40%", y: "28%", delay: 0.7 },
        { x: "60%", y: "18%", delay: 1.0 },
        { x: "80%", y: "13%", delay: 1.3 },
        { x: "100%", y: "6%", delay: 1.6 },
      ].map((dot) => (
        <motion.div
          key={dot.x}
          className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          style={{ left: dot.x, top: dot.y, transform: "translate(-50%, -50%)" }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: dot.delay }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
        </motion.div>
      ))}
      {/* labels */}
      <div className="absolute bottom-1.5 left-3 text-[10px] text-zinc-500">
        24h ago
      </div>
      <div className="absolute bottom-1.5 right-3 text-[10px] text-zinc-500">
        Now
      </div>
      <div className="absolute top-2 right-3 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-medium text-emerald-400">
          99.98% uptime
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated visual: notification popup sliding in from the right     */
/* ------------------------------------------------------------------ */
function AlertPopup() {
  const alerts = [
    {
      title: "api.example.com is down",
      subtitle: "HTTP 503 — Response time 12.4s",
      time: "2s ago",
      color: "bg-red-500",
    },
    {
      title: "api.example.com recovered",
      subtitle: "HTTP 200 — Response time 142ms",
      time: "Just now",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="relative mt-4 flex flex-col gap-2.5 overflow-hidden">
      {alerts.map((alert, i) => (
        <motion.div
          key={alert.title}
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            delay: i * 0.6 + 0.3,
          }}
          className="flex items-start gap-3 rounded-lg border border-zinc-800/60 bg-zinc-950/60 px-3.5 py-2.5"
        >
          <span
            className={`mt-1 h-2 w-2 shrink-0 rounded-full ${alert.color}`}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">
              {alert.title}
            </p>
            <p className="truncate text-[10px] text-zinc-500">
              {alert.subtitle}
            </p>
          </div>
          <span className="shrink-0 text-[10px] text-zinc-600">
            {alert.time}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature data                                                      */
/* ------------------------------------------------------------------ */
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  span: 1 | 2;
  visual?: "graph" | "alerts";
}

const features: Feature[] = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Check your endpoints every 30 seconds. HTTP, HTTPS, TCP, and ping monitoring with customizable intervals.",
    span: 2,
    visual: "graph",
  },
  {
    icon: Globe,
    title: "Status Pages",
    description:
      "Beautiful, branded status pages your customers can trust. Custom domains and embed widgets included.",
    span: 1,
  },
  {
    icon: Lock,
    title: "SSL Monitoring",
    description:
      "Get alerted before your SSL certificates expire. Automatic checks with configurable warning thresholds.",
    span: 1,
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description:
      "Get notified via email, SMS, or webhook the moment something goes wrong. Never miss a downtime event.",
    span: 2,
    visual: "alerts",
  },
  {
    icon: LineChart,
    title: "Uptime Reports",
    description:
      "Detailed analytics with response time charts, uptime percentages, and historical incident data.",
    span: 1,
  },
  {
    icon: Smartphone,
    title: "SMS & Call Alerts",
    description:
      "Critical alerts delivered directly to your phone. Configure escalation policies for your team.",
    span: 1,
  },
  {
    icon: Webhook,
    title: "Webhooks & API",
    description:
      "Integrate with Slack, Discord, PagerDuty, and more. Full REST API for custom integrations.",
    span: 1,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on edge infrastructure for the fastest possible check times. Global monitoring from multiple regions.",
    span: 1,
  },
];

/* ------------------------------------------------------------------ */
/*  Feature card                                                      */
/* ------------------------------------------------------------------ */
function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-zinc-900/60 ${
        feature.span === 2 ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      {/* subtle glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(400px_at_50%_0%,rgba(34,211,238,0.06),transparent)]" />

      <div className="relative z-10">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
          <feature.icon className="h-5 w-5" />
        </div>
        <h3 className="mb-2 text-base font-semibold text-white">
          {feature.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {feature.description}
        </p>

        {feature.visual === "graph" && <UptimeGraph />}
        {feature.visual === "alerts" && <AlertPopup />}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Features section                                                  */
/* ------------------------------------------------------------------ */
export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-cyan-400 mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything you need to stay{" "}
            <span className="gradient-text">online</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Powerful monitoring tools that keep you informed and your customers
            happy.
          </p>
        </motion.div>

        {/* Bento Grid with scroll parallax */}
        <motion.div
          style={{ y: gridY, opacity: gridOpacity }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>

        {/* Feature Screenshots */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <Image
              src="/images/feature-1.webp"
              alt="Real-time uptime monitoring and alerting"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <Image
              src="/images/feature-2.webp"
              alt="Status page customization and notifications"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
