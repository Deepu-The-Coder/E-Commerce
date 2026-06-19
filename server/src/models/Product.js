const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Fashion', 'Shoes', 'Books'],
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 1,
      max: 5,
    },
    stock: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
