import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QRStore – Scan, Buy, Give",
  description:
    "A humanitarian QR-powered store: scan items with your camera, issue credits, add a tip, and keep a supply-chain manifest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
