import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { Search, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Shoes', 'Books'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.search = search;

      const res = await getProducts(params);
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearchParams(cat !== 'All' ? { category: cat } : {});
  };

  const handleClearFilters = () => {
    setSearch('');
    setSearchInput('');
    setCategory('All');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">All Products</h1>
        <p className="text-gray-500 text-sm">{total} products available</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="product-search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-9"
            />
          </div>
          <button type="submit" className="btn-primary px-5 text-sm">
            Search
          </button>
        </form>

        {/* Clear */}
        {(search || category !== 'All') && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors px-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase()}`}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active filter display */}
      {(search || category !== 'All') && (
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <SlidersHorizontal size={14} />
          Showing results
          {category !== 'All' && <span className="font-medium text-gray-700">for "{category}"</span>}
          {search && <span className="font-medium text-gray-700">matching "{search}"</span>}
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">No products found</h3>
          <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          <button onClick={handleClearFilters} className="mt-4 btn-outline text-sm">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
