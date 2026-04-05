export type MonitorStatus = "up" | "down" | "degraded" | "unknown";
export type MonitorMethod = "GET" | "POST" | "HEAD" | "PUT" | "PATCH" | "DELETE";
export type IncidentStatus = "investigating" | "identified" | "monitoring" | "resolved";
export type IncidentSeverity = "minor" | "major" | "critical";
export type PlanType = "free" | "pro" | "business";
export type NotificationType = "email" | "sms" | "webhook";

export interface Monitor {
  id: string;
  user_id: string;
  name: string;
  url: string;
  method: MonitorMethod;
  interval_seconds: number;
  timeout_ms: number;
  expected_status: number;
  headers: Record<string, string>;
  is_active: boolean;
  last_checked_at: string | null;
  last_status: MonitorStatus;
  last_response_time_ms: number | null;
  uptime_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface Incident {
  id: string;
  monitor_id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: IncidentStatus;
  severity: IncidentSeverity;
  started_at: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StatusPage {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  custom_domain: string | null;
  theme: {
    primaryColor: string;
    darkMode: boolean;
  };
  monitor_ids: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscriber {
  id: string;
  status_page_id: string;
  email: string | null;
  phone: string | null;
  notification_type: NotificationType;
  webhook_url: string | null;
  is_confirmed: boolean;
  confirmation_token: string | null;
  created_at: string;
}

export interface Settings {
  id: string;
  user_id: string;
  plan: PlanType;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  notification_email: string | null;
  notification_phone: string | null;
  notification_webhook: string | null;
  timezone: string;
  created_at: string;
  updated_at: string;
}
