# SplitWise Pro - Smart Bill Splitting Made Easy

[![React](https://img.shields.io/badge/React-18.x://.s://img.shields.io/badge/License-MIT-greenimg.shields.io/badge/PRs-welcome-brightgreen intuitive bill splitting application built with React that makes splitting expenses with friends, family, or colleagues effortless. Perfect for group trips, shared meals, roommate expenses, and any situation where you need to track and settle shared costs.

## 🌟 Features

### ✨ **Core Functionality**
- **Smart People Management** - Add friends with contact details and avatars
- **Flexible Bill Creation** - Multiple categories with Indian payment context
- **Intelligent Settlement Calculation** - Minimal transactions algorithm
- **Real-time Balance Tracking** - Live updates of who owes what
- **Dark/Light Mode** - Seamless theme switching
- **Responsive Design** - Works perfectly on mobile and desktop

### 🧮 **Advanced Calculations**
- **Optimal Settlement Algorithm** - Minimizes the number of transactions needed
- **Multiple Split Types** - Equal, percentage, exact amounts, and share-based
- **Balance Analytics** - Comprehensive financial insights
- **Debt Chain Analysis** - Visual representation of payment flows
- **Settlement Efficiency Metrics** - Track optimization percentage

### 📱 **User Experience**
- **Minimal Design** - Clean, distraction-free interface
- **Quick Actions** - One-click operations for common tasks
- **Smart Notifications** - Success, error, and info messages
- **Auto-suggestions** - Common expense descriptions and quick amounts
- **Keyboard Accessible** - Full keyboard navigation support

### 🇮🇳 **Indian Context**
- **INR Currency** - Rupee symbol and Indian number formatting
- **UPI Integration** - Ready for Indian payment apps (PhonePe, GPay, PayTM)
- **Local Categories** - Food, transport, entertainment suited for Indian users
- **Quick Amount Buttons** - Common Indian denominations (₹50, ₹100, ₹500, etc.)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/splitwise-pro.git
   cd splitwise-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install React Icons**
   ```bash
   npm install react-icons
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🎯 Usage Guide

### Adding People
1. Click the **"+"** button in the People section
2. Enter name (required), email, and phone (optional)
3. Click **"Add Person"** to save

### Creating Bills
1. Navigate to the **Bills** tab
2. Fill in bill details:
   - Description (e.g., "Dinner at restaurant")
   - Amount in ₹
   - Category (Food, Transport, etc.)
   - Date
   - Who paid
   - Who to split among
3. Use **Quick Amount** buttons for common denominations
4. Click **"Add Bill"** to save

### Viewing Settlements
1. Go to the **Settlements** tab
2. See optimized payment suggestions
3. Use **Advanced View** for complex scenarios
4. Follow the minimal transaction plan

### Dashboard Analytics
- View total expenses and statistics
- See current balances for all members
- Monitor settlement efficiency
- Track category-wise spending


### Customization
Modify `src/utils/constants.js` to customize:
- Categories and their colors
- Quick amount suggestions
- Currency settings
- Validation rules
- App configuration

## 🎨 Theming

The app supports both light and dark themes with CSS custom properties:

```css
:root {
  --primary: #10b981;
  --text-primary: #111827;
  --bg-primary: #ffffff;
  /* ... more variables */
}

.dark-mode {
  --text-primary: #f9fafb;
  --bg-primary: #1f2937;
  /* ... dark theme overrides */
}
```

## 📊 Algorithms

### Settlement Optimization
The app uses a **greedy algorithm** to minimize transactions:

1. Calculate net balance for each person
2. Separate into debtors and creditors
3. Sort by amount (largest first)
4. Match debtors to creditors optimally
5. Generate minimal transaction list

**Example:**
- Before: 6 possible transactions between 4 people
- After: 2-3 optimized transactions
- Efficiency: 50-67% reduction in payments

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Style
- **ES6+** JavaScript features
- **Functional components** with hooks
- **CSS custom properties** for theming
- **Mobile-first** responsive design
- **Accessibility** focus throughout

### Adding New Features
1. Create components in `src/components/`
2. Add utility functions to `src/utils/`
3. Update constants in `src/utils/constants.js`
4. Add styles to appropriate CSS files
5. Update this README


## 🧪 Testing Scenarios

### Edge Cases Covered
- ✅ Empty states (no people, no bills)
- ✅ Single person scenarios
- ✅ Complex multi-person settlements
- ✅ Adding new members after bills
- ✅ Circular payment detection
- ✅ Large amount validations

## 🙏 Acknowledgments

- **React Icons** - Beautiful icon library
- **Vite** - Lightning-fast build tool
- **UI Avatars** - Dynamic avatar generation
- **CSS Grid & Flexbox** - Modern layout techniques

## 🔮 Future Enhancements

- [ ] **Cloud Sync** - Backup data to cloud storage
- [ ] **Receipt Upload** - Photo-based bill creation
- [ ] **Group Management** - Multiple groups support
- [ ] **Export Options** - PDF receipts and statements
- [ ] **Payment Integration** - Direct UPI payments
- [ ] **Multi-language** - Hindi and regional language support
- [ ] **Offline Mode** - Progressive Web App features
- [ ] **Analytics Dashboard** - Spending insights and trends

## 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ **Starring** this repository
- 🍽️ **Using it** for your next group dinner
- 🐛 **Reporting bugs** you encounter
- 💡 **Suggesting features** you'd like to see
- 🤝 **Contributing** to make it better

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/.shields.io/github/issues/you](https://img.shields.io/github Links

**Made with ❤️ for the community**

**Happy Bill Splitting! 🎉**
