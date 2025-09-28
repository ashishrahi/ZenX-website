import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import LoginBlock from './LoginBlock';
import RegisterBlock from './RegisterBlock';
import { RootState } from '@/store/store';
import { X } from 'lucide-react';
import Logo from '../assets/Zen-X-Logo-300x139-removebg-preview.webp'

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isVisible, setIsVisible] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && isOpen) onSuccess();
  }, [token, isOpen, onSuccess]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleRegisterSuccess = () => setActiveTab('login');

  if (!isVisible && !isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity duration-300" />
      
      <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300">
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 transition-all hover:bg-gray-800/50 group"
          >
            <X className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>

          {/* Header with Logo */}
          <div className="relative pt-8 pb-4 bg-gradient-to-r from-red-900/20 to-transparent">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <img 
                  src={Logo} 
                  alt="Zen X Logo" 
                  className="h-16 w-auto filter drop-shadow-lg" 
                />
                <div className="absolute inset-0 bg-red-500/10 rounded-full blur-lg" />
              </div>
            </div>
            <h2 className="text-center text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to Zen X
            </h2>
            <p className="text-center text-gray-400 text-sm mt-1">
              {activeTab === 'login' ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Tabs */}
          <div className="px-8 pb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 rounded-lg border border-gray-700/50 p-1 mb-6 backdrop-blur-sm">
                <TabsTrigger
                  value="login"
                  className={`relative text-sm font-medium transition-all duration-300 py-2.5 rounded-md ${
                    activeTab === 'login' 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  Sign In
                  {activeTab === 'login' && (
                    <div className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-red-400 rounded-full -translate-x-1/2 translate-y-1.5" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className={`relative text-sm font-medium transition-all duration-300 py-2.5 rounded-md ${
                    activeTab === 'register' 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  Create Account
                  {activeTab === 'register' && (
                    <div className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-red-400 rounded-full -translate-x-1/2 translate-y-1.5" />
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent 
                value="login" 
                className="animate-in fade-in-0 zoom-in-95 duration-300"
              >
                <LoginBlock onSuccess={onSuccess} />
              </TabsContent>

              <TabsContent 
                value="register" 
                className="animate-in fade-in-0 zoom-in-95 duration-300"
              >
                <RegisterBlock onSuccess={handleRegisterSuccess} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800/50 bg-gray-900/20 px-8 py-4">
            <p className="text-center text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <button className="text-red-400 hover:text-red-300 transition-colors underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-red-400 hover:text-red-300 transition-colors underline">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;