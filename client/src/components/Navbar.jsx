import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search, Package } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl text-gray-900">ShopSphere</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
              Products
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={() => navigate('/products')}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Search products"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            {user && (
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user.name?.split(' ')[0]}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User size={16} />
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Package size={16} />
                      My Orders
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ShoppingCart size={16} />
                      My Cart
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Products
            </Link>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
