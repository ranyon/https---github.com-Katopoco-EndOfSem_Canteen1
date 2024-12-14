import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, ClipboardList } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navbar() {
  const { user, cart } = useStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Koranteng's Canteen
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/menu" className="text-gray-600 hover:text-gray-900">
              Menu
            </Link>
            {user && (
              <Link to="/orders" className="text-gray-600 hover:text-gray-900">
                <div className="flex items-center space-x-1">
                  <ClipboardList className="h-6 w-6" />
                  <span className="hidden sm:inline">Orders</span>
                </div>
              </Link>
            )}
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to={user ? "/profile" : "/register"} className="text-gray-600 hover:text-gray-900">
              <div className="flex items-center space-x-1">
                <User className="h-6 w-6" />
                <span className="hidden sm:inline">
                  {user ? user.name : 'Sign Up'}
                </span>
              </div>
            </Link>
            {user && (
              <div className="hidden sm:block text-sm text-blue-600 font-medium">
                {user.points} points
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}