import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Simple auth check component
const UserPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/user/dashboard" replace />;
  } else {
    return <Navigate to="/user/login" replace />;
  }
};

export default UserPanel;
