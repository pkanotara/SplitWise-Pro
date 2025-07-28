import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';
// Import validation rules
import { VALIDATION_RULES, ERROR_MESSAGES } from '../utils/constants';

const AddPerson = ({ onAddPerson }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    const rules = VALIDATION_RULES.person[field];
    if (!rules) return '';

    if (rules.required && !value.trim()) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    if (value && rules.minLength && value.length < rules.minLength) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters`;
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be less than ${rules.maxLength} characters`;
    }

    if (value && rules.pattern && !rules.pattern.test(value)) {
      switch (field) {
        case 'name':
          return 'Name can only contain letters and spaces';
        case 'email':
          return 'Please enter a valid email address';
        case 'phone':
          return 'Please enter a valid phone number';
        default:
          return 'Invalid format';
      }
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      const success = onAddPerson(formData);
      if (success) {
        setFormData({ name: '', email: '', phone: '' });
      }
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <form onSubmit={handleSubmit} className="form">
        <Input
          label={`Name ${VALIDATION_RULES.person.name.required ? '*' : ''}`}
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
          error={errors.name}
          placeholder="Enter full name"
          maxLength={VALIDATION_RULES.person.name.maxLength}
        />
        
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          error={errors.email}
          placeholder="email@example.com"
        />
        
        <Input
          label="Phone"
          value={formData.phone}
          onChange={(value) => handleChange('phone', value)}
          error={errors.phone}
          placeholder="+91 98765 43210"
          maxLength={VALIDATION_RULES.person.phone.maxLength}
        />
        
        <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
          Add Person
        </Button>
      </form>
    </div>
  );
};

export default AddPerson;
