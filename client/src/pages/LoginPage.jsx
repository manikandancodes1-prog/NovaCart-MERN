import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/login', { email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      alert('Logged in successfully!');
      navigate('/'); 
    } catch (error) {
      
      alert(error.response?.data?.message || 'Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black text-center text-gray-800 mb-8">
          Welcome <span className="text-blue-600">Back!</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transform hover:scale-[1.02] transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;