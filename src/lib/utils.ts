import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUptime(percentage: number): string {
  return `${percentage.toFixed(2)}%`;
}

export function formatResponseTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "up":
      return "text-emerald-400";
    case "down":
      return "text-red-400";
    case "degraded":
      return "text-amber-400";
    default:
      return "text-zinc-400";
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case "up":
      return "bg-emerald-400";
    case "down":
      return "bg-red-400";
    case "degraded":
      return "bg-amber-400";
    default:
      return "bg-zinc-400";
  }
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  return `${diffDay}d ago`;
}
