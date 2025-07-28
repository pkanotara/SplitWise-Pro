/**
 * Constants for the Bill Splitter Application
 */

// Application Information
export const APP_INFO = {
  name: 'SplitWise Pro',
  version: '1.0.0',
  description: 'Smart bill splitting made easy'
};

// Default Categories with Icons and Colors
export const DEFAULT_CATEGORIES = [
  { 
    id: 'food', 
    name: 'Food & Dining', 
    color: '#ef4444',
    description: 'Restaurants, takeouts, groceries',
    usage: 0
  },
  { 
    id: 'transport', 
    name: 'Transportation', 
    color: '#3b82f6',
    description: 'Uber, taxi, fuel, parking',
    usage: 0
  },
  { 
    id: 'entertainment', 
    name: 'Entertainment', 
    color: '#8b5cf6',
    description: 'Movies, games, concerts',
    usage: 0
  },
  { 
    id: 'shopping', 
    name: 'Shopping', 
    color: '#ec4899',
    description: 'Clothes, electronics, gifts',
    usage: 0
  },
  { 
    id: 'bills', 
    name: 'Bills & Utilities', 
    color: '#f59e0b',
    description: 'Electricity, water, internet',
    usage: 0
  },
  { 
    id: 'health', 
    name: 'Healthcare', 
    color: '#10b981',
    description: 'Doctor visits, medicines',
    usage: 0
  },
  { 
    id: 'travel', 
    name: 'Travel & Tourism', 
    color: '#06b6d4',
    description: 'Hotels, flights, activities',
    usage: 0
  },
  { 
    id: 'general', 
    name: 'General', 
    color: '#6b7280',
    description: 'Miscellaneous expenses',
    usage: 0
  }
];

// Payment Methods (Indian Context)
export const PAYMENT_METHODS = [
  {
    id: 'upi',
    name: 'UPI',
    color: '#ff6b35',
    description: 'Unified Payments Interface'
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    color: '#5f259f',
    description: 'PhonePe Digital Payments'
  },
  {
    id: 'paytm',
    name: 'PayTM',
    color: '#002970',
    description: 'PayTM Wallet & UPI'
  },
  {
    id: 'gpay',
    name: 'Google Pay',
    color: '#4285f4',
    description: 'Google Pay UPI'
  },
  {
    id: 'cash',
    name: 'Cash',
    color: '#059669',
    description: 'Physical cash payment'
  },
  {
    id: 'card',
    name: 'Card',
    color: '#dc2626',
    description: 'Debit/Credit card'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    color: '#7c3aed',
    description: 'Direct bank transfer'
  }
];

// Split Types
export const SPLIT_TYPES = [
  {
    id: 'equal',
    name: 'Equal Split',
    description: 'Split equally among all participants',
    icon: 'equal'
  },
  {
    id: 'percentage',
    name: 'Percentage Split',
    description: 'Split based on custom percentages',
    icon: 'percentage'
  },
  {
    id: 'exact',
    name: 'Exact Amount',
    description: 'Specify exact amount for each person',
    icon: 'exact'
  },
  {
    id: 'shares',
    name: 'Share Based',
    description: 'Split based on number of shares',
    icon: 'shares'
  }
];

// Currency Configuration
export const CURRENCY = {
  symbol: '₹',
  code: 'INR',
  name: 'Indian Rupee',
  decimals: 2,
  format: (amount) => `₹${parseFloat(amount).toFixed(2)}`
};

// Date Formats
export const DATE_FORMATS = {
  display: 'DD/MM/YYYY',
  input: 'YYYY-MM-DD',
  api: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  storage: 'YYYY-MM-DD'
};

// Validation Rules
export const VALIDATION_RULES = {
  person: {
    name: {
      minLength: 2,
      maxLength: 50,
      required: true,
      pattern: /^[a-zA-Z\s]+$/
    },
    email: {
      required: false,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
      required: false,
      pattern: /^[\+]?[1-9][\d]{0,15}$/,
      minLength: 10,
      maxLength: 15
    }
  },
  bill: {
    description: {
      minLength: 3,
      maxLength: 100,
      required: true
    },
    amount: {
      min: 0.01,
      max: 1000000,
      required: true,
      decimals: 2
    },
    splitAmong: {
      minParticipants: 1,
      maxParticipants: 50
    }
  }
};

// Storage Keys
export const STORAGE_KEYS = {
  people: 'splitwise_people',
  bills: 'splitwise_bills',
  settings: 'splitwise_settings',
  theme: 'splitwise_theme',
  language: 'splitwise_language',
  draft: 'splitwise_draft'
};

// Theme Configuration
export const THEMES = {
  light: {
    name: 'Light',
    id: 'light',
    primary: '#10b981',
    background: '#ffffff',
    text: '#111827'
  },
  dark: {
    name: 'Dark',
    id: 'dark',
    primary: '#34d399',
    background: '#1f2937',
    text: '#f9fafb'
  }
};

// Language Configuration
export const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    rtl: false
  },
  {
    code: 'hi',
    name: 'हिंदी',
    flag: '🇮🇳',
    rtl: false
  }
];

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  validation: 'Please check the entered information.',
  duplicate: 'This item already exists.',
  notFound: 'Item not found.',
  unauthorized: 'You are not authorized to perform this action.',
  generic: 'Something went wrong. Please try again.',
  settlement: 'Cannot perform settlement with pending balances.',
  calculation: 'Error in calculation. Please verify amounts.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  personAdded: 'Person added successfully!',
  billAdded: 'Bill added successfully!',
  dataExported: 'Data exported successfully!',
  dataCleared: 'All data cleared successfully!',
  settlementCompleted: 'Settlement completed!',
  paymentInitiated: 'Payment initiated successfully!'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Export Formats
export const EXPORT_FORMATS = [
  {
    id: 'json',
    name: 'JSON',
    extension: '.json',
    mimeType: 'application/json'
  },
  {
    id: 'csv',
    name: 'CSV',
    extension: '.csv',
    mimeType: 'text/csv'
  },
  {
    id: 'summary',
    name: 'Summary',
    extension: '.json',
    mimeType: 'application/json'
  }
];

// Analytics Time Periods
export const TIME_PERIODS = [
  { id: 'week', name: 'This Week', days: 7 },
  { id: 'month', name: 'This Month', days: 30 },
  { id: 'quarter', name: 'This Quarter', days: 90 },
  { id: 'year', name: 'This Year', days: 365 },
  { id: 'all', name: 'All Time', days: null }
];

// Quick Amount Suggestions (Indian Context)
export const QUICK_AMOUNTS = [
  50, 100, 200, 500, 1000, 2000, 5000
];

// Common Indian Food Items for Auto-suggestions
export const COMMON_EXPENSE_DESCRIPTIONS = {
  food: [
    'Restaurant dinner',
    'Lunch at cafe',
    'Street food',
    'Grocery shopping',
    'Breakfast',
    'Tea/Coffee',
    'Sweets',
    'Fast food'
  ],
  transport: [
    'Uber ride',
    'Auto rickshaw',
    'Bus fare',
    'Train ticket',
    'Taxi',
    'Petrol',
    'Parking fee',
    'Metro card'
  ],
  entertainment: [
    'Movie tickets',
    'Concert',
    'Party',
    'Games',
    'Streaming subscription',
    'Books',
    'Museum visit',
    'Amusement park'
  ],
  shopping: [
    'Clothes shopping',
    'Electronics',
    'Gifts',
    'Household items',
    'Online shopping',
    'Accessories',
    'Shoes',
    'Beauty products'
  ]
};

// App Configuration
export const APP_CONFIG = {
  maxPeople: 50,
  maxBillAmount: 1000000,
  autoSaveInterval: 3000, // 3 seconds
  notificationDuration: 5000, // 5 seconds
  debounceDelay: 300, // 300ms
  animationDuration: 300, // 300ms
  maxFileSize: 5 * 1024 * 1024, // 5MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxImageDimensions: { width: 1920, height: 1080 }
};

// UPI Configuration (Indian Context)
export const UPI_CONFIG = {
  urlScheme: 'upi://pay',
  parameters: {
    pa: 'payee address', // UPI ID
    pn: 'payee name',
    am: 'amount',
    cu: 'INR',
    tn: 'transaction note'
  },
  fallbackDelay: 3000, // 3 seconds
  maxAmount: 100000 // ₹1 Lakh UPI limit
};

// Default Settings
export const DEFAULT_SETTINGS = {
  theme: 'light',
  language: 'en',
  currency: 'INR',
  notifications: true,
  autoSave: true,
  darkMode: false,
  soundEffects: false,
  emailNotifications: false,
  pushNotifications: true,
  dataBackup: true
};

// API Endpoints (if you plan to add backend later)
export const API_ENDPOINTS = {
  base: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  people: '/api/people',
  bills: '/api/bills',
  analytics: '/api/analytics',
  settlements: '/api/settlements',
  export: '/api/export',
  sync: '/api/sync'
};

// Feature Flags (for gradual feature rollout)
export const FEATURE_FLAGS = {
  darkMode: true,
  analytics: true,
  export: true,
  multiCurrency: false,
  cloudSync: false,
  notifications: true,
  receipts: false,
  groups: false,
  advancedSplit: true
};

// Breakpoints for Responsive Design
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Z-Index Scale
export const Z_INDEX = {
  dropdown: 100,
  modal: 1000,
  notification: 1001,
  tooltip: 1002,
  overlay: 9999
};
