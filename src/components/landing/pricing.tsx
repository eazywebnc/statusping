"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS, type PlanId } from "@/lib/stripe";
import Link from "next/link";

const planOrder: PlanId[] = ["free", "pro", "business"];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
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
          <p className="text-sm font-medium text-cyan-400 mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {planOrder.map((planId, i) => {
            const plan = PLANS[planId];
            const isPopular = planId === "pro";

            return (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 ${
                  isPopular
                    ? "border-cyan-500/50 bg-gradient-to-b from-cyan-500/[0.08] to-transparent glow-cyan"
                    : "border-zinc-800 bg-zinc-900/30"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-zinc-400">/month</span>
                    )}
                  </div>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 mt-0.5 text-cyan-400 shrink-0" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/login" className="block">
                  <Button
                    variant={isPopular ? "default" : "secondary"}
                    className="w-full"
                  >
                    {plan.price === 0 ? "Get Started Free" : "Start Free Trial"}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
