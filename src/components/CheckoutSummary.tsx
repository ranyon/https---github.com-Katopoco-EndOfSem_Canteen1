import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Coins } from 'lucide-react';

export function CheckoutSummary() {
  const { cart, getCartTotal, user } = useStore();
  const [usePoints, setUsePoints] = useState(false);
  const subtotal = getCartTotal();
  const pointsToEarn = Math.floor(subtotal);
  
  // Calculate available discount ($10 for every 100 points)
  const availableDiscount = user ? Math.floor(user.points / 100) * 10 : 0;
  const appliedDiscount = usePoints && availableDiscount > 0 ? Math.min(availableDiscount, subtotal) : 0;
  const total = subtotal - appliedDiscount;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₵{subtotal.toFixed(2)}</span>
        </div>

        {user && user.points >= 100 && (
          <div className="pt-2">
            <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="flex items-center space-x-1">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span>Use points for ₵{availableDiscount.toFixed(2)} discount</span>
              </span>
            </label>
          </div>
        )}

        {appliedDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Points Discount</span>
            <span>-₵{appliedDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₵{total.toFixed(2)}</span>
          </div>
        </div>

        {user && (
          <div className="text-sm">
            {usePoints ? (
              <p className="text-gray-600">
                You'll use {Math.ceil(appliedDiscount * 10)} points and earn {pointsToEarn} new points
              </p>
            ) : (
              <p className="text-green-600">
                You'll earn {pointsToEarn} points with this order!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}