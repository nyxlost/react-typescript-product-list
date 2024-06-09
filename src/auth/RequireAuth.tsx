import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequireAuthProps } from '../interfaces/interfaceLogin'

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
