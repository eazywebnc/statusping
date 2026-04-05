"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Bell,
  Activity,
  Globe,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Animated Uptime Graph SVG                                          */
/* ------------------------------------------------------------------ */

function UptimeGraph() {
  // Generate uptime bars (90 days)
  const days = Array.from({ length: 90 }, (_, i) => {
    // Simulate mostly green, occasional yellow/red
    if (i === 34) return "degraded";
    if (i === 67) return "incident";
    return "operational";
  });

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-zinc-500">90-day uptime</span>
        <span className="text-[10px] font-mono text-emerald-400">99.98%</span>
      </div>
      <div className="flex gap-[2px]">
        {days.map((status, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8 + i * 0.008, duration: 0.2 }}
            className={`flex-1 h-6 rounded-[2px] origin-bottom ${
              status === "operational"
                ? "bg-emerald-500/70"
                : status === "degraded"
                ? "bg-amber-500/70"
                : "bg-rose-500/70"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[8px] text-zinc-600">90 days ago</span>
        <span className="text-[8px] text-zinc-600">Today</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Page Mockup                                                 */
/* ------------------------------------------------------------------ */

const monitors = [
  { name: "API Server", uptime: "99.99%", latency: "45ms", status: "operational" },
  { name: "Web Application", uptime: "99.97%", latency: "120ms", status: "operational" },
  { name: "CDN / Static Assets", uptime: "100%", latency: "12ms", status: "operational" },
  { name: "Payment Gateway", uptime: "99.95%", latency: "230ms", status: "operational" },
  { name: "Database Cluster", uptime: "99.99%", latency: "8ms", status: "operational" },
];

const recentEvents = [
  { type: "resolved", text: "API latency spike resolved", time: "2h ago" },
  { type: "monitoring", text: "CDN migration complete, monitoring", time: "1d ago" },
];

function StatusPageMockup() {
  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#080c10]/80 overflow-hidden shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-zinc-500 flex items-center gap-1.5">
            <Globe className="w-3 h-3" />
            status.yourcompany.com
          </div>
        </div>
        <div className="w-16" />
      </div>

      <div className="p-5">
        {/* Status header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-5"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(52, 211, 153, 0.4)",
                  "0 0 0 8px rgba(52, 211, 153, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-emerald-400"
            />
            <span className="text-sm font-semibold text-white">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            <Activity className="w-3 h-3 text-cyan-400" />
            Checked 12s ago
          </div>
        </motion.div>

        {/* Monitor rows */}
        <div className="space-y-0 rounded-xl border border-white/[0.06] overflow-hidden">
          {monitors.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[12px] text-zinc-300">{m.name}</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-[11px] font-mono text-emerald-400">{m.uptime}</span>
                <span className="text-[11px] font-mono text-zinc-500 w-14 text-right">{m.latency}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Uptime Graph */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-4"
        >
          <UptimeGraph />
        </motion.div>

        {/* Response time chart (SVG) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-zinc-500">Response Time (24h)</span>
            <span className="text-[10px] font-mono text-cyan-400">avg 67ms</span>
          </div>
          <svg viewBox="0 0 400 60" className="w-full h-auto" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,40 C20,38 40,35 60,30 C80,25 100,20 120,22 C140,24 160,35 180,32 C200,28 220,18 240,15 C260,12 280,20 300,25 C320,30 340,28 360,22 C380,16 395,18 400,20"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
            />
            <path
              d="M0,40 C20,38 40,35 60,30 C80,25 100,20 120,22 C140,24 160,35 180,32 C200,28 220,18 240,15 C260,12 280,20 300,25 C320,30 340,28 360,22 C380,16 395,18 400,20 L400,60 L0,60 Z"
              fill="url(#fillGrad)"
            />
          </svg>
        </motion.div>

        {/* Recent events */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4"
        >
          <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2 font-medium">Recent Events</p>
          <div className="space-y-1.5">
            {recentEvents.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + i * 0.1 }}
                className="flex items-center gap-2 text-[10px]"
              >
                {e.type === "resolved" ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                )}
                <span className="text-zinc-400 flex-1">{e.text}</span>
                <span className="text-zinc-600">{e.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating badges                                                    */
/* ------------------------------------------------------------------ */

function FloatingBadges() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, type: "spring" }}
        className="absolute -right-3 top-12 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-lg"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <div>
          <p className="text-[10px] font-medium text-emerald-300">All Clear</p>
          <p className="text-[9px] text-zinc-500">5/5 monitors healthy</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.1, type: "spring" }}
        className="absolute -left-3 bottom-28 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-lg"
      >
        <Bell className="w-4 h-4 text-cyan-400" />
        <div>
          <p className="text-[10px] font-medium text-cyan-300">Alert Sent</p>
          <p className="text-[9px] text-zinc-500">Slack + Email in 3s</p>
        </div>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Text */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm text-cyan-400 mb-8"
          >
            <Zap className="h-3.5 w-3.5" />
            Uptime monitoring made simple
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-[1.1]"
          >
            Know When Your Site Goes Down{" "}
            <span className="gradient-text">Before Your Customers Do</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Monitor your websites and APIs every 30 seconds. Get instant alerts
            when things break. Share beautiful status pages with your users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/auth/login">
              <Button size="xl" className="group">
                Start Monitoring Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="secondary" size="xl">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-cyan-500" />
              Alerts in seconds
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-500" />
              Setup in 2 minutes
            </div>
          </motion.div>
        </div>

        {/* Status Page Mockup */}
        <motion.div
          style={{ y: mockupY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 80 }}
          className="relative max-w-4xl mx-auto"
        >
          <FloatingBadges />
          <StatusPageMockup />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-cyan-500/15 blur-[60px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
