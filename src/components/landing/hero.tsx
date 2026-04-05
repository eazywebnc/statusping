"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield, Bell, Zap, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Terminal check data                                                */
/* ------------------------------------------------------------------ */

interface CheckLine {
  text: string;
  color: "cyan" | "green" | "yellow" | "white" | "dim";
}

const CHECKS: CheckLine[] = [
  { text: "$ statusping monitor --run-all", color: "white" },
  { text: "", color: "dim" },
  { text: "[1/5] Checking api.yoursite.com........... 200 OK  (45ms)  \u2713", color: "green" },
  { text: "[2/5] Checking app.yoursite.com........... 200 OK  (120ms) \u2713", color: "green" },
  { text: "[3/5] Checking cdn.yoursite.com........... 200 OK  (12ms)  \u2713", color: "green" },
  { text: "[4/5] Checking pay.yoursite.com........... 200 OK  (230ms) \u2713", color: "green" },
  { text: "[5/5] Checking db.yoursite.com............ 200 OK  (8ms)   \u2713", color: "green" },
  { text: "", color: "dim" },
  { text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", color: "dim" },
  { text: "\u2713 All 5 monitors operational. Uptime: 99.99%", color: "cyan" },
  { text: "  Next check in 30s \u2014 Alerts: Slack, Email, SMS", color: "dim" },
];

/* ------------------------------------------------------------------ */
/*  Typing cursor component                                            */
/* ------------------------------------------------------------------ */

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Terminal window                                                     */
/* ------------------------------------------------------------------ */

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleLines >= CHECKS.length) {
      setIsTypingDone(true);
      return;
    }

    const currentLine = CHECKS[visibleLines];

    // Empty lines appear instantly
    if (currentLine.text === "") {
      const timeout = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCurrentCharIndex(0);
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Type character by character
    if (currentCharIndex < currentLine.text.length) {
      // First line (command) types slower, checks type faster
      const isCommand = visibleLines === 0;
      const speed = isCommand ? 35 : 12;
      const timeout = setTimeout(() => {
        setCurrentCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    // Line complete, pause then move to next
    const pauseTime = visibleLines === 0 ? 600 : visibleLines <= 1 ? 200 : 150;
    const timeout = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setCurrentCharIndex(0);
    }, pauseTime);
    return () => clearTimeout(timeout);
  }, [visibleLines, currentCharIndex]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [visibleLines, currentCharIndex]);

  const colorMap: Record<CheckLine["color"], string> = {
    cyan: "text-cyan-400",
    green: "text-emerald-400",
    yellow: "text-amber-400",
    white: "text-zinc-100",
    dim: "text-zinc-500",
  };

  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#0a0e14] overflow-hidden shadow-2xl shadow-cyan-500/10">
      {/* macOS title bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#0d1117]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 px-3 py-0.5 rounded-md bg-white/[0.04] text-[11px] text-zinc-500 font-mono">
            <Terminal className="w-3 h-3" />
            statusping \u2014 monitor
          </div>
        </div>
        <div className="w-14" />
      </div>

      {/* Terminal body */}
      <div
        ref={terminalBodyRef}
        className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-6 h-[320px] sm:h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700/40"
      >
        {CHECKS.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${colorMap[line.color]} whitespace-pre`}>
            {line.text || "\u00A0"}
          </div>
        ))}

        {/* Currently typing line */}
        {visibleLines < CHECKS.length && (
          <div
            className={`${colorMap[CHECKS[visibleLines].color]} whitespace-pre`}
          >
            {CHECKS[visibleLines].text.slice(0, currentCharIndex)}
            <BlinkingCursor />
          </div>
        )}

        {/* Cursor after all done */}
        {isTypingDone && (
          <div className="text-zinc-500 mt-1">
            $ <BlinkingCursor />
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-t border-white/[0.06] bg-[#0d1117] text-[10px] font-mono text-zinc-600">
        <span>statusping v2.4.0</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            connected
          </span>
          <span>utf-8</span>
          <span>bash</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger: terminal shrinks and slides up on scroll
  useEffect(() => {
    if (!terminalRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(terminalRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -120,
        scale: 0.85,
        opacity: 0.3,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-16 pb-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />

      {/* Horizontal scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(6,182,212,0.03) 0px, rgba(6,182,212,0.03) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* CRT vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Terminal */}
        <motion.div
          ref={terminalRef}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-12 sm:mt-16"
        >
          <TerminalWindow />
        </motion.div>

        {/* Headline + CTAs below the terminal */}
        <div className="mt-16 sm:mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm text-cyan-400 mb-8"
          >
            <Zap className="h-3.5 w-3.5" />
            Real-time uptime monitoring
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-[1.1]"
          >
            Know When Your Site Goes Down{" "}
            <span className="gradient-text">Before Your Customers Do</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Monitor your websites and APIs every 30 seconds. Get instant alerts
            when things break. Share beautiful status pages with your users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
            transition={{ duration: 0.8, delay: 0.8 }}
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

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 80 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-emerald-500/10 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />
            <div style={{ perspective: "1200px" }}>
              <motion.div
                initial={{ rotateX: 6, scale: 0.97 }}
                whileInView={{ rotateX: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ transformOrigin: "center top" }}
              >
                <Image
                  src="/images/dashboard.webp"
                  alt="StatusPing Dashboard"
                  width={1200}
                  height={675}
                  className="rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
                  priority
                />
              </motion.div>
            </div>
            {/* Bottom glow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-cyan-500/20 blur-[50px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
