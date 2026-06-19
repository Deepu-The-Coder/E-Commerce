import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { ShoppingCart, Star, ArrowLeft, Package } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await getProductById(id);
      setProduct(res.data);

      // Fetch related
      const relRes = await getProducts({ category: res.data.category, limit: 20 });
      setRelated(
        relRes.data.products.filter((p) => p._id !== id).slice(0, 4)
      );
    } catch (err) {
      console.error(err);
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }
    setAddingToCart(true);
    await addToCart(product._id, quantity);
    setAddingToCart(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }
      />
    ));
  };

  if (loading) return <Loader fullScreen />;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Product Main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full w-fit mb-3">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm text-gray-600 font-medium">{product.rating} / 5</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-gray-900 mb-4">
            ₹{product.price.toLocaleString()}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <Package size={16} className="text-green-600" />
            <span className="text-sm text-green-700 font-medium">
              In Stock ({product.stock} available)
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-semibold min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            id="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
