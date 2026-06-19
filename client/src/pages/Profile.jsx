import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../services/api';
import Loader from '../components/Loader';
import { User, Package, LogOut, MapPin, Clock } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

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
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const statusColor = (status) => {
    const map = {
      Processing: 'bg-yellow-100 text-yellow-700',
      Shipped: 'bg-blue-100 text-blue-700',
      Delivered: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Account</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          id="tab-profile"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'profile'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User size={15} />
          Profile
        </button>
        <button
          id="tab-orders"
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'orders'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Package size={15} />
          Orders
          {orders.length > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {orders.length}
            </span>
          )}
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            id="logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 border border-red-200 px-4 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          {loadingOrders ? (
            <Loader />
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={24} className="text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-1">No orders yet</h3>
              <p className="text-gray-400 text-sm mb-5">You haven't placed any orders yet.</p>
              <button onClick={() => navigate('/products')} className="btn-primary text-sm">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="card p-5">
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Order ID</p>
                      <p className="text-sm font-mono text-gray-700">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Products */}
                  <div className="space-y-2 mb-4">
                    {order.products.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-50 flex-shrink-0"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50?text=Img';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 font-medium line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity} × ₹{item.price?.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-100 pt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      {order.shippingAddress?.city && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {order.shippingAddress.city}
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-gray-900 text-sm">
                      ₹{order.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
