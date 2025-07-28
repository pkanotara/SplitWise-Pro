import React, { useState } from 'react';
import { 
  MdRestaurant, 
  MdDirectionsCar, 
  MdMovie, 
  MdShoppingCart,
  MdReceipt, 
  MdAttachMoney,
  MdPeople,
  MdSelectAll,
  MdClear
} from 'react-icons/md';
import Button from './common/Button';
import Input from './common/Input';
// Import constants
import { 
  DEFAULT_CATEGORIES, 
  VALIDATION_RULES, 
  ERROR_MESSAGES,
  QUICK_AMOUNTS,
  COMMON_EXPENSE_DESCRIPTIONS
} from '../utils/constants';
import { validateSplit } from '../utils/calculations';

const AddBill = ({ people, onAddBill }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splitAmong: [],
    category: 'general',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  // Use categories from constants
  const categories = DEFAULT_CATEGORIES.map(category => ({
    ...category,
    icon: getCategoryIcon(category.id)
  }));

  function getCategoryIcon(categoryId) {
    const iconMap = {
      food: MdRestaurant,
      transport: MdDirectionsCar,
      entertainment: MdMovie,
      shopping: MdShoppingCart,
      bills: MdReceipt,
      general: MdAttachMoney
    };
    return iconMap[categoryId] || MdAttachMoney;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Use validation rules from constants
    if (!formData.description.trim() || 
        formData.description.length < VALIDATION_RULES.bill.description.minLength) {
      newErrors.description = `Description must be at least ${VALIDATION_RULES.bill.description.minLength} characters`;
    }
    
    const amount = parseFloat(formData.amount);
    if (!amount || amount < VALIDATION_RULES.bill.amount.min || amount > VALIDATION_RULES.bill.amount.max) {
      newErrors.amount = `Amount must be between ₹${VALIDATION_RULES.bill.amount.min} and ₹${VALIDATION_RULES.bill.amount.max}`;
    }
    
    if (!formData.paidBy) {
      newErrors.paidBy = 'Please select who paid';
    }
    
    if (formData.splitAmong.length < VALIDATION_RULES.bill.splitAmong.minParticipants) {
      newErrors.splitAmong = `Select at least ${VALIDATION_RULES.bill.splitAmong.minParticipants} person to split among`;
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      const success = onAddBill(formData);
      if (success) {
        setFormData({
          description: '',
          amount: '',
          paidBy: '',
          splitAmong: [],
          category: 'general',
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  const handleSplitChange = (personName, checked) => {
    setFormData(prev => ({
      ...prev,
      splitAmong: checked
        ? [...prev.splitAmong, personName]
        : prev.splitAmong.filter(name => name !== personName)
    }));
    
    if (errors.splitAmong) {
      setErrors(prev => ({ ...prev, splitAmong: '' }));
    }
  };

  const selectAllPeople = () => {
    setFormData(prev => ({
      ...prev,
      splitAmong: people.map(person => person.name)
    }));
  };

  const clearAllPeople = () => {
    setFormData(prev => ({ ...prev, splitAmong: [] }));
  };

  const setQuickAmount = (amount) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const getSuggestions = (category) => {
    return COMMON_EXPENSE_DESCRIPTIONS[category] || [];
  };

  if (people.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <MdPeople className="empty-icon" />
          <h3>Add people first</h3>
          <p>You need to add people before creating bills</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Add Bill</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <Input
              label="Description *"
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              error={errors.description}
              placeholder="e.g., Dinner at restaurant"
              list="descriptionSuggestions"
            />
            <datalist id="descriptionSuggestions">
              {getSuggestions(formData.category).map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
          </div>
          
          <div className="form-group">
            <Input
              label="Amount (₹) *"
              type="number"
              step="0.01"
              min={VALIDATION_RULES.bill.amount.min}
              max={VALIDATION_RULES.bill.amount.max}
              value={formData.amount}
              onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
              error={errors.amount}
              placeholder="0.00"
            />
            {/* Quick Amount Buttons */}
            <div className="quick-amounts" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', alignSelf: 'center' }}>Quick:</span>
              {QUICK_AMOUNTS.map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setQuickAmount(amount)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(value) => setFormData(prev => ({ ...prev, date: value }))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Paid By *</label>
          <select
            className={`form-select ${errors.paidBy ? 'error' : ''}`}
            value={formData.paidBy}
            onChange={(e) => setFormData(prev => ({ ...prev, paidBy: e.target.value }))}
          >
            <option value="">Select who paid</option>
            {people.map(person => (
              <option key={person.id} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>
          {errors.paidBy && <span className="error-text">{errors.paidBy}</span>}
        </div>

        <div className="form-group">
          <div className="split-header">
            <label className="form-label">Split Among *</label>
            <div className="split-actions">
              <Button type="button" variant="outline" size="small" onClick={selectAllPeople}>
                <MdSelectAll /> Select All
              </Button>
              <Button type="button" variant="outline" size="small" onClick={clearAllPeople}>
                <MdClear /> Clear
              </Button>
            </div>
          </div>
          
          <div className="split-grid">
            {people.map(person => (
              <label key={person.id} className="split-person">
                <input
                  type="checkbox"
                  checked={formData.splitAmong.includes(person.name)}
                  onChange={(e) => handleSplitChange(person.name, e.target.checked)}
                />
                <img src={person.avatar} alt={person.name} className="split-avatar" />
                <span>{person.name}</span>
              </label>
            ))}
          </div>
          {errors.splitAmong && <span className="error-text">{errors.splitAmong}</span>}
        </div>

        {formData.splitAmong.length > 0 && formData.amount && (
          <div className="split-preview">
            <h4>Split Preview</h4>
            <p>Each person pays: ₹{(parseFloat(formData.amount) / formData.splitAmong.length).toFixed(2)}</p>
            <p>Total participants: {formData.splitAmong.length}</p>
          </div>
        )}

        <Button type="submit" variant="primary">
          Add Bill
        </Button>
      </form>
    </div>
  );
};

export default AddBill;
