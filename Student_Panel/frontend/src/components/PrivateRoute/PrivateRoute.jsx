import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // or use your auth logic here

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
