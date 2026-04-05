"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-zinc-900 to-teal-500/10 p-12 sm:p-16 text-center"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to stop losing customers to{" "}
              <span className="gradient-text">downtime</span>?
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8">
              Join thousands of businesses that trust StatusPing to keep their services online.
              Start monitoring in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/login">
                <Button size="xl" className="group">
                  Start Free Monitoring
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Free plan includes 3 monitors. No credit card required.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
