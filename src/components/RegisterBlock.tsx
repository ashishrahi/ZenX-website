import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { registerUser } from '@/store/authSlice';

interface RegisterBlockProps {
  onRegisterSuccess: () => void; // only switch tab, do not close modal
}

const RegisterBlock: React.FC<RegisterBlockProps> = ({ onRegisterSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resultAction = await dispatch(registerUser(formData) as any);
      if (registerUser.fulfilled.match(resultAction)) {
        onRegisterSuccess(); // switch to login tab
      } else {
        console.error('Registration failed:', resultAction.payload || resultAction.error);
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-black px-4 py-6 rounded-lg">
      <div>
        <Label htmlFor="register-name" className="text-red-500 font-medium">Full Name</Label>
        <Input
          id="register-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="mt-1 bg-gray-900 text-white border-red-500 focus:border-red-600 focus:ring-red-600"
          required
        />
      </div>

      <div>
        <Label htmlFor="register-email" className="text-red-500 font-medium">Email</Label>
        <Input
          id="register-email"
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
        <Label htmlFor="register-password" className="text-red-500 font-medium">Password</Label>
        <Input
          id="register-password"
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
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterBlock;
