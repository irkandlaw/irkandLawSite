import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Используйте ваш собственный контекст аутентификации

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Получаем статус аутентификации

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
