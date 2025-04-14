import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = () => {
  const auth = useContext(AuthContext);
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
