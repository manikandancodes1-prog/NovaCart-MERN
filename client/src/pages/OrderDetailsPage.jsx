import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import jsPDF from 'jspdf';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const { data } = await API.get(`/orders/${id}`, config);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error("Order Details Fetch Error:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  
  const downloadInvoice = () => {
    if (!order) return;

    const doc = new jsPDF();

    const customerName = order.user?.name || "N/A";
    const customerEmail = order.user?.email || "N/A";

    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("NOVACART INVOICE", 20, 28);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    doc.text(
      `Order Date: ${new Date(order.createdAt).toLocaleDateString()}`,
      20,
      50
    );
    doc.text(`Order ID: ${order._id}`, 20, 60);
    doc.text(`Customer Name: ${customerName}`, 20, 70);
    doc.text(`Email: ${customerEmail}`, 20, 80);

    doc.line(20, 90, 190, 90);

    doc.setFontSize(14);
    doc.text("Purchased Items:", 20, 105);
    doc.setFontSize(12);

    order.orderItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} (Qty: ${item.qty})`,
        25,
        115 + index * 10
      );
      doc.text(
        `Rs. ${item.price * item.qty}`,
        160,
        115 + index * 10
      );
    });

    doc.line(20, 160, 190, 160);

    doc.setFontSize(16);
    doc.text(`Grand Total: Rs. ${order.totalPrice}`, 130, 175);

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Thank you for shopping with NovaCart Premium Store!",
      55,
      200
    );

    doc.save(`NovaCart_Bill_${order._id.substring(0, 6)}.pdf`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-10 text-center font-bold text-blue-600 animate-pulse text-2xl">
          Loading Order Details...
        </div>
      </div>
    );

  if (!order)
    return (
      <div className="p-10 text-center font-bold text-red-500 text-2xl">
        Order Not Found!
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black italic text-slate-900">
          Order <span className="text-blue-600">Summary</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Shipping */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800">
              <span className="mr-3 text-2xl">📦</span> Shipping Details
            </h2>

            <div className="text-gray-600 space-y-2">
              <p className="font-bold text-gray-900 text-lg">
                {order.user?.name}
              </p>
              <p>📧 {order.user?.email}</p>

              <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm font-medium text-slate-500 uppercase">
                  Delivery Address
                </p>
                <p className="text-slate-700">
                  123, Tech Avenue, Digital City, TN - 600001
                </p>
              </div>
            </div>

            <div className="mt-6 inline-block px-5 py-2 bg-orange-100 text-orange-600 rounded-full font-bold text-xs uppercase tracking-widest">
              Status: Processing
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800">
              Order Items
            </h2>

            <div className="divide-y divide-gray-100">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="py-5 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.png';
                        }}
                      />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-400">
                        {item.qty} x ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <p className="font-black text-slate-900">
                    ₹{item.qty * item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Payment Card */}
        <div className="md:col-span-1">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl sticky top-28 border border-white/5">
            
            <h2 className="text-xl font-bold mb-8 flex items-center">
              <span className="mr-3">💳</span> Payment Detail
            </h2>

            <div className="space-y-5 text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">
                  ₹{order.totalPrice}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400 font-bold text-xs">
                  Free Delivery
                </span>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center">
                <span className="font-bold text-lg text-white">
                  Grand Total
                </span>
                <span className="text-3xl font-black text-blue-500">
                  ₹{order.totalPrice}
                </span>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex flex-col gap-4 mt-10">
              <button
                onClick={downloadInvoice}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
              >
                📄 Download Invoice
              </button>

              <div className="text-center bg-blue-500/10 border border-blue-400/30 text-blue-400 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest">
                Invoice is ready for download
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;
