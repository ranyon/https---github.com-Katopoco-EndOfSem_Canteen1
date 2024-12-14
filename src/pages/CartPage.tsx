import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CheckoutSummary } from '../components/CheckoutSummary';

export function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, placeOrder, user } = useStore();

  const handleCheckout = () => {
    if (!user) {
      navigate('/register');
      return;
    }
    placeOrder();
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some delicious items from our menu!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {cart.map((item) => (
              <div
                key={item.menuItem.id}
                className="flex items-center py-4 border-b last:border-b-0"
              >
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold">{item.menuItem.name}</h3>
                  <p className="text-gray-600 text-sm">{item.menuItem.description}</p>
                  {Object.entries(item.customizations).map(([category, optionId]) => {
                    const option = item.menuItem.customization
                      ?.find((c) => c.options.some((o) => o.id === optionId))
                      ?.options.find((o) => o.id === optionId);
                    if (option) {
                      return (
                        <p key={optionId} className="text-sm text-gray-500">
                          + {option.name} (${option.price.toFixed(2)})
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, Math.max(1, item.quantity - 1))}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.menuItem.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <CheckoutSummary />
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {user ? 'Place Order' : 'Sign in to Checkout'}
          </button>
          {!user && (
            <p className="mt-2 text-sm text-gray-600 text-center">
              Sign in or create an account to earn points with your order!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}