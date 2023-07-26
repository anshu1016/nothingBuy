import React from 'react'
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Login from '../features/login/Login';
const RequireAuth = ({children}) => {
    const { isLoggedIn } = useAuth();
    let location = useLocation();
  return (
    isLoggedIn?(children):<Navigate to="/login" state={{ from: location }} />
  )
}

export default RequireAuth;
