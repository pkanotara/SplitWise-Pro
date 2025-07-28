import React, { useState, useMemo } from 'react';
import { 
  MdPayment, 
  MdCheckCircle, 
  MdLightbulb, 
  MdArrowForward,
  MdWarning,
  MdInfo,
  MdRefresh,
  MdPersonAdd
} from 'react-icons/md';

const SettlementSuggestions = ({ 
  settlements = [], 
  detailed = false, 
  people = [], 
  bills = [],
  onRecalculate 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Analyze settlement complexity and potential issues
  const settlementAnalysis = useMemo(() => {
    if (!settlements || settlements.length === 0) {
      return {
        complexity: 'none',
        totalAmount: 0,
        uniquePayers: 0,
        uniqueReceivers: 0,
        hasNewMembers: false,
        potentialIssues: []
      };
    }

    const totalAmount = settlements.reduce((sum, s) => sum + s.amount, 0);
    const uniquePayers = new Set(settlements.map(s => s.from));
    const uniqueReceivers = new Set(settlements.map(s => s.to));
    
    // Check for new members (people not in any bills)
    const peopleInBills = new Set();
    bills.forEach(bill => {
      peopleInBills.add(bill.paidBy);
      bill.splitAmong.forEach(person => peopleInBills.add(person));
    });
    
    const newMembers = people.filter(person => !peopleInBills.has(person.name));
    const hasNewMembers = newMembers.length > 0;

    // Identify potential issues
    const potentialIssues = [];
    
    // Check for circular settlements
    const hasCircular = settlements.some(s1 => 
      settlements.some(s2 => s1.from === s2.to && s1.to === s2.from)
    );
    if (hasCircular) {
      potentialIssues.push({
        type: 'circular',
        message: 'Circular payments detected - can be optimized further'
      });
    }

    // Check for large settlement amounts
    const largeSettlements = settlements.filter(s => s.amount > 5000);
    if (largeSettlements.length > 0) {
      potentialIssues.push({
        type: 'large_amount',
        message: `${largeSettlements.length} settlement(s) above ₹5,000`
      });
    }

    // Check for many small settlements
    const smallSettlements = settlements.filter(s => s.amount < 100);
    if (smallSettlements.length > 3) {
      potentialIssues.push({
        type: 'many_small',
        message: `${smallSettlements.length} small settlements - consider combining`
      });
    }

    // Check for uneven participation
    const allParticipants = new Set([...uniquePayers, ...uniqueReceivers]);
    const totalPeople = people.length;
    if (allParticipants.size < totalPeople * 0.7) {
      potentialIssues.push({
        type: 'uneven_participation',
        message: 'Some members have minimal financial interaction'
      });
    }

    return {
      complexity: settlements.length <= 2 ? 'simple' : settlements.length <= 5 ? 'moderate' : 'complex',
      totalAmount,
      uniquePayers: uniquePayers.size,
      uniqueReceivers: uniqueReceivers.size,
      hasNewMembers,
      newMembers,
      potentialIssues,
      efficiency: Math.max(0, 100 - (settlements.length / people.length) * 20)
    };
  }, [settlements, people, bills]);

  // Group settlements by payer for better organization
  const groupedSettlements = useMemo(() => {
    const groups = {};
    settlements.forEach(settlement => {
      if (!groups[settlement.from]) {
        groups[settlement.from] = [];
      }
      groups[settlement.from].push(settlement);
    });
    return groups;
  }, [settlements]);

  // Handle edge case: No settlements needed
  if (!settlements || settlements.length === 0) {
    return (
      <div className="settlement-card">
        <h2 className="settlement-title">
          <MdPayment className="title-icon" />
          Settlement Suggestions
        </h2>
        
        {settlementAnalysis.hasNewMembers ? (
          <div className="info-banner">
            <MdPersonAdd className="banner-icon" />
            <div className="banner-content">
              <h4>New Members Added</h4>
              <p>
                {settlementAnalysis.newMembers.map(m => m.name).join(', ')} 
                {settlementAnalysis.newMembers.length === 1 ? ' has' : ' have'} been added but 
                {settlementAnalysis.newMembers.length === 1 ? ' hasn\'t' : ' haven\'t'} participated in any bills yet.
              </p>
            </div>
          </div>
        ) : null}
        
        <div className="empty-state">
          <div className="empty-icon">
            <MdCheckCircle />
          </div>
          <h3>All settled up!</h3>
          <p>
            {people.length > 0 
              ? `All ${people.length} members have balanced accounts`
              : 'No payments needed'
            }
          </p>
          {people.length > 0 && (
            <div className="empty-actions">
              <button 
                className="btn-outline small"
                onClick={onRecalculate}
              >
                <MdRefresh /> Recalculate
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="settlement-card">
      {/* Header with Analysis */}
      <div className="settlement-header">
        <h2 className="settlement-title">
          <MdPayment className="title-icon" />
          Settlement Suggestions ({settlements.length})
        </h2>
        
        <div className="settlement-summary">
          <span className={`complexity-badge ${settlementAnalysis.complexity}`}>
            {settlementAnalysis.complexity} scenario
          </span>
          <span className="total-amount">
            Total: ₹{settlementAnalysis.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Warnings and Issues */}
      {settlementAnalysis.potentialIssues.length > 0 && (
        <div className="issues-section">
          <h4 className="issues-title">
            <MdWarning className="warning-icon" />
            Recommendations
          </h4>
          {settlementAnalysis.potentialIssues.map((issue, index) => (
            <div key={index} className={`issue-item ${issue.type}`}>
              <MdInfo className="issue-icon" />
              <span>{issue.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* New Members Alert */}
      {settlementAnalysis.hasNewMembers && (
        <div className="new-members-alert">
          <MdPersonAdd className="alert-icon" />
          <div className="alert-content">
            <strong>New Members:</strong> {settlementAnalysis.newMembers.map(m => m.name).join(', ')} 
            {settlementAnalysis.newMembers.length === 1 ? ' has' : ' have'} been added recently.
            <br />
            <small>Current settlements are based on existing bill history.</small>
          </div>
        </div>
      )}

      {/* Settlement List */}
      <div className="settlements-container">
        {showAdvanced ? (
          // Advanced view - grouped by payer
          <div className="settlements-grouped">
            {Object.entries(groupedSettlements).map(([payer, payerSettlements]) => {
              const totalOwed = payerSettlements.reduce((sum, s) => sum + s.amount, 0);
              
              return (
                <div key={payer} className="settlement-group">
                  <div className="group-header">
                    <div className="payer-info">
                      <strong className="payer-name">{payer}</strong>
                      <span className="payer-total">
                        owes ₹{totalOwed.toFixed(2)} to {payerSettlements.length} 
                        {payerSettlements.length === 1 ? ' person' : ' people'}
                      </span>
                    </div>
                  </div>
                  <div className="group-settlements">
                    {payerSettlements.map((settlement, index) => (
                      <div key={index} className="group-settlement-item">
                        <div className="settlement-flow">
                          <span className="amount">₹{settlement.amount.toFixed(2)}</span>
                          <MdArrowForward className="arrow-small" />
                          <span className="recipient">{settlement.to}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Simple view - flat list
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
        )}
      </div>

      {/* Controls */}
      <div className="settlement-controls">
        <button 
          className="btn-outline small"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Simple View' : 'Advanced View'}
        </button>
        
        {onRecalculate && (
          <button 
            className="btn-outline small"
            onClick={onRecalculate}
          >
            <MdRefresh /> Recalculate
          </button>
        )}
      </div>

      {/* Footer Information */}
      {detailed && (
        <div className="settlement-footer">
          <div className="settlement-note">
            <p>
              <MdLightbulb className="note-icon" />
              These are the minimum transactions needed to settle all debts efficiently.
            </p>
          </div>
          
          <div className="settlement-stats">
            <div className="stat-row">
              <span>Efficiency:</span>
              <span className={`efficiency ${settlementAnalysis.efficiency > 80 ? 'good' : 'average'}`}>
                {settlementAnalysis.efficiency.toFixed(1)}%
              </span>
            </div>
            <div className="stat-row">
              <span>People involved:</span>
              <span>{new Set([...settlements.map(s => s.from), ...settlements.map(s => s.to)]).size} of {people.length}</span>
            </div>
            {settlementAnalysis.hasNewMembers && (
              <div className="stat-row">
                <span>New members:</span>
                <span>{settlementAnalysis.newMembers.length}</span>
              </div>
            )}
          </div>
          
          <div className="settlement-tips">
            <h5>💡 Tips:</h5>
            <ul>
              <li>Complete settlements in order for best results</li>
              <li>Round amounts to nearest ₹10 for easier payments</li>
              {settlementAnalysis.hasNewMembers && (
                <li>Add new members to upcoming bills to balance their accounts</li>
              )}
              {settlementAnalysis.potentialIssues.some(i => i.type === 'large_amount') && (
                <li>Consider splitting large payments into smaller amounts</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettlementSuggestions;
