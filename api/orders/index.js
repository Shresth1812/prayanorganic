const { getOrders } = require('../_helpers/orders');

module.exports = async (req, res) => {
  // simple admin protection
  const adminKey = process.env.ADMIN_KEY || '';
  const provided = req.headers['x-admin-key'];
  if (!adminKey || provided !== adminKey) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const orders = getOrders();
  res.status(200).json({ orders });
};
