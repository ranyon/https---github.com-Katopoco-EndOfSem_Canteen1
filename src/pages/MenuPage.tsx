import React, { useState } from 'react';
import { MenuCard } from '../components/MenuCard';
import { menuItems } from '../data/menuItems';
import { Search, Filter, X } from 'lucide-react';

export function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Menu</h1>
          <p className="mt-2 text-gray-600">Discover authentic Ghanaian cuisine</p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilters(true)}
          className="md:hidden flex items-center justify-center space-x-2 w-full py-2 bg-gray-100 rounded-lg text-gray-700"
        >
          <Filter className="h-4 w-4" />
          <span>Filter Menu</span>
        </button>

        {/* Mobile Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search menu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Filters */}
        <div className="hidden md:flex space-x-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative w-48">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(searchTerm || selectedCategory) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {searchTerm && (
            <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span>Search: {searchTerm}</span>
              <button onClick={() => setSearchTerm('')}>
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {selectedCategory && (
            <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span>Category: {selectedCategory}</span>
              <button onClick={() => setSelectedCategory('')}>
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}