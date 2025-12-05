const { createOrder } = require('../_helpers/orders');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { items, amount, customer, payment_method } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Invalid items' });
    return;
  }

  const order = {
    id: `ORD_${Date.now()}`,
    items,
    amount: Number(amount) || 0,
    customer: customer || null,
    payment_method: payment_method || 'COD',
    status: payment_method === 'COD' ? 'pending' : 'created',
    createdAt: new Date().toISOString(),
  };

  createOrder(order);
  res.status(201).json({ ok: true, orderId: order.id });
};
