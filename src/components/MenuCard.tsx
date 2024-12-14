import React, { useState } from 'react';
import { Plus, Minus, Utensils, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { MenuItem } from '../types';
import { useStore } from '../store/useStore';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string>>({});
  const [showNutrition, setShowNutrition] = useState(false);
  const [showCustomizations, setShowCustomizations] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedCustomizations);
    setQuantity(1);
    setSelectedCustomizations({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-gray-900">₵{item.price.toFixed(2)}</span>
        </div>
        <div className="absolute top-4 left-4 bg-blue-500 px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-medium text-white">{item.category}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>

        <div className="space-y-4">
          {item.customization && (
            <div>
              <button
                onClick={() => setShowCustomizations(!showCustomizations)}
                className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span>Customizations</span>
                {showCustomizations ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {showCustomizations && (
                <div className="mt-3 space-y-3">
                  {item.customization.map((custom) => (
                    <div key={custom.name} className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">{custom.name}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {custom.options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-2 text-sm bg-gray-50 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCustomizations[custom.name] === option.id}
                              onChange={(e) => {
                                setSelectedCustomizations((prev) => ({
                                  ...prev,
                                  [custom.name]: e.target.checked ? option.id : '',
                                }));
                              }}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="flex-grow">
                              {option.name} <span className="text-gray-500">(₵{option.price.toFixed(2)})</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowNutrition(!showNutrition)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Nutrition Info"
              >
                <Utensils className="h-5 w-5" />
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          {showNutrition && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Nutrition Information</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Calories</p>
                  <p className="font-semibold">{item.nutrition.calories} kcal</p>
                </div>
                <div>
                  <p className="text-gray-600">Protein</p>
                  <p className="font-semibold">{item.nutrition.protein}g</p>
                </div>
                <div>
                  <p className="text-gray-600">Carbs</p>
                  <p className="font-semibold">{item.nutrition.carbs}g</p>
                </div>
                <div>
                  <p className="text-gray-600">Fat</p>
                  <p className="font-semibold">{item.nutrition.fat}g</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}