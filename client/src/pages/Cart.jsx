import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, cartTotal, cartLoading, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartLoading) return <Loader fullScreen />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-400 text-sm mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/products" className="btn-primary text-sm">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => {
              const product = item.productId;
              if (!product) return null;
              return (
                <div key={item._id || product._id} className="card p-4 flex gap-4">
                  {/* Image */}
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-24 rounded-lg object-cover bg-gray-50 flex-shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=Img';
                      }}
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${product._id}`}
                      className="font-medium text-gray-900 text-sm hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {product.title}
                    </Link>
                    <p className="text-xs text-gray-400 mt-1">{product.category}</p>
                    <p className="font-bold text-gray-900 mt-2">
                      ₹{product.price.toLocaleString()}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product._id, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-semibold min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Subtotal + Remove */}
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-700">
                          ₹{(product.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="card p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span className={cartTotal >= 999 ? 'text-green-600 font-medium' : ''}>
                    {cartTotal >= 999 ? 'FREE' : '₹99'}
                  </span>
                </div>
                {cartTotal < 999 && (
                  <p className="text-xs text-gray-400">
                    Add ₹{(999 - cartTotal).toLocaleString()} more for free delivery
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{(cartTotal + (cartTotal >= 999 ? 0 : 99)).toLocaleString()}</span>
                </div>
              </div>

              <button
                id="checkout-btn"
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-sm"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>

              <Link
                to="/products"
                className="block text-center text-sm text-gray-500 hover:text-blue-600 mt-3 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
