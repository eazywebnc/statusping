"use client";

import { motion } from "framer-motion";
import { MonitorCheck, Bell, LayoutDashboard } from "lucide-react";

const steps = [
  {
    icon: MonitorCheck,
    step: "01",
    title: "Add Your Monitors",
    description:
      "Enter your website URL or API endpoint. Configure check intervals, expected status codes, and timeout thresholds.",
  },
  {
    icon: Bell,
    step: "02",
    title: "Get Instant Alerts",
    description:
      "When something goes wrong, you'll know immediately via email, SMS, or webhook. Set up escalation chains for your team.",
  },
  {
    icon: LayoutDashboard,
    step: "03",
    title: "Share Status Pages",
    description:
      "Create beautiful public status pages with your branding. Keep your customers informed with real-time updates.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-cyan-400 mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Up and running in{" "}
            <span className="gradient-text">2 minutes</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            No complex setup. No agents to install. Just add your URL and start monitoring.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
              )}

              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50">
                    <step.icon className="h-10 w-10 text-cyan-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-xs font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
