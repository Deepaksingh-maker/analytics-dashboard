// Sample KPI Data
export const kpiData = [
  {
    id: 1,
    title: 'Total Revenue',
    value: 798000,
    change: 12.5,
    trend: 'up',
    prefix: '$',
    icon: 'DollarSign'
  },
  {
    id: 2,
    title: 'Total Orders',
    value: 4214,
    change: 8.3,
    trend: 'up',
    icon: 'ShoppingCart'
  },
  {
    id: 3,
    title: 'Avg Order Value',
    value: 189.35,
    change: 3.9,
    trend: 'up',
    prefix: '$',
    icon: 'TrendingUp'
  },
  {
    id: 4,
    title: 'Customer Retention',
    value: 87.5,
    change: -1.2,
    trend: 'down',
    suffix: '%',
    icon: 'Users'
  }
];

// Revenue Trends Data (Area Chart)
export const revenueTrends = [
  { month: 'Jan', revenue: 45000, profit: 12000 },
  { month: 'Feb', revenue: 52000, profit: 15000 },
  { month: 'Mar', revenue: 48000, profit: 13500 },
  { month: 'Apr', revenue: 61000, profit: 18000 },
  { month: 'May', revenue: 55000, profit: 16500 },
  { month: 'Jun', revenue: 67000, profit: 20000 },
  { month: 'Jul', revenue: 72000, profit: 22000 },
  { month: 'Aug', revenue: 68000, profit: 21000 },
  { month: 'Sep', revenue: 75000, profit: 23500 },
  { month: 'Oct', revenue: 82000, profit: 26000 },
  { month: 'Nov', revenue: 78000, profit: 24500 },
  { month: 'Dec', revenue: 85000, profit: 28000 }
];

// Monthly Orders Data (Bar Chart)
export const monthlyOrders = [
  { month: 'Jul', orders: 340 },
  { month: 'Aug', orders: 380 },
  { month: 'Sep', orders: 420 },
  { month: 'Oct', orders: 395 },
  { month: 'Nov', orders: 445 },
  { month: 'Dec', orders: 460 }
];

// Sales by Category Data (Pie Chart)
export const salesByCategory = [
  { name: 'Electronics', value: 285000, color: '#0ea5e9' },
  { name: 'Clothing', value: 195000, color: '#10b981' },
  { name: 'Home & Garden', value: 142000, color: '#f59e0b' },
  { name: 'Sports', value: 98000, color: '#8b5cf6' },
  { name: 'Books', value: 78000, color: '#ec4899' }
];

// Revenue vs Expenses (Line Chart)
export const revenueVsExpenses = [
  { month: 'Jan', revenue: 45000, expenses: 33000 },
  { month: 'Feb', revenue: 52000, expenses: 37000 },
  { month: 'Mar', revenue: 48000, expenses: 34500 },
  { month: 'Apr', revenue: 61000, expenses: 43000 },
  { month: 'May', revenue: 55000, expenses: 38500 },
  { month: 'Jun', revenue: 67000, expenses: 47000 }
];

// Product Performance Data (Table)
export const productData = [
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    category: 'Electronics',
    sales: 1250,
    revenue: 87500,
    growth: 15.3,
    status: 'trending'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    sales: 980,
    revenue: 68600,
    growth: 12.7,
    status: 'trending'
  },
  {
    id: 3,
    name: 'Premium Cotton T-Shirt',
    category: 'Clothing',
    sales: 2100,
    revenue: 52500,
    growth: 8.2,
    status: 'stable'
  },
  {
    id: 4,
    name: 'Running Shoes Elite',
    category: 'Sports',
    sales: 750,
    revenue: 97500,
    growth: 18.9,
    status: 'trending'
  },
  {
    id: 5,
    name: 'Organic Coffee Beans',
    category: 'Home & Garden',
    sales: 3200,
    revenue: 64000,
    growth: -2.1,
    status: 'declining'
  },
  {
    id: 6,
    name: 'Yoga Mat Premium',
    category: 'Sports',
    sales: 890,
    revenue: 44500,
    growth: 6.5,
    status: 'stable'
  },
  {
    id: 7,
    name: 'LED Desk Lamp',
    category: 'Electronics',
    sales: 1450,
    revenue: 58000,
    growth: 10.1,
    status: 'stable'
  },
  {
    id: 8,
    name: 'Leather Wallet',
    category: 'Clothing',
    sales: 1680,
    revenue: 84000,
    growth: 14.6,
    status: 'trending'
  },
  {
    id: 9,
    name: 'Gardening Tool Set',
    category: 'Home & Garden',
    sales: 620,
    revenue: 37200,
    growth: -4.3,
    status: 'declining'
  },
  {
    id: 10,
    name: 'Cookbook Collection',
    category: 'Books',
    sales: 1920,
    revenue: 57600,
    growth: 5.8,
    status: 'stable'
  }
];

// Customer Segments
export const customerSegments = [
  {
    id: 1,
    segment: 'Enterprise',
    customers: 145,
    revenue: 425000,
    avgOrderValue: 2931,
    retention: 92.5
  },
  {
    id: 2,
    segment: 'Small Business',
    customers: 892,
    revenue: 267000,
    avgOrderValue: 299,
    retention: 85.3
  },
  {
    id: 3,
    segment: 'Individual',
    customers: 3177,
    revenue: 106000,
    avgOrderValue: 33,
    retention: 78.9
  }
  
];
