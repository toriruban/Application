import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import axios from 'axios';

export default function LoginPage() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const { setAuth } = useAuthStore();
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await api.post('/auth/login', { email, password});
        setAuth(response.data.token, response.data.user);
        navigate('/events');
    } catch (error) {
        if(axios.isAxiosError(error)) {
            setError(error.response?.data?.message || 'Login failed');
        } else {
            setError('Login failed')
        }
    } finally {
        setLoading(false);
    }
   };

   return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
    <div className='w-full max-w-sm bg-gray-800 rounded-xl p-8 flex flex-col gap-6'>
      <h1 className='text-2xl font-bold text-center text-white'>Login</h1>

    {error && (
      <div className='bg-red-100 text-red-600 p-3 rounded'>
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border border-gray-600 bg-gray-700 text-white p-3 rounded placeholder-gray-400'
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border border-gray-600 bg-gray-700 text-white p-3 rounded placeholder-gray-400'
        required
      />
      <button
        type="submit"
        disabled={loading}
        className='cursor-pointer bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50'
      >
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>

    <p className='text-center text-gray-400'>
      No account?{' '}
      <Link to="/register" className='text-blue-400 hover:underline'>
        Register
      </Link>
    </p>
  </div>
</div>
   );
}