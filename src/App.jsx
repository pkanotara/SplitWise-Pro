import React, { useState } from 'react';
import {
  MdDashboard,
  MdPeople,
  MdReceipt,
  MdPayment,
  MdDarkMode,
  MdLightMode,
  MdFileDownload,
  MdDelete
} from 'react-icons/md';
import { BiMoney } from 'react-icons/bi';
import AddPerson from './components/AddPerson';
import PeopleList from './components/PeopleList';
import AddBill from './components/AddBill';
import BillsList from './components/BillsList';
import BalancesView from './components/BalancesView';
import SettlementSuggestions from './components/SettlementSuggestions';
import Notification from './components/common/Notification';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotification } from './hooks/useNotification';
import { useBillCalculations } from './hooks/useBillCalculations';
import './styles/App.css';
import './styles/components.css';

function App() {
  const [people, setPeople] = useLocalStorage('people', []);
  const [bills, setBills] = useLocalStorage('bills', []);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const { notification, showNotification, hideNotification } = useNotification();
  const { calculateBalances, calculateSettlements } = useBillCalculations(people, bills);
  

  const handleAddPerson = (personData) => {
    if (people.find(p => p.name.toLowerCase() === personData.name.toLowerCase())) {
      showNotification('Person already exists!', 'error');
      return false;
    }

    const newPerson = {
      id: Date.now().toString(),
      name: personData.name,
      email: personData.email || '',
      phone: personData.phone || '',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(personData.name)}&background=random`,
      createdAt: new Date().toISOString()
    };

    setPeople([...people, newPerson]);
    showNotification(`${personData.name} added successfully!`, 'success');
    return true;
  };

  const handleRemovePerson = (personId) => {
    const person = people.find(p => p.id === personId);
    if (!person) return;

    const balances = calculateBalances();

    if (Math.abs(balances[person.name] || 0) > 0.01) {
      showNotification('Cannot remove person with pending balances!', 'error');
      return;
    }

    setPeople(people.filter(p => p.id !== personId));
    setBills(bills.filter(bill =>
      bill.paidBy !== person.name && !bill.splitAmong.includes(person.name)
    ));
    showNotification(`${person.name} removed successfully!`, 'success');
  };

  const handleAddBill = (billData) => {
    const newBill = {
      id: Date.now().toString(),
      ...billData,
      amount: parseFloat(billData.amount),
      date: billData.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    setBills([...bills, newBill]);
    showNotification('Bill added successfully!', 'success');
    return true;
  };

  const handleRemoveBill = (billId) => {
    setBills(bills.filter(bill => bill.id !== billId));
    showNotification('Bill removed successfully!', 'success');
  };

  const exportData = () => {
    const data = {
      people,
      bills,
      exportDate: new Date().toISOString(),
      balances: calculateBalances()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bill-splitter-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('Data exported successfully!', 'success');
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setPeople([]);
      setBills([]);
      showNotification('All data cleared!', 'info');
    }
  };

  const balances = calculateBalances();
  const settlements = calculateSettlements();

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <BiMoney className="logo" />
            SplitWise Pro
          </h1>
          <div className="header-actions">
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle theme"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
            <button 
              className="export-btn"
              onClick={exportData}
              title="Export data"
            >
              <MdFileDownload />
            </button>
            <button 
              className="clear-btn"
              onClick={clearAllData}
              title="Clear all data"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="app-nav">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
          { id: 'people', label: 'People', icon: MdPeople },
          { id: 'bills', label: 'Bills', icon: MdReceipt },
          { id: 'settlements', label: 'Settlements', icon: MdPayment }
        ].map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent className="nav-icon" />
              <span className="nav-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total People</h3>
                <div className="stat-value">{people.length}</div>
              </div>
              <div className="stat-card">
                <h3>Total Bills</h3>
                <div className="stat-value">{bills.length}</div>
              </div>
              <div className="stat-card">
                <h3>Total Amount</h3>
                <div className="stat-value">
                  ₹{bills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}
                </div>
              </div>
              <div className="stat-card">
                <h3>Settlements Needed</h3>
                <div className="stat-value">{settlements.length}</div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-section">
                <BalancesView balances={balances} />
              </div>
              <div className="dashboard-section">
                <SettlementSuggestions settlements={settlements} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'people' && (
          <div className="people-tab">
            <AddPerson onAddPerson={handleAddPerson} />
            <PeopleList
              people={people}
              balances={balances}
              onRemovePerson={handleRemovePerson}
            />
          </div>
        )}

        {activeTab === 'bills' && (
          <div className="bills-tab">
            <AddBill people={people} onAddBill={handleAddBill} />
            <BillsList bills={bills} onRemoveBill={handleRemoveBill} />
          </div>
        )}

        {activeTab === 'settlements' && (
          <div className="settlements-tab">
            <SettlementSuggestions settlements={settlements} detailed={true} />
          </div>
        )}
      </main>

      {/* Notification */}
    {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </div>
  );
}

export default App;