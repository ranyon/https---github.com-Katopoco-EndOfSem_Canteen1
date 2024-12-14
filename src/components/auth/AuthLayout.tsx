import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
}

export function AuthLayout({ children, title, subtitle, linkText, linkTo }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Store className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {subtitle}{' '}
            <Link to={linkTo} className="font-medium text-blue-600 hover:text-blue-500">
              {linkText}
            </Link>
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}