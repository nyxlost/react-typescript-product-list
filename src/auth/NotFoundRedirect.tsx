import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundRedirect: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate("/homepage");
    }
  }, [isLoggedIn, navigate]);

  return null;
};

export default NotFoundRedirect;
