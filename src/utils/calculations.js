/**
 * Utility functions for bill splitting calculations
 */

/**
 * Calculate individual balances for all people
 * @param {Array} people - Array of person objects
 * @param {Array} bills - Array of bill objects
 * @returns {Object} - Object with person names as keys and balance amounts as values
 */
export const calculateBalances = (people, bills) => {
  const balances = {};
  
  // Initialize balances for all people
  people.forEach(person => {
    balances[person.name] = 0;
  });

  // Calculate balances from all bills
  bills.forEach(bill => {
    const sharePerPerson = bill.amount / bill.splitAmong.length;
    
    // Subtract share from each person who should pay
    bill.splitAmong.forEach(personName => {
      if (balances.hasOwnProperty(personName)) {
        balances[personName] -= sharePerPerson;
      }
    });
    
    // Add full amount to person who paid
    if (balances.hasOwnProperty(bill.paidBy)) {
      balances[bill.paidBy] += bill.amount;
    }
  });

  return balances;
};

/**
 * Calculate optimal settlements to minimize transactions
 * @param {Object} balances - Object with person names as keys and balance amounts as values
 * @returns {Array} - Array of settlement objects {from, to, amount}
 */
export const calculateSettlements = (balances) => {
  const settlements = [];
  
  // Create arrays of debtors and creditors
  const debtors = [];
  const creditors = [];
  
  Object.entries(balances).forEach(([person, balance]) => {
    if (balance < -0.01) {
      debtors.push({ person, amount: Math.abs(balance) });
    } else if (balance > 0.01) {
      creditors.push({ person, amount: balance });
    }
  });
  
  // Sort by amount (largest first) for optimal settlement
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);
  
  // Calculate optimal settlements using greedy algorithm
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    
    const settlementAmount = Math.min(debtor.amount, creditor.amount);
    
    if (settlementAmount > 0.01) {
      settlements.push({
        from: debtor.person,
        to: creditor.person,
        amount: parseFloat(settlementAmount.toFixed(2))
      });
    }
    
    debtor.amount -= settlementAmount;
    creditor.amount -= settlementAmount;
    
    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }
  
  return settlements;
};

/**
 * Calculate per person amount for a specific bill
 * @param {Object} bill - Bill object
 * @param {string} personName - Name of the person
 * @returns {number} - Amount this person owes for this bill
 */
export const calculatePersonShare = (bill, personName) => {
  if (!bill.splitAmong.includes(personName)) {
    return 0;
  }
  
  return bill.amount / bill.splitAmong.length;
};

/**
 * Calculate total expenses for a specific category
 * @param {Array} bills - Array of bill objects
 * @param {string} category - Category to filter by
 * @returns {number} - Total amount for the category
 */
export const calculateCategoryTotal = (bills, category) => {
  return bills
    .filter(bill => bill.category === category)
    .reduce((total, bill) => total + bill.amount, 0);
};

/**
 * Calculate total expenses for a specific person
 * @param {Array} bills - Array of bill objects
 * @param {string} personName - Name of the person
 * @returns {number} - Total amount the person has paid
 */
export const calculatePersonTotal = (bills, personName) => {
  return bills
    .filter(bill => bill.paidBy === personName)
    .reduce((total, bill) => total + bill.amount, 0);
};

/**
 * Calculate total expenses for a date range
 * @param {Array} bills - Array of bill objects
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {number} - Total amount for the date range
 */
export const calculateDateRangeTotal = (bills, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return bills
    .filter(bill => {
      const billDate = new Date(bill.date);
      return billDate >= start && billDate <= end;
    })
    .reduce((total, bill) => total + bill.amount, 0);
};

/**
 * Calculate analytics data for dashboard
 * @param {Array} people - Array of person objects
 * @param {Array} bills - Array of bill objects
 * @returns {Object} - Analytics object with various statistics
 */
export const calculateAnalytics = (people, bills) => {
  const balances = calculateBalances(people, bills);
  const settlements = calculateSettlements(balances);
  
  // Category breakdown
  const categoryTotals = {};
  bills.forEach(bill => {
    categoryTotals[bill.category] = (categoryTotals[bill.category] || 0) + bill.amount;
  });
  
  // Monthly breakdown
  const monthlyTotals = {};
  bills.forEach(bill => {
    const month = bill.date.substring(0, 7); // YYYY-MM
    monthlyTotals[month] = (monthlyTotals[month] || 0) + bill.amount;
  });
  
  // Person spending breakdown
  const personSpending = {};
  people.forEach(person => {
    personSpending[person.name] = {
      paid: calculatePersonTotal(bills, person.name),
      owes: Math.max(0, -balances[person.name]),
      balance: balances[person.name]
    };
  });
  
  return {
    totalExpenses: bills.reduce((sum, bill) => sum + bill.amount, 0),
    totalBills: bills.length,
    totalPeople: people.length,
    settlementsNeeded: settlements.length,
    categoryBreakdown: categoryTotals,
    monthlyBreakdown: monthlyTotals,
    personBreakdown: personSpending,
    balances,
    settlements
  };
};

/**
 * Validate if split amounts equal total bill amount
 * @param {number} totalAmount - Total bill amount
 * @param {Array} splitAmounts - Array of individual split amounts
 * @returns {boolean} - True if split is valid
 */
export const validateSplit = (totalAmount, splitAmounts) => {
  const splitTotal = splitAmounts.reduce((sum, amount) => sum + amount, 0);
  return Math.abs(splitTotal - totalAmount) < 0.01;
};

/**
 * Round currency amounts to 2 decimal places
 * @param {number} amount - Amount to round
 * @returns {number} - Rounded amount
 */
export const roundCurrency = (amount) => {
  return Math.round(amount * 100) / 100;
};

/**
 * Calculate split efficiency (how many transactions saved)
 * @param {number} peopleCount - Number of people
 * @param {number} settlementsCount - Number of settlements needed
 * @returns {number} - Efficiency percentage
 */
export const calculateSplitEfficiency = (peopleCount, settlementsCount) => {
  if (peopleCount <= 1) return 100;
  
  const maxPossibleTransactions = peopleCount * (peopleCount - 1) / 2;
  const efficiency = ((maxPossibleTransactions - settlementsCount) / maxPossibleTransactions) * 100;
  
  return Math.max(0, Math.min(100, efficiency));
};

/**
 * Get debt chain to understand payment flow
 * @param {Object} balances - Balance object
 * @returns {Array} - Array of debt relationships
 */
export const getDebtChain = (balances) => {
  const debtRelations = [];
  
  Object.entries(balances).forEach(([person, balance]) => {
    if (balance !== 0) {
      debtRelations.push({
        person,
        amount: Math.abs(balance),
        type: balance > 0 ? 'creditor' : 'debtor',
        percentage: 0 // Will be calculated based on total debt
      });
    }
  });
  
  const totalDebt = debtRelations
    .filter(rel => rel.type === 'debtor')
    .reduce((sum, rel) => sum + rel.amount, 0);
  
  // Calculate percentages
  debtRelations.forEach(relation => {
    relation.percentage = totalDebt > 0 ? (relation.amount / totalDebt) * 100 : 0;
  });
  
  return debtRelations;
};

/**
 * Export data in different formats
 * @param {Array} people - Array of person objects
 * @param {Array} bills - Array of bill objects
 * @param {string} format - Export format ('json', 'csv', 'summary')
 * @returns {string|Object} - Formatted data
 */
export const exportData = (people, bills, format = 'json') => {
  const analytics = calculateAnalytics(people, bills);
  
  switch (format) {
    case 'csv':
      let csv = 'Date,Description,Amount,Category,Paid By,Split Among\n';
      bills.forEach(bill => {
        csv += `${bill.date},"${bill.description}",${bill.amount},${bill.category},"${bill.paidBy}","${bill.splitAmong.join('; ')}"\n`;
      });
      return csv;
      
    case 'summary':
      return {
        exportDate: new Date().toISOString(),
        summary: {
          totalExpenses: analytics.totalExpenses,
          totalBills: analytics.totalBills,
          totalPeople: analytics.totalPeople,
          settlementsNeeded: analytics.settlementsNeeded
        },
        balances: analytics.balances,
        settlements: analytics.settlements,
        categoryBreakdown: analytics.categoryBreakdown
      };
      
    case 'json':
    default:
      return {
        exportDate: new Date().toISOString(),
        people,
        bills,
        analytics
      };
  }
};
