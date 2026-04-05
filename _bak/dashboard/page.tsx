"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowUpRight,
  Clock,
  Globe,
  Plus,
  RefreshCw,
  TrendingUp,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { cn, formatUptime, formatResponseTime, getStatusBgColor, timeAgo } from "@/lib/utils";
import type { Monitor, MonitorMethod } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMonitor, setNewMonitor] = useState({
    name: "",
    url: "",
    method: "GET" as MonitorMethod,
    interval_seconds: 300,
  });
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  async function fetchMonitors() {
    const { data } = await supabase
      .from("sp_monitors")
      .select("*")
      .order("created_at", { ascending: false });
    setMonitors(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchMonitors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addMonitor(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("sp_monitors").insert({
      user_id: user.id,
      name: newMonitor.name,
      url: newMonitor.url,
      method: newMonitor.method,
      interval_seconds: newMonitor.interval_seconds,
    });

    setNewMonitor({ name: "", url: "", method: "GET", interval_seconds: 300 });
    setShowAddModal(false);
    setSaving(false);
    fetchMonitors();
  }

  async function deleteMonitor(id: string) {
    await supabase.from("sp_monitors").delete().eq("id", id);
    fetchMonitors();
  }

  async function toggleMonitor(id: string, isActive: boolean) {
    await supabase
      .from("sp_monitors")
      .update({ is_active: !isActive })
      .eq("id", id);
    fetchMonitors();
  }

  const upCount = monitors.filter((m) => m.last_status === "up").length;
  const downCount = monitors.filter((m) => m.last_status === "down").length;
  const avgUptime =
    monitors.length > 0
      ? monitors.reduce((acc, m) => acc + (m.uptime_percentage ?? 100), 0) /
        monitors.length
      : 100;
  const avgResponse =
    monitors.length > 0
      ? monitors.reduce((acc, m) => acc + (m.last_response_time_ms ?? 0), 0) /
        monitors.filter((m) => m.last_response_time_ms !== null).length || 0
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Monitor your services in real-time
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4" />
          Add Monitor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Total Monitors</p>
                <p className="text-2xl font-bold text-white">{monitors.length}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Online</p>
                <p className="text-2xl font-bold text-emerald-400">{upCount}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Wifi className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Avg Uptime</p>
                <p className="text-2xl font-bold text-white">
                  {formatUptime(avgUptime)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Avg Response</p>
                <p className="text-2xl font-bold text-white">
                  {avgResponse > 0 ? formatResponseTime(Math.round(avgResponse)) : "--"}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitors List */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Monitors</CardTitle>
          <Button variant="ghost" size="sm" onClick={fetchMonitors}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-5 w-5 text-zinc-500 animate-spin" />
            </div>
          ) : monitors.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-1">
                No monitors yet
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Add your first monitor to start tracking uptime.
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4" />
                Add Monitor
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {monitors.map((monitor) => (
                <div
                  key={monitor.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "h-2.5 w-2.5 rounded-full shrink-0",
                        monitor.is_active
                          ? getStatusBgColor(monitor.last_status)
                          : "bg-zinc-600"
                      )}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {monitor.name}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">
                        {monitor.url}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex items-center gap-6 text-right">
                      <div>
                        <p className="text-xs text-zinc-500">Uptime</p>
                        <p className="text-sm font-mono text-emerald-400">
                          {formatUptime(monitor.uptime_percentage)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Response</p>
                        <p className="text-sm font-mono text-zinc-300">
                          {monitor.last_response_time_ms
                            ? formatResponseTime(monitor.last_response_time_ms)
                            : "--"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Checked</p>
                        <p className="text-sm text-zinc-400">
                          {monitor.last_checked_at
                            ? timeAgo(monitor.last_checked_at)
                            : "Never"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          toggleMonitor(monitor.id, monitor.is_active)
                        }
                        title={monitor.is_active ? "Pause" : "Resume"}
                      >
                        {monitor.is_active ? (
                          <Wifi className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <WifiOff className="h-3.5 w-3.5 text-zinc-500" />
                        )}
                      </Button>
                      <a
                        href={monitor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Button>
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-500 hover:text-red-400"
                        onClick={() => deleteMonitor(monitor.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Monitor Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Add Monitor
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={addMonitor} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newMonitor.name}
                    onChange={(e) =>
                      setNewMonitor({ ...newMonitor, name: e.target.value })
                    }
                    required
                    placeholder="My Website"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    URL
                  </label>
                  <input
                    type="url"
                    value={newMonitor.url}
                    onChange={(e) =>
                      setNewMonitor({ ...newMonitor, url: e.target.value })
                    }
                    required
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Method
                    </label>
                    <select
                      value={newMonitor.method}
                      onChange={(e) =>
                        setNewMonitor({
                          ...newMonitor,
                          method: e.target.value as MonitorMethod,
                        })
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="HEAD">HEAD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Interval
                    </label>
                    <select
                      value={newMonitor.interval_seconds}
                      onChange={(e) =>
                        setNewMonitor({
                          ...newMonitor,
                          interval_seconds: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value={30}>30 seconds</option>
                      <option value={60}>1 minute</option>
                      <option value={300}>5 minutes</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={saving}>
                    {saving ? "Adding..." : "Add Monitor"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
