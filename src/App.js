import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import FilterControls from './components/FilterControls';
import TransactionList from './components/TransactionList';
import TransactionSummary from './components/TransactionSummary';
import WishList from './components/WishList';
import RecurringExpenses from './components/RecurringExpenses';
import Login from './components/Login';
import PasswordSetup from './components/PasswordSetup';
import { useLanguage } from './i18n/LanguageContext';
import './App.css';

const defaultExpenseCategories = ['Home', 'Transport', 'Food', 'Entertainment', 'Taxes', 'Health', 'Wishlist', 'Subscriptions/Recurring', 'Other'];
const defaultIncomeCategories = ['Salary', 'Bonus', 'Gift', 'Sales', 'Other'];

function App() {
  const { t } = useLanguage();

  // PASSWORD SETUP STATE
  const [isPasswordSet, setIsPasswordSet] = useState(
    () => localStorage.getItem('contabilita-user-password') !== null
  );

  // AUTHENTICATION STATE
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('contabilita-authenticated') === 'true'
  );

  // MAIN STATE
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('contabilita-balance');
    return savedBalance !== null ? parseFloat(savedBalance) : 1000;
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('contabilita-transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [expenseCategories, setExpenseCategories] = useState(() => {
    const saved = localStorage.getItem('contabilita-expense-categories');
    return saved ? JSON.parse(saved) : defaultExpenseCategories;
  });

  const [incomeCategories, setIncomeCategories] = useState(() => {
    const saved = localStorage.getItem('contabilita-income-categories');
    return saved ? JSON.parse(saved) : defaultIncomeCategories;
  });

  const [filters, setFilters] = useState({
    type: 'all',
    period: 'current_month',
    startDate: '',
    endDate: '',
    category: 'all'
  });

  // PERSISTENCE
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('contabilita-balance', balance);
    }
  }, [balance, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('contabilita-transactions', JSON.stringify(transactions));
    }
  }, [transactions, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('contabilita-expense-categories', JSON.stringify(expenseCategories));
    }
  }, [expenseCategories, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('contabilita-income-categories', JSON.stringify(incomeCategories));
    }
  }, [incomeCategories, isAuthenticated]);

  // HANDLER FUNCTIONS
  const handleLogin = () => {
    sessionStorage.setItem('contabilita-authenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('contabilita-authenticated');
    setIsAuthenticated(false);
  };

  const handlePasswordSetup = () => {
    setIsPasswordSet(true);
  };

  const addCategory = (type, category) => {
    if (!category) return;
    const normalizedCategory = category.trim();
    if (type === 'expense') {
      if (!expenseCategories.includes(normalizedCategory)) {
        setExpenseCategories(prev => [...prev, normalizedCategory]);
      }
    } else {
      if (!incomeCategories.includes(normalizedCategory)) {
        setIncomeCategories(prev => [...prev, normalizedCategory]);
      }
    }
  };

  const deleteCategory = (type, categoryToDelete) => {
    if (!window.confirm(t('confirmDeleteCategory', { category: categoryToDelete }))) {
      return;
    }
    if (type === 'expense') {
      setExpenseCategories(prev => prev.filter(cat => cat !== categoryToDelete));
    } else {
      setIncomeCategories(prev => prev.filter(cat => cat !== categoryToDelete));
    }
  };

  const editCategory = (type, oldName, newName) => {
    if (!newName || oldName === newName) return;
    const normalizedNewName = newName.trim();

    if (type === 'expense') {
      if (expenseCategories.includes(normalizedNewName)) {
        alert(t('categoryExists', { category: normalizedNewName }));
        return;
      }
      setExpenseCategories(prev => prev.map(cat => cat === oldName ? normalizedNewName : cat));
    } else {
      if (incomeCategories.includes(normalizedNewName)) {
        alert(t('categoryExists', { category: normalizedNewName }));
        return;
      }
      setIncomeCategories(prev => prev.map(cat => cat === oldName ? normalizedNewName : cat));
    }

    setTransactions(prev => prev.map(tr => 
      tr.type === type && tr.category === oldName ? { ...tr, category: normalizedNewName } : tr
    ));
  };

  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
    if (transaction.type === 'expense') {
      setBalance(prev => prev - transaction.amount);
    } else {
      setBalance(prev => prev + transaction.amount);
    }
  };

  const deleteTransaction = (id, type, amount) => {
    if (window.confirm(t('confirmDeleteTransaction'))) {
      setTransactions(prev => prev.filter(tr => tr.id !== id));
      if (type === 'expense') {
        setBalance(prev => prev + amount);
      } else {
        setBalance(prev => prev - amount);
      }
    }
  };

  // FILTERING LOGIC
  const getFilteredTransactions = useCallback(() => {
    const filtered = transactions
      .filter(tr => {
        if (filters.type === 'all') return true;
        return tr.type === filters.type;
      })
      .filter(tr => {
        if (filters.period === 'all') return true;
        const transactionDate = new Date(tr.date);
        if (filters.period === 'current_month') {
          const today = new Date();
          return transactionDate.getMonth() === today.getMonth() &&
                 transactionDate.getFullYear() === today.getFullYear();
        }
        if (filters.period === 'custom') {
          const startDate = filters.startDate ? new Date(filters.startDate) : null;
          const endDate = filters.endDate ? new Date(filters.endDate) : null;
          if (startDate && endDate) return transactionDate >= startDate && transactionDate <= endDate;
          if (startDate) return transactionDate >= startDate;
          if (endDate) return transactionDate <= endDate;
        }
        return true;
      })
      .filter(tr => {
        if (filters.category === 'all') return true;
        return tr.category === filters.category;
      });

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, filters]);

  // RENDER
  if (!isPasswordSet) {
    return <PasswordSetup onPasswordSet={handlePasswordSetup} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App bg-light min-vh-100">
      <Header 
        balance={balance} 
        setBalance={setBalance} 
        setTransactions={setTransactions} 
        onLogout={handleLogout}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
      />
      <Container>
        <TransactionForm
          addTransaction={addTransaction}
          expenseCategories={expenseCategories}
          incomeCategories={incomeCategories}
          addCategory={addCategory}
        />
        <RecurringExpenses
          addTransaction={addTransaction}
          balance={balance}
          setBalance={setBalance}
        />
        <FilterControls 
          filters={filters} 
          setFilters={setFilters} 
          expenseCategories={expenseCategories}
          incomeCategories={incomeCategories}
        />
        <TransactionList 
          transactions={getFilteredTransactions()} 
          deleteTransaction={deleteTransaction} 
        />
        <TransactionSummary transactions={getFilteredTransactions()} />
        <WishList 
          balance={balance}
          setBalance={setBalance}
          addTransaction={addTransaction}
        />
      </Container>
    </div>
  );
}

export default App;
