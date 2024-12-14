import React from 'react';
import { useOrders } from '../hooks/useOrders';
import { OrderTracker } from '../components/OrderTracker';
import { useStore } from '../store/useStore';
import { Clock } from 'lucide-react';

export function OrdersPage() {
  const { user } = useStore();
  const { orders, loading } = useOrders();

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Please log in to view your orders</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  const userOrders = orders.filter((order) => order.userId === user.id);

  if (userOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
        <p className="text-gray-600">Start ordering delicious meals from our menu!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Orders</h1>
        <div className="w-full sm:w-auto bg-blue-50 rounded-lg px-4 py-2">
          <p className="text-blue-800 text-sm sm:text-base">
            Loyalty Points: <span className="font-bold">{user.points}</span>
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {userOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4" />
                    <time dateTime={order.createdAt.toString()}>
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </time>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">+{order.pointsEarned} points</span>
                </div>
              </div>

              {/* Order Tracker */}
              <OrderTracker status={order.status} createdAt={order.createdAt} />

              {/* Order Items */}
              <div className="mt-6 divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div key={index} className="py-3 flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.menuItem.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">Quantity: {item.quantity}</p>
                      {Object.entries(item.customizations).map(([category, optionId]) => {
                        const option = item.menuItem.customization
                          ?.find((c) => c.options.some((o) => o.id === optionId))
                          ?.options.find((o) => o.id === optionId);
                        if (option) {
                          return (
                            <p key={optionId} className="text-sm text-gray-500">
                              + {option.name}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <p className="font-medium text-gray-900 ml-4">
                      ₵{(item.menuItem.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">Total</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₵{order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}