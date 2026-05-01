import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from '../components/auth/Login';
const PublicRoutes = () => {
  const token = localStorage.getItem("token");

  // Agar logged in hai toh login/forgot page access nahi karne dena
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
    </Routes>
  )
}

export default PublicRoutes