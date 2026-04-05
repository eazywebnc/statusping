"use client";

import { motion } from "framer-motion";
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

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Check your endpoints every 30 seconds. HTTP, HTTPS, TCP, and ping monitoring with customizable intervals.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description:
      "Get notified via email, SMS, or webhook the moment something goes wrong. Never miss a downtime event.",
  },
  {
    icon: Globe,
    title: "Status Pages",
    description:
      "Beautiful, branded status pages your customers can trust. Custom domains and embed widgets included.",
  },
  {
    icon: LineChart,
    title: "Uptime Reports",
    description:
      "Detailed analytics with response time charts, uptime percentages, and historical incident data.",
  },
  {
    icon: Smartphone,
    title: "SMS Notifications",
    description:
      "Critical alerts delivered directly to your phone. Configure escalation policies for your team.",
  },
  {
    icon: Webhook,
    title: "Webhooks & API",
    description:
      "Integrate with Slack, Discord, PagerDuty, and more. Full REST API for custom integrations.",
  },
  {
    icon: Lock,
    title: "SSL Monitoring",
    description:
      "Get alerted before your SSL certificates expire. Automatic checks with configurable warning thresholds.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on edge infrastructure for the fastest possible check times. Global monitoring from multiple regions.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
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
            Powerful monitoring tools that keep you informed and your customers happy.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-zinc-900/60"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
