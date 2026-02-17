import React from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <div className="group bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out">
      
      {/* Product Image Container */}
      <div className="relative bg-gray-50 rounded-[1.5rem] overflow-hidden mb-5 h-64 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = "/images/placeholder.png"; // fallback image
          }}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          New
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center pt-4">
          <div>
            <span className="text-xs text-gray-400 block mb-1">Price</span>
            <span className="text-2xl font-black text-gray-900">
              ₹{product.price}
            </span>
          </div>
          
          <button 
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-90 transition-all"
          >
            <span className="font-bold text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
