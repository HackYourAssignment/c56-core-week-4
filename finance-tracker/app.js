import chalk from 'chalk';
import { transactions } from './data.js';
import {
  addTransaction,
  findByDateRange,
  getBalance,
  getLargestExpense,
  getTotalExpenses,
  getTotalIncome,
  printAllTransactions,
  removeTransactionById,
} from './finance.js';

console.log(chalk.bold('💰 PERSONAL FINANCE TRACKER 💰'));
addTransaction({
  id: 8,
  type: 'income',
  category: 'present',
  amount: 150,
  description: 'gift grom friends',
  date: '2025-03-29',
});

getTotalIncome();
getTotalExpenses();
getBalance();
getLargestExpense();

printAllTransactions(transactions);
findByDateRange({ startDate: '2025-02-13', endDate: '2025-02-20' });
removeTransactionById(11);
