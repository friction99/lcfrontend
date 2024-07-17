import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.admin_id);

  useEffect(() => {
    const checkAuth = async () => {
      if (role) {
        setIsAuthenticated(true);
        return;
      }

      try {
        const response = await axios.get(`${backendURL}/api/check-auth`, { withCredentials: true });
        console.log(response);
        if (response.data.message === 'Authenticated') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [backendURL, role]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/Login');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return children;
};

export default ProtectedRoute;
