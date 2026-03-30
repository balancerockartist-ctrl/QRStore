'use strict';

const { randomUUID } = require('crypto');

// In-memory store for items (replace with a database in production)
const items = [];

/**
 * Log a new item to the inventory store.
 * @param {object} data - Item data from a scan.
 * @param {string} data.name - Item name.
 * @param {string} data.description - Item description.
 * @param {number} data.price - Item price in USD.
 * @returns {object} The created item record.
 */
function logItem(data) {
  const item = {
    id: randomUUID(),
    name: data.name,
    description: data.description || '',
    price: Number(data.price) || 0,
    tip: Number(data.tip) || 0,
    creditIssued: true,
    timestamp: new Date().toISOString(),
  };
  items.push(item);
  return item;
}

/**
 * Return the full inventory list.
 * @returns {object[]} All logged items.
 */
function getInventory() {
  return items;
}

module.exports = { logItem, getInventory };
