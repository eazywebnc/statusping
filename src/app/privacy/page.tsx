import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | StatusPing",
  description: "StatusPing privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-green-400 hover:underline mb-8 inline-block" aria-label="Back to homepage">&larr; Back to home</Link>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-4">Last updated: April 2026</p>
        <section className="space-y-6 text-gray-300">
          <div><h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2><p>We collect information you provide directly: email address and payment information through Stripe. We also collect monitoring data (URLs you track, uptime metrics) and usage analytics.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">2. How We Use Your Information</h2><p>Your information is used to provide uptime monitoring services, send alerts, process transactions, and improve our platform.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">3. Data Sharing</h2><p>We do not sell your personal data. We share data only with: Stripe (payment processing), Supabase (database hosting), and Cloudflare (hosting and security).</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">4. Data Security</h2><p>We implement industry-standard security measures including encryption in transit (TLS), secure authentication, and row-level security.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">5. Your Rights</h2><p>You can request access to, correction of, or deletion of your personal data by contacting contact@eazyweb.nc.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">6. Contact</h2><p>Privacy inquiries: <a href="mailto:contact@eazyweb.nc" className="text-green-400 hover:underline">contact@eazyweb.nc</a></p></div>
        </section>
      </div>
    </main>
  );
}
