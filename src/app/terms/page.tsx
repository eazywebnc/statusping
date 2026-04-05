import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | StatusPing",
  description: "StatusPing terms of service.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-green-400 hover:underline mb-8 inline-block" aria-label="Back to homepage">&larr; Back to home</Link>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-4">Last updated: April 2026</p>
        <section className="space-y-6 text-gray-300">
          <div><h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2><p>By accessing or using StatusPing, you agree to be bound by these Terms of Service.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">2. Service Description</h2><p>StatusPing provides uptime monitoring, status pages, and alert notifications for websites and APIs.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">3. User Responsibilities</h2><p>You are responsible for maintaining your account security and must not use the service to monitor URLs you do not own or have permission to monitor.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">4. Payment Terms</h2><p>Paid plans are billed monthly via Stripe. You can cancel at any time. Refunds within 30 days on a case-by-case basis.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">5. Limitation of Liability</h2><p>StatusPing is provided &ldquo;as is&rdquo; without warranties. We are not liable for any damages arising from missed alerts or monitoring gaps.</p></div>
          <div><h2 className="text-xl font-semibold text-white mb-2">6. Contact</h2><p>Questions: <a href="mailto:contact@eazyweb.nc" className="text-green-400 hover:underline">contact@eazyweb.nc</a></p></div>
        </section>
      </div>
    </main>
  );
}
