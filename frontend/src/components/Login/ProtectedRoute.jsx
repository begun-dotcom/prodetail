import React from 'react'
import { Navigate } from 'react-router-dom';
import  UseAuth  from './UseAuth.jsx';

function ProtectedRoute({children}) {
    const { isAuthenticated, user, loading } = UseAuth();
    if (loading) {
        return <div>Проверка авторизации...</div>;  // ← Спиннер или загрузка
    }
    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
    return children;
  
}

export default ProtectedRoute
