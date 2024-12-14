import React from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';

export function RegisterPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/menu" replace />;
  }

  return <RegisterForm />;
}