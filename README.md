# SplitWise Pro - Smart Bill Splitting Made Easy

![SplitWise Pro](https://imgs.ioio/badge/vite-%23646CFF.svg?style=, intuitive bill splitting application built with React that makes splitting expenses with friends, family, or colleagues effortless. Perfect for group trips, shared meals, roommate expenses, and any situation where you need to track and settle shared costs.

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

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Reusable UI components
│   │   ├── Button.jsx   # Button component
│   │   ├── Input.jsx    # Input component
│   │   ├── Modal.jsx    # Modal component
│   │   └── Notification.jsx # Notification system
│   ├── AddPerson.jsx    # Add person form
│   ├── PeopleList.jsx   # People management
│   ├── AddBill.jsx      # Bill creation form
│   ├── BillsList.jsx    # Bills history
│   ├── BalancesView.jsx # Balance display
│   └── SettlementSuggestions.jsx # Settlement calculations
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.js    # Local storage hook
│   ├── useNotification.js    # Notification hook
│   └── useBillCalculations.js # Calculation hook
├── utils/               # Utility functions
│   ├── calculations.js  # Math and algorithm functions
│   └── constants.js     # App constants and configuration
├── styles/              # CSS files
│   ├── globals.css      # Global styles and variables
│   ├── App.css         # App-level styles
│   └── components.css   # Component-specific styles
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
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

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001  # Optional: For future API integration
```

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

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## 🧪 Testing Scenarios

### Edge Cases Covered
- ✅ Empty states (no people, no bills)
- ✅ Single person scenarios
- ✅ Complex multi-person settlements
- ✅ Adding new members after bills
- ✅ Circular payment detection
- ✅ Large amount validations
- ✅ Data persistence and recovery

### Test Cases
1. **Basic Split**: 3 friends, equal split
2. **Unequal Participation**: Some members in fewer bills
3. **New Member Addition**: Add 4th friend after existing settlements
4. **Complex Scenario**: 5+ people with multiple overlapping bills
5. **Edge Amounts**: Very small (₹1) and large (₹50,000) bills

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Update README for new features
- Test on both light and dark themes
- Ensure mobile responsiveness

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Icons** - Beautiful icon library
- **Vite** - Lightning-fast build tool
- **UI Avatars** - Dynamic avatar generation
- **CSS Grid & Flexbox** - Modern layout techniques
- **Indian UPI System** - Payment integration inspiration

## 📞 Support

If you encounter any issues or have questions:

1. **Check existing issues** on GitHub
2. **Create a new issue** with detailed description
3. **Include screenshots** for UI-related problems
4. **Mention your browser and OS** for compatibility issues

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

**Made with ❤️ for the community**

### 📈 Stats

![GitHub stars](https://img.shieldss.](https://img.shields.io/github/issues/yourusername 🎉**
