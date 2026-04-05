import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StatusPing - Uptime Monitoring & Status Pages",
  description:
    "Know when your site goes down before your customers do. Uptime monitoring, status pages, and instant alerts for small businesses.",
  keywords: [
    "uptime monitoring",
    "status page",
    "website monitoring",
    "downtime alerts",
    "SaaS",
  ],
  openGraph: {
    title: "StatusPing - Uptime Monitoring & Status Pages",
    description:
      "Know when your site goes down before your customers do. Monitor uptime, create status pages, get instant alerts.",
    url: "https://statusping.eazyweb.nc",
    siteName: "StatusPing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StatusPing - Uptime Monitoring",
    description: "Know when your site goes down before your customers do.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
