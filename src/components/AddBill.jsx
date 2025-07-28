import React, { useState } from 'react';
import { 
  MdRestaurant, 
  MdDirectionsCar, 
  MdMovie, 
  MdShoppingCart,  // Changed from MdShopping
  MdReceipt, 
  MdAttachMoney,
  MdPeople,
  MdSelectAll,
  MdClear
} from 'react-icons/md';
import Button from './common/Button';
import Input from './common/Input';

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

  const categories = [
    { value: 'food', label: 'Food & Dining', icon: MdRestaurant, color: '#ef4444' },
    { value: 'transport', label: 'Transportation', icon: MdDirectionsCar, color: '#3b82f6' },
    { value: 'entertainment', label: 'Entertainment', icon: MdMovie, color: '#8b5cf6' },
    { value: 'shopping', label: 'Shopping', icon: MdShoppingCart, color: '#ec4899' }, // Fixed icon
    { value: 'bills', label: 'Bills & Utilities', icon: MdReceipt, color: '#f59e0b' },
    { value: 'general', label: 'General', icon: MdAttachMoney, color: '#10b981' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.paidBy) {
      newErrors.paidBy = 'Please select who paid';
    }
    if (formData.splitAmong.length === 0) {
      newErrors.splitAmong = 'Select at least one person to split among';
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
          <Input
            label="Description *"
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            error={errors.description}
            placeholder="e.g., Dinner at restaurant"
          />
          
          <Input
            label="Amount (₹) *"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
            error={errors.amount}
            placeholder="0.00"
          />
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
                <option key={category.value} value={category.value}>
                  {category.label}
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
