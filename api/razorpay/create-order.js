const Razorpay = require('razorpay');
const { createOrder } = require('../_helpers/orders');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { amount, items, customer } = req.body;
  if (!amount || Number.isNaN(Number(amount))) {
    res.status(400).json({ error: 'Invalid amount' });
    return;
  }

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    res.status(500).json({ error: 'Razorpay keys not configured' });
    return;
  }

  try {
    const instance = new Razorpay({ key_id, key_secret });

    const receipt = `receipt_order_${Date.now()}`;
    const options = {
      amount: Math.round(Number(amount) * 100), // amount in paise
      currency: 'INR',
      receipt,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);

    // create local order record
    const localOrder = {
      id: `ORD_${Date.now()}`,
      razorpay_order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt,
      items: items || [],
      customer: customer || null,
      status: 'created',
      createdAt: new Date().toISOString(),
    };

    createOrder(localOrder);

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id,
      localOrderId: localOrder.id,
    });
  } catch (err) {
    console.error('Razorpay create order error', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
