import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, LogOut, Save } from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, redeemPoints, logout } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user ? {
    name: user.name,
    email: user.email,
    dietaryRestrictions: user.preferences.dietaryRestrictions,
    allergies: user.preferences.allergies,
  } : null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = () => {
    if (formData) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        preferences: {
          dietaryRestrictions: formData.dietaryRestrictions,
          allergies: formData.allergies,
        },
      });
      setIsEditing(false);
    }
  };

  const handleRedeemPoints = () => {
    if (user.points >= 100) {
      redeemPoints(100);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-700"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData?.name}
                onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData?.email}
                onChange={(e) => setFormData({ ...formData!, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
              <select
                multiple
                value={formData?.dietaryRestrictions}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, (option) => option.value);
                  setFormData({ ...formData!, dietaryRestrictions: values });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                value={formData?.allergies}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, (option) => option.value);
                  setFormData({ ...formData!, allergies: values });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="nuts">Nuts</option>
                <option value="dairy">Dairy</option>
                <option value="shellfish">Shellfish</option>
                <option value="eggs">Eggs</option>
              </select>
            </div>
            <button
              onClick={handleSaveProfile}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Dietary Restrictions</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {user.preferences.dietaryRestrictions.map((restriction) => (
                  <span
                    key={restriction}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {restriction}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Allergies</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {user.preferences.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Loyalty Points</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-blue-600">{user.points}</p>
            <p className="text-sm text-gray-600">Available Points</p>
          </div>
          <button
            onClick={handleRedeemPoints}
            disabled={user.points < 100}
            className={`px-4 py-2 rounded-lg ${
              user.points >= 100
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Redeem 100 Points
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          {user.points >= 100
            ? 'You have enough points to redeem for a $10 discount!'
            : `Collect ${100 - user.points} more points to get a $10 discount.`}
        </p>
      </div>
    </div>
  );
}