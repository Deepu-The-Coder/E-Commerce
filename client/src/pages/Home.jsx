import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getProducts } from '../services/api';
import { Laptop, Shirt, BookOpen, Footprints, ArrowRight, Tag } from 'lucide-react';

const categories = [
  { name: 'Electronics', icon: Laptop, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
  { name: 'Fashion', icon: Shirt, color: 'bg-pink-50 text-pink-600', border: 'border-pink-100' },
  { name: 'Shoes', icon: Footprints, color: 'bg-orange-50 text-orange-600', border: 'border-orange-100' },
  { name: 'Books', icon: BookOpen, color: 'bg-green-50 text-green-600', border: 'border-green-100' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({ limit: 20 });
        const all = res.data.products;
        // Featured: Electronics + Fashion
        setFeatured(all.filter((p) => p.category === 'Electronics' || p.category === 'Fashion').slice(0, 4));
        // Trending: Shoes + Books
        setTrending(all.filter((p) => p.category === 'Shoes' || p.category === 'Books').slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Section */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
            <Link to="/products" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map(({ name, icon: Icon, color, border }) => (
              <Link
                key={name}
                to={`/products?category=${name}`}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border ${border} ${color.split(' ')[0]} hover:shadow-sm transition-shadow cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                  <Icon size={24} />
                </div>
                <span className="font-medium text-gray-800 text-sm">{name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No products found.</p>
          )}
        </section>

        {/* Special Offer Banner */}
        <section className="py-8">
          <div className="bg-gray-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={16} className="text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Special Offer</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">Up to 40% Off on Books</h3>
              <p className="text-gray-400 text-sm">Knowledge at your fingertips — grab your favourite reads today.</p>
            </div>
            <Link
              to="/products?category=Books"
              className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
            >
              Shop Books
            </Link>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
            <Link to="/products" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : trending.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {trending.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No products found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
