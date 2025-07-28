import React from 'react';
import { 
  MdRestaurant, 
  MdDirectionsCar, 
  MdMovie, 
  MdShoppingCart,
  MdReceipt, 
  MdAttachMoney,
  MdDateRange,
  MdCreditCard,
  MdPeople,
  MdDelete
} from 'react-icons/md';
import Button from './common/Button';
// Import constants and utilities
import { DEFAULT_CATEGORIES, CURRENCY } from '../utils/constants';
import { calculatePersonShare } from '../utils/calculations';

const BillsList = ({ bills, onRemoveBill, people = [] }) => {
  if (bills.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <MdReceipt className="empty-icon" />
          <h3>No bills added yet</h3>
          <p>Add your first bill to start tracking expenses</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryInfo = (categoryId) => {
    const category = DEFAULT_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) return { icon: MdAttachMoney, name: 'General', color: '#6b7280' };
    
    const iconMap = {
      food: MdRestaurant,
      transport: MdDirectionsCar,
      entertainment: MdMovie,
      shopping: MdShoppingCart,
      bills: MdReceipt,
      general: MdAttachMoney
    };
    
    return {
      icon: iconMap[category.id] || MdAttachMoney,
      name: category.name,
      color: category.color
    };
  };

  const formatCurrency = (amount) => {
    return CURRENCY.format(amount);
  };

  return (
    <div className="card">
      <h2 className="card-title">Bills History ({bills.length})</h2>
      <div className="bills-list">
        {bills.map((bill) => {
          const categoryInfo = getCategoryInfo(bill.category);
          const IconComponent = categoryInfo.icon;
          
          return (
            <div key={bill.id} className="bill-item">
              <div className="bill-header">
                <div className="bill-category">
                  <IconComponent 
                    className="category-icon" 
                    style={{ color: categoryInfo.color }}
                  />
                  <h3 className="bill-description">{bill.description}</h3>
                </div>
                <div className="bill-amount">{formatCurrency(bill.amount)}</div>
              </div>
              
              <div className="bill-details">
                <div className="bill-info">
                  <span className="bill-date">
                    <MdDateRange className="info-icon" /> {formatDate(bill.date)}
                  </span>
                  <span className="bill-payer">
                    <MdCreditCard className="info-icon" /> Paid by {bill.paidBy}
                  </span>
                  <span className="bill-split">
                    <MdPeople className="info-icon" /> Split among {bill.splitAmong.length} people
                  </span>
                  <span className="bill-category-tag">
                    Category: {categoryInfo.name}
                  </span>
                </div>
                <Button 
                  variant="danger" 
                  size="small" 
                  onClick={() => onRemoveBill(bill.id)}
                  title="Remove bill"
                >
                  <MdDelete />
                </Button>
              </div>
              
              <div className="split-details">
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Split among:</strong> {bill.splitAmong.join(', ')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <span>
                    <strong>Per person:</strong> {formatCurrency(bill.amount / bill.splitAmong.length)}
                  </span>
                  <span>
                    <strong>Category:</strong> {categoryInfo.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="bills-summary" style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'var(--bg-gray)', 
        borderRadius: 'var(--radius)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <strong>Total Bills:</strong> {bills.length}
        </div>
        <div>
          <strong>Total Amount:</strong> {formatCurrency(bills.reduce((sum, bill) => sum + bill.amount, 0))}
        </div>
        <div>
          <strong>Average Bill:</strong> {formatCurrency(bills.reduce((sum, bill) => sum + bill.amount, 0) / bills.length)}
        </div>
      </div>
    </div>
  );
};

export default BillsList;
