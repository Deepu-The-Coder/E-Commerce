import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-white">ShopSphere</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for Electronics, Fashion, Shoes, and Books.
              Quality products at great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">Profile</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {['Electronics', 'Fashion', 'Shoes', 'Books'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${cat}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ShopSphere. All rights reserved. Built with ❤️ as a learning project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
