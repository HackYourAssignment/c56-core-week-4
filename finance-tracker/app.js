// This is the entrypoint for your application.
// node app.js

import { transactions } from './data.js';
import {
  addTransaction,
  getLargestExpense,
  getTotalIncome,
} from './finance.js';

console.log(
  addTransaction({
    id: 8,
    type: 'income',
    category: 'present',
    amount: 150,
    description: 'gift grom friends',
    date: '2025-03-29',
  }),
);
console.log(transactions);

console.log(getTotalIncome());
console.log(getLargestExpense());