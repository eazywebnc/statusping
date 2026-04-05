"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm text-cyan-400 mb-8"
        >
          <Zap className="h-3.5 w-3.5" />
          Uptime monitoring made simple
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-[1.1]"
        >
          Know When Your Site Goes Down{" "}
          <span className="gradient-text">Before Your Customers Do</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto"
        >
          Monitor your websites and APIs every 30 seconds. Get instant alerts
          when things break. Share beautiful status pages with your users.
        </motion.p>

        {/* CTA */}
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
          className="mt-12 flex items-center justify-center gap-8 text-sm text-zinc-500"
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

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mx-auto max-w-4xl"
        >
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-1 glow-cyan">
            <div className="rounded-lg bg-zinc-900 p-6">
              {/* Fake dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 status-pulse" />
                  <span className="text-sm font-medium text-white">All Systems Operational</span>
                </div>
                <span className="text-xs text-zinc-500">Last checked: 12s ago</span>
              </div>
              {/* Fake monitor rows */}
              {[
                { name: "API Server", uptime: "99.99%", time: "45ms", status: "up" },
                { name: "Web App", uptime: "99.97%", time: "120ms", status: "up" },
                { name: "CDN", uptime: "100%", time: "12ms", status: "up" },
                { name: "Payment Gateway", uptime: "99.95%", time: "230ms", status: "up" },
              ].map((monitor, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-t border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${monitor.status === "up" ? "bg-emerald-400" : "bg-red-400"}`} />
                    <span className="text-sm text-zinc-300">{monitor.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-emerald-400 font-mono">{monitor.uptime}</span>
                    <span className="text-sm text-zinc-500 font-mono w-16 text-right">{monitor.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <div className="mt-16 max-w-4xl mx-auto px-4">
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-cyan-500/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <Image
              src="/images/dashboard.webp"
              alt="StatusPing uptime monitoring dashboard"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
