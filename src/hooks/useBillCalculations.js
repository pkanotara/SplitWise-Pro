import { useMemo } from 'react';
// Import utility functions
import { calculateBalances, calculateSettlements, calculateAnalytics } from '../utils/calculations';

export const useBillCalculations = (people, bills) => {
  const memoizedCalculateBalances = useMemo(() => {
    return () => calculateBalances(people, bills);
  }, [people, bills]);

  const memoizedCalculateSettlements = useMemo(() => {
    return () => {
      const balances = calculateBalances(people, bills);
      return calculateSettlements(balances);
    };
  }, [people, bills]);

  const memoizedCalculateAnalytics = useMemo(() => {
    return () => calculateAnalytics(people, bills);
  }, [people, bills]);

  return { 
    calculateBalances: memoizedCalculateBalances, 
    calculateSettlements: memoizedCalculateSettlements,
    calculateAnalytics: memoizedCalculateAnalytics
  };
};
