import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

/**
 * Enhanced Chart Component
 * Supports multiple chart types with improved styling and responsive design
 */
const Chart = ({ type, data, title, dataKeys = [], colors = [], height = 300 }) => {
  // Default colors with gradient-friendly palette
  const defaultColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  const chartColors = colors.length > 0 ? colors : defaultColors;

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-700 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="font-medium">{entry.name}:</span>
              <span className="font-bold">{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get appropriate icon for chart type
  const getChartIcon = () => {
    switch (type) {
      case 'bar': return BarChart3;
      case 'pie': return PieChartIcon;
      case 'area': return TrendingUp;
      case 'line': return Activity;
      default: return BarChart3;
    }
  };

  const ChartIcon = getChartIcon();

  // Render different chart types
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {dataKeys.slice(1).map((key, index) => (
                  <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors[index]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartColors[index]} stopOpacity={0.1}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey={dataKeys[0]} 
                stroke="#6b7280" 
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#6b7280" 
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 500 }}
              />
              {dataKeys.slice(1).map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={chartColors[index]}
                  strokeWidth={3}
                  fill={`url(#gradient-${key})`}
                  animationDuration={1500}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey={dataKeys[0]} 
                stroke="#6b7280" 
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#6b7280" 
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 500 }}
              />
              {dataKeys.slice(1).map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={chartColors[index]}
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey={dataKeys[0]} 
                stroke="#6b7280" 
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#6b7280" 
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '14px', fontWeight: 500 }}
              />
              {dataKeys.slice(1).map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={chartColors[index]}
                  strokeWidth={3}
                  dot={{ fill: chartColors[index], r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div className="text-gray-500 text-center py-8">Unsupported chart type</div>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <ChartIcon className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Chart Content */}
      <div className="w-full">
        {renderChart()}
      </div>
    </div>
  );
};

export default Chart;
