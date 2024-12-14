import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';

export function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dietaryRestrictions: [] as string[],
    allergies: [] as string[],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    const result = await register({
      ...formData,
      preferences: {
        dietaryRestrictions: formData.dietaryRestrictions,
        allergies: formData.allergies,
      },
    });

    if (!result.success) {
      setError(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Already have an account?"
      linkText="Sign in here"
      linkTo="/login"
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
            <select
              multiple
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.dietaryRestrictions}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, (option) => option.value);
                setFormData({ ...formData, dietaryRestrictions: values });
              }}
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
              <option value="halal">Halal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <select
              multiple
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.allergies}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, (option) => option.value);
                setFormData({ ...formData, allergies: values });
              }}
            >
              <option value="nuts">Nuts</option>
              <option value="dairy">Dairy</option>
              <option value="shellfish">Shellfish</option>
              <option value="eggs">Eggs</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
            </span>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}