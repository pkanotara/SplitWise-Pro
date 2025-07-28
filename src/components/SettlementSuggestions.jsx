import React from 'react';
import { MdPayment, MdCheckCircle, MdLightbulb, MdArrowForward } from 'react-icons/md';

const SettlementSuggestions = ({ settlements = [], detailed = false }) => {
  // Added default parameter to prevent potential errors
  if (!settlements || settlements.length === 0) {
    return (
      <div className="settlement-card">
        <h2 className="settlement-title">
          <MdPayment className="title-icon" />
          Settlement Suggestions
        </h2>
        <div className="empty-state">
          <div className="empty-icon">
            <MdCheckCircle />
          </div>
          <h3>All settled up!</h3>
          <p>No payments needed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settlement-card">
      <h2 className="settlement-title">
        <MdPayment className="title-icon" />
        Settlement Suggestions ({settlements.length})
      </h2>
      
      <div className="settlements-list">
        {settlements.map((settlement, index) => (
          <div key={index} className="settlement-row">
            <div className="settlement-details">
              <span className="from-person">{settlement.from}</span>
              <MdArrowForward className="arrow" />
              <span className="to-person">{settlement.to}</span>
            </div>
            <div className="settlement-amount">
              ₹{settlement.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      {detailed && (
        <div className="settlement-note">
          <p>
            <MdLightbulb className="note-icon" />
            Minimum transactions needed to settle all debts
          </p>
        </div>
      )}
    </div>
  );
};

export default SettlementSuggestions;
