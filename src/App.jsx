import React, { useState, useEffect } from 'react';
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
// Import utility functions
import { calculateBalances, calculateSettlements, calculateAnalytics, exportData } from './utils/calculations';
import { 
  APP_INFO, 
  SUCCESS_MESSAGES, 
  ERROR_MESSAGES, 
  EXPORT_FORMATS, 
  DEFAULT_SETTINGS,
  STORAGE_KEYS
} from './utils/constants';
import './styles/App.css';
import './styles/components.css';

function App() {
  const [people, setPeople] = useLocalStorage(STORAGE_KEYS.people, []);
  const [bills, setBills] = useLocalStorage(STORAGE_KEYS.bills, []);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  const [darkMode, setDarkMode] = useState(settings.darkMode || false);
  
  const { notification, showNotification, hideNotification } = useNotification();

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Update settings
    setSettings(prev => ({ ...prev, darkMode }));
  }, [darkMode, setSettings]);

  // Calculate data using utility functions
  const balances = calculateBalances(people, bills);
  const settlements = calculateSettlements(balances);
  const analytics = calculateAnalytics(people, bills);

  const handleAddPerson = (personData) => {
    // Check for duplicates using constants validation
    if (people.find(p => p.name.toLowerCase() === personData.name.toLowerCase())) {
      showNotification(ERROR_MESSAGES.duplicate, 'error');
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
    showNotification(SUCCESS_MESSAGES.personAdded, 'success');
    return true;
  };

  const handleRemovePerson = (personId) => {
    const person = people.find(p => p.id === personId);
    if (!person) return;
    
    // Check balance before removing
    if (Math.abs(balances[person.name] || 0) > 0.01) {
      showNotification(ERROR_MESSAGES.settlement, 'error');
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
    showNotification(SUCCESS_MESSAGES.billAdded, 'success');
    return true;
  };

  const handleRemoveBill = (billId) => {
    setBills(bills.filter(bill => bill.id !== billId));
    showNotification('Bill removed successfully!', 'success');
  };

  const handleExportData = (format = 'json') => {
    try {
      const exportedData = exportData(people, bills, format);
      
      let blob, filename;
      const today = new Date().toISOString().split('T')[0];
      
      switch (format) {
        case 'csv':
          blob = new Blob([exportedData], { type: 'text/csv' });
          filename = `${APP_INFO.name}-data-${today}.csv`;
          break;
        case 'summary':
          blob = new Blob([JSON.stringify(exportedData, null, 2)], { type: 'application/json' });
          filename = `${APP_INFO.name}-summary-${today}.json`;
          break;
        default:
          blob = new Blob([JSON.stringify(exportedData, null, 2)], { type: 'application/json' });
          filename = `${APP_INFO.name}-data-${today}.json`;
      }
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      
      showNotification(SUCCESS_MESSAGES.dataExported, 'success');
    } catch (error) {
      showNotification(ERROR_MESSAGES.generic, 'error');
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setPeople([]);
      setBills([]);
      showNotification(SUCCESS_MESSAGES.dataCleared, 'info');
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <BiMoney className="logo" />
            {APP_INFO.name}
          </h1>
          <div className="header-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
            <button 
              className="export-btn"
              onClick={() => handleExportData('json')}
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
                <div className="stat-value">{analytics.totalPeople}</div>
              </div>
              <div className="stat-card">
                <h3>Total Bills</h3>
                <div className="stat-value">{analytics.totalBills}</div>
              </div>
              <div className="stat-card">
                <h3>Total Amount</h3>
                <div className="stat-value">
                  ₹{analytics.totalExpenses.toFixed(2)}
                </div>
              </div>
              <div className="stat-card">
                <h3>Settlements Needed</h3>
                <div className="stat-value">{analytics.settlementsNeeded}</div>
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
            <PeopleList 
              people={people} 
              balances={balances}
              onRemovePerson={handleRemovePerson}
              onAddPerson={handleAddPerson}
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
