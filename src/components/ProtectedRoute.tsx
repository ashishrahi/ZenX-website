import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { RootState } from '@/store/store';
import AuthModal from './AuthModal';

const ProtectedRoute: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setShowAuthModal(true);
    }
  }, [token]);

  const handleSuccess = () => {
    setShowAuthModal(false);
    navigate(location.pathname, { replace: true });
  };

  if (!token) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleSuccess}
      />
    );
  }

  // Render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
