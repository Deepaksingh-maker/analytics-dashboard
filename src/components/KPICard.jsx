import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';

/**
 * Enhanced KPICard Component
 * Displays a Key Performance Indicator with enhanced visuals, animations, and responsive design
 */
const KPICard = ({ title, value, change, trend, prefix = '', suffix = '', icon }) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString('en-US', { 
        minimumFractionDigits: suffix === '%' ? 1 : 0,
        maximumFractionDigits: 2 
      });
    }
    return val;
  };

  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isPositive ? 'border-green-200' : 'border-red-200';
  
  // Icon selection based on title or icon prop
  const getIcon = () => {
    if (title.toLowerCase().includes('revenue')) return DollarSign;
    if (title.toLowerCase().includes('order')) return ShoppingCart;
    if (title.toLowerCase().includes('customer') || title.toLowerCase().includes('retention')) return Users;
    return Activity;
  };

  const IconComponent = getIcon();

  return (
    <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Header with Icon */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-center gap-2 mt-3">
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 transition-all duration-300 group-hover:text-indigo-600">
              {prefix}{formatValue(value)}{suffix}
            </p>
          </div>
        </div>
        
        {/* Icon Badge */}
        <div className={`p-3 rounded-xl ${isPositive ? 'bg-green-100' : 'bg-red-100'} group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`w-6 h-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
        </div>
      </div>
      
      {/* Trend Indicator */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 relative z-10">
        <div className={`flex items-center gap-1.5 ${bgColor} ${borderColor} border px-3 py-1.5 rounded-full transition-all duration-300`}>
          {trend === 'up' ? (
            <TrendingUp className={`w-4 h-4 ${changeColor}`} />
          ) : (
            <TrendingDown className={`w-4 h-4 ${changeColor}`} />
          )}
          <span className={`text-sm font-bold ${changeColor}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>
        
        <p className="text-xs text-gray-500 font-medium">vs last period</p>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 relative z-10">
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              isPositive ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
            }`}
            style={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
