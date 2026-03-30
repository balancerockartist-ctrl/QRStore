'use strict';

const express = require('express');
const QRCode = require('qrcode');
const { logItem, getInventory } = require('../store');

const router = express.Router();

/**
 * POST /api/items
 * Log a scanned item and issue a credit.
 * Body: { name, description, price, tip }
 */
router.post('/items', (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name and price are required' });
  }
  const item = logItem(req.body);
  res.status(201).json(item);
});

/**
 * GET /api/items
 * Return the supply-chain inventory manifest.
 */
router.get('/items', (_req, res) => {
  res.json(getInventory());
});

/**
 * GET /api/qr
 * Generate a QR code pointing to the store URL.
 * Query: ?url=<target-url>  (defaults to the app root)
 */
router.get('/qr', async (req, res) => {
  const target = req.query.url || `${req.protocol}://${req.get('host')}/`;
  try {
    const dataUrl = await QRCode.toDataURL(target);
    res.json({ qr: dataUrl, target });
  } catch (err) {
    console.error('QR generation error:', err);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports = router;
