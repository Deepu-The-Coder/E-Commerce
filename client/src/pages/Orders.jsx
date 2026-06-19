import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getOrders } from '../services/api';
import Loader from '../components/Loader';
import { Package, MapPin, Clock, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';

const statusColor = (status) => {
  const map = {
    Processing: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Shipped: 'bg-blue-100 text-blue-700 border-blue-200',
    Delivered: 'bg-green-100 text-green-700 border-green-200',
    Cancelled: 'bg-red-100 text-red-700 border-red-200',
  };
  return map[status] || 'bg-gray-100 text-gray-600 border-gray-200';
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </p>
        </div>
        <Link to="/products" className="btn-outline text-sm">
          Continue Shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
          <p className="text-gray-400 text-sm mb-6">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary text-sm">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card overflow-hidden">
              {/* Order Header */}
              <div
                className="flex flex-wrap items-center justify-between gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(order._id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Order ID</p>
                    <p className="text-sm font-mono font-semibold text-gray-800">
                      #{order._id.slice(-10).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Date */}
                  <div className="hidden sm:block text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Placed on</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Total</p>
                    <p className="text-sm font-bold text-gray-900">
                      ₹{order.totalAmount?.toLocaleString()}
                    </p>
                  </div>

                  {/* Status */}
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor(order.status)}`}>
                    {order.status}
                  </span>

                  {/* Expand Toggle */}
                  <div className="text-gray-400">
                    {expandedOrder === order._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order._id && (
                <div className="border-t border-gray-100 p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Products List */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Items Ordered</h3>
                      <div className="space-y-3">
                        {order.products.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-14 h-14 rounded-lg object-cover bg-gray-50 flex-shrink-0"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/56?text=Img'; }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 font-medium line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                Qty: {item.quantity} &times; ₹{item.price?.toLocaleString()}
                              </p>
                              <p className="text-xs font-semibold text-gray-700 mt-0.5">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Info + Summary */}
                    <div className="space-y-4">
                      {/* Shipping Address */}
                      {order.shippingAddress && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            Shipping Address
                          </h3>
                          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 space-y-0.5">
                            <p className="font-medium text-gray-800">{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>
                              {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
                            </p>
                            {order.shippingAddress.phone && (
                              <p className="text-gray-500">📞 {order.shippingAddress.phone}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Order Summary */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Order Summary</h3>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-sm">
                          <div className="flex justify-between text-gray-600">
                            <span>Items ({order.products.reduce((a, p) => a + p.quantity, 0)})</span>
                            <span>
                              ₹{order.products
                                .reduce((a, p) => a + p.price * p.quantity, 0)
                                .toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Delivery</span>
                            <span>
                              {order.totalAmount - order.products.reduce((a, p) => a + p.price * p.quantity, 0) === 0
                                ? <span className="text-green-600 font-medium">FREE</span>
                                : `₹${(order.totalAmount - order.products.reduce((a, p) => a + p.price * p.quantity, 0)).toLocaleString()}`}
                            </span>
                          </div>
                          <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-1.5 mt-1.5">
                            <span>Total</span>
                            <span>₹{order.totalAmount?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Placed on (mobile) */}
                      <div className="flex items-center gap-1 text-xs text-gray-400 sm:hidden">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
