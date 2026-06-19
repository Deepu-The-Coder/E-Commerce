import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from '../services/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const res = await getCart();
      setCart(res.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await apiAddToCart({ productId, quantity });
      setCart(res.data.items || []);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await apiUpdateCartItem(productId, { quantity });
      setCart(res.data.items || []);
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await apiRemoveFromCart(productId);
      setCart(res.data.items || []);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart();
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cart.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        cartLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
