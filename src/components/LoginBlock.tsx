import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RootState } from '@/store/store';

interface LoginBlockProps {
  onSuccess: () => void;
}

const LoginBlock: React.FC<LoginBlockProps> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      onSuccess();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-black px-4 py-6 rounded-lg">
      {error && <div className="bg-red-100 text-red-700 text-sm p-3 rounded-md text-center">{error}</div>}

      <div>
        <Label htmlFor="login-email" className="text-red-500 font-medium">Email</Label>
        <Input
          id="login-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="mt-1 bg-gray-900 text-white border-red-500 focus:border-red-600 focus:ring-red-600"
          required
        />
      </div>

      <div>
        <Label htmlFor="login-password" className="text-red-500 font-medium">Password</Label>
        <Input
          id="login-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="mt-1 bg-gray-900 text-white border-red-500 focus:border-red-600 focus:ring-red-600"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginBlock;
