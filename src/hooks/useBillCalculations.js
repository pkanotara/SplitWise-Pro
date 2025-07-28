import { useMemo } from 'react';

export const useBillCalculations = (people, bills) => {
  const calculateBalances = useMemo(() => {
    return () => {
      const balances = {};
      
      // Initialize balances
      people.forEach(person => {
        balances[person.name] = 0;
      });

      // Calculate balances from bills
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
  }, [people, bills]);

  const calculateSettlements = useMemo(() => {
    return () => {
      const balances = calculateBalances();
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
      
      // Sort by amount (largest first)
      debtors.sort((a, b) => b.amount - a.amount);
      creditors.sort((a, b) => b.amount - a.amount);
      
      // Calculate optimal settlements
      let i = 0, j = 0;
      while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        
        const settlementAmount = Math.min(debtor.amount, creditor.amount);
        
        if (settlementAmount > 0.01) {
          settlements.push({
            from: debtor.person,
            to: creditor.person,
            amount: settlementAmount
          });
        }
        
        debtor.amount -= settlementAmount;
        creditor.amount -= settlementAmount;
        
        if (debtor.amount < 0.01) i++;
        if (creditor.amount < 0.01) j++;
      }
      
      return settlements;
    };
  }, [calculateBalances]);

  return { calculateBalances, calculateSettlements };
};
