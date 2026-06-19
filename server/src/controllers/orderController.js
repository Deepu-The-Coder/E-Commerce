const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @route POST /api/orders
const createOrder = async (req, res) => {
  const { products, totalAmount, shippingAddress } = req.body;

  try {
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' });
    }

    const order = await Order.create({
      userId: req.user._id,
      products,
      totalAmount,
      shippingAddress,
    });

    // Clear cart after order
    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { items: [] }
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders };
