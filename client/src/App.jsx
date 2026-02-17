import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import API from './api';
import ProductCard from './components/ProductCard';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import MyOrdersPage from './pages/MyOrdersPage'; 
import { CartProvider, useCart } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AddProductPage from './pages/AddProductPage';

// --- 1. Premium Hero Section Component ---
const HeroSection = () => {
  return (
    <div className="relative bg-slate-900 rounded-[2.5rem] py-16 px-8 mb-16 text-white overflow-hidden shadow-2xl">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-30"></div>
      
      <div className="relative z-10 max-w-3xl">
        <span className="bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-sm font-bold mb-6 inline-block">
          New Collection 2026 ⚡
        </span>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
          Upgrade Your Tech <br />
          <span className="text-blue-500">With Style.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl">
          Discover our curated selection of high-performance gadgets and accessories designed for the modern lifestyle.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/25 active:scale-95">
            Shop Now
          </button>
          <button className="border border-white/10 hover:bg-white/5 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 2. Home Page Product Grid Component ---
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  const fetchProducts = async (searchKeyword = '') => {
    try {
      const { data } = await API.get(`/products?keyword=${searchKeyword}`);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products!", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value); 
    fetchProducts(value); 
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Bar UI */}
      <div className="mb-12 flex justify-center">
        <div className="relative w-full max-w-xl">
          <input 
            type="text"
            placeholder="Search premium products..."
            className="w-full bg-white border-2 border-gray-100 py-4 px-6 rounded-2xl shadow-sm focus:border-blue-500 focus:outline-none transition-all font-medium"
            value={keyword}
            onChange={handleSearch} 
          />
          <div className="absolute right-5 top-4.5 text-gray-400">
             🔍
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-2xl font-bold text-gray-400">No products found! 😕</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- 3. Glassmorphism Navbar Component ---
const Navbar = () => {
  const { cartItems } = useCart();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    window.location.href = "/login"; 
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-gray-900 tracking-tighter hover:scale-105 transition-transform">
          Nova<span className="text-blue-600">Cart</span>
        </Link>
        
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link to="/" className="font-semibold text-gray-600 hover:text-blue-600 transition">
            Home
          </Link>

          {userInfo && (
            <Link to="/myorders" className="font-semibold text-gray-600 hover:text-blue-600 transition">
              My Orders
            </Link>
          )}
          
          <Link to="/cart" className="flex items-center space-x-2 bg-blue-600/10 px-4 py-2 rounded-xl hover:bg-blue-600/20 transition">
            <span className="text-xl">🛒</span>
            <span className="font-bold text-blue-600">{cartCount}</span>
          </Link>

          {userInfo ? (
            <button 
              onClick={logoutHandler} 
              className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-red-600 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- 4. Main App Structure ---
function App() {
  return (
    <CartProvider>
      <Toaster position="bottom-right" reverseOrder={false} /> {/* இதைச் சேர்க்கவும் */}
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />

          <main className="max-w-7xl mx-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={
                <div className="animate-in fade-in duration-700">
                  <HeroSection />
                  <div className="mb-10 flex justify-between items-center">
                    <h2 className="text-3xl font-black text-gray-900 italic">Featured Products</h2>
                    <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                  </div>
                  <HomePage />
                </div>
              } />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/myorders" element={<MyOrdersPage />} />
              <Route path="/order/:id" element={<OrderDetailsPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/admin/add-product" element={<AddProductPage />} />
            </Routes>
          </main>

          <footer className="bg-white border-t border-gray-100 py-12 mt-20 text-center">
            <div className="mb-4 font-black text-xl tracking-tighter">
              Nova<span className="text-blue-600">Cart</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 NovaCart Premium Store. Built for the future.
            </p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;