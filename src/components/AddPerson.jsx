import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';

const AddPerson = ({ onAddPerson }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Add Person</h2>
      <form onSubmit={handleSubmit} className="form">
        <Input
          label="Name *"
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
          error={errors.name}
          placeholder="Enter full name"
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
        />
        
        <Button type="submit" variant="primary">
          Add Person
        </Button>
      </form>
    </div>
  );
};

export default AddPerson;
