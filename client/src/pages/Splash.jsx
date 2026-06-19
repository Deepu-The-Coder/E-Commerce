import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-4xl">S</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">ShopSphere</h1>
        <p className="text-gray-500 text-sm">Your one-stop shop for everything</p>
        <div className="mt-6">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
