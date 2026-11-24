// This is the entrypoint for your application.
// node app.js
import { transactions } from './data.js';
import {
  addTransaction,
  printSummary,
  printAllTransactions,
} from './finance.js';

addTransaction({
  id: 6,
  type: 'expense',
  category: 'rent',
  amount: 1250,
  description: 'Rental payment',
  date: '2025-01-27',
});

printAllTransactions(transactions);

printSummary(transactions);
