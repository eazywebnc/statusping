import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export type PlanId = "free" | "pro" | "business";

export interface PlanConfig {
  id: PlanId;
  name: string;
  price: number;
  priceId?: string;
  monitors: number;
  intervalSeconds: number;
  statusPages: number;
  smsAlerts: boolean;
  apiAccess: boolean;
  customDomain: boolean;
  features: string[];
}

export const PLANS: Record<PlanId, PlanConfig> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    monitors: 3,
    intervalSeconds: 300,
    statusPages: 1,
    smsAlerts: false,
    apiAccess: false,
    customDomain: false,
    features: [
      "3 monitors",
      "5-minute check interval",
      "1 status page",
      "Email notifications",
      "7-day history",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 9,
    priceId: "price_pro_monthly",
    monitors: 20,
    intervalSeconds: 60,
    statusPages: 3,
    smsAlerts: true,
    apiAccess: false,
    customDomain: false,
    features: [
      "20 monitors",
      "1-minute check interval",
      "3 status pages",
      "SMS & email alerts",
      "30-day history",
      "Slack integration",
    ],
  },
  business: {
    id: "business",
    name: "Business",
    price: 29,
    priceId: "price_business_monthly",
    monitors: Infinity,
    intervalSeconds: 30,
    statusPages: Infinity,
    smsAlerts: true,
    apiAccess: true,
    customDomain: true,
    features: [
      "Unlimited monitors",
      "30-second check interval",
      "Unlimited status pages",
      "SMS, email & webhook alerts",
      "90-day history",
      "REST API access",
      "Custom domain",
      "Priority support",
    ],
  },
};

export function getPlanByPriceId(priceId: string): PlanConfig | undefined {
  return Object.values(PLANS).find(
    (plan) => "priceId" in plan && plan.priceId === priceId
  );
}
