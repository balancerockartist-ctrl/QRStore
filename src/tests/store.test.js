'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { logItem, getInventory } = require('../store');

test('logItem creates a record with a UUID and creditIssued flag', () => {
  const item = logItem({ name: 'Rice', price: 2.5, tip: 0.25 });
  assert.ok(item.id, 'should have an id');
  assert.equal(item.name, 'Rice');
  assert.equal(item.price, 2.5);
  assert.equal(item.tip, 0.25);
  assert.equal(item.creditIssued, true);
  assert.ok(item.timestamp, 'should have a timestamp');
});

test('getInventory returns all logged items', () => {
  const before = getInventory().length;
  logItem({ name: 'Beans', price: 1.5 });
  assert.equal(getInventory().length, before + 1);
});

test('logItem defaults description and tip to empty/zero when not provided', () => {
  const item = logItem({ name: 'Water', price: 0 });
  assert.equal(item.description, '');
  assert.equal(item.tip, 0);
});
