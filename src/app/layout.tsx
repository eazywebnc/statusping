import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://statusping.eazyweb.nc"),
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
    locale: "en_US",
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, type: 'image/webp', alt: 'StatusPing — Uptime Monitoring & Status Pages' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StatusPing - Uptime Monitoring",
    description: "Know when your site goes down before your customers do.",
    images: ['/images/og-image.webp'],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  alternates: {
    canonical: "https://statusping.eazyweb.nc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "StatusPing",
        url: "https://statusping.eazyweb.nc",
        publisher: {
          "@type": "Organization",
          name: "EazyWebNC",
          url: "https://eazyweb.nc",
          logo: { "@type": "ImageObject", url: "https://eazyweb.nc/logo.png" },
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "StatusPing",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Uptime monitoring and status pages for small businesses. Know when your site goes down before your customers do.",
        url: "https://statusping.eazyweb.nc",
        offers: [
          { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
          { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Pro" },
          { "@type": "Offer", price: "49", priceCurrency: "USD", name: "Business" },
        ],
        creator: { "@type": "Organization", name: "EazyWebNC", url: "https://eazyweb.nc" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is StatusPing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "StatusPing is an uptime monitoring and status page service for small businesses. It checks your websites and APIs every minute and sends instant alerts when something goes down.",
            },
          },
          {
            "@type": "Question",
            name: "How fast does StatusPing detect downtime?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "StatusPing checks your endpoints every 60 seconds from multiple global locations. You get notified via email, SMS, or Slack within seconds of a detected outage.",
            },
          },
          {
            "@type": "Question",
            name: "Can I create a public status page?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! StatusPing lets you create a branded public status page to keep your customers informed about service health in real time.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded">Skip to content</a>
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
