import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | StatusPing",
  description: "Sign in to monitor your uptime",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
