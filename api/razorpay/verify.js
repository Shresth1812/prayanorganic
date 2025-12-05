const crypto = require('crypto');
const { updateOrder } = require('../_helpers/orders');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, localOrderId } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({ error: 'Missing payment information' });
    return;
  }

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_secret) {
    res.status(500).json({ error: 'Razorpay secret not configured' });
    return;
  }

  const generated_signature = crypto.createHmac('sha256', key_secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature !== razorpay_signature) {
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  // mark order as paid
  if (localOrderId) {
    const updated = updateOrder(localOrderId, { status: 'paid', razorpay_payment_id, paidAt: new Date().toISOString() });
    if (!updated) {
      // still return success to client but warn
      console.warn('Local order not found for verification', localOrderId);
    }
  }

  res.status(200).json({ ok: true });
};
