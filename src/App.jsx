import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Package, 
  Users, 
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

// Import components
import KPICard from './components/KPICard';
import Chart from './components/Chart';
import DataTable from './components/DataTable';
import FilterPanel from './components/FilterPanel';

// Import data
import {
  kpiData,
  revenueTrends,
  monthlyOrders,
  salesByCategory,
  revenueVsExpenses,
  productData,
  customerSegments
} from './data/sampleData';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter configuration
  const filterConfig = [
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Clothing', label: 'Clothing' },
        { value: 'Home & Garden', label: 'Home & Garden' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Books', label: 'Books' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'checkbox',
      options: [
        { value: 'trending', label: 'Trending' },
        { value: 'stable', label: 'Stable' },
        { value: 'declining', label: 'Declining' }
      ]
    }
  ];

  // Table columns configuration
  const productColumns = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'sales', label: 'Sales', sortable: true, format: (val) => val.toLocaleString() },
    { key: 'revenue', label: 'Revenue', sortable: true, format: (val) => `$${val.toLocaleString()}` },
    { key: 'growth', label: 'Growth', sortable: true, format: (val) => `${val > 0 ? '+' : ''}${val}%` },
    { key: 'status', label: 'Status', sortable: true }
  ];

  const customerColumns = [
    { key: 'segment', label: 'Segment', sortable: true },
    { key: 'customers', label: 'Customers', sortable: true, format: (val) => val.toLocaleString() },
    { key: 'revenue', label: 'Revenue', sortable: true, format: (val) => `$${val.toLocaleString()}` },
    { key: 'avgOrderValue', label: 'Avg Order Value', sortable: true, format: (val) => `$${val.toLocaleString()}` },
    { key: 'retention', label: 'Retention', sortable: true, format: (val) => `${val}%` }
  ];

  // Apply filters to product data
  const filteredProducts = useMemo(() => {
    return productData.filter(product => {
      // Category filter
      if (activeFilters.category && product.category !== activeFilters.category) {
        return false;
      }
      
      // Status filter (checkbox - array)
      if (activeFilters.status && activeFilters.status.length > 0) {
        if (!activeFilters.status.includes(product.status)) {
          return false;
        }
      }
      
      return true;
    });
  }, [activeFilters]);

  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Dashboard', active: true },
    { id: 'products', icon: Package, label: 'Products', active: false },
    { id: 'customers', icon: Users, label: 'Customers', active: false },
    { id: 'settings', icon: Settings, label: 'Settings', active: false }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:translate-x-0 lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-indigo-600 to-purple-700 shadow-2xl transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Analytics Pro</h1>
              <p className="text-xs text-indigo-200">Business Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-indigo-700 shadow-lg transform scale-105' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-indigo-200">Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-white/60" />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Enhanced Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard Overview
                </h2>
                <p className="text-sm text-gray-600 mt-1">Monitor your business performance in real-time</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="px-4 sm:px-6 pb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="flex items-center gap-1 text-gray-600">
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                Last updated: <span className="font-medium text-gray-900">Just now</span>
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-green-600 font-medium">All systems operational</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* KPI Cards with Animation */}
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Key Performance Indicators</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                View Details
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {kpiData.map((kpi, index) => (
                <div 
                  key={kpi.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <KPICard {...kpi} />
                </div>
              ))}
            </div>
          </section>

          {/* Charts Section with Enhanced Cards */}
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Analytics Overview</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Last 7 days
                </button>
                <button className="px-3 py-1.5 text-xs sm:text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Last 30 days
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Chart
                type="area"
                data={revenueTrends}
                title="Revenue & Profit Trends"
                dataKeys={['month', 'revenue', 'profit']}
                colors={['#6366f1', '#10b981']}
                height={300}
              />
              <Chart
                type="bar"
                data={monthlyOrders}
                title="Monthly Orders"
                dataKeys={['month', 'orders']}
                colors={['#8b5cf6']}
                height={300}
              />
              <Chart
                type="pie"
                data={salesByCategory}
                title="Sales by Category"
                height={300}
              />
              <Chart
                type="line"
                data={revenueVsExpenses}
                title="Revenue vs Expenses"
                dataKeys={['month', 'revenue', 'expenses']}
                colors={['#10b981', '#ef4444']}
                height={300}
              />
            </div>
          </section>

          {/* Products Section with Enhanced Filters */}
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Product Performance</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="lg:col-span-1">
                <FilterPanel
                  filters={filterConfig}
                  onFilterChange={setActiveFilters}
                />
              </div>
              <div className="lg:col-span-3">
                <DataTable
                  data={filteredProducts}
                  columns={productColumns}
                  searchable={true}
                  itemsPerPage={5}
                />
              </div>
            </div>
          </section>

          {/* Customer Segments */}
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Customer Segments</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All Customers →
              </button>
            </div>
            <DataTable
              data={customerSegments}
              columns={customerColumns}
              searchable={false}
              itemsPerPage={10}
            />
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-8 py-6 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2026 Analytics Pro. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
