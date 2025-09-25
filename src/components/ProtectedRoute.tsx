// src/components/ProtectedRoute.tsx
import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setShowAuthModal(true);
      // Store the intended destination
      setRedirectPath(location.pathname);
    }
  }, [token, location.pathname]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // The route will automatically re-render and show the content now that we have a token
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
    // Optionally redirect to home or previous page when modal is closed without auth
    // You can remove this if you want to keep the user on the same page
  };

  // If authenticated, render the protected content
  if (token) {
    return <Outlet />;
  }

  // If not authenticated but modal is shown, render the public content with modal
  return (
    <>
      {/* Show the public version of the page or loading state */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p>Please log in to access this page.</p>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={handleCloseModal}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

// Alternative version that redirects after successful auth
const ProtectedRouteWithRedirect = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!token) {
      setShowAuthModal(true);
    }
  }, [token]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  if (token) {
    return <Outlet />;
  }

  // Show nothing or a loader while checking auth
  // The modal will handle the auth flow
  return (
    <>
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      
      {/* Optional: Show a blurred background or loading state */}
      <div className="filter blur-sm">
        {/* This could be a simplified version of the page content */}
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedRoute;