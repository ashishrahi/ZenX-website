import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RootState } from "@/store/store";
import AuthModal from "./AuthModal";

const ProtectedRoute: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const [forceOpen, setForceOpen] = React.useState(false);

  const handleSuccess = () => {
    setForceOpen(false);
    navigate(location.pathname, { replace: true });
  };

  if (!token) {
    return (
      <>
        {/* Checkout background disable/blur */}
        <div className="pointer-events-none opacity-30">
          <Outlet />
        </div>

        {/* Auth modal should ALWAYS open when token is missing */}
        <AuthModal
          isOpen={true}                 // 🔑 always true if not logged in
          onClose={() => setForceOpen(false)} // user may close manually
          onSuccess={handleSuccess}
        />
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
