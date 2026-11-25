import chalk from 'chalk';
import {
  addTransaction,
  printAllTransactions,
  printSummary,
  removeTransactionById,
} from './finance.js';

console.log(chalk.bold('💰 PERSONAL FINANCE TRACKER 💰'));
console.log();

addTransaction({
  id: 11,
  type: 'income',
  category: 'salary',
  amount: 3000,
  description: 'Monthly salary',
  date: '2025-03-15',
});
addTransaction({
  id: 12,
  type: 'expense',
  category: 'shopping',
  amount: 999,
  description: 'Added by mistake',
  date: '2025-03-16',
});
removeTransactionById(12);

printAllTransactions();
console.log();

printSummary();
console.log();
