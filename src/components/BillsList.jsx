import React from 'react';
import { 
  MdRestaurant, 
  MdDirectionsCar, 
  MdMovie, 
  MdShoppingCart,  // Fixed icon name
  MdReceipt, 
  MdAttachMoney,
  MdDateRange,
  MdCreditCard,
  MdPeople,
  MdDelete
} from 'react-icons/md';
import Button from './common/Button';

const BillsList = ({ bills, onRemoveBill }) => {
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: MdRestaurant,
      transport: MdDirectionsCar,
      entertainment: MdMovie,
      shopping: MdShoppingCart,  // Fixed icon name
      bills: MdReceipt,
      general: MdAttachMoney
    };
    return icons[category] || MdAttachMoney;
  };

  return (
    <div className="card">
      <h2 className="card-title">Bills History ({bills.length})</h2>
      <div className="bills-list">
        {bills.map((bill) => {
          const IconComponent = getCategoryIcon(bill.category);
          
          return (
            <div key={bill.id} className="bill-item">
              <div className="bill-header">
                <div className="bill-category">
                  <IconComponent className="category-icon" />
                  <h3 className="bill-description">{bill.description}</h3>
                </div>
                <div className="bill-amount">₹{bill.amount.toFixed(2)}</div>
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
                <strong>Split among:</strong> {bill.splitAmong.join(', ')}
                <br />
                <strong>Per person:</strong> ₹{(bill.amount / bill.splitAmong.length).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillsList;
