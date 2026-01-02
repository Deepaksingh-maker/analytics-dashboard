import React, { useState } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';

/**
 * Enhanced FilterPanel Component
 * Provides dynamic filtering with multiple filter types
 */
const FilterPanel = ({ filters, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);

  // Handle select filter change
  const handleSelectChange = (key, value) => {
    const newFilters = { ...activeFilters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Handle checkbox filter change
  const handleCheckboxChange = (key, value, checked) => {
    const newFilters = { ...activeFilters };
    const currentValues = newFilters[key] || [];

    if (checked) {
      newFilters[key] = [...currentValues, value];
    } else {
      newFilters[key] = currentValues.filter(v => v !== value);
      if (newFilters[key].length === 0) {
        delete newFilters[key];
      }
    }

    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  // Count active filters
  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Filter Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Filter className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              {activeFilterCount > 0 && (
                <p className="text-xs text-gray-600 mt-0.5">
                  {activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'}
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors lg:hidden"
          >
            <X className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-0' : 'rotate-45'}`} />
          </button>
        </div>

        {/* Clear All Button */}
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium w-full justify-center shadow-sm border border-gray-200"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All Filters
          </button>
        )}
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden lg:block'} p-4 sm:p-6 space-y-6`}>
        {filters.map((filter) => (
          <div key={filter.key} className="space-y-3">
            {/* Filter Label */}
            <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
              {filter.label}
            </label>

            {/* Select Filter */}
            {filter.type === 'select' && (
              <div className="relative">
                <select
                  value={activeFilters[filter.key] || ''}
                  onChange={(e) => handleSelectChange(filter.key, e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium text-gray-900 appearance-none cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <option value="">All {filter.label}</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Checkbox Filter */}
            {filter.type === 'checkbox' && (
              <div className="space-y-3">
                {filter.options.map((option) => {
                  const isChecked = (activeFilters[filter.key] || []).includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-indigo-50 border-indigo-300 shadow-sm'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleCheckboxChange(filter.key, option.value, e.target.checked)}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                      />
                      <span className={`text-sm font-medium ${isChecked ? 'text-indigo-900' : 'text-gray-700'}`}>
                        {option.label}
                      </span>
                      {/* Visual indicator for status */}
                      {filter.key === 'status' && (
                        <span className={`ml-auto w-2 h-2 rounded-full ${
                          option.value === 'trending' ? 'bg-green-500' :
                          option.value === 'stable' ? 'bg-blue-500' :
                          'bg-red-500'
                        }`}></span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}

            {/* Active Filter Indicator */}
            {activeFilters[filter.key] && (
              <div className="flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Filter active</span>
              </div>
            )}
          </div>
        ))}

        {/* No Filters Message */}
        {filters.length === 0 && (
          <div className="text-center py-8">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No filters available</p>
          </div>
        )}
      </div>

      {/* Filter Summary Footer */}
      {activeFilterCount > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="font-medium">Active Filters:</span>
            <span className="font-bold text-indigo-600">{activeFilterCount}</span>
          </div>
          
          {/* Active Filter Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              const filter = filters.find(f => f.key === key);
              if (!filter) return null;

              const displayValue = Array.isArray(value) 
                ? `${value.length} selected`
                : filter.options.find(o => o.value === value)?.label || value;

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-lg text-xs font-semibold"
                >
                  <span className="text-indigo-600">{filter.label}:</span>
                  {displayValue}
                  <button
                    onClick={() => {
                      const newFilters = { ...activeFilters };
                      delete newFilters[key];
                      setActiveFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="ml-1 hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
