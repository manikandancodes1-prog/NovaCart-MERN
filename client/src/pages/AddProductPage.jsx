import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', Number(price));
      formData.append('description', description);
      formData.append('category', category);
      formData.append('stock', Number(stock)); // 
      formData.append('image', image);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await API.post('/products', formData, config);

      alert('Product Added Successfully! 🚀');
      navigate('/');

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to add product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100">
      <h2 className="text-3xl font-black mb-8 italic text-slate-900">
        Add New <span className="text-blue-600">Gadget</span>
      </h2>

      <form onSubmit={submitHandler} className="space-y-5">
        <div>
          <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">
              Stock Count
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none h-32"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">
            Product Image
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-4 bg-slate-50 rounded-2xl"
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all"
        >
          {uploading ? 'Uploading Product...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
