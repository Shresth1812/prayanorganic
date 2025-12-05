const crypto = require('crypto');
const { updateOrder } = require('../_helpers/orders');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body;
  const rawBody = Buffer.isBuffer(req.body) ? req.body : JSON.stringify(req.body);
  const signature = req.headers['x-razorpay-signature'];
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    res.status(500).json({ error: 'Webhook secret not configured' });
    return;
  }

  const expected = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
  if (signature !== expected) {
    res.status(400).json({ error: 'Invalid webhook signature' });
    return;
  }

  // handle payment.captured or payment.authorized
  try {
    if (body.event === 'payment.captured' || body.event === 'payment.authorized') {
      const payment = body.payload && body.payload.payment && body.payload.payment.entity;
      if (payment) {
        // try to find local order by razorpay_order_id in payload
        const razorpayOrderId = payment.order_id;
        // we don't have a reverse index, so update any order that matches
        if (razorpayOrderId) {
          // update order(s) with matching razorpay_order_id
          // naive approach: mark first matching order as paid
          // For robustness, use a DB in production
          updateOrderByRazorpayId(razorpayOrderId, { status: 'paid', razorpay_payment_id: payment.id, paidAt: new Date().toISOString() });
        }
      }
    }
  } catch (err) {
    console.error('Webhook handling error', err);
    // continue
  }

  res.status(200).json({ ok: true });
};

function updateOrderByRazorpayId(razorpayOrderId, patch) {
  const fs = require('fs');
  const path = require('path');
  const ORDERS_PATH = path.join(process.cwd(), 'data', 'orders.json');
  try {
    const raw = fs.readFileSync(ORDERS_PATH, 'utf8');
    const orders = JSON.parse(raw || '[]');
    const idx = orders.findIndex(o => o.razorpay_order_id === razorpayOrderId);
    if (idx === -1) return null;
    orders[idx] = { ...orders[idx], ...patch };
    fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2), 'utf8');
    return orders[idx];
  } catch (err) {
    return null;
  }
}
