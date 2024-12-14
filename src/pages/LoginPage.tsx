import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/menu" replace />;
  }

  return <LoginForm />;
}