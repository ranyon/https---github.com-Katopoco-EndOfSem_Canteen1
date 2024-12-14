import React from 'react';
import { CheckCircle2, Clock, ChefHat, ShoppingBag } from 'lucide-react';
import { OrderStatus as OrderStatusType } from '../types';

interface OrderTrackerProps {
  status: OrderStatusType;
  createdAt: Date;
}

export function OrderTracker({ status, createdAt }: OrderTrackerProps) {
  const steps = [
    {
      id: 'pending',
      name: 'Order Received',
      icon: Clock,
      description: 'Order received',
      time: new Date(createdAt).toLocaleTimeString(),
    },
    {
      id: 'preparing',
      name: 'Preparing',
      icon: ChefHat,
      description: 'Being prepared',
      time: status === 'preparing' ? new Date().toLocaleTimeString() : '',
    },
    {
      id: 'ready',
      name: 'Ready',
      icon: ShoppingBag,
      description: 'Ready for pickup',
      time: status === 'ready' ? new Date().toLocaleTimeString() : '',
    },
    {
      id: 'completed',
      name: 'Completed',
      icon: CheckCircle2,
      description: 'Order completed',
      time: status === 'completed' ? new Date().toLocaleTimeString() : '',
    },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === status);

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative">
          <div className="absolute left-4 h-full w-0.5 bg-gray-200">
            <div
              className="absolute left-0 top-0 w-full bg-blue-600 transition-all duration-500"
              style={{ height: `${(currentStepIndex + 1) * 25}%` }}
            />
          </div>
          
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="relative flex items-start pl-12">
                  <div
                    className={`
                      absolute left-0 p-2 rounded-full
                      ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'}
                      ${isCurrent ? 'ring-4 ring-blue-100' : ''}
                    `}
                  >
                    <Icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">
                      {step.name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">
                      {step.description}
                    </div>
                    {step.time && (
                      <div className="mt-1 text-xs text-gray-400">
                        {step.time}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2">
            <div
              className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`
                      relative z-10 flex h-12 w-12 items-center justify-center rounded-full
                      ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'}
                      ${isCurrent ? 'ring-4 ring-blue-100' : ''}
                    `}
                  >
                    <Icon className={`h-6 w-6 ${isCompleted ? 'text-white' : 'text-gray-500'}`} />
                  </div>

                  <div className="mt-4 text-center">
                    <p className={`font-semibold ${isCompleted ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                    {step.time && (
                      <p className="mt-1 text-xs text-gray-400">{step.time}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}