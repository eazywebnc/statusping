import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-500 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors" aria-label="Return to StatusPing homepage">Back to Home</Link>
      </div>
    </main>
  );
}
