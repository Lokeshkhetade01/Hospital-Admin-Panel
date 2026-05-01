import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Token check kar rahe hain

  // Agar token hai toh dashboard dikhao (Outlet), nahi toh login par bhej do
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;