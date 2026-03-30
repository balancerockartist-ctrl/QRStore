import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalCredit = items.reduce((sum, i) => sum + i.credit, 0);
  const totalTips = items.reduce((sum, i) => sum + i.tip, 0);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-6 gap-6">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ← Back
        </Link>
      </div>

      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
          Supply-Chain Manifest
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          G.O.S. — Godworld Logistics Operating System
        </p>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-4 text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {items.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Items Logged
            </p>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ${totalCredit.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Credits Issued
            </p>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-4 text-center">
            <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
              ${totalTips.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Tips Collected
            </p>
          </div>
        </div>

        {/* Item List */}
        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <p className="text-4xl mb-4">📦</p>
            <p className="font-medium">No items logged yet.</p>
            <p className="text-sm">
              <Link href="/scan" className="text-sky-500 underline">
                Scan an item
              </Link>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white dark:bg-gray-800 shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex gap-3 items-center">
                  {item.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm shrink-0">
                  <div className="text-center">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">
                      ${item.credit.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">credit</p>
                  </div>
                  {item.tip > 0 && (
                    <div className="text-center">
                      <p className="font-bold text-sky-600 dark:text-sky-400">
                        ${item.tip.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">tip</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
