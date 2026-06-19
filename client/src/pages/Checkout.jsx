import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import { toast } from 'react-toastify';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
    return newErrors;
  };

  const handlePlaceOrder = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const products = cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        image: item.productId.image,
        price: item.productId.price,
        quantity: item.quantity,
      }));

      const deliveryCharge = cartTotal >= 999 ? 0 : 99;

      await createOrder({
        products,
        totalAmount: cartTotal + deliveryCharge,
        shippingAddress: formData,
      });

      await clearCart();
      setOrderPlaced(true);
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your purchase. Your order is being processed and will be delivered soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/profile')}
            className="btn-primary text-sm"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/products')}
            className="btn-outline text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const deliveryCharge = cartTotal >= 999 ? 0 : 99;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Shipping Form */}
        <div className="flex-1">
          <div className="card p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-5">Shipping Address</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="checkout-fullname"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`input-field ${errors.fullName ? 'border-red-400' : ''}`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  id="checkout-address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`input-field resize-none h-20 ${errors.address ? 'border-red-400' : ''}`}
                  placeholder="House No, Street, Landmark"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    id="checkout-city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`input-field ${errors.city ? 'border-red-400' : ''}`}
                    placeholder="Mumbai"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    id="checkout-state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`input-field ${errors.state ? 'border-red-400' : ''}`}
                    placeholder="Maharashtra"
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    id="checkout-pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`input-field ${errors.pincode ? 'border-red-400' : ''}`}
                    placeholder="400001"
                    maxLength={6}
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="checkout-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Note */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
            <strong>Payment:</strong> Cash on Delivery (COD) is the only available option for now.
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="card p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {cart.map((item) => {
                const product = item.productId;
                if (!product) return null;
                return (
                  <div key={product._id} className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 font-medium line-clamp-1">{product.title}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-xs font-semibold text-gray-900">
                        ₹{(product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery</span>
                <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : ''}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-5">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>₹{(cartTotal + deliveryCharge).toLocaleString()}</span>
              </div>
            </div>

            <button
              id="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={loading || cart.length === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
