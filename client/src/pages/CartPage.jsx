import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api'; 

const CartPage = () => {
  
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  
  const handleCheckout = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    
    if (!userInfo) {
      alert("Please login to place an order!");
      navigate('/login');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`, 
      },
    };

    try {
      
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id, 
        })),
        totalPrice: totalPrice,
      };

      
      const { data } = await API.post('/orders', orderData, config);

      alert(`Order Placed Successfully! 🎉 ID: ${data._id}`);
      
      
      clearCart(); 
      
      
      navigate('/order-success');
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      const message = error.response?.data?.message || "Error placing order!";
      alert(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black mb-8 text-gray-800 border-b pb-4">
        Shopping Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border">
          <p className="text-xl text-gray-500 mb-6 font-medium">Your cart is empty!</p>
          <Link to="/" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                    <p className="text-blue-600 font-black">₹{item.price}</p>
                    <p className="text-xs text-gray-400 mt-1">Qty: {item.qty}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Amount</p>
              <h2 className="text-4xl font-black text-white">₹{totalPrice.toLocaleString()}</h2>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 px-12 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;