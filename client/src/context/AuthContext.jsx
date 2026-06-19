import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMe } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    toast.success(`Welcome back, ${res.data.name}!`);
    return res.data;
  };

  const signup = async (name, email, password) => {
    const res = await registerUser({ name, email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    toast.success(`Account created! Welcome, ${res.data.name}!`);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
