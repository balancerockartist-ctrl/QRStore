# QRStore © 2026 Godworld.org

> **A humanitarian effort to streamline charity and commerce.**

QRStore is a dynamic QR-code powered store that lets people buy things by scanning items with their camera (Google Lens). It issues a credit for each item — with a tip option for everyone to use — and logs all item data into a supply-chain manifest so we always know what's been bought and what needs to be restocked.

This is part of the **G.O.S. — Godworld Logistics Operating System**, backed by [Godworld.org](https://godworld.org), a 501(c)(4) non-profit currently being formed. The mission: streamline charity, avoid government lag, and combat inflation — with a dynamic QR code, a camera, and a credit issued with a tip option.

---

## Features

- 📱 **QR Code Generator** — display a QR code customers scan to open the store
- 🔍 **Scan & Buy** — use your device camera (or Google Lens) to identify an item, set a price, and issue a credit
- 💸 **Tip Option** — optional tip at checkout, for everyone to use
- 📦 **Supply-Chain Manifest** — automatic inventory log of every transaction

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, Tailwind CSS)
- [Prisma 7](https://prisma.io) + SQLite (via LibSQL adapter)
- [qrcode](https://www.npmjs.com/package/qrcode) for QR generation

## Getting Started

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

See [LICENSE](LICENSE).
