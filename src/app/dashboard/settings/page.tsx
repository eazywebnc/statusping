"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PLANS, type PlanId } from "@/lib/stripe";
import { Check, Crown, Loader2 } from "lucide-react";
import type { Settings } from "@/lib/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [upgrading, setUpgrading] = useState<PlanId | null>(null);
  const [form, setForm] = useState({
    notification_email: "",
    notification_phone: "",
    notification_webhook: "",
    timezone: "Pacific/Noumea",
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchSettings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("sp_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setSettings(data);
        setForm({
          notification_email: data.notification_email ?? user.email ?? "",
          notification_phone: data.notification_phone ?? "",
          notification_webhook: data.notification_webhook ?? "",
          timezone: data.timezone ?? "Pacific/Noumea",
        });
      }
      setLoading(false);
    }
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);

    await supabase
      .from("sp_settings")
      .update({
        notification_email: form.notification_email || null,
        notification_phone: form.notification_phone || null,
        notification_webhook: form.notification_webhook || null,
        timezone: form.timezone,
      })
      .eq("id", settings.id);

    setSaving(false);
  }

  async function handleUpgrade(planId: PlanId) {
    if (planId === "free") return;
    setUpgrading(planId);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch {
      // handle error
    } finally {
      setUpgrading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin" />
      </div>
    );
  }

  const currentPlan = settings?.plan ?? "free";

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your account and subscription
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-cyan-400" />
            Subscription
          </CardTitle>
          <CardDescription>
            You are currently on the{" "}
            <span className="text-cyan-400 font-medium">
              {PLANS[currentPlan as PlanId].name}
            </span>{" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(["free", "pro", "business"] as PlanId[]).map((planId) => {
              const plan = PLANS[planId];
              const isCurrent = currentPlan === planId;

              return (
                <div
                  key={planId}
                  className={`rounded-xl border p-4 ${
                    isCurrent
                      ? "border-cyan-500/50 bg-cyan-500/5"
                      : "border-zinc-800 bg-zinc-900/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{plan.name}</h4>
                    {isCurrent && (
                      <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-white mb-3">
                    {plan.price === 0 ? "Free" : `$${plan.price}/mo`}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {plan.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                        <Check className="h-3 w-3 text-cyan-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && planId !== "free" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleUpgrade(planId)}
                      disabled={upgrading === planId}
                    >
                      {upgrading === planId ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        "Upgrade"
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configure how you want to be notified about incidents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveSettings} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.notification_email}
                onChange={(e) =>
                  setForm({ ...form, notification_email: e.target.value })
                }
                placeholder="alerts@company.com"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Phone (SMS)
              </label>
              <input
                type="tel"
                value={form.notification_phone}
                onChange={(e) =>
                  setForm({ ...form, notification_phone: e.target.value })
                }
                placeholder="+687 XX XX XX"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              {currentPlan === "free" && (
                <p className="text-xs text-zinc-500 mt-1">
                  SMS alerts available on Pro and Business plans.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Webhook URL
              </label>
              <input
                type="url"
                value={form.notification_webhook}
                onChange={(e) =>
                  setForm({ ...form, notification_webhook: e.target.value })
                }
                placeholder="https://hooks.slack.com/services/..."
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Timezone
              </label>
              <select
                value={form.timezone}
                onChange={(e) =>
                  setForm({ ...form, timezone: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="Pacific/Noumea">Pacific/Noumea (UTC+11)</option>
                <option value="Europe/Paris">Europe/Paris (UTC+1/+2)</option>
                <option value="America/New_York">America/New_York (UTC-5/-4)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
