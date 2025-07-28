import React from 'react';
import { MdAttachMoney, MdTrendingUp, MdTrendingDown, MdRemove } from 'react-icons/md';

const BalancesView = ({ balances }) => {
  const balanceEntries = Object.entries(balances);
  
  if (balanceEntries.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <MdAttachMoney className="empty-icon" />
          <h3>No balances to show</h3>
          <p>Add people and bills to see balances</p>
        </div>
      </div>
    );
  }

  const getBalanceIcon = (balance) => {
    if (balance > 0) return MdTrendingUp;
    if (balance < 0) return MdTrendingDown;
    return MdRemove;
  };

  return (
    <div className="card">
      <h2 className="card-title">Current Balances</h2>
      <div className="balances-list">
        {balanceEntries.map(([person, balance]) => {
          const balanceClass = balance > 0 ? 'positive' : balance < 0 ? 'negative' : 'neutral';
          const IconComponent = getBalanceIcon(balance);
          
          return (
            <div key={person} className={`balance-item ${balanceClass}`}>
              <div className="balance-person">
                <IconComponent className="balance-icon" />
                <span className="person-name">{person}</span>
              </div>
              <div className="balance-amount">
                {balance > 0 ? `Gets ₹${balance.toFixed(2)}` :
                 balance < 0 ? `Owes ₹${Math.abs(balance).toFixed(2)}` :
                 'All settled'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BalancesView;
