"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type Step = "capture" | "review" | "checkout" | "done";

interface ItemData {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  tip: number;
}

const TIP_OPTIONS = [0, 1, 2, 5, 10];

export default function ScanPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>("capture");
  const [item, setItem] = useState<ItemData>({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
    tip: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openCamera() {
    fileInputRef.current?.click();
  }

  function handleImageCapture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Revoke previous object URL to avoid memory leaks
    if (item.imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(item.imageUrl);
    }
    const url = URL.createObjectURL(file);
    setItem((prev) => ({ ...prev, imageUrl: url }));
    setStep("review");
  }

  function openGoogleLens() {
    window.open("https://lens.google.com", "_blank", "noopener,noreferrer");
  }

  async function handleCheckout() {
    if (!item.name.trim()) {
      setError("Please enter the item name.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
          price: item.price,
          credit: item.price,
          tip: item.tip,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to log item");
      }
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    if (item.imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(item.imageUrl);
    }
    setStep("capture");
    setItem({ name: "", description: "", imageUrl: "", price: 0, tip: 0 });
    setError(null);
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-6 gap-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ← Back
        </Link>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-400 text-center">
          Scan &amp; Buy
        </h1>

        {/* Step: Capture */}
        {step === "capture" && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
              Point your camera at an item or use Google Lens to identify it,
              then fill in the details.
            </p>
            <button
              onClick={openCamera}
              className="w-full rounded-xl bg-sky-600 text-white py-3 font-semibold hover:bg-sky-700 transition-colors"
            >
              📷 Take Photo
            </button>
            <button
              onClick={openGoogleLens}
              className="w-full rounded-xl border border-sky-300 text-sky-700 dark:text-sky-300 py-3 font-semibold hover:bg-sky-50 dark:hover:bg-gray-700 transition-colors"
            >
              🔍 Open Google Lens
            </button>
            <button
              onClick={() => setStep("review")}
              className="text-sm text-gray-400 underline hover:text-gray-600"
            >
              Skip photo – enter item manually
            </button>
            {/* Hidden file input for camera */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImageCapture}
            />
          </div>
        )}

        {/* Step: Review */}
        {step === "review" && (
          <div className="flex flex-col gap-4">
            {item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt="Captured item"
                className="w-full rounded-xl object-cover max-h-56"
              />
            )}
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Item Name *
                </span>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    setItem((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. Canned Beans"
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Description
                </span>
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    setItem((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={2}
                  placeholder="Optional notes"
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Price ($)
                </span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={item.price}
                  onChange={(e) =>
                    setItem((p) => ({
                      ...p,
                      price: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Retake
              </button>
              <button
                onClick={() => {
                  if (!item.name.trim()) {
                    setError("Please enter the item name.");
                    return;
                  }
                  setError(null);
                  setStep("checkout");
                }}
                className="flex-1 rounded-xl bg-sky-600 text-white py-2 text-sm font-semibold hover:bg-sky-700 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step: Checkout / Tip */}
        {step === "checkout" && (
          <div className="flex flex-col gap-5">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 p-4 flex flex-col gap-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Item</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {item.name}
              </p>
              {item.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              )}
              <p className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">
                Credit issued: ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Add a tip? (optional)
              </p>
              <div className="flex gap-2 flex-wrap">
                {TIP_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setItem((p) => ({ ...p, tip: t }))}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                      item.tip === t
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {t === 0 ? "No tip" : `$${t}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-3 flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Total credit
              </span>
              <span className="font-bold text-gray-800 dark:text-gray-100">
                ${(item.price + item.tip).toFixed(2)}
              </span>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("review")}
                className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleCheckout}
                disabled={submitting}
                className="flex-1 rounded-xl bg-emerald-600 text-white py-2 text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {submitting ? "Processing…" : "✓ Confirm & Log"}
              </button>
            </div>
          </div>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <div className="flex flex-col items-center gap-5 py-4">
            <span className="text-6xl">✅</span>
            <div className="text-center">
              <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                Credit Issued!
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                <strong>{item.name}</strong> has been logged to the supply-chain
                manifest.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Credit: ${item.price.toFixed(2)}
                {item.tip > 0 && ` + $${item.tip.toFixed(2)} tip`}
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={reset}
                className="flex-1 rounded-xl bg-sky-600 text-white py-2 text-sm font-semibold hover:bg-sky-700 transition-colors"
              >
                Scan Another
              </button>
              <Link
                href="/inventory"
                className="flex-1 rounded-xl border border-emerald-600 text-emerald-700 dark:text-emerald-400 py-2 text-sm font-semibold text-center hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
              >
                View Log
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
