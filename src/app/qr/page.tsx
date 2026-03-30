"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function QRPage() {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [appUrl, setAppUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.origin}/scan`;
    setAppUrl(url);

    import("qrcode").then((QRCode) => {
      QRCode.toDataURL(url, { width: 300, margin: 2 }).then((dataUrl) => {
        setQrDataUrl(dataUrl);
      });
    });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-gray-900 dark:to-gray-800 p-8 gap-8">
      <Link
        href="/"
        className="self-start text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      >
        ← Back
      </Link>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
          QRStore QR Code
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Customers scan this with Google Lens or any QR reader to open the
          store
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4">
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrDataUrl} alt="QRStore QR Code" width={300} height={300} />
        ) : (
          <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
            <span className="text-gray-400">Generating…</span>
          </div>
        )}
        <p className="text-xs text-gray-400 break-all text-center max-w-xs">
          {appUrl}
        </p>
        {qrDataUrl && (
          <a
            href={qrDataUrl}
            download="qrstore-code.png"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            ⬇ Download PNG
          </a>
        )}
      </div>
    </main>
  );
}
