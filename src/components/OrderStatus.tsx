import React from 'react';
import { Clock, CheckCircle2, ChefHat, ShoppingBag } from 'lucide-react';
import { OrderStatus as OrderStatusType } from '../types';

interface OrderStatusProps {
  status: OrderStatusType;
}

export function OrderStatus({ status }: OrderStatusProps) {
  const getStatusDetails = (status: OrderStatusType) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5" />,
          color: 'text-yellow-500',
          bg: 'bg-yellow-50',
          text: 'Order Received',
          description: 'Your order has been received and will be prepared soon'
        };
      case 'preparing':
        return {
          icon: <ChefHat className="h-5 w-5" />,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          text: 'Preparing',
          description: 'Our chefs are preparing your delicious meal'
        };
      case 'ready':
        return {
          icon: <ShoppingBag className="h-5 w-5" />,
          color: 'text-green-500',
          bg: 'bg-green-50',
          text: 'Ready for Pickup',
          description: 'Your order is ready! Please collect it from the counter'
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="h-5 w-5" />,
          color: 'text-gray-500',
          bg: 'bg-gray-50',
          text: 'Completed',
          description: 'Order completed. Enjoy your meal!'
        };
    }
  };

  const details = getStatusDetails(status);

  return (
    <div className="flex flex-col space-y-1">
      <div className={`inline-flex items-center space-x-2 ${details.bg} ${details.color} px-3 py-1 rounded-full self-start`}>
        {details.icon}
        <span className="text-sm font-medium">{details.text}</span>
      </div>
      <p className="text-sm text-gray-600">{details.description}</p>
    </div>
  );
}