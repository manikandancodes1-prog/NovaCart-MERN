import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import API from '../api';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await API.get('/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders!", error);
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          My <span className="text-blue-600 italic">Orders</span> 📦
        </h1>
        <p className="text-slate-500 mt-2">Track and manage your premium tech purchases.</p>
      </header>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-100 text-center">
          <p className="text-slate-400 text-lg italic">You haven't placed any orders yet.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 font-bold hover:underline">Start Shopping →</Link>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6"
        >
          {orders.map((order) => (
            <motion.div 
              key={order._id}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              {/* Order Info */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl font-bold">
                  #{orders.indexOf(order) + 1}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</p>
                  <p className="text-sm font-mono text-slate-600">{order._id.substring(0, 12)}...</p>
                </div>
              </div>

              {/* Date & Total */}
              <div className="grid grid-cols-2 md:flex md:gap-12 flex-grow justify-around">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                  <p className="font-bold text-slate-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                  <p className="font-black text-blue-600 text-lg">₹{order.totalPrice}</p>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  order.isDelivered ? 'bg-green-100 text-green-600' : 'bg-orange-50 text-orange-500'
                }`}>
                  {order.isDelivered ? 'Delivered' : 'Processing'}
                </div>
                <Link 
                  to={`/order/${order._id}`}
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyOrdersPage;