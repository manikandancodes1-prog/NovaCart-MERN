import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const OrderSuccessPage = () => {
  
  useEffect(() => {
    
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* மென்மையான அனிமேஷனுடன் பச்சை நிற டிக் மார்க் */}
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-6xl mb-8 shadow-sm border border-green-100"
      >
        ✓
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl font-black text-slate-900 mb-4 tracking-tighter"
      >
        Order <span className="text-blue-600 italic">Confirmed!</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-slate-500 max-w-md mb-12 leading-relaxed font-medium"
      >
        Your payment was processed successfully. 
        <br />
        Get ready! Your premium tech gadgets are being packed with care.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 w-full justify-center"
      >
        <Link 
          to="/myorders" 
          className="bg-slate-900 text-white px-10 py-4 rounded-[1.5rem] font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 text-center"
        >
          Track My Order
        </Link>
        <Link 
          to="/" 
          className="bg-white border border-slate-200 text-slate-600 px-10 py-4 rounded-[1.5rem] font-bold hover:bg-slate-50 transition-all active:scale-95 text-center"
        >
          Continue Shopping
        </Link>
      </motion.div>

      {/* கீழே உள்ள சிறிய மெசேஜ் */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-slate-400 text-xs font-bold uppercase tracking-widest"
      >
        Thank you for choosing NovaCart
      </motion.p>
    </div>
  );
};

export default OrderSuccessPage;