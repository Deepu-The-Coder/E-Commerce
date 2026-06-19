import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="inline-block bg-blue-500 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            New Arrivals
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Discover What's{' '}
            <span className="text-blue-200">Trending</span> Today
          </h1>
          <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
            Shop the latest Electronics, Fashion, Shoes, and Books — all in one place.
            Free delivery on orders above ₹999.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/products?category=Electronics"
              className="inline-flex items-center gap-2 border border-blue-300 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Explore Electronics
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
