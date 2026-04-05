"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Monitor, Wifi } from "lucide-react";

export function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Your Monitoring{" "}
            <span className="gradient-text">Command Center</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            A real-time dashboard that gives you full visibility into your
            infrastructure health at a glance.
          </p>
        </motion.div>

        {/* Terminal-framed dashboard image */}
        <motion.div style={{ y, opacity }} className="relative">
          <div className="rounded-xl border border-white/[0.08] bg-[#0a0e14] overflow-hidden shadow-2xl shadow-cyan-500/10">
            {/* Terminal title bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#0d1117]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-0.5 rounded-md bg-white/[0.04] text-[11px] text-zinc-500" style={{ fontFamily: "var(--font-mono-display), monospace" }}>
                  <Monitor className="w-3 h-3" />
                  statusping &mdash; dashboard
                </div>
              </div>
              <div className="w-14" />
            </div>

            {/* Dashboard image */}
            <div className="relative">
              <Image
                src="/images/dashboard.webp"
                alt="StatusPing monitoring dashboard showing real-time uptime metrics, response times, and incident history"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority={false}
              />
              {/* Scanline overlay on image */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(6,182,212,0.02) 0px, rgba(6,182,212,0.02) 1px, transparent 1px, transparent 4px)",
                }}
              />
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-t border-white/[0.06] bg-[#0d1117] text-[10px] text-zinc-600" style={{ fontFamily: "var(--font-mono-display), monospace" }}>
              <span>dashboard v2.4.0</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-500">live</span>
                </span>
                <span>refreshing 30s</span>
                <span>5 monitors</span>
              </div>
            </div>
          </div>

          {/* Ambient glow behind the frame */}
          <div className="absolute -inset-4 -z-10 bg-cyan-500/[0.04] rounded-2xl blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
