import React, { useState } from 'react';
import { MdAdd, MdPeople, MdClose, MdDelete } from 'react-icons/md';
import { MdEmail, MdPhone } from 'react-icons/md';
import Button from './common/Button';
import AddPerson from './AddPerson';

const PeopleList = ({ people, balances, onRemovePerson, onAddPerson }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPersonSuccess = (personData) => {
    const success = onAddPerson(personData);
    if (success) {
      setShowAddForm(false);
    }
    return success;
  };

  return (
    <div className="people-container">
      {/* Header with Add Button */}
      <div className="people-header">
        <h2 className="people-title">
          People {people.length > 0 && `(${people.length})`}
        </h2>
        <button 
          className="add-person-btn"
          onClick={() => setShowAddForm(true)}
          title="Add new person"
        >
          <MdAdd className="add-icon" />
        </button>
      </div>

      {/* Add Person Form Modal */}
      {showAddForm && (
        <div className="add-person-modal">
          <div className="modal-backdrop" onClick={() => setShowAddForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add New Person</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowAddForm(false)}
                >
                  <MdClose />
                </button>
              </div>
              <div className="modal-body">
                <AddPerson onAddPerson={handleAddPersonSuccess} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* People List */}
      {people.length === 0 ? (
        <div className="empty-state">
          <MdPeople className="empty-icon" />
          <h3>No people added yet</h3>
          <p>Click the + button above to add your first person</p>
        </div>
      ) : (
        <div className="people-list">
          {people.map((person) => {
            const balance = balances[person.name] || 0;
            const balanceClass = balance > 0 ? 'positive' : balance < 0 ? 'negative' : 'neutral';
            
            return (
              <div key={person.id} className="person-item">
                <div className="person-avatar">
                  <img src={person.avatar} alt={person.name} />
                </div>
                
                <div className="person-details">
                  <h4 className="person-name">{person.name}</h4>
                  {person.email && (
                    <p className="person-contact">
                      <MdEmail className="contact-icon" /> {person.email}
                    </p>
                  )}
                  {person.phone && (
                    <p className="person-contact">
                      <MdPhone className="contact-icon" /> {person.phone}
                    </p>
                  )}
                  
                  <div className={`person-balance ${balanceClass}`}>
                    {balance > 0 ? `Gets ₹${balance.toFixed(2)}` :
                     balance < 0 ? `Owes ₹${Math.abs(balance).toFixed(2)}` :
                     'All settled'}
                  </div>
                </div>
                
                <div className="person-actions">
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => onRemovePerson(person.id)}
                    disabled={Math.abs(balance) > 0.01}
                    title={Math.abs(balance) > 0.01 ? 'Cannot remove person with pending balances' : 'Remove person'}
                  >
                    <MdDelete />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PeopleList;
