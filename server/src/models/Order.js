const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        title: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
    status: {
      type: String,
      default: 'Processing',
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
