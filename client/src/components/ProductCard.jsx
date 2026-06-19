import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(product._id);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <Link to={`/products/${product._id}`} className="group">
      <div className="card overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 h-52">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
          <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>

          {/* Price & Button */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
