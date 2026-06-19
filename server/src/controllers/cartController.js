const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route GET /api/cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      'items.productId'
    );

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/cart
const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/cart/:productId
const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      (item) => item.productId.toString() === req.params.productId
    );

    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== req.params.productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/cart/:productId
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { items: [] }
    );
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
