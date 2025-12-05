const fs = require('fs');
const path = require('path');

const ORDERS_PATH = path.join(process.cwd(), 'data', 'orders.json');

function readOrders() {
  try {
    const raw = fs.readFileSync(ORDERS_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function writeOrders(orders) {
  fs.mkdirSync(path.dirname(ORDERS_PATH), { recursive: true });
  fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2), 'utf8');
}

function createOrder(order) {
  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);
  return order;
}

function updateOrder(orderId, patch) {
  const orders = readOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...patch };
  writeOrders(orders);
  return orders[idx];
}

function getOrders() {
  return readOrders();
}

module.exports = { createOrder, updateOrder, getOrders };
