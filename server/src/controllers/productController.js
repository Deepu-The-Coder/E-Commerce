const Product = require('../models/Product');

// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;

    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({ products, total, page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById };
