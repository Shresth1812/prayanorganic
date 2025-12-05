const Razorpay = require('razorpay');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { amount } = req.body;
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
    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: Math.round(Number(amount) * 100), // amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id,
    });
  } catch (err) {
    console.error('Razorpay create order error', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
