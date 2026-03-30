import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-gray-900 dark:to-gray-800 p-8 gap-10">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400 mb-4">
          QRStore ©
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          A humanitarian effort to streamline charity and commerce. Scan any
          item with your camera, get a credit issued instantly (with a tip
          option), and automatically log it to the{" "}
          <span className="font-semibold text-sky-600 dark:text-sky-400">
            G.O.S. — Godworld Logistics Operating System
          </span>{" "}
          supply-chain manifest.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
        <Link
          href="/qr"
          className="flex flex-col items-center gap-3 rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 hover:shadow-lg transition-shadow border border-emerald-100 dark:border-emerald-800"
        >
          <span className="text-4xl">📱</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Get QR Code
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Display the store QR code for customers to scan
          </span>
        </Link>

        <Link
          href="/scan"
          className="flex flex-col items-center gap-3 rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 hover:shadow-lg transition-shadow border border-sky-100 dark:border-sky-800"
        >
          <span className="text-4xl">🔍</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Scan &amp; Buy
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Use your camera to identify an item and issue a credit
          </span>
        </Link>

        <Link
          href="/inventory"
          className="flex flex-col items-center gap-3 rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-100 dark:border-purple-800"
        >
          <span className="text-4xl">📦</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Inventory Log
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
            View the supply-chain manifest of all transactions
          </span>
        </Link>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-600">
        Powered by Godworld.org · 501(c)(4) non-profit
      </p>
    </main>
  );
}
